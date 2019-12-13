using IBatisNet.DataMapper;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YSN2017.ComLIB;

namespace YSN2017.Controllers{

    [Authorize(Roles = "User,Admin")]
    public class FileController : Controller    {



        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        // <!-- 파일 리스트 ( 관련자료 )-->
        public ActionResult selectAttachFile() {

            if (Request.QueryString["biz_gubun"] != null) {

                Hashtable hash = new Hashtable();

                // { biz_gubun =,  doc_mgt = DOC_FMS, chasu =}

                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);
                hash.Add("biz_gubun", Request.QueryString["biz_gubun"]);  
                hash.Add("doc_mgt", Request.QueryString["doc_mgt"]);
                hash.Add("chasu", Request.QueryString["chasu"]);

                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("selectAttachFile", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }





        // <!-- 임시 파일 등록 -->
        [HttpPost]
        public ActionResult TempFileUpload(HttpPostedFileBase[] file_name) {
            //String file_name = "";
            Hashtable result = new Hashtable();
            List<Hashtable> file_list = new List<Hashtable>();
            

            try {

                //Guid guid = Guid.NewGuid();
                //String subdir = guid.ToString();
                //String subdir = DateTime.Now.ToString("yyyy") + Path.DirectorySeparatorChar + DateTime.Now.ToString("MM");


                String subdir = User.Identity.Name.Split('|')[0];
                if (file_name != null) {
                    for (int i = 0; i < file_name.Length; i++) {
                        
                        var fu = new FileUpload();
                        Hashtable file_idx = new Hashtable();
                        file_idx["file_name"] = fu.UploadFileSave(file_name[i], subdir, true);
                        file_list.Add(file_idx);

                    }
                }



                result.Add("success", true);
                result.Add("file_list", file_list);
                var jsonResult = Json(result, "text/plain", JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;


            } catch (Exception e) {
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, "text/plain", JsonRequestBehavior.AllowGet);
            }
        }





        // <!-- 임시 파일 삭제 -->
        [HttpPost]
        public ActionResult TempFileDelete(string[] file_name) {
            Hashtable result = new Hashtable();
            try {

                String subdir = User.Identity.Name.Split('|')[0];

                if (file_name != null) {
                    for (int i = 0; i < file_name.Length; i++) {
                        var fu = new FileUpload();
                        fu.UploadFileDelete(subdir, file_name[i]);
                    }
                }


                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } catch (Exception e) {
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }





        // <!-- 실제 파일 등록(이동) -->
        [HttpPost]
        public ActionResult RealFileUpload() {
            String filename = "";
            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {

                Hashtable hash = new Hashtable();

                hash["smr_cd"] = "SMR1703188";
                hash["smr_chasu"] = "1";
             


                mapper = Mapper.Instance();
                mapper.BeginTransaction();

                string[] upFile = Request.Form.GetValues("file_name");
                string subdir = User.Identity.Name.Split('|')[0];
                string movedir = DateTime.Now.ToString("yyyy") + Path.DirectorySeparatorChar + DateTime.Now.ToString("MM");

                string doc_mgt = "";


                String biz_gubun = hash["smr_cd"].ToString();
                String chasu = hash["smr_chasu"].ToString();

                String[] delFiles = Request.Form.GetValues("del_file");


                //파일 삭제
                if (delFiles != null) {
                    for (int i = 0; i < delFiles.Length; i++) {
                        Hashtable param = new Hashtable();
                        param["company_cd"] = User.Identity.Name.Split('|')[2];
                        param["file_no"] = delFiles[i];

                        mapper.Delete("deleteAttachFile", param);

                        //string subdir = User.Identity.Name.Split('|')[0];
                        //var fu = new FileUpload();
                        //fu.UploadFileDelete(subdir, file_name[i]);
                      
                    }
                }



                String[] modes = Request.Form.GetValues("mode");
                String[] file_names = Request.Form.GetValues("file_name");
                String[] file_codes = Request.Form.GetValues("file_code");
                String[] file_sizes = Request.Form.GetValues("file_size");


                //파일 정보 db저장
                for (int i = 0; i < file_names.Length; i++) {

                    Hashtable insertParam = new Hashtable();
                    insertParam["company_cd"] = User.Identity.Name.Split('|')[2];
                    insertParam["language"] = User.Identity.Name.Split('|')[3];
                    insertParam["biz_gubun"] = biz_gubun;
                    insertParam["chasu"] = Convert.ToInt32(chasu);
                    insertParam["doc_mgt"] = doc_mgt;
                    insertParam["doc_type"] = "";
                    insertParam["file_type"] = "";
                    insertParam["user_cd"] = User.Identity.Name.Split('|')[0];

                    if (modes[i].Equals("I")) {



                        var fu = new FileUpload();
                        Hashtable file_info = fu.UploadFileMove(subdir, movedir, upFile[i]);

                        insertParam["file_path"] = file_info["file_path"].ToString();
                        insertParam["file_size"] = file_info["file_size"].ToString();
                        insertParam["file_nm"] = file_info["file_nm"].ToString();
                        mapper.Insert("insertAttachFile", insertParam);   // 파일 정보 저장

                    } else if (modes[i].Equals("U")) {

                        insertParam["file_no"] = file_codes[i];
                        mapper.Update("updateAttachFile", insertParam);  // 파일 정보 수정

                    }
                }

                mapper.CommitTransaction();


                result.Add("success", true);
                //result.Add("filename", filename);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;


            } catch (Exception e) {
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }



        // <!-- 실제 파일 등록(이동) -->
        [HttpPost]
        public ActionResult RealFileTest() {

            Hashtable result = new Hashtable();
            Hashtable upload_data = new Hashtable();

         try { 

            upload_data["smr_cd"] = "SMR1703188";
            upload_data["smr_chasu"] = "1";
            upload_data["user_cd"] = User.Identity.Name.Split('|')[0];
            upload_data["company_cd"] = User.Identity.Name.Split('|')[2];
            upload_data["language"] = User.Identity.Name.Split('|')[3];
            


            string[] file_name = Request.Form.GetValues("file_name");
            string[] del_file = Request.Form.GetValues("del_file");
            string[] file_mode = Request.Form.GetValues("file_mode");
            string[] file_code = Request.Form.GetValues("file_code");
            string[] doc_mgt = Request.Form.GetValues("doc_mgt");

                var fu = new FileUpload();

                fu.UploadFileModel(upload_data, file_name, del_file, file_mode, file_code, doc_mgt);




                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;


            } catch (Exception e) {
                logger.Info(e.Message);

                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }




    }
}
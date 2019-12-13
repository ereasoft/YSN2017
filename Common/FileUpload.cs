using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Drawing;
using System.Collections;
using IBatisNet.DataMapper;

namespace YSN2017.ComLIB {
    public class FileUpload {

        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);


        // 파일 업로드 ( 파일, 파일경로, 파일경로 리턴여부 )
        public string UploadFileSave(HttpPostedFileBase file, string subpath, bool pathReturn) {
            //var savePath = HttpContext.Current.Server.MapPath(WebConfigurationManager.AppSettings["FILE_UPLOAD_PATH"] + subpath);
            // var savePath = page.MapPath(@"~/UploadFile/Service/" + subpath);
           // var dbSavePath = WebConfigurationManager.AppSettings["FILE_UPLOAD_PATH"].Replace("~", "") + subpath;

            var savePath = WebConfigurationManager.AppSettings["TEMP_UPLOAD_PATH"] + subpath;
            var dbSavePath = WebConfigurationManager.AppSettings["TEMP_UPLOAD_PATH"].Replace("~", "") + subpath;


            var dir = new DirectoryInfo(savePath);
            if (!dir.Exists) { // 디렉토리 확인
                dir.Create();
            }

            var filename = Path.GetFileName(file.FileName);
            var saveFullFileName = "";
            var fileinfo = new FileInfo(Path.Combine(savePath, filename));

            if (fileinfo.Exists) { // 동일한 이름의 파일이 있는지 검사
                int idx = 0;

                string ext = fileinfo.Extension;
                string oldFileName = filename.Replace(ext, "");
                string newFileName = "";
                do {
                    idx++;
                    newFileName = oldFileName + "_" + idx.ToString() + ext;
                    //newFileName = newFileName.Replace(" ", "_");
                    fileinfo = new FileInfo(Path.Combine(savePath, newFileName));
                } while (fileinfo.Exists);

                //saveFullFileName = (pathReturn == true) ? dbSavePath + Path.DirectorySeparatorChar + newFileName : newFileName;
                saveFullFileName = newFileName;
                file.SaveAs(Path.Combine(savePath, newFileName));
                var ddd = Path.Combine(savePath, filename);
            } else {

                //filename = filename.Replace(" ", "_");
                //saveFullFileName = (pathReturn == true) ? dbSavePath + Path.DirectorySeparatorChar + filename : filename;
                saveFullFileName = filename;
                file.SaveAs(Path.Combine(savePath, filename));
            }

            return saveFullFileName;

        }




        // 파일 이동
        public Hashtable UploadFileMove(string subpath, string moveSubpath, string filename) {


            //var savePath = HttpContext.Current.Server.MapPath(WebConfigurationManager.AppSettings["FILE_UPLOAD_PATH"] + subpath);
            //var moveSavePath = HttpContext.Current.Server.MapPath(WebConfigurationManager.AppSettings["FILE_UPLOAD_PATH"] + moveSubpath);
            var savePath = WebConfigurationManager.AppSettings["TEMP_UPLOAD_PATH"] + subpath;
            var moveSavePath = WebConfigurationManager.AppSettings["FILE_UPLOAD_PATH"] + moveSubpath;
            Hashtable file_info = new Hashtable();

            var dir = new DirectoryInfo(moveSavePath);
            if (!dir.Exists) { //이동할 디렉토리 확인
                dir.Create();
            }

            var fileinfo = new FileInfo(Path.Combine(savePath, filename));
            var saveFileName = "";
            var saveFullFileName = "";
            var moveSaveFullFileName = "";

            if (fileinfo.Exists) { // 파일이 있는지 검사

                var moveFileinfo = new FileInfo(Path.Combine(moveSavePath, filename));

                
                if (moveFileinfo.Exists) { // 동일한 이름의 파일이 있는지 검사
                    int idx = 0;

                    string ext = fileinfo.Extension;
                    string oldFileName = filename.Replace(ext, "");
                    string newFileName = "";

                    do {
                        idx++;
                        newFileName = oldFileName + "_" + idx.ToString() + ext;
                        //newFileName = newFileName.Replace(" ", "_");
                        moveFileinfo = new FileInfo(Path.Combine(moveSavePath, newFileName));
                    } while (moveFileinfo.Exists);

                    saveFullFileName = savePath + Path.DirectorySeparatorChar + filename;
                    moveSaveFullFileName = moveSavePath + Path.DirectorySeparatorChar + newFileName;
                    saveFileName = newFileName;

                    File.Move(saveFullFileName, moveSaveFullFileName);

                    file_info["save_full_filename"] = moveSavePath + Path.DirectorySeparatorChar + filename;
                    file_info["file_size"] = fileinfo.Length;
                    file_info["file_path"] = moveSavePath;
                    file_info["file_nm"] = newFileName;

                } else {

                    saveFullFileName = savePath + Path.DirectorySeparatorChar + filename;
                    moveSaveFullFileName = moveSavePath + Path.DirectorySeparatorChar + filename;
                    saveFileName = filename;
                    File.Move(saveFullFileName, moveSaveFullFileName);
                   
                    file_info["save_full_filename"] = moveSavePath + Path.DirectorySeparatorChar + filename;
                    file_info["file_size"] = fileinfo.Length;
                    file_info["file_path"] = moveSavePath;
                    file_info["file_nm"] = filename;



                }

            }

            return file_info;
            
        }


        // 파일 삭제
        public void UploadFileDelete(string filepath, string filename  ) {

            string delFile = WebConfigurationManager.AppSettings["TEMP_UPLOAD_PATH"] + filepath + Path.DirectorySeparatorChar + filename;

            if (File.Exists(delFile)) {
                File.Delete(delFile);
            }
        }




        // 파일 등록 삭제 처리
        public void UploadFileModel(Hashtable upload_data, string[] file_name, string[] del_file, string[] file_mode, string[] file_code, string[] doc_mgt) {


            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {

                Hashtable hash = new Hashtable();


                mapper = Mapper.Instance();
               // mapper.BeginTransaction();


                string subdir = upload_data["user_cd"].ToString();
                string movedir = DateTime.Now.ToString("yyyy") + Path.DirectorySeparatorChar + DateTime.Now.ToString("MM");

                //string doc_mgt = upload_data["doc_mgt"].ToString();
                string biz_gubun = upload_data["smr_cd"].ToString();
                string chasu = upload_data["smr_chasu"].ToString();


                string[] modes = file_mode;
                string[] file_names = file_name;
                string[] file_codes = file_code;
                string[] delFiles = del_file;


                //파일 삭제
                if (delFiles != null) {
                    for (int i = 0; i < delFiles.Length; i++) {
                        Hashtable param = new Hashtable();
                        param["company_cd"] = upload_data["company_cd"].ToString();
                        param["file_no"] = delFiles[i];

                        mapper.Delete("deleteAttachFile", param);

                        //string subdir = User.Identity.Name.Split('|')[0];
                        //var fu = new FileUpload();
                        //fu.UploadFileDelete(subdir, file_name[i]);

                    }
                }




                //파일 정보 db저장
                for (int i = 0; i < file_names.Length; i++) {

                    Hashtable insertParam = new Hashtable();
                    insertParam["company_cd"] = upload_data["company_cd"].ToString();
                    insertParam["language"] = upload_data["language"].ToString();
                    insertParam["biz_gubun"] = biz_gubun;
                    insertParam["chasu"] = Convert.ToInt32(chasu);
                    insertParam["doc_mgt"] = doc_mgt[i].nullToStr();
                    insertParam["doc_type"] = "";
                    insertParam["file_type"] = "";
                    insertParam["user_cd"] = upload_data["user_cd"].ToString();

                    if (modes[i].Equals("I")) {

                        var fu = new FileUpload();
                        Hashtable file_info = fu.UploadFileMove(subdir, movedir, file_names[i]);

                        insertParam["file_path"] = file_info["file_path"].ToString();
                        insertParam["file_size"] = file_info["file_size"].ToString();
                        insertParam["file_nm"] = file_info["file_nm"].ToString();
                        mapper.Insert("insertAttachFile", insertParam);   // 파일 정보 저장

                    } else if (modes[i].Equals("U")) {

                        insertParam["file_no"] = file_codes[i];
                        mapper.Update("updateAttachFile", insertParam);  // 파일 정보 수정

                    }
                }

                //mapper.CommitTransaction();

            } catch (Exception e) {
                logger.Info(e.Message);

            }

        }


    }
}
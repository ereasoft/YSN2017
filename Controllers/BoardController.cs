using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Exceptions;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YSN2017.ComLIB;



namespace YSN2017.Controllers{

    [Authorize(Roles = "User,Admin")]
    public class BoardController : Controller    {

        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);




        // 게시판 :  리스트/상세 /Board/boardList
        public ActionResult boardList() {

            if (Request["menuId"] != null) {

                Hashtable hash = new Hashtable();

                hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드

                hash.Add("menuId", Request["menuId"]);              // menuId       : 메뉴ID
                hash.Add("bbs_cd", Request["bbs_cd"]);              // bbs_cd       : 게시판 코드
                hash.Add("user_cd", Request["user_cd"]);            // user_cd      : 글쓴이
                hash.Add("bbs_subject", Request["bbs_subject"]);    // bbs_subject  : 제목
                hash.Add("sdate", Request["sdate"]);                // sdate        : 등록일 시작
                hash.Add("edate", Request["edate"]);                // edate        : 등록일 종료


                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("boardList", hash);


                Hashtable jsonData = new Hashtable();
                jsonData.Add("COUNT", list.Count());
                jsonData.Add("LIST", list);


                var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }



        // 게시판 :  상세 /Board/boardDetail
        public ActionResult boardDetail() {

            if (Request["bbs_cd"] != null ) {

                Hashtable hash = new Hashtable();

                hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드

                hash.Add("menuId", Request["menuId"]);              // menuId       : 메뉴ID
                hash.Add("bbs_cd", Request["bbs_cd"]);              // bbs_cd       : 게시판 코드



                ISqlMapper mapper = Mapper.Instance();


        
                Hashtable boardList = mapper.QueryForObject<Hashtable>("boardList", hash);
                IEnumerable<Hashtable> boardCmtList = mapper.QueryForList<Hashtable>("boardCmtList", hash);
                Hashtable jsonData = new Hashtable();
       
                jsonData.Add("DETAIL", boardList);
                jsonData.Add("CMT_LIST", boardCmtList);

                var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }


        // 게시판 :  저장/수정 /Board/boardSave
        [HttpPost]
        public ActionResult boardSave() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();


                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
                hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID
                hash["user_cd"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID

                hash["bbs_subject"] = Request["bbs_subject"].nullToStr();           // bbs_subject      : 제목
                hash["bbs_contents"] = Request["bbs_contents"].nullToStr();         // bbs_contents     : 내용
                hash["bbs_cd"] = Request["bbs_cd"].nullToStr();                     // bbs_cd           : 진행상태
                hash["menuId"] = Request["menuId"].nullToStr();                     // menuId           : 게시판 코드



                mapper.BeginTransaction();
                
                if (hash["bbs_cd"].Equals("")) {
                    Hashtable hm = mapper.QueryForObject<Hashtable>("getBbsCd", hash);
                    hash["bbs_cd"] = hm["BBS_CD"].ToString();
                }
                
                mapper.Insert("boardSave", hash);



                string[] file_name = Request.Form.GetValues("file_name");
                string[] del_file = Request.Form.GetValues("del_file");
                string[] file_mode = Request.Form.GetValues("file_mode");
                string[] file_code = Request.Form.GetValues("file_code");
                string[] doc_mgt = Request.Form.GetValues("doc_mgt");

                // 파일등록 
                if ((file_name != null && file_name.Length > 0) || (del_file != null && del_file.Length > 0)) {

                    Hashtable upload_data = new Hashtable();

                    upload_data["smr_cd"] = hash["bbs_cd"].ToString();
                    upload_data["smr_chasu"] = "0";
                    upload_data["user_cd"] = User.Identity.Name.Split('|')[0];
                    upload_data["company_cd"] = User.Identity.Name.Split('|')[2];
                    upload_data["language"] = User.Identity.Name.Split('|')[3];

                    var fu = new FileUpload();

                    fu.UploadFileModel(upload_data, file_name, del_file, file_mode, file_code, doc_mgt);

                }


                mapper.CommitTransaction();

                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } catch (DataMapperException e) {
                mapper.RollBackTransaction();
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);

            } catch (Exception e) {
                if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }



        // 게시판 :  글 삭제 /Board/boardDelete
        [HttpPost]
        public ActionResult boardDelete() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();

                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

                hash["bbs_cd"] = Request["bbs_cd"].nullToStr();             // bbs_cd           : 진행상태
           

                mapper.BeginTransaction();

                mapper.Delete("boardDelete", hash);

                mapper.CommitTransaction();

                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } catch (DataMapperException e) {
                mapper.RollBackTransaction();
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);

            } catch (Exception e) {
                if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }



        // 댓글 :  상세 /Board/boardCmtDetail
        public ActionResult boardCmtDetail()
        {

            if (Request["bbd_cd"] != null)
            {

                Hashtable hash = new Hashtable();

                hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드

                hash["bbs_cd"] = Request["bbs_cd"].nullToStr();                     // bbs_cd           : 게시글pk
                hash["bbd_cd"] = Request["bbd_cd"].nullToStr();                     // bbd_cd           : 댓글pk 



                ISqlMapper mapper = Mapper.Instance(); 
                IEnumerable<Hashtable> boardCmtList = mapper.QueryForList<Hashtable>("boardCmtList", hash);
                Hashtable jsonData = new Hashtable();  

                var jsonResult = Json(boardCmtList, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }
            else
            {
                return new EmptyResult();
            }

        }

        // 게시판 :  댓글 저장 수정 /Board/boardCmtSave
        [HttpPost]
        public ActionResult boardCmtSave() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();

                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
                hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID
                hash["user_cd"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID

                hash["bbs_cd"] = Request["bbs_cd"].nullToStr();                     // bbs_cd           : 게시글pk
                hash["bbd_cd"] = Request["bbd_cd"].nullToStr();                     // bbd_cd           : 댓글pk
                hash["bbd_cmt"] = Request["bbd_cmt"].nullToStr();                   // bbd_cmt          : 댓글내용






                mapper.BeginTransaction();

                if (hash["bbd_cd"].Equals("")) {
                    Hashtable hm = mapper.QueryForObject<Hashtable>("getBbdCd", hash);
                    hash["bbd_cd"] = hm["BBD_CD"].ToString();
                }

                mapper.Insert("boardCmtSave", hash);



                mapper.CommitTransaction();

                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } catch (DataMapperException e) {
                mapper.RollBackTransaction();
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);

            } catch (Exception e) {
                if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }



        // 게시판 :  댓글 삭제 /Board/boardCmtDelete
        [HttpPost]
        public ActionResult boardCmtDelete() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();

                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

                hash["bbs_cd"] = Request["bbs_cd"].nullToStr();             // bbs_cd           : 게시글 pk
                hash["bbd_cd"] = Request["bbd_cd"].nullToStr();             // bbd_cd           : 댓글 pk


                mapper.BeginTransaction();

                mapper.Delete("boardCmtDelete", hash);

                mapper.CommitTransaction();

                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } catch (DataMapperException e) {
                mapper.RollBackTransaction();
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);

            } catch (Exception e) {
                if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        


    }
}
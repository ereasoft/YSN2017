using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Exceptions;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YSN2017.ComLIB;



// admin 권한관리
namespace YSN2017.Controllers {

    [Authorize(Roles = "User,Admin")]
    public class AdminAuthController : Controller {

        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);



        // 권한관리 :  리스트  /AdminAuth/authorityList
        public ActionResult authorityList() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {
                ISqlMapper mapper = Mapper.Instance();
                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = Request["company_cd"].nullToStr();       // 회사코드

                hash["searchAuthId"] = Request["searchAuthId"].nullToStr();         // searchAuthId     : 권한id
                hash["searchAuthNm"] = Request["searchAuthNm"].nullToStr();         // searchAuthNm     : 권한명


                IList<Hashtable> list = mapper.QueryForList<Hashtable>("authorityList", hash);


                result.Add("LIST", list);

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




        // 권한관리 : 하위 메뉴 조회 리스트 - 권한 별 사용자  /AdminAuth/authUserList
        public ActionResult authUserList() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {
                ISqlMapper mapper = Mapper.Instance();
                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = Request["company_cd"].nullToStr();          // 회사코드

                hash["selectAuthId"] = Request["selectAuthId"].nullToStr();         // upMenuId     : 상위메뉴id


                IList<Hashtable> list = mapper.QueryForList<Hashtable>("authUserList", hash);

                result.Add("LIST", list);

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



        // 권한관리 : 하위 메뉴 조회 - 권한별 메뉴   /AdminAuth/getTreeCodeList
        public ActionResult getTreeCodeList() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            Hashtable param = new Hashtable();
            try {
                ISqlMapper mapper = Mapper.Instance();
                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = Request["company_cd"].nullToStr();         // 회사코드

                hash["selectAuthId"] = Request["selectAuthId"].nullToStr();         // upMenuId     : 상위메뉴id
                hash["upmenuId"] = Request["node"].nullToStr();                   // deptId           : 조직레벨
                hash["menuId"] = Request["menuId"].nullToStr();                     // deptId           : 조직레벨
                param["company_cd"] = hash["company_cd"];
                param["selectAuthId"] = hash["selectAuthId"];

                IList<Hashtable> list = mapper.QueryForList<Hashtable>("authMenuList", hash);
               
                IList<Hashtable> fullList;
                if (hash["selectAuthId"].ToString() != "") {
                    fullList = mapper.QueryForList<Hashtable>("authMenuList", param);
                }else
                {
                    fullList = null;
                }

                foreach (Hashtable parent in fullList) {
                    IList<Hashtable> childList = new List<Hashtable>();
                    foreach (Hashtable child in fullList) {
                        child["leaf"] = (int)child["CHILD_CNT"] > 0 ? false : true;
                        child["id"] = child["MENU_ID"];
                        if (parent["MENU_ID"].Equals(child["UP_MENU_ID"])) {
                            childList.Add(child);
                        }
                    }
                    if (childList.Count() > 0) parent["children"] = childList;
                }


                IList<Hashtable> resultList = new List<Hashtable>();
                foreach (Hashtable map in list) {
                    foreach (Hashtable fullMap in fullList)
                    {
                        if (map["MENU_ID"].Equals(fullMap["MENU_ID"]))
                        {
                            resultList.Add(fullMap);
                        }
                    }
                }



                result.Add("LIST", resultList);

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




        // 권한관리 : 당당자 추가 팝업 검색   /AdminAuth/popupAuthUserList
        public ActionResult popupAuthUserList() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {
                ISqlMapper mapper = Mapper.Instance();
                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["BizGroup"] = Request["BizGroup"].nullToStr();         // BizGroup     : 상위부서
                hash["DeptGroup"] = Request["DeptGroup"].nullToStr();       // DeptGroup    : 하위부서
                hash["UserNm"] = Request["UserNm"].nullToStr();             // UserNm       : 이름



                IList<Hashtable> list = mapper.QueryForList<Hashtable>("popupAuthUserList", hash);

                result.Add("LIST", list);

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





        // 권한관리 : 당당자 추가 팝업 - 등록   /AdminAuth/popupAuthUserReg
        [HttpPost]
        public ActionResult popupAuthUserReg() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();

                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = Request["company_cd"].nullToStr();       // 회사코드
                hash["user_cd"] = User.Identity.Name.Split('|')[0]; 
                hash["auth_id"] = Request["auth_id"].nullToStr();           // 권한id
                hash["auth_user_cd"] = Request["auth_user_cd"].nullToStr();
                Hashtable resultMap = new Hashtable();

                mapper.BeginTransaction(); 

                mapper.Insert("popupAuthUserReg", hash);

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




        // 권한관리 : 담당자 삭제   /AdminAuth/popupAuthUserDelete
        [HttpPost]
        public ActionResult popupAuthUserDelete() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();

                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = Request["company_cd"].nullToStr();       // 회사코드 
                hash["auth_id"] = Request["selectAuthId"].nullToStr();      // 권한id
                hash["auth_user_cd"] = Request["selectUserCd"].nullToStr(); ;

                mapper.BeginTransaction(); 

                mapper.Delete("popupAuthUserDelete", hash);
        

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


        //권한등록/수정
        [HttpPost]
        public ActionResult authReg()
        {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();

                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드
                hash["mode"] = Request["mode"].nullToStr();    
                hash["auth_id"] = Request["auth_id"].nullToStr();      // 권한id    
                hash["auth_nm"] = Request["auth_nm"].nullToStr();
                hash["auth_div"] = Request["auth_div"].nullToStr();
                hash["auth_team"] = Request["auth_team"].nullToStr();
                hash["auth_pers_1"] = Request["auth_pers_1"].nullToStr();
                hash["auth_pers_2"] = Request["auth_pers_2"].nullToStr();
                hash["auth_descript"] = Request["auth_descript"].nullToStr();
                hash["use_yn"] = Request["use_yn"].nullToStr();
                hash["userCd"] = User.Identity.Name.Split('|')[0];

                mapper.BeginTransaction();

                if (hash["mode"].Equals("I"))
                {
                    mapper.Insert("authReg", hash);
                }else
                {
                    mapper.Update("authModify", hash);
                }

                mapper.CommitTransaction();



                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }
            catch (DataMapperException e)
            {
                mapper.RollBackTransaction();
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        // 권한관리 : 메뉴권한등록   /AdminAuth/authMenuReg
        [HttpPost]
        public ActionResult authMenuReg()
        {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();

                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["mode"] = Request["mode"].nullToStr();         // 회사코드 
                hash["company_cd"] = Request["company_cd"].nullToStr();         // 회사코드 
                hash["auth_id"] = Request["auth_id"].nullToStr();      // 권한id   
                hash["menu_id"] = Request["menu_id"].nullToStr();
                hash["use_yn"] = Request["use_yn"].nullToStr();
                hash["use_scope"] = Request["use_scope"].nullToStr();
                hash["dept_yn"] = Request["dept_yn"].nullToStr();
                hash["odept_scope"] = Request["odept_scope"].nullToStr();
                hash["idept_scope"] = Request["idept_scope"].nullToStr();
                hash["user_cd"] = User.Identity.Name.Split('|')[0];

                mapper.BeginTransaction();

                if (hash["use_yn"].ToString().Equals("N"))
                { 
                    mapper.Delete("authMenuDelete", hash);

                }
                else
                {
                    if (hash["mode"].ToString().Equals("I"))
                    {
                        mapper.Insert("authMenuIns", hash);
                    }
                    else
                    {
                        mapper.Update("authMenuUpdate", hash);
                    }

                } 

                mapper.CommitTransaction();



                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }
            catch (DataMapperException e)
            {
                mapper.RollBackTransaction();
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        // 권한관리 : 권한 등록   /AdminAuth/authReg
        [HttpPost]
        public ActionResult authReg_back() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();

                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

                string arrayResult = Request["arrResult"].nullToStr();      // 사용자
                hash["auth_id"] = Request["selectAuthId"].nullToStr();      // 권한id


                mapper.BeginTransaction();


                /* 권한 insert */
                String[] rowResult = Request["agUpdateResult"].nullToStr().Split(new[] { "\\|@\\|" }, StringSplitOptions.None);  // .split("\\|@\\|");
                if (!"".Equals(Request["agUpdateResult"].nullToStr()) && Request["agUpdateResult"].nullToStr() != null) {
                    foreach (String val in rowResult) {
                        String[] colResult = val.Split(new[] { "\\|!\\|" }, 10, StringSplitOptions.None);  // .split("\\|!\\|", 10);
                        String updateMode = colResult[0];
                        Hashtable updateParam = new Hashtable();

                        updateParam["auth_id"]      = colResult[1] == null ? "" : colResult[1].ToString();
                        updateParam["auth_nm"]      = colResult[2] == null ? "" : colResult[2].ToString();
                        updateParam["auth_div"]     = colResult[3] == null ? "" : colResult[3].ToString();
                        updateParam["auth_team"]    = colResult[4] == null ? "" : colResult[4].ToString();
                        updateParam["auth_pers_1"]  = colResult[5] == null ? "" : colResult[5].ToString();
                        updateParam["auth_pers_2"]  = colResult[6] == null ? "" : colResult[6].ToString();
                        updateParam["auth_descript"]= colResult[7] == null ? "" : colResult[7].ToString();
                        updateParam["use_yn"]       = colResult[9] == null ? "" : colResult[9].ToString();

                        updateParam["userCd"] = User.Identity.Name.Split('|')[0];
                        mapper.Insert("authReg", updateParam);

                    }
                }

                /* 메뉴 권한 Update */
                String auth_id = Request["selectAuthId"].nullToStr();
                rowResult = Request["amUpdateResult"].nullToStr().Split(new[] { "\\|@\\|" }, StringSplitOptions.None);  //.split("\\|@\\|");
                if (!"".Equals(Request["amUpdateResult"].nullToStr()) && Request["amUpdateResult"].nullToStr() != null) {
                    foreach (String val in rowResult) {
                        String[] colResult = val.Split(new[] { "\\|@\\|" }, 7, StringSplitOptions.None);  //.split("\\|!\\|", 7);
                        String updateMode = colResult[0];
                        String status = colResult[2];
                        Hashtable updateParam = new Hashtable();


                        if ("N".Equals(status)) {           // Status = N
                            if ("U".Equals(updateMode)) {   // UpdateMode = U
                                updateParam["auth_id"] = auth_id;
                                updateParam["menu_id"] = colResult[1];
                                mapper.Delete("authMenuDelete", updateParam);
                                
                            }
                        } else {  // status = Y
                            if ("U".Equals(updateMode) || "I".Equals(updateMode)) {  // UpdateMode = U
                                updateParam["auth_id"] = auth_id;
                                updateParam["menu_id"] = colResult[1];  // DS_ID
                                updateParam["use_yn"] = status;
                                updateParam["use_scope"] = colResult[3];
                                updateParam["dept_yn"] = colResult[4];
                                updateParam["odept_scope"] = colResult[5];
                                updateParam["idept_scope"] = colResult[6];
                                updateParam["user_cd"] = User.Identity.Name.Split('|')[0];

                                mapper.Insert("authMenuReg", updateParam);
                             

                            }
                        }
                    }
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








    }
}
using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Exceptions;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using YSN2017.ComLIB;
using YSN2017.Common;
using YSN2017.Models;

namespace YSN2017.Controllers{
    public class MemberController : Controller{

        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public ActionResult Index() {

             return View("Index");

        }


        public ActionResult Login() {

           /* if (User.Identity.IsAuthenticated) {

                 return View("Index");

             }else {

                 return View("Index");

             }*/

            return Redirect("/Client/index.aspx");
        }

        // 로그인 체크
        [HttpPost]
        public ActionResult LoginCheck(string user_cd, string pass_wd, string save_cd ="N") {

            ISqlMapper mapper = null;

          // user_cd = "16021601";
          // pass_wd = "0000";

            if (user_cd != null && pass_wd != null) {
                mapper = Mapper.Instance();
                Hashtable jsonData = new Hashtable();
                try {
                    EncyptUtil enc = new EncyptUtil();
                    Hashtable hash = new Hashtable();
                    hash.Add("user_cd", user_cd);
                    hash.Add("pass_wd", enc.AESEncrypt256(pass_wd));
                    hash.Add("use_yn", "Y");

                    if(CommonMethod.getCookieValue(Request, "LANG") == null || CommonMethod.getCookieValue(Request, "LANG") == "")
                    {
                        hash.Add("language", "KOR");
                    }else
                    {
                        hash.Add("language", CommonMethod.getCookieValue(Request, "LANG"));
                    }
                     


                    // 로그인 체크
                    Hashtable list = mapper.QueryForObject<Hashtable>("loginCheck", hash);

                    if (list != null && list.Count != 0) {


                        string dept_cd = list["DEPT_CD"] == null ? "" : list["DEPT_CD"].ToString();
                        string dept_nm = list["DEPT_NM"] == null ? "" : list["DEPT_NM"].ToString();
                        string auth_id = list["AUTH_ID"] == null ? "" : list["AUTH_ID"].ToString();

                        string auth_group = list["AUTH_DIV"].ToString() + list["AUTH_TEAM"].ToString() + list["AUTH_PERS_1"].ToString() + list["AUTH_PERS_2"].ToString();


                        // form인증 생성
                        AuthCreate("User,Admin", list["USER_CD"].ToString(), list["USER_NM"].ToString()
                                                , list["COMPANY_CD"].ToString(), list["MULTI_LANG"].ToString()
                                                , dept_cd, dept_nm, auth_id, list["DEPT_LEVEL"].ToString(), list["UP_DEPT_CD"].ToString(), list["SADEPT_YN"].ToString(), list["DSTR_CHN"].ToString(), list["DSTR_CHN_NM"].ToString()
                                                , auth_group, list["SA_YN"].ToString(), list["THEME"].ToString());

                        // 사용자 정보 세션저장
                        CommonMethod.setCookie("LANG", list["MULTI_LANG"].ToString()); 


                        // 로그인창에서 id기억하기 체크시
                        if (save_cd.Equals("Y")){
                            CommonMethod.setCookie("INTRO_UID", user_cd);
                        } else {
                            CommonMethod.delCookie("INTRO_UID");
                        }


                        // 로그인 시간 업데이트 
                        hash.Add("company_cd", list["COMPANY_CD"].ToString());
                        hash["language"] = list["MULTI_LANG"].ToString();

                        mapper.BeginTransaction();
                        mapper.Update("updateLastLogin", hash);
                        mapper.CommitTransaction();
                        // 로그인 시간 업데이트 

                        //return Json("login_success", JsonRequestBehavior.AllowGet);
                        //[Authorize(Roles = "User,Admin")]return Redirect("/Client/index.html");
                        //return RedirectToAction("Index", "Client");


                       // IEnumerable<Hashtable> lang = list["MULTI_LANG"].ToString());

                        ViewData["success"] = "true";
                        TempData["success"] = "true";  
                        ViewBag.success = "true";
                    
                        //return Redirect("~/Client/index2.cshtml");
                        //return View("~/Client/index2.cshtml");
                        //return View("~/Client/index2.cshtml");

                        jsonData.Add("success", true);
                        jsonData.Add("lang", hash["language"]);
                        return Json(jsonData, JsonRequestBehavior.AllowGet);

                        //return Redirect("/Client/index.html");

                    } else {

                        jsonData.Add("success", false);
                        return Json(jsonData, JsonRequestBehavior.AllowGet);
                    }

                } catch (DataMapperException e) {
                    logger.Info(e.Message);
                    jsonData.Add("success", false);
                    jsonData.Add("errmsg", e.Message);
                    return Json(jsonData, JsonRequestBehavior.AllowGet); 

                } catch (Exception e) {
                    if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                    logger.Info(e.Message);
                    jsonData.Add("success", false);
                    jsonData.Add("errmsg", e.Message);
                    return Json(jsonData, JsonRequestBehavior.AllowGet);
                }

               



            } else {
                return new EmptyResult();
            }

        }




        // 사용자 인증 암호화 쿠키 생성 :   권한 / 아이디[0] | 이름[1] | 회사코드[2] | 기본언어[3]  | 부서코드[4] | 부서이름[5] | 권한등급[6] | 권한그룹[7] 
        public void AuthCreate(string grant, string user_id, string user_name, string compnay_cd, string lang, string dept_cd, string dept_nm, string auth_id, string dept_level, string up_dept_cd, string sa_dept_yn, string dstr_chn, string dstr_chn_nm, string auth_group, string sa_yn, string theme) {

            

            FormsAuthentication.SetAuthCookie(user_name, false);

            var authTicket = new FormsAuthenticationTicket(
                                        1,
                                        user_id + "|" + user_name + "|" + compnay_cd + "|" + lang + "|" + dept_cd + "|" + dept_nm + "|" + auth_id + "|" + dept_level + "|" + up_dept_cd + "|" + sa_dept_yn + "|" + dstr_chn +  "|" + dstr_chn_nm + "|" + auth_group + "|" + sa_yn + "|" + theme,
                                        DateTime.Now,
                                        DateTime.Now.AddMinutes(60),
                                        false,
                                        grant
                                        );

            string encryptedTicket = FormsAuthentication.Encrypt(authTicket);
            HttpCookie authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);

            //authCookie.Values.Add("", "");

            // authCookie.HttpOnly = true;
            // authCookie.Domain = "aaa.co.kr"; 

            HttpContext.Response.Cookies.Add(authCookie);


        }





        // 로그아웃
        public ActionResult LogOut() {

            CommonMethod.delCookie("LANG");
            Session.Remove("user");
            FormsAuthentication.SignOut();
            Hashtable jsonData = new Hashtable();
            jsonData.Add("success", "true");
            return Json(jsonData, JsonRequestBehavior.AllowGet);
            //return RedirectToAction("Index", "Member");
        }



        // 세션 아웃시
        public ActionResult SessionOut() {
            Hashtable jsonData = new Hashtable();
            CommonMethod.delCookie("LANG");
            FormsAuthentication.SignOut();
            try { 
            throw new ArgumentNullException("Exception");   
            //return RedirectToAction("Index", "Member");
        } catch (Exception e)  { 
                jsonData.Add("success", false);
                jsonData.Add("errmsg", "SessionOut");
                return Json(jsonData, JsonRequestBehavior.AllowGet);
    }
}




        // 로그인 사용자 정보
        public ActionResult userInfo() {

            if (Request.QueryString["user_cd"] != null) {

                Hashtable hash = new Hashtable();
                hash.Add("user_cd", Request.QueryString["user_cd"]);  // user_cd : 사용자ID
                
                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("userInfo", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }

        // 사용자별 다국어 정보
        public ActionResult langDecode() {
            ISqlMapper mapper = null;
            mapper = Mapper.Instance();
            Hashtable jsonData = new Hashtable();
            try {
                Hashtable hash = new Hashtable();
                string lang = User.Identity.Name.Split('|')[3];
                if (!Request["language"].nullToStr().Equals("")) lang = Request["language"].nullToStr();
                hash.Add("language", lang);
                hash.Add("base_item", Request["base_item"].nullToStr());
                IEnumerable<Hashtable> lang_data = mapper.QueryForList<Hashtable>("LangDecode", hash);

                jsonData.Add("success", true);
                jsonData.Add("lang_data", lang_data);
                return Json(jsonData, JsonRequestBehavior.AllowGet);  
            } catch (Exception e)  {
                logger.Info(e.Message);
                jsonData.Add("success", false);
                jsonData.Add("errmsg", e.Message);
                return Json(jsonData, JsonRequestBehavior.AllowGet);
            }



        }
        // 사용자별 테마등록
        public ActionResult upTheme()
        {
            ISqlMapper mapper = null;
            mapper = Mapper.Instance();
            Hashtable jsonData = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();
                hash["company_cd"]= User.Identity.Name.Split('|')[2];      // company_cd 
                hash["user_cd"] = User.Identity.Name.Split('|')[0];
                hash["theme"] = Request["theme"].nullToStr();
                mapper.Update("updateTheme", hash);  
                jsonData.Add("success", true); 
                return Json(jsonData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                logger.Info(e.Message);
                jsonData.Add("success", false);
                jsonData.Add("errmsg", e.Message);
                return Json(jsonData, JsonRequestBehavior.AllowGet);
            }
        }

        // (구)연우서버 로그인 연동
        public ActionResult YSNSSO() {
            
            if (User.Identity.IsAuthenticated) {

                Hashtable hash = new Hashtable();
                hash.Add("user_cd", User.Identity.Name.Split('|')[0]);  // user_cd : 사용자ID

                ISqlMapper mapper = Mapper.Instance();
                Hashtable login_data = mapper.QueryForObject<Hashtable>("userInfo", hash);

                EncyptUtil enc = new EncyptUtil();

                string user_cd = login_data["USER_CD"].ToString();
                string pass_wd = enc.AESDecrypt256(login_data["PASSWD"].ToString());

                string form_action = "";
                if (Request.ServerVariables["LOCAL_ADDR"].Equals("192.168.211.23") 
                    || Request.ServerVariables["LOCAL_ADDR"].Equals("222.100.204.205") 
                    || Request.ServerVariables["SERVER_NAME"].Equals("ysn.yonwookorea.com")) {
                    form_action = "http://ysn.yonwookorea.com/login/loginProcess.do";
                } else {
                    form_action = "http://localhost:8080/login/loginProcess.do";
                }

                string form = "<form  name='loginForm' id='loginForm' method='post'>"
                 + "  <input type='hidden' name='user_cd' value='" + user_cd + "' />"
                 + "  <input type='hidden' name='pass_wd' value='" + pass_wd + "' />"
                 + "</form>"
                 + "<script>"
                 //+ "    var gsWin = window.open('about:blank', 'preYonWoo');        "
                 + "    var frm = document.getElementById('loginForm');             "
                 + "    frm.action = '"+ form_action + "';                          "
                 //+ "    frm.target = 'preYonWoo';                                   "
                 + "    frm.submit();                                               "
                 + "</script>                                                       ";

                return Content(form);

            } else {
                return new EmptyResult();
            }

        }





        // 패스워드 변경
        [HttpPost]
        [Authorize(Roles = "User,Admin")]
        public ActionResult PasswdChange(string current_pw, string change_pw) {


            ISqlMapper mapper = null;


            if (current_pw != null && change_pw != null ) {
                mapper = Mapper.Instance();
                Hashtable jsonData = new Hashtable();

                try {
                    // 패스워드 2개 비교 
                   // if (change_pw.Equals(change_pw_check)) {

                        EncyptUtil enc = new EncyptUtil();
                        Hashtable hash = new Hashtable();
                        hash["user_cd"] = User.Identity.Name.Split('|')[0];
                        hash["pass_wd"] = enc.AESEncrypt256(current_pw);
                        hash["use_yn"] = "Y";

                        // 현재 패스워드 체크
                        Hashtable list = mapper.QueryForObject<Hashtable>("loginCheck", hash);

                        if (list != null && list.Count != 0) {


                            // 패스워드 변경
                            hash["user_cd"] = User.Identity.Name.Split('|')[0];
                            hash["pass_wd"] = enc.AESEncrypt256(change_pw);

                            mapper.BeginTransaction();
                            mapper.Update("changeUserPasswd", hash);
                            mapper.CommitTransaction();

                            jsonData.Add("success", true);
                            return Json(jsonData, JsonRequestBehavior.AllowGet);


                        } else {

                            jsonData.Add("success", false);
                            jsonData.Add("errmsg", "현재 패스워드가 다릅니다.");
                            return Json(jsonData, JsonRequestBehavior.AllowGet);
                        }

                  /*  }else {
                        jsonData.Add("success", false);
                        jsonData.Add("errmsg", "변경 패스워드를 2번 동일하게 입력해주세요.");
                        return Json(jsonData, JsonRequestBehavior.AllowGet);

                    } */

                } catch (DataMapperException e) {
                    logger.Info(e.Message);
                    jsonData.Add("success", false);
                    jsonData.Add("errmsg", e.Message);
                    return Json(jsonData, JsonRequestBehavior.AllowGet);

                } catch (Exception e) {
                    if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                    logger.Info(e.Message);
                    jsonData.Add("success", false);
                    jsonData.Add("errmsg", e.Message);
                    return Json(jsonData, JsonRequestBehavior.AllowGet);
                }





            } else {
                return new EmptyResult();
            }

        }










    }
}
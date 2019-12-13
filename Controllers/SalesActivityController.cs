using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Exceptions;
using log4net.Repository.Hierarchy;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YSN2017.ComLIB;

namespace YSN2017.Controllers{

    [Authorize(Roles = "User,Admin")]
    public class SalesActivityController : Controller    {

        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);



        // 영업활동 일정관리 : 거래처 셀렉트 박스  /SalesActivity/custList
        public ActionResult custList() {

            String user_cd = Request.QueryString["user_cd"] ==null?"": Request.QueryString["user_cd"];

            if (!String.IsNullOrEmpty(user_cd)) {

                Hashtable hash = new Hashtable();
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);     // 회사코드

                // 관리자 로그인시 거래처 표시를 위하여 임시적용....
                if (!user_cd.Equals("Sysadmin") && !user_cd.Equals("16021601")) { 
                    hash.Add("user_cd", user_cd);          // 사용자 ID
                }

                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("custList", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }



        // 영업활동 일정관리 : 거래처 리스트
        public ActionResult getCustGrid() {

            if (Request.QueryString["user_cd"] != null) {

                Hashtable hash = new Hashtable();
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);     // 회사코드
                hash.Add("user_cd", Request.QueryString["user_cd"]);          // 사용자 ID
                hash.Add("cust_cd", Request.QueryString["cust_cd"]);          // 거래처PK

                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("getCustGrid", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }




        // 영업활동 일정관리 : 프로젝트 리스트
        public ActionResult getProjectGrid() {

            if (Request.QueryString["user_cd"] != null) {

                Hashtable hash = new Hashtable();
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);     // 회사코드
                hash.Add("user_cd", Request.QueryString["user_cd"]);          // 사용자 ID
                hash.Add("cust_cd", Request.QueryString["cust_cd"]);          // 거래처PK

                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("getProjectGrid", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }


        

        // 영업활동 일정관리 : 월간 활동 내역
        public ActionResult getMonthSalesActivityInfo() {

            if (Request.QueryString["user_cd"] != null) {

                Hashtable hash = new Hashtable();
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);     // 회사코드
                hash.Add("user_cd", Request.QueryString["user_cd"]);          // 사용자 ID
                hash.Add("search_ym", Request.QueryString["search_ym"]);      // 거래처PK

                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("getMonthSalesActivityInfo", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }




        // 영업활동 일정관리 : 캘린더 데이터 
        public ActionResult calCustDataList() {

            if (Request.QueryString["user_cd"] != null) {

                Hashtable hash = new Hashtable();
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);     // 회사코드
                hash.Add("user_cd", Request.QueryString["user_cd"]);          // 사용자 ID
              
                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("calCustDataList", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }




        // 영업활동 일정관리 : 업무보고/비계획실적 내용 팝업
        public ActionResult popupSalesActivityDetail() {

            if (Request.QueryString["sa_cd"] != null) {

                Hashtable hash = new Hashtable();
                hash.Add("language", User.Identity.Name.Split('|')[3]);     // 기본언어
                hash.Add("sa_cd", Request.QueryString["sa_cd"]);            // 일정관리PK

                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("popupSalesActivityDetail", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }





        // 영업활동 일정관리 : 업무보고 등록
        [HttpPost]
        public ActionResult salesActivityReportSave() {

            ISqlMapper mapper = null;


            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();



                mapper = Mapper.Instance();

                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);                   // company_cd


        

                if (String.IsNullOrEmpty(Request.Form["sa_cd"])){
                    Hashtable h_sacd = mapper.QueryForObject<Hashtable>("getSaCd", null);
                    hash.Add("sa_cd", h_sacd["sa_cd"].ToString());
                } else {
                    hash.Add("sa_cd", Request.Form["sa_cd"].notNullTrim());
                }                     

                    hash.Add("sa_type", "SATYPE_100");                                          // sa_type          : 활동유형 코드
                    hash.Add("user_cd", User.Identity.Name.Split('|')[0]);                      // user_cd          : 담당(사원)ID
                    hash.Add("dept_cd", User.Identity.Name.Split('|')[4]);                      // dept_cd          : 담당 부서
                    hash.Add("sa_sdate", Request.Form["sa_sdate"].notNullTrim());               // sa_sdate         : 업무일자 시작
                    hash.Add("sa_edate", Request.Form["sa_edate"].notNullTrim());               // sa_edate         : 업무일자 종료
                    hash.Add("sa_sdate_time", Request.Form["sa_sdate_time"].notNullTrim());     // sa_sdate_time    : 업무시간 시작
                    hash.Add("sa_edate_time", Request.Form["sa_edate_time"].notNullTrim());     // sa_edate_time    : 업무시간 종료
                    hash.Add("cust_cd", "");                                                    // cust_cd          : 거래처 코드
                    hash.Add("pjt_cd", "");                                                     // pjt_cd           : 프로젝트코드
                    hash.Add("sa_subject", Request.Form["sa_subject"].notNullTrim());           // sa_subject       : 제목
                    hash.Add("sa_body", Request.Form["sa_body"].notNullTrim());                 // sa_body          : 업무내용
                    hash.Add("use_yn", "Y");                                                    // use_yn           : 사용여부
                    hash.Add("reg_usr", User.Identity.Name.Split('|')[0]);                      // reg_usr          : 등록자ID
                    hash.Add("mod_usr", User.Identity.Name.Split('|')[0]);                      // mod_usr          : 수정자ID
                    hash.Add("plan_yn", "N");                                                   // plan_yn          : 계획여부
                    hash.Add("cmt_yn", "N");                                                    // cmt_yn           : 코멘트 대상여부


                    mapper = Mapper.Instance();
                    mapper.BeginTransaction();
                    mapper.Insert("salesActivitySave", hash);
                    mapper.CommitTransaction();




                /*


                if (String.IsNullOrEmpty(Request.QueryString["sa_cd"])) {
                        Hashtable h_sacd = mapper.QueryForObject<Hashtable>("getSaCd", null);
                        hash.Add("sa_cd", h_sacd["sa_cd"].ToString());
                    } else {
                        hash.Add("sa_cd", Request.QueryString["sa_cd"].notNullTrim());
                    }

                    hash.Add("sa_type", "SATYPE_100");                                          // sa_type          : 활동유형 코드
                    hash.Add("user_cd", User.Identity.Name.Split('|')[0]);                      // user_cd          : 담당(사원)ID
                    hash.Add("dept_cd", "83");                                                  // dept_cd          : 담당 부서
                    hash.Add("sa_sdate", "2017-03-22");                                         // sa_sdate         : 업무일자 시작
                    hash.Add("sa_edate", "2017-03-22");                                         // sa_edate         : 업무일자 종료
                    hash.Add("cust_cd", "");                                                    // cust_cd          : 거래처 코드
                    hash.Add("pjt_cd", "");                                                     // pjt_cd           : 프로젝트코드
                    hash.Add("sa_subject", Request.QueryString["sa_subject"].notNullTrim());    // sa_subject       : 제목
                    hash.Add("sa_body", "결과sdfsdfsdfsd1111");                                 // sa_body          : 업무내용
                    hash.Add("use_yn", "Y");                                                    // use_yn           : 사용여부
                    hash.Add("reg_usr", User.Identity.Name.Split('|')[0]);                      // reg_usr          : 등록자ID
                    hash.Add("mod_usr", User.Identity.Name.Split('|')[0]);                      // mod_usr          : 수정자ID
                    hash.Add("plan_yn", "N");                                                   // plan_yn          : 계획여부
                    hash.Add("cmt_yn", "N");                                                    // cmt_yn           : 코멘트 대상여부


                    mapper = Mapper.Instance();
                    mapper.BeginTransaction();
                    mapper.Insert("salesActivitySave", hash);
                    mapper.CommitTransaction();


                 */


                    result.Add("success", true);
                    var jsonResult = Json("success", JsonRequestBehavior.AllowGet);
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










        // 영업활동 일정관리 : 비계획실적 등록
        [HttpPost]
        public ActionResult salesActivitySave() {

            ISqlMapper mapper = null;



            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();


                mapper = Mapper.Instance();


                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);                   // company_cd



             

                         if (String.IsNullOrEmpty(Request.Form["sa_cd"])) {
                             Hashtable h_sacd = mapper.QueryForObject<Hashtable>("getSaCd", null);
                             hash.Add("sa_cd", h_sacd["SA_CD"].ToString());
                         } else {
                             hash.Add("sa_cd", Request.Form["sa_cd"].notNullTrim());
                         }

                         hash.Add("sa_type", Request.Form["sa_type"].notNullTrim());                 // sa_type          : 활동유형 코드
                         hash.Add("sa_cnct", Request.Form["sa_cnct"].notNullTrim());                 // sa_cnct          : 접촉유형
                         hash.Add("user_cd", User.Identity.Name.Split('|')[0]);                      // user_cd          : 활동담당(사원)ID
                         hash.Add("dept_cd", User.Identity.Name.Split('|')[4]);                      // dept_cd          : 활동담당 이름
                         hash.Add("sa_sdate", Request.Form["sa_sdate"].notNullTrim());               // sa_sdate         : 활동일자(년월일) 시작
                         hash.Add("sa_edate", Request.Form["sa_edate"].notNullTrim());               // sa_edate         : 활동일자(년월일) 종료
                         hash.Add("sa_sdate_time", Request.Form["sa_sdate_time"].notNullTrim());     // sa_sdate_time    : 활동시간(시분초) 시작
                         hash.Add("sa_edate_time", Request.Form["sa_edate_time"].notNullTrim());     // sa_edate_time    : 활동시간(시분초) 종료
                         hash.Add("cust_cd", Request.Form["cust_cd"].notNullTrim());                 // cust_cd          : 거래처 코드
                         hash.Add("pjt_cd", Request.Form["pjt_cd"].notNullTrim());                   // pjt_cd           : 프로젝트코드
                         hash.Add("sa_subject", Request.Form["sa_subject"].notNullTrim());           // sa_subject       : 활동제목
                         hash.Add("sa_body", Request.Form["sa_body"].notNullTrim());                 // sa_body          : 활동 결과
                         hash.Add("next_sa_sdate", Request.Form["next_sa_sdate"].notNullTrim());     // next_sa_sdate    : 
                         hash.Add("next_sa_edate", Request.Form["next_sa_edate"].notNullTrim());     // next_sa_edate    : 
                         hash.Add("next_sa_target", Request.Form["next_sa_target"].notNullTrim());   // next_sa_target   : 
                         hash.Add("next_sa_subject", Request.Form["next_sa_subject"].notNullTrim()); // next_sa_subject  : 
                         hash.Add("use_yn", Request["use_yn"] == null ? "Y" : Request["use_yn"] );   // use_yn           : 사용여부
                         hash.Add("reg_usr", User.Identity.Name.Split('|')[0]);                      // reg_usr          : 등록자ID
                         hash.Add("mod_usr", User.Identity.Name.Split('|')[0]);                      // mod_usr          : 수정자ID
                         hash.Add("plan_yn", Request["plan_yn"] == null ? "N" : Request["plan_yn"] ); // plan_yn          : 계획여부
                         hash.Add("cmt_yn", Request["cmt_yn"] == null ? "N" : Request["cmt_yn"] );   // cmt_yn           : 코멘트 대상여부
                         hash.Add("sa_comment", Request.Form["sa_comment"].notNullTrim());           // sa_comment       : 관리자 코멘트
                         



                         mapper.BeginTransaction();
                         mapper.Insert("salesActivitySave", hash);


                         // Key Factor 저장
                         String[] sa_target = Request.Form.GetValues("sa_target");
                         if (sa_target != null && sa_target.Length > 0) {

                             mapper.Delete("saTargetDelete", hash);  // 기존 Key Factor 삭제
                             for (int i = 0; i < sa_target.Length; i++) {
                                 hash["sa_target"] = sa_target[i].nullToStr();
                                 hash["sa_result"] = "Y";
                                 hash["sa_descript"] = "";

                                 mapper.Insert("saTargetSave", hash);
                             }
                         }



                        // KeyMan 저장
                        String km_cd = Request.Form["km_cds"].nullToStr();
                        if (!km_cd.Equals("")) {
                            mapper.Delete("saKeymanDelete", hash);  // 기존 KeyMan 삭제
                            if (km_cd.IndexOf(",") == -1) {
                                hash["km_cd"] = km_cd;
                                mapper.Insert("saKeymanSave", hash);
                        
                            } else {
                                String[] km_cds = km_cd.Split(',');
                                for (int i = 0; i < km_cds.Length; i++) {
                                    hash["km_cd"] = km_cds[i];
                                    mapper.Insert("saKeymanSave", hash);
                                }
                            }
                        }



                        // 협업 공유자 저장
                        String publicUserCd = Request.Form["user_cds"].nullToStr();
                        if (!publicUserCd.Equals("")) {

                            mapper.Delete("saCwuserDel", hash);  // 기존 협업공유자 삭제
                            if (publicUserCd.IndexOf(",") == -1) {
                                hash["user_cd"] = publicUserCd;
                                mapper.Insert("saCwuserSave", hash);

                            } else {
                                String[] publicUserCds = publicUserCd.Split(',');
                                for (int i = 0; i < publicUserCds.Length; i++) {
                                    hash["user_cd"] = publicUserCds[i];
                                    mapper.Insert("saCwuserSave", hash);
                                }
                            }
                        }


                        // 첨부파일 업로드
                        string[] file_name = Request.Form.GetValues("file_name");
                        string[] del_file = Request.Form.GetValues("del_file");
                        string[] file_mode = Request.Form.GetValues("file_mode");
                        string[] file_code = Request.Form.GetValues("file_code");
                        string[] doc_mgt = Request.Form.GetValues("doc_mgt");
                
                        if (file_name != null) {

                            Hashtable upload_data = new Hashtable();

                            upload_data["smr_cd"] = hash["sa_cd"].ToString();
                            upload_data["smr_chasu"] = 0;
                            upload_data["user_cd"] = User.Identity.Name.Split('|')[0];
                            upload_data["company_cd"] = User.Identity.Name.Split('|')[2];
                            upload_data["language"] = User.Identity.Name.Split('|')[3];

                            var fu = new FileUpload();

                            fu.UploadFileModel(upload_data, file_name, del_file, file_mode, file_code, doc_mgt);

                        }









                mapper.CommitTransaction();



                /*

                                 if (String.IsNullOrEmpty(Request.QueryString["sa_cd"])) {
                                         Hashtable h_sacd = mapper.QueryForObject<Hashtable>("getSaCd", null);
                                         hash.Add("sa_cd", h_sacd["SA_CD"].ToString());
                                     } else {
                                         hash.Add("sa_cd", Request.QueryString["sa_cd"].notNullTrim());
                                     }

                                     hash.Add("sa_type", "SATYPE_100");                                                  // sa_type          : 활동유형 코드
                                     hash.Add("sa_cnct", "SACNT_200");                                                   // sa_cnct          : 접촉유형
                                     hash.Add("user_cd", User.Identity.Name.Split('|')[0]);                              // user_cd          : 활동담당(사원)ID
                                     hash.Add("dept_cd", "83");                                                          // dept_cd          : 활동담당 이름
                                     hash.Add("sa_sdate", "2017-03-22");                                                 // sa_sdate         : 활동일자 시작
                                     hash.Add("sa_edate", "2017-03-22");                                                 // sa_edate         : 활동일자 종료
                                     hash.Add("cust_cd", "112");                                                         // cust_cd          : 거래처 코드
                                     hash.Add("pjt_cd", Request.QueryString["pjt_cd"].notNullTrim());                    // pjt_cd           : 프로젝트코드
                                     hash.Add("sa_subject", Request.QueryString["sa_subject"].notNullTrim());            // sa_subject       : 활동제목
                                     hash.Add("sa_body", "결과sdfsdfsdfsd1111");                                         // sa_body          : 활동 결과
                                     hash.Add("next_sa_sdate", Request.QueryString["next_sa_sdate"].notNullTrim());      // next_sa_sdate    : 
                                     hash.Add("next_sa_edate", Request.QueryString["next_sa_edate"].notNullTrim());      // next_sa_edate    : 
                                     hash.Add("next_sa_target", Request.QueryString["next_sa_target"].notNullTrim());    // next_sa_target   : 
                                     hash.Add("next_sa_subject", Request.QueryString["next_sa_subject"].notNullTrim());  // next_sa_subject  : 
                                     hash.Add("use_yn", "Y");                                                            // use_yn           : 사용여부
                                     hash.Add("reg_usr", User.Identity.Name.Split('|')[0]);                              // reg_usr          : 등록자ID
                                     hash.Add("plan_yn", "N");                                                           // plan_yn          : 계획여부
                                     hash.Add("cmt_yn", "N");                                                            // cmt_yn           : 코멘트 대상여부
                                     hash.Add("sa_comment", "관리자 코멘트");            // sa_comment       : 관리자 코멘트


                                     mapper.BeginTransaction();
                                     mapper.Insert("salesActivitySave", hash);


                                     // Key Factor 저장
                                     String[] sa_target = Request.QueryString.GetValues("sa_target");
                                     mapper.Delete("saTargetDelete", hash);  // 기존 Key Factor 삭제
                                     if (sa_target != null && sa_target.Length > 0) {
                                         for (int i = 0; i < sa_target.Length; i++) {
                                             hash["sa_target"] = sa_target[i].notNullTrim();
                                             hash["sa_result"] = "Y";
                                             hash["sa_descript"] = "";

                                             mapper.Insert("saTargetSave", hash);
                                         }
                                     }

                                     // 협업 공유자 저장
                                     String publicUserCd = "16021601,15112402,13032503";
                                     if (!publicUserCd.Equals("")) {
                                             mapper.Delete("saCwuserDel", hash);  // 기존 협업공유자 삭제
                                         if (publicUserCd.IndexOf(",") == -1) {
                                             hash["user_cd"] = publicUserCd;
                                             mapper.Insert("saCwuserSave", hash);

                                         } else {
                                             String[] publicUserCds = publicUserCd.Split(',');
                                             for (int i = 0; i < publicUserCds.Length; i++) {
                                                 hash["user_cd"] = publicUserCds[i];
                                                 mapper.Insert("saCwuserSave", hash);
                                             }
                                         }
                                     }


                                     mapper.CommitTransaction();


                               */


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







        // 영업활동 일정관리 : 비계획실적 삭제 use_yn='N' 처리
        [HttpPost]
        public ActionResult salesActivityDelete() {

            ISqlMapper mapper = null;

            if(Request["sa_cd"] != null) { 

                Hashtable result = new Hashtable();
                try {
                    Hashtable hash = new Hashtable();
                    mapper = Mapper.Instance();

                    hash.Add("company_cd", User.Identity.Name.Split('|')[2]);                   // company_cd
                    hash.Add("sa_cd", Request["sa_cd"].notNullTrim());


                    mapper.BeginTransaction();
                    mapper.Update("salesActivityDelete", hash);
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

            }else {
                return new EmptyResult();
            }

        }











        // 영업활동 현황 : 검색 리스트
        public ActionResult salesActivityStatusList() {

            if (Request.QueryString["sa_edate"] != null) {

                Hashtable hash = new Hashtable();
                hash.Add("language", User.Identity.Name.Split('|')[3]);     // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);   // 회사코드
                hash.Add("bizGroup", Request["bizGroup"]);                  // bizGroup  : 상위 매출조직
                hash.Add("deptGroup", Request["deptGroup"]);                // deptGroup  : 매출조직
                hash.Add("user_cd", Request["user_cd"]);                    // user_cd  : 영업담당ID
                hash.Add("sa_type", Request["sa_type"]);                    // sa_type  : 활동유형
                hash.Add("sa_edate", Request["sa_edate"]);                  // sa_edate : 활동기간 시작
                hash.Add("sa_sdate", Request["sa_sdate"]);                  // sa_sdate : 활동기간 종료


                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("salesActivityStatusList", hash);


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




        // 영업활동 현황 : 활동 미등록 담당자 현황
        public ActionResult popupNonActivityUser() {

            if (Request.QueryString["sa_edate"] != null) {

                Hashtable hash = new Hashtable();
                hash.Add("sa_edate", Request.QueryString["sa_edate"]);      // sa_edate : 활동기간 시작
                hash.Add("sa_sdate", Request.QueryString["sa_sdate"]);      // sa_sdate : 활동기간 종료


                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("popupNonActivityUser", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }


        }



        // 영업활동 코멘트 관리 : 리스트
        public ActionResult salesActivityCommentList() {

            if (Request.QueryString["sa_edate"] != null) {

                Hashtable hash = new Hashtable();
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);   // 회사코드

                hash.Add("sa_sdate", Request["sa_sdate"].nullToStr().Substring(0, 10));    // sa_sdate : 활동일자 시작
                hash.Add("sa_edate", Request["sa_edate"].nullToStr().Substring(0, 10));    // sa_edate : 활동일자 종료

                hash.Add("deptGroup", Request["deptGroup"]);  // deptGroup : 매출조직
                hash.Add("bizGroup", Request["bizGroup"]);    // bizGroup : 매출조직 상위부서

                hash.Add("user_cd", Request["user_cd"]);      // user_cd : 영업담당
                hash.Add("cust_cd", Request["cust_cd"]);      // cust_cd : 거래처
                hash.Add("sa_mgr", Request["sa_mgr"]);        // sa_mgr : 관리자
                hash.Add("cmt_yn", Request["cmt_yn"]);        // cmt_yn : 코멘트 등록



                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("salesActivityCommentList", hash);


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

        



        // 영영업활동 모니터링 : 검색 리스트
        public ActionResult salesActiveMonitoringList() {

            if (Request.QueryString["base_ym"] != null) {

                Hashtable hash = new Hashtable();
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);   // 회사코드
                hash.Add("sa_type", Request.QueryString["sa_type"]);        // sa_type      : 활동유형
                hash.Add("deptGroup", Request.QueryString["deptGroup"]);    // deptGroup    : 매출조직
                hash.Add("bizGroup", Request.QueryString["bizGroup"]);      // bizGroup     : 매출조직 상위부서
                hash.Add("user_cd", Request.QueryString["user_cd"]);        // user_cd      : 영업담당ID
                hash.Add("base_ym", Request.QueryString["base_ym"]);        // base_ym      : 활동년월(yyyymm)


                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("salesActiveMonitoringList", hash);


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




        // 업무보고 현황 : 리스트
        public ActionResult salesActivityWorkList() {

            if (Request.QueryString["sa_edate"] != null) {

                Hashtable hash = new Hashtable();
                hash.Add("language", User.Identity.Name.Split('|')[3]);     // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);   // 회사코드

                hash.Add("deptGroup", Request["deptGroup"]);    // deptGroup    : 매출조직
                hash.Add("bizGroup", Request["bizGroup"]);      // bizGroup     : 매출조직 상위부서
                hash.Add("user_cd", Request["user_cd"]);        // user_cd      : 영업담당

                hash.Add("sa_sdate", Request["sa_sdate"].nullToStr().Substring(0, 10));      // sa_sdate     : 활동일자 시작
                hash.Add("sa_edate", Request["sa_edate"].nullToStr().Substring(0, 10));      // sa_edate     : 활동일자 종료




                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("salesActivityWorkList", hash);


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






    }
}
 
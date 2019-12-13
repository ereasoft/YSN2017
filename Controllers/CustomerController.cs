using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Exceptions;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YSN2017.ComLIB;
using YSN2017.Models;

// 고객정보 DB

namespace YonWooCRM.Controllers{

    [Authorize(Roles = "User,Admin")]
    public class CustomerController : Controller{
        
        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        // 거래처 리스트
        public ActionResult customerList(FormCollection param){

            // String company_cd = col["company_cd"];
 
            Hashtable hash = new Hashtable();
            //hash.Add("company_cd", User.Identity.Name.Split('|')[2]);    
            hash.Add("language", User.Identity.Name.Split('|')[3]);     //
            hash.Add("company_cd", User.Identity.Name.Split('|')[2]);    

            hash.Add("deptGroup", Request.QueryString["deptGroup"]);    // 매출조직
            hash.Add("bizGroup", Request.QueryString["bizGroup"]);      // 매출조직 상위부서
            hash.Add("user_cd", Request.QueryString["user_cd"]);        // 영업담당자ID
       //     hash.Add("user_nm", Request.QueryString["user_nm"]);        // 영업담당자명
            hash.Add("cust_type", Request.QueryString["cust_type"]);    // (사용안함)
            hash.Add("dmos_cd", Request.QueryString["dmos_cd"]);        // 국내 / 해외
            hash.Add("cust_cd", Request.QueryString["cust_cd"]);        // 거래처PK
            hash.Add("cust_nm", Request.QueryString["cust_nm"]);        // 거래처명
            hash.Add("nat_cd", Request.QueryString["nat_cd"]);          // 국가정보
            hash.Add("cust_grade", Request.QueryString["cust_grade"]);  // 신용등급
            hash.Add("trms_pay", Request.QueryString["trms_pay"]);      // 결제조건
            hash.Add("use_yn", Request.QueryString["use_yn"]);          // 활동여부



            ISqlMapper mapper =  Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("customerList", hash);

           
            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;


        }




        // 거래처 상세
        public ActionResult customerDetail() {

  
            if(Request.QueryString["cust_cd"] != null) { 

                Hashtable hash = new Hashtable();
                //hash.Add("language", User.Identity.Name.Split('|')[3]);     // 
                hash.Add("language", User.Identity.Name.Split('|')[3]);     // 

                
                hash.Add("cust_cd", Request.QueryString["cust_cd"]);                    // T_CUSTOMER.cust_cd    

                ISqlMapper mapper = Mapper.Instance();
                Hashtable list = mapper.QueryForObject<Hashtable>("customerDetail", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }else {
                return new EmptyResult();
            }

        }



        // 거래처 상세 하단 : 고객담당(Keyman)
        public ActionResult sectCustKeymanList() {


            if (Request.QueryString["cust_cd"] != null) {

                Hashtable hash = new Hashtable();
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);     // 
                hash.Add("cust_cd", Request.QueryString["cust_cd"]);                    // T_CUSTOMER.cust_cd

                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("sectCustKeymanList", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }




        // 거래처 상세 하단 : 활동현황
        public ActionResult selectCustPlayList(FormCollection param) {

            if (Request.QueryString["cust_cd"] != null) {

                Hashtable hash = new Hashtable();
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);    // 확인필요
                hash.Add("cust_cd", Request.QueryString["cust_cd"]);  // T_CUSTOMER.cust_cd

                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("selectCustPlayList", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }


        


        // 거래처 상세 하단 : 프로젝트
        public ActionResult selectCustProjectList(FormCollection param) {

            if (Request.QueryString["cust_cd"] != null) {

                Hashtable hash = new Hashtable();
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);    // 확인필요
                hash.Add("cust_cd", Request.QueryString["cust_cd"]);  // T_CUSTOMER.cust_cd

                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("selectCustProjectList", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }


        

        // 거래처 상세 하단 :  E-mail송수신
        public ActionResult selectCustEmailList(FormCollection param) {

            if (Request.QueryString["cust_cd"] != null) {

                Hashtable hash = new Hashtable();
                hash.Add("cust_cd", Request.QueryString["cust_cd"]);  // T_CUSTOMER.cust_cd
                //hash.Add("cust_cd", Request.QueryString["cust_cd"]);

                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("selectCustEmailList", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }



        // 거래처 상세 하단 :  E-mail송수신 상세
        public ActionResult getCustEmailContent(FormCollection param) {

            if (Request.QueryString["email_cd"] != null) {

                Hashtable hash = new Hashtable();
                hash.Add("email_cd", Request.QueryString["email_cd"]);  // 이메일PK
                //hash.Add("cust_cd", Request.QueryString["cust_cd"]);

                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("getCustEmailContent", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }



        // 거래처 상세 : 저장
        [HttpPost]
        public ActionResult updateCustomer() {

            ISqlMapper mapper = null;

            if (Request.Form["cust_cd"] != null) {
                Hashtable result = new Hashtable();
                try {
                    Hashtable hash = new Hashtable();
                    hash.Add("mod_usr", Request.Form["mod_usr"]);         // 수정자ID
                    hash.Add("user_cd", Request.Form["user_cd"]);         // 영업담당ID
                    hash.Add("dept_cd", Request.Form["dept_cd"]);         // 부서코드
                    hash.Add("nat_cd",  Request.Form["nat_cd"]);          // 국가정보
                    hash.Add("base_crncy", Request.Form["base_crncy"]);   // 기준통화
                    hash.Add("cust_grade", Request.Form["cust_grade"]);   // 신용등급
                    hash.Add("home_page", Request.Form["home_page"]);     // 홈페이지
                    hash.Add("trms_pay", Request.Form["trms_pay"]);       // 결제조건
                    hash.Add("use_yn",  Request.Form["use_yn"]);          // 활동여부
                    hash.Add("cust_cd", Request.Form["cust_cd"]);         // 거래처PK

                    // Preparing: UPDATE T_CUSTOMER SET MOD_DT = getdate() ,MOD_USR = ? ,USER_CD = ? ,DEPT_CD = ? ,NAT_CD = ? ,BASE_CRNY = ? ,CUST_GRADE = ? ,HOME_PAGE = ? ,TRMS_PAY = ? ,USE_YN = ? WHERE CUST_CD = ? 
                    // Parameters: 16021601(String), 10111701(String), 225(String), KOR(String), KRW(String), CSTGRD_300(String), aaa @bbb.com vvv(String), TRMPAY_200(String), Y(String), 2781(String)

                    mapper = Mapper.Instance();
                    mapper.BeginTransaction();
                    mapper.Update("updateCustomer", hash);
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

            } else {
                return new EmptyResult();
            }


        }



    }
}

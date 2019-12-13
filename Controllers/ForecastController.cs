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
    public class ForecastController : Controller    {


        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);


        // 기회 및 수주관리 : 사업전망 관리 - 리스트 /Forecast/forecastList
        public ActionResult forecastList() {

            if ( Request["sdate"] != null && Request["edate"] != null) {

                Hashtable hash = new Hashtable();

                hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드


                hash.Add("deptGroup", Request["deptGroup"]);        // deptGroup    : 매출조직
                hash.Add("bizGroup", Request["bizGroup"]);          // bizGroup     : 매출조직 상위부서
                hash.Add("dstr_type", Request["dstr_type"]);        // dstr_type    : 유통구조
                hash.Add("user_cd", Request["user_cd"]);            // user_cd      : 영업담당ID
                hash.Add("sdate", Request["sdate"]);                // sdate        : 수주예정일 시작
                hash.Add("edate", Request["edate"]);                // edate        : 수주예정일 종료
                hash.Add("cust_cd", Request["cust_cd"]);            // user_cd      : 거래처 코드 
                hash.Add("biz_type", Request["biz_type"]);          // biz_type     : 사업유형
                hash.Add("oppt_type", Request["oppt_type"]);        // oppt_type    : 기회유형
                hash.Add("oppt_status", Request["oppt_status"]);    // oppt_status  : 진행상태
                hash.Add("euser_cd", Request["euser_cd"]);          // euser_cd     : 마지막사용자id
                hash.Add("item_type", Request["item_type"]);        // item_type    : 품목유형
                hash.Add("wso_psblt", Request["wso_psblt"]);        // wso_psblt    : 수주가능성
                hash.Add("bcust_cd", Request["bcust_cd"]);          // bcust_cd     : 매출처
                hash.Add("pjt_cd", Request["pjt_cd"]);              // pjt_cd       : 프로젝트
                hash.Add("cnfm_yn", Request["cnfm_yn"]);            // cnfm_yn      : 확정여부

                hash.Add("base_y", Request["base_y"]);            // base_y         : 전망 년
                hash.Add("base_m", Request["base_m"]);            // base_m         : 전말 월



                /////////////////////////
                hash.Add("rfc_cd", Request["smp_cd"]);              // pjt_cd       : 프로젝트
                hash.Add("item_nm", Request["item_nm"]);              // pjt_cd       : 프로젝트 





                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("forecastList", hash);


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






        // 기회 및 수주관리 : 사업전망 관리 - 상세 /Forecast/forecastDetail
        public ActionResult forecastDetail() {

            if (Request["oppt_cd"] != null ) {

                Hashtable hash = new Hashtable(); 

                hash.Add("language", User.Identity.Name.Split('|')[3]);     // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);   // 회사코드

                hash.Add("oppt_cd", Request["oppt_cd"]);          // oppt_cd      사업기회관리PK ( T_OPPORTUNITY )
                
                hash.Add("cnfm_yn", Request["cnfm_yn"]);            // cnfm_yn      : 확정여부
                hash.Add("sdate", Request["sdate"]);                // sdate        : 수주예정일 시작
                hash.Add("edate", Request["edate"]);                // edate        : 수주예정일 종료
                hash.Add("base_ym", Request["base_ym"]);


                ISqlMapper mapper = Mapper.Instance();


                IEnumerable list = mapper.QueryForObject<IEnumerable>("forecastDetail", hash);

               
                IEnumerable<Hashtable> item_list = mapper.QueryForList<Hashtable>("getOpportunityItemList", hash);
                Hashtable jsonData = new Hashtable();

                jsonData.Add("LIST", list);
                jsonData.Add("ITEM_LIST", item_list);


                var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }






        //  기회 및 수주관리 : 사업전망 관리 - 전망확정 /Forecast/forecastSave
        [HttpPost]
        public ActionResult forecastSave() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();


                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
                hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID

                hash["oppt_cd"] = Request["oppt_cd"].nullToStr();           // oppt_cd       : 사업기회관리PK ( T_OPPORTUNITY ) 
                hash["base_ym"] = Request["base_ym"].nullToStr();           // base_ym       : 기준년월 

                hash["item_cd"] = Request["item_cd"].nullToStr();                   // item_cd         : 아이템PK
                hash["oppt_item_cd"] = Request["oppt_item_cd"].nullToStr();         // oppt_item_cd    : 아이템 품목코드
                hash["oppt_status"] = Request["oppt_status"].nullToStr();           // oppt_status     : 진행상태
                hash["wso_pdate"] = Request["wso_pdate"].nullToStr();               // wso_pdate       : 로그인 사용자ID
                hash["wso_psblt"] = Request["wso_psblt"].nullToStr();               // wso_psblt       : 수주가능성
                hash["oppt_sales_date"] = Request["oppt_sales_date"].nullToStr();   // oppt_sales_date : 남품예정일

                hash["oppt_cd"] = Request["oppt_cd"].nullToStr();            // oppt_cd     : 사업기회관리PK ( T_OPPORTUNITY )
                hash["pjt_cd"] = Request["pjt_cd"].nullToStr();              // pjt_cd      : 프로젝트
                hash["oppt_type"] = Request["oppt_type"].nullToStr();        // oppt_type   : 기회유형
                hash["biz_type"] = Request["biz_type"].nullToStr();          // biz_type    : 사업유형
                hash["dstr_type"] = Request["dstr_type"].nullToStr();        // dstr_type   : 유통구조
                hash["cust_cd"] = Request["cust_cd"].nullToStr();            // cust_cd     : 거래처 코드
                hash["euser_cd"] = Request["euser_cd"].nullToStr();          // euser_cd    : 마지막사용자
                hash["user_cd"] = Request["user_cd"].nullToStr();            // user_cd     : 영업담당
                hash["dept_cd"] = Request["dept_cd"].nullToStr();            // dept_cd     : 매출조직
                hash["oppt_sumry"] = Request["oppt_sumry"].nullToStr();      // oppt_sumry  : 수주 내용
                hash["base_crny"] = Request["base_crny"].nullToStr();        // base_crny   : 통화

                hash["exch_rate"] = Request["exch_rate"] != null ? 0 : Convert.ToDecimal(Request["exch_rate"]);
                hash["exch_rate"] = Request["exch_rate"].nullToStr();        // exch_rate   : 기준통화 단위
                if (Request["rfc_cd"].Equals(""))
                {
                    hash["rfc_cd"] = null;
                }
                else
                {
                    hash["rfc_cd"] = Request["rfc_cd"];
                }
                if (Request["rfc_chasu"].Equals(""))
                {
                    hash["rfc_chasu"] = null;
                }
                else
                {
                    hash["rfc_chasu"] = Convert.ToInt32(Request["rfc_chasu"]);
                }    // rfc_chasu   : -- DB빈값

                mapper.BeginTransaction();


                mapper.Delete("forecastItemDel", hash);
                mapper.Insert("forecastItemSave", hash);
                mapper.Insert("opportunitySave", hash);
                mapper.Insert("forecastSave", hash);

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
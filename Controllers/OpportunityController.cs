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
    public class OpportunityController : Controller {


        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        // 기회 및 수주관리 : 사업기회 관리 - 리스트 /Opportunity/opportunityList
        public ActionResult opportunityList() {

           // if (Request["sdate"] != null && Request["edate"] != null) {

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
                hash.Add("end_user_cd", Request["end_user_cd"]);    // end_user_cd  : 마지막사용자id
                hash.Add("item_type", Request["item_type"]);        // item_type    : 품목유형
                hash.Add("wso_psblt", Request["wso_psblt"]);        // wso_psblt    : 수주가능성
                hash.Add("bcust_cd", Request["bcust_cd"]);          // bcust_cd     : 매출처
                hash.Add("rfc_cd", Request["smp_cd"]);              // pjt_cd       : 프로젝트
                hash.Add("item_nm", Request["item_nm"]);              // pjt_cd       : 프로젝트 


                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("opportunityList", hash);


                Hashtable jsonData = new Hashtable();
                jsonData.Add("COUNT", list.Count());
                jsonData.Add("LIST", list);


                var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

          /*  } else {
                return new EmptyResult();
            }*/

        }






        // 기회 및 수주관리 : 사업기회 관리 - 상세  /Opportunity/opportunityDetail
        public ActionResult opportunityDetail() {

            if (Request["oppt_cd"] != null) {

                Hashtable hash = new Hashtable();

                hash.Add("language", User.Identity.Name.Split('|')[3]);     // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);   // 회사코드

                hash.Add("oppt_cd", Request["oppt_cd"]);          // oppt_cd      사업기회관리PK ( T_OPPORTUNITY )



                ISqlMapper mapper = Mapper.Instance();
                IEnumerable list = mapper.QueryForObject<IEnumerable>("opportunityDetail", hash);

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







        // 기회 및 수주관리 : 사업기회 관리 - 기회품목코드로 기본정보 조회  /Opportunity/getSampleInfo
        public ActionResult getSampleInfo() {

            if (Request["smp_cd"] != null && Request["item_cd"] != null) {

                Hashtable hash = new Hashtable();

                hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드

                hash.Add("smp_cd", Request["smp_cd"]);                  // smp_cd    : 샘플PK
                hash.Add("item_cd", Request["item_cd"]);                // item_cd   : 아이템PK
                hash.Add("smp_chasu", Request["smp_chasu"]);            // smp_chasu : 샘플 차수


                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("getSampleInfo", hash);


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








        // 기회 및 수주관리 : 사업기회 관리 - 저장/수정 /SampleManage/opportunitySave
        [HttpPost]
        public ActionResult opportunitySave() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();


                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
                hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID

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
                hash["euser_nm"] = Request["euser_nm"].nullToStr();
                hash["user_cd"] = Request["user_cd"].nullToStr();            // user_cd     : 영업담당
                hash["dept_cd"] = Request["dept_cd"].nullToStr();            // dept_cd     : 매출조직
                hash["oppt_sumry"] = Request["oppt_sumry"].nullToStr();      // oppt_sumry  : 수주 내용
                hash["base_crny"] = Request["base_crny"] == "" ? null : Request["base_crny"].nullToStr();        // base_crny   : 통화
                
                //hash["exch_rate"] = Request["exch_rate"] != null ? 0 : double.Parse(Request["exch_rate"]);
                hash["exch_rate"] = Request["base_crny"] == "" ? null : Request["exch_rate"].nullToStr();        // exch_rate   : 기준통화 단위
                if (Request["rfc_cd"].Equals("")) {
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

                if (Request["oppt_cd"].nullToStr().Equals("")) {
                    Hashtable hsCd = mapper.QueryForObject<Hashtable>("getOpptCd", hash);
                    hash["oppt_cd"] = hsCd["OPPT_CD"].ToString();
                }


               // if (hash["oppt_type"].Equals("OPTP_200")) { // repeat 일 경우
               // }

                mapper.Insert("opportunitySave", hash);

                mapper.Delete("opptItemDel", hash);

                string[] oppt_item_cd = Request.Form.GetValues("oppt_item_cd");
                string[] oppt_sales_date = Request.Form.GetValues("oppt_sales_date");
                string[] oppt_oppt_qty = Request.Form.GetValues("oppt_oppt_qty");
                string[] oppt_oppt_unit_prc = Request.Form.GetValues("oppt_oppt_unit_prc") ;
                string[] oppt_amount = Request.Form.GetValues("oppt_amount");
                string[] oppt_krw_amount = Request.Form.GetValues("oppt_krw_amount");

                for (int i = 0; i < oppt_item_cd.Length; i++) {
                    hash["item_cd"] = oppt_item_cd[i];
                    hash["sales_date"] = oppt_sales_date[i];
                    hash["oppt_qty"] = oppt_oppt_qty[i] == "" ? 0 : Convert.ToInt32(oppt_oppt_qty[i]);
                    hash["oppt_unit_prc"] = oppt_oppt_unit_prc[i] == "" ? 0 : Convert.ToDecimal(oppt_oppt_unit_prc[i]);
                    hash["amount"] = oppt_amount[i] == "" ? 0 : Convert.ToDecimal(oppt_amount[i]);
                    hash["krw_amount"] = oppt_krw_amount[i] == "" ? 0 : Convert.ToInt32(oppt_krw_amount[i]);

                    mapper.Insert("opportunityItemSave", hash);
                }




                // 첨부파일 등록
                Hashtable upload_data = new Hashtable();

                upload_data["smr_cd"] = hash["oppt_cd"].ToString();
                upload_data["smr_chasu"] = 0;
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
                // 첨부파일 등록



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



        // 기회 및 수주관리 : 사업기회 관리 - 드롭 /SampleManage/opportunityDrop
        [HttpPost]
        public ActionResult opportunityDrop() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();


                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

                hash["reg_usr"] = User.Identity.Name.Split('|')[0];                 // reg_usr          : 로그인 사용자ID
                hash["oppt_cd"] = Request["oppt_cd"].nullToStr();                   // oppt_cd          : 사업기회관리PK ( T_OPPORTUNITY )
                hash["user_cd"] = Request["user_cd"].nullToStr();                   // user_cd          : 영업담당
                hash["oppt_drdate"] = Request["oppt_drdate"].nullToStr();           // oppt_drdate      : 드롭날짜
                hash["oppt_drtype"] = Request["oppt_drtype"].nullToStr();           // oppt_drtype      : 드롭타입
                hash["oppt_drdescript"] = Request["oppt_drdescript"].nullToStr();   // oppt_drdescript  : 드롭내용



                mapper.BeginTransaction();

                mapper.Insert("opportunityDropSave", hash);
                mapper.Update("opportunityDrop", hash);

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
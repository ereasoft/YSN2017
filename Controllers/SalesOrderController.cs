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
    public class SalesOrderController : Controller    {


        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);


        // 기회 및 수주관리 : 수주대장 관리 - 리스트 /SalesOrder/salesOrderList
        public ActionResult salesOrderList() {

         //   if ( Request["year"] != null && Request["month"] != null) {

                Hashtable hash = new Hashtable();

                hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드



                hash.Add("year", Request["year"].Trim());                  // year         : 기준 년
                hash.Add("month", Request["month"].Trim());                // month        : 기준 월
                hash.Add("salesBdate", Request["salesBdate"]);      // salesBdate   : 납품현황
                hash.Add("cnfm_yn", Request["cnfm_yn"]);            // cnfm_yn      : --알수없음
                hash.Add("wso_gubun", Request["wso_gubun"]);        // wso_gubun    : 수주구분
                hash.Add("so_cd", Request["so_cd"]);                // so_cd        : 수주번호
                hash.Add("so_seq", Request["so_seq"]);              // so_seq       : --알수없음
                hash.Add("lot_no", Request["lot_no"]);              // lot_no       : 주문번호
                hash.Add("deptGroup", Request["deptGroup"]);        // deptGroup    : 매출조직
                hash.Add("bizGroup", Request["bizGroup"]);          // bizGroup     : 매출조직 상위부서
                hash.Add("user_cd", Request["user_cd"]);            // user_cd      : 영업담당ID
                hash.Add("dstr_type", Request["dstr_type"]);        // dstr_type    : 유통구조
                hash.Add("cust_nm", Request["cust_nm"]);            // cust_nm      : 거래처명 
                hash.Add("cust_cd", Request["cust_cd"]);            // user_cd      : 거래처 코드 
                hash.Add("biz_type", Request["biz_type"]);          // biz_type     : 사업유형
                hash.Add("euser_nm", Request["euser_nm"]);          // euser_nm     : 마지막사용자
                hash.Add("euser_cd", Request["euser_cd"]);          // euser_cd     : 마지막사용자id
                hash.Add("item_type", Request["item_type"]);        // item_type    : 품목유형
                hash.Add("oppt_status", Request["oppt_status"]);    // oppt_status  : 진행상태
                hash.Add("bcust_nm", Request["bcust_nm"]);          // bcust_nm     : 매출처명
                hash.Add("bcust_cd", Request["bcust_cd"]);          // bcust_cd     : 매출처
                hash.Add("pjt_cd", Request["pjt_cd"]);              // pjt_cd       : 프로젝트
                hash.Add("ctlg_cd", Request["ctlg_cd"]);            // ctlg_cd      : 카다로그
                hash.Add("item_nm", Request["item_nm"]);            // item_nm      : 품목유형/명
                hash.Add("po_cd", Request["po_cd"]);                // po_cd        : PO 번호
                hash.Add("item_level1", Request["item_level1"]);    // item_level1  : 품목분류1
                hash.Add("item_level2", Request["item_level2"]);    // item_level2  : 품목분류2
                hash.Add("item_level3", Request["item_level3"]);    // item_level3  : 품목분류3
                hash.Add("ord_gb_l", Request["ord_gb_l"]);          // ord_gb_l     : Order(대)
                hash.Add("ord_gb_m", Request["ord_gb_m"]);          // ord_gb_m     : Order(중)
                hash.Add("ord_gb_s", Request["ord_gb_s"]);          // ord_gb_s     : Order(소)
                hash.Add("ord_cdate", Request["ord_cdate"]);        // ord_cdate    : 접수일
                hash.Add("day", Request["day"]);


            ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("salesOrderList", hash);


                Hashtable jsonData = new Hashtable();
                jsonData.Add("COUNT", list.Count());
                jsonData.Add("LIST", list);


                var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

         /*   } else {
                return new EmptyResult();
            }*/

        }






        // 기회 및 수주관리 : 수주대장 관리 - 상세 /SalesOrder/salesOrderDetail
        public ActionResult salesOrderDetail() {

            if (Request["so_cd"] != null && Request["so_seq"] != null && Request["lot_no"] != null ) {

                Hashtable hash = new Hashtable(); 

                hash.Add("language", User.Identity.Name.Split('|')[3]);     // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);   // 회사코드

                hash.Add("so_cd", Request["so_cd"]);            // so_cd    :  수주번호
                hash.Add("so_seq", Request["so_seq"]);          // so_seq   :  
                hash.Add("lot_no", Request["lot_no"]);          // lot_no   :  주문번호



                ISqlMapper mapper = Mapper.Instance();
                IEnumerable list = mapper.QueryForObject<IEnumerable>("salesOrderDetail", hash);


                IEnumerable<Hashtable> order_list = mapper.QueryForList<Hashtable>("salesOrderItemList", hash);
                IEnumerable<Hashtable> bill_list = mapper.QueryForList<Hashtable>("salesOrderItemBillList", hash);




                Hashtable jsonData = new Hashtable();
                
                jsonData.Add("LIST", list);                         // 기본정보 수주 계약 정보  
                jsonData.Add("ORDER_COUNT", order_list.Count());    // 납품 정보 건수
                jsonData.Add("ORDER_LIST", order_list);             // 납품 정보
                jsonData.Add("BILL_COUNT", bill_list.Count());      // 청구 정보 건수
                jsonData.Add("BILL_LIST", bill_list);               // 청구 정보


                var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }




        // 기회 및 수주관리 : 수주대장 관리 - 저장 /SalesOrder/salesOrderSave
        [HttpPost]
        public ActionResult salesOrderSave() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();


                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
                hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID


                hash["pjt_cd"] = Request["pjt_cd"].nullToStr();             // pjt_cd       : 프로젝트
                hash["so_cd"] = Request["so_cd"].nullToStr();               // so_cd        : 수주번호PK ( SALES_ORDER )
                hash["close_yn"] = Request["close_yn"].nullToStr();         // close_yn     : 강제마감 여부
                hash["so_seq"] = Request["so_seq"].nullToStr();             // so_seq       :  
                hash["so_serl"] = Request["so_serl"].nullToStr();           // so_serl      :  


                
                mapper.BeginTransaction();

                mapper.Update("salesOrderUpdate", hash);
                mapper.Update("cntrAmountUpdate", hash);

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
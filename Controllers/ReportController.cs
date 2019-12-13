using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Exceptions;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YSN2017.ComLIB;



namespace YSN2017.Controllers {

    [Authorize(Roles = "User,Admin")]
    public class ReportController : Controller {

        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);




        // Report :  수주목표 VS 실적 분석 - 리스트 /Report/orderTargetSalesAnalysisList
        public ActionResult orderTargetList() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {
   
                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["deptGroup"] = Request["deptGroup"].nullToStr();    // deptGroup   : 매출조직
                hash["bizGroup"] = Request["bizGroup"].nullToStr();      // bizGroup    : 매출조직 상위부서
                hash["cust_nm"] = Request["cust_nm"].nullToStr();        // cust_nm     : 거래처명 
                hash["cust_cd"] = Request["cust_cd"].nullToStr();        // user_cd     : 거래처 코드 
                hash["user_cd"] = Request["user_cd"].nullToStr();        // user_cd     : 영업담당ID

                hash["unit"] = Request["unit"].nullToStr();              // unit        : 원단위
                hash["order_type"] = Request["order_type"].nullToStr();  // order_type  : 수주가능성
                hash["dstr_type"] = Request["dstr_type"].nullToStr();    // dstr_type   : 유통구조
                hash["biz_type"] = Request["biz_type"].nullToStr();      // biz_type    : 사업유형
                hash["item_type"] = Request["item_type"].nullToStr();    // item_type   : 품목유형
                hash["enduser_cd"] = Request["enduser_cd"].nullToStr();  // enduser_cd  : enduser
                hash["enduser_nm"] = Request["enduser_nm"].nullToStr();  // enduser_nm  : enduser
                hash["bcust_cd"] = Request["bcust_cd"].nullToStr();      // bcust_cd    : 매출처ID
                hash["bcust_nm"] = Request["bcust_nm"].nullToStr();      // bcust_nm    : 매출처


                int base_yy = Convert.ToInt32(Request["base_yy"]);       // base_yy       : 기준년
                int base_mm1 = Convert.ToInt32(Request["base_mm1"]);     // base_mm1      : 기준월 시작
                int base_mm2 = Convert.ToInt32(Request["base_mm2"]);     // base_mm2      : 기준월 종료
                String ordertype = Request["order_type"].nullToStr();    // order_type    : 수주가능성 
                String yyyy = Convert.ToString(base_yy);
                String re_yyyy = Convert.ToString(base_yy - 1);

                hash["yyyy"] = Convert.ToString(base_yy);
                hash["re_yyyy"] = Convert.ToString(base_yy - 1);
                hash["styyyymm"] = yyyy + CommonMethod.makeTwo(base_mm1);
                hash["edyyyymm"] = yyyy + CommonMethod.makeTwo(base_mm2);
                hash["edyyyymm_p"] = yyyy + CommonMethod.makeTwo(base_mm2 + 1);
                hash["re_styyyymm"] = re_yyyy + CommonMethod.makeTwo(base_mm1);
                hash["re_edyyyymm"] = re_yyyy + CommonMethod.makeTwo(base_mm2);
                hash["ordertype"] = ordertype;


                for (int i = 1; i <= 12; i++) {
                    if (base_mm1 <= i && base_mm2 >= i) {
                        hash["mm" + Convert.ToString(i)] = "실적";
                    } else {
                        hash["mm" + Convert.ToString(i)] = "추정";
                    }
                }


                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("orderTargetSalesAnalysisList", hash);


                result.Add("COUNT", list.Count());
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



        // Report :  수주목표 VS 실적 분석 - 합계 /Report/orderTargetSalesAnalysisSumFooter
        public ActionResult orderTargetSum() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {

                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["deptGroup"] = Request["deptGroup"].nullToStr();    // deptGroup   : 매출조직
                hash["bizGroup"] = Request["bizGroup"].nullToStr();      // bizGroup    : 매출조직 상위부서
                hash["cust_nm"] = Request["cust_nm"].nullToStr();        // cust_nm     : 거래처명
                hash["cust_cd"] = Request["cust_cd"].nullToStr();        // user_cd     : 거래처 코드 
                hash["user_cd"] = Request["user_cd"].nullToStr();        // user_cd     : 영업담당ID

                hash["unit"] = Request["unit"].nullToStr();              // unit        : 원단위
                hash["order_type"] = Request["order_type"].nullToStr();  // order_type  : 수주가능성
                hash["dstr_type"] = Request["dstr_type"].nullToStr();    // dstr_type   : 유통구조
                hash["biz_type"] = Request["biz_type"].nullToStr();      // biz_type    : 사업유형
                hash["item_type"] = Request["item_type"].nullToStr();    // item_type   : 품목유형
                hash["enduser_cd"] = Request["enduser_cd"].nullToStr();  // enduser_cd  : enduser
                hash["enduser_nm"] = Request["enduser_nm"].nullToStr();  // enduser_nm  : enduser
                hash["bcust_cd"] = Request["bcust_cd"].nullToStr();      // bcust_cd    : 매출처ID
                hash["bcust_nm"] = Request["bcust_nm"].nullToStr();      // bcust_nm    : 매출처


                int base_yy = Convert.ToInt32(Request["base_yy"]);       // base_yy       : 기준년
                int base_mm1 = Convert.ToInt32(Request["base_mm1"]);     // base_mm1      : 기준월 시작
                int base_mm2 = Convert.ToInt32(Request["base_mm2"]);     // base_mm2      : 기준월 종료
                String ordertype = Request["order_type"].nullToStr();    // order_type    : 수주가능성 
                String yyyy = Convert.ToString(base_yy);
                String re_yyyy = Convert.ToString(base_yy - 1);

                hash["yyyy"] = Convert.ToString(base_yy);
                hash["base_yy"] = Convert.ToString(base_yy);
                hash["re_yyyy"] = Convert.ToString(base_yy - 1);
                hash["styyyymm"] = yyyy + CommonMethod.makeTwo(base_mm1);
                hash["edyyyymm"] = yyyy + CommonMethod.makeTwo(base_mm2);
                hash["edyyyymm_p"] = yyyy + CommonMethod.makeTwo(base_mm2 + 1);
                hash["re_styyyymm"] = re_yyyy + CommonMethod.makeTwo(base_mm1);
                hash["re_edyyyymm"] = re_yyyy + CommonMethod.makeTwo(base_mm2);
                hash["ordertype"] = ordertype;


                for (int i = 1; i <= 12; i++) {
                    if (base_mm1 <= i && base_mm2 >= i) {
                        hash["mm" + Convert.ToString(i)] = "실적";
                    } else {
                        hash["mm" + Convert.ToString(i)] = "추정";
                    }
                }


                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("orderTargetSalesAnalysisSumFooter", hash);


                result.Add("COUNT", list.Count());
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







        // Report :  수주 실적 분석 - 월별 수주실적 /Report/selectOrderResultAnalysisList
        public ActionResult selectOrderResultAnalysisList() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {

                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["deptGroup"] = Request["deptGroup"].nullToStr();       // deptGroup   : 매출조직
                hash["bizGroup"] = Request["bizGroup"].nullToStr();         // bizGroup    : 매출조직 상위부서
                hash["cust_nm"] = Request["cust_nm"].nullToStr();           // cust_nm     : 거래처명
                hash["cust_cd"] = Request["cust_cd"].nullToStr();           // user_cd     : 거래처 코드 
                hash["user_cd"] = Request["user_cd"].nullToStr();           // user_cd     : 영업담당ID

                hash["unit"] = Request["unit"].nullToStr();                 // unit        : 원단위
                hash["order_type"] = Request["order_type"].nullToStr();     // order_type  : 수주가능성
                hash["dstr_type"] = Request["dstr_type"].nullToStr();       // dstr_type   : 유통구조
                hash["biz_type"] = Request["biz_type"].nullToStr();         // biz_type    : 사업유형
                hash["item_type"] = Request["item_type"].nullToStr();       // item_type   : 품목유형
                hash["enduser_cd"] = Request["enduser_cd"].nullToStr();     // enduser_cd  : enduser
                hash["enduser_nm"] = Request["enduser_nm"].nullToStr();     // enduser_nm  : enduser
                hash["bcust_cd"] = Request["bcust_cd"].nullToStr();         // bcust_cd    : 매출처ID
                hash["bcust_nm"] = Request["bcust_nm"].nullToStr();         // bcust_nm    : 매출처

                int base_yy = Convert.ToInt32(Request["base_yy"]);          // base_yy       : 기준년
                int base_mm1 = Convert.ToInt32(Request["base_mm1"]);        // base_mm1      : 기준월 시작
                int base_mm2 = Convert.ToInt32(Request["base_mm2"]);        // base_mm2      : 기준월 종료
                String ordertype = Request["order_type"].nullToStr();       // order_type    : 수주가능성 
                String sales_base = Request["sales_base"].nullToStr();      // sales_base    : 매출기준 
                String yyyy = Convert.ToString(base_yy);
                String re_yyyy = Convert.ToString(base_yy - 1);

                hash["yyyy"] = Convert.ToString(base_yy);
                hash["base_yy"] = Convert.ToString(base_yy);
                hash["re_yyyy"] = Convert.ToString(base_yy - 1);

                hash["start_yymm"] = yyyy + CommonMethod.makeTwo(base_mm1);
                hash["end_yymm"] = yyyy + CommonMethod.makeTwo(base_mm2);
                hash["re_start_yymm"] = re_yyyy + CommonMethod.makeTwo(base_mm1);
                hash["re_end_yymm"] = re_yyyy + CommonMethod.makeTwo(base_mm2);
                hash["ordertype"] = ordertype;


                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("selectOrderResultAnalysisList", hash);


                result.Add("COUNT", list.Count());
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



        // Report :  수주 실적 분석 - 분기별 수주실적 /Report/selectDivOrderResultAnalysisList
        public ActionResult selectDivOrderResultAnalysisList() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {

                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["deptGroup"] = Request["deptGroup"].nullToStr();       // deptGroup   : 매출조직
                hash["bizGroup"] = Request["bizGroup"].nullToStr();         // bizGroup    : 매출조직 상위부서
                hash["cust_nm"] = Request["cust_nm"].nullToStr();           // cust_nm     : 거래처명
                hash["cust_cd"] = Request["cust_cd"].nullToStr();           // user_cd     : 거래처 코드 
                hash["user_cd"] = Request["user_cd"].nullToStr();           // user_cd     : 영업담당ID

                hash["unit"] = Request["unit"].nullToStr();                 // unit        : 원단위
                hash["order_type"] = Request["order_type"].nullToStr();     // order_type  : 수주가능성
                hash["dstr_type"] = Request["dstr_type"].nullToStr();       // dstr_type   : 유통구조
                hash["biz_type"] = Request["biz_type"].nullToStr();         // biz_type    : 사업유형
                hash["item_type"] = Request["item_type"].nullToStr();       // item_type   : 품목유형
                hash["enduser_cd"] = Request["enduser_cd"].nullToStr();     // enduser_cd  : enduser
                hash["enduser_nm"] = Request["enduser_nm"].nullToStr();     // enduser_nm  : enduser
                hash["bcust_cd"] = Request["bcust_cd"].nullToStr();         // bcust_cd    : 매출처ID
                hash["bcust_nm"] = Request["bcust_nm"].nullToStr();         // bcust_nm    : 매출처


                int base_yy = Convert.ToInt32(Request["base_yy"]);          // base_yy       : 기준년
                int base_mm1 = Convert.ToInt32(Request["base_mm1"]);        // base_mm1      : 기준월 시작
                int base_mm2 = Convert.ToInt32(Request["base_mm2"]);        // base_mm2      : 기준월 종료

                String ordertype = Request["order_type"].nullToStr();       // order_type    : 수주가능성 
                String sales_base = Request["sales_base"].nullToStr();      // sales_base    : 매출기준 
                String yyyy = Convert.ToString(base_yy);
                String re_yyyy = Convert.ToString(base_yy - 1);

                hash["yyyy"] = Convert.ToString(base_yy);
                hash["base_yy"] = Convert.ToString(base_yy);
                hash["re_yyyy"] = Convert.ToString(base_yy - 1);

                hash["start_yymm"] = yyyy + CommonMethod.makeTwo(base_mm1);
                hash["end_yymm"] = yyyy + CommonMethod.makeTwo(base_mm2);
                hash["re_start_yymm"] = re_yyyy + CommonMethod.makeTwo(base_mm1);
                hash["re_end_yymm"] = re_yyyy + CommonMethod.makeTwo(base_mm2);
                hash["ordertype"] = ordertype;
                hash["base_yy"] = yyyy;

                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("selectDivOrderResultAnalysisList", hash);

                result.Add("COUNT", list.Count());
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







        // Report :  매출목표 VS 실적 분석 - 리스트 /Report/salesTargetSalesAnalysisList
        public ActionResult salesTargetSalesAnalysisList() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {

                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["deptGroup"] = Request["deptGroup"].nullToStr();       // deptGroup   : 매출조직
                hash["bizGroup"] = Request["bizGroup"].nullToStr();         // bizGroup    : 매출조직 상위부서
                hash["cust_nm"] = Request["cust_nm"].nullToStr();           // cust_nm     : 거래처명
                hash["cust_cd"] = Request["cust_cd"].nullToStr();           // user_cd     : 거래처 코드 
                hash["user_cd"] = Request["user_cd"].nullToStr();           // user_cd     : 영업담당ID

                hash["unit"] = Request["unit"].nullToStr();                 // unit        : 원단위
                hash["order_type"] = Request["order_type"].nullToStr();     // order_type  : 수주가능성
                hash["dstr_type"] = Request["dstr_type"].nullToStr();       // dstr_type   : 유통구조
                hash["biz_type"] = Request["biz_type"].nullToStr();         // biz_type    : 사업유형
                hash["item_type"] = Request["item_type"].nullToStr();       // item_type   : 품목유형
                hash["enduser_cd"] = Request["enduser_cd"].nullToStr();     // enduser_cd  : enduser
                hash["enduser_nm"] = Request["enduser_nm"].nullToStr();     // enduser_nm  : enduser
                hash["bcust_cd"] = Request["bcust_cd"].nullToStr();         // bcust_cd    : 매출처ID
                hash["bcust_nm"] = Request["bcust_nm"].nullToStr();         // bcust_nm    : 매출처

                int base_yy = Convert.ToInt32(Request["base_yy"]);          // base_yy       : 기준년
                int base_mm1 = Convert.ToInt32(Request["base_mm1"]);        // base_mm1      : 기준월 시작
                int base_mm2 = Convert.ToInt32(Request["base_mm2"]);        // base_mm2      : 기준월 종료
                String ordertype = Request["order_type"].nullToStr();       // order_type    : 수주가능성 
                String sales_base = Request["sales_base"].nullToStr();      // sales_base    : 매출기준 
                String yyyy = Convert.ToString(base_yy);
                String re_yyyy = Convert.ToString(base_yy - 1);

                String sales_base2 = null;

                
                if (sales_base.Equals("세금계산서")) {                       
                    sales_base2 = "추정_미출고";
                } else {
                    sales_base2 = "추정_미청구";
                }


                hash["yyyy"] = Convert.ToString(base_yy);
                hash["base_yy"] = Convert.ToString(base_yy);
                hash["re_yyyy"] = Convert.ToString(base_yy - 1);
                hash["styyyymm"] = yyyy + CommonMethod.makeTwo(base_mm1);
                hash["edyyyymm"] = yyyy + CommonMethod.makeTwo(base_mm2);
                hash["edyyyymm_m"] = yyyy + CommonMethod.makeTwo(base_mm2 - 1);
                hash["edyyyymm_p"] = yyyy + CommonMethod.makeTwo(base_mm2 + 1);

                hash["re_styyyymm"] = re_yyyy + CommonMethod.makeTwo(base_mm1);
                hash["re_edyyyymm"] = re_yyyy + CommonMethod.makeTwo(base_mm2);
                hash["ordertype"] = ordertype;

                hash["sales_base"] = sales_base;
                hash["sales_base2"] = sales_base2;


                for (int i = 1; i <= 12; i++) {
                    if (base_mm1 <= i && base_mm2 >= i) {
                        hash["mm" + Convert.ToString(i)] = "세금계산서";
                     } else if (base_mm2 == i) {
                        hash["mm" + Convert.ToString(i)] = sales_base;
                    } else if (base_mm2 < i) {
                        hash["mm" + Convert.ToString(i)] = sales_base2;
                    }
                }


                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("salesTargetSalesAnalysisList", hash);


                result.Add("COUNT", list.Count());
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




        // Report :  매출목표 VS 실적 분석 - 합계 /Report/salesTargetSalesAnalyFooterSum
        public ActionResult salesTargetSalesAnalyFooterSum() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {

                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["deptGroup"] = Request["deptGroup"].nullToStr();       // deptGroup   : 매출조직
                hash["bizGroup"] = Request["bizGroup"].nullToStr();         // bizGroup    : 매출조직 상위부서
                hash["cust_nm"] = Request["cust_nm"].nullToStr();           // cust_nm     : 거래처명
                hash["cust_cd"] = Request["cust_cd"].nullToStr();           // user_cd     : 거래처 코드 
                hash["user_cd"] = Request["user_cd"].nullToStr();           // user_cd     : 영업담당ID

                hash["unit"] = Request["unit"].nullToStr();                 // unit        : 원단위
                hash["order_type"] = Request["order_type"].nullToStr();     // order_type  : 수주가능성
                hash["dstr_type"] = Request["dstr_type"].nullToStr();       // dstr_type   : 유통구조
                hash["biz_type"] = Request["biz_type"].nullToStr();         // biz_type    : 사업유형
                hash["item_type"] = Request["item_type"].nullToStr();       // item_type   : 품목유형
                hash["enduser_cd"] = Request["enduser_cd"].nullToStr();     // enduser_cd  : enduser
                hash["enduser_nm"] = Request["enduser_nm"].nullToStr();     // enduser_nm  : enduser
                hash["bcust_cd"] = Request["bcust_cd"].nullToStr();         // bcust_cd    : 매출처ID
                hash["bcust_nm"] = Request["bcust_nm"].nullToStr();         // bcust_nm    : 매출처


                int base_yy = Convert.ToInt32(Request["base_yy"]);          // base_yy       : 기준년
                int base_mm1 = Convert.ToInt32(Request["base_mm1"]);        // base_mm1      : 기준월 시작
                int base_mm2 = Convert.ToInt32(Request["base_mm2"]);        // base_mm2      : 기준월 종료
                String ordertype = Request["order_type"].nullToStr();       // order_type    : 수주가능성 
                String sales_base = Request["sales_base"].nullToStr();      // sales_base    : 매출기준 
                String yyyy = Convert.ToString(base_yy);
                String re_yyyy = Convert.ToString(base_yy - 1);

                String sales_base2 = null;

                //세금계산서
                if (sales_base.Equals("세금계산서")) {
                    sales_base2 = "추정_미출고";
                } else {
                    sales_base2 = "추정_미청구";
                }

                hash["yyyy"] = Convert.ToString(base_yy);
                hash["base_yy"] = Convert.ToString(base_yy);
                hash["re_yyyy"] = Convert.ToString(base_yy - 1);
                hash["styyyymm"] = yyyy + CommonMethod.makeTwo(base_mm1);
                hash["edyyyymm"] = yyyy + CommonMethod.makeTwo(base_mm2);
                hash["edyyyymm_m"] = yyyy + CommonMethod.makeTwo(base_mm2 - 1);
                hash["edyyyymm_p"] = yyyy + CommonMethod.makeTwo(base_mm2 + 1);

                hash["re_styyyymm"] = re_yyyy + CommonMethod.makeTwo(base_mm1);
                hash["re_edyyyymm"] = re_yyyy + CommonMethod.makeTwo(base_mm2);
                hash["ordertype"] = ordertype;

                hash["sales_base"] = sales_base;
                hash["sales_base2"] = sales_base2;


                for (int i = 1; i <= 12; i++) {
                    if (base_mm2 > i) {
                        hash["mm" + Convert.ToString(i)] = "세금계산서";
                    } else if (base_mm2 == i) {
                        hash["mm" + Convert.ToString(i)] = sales_base;
                    } else if (base_mm2 < i) {
                        hash["mm" + Convert.ToString(i)] = sales_base2;
                    }
                }


                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("salesTargetSalesAnalyFooterSum", hash);


                result.Add("COUNT", list.Count());
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







        // Report :  매출 실적 분석 - 월별 매출실적 /Report/selectSalesResultAnalysisList
        public ActionResult selectSalesResultAnalysisList() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {

                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["deptGroup"] = Request["deptGroup"].nullToStr();       // deptGroup   : 매출조직
                hash["bizGroup"] = Request["bizGroup"].nullToStr();         // bizGroup    : 매출조직 상위부서
                hash["cust_nm"] = Request["cust_nm"].nullToStr();           // cust_nm     : 거래처명
                hash["cust_cd"] = Request["cust_cd"].nullToStr();           // user_cd     : 거래처 코드 
                hash["user_cd"] = Request["user_cd"].nullToStr();           // user_cd     : 영업담당ID

                hash["unit"] = Request["unit"].nullToStr();                 // unit        : 원단위
                hash["order_type"] = Request["order_type"].nullToStr();     // order_type  : 수주가능성
                hash["dstr_type"] = Request["dstr_type"].nullToStr();       // dstr_type   : 유통구조
                hash["biz_type"] = Request["biz_type"].nullToStr();         // biz_type    : 사업유형
                hash["item_type"] = Request["item_type"].nullToStr();       // item_type   : 품목유형
                hash["enduser_cd"] = Request["enduser_cd"].nullToStr();     // enduser_cd  : enduser
                hash["enduser_nm"] = Request["enduser_nm"].nullToStr();     // enduser_nm  : enduser
                hash["bcust_cd"] = Request["bcust_cd"].nullToStr();         // bcust_cd    : 매출처ID
                hash["bcust_nm"] = Request["bcust_nm"].nullToStr();         // bcust_nm    : 매출처


                int base_yy = Convert.ToInt32(Request["base_yy"]);          // base_yy       : 기준년
                int base_mm1 = Convert.ToInt32(Request["base_mm1"]);        // base_mm1      : 기준월 시작
                int base_mm2 = Convert.ToInt32(Request["base_mm2"]);        // base_mm2      : 기준월 종료
                String ordertype = Request["order_type"].nullToStr();       // order_type    : 수주가능성 
                String sales_base = Request["sales_base"].nullToStr();      // sales_base    : 매출기준 
                String yyyy = Convert.ToString(base_yy);
                String re_yyyy = Convert.ToString(base_yy - 1);

                hash["yyyy"] = Convert.ToString(base_yy);
                hash["base_yy"] = Convert.ToString(base_yy);
                hash["re_yyyy"] = Convert.ToString(base_yy - 1);

                hash["start_yymm"] = yyyy + CommonMethod.makeTwo(base_mm1);
                hash["end_yymm"] = yyyy + CommonMethod.makeTwo(base_mm2);
                hash["end_yymm_m"] = yyyy + CommonMethod.makeTwo(base_mm2 - 1);
                hash["re_start_yymm"] = re_yyyy + CommonMethod.makeTwo(base_mm1);
                hash["re_end_yymm"] = re_yyyy + CommonMethod.makeTwo(base_mm2);
                hash["ordertype"] = ordertype;

                for (int i = 1; i <= 12; i++) {
                    if (base_mm2 == i) {
                        hash["mm" + Convert.ToString(i)] = sales_base;
                    } else {
                        hash["mm" + Convert.ToString(i)] = "세금계산서";
                    }
                }


                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("selectSalesResultAnalysisList", hash);


                result.Add("COUNT", list.Count());
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



        // Report :  매출 실적 분석 - 분기별 매출실적 /Report/selectDivSalesResultAnalysisList
        public ActionResult selectDivSalesResultAnalysisList() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {

                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["deptGroup"] = Request["deptGroup"].nullToStr();       // deptGroup   : 매출조직
                hash["bizGroup"] = Request["bizGroup"].nullToStr();         // bizGroup    : 매출조직 상위부서
                hash["cust_nm"] = Request["cust_nm"].nullToStr();           // cust_nm     : 거래처명
                hash["cust_cd"] = Request["cust_cd"].nullToStr();           // user_cd     : 거래처 코드 
                hash["user_cd"] = Request["user_cd"].nullToStr();           // user_cd     : 영업담당ID

                hash["unit"] = Request["unit"].nullToStr();                 // unit        : 원단위
                hash["order_type"] = Request["order_type"].nullToStr();     // order_type  : 수주가능성
                hash["dstr_type"] = Request["dstr_type"].nullToStr();       // dstr_type   : 유통구조
                hash["biz_type"] = Request["biz_type"].nullToStr();         // biz_type    : 사업유형
                hash["item_type"] = Request["item_type"].nullToStr();       // item_type   : 품목유형
                hash["enduser_cd"] = Request["enduser_cd"].nullToStr();     // enduser_cd  : enduser
                hash["enduser_nm"] = Request["enduser_nm"].nullToStr();     // enduser_nm  : enduser
                hash["bcust_cd"] = Request["bcust_cd"].nullToStr();         // bcust_cd    : 매출처ID
                hash["bcust_nm"] = Request["bcust_nm"].nullToStr();         // bcust_nm    : 매출처


                int base_yy = Convert.ToInt32(Request["base_yy"]);          // base_yy       : 기준년
                int base_mm1 = Convert.ToInt32(Request["base_mm1"]);        // base_mm1      : 기준월 시작
                int base_mm2 = Convert.ToInt32(Request["base_mm2"]);        // base_mm2      : 기준월 종료

                int base_end = base_mm2 / 3;

                String ordertype = Request["order_type"].nullToStr();       // order_type    : 수주가능성 
                String sales_base = Request["sales_base"].nullToStr();      // sales_base    : 매출기준 
                String yyyy = Convert.ToString(base_yy);
                String re_yyyy = Convert.ToString(base_yy - 1);


                hash["yyyy"] = Convert.ToString(base_yy);
                hash["base_yy"] = Convert.ToString(base_yy);
                hash["re_yyyy"] = Convert.ToString(base_yy - 1);

                hash["start_yymm"] = yyyy + CommonMethod.makeTwo(base_mm1);
                hash["end_yymm"] = yyyy + CommonMethod.makeTwo(base_mm2);
                hash["end_yymm_m"] = yyyy + CommonMethod.makeTwo((base_end - 1) * 3);
                hash["re_start_yymm"] = re_yyyy + CommonMethod.makeTwo(base_mm1);
                hash["re_end_yymm"] = re_yyyy + CommonMethod.makeTwo(base_mm2);
                hash["ordertype"] = ordertype;

                for (int i = 1; i <= 4; i++) {
                    if (base_end == i) {
                        hash["mm" + Convert.ToString(i)] = sales_base;
                    } else {
                        hash["mm" + Convert.ToString(i)] = "세금계산서";
                    }
                }

                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("selectDivSalesResultAnalysisList", hash);

                result.Add("COUNT", list.Count());
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






        // Report :  미수채권 현황 /Report/deferredBoundsList
        public ActionResult deferredBoundsList() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {

                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["deptGroup"] = Request["deptGroup"].nullToStr();    // deptGroup    : 매출조직
                hash["bizGroup"] = Request["bizGroup"].nullToStr();      // bizGroup     : 매출조직 상위부서
                hash["cust_nm"] = Request["cust_nm"].nullToStr();        // cust_nm      : 거래처명
                hash["cust_cd"] = Request["cust_cd"].nullToStr();        // user_cd      : 거래처 코드 
                hash["user_cd"] = Request["user_cd"].nullToStr();        // user_cd      : 영업담당ID

                hash["money_unit"] = Request["unit"].nullToStr();  // money_unit   : 원단위 
                hash["base_date"] = Request["base_date"].nullToStr();    // base_date    : 기준일자 
                hash["bad_ar_yn"] = Request["bad_ar_yn"].nullToStr();    // bad_ar_yn    : 악성채권 여부 
                   

                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("deferredBoundsList", hash);

                result.Add("COUNT", list.Count());
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



    }
}
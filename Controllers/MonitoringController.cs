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
    public class MonitoringController : Controller    {

        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);



        // 영업활동실적 :  /MonitoringController/saTypeStatistics
        public ActionResult saTypeStatistics() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try
            {
                hash["company_cd"] = User.Identity.Name.Split('|')[2];   // company_cd
                hash["language"] = User.Identity.Name.Split('|')[3];     // 기본언어

                hash["bizGroup"] = Request["bizGroup"].nullToStr();      // bizGroup    : 상위 매출조직
                hash["deptGroup"] = Request["deptGroup"].nullToStr();    // deptGroup   : 매출조직
                hash["user_cd"] = Request["user_cd"].nullToStr();        // user_cd     : 영업담당ID   
                hash["condiType"] = Request["condi_type"].nullToStr();        // user_cd     : 통

                string year = Request["year"].nullToStr();               // year        : 기준년 
                string month = Request["month"].nullToStr();             // month       : 기준월 
                 

                hash["base_ym"] = year + month;   

                mapper = Mapper.Instance();

                IEnumerable<Hashtable> list1 = mapper.QueryForList<Hashtable>("saTypeStatistics", hash);
                IEnumerable<Hashtable> list2 = mapper.QueryForList<Hashtable>("saTargetStatistics", hash);
                IEnumerable<Hashtable> list3 = mapper.QueryForList<Hashtable>("saTypeYearStatistics", hash);


                result.Add("LIST1", list1);  //활동유형별
                result.Add("LIST2", list2);  //업무유형별
                result.Add("LIST3", list3);  //월별 활동유형 
                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }
            catch (Exception e)
            {
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }



        }







        // Monitoring :  수주분석  /Monitoring/orderReport
        public ActionResult orderReport() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {

                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["deptGroup"] = Request["deptGroup"].nullToStr();           // deptGroup   : 매출조직
                hash["bizGroup"] = Request["bizGroup"].nullToStr();             // bizGroup    : 매출조직 상위부서
                hash["user_cd"] = Request["user_cd"].nullToStr();               // user_cd     : 영업담당ID

                hash["biz_type"] = Request["biz_type"].nullToStr();             // biz_type    : 사업유형
                hash["item_type"] = Request["item_type"].nullToStr();           // item_type   : 품목유형
                hash["dstr_type"] = Request["dstr_type"].nullToStr();           // dstr_type   : 유통구조
                hash["wso_psblt"] = Request["wso_psblt"].nullToStr();           // wso_psblt   : 수주가능성
                hash["order_ym_type"] = Request["order_ym_type"].nullToStr();   // order_ym_type  : 당월/누계/년간
                hash["order_type"] = Request["order_type"].nullToStr();         // order_type  : 없음
                hash["year"] = Request["year"].nullToStr();                     // year  : 기준년
                hash["month"] = Request["month"].nullToStr();                   // month  : 기준월

                string year = Request["year"].nullToStr();               // year        : 기준년 
                string month = Request["month"].nullToStr();             // month       : 기준월 
                DateTime dt = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), 1);
                DateTime dt2 = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), 1);


                hash["yyyymm"] = year + month;
                hash["pre_yyyymm"] = (Convert.ToInt32(year) - 1) + month;

                dt = dt.AddMonths(-1);
                hash["yyyypre_mm"] = dt.ToString("yyyyMM");

                dt = dt.AddYears(-1);
                hash["pre_yyyypre_mm"] = dt.ToString("yyyyMM");

                hash["pre_yyyy01"] = dt.ToString("yyyy") + "01";
                hash["pre_yyyy12"] = dt.ToString("yyyy") + "12";


                hash["yyyy01"] = dt2.ToString("yyyy") + "01";
                hash["yyyy12"] = dt2.ToString("yyyy") + "12";

                dt2 = dt2.AddMonths(1);
                hash["yyyynext_mm"] = dt2.ToString("yyyyMM");

                dt2 = dt2.AddYears(-1);
                hash["pre_yyyynext_mm"] = dt2.ToString("yyyyMM");


                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list1 = mapper.QueryForList<Hashtable>("orderReport1List", hash);

                hash["gubun"] = "국영";
                IEnumerable<Hashtable> list2_1 = mapper.QueryForList<Hashtable>("orderReport2List", hash);
                hash["gubun"] = "해영";
                IEnumerable<Hashtable> list2_2 = mapper.QueryForList<Hashtable>("orderReport2List", hash);
                
                IEnumerable<Hashtable> list3 = mapper.QueryForList<Hashtable>("orderReport3List", hash);

                IEnumerable<Hashtable> chart1 = mapper.QueryForList<Hashtable>("orderNomonthChart1", hash);
                IEnumerable<Hashtable> chart2 = mapper.QueryForList<Hashtable>("orderNomonthChart2", hash);
                IEnumerable<Hashtable> chart3 = mapper.QueryForList<Hashtable>("orderNomonthChart3", hash);
                IEnumerable<Hashtable> chart4 = mapper.QueryForList<Hashtable>("orderNomonthChart4", hash); 

                int rateVal = 100000000;
                List < Hashtable > AfcB = new List<Hashtable>();
                String[] codeNm = { "MBO", "Forecasting", "Actual" };
                for (int i=0;i< 3; i++)
                {
                    Hashtable items = new Hashtable();
                    items.Add("CODE_NM", codeNm[i]); 
                    foreach (var c in list3)
                    {
                        if (c["CODE_NM"].ToString().Equals("Cosmetic"))
                        {
                            items.Add("Cosmetic", double.Parse(c["REPORT3_VALUE1_" + (i + 1)].ToString()) / rateVal);
                        }
                        if (c["CODE_NM"].ToString().Equals("Pharma"))
                        {
                            items.Add("Pharma", double.Parse(c["REPORT3_VALUE1_" + (i + 1)].ToString()) / rateVal);
                        }
                        if (c["CODE_NM"].ToString().Equals("B/D"))
                        {
                            items.Add("B/D", double.Parse(c["REPORT3_VALUE1_" + (i + 1)].ToString()) / rateVal);
                        } 
                    }
                    AfcB.Add(items);
                }

                List<Hashtable> monthList = new List<Hashtable>();  
                for (int i = 1; i < 13; i++)
                {
                    Hashtable monthData = new Hashtable();
                    monthData.Add("MONTH", i.ToString("00"));
                    monthData.Add("KRW_AMOUNT1", '0');
                    monthData.Add("KRW_AMOUNT2", '0');
                    monthData.Add("KRW_AMOUNT3", '0');
                    monthData.Add("KRW_AMOUNT4", '0');
                    foreach (var item in chart1)
                    {
                        if (i.ToString("00") == item["ORDER_YM"].ToString())
                        {
                            monthData["KRW_AMOUNT1"] = double.Parse(item["KRW_AMOUNT"].ToString()) / rateVal;
                        }
                    }
                    foreach (var item in chart2)
                    {
                        if (i.ToString("00") == item["ORDER_YM"].ToString())
                        {
                            monthData["KRW_AMOUNT2"] = double.Parse(item["KRW_AMOUNT"].ToString()) / rateVal;
                        }
                    }
                    foreach (var item in chart3)
                    {
                        if (i.ToString("00") == item["ORDER_YM"].ToString())
                        {
                            monthData["KRW_AMOUNT3"] = double.Parse(item["KRW_AMOUNT"].ToString()) / rateVal;
                        }
                    }
                    foreach (var item in chart4)
                    {
                        if (i.ToString("00") == item["ORDER_YM"].ToString())
                        {
                            monthData["KRW_AMOUNT4"] = double.Parse(item["KRW_AMOUNT"].ToString()) / rateVal;
                        }
                    }
                    monthList.Add(monthData);
                }

                result.Add("LIST1", list1);
                result.Add("LIST2_1", list2_1);
                result.Add("LIST2_2", list2_2);
                result.Add("LIST3", AfcB);

                result.Add("CHART", monthList); 

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







        // Monitoring :  매출분석  /Monitoring/salesReport
        public ActionResult salesReport() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {

                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["deptGroup"] = Request["deptGroup"].nullToStr();           // deptGroup   : 매출조직
                hash["bizGroup"] = Request["bizGroup"].nullToStr();             // bizGroup    : 매출조직 상위부서
                hash["user_cd"] = Request["user_cd"].nullToStr();               // user_cd     : 영업담당ID

                hash["biz_type"] = Request["biz_type"].nullToStr();             // biz_type    : 사업유형
                hash["item_type"] = Request["item_type"].nullToStr();           // item_type   : 품목유형
                hash["dstr_type"] = Request["dstr_type"].nullToStr();           // dstr_type   : 유통구조
                hash["wso_psblt"] = Request["wso_psblt"].nullToStr();           // wso_psblt   : 수주가능성
                hash["sales_ym_type"] = Request["sales_ym_type"].nullToStr();   // order_ym_type  : 당월/누계/년간
                hash["order_type"] = Request["order_type"].nullToStr();         // order_type  : 없음
                hash["sales_base"] = Request["sales_base"].nullToStr();         // sales_base  : 매출기준
                hash["year"] = Request["year"].nullToStr();                     // year  : 기준년
                hash["month"] = Request["month"].nullToStr();                   // month  : 기준월

                string year = Request["year"].nullToStr();
                string month = Request["month"].nullToStr();

                DateTime dt = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), 1);
                DateTime dt2 = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), 1);


                hash["yyyymm"] = year + month;
                hash["pre_yyyymm"] = (Convert.ToInt32(year) - 1) + month;

                dt = dt.AddMonths(-1);
                hash["yyyypre_mm"] = dt.ToString("yyyyMM");

                dt = dt.AddYears(-1);
                hash["pre_yyyypre_mm"] = dt.ToString("yyyyMM");

                hash["pre_yyyy01"] = dt.ToString("yyyy") + "01";
                hash["pre_yyyy12"] = dt.ToString("yyyy") + "12";


                hash["yyyy01"] = dt2.ToString("yyyy") + "01";
                hash["yyyy12"] = dt2.ToString("yyyy") + "12";

                dt2 = dt2.AddMonths(1);
                hash["yyyynext_mm"] = dt2.ToString("yyyyMM");

                dt2 = dt2.AddYears(-1);
                hash["pre_yyyynext_mm"] = dt2.ToString("yyyyMM");



                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list1 = mapper.QueryForList<Hashtable>("salesReport1List", hash);

                hash["gubun"] = "국영";
                IEnumerable<Hashtable> list2_1 = mapper.QueryForList<Hashtable>("salesReport2List", hash);
                hash["gubun"] = "해영";
                IEnumerable<Hashtable> list2_2 = mapper.QueryForList<Hashtable>("salesReport2List", hash);

                IEnumerable<Hashtable> list3 = mapper.QueryForList<Hashtable>("salesReport3List", hash);

                IEnumerable<Hashtable> chart1 = mapper.QueryForList<Hashtable>("salesNomonthChart1", hash);
                IEnumerable<Hashtable> chart2 = mapper.QueryForList<Hashtable>("salesNomonthChart2", hash);
                IEnumerable<Hashtable> chart3 = mapper.QueryForList<Hashtable>("salesNomonthChart3", hash);
                IEnumerable<Hashtable> chart4 = mapper.QueryForList<Hashtable>("salesNomonthChart4", hash);

                int rateVal = 100000000;
                List<Hashtable> AfcB = new List<Hashtable>();
                String[] codeNm = { "MBO", "Forecasting", "Actual" };
                for (int i = 0; i < 3; i++)
                {
                    Hashtable items = new Hashtable();
                    items.Add("CODE_NM", codeNm[i]);
                    foreach (var c in list3)
                    {
                        if (c["CODE_NM"].ToString().Equals("Cosmetic"))
                        {
                            items.Add("Cosmetic", double.Parse(c["REPORT3_VALUE1_" + (i + 1)].ToString()) / rateVal);
                        }
                        if (c["CODE_NM"].ToString().Equals("Pharma"))
                        {
                            items.Add("Pharma", double.Parse(c["REPORT3_VALUE1_" + (i + 1)].ToString()) / rateVal);
                        }
                        if (c["CODE_NM"].ToString().Equals("B/D"))
                        {
                            items.Add("B/D", double.Parse(c["REPORT3_VALUE1_" + (i + 1)].ToString()) / rateVal);
                        }
                    }
                    AfcB.Add(items);
                }

                List<Hashtable> monthList = new List<Hashtable>();
                for (int i = 1; i < 13; i++)
                {
                    Hashtable monthData = new Hashtable();
                    monthData.Add("MONTH", i.ToString("00"));
                    monthData.Add("KRW_AMOUNT1", '0');
                    monthData.Add("KRW_AMOUNT2", '0');
                    monthData.Add("KRW_AMOUNT3", '0');
                    monthData.Add("KRW_AMOUNT4", '0');
                    foreach (var item in chart1)
                    {
                        if (i.ToString("00") == item["SALES_YM"].ToString())
                        {
                            monthData["KRW_AMOUNT1"] = double.Parse(item["KRW_AMOUNT"].ToString()) / rateVal;
                        }
                    }
                    foreach (var item in chart2)
                    {
                        if (i.ToString("00") == item["SALES_YM"].ToString())
                        {
                            monthData["KRW_AMOUNT2"] = double.Parse(item["KRW_AMOUNT"].ToString()) / rateVal;
                        }
                    }
                    foreach (var item in chart3)
                    {
                        if (i.ToString("00") == item["SALES_YM"].ToString())
                        {
                            monthData["KRW_AMOUNT3"] = double.Parse(item["KRW_AMOUNT"].ToString()) / rateVal;
                        }
                    }
                    foreach (var item in chart4)
                    {
                        if (i.ToString("00") == item["SALES_YM"].ToString())
                        {
                            monthData["KRW_AMOUNT4"] = double.Parse(item["KRW_AMOUNT"].ToString()) / rateVal;
                        }
                    }
                    monthList.Add(monthData);
                }

                result.Add("LIST1", list1);
                result.Add("LIST2_1", list2_1);
                result.Add("LIST2_2", list2_2);
                result.Add("LIST3", AfcB);

                result.Add("CHART", monthList);

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



        // Monitoring :  매출분석 수주대장  /Monitoring/salesReportOrder
        public ActionResult salesReportOrder() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {

                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["deptGroup"] = Request["deptGroup"].nullToStr();           // deptGroup   : 매출조직
                hash["bizGroup"] = Request["bizGroup"].nullToStr();             // bizGroup    : 매출조직 상위부서
                hash["user_cd"] = Request["user_cd"].nullToStr();               // user_cd     : 영업담당ID

                hash["biz_type"] = Request["biz_type"].nullToStr();             // biz_type    : 사업유형
                hash["item_type"] = Request["item_type"].nullToStr();           // item_type   : 품목유형
                hash["dstr_type"] = Request["dstr_type"].nullToStr();           // dstr_type   : 유통구조
                hash["wso_psblt"] = Request["wso_psblt"].nullToStr();           // wso_psblt   : 수주가능성
                hash["sales_ym_type"] = Request["sales_ym_type"].nullToStr();   // sales_ym_type  : 당월/누계/년간
                hash["sales_base"] = Request["sales_base"].nullToStr();         // sales_base  : 매출기준
                hash["year"] = Request["year"].nullToStr();                     // year  : 기준년
                hash["month"] = Request["month"].nullToStr();                   // month  : 기준월

                string year = Request["year"].nullToStr();
                string month = Request["month"].nullToStr();


                DateTime dt = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), 1);
                DateTime dt2 = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), 1);


                hash["yyyymm"] = year + month;
                hash["pre_yyyymm"] = (Convert.ToInt32(year) - 1) + month;

                dt = dt.AddMonths(-1);
                hash["yyyypre_mm"] = dt.ToString("yyyyMM");

                dt = dt.AddYears(-1);
                hash["pre_yyyypre_mm"] = dt.ToString("yyyyMM");

                hash["pre_yyyy01"] = dt.ToString("yyyy") + "01";
                hash["pre_yyyy12"] = dt.ToString("yyyy") + "12";


                hash["yyyy01"] = dt2.ToString("yyyy") + "01";
                hash["yyyy12"] = dt2.ToString("yyyy") + "12";

                dt2 = dt2.AddMonths(1);
                hash["yyyynext_mm"] = dt2.ToString("yyyyMM");

                dt2 = dt2.AddYears(-1);
                hash["pre_yyyynext_mm"] = dt2.ToString("yyyyMM");



                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list1 = mapper.QueryForList<Hashtable>("salesReportOrder1List", hash);
                
                hash["gubun"] = "국영";
                IEnumerable<Hashtable> list2_1 = mapper.QueryForList<Hashtable>("salesReportOrder2List", hash);
                hash["gubun"] = "해영";
                IEnumerable<Hashtable> list2_2 = mapper.QueryForList<Hashtable>("salesReportOrder2List", hash);
               
                IEnumerable<Hashtable> list3 = mapper.QueryForList<Hashtable>("salesReportOrder3List", hash); 
                IEnumerable<Hashtable> list4 = mapper.QueryForList<Hashtable>("salesReportOrderTodayDetailReportList", hash);
                //IEnumerable<Hashtable> chart1 = mapper.QueryForList<Hashtable>("getNomonthOrderChart1", hash);
                //IEnumerable<Hashtable> chart2 = mapper.QueryForList<Hashtable>("getNomonthOrderChart2", hash);
                //IEnumerable<Hashtable> chart3 = mapper.QueryForList<Hashtable>("getNomonthOrderChart3", hash);
                //IEnumerable<Hashtable> chart4 = mapper.QueryForList<Hashtable>("getNomonthOrderChart4", hash);
                // MonitoringSalesReportMapper.xml 쿼리 사용 ( 구서버에서 이형태로 사용 )
                IEnumerable<Hashtable> chart1 = mapper.QueryForList<Hashtable>("salesNomonthChart1", hash);
                IEnumerable<Hashtable> chart2 = mapper.QueryForList<Hashtable>("salesNomonthChart2", hash);
                IEnumerable<Hashtable> chart3 = mapper.QueryForList<Hashtable>("salesNomonthChart3", hash);
                IEnumerable<Hashtable> chart4 = mapper.QueryForList<Hashtable>("salesNomonthChart4", hash);

                int rateVal = 100000000;
                List<Hashtable> AfcB = new List<Hashtable>();
                String[] codeNm = { "MBO", "Forecasting", "Actual" };
                for (int i = 0; i < 3; i++)
                {
                    Hashtable items = new Hashtable();
                    items.Add("CODE_NM", codeNm[i]);
                    foreach (var c in list3)
                    {
                        if (c["CODE_NM"].ToString().Equals("Cosmetic"))
                        {
                            items.Add("Cosmetic", double.Parse(c["REPORT3_VALUE1_" + (i + 1)].ToString()) / rateVal);
                        }
                        if (c["CODE_NM"].ToString().Equals("Pharma"))
                        {
                            items.Add("Pharma", double.Parse(c["REPORT3_VALUE1_" + (i + 1)].ToString()) / rateVal);
                        }
                        if (c["CODE_NM"].ToString().Equals("B/D"))
                        {
                            items.Add("B/D", double.Parse(c["REPORT3_VALUE1_" + (i + 1)].ToString()) / rateVal);
                        }
                    }
                    AfcB.Add(items);
                }

                List<Hashtable> monthList = new List<Hashtable>();
                for (int i = 1; i < 13; i++)
                {
                    Hashtable monthData = new Hashtable();
                    monthData.Add("MONTH", i.ToString("00"));
                    monthData.Add("KRW_AMOUNT1", '0');
                    monthData.Add("KRW_AMOUNT2", '0');
                    monthData.Add("KRW_AMOUNT3", '0');
                    monthData.Add("KRW_AMOUNT4", '0');
                    foreach (var item in chart1)
                    {
                        if (i.ToString("00") == item["SALES_YM"].ToString())
                        {
                            monthData["KRW_AMOUNT1"] = double.Parse(item["KRW_AMOUNT"].ToString()) / rateVal;
                        }
                    }
                    foreach (var item in chart2)
                    {
                        if (i.ToString("00") == item["SALES_YM"].ToString())
                        {
                            monthData["KRW_AMOUNT2"] = double.Parse(item["KRW_AMOUNT"].ToString()) / rateVal;
                        }
                    }
                    foreach (var item in chart3)
                    {
                        if (i.ToString("00") == item["SALES_YM"].ToString())
                        {
                            monthData["KRW_AMOUNT3"] = double.Parse(item["KRW_AMOUNT"].ToString()) / rateVal;
                        }
                    }
                    foreach (var item in chart4)
                    {
                        if (i.ToString("00") == item["SALES_YM"].ToString())
                        {
                            monthData["KRW_AMOUNT4"] = double.Parse(item["KRW_AMOUNT"].ToString()) / rateVal;
                        }
                    }
                    monthList.Add(monthData);
                }

                result.Add("LIST1", list1);
                result.Add("LIST2_1", list2_1);
                result.Add("LIST2_2", list2_2);
                result.Add("LIST3", AfcB);
                result.Add("LIST4", list4);

                result.Add("CHART", monthList);

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




        // Monitoring :  매출분석 수주대장 - 당월상세분석 팝업 /Monitoring/TodayDetailReportList
        public ActionResult TodayDetailReportList() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {

                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["deptGroup"] = Request["deptGroup"].nullToStr();           // deptGroup   : 매출조직
                hash["bizGroup"] = Request["bizGroup"].nullToStr();             // bizGroup    : 매출조직 상위부서
                hash["user_cd"] = Request["user_cd"].nullToStr();               // user_cd     : 영업담당ID

                hash["biz_type"] = Request["biz_type"].nullToStr();             // biz_type    : 사업유형
                hash["item_type"] = Request["item_type"].nullToStr();           // item_type   : 품목유형
                hash["dstr_type"] = Request["dstr_type"].nullToStr();           // dstr_type   : 유통구조
                hash["wso_psblt"] = Request["wso_psblt"].nullToStr();           // wso_psblt   : 수주가능성
                hash["order_ym_type"] = Request["order_ym_type"].nullToStr();   // order_ym_type  : 당월/누계/년간
                hash["order_type"] = Request["order_type"].nullToStr();         // order_type  : 없음
                hash["year"] = Request["year"].nullToStr();                     // year  : 기준년
                hash["month"] = Request["month"].nullToStr();                   // month  : 기준월

                string year = Request["year"].nullToStr();
                string month = Request["month"].nullToStr();

                DateTime dt = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), 1);
                DateTime dt2 = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), 1);


                hash["yyyymm"] = year + month;
                hash["pre_yyyymm"] = (Convert.ToInt32(year) - 1) + month;

                dt = dt.AddMonths(-1);
                hash["yyyypre_mm"] = dt.ToString("yyyyMM");

                dt = dt.AddYears(-1);
                hash["pre_yyyypre_mm"] = dt.ToString("yyyyMM");

                hash["pre_yyyy01"] = dt.ToString("yyyy") + "01";


                hash["yyyy01"] = dt2.ToString("yyyy") + "01";
                hash["yyyy12"] = dt2.ToString("yyyy") + "12";

                dt2 = dt2.AddMonths(1);
                hash["yyyynext_mm"] = dt2.ToString("yyyyMM");



                ISqlMapper mapper = Mapper.Instance();

                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("salesReportOrderTodayDetailReportList", hash);

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




        // Monitoring :  담당자별 매출분석   /Monitoring/salesUserReportList
        public ActionResult salesUserReportList() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {

                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["deptGroup"] = Request["deptGroup"].nullToStr();           // deptGroup   : 매출조직
                hash["bizGroup"] = Request["bizGroup"].nullToStr();             // bizGroup    : 매출조직 상위부서
                hash["sales_base"] = Request["sales_base"].nullToStr();         // sales_base  : 매출기준
                hash["sales_type"] = Request["sales_type"].nullToStr();         // sales_type  : 당월/누계

                hash["year"] = Request["year"].nullToStr();                     // year  : 기준년
                hash["month"] = Request["month"].nullToStr();                   // month  : 기준월

                string year = Request["year"].nullToStr();
                string month = Request["month"].nullToStr();

                DateTime dt = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), 1);
                DateTime dt2 = new DateTime(Convert.ToInt32(year), Convert.ToInt32(month), 1);


                hash["yyyymm"] = year + month;
                hash["pre_yyyymm"] = (Convert.ToInt32(year) - 1) + month;

                dt = dt.AddMonths(-1);
                hash["yyyypre_mm"] = dt.ToString("yyyyMM");

                dt = dt.AddYears(-1);
                hash["pre_yyyypre_mm"] = dt.ToString("yyyyMM");

                hash["pre_yyyy01"] = dt.ToString("yyyy") + "01";


                hash["yyyy01"] = dt2.ToString("yyyy") + "01";
                hash["yyyy12"] = dt2.ToString("yyyy") + "12";

                dt2 = dt2.AddMonths(1);
                hash["yyyynext_mm"] = dt2.ToString("yyyyMM");


                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("salesUserReportList", hash);


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




        // Monitoring :  샘플분석  /Monitoring/sampleAnalysisOrder
        public ActionResult sampleAnalysisOrder() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {

                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["deptGroup"] = Request["deptGroup"].nullToStr();           // deptGroup    : 매출조직
                hash["bizGroup"] = Request["bizGroup"].nullToStr();             // bizGroup     : 매출조직 상위부서
                hash["user_cd"] = Request["user_cd"].nullToStr();               // user_cd      : 영업담당ID

                hash["dstr_type"] = Request["dstr_type"].nullToStr();           // dstr_type    : 유통구조
                hash["biz_type"] = Request["biz_type"].nullToStr();             // biz_type     : 사업유형
                hash["base_yy"] = Request["base_yy"].nullToStr();               // base_yy         : 기준년
                hash["base_mm"] = Request["base_mm"].nullToStr();               // base_mm        : 기준월
                hash["base_dd"] = Request["base_dd"].nullToStr();               // base_dd        : 기준일
                hash["mode"] = Request["mode"].nullToStr();               // mode        : 당월/누계


                string base_yy = Request["base_yy"].nullToStr();
                string base_mm = Request["base_mm"].nullToStr();


                
                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list1 = mapper.QueryForList<Hashtable>("sampleAnalysisMonth", hash); 
               /* if (hash["base_dd"].ToString() != "")
                {
                    list3 = mapper.QueryForList<Hashtable>("sampleAnalysisMuser2", hash);
                }else
                {
                    list3 = mapper.QueryForList<Hashtable>("sampleAnalysisMuser", hash);
                }*/
               // IEnumerable<Hashtable> list4 = mapper.QueryForList<Hashtable>("sampleAnalysisDept", hash);

                result.Add("LIST1", list1); 
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

        // Monitoring :  샘플분석  /Monitoring/sampleAnalysisOrder
        public ActionResult sampleAnalysisOrder2()
        {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try
            {

                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["deptGroup"] = Request["deptGroup"].nullToStr();           // deptGroup    : 매출조직
                hash["bizGroup"] = Request["bizGroup"].nullToStr();             // bizGroup     : 매출조직 상위부서
                hash["user_cd"] = Request["user_cd"].nullToStr();               // user_cd      : 영업담당ID

                hash["dstr_type"] = Request["dstr_type"].nullToStr();           // dstr_type    : 유통구조
                hash["biz_type"] = Request["biz_type"].nullToStr();             // biz_type     : 사업유형
                hash["base_yy"] = Request["base_yy"].nullToStr();               // base_yy         : 기준년
                hash["base_mm"] = Request["base_mm"].nullToStr();               // base_mm        : 기준월
                hash["base_dd"] = Request["base_dd"].nullToStr();               // base_dd        : 기준일
                hash["mode"] = Request["mode"].nullToStr();               // mode        : 당월/누계


                string base_yy = Request["base_yy"].nullToStr();
                string base_mm = Request["base_mm"].nullToStr();



                ISqlMapper mapper = Mapper.Instance(); 
                IEnumerable<Hashtable> list2 = mapper.QueryForList<Hashtable>("sampleAnalysisYear", hash); 
                /* if (hash["base_dd"].ToString() != "")
                 {
                     list3 = mapper.QueryForList<Hashtable>("sampleAnalysisMuser2", hash);
                 }else
                 {
                     list3 = mapper.QueryForList<Hashtable>("sampleAnalysisMuser", hash);
                 }*/  
                result.Add("LIST2", list2);
                //result.Add("LIST3", list3); 
                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }
            catch (Exception e)
            {
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }

        }

        // Monitoring :  샘플분석  /Monitoring/sampleAnalysisOrder
        public ActionResult sampleAnalysisOrder3()
        {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try
            {

                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["deptGroup"] = Request["deptGroup"].nullToStr();           // deptGroup    : 매출조직
                hash["bizGroup"] = Request["bizGroup"].nullToStr();             // bizGroup     : 매출조직 상위부서
                hash["user_cd"] = Request["user_cd"].nullToStr();               // user_cd      : 영업담당ID

                hash["dstr_type"] = Request["dstr_type"].nullToStr();           // dstr_type    : 유통구조
                hash["biz_type"] = Request["biz_type"].nullToStr();             // biz_type     : 사업유형
                hash["base_yy"] = Request["base_yy"].nullToStr();               // base_yy         : 기준년
                hash["base_mm"] = Request["base_mm"].nullToStr();               // base_mm        : 기준월
                hash["base_dd"] = Request["base_dd"].nullToStr();               // base_dd        : 기준일
                hash["mode"] = Request["mode"].nullToStr();               // mode        : 당월/누계


                string base_yy = Request["base_yy"].nullToStr();
                string base_mm = Request["base_mm"].nullToStr();



                ISqlMapper mapper = Mapper.Instance(); 
                /* if (hash["base_dd"].ToString() != "")
                 {
                     list3 = mapper.QueryForList<Hashtable>("sampleAnalysisMuser2", hash);
                 }else
                 {
                     list3 = mapper.QueryForList<Hashtable>("sampleAnalysisMuser", hash);
                 }*/
                IEnumerable<Hashtable> list4 = mapper.QueryForList<Hashtable>("sampleAnalysisDept", hash);
                 
                result.Add("LIST4", list4);
                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }
            catch (Exception e)
            {
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }

        }

        public ActionResult sampleAnalysisOrderMuser()
        {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try
            {

                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["deptGroup"] = Request["deptGroup"].nullToStr();           // deptGroup    : 매출조직
                hash["bizGroup"] = Request["bizGroup"].nullToStr();             // bizGroup     : 매출조직 상위부서
                hash["user_cd"] = Request["user_cd"].nullToStr();               // user_cd      : 영업담당ID

                hash["dstr_type"] = Request["dstr_type"].nullToStr();           // dstr_type    : 유통구조
                hash["biz_type"] = Request["biz_type"].nullToStr();             // biz_type     : 사업유형
                hash["base_yy"] = Request["base_yy"].nullToStr();               // base_yy         : 기준년
                hash["base_mm"] = Request["base_mm"].nullToStr();               // base_mm        : 기준월
                hash["base_dd"] = Request["base_dd"].nullToStr();               // base_dd        : 기준일
                hash["mode"] = Request["mode"].nullToStr();               // mode        : 당월/누계


                string base_yy = Request["base_yy"].nullToStr();
                string base_mm = Request["base_mm"].nullToStr();



                ISqlMapper mapper = Mapper.Instance(); 
                IEnumerable<Hashtable> list3;
                if (hash["base_dd"].ToString() != "")
                {
                    list3 = mapper.QueryForList<Hashtable>("sampleAnalysisMuser2", hash);
                }
                else
                {
                    list3 = mapper.QueryForList<Hashtable>("sampleAnalysisMuser", hash);
                }
                
                result.Add("LIST3", list3); 
                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }
            catch (Exception e)
            {
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }

        }





    }
}
 
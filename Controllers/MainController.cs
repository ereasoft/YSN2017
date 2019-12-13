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
    public class MainController : Controller    {

        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);



        // 메인 : 왼쪽 메뉴 권한   /Main/leftMenuAuth
        public ActionResult leftMenuAuth() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {
                string lang = "";
                if (Request["lang"] != null)
                {
                    lang = Request["lang"];
                }else
                {
                    lang = User.Identity.Name.Split('|')[3];
                }

                hash["auth_id"] = User.Identity.Name.Split('|')[6];     // 권한등급 
                hash["language"] = lang;     // 기본언어
                if (Request["node"] == null) {
                    hash["up_menu_id"] = "M10000";
                }else
                {
                    hash["up_menu_id"] = Request["node"];
                }
                List<Hashtable> menuList = new List<Hashtable>(); 

                mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("leftMenuAuth", hash); 
                foreach (var items in list)
                {
                    Hashtable menu = new Hashtable();
                    menu.Add("text", items["MENU_NM"]);
                    menu.Add("url", items["MENU_URL"]);
                    menu.Add("id", items["MENU_ID"]);
                    if ((int)items["CHILD_CNT"] > 0)
                    {
                        menu.Add("leaf", false);
                    }else
                    {
                        menu.Add("leaf", true);
                    }
                    menuList.Add(menu);
                }
                

                result.Add("LIST", menuList);
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


        // 메인 : 매출분석   /Main/getT1_info
        public ActionResult getT1_info() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try { 
                hash["company_cd"] = User.Identity.Name.Split('|')[2];   // company_cd
                hash["language"] = User.Identity.Name.Split('|')[3];     // 기본언어
                    
                hash["bizGroup"] = Request["bizGroup"].nullToStr();      // bizGroup    : 상위 매출조직
                hash["deptGroup"] = Request["deptGroup"].nullToStr();    // deptGroup   : 매출조직
                hash["user_cd"] = Request["user_cd"].nullToStr();        // user_cd     : 영업담당ID
                hash["dstr_type"] = Request["dstr_type"].nullToStr();    // dstr_type   : 유통구조
                hash["sales_base"] = Request["sales_base"].nullToStr();   // sales_base   : 매출기준

                hash["t1button"] = Request["t1button"].nullToStr();
                hash["t2button"] = Request["t2button"].nullToStr();
                hash["t3button"] = Request["t2button"].nullToStr();


                string year = Request["year"].nullToStr();               // year        : 기준년 
                string month = Request["month"].nullToStr();             // month       : 기준월 



                hash["yyyymm"] = year + month;
                hash["pre_yyyymm"] = (Convert.ToInt32(year)-1).ToString() + month;

                hash["yyyypre_mm"] = year +  (Convert.ToInt32(month)-1 == 0 ? "01" : Convert.ToInt32(month)-1 < 10 ? "0" + (Convert.ToInt32(month)-1).ToString() : (Convert.ToInt32(month)-1).ToString());
                hash["pre_yyyypre_mm"] = (Convert.ToInt32(year)-1).ToString() + (Convert.ToInt32(month)-1 == 0 ? "01" : Convert.ToInt32(month)-1 < 10 ? "0" + (Convert.ToInt32(month)-1).ToString() : (Convert.ToInt32(month)-1).ToString());

                hash["pre_yyyy01"] = (Convert.ToInt32(year)-1).ToString() + "01";
                hash["yyyy01"] = year + "01";
                hash["yyyy12"] = year + "12";

                hash["yyyynext_mm"] = year + (Convert.ToInt32(month)+1 < 10 ? "0" + (Convert.ToInt32(month)+1).ToString() : (Convert.ToInt32(month)+1).ToString());




                mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("getT1_info", hash);


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

        // 메인 : 예상매출현황   /Main/getT4_info
        public ActionResult getT4_info()
        {

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
                hash["dstr_type"] = Request["dstr_type"].nullToStr();    // dstr_type   : 유통구조 
                hash["dept_type"] = Request["dept_type"].nullToStr();

                string year = Request["year"].nullToStr();               // year        : 기준년 
                string month = Request["month"].nullToStr();             // month       : 기준월 



                hash["yyyymm"] = year + month;   
                hash["yyyynext_mm"] = year + (Convert.ToInt32(month) + 1 < 10 ? "0" + (Convert.ToInt32(month) + 1).ToString() : (Convert.ToInt32(month) + 1).ToString());




                mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("getT4_info", hash);


                result.Add("LIST", list);
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


        // 메인 : 활동현황   /Main/getT2_info
        public ActionResult getT2_info() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {

                hash["company_cd"] = User.Identity.Name.Split('|')[2];   // company_cd
                hash["language"] = User.Identity.Name.Split('|')[3];     // 기본언어

                hash["user_cd"] = Request["user_cd"].nullToStr();       // user_cd     : 영업담당ID
                hash["sales_base"] = Request["sales_base"].nullToStr();

                hash["t1button"] = Request["t1button"].nullToStr();
                hash["t2button"] = Request["t2button"].nullToStr();
                hash["t3button"] = Request["t2button"].nullToStr();


                mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("getT2_info", hash);


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



        // 메인 : 매출분석   /Main/getT3_info
        public ActionResult getT3_info() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {

                hash["company_cd"] = User.Identity.Name.Split('|')[2];   // company_cd
                hash["language"] = User.Identity.Name.Split('|')[3];     // 기본언어

                hash["bizGroup"] = Request["bizGroup"].nullToStr();      // bizGroup    : 상위 매출조직
                hash["deptGroup"] = Request["deptGroup"].nullToStr();    // deptGroup   : 매출조직
                hash["user_cd"] = Request["user_cd"].nullToStr();       // user_cd     : 영업담당ID
                hash["dstr_type"] = Request["dstr_type"].nullToStr();    // dstr_type   : 유통구조
                hash["sales_base"] = Request["sales_base"].nullToStr();
                hash["year"] = Request["year"].nullToStr();               // year        : 기준년 
                hash["month"] = Request["month"].nullToStr();             // month       : 기준월 

                hash["t1button"] = Request["t1button"].nullToStr();
                hash["t2button"] = Request["t2button"].nullToStr();
                hash["t3button"] = Request["t2button"].nullToStr();

                mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("getT3_info", hash);
                List<Hashtable> monthList = new List<Hashtable>();  //(value.ToString("00000"));
                int i;

                for (i = 1; i < 13; i++)
                {
                    Hashtable monthData = new Hashtable();
                    monthData.Add("MONTH", i.ToString("00"));
                    monthData.Add("SMSTAT_400", '0');
                    monthData.Add("SMSTAT_500", '0');
                    foreach (var item in list)
                    {
                        if (i.ToString("00") == item["MONTH"].ToString())
                        {
                            monthData["SMSTAT_400"] = item["SMSTAT_400"];
                            monthData["SMSTAT_500"] = item["SMSTAT_500"];
                        }
                    } 
                    monthList.Add(monthData);
                }

                result.Add("LIST", monthList);
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
        

        // 메인 : 매출현황 - 월별 > 통합
        public ActionResult getMonthChartTot()
        {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try
            {

                hash["company_cd"] = User.Identity.Name.Split('|')[2];   // company_cd
                hash["language"] = User.Identity.Name.Split('|')[3];     // 기본언어
                hash["gubun"] = Request["bizGroup"].nullToStr(); //
                hash["bizGroup"] = Request["bizGroup"].nullToStr();      // bizGroup    : 상위 매출조직
                hash["deptGroup"] = Request["deptGroup"].nullToStr();    // deptGroup   : 매출조직
                hash["user_cd"] = Request["user_cd"].nullToStr(); ;       // user_cd     : 영업담당ID
                hash["dstr_type"] = Request["dstr_type"].nullToStr();    // dstr_type   : 유통구조
                hash["sales_base"] = Request["sales_base"].nullToStr();

                hash["t1button"] = Request["t1button"].nullToStr();
                hash["t2button"] = Request["t2button"].nullToStr();
                hash["t3button"] = Request["t2button"].nullToStr();

                string year = Request["year"].nullToStr();               // year        : 기준년 
                string month = Request["month"].nullToStr();             // month       : 기준월

                hash["year"] = year;
                hash["month"] = month;


                hash["yyyymm"] = year + month;
                hash["pre_yyyymm"] = (Convert.ToInt32(year) - 1).ToString() + month;

                hash["yyyypre_mm"] = year + (Convert.ToInt32(month) - 1 == 0 ? "01" : Convert.ToInt32(month) - 1 < 10 ? "0" + (Convert.ToInt32(month) - 1).ToString() : (Convert.ToInt32(month) - 1).ToString());
                hash["pre_yyyypre_mm"] = (Convert.ToInt32(year) - 1).ToString() + (Convert.ToInt32(month) - 1 == 0 ? "01" : Convert.ToInt32(month) - 1 < 10 ? "0" + (Convert.ToInt32(month) - 1).ToString() : (Convert.ToInt32(month) - 1).ToString());

                hash["pre_yyyy01"] = (Convert.ToInt32(year) - 1).ToString() + "01";
                hash["yyyy01"] = year + "01";
                hash["yyyy12"] = year + "12";

                hash["yyyynext_mm"] = year + (Convert.ToInt32(month) + 1 < 10 ? "0" + (Convert.ToInt32(month) + 1).ToString() : (Convert.ToInt32(month) + 1).ToString());

                mapper = Mapper.Instance();
                IEnumerable<Hashtable> list1 = mapper.QueryForList<Hashtable>("getMonthChart1", hash);
                IEnumerable<Hashtable> list2 = mapper.QueryForList<Hashtable>("getMonthChart2", hash);

                List<Hashtable> monthList = new List<Hashtable>();  //(value.ToString("00000"));
                int i;

                for (i = 1; i < 13; i++)
                {
                    Hashtable monthData = new Hashtable();
                    monthData.Add("MONTH", i.ToString("00"));
                    monthData.Add("KRW_AMOUNT1",'0');
                    monthData.Add("KRW_AMOUNT2", '0');
                    foreach(var item in list1)
                    {
                        if(i.ToString("00") == item["MONTH"].ToString())
                        {
                            monthData["KRW_AMOUNT1"] = item["KRW_AMOUNT"];
                        }
                    }
                    foreach (var item in list2)
                    {
                        if (i.ToString("00") == item["MONTH"].ToString())
                        {
                            monthData["KRW_AMOUNT2"] = item["KRW_AMOUNT"];
                        }
                    }
                    monthList.Add(monthData);
                }



                result.Add("LIST", monthList);
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

        // 메인 : 매출누계 - 월별 > 통합
        public ActionResult getNonMonthChartTot()
        {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try
            {

                hash["company_cd"] = User.Identity.Name.Split('|')[2];   // company_cd
                hash["language"] = User.Identity.Name.Split('|')[3];     // 기본언어
                hash["gubun"] = Request["bizGroup"].nullToStr(); //
                hash["bizGroup"] = Request["bizGroup"].nullToStr();      // bizGroup    : 상위 매출조직
                hash["deptGroup"] = Request["deptGroup"].nullToStr();    // deptGroup   : 매출조직
                hash["user_cd"] = Request["user_cd"].nullToStr(); ;       // user_cd     : 영업담당ID
                hash["dstr_type"] = Request["dstr_type"].nullToStr();    // dstr_type   : 유통구조
                hash["wso_psblt"] = "";
                hash["sales_base"] = Request["sales_base"].nullToStr();
                //wso_psblt
                hash["t1button"] = Request["t1button"].nullToStr();
                hash["t2button"] = Request["t2button"].nullToStr();
                hash["t3button"] = Request["t2button"].nullToStr();


                string year = Request["year"].nullToStr();               // year        : 기준년 
                string month = Request["month"].nullToStr();             // month       : 기준월

                hash["year"] = year;
                hash["month"] = month;


                hash["yyyymm"] = year + month;
                hash["pre_yyyymm"] = (Convert.ToInt32(year) - 1).ToString() + month;

                hash["yyyypre_mm"] = year + (Convert.ToInt32(month) - 1 == 0 ? "01" : Convert.ToInt32(month) - 1 < 10 ? "0" + (Convert.ToInt32(month) - 1).ToString() : (Convert.ToInt32(month) - 1).ToString());
                hash["pre_yyyypre_mm"] = (Convert.ToInt32(year) - 1).ToString() + (Convert.ToInt32(month) - 1 == 0 ? "01" : Convert.ToInt32(month) - 1 < 10 ? "0" + (Convert.ToInt32(month) - 1).ToString() : (Convert.ToInt32(month) - 1).ToString());

                hash["pre_yyyy01"] = (Convert.ToInt32(year) - 1).ToString() + "01";
                hash["yyyy01"] = year + "01";
                hash["yyyy12"] = year + "12";

                hash["yyyynext_mm"] = year + (Convert.ToInt32(month) + 1 < 10 ? "0" + (Convert.ToInt32(month) + 1).ToString() : (Convert.ToInt32(month) + 1).ToString());

                mapper = Mapper.Instance();
                IEnumerable<Hashtable> list1 = mapper.QueryForList<Hashtable>("getNomonthChart1", hash);
                IEnumerable<Hashtable> list2 = mapper.QueryForList<Hashtable>("getNomonthChart2", hash);
                IEnumerable<Hashtable> list3 = mapper.QueryForList<Hashtable>("getNomonthChart3", hash);

                List<Hashtable> monthList = new List<Hashtable>();  //(value.ToString("00000"));
                int i;

                for (i = 1; i < 13; i++)
                {
                    Hashtable monthData = new Hashtable();
                    monthData.Add("MONTH", i.ToString("00"));
                    monthData.Add("KRW_AMOUNT1", '0');
                    monthData.Add("KRW_AMOUNT2", '0');
                    monthData.Add("KRW_AMOUNT3", '0');
                    foreach (var item in list1)
                    {
                        if (i.ToString("00") == item["MONTH"].ToString())
                        {
                            monthData["KRW_AMOUNT1"] = item["KRW_AMOUNT"];
                        }
                    }
                    foreach (var item in list2)
                    {
                        if (i.ToString("00") == item["MONTH"].ToString())
                        {
                            monthData["KRW_AMOUNT2"] = item["KRW_AMOUNT"];
                        }
                    }
                    foreach (var item in list3)
                    {
                        if (i.ToString("00") == item["MONTH"].ToString())
                        {
                            monthData["KRW_AMOUNT3"] = item["KRW_AMOUNT"];
                        }
                    }
                    monthList.Add(monthData);
                }



                result.Add("LIST", monthList);
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




        // 메인 : 공지팝업
        public ActionResult MainNoticePopup() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {

                hash["company_cd"] = User.Identity.Name.Split('|')[2];   // company_cd
                hash["language"] = User.Identity.Name.Split('|')[3];     // 기본언어
                hash["user_cd"] = User.Identity.Name.Split('|')[0];       // 사번
                hash["userCd"] = User.Identity.Name.Split('|')[0];       // 사번


                if (hash["company_cd"].Equals("YONWOO")) {
                    mapper = Mapper.Instance();
                    Hashtable user_info = mapper.QueryForObject<Hashtable>("userList", hash);

                    hash["dstr_chn"] = user_info["DSTR_CHN"];


                    // 장기 미수채권 업체 
                    IEnumerable<Hashtable> list1 = mapper.QueryForList<Hashtable>("getUserBadCustList", hash);

                    // 제품문의 사후관리
                    IEnumerable<Hashtable> list2 = mapper.QueryForList<Hashtable>("getUserBadInqList", hash);

                    // 샘플요청 관리
                    IEnumerable<Hashtable> list3 = mapper.QueryForList<Hashtable>("getSmrRequestList", hash);



                    result.Add("LIST1", list1);
                    result.Add("LIST2", list2);
                    result.Add("LIST3", list3);
                    result.Add("success", true);
                }

                
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




        // 메인 : 파트너사
        public ActionResult getMainPartner() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {

                hash["company_cd"] = User.Identity.Name.Split('|')[2];   // company_cd
                hash["language"] = User.Identity.Name.Split('|')[3];     // 기본언어

                hash["bizGroup"] = Request["bizGroup"].nullToStr();      // bizGroup    : 상위 매출조직
                hash["deptGroup"] = Request["deptGroup"].nullToStr();    // deptGroup   : 매출조직
                hash["user_cd"] = Request["user_cd"].nullToStr(); ;      // user_cd     : 영업담당ID

                hash["mode"] = Request["mode"].nullToStr(); 
                hash["selfMode"] = Request["selfMode"].nullToStr(); 


                mapper = Mapper.Instance();

                string base_yy = Request["base_yy"].nullToStr();               // year        : 기준년 
                string base_mm = Request["base_mm"].nullToStr();               // month       : 기준월 
                hash["base_yy"] = base_yy;
                hash["base_mm"] = base_mm;
                string toMonth = base_yy + base_mm;
                string startDay = base_yy + "0101";
                string endDay = toMonth +  DateTime.DaysInMonth(Convert.ToInt32(base_yy), Convert.ToInt32(base_mm));

                hash["mode"] = "toMonth";
                hash["toMonth"] = toMonth;
                IEnumerable<Hashtable> allA = mapper.QueryForList<Hashtable>("mainSampleInfo", hash);

                hash["selfMode"] = "on";
                IEnumerable<Hashtable> allC = mapper.QueryForList<Hashtable>("mainSampleInfo", hash);

                hash.Remove("mode");
                hash.Remove("toMonth");
                hash.Remove("selfMode");

                hash["mode"] = "all";
                hash["startDay"] = startDay;
                hash["endDay"] = endDay;
                IEnumerable<Hashtable> allB = mapper.QueryForList<Hashtable>("mainSampleInfo", hash);
                IEnumerable<Hashtable> allE = mapper.QueryForList<Hashtable>("mainSampleGrefInfo", hash);

                hash["selfMode"] = "on"; 
                hash["smp_status"] = "SMSTAT_700";
                IEnumerable<Hashtable> allD = mapper.QueryForList<Hashtable>("mainSampleInfo", hash);
                IEnumerable<Hashtable> allF = mapper.QueryForList<Hashtable>("mainSampleGrefInfo", hash);

                hash.Remove("mode");
                hash.Remove("toMonth");
                hash.Remove("selfMode");
                hash.Remove("startDay");
                hash.Remove("endDay");

                List<Hashtable> gref1 = new List<Hashtable>();
                List<Hashtable> gref2 = new List<Hashtable>();
                List<Hashtable> gref3 = new List<Hashtable>(); 

                hash["mode"] = "toMonth";
                hash["toMonth"] = toMonth;
                hash["selfMode"] = "on";
                hash["smp_status"] = "SMSTAT_700";
                IEnumerable<Hashtable> gref1Mapa = mapper.QueryForList<Hashtable>("mainSampleGrefInfo2", hash);  
                
                hash["smp_status"] = "SMSTAT_900";
                IEnumerable<Hashtable> gref1Mapb = mapper.QueryForList<Hashtable>("mainSampleGrefInfo2", hash);

                hash.Remove("mode");
                hash.Remove("toMonth");

                hash["mode"] = "all";
                hash["startDay"] = startDay;
                hash["endDay"] = endDay;

                hash["smp_status"] = "SMSTAT_700";
                IEnumerable<Hashtable> gref2Mapa = mapper.QueryForList<Hashtable>("mainSampleGrefInfo2", hash);

                hash["smp_status"] = "SMSTAT_900";
                IEnumerable<Hashtable> gref2Mapb = mapper.QueryForList<Hashtable>("mainSampleGrefInfo2", hash);

                hash.Remove("selfMode");
                hash["smp_status"] = "SMSTAT_700";

                IEnumerable<Hashtable> gref3Mapa = mapper.QueryForList<Hashtable>("mainSampleGrefInfo2", hash);

                hash["smp_status"] = "SMSTAT_900";
                IEnumerable<Hashtable> gref3Mapb = mapper.QueryForList<Hashtable>("mainSampleGrefInfo2", hash);

                List<Hashtable> monthList = new List<Hashtable>();  //(value.ToString("00000"));
                int i;

                var item1 = allE.FirstOrDefault();
                var item2 = allF.FirstOrDefault();

                for (i = 1; i < 13; i++)
                {
                    Hashtable monthData = new Hashtable();
                    monthData.Add("MONTH", i.ToString("00"));
                    /*monthData.Add("OVERALL",item1["MM" + i]);
                    monthData.Add("INDIVIDUAL", item2["MM" + i]);*/
                    monthData.Add("REGIST", item1["MM" + i]);
                    monthData.Add("PRODUCT", item2["MM" + i]);
                    monthList.Add(monthData);
                }

                gref1.Add(gref1Mapa.FirstOrDefault());
                gref1.Add(gref1Mapb.FirstOrDefault());

                gref2.Add(gref2Mapa.FirstOrDefault());
                gref2.Add(gref2Mapb.FirstOrDefault());

                gref3.Add(gref3Mapa.FirstOrDefault());
                gref3.Add(gref3Mapb.FirstOrDefault());


                result.Add("A", allA);      // Sample Status  - Current Month
                result.Add("B", allB);      // Sample Status  - Total
                result.Add("C", allC);      // Personal Sample Status - Current Month
                result.Add("D", allD);      // Personal Sample Status - Total

                // result.Add("E", allE);      // Montly Sample Production Status (Overall Vs Individual) 
                // result.Add("F", allF);      // Montly Sample Production Status (Overall Vs Individual) 
                result.Add("F", monthList);
                result.Add("G1", gref1);   // Current Month Status
                result.Add("G2", gref2);   // Total Status (Individual) 
                result.Add("G3", gref3);   // Total Status (Overall)

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
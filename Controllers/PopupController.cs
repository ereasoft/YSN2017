using IBatisNet.DataMapper;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YSN2017.ComLIB;

namespace YSN2017.Controllers{
    [Authorize(Roles = "User,Admin")]
    public class PopupController : Controller {

        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        // 거래처 찾기 팝업
        public ActionResult popupCustList() {

            Hashtable hash = new Hashtable();

            hash.Add("company_cd", User.Identity.Name.Split('|')[2]);   // 확인필요
            hash.Add("cust_nm", Request.QueryString["cust_nm"]);   // 거래처명
            hash.Add("user_nm", Request.QueryString["user_nm"]);   // 영업담당 이름

            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("popupCustList", hash);


            var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;



        }


        // 영업담당자 찾기 팝업
        public ActionResult popupCustUserList() {

            Hashtable hash = new Hashtable();
            string company_cd = User.Identity.Name.Split('|')[2];
            if (Request.QueryString["company_cd"] != null)
            {
                company_cd = Request.QueryString["company_cd"];
            }
            hash.Add("company_cd", company_cd);
            hash.Add("up_dept_cd", Request.QueryString["up_dept_cd"]);              // up_dept_cd : 상위부서코드
            hash.Add("dept_cd", Request.QueryString["dept_cd"]);                    // dept_cd    : 부서코드
            hash.Add("user_nm", Request.QueryString["user_nm"]);                    // user_nm    : 영업담당 이름
            hash.Add("user_cd", Request.QueryString["user_cd"]);                    // user_cd    : 영업담당 ID

            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("popupCustUserList", hash);


            var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

        }



        // 영업담당자 찾기 팝업
        public ActionResult popupkeymanList() {

            Hashtable hash = new Hashtable();

            hash.Add("company_cd", User.Identity.Name.Split('|')[2]);
            hash.Add("km_nm", Request.QueryString["km_nm"]);                   // km_nm         : 키맨이름
            hash.Add("dept_cd", Request.QueryString["dept_cd"]);               // dept_cd       : 
            hash.Add("km_cds", Request.QueryString["km_cds"]);                 // km_cds        : 
            hash.Add("km_cd", Request.QueryString["km_cd"]);                   // km_cd         : 

            hash.Add("cust_cd", Request.QueryString["cust_cd"]);               // cust_cd       : 키맨 회사코드
            hash.Add("bcust_cd", Request.QueryString["bcust_cd"]);             // bcust_cd      : 
            hash.Add("cust_gubun", Request.QueryString["cust_gubun"]);         // cust_gubun    : 
            hash.Add("sptnr_nm", Request.QueryString["sptnr_nm"]);             // sptnr_nm      :  



            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("popupkeymanList", hash);


            var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

        }



        // 사용자(협업공유자)찾기 팝업
        public ActionResult popupUserList() {

            Hashtable hash = new Hashtable();

            hash.Add("company_cd", User.Identity.Name.Split('|')[2]);
            hash.Add("user_nm", Request.QueryString["user_nm"]);               // user_nm       : 협업공유자
            hash.Add("user_cd", Request.QueryString["user_cd"]);               // user_cd       : 협업공유자ID
            hash.Add("up_dept_cd", Request.QueryString["up_dept_cd"]);         // up_dept_cd    : 상위부서코드
            hash.Add("dept_cd", Request.QueryString["dept_cd"]);               // dept_cd       : 부서코드



            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("popupUserList", hash);


            var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

        }





        // 품목찾기 팝업 - 대분류 항목명 : /Popup/product_item_level1_Grp
        public ActionResult product_item_level1_Grp() {

            Hashtable hash = new Hashtable();



            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("product_item_level1_Grp", hash);


            var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

        }



        // 품목찾기 팝업 - 검색 : /popup/product_item
        public ActionResult product_item() {

            Hashtable hash = new Hashtable();

            hash.Add("company_cd", User.Identity.Name.Split('|')[2]);
            hash.Add("item", Request.QueryString["item"]);                   // item         : 품목코드/명
            hash.Add("item_level1", Request.QueryString["item_level1"]);     // item_level1  : 품목대분류




            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("product_item", hash);


            var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

        }



        // endUser 팝업 - 검색 : /popup/endUserList
        public ActionResult endUserList() {

            Hashtable hash = new Hashtable();

            hash.Add("company_cd", User.Identity.Name.Split('|')[2]);
            hash.Add("euser_nm", Request.QueryString["euser_nm"]);              // euser_nm         : endUser 명
            hash.Add("euser_eng_nm", Request.QueryString["euser_eng_nm"]);      // euser_eng_nm     : endUser 영문명
            hash.Add("euser_cd", Request.QueryString["euser_cd"]);              // euser_cd         : endUser ID




            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("endUserList", hash);


            var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

        }




        // Sample 제작관리 : 등록 - 샘플요청 팝업 : /popup/sampleRequestPopup
        public ActionResult sampleRequestPopup() {

            Hashtable hash = new Hashtable();

            hash["company_cd"] = User.Identity.Name.Split('|')[2];
            hash["language"] = User.Identity.Name.Split('|')[3];       // 기본언어
            hash["rruser_cd"] = User.Identity.Name.Split('|')[0];      // rruser_cd   : 로그인 사용자ID
            hash["smp_status"] = "SMSTAT_070";                         // smp_status  : 진행상태

            hash["cust_cd"] = Request["cust_cd"].nullToStr();           // cust_cd  : 거래처 코드
            hash["cust_nm"] = Request["cust_nm"].nullToStr();           // cust_nm  : 거래처명
            hash["item_nm"] = Request["item_nm"].nullToStr();           // item_nm  : 샘플품목명




            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("sampleRequestPopup", hash);


            var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

        }

        // Sample 기준년도: /popup/base_crny
        public ActionResult base_crny() {

            Hashtable hash = new Hashtable();

            hash["base_yr"] = Request["base_yr"].nullToStr();           // base_yr  : 기준년도




            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("base_crny", hash);


            var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

        }





        // Sample제작승인 - 의뢰반려: /popup/popupSampleReturn
        public ActionResult popupSampleReturn() {

            Hashtable hash = new Hashtable();

            hash["company_cd"] = User.Identity.Name.Split('|')[2];
            hash["language"] = User.Identity.Name.Split('|')[3];                // 기본언어
            hash["smp_cd"] = Request["smp_cd"].nullToStr();                     // smp_cd       : 샘플PK ( T_SAMPLE )
            hash["smp_chasu"] = int.Parse(Request["smp_chasu"].nullToStr());    // smp_chasu    : 차수
            hash["btn_yn"] = Request["btn_yn"].nullToStr();                     // btn_yn       : 파일유무


            ISqlMapper mapper = Mapper.Instance();
            Hashtable sample = mapper.QueryForObject<Hashtable>("selectSampleDetail", hash);
            Hashtable rt = mapper.QueryForObject<Hashtable>("selectSampleReturn", hash);



            if (sample != null) {
                if (sample["SMP_RT_YN"].Equals("Y")) {
                    sample["LOGIN_USER_NM"] = rt["USER_NM"];
                    //sample["LOGIN_DEPT_NM"] = User.Identity.Name.Split('|')[5]; 
                    sample["SMP_RTDATE"] = rt["SMP_RTDATE"] == null ? "" : rt["SMP_RTDATE"].ToString();
                    sample["SMP_RTTYPE"] = rt["SMP_RTTYPE"] == null ? "" : rt["SMP_RTTYPE"].ToString();
                    sample["SMP_RTDESCRIPT"] = rt["SMP_RTDESCRIPT"] == null ? "" : rt["SMP_RTDESCRIPT"].ToString();                    
                    sample["SMP_RT_YN"] = "Y";
                } else {
                    sample["LOGIN_USER_NM"] = User.Identity.Name.Split('|')[1];
                    //sample["LOGIN_DEPT_NM"] = User.Identity.Name.Split('|')[5];
                    sample["SMP_RTDATE"] = DateTime.Now.ToString("yyyyMMdd");
                    sample["SMP_RT_YN"] = "N";
                }

            } else {
                sample = new Hashtable();
                sample["BTN_YN"] = "N";
            }



            var jsonResult = Json(sample, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

        }




        // Sample제작 Drop팝업: /popup/popupSampleDrop
        public ActionResult popupSampleDrop() {

            Hashtable hash = new Hashtable();
            Hashtable result = new Hashtable();
            try {
                hash["company_cd"] = User.Identity.Name.Split('|')[2];
                hash["language"] = User.Identity.Name.Split('|')[3];                // 기본언어
                hash["smp_cd"] = Request["smp_cd"].nullToStr();                     // smp_cd       : 샘플PK ( T_SAMPLE )
                hash["smp_chasu"] = int.Parse(Request["smp_chasu"].nullToStr());    // smp_chasu    : 차수
                hash["smp_status"] = Request["smp_status"] == null ? "SMSTAT_100" : Request["smp_status"].nullToStr();                  // smp_status       : 샘플PK ( T_SAMPLE )



                ISqlMapper mapper = Mapper.Instance();
                Hashtable sample = mapper.QueryForObject<Hashtable>("selectSampleDetail", hash);



                if (sample != null) {
                    Hashtable dropSample = mapper.QueryForObject<Hashtable>("selectDropDetailPopup", hash);
                    if (dropSample != null && dropSample.Count != 0) {
                        sample["LOGIN_USER_NM"] = dropSample["USER_NM"].ToString() ;
                       // sample["LOGIN_DEPT_NM"] = dropSample["DEPT_NM"].ToString().nullToStr();
                        sample["DROP_DAY"] = dropSample["SMP_DRDATE"].ToString();
                        sample["SMP_DRTYPE"] = dropSample["SMP_DRTYPE"].ToString();
                        sample["SMP_DRDESCRIPT"] = dropSample["SMP_DRDESCRIPT"].ToString();
                        sample["SMP_DROP"] = "Y"; 

                    } else {
                        sample["LOGIN_USER_NM"] = User.Identity.Name.Split('|')[1];
                      //  sample["LOGIN_DEPT_NM"] = User.Identity.Name.Split('|')[5];
                        sample["DROP_DAY"] = DateTime.Now.ToString("yyyyMMdd");
                        sample["SMP_DROP"] = "N";
                    } 
                }


                var jsonResult = Json(sample, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;

            } catch (Exception e) {
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }

        }




        // Sample제작 재작업 팝업: /popup/popupSampleRepair
        public ActionResult popupSampleRepair() {

            Hashtable hash = new Hashtable();
            Hashtable result = new Hashtable();
            try {
                hash["company_cd"] = User.Identity.Name.Split('|')[2];
                hash["language"] = User.Identity.Name.Split('|')[3];                // 기본언어
                hash["smp_cd"] = Request["smp_cd"].nullToStr();                     // smp_cd       : 샘플PK ( T_SAMPLE )
                hash["smp_chasu"] = int.Parse(Request["smp_chasu"].nullToStr()) ;    // smp_chasu    : 차수
                String btn_yn = Request["btn_yn"].nullToStr();                      // btn_yn       : 파일유무
                 
                ISqlMapper mapper = Mapper.Instance();
                Hashtable sample = mapper.QueryForObject<Hashtable>("selectSampleDetail", hash);
                Hashtable repair = mapper.QueryForObject<Hashtable>("selectSampleRepair", hash);

                if (btn_yn.Equals("Y")) {
                    repair = null;
                }


                if (sample != null && sample.Count != 0) {
                    if (repair != null && repair.Count != 0) {
                        sample["LOGIN_USER_NM"] = repair["USER_NM"].ToString();
                       // sample["LOGIN_DEPT_NM"] = repair["DEPT_NM"].ToString().nullToStr();
                        sample["REPAIR_DAY"] = repair["SMP_CRDATE"].ToString();
                        sample["SMP_CRTYPE"] = repair["SMP_CRTYPE"].ToString();
                        sample["SMP_CRDESCRIPT"] = repair["SMP_CRDESCRIPT"].ToString();
                        sample["REPAIR_YN"] = "Y";

                    } else {
                        sample["LOGIN_USER_NM"] = User.Identity.Name.Split('|')[1];
                        //sample["LOGIN_DEPT_NM"] = User.Identity.Name.Split('|')[5];
                        sample["REPAIR_DAY"] = DateTime.Now.ToString("yyyyMMdd");
                        sample["REPAIR_YN"] = "N";
                    }
                }



                result.Add("INFO", sample);
                result.Add("REPAIR", repair);


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




        // Sample제작 재작업 팝업: /popup/popupSampleMyRepair
        public ActionResult popupSampleMyRepair() {

            Hashtable hash = new Hashtable();
            Hashtable result = new Hashtable();
            try {
                hash["company_cd"] = User.Identity.Name.Split('|')[2];
                hash["language"] = User.Identity.Name.Split('|')[3];                // 기본언어
                hash["smp_cd"] = Request["smp_cd"].nullToStr();                     // smp_cd       : 샘플PK ( T_SAMPLE )
                hash["smp_chasu"] = int.Parse(Request["smp_chasu"].nullToStr());    // smp_chasu    : 차수
   
                ISqlMapper mapper = Mapper.Instance();
                Hashtable sample = mapper.QueryForObject<Hashtable>("selectSampleDetail", hash);
                Hashtable myrepair = mapper.QueryForObject<Hashtable>("selectSampleMyRepair", hash);

 


                if (sample != null ) {
                    if (myrepair != null && myrepair.Count != 0) {
                        sample["LOGIN_USER_NM"] = myrepair["USER_NM"].ToString();
                        //sample["LOGIN_DEPT_NM"] = myrepair["DEPT_NM"].nullToStr();
                        sample["REPAIR_DAY"] = myrepair["SMP_QRDATE"].ToString(); ;
                        sample["SMP_QRTYPE"] = myrepair["SMP_QRTYPE"].ToString();
                        sample["SMP_QRDESCRIPT"] = myrepair["SMP_QRDESCRIPT"].ToString();
                        sample["REPAIR_YN"] = "Y";

                    } else {
                        sample["LOGIN_USER_NM"] = User.Identity.Name.Split('|')[1];
                       // sample["LOGIN_DEPT_NM"] = User.Identity.Name.Split('|')[5];
                        sample["REPAIR_DAY"] = DateTime.Now.ToString("yyyyMMdd");
                        sample["REPAIR_YN"] = "N";
                    }
                }





                result.Add("INFO", sample);
                result.Add("MYREPAIR", myrepair);


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


        // Sample요청관리 - 의뢰반려: /popup/popupSmrSampleReturn
        public ActionResult popupSmrSampleReturn() {

            Hashtable hash = new Hashtable();

            hash["company_cd"] = User.Identity.Name.Split('|')[2];
            hash["language"] = User.Identity.Name.Split('|')[3];                // 기본언어
            hash["smr_cd"] = Request["smr_cd"].nullToStr();                     // smp_cd       : 샘플PK ( T_SAMPLE )
            hash["smr_chasu"] = int.Parse(Request["smr_chasu"].nullToStr());    // smp_chasu    : 차수
            hash["btn_yn"] = Request["btn_yn"].nullToStr();                     // btn_yn       : 파일유무


            ISqlMapper mapper = Mapper.Instance();
            Hashtable sample = mapper.QueryForObject<Hashtable>("sampleRequestDetail", hash);
            Hashtable rt = mapper.QueryForObject<Hashtable>("selectSmrSampleReturn", hash);



            if (sample != null && hash["btn_yn"].Equals("N")) {

                sample["LOGIN_USER_NM"] = rt["USER_NM"];
                //sample["LOGIN_DEPT_NM"] = User.Identity.Name.Split('|')[5]; 
                sample["SMR_RTDATE"] = rt["SMR_RTDATE"] == null ? "" : rt["SMR_RTDATE"].ToString();
                sample["SMR_RTTYPE"] = rt["SMR_RTTYPE"] == null ? "" : rt["SMR_RTTYPE"].ToString();
                sample["SMR_RTDESCRIPT"] = rt["SMR_RTDESCRIPT"] == null ? "" : rt["SMR_RTDESCRIPT"].ToString();
                sample["BTN_YN"] = "N";


            } else {
                sample["LOGIN_USER_NM"] = User.Identity.Name.Split('|')[1];
                //sample["LOGIN_DEPT_NM"] = User.Identity.Name.Split('|')[5];
                sample["SMR_RTDATE"] = DateTime.Now.ToString("yyyyMMdd");
                sample["BTN_YN"] = "Y";
            }



            var jsonResult = Json(sample, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

        }



        /*
            //sample 재작업 팝업
            @RequestMapping(value = "/popupSampleRepair.do")

            public String popupSampleRepair(ModelMap model,
                    HttpServletRequest request,
                    HttpServletResponse response,
                    @RequestParam Map<String, Object> paramMap,
                    HttpSession session) throws Exception {

                    String btn_yn = StringUtil.nullToStr(paramMap.get("btn_yn"));
                    HashMap<String, Object> user = (HashMap<String, Object>)session.getAttribute("user");
                    paramMap.put("company_cd", ((HashMap<String, Object>)session.getAttribute("user")).get("COMPANY_CD"));
                    paramMap.put("language", CookieUtil.getCookieValue(request, "LANG"));
                    paramMap.put("smp_chasu", new BigDecimal(Integer.parseInt((String)paramMap.get("smp_chasu"))));

                    HashMap sample = getItem("sampleManage.selectSampleDetail", paramMap);

                    HashMap repair = getItem("sampleManage.selectSampleRepair", paramMap);

                    if (btn_yn.equals("Y")) {
                        repair = null;
                    }

                    if (sample != null && sample.size() != 0) {
                        if (repair != null && repair.size() != 0) {
                            sample.put("LOGIN_USER_NM", repair.get("USER_NM"));
                            sample.put("LOGIN_DEPT_NM", repair.get("DEPT_NM"));
                            sample.put("REPAIR_DAY", repair.get("SMP_CRDATE"));
                        } else {
                            sample.put("LOGIN_USER_NM", user.get("USER_NM"));
                            sample.put("LOGIN_DEPT_NM", user.get("DEPT_NM"));
                            sample.put("REPAIR_DAY", DateUtil.getTodayString());
                        }
                    }

                    model.addAttribute("INFO", sample);
                    model.addAttribute("REPAIR", repair);

                    return "sampleManage/sampleRepairPopup";
                    }

                    //sample 자체 재작업 팝업
                    @RequestMapping(value = "/popupSampleMyRepair.do")

            public String popupSampleMyRepair(ModelMap model,
                    HttpServletRequest request,
                    HttpServletResponse response,
                    @RequestParam Map<String, Object> paramMap,
                    HttpSession session) throws Exception {

                    HashMap<String, Object> user = (HashMap<String, Object>) session.getAttribute("user");
                    paramMap.put("company_cd", ((HashMap<String, Object>)session.getAttribute("user")).get("COMPANY_CD"));
                    paramMap.put("language", CookieUtil.getCookieValue(request, "LANG"));
                    paramMap.put("smp_chasu", new BigDecimal(Integer.parseInt((String)paramMap.get("smp_chasu"))));

                    HashMap sample = getItem("sampleManage.selectSampleDetail", paramMap);
                    //selectSampleMyRepair
                    HashMap myrepair = getItem("sampleManage.selectSampleMyRepair", paramMap);

                    if (sample != null) {
                        if (myrepair != null && myrepair.size() != 0) {
                            sample.put("LOGIN_USER_NM", myrepair.get("USER_NM"));
                            sample.put("LOGIN_DEPT_NM", myrepair.get("DEPT_NM"));
                            sample.put("REPAIR_DAY", myrepair.get("SMP_QRDATE"));
                        } else {
                            sample.put("LOGIN_USER_NM", user.get("USER_NM"));
                            sample.put("LOGIN_DEPT_NM", user.get("DEPT_NM"));
                            sample.put("REPAIR_DAY", DateUtil.getTodayString());
                        }
                    }

                    model.addAttribute("INFO", sample);
                    model.addAttribute("MYREPAIR", myrepair);

                    return "sampleManage/sampleMyRepairPopup";
                    }
        */







        // 사업기회 품목 팝업 리스트
        public ActionResult itemSampleList() {

            Hashtable hash = new Hashtable();
            Hashtable result = new Hashtable();
            try {
                hash["company_cd"] = User.Identity.Name.Split('|')[2];
                hash["language"] = User.Identity.Name.Split('|')[3];                // 기본언어
                hash["user_cd"] = Request["user_cd"].nullToStr();                     // smp_cd       : 샘플PK ( T_SAMPLE )
                hash["up_dept_cd"] = Request["up_dept_cd"].nullToStr();    // smp_chasu    : 차수
                hash["dept_cd"] = Request["dept_cd"].nullToStr();           // smp_chasu    : 차수
                hash["biz_type"] = Request["biz_type"].nullToStr();         // smp_chasu    : 차수
                hash["prdt_psblt"] = Request["prdt_psblt"].nullToStr();    // smp_chasu    : 차수
                hash["cust_nm"] = Request["cust_nm"].nullToStr();           // smp_chasu    : 차수
                hash["item_nm"] = Request["item_nm"].nullToStr();           // smp_chasu    : 차수

                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("itemSampleList", hash);


                                
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





        // Sample 재작업 팝업 : /popup/popupSmrRepair
        public ActionResult popupSmrRepair() {

            Hashtable hash = new Hashtable();
            Hashtable result = new Hashtable();
            try {
                hash["company_cd"] = User.Identity.Name.Split('|')[2];
                hash["language"] = User.Identity.Name.Split('|')[3];                // 기본언어

                hash["smr_chasu"] = int.Parse(Request["smr_chasu"].nullToStr());    // smr_chasu    : 차수
                hash["smr_cd"] = Request["smr_cd"].nullToStr();                     // smr_cd       : 샘플요청PK


                ISqlMapper mapper = Mapper.Instance();
                Hashtable sample = mapper.QueryForObject<Hashtable>("sampleRequestDetail", hash);
                Hashtable repair = mapper.QueryForObject<Hashtable>("smrRepairDetail", hash);

                if (sample != null && sample.Count != 0) {
                    if (repair != null && repair.Count != 0) {
                        sample["LOGIN_USER_NM"] = repair["USER_NM"];
                        //sample["LOGIN_DEPT_NM"] = repair["DEPT_NM"];
                        sample["REPAIR_DAY"] = repair["SMR_CRDATE"];
                        sample["SMR_CRTYPE"] = repair["SMR_CRTYPE"];
                        sample["SMR_CRDESCRIPT"] = repair["SMR_CRDESCRIPT"];
                    } else {
                        sample["LOGIN_USER_NM"] = User.Identity.Name.Split('|')[1];
                        sample["LOGIN_DEPT_NM"] = User.Identity.Name.Split('|')[5];
                        sample["REPAIR_DAY"] = DateTime.Now.ToString("yyyyMMdd");
                    }
                }


                result.Add("INFO", sample);
                result.Add("REPAIR", repair);


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




        // Sample 드롭 팝업 : /popup/popupSmrDrop
        public ActionResult popupSmrDrop() {

            Hashtable hash = new Hashtable();
            Hashtable result = new Hashtable();
            try {
                hash["company_cd"] = User.Identity.Name.Split('|')[2];
                hash["language"] = User.Identity.Name.Split('|')[3];                // 기본언어

                hash["smr_chasu"] = int.Parse(Request["smr_chasu"].nullToStr());    // smr_chasu    : 차수
                hash["smr_cd"] = Request["smr_cd"].nullToStr();                     // smr_cd       : 샘플요청PK


                ISqlMapper mapper = Mapper.Instance();
                Hashtable sample = mapper.QueryForObject<Hashtable>("sampleRequestDetail", hash);


                if (sample != null) {
                    Hashtable dropSample = mapper.QueryForObject<Hashtable>("smrDropDetail", hash);
                    if (dropSample != null && dropSample.Count != 0) {
                        sample["LOGIN_USER_NM"] = dropSample["USER_NM"];
                        sample["LOGIN_DEPT_NM"] = dropSample["DEPT_NM"];
                        sample["DROP_DAY"] = dropSample["SMR_DRDATE"];
                        sample["SMR_DRTYPE"] = dropSample["SMR_DRTYPE"];
                        sample["SMR_DRDESCRIPT"] = dropSample["SMR_DRDESCRIPT"];
                        sample["SMR_DROP"] = "YES";

                    } else {
                        if ("KOR".Equals(hash["language"].ToString())) {
                            sample["LOGIN_USER_NM"] = User.Identity.Name.Split('|')[1];
                            sample["LOGIN_DEPT_NM"] = User.Identity.Name.Split('|')[5];
                        } else {
                            if (!"".Equals(User.Identity.Name.Split('|')[1])) {
                                sample["LOGIN_USER_NM"] = User.Identity.Name.Split('|')[1];
                            } else {
                                sample["LOGIN_USER_NM"] = User.Identity.Name.Split('|')[1];
                            }

                            if (!"".Equals(User.Identity.Name.Split('|')[1])) {
                                sample["LOGIN_DEPT_NM"] = User.Identity.Name.Split('|')[5];
                            } else {
                                sample["LOGIN_DEPT_NM"] = User.Identity.Name.Split('|')[5];
                            }
                            DateTime.Now.ToString("yyyyMMdd");
                        }
                        sample["DROP_DAY"] = DateTime.Now.ToString("yyyyMMdd");
                        
                    }
                }


                result.Add("INFO", sample);


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






        // Sample 검토반려 팝업 : /popup/popupSmrCheckReturn
        public ActionResult popupSmrCheckReturn() {

            Hashtable hash = new Hashtable();
            Hashtable result = new Hashtable();
            try {
                hash["company_cd"] = User.Identity.Name.Split('|')[2];
                hash["language"] = User.Identity.Name.Split('|')[3];                // 기본언어

                hash["smr_chasu"] = int.Parse(Request["smr_chasu"].nullToStr());    // smr_chasu    : 차수
                hash["smr_cd"] = Request["smr_cd"].nullToStr();                     // smr_cd       : 샘플요청PK
                hash["btn_yn"] = Request["btn_yn"].nullToStr();                     // btn_yn       : 샘플요청PK


                ISqlMapper mapper = Mapper.Instance();
                Hashtable sample = mapper.QueryForObject<Hashtable>("sampleRequestDetail", hash);
               


                Hashtable rt = mapper.QueryForObject<Hashtable>("smrCheckReturnDetail", hash);
                if (rt != null && hash["btn_yn"].Equals("N")) {
                    sample["LOGIN_USER_NM"] = rt["USER_NM"];
                    sample["LOGIN_DEPT_NM"] = rt["DEPT_NM"];
                    sample["SMR_RVDATE"] = rt["SMR_RVDATE"];
                    sample["SMR_RVTYPE"] = rt["SMR_RVTYPE"];
                    sample["SMR_RVDESCRIPT"] = rt["SMR_RVDESCRIPT"];
                    sample["BTN_YN"] = "N";

                } else {
                    sample["LOGIN_USER_NM"] = User.Identity.Name.Split('|')[1];
                    sample["LOGIN_DEPT_NM"] = User.Identity.Name.Split('|')[5];
                    sample["SMR_RVDATE"] = DateTime.Now.ToString("yyyyMMdd");
                    sample["BTN_YN"] = "Y";
                   
                }

                if (sample == null) {
                    sample = new Hashtable();
                    sample["BTN_YN"] = "N";
                }


                result.Add("INFO", sample);


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
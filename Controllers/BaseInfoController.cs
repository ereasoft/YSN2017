using Excel;
using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Exceptions;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using YSN2017.ComLIB;



namespace YSN2017.Controllers {

    [Authorize(Roles = "User,Admin")]
    public class BaseInfoController : Controller
    {

        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);




        // 기준정보 : 수주목표조회 /BaseInfo/orderTargetList
        public ActionResult orderTargetList()
        {


            Hashtable hash = new Hashtable();

            hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
            hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

            hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
            hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID

            hash["unit"] = Request["unit"].nullToStr();                 // unit         : 금액 단위
            hash["base_yy"] = Request["base_yy"].nullToStr();           // base_yy      : 기준년도
            hash["bizGroup"] = Request["bizGroup"].nullToStr();         // bizGroup     : 매출조직 상위
            hash["deptGroup"] = Request["deptGroup"].nullToStr();       // deptGroup    : 매출조직
            hash["dstr_type"] = Request["dstr_type"].nullToStr();       // dstr_type    : 유통구조
            hash["user_cd"] = Request["user_cd"].nullToStr();           // user_cd      : 영업담당
            hash["biz_type"] = Request["biz_type"].nullToStr();         // biz_type     : 사업유형
            hash["item_type"] = Request["item_type"].nullToStr();       // item_type    : 품목유형
            hash["cust_cd"] = Request["cust_cd"].nullToStr();           // cust_cd      : 거래처id
            hash["cust_nm"] = Request["cust_nm"].nullToStr();           // cust_nm      : 거래처명
            hash["enduser_nm"] = Request["enduser_nm"].nullToStr();     // enduser_nm   : End User
            hash["enduser_cd"] = Request["enduser_cd"].nullToStr();     // enduser_cd   : End User
            hash["bcust_nm"] = Request["bcust_nm"].nullToStr();         // bcust_nm     : 매출처명
            hash["bcust_cd"] = Request["bcust_cd"].nullToStr();         // bcust_cd     : 매출처

            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("orderTargetList", hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;



        }





        // 기준정보 : 매출목표조회 /BaseInfo/salesTargetList
        public ActionResult salesTargetList()
        {


            Hashtable hash = new Hashtable();

            hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
            hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

            hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
            hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID

            hash["unit"] = Request["unit"].nullToStr();                 // unit         : 금액 단위
            hash["base_yy"] = Request["base_yy"].nullToStr();           // base_yy      : 기준년도
            hash["bizGroup"] = Request["bizGroup"].nullToStr();         // bizGroup     : 매출조직 상위
            hash["deptGroup"] = Request["deptGroup"].nullToStr();       // deptGroup    : 매출조직
            hash["dstr_type"] = Request["dstr_type"].nullToStr();       // dstr_type    : 유통구조
            hash["user_cd"] = Request["user_cd"].nullToStr();           // user_cd      : 영업담당
            hash["biz_type"] = Request["biz_type"].nullToStr();         // biz_type     : 사업유형
            hash["item_type"] = Request["item_type"].nullToStr();       // item_type    : 품목유형
            hash["cust_cd"] = Request["cust_cd"].nullToStr();           // cust_cd      : 거래처id
            hash["cust_nm"] = Request["cust_nm"].nullToStr();           // cust_nm      : 거래처명
            hash["enduser_nm"] = Request["enduser_nm"].nullToStr();     // enduser_nm   : End User
            hash["enduser_cd"] = Request["enduser_cd"].nullToStr();     // enduser_cd   : End User
            hash["bcust_nm"] = Request["bcust_nm"].nullToStr();         // bcust_nm     : 매출처명
            hash["bcust_cd"] = Request["bcust_cd"].nullToStr();         // bcust_cd     : 매출처

            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("salesTargetList", hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;



        }



        // 기준정보 : 국가정보 관리 - 국가정보 리스트 /BaseInfo/nationInfoList
        public ActionResult nationInfoList()
        {


            Hashtable hash = new Hashtable();

            hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
            hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

            hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
            hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID


            hash["nat_cd"] = Request["nat_cd"].nullToStr();             // nat_cd     : 국가코드
            hash["nat_nm"] = Request["nat_nm"].nullToStr();             // nat_nm     : 국가명
            hash["nat_eng_nm"] = Request["nat_eng_nm"].nullToStr();     // nat_eng_nm : 국가영문명
            hash["use_yn"] = Request["use_yn"].nullToStr();             // use_yn     : 사용여부


            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("nationInfoList", hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;



        }


        //  기준정보 : 국가정보 관리 - 정보 업데이트 /BaseInfo/nationInfoUpdate
        [HttpPost]
        public ActionResult nationInfoUpdate()
        {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();


                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
                hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID
                hash["nat_cd"] = Request["nat_cd"].nullToStr();
                hash["nat_nm"] = Request["nat_nm"].nullToStr();
                hash["nat_eng_nm"] = Request["nat_eng_nm"].nullToStr();             // nat_cd     : 국가코드
                hash["nat_order"] = Request["nat_order"].nullToStr();
                hash["use_yn"] = Request["use_yn"].nullToStr();             // use_yn     : 사용여부



                mapper.BeginTransaction();


                mapper.Update("nationInfoUpdate", hash);

                mapper.CommitTransaction();



                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }
            catch (DataMapperException e)
            {
                mapper.RollBackTransaction();
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }






        // 기준정보 : 환율정보 관리 - 환율정보 리스트 /BaseInfo/baseCrnyInfoList
        public ActionResult baseCrnyInfoList()
        {

            Hashtable hash = new Hashtable();

            hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
            hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

            hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
            hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID


            hash["base_yr"] = Request["base_yr"].nullToStr();           // base_yr       : 기준년도
            hash["base_crny"] = Request["base_crny"].nullToStr();       // base_crny     : 통화코드
            hash["base_rate"] = Request["base_rate"].nullToStr();       // base_rate     : 환율
            hash["crny_order"] = Request["crny_order"].nullToStr();     // crny_order    : 순서
            hash["use_yn"] = Request["use_yn"].nullToStr();             // use_yn        : 사용여부

            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("baseCrnyInfoList", hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;



        }


        //  기준정보 : 환율정보 관리 - 정보 업데이트 /BaseInfo/baseCrnyInfoUpdate
        [HttpPost]
        public ActionResult baseCrnyInfoUpdate()
        {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();


                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
                hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID

                hash["base_yr"] = Request["base_yr"].nullToStr();           // base_yr       : 기준년도
                hash["base_crny"] = Request["base_crny"].nullToStr();       // base_crny     : 통화코드
                hash["exch_rate"] = Request["base_rate"].nullToStr();       // base_rate     : 환율
                hash["crny_order"] = Request["crny_order"].nullToStr();     // crny_order    : 순서
                hash["use_yn"] = Request["use_yn"].nullToStr();             // use_yn        : 사용여부



                mapper.BeginTransaction();


                mapper.Update("baseCrnyInfoUpdate", hash);

                mapper.CommitTransaction();



                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }
            catch (DataMapperException e)
            {
                mapper.RollBackTransaction();
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }








        // 기준정보 : 수주 목표 엑셀 등록 /BaseInfo/xlsxBaseOrderUpload
        [HttpPost]
        public ActionResult xlsxBaseOrderUpload(HttpPostedFileBase uploadFile)
        {

            HttpPostedFileBase excelFile = Request.Files["excelFile"];

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try
            {

                if (excelFile != null && excelFile.ContentLength > 0)
                {
                    Stream stream = excelFile.InputStream;
                    IExcelDataReader reader = null;

                    if (excelFile.FileName.EndsWith(".xls"))
                    {
                        reader = ExcelReaderFactory.CreateBinaryReader(stream);
                    }
                    else if (excelFile.FileName.EndsWith(".xlsx"))
                    {
                        reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                    }

                    reader.IsFirstRowAsColumnNames = true;

                    DataSet ds = reader.AsDataSet();
                    DataTable dt = ds.Tables[0];
                    XmlTextReader xmlreader = new XmlTextReader(stream);


                    Hashtable hash = new Hashtable();
                    mapper = Mapper.Instance();
                    mapper.BeginTransaction();


                    hash.Add("company_cd", User.Identity.Name.Split('|')[2]);      // company_cd
                    hash.Add("reg_usr", User.Identity.Name.Split('|')[0]);         // user_cd       : 로그인 사용자ID
                    hash.Add("mod_usr", User.Identity.Name.Split('|')[0]);         // user_cd       : 로그인 사용자ID

                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {

                        //logger.Info(ds.Tables[0].Rows[i][0].ToString() + " - " + ds.Tables[0].Rows[i][1].ToString());

                        hash["order_gubun"] = "목표";                                   // sales_gubun  : 확인  
                        hash["dept_cd"] = ds.Tables[0].Rows[i][0].ToString();           // dept_cd  : 부서
                        hash["user_cd"] = ds.Tables[0].Rows[i][1].ToString();           // user_cd  : 영업담당
                        hash["dstr_type"] = ds.Tables[0].Rows[i][2].ToString();         // dstr_type : 유통구조
                        hash["cust_cd"] = ds.Tables[0].Rows[i][3].ToString();           // cust_cd   :  거래처
                        hash["euser_cd"] = ds.Tables[0].Rows[i][4].ToString();          // euser_cd     :  end user
                        hash["biz_type"] = ds.Tables[0].Rows[i][5].ToString();          // biz_type  : 사업유형
                        hash["item_type"] = ds.Tables[0].Rows[i][6].ToString();         // item_type : 품목유형
                        hash["bcust_cd"] = ds.Tables[0].Rows[i][3].ToString();          // bcust_cd    : 확인 매출처
                        hash["base_ym"] = "TARGET";          // base_ym     :  확인
                        hash["order_ym"] = ds.Tables[0].Rows[i][7].ToString();          // sales_ym     :  기준년월
                        hash["krw_amount"] = ds.Tables[0].Rows[i][8].ToString();        // krw_amount        :  
                        hash["psblt_krw_amount"] = ds.Tables[0].Rows[i][8].ToString();  // psblt_krw_amount   :   

                        mapper.Insert("xlsxBaseOrderUpload", hash);

                    }


                    mapper.CommitTransaction();

                    result.Add("success", true);
                    result.Add("baseyy", hash["order_ym"].ToString().Substring(0, 4));
                    var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;

                    return jsonResult;

                }
                else
                {
                    result.Add("success", false);
                    result.Add("errmsg", "no data or type");
                    return Json(result, JsonRequestBehavior.AllowGet);

                }


            }
            catch (DataMapperException e)
            {
                mapper.RollBackTransaction();
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }

        }






        // 기준정보 : 매출 목표 엑셀 등록 /BaseInfo/xlsxBaseSalesUpload
        [HttpPost]
        public ActionResult xlsxBaseSalesUpload(HttpPostedFileBase uploadFile)
        {

            HttpPostedFileBase excelFile = Request.Files["excelFile"];

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try
            {

                if (excelFile != null && excelFile.ContentLength > 0)
                {
                    Stream stream = excelFile.InputStream;
                    IExcelDataReader reader = null;

                    if (excelFile.FileName.EndsWith(".xls"))
                    {
                        reader = ExcelReaderFactory.CreateBinaryReader(stream);
                    }
                    else if (excelFile.FileName.EndsWith(".xlsx"))
                    {
                        reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                    }

                    reader.IsFirstRowAsColumnNames = true;

                    DataSet ds = reader.AsDataSet();
                    DataTable dt = ds.Tables[0];
                    XmlTextReader xmlreader = new XmlTextReader(stream);


                    Hashtable hash = new Hashtable();
                    mapper = Mapper.Instance();
                    mapper.BeginTransaction();


                    hash.Add("company_cd", User.Identity.Name.Split('|')[2]);      // company_cd
                    hash.Add("reg_usr", User.Identity.Name.Split('|')[0]);         // user_cd       : 로그인 사용자ID
                    hash.Add("mod_usr", User.Identity.Name.Split('|')[0]);         // user_cd       : 로그인 사용자ID

                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {

                        //logger.Info(ds.Tables[0].Rows[i][0].ToString() + " - " + ds.Tables[0].Rows[i][1].ToString());

                        hash["sales_gubun"] = "목표";                                   // sales_gubun  : 확인  
                        hash["dept_cd"] = ds.Tables[0].Rows[i][0].ToString();           // dept_cd  : 부서
                        hash["user_cd"] = ds.Tables[0].Rows[i][1].ToString();           // user_cd  : 영업담당
                        hash["dstr_type"] = ds.Tables[0].Rows[i][2].ToString();         // dstr_type : 유통구조
                        hash["cust_cd"] = ds.Tables[0].Rows[i][3].ToString();           // cust_cd   :  거래처
                        hash["euser_cd"] = ds.Tables[0].Rows[i][4].ToString();          // euser_cd     :  end user
                        hash["biz_type"] = ds.Tables[0].Rows[i][5].ToString();          // biz_type  : 사업유형
                        hash["item_type"] = ds.Tables[0].Rows[i][6].ToString();         // item_type : 품목유형
                        hash["bcust_cd"] = ds.Tables[0].Rows[i][3].ToString();          // bcust_cd    : 확인 매출처
                        hash["base_ym"] = "TARGET";          // base_ym     :  확인
                        hash["sales_ym"] = ds.Tables[0].Rows[i][7].ToString();          // sales_ym     :  기준년월
                        hash["krw_amount"] = ds.Tables[0].Rows[i][8].ToString();        // krw_amount        :  
                        hash["psblt_krw_amount"] = ds.Tables[0].Rows[i][8].ToString();  // psblt_krw_amount   :   

                        mapper.Insert("xlsxBaseSalesUpload", hash);

                    }


                    mapper.CommitTransaction();

                    result.Add("success", true);
                    result.Add("baseyy", hash["sales_ym"].ToString().Substring(0, 4));
                    var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;

                    return jsonResult;

                }
                else
                {
                    result.Add("success", false);
                    result.Add("errmsg", "no data or type");
                    return Json(result, JsonRequestBehavior.AllowGet);

                }


            }
            catch (DataMapperException e)
            {
                mapper.RollBackTransaction();
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }

        }





        //  기준정보 : 수주 목표 엑셀 - 업데이트 /BaseInfo/xlsxBaseOrderUpdate
        [HttpPost]
        public ActionResult xlsxBaseOrderUpdate()
        {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();

                long[] MonAmount = new long[12];

                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드 
                hash["order_gubun"] = "목표";         // sales_gubun  : 확인  
                hash["dept_cd"] = Request["dept_cd"].nullToStr();             // dept_cd  : 부서
                hash["user_cd"] = Request["user_cd"].nullToStr();             // user_cd  : 영업담당
                hash["dstr_type"] = Request["dstr_type"].nullToStr();         // dstr_type : 유통구조
                hash["biz_type"] = Request["biz_type"].nullToStr();           // biz_type  : 사업유형
                hash["item_type"] = Request["item_type"].nullToStr();         // item_type : 품목유형
                hash["cust_cd"] = Request["cust_cd"].nullToStr();             // cust_cd   :  거래처
                hash["euser_cd"] = Request["euser_cd"].nullToStr();           // euser_cd     :  end user
                hash["bcust_cd"] = Request["bcust_cd"].nullToStr();           // bcust_cd    : 확인 매출처
                hash["base_ym"] = "TARGET";            // base_ym     :  확인
                hash["base_yy"] = Request["base_yy"].nullToStr();

                mapper.BeginTransaction();

                for (int i = 1; i < 13; i++)
                {
                    hash["order_ym"] = hash["base_yy"].ToString() + i.ToString("00");
                    hash["krw_amount"] = Request["m" + i.ToString("00")].nullToStr();       // krw_amount        :  
                    hash["psblt_krw_amount"] = hash["krw_amount"]; // psblt_krw_amount   : 
                    mapper.Update("xlsxBaseOrderUpdate", hash);
                }


                mapper.CommitTransaction();


                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }
            catch (DataMapperException e)
            {
                mapper.RollBackTransaction();
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        //  기준정보 : 수주 목표 엑셀 - 업데이트 /BaseInfo/xlsxBaseOrderUpdate
        [HttpPost]
        public ActionResult xlsxBaseOrderUpdate_bak()
        {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();


                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

                hash["order_gubun"] = "목표";         // sales_gubun  : 확인  
                hash["dept_cd"] = Request["dept_cd"].nullToStr();             // dept_cd  : 부서
                hash["user_cd"] = Request["user_cd"].nullToStr();             // user_cd  : 영업담당
                hash["dstr_type"] = Request["dstr_type"].nullToStr();         // dstr_type : 유통구조
                hash["biz_type"] = Request["biz_type"].nullToStr();           // biz_type  : 사업유형
                hash["item_type"] = Request["item_type"].nullToStr();         // item_type : 품목유형
                hash["cust_cd"] = Request["cust_cd"].nullToStr();             // cust_cd   :  거래처
                hash["euser_cd"] = Request["euser_cd"].nullToStr();           // euser_cd     :  end user
                hash["bcust_cd"] = Request["bcust_cd"].nullToStr();           // bcust_cd    : 확인 매출처
                hash["base_ym"] = "TARGET";            // base_ym     :  확인
                hash["order_ym"] = Request["order_ym"].nullToStr();           // order_ym     :  기준년월
                hash["krw_amount"] = Request["krw_amount"].nullToStr();       // krw_amount        :  
                hash["psblt_krw_amount"] = Request["psblt_krw_amount"].nullToStr(); // psblt_krw_amount   :   
                hash["xlsx_pk"] = Request["xlsx_pk"].nullToStr();             // xlsx_pk   : 업데이트 pk 


                mapper.BeginTransaction();

                mapper.Update("xlsxBaseOrderUpdate", hash);

                mapper.CommitTransaction();


                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }
            catch (DataMapperException e)
            {
                mapper.RollBackTransaction();
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }


        //  기준정보 : 매출 목표 엑셀 - 업데이트 /BaseInfo/xlsxBaseSalesUpdate
        [HttpPost]
        public ActionResult xlsxBaseSalesUpdate()
        {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();


                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

                hash["sales_gubun"] = "목표";     // sales_gubun    : 확인  
                hash["dept_cd"] = Request["dept_cd"].nullToStr();             // dept_cd        : 부서
                hash["user_cd"] = Request["user_cd"].nullToStr();             // user_cd        : 영업담당
                hash["dstr_type"] = Request["dstr_type"].nullToStr();         // dstr_type      : 유통구조
                hash["biz_type"] = Request["biz_type"].nullToStr();           // biz_type       : 사업유형
                hash["item_type"] = Request["item_type"].nullToStr();         // item_type      : 품목유형
                hash["cust_cd"] = Request["cust_cd"].nullToStr();             // cust_cd        : 거래처
                hash["euser_cd"] = Request["euser_cd"].nullToStr();           // euser_cd       : end user
                hash["bcust_cd"] = Request["bcust_cd"].nullToStr();           // bcust_cd       : 확인 매출처
                hash["base_ym"] = "TARGET";            // base_ym        : 확인
                hash["sales_ym"] = Request["sales_ym"].nullToStr();           // sales_ym       : 기준년월
                hash["krw_amount"] = Request["krw_amount"].nullToStr();       // krw_amount        :  
                hash["psblt_krw_amount"] = Request["psblt_krw_amount"].nullToStr(); // psblt_krw_amount   :   
                hash["xlsx_pk"] = Request["xlsx_pk"].nullToStr();             // xlsx_pk   : 업데이트 pk 
                hash["base_yy"] = Request["base_yy"].nullToStr();

                mapper.BeginTransaction();

                for (int i = 1; i < 13; i++)
                {
                    hash["sales_ym"] = hash["base_yy"].ToString() + i.ToString("00");
                    hash["krw_amount"] = Request["m" + i.ToString("00")].nullToStr();       // krw_amount        :  
                    hash["psblt_krw_amount"] = hash["krw_amount"]; // psblt_krw_amount   : 
                    mapper.Update("xlsxBaseSalesUpdate", hash);
                }


                mapper.CommitTransaction();


                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }
            catch (DataMapperException e)
            {
                mapper.RollBackTransaction();
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }






        // 기준정보 : 수주목표 - 엑셀조회 /BaseInfo/xlsxBaseOrderList
        public ActionResult xlsxBaseOrderList()
        {


            Hashtable hash = new Hashtable();

            hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
            hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

            hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
            hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID


            hash["base_yy"] = Request["base_yy"].nullToStr();           // base_yy      : 기준년도
            hash["bizGroup"] = Request["bizGroup"].nullToStr();         // bizGroup     : 매출조직 상위
            hash["deptGroup"] = Request["deptGroup"].nullToStr();       // deptGroup    : 매출조직
            hash["dstr_type"] = Request["dstr_type"].nullToStr();       // dstr_type    : 유통구조
            hash["user_cd"] = Request["user_cd"].nullToStr();           // user_cd      : 영업담당
            hash["biz_type"] = Request["biz_type"].nullToStr();         // biz_type     : 사업유형
            hash["item_type"] = Request["item_type"].nullToStr();       // item_type    : 품목유형
            hash["cust_cd"] = Request["cust_cd"].nullToStr();           // cust_cd      : 거래처id
            hash["cust_nm"] = Request["cust_nm"].nullToStr();           // cust_nm      : 거래처명
            hash["enduser_nm"] = Request["enduser_nm"].nullToStr();     // enduser_nm   : End User
            hash["enduser_cd"] = Request["enduser_cd"].nullToStr();     // enduser_cd   : End User
            hash["bcust_nm"] = Request["bcust_nm"].nullToStr();         // bcust_nm     : 매출처명
            hash["bcust_cd"] = Request["bcust_cd"].nullToStr();         // bcust_cd     : 매출처

            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("xlsxBaseOrderList", hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;



        }





        // 기준정보 : 매출목표 - 엑셀조회 /BaseInfo/xlsxBaseSalesList
        public ActionResult xlsxBaseSalesList()
        {


            Hashtable hash = new Hashtable();

            hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
            hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

            hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
            hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID


            hash["base_yy"] = Request["base_yy"].nullToStr();           // base_yy      : 기준년도
            hash["bizGroup"] = Request["bizGroup"].nullToStr();         // bizGroup     : 매출조직 상위
            hash["deptGroup"] = Request["deptGroup"].nullToStr();       // deptGroup    : 매출조직
            hash["dstr_type"] = Request["dstr_type"].nullToStr();       // dstr_type    : 유통구조
            hash["user_cd"] = Request["user_cd"].nullToStr();           // user_cd      : 영업담당
            hash["biz_type"] = Request["biz_type"].nullToStr();         // biz_type     : 사업유형
            hash["item_type"] = Request["item_type"].nullToStr();       // item_type    : 품목유형
            hash["cust_cd"] = Request["cust_cd"].nullToStr();           // cust_cd      : 거래처id
            hash["cust_nm"] = Request["cust_nm"].nullToStr();           // cust_nm      : 거래처명
            hash["enduser_nm"] = Request["enduser_nm"].nullToStr();     // enduser_nm   : End User
            hash["enduser_cd"] = Request["enduser_cd"].nullToStr();     // enduser_cd   : End User
            hash["bcust_nm"] = Request["bcust_nm"].nullToStr();         // bcust_nm     : 매출처명
            hash["bcust_cd"] = Request["bcust_cd"].nullToStr();         // bcust_cd     : 매출처

            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("xlsxBaseSalesList", hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;



        }


        // 기준정보 : 프로젝트관리 - 목록조회 /BaseInfo/projectMngList
        public ActionResult projectMngList()
        {

            Hashtable hash = new Hashtable();

            hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
            hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

            hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
            hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID
            hash["bizGroup"] = Request["bizGroup"].nullToStr();         // bizGroup     : 매출조직 상위
            hash["deptGroup"] = Request["deptGroup"].nullToStr();       // deptGroup    : 매출조직
            hash["user_cd"] = Request["user_cd"].nullToStr();           // user_cd      : 영업담당
            hash["s_reg_date"] = Request["sdate"].nullToStr();
            hash["e_reg_date"] = Request["edate"].nullToStr();
            hash["pjt_nm"] = Request["pjt_nm"].nullToStr();
            hash["pjt_cd"] = Request["pjt_cd"].nullToStr();
            hash["biz_type"] = Request["biz_type"].nullToStr();
            hash["end_yn"] = Request["end_yn"].nullToStr();
            hash["cust_nm"] = Request["cust_nm"].nullToStr();
            hash["cust_cd"] = Request["cust_cd"].nullToStr();
            hash["smp_cd"] = Request["smp_cd"].nullToStr();
            hash["dstr_type"] = Request["dstr_type"].nullToStr();
            hash["use_yn"] = Request["use_yn"].nullToStr();
            hash["end_user"] = Request["end_user"].nullToStr();

            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("projectMngList", hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

        }
        // 기준정보 : 프로젝트관리 - 상세 /BaseInfo/projectDetail
        public ActionResult projectDetail()
        {

            if (Request["pjt_cd"] != null)
            {

                Hashtable hash = new Hashtable();

                hash.Add("language", User.Identity.Name.Split('|')[3]);     // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);   // 회사코드 
                hash.Add("pjt_cd", Request["pjt_cd"]);


                ISqlMapper mapper = Mapper.Instance();
                IEnumerable list = mapper.QueryForObject<IEnumerable>("projectDetail", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }
            else
            {
                return new EmptyResult();
            }

        }

        // 기준정보 : 프로젝트관리 - 등록 /BaseInfo/insertProject
        [HttpPost]
        public ActionResult insertProject()
        {

            ISqlMapper mapper = null;  
            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();

                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);      // company_cd
                hash.Add("reg_usr", User.Identity.Name.Split('|')[0]);         // user_cd       : 로그인 사용자ID
                hash["mod_usr"] = User.Identity.Name.Split('|')[0];

                hash["smp_cd"] = Request["smp_cd"].nullToStr();              //  smp_chasu   : 샘플차수
                hash["smp_chasu"] = Request["smp_chasu"].nullToStr();        //  smp_chasu   : 샘플차수
                hash["pjt_nm"] = Request["pjt_nm"].nullToStr();
                hash["cust_cd"] = Request["cust_cd"].nullToStr();
                hash["eusr_cd"] = Request["euser_cd"].nullToStr();
                hash["user_cd"] = Request["user_cd"].nullToStr();
                hash["dept_cd"] = Request["dept_cd"].nullToStr();
                hash["base_crny"] = Request["base_crny"].nullToStr();
                hash["biz_type"] = Request["biz_type"].nullToStr();
                hash["dstr_type"] = Request["dstr_type"].nullToStr();
                hash["pjt_sdate"] = Request["sdate"].nullToStr();
                hash["pjt_edate"] = Request["edate"].nullToStr();
                hash["end_yn"] = Request["end_yn"].nullToStr();
                hash["use_yn"] = Request["use_yn"].nullToStr(); 

                mapper.BeginTransaction();
                mapper.Insert("insertProject", hash);
                mapper.CommitTransaction();
                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (DataMapperException e)
            {
                mapper.RollBackTransaction();
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        // 기준정보 : 프로젝트관리 - 수정 /BaseInfo/updateProject
        [HttpPost]
        public ActionResult updateProject()
        {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();

                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);      // company_cd
                hash.Add("reg_usr", User.Identity.Name.Split('|')[0]);         // user_cd       : 로그인 사용자ID
                hash["mod_usr"] = User.Identity.Name.Split('|')[0];

                hash["smp_cd"] = Request["smp_cd"].nullToStr();              //  smp_chasu   : 샘플차수
                hash["smp_chasu"] = Request["smp_chasu"].nullToStr();        //  smp_chasu   : 샘플차수
                hash["pjt_nm"] = Request["pjt_nm"].nullToStr();
                hash["pjt_cd"] = Request["pjt_cd"].nullToStr();
                hash["cust_cd"] = Request["cust_cd"].nullToStr();
                hash["eusr_cd"] = Request["euser_cd"].nullToStr();
                hash["user_cd"] = Request["user_cd"].nullToStr();
                hash["dept_cd"] = Request["dept_cd"].nullToStr();
                hash["base_crny"] = Request["base_crny"].nullToStr();
                hash["biz_type"] = Request["biz_type"].nullToStr();
                hash["dstr_type"] = Request["dstr_type"].nullToStr();
                hash["pjt_sdate"] = Request["sdate"].nullToStr();
                hash["pjt_edate"] = Request["edate"].nullToStr();
                hash["end_yn"] = Request["end_yn"].nullToStr();
                hash["use_yn"] = Request["use_yn"].nullToStr();

                mapper.BeginTransaction();
                mapper.Update("updateProject", hash);
                mapper.CommitTransaction();
                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;
            }
            catch (DataMapperException e)
            {
                mapper.RollBackTransaction();
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        // 기준정보 : 프로젝트관리 - 프로젝트검색 /BaseInfo/pjt
        public ActionResult pjt()
        {

            Hashtable hash = new Hashtable();

            hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
            hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드
             
            hash["user_cd"] = Request["user_cd"].nullToStr();           // user_cd      : 영업담당
            hash["user_nm"] = Request["user_nm"].nullToStr(); 
            hash["pjt_nm"] = Request["pjt_nm"].nullToStr();  
            hash["cust_nm"] = Request["cust_nm"].nullToStr(); 

            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("pjt", hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

        }
    }
    }
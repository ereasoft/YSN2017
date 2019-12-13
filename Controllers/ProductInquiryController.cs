using Excel;
using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Exceptions;
using LumenWorks.Framework.IO.Csv;
using OfficeOpenXml;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using YSN2017.ComLIB;

namespace YSN2017.Controllers
{

    [Authorize(Roles = "User,Admin")]
    public class ProductInquiryController : Controller
    {


        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);




        // 제품문의/사후조치 : 리스트
        public ActionResult inquiryList()
        {
            Hashtable jsonData = new Hashtable();
            try
            {
                if (Request.QueryString["inq_rsdate"] != null)
                {

                    Hashtable hash = new Hashtable();

                    //hash.Add("company_cd", User.Identity.Name.Split('|')[2]);           // company_cd     :    
                    string company_cd2 = Request.QueryString["company_cd"] == null ? "YONWOO" : Request.QueryString["company_cd"];
                    hash.Add("company_cd", "YONWOO");
                    hash.Add("company_cd2", company_cd2);  // company_cd     :   

                    if (Request.QueryString["language"] == null)
                    {

                        hash.Add("language", User.Identity.Name.Split('|')[3]);
                    }
                    else
                    {
                        hash.Add("language", Request.QueryString["language"]);           // 기본언어
                    }                                                                 // hash.Add("inq_ruser_nm", Request.QueryString["inq_ruser_nm"]);      // inq_ruser_nm   : 
                                                                                      // hash.Add("inq_ruser_cd", Request.QueryString["inq_ruser_cd"]);      // inq_ruser_cd   : 
                    hash.Add("pi_state", Request.QueryString["pi_state"]);              // pi_state       :  
                                                                                        //                : 
                    hash.Add("user_cd", Request.QueryString["user_cd"]);                // user_cd        : 영업담당ID
                    hash.Add("inq_rsdate", Request.QueryString["inq_rsdate"]);          // inq_rsdate     : 접수일 시작
                    hash.Add("inq_redate", Request.QueryString["inq_redate"]);          // inq_redate     : 접수일 종료
                                                                                        //                : 
                    hash.Add("inq_type", Request.QueryString["inq_type"]);              // inq_type       : 문의유형
                    hash.Add("inq_chnl", Request.QueryString["inq_chnl"]);              // inq_chnl       : 문의경로
                    hash.Add("inq_status", Request.QueryString["inq_status"]);          // inq_status     : 진행사항
                                                                                        //                : 
                    hash.Add("dstr_type", Request.QueryString["dstr_type"]);            // dstr_type      : 유통구조
                    hash.Add("deptGroup", Request.QueryString["deptGroup"]);            // deptGroup      : 매출조직 부서
                    hash.Add("bizGroup", Request.QueryString["bizGroup"]);              // bizGroup       : 매출조직 상위부서
                    hash.Add("order_yn", (Request.QueryString["order_yn"] == "true" ? "Y" : ""));
                    hash["nat_cd"] = Request["nat_cd"].nullToStr();

                    ISqlMapper mapper = Mapper.Instance();
                    IEnumerable<Hashtable> list;
                    IEnumerable<Hashtable> etc;
                    if (company_cd2.Equals("YONWOO"))
                    {
                        list = mapper.QueryForList<Hashtable>("inquiryList", hash);
                        etc = mapper.QueryForList<Hashtable>("inquiryRegCnt", hash);
                    }
                    else
                    {
                        list = mapper.QueryForList<Hashtable>("inquiryList_pt", hash);
                        etc = mapper.QueryForList<Hashtable>("inquiryRegCnt_pt", hash);
                    }

                    
                    jsonData.Add("ETC", etc);
                    jsonData.Add("COUNT", list.Count());
                    jsonData.Add("LIST", list);


                    var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;

                    return jsonResult;

                }
                else
                {
                    return new EmptyResult();
                }
            }
            catch (DataMapperException e)
            { 
                logger.Info(e.Message);
                jsonData.Add("success", false);
                jsonData.Add("errmsg", e.Message);
                return Json(jsonData, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            { 
                logger.Info(e.Message);
                jsonData.Add("success", false);
                jsonData.Add("errmsg", e.Message);
                return Json(jsonData, JsonRequestBehavior.AllowGet);
            }

        }





        // 제품문의/사후조치 : 리스트 상단 건수
        public ActionResult inquiryRegCnt()
        {

            if (Request.QueryString["inq_rsdate"] != null)
            {

                Hashtable hash = new Hashtable();

                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);           // company_cd     : 

                hash.Add("user_cd", Request.QueryString["user_cd"]);                // user_cd        : 영업담당ID
                hash.Add("inq_rsdate", Request.QueryString["inq_rsdate"]);          // inq_rsdate     : 접수일 시작
                hash.Add("inq_redate", Request.QueryString["inq_redate"]);          // inq_redate     : 접수일 종료
                                                                                    //                : 
                hash.Add("inq_type", Request.QueryString["inq_type"]);              // inq_type       : 문의유형
                hash.Add("inq_chnl", Request.QueryString["inq_chnl"]);              // inq_chnl       : 문의경로
                hash.Add("inq_status", Request.QueryString["inq_status"]);          // inq_status     : 진행사항
                                                                                    //                : 
                hash.Add("dstr_type", Request.QueryString["dstr_type"]);            // dstr_type      : 유통구조
                hash.Add("deptGroup", Request.QueryString["deptGroup"]);            // deptGroup      : 매출조직 부서
                hash.Add("bizGroup", Request.QueryString["bizGroup"]);              // bizGroup       : 매출조직 상위부서
                hash.Add("order_yn", (Request.QueryString["order_yn"] == "true" ? "Y" : ""));
                hash["nat_cd"] = Request["nat_cd"].nullToStr();

                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("inquiryRegCnt", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }
            else
            {
                return new EmptyResult();
            }

        }







        // 제품문의/사후조치 : 상세내용
        public ActionResult inquiryDetail()
        {

            if (Request.QueryString["inq_cd"] != null)
            {

                Hashtable hash = new Hashtable();

                hash.Add("company_cd", "YONWOO");         // 회사코드     
                if (Request.QueryString["language"] == null)
                {

                    hash.Add("language", User.Identity.Name.Split('|')[3]);
                }
                else
                {
                    hash.Add("language", Request.QueryString["language"]);           // 기본언어
                }                                                                 // hash.Add("inq_ru

                hash.Add("inq_cd", Request.QueryString["inq_cd"]);                // inq_cd :  제품문의 사후조치PK ( T_PRDT_INQRY )


                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("inquiryDetail", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }
            else
            {
                return new EmptyResult();
            }

        }




        // 제품문의/사후조치 : 상세내용 문의제품 항목
        public ActionResult inquiryItemList()
        {

            if (Request.QueryString["inq_cd"] != null)
            {

                Hashtable hash = new Hashtable();

                hash.Add("company_cd", "YONWOO");           // company_cd     : 회사코드

                hash.Add("inq_cd", Request.QueryString["inq_cd"]);                // inq_cd        : 문의제품 항목PK ( T_PRDT_INQRY_ITEM )



                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("inquiryItemList", hash);

                 List<Hashtable> itemList = new List<Hashtable>();
                foreach (var items in list)
                {
                    Hashtable Data = new Hashtable();
                    String inq_item_gb = "";
                    String inq_item_nm = "";
                    if (items["INQ_ITEM_NM"] != null && !items["INQ_ITEM_NM"].ToString().Equals(""))
                    {
                        if(items["INQ_ITEM_NM"].ToString().IndexOf("[") == 0) {
                            inq_item_gb = items["INQ_ITEM_NM"].ToString().Replace("[", "").Split(']')[0];
                            inq_item_nm = items["INQ_ITEM_NM"].ToString().Replace("[", "").Split(']')[1];
                        }else{
                            inq_item_nm = items["INQ_ITEM_NM"].ToString();
                        }
                    }
                    if(inq_item_nm == "") inq_item_nm =  "없음" ;
                    Data.Add("INQ_CD", items["INQ_CD"]);
                    Data.Add("SEQ_NO", items["SEQ_NO"]);
                    Data.Add("INQ_ITEM_GB", inq_item_gb);
                    Data.Add("INQ_ITEM_NM", inq_item_nm);
                    itemList.Add(Data);
                }


                var jsonResult = Json(itemList, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }
            else
            {
                return new EmptyResult();
            }

        }






        // 제품문의/사후조치 : 등록
        [HttpPost, ValidateInput(false)]
        public ActionResult inquiryRegNew()
        {

            ISqlMapper mapper = null;

            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();

                //hash.Add("company_cd", User.Identity.Name.Split('|')[2]);      // company_cd
                hash.Add("company_cd", "YONWOO");
                hash.Add("reg_usr", User.Identity.Name.Split('|')[0]);         // user_cd       : 로그인 사용자ID
                hash.Add("mod_usr", User.Identity.Name.Split('|')[0]);         // user_cd       : 로그인 사용자ID


                String inq_cd = Request["inq_cd"].nullToStr();                  // inq_cd        :  제품문의PK ( T_PRDT_INQRY )
                String inq_status = Request["inq_status"].nullToStr();          // inq_status    :  진행사항
                hash.Add("inq_chnl", Request["inq_chnl"].nullToStr());          // inq_chnl      :  문의경로 코드
                hash.Add("inq_type", Request["inq_type"].nullToStr());          // inq_type      :  문의유형 코드
                hash.Add("inq_ruser_cd", User.Identity.Name.Split('|')[0]);     // inq_ruser_cd  :  접수담당자ID
                hash.Add("user_cd", Request["user_cd"].nullToStr());            // user_cd       :  사후 조취자ID
                hash.Add("dept_cd", Request["dept_cd"].nullToStr());            // dept_cd       :  사후 조취자 부서 코드
                hash.Add("dlv_user_cd", Request["dlv_user_cd"].nullToStr());    // dlv_user_cd   :  전달자ID
                hash.Add("dstr_type", Request["dstr_type"].nullToStr());        // dstr_type     :  유통구조 코드

                hash.Add("inq_user_nm", Request["inq_user_nm"].nullToStr());    // inq_user_nm   :  문의자 이름
                hash.Add("inq_email", Request["inq_email"].nullToStr());        // inq_email     :  문의자 이메일
                hash.Add("inq_mphone", Request["inq_mphone"].nullToStr());      // inq_mphone    :  문의자 핸드폰
                hash.Add("post_arng", Request["post_arng"].nullToStr());        // post_arng     :  조취내역
                hash.Add("inq_contents", Request["inq_contents"].nullToStr());  // inq_contents  :  문의내용
                hash.Add("nat_cd", Request["nat_cd"].nullToStr());              // nat_cd        :  국가코드
                hash.Add("addchk", Request["addchk"].nullToStr());            //수정이면
                hash.Add("inq_addr", Request["inq_addr"].nullToStr());          // inq_addr      :  문의 주소
                hash.Add("inq_company", Request["inq_company"].nullToStr());    // inq_company   :  문의 회사
                    hash.Add("order_yn", Request["order_yn"].nullToStr());
                   if (!Request["order_amount"].Equals("")) hash.Add("order_amount", Request["order_amount"]); 


                /*
                    String inq_cd = Request["inq_cd"].nullToStr();
                    String inq_status = Request["inq_status"].nullToStr();
                    hash.Add("inq_chnl", "INQCH_100");          // inq_chnl      :  문의경로 코드
                    hash.Add("inq_type", "INQTP_100");          // inq_type      :  문의유형 코드
                    hash.Add("inq_ruser_cd", User.Identity.Name.Split('|')[0]);  // inq_ruser_cd  :  접수담당자ID
                    hash.Add("user_cd", "13080503");                    // user_cd       :  사후 조취자ID
                    hash.Add("dept_cd", "106");                    // dept_cd       :  사후 조취자 부서 코드
                    hash.Add("dlv_user_cd", User.Identity.Name.Split('|')[0]);                // dlv_user_cd   :  전달자ID
                    hash.Add("dstr_type", "8004005");           // dstr_type     :  유통구조 코드

                    hash.Add("inq_user_nm", "이태석");          // inq_user_nm   :  문의자 이름
                    hash.Add("inq_email", "aaa@bbb.com");      // inq_email     :  문의자 이메일
                    hash.Add("inq_mphone", "010-1111-2222");   // inq_mphone    :  문의자 핸드폰
                    hash.Add("post_arng", "조취내역");                 // post_arng     :  조취내역
                    hash.Add("inq_contents", "문의내용 수정");       // inq_contents  :  문의내용
                    hash.Add("nat_cd", "NLD");                 // nat_cd        :  국가코드
                 */


                mapper.BeginTransaction();

                if (inq_status.Equals("INQSTAT_100"))
                { //접수등록

                    if (!inq_cd.Equals(""))
                    {
                        // 제품문의 수정
                        hash.Add("inq_cd", inq_cd);
                        hash.Add("inq_status", inq_status);
                        if (hash["addchk"].Equals("yes"))
                        {
                            mapper.Update("updatePrductInquiryAll", hash);
                        }
                        else
                        {
                            mapper.Update("updatePrductInquiry", hash);
                        }

                    }
                    else
                    {
                        // 제품문의 신규등록
                        String hash_cd = (String)mapper.Insert("insertProudctInquiry", hash);

                    }


                    String[] inq_item_nms = Request.Form.GetValues("inq_item_nm");
                    //string[] inq_item_nms = new string[] {"item1","item2" };

                    if (inq_item_nms != null && inq_item_nms.Length > 0)
                    {
                        // 문의제품 항목 데이터 삭제
                        mapper.Delete("deleteProductInquiryItem", hash);
                        for (int i = 0; i < inq_item_nms.Length; i++)
                        {
                            hash["inq_item_nm"] = inq_item_nms[i].nullToStr();
                            // 문의제품 항목 등록
                            mapper.Insert("insertProductInquiryItem", hash);
                        }
                    }


                }
                else
                {
                    /*
                    INQSTAT_100   > 접수등록   
                    INQSTAT_200   > 문의전달
                    dlv_cancel    > 전달취소  
                    user_redirect > 사후조취자 재지정   
                    INQSTAT_300   > 전달반려   
                    INQSTAT_400   > 회신후 대기
                    INQSTAT_500   > 상담중     
                    INQSTAT_600   > 상담종료   
                    INQSTAT_900   > DROP(고객)    
                    div_delete    > 삭제
                    order_yn      > 매출발생여부
                    */
                    hash["inq_cd"] = inq_cd;
                    hash["inq_status"] = inq_status;

                    hash["dlv_user_cd"] = User.Identity.Name.Split('|')[0];    // dlv_user_cd   :  전달자ID

                    // 상태값 변경
                    //mapper.Update("updatePrductInquiry", hash);
                    if (hash["addchk"].Equals("yes"))
                    {
                        mapper.Update("updatePrductInquiryAll", hash);
                        String[] inq_item_nms = Request.Form.GetValues("inq_item_nm");
                        //string[] inq_item_nms = new string[] {"item1","item2" };

                        if (inq_item_nms != null && inq_item_nms.Length > 0)
                        {
                            // 문의제품 항목 데이터 삭제
                            mapper.Delete("deleteProductInquiryItem", hash);
                            for (int i = 0; i < inq_item_nms.Length; i++)
                            {
                                hash["inq_item_nm"] = inq_item_nms[i].nullToStr();
                                // 문의제품 항목 등록
                                mapper.Insert("insertProductInquiryItem", hash);
                            }
                        }
                    }
                    else
                    {
                        mapper.Update("updatePrductInquiry", hash);
                    }
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




        // 제품문의/사후조치 : 영문 csv타입 엑셀 업로드 
        [HttpPost]
        public ActionResult csvUpload(HttpPostedFileBase upload)
        {

            HttpPostedFileBase excelFile = Request.Files["excelFile"];

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try
            {

                if (excelFile != null && excelFile.ContentLength > 0 && excelFile.FileName.EndsWith(".csv"))
                {

                    Hashtable hash = new Hashtable();
                    mapper = Mapper.Instance();


                    Stream stream = excelFile.InputStream;
                    DataTable ds = new DataTable();
                    CsvReader csvReader = new CsvReader(new StreamReader(stream), true);
                    ds.Load(csvReader);


                    mapper.BeginTransaction();


                    hash.Add("company_cd", User.Identity.Name.Split('|')[2]);      // company_cd
                    hash.Add("reg_usr", User.Identity.Name.Split('|')[0]);         // user_cd       : 로그인 사용자ID
                    hash.Add("mod_usr", User.Identity.Name.Split('|')[0]);         // user_cd       : 로그인 사용자ID
                    hash.Add("excel", "excel");                                    // DB 국가코드 변환을 위한 엑셀 구분

                    for (int i = 0; i < ds.Rows.Count; i++)
                    {

                        //logger.Info(ds.Rows[i][0].ToString() + " _ " + ds.Rows[i][12].ToString());

                        hash["inq_chnl"] = "INQCH_100";                      // inq_chnl      :  문의경로 코드
                        switch (ds.Rows[i][2].ToString())
                        {
                            case "Sample request":
                                hash["inq_type"] = "INQTP_300";
                                break;
                            case "Product inquiry":
                                hash["inq_type"] = "INQTP_100";
                                break;
                            default:
                                hash["inq_type"] = "INQTP_200";
                                break;

                        }


                        switch (ds.Rows[i][9].ToString())
                        {
                            case "America":
                                hash["dstr_type"] = "8004004";
                                break;
                            case "Europe":
                                hash["dstr_type"] = "8004005";
                                break;
                            case "Asia / Africa":
                                hash["dstr_type"] = "8004006";
                                break;
                            case "China":
                                hash["dstr_type"] = "8004011";
                                break; 

                        }

                        //hash["inq_type"] = ds.Rows[i][2].ToString().Equals("Sample request") ? "INQTP_100" : "INQTP_200";  // inq_type      :  문의유형 코드
                        hash["inq_ruser_cd"] = User.Identity.Name.Split('|')[0];// inq_ruser_cd  :  접수담당자ID
                        hash["user_cd"] = "";                               // user_cd       :  사후 조취자ID
                        hash["dept_cd"] = "";                               // dept_cd       :  사후 조취자 부서 코드
                        hash["dlv_user_cd"] = "";                               // dlv_user_cd   :  전달자ID
                        
                        hash["inq_user_nm"] = ds.Rows[i][3].ToString();         // inq_user_nm   :  문의자 이름
                        hash["inq_email"] = ds.Rows[i][4].ToString();         // inq_email     :  문의자 이메일
                        hash["inq_mphone"] = ds.Rows[i][5].ToString();         // inq_mphone    :  문의자 핸드폰
                        hash["post_arng"] = "";                               // post_arng     :  조취내역
                        hash["inq_contents"] = ds.Rows[i][13].ToString();        // inq_contents  :  문의내용
                        hash["nat_cd"] = ds.Rows[i][10].ToString().Trim();         //  T_NATION 테이블의 데이터로 맞춤  쿼리에서 select         // nat_cd        :  국가코드

                        hash["inq_addr"] = ds.Rows[i][6].ToString();         // inq_addr     :  문의 주소
                        hash["inq_company"] = ds.Rows[i][7].ToString();         // inq_company    :  문의 회사


                        // 제품문의 신규등록
                        String hash_cd = (String)mapper.Insert("insertProudctInquiry", hash);

                        hash["inq_item_nm"] = "[" + ds.Rows[i][11].ToString() + "]" + ds.Rows[i][12].ToString();        // inq_item_nm  : 문의제품 항목 등록
                        mapper.Insert("insertProductInquiryItem", hash);


                    }


                    mapper.CommitTransaction();

                    result.Add("success", true);
                    var jsonResult = Json(result, "text/plain", JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    var ddd = jsonResult.ContentType;

                    return jsonResult;

                }
                else
                {
                    result.Add("success", false);
                    result.Add("errmsg", "no data or .csv file");
                    return Json(result, "text/plain", JsonRequestBehavior.AllowGet);

                }

            }
            catch (DataMapperException e)
            {
                mapper.RollBackTransaction();
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, "text/plain", JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, "text/plain", JsonRequestBehavior.AllowGet);
            }


        }



        // 제품문의/사후조치 : 중문 csv타입 엑셀 업로드 
        [HttpPost]
        public ActionResult csvUpload2(HttpPostedFileBase upload)
        {

            HttpPostedFileBase excelFile = Request.Files["excelFile"];

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try
            {

                if (excelFile != null && excelFile.ContentLength > 0 && excelFile.FileName.EndsWith(".csv"))
                {

                    Hashtable hash = new Hashtable();
                    mapper = Mapper.Instance();


                    Stream stream = excelFile.InputStream;
                    DataTable ds = new DataTable();
                    CsvReader csvReader = new CsvReader(new StreamReader(stream), true);
                    ds.Load(csvReader);


                    mapper.BeginTransaction();


                    hash.Add("company_cd", User.Identity.Name.Split('|')[2]);      // company_cd
                    hash.Add("reg_usr", User.Identity.Name.Split('|')[0]);         // user_cd       : 로그인 사용자ID
                    hash.Add("mod_usr", User.Identity.Name.Split('|')[0]);         // user_cd       : 로그인 사용자ID
                    hash.Add("excel", "excel");                                    // DB 국가코드 변환을 위한 엑셀 구분

                    for (int i = 0; i < ds.Rows.Count; i++)
                    {

                        //logger.Info(ds.Rows[i][0].ToString() + " _ " + ds.Rows[i][12].ToString());

                        hash["inq_chnl"] = "INQCH_100";                      // inq_chnl      :  문의경로 코드
                        switch (ds.Rows[i][2].ToString())
                        {
                            case "申请样品":
                                hash["inq_type"] = "INQTP_300";
                                break;
                            case "咨询产品":
                                hash["inq_type"] = "INQTP_100";
                                break;
                            default:
                                hash["inq_type"] = "INQTP_200";
                                break;

                        }


                        switch (ds.Rows[i][9].ToString())
                        {
                            case "美洲":
                                hash["dstr_type"] = "8004004";
                                break;
                            case "欧洲":
                                hash["dstr_type"] = "8004005";
                                break;
                            case "亚洲、非洲":
                                hash["dstr_type"] = "8004006";
                                break;
                            case "中国":
                                hash["dstr_type"] = "8004011";
                                break;

                        }

                        //hash["inq_type"] = ds.Rows[i][2].ToString().Equals("Sample request") ? "INQTP_100" : "INQTP_200";  // inq_type      :  문의유형 코드
                        hash["inq_ruser_cd"] = User.Identity.Name.Split('|')[0];// inq_ruser_cd  :  접수담당자ID
                        hash["user_cd"] = "";                               // user_cd       :  사후 조취자ID
                        hash["dept_cd"] = "";                               // dept_cd       :  사후 조취자 부서 코드
                        hash["dlv_user_cd"] = "";                               // dlv_user_cd   :  전달자ID

                        hash["inq_user_nm"] = ds.Rows[i][3].ToString();         // inq_user_nm   :  문의자 이름
                        hash["inq_email"] = ds.Rows[i][4].ToString();         // inq_email     :  문의자 이메일
                        hash["inq_mphone"] = ds.Rows[i][5].ToString();         // inq_mphone    :  문의자 핸드폰
                        hash["post_arng"] = "";                               // post_arng     :  조취내역
                        hash["inq_contents"] = ds.Rows[i][13].ToString();        // inq_contents  :  문의내용
                        hash["nat_cd"] = ds.Rows[i][10].ToString().Trim();         //  T_NATION 테이블의 데이터로 맞춤  쿼리에서 select         // nat_cd        :  국가코드

                        hash["inq_addr"] = ds.Rows[i][6].ToString();         // inq_addr     :  문의 주소
                        hash["inq_company"] = ds.Rows[i][7].ToString();         // inq_company    :  문의 회사


                        // 제품문의 신규등록
                        String hash_cd = (String)mapper.Insert("insertProudctInquiry", hash);

                        var itemgb = "";

                        switch (ds.Rows[i][11].ToString())
                        {
                            case "瓶子和泵头":
                                itemgb = "Pump";
                                break;
                            case "软管":
                                itemgb = "Tube";
                                break;
                            case "吹瓶":
                                itemgb = "Crystal Line";
                                break;

                        }

                        hash["inq_item_nm"] = "[" + itemgb + "]" + ds.Rows[i][12].ToString();        // inq_item_nm  : 문의제품 항목 등록
                        mapper.Insert("insertProductInquiryItem", hash);


                    }


                    mapper.CommitTransaction();

                    result.Add("success", true);
                    var jsonResult = Json(result, "text/plain", JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    var ddd = jsonResult.ContentType;

                    return jsonResult;

                }
                else
                {
                    result.Add("success", false);
                    result.Add("errmsg", "no data or .csv file");
                    return Json(result, "text/plain", JsonRequestBehavior.AllowGet);

                }

            }
            catch (DataMapperException e)
            {
                mapper.RollBackTransaction();
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, "text/plain", JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                if(e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, "text/plain", JsonRequestBehavior.AllowGet);
            }


        }


        // 제품문의/사후조치 : 국문 cvs타입 엑셀 업로드 ( xlsx 에서 cvs로 바뀜 )
        [HttpPost]
        public ActionResult cvsKorUpload(HttpPostedFileBase uploadFile)
        {

            HttpPostedFileBase excelFile = Request.Files["excelFile"];

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try
            {

                if (excelFile != null && excelFile.ContentLength > 0 && excelFile.FileName.EndsWith(".csv"))
                {

                    Hashtable hash = new Hashtable();
                    mapper = Mapper.Instance();


                    Stream stream = excelFile.InputStream;
                    DataTable ds = new DataTable();
                    CsvReader csvReader = new CsvReader(new StreamReader(stream, Encoding.GetEncoding("euc-kr")), true);
                    ds.Load(csvReader);


                    mapper.BeginTransaction();


                    hash.Add("company_cd", User.Identity.Name.Split('|')[2]);      // company_cd
                    hash.Add("reg_usr", User.Identity.Name.Split('|')[0]);         // user_cd       : 로그인 사용자ID
                    hash.Add("mod_usr", User.Identity.Name.Split('|')[0]);         // user_cd       : 로그인 사용자ID

                    for (int i = 0; i < ds.Rows.Count; i++)
                    {

                        if (!ds.Rows[i][0].ToString().Equals(""))
                        {

                            //logger.Info(ds.Tables[0].Rows[i][0].ToString() + " - " + ds.Tables[0].Rows[i][1].ToString());

                            hash["inq_chnl"] = "INQCH_100";                         // inq_chnl      :  문의경로 코드
                            switch (ds.Rows[i][2].ToString())
                            {
                                case "제품샘플":
                                    hash["inq_type"] = "INQTP_300";
                                    break;
                                case "제품문의":
                                    hash["inq_type"] = "INQTP_100";
                                    break;
                                default:
                                    hash["inq_type"] = "INQTP_200";
                                    break;

                            }
                            //hash["inq_type"] = ds.Rows[i][0].ToString().Equals("제품샘플") ? "INQTP_200" : "INQTP_100";  // inq_type      :  문의유형 코드
                            hash["inq_ruser_cd"] = User.Identity.Name.Split('|')[0];// inq_ruser_cd  :  접수담당자ID
                            hash["user_cd"] = "";                                   // user_cd       :  사후 조취자ID
                            hash["dept_cd"] = "";                                   // dept_cd       :  사후 조취자 부서 코드
                            hash["dlv_user_cd"] = "";                               // dlv_user_cd   :  전달자ID
                            hash["dstr_type"] = "";                                 // dstr_type     :  유통구조 코드

                            hash["inq_user_nm"] = ds.Rows[i][3].ToString();           // inq_user_nm   :  문의자 이름
                            hash["inq_email"] = ds.Rows[i][4].ToString();             // inq_email     :  문의자 이메일
                            hash["inq_mphone"] = ds.Rows[i][5].ToString();            // inq_mphone    :  문의자 핸드폰
                            hash["post_arng"] = "";            // post_arng     :  조취내역
                            hash["inq_contents"] = ds.Rows[i][11].ToString().Replace("<br>", "\r\n");          // inq_contents  :  문의내용
                            hash["nat_cd"] = "KOR";                                             // nat_cd        :  국가코드

                            hash["inq_addr"] = ds.Rows[i][6].ToString(); //+ " " + ds.Rows[i][8].ToString() + " " + ds.Rows[i][9].ToString();              // inq_addr     :  문의 주소
                            hash["inq_company"] = ds.Rows[i][7].ToString();           // inq_company    :  문의 회사

                            // 제품문의 신규등록
                            String hash_cd = (String)mapper.Insert("insertProudctInquiry", hash);

                           // hash["inq_item_nm"] = ds.Rows[i][10].ToString();        // inq_item_nm  : 문의제품 항목 등록
                            hash["inq_item_nm"] = "[" + ds.Rows[i][9].ToString() + "]" + ds.Rows[i][10].ToString();        // inq_item_nm  : 문의제품 항목 등록
                            mapper.Insert("insertProductInquiryItem", hash);
                        }

                    }


                    mapper.CommitTransaction();

                    result.Add("success", true);
                    var jsonResult = Json(result, "text/plain", JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    var ddd = jsonResult.ContentType;

                    return jsonResult;

                }
                else
                {
                    result.Add("success", false);
                    result.Add("errmsg", "no data or .csv file");
                    return Json(result, "text/plain", JsonRequestBehavior.AllowGet);

                }

            }
            catch (DataMapperException e)
            {
                mapper.RollBackTransaction();
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, "text/plain", JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, "text/plain", JsonRequestBehavior.AllowGet);
            }


        }






        // 제품문의/사후조치 : 국문 xlsx타입 엑셀 업로드 
        [HttpPost]
        public ActionResult xlsxUpload_bak(HttpPostedFileBase uploadFile)
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

                    for (int i = 1; i < ds.Tables[0].Rows.Count; i++)
                    {

                        //logger.Info(ds.Tables[0].Rows[i][0].ToString() + " - " + ds.Tables[0].Rows[i][1].ToString());

                        hash["inq_chnl"] = "INQCH_100";                         // inq_chnl      :  문의경로 코드
                        hash["inq_type"] = ds.Tables[0].Rows[i][0].ToString().Equals("Catalog") ? "INQTP_200" : "INQTP_100";  // inq_type      :  문의유형 코드
                        hash["inq_ruser_cd"] = User.Identity.Name.Split('|')[0];// inq_ruser_cd  :  접수담당자ID
                        hash["user_cd"] = "";                                   // user_cd       :  사후 조취자ID
                        hash["dept_cd"] = "";                                   // dept_cd       :  사후 조취자 부서 코드
                        hash["dlv_user_cd"] = "";                               // dlv_user_cd   :  전달자ID
                        hash["dstr_type"] = "";                                 // dstr_type     :  유통구조 코드

                        hash["inq_user_nm"] = ds.Tables[0].Rows[i][2].ToString();           // inq_user_nm   :  문의자 이름
                        hash["inq_email"] = ds.Tables[0].Rows[i][6].ToString();             // inq_email     :  문의자 이메일
                        hash["inq_mphone"] = ds.Tables[0].Rows[i][5].ToString();            // inq_mphone    :  문의자 핸드폰
                        hash["post_arng"] = ds.Tables[0].Rows[i][14].ToString();            // post_arng     :  조취내역
                        hash["inq_contents"] = ds.Tables[0].Rows[i][9].ToString();          // inq_contents  :  문의내용
                        hash["nat_cd"] = "KOR";                                             // nat_cd        :  국가코드

                        hash["inq_addr"] = ds.Tables[0].Rows[i][7].ToString();              // inq_addr     :  문의 주소
                        hash["inq_company"] = ds.Tables[0].Rows[i][1].ToString();           // inq_company    :  문의 회사

                        // 제품문의 신규등록
                        String hash_cd = (String)mapper.Insert("insertProudctInquiry", hash);

                        hash["inq_item_nm"] = ds.Tables[0].Rows[i][8].ToString();        // inq_item_nm  : 문의제품 항목 등록
                        mapper.Insert("insertProductInquiryItem", hash);

                    }


                    mapper.CommitTransaction();

                    result.Add("success", true);
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

        /*
        // 제품문의/사후조치 : 국문 xls타입 엑셀 업로드 
        [HttpPost]
        public ActionResult xlsUpload(HttpPostedFileBase file) {
            DataSet ds = new DataSet();
            if (Request.Files["excelFile"].ContentLength > 0) {
                string fileExtension =
                                     System.IO.Path.GetExtension(Request.Files["excelFile"].FileName);

                if (fileExtension == ".xls" || fileExtension == ".xlsx" || fileExtension == ".csv") {
                    string fileLocation = Server.MapPath("~/Content/") + Request.Files["excelFile"].FileName;
                    if (System.IO.File.Exists(fileLocation)) {

                        System.IO.File.Delete(fileLocation);
                    }
                    Request.Files["excelFile"].SaveAs(fileLocation);
                    string excelConnectionString = string.Empty;
                    excelConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" +
                    fileLocation + ";Extended Properties=\"Excel 8.0;HDR=Yes;IMEX=2\"";

                    //Create Connection to Excel work book and add oledb namespace
                    OleDbConnection excelConnection = new OleDbConnection(excelConnectionString);
                    excelConnection.Open();
                    DataTable dt = new DataTable();

                    dt = excelConnection.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                    if (dt == null) {
                        return null;
                    }

                    String[] excelSheets = new String[dt.Rows.Count];
                    int t = 0;
                    //excel data saves in temp file here.
                    foreach (DataRow row in dt.Rows) {
                        excelSheets[t] = row["TABLE_NAME"].ToString();
                        t++;
                    }
                    OleDbConnection excelConnection1 = new OleDbConnection(excelConnectionString);


                    string query = string.Format("Select * from [{0}]", excelSheets[0]);
                    using (OleDbDataAdapter dataAdapter = new OleDbDataAdapter(query, excelConnection1)) {
                        dataAdapter.Fill(ds);
                    }
                }



                for (int i = 0; i < ds.Tables[0].Rows.Count; i++) {

                    logger.Info(ds.Tables[0].Rows[i][0].ToString() + " - " + ds.Tables[0].Rows[i][1].ToString());

                }

            }
            return View();
        }

    */



    }
}
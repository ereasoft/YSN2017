using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Exceptions;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using YSN2017.ComLIB;



namespace YSN2017.Controllers
{

    [Authorize(Roles = "User,Admin")]
    public class EstimateController : Controller
    {

        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        // 견적서관리 :  기본픔목 리스트 /Estimate/baseProdList
        public ActionResult baseProdList()
        {

            /*  if (Request["menuId"] != null)
              { */

            Hashtable hash = new Hashtable();

            hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
            hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드

            hash.Add("idx", Request["idx"]); 
            hash.Add("cate_lv1", Request["cate_lv1"]);
            hash.Add("cate_lv2", Request["cate_lv2"]);
            hash.Add("prod_code", Request["prod_code"]);


            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("baseProdList", hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

            /* }
             else
             {
                 return new EmptyResult();
             } */

        }

        // 견적서관리 :  옵션품목 리스트 /Estimate/baseOptionList
        public ActionResult baseOptionList()
        {

            /*  if (Request["menuId"] != null)
              { */

            Hashtable hash = new Hashtable();

            hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
            hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드

            hash.Add("idx", Request["idx"]);
            hash.Add("prod_code", Request["prod_code"]);
            hash.Add("sub_prod", Request["sub_prod"]);
            hash.Add("prod_option", Request["prod_option"]);


            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("baseOptionList", hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

            /* }
             else
             {
                 return new EmptyResult();
             } */

        }

        // 견적서관리 :  견적서 마스터 리스트 /Estimate/estimateHeadList
        public ActionResult estimateHeadList()
        {

            /*  if (Request["menuId"] != null)
              { */

            Hashtable hash = new Hashtable();

            hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
            hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드

            hash.Add("idx", Request["idx"]);
            hash.Add("estimate_id", Request["estimate_id"]);
            hash.Add("form_lang", Request["form_lang"]);
            hash.Add("form_type", Request["form_type"]);
            hash.Add("form_id", Request["form_id"]);
            hash.Add("user_cd", Request["user_cd"]);
            hash.Add("ref_cd", Request["ref_cd"]);
            hash.Add("submit_cd", Request["submit_cd"]);
            hash.Add("subject", Request["subject"]);
            hash.Add("status_cd", Request["status_cd"]);
            hash.Add("user_nm", Request["user_nm"]);
            hash.Add("cust_nm", Request["cust_nm"]);
            hash.Add("dstr_type", Request["dstr_type"]);


            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("estimateHeadList", hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

            /* }
             else
             {
                 return new EmptyResult();
             } */

        }


        // 견적서관리 :  견적서 마스터 리스트 /Estimate/estimateDetail
        public ActionResult estimateDetail()
        {

            /*  if (Request["menuId"] != null)
              { */

            Hashtable hash = new Hashtable();

            hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
            hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드

            hash.Add("idx", Request["idx"]); 


            ISqlMapper mapper = Mapper.Instance();

            Hashtable data = new Hashtable(); 
            data = mapper.QueryForObject<Hashtable>("estimateHeadList", hash);

            Hashtable items = new Hashtable();
            items.Add("sno", hash["idx"]);
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("estimateItemList", items);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("DATA", data);
            jsonData.Add("ITEMS", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

            /* }
             else
             {
                 return new EmptyResult();
             } */

        }

        // 견적서관리 :  견적서 마스터 등록 /Estimate/estimateHeadInsert
        public ActionResult estimateHeadInsert()
        {

            ISqlMapper mapper = Mapper.Instance();
            Hashtable hash = new Hashtable();
            Hashtable result = new Hashtable();
            try
            {

                hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드

                //hash.Add("estimate_id", nullToStr(Request["estimate_id"]));
                hash.Add("form_lang", Request["form_lang"]);
                hash.Add("form_type", Request["form_type"]);
                hash.Add("form_id", Request["form_id"]);
                hash.Add("dstr_type", Request["dstr_chn"]);
                hash.Add("user_cd", Request["user_cd"]);
                hash.Add("user_nm", Request["user_nm"]);
                hash.Add("status_cd", Request["status_cd"]);
                hash.Add("estimate_date", Request["estimate_date"]);
                hash.Add("cust_cd", Request["cust_cd"]);
                hash.Add("cust_nm", Request["cust_nm"]);
                hash.Add("ref_cd", Request["ref_cd"]);
                hash.Add("ref_nm", Request["ref_nm"]);
                hash.Add("prod_code", Request["prod_code"]);
                hash.Add("prod_name", Request["prod_name"]);
                hash.Add("item_name", Request["item_name"]);
                hash.Add("item_qty", Request["item_qty"]);
                hash.Add("submit_cd", Request["submit_cd"]);
                hash.Add("submit_nm", Request["submit_nm"]);
                hash.Add("currency", Request["currency"]);
                hash.Add("exch_rate", Request["exch_rate"]);
                hash.Add("subject", Request["subject"]);
                hash.Add("summary_yn", Request["summary_yn"]);
                hash.Add("remark", Request["remark"]);
                hash.Add("create_id", User.Identity.Name.Split('|')[0]);
                hash.Add("modify_id", User.Identity.Name.Split('|')[0]);


                mapper.BeginTransaction();
                string estimateID = null ;
                if (hash["status_cd"].ToString().Equals("1")) {
                    estimateID = (string)mapper.QueryForObject("estimateID", hash);
                }
                 
                hash.Add("estimate_id", estimateID); 

                int idx = (int)mapper.Insert("estimateHeadInsert", hash); 

                IList<Hashtable> Items = JsonConvert.DeserializeObject<IList<Hashtable>>(Request["detailitem"].ToString());

                foreach (Hashtable item in Items)
                {
                  //  if(item["prod_code"] != null && item["prod_code"].ToString() != "" )
                 //   {
                        item["sno"] = idx;
                    if (hash["status_cd"].ToString().Equals("1")) item["estimate_id"] = hash["estimate_id"];
                    mapper.Insert("estimateItemInsert", item); 
                 //   }
                } 

                    mapper.CommitTransaction();

                Hashtable jsonData = new Hashtable();
                result.Add("idx", idx);
                result.Add("estimate_id", estimateID);
                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;


            } 
            catch (Exception e)
            {
                mapper.RollBackTransaction();
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }

        }

        // 견적서관리 :  견적서 마스터 수정 /Estimate/estimateHeadUpdate
        public ActionResult estimateHeadUpdate()
        {

            ISqlMapper mapper = Mapper.Instance();
            Hashtable hash = new Hashtable();
            Hashtable result = new Hashtable();
            try
            {

                hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드
                                                                                //hash.Add("estimate_id", nullToStr(Request["estimate_id"]));
                hash.Add("idx", Request["idx"]);
                hash.Add("estimate_id", Request["estimate_id"]);
                hash.Add("form_lang", Request["form_lang"]);
                hash.Add("form_type", Request["form_type"]);
                hash.Add("form_id", Request["form_id"]);
                hash.Add("dstr_type", Request["dstr_chn"]);
                hash.Add("user_cd", Request["user_cd"]);
                hash.Add("user_nm", Request["user_nm"]);
                hash.Add("status_cd", Request["status_cd"]);
                hash.Add("estimate_date", Request["estimate_date"]);
                hash.Add("cust_cd", Request["cust_cd"]);
                hash.Add("cust_nm", Request["cust_nm"]);
                hash.Add("ref_cd", Request["ref_cd"]);
                hash.Add("ref_nm", Request["ref_nm"]);
                hash.Add("prod_code", Request["prod_code"]);
                hash.Add("prod_name", Request["prod_name"]);
                hash.Add("item_name", Request["item_name"]);
                hash.Add("item_qty", Request["item_qty"]);
                hash.Add("submit_cd", Request["submit_cd"]);
                hash.Add("submit_nm", Request["submit_nm"]);
                hash.Add("currency", Request["currency"]);
                hash.Add("exch_rate", Request["exch_rate"]);
                hash.Add("subject", Request["subject"]);
                hash.Add("summary_yn", Request["summary_yn"]);
                hash.Add("remark", Request["remark"]);
                hash.Add("create_id", User.Identity.Name.Split('|')[0]);
                hash.Add("modify_id", User.Identity.Name.Split('|')[0]);


                mapper.BeginTransaction(); 
                String idx = hash["idx"].ToString();

                if (hash["estimate_id"].ToString() == "") hash["estimate_id"] = null;
                if (hash["estimate_id"] == null || hash["estimate_id"].ToString() == "")
                {
                    hash["estimate_id"] = null;
                    if (hash["status_cd"].ToString().Equals("1")) hash["estimate_id"] = (string)mapper.QueryForObject("estimateID", hash);
                }

                mapper.Update("estimateHeadUpdate", hash);

                Hashtable hashItem = new Hashtable();
                hashItem.Add("sno", idx);

                mapper.Delete("estimateItemDelete", hashItem);

                IList<Hashtable> Items = JsonConvert.DeserializeObject<IList<Hashtable>>(Request["detailitem"].ToString());

                foreach (Hashtable item in Items)
                {
                    //  if(item["prod_code"] != null && item["prod_code"].ToString() != "" )
                    //   {
                    item["sno"] = idx;
                    if (hash["status_cd"].ToString().Equals("1")) item["estimate_id"] = hash["estimate_id"];
                    mapper.Insert("estimateItemInsert", item);
                    //   }
                }

                mapper.CommitTransaction();

                Hashtable jsonData = new Hashtable();
                result.Add("idx", idx);
                result.Add("estimate_id", hash["estimate_id"]);
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
                mapper.RollBackTransaction();
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }

        }

        // 견적서관리 :  견적서 마스터 삭제 /Estimate/estimateHeadDelete
        public ActionResult estimateHeadDelete()
        {

            ISqlMapper mapper = Mapper.Instance();
            Hashtable hash = new Hashtable();
            Hashtable result = new Hashtable();
            try
            {

                hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드

                hash.Add("idx", Request["idx"]); 
                hash.Add("modify_id", User.Identity.Name.Split('|')[0]);


                mapper.BeginTransaction();
                mapper.Update("estimateHeadDelete", hash);

                mapper.CommitTransaction();

                Hashtable jsonData = new Hashtable();
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

        // 견적서관리 :  견적서 아이템 리스트 /Estimate/estimateItemList
        public ActionResult estimateItemList()
        {

            /*  if (Request["menuId"] != null)
              { */

            Hashtable hash = new Hashtable();

            hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
            hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드

            hash.Add("idx", Request["idx"]);
            hash.Add("estimate_id", Request["estimate_id"]);
            hash.Add("sno", Request["sno"]);
            hash.Add("summary_yn", Request["summary_yn"]);
            hash.Add("set_yn", Request["set_yn"]);


            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("estimateItemList", hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

            /* }
             else
             {
                 return new EmptyResult();
             } */

        }

        // 견적서관리 :  견적서 아이템 등록 /Estimate/estimateItemInsert
        public ActionResult estimateItemInsert()
        {

            ISqlMapper mapper = Mapper.Instance();
            Hashtable hash = new Hashtable();
            Hashtable result = new Hashtable();
            try
            {

                hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드

                hash.Add("estimate_id", Request["estimate_id"]);
                hash.Add("sno", Request["sno"]);
                hash.Add("chk_print", Request["chk_print"]);
                hash.Add("summary_yn", Request["summary_yn"]);
                hash.Add("set_yn", Request["set_yn"]);
                hash.Add("cate_lv1", Request["cate_lv1"]);
                hash.Add("cate_lv2", Request["cate_lv2"]);
                hash.Add("cust_cd", Request["cust_cd"]);
                hash.Add("prod", Request["prod"]);
                hash.Add("sub_prod", Request["sub_prod"]);
                hash.Add("prod_code", Request["prod_code"]);
                hash.Add("prod_option", Request["prod_option"]);
                hash.Add("eco_category", Request["eco_category"]);
                hash.Add("quantity", Request["quantity"]);
                hash.Add("amount", Request["amount"]);
                hash.Add("qty_5k", Request["qty_5k"]);
                hash.Add("qty_10k", Request["qty_10k"]);
                hash.Add("qty_30k", Request["qty_30k"]);
                hash.Add("qty_50k", Request["qty_50k"]);
                hash.Add("qty_100k", Request["qty_100k"]);
                hash.Add("option_price", Request["option_price"]); 
                hash.Add("remark", Request["remark"]);
                hash.Add("create_id", User.Identity.Name.Split('|')[0]);
                hash.Add("modify_id", User.Identity.Name.Split('|')[0]);


                mapper.BeginTransaction();
                mapper.Insert("estimateItemInsert", hash);

                mapper.CommitTransaction();

                Hashtable jsonData = new Hashtable();
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

        // 견적서관리 :  견적서 아이템 수정 /Estimate/estimateItemUpdate
        public ActionResult estimateItemUpdate()
        {

            ISqlMapper mapper = Mapper.Instance();
            Hashtable hash = new Hashtable();
            Hashtable result = new Hashtable();
            try
            {

                hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드

                hash.Add("idx", Request["idx"]);
                hash.Add("estimate_id", Request["estimate_id"]);
                hash.Add("sno", Request["sno"]);
                hash.Add("chk_print", Request["chk_print"]);
                hash.Add("summary_yn", Request["summary_yn"]);
                hash.Add("set_yn", Request["set_yn"]);
                hash.Add("cate_lv1", Request["cate_lv1"]);
                hash.Add("cate_lv2", Request["cate_lv2"]);
                hash.Add("cust_cd", Request["cust_cd"]);
                hash.Add("prod", Request["prod"]);
                hash.Add("sub_prod", Request["sub_prod"]);
                hash.Add("prod_code", Request["prod_code"]);
                hash.Add("prod_option", Request["prod_option"]);
                hash.Add("eco_category", Request["eco_category"]);
                hash.Add("quantity", Request["quantity"]);
                hash.Add("amount", Request["amount"]);
                hash.Add("qty_5k", Request["qty_5k"]);
                hash.Add("qty_10k", Request["qty_10k"]);
                hash.Add("qty_30k", Request["qty_30k"]);
                hash.Add("qty_50k", Request["qty_50k"]);
                hash.Add("qty_100k", Request["qty_100k"]);
                hash.Add("option_price", Request["option_price"]);
                hash.Add("remark", Request["remark"]);
                hash.Add("modify_id", User.Identity.Name.Split('|')[0]);


                mapper.BeginTransaction();
                mapper.Update("estimateItemUpdate", hash);

                mapper.CommitTransaction();

                Hashtable jsonData = new Hashtable();
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

        // 견적서관리 :  견적서 아이템 삭제 /Estimate/estimateItemDelete
        public ActionResult estimateItemDelete()
        {

            ISqlMapper mapper = Mapper.Instance();
            Hashtable hash = new Hashtable();
            Hashtable result = new Hashtable();
            try
            {

                hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드

                hash.Add("idx", Request["idx"]);
                hash.Add("modify_id", User.Identity.Name.Split('|')[0]);


                mapper.BeginTransaction();
                mapper.Update("estimateItemDelete", hash);

                mapper.CommitTransaction();

                Hashtable jsonData = new Hashtable();
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

        // 카테고리 목록:  /Estimate/cateLv
        public ActionResult cate_lv1()
        {

            /*  if (Request["menuId"] != null)
              { */

            Hashtable hash = new Hashtable();
            String sql = "cate_lv1";

            hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
            hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드

            if(Request["cate_lv1"] !=  null)
            {
                sql = "cate_lv2";
                hash.Add("cate_lv1", Request["cate_lv1"]);
                hash.Add("cate_lv2", Request["cate_lv2"]);
            }  

            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>(sql, hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

            /* }
             else
             {
                 return new EmptyResult();
             } */

        }

        [HttpGet]
        public HttpResponseMessage quota_Request(string quota_no) //견적요청서 다운로드 - 액셀템플릿을 읽어서 파일로 다운로드 
        {
            HttpResponseMessage result = new HttpResponseMessage();
            string reportPath = string.Format("{0}/{1}", Server.MapPath("~/Content"), "spec_sheet.xlsx");

            Hashtable hash = new Hashtable();
            hash["quota_no"] = quota_no;
            ISqlMapper mapper = Mapper.Instance();
            try
            {

                string fpath = HttpContext.Current.Server.MapPath(reportPath + "QuotationRequest.xlsx"); //견적요청서 템플릿 파일   
                var fStream = new MemoryStream(File.ReadAllBytes(fpath)); //파일을 메모리에 스트림으로 변환 
                ExcelPackage ep = new ExcelPackage(fStream); //액셀초기화 
                ExcelWorksheet ws = ep.Workbook.Worksheets.First();  //워크시트 읽기 

                Hashtable customerinfo = mapper.QueryForObject<Hashtable>("QuotationList", hash);
                //견적기본정보
                ws.Cells["B1"].Value = customerinfo["customer_name"]; //row, col
                ws.Cells["B2"].Value = customerinfo["project_name"];
                ws.Cells["B3"].Value = customerinfo["contact_name"];
                ws.Cells["E3"].Value = customerinfo["customer_id"];
                ws.Cells["A4"].Value = "Discount :    " + customerinfo["special_dcrate"] + " %";
                ws.Cells["D4"].Value = customerinfo["sales_div"];
                ws.Cells["f4"].Value = customerinfo["sales_pid"];

                if (customerinfo["sales_type"].ToString() == "단순견적")
                {
                    hash["article_type"] = "accessary";
                    IList<Hashtable> accList = mapper.QueryForList<Hashtable>("SimpleQuotationArticle_List", hash);
                    for (int i = 0; i < accList.Count; i++)
                    {
                        ws.Cells["A" + (i + 7)].Value = accList[i]["material_no"];
                        ws.Cells["B" + (i + 7)].Value = accList[i]["description"];
                        ws.Cells["c" + (i + 7)].Value = accList[i]["Qty"];
                    }
                }
                else
                { //작업견적
                    hash["article_type"] = "product";

                    int j = 0;
                    int m = 0;

                    float bc_qty = 0;
                    float sb_qty = 0;
                    float tp_qty = 0;
                    float cp_qty = 0;
                    float op_qty = 0;
                    float co_qty = 0;

                    IList<Hashtable> ProdInfo = mapper.QueryForList<Hashtable>("QuotationArticle_List", hash);
                    for (int i = 0; i < ProdInfo.Count; i++)
                    {
                        hash["line_no"] = ProdInfo[i]["line_no"].ToString();
                        hash["seq_no"] = ProdInfo[i]["seq_no"].ToString();
                        hash["product_type"] = ProdInfo[i]["product_type"].ToString();
                        hash["product_name"] = ProdInfo[i]["product_name"].ToString();
                        hash["article_type"] = ProdInfo[i]["article_type"].ToString();

                        if ((ProdInfo[i]["product_type"].ToString() == "prod01") || (ProdInfo[i]["product_type"].ToString() == "prod06"))
                        {
                            bc_qty = bc_qty + float.Parse(ProdInfo[i]["article_qty"].ToString());
                        }

                        if (ProdInfo[i]["product_type"].ToString() == "prod02")
                        {
                            sb_qty = sb_qty + float.Parse(ProdInfo[i]["article_qty"].ToString());
                        }

                        if (ProdInfo[i]["product_type"].ToString() == "prod07")
                        {
                            co_qty = co_qty + float.Parse(ProdInfo[i]["article_qty"].ToString());
                        }

                        if (ProdInfo[i]["product_type"].ToString() == "prod03")
                        {
                            tp_qty = tp_qty + float.Parse(ProdInfo[i]["article_qty"].ToString());
                        }
                        if (ProdInfo[i]["product_type"].ToString() == "prod04")
                        {
                            cp_qty = cp_qty + float.Parse(ProdInfo[i]["article_qty"].ToString());
                        }
                        //if (ProdInfo[i]["product_type"].ToString() == "prod05")
                        //{
                        //    op_qty = op_qty + float.Parse(ProdInfo[i]["article_qty"].ToString());
                        //}

                        //ws.Cells["A" + (i + 7)].Value = accList[i]["material_no"];
                        ws.Cells["B" + (i + 7 + j)].Value = ProdInfo[i]["line_no"] + ". " + ProdInfo[i]["product_name"] + "-" + ProdInfo[i]["enclosure_nm"];
                        ws.Cells["A" + (i + 8 + j)].Value = ProdInfo[i]["article_no"];
                        ws.Cells["B" + (i + 8 + j)].Value = ProdInfo[i]["description"];
                        ws.Cells["C" + (i + 8 + j)].Value = ProdInfo[i]["article_qty"];
                        if (ProdInfo[i]["product_type"].ToString() == "prod02" || ProdInfo[i]["product_type"].ToString() == "prod03" || ProdInfo[i]["product_type"].ToString() == "prod04")
                        {
                            //                            ws.Cells["D" + (i + 8 + j)].Value = ProdInfo[i]["work_yn"];

                            if (ProdInfo[i]["work_yn"].ToString() == "Y") { ws.Cells["d" + (i + 8 + j)].Value = "▣"; } else { ws.Cells["d" + (i + 8 + j)].Value = "□"; }

                        }

                        IList<Hashtable> specList = mapper.QueryForList<Hashtable>("QuotationSpec_List", hash);

                        Hashtable spec_color = new Hashtable();
                        Hashtable spec_panel = new Hashtable();
                        Hashtable spec_front = new Hashtable();
                        Hashtable spec_rear = new Hashtable();
                        Hashtable spec_mounting = new Hashtable();
                        Hashtable spec_roof = new Hashtable();
                        Hashtable spec_baseframe = new Hashtable();
                        Hashtable spec_grand = new Hashtable();
                        Hashtable spec_side = new Hashtable();
                        Hashtable spec_opt1 = new Hashtable();
                        Hashtable spec_opt2 = new Hashtable();
                        Hashtable spec_opt3 = new Hashtable();
                        Hashtable spec_opt4 = new Hashtable();
                        Hashtable spec_opt5 = new Hashtable();
                        Hashtable spec_opt6 = new Hashtable();
                        Hashtable spec_opt7 = new Hashtable();
                        Hashtable spec_opt8 = new Hashtable();
                        Hashtable spec_dkwidth = new Hashtable();
                        Hashtable spec_dkheight = new Hashtable();
                        Hashtable spec_dkdepth = new Hashtable();

                        foreach (Hashtable spec in specList)
                        {
                            switch (spec["spec_id"].ToString())
                            {
                                case "Enclosure color":
                                    spec_color = spec;
                                    break;
                                case "PANEL TYPE":
                                    spec_panel = spec;
                                    break;
                                case "FRONT":
                                    spec_front = spec;
                                    break;
                                case "REAR":
                                    spec_rear = spec;
                                    break;
                                case "MOUNTING PLATE":
                                    spec_mounting = spec;
                                    break;
                                case "ROOF":
                                    spec_roof = spec;
                                    break;
                                case "BASE FRAME":
                                    spec_baseframe = spec;
                                    break;
                                case "GLAND PLATE":
                                    spec_grand = spec;
                                    break;
                                case "SIDE PANEL":
                                    spec_side = spec;
                                    break;
                                case "설치깊이":
                                    spec_opt1 = spec;
                                    break;
                                case "전면패널사이즈":
                                    spec_opt2 = spec;
                                    break;
                                case "전면 구성":
                                    spec_opt3 = spec;
                                    break;
                                case "서포터암 연결부":
                                    spec_opt4 = spec;
                                    break;
                                case "키보드 디자인":
                                    spec_opt5 = spec;
                                    break;
                                case "손잡이 디자인":
                                    spec_opt6 = spec;
                                    break;
                                case "추가 가공":
                                    spec_opt7 = spec;
                                    break;
                                case "총수량":
                                    spec_opt8 = spec;
                                    break;
                                case "WIDTH":
                                    spec_dkwidth = spec;
                                    break;
                                case "HEIGHT":
                                    spec_dkheight = spec;
                                    break;
                                case "DEPTH":
                                    spec_dkdepth = spec;
                                    break;

                            }
                            // prod[spec["spec_id"]] = spec;
                        }

                        switch (hash["product_name"].ToString())
                        {
                            case "TS":
                                ws.Cells["B" + (i + 9 + j)].Value = "> Enclosure color - " + spec_color["option1_nm"] + " " + spec_color["option2_nm"];
                                //if (spec_color["work_yn"].ToString() == "Y") {ws.Cells["d" + (i + 9 + j)].Value = "▣";} else {ws.Cells["d" + (i + 9 + j)].Value = "□";}
                                j++;

                                ws.Cells["B" + (i + 9 + j)].Value = "> FRONT - " + spec_front["option1_nm"] + " / " + spec_front["option2_nm"];
                                if (spec_front["work_yn"].ToString() == "Y") { ws.Cells["d" + (i + 9 + j)].Value = "▣"; } else { ws.Cells["d" + (i + 9 + j)].Value = "□"; }
                                j++;

                                ws.Cells["B" + (i + 9 + j)].Value = "> REAR - " + spec_rear["option1_nm"] + " / " + spec_rear["option2_nm"];
                                if (spec_rear["work_yn"].ToString() == "Y") { ws.Cells["d" + (i + 9 + j)].Value = "▣"; } else { ws.Cells["d" + (i + 9 + j)].Value = "□"; }
                                j++;
                                ws.Cells["B" + (i + 9 + j)].Value = "> MOUNTING PLATE - " + spec_mounting["option1_nm"] + " / " + spec_mounting["option2_nm"];
                                if (spec_mounting["work_yn"].ToString() == "Y") { ws.Cells["d" + (i + 9 + j)].Value = "▣"; } else { ws.Cells["d" + (i + 9 + j)].Value = "□"; }
                                j++;

                                ws.Cells["B" + (i + 9 + j)].Value = "> ROOF - " + spec_roof["option1_nm"] + " / " + spec_roof["option2_nm"];
                                if (spec_roof["work_yn"].ToString() == "Y") { ws.Cells["d" + (i + 9 + j)].Value = "▣"; } else { ws.Cells["d" + (i + 9 + j)].Value = "□"; }
                                j++;

                                ws.Cells["B" + (i + 9 + j)].Value = "> BASE FRAME - " + spec_baseframe["option1_nm"] + " / " + spec_grand["option1_nm"];
                                if (spec_baseframe["work_yn"].ToString() == "Y") { ws.Cells["d" + (i + 9 + j)].Value = "▣"; } else { ws.Cells["d" + (i + 9 + j)].Value = "□"; }
                                j++;

                                ws.Cells["B" + (i + 9 + j)].Value = "> GLAND PLATE - " + spec_grand["option1_nm"] + " / " + spec_grand["option2_nm"];
                                if (spec_grand["work_yn"].ToString() == "Y") { ws.Cells["d" + (i + 9 + j)].Value = "▣"; } else { ws.Cells["d" + (i + 9 + j)].Value = "□"; }
                                j++;

                                ws.Cells["B" + (i + 9 + j)].Value = "> SIDE PANEL - " + spec_side["option1_nm"] + " / " + spec_side["option2_nm"];
                                if (spec_side["work_yn"].ToString() == "Y") { ws.Cells["d" + (i + 9 + j)].Value = "▣"; } else { ws.Cells["d" + (i + 9 + j)].Value = "□"; }
                                j++;

                                break;
                            case "Small Box":
                                ws.Cells["B" + (i + 9 + j)].Value = "> Enclosure color - " + spec_color["option1_nm"] + " " + spec_color["option2_nm"];
                                //if (spec_color["work_yn"].ToString() == "Y") { ws.Cells["d" + (i + 9 + j)].Value = "▣"; } else { ws.Cells["d" + (i + 9 + j)].Value = "□"; }
                                j++;
                                break;
                            case "Common":
                                ws.Cells["B" + (i + 9 + j)].Value = "> Enclosure color - " + spec_color["option1_nm"] + " " + spec_color["option2_nm"];
                                //if (spec_color["work_yn"].ToString() == "Y") { ws.Cells["d" + (i + 9 + j)].Value = "▣"; } else { ws.Cells["d" + (i + 9 + j)].Value = "□"; }
                                j++;
                                break;
                            case "PC & TP":
                                ws.Cells["B" + (i + 9 + j)].Value = "> Enclosure color - " + spec_color["option1_nm"] + " " + spec_color["option2_nm"];
                                //if (spec_color["work_yn"].ToString() == "Y") { ws.Cells["d" + (i + 9 + j)].Value = "▣"; } else { ws.Cells["d" + (i + 9 + j)].Value = "□"; }
                                j++;
                                break;
                            case "CP":
                                ws.Cells["B" + (i + 9 + j)].Value = "> Enclosure color - " + spec_color["option1_nm"] + " " + spec_color["option2_nm"];
                                //if (spec_color["work_yn"].ToString() == "Y") { ws.Cells["d" + (i + 9 + j)].Value = "▣"; } else { ws.Cells["d" + (i + 9 + j)].Value = "□"; }
                                j++;
                                break;
                            case "Opti Panel":
                                ws.Cells["B" + (i + 9 + j)].Value = "> 설치깊이 - " + spec_opt1["option1_nm"];
                                j++;

                                ws.Cells["B" + (i + 9 + j)].Value = "> 전면패널사이즈 - " + spec_opt2["option1_nm"] + "*" + spec_opt2["option2_nm"] + " " + spec_opt2["option3_nm"];
                                j++;

                                ws.Cells["B" + (i + 9 + j)].Value = "> 전면 구성 - " + spec_opt3["option1_nm"] + "/" + spec_opt3["option2_nm"] + "/" + spec_opt3["option3_nm"];
                                j++;

                                ws.Cells["B" + (i + 9 + j)].Value = "> 서포터암 연결부 - " + spec_opt4["option1_nm"] + "/" + spec_opt4["option2_nm"];
                                j++;

                                ws.Cells["B" + (i + 9 + j)].Value = "> 키보드 디자인 - " + spec_opt5["option1_nm"] + " " + spec_opt5["option2_nm"] + "/" + spec_opt5["option3_nm"];
                                j++;

                                ws.Cells["B" + (i + 9 + j)].Value = "> 손잡이 디자인 - " + spec_opt6["option1_nm"] + "/" + spec_opt6["option2_nm"];
                                j++;

                                ws.Cells["B" + (i + 9 + j)].Value = "> 추가 가공 - " + spec_opt7["option1_nm"];
                                j++;

                                ws.Cells["B" + (i + 9 + j)].Value = "> 총수량 - " + spec_opt8["option1_nm"];
                                ws.Cells["C" + (i + 9 + j - 8)].Value = int.Parse(spec_opt8["option1_nm"].ToString());
                                j++;

                                if (ProdInfo[i]["product_type"].ToString() == "prod05")
                                {
                                    op_qty = op_qty + float.Parse(spec_opt8["option1_nm"].ToString());
                                }

                                break;

                            case "DK-TS":
                                ws.Cells["B" + (i + 9 + j)].Value = "> WIDH*HEIGHT*DEPTH - " + spec_dkwidth["option1_nm"] + "*" + spec_dkheight["option1_nm"] + "*" + spec_dkdepth["option1_nm"];
                                j++;

                                ws.Cells["B" + (i + 9 + j)].Value = "> Enclosure color - " + spec_color["option1_nm"] + " " + spec_color["option2_nm"];
                                //if (spec_color["work_yn"].ToString() == "Y") { ws.Cells["d" + (i + 9 + j)].Value = "▣"; } else { ws.Cells["d" + (i + 9 + j)].Value = "□"; }
                                j++;

                                ws.Cells["B" + (i + 9 + j)].Value = "> FRONT - " + spec_front["option1_nm"] + " / " + spec_front["option2_nm"];
                                if (spec_front["work_yn"].ToString() == "Y") { ws.Cells["d" + (i + 9 + j)].Value = "▣"; } else { ws.Cells["d" + (i + 9 + j)].Value = "□"; }
                                j++;

                                ws.Cells["B" + (i + 9 + j)].Value = "> REAR - " + spec_rear["option1_nm"] + " / " + spec_rear["option2_nm"];
                                if (spec_rear["work_yn"].ToString() == "Y") { ws.Cells["d" + (i + 9 + j)].Value = "▣"; } else { ws.Cells["d" + (i + 9 + j)].Value = "□"; }
                                j++;
                                ws.Cells["B" + (i + 9 + j)].Value = "> MOUNTING PLATE - " + spec_mounting["option1_nm"] + " / " + spec_mounting["option2_nm"];
                                if (spec_mounting["work_yn"].ToString() == "Y") { ws.Cells["d" + (i + 9 + j)].Value = "▣"; } else { ws.Cells["d" + (i + 9 + j)].Value = "□"; }
                                j++;

                                ws.Cells["B" + (i + 9 + j)].Value = "> ROOF - " + spec_roof["option1_nm"] + " / " + spec_roof["option2_nm"];
                                if (spec_roof["work_yn"].ToString() == "Y") { ws.Cells["d" + (i + 9 + j)].Value = "▣"; } else { ws.Cells["d" + (i + 9 + j)].Value = "□"; }
                                j++;

                                ws.Cells["B" + (i + 9 + j)].Value = "> BASE FRAME - " + spec_baseframe["option1_nm"] + " / " + spec_grand["option1_nm"];
                                if (spec_baseframe["work_yn"].ToString() == "Y") { ws.Cells["d" + (i + 9 + j)].Value = "▣"; } else { ws.Cells["d" + (i + 9 + j)].Value = "□"; }
                                j++;

                                ws.Cells["B" + (i + 9 + j)].Value = "> GLAND PLATE - " + spec_grand["option1_nm"] + " / " + spec_grand["option2_nm"];
                                if (spec_grand["work_yn"].ToString() == "Y") { ws.Cells["d" + (i + 9 + j)].Value = "▣"; } else { ws.Cells["d" + (i + 9 + j)].Value = "□"; }
                                j++;

                                ws.Cells["B" + (i + 9 + j)].Value = "> SIDE PANEL - " + spec_side["option1_nm"] + " / " + spec_side["option2_nm"];
                                if (spec_side["work_yn"].ToString() == "Y") { ws.Cells["d" + (i + 9 + j)].Value = "▣"; } else { ws.Cells["d" + (i + 9 + j)].Value = "□"; }
                                j++;
                                break;
                        }

                        Hashtable hash_acc = new Hashtable();
                        hash_acc["quota_no"] = quota_no;
                        hash_acc["article_type"] = "accessary";
                        hash_acc["product_type"] = ProdInfo[i]["product_type"].ToString();
                        hash_acc["line_no"] = ProdInfo[i]["line_no"].ToString();
                        hash_acc["seq_no"] = ProdInfo[i]["seq_no"].ToString();

                        IList<Hashtable> accList = mapper.QueryForList<Hashtable>("Quota_AccessaryQuery", hash_acc);
                        for (int k = 0; k < accList.Count; k++)
                        {
                            //j = j + k ;

                            if (accList[k]["material_no"].ToString() != "")
                            {
                                ws.Cells["A" + (i + 9 + j)].Value = accList[k]["material_no"];
                                ws.Cells["B" + (i + 9 + j)].Value = accList[k]["description"];
                                ws.Cells["c" + (i + 9 + j)].Value = accList[k]["Qty"];
                                if (accList[k]["work_yn"].ToString() == "Y")
                                {
                                    ws.Cells["d" + (i + 9 + j)].Value = "▣";
                                }
                                else
                                {
                                    ws.Cells["d" + (i + 9 + j)].Value = "□";
                                }

                                if (accList[k]["assy_yn"].ToString() == "Y")
                                {
                                    ws.Cells["e" + (i + 9 + j)].Value = "▣";
                                }
                                else
                                {
                                    ws.Cells["e" + (i + 9 + j)].Value = "□";
                                }

                                if (accList[k]["paint_yn"].ToString() == "Y")
                                {
                                    ws.Cells["f" + (i + 9 + j)].Value = "▣";
                                }
                                else
                                {
                                    ws.Cells["f" + (i + 9 + j)].Value = "□";
                                }

                                if (accList[k]["location"].ToString() == "비표준")
                                {
                                    ws.Cells["G" + (i + 9 + j)].Value = accList[k]["location"];
                                    ws.Cells["H" + (i + 9 + j)].Value = accList[k]["comment"];
                                }

                            }
                            j++;
                        }
                        //j++;

                        ws.Cells["A" + (i + 9 + j)].Value = "Add. Req.";
                        ws.Cells["B" + (i + 9 + j)].Value = ProdInfo[i]["add_info"];
                        j++;
                        j++;

                        m = i + 9 + j;
                    }
                    m++;
                    m++;

                    ws.Cells["B" + (m + 1)].Value = "Total - TS / DK-TS";
                    ws.Cells["C" + (m + 1)].Value = bc_qty;
                    ws.Cells["B" + (m + 2)].Value = "Total - Small boxes";
                    ws.Cells["C" + (m + 2)].Value = sb_qty;

                    ws.Cells["B" + (m + 3)].Value = "Total - PC &TP";
                    ws.Cells["C" + (m + 3)].Value = tp_qty;
                    ws.Cells["B" + (m + 4)].Value = "Total - CP";
                    ws.Cells["C" + (m + 4)].Value = cp_qty;
                    ws.Cells["B" + (m + 5)].Value = "Total - Opti Panel";
                    ws.Cells["C" + (m + 5)].Value = op_qty;
                    ws.Cells["B" + (m + 6)].Value = "Total - Common";
                    ws.Cells["C" + (m + 6)].Value = co_qty;
                }




                Stream outStream = new MemoryStream(ep.GetAsByteArray());
                result.Content = new StreamContent(outStream);
                result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
                result.Content.Headers.ContentDisposition.FileName = "QuotationRequest.xlsx";
                result.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

            }
            catch (Exception ex)
            {
                String errmsg = ex.Message;
                logger.Debug(ex.Message);
                result = Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.Message); //리턴타입은 JSON 
            }
            return result;
        }

        [HttpPost]
        public HttpResponseMessage FindQuota_Creator([FromBody] dynamic request) //견적기본정보 리스트 페이지 조회
        {
            Hashtable hash = new Hashtable();
            Hashtable result = new Hashtable();

            hash["quota_no"] = request.quota_no.ToString();
            hash["status"] = request.status.ToString();

            ISqlMapper mapper = Mapper.Instance();
            try
            {
                // 쿼리 처리  

                string Qry = "FindQuota_Creator";  // Api/Models/SqlMap/Quotation.xml에 정의한 ID
                IList<Hashtable> data = mapper.QueryForList<Hashtable>(Qry, hash);
                result["status"] = "true";
                result["msg"] = data.Count + "건 조회";
                result["data"] = data;

            }
            catch (Exception ex)
            {
                result["status"] = "false";
                result["msg"] = ex.Message;
                logger.Debug(ex.Message);
            }

            return Request.CreateResponse(HttpStatusCode.OK, result, JsonMediaTypeFormatter.DefaultMediaType); //리턴타입은 JSON 
        }


        [HttpGet]
        public HttpResponseMessage quotaSAP_Request(string quota_no) //SAP Uoload용  다운로드 - 액셀템플릿을 읽어서 파일로 다운로드 
        {
            HttpResponseMessage result = new HttpResponseMessage();
            string reportPath = WebConfigurationManager.AppSettings["REPORT_PATH"];

            Hashtable hash = new Hashtable();
            hash["quota_no"] = quota_no;
            ISqlMapper mapper = Mapper.Instance();
            try
            {

                string fpath = HttpContext.Current.Server.MapPath(reportPath + "SAP_upload.xlsx"); //SAP Uoload용 견적요청서 템플릿 파일   
                var fStream = new MemoryStream(File.ReadAllBytes(fpath)); //파일을 메모리에 스트림으로 변환 
                ExcelPackage ep = new ExcelPackage(fStream); //액셀초기화 
                ExcelWorksheet ws = ep.Workbook.Worksheets.First();  //워크시트 읽기 

                Hashtable customerinfo = mapper.QueryForObject<Hashtable>("QuotationList", hash);
                //견적기본정보

                int line_no = 0; //현재 라인 번호
                int enc_sno = 1;  //새로운 enclosure 시작 번호
                int enc_eno = 1;  //새로운 enclosure 시작 번호
                line_no = 1;

                if (customerinfo["sales_type"].ToString() == "단순견적")
                {
                    ws.Cells["G" + line_no].Value = "Accessory Req.";
                    line_no++;
                    line_no++;

                    ws.Cells["A" + line_no].Value = "Enclosure Name.";
                    ws.Cells["B" + line_no].Value = "Article No.";
                    ws.Cells["C" + line_no].Value = "Description";
                    ws.Cells["D" + line_no].Value = "Qty";

                    ws.Cells["G" + line_no].Value = "Article No.";
                    ws.Cells["H" + line_no].Value = "Description";
                    ws.Cells["I" + line_no].Value = "Unit";
                    ws.Cells["J" + line_no].Value = "Qty";
                    ws.Cells["K" + line_no].Value = "EA/PU";
                    //ws.Cells["L" + line_no].Value = "조립X";
                    //ws.Cells["M" + line_no].Value = "조립O";
                    //ws.Cells["N" + line_no].Value = "가공";
                    //ws.Cells["O" + line_no].Value = "도장";
                    line_no++;

                    hash["article_type"] = "accessary";
                    IList<Hashtable> accList = mapper.QueryForList<Hashtable>("SimpleQuotationArticle_List", hash);
                    for (int i = 0; i < accList.Count; i++)
                    {
                        line_no = line_no + 1;

                        ws.Cells["G" + line_no].Value = accList[i]["material_no"];
                        ws.Cells["H" + line_no].Value = accList[i]["description"];
                        ws.Cells["I" + line_no].Value = accList[i]["order_unit"];
                        if (accList[i]["order_unit"].ToString() == "EA")
                        {
                            ws.Cells["J" + line_no].Value = accList[i]["Qty"];
                        }
                        else
                        {
                            ws.Cells["K" + line_no].Value = accList[i]["Qty"];
                        }
                        //                        ws.Cells["K" + line_no].Value = accList[i]["numerator"];

                        if (accList[i]["assy_yn"].ToString() == "Y")
                        {
                            ws.Cells["L" + line_no].Value = "조립";
                        }

                        if (accList[i]["work_yn"].ToString() == "Y")
                        {
                            ws.Cells["M" + line_no].Value = "가공";
                        }

                        if (accList[i]["paint_yn"].ToString() == "Y")
                        {
                            ws.Cells["N" + line_no].Value = "도장";
                        }
                    }

                    line_no++;
                    line_no++;

                    ws.Cells["A" + line_no].Value = "Additional Req.";
                    line_no++;

                    ws.Cells["A" + line_no].Value = customerinfo["Add_info"].ToString();

                    line_no = line_no + 7;

                }
                else
                { //작업견적
                    hash["article_type"] = "product";

                    line_no = 1;

                    IList<Hashtable> ProdInfo = mapper.QueryForList<Hashtable>("QuotationArticle_List", hash);
                    for (int i = 0; i < ProdInfo.Count; i++)
                    {
                        hash["line_no"] = ProdInfo[i]["line_no"].ToString();
                        hash["seq_no"] = ProdInfo[i]["seq_no"].ToString();
                        hash["product_type"] = ProdInfo[i]["product_type"].ToString();
                        hash["product_name"] = ProdInfo[i]["product_name"].ToString();
                        hash["article_type"] = ProdInfo[i]["article_type"].ToString();

                        ws.Cells["A" + line_no].Value = ProdInfo[i]["line_no"] + ". " + ProdInfo[i]["enclosure_nm"];
                        ws.Cells["G" + line_no].Value = "Accessory Req.";

                        if (i < ProdInfo.Count - 1)
                        {
                            if (ProdInfo[i]["seq_no"].ToString() != "1" || ProdInfo[i + 1]["seq_no"].ToString() != "1")
                            {
                                ws.Cells["B" + line_no].Value = "열반";
                            }
                        }
                        line_no++;
                        line_no++;

                        enc_sno = line_no;
                        ws.Cells["A" + line_no].Value = "Enclosure Name.";
                        ws.Cells["B" + line_no].Value = "Article No.";
                        ws.Cells["C" + line_no].Value = "Description";
                        ws.Cells["D" + line_no].Value = "Qty";

                        line_no++;

                        ws.Cells["A" + line_no].Value = ProdInfo[i]["enclosure_nm"];
                        ws.Cells["B" + line_no].Value = ProdInfo[i]["article_no"];
                        ws.Cells["C" + line_no].Value = ProdInfo[i]["description"];
                        ws.Cells["D" + line_no].Value = ProdInfo[i]["article_qty"];
                        if (ProdInfo[i]["work_yn"].ToString() == "Y") { ws.Cells["E" + line_no].Value = "가공"; }

                        line_no++;
                        line_no++;

                        IList<Hashtable> specList = mapper.QueryForList<Hashtable>("QuotationSpec_List", hash);

                        Hashtable spec_color = new Hashtable();
                        Hashtable spec_panel = new Hashtable();
                        Hashtable spec_front = new Hashtable();
                        Hashtable spec_rear = new Hashtable();
                        Hashtable spec_mounting = new Hashtable();
                        Hashtable spec_roof = new Hashtable();
                        Hashtable spec_baseframe = new Hashtable();
                        Hashtable spec_grand = new Hashtable();
                        Hashtable spec_side = new Hashtable();
                        Hashtable spec_opt1 = new Hashtable();
                        Hashtable spec_opt2 = new Hashtable();
                        Hashtable spec_opt3 = new Hashtable();
                        Hashtable spec_opt4 = new Hashtable();
                        Hashtable spec_opt5 = new Hashtable();
                        Hashtable spec_opt6 = new Hashtable();
                        Hashtable spec_opt7 = new Hashtable();
                        Hashtable spec_opt8 = new Hashtable();
                        Hashtable spec_dkwidth = new Hashtable();
                        Hashtable spec_dkheight = new Hashtable();
                        Hashtable spec_dkdepth = new Hashtable();

                        foreach (Hashtable spec in specList)
                        {
                            switch (spec["spec_id"].ToString())
                            {
                                case "Enclosure color":
                                    spec_color = spec;
                                    break;
                                case "PANEL TYPE":
                                    spec_panel = spec;
                                    break;
                                case "FRONT":
                                    spec_front = spec;
                                    break;
                                case "REAR":
                                    spec_rear = spec;
                                    break;
                                case "MOUNTING PLATE":
                                    spec_mounting = spec;
                                    break;
                                case "ROOF":
                                    spec_roof = spec;
                                    break;
                                case "BASE FRAME":
                                    spec_baseframe = spec;
                                    break;
                                case "GLAND PLATE":
                                    spec_grand = spec;
                                    break;
                                case "SIDE PANEL":
                                    spec_side = spec;
                                    break;
                                case "설치깊이":
                                    spec_opt1 = spec;
                                    break;
                                case "전면패널사이즈":
                                    spec_opt2 = spec;
                                    break;
                                case "전면 구성":
                                    spec_opt3 = spec;
                                    break;
                                case "서포터암 연결부":
                                    spec_opt4 = spec;
                                    break;
                                case "키보드 디자인":
                                    spec_opt5 = spec;
                                    break;
                                case "손잡이 디자인":
                                    spec_opt6 = spec;
                                    break;
                                case "추가 가공":
                                    spec_opt7 = spec;
                                    break;
                                case "총수량":
                                    spec_opt8 = spec;
                                    break;
                                case "WIDTH":
                                    spec_dkwidth = spec;
                                    break;
                                case "HEIGHT":
                                    spec_dkheight = spec;
                                    break;
                                case "DEPTH":
                                    spec_dkdepth = spec;
                                    break;
                            }
                            // prod[spec["spec_id"]] = spec;
                        }

                        switch (hash["product_name"].ToString())
                        {
                            case "TS":
                                ws.Cells["A" + line_no].Value = "Enclosure color";
                                ws.Cells["B" + line_no].Value = spec_color["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_color["option2_nm"];
                                line_no++;
                                line_no++;

                                ws.Cells["A" + line_no].Value = "PANEL TYPE";
                                ws.Cells["B" + line_no].Value = spec_panel["option1_nm"];
                                line_no++;

                                ws.Cells["A" + line_no].Value = "FRONT";
                                ws.Cells["B" + line_no].Value = spec_front["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_front["option2_nm"];
                                if (spec_front["work_yn"].ToString() == "Y") { ws.Cells["D" + line_no].Value = "가공"; }
                                line_no++;

                                ws.Cells["A" + line_no].Value = "REAR";
                                ws.Cells["B" + line_no].Value = spec_rear["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_rear["option2_nm"];
                                if (spec_rear["work_yn"].ToString() == "Y") { ws.Cells["D" + line_no].Value = "가공"; }
                                line_no++;

                                ws.Cells["A" + line_no].Value = "MOUNTING PLATE";
                                ws.Cells["B" + line_no].Value = spec_mounting["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_mounting["option2_nm"];
                                if (spec_mounting["work_yn"].ToString() == "Y") { ws.Cells["D" + line_no].Value = "가공"; }
                                line_no++;

                                ws.Cells["A" + line_no].Value = "ROOF";
                                ws.Cells["B" + line_no].Value = spec_roof["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_roof["option2_nm"];
                                if (spec_roof["work_yn"].ToString() == "Y") { ws.Cells["D" + line_no].Value = "가공"; }
                                line_no++;

                                ws.Cells["A" + line_no].Value = "BASE FRAME";
                                ws.Cells["B" + line_no].Value = spec_baseframe["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_baseframe["option2_nm"];
                                if (spec_baseframe["work_yn"].ToString() == "Y") { ws.Cells["D" + line_no].Value = "가공"; }
                                line_no++;

                                ws.Cells["A" + line_no].Value = "GLAND PLATE";
                                ws.Cells["B" + line_no].Value = spec_grand["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_grand["option2_nm"];
                                if (spec_grand["work_yn"].ToString() == "Y") { ws.Cells["D" + line_no].Value = "가공"; }
                                line_no++;

                                ws.Cells["A" + line_no].Value = "SIDE PANEL";
                                ws.Cells["B" + line_no].Value = spec_side["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_side["option2_nm"];
                                if (spec_side["work_yn"].ToString() == "Y") { ws.Cells["D" + line_no].Value = "가공"; }
                                line_no = line_no + 3;

                                ws.Cells["A" + line_no].Value = "Additional Req.";
                                line_no++;

                                ws.Cells["A" + line_no].Value = ProdInfo[i]["add_info"];

                                line_no = line_no + 7;

                                enc_eno = line_no;

                                break;
                            case "Small Box":
                                ws.Cells["A" + line_no].Value = "Enclosure color";
                                ws.Cells["B" + line_no].Value = spec_color["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_color["option2_nm"];
                                line_no++;
                                line_no++;

                                ws.Cells["A" + line_no].Value = "Additional Req.";
                                line_no++;

                                ws.Cells["A" + line_no].Value = ProdInfo[i]["add_info"];

                                line_no = line_no + 7;
                                enc_eno = line_no;
                                break;
                            case "Common":
                                ws.Cells["A" + line_no].Value = "Enclosure color";
                                ws.Cells["B" + line_no].Value = spec_color["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_color["option2_nm"];
                                line_no++;
                                line_no++;

                                ws.Cells["A" + line_no].Value = "Additional Req.";
                                line_no++;

                                ws.Cells["A" + line_no].Value = ProdInfo[i]["add_info"];

                                line_no = line_no + 7;
                                enc_eno = line_no;
                                break;
                            case "PC & TP":
                                ws.Cells["A" + line_no].Value = "Enclosure color";
                                ws.Cells["B" + line_no].Value = spec_color["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_color["option2_nm"];
                                line_no++;
                                line_no++;

                                ws.Cells["A" + line_no].Value = "Additional Req.";
                                line_no++;

                                ws.Cells["A" + line_no].Value = ProdInfo[i]["add_info"];

                                line_no = line_no + 7;
                                enc_eno = line_no;
                                break;
                            case "CP":
                                ws.Cells["A" + line_no].Value = "Enclosure color";
                                ws.Cells["B" + line_no].Value = spec_color["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_color["option2_nm"];
                                line_no++;
                                line_no++;

                                ws.Cells["A" + line_no].Value = "Additional Req.";
                                line_no++;

                                ws.Cells["A" + line_no].Value = ProdInfo[i]["add_info"];

                                line_no = line_no + 7;
                                enc_eno = line_no;
                                break;
                            case "Opti Panel":
                                ws.Cells["A" + line_no].Value = "설치깊이";
                                ws.Cells["B" + line_no].Value = spec_opt1["option1_nm"];
                                line_no++;

                                ws.Cells["A" + line_no].Value = "전면패널사이즈";
                                ws.Cells["B" + line_no].Value = spec_opt2["option1_nm"] + "*" + spec_opt2["option2_nm"];
                                ws.Cells["C" + line_no].Value = spec_opt2["option3_nm"];
                                line_no++;

                                ws.Cells["A" + line_no].Value = "전면 구성";
                                ws.Cells["B" + line_no].Value = spec_opt3["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_opt3["option2_nm"] + "/" + spec_opt3["option3_nm"];
                                line_no++;

                                ws.Cells["A" + line_no].Value = "서포터암 연결부";
                                ws.Cells["B" + line_no].Value = spec_opt4["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_opt4["option2_nm"];
                                line_no++;

                                ws.Cells["A" + line_no].Value = "키보드 디자인";
                                ws.Cells["B" + line_no].Value = spec_opt5["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_opt5["option2_nm"] + "/" + spec_opt5["option3_nm"];
                                line_no++;

                                ws.Cells["A" + line_no].Value = "손잡이 디자인";
                                ws.Cells["B" + line_no].Value = spec_opt6["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_opt6["option2_nm"];
                                line_no++;

                                ws.Cells["A" + line_no].Value = "추가 가공";
                                ws.Cells["B" + line_no].Value = spec_opt7["option1_nm"];
                                line_no++;

                                ws.Cells["A" + line_no].Value = "총수량";
                                ws.Cells["B" + line_no].Value = spec_opt8["option1_nm"];
                                ws.Cells["D" + (line_no - 9)].Value = spec_opt8["option1_nm"];

                                line_no++;
                                line_no++;

                                line_no = line_no + 7;
                                enc_eno = line_no;

                                break;
                            case "DK-TS":

                                ws.Cells["A" + line_no].Value = "Enclosure color";
                                ws.Cells["B" + line_no].Value = spec_color["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_color["option2_nm"];
                                line_no++;
                                line_no++;

                                ws.Cells["A" + line_no].Value = "WIDH*HEIGHT*DEPTH - " + spec_dkwidth["option1_nm"] + "*" + spec_dkheight["option1_nm"] + "*" + spec_dkdepth["option1_nm"];
                                line_no++;

                                ws.Cells["A" + line_no].Value = "PANEL TYPE";
                                ws.Cells["B" + line_no].Value = spec_panel["option1_nm"];
                                line_no++;

                                ws.Cells["A" + line_no].Value = "FRONT";
                                ws.Cells["B" + line_no].Value = spec_front["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_front["option2_nm"];
                                if (spec_front["work_yn"].ToString() == "Y") { ws.Cells["D" + line_no].Value = "가공"; }
                                line_no++;

                                ws.Cells["A" + line_no].Value = "REAR";
                                ws.Cells["B" + line_no].Value = spec_rear["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_rear["option2_nm"];
                                if (spec_rear["work_yn"].ToString() == "Y") { ws.Cells["D" + line_no].Value = "가공"; }
                                line_no++;

                                ws.Cells["A" + line_no].Value = "MOUNTING PLATE";
                                ws.Cells["B" + line_no].Value = spec_mounting["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_mounting["option2_nm"];
                                if (spec_mounting["work_yn"].ToString() == "Y") { ws.Cells["D" + line_no].Value = "가공"; }
                                line_no++;

                                ws.Cells["A" + line_no].Value = "ROOF";
                                ws.Cells["B" + line_no].Value = spec_roof["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_roof["option2_nm"];
                                if (spec_roof["work_yn"].ToString() == "Y") { ws.Cells["D" + line_no].Value = "가공"; }
                                line_no++;

                                ws.Cells["A" + line_no].Value = "BASE FRAME";
                                ws.Cells["B" + line_no].Value = spec_baseframe["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_baseframe["option2_nm"];
                                if (spec_baseframe["work_yn"].ToString() == "Y") { ws.Cells["D" + line_no].Value = "가공"; }
                                line_no++;

                                ws.Cells["A" + line_no].Value = "GLAND PLATE";
                                ws.Cells["B" + line_no].Value = spec_grand["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_grand["option2_nm"];
                                if (spec_grand["work_yn"].ToString() == "Y") { ws.Cells["D" + line_no].Value = "가공"; }
                                line_no++;

                                ws.Cells["A" + line_no].Value = "SIDE PANEL";
                                ws.Cells["B" + line_no].Value = spec_side["option1_nm"];
                                ws.Cells["C" + line_no].Value = spec_side["option2_nm"];
                                if (spec_side["work_yn"].ToString() == "Y") { ws.Cells["D" + line_no].Value = "가공"; }
                                line_no = line_no + 3;

                                ws.Cells["A" + line_no].Value = "Additional Req.";
                                line_no++;

                                ws.Cells["A" + line_no].Value = ProdInfo[i]["add_info"];

                                line_no = line_no + 7;

                                enc_eno = line_no;
                                break;
                        }

                        Hashtable hash_acc = new Hashtable();
                        hash_acc["quota_no"] = quota_no;
                        hash_acc["article_type"] = "accessary";
                        hash_acc["product_type"] = ProdInfo[i]["product_type"].ToString();
                        hash_acc["line_no"] = ProdInfo[i]["line_no"].ToString();
                        hash_acc["seq_no"] = ProdInfo[i]["seq_no"].ToString();

                        line_no = enc_sno;

                        ws.Cells["G" + line_no].Value = "Article No.";
                        ws.Cells["H" + line_no].Value = "Description";
                        ws.Cells["I" + line_no].Value = "Unit";
                        ws.Cells["J" + line_no].Value = "Qty";
                        ws.Cells["K" + line_no].Value = "EA/PU";
                        ws.Cells["L" + line_no].Value = "조립X";
                        ws.Cells["M" + line_no].Value = "조립O";
                        ws.Cells["N" + line_no].Value = "가공";
                        ws.Cells["O" + line_no].Value = "도장";

                        line_no++;

                        IList<Hashtable> accList = mapper.QueryForList<Hashtable>("Quota_AccessaryQuery", hash_acc);
                        for (int k = 0; k < accList.Count; k++)
                        {
                            if (accList[k]["material_no"].ToString() != "")
                            {

                                ws.Cells["G" + line_no].Value = accList[k]["material_no"];
                                ws.Cells["H" + line_no].Value = accList[k]["description"];
                                ws.Cells["I" + line_no].Value = accList[k]["order_unit"];
                                if (accList[k]["order_unit"].ToString() == "EA")
                                {
                                    ws.Cells["J" + line_no].Value = accList[k]["Qty"];
                                }
                                else
                                {
                                    ws.Cells["K" + line_no].Value = accList[k]["Qty"];
                                }

                                //                                ws.Cells["K" + line_no].Value = accList[k]["numerator"];

                                if (accList[k]["assy_yn"].ToString() == "Y")
                                {
                                    ws.Cells["M" + line_no].Value = "S";
                                }
                                else
                                {
                                    ws.Cells["L" + line_no].Value = "S";
                                }

                                if (accList[k]["work_yn"].ToString() == "Y")
                                {
                                    ws.Cells["N" + line_no].Value = "가공";
                                }

                                if (accList[k]["paint_yn"].ToString() == "Y")
                                {
                                    ws.Cells["O" +
                                        "" + line_no].Value = "도장";
                                }
                                line_no++;
                            }
                        }

                        if (enc_eno < line_no)
                        {
                            enc_sno = line_no;
                        }
                        else
                        {
                            enc_sno = enc_eno + 1;
                            line_no = enc_sno;
                        }
                    }


                }

                Stream outStream = new MemoryStream(ep.GetAsByteArray());
                result.Content = new StreamContent(outStream);
                result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
                result.Content.Headers.ContentDisposition.FileName = quota_no + ".xlsx";
                result.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

            }
            catch (Exception ex)
            {
                String errmsg = ex.Message;
                logger.Debug(ex.Message);
                result = Request.CreateResponse(HttpStatusCode.ExpectationFailed, ex.Message); //리턴타입은 JSON 
            }
            return result;
        }


    }
}
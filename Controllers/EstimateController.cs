using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Exceptions;
using Newtonsoft.Json;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
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
                string estimateID = null;
                if (hash["status_cd"].ToString().Equals("1"))
                {
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

            if (Request["cate_lv1"] != null)
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
        public ActionResult downXls(string idx, string type, string summary_yn) //견적서 다운로드 - 액셀템플릿을 읽어서 파일로 다운로드 
        {
            Hashtable result = new Hashtable();
            String fileNm = "";
            string outputFileNm = "";

            switch (type)
            {
                case "00": //국내영업

                    break;
                case "01"://해외영업 수량
                    fileNm = "en_estimate_A.xlsx";
                    break;
                case "02": //해외영업 물량
                    fileNm = "en_estimate_B.xlsx";
                    break;
                    /*case "21":
                        break;
                    case "22":
                        break;*/

            }

            string path = Server.MapPath("~/Content");

            string reportPath = string.Format("{0}/{1}", path, fileNm);

            Image sign1 = Image.FromFile(string.Format("{0}/{1}", path, "sign1.png"));
            Hashtable hash = new Hashtable();
            try
            {
                var fStream = new MemoryStream(System.IO.File.ReadAllBytes(reportPath));
                ExcelPackage ep = new ExcelPackage(fStream); //액셀초기화 
                ExcelWorksheet ws = ep.Workbook.Worksheets.First();  //워크시트 읽기 

                hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드 
                hash.Add("idx", idx);

                ISqlMapper mapper = Mapper.Instance();
                Hashtable data = mapper.QueryForObject<Hashtable>("estimateHeadList", hash);
                Hashtable items = new Hashtable();
                items.Add("sno", hash["idx"]);
                items.Add("prod_Not", "NOT");
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("estimateItemList", items);

                outputFileNm = CommonMethod.nullToStr2(data["cust_nm"]) + "_" + CommonMethod.nullToStr2(data["estimate_id"]) + ".xlsx";

                int fontSize = 8;

                int pointRow = 0;
                int totRow = 0;
                string Dformula = ""; 
                string Eformula = "";
                string Fformula = "";
                string Gformula = "";
                string Hformula = ""; 
                string[] remark;
                List<int> totRange = new List<int>();  //품목 합계를 구하기 위해 subTotRow를 배열에 등록
                int[] subRange = new int[] { 0, 0, 0 }; //subTotRow, 첫번째품목옵션, 마지막품목옵션
                double[] subTotal = new double[] { 0.00, 0.00, 0.00, 0.00, 0.00, 0.00 }; //품목별 합계  listprice, 5k, 10k, 30k, 50k, 100k

                string itemType;
                var picture = ws.Drawings.AddPicture("sign1", sign1);

                switch (type)
                {
                    case "00": //국내영업

                        break;
                    case "01"://해외영업 수량 

                        //견적기본정보
                        ws.Cells["A7"].Value = ws.Cells["A7"].Value + " " + data["cust_nm"]; //row, col
                        ws.Cells["E7"].Value = data["estimate_date"]; //row, col
                        ws.Cells["E8"].Value = data["estimate_id"]; //row, col

                        //ws.Cells["A13"].Style.Font.Size = 8;
                        //ws.Cells["A13"].Value = data["remark"]; //row, col
                        pointRow = 13;
                        remark = data["remark"].ToString().Split(new string[] { "\r\n", "\n" }, StringSplitOptions.None);
                        for (int i = 0; i < remark.Length; i++)
                        {
                            ws.InsertRow(pointRow, 1);
                            ws.Cells["A" + pointRow].Style.Font.Size = fontSize;
                            ws.Cells["A" + pointRow].Value = remark[i];
                            pointRow += 1;
                        }

                        pointRow += 3; //세부품목 처리 
                        totRow = 0;  //합계 ROW indexㅠ c 

                        foreach (Hashtable Item in list)
                        {
                            ws.InsertRow(pointRow, 1);
                            ws.Cells["A" + pointRow].Style.Font.Size = fontSize;
                            ws.Cells["B" + pointRow].Style.Font.Size = fontSize;
                            ws.Cells["C" + pointRow].Style.Font.Size = fontSize;
                            ws.Cells["D" + pointRow].Style.Font.Size = fontSize;
                            ws.Cells["E" + pointRow].Style.Font.Size = fontSize;
                            ws.Cells["F" + pointRow].Style.Font.Size = fontSize;
                            ws.Cells["G" + pointRow].Style.Font.Size = fontSize;
                            ws.Cells["H" + pointRow].Style.Font.Size = fontSize;

                            if (Item["header_yn"].ToString().Equals("Y"))
                            {
                                if (subRange[0] > 0) //0보다 크면 두번째 이후 부터이기 때문에 이전 품목의 합계를 구한다.
                                {
                                    //Qty
                                    //ws.Cells["D" + subRange[0]].Formula = "=SUM(D"+ subRange[1] + ":D"+ subRange[2] + ")"; 
                                    //Unit Price
                                    ws.Cells["E" + subRange[0]].Formula = "=SUM(E" + subRange[1] + ":E" + subRange[2] + ")";
                                    //Amount
                                    ws.Cells["F" + subRange[0]].Formula = "=D" + subRange[0] + "+E" + subRange[0];

                                    subRange[1] = 0;
                                    subRange[2] = 0;
                                }

                                totRange.Add(pointRow);
                                subRange[0] = pointRow;
                                ws.Row(pointRow).Style.Font.Bold = true;
                                ws.Cells["A" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                                ws.Cells["B" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                                ws.Cells["C" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                                ws.Cells["D" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                                ws.Cells["E" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                                ws.Cells["F" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                                ws.Cells["F" + pointRow].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                                itemType = Item["prod_desc"].ToString().Replace(" BASE", "");
                                ws.Cells["A" + pointRow].Value = data["item_name"] + " " + itemType;
                                ws.Cells["C" + pointRow].Value = itemType + " TOTAL";
                                ws.Cells["D" + pointRow].Value = Item["quantity"];
                                //ws.Cells["F" + pointRow].Value = Item["amount"]; 
                                pointRow += 1;
                                ws.InsertRow(pointRow, 1);
                                subRange[1] = pointRow; 
                                if (summary_yn == "Y") ws.Row(pointRow).Hidden = true;
                                //    subTotRow = pointRow;
                            }
                            else
                            {

                                if (subRange[1] == 0)
                                {
                                    subRange[1] = pointRow;
                                }
                                subRange[2] = pointRow; 
                                if (summary_yn == "Y") ws.Row(pointRow).Hidden = true;
                            }
                            ws.Cells["A" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            ws.Cells["B" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            ws.Cells["C" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            ws.Cells["D" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            ws.Cells["E" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            ws.Cells["F" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            ws.Cells["F" + pointRow].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                            ws.Cells["C" + pointRow].Style.Font.Size = fontSize;
                            ws.Cells["E" + pointRow].Style.Font.Size = fontSize;
                            ws.Cells["C" + pointRow].Value = Item["prod_desc"];
                            ws.Cells["E" + pointRow].Value = Item["unit_price"];

                            pointRow += 1;
                        }

                        ws.Cells["E" + subRange[0]].Formula = "=SUM(E" + subRange[1] + ":E" + subRange[2] + ")";
                        ws.Cells["F" + subRange[0]].Formula = "=D" + subRange[0] + "+E" + subRange[0];

                        subRange[1] = 0;
                        subRange[2] = 0;
                        pointRow += 1;
                        ws.Cells["A" + pointRow].Style.Font.Size = fontSize;
                        ws.Cells["B" + pointRow].Style.Font.Size = fontSize;
                        ws.Cells["C" + pointRow].Style.Font.Size = fontSize;
                        ws.Cells["D" + pointRow].Style.Font.Size = fontSize;
                        ws.Cells["E" + pointRow].Style.Font.Size = fontSize;
                        ws.Cells["F" + pointRow].Style.Font.Size = fontSize;
                        ws.Cells["G" + pointRow].Style.Font.Size = fontSize;
                        ws.Cells["H" + pointRow].Style.Font.Size = fontSize;

                        ws.Cells["A" + pointRow].Value = data["item_name"] + " SET";
                        ws.Cells["C" + pointRow].Value = "PRODUCT CODE: " + data["prod_code"];
                        totRow = pointRow;
                        Dformula = "=";
                        Eformula = "=";
                        Fformula = "=";
                        for (int i = 0; i < totRange.Count; i++)
                        {
                            Dformula += "D" + totRange[i];
                            Eformula += "E" + totRange[i];
                            Fformula += "F" + totRange[i];
                            if (i < totRange.Count - 1)
                            {
                                Dformula += "+";
                                Eformula += "+";
                                Fformula += "+";
                            }
                        }
                        ws.Cells["D" + totRow].Formula = Dformula;
                        ws.Cells["E" + totRow].Formula = Eformula;
                        ws.Cells["F" + totRow].Formula = Fformula;

                        pointRow += 1;

                        ws.Cells["C" + pointRow].Style.Font.Size = fontSize;
                        ws.Cells["C" + pointRow].Value = "PRODUCT NAME: " + data["prod_name"]; 
                        
                        //picture.To.Column = 5;
                        picture.From.Column = 3;
                        picture.From.Row = pointRow + 10;
                        picture.SetSize(265, 45);

                        break;

                    case "02": //해외영업 물량 

                        //견적기본정보
                        ws.Cells["A7"].Value = ws.Cells["A7"].Value + " " + data["cust_nm"]; //row, col
                        ws.Cells["G7"].Value = data["estimate_date"]; //row, col
                        ws.Cells["G8"].Value = data["estimate_id"]; //row, col

                        //ws.Cells["A13"].Style.Font.Size = 8;
                        //ws.Cells["A13"].Value = data["remark"]; //row, col
                        pointRow = 13;
                        remark = data["remark"].ToString().Split(new string[] { "\r\n", "\n" }, StringSplitOptions.None);
                        for (int i = 0; i < remark.Length; i++)
                        {
                            ws.InsertRow(pointRow, 1);
                            ws.Cells["A" + pointRow].Style.Font.Size = fontSize;
                            ws.Cells["A" + pointRow].Value = remark[i];
                            pointRow += 1;
                        }

                        pointRow += 3; //세부품목 처리 
                        totRow = 0;  //합계 ROW index  

                        foreach (Hashtable Item in list)
                        {
                            ws.InsertRow(pointRow, 1);
                            ws.Cells["A" + pointRow].Style.Font.Size = fontSize;
                            ws.Cells["B" + pointRow].Style.Font.Size = fontSize;
                            ws.Cells["C" + pointRow].Style.Font.Size = fontSize;
                            ws.Cells["D" + pointRow].Style.Font.Size = fontSize;
                            ws.Cells["E" + pointRow].Style.Font.Size = fontSize;
                            ws.Cells["F" + pointRow].Style.Font.Size = fontSize;
                            ws.Cells["G" + pointRow].Style.Font.Size = fontSize;
                            ws.Cells["H" + pointRow].Style.Font.Size = fontSize;

                            if (Item["header_yn"].ToString().Equals("Y"))
                            {
                                if (subRange[0] > 0) //0보다 크면 두번째 이후 부터이기 때문에 이전 품목의 합계를 구한다.
                                { 
                                    ws.Cells["D" + subRange[0]].Formula = "=SUM(D" + subRange[1] + ":D" + subRange[2] + ")";
                                    ws.Cells["E" + subRange[0]].Formula = "=SUM(E" + subRange[1] + ":E" + subRange[2] + ")";
                                    ws.Cells["F" + subRange[0]].Formula = "=SUM(F" + subRange[1] + ":F" + subRange[2] + ")";
                                    ws.Cells["G" + subRange[0]].Formula = "=SUM(G" + subRange[1] + ":G" + subRange[2] + ")";
                                    ws.Cells["H" + subRange[0]].Formula = "=SUM(H" + subRange[1] + ":H" + subRange[2] + ")";

                                    subRange[1] = 0;
                                    subRange[2] = 0;
                                }

                                totRange.Add(pointRow);
                                subRange[0] = pointRow;
                                ws.Row(pointRow).Style.Font.Bold = true; 
                                ws.Row(pointRow).Style.Font.Size = fontSize;
                                ws.Cells["A" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                                ws.Cells["B" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                                ws.Cells["C" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                                ws.Cells["D" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                                ws.Cells["E" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                                ws.Cells["F" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                                ws.Cells["G" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                                ws.Cells["H" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                                ws.Cells["H" + pointRow].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                                itemType = Item["prod_desc"].ToString().Replace(" BASE", "");

                                ws.Cells["A" + pointRow].Value = data["item_name"] + " " + itemType;
                                ws.Cells["C" + pointRow].Value = itemType + " TOTAL";
                                ws.Cells["D" + pointRow].Value = Item["qty_5k"];
                                ws.Cells["E" + pointRow].Value = Item["qty_10k"];
                                ws.Cells["F" + pointRow].Value = Item["qty_30k"];
                                ws.Cells["G" + pointRow].Value = Item["qty_50k"];
                                ws.Cells["H" + pointRow].Value = Item["qty_100k"]; 
                                pointRow += 1;
                                ws.InsertRow(pointRow, 1);
                                subRange[1] = pointRow;
                                if (summary_yn == "Y") ws.Row(pointRow).Hidden = true;
                                //    subTotRow = pointRow;
                            }
                            else
                            {

                                if (subRange[1] == 0)
                                {
                                    subRange[1] = pointRow;
                                }
                                subRange[2] = pointRow;
                                if (summary_yn == "Y") ws.Row(pointRow).Hidden = true;
                            }

                            ws.Cells["A" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            ws.Cells["B" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            ws.Cells["C" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            ws.Cells["D" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            ws.Cells["E" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            ws.Cells["F" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            ws.Cells["G" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            ws.Cells["H" + pointRow].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            ws.Cells["H" + pointRow].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                            ws.Cells["C" + pointRow].Style.Font.Size = fontSize;
                            ws.Cells["E" + pointRow].Style.Font.Size = fontSize;
                            ws.Row(pointRow).Style.Font.Size = fontSize;
                            ws.Cells["C" + pointRow].Value = Item["prod_desc"];
                            ws.Cells["D" + pointRow].Value = Item["qty_5k"];
                            ws.Cells["E" + pointRow].Value = Item["qty_10k"];
                            ws.Cells["F" + pointRow].Value = Item["qty_30k"];
                            ws.Cells["G" + pointRow].Value = Item["qty_50k"];
                            ws.Cells["H" + pointRow].Value = Item["qty_100k"]; 
                            pointRow += 1;
                        }

                        ws.Cells["D" + subRange[0]].Formula = "=SUM(D" + subRange[1] + ":D" + subRange[2] + ")";
                        ws.Cells["E" + subRange[0]].Formula = "=SUM(E" + subRange[1] + ":E" + subRange[2] + ")";
                        ws.Cells["F" + subRange[0]].Formula = "=SUM(F" + subRange[1] + ":F" + subRange[2] + ")";
                        ws.Cells["G" + subRange[0]].Formula = "=SUM(G" + subRange[1] + ":G" + subRange[2] + ")";
                        ws.Cells["H" + subRange[0]].Formula = "=SUM(H" + subRange[1] + ":H" + subRange[2] + ")";

                        subRange[1] = 0;
                        subRange[2] = 0;
                        pointRow += 1;
                        ws.Cells["A" + pointRow].Style.Font.Size = fontSize;
                        ws.Cells["B" + pointRow].Style.Font.Size = fontSize;
                        ws.Cells["C" + pointRow].Style.Font.Size = fontSize;
                        ws.Cells["D" + pointRow].Style.Font.Size = fontSize;
                        ws.Cells["E" + pointRow].Style.Font.Size = fontSize;
                        ws.Cells["F" + pointRow].Style.Font.Size = fontSize;
                        ws.Cells["G" + pointRow].Style.Font.Size = fontSize;
                        ws.Cells["H" + pointRow].Style.Font.Size = fontSize;

                        ws.Cells["A" + pointRow].Value = data["item_name"] + " SET";
                        ws.Cells["C" + pointRow].Value = "PRODUCT CODE: " + data["prod_code"];
                        totRow = pointRow;
                        Dformula = "=";
                        Eformula = "=";
                        Fformula = "=";
                        Gformula = "=";
                        Hformula = "="; 
                        for (int i = 0; i < totRange.Count; i++)
                        {
                            Dformula += "D" + totRange[i];
                            Eformula += "E" + totRange[i];
                            Fformula += "F" + totRange[i];
                            Gformula += "G" + totRange[i];
                            Hformula += "H" + totRange[i];
                            if (i < totRange.Count - 1)
                            {
                                Dformula += "+";
                                Eformula += "+";
                                Fformula += "+";
                                Gformula += "+";
                                Hformula += "+";
                            }
                        }
                        ws.Cells["D" + totRow].Formula = Dformula;
                        ws.Cells["E" + totRow].Formula = Eformula;
                        ws.Cells["F" + totRow].Formula = Fformula;
                        ws.Cells["G" + totRow].Formula = Gformula;
                        ws.Cells["H" + totRow].Formula = Hformula;

                        pointRow += 1;

                        ws.Cells["C" + pointRow].Style.Font.Size = fontSize;
                        ws.Cells["C" + pointRow].Value = "PRODUCT NAME: " + data["prod_name"]; 
                        ws.Cells["C" + pointRow].Value = "PRODUCT NAME: " + data["prod_name"];
                        //picture.To.Column = 5;
                        pointRow += 10;
                        picture.From.Column = 3;
                        picture.From.Row = pointRow;
                        picture.SetSize(265, 45);

                        pointRow += 4;
                        ws.Cells["A" + pointRow].Value = data["cust_nm"];

                        break;

                        /*case "21":
                            break;
                        case "22":
                            break;*/

                }





                return File(ep.GetAsByteArray(), System.Net.Mime.MediaTypeNames.Application.Octet, outputFileNm);

            }
            catch (Exception ex)
            {
                logger.Info(ex.Message);
                result.Add("success", false);
                result.Add("errmsg", ex.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }


    }
}
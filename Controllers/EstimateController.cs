using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Exceptions;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
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
                 
                hash.Add("estimate_id", Request["estimate_id"]);
                hash.Add("form_lang", Request["form_lang"]);
                hash.Add("form_type", Request["form_type"]);
                hash.Add("form_id", Request["form_id"]);
                hash.Add("dstr_type", Request["dstr_type"]);
                hash.Add("user_cd", Request["user_cd"]);
                hash.Add("estimate_date", Request["estimate_date"]);
                hash.Add("cust_cd", Request["cust_cd"]);
                hash.Add("ref_cd", Request["ref_cd"]);
                hash.Add("ref_nm", Request["ref_nm"]);
                hash.Add("ref_cd", Request["ref_cd"]);
                hash.Add("submit_cd", Request["submit_cd"]);
                hash.Add("submit_nm", Request["submit_nm"]);
                hash.Add("currency", Request["currency"]);
                hash.Add("subject", Request["subject"]);
                hash.Add("summary_yn", Request["summary_yn"]);
                hash.Add("remark", Request["remark"]);
                hash.Add("create_id", User.Identity.Name.Split('|')[0]);
                hash.Add("modify_id", User.Identity.Name.Split('|')[0]);


                mapper.BeginTransaction();
                mapper.Insert("estimateHeadInsert", hash);

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

                hash.Add("idx", Request["idx"]);
                hash.Add("estimate_id", Request["estimate_id"]);
                hash.Add("form_lang", Request["form_lang"]);
                hash.Add("form_type", Request["form_type"]);
                hash.Add("form_id", Request["form_id"]);
                hash.Add("dstr_type", Request["dstr_type"]);
                hash.Add("user_cd", Request["user_cd"]);
                hash.Add("estimate_date", Request["estimate_date"]);
                hash.Add("cust_cd", Request["cust_cd"]);
                hash.Add("ref_cd", Request["ref_cd"]);
                hash.Add("ref_nm", Request["ref_nm"]);
                hash.Add("ref_cd", Request["ref_cd"]);
                hash.Add("submit_cd", Request["submit_cd"]);
                hash.Add("submit_nm", Request["submit_nm"]);
                hash.Add("currency", Request["currency"]);
                hash.Add("subject", Request["subject"]);
                hash.Add("summary_yn", Request["summary_yn"]);
                hash.Add("remark", Request["remark"]); 
                hash.Add("modify_id", User.Identity.Name.Split('|')[0]);


                mapper.BeginTransaction();
                mapper.Update("estimateHeadUpdate", hash);

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

    }
}
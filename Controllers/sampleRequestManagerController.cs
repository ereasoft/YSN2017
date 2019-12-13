using IBatisNet.DataMapper;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YSN2017.ComLIB;

namespace YSN2017.Controllers{
    public class SampleRequestManagerController : Controller    {






        // 샘플 요청 : 리스트
        public ActionResult sampleRequestList() {

            if (Request.QueryString["mode"] != null && Request.QueryString["sdate"] != null && Request.QueryString["edate"] != null) {

                Hashtable hash = new Hashtable();

                hash.Add("language", User.Identity.Name.Split('|')[3]);     // 기본언어
              //hash.Add("company_cd", User.Identity.Name.Split('|')[2]); // 회사코드

                hash.Add("mode", Request.QueryString["mode"]);              // mode         : 샘플 : 요청R/접수A/검토V 구분
                hash.Add("deptGroup", Request.QueryString["deptGroup"]);    // deptGroup    : 매출조직
                hash.Add("bizGroup", Request.QueryString["bizGroup"]);      // bizGroup     : 매출조직 상위부서
                hash.Add("cust_nm", Request.QueryString["cust_nm"]);        // cust_nm      : 거래처명
                hash.Add("cust_cd", Request.QueryString["cust_cd"]);        // user_cd      : 거래처 코드 
                hash.Add("item_nm", Request.QueryString["item_nm"]);        // item_nm      : 품목명
                hash.Add("smp_status", Request.QueryString["smp_status"]);  // smp_status   : 진행상태

                hash.Add("sdate", Request.QueryString["sdate"]);            // sdate        : 샘플요청일 시작
                hash.Add("edate", Request.QueryString["edate"]);            // edate        : 샘플요청일 종료


                hash.Add("dstr_chn", Request.QueryString["dstr_chn"]);      // dstr_chn     : - 사용안함
                hash.Add("user_nm", Request.QueryString["user_nm"]);        // user_nm      : - 사용안함
                hash.Add("user_cd", Request.QueryString["user_cd"]);        // user_cd      : - 사용안함
                hash.Add("srqdate", Request.QueryString["srqdate"]);        // srqdate      : - 사용안함
                hash.Add("erqdate", Request.QueryString["erqdate"]);        // erqdate      : - 사용안함
                hash.Add("srrdate", Request.QueryString["srrdate"]);        // srrdate      : - 사용안함
                hash.Add("errdate", Request.QueryString["errdate"]);        // errdate      : - 사용안함
                hash.Add("rruser_cd", Request.QueryString["rruser_cd"]);    // rruser_cd    : - 사용안함

                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("sampleRequestList", hash);


                Hashtable jsonData = new Hashtable();
                jsonData.Add("COUNT", list.Count());
                jsonData.Add("LIST", list);


                var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }






    }
}
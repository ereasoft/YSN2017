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
    public class SampleReviewController : Controller    {






        // 샘플 검토 : 리스트
        public ActionResult sampleReviewList() {

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





        // 샘플 접수 : 상세
        public ActionResult sampleReviewView() {

            if (Request.QueryString["smr_cd"] != null) {

                Hashtable hash = new Hashtable();

                hash.Add("language", User.Identity.Name.Split('|')[3]);     // 기본언어

                hash.Add("smr_cd", Request.QueryString["smr_cd"]);          // smr_cd        : 샘플요청코드 
                hash.Add("smr_chasu", Request.QueryString["smr_chasu"]);    // smr_chasu     : 차수
                hash.Add("use_yn", "Y");                                    // use_yn        : 사용유무
                hash.Add("upCodeId", "SMR_TYPE");                           // upCodeId      : 샘플유형



                ISqlMapper mapper = Mapper.Instance();




                hash.Add("upCodeId", "SMR_PARTNM");
                hash.Add("value_1", "PUMP");
                hash.Add("table_nm", "T_SMR_PUMP");
                IEnumerable<Hashtable> pump_part_list = mapper.QueryForList<Hashtable>("smrTypeDetailList", hash);

                hash.Add("smr_partnm", "PUMP_PKG");
                hash.Add("table_cls", "SMR_PKG");
                Hashtable pump_pkg = mapper.QueryForObject<Hashtable>("smrTypeDetailPkgRemark_cmt", hash);

                hash.Add("smr_partnm", "PUMP_RMT");
                hash.Add("table_cls", "REMARK_CMT");
                Hashtable pump_remark_cmt = mapper.QueryForObject<Hashtable>("smrTypeDetailPkgRemark_cmt", hash);





                hash.Add("value_1", "BOTTLE");
                hash.Add("table_nm", "T_SMR_BOTTLE");
                IEnumerable<Hashtable> bottle_part_list = mapper.QueryForList<Hashtable>("smrTypeDetailList", hash);

                hash.Add("smr_partnm", "BOTTLE_PKG");
                hash.Add("table_cls", "SMR_PKG");
                Hashtable bottle_pkg = mapper.QueryForObject<Hashtable>("smrTypeDetailPkgRemark_cmt", hash);

                hash.Add("smr_partnm", "BOTTLE_RMT");
                hash.Add("table_cls", "REMARK_CMT");
                Hashtable bottle_remark_cmt = mapper.QueryForObject<Hashtable>("smrTypeDetailPkgRemark_cmt", hash);




                hash.Add("value_1", "OVERCAP");
                hash.Add("table_nm", "T_SMR_OVERCAP");
                IEnumerable<Hashtable> overcap_part_list = mapper.QueryForList<Hashtable>("smrTypeDetailList", hash);

                hash.Add("smr_partnm", "OVERCAP_PKG");
                hash.Add("table_cls", "SMR_PKG");
                Hashtable overcap_pkg = mapper.QueryForObject<Hashtable>("smrTypeDetailPkgRemark_cmt", hash);

                hash.Add("smr_partnm", "OVERCAP_RMT");
                hash.Add("table_cls", "REMARK_CMT");
                Hashtable overcap_remark_cmt = mapper.QueryForObject<Hashtable>("smrTypeDetailPkgRemark_cmt", hash);





                Hashtable jsonData = new Hashtable();
                jsonData.Add("PUMP_PART_LIST", pump_part_list);
                jsonData.Add("PUMP_PKG", pump_pkg);
                jsonData.Add("PUMP_REMARK_CMT", pump_remark_cmt);
                jsonData.Add("BOTTLE_PART_LIST", bottle_part_list);
                jsonData.Add("BOTTLE_PKG", bottle_pkg);
                jsonData.Add("BOTTLE_REMARK_CMT", bottle_remark_cmt);
                jsonData.Add("OVERCAP_PART_LIST", overcap_part_list);
                jsonData.Add("OVERCAP_PKG", overcap_pkg);
                jsonData.Add("OVERCAP_REMARK_CMT", overcap_remark_cmt);


                var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }








    }
}
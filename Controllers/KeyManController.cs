using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Exceptions;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YSN2017.ComLIB;


// [고객정보DB - 고객담당(Keyman)]
namespace YSN2017.Controllers{

    [Authorize(Roles = "User,Admin")]
    public class KeyManController : Controller    {

        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);


        // 고객담당(Keyman) 리스트
        public ActionResult keyManList() {

            if (Request.QueryString["use_yn"] != null) {

                Hashtable hash = new Hashtable();

                hash.Add("language", User.Identity.Name.Split('|')[3]);   // 확인필요
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);   

                hash.Add("cust_cd", Request.QueryString["cust_cd"]);        //   cust_cd    : 거래처PK
                hash.Add("cust_nm", Request.QueryString["cust_nm"]);        //   cust_nm    : 거래처명
                hash.Add("km_nm", Request.QueryString["km_nm"]);            //   km_nm      : 고객담당
                hash.Add("km_user_nm", Request.QueryString["km_user_nm"]);  //   km_user_nm : 영업담당
                hash.Add("use_yn", Request.QueryString["use_yn"]);          //   use_yn     : 활동여부
                hash.Add("bizGroup", Request.QueryString["bizGroup"]);      //   bizGroup   : 매출조직
                hash.Add("deptGroup", Request.QueryString["deptGroup"]);    //   deptGroup  : 매출조직 하위부서
                hash.Add("km_title", Request.QueryString["km_title"]);      //   km_title   : 직급
                hash.Add("s_reg_date", Request.QueryString["s_reg_date"]);  //   s_reg_date : 등록기간 시작
                hash.Add("e_reg_date", Request.QueryString["e_reg_date"]);  //   e_reg_date : 등록기간 종료
                hash.Add("km_work", Request.QueryString["km_work"]);        //   km_work    : 업무구분
                hash.Add("km_power", Request.QueryString["km_power"]);      //   km_power   : 권한정도


                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("keyManList", hash);


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




        // 고객담당(Keyman) 상세
        public ActionResult keyManDetail() {

            if (Request.QueryString["km_cd"] != null || Request.QueryString["km_nm"] != null) {

                Hashtable hash = new Hashtable();

                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);
                if (Request.QueryString["km_cd"] != null)
                {
                    hash.Add("km_cd", Request.QueryString["km_cd"]);   //   T_KEYMAN.km_cd    : 고객담당PK
                }
                if (Request.QueryString["km_nm"] != null)
                {
                    hash.Add("km_nm", Request.QueryString["km_nm"]);   //   T_KEYMAN.km_cd    : 고객담당PK
                }

                ISqlMapper mapper = Mapper.Instance();
                Hashtable list = mapper.QueryForObject<Hashtable>("keyManDetail", hash);

                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }






        // 고객담당(Keyman) 상세하단 - 활동현황
        public ActionResult BottomKeymanPlayList() {

            if (Request.QueryString["km_cd"] != null) {

                Hashtable hash = new Hashtable();

                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);  
                hash.Add("km_cd", Request.QueryString["km_cd"]);        //   km_cd    : 키맨PK

                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("BottomKeymanPlayList", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }





        // 고객담당(Keyman) 상세하단 - E-mail송수신
        public ActionResult BottomKeymanEmailList() {

            if (Request.QueryString["km_cd"] != null) {

                Hashtable hash = new Hashtable();

                hash.Add("km_cd", Request.QueryString["km_cd"]);        //   km_cd    : 키맨PK



                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("BottomKeymanEmailList", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }







        // 고객담당[Keyman]  : 수정
        [HttpPost]
        public ActionResult keyManUpdate() {

            ISqlMapper mapper = null;

        
            if (Request.Form["km_cd"] != null) {
                Hashtable result = new Hashtable();
                try {
                    Hashtable hash = new Hashtable();


                    hash.Add("company_cd", User.Identity.Name.Split('|')[2]);          


                    hash.Add("km_work", Request.Form["km_work"].notNullTrim());                // km_work        : 업무구분
                    hash.Add("km_dept_nm", Request.Form["km_dept_nm"].notNullTrim());          // km_dept_nm     : 부서명
                    hash.Add("km_posit", Request.Form["km_posit"].notNullTrim());              // km_posit       : 핵심/일반
                    hash.Add("km_title", Request.Form["km_title"].notNullTrim());              // km_title       : 직급
                    hash.Add("km_rep_work", Request.Form["km_rep_work"].notNullTrim());        // km_rep_work    : 담당업무
                    hash.Add("km_power", Request.Form["km_power"].notNullTrim());              // km_power       : 권한정도
                    hash.Add("km_friend", Request.Form["km_friend"].notNullTrim());            // km_friend      : 우호도
                    hash.Add("cust_gb", Request.Form["cust_gb"].notNullTrim());                // cust_gb        : --빈값 알수없음
                    hash.Add("cust_cd", Request.Form["cust_cd"].notNullTrim());                // cust_cd        : 거래처PK 
                    hash.Add("dom_ab", Request.Form["dom_ab"].notNullTrim());                  // dom_ab         : --빈값 알수없음
                    hash.Add("ab_nation", Request.Form["ab_nation"].notNullTrim());            // ab_nation      : 해외근무지
                    hash.Add("ab_region", Request.Form["ab_region"].notNullTrim());            // ab_region      : 햬외근무지 상세
                    hash.Add("km_email", Request.Form["km_email"].notNullTrim());              // km_email       : 회사메일
                    hash.Add("o_phone", Request.Form["o_phone"].notNullTrim());                // o_phone        : 전화번호
                    hash.Add("m_phone", Request.Form["m_phone"].notNullTrim());                // m_phone        : 핸드폰
                    hash.Add("km_school", Request.Form["km_school"].notNullTrim());            // km_school      : 출신학교
                    hash.Add("km_hobby", Request.Form["km_hobby"].notNullTrim());              // km_hobby       : 취미
                    hash.Add("km_religion", Request.Form["km_religion"].notNullTrim());        // km_religion    : 종교
                    hash.Add("km_address", Request.Form["km_address"].notNullTrim());          // km_address     : 집주소
                    hash.Add("km_descript", Request.Form["km_descript"].notNullTrim());        // km_descript    : 비고
                    hash.Add("km_o_email", Request.Form["km_o_email"].notNullTrim());          // km_o_email     : 외부메일
                    hash.Add("b_mth", Request.Form["b_mth"].notNullTrim());                    // b_mth          : 생일 월
                    hash.Add("b_data", Request.Form["b_data"].notNullTrim());                  // b_data         : 생일 일
                    hash.Add("w_mth", Request.Form["w_mth"].notNullTrim());                    // w_mth          : 결혼기념일 월 
                    hash.Add("w_data", Request.Form["w_data"].notNullTrim());                  // w_data         : 결혼기념일 일
                    hash.Add("use_yn", Request.Form["use_yn"].notNullTrim());                  // use_yn         : 활동여부
                    hash.Add("user_cd", Request.Form["user_cd"].notNullTrim());                // user_cd        : 거래처PK
                    hash.Add("km_cd", Request.Form["km_cd"].notNullTrim());                    // km_cd          : 고객담당PK


                    //  Preparing: UPDATE T_KEYMAN SET KM_WORK = ? , KM_DEPT_NM = ? , KM_POSIT = ? , KM_TITLE = ? , KM_REP_WORK = ? , KM_POWER = ? , KM_FRIEND = ? , CUST_GUBUN = ? , CUST_CD = ? , DOM_AB = ? , AB_NATION = ? , AB_REGION = ? , KM_EMAIL = ? , O_PHONE = ? , M_PHONE = ? , KM_SCHOOL = ? , KM_HOBBY = ? , KM_RELIGION = ? , KM_ADDRESS = ? , KM_DESCRIPT = ? , KM_O_EMAIL = ? , B_MTH = ? , B_DATA = ? , W_MTH = ? , W_DATA = ? , USE_YN = ? , MOD_DT = getdate(), MOD_USR = ? WHERE COMPANY_CD = ? AND KM_CD = ?
                    // Parameters: KMW_600(String), 품질안전센터(String), KMPST_100(String), 과장(String), 품질(String), KMP_100(String), (String), (String), 309(String), null, KOR(String), (String), xd6862 @coreana.co.kr(String), (String), 010-9404-5833(String), (String), (String), (String), (String), (String), (String), (String), (String), (String), (String), Y(String), 16021601(String), YONWOO(String), KM14100344(String)

                    mapper = Mapper.Instance();
                    mapper.BeginTransaction();
                    mapper.Update("keyManUpdate", hash);
                    mapper.CommitTransaction();

                    result.Add("success", true);
                    var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;

                    return jsonResult;

                } catch (DataMapperException e) {
                    mapper.RollBackTransaction();
                    logger.Info(e.Message);
                    result.Add("success", false);
                    result.Add("errmsg", e.Message);
                    return Json(result, JsonRequestBehavior.AllowGet);

                } catch (Exception e) {
                    if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                    logger.Info(e.Message);
                    result.Add("success", false);
                    result.Add("errmsg", e.Message);
                    return Json(result, JsonRequestBehavior.AllowGet);
                }

            } else {
                return new EmptyResult();
            }


        }





        // 고객담당(Keyman) 이름 중복체크
        public ActionResult keyManDupliChk() {

            if (Request.QueryString["km_nm"] != null) {

                Hashtable hash = new Hashtable();
               
                hash.Add("km_nm", Request.QueryString["km_nm"]);   //   km_nm    : 고객담당자 이름

                ISqlMapper mapper = Mapper.Instance();
                Hashtable list = mapper.QueryForObject<Hashtable>("keyManDupliChk", hash);

                Hashtable mainList = new Hashtable();
                mainList.Add("success", "true");
                mainList.Add("LIST", list);

                var jsonResult = Json(mainList, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }
        




        // 고객담당[Keyman] 등록
        [HttpPost]
        public ActionResult keyManInsert() {

            ISqlMapper mapper = null;

     
            if (Request.Form["km_nm"] != null) {
                Hashtable result = new Hashtable();
                try {
                    Hashtable hash = new Hashtable();


                    hash.Add("company_cd", User.Identity.Name.Split('|')[2]);                 // company_cd
                    hash.Add("km_user_cd", User.Identity.Name.Split('|')[0]);                 // km_user_cd    : 로그인 사용자ID
                    hash.Add("user_cd", User.Identity.Name.Split('|')[0]);                    // user_cd       : 로그인 사용자ID


                    hash.Add("sptnr_cd", Request.Form["sptnr_cd"].notNullTrim());              // sptnr_cd       : --빈값 알수없음
                    hash.Add("km_nm", Request.Form["km_nm"].notNullTrim());                    // km_nm       : 고객담당자 이름
                    hash.Add("km_work", Request.Form["km_work"].notNullTrim());                // km_work       : 업무구분
                    hash.Add("km_dept_nm", Request.Form["km_dept_nm"].notNullTrim());          // km_dept_nm    : 부서명
                    hash.Add("km_posit", Request.Form["km_posit"].notNullTrim());              // km_posit      : 핵심/일반
                    hash.Add("km_title", Request.Form["km_title"].notNullTrim());              // km_title      : 직급
                    hash.Add("km_rep_work", Request.Form["km_rep_work"].notNullTrim());        // km_rep_work   : 담당업무
                    hash.Add("km_power", Request.Form["km_power"].notNullTrim());              // km_power      : 권한정도
                    hash.Add("km_friend", Request.Form["km_friend"].notNullTrim());            // km_friend     : 우호도
                    hash.Add("cust_gb", Request.Form["cust_gb"].notNullTrim());                // cust_gb       : --빈값 알수없음
                    hash.Add("cust_cd", Request.Form["cust_cd"].notNullTrim());                // cust_cd       : 거래처PK 
                    hash.Add("dom_ab", Request.Form["dom_ab"].notNullTrim());                  // dom_ab        : --빈값 알수없음
                    hash.Add("ab_nation", Request.Form["ab_nation"].notNullTrim());            // ab_nation     : 해외근무지
                    hash.Add("ab_region", Request.Form["ab_region"].notNullTrim());            // ab_region     : 햬외근무지 상세
                    hash.Add("km_email", Request.Form["km_email"].notNullTrim());              // km_email      : 회사메일
                    hash.Add("o_phone", Request.Form["o_phone"].notNullTrim());                // o_phone       : 전화번호
                    hash.Add("m_phone", Request.Form["m_phone"].notNullTrim());                // m_phone       : 핸드폰
                    hash.Add("km_school", Request.Form["km_school"].notNullTrim());            // km_school     : 출신학교
                    hash.Add("km_hobby", Request.QueryString["km_hobby"].notNullTrim());              // km_hobby      : 취미
                    hash.Add("km_religion", Request.Form["km_religion"].notNullTrim());        // km_religion   : 종교
                    hash.Add("km_address", Request.Form["km_address"].notNullTrim());          // km_address    : 집주소
                    hash.Add("km_descript", Request.Form["km_descript"].notNullTrim());        // km_descript   : 비고
                    hash.Add("km_o_email", Request.Form["km_o_email"].notNullTrim());          // km_o_email    : 외부메일
                    hash.Add("b_mth", Request.Form["b_mth"].notNullTrim());                    // b_mth         : 생일 월
                    hash.Add("b_data", Request.Form["b_data"].notNullTrim());                  // b_data        : 생일 일
                    hash.Add("w_mth", Request.Form["w_mth"].notNullTrim());                    // w_mth         : 결혼기념일 월 
                    hash.Add("w_data", Request.Form["w_data"].notNullTrim());                  // w_data        : 결혼기념일 일
                    hash.Add("use_yn", Request.Form["use_yn"].notNullTrim());                  // use_yn        : 활동여부


                    //  Preparing: UPDATE T_KEYMAN SET KM_WORK = ? , KM_DEPT_NM = ? , KM_POSIT = ? , KM_TITLE = ? , KM_REP_WORK = ? , KM_POWER = ? , KM_FRIEND = ? , CUST_GUBUN = ? , CUST_CD = ? , DOM_AB = ? , AB_NATION = ? , AB_REGION = ? , KM_EMAIL = ? , O_PHONE = ? , M_PHONE = ? , KM_SCHOOL = ? , KM_HOBBY = ? , KM_RELIGION = ? , KM_ADDRESS = ? , KM_DESCRIPT = ? , KM_O_EMAIL = ? , B_MTH = ? , B_DATA = ? , W_MTH = ? , W_DATA = ? , USE_YN = ? , MOD_DT = getdate(), MOD_USR = ? WHERE COMPANY_CD = ? AND KM_CD = ?
                    // Parameters: KMW_600(String), 품질안전센터(String), KMPST_100(String), 과장(String), 품질(String), KMP_100(String), (String), (String), 309(String), null, KOR(String), (String), xd6862 @coreana.co.kr(String), (String), 010-9404-5833(String), (String), (String), (String), (String), (String), (String), (String), (String), (String), (String), Y(String), 16021601(String), YONWOO(String), KM14100344(String)

                    mapper = Mapper.Instance();
                    mapper.BeginTransaction();
                    mapper.Insert("keyManInsert", hash);
                    mapper.CommitTransaction();

                    result.Add("success", true);
                    var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;

                    return jsonResult;

                } catch (DataMapperException e) {
                    mapper.RollBackTransaction();
                    logger.Info(e.Message);
                    result.Add("success", false);
                    result.Add("errmsg", e.Message);
                    return Json(result, JsonRequestBehavior.AllowGet);

                }catch (Exception e){
                    if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();

                    logger.Info(e.Message);
                    result.Add("success", false);
                    result.Add("errmsg", e.Message);
                    return Json(result, JsonRequestBehavior.AllowGet);
                }

            } else {
                return new EmptyResult();
            }


        }












    }
}
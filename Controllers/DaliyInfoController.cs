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
    public class DaliyInfoController : Controller
    {

        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);


        // 유통구조별 수주진척상황 /DaliyInfo/salesDailyList
        public ActionResult salesDailyList()
        {


            Hashtable hash = new Hashtable();

            hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
            hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

            hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
            hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID

            hash["preday"] = Request["preday"].nullToStr();           // preday      : 기준일 전날  
            hash["nowyymm"] = Request["nowyymm"].nullToStr();
            hash["nextyymm"] = Request["nextyymm"].nullToStr();


            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("salesDailyList", hash);

            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

        }


        // 일일집계 : 유통구조별 /DaliyInfo/daliyDstrList
        public ActionResult daliyDstrList()
        {


            Hashtable hash = new Hashtable();

            hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
            hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

            hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
            hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID

            hash["year"] = Request["year"].nullToStr();                 // year         : 기준년도
            hash["month"] = Request["month"].nullToStr();               // month        : 기준월
            hash["day"] = Request["day"].nullToStr();                   // day          : 기준일
            hash["st_date"] = Request["st_date"].nullToStr();           // st_date      : 기준년도
            hash["ed_date"] = Request["ed_date"].nullToStr();           // ed_date      : 기준월
            hash["up_dept_cd"] = Request["up_dept_cd"].nullToStr();

            if (hash["month"].ToString() != "") hash["YYYYMM"] = hash["year"].ToString() + hash["month"].ToString();
            if (hash["st_date"].ToString() != "") hash["YYYYMM"] = hash["st_date"].ToString().Substring(0,6);


            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("daliyDstrList", hash);

            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

        }





        // 일일집계 : 파트별 /DaliyInfo/daliyDeptList
        public ActionResult daliyDeptList() {


            Hashtable hash = new Hashtable();

            hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
            hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드


            hash["year"] = Request["year"].nullToStr();                 // year         : 기준년도
            hash["month"] = Request["month"].nullToStr();               // month        : 기준월
            hash["day"] = Request["day"].nullToStr();                   // day          : 기준일
            hash["st_date"] = Request["st_date"].nullToStr();           // st_date      : 기준년도
            hash["ed_date"] = Request["ed_date"].nullToStr();           // ed_date      : 기준월
            hash["up_dept_cd"] = Request["up_dept_cd"].nullToStr();
            if (hash["month"].ToString() != "") hash["YYYYMM"] = hash["year"].ToString() + hash["month"].ToString();
            if (hash["st_date"].ToString() != "") hash["YYYYMM"] = hash["st_date"].ToString().Substring(0, 6);

            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("daliyDeptList", hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

        }




        // 일일집계 : 담당자별 /DaliyInfo/daliyUserList
        public ActionResult daliyUserList() {


            Hashtable hash = new Hashtable();

            hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
            hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

            hash["year"] = Request["year"].nullToStr();                 // year         : 기준년도
            hash["month"] = Request["month"].nullToStr();               // month        : 기준월
            hash["day"] = Request["day"].nullToStr();                   // day          : 기준일
            hash["st_date"] = Request["st_date"].nullToStr();           // st_date      : 기준년도
            hash["ed_date"] = Request["ed_date"].nullToStr();           // ed_date      : 기준월
            hash["up_dept_cd"] = Request["up_dept_cd"].nullToStr();
            if (hash["month"].ToString() != "") hash["YYYYMM"] = hash["year"].ToString() + hash["month"].ToString();
            if (hash["st_date"].ToString() != "") hash["YYYYMM"] = hash["st_date"].ToString().Substring(0, 6);

            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("daliyUserList", hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

        }


        // 월별 집계 : 유통구조별 /DaliyInfo/daliyDstrList_Year
        public ActionResult daliyDstrList_Year()
        {


            Hashtable hash = new Hashtable();

            hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
            hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

            hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
            hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID

            hash["year"] = Request["year"].nullToStr();                 // year         : 기준년도
            hash["month"] = Request["month"].nullToStr();               // month        : 기준월
            hash["day"] = Request["day"].nullToStr();                   // day          : 기준일
            hash["st_date"] = Request["st_date"].nullToStr();           // st_date      : 기준년도
            hash["ed_date"] = Request["ed_date"].nullToStr();           // ed_date      : 기준월

            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("daliyDstrList_Year", hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

        }





        //  월별 집계 : 파트별 /DaliyInfo/daliyDeptList_Year
        public ActionResult daliyDeptList_year()
        {


            Hashtable hash = new Hashtable();

            hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
            hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드


            hash["year"] = Request["year"].nullToStr();                 // year         : 기준년도
            hash["month"] = Request["month"].nullToStr();               // month        : 기준월
            hash["day"] = Request["day"].nullToStr();                   // day          : 기준일
            hash["st_date"] = Request["st_date"].nullToStr();           // st_date      : 기준년도
            hash["ed_date"] = Request["ed_date"].nullToStr();           // ed_date      : 기준월

            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("daliyDeptList_Year", hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

        }




        //  월별 집계 : 담당자별 /DaliyInfo/daliyUserList_Year
        public ActionResult daliyUserList_Year()
        {


            Hashtable hash = new Hashtable();

            hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
            hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

            hash["year"] = Request["year"].nullToStr();                 // year         : 기준년도
            hash["month"] = Request["month"].nullToStr();               // month        : 기준월
            hash["day"] = Request["day"].nullToStr();                   // day          : 기준일
            hash["st_date"] = Request["st_date"].nullToStr();           // st_date      : 기준년도
            hash["ed_date"] = Request["ed_date"].nullToStr();           // ed_date      : 기준월

            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("daliyUserList_Year", hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

        }




        //  일일실적 업데이트  :  /DaliyInfo/amountDaliyUpdate
        [HttpPost]
        public ActionResult amountDaliyUpdate() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();


                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드



                hash["yyyymmdd"] = Request["yyyymmdd"].nullToStr();           // yyyymmdd       : 업데이트할 기준일자



                mapper.BeginTransaction();

                logger.Info("일일통계 유통구조 업데이트");
                mapper.Delete("amountDstrDelete", hash);
                mapper.Insert("amountDstrUpdate", hash);

                logger.Info("일일통계 부서 업데이트");
                mapper.Delete("amountDeptDelete", hash);
                mapper.Insert("amountDeptUpdate", hash);

                logger.Info("일일통계 사용자 업데이트");
                mapper.Delete("amountUserDelete", hash);
                mapper.Insert("amountUserUpdate", hash);

                mapper.CommitTransaction();

                logger.Info("일일통계 업데이트 완료");

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
        }




    }
}
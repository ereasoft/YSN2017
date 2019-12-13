using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Exceptions;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YSN2017.ComLIB;
using YSN2017.Common;



// admin User관리
namespace YSN2017.Controllers {

    [Authorize(Roles = "User,Admin")]
    public class AdminUserController : Controller {

        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);



        // User관리 :  user 현황 리스트 /AdminUser/getUpMenuList
        public ActionResult getUpMenuList() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {
                ISqlMapper mapper = Mapper.Instance();
                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = Request["selCompany"].nullToStr();       // 회사코드 
                hash["selPart1"] = Request["selPart1"].nullToStr();        // deptGroup    : 매출조직 
                hash["selPart2"] = Request["selPart2"].nullToStr();        // deptGroup    : 매출조직 
                hash["selPart3"] = Request["selPart3"].nullToStr();        // deptGroup    : 매출조직 
                hash["searchUserNm"] = Request["searchUserNm"].nullToStr();  // searchUserNm : 담당자명
                hash["searchUseYn"] = Request["searchUseYn"].nullToStr();    // searchUseYn  : 활동여부
                hash["userCd"] = Request["userCd"].nullToStr();              // userCd       : 사용자명


                IEnumerable <Hashtable> masterList = mapper.QueryForList<Hashtable>("userList", hash);


                result.Add("LIST", masterList);

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




        // User관리 :  user 현황 상세 /AdminUser/detailLoad
        public ActionResult detailLoad() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {
                ISqlMapper mapper = Mapper.Instance();
                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["userCd"] = Request["userCd"].nullToStr();              // userCd       : 사용자코드


                IEnumerable<Hashtable> masterList = mapper.QueryForList<Hashtable>("userList", hash);


                result.Add("LIST", masterList);

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







        // User관리 :  user 등록 /AdminUser/userReg
        [HttpPost]
        public ActionResult userReg() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();

                hash["mode"] = Request["mode"].nullToStr();
                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["companyCd"] = Request["company_cd"].nullToStr();     // 회사코드

                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd    : 로그인 사용자ID
                hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr    : 로그인 사용자ID
                                                                                          
                hash["userCd"] = Request["usercd"].nullToStr();             // userCd     : 사용자코드 ( 사번 )
                hash["userNm"] = Request["userNm"].nullToStr();             // userNm     : 이름
                hash["userEngNm"] = Request["userEngNm"].nullToStr();       // userEngNm  : 영문명
                hash["deptCd"] = Request["deptCd"].nullToStr();             // deptCd     : 부서코드
                hash["userTitle"] = Request["userTitle"].nullToStr();       // userTitle  : 직위
                                                                                          
                hash["userPosit"] = Request["userPosit"].nullToStr();       // userPosit  : 직책
                hash["qPhone"] = Request["qPhone"].nullToStr();             // qPhone     : 전화번호
                hash["mPhone"] = Request["mPhone"].nullToStr();             // mPhone     : 핸드폰
                hash["email"] = Request["email"].nullToStr();               // email      : 이메일
                hash["userWork"] = Request["userWork"].nullToStr();         // userWork   : 담당엄무
                                                                                          
                hash["multiLang"] = Request["multiLang"].nullToStr();       // multiLang  : 언어
                hash["passwd"] = Request["passwd"].nullToStr();             // passwd     : 진행상태
                hash["useYn"] = Request["useYn"].nullToStr();               // useYn      : 수주예정일
                hash["regUsrCd"] = User.Identity.Name.Split('|')[0];        // regUsrCd   : 사용자ID
                hash["mgr_Yn"] = Request["mgr_Yn"].nullToStr();             // mgr_Yn     : 관리자여부
                hash["mbo_Yn"] = Request["mbo_Yn"].nullToStr();             // mbo_Yn     : 목표대상여부
                hash["sa_Yn"] = Request["sa_Yn"].nullToStr();               // sa_Yn      : 영업활동여부
                hash["dstrChn"] = Request["dstrChn"].nullToStr();           // dstrChn    : 유통채널
                hash["preUserCd"] = Request["preUserCd"].nullToStr();       // preUserCd  : 사용자 코드 ( 사번 ) ( 수정시 사용 )



              //  if (hash["preUserCd"].Equals("")) {

                    EncyptUtil enc = new EncyptUtil();
                    hash["passwd"] = enc.AESEncrypt256("0000");

             //   }

                mapper.BeginTransaction();

                if (hash["mode"].ToString().Equals("I")) {
                    mapper.Insert("userReg", hash);
                }
                else
                {
                    mapper.Update("userModify", hash);
                } 

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
        }



    }
}
using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Exceptions;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YSN2017.ComLIB;



namespace YSN2017.Controllers {

    [Authorize(Roles = "User,Admin")]
    public class AdminUserChangeController : Controller {

        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);



        // ## 담당자 변경 리스트는 아래 정보로 처리
        // 기준정보 : 샘플 변경 - 리스트 /sampleManage/sampleManageList
        // 기준정보 : 기회 변경 - 리스트 /opportunity/opportunityList
        // 기준정보 : 수주 변경 - 리스트 /salesOrder/salesOrderList




        //  기준정보 : 담당자 변경 - 정보 업데이트 /AdminUser/userChangeUpdate
        [HttpPost]
        public ActionResult userChangeUpdate() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();


                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
                hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID

                hash["oppt_cd"] = Request["oppt_cd"].nullToStr();           // oppt_cd       : 사업기회관리PK ( T_OPPORTUNITY )
                hash["oppt_status"] = Request["oppt_status"].nullToStr();   // oppt_status   : 진행상태
                hash["wso_pdate"] = Request["wso_pdate"].nullToStr();       // wso_pdate     : 수주예정일
                hash["wso_psblt"] = Request["wso_psblt"].nullToStr();       // wso_psblt     : 수주가능성
                hash["base_ym"] = Request["base_ym"].nullToStr();           // base_ym       : 기준년월

                hash["tab_num"] = Request["tab_num"].nullToStr();           // base_ym       : 기준년월
                hash["user_cd2"] = Request["user_cd2"].nullToStr();           // base_ym       : 기준년월
                string[] ids = Request["ids"].nullToStr().Split('|'); 

                hash["ids"] = ids;           // base_ym       : 기준년월

                mapper.BeginTransaction();


                mapper.Update("userChangeUpdate", hash); 

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
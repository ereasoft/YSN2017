using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Exceptions;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YSN2017.ComLIB;



// admin 코드관리
namespace YSN2017.Controllers {

    [Authorize(Roles = "User,Admin")]
    public class AdminCodeController : Controller {

        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);



        // 코드관리 : 상위코드 조회 리스트  /AdminCode/getUpCodeList
        public ActionResult getUpCodeList() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {
                ISqlMapper mapper = Mapper.Instance();
                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["searchCodeId"] = Request["searchCodeId"].nullToStr();         // searchMenuId     : 코드id
                hash["searchCodeNm"] = Request["searchCodeNm"].nullToStr();         // searchMenuNm     : 코드명
                hash["searchLevel"] = Request["searchLevel"].nullToStr();           // searchLevel      : 코드레벨
                hash["searchPreCodeId"] = Request["searchPreCodeId"].nullToStr();   // searchPreCodeId  : 이전코드id
                hash["upCodeId"] = Request["node"].nullToStr();                 // upCodeId         : 상위코드id
                hash["CodeId"] = Request["CodeId"].nullToStr();                     // CodeId           : 코드id

                if (hash["upCodeId"].ToString().Equals("ROOT") && hash["searchLevel"].ToString() != "0" && hash["searchLevel"].ToString() != "") hash["upCodeId"] = "";

                IList<Hashtable> list = mapper.QueryForList<Hashtable>("AdminupCodeList", hash);
                IList<Hashtable> fullList = mapper.QueryForList<Hashtable>("AdminupCodeList", null);
                IList<Hashtable> resultList = new List<Hashtable>();


                foreach (Hashtable parent in fullList) {
                    IList<Hashtable> childList = new List<Hashtable>();
                    foreach (Hashtable child in fullList) { 
                        child["leaf"] = (int)child["CHILD_CNT"] > 0 ? false : true;
                        child["id"] = child["CODE_ID"];
                        if (parent["CODE_ID"].Equals(child["UP_CODE_ID"])) {
                            childList.Add(child);
                        }
                    }
                    if (childList.Count() > 0) parent["children"] = childList;
                }

                foreach (Hashtable map in list) {
                    foreach (Hashtable fullMap in fullList) {
                        if (map["CODE_ID"].Equals(fullMap["CODE_ID"])) {
                            resultList.Add(fullMap);
                        }
                    }
                }


                result.Add("LIST", resultList);

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




        // 코드관리 : 하위코드 조회 리스트  /AdminCode/getDownCodeList
        public ActionResult getDownCodeList() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {
                ISqlMapper mapper = Mapper.Instance();
                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["upCodeId"] = Request["upCodeId"].nullToStr();      // upCodeId     : 상위코드id


                IList<Hashtable> list = mapper.QueryForList<Hashtable>("AdmindownCodeList", hash);

                result.Add("LIST", list);

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



        // 코드관리 : 코드 등록/수정  /AdminCode/getCodeReg
        [HttpPost]
        public ActionResult getCodeReg() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();

                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드
                hash["mode"] = Request["mode"].nullToStr();
                hash["upCodeId"] = Request["upCode"].nullToStr();
                hash["codeId"] = Request["code"].nullToStr();
                hash["codeKor"] = Request["korName"].nullToStr();
                hash["codeEng"] = Request["engName"].nullToStr();
                hash["codeChn"] = Request["chnName"].nullToStr();
                hash["codeJpn"] = Request["jpnName"].nullToStr();
                hash["codeLevel"] = Request["codeLevel"].nullToStr();
                hash["codeOrder"] = Request["codeOrder"].nullToStr();
                hash["value1"] = Request["codeValue1"].nullToStr();
                hash["value2"] = Request["codeValue2"].nullToStr();
                hash["value3"] = Request["codeValue3"].nullToStr();
                hash["value4"] = Request["codeValue4"].nullToStr();
                hash["value5"] = Request["codeValue5"].nullToStr();
                hash["codeDescript"] = Request["descript"].nullToStr();
                hash["useYn"] = Request["useYn"].nullToStr();
                hash["preCodeId"] = Request["preCode"].nullToStr();
                hash["codeNm"] = Request["korName"].nullToStr();
                Hashtable resultMap = new Hashtable(); 
                
                mapper.BeginTransaction();

       
                
                if ("".Equals(hash["preCodeId"].ToString())) {  // Insert
                    hash["regUsr"] = User.Identity.Name.Split('|')[0]; // 최초등록자 User ID
                    hash["modUsr"] = User.Identity.Name.Split('|')[0]; // 마지막수정자 User ID
                    mapper.Insert("AdmininsertCode", hash);

                } else {  // Update
                    hash["modUsr"] = User.Identity.Name.Split('|')[0]; // 마지막수정자 User ID
                    mapper.Update("AdminupdateCode", hash);

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
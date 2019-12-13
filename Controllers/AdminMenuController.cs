using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Exceptions;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YSN2017.ComLIB;



// admin 메뉴관리
namespace YSN2017.Controllers {

    [Authorize(Roles = "User,Admin")]
    public class AdminMenuController : Controller {

        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);





        // 메뉴관리 : 상위 메뉴 조회 리스트  /AdminMenu/getUpMenuList
        public ActionResult getUpMenuList() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {
                ISqlMapper mapper = Mapper.Instance();
                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["searchMenuId"] = Request["searchMenuId"].nullToStr();         // searchMenuId     : 메뉴id
                hash["searchMenuNm"] = Request["searchMenuNm"].nullToStr();         // searchMenuNm     : 메뉴명
                hash["searchLevel"] = Request["searchLevel"].nullToStr();           // searchLevel      : 메뉴레벨
                hash["searchPreMenuId"] = Request["searchPreMenuId"].nullToStr();   // searchPreMenuId  : 이전메뉴
                hash["upmenuId"] = (Request["node"].Equals("root"))? "top" : Request["node"];                     // deptId           : 조직레벨
                hash["menuId"] = Request["menuId"].nullToStr();                     // deptId           : 조직레벨

                if (hash["upmenuId"].ToString().Equals("top") && hash["searchLevel"].ToString() != "0" && hash["searchLevel"].ToString() != "") hash["upmenuId"] = "";

                IList <Hashtable> list = mapper.QueryForList<Hashtable>("upMenuList", hash);  
                IList<Hashtable> fullList = mapper.QueryForList<Hashtable>("upMenuList", null); 
                IList<Hashtable> resultList = new List<Hashtable>();


                foreach (Hashtable parent in fullList) {
                    IList<Hashtable> childList = new List<Hashtable>();
                    foreach (Hashtable child in fullList) {
                        child["leaf"] = (int)child["CHILD_CNT"] > 0 ? false : true;
                        child["id"] = child["MENU_ID"];
                        if (parent["MENU_ID"].Equals(child["UP_MENU_ID"])) {
                            childList.Add(child);
                        }
                    }
                    if (childList.Count() > 0) parent["children"] = childList;
                }

                foreach (Hashtable map in list) {
                    foreach (Hashtable fullMap in fullList) {
                        if (map["MENU_ID"].Equals(fullMap["MENU_ID"])) {
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




        // 메뉴관리 : 하위 메뉴 조회 리스트  /AdminMenu/getDownMenuList
        public ActionResult getDownMenuList() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {
                ISqlMapper mapper = Mapper.Instance();
                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["upMenuId"] = Request["upMenuId"].nullToStr();         // upMenuId     : 상위메뉴id


                IList<Hashtable> list = mapper.QueryForList<Hashtable>("downMenuList", hash);

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



        // 메뉴관리 : 메뉴 등록/수정  /AdminMenu/getMenuReg
        [HttpPost]
        public ActionResult getMenuReg() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();

                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

                String menuId = Request["menuId"].nullToStr();
                String menuNm = Request["menuNm"].nullToStr();
                String upMenuId = Request["upMenuId"].nullToStr();
                String menuLevel = Request["menuLevel"].nullToStr();
                String menuOrder = Request["menuOrder"].nullToStr();
                String menuUrl2 = Request["menuUrl2"].nullToStr(); 
                String menuDescript = Request["menuDescript"].nullToStr();
                String useYn = Request["useYn"].nullToStr(); 
                String preId = Request["preId"].nullToStr();
                String mode = Request["mode"].nullToStr();

                mapper.BeginTransaction();

                
                    Hashtable updateParam = new Hashtable();

                    updateParam["menuId"] = menuId;
                    updateParam["menuNm"] = menuNm;
                    updateParam["upMenuId"] = upMenuId;
                    updateParam["menuLevel"] = menuLevel;
                    updateParam["menuOrder"] = menuOrder;
                    updateParam["menuUrl2"] = menuUrl2;
                    updateParam["preId"] = preId;
                    updateParam["menuDescript"] = menuDescript;
                    updateParam["useYn"] = useYn; 

                    if (preId == "") {  // Insert
                        updateParam["regUsr"] = User.Identity.Name.Split('|')[0]; // 최초등록자 User ID
                        updateParam["modUsr"] = User.Identity.Name.Split('|')[0]; // 마지막수정자 User ID
                        mapper.Insert("insertMenu", updateParam);

                    } else {  // Update
                        updateParam["modUsr"] = User.Identity.Name.Split('|')[0]; // 마지막수정자 User ID
                        mapper.Update("updateMenu", updateParam);

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
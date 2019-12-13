using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Exceptions;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YSN2017.ComLIB;


// admin 
namespace YSN2017.Controllers {

    [Authorize(Roles = "User,Admin")]
    public class AdminDeptController : Controller {

        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);



        // 조직관리 : 조직정보 리스트  /AdminDept/getUpMenuList
        public ActionResult getUpMenuList() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {
                ISqlMapper mapper = Mapper.Instance();
                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["searchDeptId"] = Request["searchDeptId"].nullToStr();         // searchDeptId     : 조직코드
                hash["searchDeptNm"] = Request["searchDeptNm"].nullToStr();         // searchDeptNm     : 조직명
                hash["searchLevel"] = Request["searchLevel"].nullToStr();           // searchLevel      : 조직레벨
                hash["updeptId"] = Request["node"].nullToStr();                     // deptId           : 조직레벨
                hash["deptId"] = Request["deptId"].nullToStr();                     // deptId           : 조직레벨
                hash["preDeptId"] = Request["preDeptId"].nullToStr();               // preDeptId        : 조직레벨
                hash["searchUseYn"] = Request["searchUseYn"].nullToStr();           // searchUseYn      : 조직레벨
                hash["sadeptYn"] = Request["sadeptYn"].nullToStr();                 // searchLevel      : 조직레벨

                if (hash["searchLevel"].ToString() != "" && hash["searchLevel"].ToString() != "1" && hash["updeptId"].ToString().Equals("D_ROOT"))
                {
                    hash["updeptId"] = "";
                }


                IEnumerable <Hashtable> masterList = mapper.QueryForList<Hashtable>("deptList", hash);

                Hashtable fullParam = new Hashtable();
                fullParam["company_cd"] = User.Identity.Name.Split('|')[3];
                IEnumerable<Hashtable> fullList = mapper.QueryForList<Hashtable>("deptList", hash);


                
                foreach (Hashtable master in fullList) {
                    String masterCd = master["DEPT_CD"].ToString();
                    IList<Hashtable> masterChildList = new List<Hashtable>();

                    foreach (Hashtable child in fullList) {
                        string parentCd = child["UP_DEPT_CD"] == null ? "" : child["UP_DEPT_CD"].ToString();
                        child["leaf"] = (int)child["CHILD_CNT"] > 0 ? false : true;
                        child["id"] = child["DEPT_CD"];
                        if (masterCd.Equals(parentCd)) {
                            masterChildList.Add(child);
                        }
                    }
                    if(masterChildList.Count() > 0) master["children"] = masterChildList;
                }


                IList<Hashtable> resultList = new List<Hashtable>();

                foreach (Hashtable master in masterList) {
                    string masterCd = master["DEPT_CD"] == null ? "" : master["DEPT_CD"].ToString();
                    foreach (Hashtable full in fullList) {
                        string fullCd = full["DEPT_CD"] == null ? "" : full["DEPT_CD"].ToString();
                        if (masterCd.Equals(fullCd)) {
                            resultList.Add(full);
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






        // 조직관리 : 조직정보 등록 /AdminDept/getMenuReg
        [HttpPost]
        public ActionResult getMenuReg() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();


                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드

                String deptName = Request["deptName"].nullToStr();
                String deptId = Request["deptId"].nullToStr();
                String level = Request["level"].nullToStr();
                String engName = Request["engName"].nullToStr();
                String mgrName = Request["mgrName"].nullToStr();
                String startDate = Request["startDate"].nullToStr();
                String endDate = Request["endDate"].nullToStr();
                String sadeptYn = Request["sadeptYn"].nullToStr();
                String useYn = Request["useYn"].nullToStr();
                String upDeptCd = Request["upDeptCd"].nullToStr();
                String mgrCd = Request["mgrCd"].nullToStr();
                String preId = Request["preId"].nullToStr();
                String company_cd = Request["company_cd"].nullToStr();
                String mode = Request["mode"].nullToStr();

              
                mapper.BeginTransaction();


                if (mode.Equals("D")) { 
                        Hashtable updateParam = new Hashtable();
                        updateParam["deptCd"] = preId;
                        updateParam["companyCd"] = company_cd;
                        //deptDAO.deleteDept(updateParam);
                        mapper.Delete("deptDelete", updateParam);
                }else {   
                        Hashtable updateParam = new Hashtable(); 
                        updateParam["deptName"] = deptName;
                        updateParam["deptId"] = deptId;
                        updateParam["level"] = level;
                        updateParam["engName"] = engName;
                        updateParam["startDate"] = startDate;
                        updateParam["endDate"] = endDate;
                        updateParam["sadeptYn"] = sadeptYn;
                        updateParam["useYn"] = useYn;
                        updateParam["upDeptCd"] = upDeptCd;
                        updateParam["mgrCd"] = mgrCd;
                        updateParam["preId"] = preId;

                        updateParam["companyCd"] = company_cd;
                        updateParam["userCd"] = User.Identity.Name.Split('|')[0]; // 마지막수정자 User ID
                                                                                  //deptDAO.updateDept(updateParam);
                    if (preId == "") {
                        mapper.Insert("deptReg", updateParam);
                    }else
                    {
                        mapper.Update("deptModify", updateParam);
                    }
                      

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


        // 조직관리 : 조직정보 등록 /AdminDept/getMenuReg
        [HttpPost]
        public ActionResult getMenuReg_BAK()
        {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();


                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // 회사코드


                string param = Request["arrResult"].nullToStr();
                string deleteParam = Request["deleteArrResult"].nullToStr();
                Hashtable resultMap = new Hashtable();


                /*
                string msg = deptService.updateValidation(param, getUserInfo(request, "COMPANY_CD"));

                String locale = "KOR"; // 일단 하드코딩
                String message = "";
                Hashtable langParam = new Hashtable();

                String[] rowResult = param.Split(new[] { "\\|@\\|" }, StringSplitOptions.None);            //      \\|@\\|
                if (!"".Equals(param) && param != null) {
                    foreach (String val in rowResult) {
                        String[] colResult = val.Split(new[] { "\\|!\\|" }, StringSplitOptions.None);    //     \\|!\\|
                        String updateMode = colResult[0];
                        Hashtable updateParam = new Hashtable();

                        String deptName   = colResult[1] == null ? "" : colResult[1].ToString();
                        String deptId     = colResult[2] == null ? "" : colResult[2].ToString();
                        String level      = colResult[3] == null ? "" : colResult[3].ToString(); 
                        String engName    = colResult[4] == null ? "" : colResult[4].ToString(); 
                        String mgrName    = colResult[5] == null ? "" : colResult[5].ToString(); 
                        String startDate  = colResult[6] == null ? "" : colResult[6].ToString(); 
                        String endDate    = colResult[7] == null ? "" : colResult[7].ToString(); 
                        String sadeptYn   = colResult[8] == null ? "" : colResult[8].ToString(); 
                        String useYn      = colResult[9] == null ? "" : colResult[9].ToString();
                        String upDeptCd   = colResult[10]== null ? "" : colResult[10].ToString();
                        String mgrCd      = colResult[11]== null ? "" : colResult[11].ToString();
                        String preId      = colResult[12]== null ? "" : colResult[12].ToString();
                        String company_cd = colResult[13]== null ? "" : colResult[13].ToString();



                    }
                }


                if (!"".Equals(param) && param != null) {
                    for (int i = 0; i < rowResult.Length; i++) {
                        String val = rowResult[i];
                        String[] colResult = val.Split(new[] { "\\|!\\|" }, StringSplitOptions.None);    //  .split("\\|!\\|", 15);
                        String deptId = colResult[2] == null ? "" : colResult[2].ToString();
                        String preId = colResult[12] == null ? "" : colResult[12].ToString();
                        String updateMode = colResult[0] == null ? "" : colResult[0].ToString();
                        for (int j = i + 1; j < rowResult.Length; j++) {
                            String comVal = rowResult[j];
                            String[] colComResult = comVal.Split(new[] { "\\|!\\|" }, StringSplitOptions.None);    // .split("\\|!\\|", 15);
                            String comId = colComResult[2] == null ? "" : colComResult[2].ToString();
                            if (comId.Equals(deptId)) {
                                langParam["str"] = ""; //LanguageComponent.getInstance().getText(locale, "조직코드"));

                            }
                        }

                        Hashtable searchParam = new Hashtable();
                        searchParam["companyCd"] = hash["company_cd"];
                        if ("I".Equals(updateMode)) {
                            searchParam["deptId"] = deptId;
                        } else if ("U".Equals(updateMode)) {
                            searchParam["deptId"] = deptId;
                            searchParam["preDeptId"] = preId;
                        }

   

                    }
                }

                */


                String[] rowResult = param.Split(new[] { "\\|@\\|" }, StringSplitOptions.None);             //.split("\\|@\\|");
                String[] deleteRowResult = deleteParam.Split(new[] { "\\|@\\|" }, StringSplitOptions.None);  //.split("\\|@\\|");


                mapper.BeginTransaction();


                if (!"".Equals(deleteParam) && deleteParam != null)
                {
                    foreach (String val in deleteRowResult)
                    {
                        Hashtable updateParam = new Hashtable();
                        updateParam["deptCd"] = val;
                        updateParam["companyCd"] = hash["company_cd"];
                        //deptDAO.deleteDept(updateParam);
                        mapper.Delete("deleteDept", updateParam);
                    }
                }

                if (!"".Equals(param) && param != null)
                {
                    foreach (String val in rowResult)
                    {

                        String[] colResult = val.Split(new[] { "\\|@\\|" }, 15, StringSplitOptions.None);  //.split("\\|!\\|", 15);
                        String updateMode = colResult[0];
                        Hashtable updateParam = new Hashtable();

                        String deptName = colResult[1] == null ? "" : colResult[1].ToString();
                        String deptId = colResult[2] == null ? "" : colResult[2].ToString();
                        String level = colResult[3] == null ? "" : colResult[3].ToString();
                        String engName = colResult[4] == null ? "" : colResult[4].ToString();
                        String mgrName = colResult[5] == null ? "" : colResult[5].ToString();
                        String startDate = colResult[6] == null ? "" : colResult[6].ToString();
                        String endDate = colResult[7] == null ? "" : colResult[7].ToString();
                        String sadeptYn = colResult[8] == null ? "" : colResult[8].ToString();
                        String useYn = colResult[9] == null ? "" : colResult[9].ToString();
                        String upDeptCd = colResult[10] == null ? "" : colResult[10].ToString();
                        String mgrCd = colResult[11] == null ? "" : colResult[11].ToString();
                        String preId = colResult[12] == null ? "" : colResult[12].ToString();
                        String company_cd = colResult[13] == null ? "" : colResult[13].ToString();


                        updateParam["deptName"] = deptName;
                        updateParam["deptId"] = deptId;
                        updateParam["level"] = level;
                        updateParam["engName"] = engName;
                        updateParam["startDate"] = startDate;
                        updateParam["endDate"] = endDate;
                        updateParam["sadeptYn"] = sadeptYn;
                        updateParam["useYn"] = useYn;
                        updateParam["upDeptCd"] = upDeptCd;
                        updateParam["mgrCd"] = mgrCd;
                        updateParam["preId"] = preId;

                        updateParam["companyCd"] = company_cd;
                        updateParam["userCd"] = User.Identity.Name.Split('|')[0]; // 마지막수정자 User ID
                        //deptDAO.updateDept(updateParam);
                        mapper.Update("updateDept", updateParam);


                    }
                }




                mapper.CommitTransaction();



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



        //  조직관리 : 조직정보 삭제 /AdminDept/deptDel
        [HttpPost]
        public ActionResult deptDel() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();


                hash["language"] = User.Identity.Name.Split('|')[3];        // 기본언어
                hash["companyCd"] = User.Identity.Name.Split('|')[2];      // 회사코드


                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
                hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID


                hash["deptCd"] = Request["deptCd"].nullToStr();   // deptCd       : 조직코드
    

                // 참고:  기존서버에 삭제 기능 없음
                mapper.BeginTransaction();
                mapper.Delete("deptDelete", hash);
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





        // 조직관리 :  팝업 매니저 /AdminDept/popupMgrList
        public ActionResult popupMgrList() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {
                ISqlMapper mapper = Mapper.Instance();
                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["company_cd"] = Request["selCompany"].nullToStr();       // 회사코드 
                hash["selPart1"] = Request["selPart1"].nullToStr();        // deptGroup    : 매출조직 
                hash["selPart2"] = Request["selPart2"].nullToStr();        // deptGroup    : 매출조직 
                hash["selPart3"] = Request["selPart3"].nullToStr();        // deptGroup    : 매출조직 
                hash["searchUserNm"] = Request["searchUserNm"].nullToStr();  // searchUserNm : 담당자명

                IEnumerable<Hashtable> masterList = mapper.QueryForList<Hashtable>("popupMgrList", hash);


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


        


    }
}
using IBatisNet.DataMapper;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YSN2017.ComLIB;
using YSN2017.Models;

namespace YonWooCRM.Controllers{

    [Authorize(Roles = "User,Admin")]
    public class CodeListController : Controller{


        // 매출조직
        public ActionResult DePart3(){

           // String company_cd = col["company_cd"];
            //T_DEPARTMENT depart = new T_DEPARTMENT();

            //depart.COMPANY_CD = company_cd;

            Hashtable param = new Hashtable();
            param.Add("COMPANY_CD", User.Identity.Name.Split('|')[2]);

            IEnumerable<Hashtable> list = Mapper.Instance().QueryForList<Hashtable>("DePart3", param);
        //    int d = list.Count();
          //  IList li = new ArrayList();

        //    li.Add(list);
        //    li.Add(d);

         //   Hashtable ai = new Hashtable();

         //   ai.Add("list", list);
         //   ai.Add("count",d);

            return Json(list, JsonRequestBehavior.AllowGet);

        }



        // 매출조직 하위부서
        public ActionResult DePart4(string up_dept_cd){

            Hashtable param = new Hashtable();
            param.Add("COMPANY_CD", User.Identity.Name.Split('|')[2]);
            param.Add("UP_DEPT_CD", up_dept_cd);

            IEnumerable<Hashtable> list = Mapper.Instance().QueryForList<Hashtable>("DePart4", param);


           
            String total = "";
            for (int i=0; i< list.Count(); i++) {
                if (i != 0) { total += ",";  }
                //total += list.Select(x=>x.DEPT_CD).ElementAt(i).ToString();
                total += ((Hashtable)list.ElementAt(i))["DEPT_CD"].ToString();

            }


            Hashtable mainList = new Hashtable();
            mainList.Add("TOTAL", total);
            mainList.Add("LIST", list);

            return Json(mainList, JsonRequestBehavior.AllowGet);

        }


        // 조직 - 회사
        public ActionResult selCompany()
        {

            // String company_cd = col["company_cd"];
            //T_DEPARTMENT depart = new T_DEPARTMENT();

            //depart.COMPANY_CD = company_cd;

            Hashtable param = new Hashtable();
           // param.Add("COMPANY_CD", User.Identity.Name.Split('|')[2]);

            IEnumerable<Hashtable> list = Mapper.Instance().QueryForList<Hashtable>("selCompany", param);
            //    int d = list.Count();
            //  IList li = new ArrayList();

            //    li.Add(list);
            //    li.Add(d);

            //   Hashtable ai = new Hashtable();

            //   ai.Add("list", list);
            //   ai.Add("count",d);

            return Json(list, JsonRequestBehavior.AllowGet);

        }

        // 조직 - 부서1
        public ActionResult selPart1(string company_cd, string up_dept_cd)
        {

            Hashtable param = new Hashtable();
            param.Add("COMPANY_CD", company_cd); 

            IEnumerable<Hashtable> list = Mapper.Instance().QueryForList<Hashtable>("selPart1", param);



            String total = "";
            for (int i = 0; i < list.Count(); i++)
            {
                if (i != 0) { total += ","; }
                //total += list.Select(x=>x.DEPT_CD).ElementAt(i).ToString();
                total += ((Hashtable)list.ElementAt(i))["DEPT_CD"].ToString();

            }


            Hashtable mainList = new Hashtable();
            mainList.Add("TOTAL", total);
            mainList.Add("LIST", list);

            return Json(mainList, JsonRequestBehavior.AllowGet);

        }

        // 조직 - 부서2
        public ActionResult selPart2(string company_cd, string up_dept_cd)
        {

            Hashtable param = new Hashtable();
            param.Add("COMPANY_CD", company_cd);
            param.Add("UP_DEPT_CD", up_dept_cd);

            IEnumerable<Hashtable> list = Mapper.Instance().QueryForList<Hashtable>("selPart2", param);



            String total = "";
            for (int i = 0; i < list.Count(); i++)
            {
                if (i != 0) { total += ","; }
                //total += list.Select(x=>x.DEPT_CD).ElementAt(i).ToString();
                total += ((Hashtable)list.ElementAt(i))["DEPT_CD"].ToString();

            }


            Hashtable mainList = new Hashtable();
            mainList.Add("TOTAL", total);
            mainList.Add("LIST", list);

            return Json(mainList, JsonRequestBehavior.AllowGet);

        }

        // 조직 - 부서1
        public ActionResult selPart3(string company_cd, string up_dept_cd)
        {

            Hashtable param = new Hashtable();
            param.Add("COMPANY_CD", company_cd);
            param.Add("UP_DEPT_CD", up_dept_cd);

            IEnumerable<Hashtable> list = Mapper.Instance().QueryForList<Hashtable>("selPart3", param);



            String total = "";
            for (int i = 0; i < list.Count(); i++)
            {
                if (i != 0) { total += ","; }
                //total += list.Select(x=>x.DEPT_CD).ElementAt(i).ToString();
                total += ((Hashtable)list.ElementAt(i))["DEPT_CD"].ToString();

            }


            Hashtable mainList = new Hashtable();
            mainList.Add("TOTAL", total);
            mainList.Add("LIST", list);

            return Json(mainList, JsonRequestBehavior.AllowGet);

        }

        // 매출조직 영업담당
        public ActionResult DePartUser(string up_dept_cd, string dept_cd = "") {

            if(!String.IsNullOrEmpty(up_dept_cd) || !String.IsNullOrEmpty(dept_cd)) { 

                Hashtable param = new Hashtable();


                param.Add("company_cd", User.Identity.Name.Split('|')[2]);
                param.Add("up_dept_cd", up_dept_cd);
                param.Add("dept_cd", dept_cd);


                IEnumerable<Hashtable> list = Mapper.Instance().QueryForList<Hashtable>("DePartUser", param);

                return Json(list, JsonRequestBehavior.AllowGet);

            } else {

                return new EmptyResult();
            }

            

        }

        // 유통조직 영업담당
        public ActionResult DstrUser(string dstr_chn)
        {

            if (!String.IsNullOrEmpty(dstr_chn) || !String.IsNullOrEmpty(dstr_chn))
            {

                Hashtable param = new Hashtable(); 
                 
                param.Add("dstr_chn", dstr_chn);


                IEnumerable<Hashtable> list = Mapper.Instance().QueryForList<Hashtable>("DstrUser", param);

                return Json(list, JsonRequestBehavior.AllowGet);

            }
            else
            {

                return new EmptyResult();
            }



        }



        // 매출조직 영업담당  //사용안함
        public ActionResult DePartUser_BACKUP(string up_dept_cd , string dept_cd = "") {

            Hashtable param = new Hashtable();

            
            dept_cd =  "0,"+ dept_cd; // 배열이 1개일때 오류 방지
            String[] s_dept = dept_cd.Split(',');
            
            IList dept_list = new ArrayList();
            for (int i = 0; i < s_dept.Length; i++){
                dept_list.Add(s_dept[i]);
            }

           
            param.Add("company_cd", User.Identity.Name.Split('|')[2]);

            if (!String.IsNullOrEmpty(up_dept_cd)) { 
                param.Add("up_dept_cd", up_dept_cd);
            }   
            param.Add("dept_cd", dept_list);


            IEnumerable<Hashtable> list = Mapper.Instance().QueryForList<Hashtable>("DePartUser", param);

            return Json(list, JsonRequestBehavior.AllowGet);

        }



        // 국가정보
        public ActionResult Nation() {

            Hashtable param = new Hashtable();
            string lang = "";
            if (Request["lang"] != null)
            {
                lang = Request["lang"];
            }
            else
            {
                lang = User.Identity.Name.Split('|')[3];
            }
            param.Add("language", lang);  

            IEnumerable<Hashtable> list = Mapper.Instance().QueryForList<Hashtable>("Nation", param);

            return Json(list, JsonRequestBehavior.AllowGet);

        }


        // 국내/해외: DMOS_CD , 신용등급 : CUST_GRADE , 결재조건:TRMS_PAY , 활동여부:SA_YN
        public ActionResult TCode(string up_code_id, string value_1, string value_2, string value_3, string value_4, string value_5, string mode, string step, string lang) {
             
            if (lang == null)
            { 
                lang = User.Identity.Name.Split('|')[3];
            }
            Hashtable param = new Hashtable();
            param.Add("UP_CODE_ID", up_code_id);
            param.Add("language", lang);
            param.Add("value_1", value_1);
            param.Add("value_2", value_2);
            param.Add("value_3", value_3);
            param.Add("value_4", value_4);
            param.Add("value_5", value_5);
            param.Add("step", step);
            param.Add("mode", mode);


            IEnumerable<Hashtable> list = Mapper.Instance().QueryForList<Hashtable>("TCode", param);

            return Json(list, JsonRequestBehavior.AllowGet);

        }



        // 품목분류 /CodeList/getItemSubLevel
        public ActionResult getItemSubLevel(string item_level1, string item_level2) {

            Hashtable param = new Hashtable();
            param.Add("item_level1", item_level1);
            param.Add("item_level2", item_level2);



            IEnumerable<Hashtable> list = Mapper.Instance().QueryForList<Hashtable>("getItemSubLevel", param);

            return Json(list, JsonRequestBehavior.AllowGet);

        }



        // 품목분류 /CodeList/LangDecode
        public ActionResult LangDecode(string language, string base_item) {

            Hashtable param = new Hashtable();

            if (string.IsNullOrEmpty(language)) { 
                param["language"] = User.Identity.Name.Split('|')[3];
            }else {
                param["language"] = language;
            }

            param["base_item"] = base_item;



            IEnumerable<Hashtable> list = Mapper.Instance().QueryForList<Hashtable>("LangDecode", param);

            return Json(list, JsonRequestBehavior.AllowGet);

        }


        
    }
}

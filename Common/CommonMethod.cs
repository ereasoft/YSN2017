using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;
using System.Web.Configuration;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.Helpers;
using System.Net;
using System.Web.Security;
using System.Data;
using System.IO;
using System.Data.OleDb;

namespace YSN2017.ComLIB {
    public static class CommonMethod {




        public static String makeTwo(int num) {
            if (num < 10)
                return "0" + Convert.ToString(num);
            else
                return Convert.ToString(num);
        }

        public static String makeTwo(String num) {
            if (Convert.ToInt32(num) < 10)
                return "0" + num;
            else
                return num;
        }


        // null이 아닐경우 공백제거
        public static string notNullTrim(this string s) {
            if (s != null && !string.IsNullOrEmpty(s)){

                return s.Trim();
            } else {
                return s;
            }
        }

        public static String nullToStr(this string data) {

            if (data == null || "".Equals(((String)data).Trim()) || "null".Equals(((String)data).Trim()) || "NULL".Equals(((String)data).Trim())) {
                return "";
            }

            return ((String)data).Trim();
        }

        public static String nullToStr2(object data)
        {

            if (data == null) return "";

            return ((String)data).Trim();
        }



        public static int nullToInt(this string data) {

            if (data == null || "".Equals(((String)data).Trim()) || "null".Equals(((String)data).Trim()) || "NULL".Equals(((String)data).Trim())) {
                return 0;
            }

            return Convert.ToInt32(data);
        }


        public static DataTable ConvertCSVtoDataTable(string strFilePath) {
            DataTable dt = new DataTable();
            using (StreamReader sr = new StreamReader(strFilePath)) {
                string[] headers = sr.ReadLine().Split(',');
                foreach (string header in headers) {
                    dt.Columns.Add(header);
                }

                while (!sr.EndOfStream) {
                    string[] rows = sr.ReadLine().Split(',');
                    if (rows.Length > 1) {
                        DataRow dr = dt.NewRow();
                        for (int i = 0; i < headers.Length; i++) {
                            dr[i] = rows[i].Trim();
                        }
                        dt.Rows.Add(dr);
                    }
                }

            }


            return dt;
        }


        public static DataTable ConvertXSLXtoDataTable(string strFilePath, string connString) {
            OleDbConnection oledbConn = new OleDbConnection(connString);
            DataTable dt = new DataTable();
            try {

                oledbConn.Open();
                using (OleDbCommand cmd = new OleDbCommand("SELECT * FROM [Sheet1$]", oledbConn)) {
                    OleDbDataAdapter oleda = new OleDbDataAdapter();
                    oleda.SelectCommand = cmd;
                    DataSet ds = new DataSet();
                    oleda.Fill(ds);

                    dt = ds.Tables[0];
                }
            } catch {
            } finally {

                oledbConn.Close();
            }

            return dt;

        }




        public static void setCookie(String id, String value) {


            HttpCookie cookie = new HttpCookie(id);
            cookie.Value = value;



            //response.SetCookie(cookie);
            HttpContext.Current.Response.Cookies.Add(cookie);

        }


        public static void delCookie(String id) {
            HttpCookie cookie = new HttpCookie(id);
            cookie.Value = "";
            cookie.Expires = DateTime.Now.AddDays(-1);
            HttpContext.Current.Response.Cookies.Set(cookie);
        }



        // 쿠키 
        public static String getCookieValue(HttpRequestBase request, String id) {
            String returnValue = "";
            HttpCookieCollection cookies = request.Cookies;

            if (cookies != null) {
                for (int i = 0; i < cookies.Count; i++) {

                    if (cookies[i].Name.Equals(id)) {
                        returnValue = cookies[i].Value;
                        break;
                    }
                }
            }

            //if (id.Equals("LANG") && returnValue.Equals("")) {
            //    returnValue = "KOR";
            //}

            return returnValue;
        }




        // 글자수 조정 ... 포함
        public static string subSplit(this string s, int maxLength) {
            if (string.IsNullOrEmpty(s) || maxLength <= 0)
                return string.Empty;
            else if (s.Length > maxLength)
                return s.Substring(0, maxLength) + "...";
            else
                return s;
        }

        // 글자수 조정 ... 미포함
        public static string subSplitNoDot(this string s, int maxLength) {
            if (string.IsNullOrEmpty(s) || maxLength <= 0)
                return string.Empty;
            else if (s.Length > maxLength)
                return s.Substring(0, maxLength);
            else
                return s;
        }


        // HTML 제거
        public static string ClearHTMLTags(this string htmlString) { 
            string regEx = @"\<[^\<\>]*\>"; 
            string tagless = Regex.Replace(htmlString, regEx, string.Empty); 
            // remove rogue leftovers 
            tagless = tagless.Replace("<", string.Empty).Replace(">", string.Empty); 
            return tagless; 
        }


        // Ajax 이미지 링크
        public static IHtmlString ImageActionLink(this AjaxHelper helper, string imageUrl, string altText, string actionName, object routeValues, AjaxOptions ajaxOptions) { 
            var builder = new TagBuilder("img"); 
            builder.MergeAttribute("src", imageUrl); 
            builder.MergeAttribute("alt", altText);
            builder.MergeAttribute("style", "cursor:pointer"); 
            var link = helper.ActionLink("[replaceme]", actionName, routeValues, ajaxOptions).ToHtmlString(); 
            
            return new MvcHtmlString(link.Replace("[replaceme]", builder.ToString(TagRenderMode.SelfClosing))); 
        }


        // Ajax 이미지 링크( 컨트롤 포함 )
        public static IHtmlString ImageActionLink(this AjaxHelper helper, string imageUrl, string altText, string actionName, string controllerName, object routeValues, AjaxOptions ajaxOptions) {
            var builder = new TagBuilder("img");
            builder.MergeAttribute("src", imageUrl);
            builder.MergeAttribute("alt", altText);
            builder.MergeAttribute("style", "cursor:pointer");
            var link = helper.ActionLink("[replaceme]", actionName, controllerName, routeValues, ajaxOptions).ToHtmlString();

            return new MvcHtmlString(link.Replace("[replaceme]", builder.ToString(TagRenderMode.SelfClosing)));
        }

        //Base64 인코딩
        public static string Base64Encode(this string src) {
            byte[] arr = System.Text.Encoding.UTF8.GetBytes(src);
            return Convert.ToBase64String(arr);
        }

        //Base64 디코딩
        public static string Base64Decode(this string src) {
            byte[] arr = Convert.FromBase64String(src);
            return System.Text.Encoding.UTF8.GetString(arr);
        }


        // 이미지 경로 가져오기 
        public static string ImgViewPath(this string imgName , string pathKey) {

            return WebConfigurationManager.AppSettings[pathKey].ToString() + imgName;

        }


        // 메일 보내기
        public static void sendMail(string fromEmail, string toEmail, string mailTitle, string mailBody) {

            WebMail.SmtpServer = WebConfigurationManager.AppSettings["SMTP_IP"];
            WebMail.SmtpPort = int.Parse(WebConfigurationManager.AppSettings["SMTP_PORT"]);

            WebMail.Send(toEmail, mailTitle, mailBody, fromEmail);

        }

 

    }
}
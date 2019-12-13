using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using YSN2017.Common;

namespace YonWooCRM.Controllers
{
    public class TestController : Controller
    {
         

        // GET: Test/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Test/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Test/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Test/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Test/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Test/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Test/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }






        // GET: Test
        [Authorize(Roles = "User,Admin")]
        public ActionResult Auth()
        {
            return View("Index");
        }




        // GET: Test
        public ActionResult Index()
        {

            EncyptUtil aa = new EncyptUtil();

            String pw = "abc123";

            String aer1 = aa.AESEncrypt256(pw);


            String aer2 = aa.AESDecrypt256(aer1);

            String aer3 = aa.AESDecrypt256("/O2WkOmIdIOZSqymednM9w==");

            String aer4 = aa.AESDecrypt256("EcKAnpbO63N3JXir658UTA==");

            String aer5 = aa.AESDecrypt256("KPm0b4/ueXwteEnN+EwcVQ==");


            return View();
        }

        // GET: Test
        public ActionResult Login()
        {




            //var ident = new ClaimsIdentity(
            //  new[] { 
            //// adding following 2 claim just for supporting default antiforgery provider
            //new Claim(ClaimTypes.NameIdentifier, "aaa"),
            //new Claim("http://schemas.microsoft.com/accesscontrolservice/2010/07/claims/identityprovider", "ASP.NET Identity", "http://www.w3.org/2001/XMLSchema#string"),

            //new Claim(ClaimTypes.Name,"한글"),

            //// optionally you could add roles if any
            //new Claim(ClaimTypes.Role, "USER"),
            //new Claim(ClaimTypes.Role, "Admin"),

            //  },
            //  DefaultAuthenticationTypes.ApplicationCookie);

            //HttpContext.GetOwinContext().Authentication.SignIn(new AuthenticationProperties { IsPersistent = false }, ident);







              AuthCreate("aaa", "한글", "aaa,Admin");

            return View("Index");
        }


        public ActionResult LogOut()
        {

           // var authenticationManager =  HttpContext.GetOwinContext().Authentication;
           // authenticationManager.SignOut();

            FormsAuthentication.SignOut();

            return View("Index");
        }




        // 사용자 인증 암호화 쿠키 생성 //  아이디  / 이름
        public void AuthCreate(string user_id, string user_name, string grant)
        {

            FormsAuthentication.SetAuthCookie(user_name, false);

            var authTicket = new FormsAuthenticationTicket(
                                        1,
                                        user_id + "|" + user_name + "|" + "",
                                        DateTime.Now,
                                        DateTime.Now.AddMinutes(30),
                                        false,
                                        grant
                                        );

            string encryptedTicket = FormsAuthentication.Encrypt(authTicket);
            HttpCookie authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);

            // authCookie.HttpOnly = true;
            // authCookie.Domain = "workplus.jtbc.co.kr"; 

            HttpContext.Response.Cookies.Add(authCookie);


        }




    }
}

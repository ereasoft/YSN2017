using Excel;
using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Exceptions;
using LumenWorks.Framework.IO.Csv;
using OfficeOpenXml;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using YSN2017.ComLIB;



namespace YSN2017.Controllers{

    //[Authorize(Roles = "User,Admin")]
    public class ExcelController : Controller {

        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

























        [HttpPost]
        public ActionResult Importexcel1() {


            if (Request.Files["FileUpload1"].ContentLength > 0) {
                string extension = System.IO.Path.GetExtension(Request.Files["excelFile"].FileName).ToLower();
                string query = null;
                string connString = "";





                string[] validFileTypes = { ".xls", ".xlsx", ".csv" };

                string path1 = string.Format("{0}/{1}", Server.MapPath("~/Content/Uploads"), Request.Files["FileUpload1"].FileName);
                if (!Directory.Exists(path1)) {
                    Directory.CreateDirectory(Server.MapPath("~/Content/Uploads"));
                }
                if (validFileTypes.Contains(extension)) {
                    if (System.IO.File.Exists(path1)) { System.IO.File.Delete(path1); }
                    Request.Files["FileUpload1"].SaveAs(path1);
                    if (extension == ".csv") {
                        DataTable dt = CommonMethod.ConvertCSVtoDataTable(path1);
                        ViewBag.Data = dt;
                    }
                   //Connection String to Excel Workbook  
                   else if (extension.Trim() == ".xls") {
                        connString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + path1 + ";Extended Properties=\"Excel 8.0;HDR=Yes;IMEX=2\"";
                        DataTable dt = CommonMethod.ConvertXSLXtoDataTable(path1, connString);
                        ViewBag.Data = dt;
                    } else if (extension.Trim() == ".xlsx") {
                        connString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + path1 + ";Extended Properties=\"Excel 12.0;HDR=Yes;IMEX=2\"";
                        DataTable dt = CommonMethod.ConvertXSLXtoDataTable(path1, connString);
                        ViewBag.Data = dt;
                    }

                } else {
                    ViewBag.Error = "Please Upload Files in .xls, .xlsx or .csv format";

                }

            }

            return View();
        }






        [HttpPost]
        public ActionResult xlsxUpload(HttpPostedFileBase uploadFile) {



            HttpPostedFileBase excelFile = Request.Files["excelFile"];

            if (excelFile != null && excelFile.ContentLength > 0) {
                // ExcelDataReader works with the binary Excel file, so it needs a FileStream
                // to get started. This is how we avoid dependencies on ACE or Interop:
                Stream stream = excelFile.InputStream;

                // We return the interface, so that
                IExcelDataReader reader = null;


                if (excelFile.FileName.EndsWith(".xls")) {
                    reader = ExcelReaderFactory.CreateBinaryReader(stream);
                } else if (excelFile.FileName.EndsWith(".xlsx")) {
                    reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                } else {
                    ModelState.AddModelError("File", "This file format is not supported");
                    return View();
                }

                reader.IsFirstRowAsColumnNames = true;

                DataSet result = reader.AsDataSet();

                DataTable dt = result.Tables[0];

                XmlTextReader xmlreader = new XmlTextReader(stream);

                for (int i = 0; i < result.Tables[0].Rows.Count; i++) {

                    logger.Info(result.Tables[0].Rows[i][0].ToString() + " - " + result.Tables[0].Rows[i][1].ToString());

                }

                //    reader.Close();

                return View(result.Tables[0]);

            }
            return View();
        }




        [HttpPost]
        public ActionResult xlsUpload(HttpPostedFileBase file) {
            DataSet ds = new DataSet();
            if (Request.Files["excelFile"].ContentLength > 0) {
                string fileExtension =
                                     System.IO.Path.GetExtension(Request.Files["excelFile"].FileName);

                if (fileExtension == ".xls" || fileExtension == ".xlsx" || fileExtension == ".csv") {
                    string fileLocation = Server.MapPath("~/Content/") + Request.Files["excelFile"].FileName;
                    if (System.IO.File.Exists(fileLocation)) {

                        System.IO.File.Delete(fileLocation);
                    }
                    Request.Files["excelFile"].SaveAs(fileLocation);
                    string excelConnectionString = string.Empty;
                    excelConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" +
                    fileLocation + ";Extended Properties=\"Excel 8.0;HDR=Yes;IMEX=2\"";
                    /*
                    //connection String for xls file format.
                    if (fileExtension == ".xls" || fileExtension == ".xlsx") {
                        excelConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" +
                        fileLocation + ";Extended Properties=\"Excel 8.0;HDR=Yes;IMEX=2\"";
                    }
                    //connection String for xlsx file format.
                    else if (fileExtension == ".xlsx") {
                        excelConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" +
                        fileLocation + ";Extended Properties=\"Excel 12.0;HDR=Yes;IMEX=2\"";
                    }
                    */
                    //Create Connection to Excel work book and add oledb namespace
                    OleDbConnection excelConnection = new OleDbConnection(excelConnectionString);
                    excelConnection.Open();
                    DataTable dt = new DataTable();

                    dt = excelConnection.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                    if (dt == null) {
                        return null;
                    }

                    String[] excelSheets = new String[dt.Rows.Count];
                    int t = 0;
                    //excel data saves in temp file here.
                    foreach (DataRow row in dt.Rows) {
                        excelSheets[t] = row["TABLE_NAME"].ToString();
                        t++;
                    }
                    OleDbConnection excelConnection1 = new OleDbConnection(excelConnectionString);


                    string query = string.Format("Select * from [{0}]", excelSheets[0]);
                    using (OleDbDataAdapter dataAdapter = new OleDbDataAdapter(query, excelConnection1)) {
                        dataAdapter.Fill(ds);
                    }
                }



                for (int i = 0; i < ds.Tables[0].Rows.Count; i++) {

                    logger.Info(ds.Tables[0].Rows[i][0].ToString() + " - " + ds.Tables[0].Rows[i][1].ToString());

                }

                /*
                if (fileExtension.ToString().ToLower().Equals(".xml")) {
                    string fileLocation = Server.MapPath("~/Content/") + Request.Files["FileUpload"].FileName;
                    if (System.IO.File.Exists(fileLocation)) {
                        System.IO.File.Delete(fileLocation);
                    }

                    Request.Files["FileUpload"].SaveAs(fileLocation);
                    XmlTextReader xmlreader = new XmlTextReader(fileLocation);
                    // DataSet ds = new DataSet();
                    ds.ReadXml(xmlreader);
                    xmlreader.Close();
                }
                */
                /*
               for (int i = 0; i < ds.Tables[0].Rows.Count; i++) {
                   //string conn = ConfigurationManager.ConnectionStrings["dbconnection"].ConnectionString;
                   //SqlConnection con = new SqlConnection(conn);
                   //string query = "Insert into Person(Name,Email,Mobile) Values('" +
                   //ds.Tables[0].Rows[i][0].ToString() + "','" + ds.Tables[0].Rows[i][1].ToString() +
                   //"','" + ds.Tables[0].Rows[i][2].ToString() + "')";
                   //con.Open();
                   //SqlCommand cmd = new SqlCommand(query, con);
                   //cmd.ExecuteNonQuery();
                   //con.Close();
               }

               */
            }
            return View();
        }




        public JsonResult UploadFile() {
            if (Request.Files.Count > 0) {
                try {
                    object[,] obj = null;
                    int noOfCol = 0;
                    int noOfRow = 0;
                    HttpFileCollectionBase file = Request.Files;
                    if ((file != null) && (file.Count > 0)) {
                        //string fileName = file.FileName; 
                        //string fileContentType = file.ContentType; 
                        byte[] fileBytes = new byte[Request.ContentLength];
                        var data = Request.InputStream.Read(fileBytes, 0, Convert.ToInt32(Request.ContentLength));
                        // var usersList = new List<Users>(); 
                        //using (var package = new ExcelPackage()) 
                        using (var package = new ExcelPackage(Request.InputStream)) {
                            var currentSheet = package.Workbook.Worksheets;
                            var workSheet = currentSheet.First();
                            noOfCol = workSheet.Dimension.End.Column;
                            noOfRow = workSheet.Dimension.End.Row;
                            obj = new object[noOfRow, noOfCol];
                            obj = (object[,])workSheet.Cells.Value;
                        }
                    }
                    return Json(new { data = obj, row = noOfRow, col = noOfCol }, JsonRequestBehavior.AllowGet);
                } catch (Exception ex) {

                }

            }
            return Json("", JsonRequestBehavior.AllowGet);
        }




        [HttpPost]
        public ActionResult csvUpload(HttpPostedFileBase upload) {

            HttpPostedFileBase excelFile = Request.Files["excelFile"];
            if (excelFile != null && excelFile.ContentLength > 0) {


                ISqlMapper mapper = null;
                Hashtable result = new Hashtable();
                try {

                    if (excelFile.FileName.EndsWith(".csv")) {

                        Hashtable hash = new Hashtable();
                        mapper = Mapper.Instance();


                        Stream stream = excelFile.InputStream;
                        DataTable ds = new DataTable();
                        CsvReader csvReader = new CsvReader(new StreamReader(stream), true);
                        ds.Load(csvReader);

                        mapper.BeginTransaction();

                        for (int i = 0; i < ds.Rows.Count; i++) {

                            logger.Info(ds.Rows[i][0].ToString() + " _ " + ds.Rows[i][12].ToString());

                            hash.Add("company_cd", User.Identity.Name.Split('|')[2]);
                            hash.Add("sa_cd", Request["sa_cd"].notNullTrim());

                            mapper.Update("salesActivityDelete", hash);
                        }


                        mapper.CommitTransaction();

                        result.Add("success", true);
                        var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                        jsonResult.MaxJsonLength = int.MaxValue;

                        return jsonResult;

                    } else {
                        result.Add("success", false);
                        result.Add("errmsg", "no .csv file");
                        return Json(result, JsonRequestBehavior.AllowGet);

                    }

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


    }
}
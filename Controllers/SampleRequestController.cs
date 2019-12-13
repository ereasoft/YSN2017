using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Exceptions;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YSN2017.ComLIB;

namespace YSN2017.Controllers{

    [Authorize(Roles = "User,Admin")]
    public class SampleRequestController : Controller    {


        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);



        // 샘플 요청 : 리스트
        public ActionResult sampleRequestList() {

            if (Request.QueryString["mode"] != null && Request.QueryString["sdate"] != null && Request.QueryString["edate"] != null) {

                Hashtable hash = new Hashtable();

                hash.Add("language", User.Identity.Name.Split('|')[3]);     // 기본언어
                if(Request.QueryString["mode"].Equals("R")) hash.Add("company_cd", User.Identity.Name.Split('|')[2]); // 회사코드

                hash.Add("mode", Request.QueryString["mode"]);              // mode         : 샘플 : 요청R/접수A/검토V 구분
                hash.Add("deptGroup", Request.QueryString["deptGroup"]);    // deptGroup    : 매출조직
                hash.Add("bizGroup", Request.QueryString["bizGroup"]);      // bizGroup     : 매출조직 상위부서
                hash.Add("cust_nm", Request.QueryString["cust_nm"]);        // cust_nm      : 거래처명
                hash.Add("cust_cd", Request.QueryString["cust_cd"]);        // user_cd      : 거래처 코드 
                hash.Add("item_nm", Request.QueryString["item_nm"]);        // item_nm      : 품목명
                hash.Add("smp_status", Request.QueryString["smp_status"]);  // smp_status   : 진행상태

                hash.Add("sdate", Request.QueryString["sdate"]);            // sdate        : 샘플요청일 시작
                hash.Add("edate", Request.QueryString["edate"]);            // edate        : 샘플요청일 종료


                hash.Add("dstr_chn", Request.QueryString["dstr_chn"]);      // dstr_chn     : - 사용안함
                hash.Add("user_nm", Request.QueryString["user_nm"]);        // user_nm      : - 사용안함
                hash.Add("user_cd", Request.QueryString["user_cd"]);        // user_cd      : - 사용안함
                hash.Add("srqdate", Request.QueryString["srqdate"]);        // srqdate      : - 사용안함
                hash.Add("erqdate", Request.QueryString["erqdate"]);        // erqdate      : - 사용안함
                hash.Add("srrdate", Request.QueryString["srrdate"]);        // srrdate      : - 사용안함
                hash.Add("errdate", Request.QueryString["errdate"]);        // errdate      : - 사용안함
                hash.Add("rruser_cd", Request.QueryString["rruser_cd"]);    // rruser_cd    : - 사용안함

                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("sampleRequestList", hash);


                Hashtable jsonData = new Hashtable();
                jsonData.Add("COUNT", list.Count());
                jsonData.Add("LIST", list);


                var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }







        // 샘플 요청 : 상세
        public ActionResult sampleRequestView() {

            if (Request.QueryString["smr_cd"] != null && Request.QueryString["smr_chasu"] != null) {

                Hashtable hash = new Hashtable();

                hash.Add("language", User.Identity.Name.Split('|')[3]);     // 기본언어
                                                                           
                hash.Add("smr_cd", Request.QueryString["smr_cd"]);          // smr_cd        : 샘플요청코드 
                hash.Add("smr_chasu", Request.QueryString["smr_chasu"]);    // smr_chasu     : 차수
                hash.Add("use_yn", "Y");                                    // use_yn        : 사용유무
                


                ISqlMapper mapper = Mapper.Instance();


                // pump 보틀
                hash.Add("upCodeId", "SMR_PARTNM");  // upCodeId      : 샘플유형
                hash.Add("value_1", "PUMP");
                hash.Add("table_nm", "T_SMR_PUMP");
                IEnumerable<Hashtable> pump_part_list = mapper.QueryForList<Hashtable>("smrTypeDetailList", hash);
                hash.Add("smr_partnm", "PUMP_PKG");
                hash.Add("table_cls", "SMR_PKG");
                Hashtable pump_pkg = mapper.QueryForObject<Hashtable>("smrTypeDetailPkgRemark_cmt", hash);
                hash["smr_partnm"] = "PUMP_RMT";
                hash["table_cls"] = "REMARK_CMT";
                Hashtable pump_remark_cmt = mapper.QueryForObject<Hashtable>("smrTypeDetailPkgRemark_cmt", hash);

                

                // bottle 보틀
                hash["value_1"] = "BOTTLE";
                hash["table_nm"] = "T_SMR_BOTTLE";
                IEnumerable<Hashtable> bottle_part_list = mapper.QueryForList<Hashtable>("smrTypeDetailList", hash);
                hash["smr_partnm"] = "BOTTLE_PKG";
                hash["table_cls"] = "SMR_PKG";
                Hashtable bottle_pkg = mapper.QueryForObject<Hashtable>("smrTypeDetailPkgRemark_cmt", hash);
                hash["smr_partnm"] = "BOTTLE_RMT";
                hash["table_cls"] = "REMARK_CMT";
                Hashtable bottle_remark_cmt = mapper.QueryForObject<Hashtable>("smrTypeDetailPkgRemark_cmt", hash);



                // overcap 항목
                hash["value_1"] = "OVERCAP";
                hash["table_nm"] = "T_SMR_OVERCAP";
                IEnumerable<Hashtable> overcap_part_list = mapper.QueryForList<Hashtable>("smrTypeDetailList", hash);
                hash["smr_partnm"] = "OVERCAP_PKG";
                hash["table_cls"] = "SMR_PKG";
                Hashtable overcap_pkg = mapper.QueryForObject<Hashtable>("smrTypeDetailPkgRemark_cmt", hash);
                hash["smr_partnm"] = "OVERCAP_RMT";
                hash["table_cls"] = "REMARK_CMT";
                Hashtable overcap_remark_cmt = mapper.QueryForObject<Hashtable>("smrTypeDetailPkgRemark_cmt", hash);



                // 기본정보
                Hashtable sampleRequestDetail = mapper.QueryForObject<Hashtable>("sampleRequestDetail", hash);
                Hashtable samplePrdtInfoDetail = mapper.QueryForObject<Hashtable>("samplePrdtInfoDetail", hash);



                Hashtable jsonData = new Hashtable();

                // pump 펌프
                jsonData.Add("PUMP_PART_LIST"       , pump_part_list);
                jsonData.Add("PUMP_PKG"             , pump_pkg);
                jsonData.Add("PUMP_REMARK_CMT"      , pump_remark_cmt);

                // bottle 보틀
                jsonData.Add("BOTTLE_PART_LIST"     , bottle_part_list);
                jsonData.Add("BOTTLE_PKG"           , bottle_pkg);
                jsonData.Add("BOTTLE_REMARK_CMT"    , bottle_remark_cmt);

                // overcap 항목
                jsonData.Add("OVERCAP_PART_LIST"    , overcap_part_list);
                jsonData.Add("OVERCAP_PKG"          , overcap_pkg);
                jsonData.Add("OVERCAP_REMARK_CMT"   , overcap_remark_cmt);

                // 기본정보
                jsonData.Add("REQ_DETAIL"           , sampleRequestDetail);
                jsonData.Add("PRD_INFO"             , samplePrdtInfoDetail);

                var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            } else {
                return new EmptyResult();
            }

        }




        


        // 샘플 요청 : 등록 폼
        
        public ActionResult sampleRequestNew() {


                Hashtable hash = new Hashtable();

 
                hash.Add("use_yn", "Y");                                    // use_yn        : 사용유무
                hash.Add("language", User.Identity.Name.Split('|')[3]);     // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);   // 회사코드
                hash.Add("smr_chasu", "0");                                 // smr_chasu     : 차수

                ISqlMapper mapper = Mapper.Instance();


                // pump 보틀
                hash.Add("upCodeId", "SMR_PARTNM");  // upCodeId      : 샘플유형
                hash.Add("value_1", "PUMP");
                hash.Add("table_nm", "T_SMR_PUMP");
                IEnumerable<Hashtable> pump_part_list = mapper.QueryForList<Hashtable>("smrTypeDetailList", hash);

                // bottle 보틀
                hash["value_1"] = "BOTTLE";
                hash["table_nm"] = "T_SMR_BOTTLE";
                IEnumerable<Hashtable> bottle_part_list = mapper.QueryForList<Hashtable>("smrTypeDetailList", hash);

                // overcap 항목
                hash["value_1"] = "OVERCAP";
                hash["table_nm"] = "T_SMR_OVERCAP";
                IEnumerable<Hashtable> overcap_part_list = mapper.QueryForList<Hashtable>("smrTypeDetailList", hash);



                Hashtable jsonData = new Hashtable();
                // pump 펌프
                jsonData.Add("PUMP_PART_LIST", pump_part_list);
                // bottle 보틀
                jsonData.Add("BOTTLE_PART_LIST", bottle_part_list);
                // overcap 항목
                jsonData.Add("OVERCAP_PART_LIST", overcap_part_list);


                var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;


        }






        // 샘플 요청 : 등록
        [HttpPost]
        public ActionResult sampleRequestProc() {

            ISqlMapper mapper = null;
                      
                Hashtable result = new Hashtable();
                try {
                    Hashtable hash = new Hashtable();

                    mapper = Mapper.Instance();
                    mapper.BeginTransaction();


                    ///String company_cd = User.Identity.Name.Split('|')[2];
                    //String reg_usr = User.Identity.Name.Split('|')[0];
                    // String mod_usr = User.Identity.Name.Split('|')[0];

                    //String smr_cd = Request["smr_cd"].nullToStr();
                    //int smr_chasu = Request["smr_chasu"] == null ? 1 : int.Parse(Request["smr_chasu"]);
                    String smp_status = Request["smp_status"].nullToStr();
                    String smp_status2 = Request["smp_status2"].nullToStr();
                    String status = Request["status"].nullToStr();

                    
                    Boolean subYn = true;
                    Boolean fileYn = true;
                    //hash.Add("company_cd", company_cd);      // company_cd

                    hash["company_cd"] = User.Identity.Name.Split('|')[2];
                    hash["smr_cd"] = Request["smr_cd"].nullToStr();
                    hash["smr_chasu"] = Request["smr_chasu"].nullToStr().Equals("") ? 1 : int.Parse(Request["smr_chasu"]);

                    hash["smr_type"] = Request["smr_type"].nullToStr();
                    hash["euser_cd"] = Request["euser_cd"].nullToStr();
                    hash["euser_nm"] = Request["euser_nm"].nullToStr();
                    hash["item_cd"] = Request["item_cd"].nullToStr();
                    hash["item_nm"] = Request["item_nm"].nullToStr();
                    hash["purp_color"] = Request["purp_color"].nullToStr();
                    hash["purp_deco"] = Request["purp_deco"].nullToStr();
                    hash["purp_test"] = Request["purp_test"].nullToStr();
                    hash["artwork_no"] = Request["artwork_no"].nullToStr();
                    hash["packing_info"] = Request["packing_info"].nullToStr();
                    hash["ship_to_adrs"] = Request["ship_to_adrs"].nullToStr();
                    hash["project_poss"] = Request["project_poss"].nullToStr();
                    hash["smr_podate"] = Request["smr_podate"].nullToStr();
                    hash["smr_orderdate"] = Request["smr_orderdate"].nullToStr();
                    hash["qruser_cd"] = Request["qruser_cd"].nullToStr();
                    hash["qdept_cd"] = Request["qdept_cd"].nullToStr();
                    hash["smp_status"] = Request["smp_status"].nullToStr();
                    hash["smp_rqty"] = Request["smp_rqty"].nullToStr().Equals("") ? 1 : int.Parse(Request["smp_rqty"]);
                    hash["pur_oqty"] = Request["pur_oqty"].nullToStr().Equals("") ? 1 : int.Parse(Request["pur_oqty"]);

                    hash["change_smr_charsu"] = Request["change_smr_charsu"].nullToStr().Equals("") ? hash["smr_chasu"] : int.Parse(Request["change_smr_charsu"]);

                    hash["smr_comment"] = Request["smr_comment"].nullToStr();
                    hash["spec_yn"] = Request["spec_yn"].nullToStr();


                    hash["extr_diameter"] = Request["extr_diameter"].nullToStr();
                    hash["extr_layer"] = Request["extr_layer"].nullToStr();
                    hash["extr_length"] = Request["extr_length"].nullToStr();
                    hash["extr_color"] = Request["extr_color"].nullToStr();
                    hash["extr_mb"] = Request["extr_mb"].nullToStr();
                    hash["neck_mold"] = Request["neck_mold"].nullToStr();
                    hash["neck_orifice"] = Request["neck_orifice"].nullToStr();
                    hash["neck_color"] = Request["neck_color"].nullToStr();
                    hash["neck_mb"] = Request["neck_mb"].nullToStr();
                    hash["arls_color"] = Request["arls_color"].nullToStr();
                    hash["arls_silicon"] = Request["arls_silicon"].nullToStr();
                    hash["offset_filmno"] = Request["offset_filmno"].nullToStr();
                    hash["offset_pass"] = Request["offset_pass"].nullToStr();
                    hash["offset_coating"] = Request["offset_coating"].nullToStr();
                    hash["ss_filmno"] = Request["ss_filmno"].nullToStr();
                    hash["ss_pass"] = Request["ss_pass"].nullToStr();
                    hash["hs_filmno"] = Request["hs_filmno"].nullToStr();
                    hash["hs_pass"] = Request["hs_pass"].nullToStr();
                    hash["cap_spec"] = Request["cap_spec"].nullToStr();
                    hash["cap_orifice"] = Request["cap_orifice"].nullToStr();
                    hash["cap_outercolor"] = Request["cap_outercolor"].nullToStr();
                    hash["cap_innercolor"] = Request["cap_innercolor"].nullToStr();
                    hash["cap_deco"] = Request["cap_deco"].nullToStr();
                    hash["cap_supplier"] = Request["cap_supplier"].nullToStr();
                    hash["cap_safetyseal"] = Request["cap_safetyseal"].nullToStr();
                    hash["remark_cmt"] = Request["remark_cmt"].nullToStr();

                if (hash["smr_cd"].Equals("")) { //신규등록

                        //hash["qruser_cd"]   = Request["qruser_cd"].nullToStr();
                        //hash["qdept_cd"]    = Request["qdept_cd"].nullToStr();
                        //hash["smp_rqty"]    = Request["smp_rqty"] == null ? 1 : int.Parse(Request["smp_rqty"]);
                        //hash["pur_oqty"]    = Request["pur_oqty"] == null ? 1 : int.Parse(Request["pur_oqty"]);
                        //hash["smr_chasu"]   = 1;
                        hash["smp_status"] = "SMSTAT_010";

                        // 샘플요청 등록
                        String hash_cd = (String)mapper.Insert("sampleRequestinsert", hash);
    
                        // 샘플요청 제품정보 등록
                        mapper.Insert("samplePrdtinfoProc", hash);
                        //smr_cd = hash["smr_cd"].ToString().nullToStr();


                    } else {
                        
                    
                        if (smp_status.Equals("SMSTAT_010") || smp_status.Equals("SMSTAT_020")) { //샘플등록, 샘플요청
                           //log.debug("저장 및 샘플요청 클릭시");
                           //hash.Add("smr_cd", smr_cd);
                           //hash.Add("smr_chasu", smr_chasu);
                           // hash.Add("smp_rqty", int.Parse(Request["smp_rqty"].nullToStr().Replace(",", "")));
                           // hash.Add("pur_oqty", int.Parse(Request["pur_oqty"].nullToStr().Replace(",", "")));

                            //샘플요청 수정
                            mapper.Update("sampleRequestUpdate", hash);

                            // 샘플요청 제품정보 등록/수정
                            mapper.Insert("samplePrdtinfoProc", hash);
                            subYn = true;
                            fileYn = true;

                            if (smp_status.Equals("SMSTAT_020") && status != "modify") {          // 샘플요청
                                //hash.Add("smr_cd", smr_cd);
                                //hash.Add("smr_chasu", smr_chasu);
                                hash["smr_rquser"] = User.Identity.Name.Split('|')[0];
                                //hash["smr_chasu"] = "1";
                                // 샘플요청  진행상태 변경
                                mapper.Update("sampleRequestStateUpdate", hash);
                                                      
                            }

                        if (status.Equals("use_yn"))  //삭제
                        {
                            hash.Add("use_yn", "N");
                            //hash.Add("smr_cd", smr_cd);
                            //hash.Add("smr_chasu", smr_chasu);

                            // 샘플요청 기본정보  
                            mapper.Update("sampleRequestStateUpdate", hash);

                        }

                    } else {


                            if (status.Equals("")) {
                                if (smp_status.Equals("SMSTAT_030")) {              
                                    hash.Add("smr_bkuser", User.Identity.Name.Split('|')[0]);
                                }

                                if (smp_status.Equals("SMSTAT_050")) {          // 요청접수
                                    hash.Add("smr_rruser", User.Identity.Name.Split('|')[0]);
                                    fileYn = true;
                                }

                                
                                if(smp_status.Equals("SMSTAT_060")){
                                    hash.Add("smr_fbuser", User.Identity.Name.Split('|')[0]);
                                }
                                

                                if (smp_status.Equals("SMSTAT_070")) {          // 검토승인
                                    hash.Add("smr_rauser", User.Identity.Name.Split('|')[0]);
                                }

                                if (smp_status.Equals("SMSTAT_080")) {          // 검토반려
                                    hash.Add("smr_rfuser", User.Identity.Name.Split('|')[0]);
                                }

                                if (smp_status.Equals("SMSTAT_650")) {          // 샘플수령
                                    hash.Add("smr_pruser", User.Identity.Name.Split('|')[0]);
                                }
                            } else {
                                //smp_status = (String)(sampleRequestManagerDAO.sampleRequestDetail(paramMap)).get("SMR_STATUS");					
                                //paramMap.put("smrstatus", (String)(sampleRequestManagerDAO.sampleRequestDetail(paramMap)).get("SMR_STATUS"));

                                if (status.Equals("prdt_yn")) {
                                    hash.Add("prdt_yn", "Y");
                                    hash["smp_status"] = "SMSTAT_700";       // 제품양산
                            }


                                if (status.Equals("use_yn")) {
                                   hash.Add("use_yn", "N");
                                //hash.Add("smr_cd", smr_cd);
                                //hash.Add("smr_chasu", smr_chasu);

                                // 샘플요청 기본정보 
                                Hashtable smp_hash = mapper.QueryForObject<Hashtable>("sampleRequestDetail", hash);
                                    hash["smp_status"] = smp_hash["SMP_STATUS"].ToString();
                                    
                                }

                            }

                            // 진행상태 변경
                            mapper.Update("sampleRequestStateUpdate", hash);

                            
                        }
                    }

                    // PUMP / BOTTLE / OVERCAP  처리
                    if (subYn) {
                        String[] part_list = new String[3];
                        part_list[0] = "PUMP";
                        part_list[1] = "BOTTLE";
                        part_list[2] = "OVERCAP";

                        foreach (var part in part_list) {

                            String table_nm = "T_SMR_" + part;                   // 테이블 명

                            Hashtable deleteMap = new Hashtable();
                            deleteMap.Add("company_cd", hash["company_cd"]);
                            deleteMap.Add("smr_cd", hash["smr_cd"]);
                            deleteMap.Add("smr_chasu", hash["smr_chasu"]);
                            deleteMap.Add("table_nm", table_nm);

                            // 이전 상세품목 삭제
                            mapper.Delete("smrSubDelete", deleteMap);

                            
                            String[] part_id = Request.Form.GetValues(part.ToLower() + "_id");               // part_id			: 항목명ID ( 화면상에 세로항목 )
                            String[] part_code = Request.Form.GetValues(part.ToLower() + "_code");           // part_code		: 규격
                            String[] part_material = Request.Form.GetValues(part.ToLower() + "_material");   // part_material	: 사출재질
                            String[] part_inject = Request.Form.GetValues(part.ToLower() + "_inject");       // part_inject		: 사출색상
                            String[] part_coat = Request.Form.GetValues(part.ToLower() + "_coat");           // part_coat		: 코팅/증착사양
                            String[] part_hstmpc = Request.Form.GetValues(part.ToLower() + "_hstmpc");       // part_hstmpc		: 박인쇄
                            String[] part_ss = Request.Form.GetValues(part.ToLower() + "_ss");               // part_ss			: 실크인쇄사양
                            String[] part_moldno = Request.Form.GetValues(part.ToLower() + "_moldno");       // part_moldno		: 설비번호
                            String part_pkg = Request[part + "_pkg"].ToLower().nullToStr();                  // part_pkg		: 포장방법/체결여부
                            String part_rmt = Request[part + "_rmt"].ToLower().nullToStr();                  // part_rmt		: 특이사항
                      

                            int i = 0;
                            foreach (var id in part_id) {
                                Hashtable smrMap = new Hashtable();

                                smrMap.Add("company_cd", hash["company_cd"]);
                                smrMap.Add("smr_cd", hash["smr_cd"].ToString());
                                smrMap.Add("smr_chasu", hash["smr_chasu"].ToString());
                                smrMap.Add("reg_usr", User.Identity.Name.Split('|')[0]);
                                smrMap.Add("table_nm", table_nm);

                                smrMap.Add("smr_partnm", part_id[i]);           // part_id			: 항목명ID ( 화면상에 세로항목 )       
                                smrMap.Add("smr_code", part_code[i]);           // part_code		: 규격
                                smrMap.Add("smr_material", part_material[i]);   // part_material	: 사출재질
                                smrMap.Add("smr_inject", part_inject[i]);       // part_inject		: 사출색상
                                smrMap.Add("smr_coat", part_coat[i]);           // part_coat		: 코팅/증착사양
                                smrMap.Add("smr_hstmpc", part_hstmpc[i]);       // part_hstmpc		: 박인쇄
                                smrMap.Add("smr_ss", part_ss[i]);               // part_ss			: 실크인쇄사양
                                smrMap.Add("smr_moldno", part_moldno[i]);       // part_moldno		: 설비번호

                                // 상세품목 배열 등록
                                mapper.Insert("smrSubInsert", smrMap);
                                i++;
                            }

                            

                            Hashtable partMap = new Hashtable();
                            partMap.Add("company_cd", hash["company_cd"]);
                            partMap.Add("smr_cd", hash["smr_cd"].ToString());
                            partMap.Add("smr_chasu", hash["smr_chasu"].ToString());
                            partMap.Add("reg_usr", User.Identity.Name.Split('|')[0]);
                            partMap.Add("table_nm", table_nm);
                            partMap.Add("smr_partnm", part + "_pkg");    // part_id		: 항목명ID         => 별도 코드가 없으므로 항목명으로 등록
                            partMap.Add("smr_pkg", part_pkg);            // part_pkg	: 포장방법/체결여부 => 등록시 사용안함

                            // 상세품목중 - 포장방법/체결여부 등록
                            mapper.Insert("smrSubInsert", partMap);


                            partMap.Remove("smr_partnm");
                            partMap.Remove("smr_pkg");
                            partMap.Add("smr_partnm", part + "_rmt");   // part_id		: 항목명ID  => 별도 코드가 없으므로 항목명으로 등록
                            partMap.Add("remark_cmt", part_rmt);        // part_pkg	    : 특이사항

                            // 상세품목중 - 특이사항 등록
                            mapper.Insert("smrSubInsert", partMap);

                        }
                    }


                    // 파일등록
                    if (fileYn) {

                        Hashtable upload_data = new Hashtable();

                        upload_data["smr_cd"] = hash["smr_cd"].ToString();
                        upload_data["smr_chasu"] = hash["smr_chasu"].ToString();
                        upload_data["user_cd"] = User.Identity.Name.Split('|')[0];
                        upload_data["company_cd"] = User.Identity.Name.Split('|')[2];
                        upload_data["language"] = User.Identity.Name.Split('|')[3];
                        
                        string[] file_name = Request.Form.GetValues("file_name");
                        string[] del_file = Request.Form.GetValues("del_file");
                        string[] file_mode = Request.Form.GetValues("file_mode");
                        string[] file_code = Request.Form.GetValues("file_code");
                        string[] doc_mgt = Request.Form.GetValues("doc_mgt");

                        var fu = new FileUpload();

                        fu.UploadFileModel(upload_data, file_name, del_file, file_mode, file_code, doc_mgt);



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


        public ActionResult sampleRequestUpdate()
        {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();
                mapper = Mapper.Instance();

                hash["company_cd"] = User.Identity.Name.Split('|')[2];
                hash["smr_cd"] = Request["smr_cd"].nullToStr();
                hash["smr_chasu"] = Request["smr_chasu"].nullToStr().Equals("") ? 1 : int.Parse(Request["smr_chasu"]);
                hash["smr_type"] = Request["smr_type"].nullToStr();
                hash["euser_cd"] = Request["euser_cd"].nullToStr();
                hash["euser_nm"] = Request["euser_nm"].nullToStr();
                hash["item_cd"] = Request["item_cd"].nullToStr();
                hash["item_nm"] = Request["item_nm"].nullToStr();
                hash["purp_color"] = Request["purp_color"].nullToStr();
                hash["purp_deco"] = Request["purp_deco"].nullToStr();
                hash["purp_test"] = Request["purp_test"].nullToStr();
                hash["artwork_no"] = Request["artwork_no"].nullToStr();
                hash["packing_info"] = Request["packing_info"].nullToStr();
                hash["ship_to_adrs"] = Request["ship_to_adrs"].nullToStr();
                hash["project_poss"] = Request["project_poss"].nullToStr();
                hash["smr_podate"] = Request["smr_podate"].nullToStr();
                hash["smr_orderdate"] = Request["smr_orderdate"].nullToStr();
                hash["pur_oqty"] = Request["pur_oqty"].nullToStr().Equals("") ? 1 : int.Parse(Request["pur_oqty"]);
                hash["smr_comment"] = Request["smr_comment"].nullToStr();
                hash["smp_status"] = Request["smp_status"].nullToStr();
                hash["smp_rqty"] = Request["smp_rqty"].nullToStr().Equals("") ? 1 : int.Parse(Request["smp_rqty"]);
                hash["remark_cmt"] = Request["remark_cmt"].nullToStr();
                hash["smr_crdate"] = Request["smr_crdate"].nullToStr();

                mapper.BeginTransaction();
                mapper.Update("sampleRequestUpdate", hash);
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


        // Sample 제작관리 :  샘플 의뢰반려 등록  /SampleRequest/sampleReturn
        [HttpPost]
        public ActionResult sampleReturn() {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();
                mapper = Mapper.Instance();

                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // company_cd
                hash["language"] = User.Identity.Name.Split('|')[3];        // language

                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
                hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID
                hash["user_cd"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID 
                hash["smr_fbuser"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID  
                hash["smp_status"] = "SMSTAT_060";                          // smp_status    : 진행상태 

                hash["smr_cd"] = Request["smr_cd"].nullToStr();             // smp_cd        : 샘플PK
                hash["smr_chasu"] = Request["smr_chasu"].nullToStr();       // smp_chasu     : 샘플차수
                hash["smr_rttype"] = Request["smr_rttype"].nullToStr();     // smp_qrtype    : 의뢰반려 타입
                hash["smr_rtdescript"] = Request["smr_rtdescript"].nullToStr();    // smp_qrdescript    : 의뢰반려 내용



                mapper.BeginTransaction();


                mapper.Update("sampleRequestStateUpdate", hash);
                mapper.Insert("insertSmrReturn", hash);


                mapper.CommitTransaction();

                result.Add("success", true);
                result.Add("smr_cd", hash["smr_cd"]);
                result.Add("smr_chasu", hash["smr_chasu"]);
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





        // 샘플 요청 : 샘플 재작업 실행
        [HttpPost]
        public ActionResult sampleRequestRepairProc() {

            ISqlMapper mapper = null;

            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();
                mapper.BeginTransaction();

                hash["company_cd"] = User.Identity.Name.Split('|')[2];
                hash["user_cd"] = User.Identity.Name.Split('|')[0];                 // user_cd       : 로그인 사용자ID
                hash["reg_usr"] = User.Identity.Name.Split('|')[0];                 // user_cd       : 로그인 사용자ID
                hash["smr_rfuser"] = User.Identity.Name.Split('|')[0];              // user_cd       : 로그인 사용자ID
                hash["smr_chasu"] = Request["smr_chasu"].nullToStr().Equals("") ? 0 : int.Parse(Request["smr_chasu"]);         // smr_chasu       : 차수
                hash["smr_cd"] = Request["smr_cd"].nullToStr();                         // smr_cd       : 샘플요청PK
                hash["smr_crtype"] = Request["smr_crtype"].nullToStr();                 // smr_crtype       : 재작업 유형
                hash["smr_crdescript"] = Request["smr_crdescript"].nullToStr();         // smr_crdescript       : 재작업 사유
                 

                int add_smr_chasu = (int)mapper.Insert("sampleRequestRepairInsert", hash);
                hash["add_smr_chasu"] = add_smr_chasu;

                hash["table_nm"] = "T_SMR_PUMP";
                mapper.Insert("insertPumpBottleOverCapRepair", hash);

                hash["table_nm"] = "T_SMR_BOTTLE";
                mapper.Insert("insertPumpBottleOverCapRepair", hash);

                hash["table_nm"] = "T_SMR_OVERCAP";
                mapper.Insert("insertPumpBottleOverCapRepair", hash);


                mapper.Insert("insertRequestPrdtinfoRepair", hash);

                hash["smr_chasu"] = add_smr_chasu;
                mapper.Insert("smrRepairInsert", hash);



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





        // 샘플 요청 : 샘플 드롭 실행
        [HttpPost]
        public ActionResult sampleRequestDropPopProc() {

            ISqlMapper mapper = null;

            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();
                mapper.BeginTransaction();

                hash["company_cd"] = User.Identity.Name.Split('|')[2];
                hash["user_cd"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
                hash["drop_yn"] = "Y";                                      // drop_yn       : 드롭여부
                hash["smp_status"] = "SMSTAT_900";                          // smp_status       : 진행상태
                hash["smr_chasu"] = Request["smr_chasu"].nullToStr().Equals("") ? 0 : int.Parse(Request["smr_chasu"]);         // smr_chasu       : 차수
                hash["smr_cd"] = Request["smr_cd"].nullToStr();                         // smr_cd               : 샘플요청PK
                hash["smr_drtype"] = Request["smr_drtype"].nullToStr();                 // smr_drtype           : 드롭 유형
                hash["smr_drdescript"] = Request["smr_drdescript"].nullToStr();         // smr_drdescript       : 드롭 사유


                mapper.Update("sampleRequestStateUpdate", hash);   // 진행상태 변경
                mapper.Insert("insertSmrDrop", hash);




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






        // 샘플 요청 : 검토반려 실행
        [HttpPost]
        public ActionResult sampleRequestCheckReturnPopProc() {

            ISqlMapper mapper = null;

            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();
                mapper.BeginTransaction();


                hash["company_cd"] = User.Identity.Name.Split('|')[2];
                hash["user_cd"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
                hash["smr_rfuser"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
                hash["smr_cd"] = Request["smr_cd"].nullToStr();
                hash["smr_chasu"] = Request["smr_chasu"].nullToStr().Equals("") ? 0 : int.Parse(Request["smr_chasu"]);         // smr_chasu       : 차수
                hash["smp_status"] = "SMSTAT_080";                          // smp_status       : 진행상태

                hash["smr_seq"] = Request["smr_seq"].nullToStr();                       // smr_seq              : 값 없음
                hash["smr_rvtype"] = Request["smr_rvtype"].nullToStr();                 // smr_rvtype           : 검토반려 유형
                hash["smr_rvdescript"] = Request["smr_rvdescript"].nullToStr();         // smr_rvdescript       : 검토반려 사유





                mapper.Update("sampleRequestStateUpdate", hash);   // 진행상태 변경
                mapper.Insert("insertSmrCheckReturn", hash);



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




        // 무견본 샘플 의뢰내용 메일 보내기  /SampleRequest/SampleSendMail
        [HttpPost, ValidateInput(false)]
        public ActionResult SampleSendMail() {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try {
                ISqlMapper mapper = Mapper.Instance();
                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드



               // IEnumerable<Hashtable> masterList = mapper.QueryForList<Hashtable>("deptList", hash);


                string fromEmail = Request["fromEmail"].nullToStr();

                string mailTitle = Request["mailTitle"].nullToStr();
                string mailBody = Request["mailBody"].nullToStr();
              //  string mailBody  = Request["mailBody"].nullToStr().Replace("^!","<").Replace("!^",">");

                string toEmail = Request.Form["toEmail"].nullToStr();
                if (!toEmail.Equals("")) {
                    
                    if (toEmail.IndexOf(",") == -1) {
                        string to_mail = toEmail;
                        CommonMethod.sendMail(fromEmail, to_mail, mailTitle, mailBody);
                        logger.Info("sendmail : " + to_mail);

                    } else {
                        string[] to_mails = toEmail.Split(',');
                        for (int i = 0; i < to_mails.Length; i++) {
                            string to_mail = to_mails[i];
                            CommonMethod.sendMail(fromEmail, to_mail, mailTitle, mailBody);
                            logger.Info("sendmail : "+ to_mail);
                        }
                    }
                }



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
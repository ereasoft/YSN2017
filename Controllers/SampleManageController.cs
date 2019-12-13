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
    public class SampleManageController : Controller
    {

        readonly log4net.ILog logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);



        // Sample 제작관리 :  의뢰/배송|승인|완료 - 리스트 /SampleManage/sampleManageList
        public ActionResult sampleManageList()
        {

            //  if ( Request["sdate"] != null && Request["edate"] != null) {

            Hashtable hash = new Hashtable();

            hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
            hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드

            hash.Add("smp_cd", Request["smp_cd"]);              // smp_cd    : smp_cd

            hash.Add("deptGroup", Request["deptGroup"]);        // deptGroup    : 매출조직
            hash.Add("bizGroup", Request["bizGroup"]);          // bizGroup     : 매출조직 상위부서
            hash.Add("dstr_type", Request["dstr_type"]);        // dstr_type    : 유통구조
            hash.Add("user_nm", Request["user_nm"]);            // user_nm      : 영업담당
            hash.Add("user_cd", Request["user_cd"]);            // user_cd      : 영업담당ID
            hash.Add("sdate", Request["sdate"]);                // sdate        : 접수일 시작
            hash.Add("edate", Request["edate"]);                // edate        : 접수일 종료
            hash.Add("s_prdt_rdate", Request["s_prdt_rdate"]);  // s_prdt_rdate : 제작의뢰일
            hash.Add("e_prdt_rdate", Request["e_prdt_rdate"]);  // e_prdt_rdate : 제작의뢰일 
            hash.Add("s_prdt_adate", Request["s_prdt_adate"]);  // s_prdt_adate : 의뢰승인일
            hash.Add("e_prdt_adate", Request["e_prdt_adate"]);  // e_prdt_adate : 의뢰승인일
            hash.Add("cust_nm", Request["cust_nm"]);            // cust_nm      : 거래처명
            hash.Add("cust_cd", Request["cust_cd"]);            // user_cd      : 거래처 코드 
            hash.Add("biz_type", Request["biz_type"]);          // biz_type     : 사업유형
            hash.Add("muser_nm", Request["muser_nm"]);          // muser_nm     : 제작담당명
            hash.Add("muser_cd", Request["muser_cd"]);          // muser_cd     : 제작담당
            hash.Add("smp_status", Request["smp_status"]);      // smp_status   : 진행상태
            hash.Add("nonfree_yn", Request["nonfree_yn"]);
            hash.Add("prdt_psblt", Request["prdt_psblt"]);      // prdt_psblt   : 양산가능성
            hash.Add("end_user_nm", Request["end_user_nm"]);    // end_user_nm  : 마지막사용자
            hash.Add("end_user_cd", Request["end_user_cd"]);    // end_user_cd  : 마지막사용자id
            hash.Add("pjt_nm", Request["pjt_nm"]);              // pjt_nm       : 프로젝트명
            hash.Add("pjt_cd", Request["pjt_cd"]);              // pjt_cd       : 프로젝트
            hash.Add("item_type", Request["item_type"]);        // item_type    : 품목유형
            hash.Add("prdt_auser", Request["prdt_auser"]);      // prdt_auser   : --알수없음
            hash.Add("smp_state", Request["smp_state"]);        // smp_state    : --알수없음
            hash["smp_type"] = Request["smp_type"].nullToStr(); //  smp_type    : 샘플유형
            hash["process"] = Request["process"].nullToStr();
            hash["mode"] = Request["mode"].nullToStr();
            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("sampleManageList", hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;

            //     } else {
            //       return new EmptyResult();
            //    }

        }






        // Sample 제작관리 :  의뢰/배송|승인|완료 - 상세  /SampleManage/selectSampleDetail
        public ActionResult selectSampleDetail()
        {

            if (Request["smp_cd"] != null && Request["smp_chasu"] != null)
            {

                Hashtable hash = new Hashtable();

                hash.Add("language", User.Identity.Name.Split('|')[3]);     // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);   // 회사코드

                hash.Add("smp_cd", Request["smp_cd"]);          // smp_cd      샘플PK ( T_SAMPLE )
                hash.Add("smp_chasu", Request["smp_chasu"]);    // smp_chasu   샘플차수


                ISqlMapper mapper = Mapper.Instance();
                IEnumerable list = mapper.QueryForObject<IEnumerable>("selectSampleDetail", hash);


                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }
            else
            {
                return new EmptyResult();
            }

        }









        // Sample 제작관리 :  신규 접수등록 /SampleManage/newSmpinsert
        [HttpPost]
        public ActionResult newSmpinsert()
        {

            ISqlMapper mapper = null;
            String return_status = "";
            String return_status_name = "";

            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();

                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);      // company_cd
                hash.Add("reg_usr", User.Identity.Name.Split('|')[0]);         // user_cd       : 로그인 사용자ID
                hash["mod_usr"] = User.Identity.Name.Split('|')[0];
                hash["nonfree_yn"] = Request["nonfree_yn"].nullToStr();
                hash["smp_cd"] = Request["smp_cd"].nullToStr();              //  smp_chasu   : 샘플차수
                hash["smp_chasu"] = Request["smp_chasu"].nullToStr();        //  smp_chasu   : 샘플차수
                hash["item_cd"] = Request["item_cd"].nullToStr();            //  item_cd     : 샘플품목
                hash["pjt_cd"] = Request["pjt_cd"].nullToStr();              //  pjt_cd      : 프로젝트
                hash["cust_cd"] = Request["cust_cd"].nullToStr();            //  cust_cd     : 거래처
                hash["euser_cd"] = Request["euser_cd"].nullToStr();          //  euser_cd    : end_user id
                hash["euser_nm"] = Request["euser_nm"].nullToStr();
                hash["biz_type"] = Request["biz_type"].nullToStr();          //  biz_type    : 사업유형
                hash["dstr_type"] = Request["dstr_type"].nullToStr();        //  dstr_type   : 유통구조
                hash["user_cd"] = Request["user_cd"].nullToStr();            //  user_cd     : 영업담당
                hash["dept_cd"] = Request["dept_cd"].nullToStr();            //  dept_cd     : 매출조직
                hash["cust_smp_cd"] = Request["cust_smp_cd"].nullToStr();    //  cust_smp_cd : 
                hash["mold_no"] = Request["mold_no"].nullToStr();            //  mold_no     :
                hash["smp_rqty"] = Request["smp_rqty"].nullToInt();          //  smp_rqty    : 제작의뢰 수량
                hash["smp_rqty2"] = Request["smp_rqty2"].nullToInt();          //  smp_rqty    : 제작의뢰 여유분 수량
                hash["pur_oqty"] = Request["pur_oqty"].nullToInt();          //  pur_oqty    : 예상발주수량
                hash["smp_type"] = Request["smp_type"].nullToStr();          //  smp_type    : 샘플유형
                hash["smp_status"] = Request["smp_status"].nullToStr();      //  smp_status  : 진행상태
                hash["prdt_psblt"] = Request["prdt_psblt"].nullToStr();      //  prdt_psblt  : 양산가능성
                hash["smp_rdate"] = Request["smp_rdate"].nullToStr().Replace("-", "");        //  smp_rdate   : 접수일
                hash["prdt_rcdate"] = Request["prdt_rcdate"].nullToStr().Replace("-", "");    //  prdt_rcdate : 제품런칭일
                hash["cmpt_rdate"] = Request["cmpt_rdate"].nullToStr().Replace("-", "");     //  cmpt_rdate  : 제작의뢰일
                hash["smp_sumry"] = Request["smp_sumry"].nullToStr();        //  smp_sumry   : 특이사항
                hash["base_crny"] = Request["base_crny"] == null ? "KRW" : Request["base_crny"];       //  base_crny   : 기준통화
                hash["exch_rate"] = Request["exch_rate"] == null ? 1 : double.Parse(Request["exch_rate"]);        //  exch_rate   : 기준통화 단위
                hash["base_yr"] = Request["base_yr"].nullToStr();            //  base_yr     : 기준통화 기준연도
                hash["film_fdate"] = Request["film_fdate"].nullToStr().Replace("-", "");      //  film_fdate  : 필름전달예정일

                hash["film_cdate"] = Request["film_cdate"].nullToStr().Replace("-", "");   //필름전달일
                hash["target_fdate"] = Request["target_fdate"].nullToStr().Replace("-", "");   //x타겟전달일

                hash["prdt_pdate2"] = Request["prdt_pdate2"].nullToStr().Replace("-", "");          //  prdt_pdate2     : 완료예정일2
                hash["delay_comment"] = Request["delay_comment_cd"].nullToStr();                       //  delay_comment   : 지연사유
                hash["process"] = Request["process_cd"].nullToStr();                                   //  process   : 공정

                hash["detail_comment"] = Request["detail_comment"].nullToStr();  //  detail_comment  : 상세 코멘트 
                hash["muser_cd"] = Request["muser_cd"].nullToStr();
                hash["spec_yn"] = Request["spec_yn"].nullToStr();
                // int smp_rqty = Convert.ToInt32(Request["smp_rqty"].nullToStr());


                //    hash["smp_rqty"] = int.Parse(smp_rqty.Substring(0, smp_rqty.IndexOf('.')));



                String smp_cd = Request["smp_cd"].nullToStr();
                String smp_chasu = Request["smp_chasu"].nullToStr();
                String state = Request["state"].nullToStr();
                String state2 = state;


                mapper.BeginTransaction();

                if (state.Equals("NEW") || state.Equals("COMMITION"))
                {   //  신규등록 | 제작의뢰


                    hash["smp_status"] = "SMSTAT_100"; //  진행상태  

                    String smr_cd = Request["smr_cd"].nullToStr();
                    String smr_chasu = Request["smr_chasu"].nullToStr();

                    if (smr_cd.Equals("") || smr_chasu.Equals(""))
                    {
                        hash.Remove("smr_cd");
                        hash.Remove("smr_chasu");
                    }
                    else
                    {
                        hash["smr_cd"] = smr_cd;
                        hash["smr_chasu"] = 1;
                    }

                    if (smp_cd.Equals("") && state.Equals("NEW"))
                    {       //  신규등록   
                        //log.debug("new - new");
                        if (hash["smp_type"].ToString().Equals("SMPTP_400"))
                        {  // 무견본 샘플일경우  차수를 0으로..  제작완료단계로
                            hash["smp_chasu"] = 0;
                            hash["smp_status"] = "SMSTAT_500";
                            hash["prdt_rdate"] = DateTime.Now.ToString("yyyyMMdd");
                            hash["prdt_ruser"] = User.Identity.Name.Split('|')[0]; 
                            hash["prdt_cdate"] = DateTime.Now.ToString("yyyyMMdd");
                            hash["prdt_cuser"] = User.Identity.Name.Split('|')[0];
                            hash["smp_qty"] =  0;
                            state2 = "COMPLETE";
                            hash["state"] = state2; 
                        }
                        else
                        {
                            hash["smp_chasu"] = 1;
                        }
                        smp_cd = (String)mapper.Insert("newSmpinsert", hash);
                        smp_chasu = hash["smp_chasu"].ToString();

                        hash["smp_cd"] = smp_cd;
                        mapper.Insert("insertSmpRuser", hash);


                        hash["pjt_nm"] = Request["item_nm"].nullToStr();
                        hash["eusr_cd"] = hash["euser_cd"];
                        hash["pjt_sdate"] = hash["smp_rdate"];
                        hash["pjt_edate"] = hash["prdt_rcdate"];
                        hash["end_yn"] = "Y";
                        hash["use_yn"] = "Y";
                        //프로젝트 등록
                        //mapper.Insert("insertProject", hash);


                    }
                    else
                    {
                        //log.debug("new - update");
                        hash["state"] = "SMSTAT_100";

                        if (!smr_cd.Equals("") && !smr_chasu.Equals(""))
                        {
                            // T_SAMPLE_REQUEST 업데이트
                            mapper.Update("uptSampleRequestSmpInit", hash);

                        }
                        // T_SAMPLE 업데이트
                        mapper.Update("updateSmpDetail", hash);
                    }

                    //  T_SAMPLE_REQUEST  샘플 요청쪽 smr_cd,smr_chasu 업데이트 
                    mapper.Update("uptSampleRequestSmpInfo", hash);

                    if (state.Equals("COMMITION"))
                    {     //  제작의뢰
                        //제작의뢰시 접수등록처럼 업데이트
                        //paramMap.put("state", "SMSTAT_100");
                        //sampleManageDAO.updateSmpDetail(paramMap);				

                        hash["state"] = "SMSTAT_200";
                        hash["smp_status"] = "SMSTAT_200";



                        hash["prdt_rdate"] = DateTime.Now.ToString("yyyyMMdd");
                        hash["prdt_ruser"] = User.Identity.Name.Split('|')[0];
                        hash["smp_chasu"] = int.Parse(smp_chasu);
                        // T_SAMPLE 업데이트
                        mapper.Update("updateSmpDetail", hash);


                    }

                }
                else
                {

                    if (state.Equals("SAMPLE_REWORK"))
                    {    // 샘플재작업
                        hash["state"] = "chasu";
                        smp_chasu = (int.Parse(smp_chasu) + 1).ToString();
                    }

                    if (state.Equals("COMMITION_CANCEL"))
                    {     // 제작의뢰취소
                        hash["state"] = "commition_cancel";
                        hash["smp_status"] = "SMSTAT_100";
                    }

                    /*                   
                   if(state.Equals("COMMITION_REJECTED")){      // 의뢰반려
                       hash["state"] = "commition_rejected";
                       hash["smp_status"] = "SMSTAT_300";
                       hash["prdt_rjdate"] = DateTime.Now.ToString("yyyyMMdd");
                       hash["prdt_rjuser"] = User.Identity.Name.Split('|')[0];
                   }
                   */



                    if (state.Equals("COMMITION_SUCCESS"))
                    {    // 제작승인 SMSTAT_400
                        hash["state"] = "commition_success";
                        hash["smp_status"] = "SMSTAT_400";
                        hash["prdt_adate"] = DateTime.Now.ToString("yyyyMMdd");
                        hash["prdt_auser"] = User.Identity.Name.Split('|')[0];
                        hash["prdt_pdate"] = Request["prdt_pdate"].nullToStr().Replace("-", "");

                        // T_SAMPLE_REQUEST 업데이트
                        mapper.Update("uptSampleRequestCS", hash);
                        if (hash["smp_type"].ToString() == "SMPTP_100" || hash["smp_type"].ToString() == "SMPTP_300" || hash["smp_type"].ToString() == "SMPTP_500" || hash["smp_type"].ToString() == "SMPTP_600")
                        {
                            Hashtable hsCd = mapper.QueryForObject<Hashtable>("getOpptCd", hash);
                            hash["oppt_cd"] = hsCd["OPPT_CD"];
                            opportunitySave(hash,0);
                            ///// 제작의뢰시 사업기회관리로 등록 /////
                        }
                    }

                    if (state.Equals("COMMITION_SUCCESS_CANCEL"))
                    { // 제작승인취소 SMSTAT_200
                        hash["state"] = "commition_success_cancel";
                        hash["smp_status"] = "SMSTAT_200";
                        Hashtable hsCd = mapper.QueryForObject<Hashtable>("getOpptCdbySmpCd", hash);
                        hash["oppt_cd"] = hsCd["OPPT_CD"].ToString();
                        hash["oppt_drdate"] = DateTime.Now.ToString("yyyyMMdd");
                        hash["oppt_drtype"] = "OPDRT_900";
                        hash["oppt_drdescript"] = "제작승인취소";
                        mapper.Insert("opportunityDropSave", hash);
                        mapper.Update("opportunityDrop", hash);


                    }

                    if (state.Equals("COMPLETE"))
                    {         // 제작완료 SMSTAT_500
                        hash["state"] = "complete";
                        hash["smp_status"] = "SMSTAT_500";
                        hash["prdt_cdate"] = DateTime.Now.ToString("yyyyMMdd");
                        hash["prdt_cuser"] = User.Identity.Name.Split('|')[0];
                        hash["smp_qty"] = Request["smp_qty"].nullToStr() != "" ? int.Parse(Request["smp_qty"].Replace(",", "")) : 0;

                    }

                    if (state.Equals("COMPLETE_CANCEL"))
                    {  // 제작완료취소 SMSTAT_400
                        hash["state"] = "complete_cancel";
                        hash["smp_status"] = "SMSTAT_400";
                    }

                    if (state.Equals("SHIPPING"))
                    {         // 배송[선적]  SMSTAT_600
                        hash["state"] = "shipping";
                        hash["smp_status"] = "SMSTAT_600";
                        hash["ship_pdate"] = DateTime.Now.ToString("yyyyMMdd");
                        hash["ship_puser"] = User.Identity.Name.Split('|')[0];
                        hash["tracking_num"] = Request["tracking_num"].nullToStr();

                        // T_SAMPLE_REQUEST 업데이트
                        mapper.Update("uptSampleRequestCS", hash);

                    }

                    if (state.Equals("PRODUCTION"))
                    {       // 양산 SMSTAT_700
                        hash["state"] = "production";
                        hash["smp_status"] = "SMSTAT_700";
                        hash["prdt_date"] = DateTime.Now.ToString("yyyyMMdd");
                        hash["prdt_user"] = User.Identity.Name.Split('|')[0];
                    }

                    if (state.Equals("DELETE"))
                    {           // 삭제
                        hash["state"] = "delete";


                    }

                    if (state.Equals("FILM_RECEIPT"))
                    {     // 사양 확정 -비필수 단계 ( 제작승인 ~ 제작완료 사이의 단계 )
                        hash["state"] = "film_receipt";
                        hash["film_rdate"] = DateTime.Now.ToString("yyyyMMdd");
                        hash["film_ruser"] = User.Identity.Name.Split('|')[0];
                    }

                    if (state.Equals("DELAY"))
                    {     // 사양 확정 -비필수 단계 ( 제작승인 ~ 제작완료 사이의 단계 )
                        hash["state"] = "delay";
                    }

                    if (state.Equals("CHANGE_STEP"))
                    {     // 사양 확정 -비필수 단계 ( 제작승인 ~ 제작완료 사이의 단계 )
                        hash["state"] = "change_step";
                    }

                    hash["smp_chasu"] = int.Parse(smp_chasu);

                    // T_SAMPLE 업데이트
                    mapper.Update("updateSmpDetail", hash);
                }


                // 파일등록
                if (state.Equals("NEW") || state.Equals("COMMITION") || state.Equals("COMPLETE"))
                {

                    Hashtable upload_data = new Hashtable();

                    upload_data["smr_cd"] = smp_cd;
                    upload_data["smr_chasu"] = smp_chasu;
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

                if (state2.Equals("COMPLETE")) state = state2;

                mapper.CommitTransaction();

                result.Add("success", true);
                result.Add("smp_status", state);
                result.Add("smp_cd", smp_cd);
                result.Add("smp_chasu", smp_chasu);
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






        // Sample 제작관리 :  일괄 제작완료/제작승인 /SampleManage/smpAllCommit
        [HttpPost]
        public ActionResult smpAllCommit()
        {

            ISqlMapper mapper = null;

            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();

                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);      // company_cd
                hash.Add("language", User.Identity.Name.Split('|')[3]);     // 기본언어
                hash.Add("reg_usr", User.Identity.Name.Split('|')[0]);         // user_cd       : 로그인 사용자ID
                hash.Add("mod_usr", User.Identity.Name.Split('|')[0]);         // user_cd       : 로그인 사용자ID

                hash["prdt_adate"] = DateTime.Now.ToString("yyyyMMdd");        //  prdt_adate   : 제작승인일
                hash["prdt_auser"] = User.Identity.Name.Split('|')[0];         //  prdt_auser   : 
                hash["prdt_cmt"] = Request["prdt_cmt"].nullToStr();            //  prdt_cmt     :  내용 코멘트

                String state = Request["state"].nullToStr();

                // 아래 5개 파라미터 , 구분 배열
                String smp_cd = Request["smp_cd"].nullToStr();                  //  smp_cd       : 샘플PK
                String smp_chasu = Request["smp_chasu"].nullToStr();            //  smp_chasu    : 샘플차수
                String muser_cd = Request["muser_cd"].nullToStr();              //  muser_cd     : 제작 담당자
                String prdt_pdate = Request["prdt_pdate"].nullToStr();          //  prdt_pdate   : 완료예정일
                String smp_qty = Request["smp_qty"].nullToStr();                //  smp_qty      : 제작수량
                String smp_type = Request["smp_type"].nullToStr();                //  smp_qty      : 제작수량

                //string[] inq_item_nms = new string[] {"item1","item2" };

                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID 
                
                hash["p_tube_overcap"] = "";         
                hash["p_tube_sleeve"] = "";            
                hash["p_pump_overcap"] = "";      
                hash["p_pump_pump"] = "";
                hash["p_pump_cont"] = "";           
                hash["p_pump_support"] = "";
                hash["p_tube_overcap_comment"] = "";
                hash["p_tube_pump_comment"] = "";
                hash["p_tube_sleeve_comment"] = "";
                hash["p_pump_pump_comment"] = "";      // 파트너사 펌프 펌프   특이사항 
                hash["p_pump_cont_comment"] = "";   // 파트너사 펌프 용기   특이사항 
                hash["p_pump_support_comment"] = "";   // 파트너사 펌프 받침   특이사항 

                hash["p_tube_overcap_check"] = "";     // 파트너사 튜브 오버캡 이상유무
                hash["p_tube_pump_check"] = "";        // 파트너사 튜브 펌프   이상유무
                hash["p_tube_sleeve_check"] = "";     // 파트너사 튜브 슬리브 이상유무
                hash["p_pump_overcap_check"] = "";     // 파트너사 펌프 오버캡 이상유무
                hash["p_pump_pump_check"] = "";      // 파트너사 펌프 펌프   이상유무
                hash["p_pump_cont_check"] = "";     // 파트너사 펌프 용기   이상유무
                hash["p_pump_support_check"] = "";  // 파트너사 펌프 받침   이상유무


                hash["a_tube_overcap"] = "Y";           // 담당자 튜브 오버캡
                hash["a_tube_pump"] = "Y";              // 담당자 튜브 펌프
                hash["a_tube_sleeve"] = "Y";
                hash["a_pump_overcap"] = "Y";
                hash["a_pump_pump"] = "Y";           // 담당자 펌프 펌프
                hash["a_pump_cont"] = "Y";       // 담당자 펌프 용기                
                hash["a_pump_support"] = "Y";         // 담당자 펌프 받침
                hash["a_tube_overcap_comment"] = "";   // 담당자 튜브 오버캡 특이사항
                hash["a_tube_pump_comment"] = "";      // 담당자 튜브 펌프   특이사항
                hash["a_tube_sleeve_comment"] = "";   // 담당자 튜브 슬리브 특이사항
                hash["a_pump_overcap_comment"] = ""; ;   // 담당자 펌프 오버캡 특이사항
                hash["a_pump_pump_comment"] = "";      // 담당자 펌프 펌프   특이사항
                hash["a_pump_cont_comment"] = "";    // 담당자 펌프 용기   특이사항
                hash["a_pump_support_comment"] = "";   // 담당자 펌프 받침   특이사항  

                hash["a_tube_overcap_check"] = "";       // 담당자 튜브 오버캡 이상유무
                hash["a_tube_pump_check"] = "";      // 담당자 튜브 펌프   이상유무
                hash["a_tube_sleeve_check"] = "";     // 담당자 튜브 슬리브 이상유무
                hash["a_pump_overcap_check"] = "";      // 담당자 펌프 오버캡 이상유무
                hash["a_pump_pump_check"] = "";      // 담당자 펌프 펌프   이상유무
                hash["a_pump_cont_check"] = "";      // 담당자 펌프 용기   이상유무
                hash["a_pump_support_check"] = "";       // 담당자 펌프 받침   이상유무  

                if (!String.IsNullOrEmpty(state) && !String.IsNullOrEmpty(smp_cd))
                {
                    mapper.BeginTransaction();


                    if (smp_cd.IndexOf("|") == -1)
                    {
                        hash["smp_cd"] = smp_cd.nullToStr();
                        hash["smp_chasu"] = int.Parse(smp_chasu.nullToStr());
                        hash["muser_cd"] = muser_cd.nullToStr();
                        hash["prdt_pdate"] = prdt_pdate.nullToStr().Replace("-", "");

                       // if (smp_type.Equals("SMPTP_300")) state = "COMPLETE";
                        if (state.Equals("COMMITION_SUCCESS"))
                        {    //제작승인
                            hash["state"] = "commition_success";
                            hash["smp_status"] = "SMSTAT_400";
                            hash["prdt_adate"] = DateTime.Now.ToString("yyyyMMdd");
                            hash["prdt_auser"] = User.Identity.Name.Split('|')[0];

                            if (smp_type.Equals("SMPTP_100") || smp_type.Equals("SMPTP_300") || smp_type.Equals("SMPTP_500") || smp_type.Equals("SMPTP_600"))
                            {
                                Hashtable sample = mapper.QueryForObject<Hashtable>("selectSampleDetail", hash);
                                sample["company_cd"] = hash["company_cd"];
                                sample["reg_usr"] = hash["reg_usr"];
                                Hashtable hsCd = mapper.QueryForObject<Hashtable>("getOpptCd", hash);
                                sample["oppt_cd"] = hsCd["OPPT_CD"];
                                opportunitySave(sample, 1);
                            }
                            mapper.Update("uptSampleRequestCS", hash);

                        }
                        else if (state.Equals("COMPLETE"))
                        {         // 제작완료
                            hash["state"] = "complete";
                            hash["smp_status"] = "SMSTAT_500";
                            hash["process"] = "SMP_STEP200";
                            hash["prdt_cdate"] = DateTime.Now.ToString("yyyyMMdd");
                            hash["prdt_cuser"] = User.Identity.Name.Split('|')[0];
                            hash["smp_qty"] = smp_qty != "" ? int.Parse(smp_qty.Replace(",", "")) : 0;
                            hash["spec_yn"] = "Y";
                            mapper.Insert("specInsert", hash);

                        }
                        else if (state.Equals("FILM_RECEIPT"))
                        {         // 사양확정
                            hash["state"] = "film_receipt";
                            hash["smp_status"] = "SMSTAT_400";
                            hash["process"] = "SMP_STEP100";
                            hash["film_rdate"] = DateTime.Now.ToString("yyyyMMdd");
                            hash["film_ruser"] = User.Identity.Name.Split('|')[0];

                        }

                        mapper.Update("updateSmpDetail", hash);

                    }
                    else
                    {
                        String[] arr_smp_cds = smp_cd.Split('|');
                        String[] arr_smp_chasu = smp_chasu.Split('|');
                        String[] arr_muser_cd = muser_cd.Split('|');
                        String[] arr_prdt_pdate = prdt_pdate.Split('|');
                        String[] arr_smp_qty = smp_qty.Split('|');
                        String[] arr_smp_type = smp_type.Split('|');
                        Hashtable hsCd = mapper.QueryForObject<Hashtable>("getOpptCd", hash);
                        //sample["oppt_cd"] = hsCd["OPPT_CD"];
                        for (int i = 0; i < arr_smp_cds.Length; i++)
                        {
                            hash["smp_cd"] = arr_smp_cds[i].nullToStr();
                            hash["smp_chasu"] = int.Parse(arr_smp_chasu[i].nullToStr());
                            string state2 = state;
                           /* if (arr_smp_type[i].Equals("SMPTP_300"))
                            { 
                                state2 = "COMPLETE";
                            }*/


                            if (state2.Equals("COMMITION_SUCCESS"))
                            {    //제작승인
                                hash["state"] = "commition_success";
                                hash["muser_cd"] = arr_muser_cd[i].nullToStr();
                                hash["prdt_pdate"] = arr_prdt_pdate[i].nullToStr().Replace("-", "");
                                hash["smp_status"] = "SMSTAT_400";
                                hash["prdt_adate"] = DateTime.Now.ToString("yyyyMMdd");
                                hash["prdt_auser"] = User.Identity.Name.Split('|')[0];
                                if (arr_smp_type[i].ToString() == "SMPTP_100" || arr_smp_type[i].ToString() == "SMPTP_300" || arr_smp_type[i].ToString() == "SMPTP_500" || arr_smp_type[i].ToString() == "SMPTP_600")
                                {
                                    Hashtable sample = mapper.QueryForObject<Hashtable>("selectSampleDetail", hash);
                                    sample["company_cd"] = hash["company_cd"];
                                    sample["reg_usr"] = hash["reg_usr"];
                                    int opptLength = hsCd["OPPT_CD"].ToString().Length;  
                                    sample["oppt_cd"] = "OPPT" + DateTime.Now.Year.ToString().Substring(2, 2) + (int.Parse(hsCd["OPPT_CD"].ToString().Substring(6, opptLength - 6)) + i).ToString("000000");
                                    opportunitySave(sample, 1);
                                }
                                mapper.Update("uptSampleRequestCS", hash);

                            }
                            else if (state2.Equals("COMPLETE"))
                            {         // 제작완료
                                hash["state"] = "complete";
                                hash["smp_status"] = "SMSTAT_500";
                                hash["process"] = "SMP_STEP200";
                                hash["prdt_cdate"] = DateTime.Now.ToString("yyyyMMdd");
                                hash["prdt_cuser"] = User.Identity.Name.Split('|')[0]; 
                                hash["smp_qty"] = arr_smp_qty[i] != "" ? int.Parse(arr_smp_qty[i].Replace(",", "")) : 0;
                                hash["spec_yn"] = "Y";
                                mapper.Insert("specInsert", hash);

                            }
                            else if (state.Equals("FILM_RECEIPT"))
                            {         // 사양확정
                                hash["state"] = "film_receipt";

                                hash["process"] = "SMP_STEP100";
                                hash["smp_status"] = "SMSTAT_400";
                                hash["film_rdate"] = DateTime.Now.ToString("yyyyMMdd");
                                hash["film_ruser"] = User.Identity.Name.Split('|')[0];

                            }

                            mapper.Update("updateSmpDetail", hash);
                        }
                    }


                    /*

                    for (int i = 0; i < smp_cd.Length; i++) {
                        hash["smp_cd"] = smp_cd[i].nullToStr();
                        hash["smp_chasu"] = int.Parse(smp_chasu[i].nullToStr());

                        if (state.Equals("COMMITION_SUCCESS")) {    //제작승인
                            hash["state"] = "commition_success";
                            hash["smp_status"] = "SMSTAT_400";
                            hash["prdt_adate"] = DateTime.Now.ToString("yyyyMMdd");
                            hash["prdt_auser"] = User.Identity.Name.Split('|')[0];
                            hash["prdt_pdate"] = prdt_pdate[i].nullToStr().Replace("-", "");

                            mapper.Update("uptSampleRequestCS", hash);

                        } else if (state.Equals("COMPLETE")) {         // 제작완료
                            hash["state"] = "complete";
                            hash["smp_status"] = "SMSTAT_500";
                            hash["prdt_cdate"] = DateTime.Now.ToString("yyyyMMdd");
                            hash["prdt_cuser"] = User.Identity.Name.Split('|')[0];
                            hash["smp_qty"] = Request["smp_qty"].nullToStr() != "" ? int.Parse(Request["smp_qty"].Replace(",", "")) : 0;

                        }

                        
                        mapper.Update("updateSmpDetail", hash);

                    }

                */



                    mapper.CommitTransaction();

                    result.Add("success", true);
                    var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;

                    return jsonResult;

                }
                else
                {
                    return new EmptyResult();
                }


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





        // Sample 제작관리 :  샘플드롭 /SampleManage/sampleDrop
        [HttpPost]
        public ActionResult sampleDrop()
        {

            ISqlMapper mapper = null;
            String smp_status = "DROP";
            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();


                hash.Add("smp_cd", Request["smp_cd"].nullToStr());
                hash.Add("smp_chasu", Request["smp_chasu"].nullToStr());
                hash.Add("smp_drtype", Request["smp_drtype"].nullToStr());
                hash.Add("smp_drdescript", Request["smp_drdescript"].nullToStr());
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);      // company_cd
                hash.Add("language", User.Identity.Name.Split('|')[3]);         // language
                hash.Add("reg_usr", User.Identity.Name.Split('|')[0]);         // user_cd       : 로그인 사용자ID
                hash.Add("mod_usr", User.Identity.Name.Split('|')[0]);         // mod_usr       : 로그인 사용자ID
                hash.Add("user_cd", User.Identity.Name.Split('|')[0]);         // mod_usr       : 로그인 사용자ID
                hash.Add("smp_drdate", DateTime.Now.ToString("yyyyMMdd"));         // mod_usr       : 로그인 사용자ID
                hash.Add("state", "drop");                                        // state   
                hash.Add("smp_status", "SMSTAT_900");                            //  smp_status  : 진행상태 


                mapper.BeginTransaction();

                mapper.Update("updateSmpDetail", hash);
                mapper.Insert("insertSmpDrop", hash);


                mapper.CommitTransaction();

                result.Add("success", true);
                result.Add("smp_status", smp_status);
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




        // Sample 제작관리 :  샘플 재작업  /SampleManage/sampleRepair
        [HttpPost]
        public ActionResult sampleRepair()
        {

            ISqlMapper mapper = null;

            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();

                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // company_cd
                hash["language"] = User.Identity.Name.Split('|')[3];        // language
                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd      : 로그인 사용자ID
                hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr      : 로그인 사용자ID
                hash["user_cd"] = User.Identity.Name.Split('|')[0];         // mod_usr      : 로그인 사용자ID
                hash["smp_crdate"] = DateTime.Now.ToString("yyyyMMdd");     // mod_usr      : 로그인 사용자ID
                hash["smp_cd"] = Request["smp_cd"].nullToStr();             // smp_chasu    : 샘플차수
                hash["smp_chasu"] = Request["smp_chasu"].nullToStr();       // smp_chasu    : 샘플차수
                hash["smp_crtype"] = Request["smp_crtype"].nullToStr();     // smp_qrtype   : 재작업 타입
                hash["smp_crdescript"] = Request["smp_crdescript"].nullToStr(); // smp_qrdescript    : 재작업 내용




                Hashtable sample = mapper.QueryForObject<Hashtable>("selectSampleDetail", hash);
                Boolean state_check = false;
                String smp_cd = hash["smp_cd"].ToString();
                String smp_chasu = hash["smp_chasu"].ToString();


                mapper.BeginTransaction();



                if (sample["SMR_CD"].Equals(""))
                {
                    // 연결된 샘플이 없음
                    state_check = true;
                }
                else
                { // 연결된 샘플이 있는 경우
                    hash["smr_cd"] = sample["SMR_CD"];
                    hash["smr_chasu"] = sample["SMR_CHASU"];
                    //smp_chasu = hash["smr_chasu"].ToString();

                    // Hashtable s070 = mapper.QueryForObject<Hashtable>("checkSmrReqStatus070", hash);
                    // int checkCnt = int.Parse(s070["CNT"].ToString());
                    //샘플요청건은 배송선적됨 , 그냥 SMR_CD가 있는지만 체크
                    int checkCnt = mapper.QueryForObject<int>("checkSmrReqStatus070", hash);



                    if (checkCnt > 0)
                    { //샘플요청 검토승인 된것
                        state_check = true;
                    }
                    else
                    {
                        // 연결된 샘플이 없음
                    }
                }

                if (state_check)
                {

                    int smp_chasu2 = (int)mapper.Insert("insertSmpRepairNew", hash);

                    hash["smp_chasu"] = smp_chasu2;

                    mapper.Insert("insertSmpCrepair", hash);
                   
                    mapper.Insert("insertSmpRuser", hash);

                }






                mapper.CommitTransaction();

                result.Add("success", true);
                result.Add("smp_cd", hash["smp_cd"].ToString());
                result.Add("smp_chasu", hash["smp_chasu"].ToString());
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



        // Sample 제작관리 :  샘플 자체 재작업 등록  /SampleManage/sampleMyRepair
        [HttpPost]
        public ActionResult sampleMyRepair()
        {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();
                mapper = Mapper.Instance();

                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // company_cd
                hash["language"] = User.Identity.Name.Split('|')[3];        // language
                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
                hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID
                hash["user_cd"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
                hash["smp_qrdate"] = DateTime.Now.ToString("yyyyMMdd");     // smp_qrdate    :
                hash["smp_status"] = "SMSTAT_100";                          // smp_status    : 진행상태
                hash["state"] = "myrepair";                                 // state         : 진행상태

                hash["smp_cd"] = Request["smp_cd"].nullToStr();             // smp_cd        : 샘플PK
                hash["smp_chasu"] = Request["smp_chasu"].nullToStr();       // smp_chasu     : 샘플차수
                hash["smp_qrtype"] = Request["smp_qrtype"].nullToStr();     // smp_qrtype    : 재작업 타입
                hash["smp_qrdescript"] = Request["smp_qrdescript"].nullToStr();    // smp_qrdescript    : 재작업 내용

                 
                mapper.BeginTransaction();

                mapper.Insert("insertSmpQrepair", hash);
                mapper.Update("updateSmpDetail", hash);


                mapper.CommitTransaction();

                result.Add("success", true);
                result.Add("smp_cd", hash["smp_cd"]);
                result.Add("smp_chasu", hash["smp_chasu"]);
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




        // Sample 제작관리 :  샘플 의뢰반려 등록  /SampleManage/sampleReturn
        [HttpPost]
        public ActionResult sampleReturn()
        {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();
                mapper = Mapper.Instance();

                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // company_cd
                hash["language"] = User.Identity.Name.Split('|')[3];        // language

                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
                hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID
                hash["user_cd"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID

                hash["prdt_rjdate"] = DateTime.Now.ToString("yyyyMMdd");    // prdt_rjdate   :
                hash["prdt_rjuser"] = User.Identity.Name.Split('|')[0];     // prdt_rjuser   :
                hash["smp_rtdate"] = DateTime.Now.ToString("yyyyMMdd");     // smp_rtdate    :
                hash["smp_status"] = "SMSTAT_300";                          // smp_status    : 진행상태
                hash["state"] = "commition_rejected";                       // state         : 진행상태

                hash["smp_cd"] = Request["smp_cd"].nullToStr();             // smp_cd        : 샘플PK
                hash["smp_chasu"] = Request["smp_chasu"].nullToStr();       // smp_chasu     : 샘플차수
                hash["smp_rttype"] = Request["smp_rttype"].nullToStr();     // smp_qrtype    : 의뢰반려 타입
                hash["smp_rtdescript"] = Request["smp_rtdescript"].nullToStr();    // smp_qrdescript    : 의뢰반려 내용



                mapper.BeginTransaction();


                mapper.Update("updateSmpDetail", hash);
                mapper.Insert("insertSmpReturn", hash);


                mapper.CommitTransaction();

                result.Add("success", true);
                result.Add("smp_cd", hash["smp_cd"]);
                result.Add("smp_chasu", hash["smp_chasu"]);
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








        // Sample Drop 현황 : 리스트 /SampleManage/selectDropList
        public ActionResult selectDropList()
        {

            if (Request["sdate"] != null && Request["edate"] != null)
            {

                Hashtable hash = new Hashtable();

                hash.Add("language", User.Identity.Name.Split('|')[3]);         // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드

                hash.Add("deptGroup", Request["deptGroup"]);        // deptGroup    : 매출조직
                hash.Add("bizGroup", Request["bizGroup"]);          // bizGroup     : 매출조직 상위부서
                hash.Add("dstr_type", Request["dstr_type"]);        // dstr_type    : 유통구조
                hash.Add("user_nm", Request["user_nm"]);            // user_nm      : 영업담당
                hash.Add("user_cd", Request["user_cd"]);            // user_cd      : 영업담당ID
                hash.Add("sdate", Request["sdate"]);                // sdate        : Drop일 시작
                hash.Add("edate", Request["edate"]);                // edate        : Drop일 종료
                hash.Add("cust_nm", Request["cust_nm"]);            // cust_nm      : 거래처명
                hash.Add("cust_cd", Request["cust_cd"]);            // user_cd      : 거래처 코드 
                hash.Add("biz_type", Request["biz_type"]);          // biz_type     : 사업유형
                hash.Add("item_type", Request["item_type"]);        // item_type    : 품목유형
                hash.Add("smp_drtype", Request["smp_drtype"]);      // smp_drtype   : Drop유형



                ISqlMapper mapper = Mapper.Instance();
                IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("selectDropList", hash);


                Hashtable jsonData = new Hashtable();
                jsonData.Add("COUNT", list.Count());
                jsonData.Add("LIST", list);


                var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }
            else
            {
                return new EmptyResult();
            }

        }






        // Sample Drop 현황 : 상세  /SampleManage/selectDropDetail
        public ActionResult selectDropDetail()
        {

            if (Request["smp_cd"] != null && Request["smp_chasu"] != null)
            {

                Hashtable hash = new Hashtable();

                hash.Add("language", User.Identity.Name.Split('|')[3]);     // 기본언어
                hash.Add("company_cd", User.Identity.Name.Split('|')[2]);   // 회사코드

                hash.Add("smp_cd", Request["smp_cd"]);          // smp_cd      샘플PK ( T_SAMPLE )
                hash.Add("smp_chasu", Request["smp_chasu"]);    // smp_chasu   샘플차수


                ISqlMapper mapper = Mapper.Instance();
                IEnumerable list = mapper.QueryForObject<IEnumerable>("selectDropDetail", hash);



                var jsonResult = Json(list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }
            else
            {
                return new EmptyResult();
            }

        }



        // Sample 제작관리 : 제작담당 셀렉트박스 /SampleManage/selectSucUserList
        public ActionResult selectSucUserList()
        {

            Hashtable hash = new Hashtable();


            hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드


            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("selectSucUserList", hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;



        }


        // Sample 제작관리 : 승인담당 셀렉트박스 /SampleManage/selectSuc2UserList
        public ActionResult selectSuc2UserList()
        {


            Hashtable hash = new Hashtable();


            hash.Add("company_cd", User.Identity.Name.Split('|')[2]);       // 회사코드


            ISqlMapper mapper = Mapper.Instance();
            IEnumerable<Hashtable> list = mapper.QueryForList<Hashtable>("selectSuc2UserList", hash);


            Hashtable jsonData = new Hashtable();
            jsonData.Add("COUNT", list.Count());
            jsonData.Add("LIST", list);


            var jsonResult = Json(jsonData, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;

            return jsonResult;


        }








        /*
        // Sample 제작관리 :  배송선적 트래킹 넘버 저장 /SampleManage/sampleTrackingInsert
        [HttpPost]
        public ActionResult sampleTrackingInsert() {

            ISqlMapper mapper = null;

            Hashtable result = new Hashtable();
            try {
                Hashtable hash = new Hashtable();

                mapper = Mapper.Instance();


                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // company_cd
                hash["language"] = User.Identity.Name.Split('|')[3];        // language
                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID
                hash["mod_usr"] = User.Identity.Name.Split('|')[0];         // mod_usr       : 로그인 사용자ID

                hash["state"] = "shipping";                                 // state   
                hash["smp_status"] = "SMSTAT_600";                          // smp_status  : 
                hash["ship_pdate"] = DateTime.Now.ToString("yyyyMMdd");     // ship_pdate  : 
                hash["ship_puser"] = User.Identity.Name.Split('|')[0];      // ship_pdate  :  



                mapper.BeginTransaction();


                mapper.Update("uptSampleRequestCS", hash);

                hash["smp_chasu"] = int.Parse(Request["smp_chasu"].nullToStr());
                mapper.Update("updateSmpDetail", hash);


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
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }

        }
        */




        // Sample 제작관리 :  샘플 품목등록  /SampleManage/sampleItemInsert
        [HttpPost]
        public ActionResult sampleItemInsert()
        {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();
                mapper = Mapper.Instance();

                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // company_cd
                hash["language"] = User.Identity.Name.Split('|')[3];        // language
                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID


                hash["item_nm"] = Request["item_nm"].nullToStr();             // item_nm        : 품목명
                hash["item_type"] = Request["item_type"].nullToStr();         // item_type      : 품목유형


                mapper.BeginTransaction();

                string item_cd = (string)mapper.Insert("insertSampleItem", hash);
                mapper.CommitTransaction();

                result.Add("item_nm", hash["item_nm"]);
                result.Add("item_cd", item_cd);
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



        // 코드관리 : 사양체크 - 상세(팝업)  /SampleManage/specDetail
        public ActionResult specDetail()
        {

            Hashtable result = new Hashtable();
            Hashtable hash = new Hashtable();
            try
            {
                ISqlMapper mapper = Mapper.Instance();
                hash["language"] = User.Identity.Name.Split('|')[3];         // 기본언어
                hash["company_cd"] = User.Identity.Name.Split('|')[2];       // 회사코드

                hash["smr_cd"] = Request["smr_cd"].nullToStr();                   // 샘플요청CD
                hash["smr_chasu"] = Request["smr_chasu"].nullToStr();                // 샘플요청 차수
                hash["smp_cd"] = Request["smp_cd"].nullToStr();                   // 샘플CD
                hash["smp_chasu"] = Request["smp_chasu"].nullToStr();                // 샘플 차수


                IList<Hashtable> list = mapper.QueryForList<Hashtable>("specDetail", hash);

                result.Add("LIST", list);

                result.Add("success", true);
                var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;

                return jsonResult;

            }
            catch (Exception e)
            {
                logger.Info(e.Message);
                result.Add("success", false);
                result.Add("errmsg", e.Message);
                return Json(result, JsonRequestBehavior.AllowGet);
            }

        }



        // Sample 제작관리 :  사양체크 - 등록  /SampleManage/specInsert
        [HttpPost]
        public ActionResult specInsert()
        {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();
                mapper = Mapper.Instance();

                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // company_cd
                hash["language"] = User.Identity.Name.Split('|')[3];        // language
                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID


                hash["smr_cd"] = Request["smr_cd"].nullToStr();                   // 샘플요청CD
                hash["smr_chasu"] = Request["smr_chasu"].nullToStr();                // 샘플요청 차수
                hash["smp_cd"] = Request["smp_cd"].nullToStr();                   // 샘플CD
                hash["smp_chasu"] = Request["smp_chasu"].nullToStr();                // 샘플 차수
                hash["p_tube_overcap"] = Request["p_tube_overcap"].nullToStr();           // 파트너사 튜브 오버캡
                hash["p_tube_pump"] = Request["p_tube_pump"].nullToStr();              // 파트너사 튜브 펌프
                hash["p_tube_sleeve"] = Request["p_tube_sleeve"].nullToStr();            // 파트너사 튜브 슬리브
                hash["p_pump_overcap"] = Request["p_pump_overcap"].nullToStr();           // 파트너사 펌프 오버캡
                hash["p_pump_pump"] = Request["p_pump_pump"].nullToStr();              // 파트너사 펌프 펌프
                hash["p_pump_cont"] = Request["p_pump_cont"].nullToStr();              // 파트너사 펌프 용기
                hash["p_pump_support"] = Request["p_pump_support"].nullToStr();           // 파트너사 펌프 받침
                hash["p_tube_overcap_comment"] = Request["p_tube_overcap_comment"].nullToStr();   // 파트너사 튜브 오버캡 특이사항 
                hash["p_tube_pump_comment"] = Request["p_tube_pump_comment"].nullToStr();      // 파트너사 튜브 펌프   특이사항 
                hash["p_tube_sleeve_comment"] = Request["p_tube_sleeve_comment"].nullToStr();    // 파트너사 튜브 슬리브 특이사항 
                hash["p_pump_overcap_comment"] = Request["p_pump_overcap_comment"].nullToStr();   // 파트너사 펌프 오버캡 특이사항 
                hash["p_pump_pump_comment"] = Request["p_pump_pump_comment"].nullToStr();      // 파트너사 펌프 펌프   특이사항 
                hash["p_pump_cont_comment"] = Request["p_pump_cont_comment"].nullToStr();      // 파트너사 펌프 용기   특이사항 
                hash["p_pump_support_comment"] = Request["p_pump_support_comment"].nullToStr();   // 파트너사 펌프 받침   특이사항 

                hash["p_tube_overcap_check"] = Request["p_tube_overcap_check"].nullToStr();     // 파트너사 튜브 오버캡 이상유무
                hash["p_tube_pump_check"] = Request["p_tube_pump_check"].nullToStr();        // 파트너사 튜브 펌프   이상유무
                hash["p_tube_sleeve_check"] = Request["p_tube_sleeve_check"].nullToStr();      // 파트너사 튜브 슬리브 이상유무
                hash["p_pump_overcap_check"] = Request["p_pump_overcap_check"].nullToStr();     // 파트너사 펌프 오버캡 이상유무
                hash["p_pump_pump_check"] = Request["p_pump_pump_check"].nullToStr();        // 파트너사 펌프 펌프   이상유무
                hash["p_pump_cont_check"] = Request["p_pump_cont_check"].nullToStr();        // 파트너사 펌프 용기   이상유무
                hash["p_pump_support_check"] = Request["p_pump_support_check"].nullToStr();     // 파트너사 펌프 받침   이상유무


                hash["a_tube_overcap"] = Request["a_tube_overcap"].nullToStr();           // 담당자 튜브 오버캡
                hash["a_tube_pump"] = Request["a_tube_pump"].nullToStr();              // 담당자 튜브 펌프
                hash["a_tube_sleeve"] = Request["a_tube_sleeve"].nullToStr();            // 담당자 튜브 슬리브
                hash["a_pump_overcap"] = Request["a_pump_overcap"].nullToStr();           // 담당자 펌프 오버캡
                hash["a_pump_pump"] = Request["a_pump_pump"].nullToStr();              // 담당자 펌프 펌프
                hash["a_pump_cont"] = Request["a_pump_cont"].nullToStr();              // 담당자 펌프 용기                
                hash["a_pump_support"] = Request["a_pump_support"].nullToStr();           // 담당자 펌프 받침
                hash["a_tube_overcap_comment"] = Request["a_tube_overcap_comment"].nullToStr();   // 담당자 튜브 오버캡 특이사항
                hash["a_tube_pump_comment"] = Request["a_tube_pump_comment"].nullToStr();      // 담당자 튜브 펌프   특이사항
                hash["a_tube_sleeve_comment"] = Request["a_tube_sleeve_comment"].nullToStr();    // 담당자 튜브 슬리브 특이사항
                hash["a_pump_overcap_comment"] = Request["a_pump_overcap_comment"].nullToStr();   // 담당자 펌프 오버캡 특이사항
                hash["a_pump_pump_comment"] = Request["a_pump_pump_comment"].nullToStr();      // 담당자 펌프 펌프   특이사항
                hash["a_pump_cont_comment"] = Request["a_pump_cont_comment"].nullToStr();      // 담당자 펌프 용기   특이사항
                hash["a_pump_support_comment"] = Request["a_pump_support_comment"].nullToStr();   // 담당자 펌프 받침   특이사항  

                hash["a_tube_overcap_check"] = Request["a_tube_overcap_check"].nullToStr();       // 담당자 튜브 오버캡 이상유무
                hash["a_tube_pump_check"] = Request["a_tube_pump_check"].nullToStr();          // 담당자 튜브 펌프   이상유무
                hash["a_tube_sleeve_check"] = Request["a_tube_sleeve_check"].nullToStr();        // 담당자 튜브 슬리브 이상유무
                hash["a_pump_overcap_check"] = Request["a_pump_overcap_check"].nullToStr();       // 담당자 펌프 오버캡 이상유무
                hash["a_pump_pump_check"] = Request["a_pump_pump_check"].nullToStr();          // 담당자 펌프 펌프   이상유무
                hash["a_pump_cont_check"] = Request["a_pump_cont_check"].nullToStr();          // 담당자 펌프 용기   이상유무
                hash["a_pump_support_check"] = Request["a_pump_support_check"].nullToStr();       // 담당자 펌프 받침   이상유무  


                mapper.BeginTransaction();

                mapper.Insert("specInsert", hash);

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



        // Sample 제작관리 :  사양체크 - 수정  /SampleManage/specUpdate
        [HttpPost]
        public ActionResult specUpdate()
        {

            ISqlMapper mapper = null;
            Hashtable result = new Hashtable();
            try
            {
                Hashtable hash = new Hashtable();
                mapper = Mapper.Instance();

                hash["company_cd"] = User.Identity.Name.Split('|')[2];      // company_cd
                hash["language"] = User.Identity.Name.Split('|')[3];        // language
                hash["reg_usr"] = User.Identity.Name.Split('|')[0];         // user_cd       : 로그인 사용자ID


                hash["smr_cd"] = Request["smr_cd"].nullToStr();                   // 샘플요청CD
                hash["smr_chasu"] = Request["smr_chasu"].nullToStr();                // 샘플요청 차수
                hash["smp_cd"] = Request["smp_cd"].nullToStr();                   // 샘플CD
                hash["smp_chasu"] = Request["smp_chasu"].nullToStr();                // 샘플 차수
                hash["p_tube_overcap"] = Request["p_tube_overcap"].nullToStr();           // 파트너사 튜브 오버캡
                hash["p_tube_pump"] = Request["p_tube_pump"].nullToStr();              // 파트너사 튜브 펌프
                hash["p_tube_sleeve"] = Request["p_tube_sleeve"].nullToStr();            // 파트너사 튜브 슬리브
                hash["p_pump_overcap"] = Request["p_pump_overcap"].nullToStr();           // 파트너사 펌프 오버캡
                hash["p_pump_pump"] = Request["p_pump_pump"].nullToStr();              // 파트너사 펌프 펌프
                hash["p_pump_cont"] = Request["p_pump_cont"].nullToStr();              // 파트너사 펌프 용기
                hash["p_pump_support"] = Request["p_pump_support"].nullToStr();           // 파트너사 펌프 받침
                hash["p_tube_overcap_comment"] = Request["p_tube_overcap_comment"].nullToStr();   // 파트너사 튜브 오버캡 특이사항 
                hash["p_tube_pump_comment"] = Request["p_tube_pump_comment"].nullToStr();      // 파트너사 튜브 펌프   특이사항 
                hash["p_tube_sleeve_comment"] = Request["p_tube_sleeve_comment"].nullToStr();    // 파트너사 튜브 슬리브 특이사항 
                hash["p_pump_overcap_comment"] = Request["p_pump_overcap_comment"].nullToStr();   // 파트너사 펌프 오버캡 특이사항 
                hash["p_pump_pump_comment"] = Request["p_pump_pump_comment"].nullToStr();      // 파트너사 펌프 펌프   특이사항 
                hash["p_pump_cont_comment"] = Request["p_pump_cont_comment"].nullToStr();      // 파트너사 펌프 용기   특이사항 
                hash["p_pump_support_comment"] = Request["p_pump_support_comment"].nullToStr();   // 파트너사 펌프 받침   특이사항 

                hash["p_tube_overcap_check"] = Request["p_tube_overcap_check"].nullToStr();     // 파트너사 튜브 오버캡 이상유무
                hash["p_tube_pump_check"] = Request["p_tube_pump_check"].nullToStr();        // 파트너사 튜브 펌프   이상유무
                hash["p_tube_sleeve_check"] = Request["p_tube_sleeve_check"].nullToStr();      // 파트너사 튜브 슬리브 이상유무
                hash["p_pump_overcap_check"] = Request["p_pump_overcap_check"].nullToStr();     // 파트너사 펌프 오버캡 이상유무
                hash["p_pump_pump_check"] = Request["p_pump_pump_check"].nullToStr();        // 파트너사 펌프 펌프   이상유무
                hash["p_pump_cont_check"] = Request["p_pump_cont_check"].nullToStr();        // 파트너사 펌프 용기   이상유무
                hash["p_pump_support_check"] = Request["p_pump_support_check"].nullToStr();     // 파트너사 펌프 받침   이상유무


                hash["a_tube_overcap"] = Request["a_tube_overcap"].nullToStr();           // 담당자 튜브 오버캡
                hash["a_tube_pump"] = Request["a_tube_pump"].nullToStr();              // 담당자 튜브 펌프
                hash["a_tube_sleeve"] = Request["a_tube_sleeve"].nullToStr();            // 담당자 튜브 슬리브
                hash["a_pump_overcap"] = Request["a_pump_overcap"].nullToStr();           // 담당자 펌프 오버캡
                hash["a_pump_pump"] = Request["a_pump_pump"].nullToStr();              // 담당자 펌프 펌프
                hash["a_pump_cont"] = Request["a_pump_cont"].nullToStr();              // 담당자 펌프 용기                
                hash["a_pump_support"] = Request["a_pump_support"].nullToStr();           // 담당자 펌프 받침
                hash["a_tube_overcap_comment"] = Request["a_tube_overcap_comment"].nullToStr();   // 담당자 튜브 오버캡 특이사항
                hash["a_tube_pump_comment"] = Request["a_tube_pump_comment"].nullToStr();      // 담당자 튜브 펌프   특이사항
                hash["a_tube_sleeve_comment"] = Request["a_tube_sleeve_comment"].nullToStr();    // 담당자 튜브 슬리브 특이사항
                hash["a_pump_overcap_comment"] = Request["a_pump_overcap_comment"].nullToStr();   // 담당자 펌프 오버캡 특이사항
                hash["a_pump_pump_comment"] = Request["a_pump_pump_comment"].nullToStr();      // 담당자 펌프 펌프   특이사항
                hash["a_pump_cont_comment"] = Request["a_pump_cont_comment"].nullToStr();      // 담당자 펌프 용기   특이사항
                hash["a_pump_support_comment"] = Request["a_pump_support_comment"].nullToStr();   // 담당자 펌프 받침   특이사항  

                hash["a_tube_overcap_check"] = Request["a_tube_overcap_check"].nullToStr();       // 담당자 튜브 오버캡 이상유무
                hash["a_tube_pump_check"] = Request["a_tube_pump_check"].nullToStr();          // 담당자 튜브 펌프   이상유무
                hash["a_tube_sleeve_check"] = Request["a_tube_sleeve_check"].nullToStr();        // 담당자 튜브 슬리브 이상유무
                hash["a_pump_overcap_check"] = Request["a_pump_overcap_check"].nullToStr();       // 담당자 펌프 오버캡 이상유무
                hash["a_pump_pump_check"] = Request["a_pump_pump_check"].nullToStr();          // 담당자 펌프 펌프   이상유무
                hash["a_pump_cont_check"] = Request["a_pump_cont_check"].nullToStr();          // 담당자 펌프 용기   이상유무
                hash["a_pump_support_check"] = Request["a_pump_support_check"].nullToStr();       // 담당자 펌프 받침   이상유무  


                mapper.BeginTransaction();

                mapper.Update("specUpdate", hash);
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


        public void opportunitySave(Hashtable hash, int type)
        {

            ISqlMapper mapper = null;

            try
            {
                mapper = Mapper.Instance();
                string wso_pdate = "";
                
                if(type == 1)
                {
                    hash["item_cd"] = hash["ITEM_CD"];
                    hash["prdt_rcdate"] = hash["PRDT_RCDATE"];
                    hash["smp_cd"] = hash["SMP_CD"];
                    hash["smp_chasu"] = hash["SMP_CHASU"];
                    hash["smp_rqty"] = hash["SMP_RQTY"];
                    hash["prdt_psblt"] = hash["PRDT_PSBLT"];
                    hash["biz_type"] = hash["BIZ_TYPE"];
                    hash["dstr_type"] = hash["DSTR_TYPE"];
                    hash["cust_cd"] = hash["CUST_CD"]; 
                    hash["euser_cd"] = hash["EUSER_CD"];
                    hash["euser_nm"] = hash["EUSER_NM"];
                    hash["user_cd"] = hash["USER_CD"];
                    hash["dept_cd"] = hash["DEPT_CD"];
                    hash["base_crny"] = hash["BASE_CRNY"];
                    hash["exch_rate"] = hash["EXCH_RATE"];
                }
                hash["oppt_item_cd"] = hash["item_cd"];
                hash["oppt_status"] = null;
                if (hash["prdt_rcdate"] == null)
                {
                    wso_pdate = DateTime.Now.Year.ToString("00")+ DateTime.Now.Month.ToString("00")+DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month).ToString("00");
                }
                else
                {
                    wso_pdate = hash["prdt_rcdate"].ToString();
                }
                hash["wso_pdate"] = wso_pdate;
                hash["oppt_sales_date"] = wso_pdate;
                hash["sales_date"] = wso_pdate;
                hash["rfc_cd"] = hash["smp_cd"];
                hash["rfc_chasu"] = hash["smp_chasu"];
                hash["oppt_qty"] = hash["smp_rqty"];
                hash["oppt_unit_prc"] = null;
                hash["amount"] = null;
                hash["krw_amount"] = null;
                switch (hash["prdt_psblt"].ToString())
                {
                    case "PRPB_100":
                        hash["wso_psblt"] = "WSOPB_100";
                        break;
                    case "PRPB_200":
                        hash["wso_psblt"] = "WSOPB_200";
                        break;
                    case "PRPB_300":
                        hash["wso_psblt"] = "WSOPB_300";
                        break;
                    case "PRPB_400":
                        hash["wso_psblt"] = "WSOPB_400";
                        break;
                    case "PRPB_500":
                        hash["wso_psblt"] = "WSOPB_500";
                        break;

                }
                hash["pjt_cd"] = null;
                hash["oppt_type"] = "OPTP_100";
                int chk = mapper.QueryForObject<int>("getRfcCd", hash);
                if (chk == 0)
                {
                    mapper.Insert("opportunitySave", hash);
                    mapper.Insert("opportunityItemSave", hash);
                }


            }
            catch (DataMapperException e)
            {
                if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();
                logger.Info(e.Message);
            }
            catch (Exception e)
            {
                if (e.Source.Equals(".Net SqlClient Data Provider")) mapper.RollBackTransaction();
                logger.Info(e.Message);
            }

        }
    }
}
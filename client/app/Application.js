/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Ysn.Application', {
    extend: 'Ext.app.Application',
    requires: ['Ysn.util.ThousandSeparatorNumber'], 
    name: 'Ysn',
    stores: [
		'Ysn.store.deptgroup',
		'Ysn.store.usercd',
		'Ysn.store.customerDetail',
		'Ysn.store.inquiryList',
		'Ysn.store.inquiry',
		'Ysn.store.sampleRequestList', 
		'Ysn.store.sampleReceiptList',
		'Ysn.store.sampleReviewList', 
		'Ysn.store.sampleProductionList',
		'Ysn.store.subSampleProductionList',
		'Ysn.store.Resource',
		'Ysn.store.Event',
		'Ysn.store.salesActivityPlan',
		'Ysn.store.time',
		'Ysn.store.salesHistoryList',
	    'Ysn.store.inquiryItemList',
		'Ysn.store.followup',
		'Ysn.store.sucUser',
		'Ysn.store.suc2User',
	    'Ysn.store.salesActivityStat',
        'Ysn.store.opportunityView',
        'Ysn.store.opportunityDetail',
        'Ysn.store.opportunityList',
        'Ysn.store.forecastView',
        'Ysn.store.boardView',
        'Ysn.store.orderReport',
        'Ysn.store.msalesReport',
        'Ysn.store.msalesReportOrder',
        'Ysn.store.mdetailPop',
		'Ysn.store.salesOrderView',
        'Ysn.store.yn',
        'Ysn.store.mainPopup', 
        'Ysn.store.mainView2'

        // TODO: add global / shared stores here
    ],
    
    launch: function () {
        // TODO - Launch the application
		//this.setMainView('Ysn.view.main.login');
		Ext.Error.handle = function(err) { 
			if(err.msg.indexOf('SessionOut') > 0){
				Ext.MessageBox.alert('Warning', 'login Session Out!!', function(){location.href = 'index.aspx';return true;});
				
			}
         }
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }

	
	
});


Ext.Ajax.timeout = 9000000;
Ext.override(Ext.data.proxy.Ajax, { timeout: 9000000 });

Ext.define('Ysn.Global', {
    singleton: true,
    activeMenu: '',
    smpTop: '<html> <head> <meta http-equiv=\"Content-Type\" content=\"text/html; charset=\"utf-8\"> <title>Sample Request<\/title> <style type=\"text\/css\"> body { 	font-family: Malgun Gothic,Dotum,Helvetica,Sans-serif; 	font-size: 10px; } .mainTitle { 	font-size: 12px; 	font-weight: bold; 	background-image: url(resources\/images\/sub_bullet_title1.gif); 	background-repeat: no-repeat; 	background-position: left bottom; 	LETTER-SPACING: 0px;     font-weight: bold;     height: 20px;     PADDING-left: 14px;     margin-bottom: 10px; } .subTitle { 	font-size: 12px; 	font-weight: bold; 	background-image: url(resources\/images\/h2_checkbox_bullet.gif); 	background-repeat: no-repeat; 	background-position: left bottom; 	LETTER-SPACING: 0px;     font-weight: bold;     PADDING-left: 17px;     margin-bottom: 3px; } table { 	border-collapse:collapse; } th, td { 	font-size: 10px; padding-left: 2px; 	height: 25px; 	border: 1px solid black; 	word-break:break-all; } <\/style> <\/head><body> <h2 class=\"mainTitle\">Sample Request<\/h2> <h2 class=\"subTitle\">' + Locale.getMsg('기본정보') + '<\/h2> <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">   <tr>     <th width=\"100\" rowspan=\"2\" valign=\"middle\" bgcolor=\"#EFEFEF\" scope=\"row\"><strong>' + Locale.getMsg('고객사명') + '<\/strong><\/th>     <td rowspan=\"2\" valign=\"middle\" >basic_A1<\/td>     <td width=\"60\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('SMR_CD') + '<\/strong><\/td>     <td valign=\"middle\" >basic_A2<\/td>     <td width=\"100\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('영업담당') + '<\/strong><\/td>     <td valign=\"middle\" >basic_A3<\/td>     <td width=\"100\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('샘플완료요청일') + '<\/strong><\/td>     <td width=\"60\" valign=\"middle\" >basic_A4<\/td>   <\/tr>   <tr>     <td width=\"60\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('차수') + '<\/strong><\/td>     <td valign=\"middle\" >basic_B2<\/td>     <td width=\"100\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('접수담당') + '<\/strong><\/td>     <td valign=\"middle\" >basic_B3<\/td>     <td width=\"100\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('발주예정일') + '<\/strong><\/td>     <td width=\"60\" valign=\"middle\" >basic_B4<\/td>   <\/tr>   <tr>     <th width=\"100\" rowspan=\"2\" valign=\"middle\" bgcolor=\"#EFEFEF\" scope=\"row\"><strong>' + Locale.getMsg('제품명') + '<\/strong><\/th>     <td rowspan=\"2\" valign=\"middle\" >basic_C1<\/td>     <td width=\"60\" rowspan=\"2\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('수량') + '<\/strong><\/td>     <td rowspan=\"2\" valign=\"middle\" >basic_C2<\/td>     <td width=\"100\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('진행상태') + '<\/strong><\/td>     <td valign=\"middle\" >basic_C3<\/td>     <td width=\"100\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('요청일') + '<\/strong><\/td>     <td width=\"60\" valign=\"middle\" >basic_C4<\/td>   <\/tr>   <tr>     <td width=\"100\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('예상발주수량') + '<\/strong><\/td>     <td valign=\"middle\" >basic_D3<\/td>     <td width=\"100\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('접수일') + '<\/strong><\/td>     <td width=\"60\" valign=\"middle\" >basic_D4<\/td>   <\/tr>   <tr>     <th width=\"100\" valign=\"middle\" bgcolor=\"#EFEFEF\" scope=\"row\"><strong>' + Locale.getMsg('샘플유형') + '<\/strong><\/th>     <td colspan=\"3\" valign=\"middle\" >basic_E1<\/td>     <td width=\"100\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('샘플목적') + '<\/strong><\/td>     <td valign=\"middle\" >     basic_E3<\/td>     <td width=\"100\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('완료예정일') + '<\/strong><\/td>     <td width=\"60\" valign=\"middle\" >basic_E4<\/td>   <\/tr>   <tr>     <th width=\"100\" rowspan=\"2\" valign=\"middle\" bgcolor=\"#EFEFEF\" scope=\"row\"><strong>' + Locale.getMsg('배송지') + '<\/strong><\/th>     <td colspan=\"3\" rowspan=\"2\" valign=\"middle\" >basic_F1<\/td>     <td width=\"100\" rowspan=\"2\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('송장번호') + '<\/strong><\/td>     <td rowspan=\"2\" valign=\"middle\" >basic_F3<\/td>     <td width=\"100\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('배송일') + '<\/strong><\/td>     <td width=\"60\" valign=\"middle\" >basic_F4<\/td>   <\/tr>   <tr>     <td width=\"100\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('수령일') + '<\/strong><\/td>     <td width=\"60\" valign=\"middle\" >basic_G4<\/td>   <\/tr> <\/table> <h2 class=\"subTitle\">' + Locale.getMsg('샘플 자료') + '<\/h2> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">   <tr>     <th width=\"100\" bgcolor=\"#EFEFEF\" scope=\"row\">' + Locale.getMsg('첨부파일') + '<\/th>     <td>sampleAttach_A1<\/td>   <\/tr> <\/table> <h2 class=\"subTitle\">' + Locale.getMsg('샘플 상세 자료') + '<\/h2> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">   <tr>     <th width=\"100\" bgcolor=\"#EFEFEF\" scope=\"row\">' + Locale.getMsg('첨부파일') + '<\/th>     <td colspan=\"3\">sampleDAttach_A1<\/td>   <\/tr>   <tr>     <th bgcolor=\"#EFEFEF\" scope=\"row\">' + Locale.getMsg('인쇄필름번호') + '<\/th>     <td>sampleDAttach_B1<\/td>     <td width=\"70\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('Packing Info') + '<\/strong><\/td>     <td width=\"100\">sampleDAttach_B2<\/td>   <\/tr> <\/table>',
    smpPridinfo: '<br> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">   <tr>     <th width=\"15\" rowspan=\"7\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\" scope=\"row\">' + Locale.getMsg('제품정보') + '<\/th>     <td width=\"15\" rowspan=\"7\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\">' + Locale.getMsg('압출') + '<\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('구경') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_A1<\/td>     <td width=\"15\" rowspan=\"5\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\">' + Locale.getMsg('사출') + '<\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('금형') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_A2<\/td>     <td width=\"15\" rowspan=\"3\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('옵셋') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('필름 No') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_A3<\/td>     <td width=\"15\" rowspan=\"7\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('갭\/조립') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('종류') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_A4<\/td>   <\/tr>   <tr>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('겹수') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_B1<\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('유출구') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_B2<\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('도수') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_B3<\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('유출구') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_B4<\/td>   <\/tr>   <tr>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('길이') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_C1<\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('색상') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_C2<\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('코팅') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_C3<\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('외캡색상') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_C4<\/td>   <\/tr>   <tr>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('색상') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_D1<\/td>     <td rowspan=\"2\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('M\/B') + '<\/strong><\/td>     <td rowspan=\"2\" align=\"center\" valign=\"middle\">prodInfo_D2<\/td>     <td width=\"15\" rowspan=\"2\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('실크') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('필름 No') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_D3<\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('내캡색상') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_D4<\/td>   <\/tr>   <tr>     <td rowspan=\"3\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('M\/B') + '<\/strong><\/td>     <td rowspan=\"3\" align=\"center\" valign=\"middle\">prodInfo_E1<\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('도수') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_E3<\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('후가공') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_E4<\/td>   <\/tr>   <tr>     <td width=\"15\" rowspan=\"2\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\">' + Locale.getMsg('Airless') + '<\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('노출색상') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_F2<\/td>     <td width=\"15\" rowspan=\"2\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('박') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('필름 No') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_F3<\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('공급처') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_F4<\/td>   <\/tr>   <tr>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('실리콘') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_G2<\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('도수') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_G3<\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('리드실') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">prodInfo_G4<\/td>   <\/tr> <\/table> ',
    smpPump: '<br> <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">   <tr>     <th width=\"15\" rowspan=\"16\" bgcolor=\"#EFEFEF\" scope=\"row\">' + Locale.getMsg('펌프사양') + '<\/th>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('부자재명') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('규격') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('사출재질') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('사출색상') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('코팅\/증착사양') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('박인쇄') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('실크인쇄사양') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('설비번호') + '<\/strong><\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('버튼') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">pump1_1<\/td>     <td align=\"center\" valign=\"middle\">pump1_2<\/td>     <td align=\"center\" valign=\"middle\">pump1_3<\/td>     <td align=\"center\" valign=\"middle\">pump1_4<\/td>     <td align=\"center\" valign=\"middle\">pump1_5<\/td>     <td align=\"center\" valign=\"middle\">pump1_6<\/td>     <td align=\"center\" valign=\"middle\">pump1_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('버튼금속') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">pump2_1<\/td>     <td align=\"center\" valign=\"middle\">pump2_2<\/td>     <td align=\"center\" valign=\"middle\">pump2_3<\/td>     <td align=\"center\" valign=\"middle\">pump2_4<\/td>     <td align=\"center\" valign=\"middle\">pump2_5<\/td>     <td align=\"center\" valign=\"middle\">pump2_6<\/td>     <td align=\"center\" valign=\"middle\">pump2_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('스템') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">pump3_1<\/td>     <td align=\"center\" valign=\"middle\">pump3_2<\/td>     <td align=\"center\" valign=\"middle\">pump3_3<\/td>     <td align=\"center\" valign=\"middle\">pump3_4<\/td>     <td align=\"center\" valign=\"middle\">pump3_5<\/td>     <td align=\"center\" valign=\"middle\">pump3_6<\/td>     <td align=\"center\" valign=\"middle\">pump3_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('노즐') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">pump4_1<\/td>     <td align=\"center\" valign=\"middle\">pump4_2<\/td>     <td align=\"center\" valign=\"middle\">pump4_3<\/td>     <td align=\"center\" valign=\"middle\">pump4_4<\/td>     <td align=\"center\" valign=\"middle\">pump4_5<\/td>     <td align=\"center\" valign=\"middle\">pump4_6<\/td>     <td align=\"center\" valign=\"middle\">pump4_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('실린더') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">pump5_1<\/td>     <td align=\"center\" valign=\"middle\">pump5_2<\/td>     <td align=\"center\" valign=\"middle\">pump5_3<\/td>     <td align=\"center\" valign=\"middle\">pump5_4<\/td>     <td align=\"center\" valign=\"middle\">pump5_5<\/td>     <td align=\"center\" valign=\"middle\">pump5_6<\/td>     <td align=\"center\" valign=\"middle\">pump5_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('실캡') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">pump6_1<\/td>     <td align=\"center\" valign=\"middle\">pump6_2<\/td>     <td align=\"center\" valign=\"middle\">pump6_3<\/td>     <td align=\"center\" valign=\"middle\">pump6_4<\/td>     <td align=\"center\" valign=\"middle\">pump6_5<\/td>     <td align=\"center\" valign=\"middle\">pump6_6<\/td>     <td align=\"center\" valign=\"middle\">pump6_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('하우징') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">pump7_1<\/td>     <td align=\"center\" valign=\"middle\">pump7_2<\/td>     <td align=\"center\" valign=\"middle\">pump7_3<\/td>     <td align=\"center\" valign=\"middle\">pump7_4<\/td>     <td align=\"center\" valign=\"middle\">pump7_5<\/td>     <td align=\"center\" valign=\"middle\">pump7_6<\/td>     <td align=\"center\" valign=\"middle\">pump7_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('Pump Collar') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">pump8_1<\/td>     <td align=\"center\" valign=\"middle\">pump8_2<\/td>     <td align=\"center\" valign=\"middle\">pump8_3<\/td>     <td align=\"center\" valign=\"middle\">pump8_4<\/td>     <td align=\"center\" valign=\"middle\">pump8_5<\/td>     <td align=\"center\" valign=\"middle\">pump8_6<\/td>     <td align=\"center\" valign=\"middle\">pump8_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('Pump Shoulder') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">pump9_1<\/td>     <td align=\"center\" valign=\"middle\">pump9_2<\/td>     <td align=\"center\" valign=\"middle\">pump9_3<\/td>     <td align=\"center\" valign=\"middle\">pump9_4<\/td>     <td align=\"center\" valign=\"middle\">pump9_5<\/td>     <td align=\"center\" valign=\"middle\">pump9_6<\/td>     <td align=\"center\" valign=\"middle\">pump9_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('Gasket') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">pump10_1<\/td>     <td align=\"center\" valign=\"middle\">pump10_2<\/td>     <td align=\"center\" valign=\"middle\">pump10_3<\/td>     <td align=\"center\" valign=\"middle\">pump10_4<\/td>     <td align=\"center\" valign=\"middle\">pump10_5<\/td>     <td align=\"center\" valign=\"middle\">pump10_6<\/td>     <td align=\"center\" valign=\"middle\">pump10_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('체크밸브') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">pump11_1<\/td>     <td align=\"center\" valign=\"middle\">pump11_2<\/td>     <td align=\"center\" valign=\"middle\">pump11_3<\/td>     <td align=\"center\" valign=\"middle\">pump11_4<\/td>     <td align=\"center\" valign=\"middle\">pump11_5<\/td>     <td align=\"center\" valign=\"middle\">pump11_6<\/td>     <td align=\"center\" valign=\"middle\">pump11_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('Undercap') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">pump12_1<\/td>     <td align=\"center\" valign=\"middle\">pump12_2<\/td>     <td align=\"center\" valign=\"middle\">pump12_3<\/td>     <td align=\"center\" valign=\"middle\">pump12_4<\/td>     <td align=\"center\" valign=\"middle\">pump12_5<\/td>     <td align=\"center\" valign=\"middle\">pump12_6<\/td>     <td align=\"center\" valign=\"middle\">pump12_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('스프링') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">pump13_1<\/td>     <td align=\"center\" valign=\"middle\">pump13_2<\/td>     <td align=\"center\" valign=\"middle\">pump13_3<\/td>     <td align=\"center\" valign=\"middle\">pump13_4<\/td>     <td align=\"center\" valign=\"middle\">pump13_5<\/td>     <td align=\"center\" valign=\"middle\">pump13_6<\/td>     <td align=\"center\" valign=\"middle\">pump13_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('포장방법\/체결여부') + '<\/strong><\/td>     <td colspan=\"7\" align=\"center\" valign=\"middle\">pump_pkg<\/td> <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('특이사항') + '<\/strong><\/td>     <td colspan=\"7\" align=\"center\" valign=\"middle\">pump_remark<\/td><\/tr> <\/table>',
    smpBottle: '<br> <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">   <tr>     <th width=\"15\" rowspan=\"9\" bgcolor=\"#EFEFEF\" scope=\"row\">' + Locale.getMsg('용기사양') + '<\/th>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('부자재명') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('규격') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('사출재질') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('사출색상') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('코팅\/증착사양') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('박인쇄') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('실크인쇄사양') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('설비번호') + '<\/strong><\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('Shoulder') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">bottle1_1<\/td>     <td align=\"center\" valign=\"middle\">bottle1_2<\/td>     <td align=\"center\" valign=\"middle\">bottle1_3<\/td>     <td align=\"center\" valign=\"middle\">bottle1_4<\/td>     <td align=\"center\" valign=\"middle\">bottle1_5<\/td>     <td align=\"center\" valign=\"middle\">bottle1_6<\/td>     <td align=\"center\" valign=\"middle\">bottle1_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('Outer') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">bottle2_1<\/td>     <td align=\"center\" valign=\"middle\">bottle2_2<\/td>     <td align=\"center\" valign=\"middle\">bottle2_3<\/td>     <td align=\"center\" valign=\"middle\">bottle2_4<\/td>     <td align=\"center\" valign=\"middle\">bottle2_5<\/td>     <td align=\"center\" valign=\"middle\">bottle2_6<\/td>     <td align=\"center\" valign=\"middle\">bottle2_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('Inner') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">bottle3_1<\/td>     <td align=\"center\" valign=\"middle\">bottle3_2<\/td>     <td align=\"center\" valign=\"middle\">bottle3_3<\/td>     <td align=\"center\" valign=\"middle\">bottle3_4<\/td>     <td align=\"center\" valign=\"middle\">bottle3_5<\/td>     <td align=\"center\" valign=\"middle\">bottle3_6<\/td>     <td align=\"center\" valign=\"middle\">bottle3_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('피스톤') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">bottle4_1<\/td>     <td align=\"center\" valign=\"middle\">bottle4_2<\/td>     <td align=\"center\" valign=\"middle\">bottle4_3<\/td>     <td align=\"center\" valign=\"middle\">bottle4_4<\/td>     <td align=\"center\" valign=\"middle\">bottle4_5<\/td>     <td align=\"center\" valign=\"middle\">bottle4_6<\/td>     <td align=\"center\" valign=\"middle\">bottle4_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('Base') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">bottle5_1<\/td>     <td align=\"center\" valign=\"middle\">bottle5_2<\/td>     <td align=\"center\" valign=\"middle\">bottle5_3<\/td>     <td align=\"center\" valign=\"middle\">bottle5_4<\/td>     <td align=\"center\" valign=\"middle\">bottle5_5<\/td>     <td align=\"center\" valign=\"middle\">bottle5_6<\/td>     <td align=\"center\" valign=\"middle\">bottle5_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('Gasket') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">bottle6_1<\/td>     <td align=\"center\" valign=\"middle\">bottle6_2<\/td>     <td align=\"center\" valign=\"middle\">bottle6_3<\/td>     <td align=\"center\" valign=\"middle\">bottle6_4<\/td>     <td align=\"center\" valign=\"middle\">bottle6_5<\/td>     <td align=\"center\" valign=\"middle\">bottle6_6<\/td>     <td align=\"center\" valign=\"middle\">bottle6_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('포장방법\/체결여부') + '<\/strong><\/td>     <td colspan=\"7\" align=\"center\" valign=\"middle\">bottle_pkg<\/td>  <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('특이사항') + '<\/strong><\/td>     <td colspan=\"7\" align=\"center\" valign=\"middle\">bottle_remark<\/td><\/tr>  <\/table>',
    smpOvercap: '<br> <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">   <tr>     <th width=\"15\" rowspan=\"6\" bgcolor=\"#EFEFEF\" scope=\"row\">' + Locale.getMsg('오버캡') + '<\/th>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('부자재명') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('규격') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('사출재질') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('사출색상') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('코팅\/증착사양') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('박인쇄') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('실크인쇄사양') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('설비번호') + '<\/strong><\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('캡장식\/금속') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">overcap1_1<\/td>     <td align=\"center\" valign=\"middle\">overcap1_2<\/td>     <td align=\"center\" valign=\"middle\">overcap1_3<\/td>     <td align=\"center\" valign=\"middle\">overcap1_4<\/td>     <td align=\"center\" valign=\"middle\">overcap1_5<\/td>     <td align=\"center\" valign=\"middle\">overcap1_6<\/td>     <td align=\"center\" valign=\"middle\">overcap1_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('Over Cap') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">overcap2_1<\/td>     <td align=\"center\" valign=\"middle\">overcap2_2<\/td>     <td align=\"center\" valign=\"middle\">overcap2_3<\/td>     <td align=\"center\" valign=\"middle\">overcap2_4<\/td>     <td align=\"center\" valign=\"middle\">overcap2_5<\/td>     <td align=\"center\" valign=\"middle\">overcap2_6<\/td>     <td align=\"center\" valign=\"middle\">overcap2_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('Gasket') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\">overcap3_1<\/td>     <td align=\"center\" valign=\"middle\">overcap3_2<\/td>     <td align=\"center\" valign=\"middle\">overcap3_3<\/td>     <td align=\"center\" valign=\"middle\">overcap3_4<\/td>     <td align=\"center\" valign=\"middle\">overcap3_5<\/td>     <td align=\"center\" valign=\"middle\">overcap3_6<\/td>     <td align=\"center\" valign=\"middle\">overcap3_7<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('포장방법\/체결여부') + '<\/strong><\/td>     <td colspan=\"7\" align=\"center\" valign=\"middle\">overcap_pkg<\/td>   <\/tr>   <tr>     <td bgcolor=\"#EFEFEF\"><strong>' + Locale.getMsg('특이사항') + '<\/strong><\/td>     <td align=\"center\" valign=\"middle\" colspan=\"7\">overcap_remark<\/td><\/tr>  <\/table>',
    smpBottom: '<br> <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">   <tr>     <th width=\"100\" align=\"center\" valign=\"middle\" bgcolor=\"#EFEFEF\" scope=\"row\">' + Locale.getMsg('특이사항') + '<\/th>     <td>remark1<\/td>   <\/tr> <\/table> <\/body> <\/html>',
    nosmpMailBody: '<h4>다음의 사유로 인하여 작업견본이 없이 발주진행을 요청하고자 함</h4> <p><strong>1. 해당제품</strong></p> <p>가. 발주처 : custNm</p> <p>나. 발주수량:  </p> <p>다. 주문번호:  </p> <p>라. 요청내용</p> <p>&nbsp;</p> <p><strong>2. 목적</strong></p> <p>&nbsp;</p> <p><strong>3. 요청범위</strong></p> <p>BOM구성, 작업견본, 발주진행</p>' ,
    config: {
        estStep: 'Y',  
        estCateLv1: '',
        estCateLv2: '',
        estProdCode: '',
        estCateLvid: '',
        estScrny: 'KRW',
        estCrny:'1.0000',
        estRowIdx: 0,
        estQty: '100'
    },
} );

Ext.define('Ysn.Util', {

    statics: {
        YWnumberFm: function(val,pointYn){
		var numberformat = '0,000.0';
			if (pointYn == false) numberformat = '0,000'; 
			return Ext.util.Format.number(parseFloat(val)/1000000,numberformat);
		},
		YWminusFm: function(val1,val2){	
			var numberformat = '0,000.0'; 		
			return Ext.util.Format.number((parseFloat(val1)-parseFloat(val2))/1000000,numberformat);
		},
		YWpercentFm: function(val1,val2){
			var numberformat = '0,000.0'; 
			if (parseFloat(val2) == 0){
				return '0.0%';
			}else{
				return Ext.util.Format.number(parseFloat(val1)*100/parseFloat(val2),numberformat)+'%';
			}
		},
		YWvspercentFm: function(val1,val2){
			var numberformat = '0,000.0'; 
			return Ext.util.Format.number((parseFloat(val1)-parseFloat(val2))*100/parseFloat(val2),numberformat)+'%';
		},
        changeDec: function (value) {
        return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        changeDbl: function (value) {
            return Ext.util.Format.number(parseFloat(value), '0,000.00');
        },
        YWpercentFm2: function (val1, val2) {
            var numberformat = '0,000.0';
            if (parseFloat(val2) == 0) {
                return '';
            } else {
                return Ext.util.Format.number(parseFloat(val1) * 100 / parseFloat(val2), numberformat);
            }
            
        },
        YWnumberFm2: function (val,rateVal) {
            var numberformat = '0,000.0';
            if (val == null) {
                return '0.0';
            }else{
                return Ext.util.Format.number(parseFloat(val) / rateVal, numberformat);
            }
        },
        YWminusFm2: function (val1, val2, rateVal) {
            var numberformat = '0,000.0';
            return Ext.util.Format.number((parseFloat(val1) - parseFloat(val2)) / rateVal, numberformat);
        },
        YWCompare: function (val1, val2) {
            var bg = parseFloat(val1) - parseFloat(val2);
            if (bg < 0) {
                return 'icons_down';
            } else {
                return 'icons_up';
            } 
        },
        fmCrny: function (val, rateval) {
            return Ext.util.Format.number(parseFloat(val)/rateval, '0,000.0');
        }, 
		cbEmptyVal: function(el){
			var cbs = el.query('combobox');
		    for(var i=0;i<cbs.length;i++){
				if(cbs[i].getValue() == cbs[i].emptyText) {
					cbs[i].setValue('');
				}
			}
		},
		chkDept: function (bizgrpYn) {
		    var value;
		    if(auth_id == 'A001' || sa_dept_yn == 'N') {
		        value = '';
		    }else{
		        if (dept_level == '3') {
		            if (bizgrpYn == 'Y') {
		                value = dept_cd;
		            } else {
		                value = '';
		            }
		        } else {
		            if (bizgrpYn == true) {
		                value = up_dept_cd;
		            } else {
		                value = dept_cd;
		            }
		        }
		    }
		    return value;
		},
		chkDstr: function () {
		    var value;
		    if(auth_id == 'A001' || sa_dept_yn == 'N') {
		        value = '';
		    }else{
		         value = dstr_chn;
		    }
		    return value;
		},
		ComboRenderer : function(val, metaData){
		    var combo = metaData.column.getEditor();
		    if(val && combo && combo.store && combo.displayField){
		        var index = combo.store.findExact(combo.valueField, val);
		        if(index >= 0){
		            return combo.store.getAt(index).get(combo.displayField);
		        }
		    }
		    return val;
		},
		OnsessOut: function (rtext) {
		    var dataVal = Ext.JSON.decode(rtext);
		    if (dataVal.success == false) {
		        if (dataVal.errmsg == 'SessionOut') {
		            Ext.MessageBox.alert('Warning', 'login Session Out!!', function () { location.href = 'index.aspx'; return true; });
		            return false;
		        }
		    }else{
				return true;
			}
		}
    }
});

   

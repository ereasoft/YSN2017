///<reference path="~/Client/ext/build/ext-all-debug.js">
///<reference path="~/Client/ext/build/ext-debug.js">
Ext.define('Ysn.view.samplerequest.reviewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.samplerequest-review',
	requires: [ 
	    'Ysn.store.*'
    ],
    init: function() {
        this.lookupReference('reviewSearch').setTitle(pageTitle);
		if(Ext.getCmp('chkpopup').getValue()){ 
			Ext.getCmp('samplerequest-review').down('#east').setVisible(false);			
		} 
		Ext.getCmp('reviewDetail').down('#muiltFileBox2').down('#AttachFileList').down('#delbtn').hide();
		Ext.getCmp('reviewDetail').down('#muiltFileBox2').down('#AttachBtn').hide(); 
		Ext.getCmp('reviewDetail').down('#muiltFileBox1').down('#AttachFileList').down('#delbtn').hide();
		Ext.getCmp('reviewDetail').down('#muiltFileBox1').down('#AttachBtn').hide();

		this.lookupReference('muiltFile1').down('#paentFrm').setValue('reviewDetail');
		this.lookupReference('muiltFile1').down('#childFrm').setValue('#muiltFileBox1');
		this.lookupReference('muiltFile1').down('#doc_mgt').setValue('sample');
		this.lookupReference('reviewDetail').down('#muiltFileBox1').down('#paentFrm').setValue('samplerequest-review');
		this.lookupReference('reviewDetail').down('#muiltFileBox1').down('#childFrm').setValue('#muiltFile1');
		this.lookupReference('muiltFile2').down('#paentFrm').setValue('reviewDetail');
		this.lookupReference('muiltFile2').down('#childFrm').setValue('#muiltFileBox2');
		this.lookupReference('muiltFile2').down('#doc_mgt').setValue('sampleDec');
		this.lookupReference('reviewDetail').down('#muiltFileBox2').down('#paentFrm').setValue('samplerequest-review');
		this.lookupReference('reviewDetail').down('#muiltFileBox2').down('#childFrm').setValue('#muiltFile2');
	},
	itemclick: function(view, record, index, e) { 
		if(Ext.getCmp('chkpopup').getValue()){
            openPopupView('샘플검토','samplerequest-reviewDetail',record.get('SMR_CD'),'SampleRequest|sampleRequestView|smr_cd|smr_chasu|'+record.get('SMR_CHASU')); 
		}else{
           // if (Ext.getCmp('samplerequest-review').down('#east').collapsed) Ext.getCmp('samplerequest-review').down('#east').toggleCollapse(); 
			Ext.getCmp('reviewDetail').load({
				url: '/SampleRequest/sampleRequestView?smr_cd='+record.get('SMR_CD')+'&smr_chasu='+record.get('SMR_CHASU'), //,
				waitMsg: 'loading...',
				success: function(form, action) { 
                    if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
					var dataVal = Ext.JSON.decode(action.response.responseText);
					var pl = Ext.getCmp('reviewDetail')
					var pumpPartList = dataVal.PUMP_PART_LIST;
					for(var i=0;i<pumpPartList.length;i++){
						pl.down('#pump_id'+i).setValue(pumpPartList[i].CODE_ID); 
						pl.down('#pump_code'+i).setValue(pumpPartList[i].SMR_CODE); 
						pl.down('#pump_material'+i).setValue(pumpPartList[i].SMR_MATERIAL); 
						pl.down('#pump_inject'+i).setValue(pumpPartList[i].SMR_INJECT); 
						pl.down('#pump_coat'+i).setValue(pumpPartList[i].SMR_COAT); 
						pl.down('#pump_hstmpc'+i).setValue(pumpPartList[i].SMR_HSTMPC); 
						pl.down('#pump_ss'+i).setValue(pumpPartList[i].SMR_SS); 
						pl.down('#pump_moldno'+i).setValue(pumpPartList[i].SMR_MOLDNO); 
					} 
                    pl.down('#pump_pkg').setValue(dataVal.PUMP_PKG.CMT)
					pl.down('#pump_rmt').setValue(dataVal.PUMP_REMARK_CMT.CMT) 

					var bottlePartList = dataVal.BOTTLE_PART_LIST;
					for(var i=0;i<bottlePartList.length;i++){
						pl.down('#bottle_id'+i).setValue(bottlePartList[i].CODE_ID); 
						pl.down('#bottle_code'+i).setValue(bottlePartList[i].SMR_CODE); 
						pl.down('#bottle_material'+i).setValue(bottlePartList[i].SMR_MATERIAL); 
						pl.down('#bottle_inject'+i).setValue(bottlePartList[i].SMR_INJECT); 
						pl.down('#bottle_coat'+i).setValue(bottlePartList[i].SMR_COAT); 
						pl.down('#bottle_hstmpc'+i).setValue(bottlePartList[i].SMR_HSTMPC); 
						pl.down('#bottle_ss'+i).setValue(bottlePartList[i].SMR_SS); 
						pl.down('#bottle_moldno'+i).setValue(bottlePartList[i].SMR_MOLDNO); 
					} 
                    pl.down('#bottle_pkg').setValue(dataVal.BOTTLE_PKG.CMT);
					pl.down('#bottle_rmt').setValue(dataVal.BOTTLE_REMARK_CMT.CMT);  

					var overcapPartList = dataVal.OVERCAP_PART_LIST;
					for(var i=0;i<overcapPartList.length;i++){
						pl.down('#overcap_id'+i).setValue(overcapPartList[i].CODE_ID); 
						pl.down('#overcap_code'+i).setValue(overcapPartList[i].SMR_CODE); 
						pl.down('#overcap_material'+i).setValue(overcapPartList[i].SMR_MATERIAL); 
						pl.down('#overcap_inject'+i).setValue(overcapPartList[i].SMR_INJECT); 
						pl.down('#overcap_coat'+i).setValue(overcapPartList[i].SMR_COAT); 
						pl.down('#overcap_hstmpc'+i).setValue(overcapPartList[i].SMR_HSTMPC); 
						pl.down('#overcap_ss'+i).setValue(overcapPartList[i].SMR_SS); 
						pl.down('#overcap_moldno'+i).setValue(overcapPartList[i].SMR_MOLDNO); 
					} 
                    pl.down('#overcap_pkg').setValue(dataVal.OVERCAP_PKG.CMT);
					pl.down('#overcap_rmt').setValue(dataVal.OVERCAP_REMARK_CMT.CMT);
					
					var prdInfo = dataVal.PRD_INFO;		
					form.findField('extr_diameter').setValue(prdInfo.EXTR_DIAMETER); 
					form.findField('neck_mold').setValue(prdInfo.NECK_MOLD); 
					form.findField('extr_diameter').setValue(prdInfo.EXTR_DIAMETER);
					form.findField('neck_mold').setValue(prdInfo.NECK_MOLD);
					form.findField('offset_filmno').setValue(prdInfo.OFFSET_FILMNO);
					form.findField('cap_spec').setValue(prdInfo.CAP_SPEC);
					form.findField('extr_layer').setValue(prdInfo.EXTR_LAYER);
					form.findField('neck_orifice').setValue(prdInfo.NECK_ORIFICE);
					form.findField('offset_pass').setValue(prdInfo.OFFSET_PASS);
					form.findField('cap_orifice').setValue(prdInfo.CAP_ORIFICE);;
					form.findField('extr_length').setValue(prdInfo.EXTR_LENGTH);
					form.findField('neck_color').setValue(prdInfo.NECK_COLOR);
					form.findField('offset_coating').setValue(prdInfo.OFFSET_COATING);
					form.findField('cap_outercolor').setValue(prdInfo.CAP_OUTERCOLOR);
					form.findField('extr_color').setValue(prdInfo.EXTR_COLOR);
					form.findField('neck_mb').setValue(prdInfo.NECK_MB);
					form.findField('ss_filmno').setValue(prdInfo.SS_FILMNO);
					form.findField('cap_innercolor').setValue(prdInfo.CAP_INNERCOLOR);;
					form.findField('extr_mb').setValue(prdInfo.EXTR_MB);
					form.findField('ss_pass').setValue(prdInfo.SS_PASS);;
					form.findField('cap_deco').setValue(prdInfo.CAP_DECO);
					form.findField('arls_color').setValue(prdInfo.ARLS_COLOR);
					form.findField('hs_filmno').setValue(prdInfo.HS_FILMNO);
					form.findField('cap_supplier').setValue(prdInfo.CAP_SUPPLIER);
					form.findField('arls_silicon').setValue(prdInfo.ARLS_SILICON);
					form.findField('hs_pass').setValue(prdInfo.HS_PASS);
					form.findField('cap_safetyseal').setValue(prdInfo.CAP_SAFETYSEAL);

					var reqDetail = dataVal.REQ_DETAIL;
					form.findField('euser_nm').setValue(reqDetail.EUSER_NM);
					form.findField('smr_cd').setValue(reqDetail.SMR_CD);
					form.findField('euser_cd').setValue(reqDetail.EUSER_CD);
					form.findField('qruser_nm').setValue(reqDetail.QRUSER_NM);
					form.findField('qruser_cd').setValue(reqDetail.QRUSER_CD);
					form.findField('smr_crdate').setValue(reqDetail.SMR_CRDATE);
					form.findField('smr_chasu').setValue(reqDetail.SMR_CHASU);
					form.findField('rruser_nm').setValue(reqDetail.RRUSER_NM);
					form.findField('smr_podate').setValue(reqDetail.SMR_PODATE);
					form.findField('item_nm').setValue(reqDetail.ITEM_NM);
					form.findField('item_cd').setValue(reqDetail.ITEM_CD);
					form.findField('smp_rqty').setValue(reqDetail.SMP_RQTY);
					form.findField('smp_status').setValue(reqDetail.SMP_STATUS);
					form.findField('smp_status_nm').setValue(reqDetail.SMP_STATUS_NM);
					form.findField('smr_rqdate').setValue(reqDetail.SMR_RQDATE);
					form.findField('pur_oqty').setValue(reqDetail.PUR_OQTY);
					form.findField('smr_rrdate').setValue(reqDetail.SMR_RRDATE);
					form.findField('smr_type').setValue(reqDetail.SMR_TYPE);
					form.findField('purp_color').setValue(reqDetail.PURP_COLOR);
					form.findField('purp_test').setValue(reqDetail.PURP_TEST);
					form.findField('prdt_pdate').setValue(reqDetail.PRDT_PDATE);
					form.findField('ship_to_adrs').setValue(reqDetail.SHIP_TO_ADRS);
					form.findField('tracking_num').setValue(reqDetail.TRACKING_NUM);
					form.findField('ship_pdate').setValue(reqDetail.SHIP_PDATE);
					form.findField('smr_prdate').setValue(reqDetail.SMR_PRDATE);
					form.findField('smr_orderdate').setValue(reqDetail.SMR_ORDERDATE); 
					form.findField('project_poss').setValue(reqDetail.PROJECT_POSS);
					form.findField('rruser_cd').setValue(reqDetail.RRUSER_CD);
					form.findField('remark_cmt').setValue(reqDetail.REMARK_CMT);
					form.findField('artwork_no').setValue(reqDetail.ARTWORK_NO);
					form.findField('packing_info').setValue(reqDetail.PACKING_INFO);

					form.findField('req_return_yn').setValue(reqDetail.REQ_RETURN_YN);
					form.findField('req_review_yn').setValue(reqDetail.REQ_REVIEW_YN);
					form.findField('req_repair_yn').setValue(reqDetail.REQ_REPAIR_YN);
					form.findField('drop_yn').setValue(reqDetail.DROP_YN);
					form.findField('max_chasu').setValue(reqDetail.MAX_CHASU);
					form.findField('smr_comment').setValue(reqDetail.SMR_COMMENT);
					form.findField('specchk_cnt').setValue(reqDetail.SPECCHK_CNT);
					form.findField('spec_yn').setValue(reqDetail.SPEC_YN);
					form.findField('smp_cd').setValue(reqDetail.SMP_CD);
					form.findField('smp_chasu').setValue(reqDetail.SMP_CHASU);


					(reqDetail.REQ_RETURN_YN == 'Y') ? pl.down('#fbtn1').show() : pl.down('#fbtn1').hide();
					(reqDetail.REQ_REVIEW_YN == 'Y') ? pl.down('#fbtn2').show() : pl.down('#fbtn2').hide();
					(reqDetail.REQ_REPAIR_YN == 'Y') ? pl.down('#fbtn4').show() : pl.down('#fbtn4').hide();
					(reqDetail.DROP_YN == 'Y') ? pl.down('#fbtn3').show() : pl.down('#fbtn3').hide();
					(reqDetail.SPEC_YN == 'Y') ? pl.down('#fbtn5').show() : pl.down('#fbtn5').hide();

					pl.down('#muiltFileBox1').down('#AttachFileList').getStore().load({
					    params: {
					        biz_gubun: reqDetail.SMR_CD,
					        doc_mgt: 'sample',
					        chasu: reqDetail.SMR_CHASU
					    }
					});

					pl.down('#muiltFileBox2').down('#AttachFileList').getStore().load({
					    params: {
					        biz_gubun: reqDetail.SMR_CD,
					        doc_mgt: 'sampleDec',
					        chasu: reqDetail.SMR_CHASU
					    }
					});
					setTimeout(function () {
					    pl.body.dom.scrollTop = 0;
					    pl.body.dom.scrollLeft = 0;
					    for (var i = 0; i < pl.items.items.length; i++) {
					        pl.items.items[i].body.dom.scrollTop = 0;
					        pl.items.items[i].body.dom.scrollLeft = 0;
					    }
					}, 500);
				}
			}); 
		}
		Ext.getCmp('reviewDetail').getForm().findField('addchk').setValue('modify');
		var task = new Ext.util.DelayedTask(function () {
		    Ext.getCmp('samplerequest-review').down('#east').toggleCollapse();
		});
		if (Ext.getCmp('samplerequest-review').down('#east').collapsed) task.delay(1000);
		//Ext.getCmp('productinquiryinquiry').down('#east').show();

		/*Ext.getStore('inquiryDetail').load({
			params:{cust_cd:record.get('CUST_CD')},
			callback : function(records, operation, success){ 
				//console.log(records);	//root프로퍼티에 지정된데이터 
			    //console.log(operation.getProxy().getReader().rawData);	//리턴된 json 데이터전체 
				//console.log(success);	//success 프로퍼티에 지정된 데이터 }
				console.log(Ext.getStore('inquiryDetail').getAt(0));	//success 프로퍼티에 지정된 데이터 }
                Ext.getCmp('inquiryDetail').loadRecord(Ext.getStore('inquiryDetail').getAt(0));  
			}
		}); */
	},
	frmClear: function(){
	    Ext.getCmp('reviewDetail').getForm().reset();
	    Ext.getCmp('reviewDetail').down('#muiltFileBox1').down('#paentFrm').setValue('samplerequest-review');
	    Ext.getCmp('reviewDetail').down('#muiltFileBox1').down('#childFrm').setValue('#muiltFile1');
	    Ext.getCmp('reviewDetail').down('#muiltFileBox2').down('#paentFrm').setValue('samplerequest-review');
	    Ext.getCmp('reviewDetail').down('#muiltFileBox2').down('#childFrm').setValue('#muiltFile2');
		Ext.getCmp('reviewDetail').getForm().findField('addchk').setValue('add');
		Ext.getCmp('reviewDetail').down('#east').toggleCollapse();
		Ext.getCmp('requestDetail').down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
		Ext.getCmp('requestDetail').down('#muiltFileBox2').down('#AttachFileList').getStore().removeAll();
	},
	xlsExport: function(){  

		Ext.getCmp('reviewList').saveDocumentAs({ 
			headerRowCnt: 1,
            type:       'xlsx',
            title:      Ext.getCmp('review-search').getTitle(),
            fileName:   '샘플검토' 
		});
	} 
});

Ext.define('Ysn.view.samplerequest.reviewsearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.review-search',
	init: function() {
	    this.lookupReference('dstr_chn').store.load({ params: { up_code_id: 'DSTR_TYPE', lang: localeCd } });
	    this.lookupReference('dstr_chn').setValue(Ysn.Util.chkDstr());
     this.lookupReference('smp_status').store.load({ params: { up_code_id: 'SMP_STATUS', lang: localeCd, mode: 'V' } });
     this.lookupReference('smp_status').setValue(''); 
	 var Today = new Date();
	 this.lookupReference('sdate').setValue(Today.getFullYear()+'-'+('0'+(Today.getMonth()+1)).slice(-2)+'-'+'01');
	 if(auth_id != 'A001'){
	   //  this.lookupReference('dstr_chn').setConfig({ 'readOnly': true });
	 }
	},
	openWindow: function(){
        var win = Ext.getCmp('commonSearchcustomer');
        if(!win){
          win = new Ysn.view.common.searchcustomer();
		}
		var hidfield = win.query('#paentFrm')[0];
        win.down('#cust_nm').setValue(this.lookupReference('cust_nm').getValue());
		hidfield.setValue('review-search');
		Ext.getCmp('samplerequest-review').add(win);
		win.setPosition(10,-100);
		win.show();
	},
    resetVal: function(){
		this.lookupReference('cust_nm').setValue('');
		this.lookupReference('cust_cd').setValue('');
	},
	onChangeBiz: function(el,newVal,oldVal,e){
	    var userCombo = this.lookupReference('userGroup');
	    if (newVal != '') {
	        userCombo.store.load({ params: { dstr_chn: newVal } });

	    } else {
	        userCombo.store.insert(0, { USER_CD: '', USER_NM: Locale.getMsg('전체') });
	    }
	    userCombo.setValue('');
	    userCombo.doQuery();
	    el.focus();

	}, 
	onSubmitClick: function() {
		    //console.log(Ext.getCmp('productinquiryinquiry'));
			Ext.getCmp('reviewDetail').getForm().reset();
			Ext.getCmp('reviewDetail').down('#muiltFileBox1').down('#paentFrm').setValue('samplerequest-review');
			Ext.getCmp('reviewDetail').down('#muiltFileBox1').down('#childFrm').setValue('#muiltFile1');
			Ext.getCmp('reviewDetail').down('#muiltFileBox2').down('#paentFrm').setValue('samplerequest-review');
			Ext.getCmp('reviewDetail').down('#muiltFileBox2').down('#childFrm').setValue('#muiltFile2');
			Ext.getCmp('reviewDetail').getForm().findField('addchk').setValue('add'); 
			Ext.getCmp('reviewDetail').down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
			Ext.getCmp('reviewDetail').down('#muiltFileBox2').down('#AttachFileList').getStore().removeAll();
			Ext.getCmp('reviewDetail').down('#fbtn1').hide(); 
			Ext.getCmp('reviewDetail').down('#fbtn2').hide(); 
			Ext.getCmp('reviewDetail').down('#fbtn3').hide(); 
			Ext.getCmp('reviewDetail').down('#fbtn4').hide(); 
			Ext.getCmp('reviewDetail').down('#fbtn5').hide(); 
			Ext.getStore('sampleReviewList').load(
					{
					    params: {
					            dstr_chn: this.lookupReference('dstr_chn').getValue(),
								item_nm   : this.lookupReference('item_nm').getValue(),
								userGroup   : this.lookupReference('userGroup').getValue(),
								cust_cd   : this.lookupReference('cust_cd').getValue(),
								smp_status   : this.lookupReference('smp_status').getValue(),
								sdate    : Ext.Date.format(this.lookupReference('sdate').getValue(),'Y-m-d'),
								edate: Ext.Date.format(this.lookupReference('edate').getValue(),'Y-m-d'),
				                mode: 'V'
		            }}
		);
	}


});

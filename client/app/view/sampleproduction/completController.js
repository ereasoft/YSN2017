///<reference path="~/Client/ext/build/ext-all-debug.js">
///<reference path="~/Client/ext/build/ext-debug.js">
Ext.define('Ysn.view.sampleproduction.completController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sampleproduction-complet',
	requires: [ 
	    'Ysn.store.*'
    ],
    init: function() {
        this.lookupReference('completSearch').setTitle(pageTitle);
		if(Ext.getCmp('chkpopup').getValue()){ 
			Ext.getCmp('sampleproduction-complet').down('#east').setVisible(false);			
		} 
		Ext.getCmp('completDetail').down('#muiltFileBox1').down('#AttachFileList').down('#delbtn').hide();
		Ext.getCmp('completDetail').down('#muiltFileBox1').down('#AttachBtn').hide();

		Ext.getCmp('completDetail').down('#muiltFileBox2').down('#AttachFileList').down('#delbtn').show();
		Ext.getCmp('completDetail').down('#muiltFileBox2').down('#AttachBtn').show();

		Ext.getCmp('completDetail').down('#muiltFileBox3').down('#AttachFileList').down('#delbtn').hide();
		Ext.getCmp('completDetail').down('#muiltFileBox3').down('#AttachBtn').hide();

		this.lookupReference('muiltFile1').down('#paentFrm').setValue('completDetail');
		this.lookupReference('muiltFile1').down('#childFrm').setValue('#muiltFileBox2');
		this.lookupReference('muiltFile1').down('#doc_mgt').setValue('makeing');
		this.lookupReference('completDetail').down('#muiltFileBox2').down('#paentFrm').setValue('sampleproduction-complet');
		this.lookupReference('completDetail').down('#muiltFileBox2').down('#childFrm').setValue('#muiltFile1');

	},
	itemclick: function(view, record, index, e) { 
		if(Ext.getCmp('chkpopup').getValue()){
            openPopupView('샘플제작완료','sampleproduction-completDetail',record.get('SMP_CD'),'SampleManage|selectSampleDetail|smp_cd|smp_chasu|'+record.get('SMP_CHASU')); 
		}else{
			//if (Ext.getCmp('sampleproduction-complet').down('#east').collapsed) Ext.getCmp('sampleproduction-complet').down('#east').toggleCollapse(); 
			var Pl = Ext.getCmp('completDetail');
			Pl.load({
				url: '/SampleManage/selectSampleDetail?smp_cd='+record.get('SMP_CD')+'&smp_chasu='+record.get('SMP_CHASU'), //,
				waitMsg: 'loading...',
				success: function(form, action) {
				    if (!Ysn.Util.OnsessOut(action.response.responseText)) return false;
				    var Pl = Ext.getCmp('completDetail');
				    if(record.get('SMP_STATUS') == 'SMSTAT_400'){
				        Pl.down('#btn1').hide();
				        Pl.down('#btn2').show();
				        Pl.down('#btn3').show();
				        Pl.down('#btn4').show();
				        Pl.down('#btn5').show();
				    }else if(record.get('SMP_STATUS') == 'SMSTAT_500'){
				        if (record.get('SMP_TYPE') == 'SMPTP_300') {
				            Pl.down('#btn1').hide();
				            Pl.down('#btn2').hide();
				            Pl.down('#btn3').hide();
				            Pl.down('#btn4').hide();
				        }else{
				            Pl.down('#btn1').show();
				            Pl.down('#btn2').hide();
				            Pl.down('#btn3').hide();
				            Pl.down('#btn4').hide();
				        }
				    }else if(record.get('SMP_STATUS') != ''){
				        Pl.down('#btn1').hide();
				        Pl.down('#btn2').hide();
				        Pl.down('#btn3').hide();
				        Pl.down('#btn4').hide();
				    }
				    Pl.body.dom.scrollTop = 0;
				    Pl.body.dom.scrollLeft = 0;
				    for (var i = 0; i < Pl.items.items.length; i++) {
				        Pl.items.items[i].body.dom.scrollTop = 0;
				        Pl.items.items[i].body.dom.scrollLeft = 0;
				    }
				}	
			}); 
		}
		Pl.getForm().findField('addchk').setValue('modify');
		
		Pl.down('#muiltFileBox1').down('#AttachFileList').getStore().load({
		    params: {
		        biz_gubun: record.get('SMP_CD'),
		        doc_mgt: '',
		        chasu: record.get('SMP_CHASU')
		    }
		});

		Pl.down('#muiltFileBox2').down('#AttachFileList').getStore().load({
		    params: {
		        biz_gubun: record.get('SMP_CD'),
		        doc_mgt: 'makeing',
		        chasu: record.get('SMP_CHASU')
		    }
		});

		Pl.down('#muiltFileBox3').down('#AttachFileList').getStore().load({
		    params: {
		        biz_gubun: record.get('SMR_CD'),
		        doc_mgt: 'sampleDec',
		        chasu: record.get('SMR_CHASU')
		    }
		});

		var task = new Ext.util.DelayedTask(function () {
		    Ext.getCmp('sampleproduction-complet').down('#east').toggleCollapse();
		});
		if (Ext.getCmp('sampleproduction-complet').down('#east').collapsed) task.delay(1000);
		 
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
	    Ext.getCmp('completDetail').getForm().reset();
	    Frm.reset();

		Ext.getCmp('completDetail').getForm().findField('addchk').setValue('add');
		Ext.getCmp('completDetail').down('#east').toggleCollapse();
	},
	xlsExport: function(){  

		Ext.getCmp('completList').saveDocumentAs({ 
			headerRowCnt: 1,
            type:       'xlsx',
            title:      Ext.getCmp('complet-search').getTitle(),
            fileName:   '샘플제작완료' 
		});
	},
	batchCommit: function () {
	    var selRecs = Ext.getCmp('completList').getSelectionModel().getSelection();
	    var smp_cd = '';
	    var smp_chasu = '';
		var muser_cd = '';
		var smp_type = '';
	    for (var i = 0; i < selRecs.length; i++) {

	        var split = '';
	        if (i < (selRecs.length - 1)) {
	            split = '|'
	        }
	        smp_cd = smp_cd + selRecs[i].data.SMP_CD + split;
	        smp_chasu = smp_chasu + selRecs[i].data.SMP_CHASU + split;
			muser_cd = muser_cd + selRecs[i].data.MUSER_CD + split;
			smp_type = smp_type + selRecs[i].data.SMP_TYPE + split;
	    }

	    Ext.Ajax.request({
	        url: '/SampleManage/smpAllCommit',
	        method: 'POST',
	        params: {
	            smp_cd: smp_cd, smp_chasu: smp_chasu, smp_type: smp_type, muser_cd: muser_cd, state: 'FILM_RECEIPT'
	        },
	        success: function (action) {
                if(!Ysn.Util.OnsessOut(action.responseText)) return false; 
	            Ext.Msg.alert(Locale.getMsg('처리상태'), '일괄사양확정완료');
	            Ext.getCmp('completList').getStore().reload();
	            Ext.getCmp('completDetail').getForm().reset();
	        },
	        failure: function (action) {
	            var dataVal = Ext.decode(action.responseText)
	            Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.'); 
	        }
	    });


	},
    batchCommit2: function () {
	    var selRecs = Ext.getCmp('completList').getSelectionModel().getSelection();
	    var smp_cd = '';
	    var smp_chasu = '';
		var muser_cd = '';
		var smp_type = '';
		var smp_qty = '';
	    for (var i = 0; i < selRecs.length; i++) {
	        if (selRecs[i].data.FILM_RDATE == null) {
	            Ext.Msg.alert('Failed', '사양확정되지 않는 건이 있습니다. ');
	            return false;
	        }
	        var split = '';
	        if (i < (selRecs.length - 1)) {
	            split = '|'
	        }
	        smp_cd = smp_cd + selRecs[i].data.SMP_CD + split;
	        smp_chasu = smp_chasu + selRecs[i].data.SMP_CHASU + split;
			muser_cd = muser_cd + selRecs[i].data.MUSER_CD + split;
			smp_type = smp_type + selRecs[i].data.SMP_TYPE + split;
			smp_qty = smp_qty + (parseInt(selRecs[i].data.SMP_RQTY) + parseInt(selRecs[i].data.SMP_RQTY2)) + split;
	    }

	    Ext.Ajax.request({
	        url: '/SampleManage/smpAllCommit',
	        method: 'POST',
	        params: {
	            smp_cd: smp_cd, smp_chasu: smp_chasu, smp_type: smp_type, muser_cd: muser_cd, smp_qty:smp_qty, state: 'COMPLETE'
	        },
	        success: function (action) {
                if(!Ysn.Util.OnsessOut(action.responseText)) return false; 
	            Ext.Msg.alert(Locale.getMsg('처리상태'), '일괄제작완료');
	            Ext.getCmp('completList').getStore().reload();
	            Ext.getCmp('completDetail').getForm().reset();
	        },
	        failure: function (action) {
	            var dataVal = Ext.decode(action.responseText)
	            Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.'); 
	        }
	    });


	}
});

Ext.define('Ysn.view.sampleproduction.completsearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.complet-search',
	init: function() {
	 this.lookupReference('bizGroup').store.load(); 
	 this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true));
	 this.lookupReference('smp_status').store.load({ params: { up_code_id: 'SMP_STATUS', lang: localeCd, value_1: 'Y' } });
	 this.lookupReference('smp_status').setValue('');
	 this.lookupReference('dstr_type').store.load({params:{up_code_id:'DSTR_TYPE', lang: localeCd}});
	 this.lookupReference('biz_type').store.load({params:{up_code_id:'BIZ_TYPE', lang: localeCd}});
	 this.lookupReference('item_type').store.load({ params: { up_code_id: 'ITEM_TYPE', lang: localeCd } });
	 this.lookupReference('smp_type').store.load({ params: { up_code_id: 'SMP_TYPE', lang: localeCd } });
	 this.lookupReference('smp_type').setValue('');
	 this.lookupReference('prdt_psblt').store.load({params:{up_code_id:'PRDT_PSBLT', lang: localeCd}}); 
     this.lookupReference('dstr_type').setValue(''); 	 
     this.lookupReference('biz_type').setValue(''); 	 
     this.lookupReference('item_type').setValue(''); 	 
     this.lookupReference('prdt_psblt').setValue('');
     this.lookupReference('process').store.load({ params: { up_code_id: 'SMP_STEP', lang: localeCd } });
     this.lookupReference('process').setValue('');
	 if(auth_id != 'A001'){
	//	 this.lookupReference('bizGroup').setConfig({'readOnly':true});
	//	 if(dept_level == '4') this.lookupReference('deptGroup').setConfig({'readOnly':true});
	 }

	 var Today = new Date();
	 this.lookupReference('sdate').setValue(Today.getFullYear()+'-'+('0'+(Today.getMonth()+1)).slice(-2)+'-'+'01');
	},
	openWindow: function(){
       var win = Ext.getCmp('commonSearchcustomer');
        if(!win){
          win = new Ysn.view.common.searchcustomer();
		}
		var hidfield = win.query('#paentFrm')[0];
		win.down('#cust_nm').setValue(this.lookupReference('cust_nm').getValue());
		hidfield.setValue('complet-search');
		Ext.getCmp('sampleproduction-complet').add(win);
		win.setPosition(10,-100);
		win.show();
	},
    resetVal: function(){
		this.lookupReference('cust_nm').setValue('');
		this.lookupReference('cust_cd').setValue('');
	},
	openWindow2: function(){
       var win2 = Ext.getCmp('commonSearchEndUser');
        if(!win2){
          win2 = new Ysn.view.common.searchEndUser();
		}
		var hidfield = win2.query('#paentFrm')[0];
		    win2.down('#euser_nm').setValue(this.lookupReference('euser_nm').getValue());
		hidfield.setValue('complet-search');
		Ext.getCmp('sampleproduction-complet').add(win2);
		win2.setPosition(10,-100);
		win2.show();
	},
    resetVal2: function(){
		this.lookupReference('euser_nm').setValue('');
		this.lookupReference('euser_cd').setValue('');
	},
	onChangeBiz: function(el,newVal,oldVal,e){
        var deptCombo = this.lookupReference('deptGroup'); 
        var userCombo = this.lookupReference('userGroup');
        if (newVal != '') {
            deptCombo.store.load({params:{up_dept_cd:newVal}}); 
				 
        } else {
            deptCombo.setValue('');
            userCombo.setValue('');
            deptCombo.store.removeAll();
            userCombo.store.removeAll();
            deptCombo.store.insert(0, {DEPT_CD: '',DEPT_NM: Locale.getMsg('전체')}); 
            userCombo.store.insert(0, {USER_CD: '',USER_NM: Locale.getMsg('전체')}); 				
        }
        if (newVal != '') {
            deptCombo.setValue(Ysn.Util.chkDept(false)); 
        } 
		deptCombo.doQuery();
		userCombo.setValue('');
		userCombo.doQuery(); 
		el.focus();

	},
	onChangeDept: function(el,newVal,oldVal,e){
		var userCombo = this.lookupReference('userGroup');
		if (newVal != '' && newVal != null) {
		userCombo.store.load({params:{dept_cd:newVal,up_dept_cd:this.lookupReference('bizGroup').getValue()}});
		} else {
		    userCombo.store.removeAll();
		}
		userCombo.setValue('');
		userCombo.doQuery(); 
		el.focus();
		//userCombo.focus();

	},
	onSubmitClick: function() {
		    //console.log(Ext.getCmp('productinquiryinquiry'));
			var muser_cd = this.lookupReference('muser_cd').getValue();
			if (muser_cd == 'Sysadmin' )  muser_cd = '';
			var Pl = Ext.getCmp('completDetail');
			var Frm = Pl.getForm(); 
			Frm.reset(); 
			Pl.down('#muiltFileBox2').down('#paentFrm').setValue('sampleproduction-complet');
		    Pl.down('#muiltFileBox2').down('#childFrm').setValue('#muiltFile1');
			Pl.down('#btn1').hide(); 		
			Pl.down('#btn2').hide();
			Pl.down('#btn3').hide(); 
			Pl.down('#btn4').hide(); 
			Pl.down('#btn5').hide(); 
			Pl.down('#rtnbtn1').hide();
			Pl.down('#rtnbtn2').hide();
			Pl.down('#rtnbtn3').hide();
			Pl.down('#rtnbtn4').hide();
			Pl.down('#rtnbtn5').hide();
			Pl.down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
			Pl.down('#muiltFileBox2').down('#AttachFileList').getStore().removeAll();
			Pl.down('#muiltFileBox3').down('#AttachFileList').getStore().removeAll();
			Ext.getCmp('completList').getStore().load(
					{params: {  deptGroup : this.lookupReference('deptGroup').getValue(),
								bizGroup  : this.lookupReference('bizGroup').getValue(), 
								userGroup   : this.lookupReference('userGroup').getValue(),
								cust_cd   : this.lookupReference('cust_cd').getValue(),				                
								dstr_type   : this.lookupReference('dstr_type').getValue(),								
								biz_type   : this.lookupReference('biz_type').getValue(),		                
								muser_cd   : muser_cd,								
								end_user_cd   : this.lookupReference('end_user_cd').getValue(),						
								item_type   : this.lookupReference('item_type').getValue(),					
								prdt_psblt   : this.lookupReference('prdt_psblt').getValue(),					
								smp_cd: this.lookupReference('smp_cd').getValue(),
								process: this.lookupReference('process').getValue(), 
			                    smp_type: this.lookupReference('smp_type').getValue(),
								smp_status   : this.lookupReference('smp_status').getValue(),
								s_prdt_adate: Ext.Date.format(this.lookupReference('sdate').getValue(), 'Y-m-d'),
								e_prdt_adate: Ext.Date.format(this.lookupReference('edate').getValue(), 'Y-m-d'),
				                mode: 'C'
		            }}
		);
	}


});

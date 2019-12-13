///<reference path="~/Client/ext/build/ext-all-debug.js">
///<reference path="~/Client/ext/build/ext-debug.js">
Ext.define('Ysn.view.sampleproduction.instanceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sampleproduction-instance',
	requires: [ 
	    'Ysn.store.*'
    ],
    init: function() {
        this.lookupReference('instanceSearch').setTitle(pageTitle);
		if(Ext.getCmp('chkpopup').getValue()){ 
			Ext.getCmp('sampleproduction-instance').down('#east').setVisible(false);			
		} 
		    Ext.getCmp('instanceDetail').down('#muiltFileBox1').down('#AttachFileList').down('#delbtn').show();
		    Ext.getCmp('instanceDetail').down('#muiltFileBox1').down('#AttachBtn').show();
		 
		    Ext.getCmp('instanceDetail').down('#muiltFileBox2').down('#AttachFileList').down('#delbtn').hide();
		    Ext.getCmp('instanceDetail').down('#muiltFileBox2').down('#AttachBtn').hide();

		    Ext.getCmp('instanceDetail').down('#muiltFileBox3').down('#AttachFileList').down('#delbtn').hide();
		    Ext.getCmp('instanceDetail').down('#muiltFileBox3').down('#AttachBtn').hide();

		 

		this.lookupReference('muiltFile1').down('#paentFrm').setValue('instanceDetail');
		this.lookupReference('muiltFile1').down('#childFrm').setValue('#muiltFileBox1');
		this.lookupReference('muiltFile1').down('#doc_mgt').setValue('');
		this.lookupReference('instanceDetail').down('#muiltFileBox1').down('#paentFrm').setValue('sampleproduction-instance');
		this.lookupReference('instanceDetail').down('#muiltFileBox1').down('#childFrm').setValue('#muiltFile1'); 
	},
    itemclick: function (view, record, index, e) {
        //Ext.getCmp('main').updateLayout();
        //Ext.getCmp('instanceDetail').getEl().scrollTo('top', 0, true);
       // this.getView().down('#east').items.items[0].getEl().scrollTo('top', 0, true);
        var Pl = Ext.getCmp('instanceDetail');  
	    var Frm = Pl.getForm(); 
		if(Ext.getCmp('chkpopup').getValue()){
            openPopupView('샘플의뢰/배송','sampleproduction-instanceDetail',record.get('SMP_CD'),'SampleManage|selectSampleDetail|smp_cd|smp_chasu|'+record.get('SMP_CHASU')); 
		}else{
		    Frm.reset();

           // if (Ext.getCmp('sampleproduction-instance').down('#east').collapsed) Ext.getCmp('sampleproduction-instance').down('#east').toggleCollapse(); 
			Pl.load({
				url: '/SampleManage/selectSampleDetail?smp_cd='+record.get('SMP_CD')+'&smp_chasu='+record.get('SMP_CHASU'), //,
				waitMsg: 'loading...',	
				success: function(form, action) {
                    if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
                    Pl.down('#muiltFileBox1').down('#paentFrm').setValue('sampleproduction-instance');
	                Pl.down('#muiltFileBox1').down('#childFrm').setValue('#muiltFile1');
					var dataVal = Ext.JSON.decode(action.response.responseText);
					form.findField('smpcd_chasu').setValue(dataVal.SMP_CD + '_' + dataVal.SMP_CHASU);
					Pl.body.dom.scrollTop = 0;
					Pl.body.dom.scrollLeft = 0;
					for (var i = 0; i < Pl.items.items.length; i++) {
					    Pl.items.items[i].body.dom.scrollTop = 0;
					    Pl.items.items[i].body.dom.scrollLeft = 0;
					}
                   
				}
			}); 
		}
		Frm.findField('addchk').setValue('modify');
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
		    Ext.getCmp('sampleproduction-instance').down('#east').toggleCollapse();
		});
		if (Ext.getCmp('sampleproduction-instance').down('#east').collapsed) task.delay(1000); 
		
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
		var Pl = Ext.getCmp('instanceDetail');
		var Frm = Pl.getForm();
		Pl.lookupReference('biz_type').setConfig({ 'allowBlank': false });
        Pl.lookupReference('base_yr').setConfig({ 'allowBlank': false });
        Pl.lookupReference('base_crny').setConfig({ 'allowBlank': false });
        Pl.lookupReference('exch_rate').setConfig({ 'allowBlank': false });
        Pl.lookupReference('cmpt_rdate').setConfig({ 'allowBlank': false });
        Frm.reset();
        Pl.lookupReference('smp_type').setValue('SMPTP_100');
        Pl.lookupReference('biz_type').setValue('600002001');
        Pl.lookupReference('prdt_psblt').setValue('PRPB_100');
        Pl.lookupReference('smp_rdate').setValue(new Date());
	    Pl.down('#muiltFileBox1').down('#paentFrm').setValue('sampleproduction-instance');
	    Pl.down('#muiltFileBox1').down('#childFrm').setValue('#muiltFile1');
		Frm.findField('addchk').setValue('add');
		Frm.findField('state').setValue('NEW');
		Frm.findField('smp_rdate').setValue(new Date());
		Frm.findField('user_cd').setValue(loginUser);
		Frm.findField('user_nm').setValue(username);
		if (dstr_chn != null && dstr_chn != '')  Frm.findField('dstr_type').setValue(dstr_chn);
		Frm.findField('dept_cd').setValue(dept_cd);
		Frm.findField('dept_nm').setValue(dept_nm);
		Pl.down('#btn0').show();
		Pl.down('#btn1').show(); 		
		Pl.down('#btn2').hide();
		Pl.down('#btn3').hide();
		Pl.down('#btn4').hide();
		Pl.down('#btn5').hide();
		Pl.down('#btn6').show();
		Pl.down('#btn7').hide();
		Pl.down('#btn8').hide();
		Pl.down('#btn9').hide();
		Pl.down('#btn10').hide(); 
		Pl.down('#btn00').show();
		Pl.down('#btn01').show();
		Pl.down('#btn02').show();
		Pl.down('#btn03').show();
		Pl.down('#rtnbtn1').hide();
		Pl.down('#rtnbtn2').hide();
		Pl.down('#rtnbtn3').hide();
		Pl.down('#rtnbtn4').hide();
		Pl.down('#rtnbtn5').hide();
        Pl.down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
		Pl.down('#muiltFileBox2').down('#AttachFileList').getStore().removeAll();
		Pl.down('#muiltFileBox3').down('#AttachFileList').getStore().removeAll();
		if(Ext.getCmp('sampleproduction-instance').down('#east').collapsed){ 
			Ext.getCmp('sampleproduction-instance').down('#east').toggleCollapse();
		}
		
	},
	xlsExport: function(){  

		Ext.getCmp('instanceList').saveDocumentAs({ 
			headerRowCnt: 1,
            type:       'xlsx',
            title:      '샘플의뢰배송',
            fileName:   '샘플의뢰배송' 
		});
	} 
});

Ext.define('Ysn.view.sampleproduction.instancesearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.instance-search',
	init: function() {
	 this.lookupReference('bizGroup').store.load();  
	 this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true));
	 this.lookupReference('smp_status').store.load({params:{up_code_id:'SMP_STATUS', lang: localeCd, value_1:'Y'}});  
	 this.lookupReference('smp_status').setValue('');
	 this.lookupReference('dstr_type').store.load({params:{up_code_id:'DSTR_TYPE', lang: localeCd}}); 
	 this.lookupReference('biz_type').store.load({params:{up_code_id:'BIZ_TYPE', lang: localeCd}});
	 this.lookupReference('item_type').store.load({ params: { up_code_id: 'ITEM_TYPE', lang: localeCd } });
	 this.lookupReference('smp_type').store.load({ params: { up_code_id: 'SMP_TYPE', lang: localeCd} });
	 this.lookupReference('smp_type').setValue('');
	 this.lookupReference('prdt_psblt').store.load({ params: { up_code_id: 'PRDT_PSBLT', lang: localeCd } });
	 this.lookupReference('process').store.load({ params: { up_code_id: 'SMP_STEP', lang: localeCd } });
	 this.lookupReference('process').setValue('');
	 this.lookupReference('muser_cd').store.load();  
     this.lookupReference('muser_cd').setValue('');  
     this.lookupReference('dstr_type').setValue(''); 	 
     this.lookupReference('biz_type').setValue(''); 	 
     this.lookupReference('item_type').setValue(''); 	 
     this.lookupReference('prdt_psblt').setValue('');
	 if(auth_id != 'A001'){
		 //this.lookupReference('bizGroup').setConfig({'readOnly':true});
		 //if(dept_level == '4') this.lookupReference('deptGroup').setConfig({'readOnly':true});
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
		hidfield.setValue('instance-search');
		Ext.getCmp('sampleproduction-instance').add(win);
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
		hidfield.setValue('instance-search');
		Ext.getCmp('sampleproduction-instance').add(win2);
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
        var Pl = Ext.getCmp('instanceDetail');
        var Frm = Pl.getForm();
        if (Frm.findField('state').getValue() != 'NEW') {
            Pl.lookupReference('biz_type').setConfig({ 'allowBlank': false });
            Pl.lookupReference('base_yr').setConfig({ 'allowBlank': false });
            Pl.lookupReference('base_crny').setConfig({ 'allowBlank': false });
            Pl.lookupReference('exch_rate').setConfig({ 'allowBlank': false });
            Pl.lookupReference('cmpt_rdate').setConfig({ 'allowBlank': false });
            Frm.reset();
            Pl.lookupReference('smp_type').setValue('SMPTP_100');
            Pl.lookupReference('biz_type').setValue('600002001');
            Pl.lookupReference('prdt_psblt').setValue('PRPB_100');
            Pl.down('#muiltFileBox1').down('#paentFrm').setValue('sampleproduction-instance');
            Pl.down('#muiltFileBox1').down('#childFrm').setValue('#muiltFile1');
            Frm.findField('addchk').setValue('add');
            Frm.findField('state').setValue('NEW');
            Frm.findField('smp_rdate').setValue(new Date());
            Frm.findField('user_cd').setValue(loginUser);
            Frm.findField('user_nm').setValue(username);
            if (dstr_chn != null && dstr_chn != '')  Frm.findField('dstr_type').setValue(dstr_chn);  
            Frm.findField('dept_cd').setValue(dept_cd);
            Frm.findField('dept_nm').setValue(dept_nm);
            Pl.down('#btn0').show();
            Pl.down('#btn1').show();
            Pl.down('#btn2').hide();
            Pl.down('#btn3').hide();
            Pl.down('#btn4').hide();
            Pl.down('#btn5').hide();
            Pl.down('#btn6').show();
            Pl.down('#btn7').hide();
            Pl.down('#btn8').hide();
            Pl.down('#btn9').hide();
            Pl.down('#btn10').hide();
            Pl.down('#btn00').show();
            Pl.down('#btn01').show();
            Pl.down('#btn02').show();
            Pl.down('#btn03').show();
            Pl.down('#rtnbtn1').hide();
            Pl.down('#rtnbtn2').hide();
            Pl.down('#rtnbtn3').hide();
            Pl.down('#rtnbtn4').hide();
            Pl.down('#rtnbtn5').hide();
            Pl.down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
            Pl.down('#muiltFileBox2').down('#AttachFileList').getStore().removeAll();
            Pl.down('#muiltFileBox3').down('#AttachFileList').getStore().removeAll();
        }
	    Ext.getCmp('instanceList').getStore().load(
					{params: {  deptGroup : this.lookupReference('deptGroup').getValue(),
								bizGroup  : this.lookupReference('bizGroup').getValue(), 
								user_cd   : this.lookupReference('userGroup').getValue(),
								cust_cd   : this.lookupReference('cust_cd').getValue(),				                
								dstr_type   : this.lookupReference('dstr_type').getValue(),								
								biz_type   : this.lookupReference('biz_type').getValue(),		                
								muser_cd   : this.lookupReference('muser_cd').getValue(),								
								euser_cd   : this.lookupReference('euser_cd').getValue(),						
								item_type   : this.lookupReference('item_type').getValue(),					
								prdt_psblt   : this.lookupReference('prdt_psblt').getValue(),					
								smp_cd: this.lookupReference('smp_cd').getValue(),
			                    smp_type: this.lookupReference('smp_type').getValue(),
								process: this.lookupReference('process').getValue(),
								smp_status   : this.lookupReference('smp_status').getValue(),
								sdate    : Ext.Date.format(this.lookupReference('sdate').getValue(),'Y-m-d'),
								edate: Ext.Date.format(this.lookupReference('edate').getValue(),'Y-m-d'),
				                mode: 'A'
		            }}
		);
	}


});

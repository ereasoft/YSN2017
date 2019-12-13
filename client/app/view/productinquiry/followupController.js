///<reference path="~/Client/ext/build/ext-all-debug.js">
///<reference path="~/Client/ext/build/ext-debug.js">
Ext.define('Ysn.view.productinquiry.followupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.productinquiry-followup',
	requires: [ 
	    'Ysn.store.*'
    ],
    init: function() {
        this.lookupReference('followupSearch').setTitle(pageTitle);
		if(Ext.getCmp('chkpopup').getValue()){ 
			Ext.getCmp('productinquiry-followup').down('#east').setVisible(false);			
		} 
	},
	itemclick: function(view, record, index, e) { 
		if(Ext.getCmp('chkpopup').getValue()){
            openPopupView('제품문의사후조치','productinquiry-followupDetail',record.get('INQ_CD'),'productinquiry|followupDetail|inq_cd'); 
		} else {
			//if (Ext.getCmp('productinquiry-followup').down('#east').collapsed) Ext.getCmp('productinquiry-followup').down('#east').toggleCollapse(); 
		    var Pl = Ext.getCmp('followupDetail');
		    Pl.lookupReference('itemList').getStore().load({ params: { inq_cd: record.get('INQ_CD'), language: localeCd } });
		    Pl.load({
				url: '/ProductInquiry/inquiryDetail?language='+localeCd+'&inq_cd='+record.get('INQ_CD') //
				, waitMsg: 'loading...',
				success: function (form, action) {
				    if (!Ysn.Util.OnsessOut(action.response.responseText)) return false;
				    Pl.body.dom.scrollTop = 0;
				    Pl.body.dom.scrollLeft = 0;
				    for (var i = 0; i < Pl.items.items.length; i++) {
				        Pl.items.items[i].body.dom.scrollTop = 0;
				        Pl.items.items[i].body.dom.scrollLeft = 0;
				    }
				}
			}); 
		}
		var task = new Ext.util.DelayedTask(function () {
		    Ext.getCmp('productinquiry-followup').down('#east').toggleCollapse();
		});
		if (Ext.getCmp('productinquiry-followup').down('#east').collapsed) task.delay(1000);
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
		Ext.getCmp('followupDetail').getForm().reset(); 
		Ext.getCmp('followupDetail').lookupReference('itemList').getStore().removeAll();
		Ext.getCmp('followupDetail').getForm().findField('inq_status').setValue('INQSTAT_100');
		Ext.getCmp('followupDetail').getForm().findField('addchk').setValue('add');
		Ext.getCmp('productinquiry-followup').down('#east').toggleCollapse();
	},
	onClick: function(){  

		Ext.getCmp('followupList').saveDocumentAs({ 
			headerRowCnt: 1,
            type:       'xlsx',
            title:      Ext.getCmp('followup-search').getTitle(),
            fileName:   '고객문의조치사항.xlsx' 
		});
	} 
});

Ext.define('Ysn.view.productinquiry.followupsearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.followup-search',
	init: function() {
	 this.lookupReference('bizGroup').store.load();  
	 this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true));
	 this.lookupReference('inq_chnl').store.load({params:{up_code_id:'INQ_CHNL'}});  
     this.lookupReference('inq_chnl').setValue('');
	 this.lookupReference('inq_type').store.load({params:{up_code_id:'INQ_TYPE'}});  
     this.lookupReference('inq_type').setValue('');
	 this.lookupReference('dstr_type').store.load({params:{up_code_id:'DSTR_TYPE'}});  
     this.lookupReference('dstr_type').setValue('');
	 this.lookupReference('inq_status').store.load({params:{up_code_id:'INQ_STATUS',value_2: 'PA'}});  	 
	 this.lookupReference('inq_status').setValue('');
	 this.lookupReference('nat_cd').store.load();
	 this.lookupReference('nat_cd').setValue('');
     if (company_cd != 'YONWOO') {
         this.lookupReference('userGroup').store.insert(0, { USER_CD: 'loginUser', USER_NM: username });
	     this.lookupReference('userGroup').setValue(loginUser); 
	 }
	 if(auth_id != 'A001'){
	//	 this.lookupReference('bizGroup').setConfig({'readOnly':true});
	//	 if(dept_level == '4') this.lookupReference('deptGroup').setConfig({'readOnly':true});
	 }
	 var Today = new Date();
	 this.lookupReference('inq_rsdate').setValue(Today.getFullYear()+'-'+('0'+(Today.getMonth()+1)).slice(-2)+'-'+'01');
	}, 
    resetVal: function(){
		this.lookupReference('cust_nm').setValue('');
		this.lookupReference('cust_cd').setValue('');
	},
    onChangeBiz: function (el, newVal, oldVal, e) {
        if (company_cd == 'YONWOO') {
            var deptCombo = this.lookupReference('deptGroup');
            var userCombo = this.lookupReference('userGroup');
            if (newVal != '') {
                deptCombo.store.load({ params: { up_dept_cd: newVal } });

            } else {
                deptCombo.setValue('');
                userCombo.setValue('');
                deptCombo.store.removeAll();
                userCombo.store.removeAll();
                deptCombo.store.insert(0, { DEPT_CD: '', DEPT_NM: Locale.getMsg('전체') });
                userCombo.store.insert(0, { USER_CD: '', USER_NM: Locale.getMsg('전체') });
            }
            if (newVal != '') {
                deptCombo.setValue(Ysn.Util.chkDept(false));
            }
            deptCombo.doQuery();
            userCombo.setValue('');
            userCombo.doQuery();
            el.focus();
        }  

	},
    onChangeDept: function(el,newVal,oldVal,e){
        if (company_cd == 'YONWOO') {
            var userCombo = this.lookupReference('userGroup');
            if (newVal != '' && newVal != null) {
                userCombo.store.load({ params: { dept_cd: newVal, up_dept_cd: this.lookupReference('bizGroup').getValue() } });
            } else {
                userCombo.store.removeAll();
            }
            userCombo.setValue('');
            userCombo.doQuery();
            el.focus();
            //userCombo.focus();
        } 
    },
	onSubmitClick: function() {
		    //console.log(Ext.getCmp('productinquiryinquiry'));
			var deptGrp = this.lookupReference('deptGroup');
			var bizGrp = this.lookupReference('bizGroup'); 
			var deptCode = this.lookupReference('deptGroup').getValue();
			var bizCode = this.lookupReference('bizGroup').getValue();
			if (deptGrp.getStore().data.items.length < 2 )
			{
				deptCode = bizCode;
				bizCode = '';
			}
			Ext.getCmp('followupDetail').getForm().reset();
            Ext.getCmp('followupDetail').lookupReference('itemList').getStore().removeAll();
			Ext.getStore('followup').load(
					{params: {  company_cd : company_cd,
				                language: localeCd,
				                deptGroup : deptCode,
				                bizGroup: bizCode,
				                nat_cd: this.lookupReference( 'nat_cd' ).getValue(),
				                dstr_type: this.lookupReference( 'dstr_type' ).getValue(),
								inq_chnl   : this.lookupReference('inq_chnl').getValue(),
								user_cd   : this.lookupReference('userGroup').getValue(),
								inq_type   : this.lookupReference('inq_type').getValue(),
								inq_status   : this.lookupReference('inq_status').getValue(),
								inq_rsdate    : Ext.Date.format(this.lookupReference('inq_rsdate').getValue(),'Y-m-d'),
								inq_redate: Ext.Date.format(this.lookupReference('inq_redate').getValue(), 'Y-m-d'), 
								order_yn: this.lookupReference('order_yn').getValue(),
				                pi_state : 'acfterAction'
		            }}
		);
	}


});

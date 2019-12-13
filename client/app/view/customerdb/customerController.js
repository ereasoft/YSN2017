///<reference path="~/Client/ext/build/ext-all-debug.js">
///<reference path="~/Client/ext/build/ext-debug.js">
Ext.define('Ysn.view.customerdb.customerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.customerdb-customer',
	requires: [ 
	    'Ysn.store.*'
    ],
    init: function() { 
        this.lookupReference('customerSearch').setTitle(pageTitle);
		if(Ext.getCmp('chkpopup').getValue()){ 
			Ext.getCmp('customerdbCustomer').down('#east').setVisible(false);			
		} 
	}, 
	itemclick: function(view, record, index, e) { 
		if(Ext.getCmp('chkpopup').getValue()){
            openPopupView('고객사등록정보','customerdb-customerDetail',record.get('CUST_CD'),'Customer|customerDetail|cust_cd'); 
		}else{ 
			if (Ext.getCmp('customerdbCustomer').down('#east').collapsed) Ext.getCmp('customerdbCustomer').down('#east').toggleCollapse(); 
			var Pl = Ext.getCmp('customerDetail');
			Pl.load({
				url: '/Customer/customerDetail?cust_cd='+record.get('CUST_CD')
				,waitMsg: 'loading...'
				,success: function(form,action){
					Ext.getCmp('customrTab').setActiveTab(0);
				    Ext.getCmp('customrTab').activeTab.store.load({
								params: {cust_cd: record.get('CUST_CD')} 
			        }); 
                    Pl.body.dom.scrollTop = 0;
					Pl.body.dom.scrollLeft = 0;
					for (var i = 0; i < Pl.items.items.length; i++) {
					    Pl.items.items[i].body.dom.scrollTop = 0;
					    Pl.items.items[i].body.dom.scrollLeft = 0;
					}
				} 
			}); 
			Ext.getCmp('customerDetail').down('#saveBtn').show(); 
		}
		//Ext.getCmp('customerdbCustomer').down('#east').show();

		/*Ext.getStore('customerDetail').load({
			params:{cust_cd:record.get('CUST_CD')},
			callback : function(records, operation, success){ 
				//console.log(records);	//root프로퍼티에 지정된데이터 
			    //console.log(operation.getProxy().getReader().rawData);	//리턴된 json 데이터전체 
				//console.log(success);	//success 프로퍼티에 지정된 데이터 }
				console.log(Ext.getStore('customerDetail').getAt(0));	//success 프로퍼티에 지정된 데이터 }
                Ext.getCmp('customerDetail').loadRecord(Ext.getStore('customerDetail').getAt(0));  
			}
		}); */
	}, 
	onClick: function(){  

		Ext.getCmp('customerList').saveDocumentAs({ 
			headerRowCnt: 1,
            type:       'xlsx',
            title:      Ext.getCmp('customer-search').getTitle(),
            fileName:   '고객사현황' 
		});
	}
});

Ext.define('Ysn.view.customerdb.customersearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.customer-search',
	init: function() {
	 this.lookupReference('bizGroup').store.load();  
     this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true));
	 this.lookupReference('cust_grade').store.load();  
     this.lookupReference('cust_grade').setValue('');
	 this.lookupReference('trms_pay').store.load();  
     this.lookupReference('trms_pay').setValue('');
	 this.lookupReference('dmos_cd').store.load();  
     this.lookupReference('dmos_cd').setValue('');
	 this.lookupReference('nat_cd').store.load();  
     this.lookupReference('nat_cd').setValue('');
	 this.lookupReference('use_yn').store.load();  
     this.lookupReference('use_yn').setValue('');  
	 if(auth_id != 'A001'){
	//	 this.lookupReference('bizGroup').setConfig({'readOnly':true});
	//	 if(dept_level == '4') this.lookupReference('deptGroup').setConfig({'readOnly':true});
	 }
	},
	openWindow: function(){
        var win = Ext.getCmp('commonSearchcustomer');
        if(!win){
          win = new Ysn.view.common.searchcustomer();
		}
		var hidfield = win.query('#paentFrm')[0];
		hidfield.setValue('customer-search'); 
		win.down('#cust_nm').setValue(this.lookupReference('cust_nm').getValue());
		Ext.getCmp('customerdbCustomer').add(win);
		win.setPosition(10,-100);
		win.show();
	},
    resetVal: function(){
		this.lookupReference('cust_nm').setValue('');
		this.lookupReference('cust_cd').setValue('');
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
		    //console.log(Ext.getCmp('customerdbCustomer'));
			var deptGrp = this.lookupReference('deptGroup');
			var bizGrp = this.lookupReference('bizGroup'); 
			var deptCode = this.lookupReference('deptGroup').getValue();
			var bizCode = this.lookupReference('bizGroup').getValue();
			if (deptGrp.getStore().data.items.length < 2 )
			{
				deptCode = bizCode;
				bizCode = '';
			}
            Ext.getCmp('customerdbCustomer').down('#customerdb-customerDetail').getForm().reset(); 
			Ext.getCmp('customrTab').setActiveTab(0);
			Ext.getCmp('customrTab').activeTab.store.removeAll();
			Ext.getCmp('customerdbCustomer').down('#customerList').store.load(
					{params: {  deptGroup : deptCode,
								bizGroup  : bizCode,
								user_cd   : this.lookupReference('userGroup').getValue(''),
								dmos_cd   : this.lookupReference('dmos_cd').getValue(''),
								cust_cd   : this.lookupReference('cust_cd').getValue(''),
								cust_nm   : this.lookupReference('cust_nm').getValue(''),
								nat_cd    : this.lookupReference('nat_cd').getValue(''),
								cust_grade: this.lookupReference('cust_grade').getValue(''),
								trms_pay  : this.lookupReference('trms_pay').getValue(''),
								use_yn    : this.lookupReference('use_yn').getValue('')             
		            }}
		);
	}


});

Ext.define('Ysn.view.customerdb.keymanController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.customerdb-keyman',
	requires: [ 
	    'Ysn.store.*'
    ],
    init: function() {
	 this.lookupReference('keyman-search').setTitle(pageTitle);
	},
	itemclick: function(view, record, index, e) { 
		if(Ext.getCmp('chkpopup').getValue()){
            openPopupView('고객사등록정보','customerdb-keymanDetail',record.get('KM_CD'),'keyman|keyManDetail|km_cd'); 
		}else{
			Ext.getCmp('keymanDetail').down('#btnIdchk').hide();
			if (Ext.getCmp('customerdbkeyman').down('#east').collapsed) Ext.getCmp('customerdbkeyman').down('#east').toggleCollapse(); 
			var Pl = Ext.getCmp('keymanDetail');
			Pl.load({
				url: '/keyman/keyManDetail?km_cd='+record.get('KM_CD') //
				,waitMsg: 'loading...'
				,success: function(form,action){
					Ext.getCmp('keymanTab').setActiveTab(0);
			        Ext.getCmp('keymanTab').activeTab.store.load({
								params: {km_cd: record.get('KM_CD')}
			        });
			        Pl.body.dom.scrollTop = 0;
			        Pl.body.dom.scrollLeft = 0;
			        for (var i = 0; i < Pl.items.items.length; i++) {
			            Pl.items.items[i].body.dom.scrollTop = 0;
			            Pl.items.items[i].body.dom.scrollLeft = 0;
			        }

				}
				
			});
			//Ext.getCmp('customerdbkeyman').down('#east').show();
			
			Ext.getCmp('keymanDetail').getForm().findField("idChk").setValue('');
		}
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
	frmClear: function(){
		Ext.getCmp('keymanDetail').getForm().reset();
		Ext.getCmp('keymanDetail').getForm().findField('idChk').setValue('add');
        Ext.getCmp('keymanDetail').down('#btnIdchk').show();
        Ext.getCmp('keymanTab').items.items[0].store.removeAll();
		Ext.getCmp('keymanTab').items.items[1].store.removeAll();
		if(Ext.getCmp('customerdbkeyman').down('#east').collapsed){
			Ext.getCmp('customerdbkeyman').down('#east').toggleCollapse();
		}
	}, 
	onClick: function(){  

		Ext.getCmp('keymanList').saveDocumentAs({ 
			headerRowCnt: 1,
            type:       'xlsx',
            title:      Ext.getCmp('keyman-search').getTitle(),
            fileName:   '고객담당현황.xls' 
		});
	}
});

Ext.define('Ysn.view.customerdb.keymansearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.keyman-search',
	init: function() {
	 this.lookupReference('bizGroup').store.load();  
     this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true));
	 this.lookupReference('km_power').store.load({params:{up_code_id:'KM_POWER'}});
     this.lookupReference('km_power').setValue('');
	 this.lookupReference('km_work').store.load({params:{up_code_id:'KM_WORK'}});
	 this.lookupReference('km_work').setValue('');
	 this.lookupReference('use_yn').store.load();  
     this.lookupReference('use_yn').setValue('');  
	 if(auth_id != 'A001'){
	//	 this.lookupReference('bizGroup').setConfig({'readOnly':true});
	//	 if(dept_level == '4') this.lookupReference('deptGroup').setConfig({'readOnly':true});
	 }
	},
	openWindow: function(){
        var win = this.lookupReference('commonSearchcustomer');
        if(!win){
          win = new Ysn.view.common.searchcustomer();
		}
		var hidfield = Ext.ComponentQuery.query('#paentFrm')[0];
		win.down('#cust_nm').setValue(this.lookupReference('cust_nm').getValue());
		hidfield.setValue('keyman-search');
		Ext.getCmp('keyman-search').add(win);
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
			Ext.getCmp('keymanDetail').getForm().reset();
		    Ext.getCmp('keymanDetail').getForm().findField('idChk').setValue('add');
            Ext.getCmp('keymanDetail').down('#btnIdchk').show();
            Ext.getCmp('keymanTab').items.items[0].store.removeAll(); 
			Ext.getCmp('customerdbkeyman').down('#keymanList').store.load(
					{params: {  deptGroup : deptCode,
								bizGroup  : bizCode,
								km_user_nm   : this.lookupReference('userGroup').getValue(),
								cust_cd   : this.lookupReference('cust_cd').getValue(),
								cust_nm   : this.lookupReference('cust_nm').getValue(), 
								km_nm    : this.lookupReference('km_nm').getValue(),
								km_title: this.lookupReference('km_title').getValue(),
								s_reg_date  : Ext.Date.format(this.lookupReference('s_reg_date').getValue(),'Y-m-d'),
								e_reg_date    : Ext.Date.format(this.lookupReference('e_reg_date').getValue(),'Y-m-d'),
								km_work    : this.lookupReference('km_work').getValue(),
								km_power    : this.lookupReference('km_power').getValue(),
								use_yn    : this.lookupReference('use_yn').getValue()
		            }}
		);
	}


});

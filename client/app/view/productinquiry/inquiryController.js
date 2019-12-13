///<reference path="~/Client/ext/build/ext-all-debug.js">
///<reference path="~/Client/ext/build/ext-debug.js">
Ext.define('Ysn.view.productinquiry.inquiryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.productinquiry-inquiry',
	requires: [ 
	    'Ysn.store.*'
    ],
    init: function() {
        this.lookupReference('inquirySearch').setTitle(pageTitle);
		if(Ext.getCmp('chkpopup').getValue()){ 
			Ext.getCmp('productinquiry-inquiry').down('#east').setVisible(false);			
		}  
	},
	itemclick: function(view, record, index, e) { 
	    if (Ext.getCmp('chkpopup').getValue()) {
	        openPopupView('제품문의정보', 'productinquiry-inquiryDetail', record.get('INQ_CD'), 'productinquiry|inquiryDetail|inq_cd');
	    } else {
	        var Pl = Ext.getCmp('inquiryDetail');
	        Pl.lookupReference('itemList').getStore().load({ params: { inq_cd: record.get('INQ_CD') } });
	        Pl.load({
	            url: '/ProductInquiry/inquiryDetail?inq_cd=' + record.get('INQ_CD')
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
           var task = new Ext.util.DelayedTask(function () {
               Ext.getCmp('productinquiry-inquiry').down('#east').toggleCollapse();
           });
           if (Ext.getCmp('productinquiry-inquiry').down('#east').collapsed) task.delay(1000);
	    }
	},
	frmClear: function(){
	    Ext.getCmp('inquiryDetail').getForm().reset();
	    Ext.getCmp('inquiryDetail').lookupReference('itemList').getStore().removeAll();
		Ext.getCmp('inquiryDetail').getForm().findField('addchk').setValue('add');
		if(Ext.getCmp('productinquiry-inquiry').down('#east').collapsed){
		 Ext.getCmp('productinquiry-inquiry').down('#east').toggleCollapse();
		}
	},
	onClick: function(){  

		Ext.getCmp('inquiryList').saveDocumentAs({ 
			headerRowCnt: 1,
            type:       'xlsx',
            title:      Ext.getCmp('inquiry-search').getTitle(),
            fileName:   '고객문의사항' 
		});
	},

	xlsEnUpload: function(){
		var win = Ext.getCmp('commonxlsfileupload');
			if(!win){
			  win = new Ysn.view.common.xlsfileupload();
			}
			var hidfield = win.lookupReference('xlsfileupload').down('#paentFrm');
			hidfield.setValue('inquiryList');
			Ext.getCmp('productinquiry-inquiry').add(win); 
			win.show();
	},
	
	csvEnUpload: function(){
		var win2 = Ext.getCmp('commonfileupload');
			if(!win2){
			  win2 = new Ysn.view.common.fileupload();
			}
			var hidfield = win2.lookupReference('csvfileupload').down('#paentFrm');
			hidfield.setValue('inquiryList');
			Ext.getCmp('productinquiry-inquiry').add(win2); 
			win2.show();
	},

    csvEnUpload2: function(){
            var win3 = Ext.getCmp('commonfileupload2');
            if(!win3){
                win3 = new Ysn.view.common.fileupload2();
            }
            var hidfield = win3.lookupReference('csvfileupload2').down('#paentFrm');
            hidfield.setValue('inquiryList');
            Ext.getCmp('productinquiry-inquiry').add(win3); 
            win3.show();
}
});

Ext.define('Ysn.view.productinquiry.inquirysearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.inquiry-search',
	init: function() {
	 this.lookupReference('bizGroup').store.load();  
     this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true)); 
	 this.lookupReference('inq_chnl').store.load({params:{up_code_id:'INQ_CHNL'}});  
     this.lookupReference('inq_chnl').setValue('');
	 this.lookupReference('inq_type').store.load({params:{up_code_id:'INQ_TYPE'}});  
     this.lookupReference('inq_type').setValue('');
	 this.lookupReference('dstr_type').store.load({params:{up_code_id:'DSTR_TYPE'}});  
     this.lookupReference('dstr_type').setValue('');
	 this.lookupReference('inq_status').store.load({params:{up_code_id:'INQ_STATUS'}});  
     this.lookupReference('inq_status').setValue(''); 
	 if(company_cd != 'YONWOO'){
		 this.lookupReference('userGroup').setValue(loginUser); 
	 }
	 if(auth_id != 'A001'){
		// this.lookupReference('bizGroup').setConfig({'readOnly':true});
		// if(dept_level == '4') this.lookupReference('deptGroup').setConfig({'readOnly':true});
	 }
	 var Today = new Date();
	 this.lookupReference('inq_rsdate').setValue(Today.getFullYear()+'-'+('0'+(Today.getMonth()+1)).slice(-2)+'-'+'01');
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
			Ext.getCmp('inquiryDetail').getForm().reset();
            Ext.getCmp('inquiryDetail').lookupReference('itemList').getStore().removeAll();
			Ext.getStore('inquiry').load(
					{params: {  deptGroup : deptCode,
								bizGroup  : bizCode,
								inq_chnl: this.lookupReference( 'inq_chnl' ).getValue(),
								dstr_type: this.lookupReference( 'dstr_type' ).getValue(),
								user_cd   : this.lookupReference('userGroup').getValue(),
								inq_type   : this.lookupReference('inq_type').getValue(),
								inq_status   : this.lookupReference('inq_status').getValue(),
								inq_rsdate    : Ext.Date.format(this.lookupReference('inq_rsdate').getValue(),'Y-m-d'),
								inq_redate: Ext.Date.format(this.lookupReference('inq_redate').getValue(), 'Y-m-d'),
								order_yn: this.lookupReference('order_yn').getValue()
		            }}
		);
	}
                                                                                         

});                                        

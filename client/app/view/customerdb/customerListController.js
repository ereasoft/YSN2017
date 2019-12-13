Ext.define('Ysn.view.customerdb.customerListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.customerdb-customerList', 
    init: function() {
	  
	}
});

Ext.define('Ysn.view.customerdb.customerDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.customerdb-customerDetail', 
    init: function() {
	 this.lookupReference('cust_grade').store.load({params:{up_code_id:'CUST_GRADE'}});	 	
	 this.lookupReference('trms_pay').store.load({params:{up_code_id:'TRMS_PAY'}});  
	 this.lookupReference('base_crncy').store.load({params:{up_code_id:'CRNY_TYPE'}});
	 //this.lookupReference('bizGroup').store.load();  
	 this.lookupReference('use_yn').store.load({params:{up_code_id:'SA_YN'}});  
	 this.lookupReference('nat_cd').store.load(); 
	}, 
	openWindow: function(){
		//if(!Ext.getCmp('common-searchPartUser')){
			var win = Ext.getCmp('common-searchPartUser');
			if(!win){
			  win = new Ysn.view.common.searchPartUser();
			}
			var hidfield = win.down('#paentFrm');
            win.down('#user_nm').setValue(this.lookupReference('user_nm').getValue());
			hidfield.setValue('customerDetail');
			Ext.getCmp('customerDetail').add(win);
			win.setPosition(70,100);
			win.show();
		//}
	},
    resetVal: function(){
		this.lookupReference('user_nm').setValue('');
		this.lookupReference('user_cd').setValue('');
	},
	onSubmit: function(){ 
		pl = Ext.getCmp('customerDetail');
		var form = pl.getForm();
		Ysn.Util.cbEmptyVal(pl); 
		if (form.isValid()) {
			form.submit({
				waitMsg:'Processing...',
                url: '/Customer/updateCustomer',
                method: 'POST',
				params: form.getValues(),
				submitEmptyText:false,
				success: function(form, action) {
                  if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
					//console.log("response:"+action);
					//console.log("response:"+action.response.responseText);
				   //Ext.Msg.alert('Success', action.response.responseText);
				   Ext.Msg.alert('Success', '처리완료'); 
                   Ext.getCmp('customerList').store.reload();
				},
				failure: function(form, action) {
					//console.log('response:'+ action);
					var dataVal = Ext.JSON.decode(action.response.responseText)
					Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.'); 
					//Ext.getCmp('customerList').store.reload();
				}
			});
		}
	}

});
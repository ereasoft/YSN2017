Ext.define('Ysn.view.customerdb.keymanListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.customerdb-keymanList', 
    init: function() {
	  
	}
});

Ext.define('Ysn.view.customerdb.keymanDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.customerdb-keymanDetail', 
    init: function() {
	 this.lookupReference('km_work').store.load({params:{up_code_id:'KM_WORK'}}); 
	 this.lookupReference('km_power').store.load({params:{up_code_id:'KM_POWER'}});  
	 this.lookupReference('km_posit').store.load({params:{up_code_id:'KM_POSIT'}});  
	 this.lookupReference('ab_nation').store.load(); 
	 this.lookupReference('km_friend').store.load({params:{up_code_id:'KM_FRIEND'}});  
	 this.lookupReference('use_yn').store.load({params:{up_code_id:'SA_YN'}});  
	},
	openKeyman: function(){
		 if(!Ext.getCmp('keymanDetail').getForm().findField("km_nm").getValue()){
			Ext.Msg.alert('Warning', '고객담당을 입력하세요.');
		 }else{  
			Ext.Ajax.request({
								 url: '/KeyMan/keyManDupliChk?km_nm='+Ext.getCmp('keymanDetail').getForm().findField("km_nm").getValue(),

								 success: function(response, opts) {
									   if(!Ysn.Util.OnsessOut(response.responseText)) return false;

										var obj = Ext.decode(response.responseText);
										if(obj.LIST.CNT > 0){
											keyman = Ext.getCmp('keymanDetail').getForm().findField("km_nm").getValue();
											var win = Ext.getCmp('common-searchKeyman');
											if(!win){
											  win = new Ysn.view.common.searchKeyman();
											}
											var hidfield = win.down('#paentFrm');
											hidfield.setValue('keymanDetail');
											Ext.getCmp('keymanDetail').add(win);
											win.setPosition(70,100);
											win.show();
										}else{
											Ext.Msg.alert('중복확인', '등록가능합니다.');
										}
								 },

								 failure: function(response, opts) {
									 Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.'); 
								 }
			}); 
			
		}
	},
	openWindow: function(){
		//if(Ext.getCmp('keymanDetail').getForm().findField("cust_cd").getValue()){
			var win = Ext.getCmp('commonSearchcustomer');
			if(!win){
			  win = new Ysn.view.common.searchcustomer();
			}
			var hidfield = win.down('#paentFrm');
		    win.down('#cust_nm').setValue(this.lookupReference('cust_nm').getValue());
			hidfield.setValue('keymanDetail');
			Ext.getCmp('keymanDetail').add(win);
			win.setPosition(70,100);
			win.show();
		//}
	},
    resetVal: function(){
		this.lookupReference('cust_nm').setValue('');
		this.lookupReference('cust_cd').setValue('');
	},
	onSubmit: function(){ 
		var form = Ext.getCmp('keymanDetail').getForm(); 
		Ysn.Util.cbEmptyVal(Ext.getCmp('keymanDetail')); 
		if (form.isValid()) {
			var url = '/KeyMan/keyManUpdate';
			if(form.findField("idChk").getValue() == 'add'){
				url= '/KeyMan/keyManInsert';
			}
			form.setConfig('url',url);
			form.submit({
				waitMsg:'Processing...', 
                method: 'POST',
				params: form.getValues(),
				submitEmptyText:false,
				success: function(form, action) {
            Ysn.Util.OnsessOut(action.response.responseText);
					//console.log("response:"+action);
					//console.log("response:"+action.response.responseText);
				   //Ext.Msg.alert('Success', action.response.responseText);
                   //Ext.getCmp('keymanList').store.reload();
				   Ext.getCmp('keyman-search').getController('keyman-search').onSubmitClick();
				},
				failure: function(form, action) {
					//console.log('response:'+ action);
					var dataVal = Ext.JSON.decode(action.response.responseText)
					Ext.Msg.alert('Failed', dataVal.errmsg); 
					//Ext.getCmp('keymanList').store.reload();
				}
			});
		}
	}

});
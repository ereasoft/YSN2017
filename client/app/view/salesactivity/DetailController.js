/* globals Cal, Kanban */
Ext.define('Ysn.view.salesactivity.modifyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salesactivity_modify',
    requires: [
		 
    ],
    init: function () {
        // this.lookupReference('cardpanel').down('#monthview').getEventStore().load({params:{user_cd:loginUser}}); 

        Ext.getCmp('salesactivity-Detail').down('#muiltFileBox1').down('#AttachFileList').down('#delbtn').show();
        Ext.getCmp('salesactivity-Detail').down('#muiltFileBox1').down('#AttachBtn').show();

        this.lookupReference('muiltFile1').down('#paentFrm').setValue('activityTab');
        this.lookupReference('muiltFile1').down('#childFrm').setValue('#muiltFileBox1');
        this.lookupReference('muiltFile1').down('#doc_mgt').setValue('');

    }
   
});

Ext.define('Ysn.view.salesactivity.DetailController', {
    extend : 'Ext.app.ViewController',
    alias  : 'controller.salesactivity-Detail',
	requires: [ 
		'Ysn.view.salesactivity.Detail'
    ],
    init: function() {
        // this.lookupReference('cardpanel').down('#monthview').getEventStore().load({params:{user_cd:loginUser}}); 
      
         
	},
	onSubmit : function() {
		var pl = this.getView();
		var form = this.getView().getForm();  
		Ysn.Util.cbEmptyVal(this.getView()); 
		if (form.isValid()) {
			form.submit({
				waitMsg:'Processing...',
                url: '/salesActivity/salesActivitySave',
                method: 'POST',
				params: form.getValues(),			
				submitEmptyText:false,
				success: function(form, action) {
					if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
					//console.log("response:"+action);
					//console.log("response:"+action.response.responseText);
				   //Ext.Msg.alert('Success', action.response.responseText);
				    Ext.each(pl.query('hiddenfield[name=file_name]'), function (obj) {
                        pl.remove(obj);
                    });
                    Ext.each(pl.query('hiddenfield[name=file_mode]'), function (obj) {
                        pl.remove(obj);
                    });
                    Ext.each(pl.query('hiddenfield[name=doc_mgt]'), function (obj) {
                        pl.remove(obj);
                    });
                    Ext.each(pl.query('hiddenfield[name=del_file]'), function (obj) {
                        pl.remove(obj);
                    });
                   Ext.getCmp('salesactivity-schedule').down('#monthview').getEventStore().reload();
                   Ext.getCmp('salesactivity-plan').hide();
				},
				failure: function(form, action) {
					//console.log('response:'+ action);
					var dataVal = Ext.JSON.decode(action.response.responseText)
					Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.'); 
					//Ext.getCmp('customerList').store.reload();
					Ext.getCmp('salesactivity-plan').hide();
				}
			});
		}
	},
	keyFactorVal : function(el , newValue , oldValue , eOpts){
		if(newValue != ''){
			var sa_targets = newValue.split(',');
			for(var i in sa_targets){
				Ext.getCmp('salesactivity-Detail').down('#'+sa_targets[i]).setValue(sa_targets[i]);
			}
		}
	},
	onDelete : function() {
		var form = this.getView().getForm();  
         
		//if (form.isValid()) {
			form.submit({
				waitMsg:'Processing...',
                url: '/salesActivity/salesActivityDelete?sa_cd='+form.findField('sa_cd').getValue(),
                method: 'POST',
				//params: form.getValues(),
				success: function(form, action) {
            Ysn.Util.OnsessOut(action.response.responseText);
					//console.log("response:"+action);
					//console.log("response:"+action.response.responseText);
				   //Ext.Msg.alert('Success', action.response.responseText);
                   Ext.getCmp('salesactivity-schedule').down('#monthview').getEventStore().reload();
                   Ext.getCmp('salesactivity-plan').hide();
				},
				failure: function(form, action) {
					//console.log('response:'+ action);
					var dataVal = Ext.JSON.decode(action.response.responseText)
					Ext.Msg.alert('Failed', dataVal.errmsg); 
					//Ext.getCmp('customerList').store.reload();
					Ext.getCmp('salesactivity-plan').hide();
				}
			});
		//}
    },

	openWindow: function(){
		//if(Ext.getCmp('keymanDetail').getForm().findField("cust_cd").getValue()){
			var win = Ext.getCmp('commonSearchcustomer');
			if(!win){
			  win = new Ysn.view.common.searchcustomer();
			}
			var hidfield = win.down('#paentFrm');
		    win.down('#cust_nm').setValue(this.lookupReference('cust_nm').getValue());
			hidfield.setValue('salesactivity-Detail');
			Ext.getCmp('salesactivity-Detail').add(win);
			win.setPosition(70,100);
			win.show();
		//}
	},
    resetVal: function(){
		this.lookupReference('cust_nm').setValue('');
		this.lookupReference('cust_cd').setValue('');
	},

	openWindow2: function(){
		if(this.lookupReference('cust_cd').getValue()){
			var win2 = Ext.getCmp('commonsearchKeyman2');
			if(!win2){
			  win2 = new Ysn.view.common.searchKeyman2();
			}
			var hidfield = win2.down('#paentFrm');
			win2.lookupReference('km_nm').setValue(this.lookupReference('km_nms').getValue());
			win2.lookupReference('cust_cd').setValue(this.lookupReference('cust_cd').getValue());
			win2.lookupReference('cust_nm').setValue(this.lookupReference('cust_nm').getValue());
			hidfield.setValue('salesactivity-Detail');
			Ext.getCmp('salesactivity-Detail').add(win2);
			//win2.setPosition(70,100);
			win2.show();
		}else{
			Ext.Msg.alert('Warning', '거래처를 먼저 선택하세요.');
		}
	},
    resetVal2: function(){
		this.lookupReference('km_nms').setValue('');
		this.lookupReference('km_cds').setValue('');
	},

	openWindow3: function(){ 
			var win3 = Ext.getCmp('commonsearchPartUser2');
			if(!win3){
			  win3 = new Ysn.view.common.searchPartUser2();
			}
			var hidfield = win3.down('#paentFrm');
			hidfield.setValue('salesactivity-Detail');
			Ext.getCmp('salesactivity-Detail').add(win3);
			//win2.setPosition(70,100);
			win3.show(); 
	},
    resetVal3: function(){
		this.lookupReference('user_nms').setValue('');
		this.lookupReference('user_cds').setValue('');
	},
	custNmChg: function(fd , newValue , oldValue , eOpts){
		Ext.getCmp('salesactivity-Detail').getForm().findField('sa_subject').setValue(newValue);
	},  
	saTypeChg: function(fd , newValue , oldValue , eOpts){
		if(newValue == 'SATYPE_400'){
		Ext.getCmp('salesactivity-Detail').getForm().findField('sa_subject').setValue('업무보고');
        
		}//else if()
	},
	cmtYnChg: function(fd , newValue , oldValue , eOpts){
		if(fd.getValue()){
			Ext.getCmp('salesactivity-Detail').getForm().findField('sa_comment').show();
		}else{
			Ext.getCmp('salesactivity-Detail').getForm().findField('sa_comment').hide();
		}
	}
    
});
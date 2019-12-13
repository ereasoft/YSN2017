Ext.define('Ysn.view.productinquiry.inquiryListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.productinquiry-inquiryList', 
    init: function() {
	  
	}
});

Ext.define('Ysn.view.productinquiry.inquiryDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.productinquiry-inquiryDetail', 
    init: function() {
	 this.lookupReference('inq_chnl').store.load({params:{up_code_id:'INQ_CHNL'}}); 
	 this.lookupReference('inq_type').store.load({params:{up_code_id:'INQ_TYPE'}});  
	// this.lookupReference('inq_item_nm').store.load({params:{up_code_id:'INQ_ITEM'}});
	 this.lookupReference('dstr_type').store.load({params:{up_code_id:'DSTR_TYPE'}});  
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
			hidfield.setValue('inquiryDetail');
			Ext.getCmp('inquiryDetail').add(win);
			win.setPosition(70,100);
			win.show();
		//}
	},
    resetVal: function(){
		this.lookupReference('user_nm').setValue('');
		this.lookupReference('user_cd').setValue('');
    },
    onStatusChg: function (el, newValue, oldValue, eOpts) {
        var Pl = Ext.getCmp('inquiryDetail');
        if (newValue == '') { 
            Pl.down('#btn1').hide();
            Pl.down('#btn2').hide();
            Pl.down('#btn3').hide();
            Pl.down('#btn4').hide();
            Pl.down('#btn5').hide();
            Pl.down('#btn6').hide();
            Pl.down('#btn7').hide();
            Pl.down('#btn8').hide();
            Pl.down('#btn9').show();
        } else if (newValue == 'INQSTAT_100') {
            Pl.down('#btn1').hide();
            Pl.down('#btn2').hide();
            Pl.down('#btn3').hide();
            Pl.down('#btn4').hide();
            Pl.down('#btn5').hide();
            Pl.down('#btn6').show();
            Pl.down('#btn7').hide();
            Pl.down('#btn8').show();
            Pl.down('#btn9').show();
        } else if (newValue == 'INQSTAT_200') {
            Pl.down('#btn1').hide();
            Pl.down('#btn2').hide();
            Pl.down('#btn3').hide();
            Pl.down('#btn4').hide();
            Pl.down('#btn5').hide();
            Pl.down('#btn6').hide();
            Pl.down('#btn7').show();
            Pl.down('#btn8').hide();
            Pl.down('#btn9').hide();
        } else if (newValue != '') {
            Pl.down('#btn1').hide();
            Pl.down('#btn2').hide();
            Pl.down('#btn3').hide();
            Pl.down('#btn4').hide();
            Pl.down('#btn5').hide();
            Pl.down('#btn6').hide();
            Pl.down('#btn7').hide();
            Pl.down('#btn8').hide();
            Pl.down('#btn9').hide();
        } 
    },
    chkUserEmpty: function () {
  
            var Pl = Ext.getCmp('inquiryDetail');
            Pl.down('#btn1').hide();
            Pl.down('#btn2').hide();
            Pl.down('#btn3').hide();
            Pl.down('#btn4').hide(); 
            Pl.down('#btn6').hide();
            Pl.down('#btn7').hide();
            Pl.down('#btn8').hide();
     
    },
    onUsrChange: function () {
        var frm = this.getView().getForm();
        if (frm.isValid()) {
            frm.findField('inq_status').setValue('user_redirect');
            frm.findField('inq_status_nm').setValue('사후조치자재지정');
        }
            this.onSubmit();
        
    },
    onDrop: function () {
        var frm = this.getView().getForm();
        if (frm.isValid()) {
            frm.findField('inq_status').setValue('INQSTAT_900');
            frm.findField('inq_status_nm').setValue('DROP(고객)');
        }
            this.onSubmit();
        
    },
    onEnd: function () {
        var frm = this.getView().getForm();
        if (frm.isValid()) {
            frm.findField('inq_status').setValue('INQSTAT_600');
            frm.findField('inq_status_nm').setValue('상담종료');
        }
            this.onSubmit();
        
    },
    onProgress: function () {
        var frm = this.getView().getForm();
        if (frm.isValid()) {
            frm.findField('inq_status').setValue('INQSTAT_500');
            frm.findField('inq_status_nm').setValue('상담중');
        }
            this.onSubmit();
       
    },
    onWaiting: function () {
        var frm = this.getView().getForm();
        if (frm.isValid()) {
            frm.findField('inq_status').setValue('INQSTAT_400');
            frm.findField('inq_status_nm').setValue('회신후대기');
        }
            this.onSubmit();
        
    },
    onCompanion: function () {
        var frm = this.getView().getForm(); 
        if (frm.isValid()) {
            frm.findField('inq_status').setValue('INQSTAT_300');
            frm.findField('inq_status_nm').setValue('전달반려');
        }
        this.onSubmit();
 
        
    },
    onDel: function () {
        var frm = this.getView().getForm();
        frm.findField('user_nm').setConfig({ 'allowBlank': true });
        if (frm.isValid()) {
            frm.findField('inq_status').setValue('div_delete');
            frm.findField('inq_status_nm').setValue('삭제');
        }
            this.onSubmit();
        
    },
    onCancel: function () {
        var frm = this.getView().getForm();
        if (frm.isValid()){
            frm.findField('inq_status').setValue('dlv_cancel');
            frm.findField('inq_status_nm').setValue('접수등록');
        }
            this.onSubmit();
        
    },
    onContact: function () {
        var frm = this.getView().getForm();
        if (frm.findField('user_cd').getValue() == '') {
            Ext.Msg.alert('Warning', '사후조치자를 선택후, 접수등록을 먼저 진행하세요.'); 
        } else {
            if (frm.isValid()) {
                frm.findField('inq_status').setValue('INQSTAT_200');
                frm.findField('inq_status_nm').setValue('문의전달');
            }
            this.onSubmit();
        }
        
    },
    onNew: function () {
        var pl = this.getView();
        var frm = pl.getForm();

        frm.findField('user_nm').setConfig({ 'allowBlank': false });
        var newVal = frm.findField('inq_contents').getValue().replace(/<br>/g, "\n");
        frm.findField('inq_contents').setValue(newVal);
        if (frm.isValid()) {
            var store = this.lookupReference('itemList').getStore();
            var records = store.getRange();

            Ext.each(pl.query('hiddenfield[name=inq_item_nm]'), function (obj) {
                pl.remove(obj);
            });
            for (var i = 0; i < records.length; i++) {
                var val = records[i].get('INQ_ITEM_NM');
                if (records[i].get('INQ_ITEM_GB') != '') val = '[' + records[i].get('INQ_ITEM_GB') + ']' + val;
                pl.add({ xtype: 'hiddenfield', name: 'inq_item_nm', value: val }); 
            }
            /*store.each(function (rec) {
                var val = rec.get('INQ_ITEM_NM');
                if (rec.get('INQ_ITEM_GB') != '') val = '[' + rec.get('INQ_ITEM_GB') + ']' + val;
                this.getView().add({ xtype: 'hiddenfield', name: 'inq_item_nm', value: val });
            });*/
            frm.findField('inq_status').setValue('INQSTAT_100');
            frm.findField('inq_status_nm').setValue('접수등록');

        }
        this.onSubmit();
        
    },
	onSubmit: function(){ 
		var pl = Ext.getCmp('inquiryDetail');
		var form = pl.getForm(); 
		Ysn.Util.cbEmptyVal(Ext.getCmp('inquiryDetail')); 

		if (form.isValid()) {
			 
				url= '/ProductInquiry/inquiryRegNew';
	 
			form.setConfig('url',url);
			form.submit({
				waitMsg:'Processing...', 
                method: 'POST',
				params: form.getValues(),				
				submitEmptyText:false,
				success: function(form, action) { 
                    if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
					//console.log("response:"+action);
					//console.log("response:"+action.response.responseText);
				   //Ext.Msg.alert('Success', action.response.responseText);
				    if (form.findField('inq_status').getValue() == 'div_delete') {
				        form.reset();
                        pl.lookupReference('itemList').getStore().removeAll();
				        Ext.getCmp('productinquiry-inquiry').down('#east').toggleCollapse();
				    } else {
				       /* Ext.getCmp('inquiryDetail').load({
				            url: '/ProductInquiry/inquiryDetail?inq_cd=' + form.findField('inq_cd').getValue() //
							,waitMsg: 'loading...'
				        });*/
						if(form.findField('inq_status').getValue() != 'INQSTAT_100'){
                           form.reset();
                           pl.lookupReference('itemList').getStore().removeAll();
						} else {
						    pl.lookupReference('itemList').getStore().load({ params: { inq_cd: form.findField('inq_cd').getValue() } });
                           Ext.getCmp('inquiryDetail').load({
				            url: '/ProductInquiry/inquiryDetail?inq_cd=' + form.findField('inq_cd').getValue() //
							,waitMsg: 'loading...'
				        });
						}
				    }
				    Ext.getCmp('inquiry-search').getController('inquiry-search').onSubmitClick(); 
				    Ext.Msg.alert('처리상태', '처리완료');
				},
				failure: function(form, action) {
					//console.log('response:'+ action); 
					var dataVal = Ext.JSON.decode(action.response.responseText)
					Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.'); 
					//Ext.getCmp('keymanList').store.reload();
				}
			});
		}
	}

});
Ext.define('Ysn.view.productinquiry.followupListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.productinquiry-followupList', 
    init: function() {
	  
	}
});

Ext.define('Ysn.view.productinquiry.followupDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.productinquiry-followupDetail', 
    init: function() {
	 this.lookupReference('inq_chnl').store.load({params:{up_code_id:'INQ_CHNL'}}); 
	 this.lookupReference('inq_type').store.load({params:{up_code_id:'INQ_TYPE'}});  
	// this.lookupReference('inq_item_nm').store.load({params:{up_code_id:'INQ_ITEM'}});
	 this.lookupReference('dstr_type').store.load({params:{up_code_id:'DSTR_TYPE'}});  
	 this.lookupReference('nat_cd').store.load();  
	 //this.lookupReference('inq_status').store.load({params:{up_code_id:'INQ_STATUS'}}); 
	 //this.lookupReference('inq_status').setValue('INQSTAT_100');
	 //this.lookupReference('addBtn').hide();
	 //this.lookupReference('itemList').down('#delbtn').hide();
	},
    itemAdd: function(){
		var fielditem = this.lookupReference('inq_item_grp');
		fielditem.insert(fielditem.items.length-2,
						{   xtype: 'combobox', 
							publishes: 'inq_item_nm',  
							displayField: 'CODE_NM',
							valueField: 'CODE_NM', 
							name: 'inq_item_nm',  
							emptyText: '선택',
							store: {
								type: 'Tcode'  
							},
							minChars: 0,
							queryMode: 'local',
							typeAhead: true,
                            margin: '0 5 0 0' 
	    }); 
	   fielditem.items.items[fielditem.items.length-3].store.load({params:{up_code_id:'INQ_ITEM'}});
	},
	itemRemove: function(){
		var fielditem = this.lookupReference('inq_item_grp').items;
		if(fielditem.length > 3){
		fielditem.items[fielditem.length-3].destroy();
		}
	   //alert(this.lookupReference('inq_item_grp').items.length);
	   //this.lookupReference('inq_item_grp').updateLayout();

	},openWindow: function(){
		//if(!Ext.getCmp('common-searchPartUser')){
			var win = Ext.getCmp('common-searchSelUser');
			if(!win){
			  win = new Ysn.view.common.searchSelUser();
			}
			var hidfield = win.down('#paentFrm');
			win.down('#user_nm').setValue(this.lookupReference('user_nm').getValue());
			hidfield.setValue('followupDetail');
			Ext.getCmp('followupDetail').add(win);
			win.setPosition(70,100);
			win.show();
		//}
	},
    resetVal: function(){
		this.lookupReference('user_nm').setValue('');
		this.lookupReference('user_cd').setValue('');
    },
    onStatusChg: function (el, newValue, oldValue, eOpts) {
        var Pl = Ext.getCmp('followupDetail');
        if (newValue == '') {
            Pl.down('#btn1').hide();
            Pl.down('#btn2').hide();
            Pl.down('#btn3').hide();
            Pl.down('#btn4').hide();
            Pl.down('#btn5').hide();
            Pl.down('#btn6').hide();
            Pl.down('#btn7').hide();
            Pl.down('#btn8').hide();
            Pl.down('#btn9').hide();
            Pl.down('#btn10').hide();
            Pl.down('#btn11').hide();
        }  else if (newValue == 'INQSTAT_200') {
            Pl.down('#btn1').show();
            Pl.down('#btn2').hide();
            Pl.down('#btn3').hide();
            Pl.down('#btn4').show();
            Pl.down('#btn5').show();
            Pl.down('#btn6').hide();
            Pl.down('#btn7').show();
            Pl.down('#btn8').hide();
            Pl.down('#btn9').hide();
            Pl.down('#btn10').show();
            Pl.down('#btn11').hide();
        } else if (newValue == 'INQSTAT_400') {
            Pl.down('#btn1').show();
            Pl.down('#btn2').hide();
            Pl.down('#btn3').show();
            Pl.down('#btn4').hide();
            Pl.down('#btn5').hide();
            Pl.down('#btn6').hide();
            Pl.down('#btn7').hide();
            Pl.down('#btn8').hide();
            Pl.down('#btn9').hide();
            Pl.down('#btn10').hide();
            Pl.down('#btn11').hide();
        } else if (newValue == 'INQSTAT_500') {
            Pl.down('#btn1').show();
            Pl.down('#btn2').show();
            Pl.down('#btn3').show();
            Pl.down('#btn4').hide();
            Pl.down('#btn5').hide();
            Pl.down('#btn6').hide();
            Pl.down('#btn7').hide();
            Pl.down('#btn8').hide();
            Pl.down('#btn9').hide();
            Pl.down('#btn10').hide();
            Pl.down('#btn11').hide();
        } else if (newValue == 'INQSTAT_600') {
            Pl.down('#btn1').show();
            Pl.down('#btn2').hide();
            Pl.down('#btn3').hide();
            Pl.down('#btn4').hide();
            Pl.down('#btn5').hide();
            Pl.down('#btn6').hide();
            Pl.down('#btn7').hide();
            Pl.down('#btn8').hide();
            Pl.down('#btn9').hide();
            Pl.down('#btn10').hide();
            Pl.down('#btn11').show();
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
            Pl.down('#btn10').hide();
            Pl.down('#btn11').hide();
        }
    },
    chkUserEmpty: function () {

        var Pl = Ext.getCmp('followupDetail');
        Pl.down('#btn1').hide();
        Pl.down('#btn2').hide();
        Pl.down('#btn3').hide();
        Pl.down('#btn4').hide();
        Pl.down('#btn6').hide();
        Pl.down('#btn7').hide();
        Pl.down('#btn8').hide();
        Pl.down('#btn9').hide();
        Pl.down('#btn10').hide();
        Pl.down('#btn11').hide();
    },
    onUsrChange: function () {
        var frm = this.getView().getForm();
        if (frm.isValid()) {
            frm.findField('inq_status').setValue('user_redirect');
            frm.findField('inq_status_nm').setValue('문의전달');
            frm.findField('addchk').setValue('no');
        }
        this.onSubmit();

    },
    onOrderYn: function () {
        var frm = this.getView().getForm();
        if (!frm.findField('order_yn').getValue() || !frm.findField('order_amount').getValue()) {
            Ext.Msg.alert('Warning', '매출발생여부와 매출금액을 등록하세요.');
        } else {
            if (frm.isValid()) {
                frm.findField('inq_status').setValue('order_yn');
                frm.findField('inq_status_nm').setValue('상담종료');
            frm.findField('addchk').setValue('no');
            }
            this.onSubmit();
        }

    },
    onDrop: function () {
        var frm = this.getView().getForm();
        if (frm.isValid()) {
            frm.findField('inq_status').setValue('INQSTAT_900');
            frm.findField('inq_status_nm').setValue('DROP(고객)');
            frm.findField('addchk').setValue('no');
        }
        this.onSubmit();

    },
    onEnd: function () {
        var frm = this.getView().getForm();
        if (frm.isValid()) {
            frm.findField('inq_status').setValue('INQSTAT_600');
            frm.findField('inq_status_nm').setValue('상담종료');
            frm.findField('addchk').setValue('no');
        }
        this.onSubmit();

    },
    onProgress: function () {
        var frm = this.getView().getForm();
        if (frm.isValid()) {
            frm.findField('inq_status').setValue('INQSTAT_500');
            frm.findField('inq_status_nm').setValue('상담중');
            frm.findField('addchk').setValue('no');
        }
        this.onSubmit();

    },
    onWaiting: function () {
        var frm = this.getView().getForm();
        if (frm.isValid()) {
            frm.findField('inq_status').setValue('INQSTAT_400');
            frm.findField('inq_status_nm').setValue('회신후대기');
            frm.findField('addchk').setValue('no');
        }
        this.onSubmit();

    },
    onCompanion: function () {
        var frm = this.getView().getForm();
        if (frm.isValid()) {
            frm.findField('inq_status').setValue('INQSTAT_300');
            frm.findField('inq_status_nm').setValue('전달반려');
            frm.findField('addchk').setValue('no');
        }
        this.onSubmit();


    },
    onDel: function () {
        var frm = this.getView().getForm();
        frm.findField('user_nm').setConfig({ 'allowBlank': true });
        if (frm.isValid()) {
            frm.findField('inq_status').setValue('div_delete');
            frm.findField('inq_status_nm').setValue('삭제');
            frm.findField('addchk').setValue('no');
        }
        this.onSubmit();

    },
    onCancel: function () {
        var frm = this.getView().getForm();
        if (frm.isValid()) {
            frm.findField('inq_status').setValue('dlv_cancel');
            frm.findField('inq_status_nm').setValue('접수등록');
            frm.findField('addchk').setValue('no');
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
            frm.findField('addchk').setValue('no');
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
	onModify: function(){
	    var frm = this.getView().getForm();
	    var pl = this.getView();
       frm.findField('addchk').setValue('yes');
       var store = pl.lookupReference('itemList').getStore();
       var records = store.getRange();

       Ext.each(pl.query('hiddenfield[name=inq_item_nm]'), function (obj) {
           pl.remove(obj);
       });
       for (var i = 0; i < records.length; i++) {
           var val = records[i].get('INQ_ITEM_NM');
           if (records[i].get('INQ_ITEM_GB') != '') val = '[' + records[i].get('INQ_ITEM_GB') + ']' + val;
           pl.add({ xtype: 'hiddenfield', name: 'inq_item_nm', value: val });
       }
       this.onSubmit();
	},

	onSubmit: function(){ 
		var pl = Ext.getCmp('followupDetail');
		var form = pl.getForm(); 		
		Ysn.Util.cbEmptyVal(Ext.getCmp('followupDetail')); 
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
				   
				       /* Ext.getCmp('followupDetail').load({
				            url: '/ProductInquiry/inquiryDetail?inq_cd=' + form.findField('inq_cd').getValue() //,waitMsg: 'loading...',	
				        });*/
						if(form.findField('addchk').getValue() == 'yes'){
                            Ext.getCmp('followupDetail').load({
				            url: '/ProductInquiry/inquiryDetail?language='+localeCd+'&inq_cd=' + form.findField('inq_cd').getValue() // 
                            });
                            pl.lookupReference('itemList').getStore().reload();
						}else{
							form.reset();
							pl.lookupReference('itemList').getStore().removeAll();
						}
				   
				   Ext.getCmp('followup-search').getController('followup-search').onSubmitClick(); 
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
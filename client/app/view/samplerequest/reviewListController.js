Ext.define('Ysn.view.samplerequest.reviewListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.samplerequest-reviewList', 
    init: function() {
	  
	}
});

Ext.define('Ysn.view.samplerequest.reviewDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.samplerequest-reviewDetail', 
    init: function() {
	 this.lookupReference('project_poss').store.load({params:{up_code_id:'PROJECT_POSS' , lang: localeCd}}); 
	 this.lookupReference('smr_type').store.load({params:{up_code_id:'SMR_TYPE', lang: localeCd}}); 
	 //this.lookupReference('smr_type').setValue('SMRTP_100');
	 this.lookupReference('packing_info').store.load({ params: { up_code_id: 'PACKING_INFO', lang: localeCd } });
     //this.lookupReference('sample_prodinfo').hide();
     
     var pumpItem = this.lookupReference('sample_pump');
	 var idx = 8;
	 var pumpLv = [Locale.getMsg('버튼'),Locale.getMsg('버튼금속'),Locale.getMsg('스템'),Locale.getMsg('노즐'),Locale.getMsg('실린더'),Locale.getMsg('실캡'),Locale.getMsg('하우징'),'Pump Collar','Pump Shoulder','Gasket',Locale.getMsg('체크밸브'),'Undercap',Locale.getMsg('스프링')];
	 for (var i=0;i<13 ; i++)
	 {  
		pumpItem.insert(idx,{xtype: 'hiddenfield', name: 'pump_id', itemId: 'pump_id'+i });
		pumpItem.insert(idx+1,{xtype: 'label', text: pumpLv[i], tdAttrs:{style:{width:'70px',backgroundColor:'#EFEFEF'}}});
		if(i == 0 ||i == 7 || i == 8 ){
			pumpItem.insert(idx+2,{xtype: 'textfield', name: 'pump_code', fieldStyle: 'background:#f6f6f6',itemId: 'pump_code'+i });
			pumpItem.insert(idx+3,{xtype: 'textfield', name: 'pump_material', fieldStyle: 'background:#f6f6f6',itemId: 'pump_material'+i });
			pumpItem.insert(idx+4,{xtype: 'textfield', name: 'pump_inject', fieldStyle: 'background:#f6f6f6',itemId: 'pump_inject'+i });
		}else{
			pumpItem.insert(idx+2,{xtype: 'textfield', name: 'pump_code', itemId: 'pump_code'+i,
				inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true});
			pumpItem.insert(idx+3,{xtype: 'textfield', name: 'pump_material', itemId: 'pump_material'+i,
				inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true});
			pumpItem.insert(idx+4,{xtype: 'textfield', name: 'pump_inject', itemId: 'pump_inject'+i,
				inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true});
		}
		if(i == 8 ){
			pumpItem.insert(idx+5,{xtype: 'textfield', name: 'pump_coat', fieldStyle: 'background:#f6f6f6',itemId: 'pump_coat'+i });
			pumpItem.insert(idx+6,{xtype: 'textfield', name: 'pump_hstmpc', fieldStyle: 'background:#f6f6f6',itemId: 'pump_hstmpc'+i});
			pumpItem.insert(idx+7,{xtype: 'textfield', name: 'pump_ss', fieldStyle: 'background:#f6f6f6',itemId: 'pump_ss'+i});		
		}else{
			pumpItem.insert(idx+5,{xtype: 'textfield', name: 'pump_coat', itemId: 'pump_coat'+i,
				inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true});
			pumpItem.insert(idx+6,{xtype: 'textfield', name: 'pump_hstmpc', itemId: 'pump_hstmpc'+i,
				inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true});
			pumpItem.insert(idx+7,{xtype: 'textfield', name: 'pump_ss', itemId: 'pump_ss'+i,
				inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true});		
		} 
		pumpItem.insert(idx+8,{xtype: 'textfield', name: 'pump_moldno', itemId: 'pump_moldno'+i,
			inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true});
		idx = idx + 9; 
	 }
	  pumpItem.insert(idx+1,{ xtype: 'label', text: Locale.getMsg('포장방법/체결여부'), tdAttrs:{style:{width:'70px',backgroundColor:'#EFEFEF'}}});
	  pumpItem.insert(idx+2,{ xtype: 'textfield', colspan: 7, name: 'pump_pkg',itemId: 'pump_pkg',fieldStyle: 'background:#f6f6f6', style:{width:'100%'}}); 
      pumpItem.insert(idx+3,{ xtype: 'label', text: Locale.getMsg('특이사항'), tdAttrs:{style:{width:'70px',backgroundColor:'#EFEFEF'}}});
	  pumpItem.insert(idx+4,{ xtype: 'textareafield', colspan: 7, name: 'pump_rmt',itemId: 'pump_rmt',fieldStyle: 'background:#f6f6f6',style:{width:'100%'}}); 

	 var bottleItem = this.lookupReference('sample_bottle');
	 var bottleLv = ['Shoulder','Outer','Inner',Locale.getMsg('피스톤'),'Base','Gasket'];
	 
	 idx = 8;
	 for (var i=0;i<6 ; i++)
	 {  		
		 
		bottleItem.insert(idx,{xtype: 'hiddenfield', name: 'bottle_id', itemId: 'bottle_id'+i});
		bottleItem.insert(idx+1,{xtype: 'label', text: bottleLv[i], tdAttrs:{style:{width:'70px',backgroundColor:'#EFEFEF'}}}); 
		if(i != 3 && i != 5 ){
			bottleItem.insert(idx+2,{xtype: 'textfield', name: 'bottle_code', fieldStyle: 'background:#f6f6f6',itemId: 'bottle_code'+i });
			bottleItem.insert(idx+3,{xtype: 'textfield', name: 'bottle_material', fieldStyle: 'background:#f6f6f6',itemId: 'bottle_material'+i });
			bottleItem.insert(idx+4,{xtype: 'textfield', name: 'bottle_inject', fieldStyle: 'background:#f6f6f6',itemId: 'bottle_inject'+i }); 		
			bottleItem.insert(idx+5,{xtype: 'textfield', name: 'bottle_coat', fieldStyle: 'background:#f6f6f6',itemId: 'bottle_coat'+i });
			bottleItem.insert(idx+6,{xtype: 'textfield', name: 'bottle_hstmpc', fieldStyle: 'background:#f6f6f6',itemId: 'bottle_hstmpc'+i}); 
			bottleItem.insert(idx+7,{xtype: 'textfield', name: 'bottle_ss', fieldStyle: 'background:#f6f6f6',itemId: 'bottle_ss'+i});		
		}else{ 
			bottleItem.insert(idx+2,{xtype: 'textfield', name: 'bottle_code',itemId: 'bottle_code'+i,
				inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true});
			bottleItem.insert(idx+3,{xtype: 'textfield', name: 'bottle_material',itemId: 'bottle_material'+i,
				inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true});
			bottleItem.insert(idx+4,{xtype: 'textfield', name: 'bottle_inject',itemId: 'bottle_inject'+i,
				inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true});	
			bottleItem.insert(idx+5,{xtype: 'textfield', name: 'bottle_coat',itemId: 'bottle_coat'+i,
				inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true});
			bottleItem.insert(idx+6,{xtype: 'textfield', name: 'bottle_hstmpc',itemId: 'bottle_hstmpc'+i,
				inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true}); 
			bottleItem.insert(idx+7,{xtype: 'textfield', name: 'bottle_ss',itemId: 'bottle_ss'+i,
				inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true});		
		} 
		bottleItem.insert(idx+8,{xtype: 'textfield', name: 'bottle_moldno', itemId: 'bottle_moldno'+i,
			inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true});
		idx = idx + 9; 
	 }
	  bottleItem.insert(idx+1,{ xtype: 'label', text: Locale.getMsg('포장방법/체결여부'), tdAttrs:{style:{width:'70px',backgroundColor:'#EFEFEF'}}});
	  bottleItem.insert(idx+2,{ xtype: 'textfield', colspan: 7, name: 'bottle_pkg',itemId:'bottle_pkg',fieldStyle: 'background:#f6f6f6', style:{width:'100%'}});       
      bottleItem.insert(idx+3,{ xtype: 'label', text: Locale.getMsg('특이사항'), tdAttrs:{style:{width:'40px',backgroundColor:'#EFEFEF'}}});
	  bottleItem.insert(idx+4,{ xtype: 'textareafield', colspan: 7, name: 'bottle_rmt',itemId:'bottle_rmt',fieldStyle: 'background:#f6f6f6', style:{width:'100%'}}); 

	 var overcapItem = this.lookupReference('sample_overcap');
	 var overcapLv = [Locale.getMsg('캡장식/금속'),'Over Cap','Gasket'];
	 idx = 8;
	 for (var i=0;i<3 ; i++)
	 {  
		overcapItem.insert(idx,{xtype: 'hiddenfield', name: 'overcap_id', itemId: 'overcap_id'+i});
		overcapItem.insert(idx+1,{xtype: 'label', text: overcapLv[i], tdAttrs:{style:{width:'70px',backgroundColor:'#EFEFEF'}}}); 
		if(i == 1 ){
			overcapItem.insert(idx+2,{xtype: 'textfield', name: 'overcap_code', fieldStyle: 'background:#f6f6f6',itemId: 'overcap_code'+i });
			overcapItem.insert(idx+3,{xtype: 'textfield', name: 'overcap_material', fieldStyle: 'background:#f6f6f6',itemId: 'overcap_material'+i });
			overcapItem.insert(idx+4,{xtype: 'textfield', name: 'overcap_inject', fieldStyle: 'background:#f6f6f6',itemId: 'overcap_inject'+i }); 		
			overcapItem.insert(idx+5,{xtype: 'textfield', name: 'overcap_coat', fieldStyle: 'background:#f6f6f6',itemId: 'overcap_coat'+i });
			overcapItem.insert(idx+6,{xtype: 'textfield', name: 'overcap_hstmpc', fieldStyle: 'background:#f6f6f6',itemId: 'overcap_hstmpc'+i}); 
			overcapItem.insert(idx+7,{xtype: 'textfield', name: 'overcap_ss',fieldStyle: 'background:#f6f6f6',itemId: 'overcap_ss'+i});		
		}else{ 
			overcapItem.insert(idx+2,{xtype: 'textfield', name: 'overcap_code',width:70,itemId: 'overcap_code'+i,
				inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true});
			overcapItem.insert(idx+3,{xtype: 'textfield', name: 'overcap_material',width:70,itemId: 'overcap_material'+i,
				inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true});
			overcapItem.insert(idx+4,{xtype: 'textfield', name: 'overcap_inject',width:70,itemId: 'overcap_inject'+i,
				inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true});	
			overcapItem.insert(idx+5,{xtype: 'textfield', name: 'overcap_coat',width:70,itemId: 'overcap_coat'+i,
				inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true});
			overcapItem.insert(idx+6,{xtype: 'textfield', name: 'overcap_hstmpc',width:70,itemId: 'overcap_hstmpc'+i,
				inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true}); 
			overcapItem.insert(idx+7,{xtype: 'textfield', name: 'overcap_ss',width:70,itemId: 'overcap_ss'+i,
				inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true});		
		}  
		overcapItem.insert(idx+8,{xtype: 'textfield', name: 'overcap_moldno', width:70,itemId: 'overcap_moldno'+i,
			inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true});
		idx = idx + 9; 
	 } 
	  overcapItem.insert(idx+1,{ xtype: 'label', text: Locale.getMsg('포장방법/체결여부'), tdAttrs:{style:{width:'80px',backgroundColor:'#EFEFEF'}}});
	  overcapItem.insert(idx+2,{ xtype: 'textfield', colspan: 7, name: 'overcap_pkg',itemId:'overcap_pkg',fieldStyle: 'background:#f6f6f6', style:{width:'100%'}});    
      overcapItem.insert(idx+3,{ xtype: 'label', text: Locale.getMsg('특이사항'), tdAttrs:{style:{width:'40px',backgroundColor:'#EFEFEF'}}});
	  overcapItem.insert(idx+4,{ xtype: 'textareafield', colspan: 7, name: 'overcap_rmt',itemId:'overcap_rmt',fieldStyle: 'background:#f6f6f6', style:{width:'100%'}}); 
	},
	onChange: function( cb , newValue , oldValue , eOpts ){
		if(newValue == 'SMRTP_200'){
			Ext.getCmp('reviewDetail').lookupReference('sample_prodinfo').show();
			Ext.getCmp('reviewDetail').lookupReference('sample_pump').hide();
			Ext.getCmp('reviewDetail').lookupReference('sample_bottle').hide();
			Ext.getCmp('reviewDetail').lookupReference('sample_overcap').hide();
		}else if(newValue == 'SMRTP_300'){
			Ext.getCmp('reviewDetail').lookupReference('sample_prodinfo').show();
			Ext.getCmp('reviewDetail').lookupReference('sample_pump').show();
			Ext.getCmp('reviewDetail').lookupReference('sample_bottle').hide();
			Ext.getCmp('reviewDetail').lookupReference('sample_overcap').show();
		}else{
			Ext.getCmp('reviewDetail').lookupReference('sample_prodinfo').hide();
			Ext.getCmp('reviewDetail').lookupReference('sample_pump').show();
			Ext.getCmp('reviewDetail').lookupReference('sample_bottle').show();
			Ext.getCmp('reviewDetail').lookupReference('sample_overcap').show();
		}
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
			var win = Ext.getCmp('common-searchPartUser');
			if(!win){
			  win = new Ysn.view.common.searchPartUser();
			}
			var hidfield = win.down('#paentFrm');
			win.down('#user_nm').setValue(this.lookupReference('user_nm').getValue());
			hidfield.setValue('reviewDetail');
			Ext.getCmp('reviewDetail').add(win);
			win.setPosition(70,100);
			win.show();
		//}
	},
	openMail: function () {
	    //if(!Ext.getCmp('common-searchPartUser')){
	    var win5 = Ext.getCmp('common-mailForm');
	    if (!win5) {
	        win5 = new Ysn.view.common.mailForm();
	    }
	    var hidfield = win5.query('#paentFrm')[0];
	    var mailTitle = win5.query('#mailTitle')[0];
	    var mailBodyOri = win5.query('#mailBody')[0];
	    hidfield.setValue('reviewDetail');
	    var mtitle = ''
	    mailTitle.setValue(mtitle);
	    mailBodyOri.setValue('');
	    Ext.getCmp('samplerequest-review').add(win5);
	    win5.show();
	    //}
	},
	onPPS: function () {
	    var form = Ext.getCmp('reviewDetail').getForm();
	    var chkYn = form.findField('spec_yn').getValue();
	    //if(!Ext.getCmp('common-searchPartUser')){
	    var win3 = Ext.getCmp('commonspecChklist');
	    if (!win3) {
	        win3 = new Ysn.view.common.specChklist();
	    }
	    var frm = win3.lookupReference('commonspecChkform');
	    var hidfield = frm.down('#paentFrm');
	    var smpCd = frm.down('#smp_cd');
	    var smpChasu = frm.down('#smp_chasu');
	    hidfield.setValue('reviewDetail');
	    smpCd.setValue(this.lookupReference('smp_cd').getValue());
	    smpChasu.setValue(this.lookupReference('smp_chasu').getValue());
	    if (this.lookupReference('specchk_cnt').getValue() != '0') {
	        frm.getForm().load({
	            url: '/SampleManage/specDetail?smp_cd=' + this.lookupReference('smp_cd').getValue() + '&smp_chasu=' + this.lookupReference('smp_chasu').getValue(),
	            success: function (form, action) {
					
                    if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
	                var dataVal = Ext.JSON.decode(action.response.responseText);
	                if (chkYn == 'Y') win3.lookupReference('commonspecChkform').down('#btn1').hide();
	            }
	        })
	    }
	    Ext.getCmp('samplerequest-review').add(win3);
	    win3.setPosition(100, 10);
	    win3.show();
	    //}
	},
    resetVal: function(){
		this.lookupReference('user_nm').setValue('');
		this.lookupReference('user_cd').setValue('');
	},
    onStatusChg: function (el, newValue, oldValue, eOpts) {
        var Pl = Ext.getCmp('reviewDetail');
        if (newValue == '') {
            Pl.down('#btn1').hide(); //검토반려 
            Pl.down('#btn2').hide(); //검토승인
            Pl.down('#print').show(); //인쇄
            Pl.down('#btn11').hide(); //메일발송
        }
        if (newValue == 'SMSTAT_050') {
            Pl.down('#btn1').show(); //검토반려 
            Pl.down('#btn2').show(); //검토승인  
            Pl.down('#print').show(); //인쇄
        } else if (newValue == 'SMSTAT_700') {
            Pl.down('#btn1').hide(); //요청반려 
            Pl.down('#btn2').hide(); //요청접수 
            Pl.down('#print').show(); //인쇄
            Pl.down('#btn11').show(); //메일발송
        } else if (newValue != '') {
            Pl.down('#btn1').hide(); //검토반려 
            Pl.down('#btn2').hide(); //검토승인
            Pl.down('#print').show(); //인쇄
            Pl.down('#btn11').hide(); //메일발송
        }
    },

    onReturnHis: function () {
        this.getView().down('#btn_yn').setValue('N');
        this.onReturn2();
    },
    onReturnNew: function () {
        this.getView().down('#btn_yn').setValue('Y');
        this.onReturn2();
    },
    onReturn: function () {
        var rejectPop = Ext.getCmp('common-smr_rejectPop');
        var Frm = Ext.getCmp('reviewDetail').getForm();
        var smr_cd = Frm.findField('smr_cd').getValue();
        var smr_chasu = Frm.findField('smr_chasu').getValue();
        var smp_status = Frm.findField('smp_status').getValue();
        var btn_yn = 'N';
        if (!rejectPop) {
            rejectPop = new Ysn.view.common.smr_rejectPop();
        }
        var hidfield = rejectPop.query('#parentfrm')[0];
        hidfield.setValue('reviewDetail');
        rejectPop.lookupReference('common-smr_rejectPopDetail').getForm().load({
            url: '/popup/popupSmrSampleReturn?smr_cd=' + smr_cd + '&smr_chasu=' + smr_chasu + '&smp_status=' + smp_status + '&btn_yn=' + btn_yn,
            success: function (form, action) { 
                    if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
                if (btn_yn == 'Y') {
                    rejectPop.lookupReference('common-smr_rejectPopDetail').down('#btn1').show();
                } else {
                    rejectPop.lookupReference('common-smr_rejectPopDetail').down('#btn1').hide();
                }
            }
        })
        Ext.getCmp('reviewDetail').add(rejectPop);
        rejectPop.show();
    },
    onReturn2: function () {
        var reviewPop = Ext.getCmp('common-smr_reviewPop');
        var Frm = Ext.getCmp('reviewDetail').getForm();
        var smr_cd = Frm.findField('smr_cd').getValue();
        var smr_chasu = Frm.findField('smr_chasu').getValue();
        var smp_status = Frm.findField('smp_status').getValue();
        var btn_yn = Frm.findField('btn_yn').getValue();
        if (!reviewPop) {
            reviewPop = new Ysn.view.common.smr_reviewPop();
        }
        var hidfield = reviewPop.query('#parentfrm')[0];
        hidfield.setValue('reviewDetail');
        reviewPop.lookupReference('common-smr_reviewPopDetail').getForm().load({
            url: '/popup/popupSmrCheckReturn?smr_cd=' + smr_cd + '&smr_chasu=' + smr_chasu + '&smp_status=' + smp_status + '&btn_yn=' + btn_yn,
            success: function (form, action) {
				
                    if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
                if (btn_yn == 'Y') {
                    reviewPop.lookupReference('common-smr_reviewPopDetail').down('#btn1').show();
                } else {
                    reviewPop.lookupReference('common-smr_reviewPopDetail').down('#btn1').hide();
                }
            }
        })
        Ext.getCmp('reviewDetail').add(reviewPop);
        reviewPop.show();
    },
    onRepair: function () {
        var repairPop = Ext.getCmp('common-smr_RepairPop');
        var Frm = Ext.getCmp('reviewDetail').getForm();
        var smr_cd = Frm.findField('smr_cd').getValue();
        var smr_chasu = Frm.findField('smr_chasu').getValue();
        var smp_status = Frm.findField('smp_status').getValue();
        var btn_yn = 'N';
        if (!repairPop) {
            repairPop = new Ysn.view.common.smr_RepairPop();
        }
        var hidfield = repairPop.query('#parentfrm')[0];
        hidfield.setValue('reviewDetail');
        repairPop.lookupReference('common-smr_RepairPopDetail').getForm().load({
            url: '/popup/popupSmrRepair?smr_cd=' + smr_cd + '&smr_chasu=' + smr_chasu + '&smp_status=' + smp_status + '&btn_yn=' + btn_yn,
            success: function (form, action) {
				
                    if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
                if (btn_yn == 'Y') {
                    repairPop.lookupReference('common-smr_RepairPopDetail').down('#btn1').show();
                } else {
                    repairPop.lookupReference('common-smr_RepairPopDetail').down('#btn1').hide();
                }
            }
        })
        Ext.getCmp('reviewDetail').add(repairPop);
        repairPop.show();
    },
    onDrop: function () {
        var dropPop = Ext.getCmp('common-smr_dropPop');
        var Frm = Ext.getCmp('reviewDetail').getForm();
        var smr_cd = Frm.findField('smr_cd').getValue();
        var smr_chasu = Frm.findField('smr_chasu').getValue();
        var smp_status = Frm.findField('smp_status').getValue();
        var btn_yn = Frm.findField('btn_yn').getValue()
        if (!dropPop) {
            dropPop = new Ysn.view.common.smr_dropPop();
        }
        var hidfield = dropPop.query('#parentfrm')[0];
        hidfield.setValue('reviewDetail');
        dropPop.lookupReference('common-smr_dropPopDetail').getForm().load({
            url: '/popup/popupSmrDrop?smr_cd=' + smr_cd + '&smr_chasu=' + smr_chasu + '&smp_status=' + smp_status + '&btn_yn=' + btn_yn,
            success: function (form, action) {
				
                    if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
                if (btn_yn == 'Y') {
                    dropPop.lookupReference('common-smr_dropPopDetail').down('#btn1').show();
                } else {
                    dropPop.lookupReference('common-smr_dropPopDetail').down('#btn1').hide();
                }
            }
        })
        Ext.getCmp('reviewDetail').add(dropPop);
        dropPop.show();
    },
    print: function () {
        var pl = this.getView();
        var smpPump = Ysn.Global.smpPump;
        var smpBottle = Ysn.Global.smpBottle;
        var smpOvercap = Ysn.Global.smpOvercap;
        var smpPridinfo = Ysn.Global.smpPridinfo;
        var smpTop = Ysn.Global.smpTop;
        var smpBottom = Ysn.Global.smpBottom;
        var printBody = pl.lookupReference('printBody');

        for (var i = 0; i < 13; i++) {
            smpPump = smpPump.replace('pump' + (i + 1) + '_1', pl.down('#pump_code' + i).getValue());
            smpPump = smpPump.replace('pump' + (i + 1) + '_2', pl.down('#pump_material' + i).getValue());
            smpPump = smpPump.replace('pump' + (i + 1) + '_3', pl.down('#pump_inject' + i).getValue());
            smpPump = smpPump.replace('pump' + (i + 1) + '_4', pl.down('#pump_coat' + i).getValue());
            smpPump = smpPump.replace('pump' + (i + 1) + '_5', pl.down('#pump_hstmpc' + i).getValue());
            smpPump = smpPump.replace('pump' + (i + 1) + '_6', pl.down('#pump_ss' + i).getValue());
            smpPump = smpPump.replace('pump' + (i + 1) + '_7', pl.down('#pump_moldno' + i).getValue());

        }
        smpPump = smpPump.replace('pump_pkg', pl.down('#pump_pkg').getValue());
        smpPump = smpPump.replace('pump_remark', pl.down('#pump_rmt').getValue());


        for (var i = 0; i < 6; i++) {
            smpBottle = smpBottle.replace('bottle' + (i + 1) + '_1', pl.down('#bottle_code' + i).getValue());
            smpBottle = smpBottle.replace('bottle' + (i + 1) + '_2', pl.down('#bottle_material' + i).getValue());
            smpBottle = smpBottle.replace('bottle' + (i + 1) + '_3', pl.down('#bottle_inject' + i).getValue());
            smpBottle = smpBottle.replace('bottle' + (i + 1) + '_4', pl.down('#bottle_coat' + i).getValue());
            smpBottle = smpBottle.replace('bottle' + (i + 1) + '_5', pl.down('#bottle_hstmpc' + i).getValue());
            smpBottle = smpBottle.replace('bottle' + (i + 1) + '_6', pl.down('#bottle_ss' + i).getValue());
            smpBottle = smpBottle.replace('bottle' + (i + 1) + '_7', pl.down('#bottle_moldno' + i).getValue());
        }
        smpBottle = smpBottle.replace('bottle_pkg', pl.down('#bottle_pkg').getValue());
        smpBottle = smpBottle.replace('bottle_remark', pl.down('#bottle_rmt').getValue());


        for (var i = 0; i < 3; i++) {
            smpOvercap = smpOvercap.replace('overcap' + (i + 1) + '_1', pl.down('#overcap_code' + i).getValue());
            smpOvercap = smpOvercap.replace('overcap' + (i + 1) + '_2', pl.down('#overcap_material' + i).getValue());
            smpOvercap = smpOvercap.replace('overcap' + (i + 1) + '_3', pl.down('#overcap_inject' + i).getValue());
            smpOvercap = smpOvercap.replace('overcap' + (i + 1) + '_4', pl.down('#overcap_coat' + i).getValue());
            smpOvercap = smpOvercap.replace('overcap' + (i + 1) + '_5', pl.down('#overcap_hstmpc' + i).getValue());
            smpOvercap = smpOvercap.replace('overcap' + (i + 1) + '_6', pl.down('#overcap_ss' + i).getValue());
            smpOvercap = smpOvercap.replace('overcap' + (i + 1) + '_7', pl.down('#overcap_moldno' + i).getValue());
        }
        smpOvercap = smpOvercap.replace('overcap_pkg', pl.down('#overcap_pkg').getValue());
        smpOvercap = smpOvercap.replace('overcap_remark', pl.down('#overcap_rmt').getValue());
        //smpPridinfo
        var form = pl.getForm();
        smpPridinfo = smpPridinfo.replace('prodInfo_A1', form.findField('extr_diameter').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_A2', form.findField('neck_mold').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_A3', form.findField('offset_filmno').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_A4', form.findField('cap_spec').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_B1', form.findField('extr_layer').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_B2', form.findField('neck_orifice').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_B3', form.findField('offset_pass').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_B4', form.findField('cap_orifice').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_C1', form.findField('extr_length').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_C2', form.findField('neck_color').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_C3', form.findField('offset_coating').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_C4', form.findField('cap_outercolor').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_D1', form.findField('extr_color').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_D2', form.findField('neck_mb').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_D3', form.findField('ss_filmno').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_D4', form.findField('cap_innercolor').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_E1', form.findField('extr_mb').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_E3', form.findField('ss_pass').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_E4', form.findField('cap_deco').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_F2', form.findField('arls_color').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_F3', form.findField('hs_filmno').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_F4', form.findField('cap_supplier').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_G2', form.findField('arls_silicon').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_G3', form.findField('hs_pass').getValue());
        smpPridinfo = smpPridinfo.replace('prodInfo_G4', form.findField('cap_safetyseal').getValue());

        smpTop = smpTop.replace('basic_A1', form.findField('euser_nm').getValue());
        smpTop = smpTop.replace('basic_A2', form.findField('smr_cd').getValue());
        smpTop = smpTop.replace('basic_A3', form.findField('qruser_nm').getValue());
        smpTop = smpTop.replace('basic_A4', Ext.Date.format(form.findField('smr_crdate').getValue(), 'Y-m-d'));
        smpTop = smpTop.replace('basic_B2', form.findField('smr_chasu').getValue());
        smpTop = smpTop.replace('basic_B3', form.findField('rruser_nm').getValue());
        smpTop = smpTop.replace('basic_B4', Ext.Date.format(form.findField('smr_podate').getValue(), 'Y-m-d'));
        smpTop = smpTop.replace('basic_C1', form.findField('item_nm').getValue());
        smpTop = smpTop.replace('basic_C2', form.findField('smp_rqty').getValue());
        smpTop = smpTop.replace('basic_C3', form.findField('smp_status_nm').getValue());
        smpTop = smpTop.replace('basic_C4', Ext.Date.format(form.findField('smr_rqdate').getValue(), 'Y-m-d'));
        smpTop = smpTop.replace('basic_D3', form.findField('pur_oqty').getValue());
        smpTop = smpTop.replace('basic_D4', Ext.Date.format(form.findField('smr_rrdate').getValue(), 'Y-m-d'));
        smpTop = smpTop.replace('basic_E1', form.findField('smr_type').getRawValue());
        var basic_E3 = '';
        if (form.findField('purp_color').getValue()) basic_E3 = basic_E3 + 'Color/Deco,';
        if (form.findField('purp_test').getValue()) basic_E3 = basic_E3 + ' Test,';
        smpTop = smpTop.replace('basic_E3', basic_E3);
        smpTop = smpTop.replace('basic_E4', Ext.Date.format(form.findField('prdt_pdate').getValue(), 'Y-m-d'));
        smpTop = smpTop.replace('basic_F1', form.findField('ship_to_adrs').getValue());
        smpTop = smpTop.replace('basic_F3', form.findField('tracking_num').getValue());
        smpTop = smpTop.replace('basic_F4', Ext.Date.format(form.findField('ship_pdate').getValue(), 'Y-m-d'));
        smpTop = smpTop.replace('basic_G4', Ext.Date.format(form.findField('smr_prdate').getValue(), 'Y-m-d'));
        smpBottom = smpBottom.replace('remark1', form.findField('remark_cmt').getValue());
        smpTop = smpTop.replace('sampleDAttach_B1', form.findField('artwork_no').getValue());
        smpTop = smpTop.replace('sampleDAttach_B2', form.findField('packing_info').getRawValue());


        var attacFile1 = '';
        var attacFile2 = '';
        var file1 = pl.down('#muiltFileBox1').down('#AttachFileList').getStore().data.items;
        var file2 = pl.down('#muiltFileBox2').down('#AttachFileList').getStore().data.items;
        for (var i = 0; i < file1.length; i++) {
            attacFile1 = attacFile1 + file1[i].data['FILE_NM'];
            if (i < file1.length - 1) attacFile1 = attacFile1 + '<br>';
        }
        for (var i = 0; i < file2.length; i++) {
            attacFile2 = attacFile2 + file2[i].data['FILE_NM'];
            if (i < file2.length - 1) attacFile2 = attacFile2 + '<br>';
        }

        smpTop = smpTop.replace('sampleAttach_A1', attacFile1);
        smpTop = smpTop.replace('sampleDAttach_A1', attacFile2);

        switch (form.findField('smr_type').getValue()) {
            case 'SMRTP_100':
                printBody.setValue(smpTop + smpPump + smpBottle + smpOvercap + smpBottom);
                break;
            case 'SMRTP_200':
                printBody.setValue(smpTop + smpPridinfo + smpBottom);
                break;
            case 'SMRTP_300':
                printBody.setValue(smpTop + smpPridinfo + smpPump + smpOvercap + smpBottom);
                break;
        }


        bodyPrint(printBody.getValue());

    },
	onSubmit1: function(){ 
		var form = Ext.getCmp('reviewDetail').getForm();
		form.findField('smp_status').setValue('SMSTAT_070');
		form.findField('smp_status_nm').setValue('검토승인'); 
		this.dbProc();
	},
	onModify: function () {
	    var form = Ext.getCmp('reviewDetail').getForm(); 
	    Ysn.Util.cbEmptyVal(Ext.getCmp('reviewDetail')); 
	    if (form.isValid()) {
	        var url = '/sampleRequest/sampleRequestUpdate';
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
	                Ext.Msg.alert('처리상태', '처리완료');
	                Ext.getCmp('reviewList').store.reload();
	            },
	            failure: function(form, action) {
	                //console.log('response:'+ action);
	                var dataVal = Ext.JSON.decode(action.response.responseText)
	                Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.'); 
	                //Ext.getCmp('keymanList').store.reload();
	            }
	        });
	    }
	},
	dbProc: function(){ 
		var pl = Ext.getCmp('reviewDetail'); 
		var form = pl.getForm(); 
		Ysn.Util.cbEmptyVal(Ext.getCmp('reviewDetail')); 
		if (form.isValid()) {
			var url = '/sampleRequest/sampleRequestProc'; 
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
				   form.reset();         
		           pl.down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
		           pl.down('#muiltFileBox2').down('#AttachFileList').getStore().removeAll();
				   pl.down('#muiltFileBox1').down('#paentFrm').setValue('samplerequest-review');
					pl.down('#muiltFileBox1').down('#childFrm').setValue('#muiltFile1');
					pl.down('#muiltFileBox2').down('#paentFrm').setValue('samplerequest-review');
					pl.down('#muiltFileBox2').down('#childFrm').setValue('#muiltFile2');	
					 pl.down('#fbtn1').hide(); 
					pl.down('#fbtn2').hide();  
					pl.down('#fbtn3').hide();  
					pl.down('#fbtn4').hide();  
					pl.down('#fbtn5').hide();  
                   Ext.getCmp('reviewList').store.reload();
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
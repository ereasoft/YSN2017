Ext.define('Ysn.view.sampleproduction.approvalListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sampleproduction-approvalList', 
    init: function() {
	  
	}
});

Ext.define('Ysn.view.sampleproduction.approvalDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sampleproduction-approvalDetail', 
    init: function() {
	 this.lookupReference('smp_type').store.load({params:{up_code_id:'SMP_TYPE'}}); 
	 this.lookupReference('biz_type').store.load({params:{up_code_id:'BIZ_TYPE'}});  
	 this.lookupReference('prdt_psblt').store.load({params:{up_code_id:'PRDT_PSBLT'}}); 
	 this.lookupReference('muser_cd').store.load(); 
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
			hidfield.setValue('approvalDetail');
			Ext.getCmp('approvalDetail').add(win);
			win.setPosition(70,100);
			win.show();
		//}
	},
	openWindow2: function () {
	    var form = Ext.getCmp('approvalDetail').getForm(); 
	        //if(!Ext.getCmp('common-searchPartUser')){
	        var win2 = Ext.getCmp('commonspecChklist');
	        if (!win2) {
	            win2 = new Ysn.view.common.specChklist();
	        }
	        var frm = win2.lookupReference('commonspecChkform');
	        var hidfield = frm.down('#paentFrm');
	        var smpCd = frm.down('#smp_cd');
	        var smpChasu = frm.down('#smp_chasu');
	        hidfield.setValue('approvalDetail');
	        smpCd.setValue(this.lookupReference('smp_cd').getValue());
	        smpChasu.setValue(this.lookupReference('smp_chasu').getValue());
	        if (this.lookupReference('spec_yn').getValue() == 'Y') {
	            frm.getForm().load({
	                url: '/SampleManage/specDetail?smp_cd=' + this.lookupReference('smp_cd').getValue() + '&smp_chasu=' + this.lookupReference('smp_chasu').getValue(),
	                success: function (form, action) {
	                    var dataVal = Ext.JSON.decode(action.response.responseText);
	                    win2.lookupReference('commonspecChkform').down('#btn1').hide();
	                }
	            })
	        }
	        Ext.getCmp('sampleproduction-approval').add(win2);
	        win2.setPosition(100, 10);
	        win2.show();
 
	    //}
	},
    resetVal: function(){
		this.lookupReference('user_nm').setValue('');
		this.lookupReference('user_cd').setValue('');
    },
    onSpecBtnChg: function (el, newValue, oldValue, eOpts) {
        var Pl = Ext.getCmp('approvalDetail');
        if (newValue == 'Y') {
            Pl.down('#rtnbtn5').show();
        } else {
            Pl.down('#rtnbtn5').hide();
        }
    },
	onDropBtnChg: function(el, newValue , oldValue , eOpts ){
		var Pl = Ext.getCmp('approvalDetail');
		if(newValue == 'Y'){
			Pl.down('#rtnbtn1').show();
		}else{
			Pl.down('#rtnbtn1').hide();
		}
	},
	onReynBtnChg: function(el, newValue , oldValue , eOpts ){
		var Pl = Ext.getCmp('approvalDetail');
		if(newValue == 'Y'){
			Pl.down('#rtnbtn2').show();
		}else{
			Pl.down('#rtnbtn2').hide();
		}
	},
	onMyreynBtnChg: function(el, newValue , oldValue , eOpts ){
		var Pl = Ext.getCmp('approvalDetail');
		if(newValue == 'Y'){
			Pl.down('#rtnbtn3').show();
		}else{
			Pl.down('#rtnbtn3').hide();
		}
	},
	onRtynBtnChg: function(el, newValue , oldValue , eOpts ){
		var Pl = Ext.getCmp('approvalDetail');
		if(newValue == 'Y'){
			Pl.down('#rtnbtn4').show();
		}else{
			Pl.down('#rtnbtn4').hide();
		}
	},
	onStatusChg: function( el, newValue , oldValue , eOpts ){
		/*var Pl = Ext.getCmp('approvalDetail');
		if (newValue == 'SMSTAT_200') {
		    if (Pl.lookupReference('smp_type').getValue() != 'SMPTP_300'){
				Pl.down('#btn1').show();
		        Pl.down('#btn2').show();
		        Pl.down('#btn3').hide();
		    }
		}else if(newValue == 'SMSTAT_400'){
				Pl.down('#btn1').hide();
		        Pl.down('#btn2').hide();
				Pl.down('#btn3').show(); 
		}else if(newValue != ''){
				Pl.down('#btn1').hide();
		        Pl.down('#btn2').hide();
				Pl.down('#btn3').hide(); 
		} /*/
	},
	 
	onCancel: function(){  
	    var Frm = Ext.getCmp('approvalDetail').getForm(); 
		Frm.findField('state').setValue('COMMITION_SUCCESS_CANCEL');
		this.onSubmit();

	},
	onReject: function(){  //팝업
	    var Frm = Ext.getCmp('approvalDetail').getForm(); 
		//Frm.findField('state').setValue('COMMITION');
		//this.onSubmit();

	},
	onSuccess: function(){  
	    var Frm = Ext.getCmp('approvalDetail').getForm(); 
		Frm.findField('state').setValue('COMMITION_SUCCESS'); 
		Frm.findField('prdt_adate').setValue(new Date());
		this.onSubmit();

	},
	onDrop: function(){
		var dropPop = Ext.getCmp('common-dropPop');
		var Frm = Ext.getCmp('approvalDetail').getForm(); 
		var smp_cd = Frm.findField('smp_cd').getValue();
		var smp_chasu = Frm.findField('smp_chasu').getValue();
		var smp_status = Frm.findField('smp_status').getValue();
			if(!dropPop){
			  dropPop = new Ysn.view.common.dropPop();
			}
			var hidfield = dropPop.query('#parentfrm')[0];
			hidfield.setValue('approvalDetail');
            dropPop.lookupReference('common-dropPopDetail').getForm().load({			
			url: '/popup/popupSampleDrop?smp_cd='+smp_cd+'&smp_chasu='+smp_chasu+'&smp_status='+smp_status,
			success: function(form, action) {
            Ysn.Util.OnsessOut(action.response.responseText);				
					var dataVal = Ext.JSON.decode(action.response.responseText);
					if(dataVal.SMP_DROP == 'N') dropPop.lookupReference('common-dropPopDetail').down('#btn1').show();
			}
			})
			Ext.getCmp('approvalDetail').add(dropPop); 
			dropPop.show();
	},
	onRepair: function(){
		var RepairPop = Ext.getCmp('common-RepairPop');
		var Frm = Ext.getCmp('approvalDetail').getForm(); 
		var smp_cd = Frm.findField('smp_cd').getValue();
		var smp_chasu = Frm.findField('smp_chasu').getValue();
		var smp_status = Frm.findField('smp_status').getValue();
			if(!RepairPop){
			  RepairPop = new Ysn.view.common.RepairPop();
			}
			var hidfield = RepairPop.query('#parentfrm')[0];
			hidfield.setValue('approvalDetail');
            RepairPop.lookupReference('common-RepairPopDetail').getForm().load({			
			url: '/popup/popupSampleRepair?smp_cd='+smp_cd+'&smp_chasu='+smp_chasu+'&smp_status='+smp_status,
			success: function(form, action) {
            Ysn.Util.OnsessOut(action.response.responseText);				
					var dataVal = Ext.JSON.decode(action.response.responseText);
					if(dataVal.INFO.REPAIR_YN == 'N') RepairPop.lookupReference('common-RepairPopDetail').down('#btn1').show();
			}
			})
			Ext.getCmp('approvalDetail').add(RepairPop); 
			RepairPop.show();
	},	
	onMyRepair: function(){
		var myRepairPop = Ext.getCmp('common-myRepairPop');
		var Frm = Ext.getCmp('approvalDetail').getForm(); 
		var smp_cd = Frm.findField('smp_cd').getValue();
		var smp_chasu = Frm.findField('smp_chasu').getValue();
		var smp_status = Frm.findField('smp_status').getValue();
			if(!myRepairPop){
			  myRepairPop = new Ysn.view.common.myRepairPop();
			}
			var hidfield = myRepairPop.query('#parentfrm')[0];
			hidfield.setValue('approvalDetail');
            myRepairPop.lookupReference('common-myRepairPopDetail').getForm().load({			
			url: '/popup/popupSampleMyRepair?smp_cd='+smp_cd+'&smp_chasu='+smp_chasu+'&smp_status='+smp_status,
			success: function(form, action) {
            Ysn.Util.OnsessOut(action.response.responseText);				
					var dataVal = Ext.JSON.decode(action.response.responseText);
					if(dataVal.INFO.REPAIR_YN == 'N') myRepairPop.lookupReference('common-myRepairPopDetail').down('#btn1').show();
			}
			})
			Ext.getCmp('approvalDetail').add(myRepairPop); 
			myRepairPop.show();
	},
	onReject: function(){
		var rejectPop = Ext.getCmp('common-rejectPop');
		var Frm = Ext.getCmp('approvalDetail').getForm(); 
		var smp_cd = Frm.findField('smp_cd').getValue();
		var smp_chasu = Frm.findField('smp_chasu').getValue();
		var smp_status = Frm.findField('smp_status').getValue();
			if(!rejectPop){
			  rejectPop = new Ysn.view.common.rejectPop();
			}
			var hidfield = rejectPop.query('#parentfrm')[0];
			hidfield.setValue('approvalDetail');
            rejectPop.lookupReference('common-rejectPopDetail').getForm().load({			
			url: '/popup/popupSampleReturn?smp_cd='+smp_cd+'&smp_chasu='+smp_chasu+'&smp_status='+smp_status,
			success: function(form, action) {
            Ysn.Util.OnsessOut(action.response.responseText);				
					var dataVal = Ext.JSON.decode(action.response.responseText);
					if(dataVal.SMP_RT_YN == 'N') rejectPop.lookupReference('common-rejectPopDetail').down('#btn1').show();
			}
			})
			Ext.getCmp('approvalDetail').add(rejectPop); 
			rejectPop.show();
	},
	onSubmit: function(){ 
		var Pl = Ext.getCmp('approvalDetail');
		var form = Pl.getForm(); 
		Ysn.Util.cbEmptyVal(Ext.getCmp('approvalDetail')); 
		if (form.isValid()) {
			var url = '/SampleManage/newSmpinsert'; 
			form.setConfig('url',url);
			form.submit({
				waitMsg:'Processing...', 
                method: 'POST',
				params: form.getValues(),	
				submitEmptyText:false,
				success: function(form, action) {
				if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
				   var dataVal = Ext.JSON.decode(action.response.responseText)
				   
					var smpStatus = '', smpStatusNm = '';
					form.reset(); 
					Pl.down('#btn1').hide(); 		
					Pl.down('#btn2').hide();
					Pl.down('#btn3').hide(); 
					Pl.down('#rtnbtn1').hide();
					Pl.down('#rtnbtn2').hide();
					Pl.down('#rtnbtn3').hide();
					Pl.down('#rtnbtn4').hide();
					Pl.down('#rtnbtn5').hide();
					Pl.down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
					Pl.down('#muiltFileBox2').down('#AttachFileList').getStore().removeAll();
					Pl.down('#muiltFileBox3').down('#AttachFileList').getStore().removeAll();
					//Frm.findField('state').setValue('DELETE'); 
					/*switch(dataVal.smp_status){
						case 'NEW' :  
							smpStatus = 'SMSTAT_100';
							smpStatusNm = '샘플접수';
							break;
						case 'COMMITION' :  
							smpStatus = 'SMSTAT_200';
							smpStatusNm = '제작의뢰';
							break;
						case 'COMMITION_CANCEL' :  
							smpStatus = 'SMSTAT_100';
							smpStatusNm = '샘플접수';
							break;
						case 'COMMITION_SUCCESS' :  
							smpStatus = 'SMSTAT_400';
							smpStatusNm = '제작승인';
							break;
						case 'COMMITION_SUCCESS_CANCEL' :  
							smpStatus = 'SMSTAT_200';
							smpStatusNm = '제작의뢰';
							break;
						case 'COMPLETE' :  
							smpStatus = 'SMSTAT_500';
							smpStatusNm = '제작완료';
							break;
						case 'COMPLETE_CANCEL' :  
							smpStatus = 'SMSTAT_400';
							smpStatusNm = '제작승인';
							break;
						case 'SHIPPING' :  
							smpStatus = 'SMSTAT_600';
							smpStatusNm = '배송[선적]';
							break;
						case 'PRODUCTION' :  
							smpStatus = 'SMSTAT_700';
							smpStatusNm = '제품양산';
							break;
						case 'DROP' :  
							smpStatus = 'SMSTAT_900';
							smpStatusNm = 'DROP(고객)';
							break;
						default: 
							smpStatus = '';
							smpStatusNm = '';
					}
					if(smpStatus != ''){
						form.findField('smp_status').setValue(smpStatus);
						form.findField('smp_status_nm').setValue(smpStatusNm);
					}*/
					Ext.each(Pl.query('hiddenfield[name=file_name]'), function (obj) {
                        Pl.remove(obj);
                    });
                    Ext.each(Pl.query('hiddenfield[name=file_mode]'), function (obj) {
                        Pl.remove(obj);
                    });
                    Ext.each(Pl.query('hiddenfield[name=doc_mgt]'), function (obj) {
                        Pl.remove(obj);
                    });
                    Ext.each(Pl.query('hiddenfield[name=del_file]'), function (obj) {
                        Pl.remove(obj);
                    }); 
                   Ext.getCmp('approvalList').store.reload();
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
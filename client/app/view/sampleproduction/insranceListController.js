Ext.define('Ysn.view.sampleproduction.instanceListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sampleproduction-instanceList', 
    init: function() {
	  
	}
});

Ext.define('Ysn.view.sampleproduction.instanceDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sampleproduction-instanceDetail', 
    init: function() {
        this.lookupReference('smp_type').store.load({ params: { up_code_id: 'SMP_TYPE', lang: localeCd } });
     this.lookupReference('smp_type').setValue('SMPTP_100');
     this.lookupReference('biz_type').store.load({ params: { up_code_id: 'BIZ_TYPE', lang: localeCd } });
     this.lookupReference('biz_type').setValue('600002001');
     this.lookupReference('prdt_psblt').store.load({ params: { up_code_id: 'PRDT_PSBLT', lang: localeCd } });
     this.lookupReference('prdt_psblt').setValue('PRPB_100');
	 this.lookupReference('smp_rdate').setValue(new Date()); 
	 this.getView().getForm().findField('user_cd').setValue(loginUser);
	 this.getView().getForm().findField('user_nm').setValue(username);
	 this.lookupReference('dstr_type').store.load({ params: { up_code_id: 'DSTR_TYPE', lang: localeCd } });
	 if (dstr_chn != null && dstr_chn != '') this.getView().getForm().findField('dstr_type').setValue(dstr_chn); 
	 this.getView().getForm().findField('dept_cd').setValue(dept_cd);
	 this.getView().getForm().findField('dept_nm').setValue(dept_nm);
    },
    allowBlankChk: function (el, newValue, oldValue, eOpts) {
        switch (newValue) {
            case "SMPTP_100":
                el.up('form').lookupReference('biz_type').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('base_yr').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('base_crny').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('exch_rate').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('prdt_rcdate').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('cmpt_rdate').setConfig({ 'allowBlank': false }); 
                el.up('form').lookupReference('cust_nm').setConfig({ 'allowBlank': false });
                break;
            case "SMPTP_200":
                el.up('form').lookupReference('biz_type').setConfig({ 'allowBlank': false }); 
                el.up('form').lookupReference('base_yr').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('base_crny').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('exch_rate').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('prdt_rcdate').setConfig({ 'allowBlank': true });
                el.up('form').lookupReference('cmpt_rdate').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('cust_nm').setConfig({ 'allowBlank': true });
                break;
            case "SMPTP_300":
                el.up('form').lookupReference('biz_type').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('base_yr').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('base_crny').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('exch_rate').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('prdt_rcdate').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('cmpt_rdate').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('cust_nm').setConfig({ 'allowBlank': false });
                break; 
            case "SMPTP_400":
                el.up('form').lookupReference('biz_type').setConfig({ 'allowBlank': true });
                el.up('form').lookupReference('smp_rqty').setValue('0');
                el.up('form').lookupReference('smp_rqty2').setValue('0');
                el.up('form').lookupReference('exch_rate').setValue('1');
                el.up('form').lookupReference('base_yr').setConfig({ 'allowBlank': true });
                el.up('form').lookupReference('base_crny').setConfig({ 'allowBlank': true });
                el.up('form').lookupReference('exch_rate').setConfig({ 'allowBlank': true });
                el.up('form').lookupReference('prdt_rcdate').setConfig({ 'allowBlank': true });
                el.up('form').lookupReference('cmpt_rdate').setConfig({ 'allowBlank': true });
                el.up('form').lookupReference('cust_nm').setConfig({ 'allowBlank': false });
                break;
            default:
                el.up('form').lookupReference('biz_type').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('base_yr').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('base_crny').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('exch_rate').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('prdt_rcdate').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('cmpt_rdate').setConfig({ 'allowBlank': false });
                el.up('form').lookupReference('cust_nm').setConfig({ 'allowBlank': false });
                break;
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

	},
	openPrj: function () {
	    var prj = Ext.getCmp('commonSearchpjt');
	    if (!prj) {
	        prj = new Ysn.view.common.searchpjt();
	    }
	    var hidfield = prj.query('#paentFrm')[0];
	    prj.down('#pjt_nm').setValue(this.lookupReference('pjt_nm').getValue());
	    hidfield.setValue('instanceDetail');
	    Ext.getCmp('instanceDetail').add(prj);
	   // prj.setPosition(10, -100);
	    prj.show();
	},
	resetPrj: function () {
	    this.lookupReference('pjt_nm').setValue('');
	    this.lookupReference('pjt_cd').setValue('');
	},
	openWindow: function () {
		//if(!Ext.getCmp('common-searchPartUser')){
			var win = Ext.getCmp('commonsearchItem');
			if(!win){
			  win = new Ysn.view.common.searchItem();
			}
			var hidfield = win.query('#paentFrm')[0];
			hidfield.setValue('instanceDetail');
			win.down('#item').setValue(this.lookupReference('item_nm').getValue());
			Ext.getCmp('instanceDetail').add(win); 
			win.show();
		//}
	},
    resetVal: function(){
		this.lookupReference('item_nm').setValue('');
		this.lookupReference('item_cd').setValue('');
	},
	openWindow2: function(){
		//if(!Ext.getCmp('common-searchPartUser')){
			var win2 = Ext.getCmp('commonsearchSmpCd');
			if(!win2){
			  win2 = new Ysn.view.common.searchSmpCd();
			}
			var hidfield = win2.query('#paentFrm')[0];
			hidfield.setValue('instanceDetail');
			Ext.getCmp('instanceDetail').add(win2); 
			win2.show();
		//}
	},
	openWindow3: function(){
		//if(!Ext.getCmp('common-searchPartUser')){
			var win3 = Ext.getCmp('commonSearchcustomer');
			if(!win3){
			  win3 = new Ysn.view.common.searchcustomer();
			}
			var hidfield = win3.query('#paentFrm')[0];
		    win3.down('#cust_nm').setValue(this.lookupReference('cust_nm').getValue());
			hidfield.setValue('instanceDetail');
			Ext.getCmp('instanceDetail').add(win3); 
			win3.show();
		//}
	},
	openWindow4: function () {
	    var win4 = Ext.getCmp('commonSearchEndUser');
	    if (!win4) {
	        win4 = new Ysn.view.common.searchEndUser();
	    }
	    var hidfield = win4.query('#paentFrm')[0];
	    win4.down('#euser_nm').setValue(this.lookupReference('euser_nm').getValue());
	    hidfield.setValue('instanceDetail');
	    Ext.getCmp('instanceDetail').add(win4); 
	    win4.show();
	},
	resetVal4: function () {
	    this.lookupReference('euser_nm').setValue('');
	    this.lookupReference('euser_cd').setValue('');
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
	    hidfield.setValue('instanceDetail');
	    var mtitle = '무견본 발주진행 요청의 건 - ' + this.lookupReference('item_nm').getValue();
	    mailTitle.setValue(mtitle);
	    mailBodyOri.setValue(Ysn.Global.nosmpMailBody.replace('custNm', this.lookupReference('cust_nm').getValue()));
	    Ext.getCmp('sampleproduction-instance').add(win5);
	    win5.show();
	    //}
	},
	onPPS: function () {
	    var form = Ext.getCmp('instanceDetail').getForm();
	    //if(!Ext.getCmp('common-searchPartUser')){
	    var win4 = Ext.getCmp('commonspecChklist');
	    if (!win4) {
	        win4 = new Ysn.view.common.specChklist();
	    }
	    var frm = win4.lookupReference('commonspecChkform');
	    var hidfield = frm.down('#paentFrm');
	    var smpCd = frm.down('#smp_cd');
	    var smpChasu = frm.down('#smp_chasu');
	    hidfield.setValue('instanceDetail');
	    smpCd.setValue(this.lookupReference('smp_cd').getValue());
	    smpChasu.setValue(this.lookupReference('smp_chasu').getValue());
	    if (this.lookupReference('spec_yn').getValue() == 'Y') {
	        frm.getForm().load({
	            url: '/SampleManage/specDetail?smp_cd=' + this.lookupReference('smp_cd').getValue() + '&smp_chasu=' + this.lookupReference('smp_chasu').getValue(),
	            success: function (form, action) {
	                var dataVal = Ext.JSON.decode(action.response.responseText);
	                win4.lookupReference('commonspecChkform').down('#btn1').hide();
	            }
	        })
	    }
	    Ext.getCmp('sampleproduction-instance').add(win4);
	    win4.setPosition(100, 10);
	    win4.show();

	    //}
	},
    resetVal3: function(){
		this.lookupReference('cust_nm').setValue('');
		this.lookupReference('cust_cd').setValue('');
    },
    insItem: function () { 
        var insI = Ext.getCmp('common-itemInsert');
        if (!insI) {
            insI = new Ysn.view.common.itemInsert();
        }
        var hidfield = insI.query('#paentFrm')[0];  //        var hidfield = insI.query('#paentFrm')[0];  item_nm//
        var item_nm = insI.query('#item_nm')[0];
        hidfield.setValue('instanceDetail');
		item_nm.setValue(Ext.getCmp('instanceDetail').down('#item_nm').getValue());
        Ext.getCmp('instanceDetail').add(insI);
        insI.show();
    },
	openCrny: function(){
		//if(!Ext.getCmp('common-searchPartUser')){
			var win4 = Ext.getCmp('commonsearchBaseCrny');
			if(!win4){
			  win4 = new Ysn.view.common.searchBaseCrny();
			}
			var hidfield = win4.query('#paentFrm')[0];
			hidfield.setValue('instanceDetail');
			Ext.getCmp('instanceDetail').add(win4); 
			win4.show();
		//}
	},
	onSpecBtnChg: function (el, newValue, oldValue, eOpts) {
	    var Pl = Ext.getCmp('instanceDetail');
	    if (newValue == 'Y') {
	        Pl.down('#rtnbtn5').show();
	    } else {
	        Pl.down('#rtnbtn5').hide();
	    }
	},
	onDropBtnChg: function(el, newValue , oldValue , eOpts ){
		var Pl = Ext.getCmp('instanceDetail');
		if(newValue == 'Y'){
			Pl.down('#rtnbtn1').show();
		}else{
			Pl.down('#rtnbtn1').hide();
		}
	},
	onReynBtnChg: function(el, newValue , oldValue , eOpts ){
		var Pl = Ext.getCmp('instanceDetail');
		if(newValue == 'Y'){
			Pl.down('#rtnbtn2').show();
		}else{
			Pl.down('#rtnbtn2').hide();
		}
	},
	onMyreynBtnChg: function(el, newValue , oldValue , eOpts ){
		var Pl = Ext.getCmp('instanceDetail');
		if(newValue == 'Y'){
			Pl.down('#rtnbtn3').show();
		}else{
			Pl.down('#rtnbtn3').hide();
		}
	},
	onRtynBtnChg: function(el, newValue , oldValue , eOpts ){
		var Pl = Ext.getCmp('instanceDetail');
		if(newValue == 'Y'){
			Pl.down('#rtnbtn4').show();
		}else{
			Pl.down('#rtnbtn4').hide();
		}
	},
	onStatusChg: function( el, newValue , oldValue , eOpts ){
		var Pl = Ext.getCmp('instanceDetail');
		if(newValue == 'SMSTAT_100'){
				Pl.down('#btn0').show();
				Pl.down('#btn1').show();
		        Pl.down('#btn2').show();
				Pl.down('#btn3').show();
				Pl.down('#btn4').hide();
				Pl.down('#btn5').show();
				Pl.down('#btn6').show();
				Pl.down('#btn7').hide();
				Pl.down('#btn8').hide();
				Pl.down('#btn9').hide();
				Pl.down('#btn10').hide(); 
				Pl.down('#btn00').show(); 
				Pl.down('#btn01').show(); 
				Pl.down('#btn02').show(); 
				Pl.down('#btn03').show();
				Pl.down('#btn04').show();
				Pl.down('#btn05').show();
				Pl.down('#btn06').show();
		}else if(newValue == 'SMSTAT_300'){
				Pl.down('#btn0').show();
				Pl.down('#btn1').hide();
		        Pl.down('#btn2').show();
				Pl.down('#btn3').show();
				Pl.down('#btn4').hide();
				Pl.down('#btn5').show();
				Pl.down('#btn6').show();
				Pl.down('#btn7').hide();
				Pl.down('#btn8').hide();
				Pl.down('#btn9').hide();
				Pl.down('#btn10').hide();  
				Pl.down('#btn00').show(); 
				Pl.down('#btn01').show(); 
				Pl.down('#btn02').show(); 
				Pl.down('#btn03').show();
				Pl.down('#btn04').show();
				Pl.down('#btn05').show();
				Pl.down('#btn06').show();
		}else if(newValue == 'SMSTAT_200'){
				Pl.down('#btn0').hide();
				Pl.down('#btn1').hide();
				Pl.down('#btn2').hide();
				Pl.down('#btn3').hide();
				Pl.down('#btn4').show();
				Pl.down('#btn5').hide();
				Pl.down('#btn6').hide();
				Pl.down('#btn7').hide();
				Pl.down('#btn8').hide();
				Pl.down('#btn9').hide();
				Pl.down('#btn10').hide(); 				 
				Pl.down('#btn00').hide(); 
				Pl.down('#btn01').hide(); 
				Pl.down('#btn02').hide(); 
				Pl.down('#btn03').hide();
				Pl.down('#btn04').hide();
				Pl.down('#btn05').hide();
				Pl.down('#btn06').hide();
		}else if(newValue == 'SMSTAT_500'){
				Pl.down('#btn0').hide();
				Pl.down('#btn1').hide();
				Pl.down('#btn2').hide();
				Pl.down('#btn3').hide();
				Pl.down('#btn4').hide();
				Pl.down('#btn5').hide();
				Pl.down('#btn6').hide();
				Pl.down('#btn7').show();
				Pl.down('#btn8').show();
				Pl.down('#btn9').hide();
				Pl.down('#btn10').hide();				 
				Pl.down('#btn00').hide(); 
				Pl.down('#btn01').hide(); 
				Pl.down('#btn02').hide(); 
				Pl.down('#btn03').hide();
				Pl.down('#btn04').hide();
				Pl.down('#btn05').hide();
				Pl.down('#btn06').hide();
		}else if(newValue == 'SMSTAT_600'){
				Pl.down('#btn0').hide();
				Pl.down('#btn1').hide();
				Pl.down('#btn2').show();
				Pl.down('#btn3').hide();
				Pl.down('#btn4').hide();
				Pl.down('#btn5').hide();
				Pl.down('#btn6').hide();
				Pl.down('#btn7').hide();
				Pl.down('#btn8').hide();
				//if (Pl.down('#smr_cd').getValue()) {
				    Pl.down('#btn9').show();
				//} else {
				//    Pl.down('#btn9').hide();
				//}
				Pl.down('#btn10').show();  				 
				Pl.down('#btn00').hide(); 
				Pl.down('#btn01').hide(); 
				Pl.down('#btn02').hide(); 
				Pl.down('#btn03').hide();
				Pl.down('#btn04').hide();
				Pl.down('#btn05').hide();
				Pl.down('#btn06').hide();
		}else if(newValue == 'SMSTAT_900'){
			    Pl.down('#rtnbtn1').show();
				Pl.down('#btn0').hide();
				Pl.down('#btn1').hide();
				Pl.down('#btn6').hide();		
				Pl.down('#btn2').hide();
				Pl.down('#btn3').hide();
				Pl.down('#btn4').hide();
				Pl.down('#btn5').hide();
				Pl.down('#btn7').hide();
				Pl.down('#btn8').hide();
				Pl.down('#btn9').hide();
				Pl.down('#btn10').hide();				 
				Pl.down('#btn00').hide(); 
				Pl.down('#btn01').hide(); 
				Pl.down('#btn02').hide(); 
				Pl.down('#btn03').hide();
				Pl.down('#btn04').hide();
				Pl.down('#btn05').hide();
				Pl.down('#btn06').hide();
		}else if(newValue != ''){
				Pl.down('#btn0').hide();
				Pl.down('#btn1').hide();
				Pl.down('#btn6').hide();		
				Pl.down('#btn2').hide();
				Pl.down('#btn3').hide();
				Pl.down('#btn4').hide();
				Pl.down('#btn5').hide();
				Pl.down('#btn7').hide();
				Pl.down('#btn8').hide();
				Pl.down('#btn9').hide();
				Pl.down('#btn10').hide();				 
				Pl.down('#btn00').hide(); 
				Pl.down('#btn01').hide(); 
				Pl.down('#btn02').hide(); 
				Pl.down('#btn03').hide();
				Pl.down('#btn04').hide();
				Pl.down('#btn05').hide();
				Pl.down('#btn06').hide();
		} 
	},
	onDrop: function(){
		var dropPop = Ext.getCmp('common-dropPop');
		var Frm = Ext.getCmp('instanceDetail').getForm(); 
		var smp_cd = Frm.findField('smp_cd').getValue();
		var smp_chasu = Frm.findField('smp_chasu').getValue();
		var smp_status = Frm.findField('smp_status').getValue();
			if(!dropPop){
			  dropPop = new Ysn.view.common.dropPop();
			}
			var hidfield = dropPop.query('#parentfrm')[0];
			hidfield.setValue('instanceDetail');
            dropPop.lookupReference('common-dropPopDetail').getForm().load({			
			url: '/popup/popupSampleDrop?smp_cd='+smp_cd+'&smp_chasu='+smp_chasu+'&smp_status='+smp_status,
			success: function(form, action) {
            Ysn.Util.OnsessOut(action.response.responseText);				
					var dataVal = Ext.JSON.decode(action.response.responseText);
					if(dataVal.SMP_DROP == 'N') dropPop.lookupReference('common-dropPopDetail').down('#btn1').show();
			}
			})
			Ext.getCmp('instanceDetail').add(dropPop); 
			dropPop.show();
	},
	onRepairHis: function () {

	    this.onRepair('his')
	},
	onRepairNew: function () {
	    this.onRepair('new')
	},
	onRepair: function(type){
		var RepairPop = Ext.getCmp('common-RepairPop');
		var Frm = Ext.getCmp('instanceDetail').getForm(); 
		var smp_cd = Frm.findField('smp_cd').getValue();
		var smp_chasu = Frm.findField('smp_chasu').getValue();
		var smp_status = Frm.findField('smp_status').getValue();
		var url = '';
		if (type == 'his') {
		    url= '/popup/popupSampleRepair?btn_yn=N&smp_cd='+smp_cd+'&smp_chasu='+smp_chasu+'&smp_status='+smp_status;
		} else {
		    url= '/popup/popupSampleRepair?btn_yn=Y&smp_cd=' + smp_cd + '&smp_chasu=' + smp_chasu + '&smp_status=' + smp_status;
		}
			if(!RepairPop){
			  RepairPop = new Ysn.view.common.RepairPop();
			}
			var hidfield = RepairPop.query('#parentfrm')[0];
			hidfield.setValue('instanceDetail');
            RepairPop.lookupReference('common-RepairPopDetail').getForm().load({			
            url: url,
			success: function(form, action) {
            Ysn.Util.OnsessOut(action.response.responseText);				
					var dataVal = Ext.JSON.decode(action.response.responseText);
					if (type == 'new') RepairPop.lookupReference('common-RepairPopDetail').down('#btn1').show();
			}
			})
			Ext.getCmp('instanceDetail').add(RepairPop); 
			RepairPop.show();
	},	
	onMyRepair: function(){
		var myRepairPop = Ext.getCmp('common-myRepairPop');
		var Frm = Ext.getCmp('instanceDetail').getForm(); 
		var smp_cd = Frm.findField('smp_cd').getValue();
		var smp_chasu = Frm.findField('smp_chasu').getValue();
		var smp_status = Frm.findField('smp_status').getValue();
			if(!myRepairPop){
			  myRepairPop = new Ysn.view.common.myRepairPop();
			}
			var hidfield = myRepairPop.query('#parentfrm')[0];
			hidfield.setValue('instanceDetail');
            myRepairPop.lookupReference('common-myRepairPopDetail').getForm().load({			
			url: '/popup/popupSampleMyRepair?smp_cd='+smp_cd+'&smp_chasu='+smp_chasu+'&smp_status='+smp_status,
			success: function(form, action) {
            Ysn.Util.OnsessOut(action.response.responseText);				
					var dataVal = Ext.JSON.decode(action.response.responseText);
					if(dataVal.INFO.REPAIR_YN == 'N') myRepairPop.lookupReference('common-myRepairPopDetail').down('#btn1').show();
			}
			})
			Ext.getCmp('instanceDetail').add(myRepairPop); 
			myRepairPop.show();
	},
	onReject: function(){
		var rejectPop = Ext.getCmp('common-rejectPop');
		var Frm = Ext.getCmp('instanceDetail').getForm(); 
		var smp_cd = Frm.findField('smp_cd').getValue();
		var smp_chasu = Frm.findField('smp_chasu').getValue();
		var smp_status = Frm.findField('smp_status').getValue();
			if(!rejectPop){
			  rejectPop = new Ysn.view.common.rejectPop();
			}
			var hidfield = rejectPop.query('#parentfrm')[0];
			hidfield.setValue('instanceDetail');
            rejectPop.lookupReference('common-rejectPopDetail').getForm().load({			
			url: '/popup/popupSampleReturn?smp_cd='+smp_cd+'&smp_chasu='+smp_chasu+'&smp_status='+smp_status,
			success: function(form, action) {
            Ysn.Util.OnsessOut(action.response.responseText);				
					var dataVal = Ext.JSON.decode(action.response.responseText);
					if(dataVal.SMP_RT_YN == 'N') rejectPop.lookupReference('common-rejectPopDetail').down('#btn1').show();
			}
			})
			Ext.getCmp('instanceDetail').add(rejectPop); 
			rejectPop.show();
	},
	
	onDelete: function(){  
	    var Frm = Ext.getCmp('instanceDetail').getForm(); 
		Frm.findField('state').setValue('DELETE'); 
		this.onSubmit();
		//Frm.reset();
		//Ext.getCmp('sampleproduction-instance').down('#east').toggleCollapse();


	},
	onCancel: function(){  
	    var Frm = Ext.getCmp('instanceDetail').getForm(); 
		Frm.findField('state').setValue('COMMITION_CANCEL');
		this.onSubmit();

	},
	onCommition: function(){  
	    var Frm = Ext.getCmp('instanceDetail').getForm(); 
		Frm.findField('state').setValue('COMMITION');
		this.onSubmit();

	},
	onNew: function(){  
	    var Frm = Ext.getCmp('instanceDetail').getForm();
	    if (Frm.findField('item_cd').getValue() == '') {
	        Ext.Msg.alert('필수체크', '샘플품목을 검색하세요');
	        return false;
	    }
	    if (Frm.findField('cust_cd').getValue() == '') {
	        Ext.Msg.alert('필수체크', '거래처를 검색하세요.');
	        return false;
	    }
	    if (Frm.findField('smp_rqty2').getValue() == '') {
	        Frm.findField('smp_rqty2').setValue('0');
	    }
	    var sbYn = 'Y';
	    if (Frm.findField('smp_type').getValue() == 'SMPTP_100' || Frm.findField('smp_type').getValue() == 'SMPTP_500' || Frm.findField('smp_type').getValue() == 'SMPTP_600') {
	        if (!Frm.findField('file_name')) sbYn = 'N';
	        if (Ext.getCmp('instanceDetail').down('#muiltFileBox1').down('#AttachFileList').getStore().data.items.length > 0) sbYn = 'Y';
	        if (sbYn == 'N') {
	            Ext.Msg.alert('파일첨부확인', '영업관련자료가 첨부되지 않았습니다.');
	            return false;
	        }
	    }
		Frm.findField('state').setValue('NEW');
		this.onSubmit();

	}, 
	onShipping: function(){  //팝업 -> 변경필요
	    var Frm = Ext.getCmp('instanceDetail').getForm(); 
	    Frm.findField('state').setValue('SHIPPING');
	    if (!Frm.findField('tracking_num').getValue()) {
	        Ext.Msg.alert('배송/선적', '송장번호를 입력하세요.');
	        return false;
	    } 
		this.onSubmit();

	}, 
	onProduction: function(){  //팝업
	    var Frm = Ext.getCmp('instanceDetail').getForm(); 
		Frm.findField('state').setValue('PRODUCTION');
		this.onSubmit();

	},
	onSubmit: function(){ 
		var Pl = Ext.getCmp('instanceDetail');
		var form = Pl.getForm(); 
		Ysn.Util.cbEmptyVal(Ext.getCmp('instanceDetail')); 
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
				if (form.findField('state').getValue() != 'NEW') {
				    form.reset();
				    Pl.lookupReference('biz_type').setConfig({ 'allowBlank': false });
				    Pl.lookupReference('base_yr').setConfig({ 'allowBlank': false });
				    Pl.lookupReference('base_crny').setConfig({ 'allowBlank': false });
				    Pl.lookupReference('exch_rate').setConfig({ 'allowBlank': false });
				    Pl.down('#muiltFileBox1').down('#paentFrm').setValue('sampleproduction-instance');
				    Pl.down('#muiltFileBox1').down('#childFrm').setValue('#muiltFile1');
				    form.findField('addchk').setValue('add');
				    form.findField('state').setValue('NEW');
				    form.findField('smp_rdate').setValue(new Date());
				    form.findField('user_cd').setValue(loginUser);
				    form.findField('user_nm').setValue(username);
				    form.findField('dstr_type').setValue(dstr_chn); 
				    form.findField('dept_cd').setValue(dept_cd);
				    form.findField('dept_nm').setValue(dept_nm);
				    Pl.lookupReference('smp_type').setValue('SMPTP_100');
				    Pl.lookupReference('biz_type').setValue('600002001');
				    Pl.lookupReference('prdt_psblt').setValue('PRPB_100');
				    Pl.lookupReference('smp_rdate').setValue(new Date());
				    Pl.down('#btn0').show();
				    Pl.down('#btn1').show();
				    Pl.down('#btn2').hide();
				    Pl.down('#btn3').hide();
				    Pl.down('#btn4').hide();
				    Pl.down('#btn5').hide();
				    Pl.down('#btn6').show();
				    Pl.down('#btn7').hide();
				    Pl.down('#btn8').hide();
				    Pl.down('#btn9').hide();
				    Pl.down('#btn10').hide();
				    Pl.down('#btn00').show();
				    Pl.down('#btn01').show();
				    Pl.down('#btn02').show();
				    Pl.down('#btn03').show();
				    Pl.down('#rtnbtn1').hide();
				    Pl.down('#rtnbtn2').hide();
				    Pl.down('#rtnbtn3').hide();
				    Pl.down('#rtnbtn4').hide();
				    Pl.down('#rtnbtn5').hide();
				    Pl.down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
				    Pl.down('#muiltFileBox2').down('#AttachFileList').getStore().removeAll();
				    Pl.down('#muiltFileBox3').down('#AttachFileList').getStore().removeAll();
				}
				   if(dataVal.smp_status == 'DELETE'){
						//form.reset();

                        Ext.getCmp('sampleproduction-instance').down('#east').toggleCollapse()
				   }else{ 
						var smpStatus = '', smpStatusNm = '', smp_cd = '',smp_chasu='';
						//Frm.findField('state').setValue('DELETE'); 
						switch(dataVal.smp_status){
						    case 'NEW' :  
						        smpStatus = 'SMSTAT_100';
						        smpStatusNm = '샘플접수';
						        smp_cd = dataVal.smp_cd;
						        smp_chasu = dataVal.smp_chasu;
								break;
						/*	case 'COMMITION' :  
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
								break;*/
							case 'COMPLETE' :  
								smpStatus = 'SMSTAT_500';
								smpStatusNm = '제작완료';
								break;
							/*case 'COMPLETE_CANCEL' :  
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
								smpStatusNm = '';*/
						}
						if(smpStatus != ''){
							form.findField('smp_status').setValue(smpStatus);
							form.findField('smp_status_nm').setValue(smpStatusNm);
							form.findField('smp_cd').setValue(smp_cd);
							form.findField('smp_chasu').setValue(smp_chasu);
						}
				   }
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

                    Ext.getCmp('instance-search').getController('instance-search').onSubmitClick();
                    
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
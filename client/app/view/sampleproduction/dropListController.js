Ext.define('Ysn.view.sampleproduction.dropListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sampleproduction-dropList', 
    init: function() {
	  
	}
});

Ext.define('Ysn.view.sampleproduction.dropDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sampleproduction-dropDetail', 
    init: function() {
	/* this.lookupReference('inq_chnl').store.load({params:{up_code_id:'INQ_CHNL'}}); 
	 this.lookupReference('inq_type').store.load({params:{up_code_id:'INQ_TYPE'}});  
	 this.lookupReference('inq_item_nm').store.load({params:{up_code_id:'INQ_ITEM'}});
	 this.lookupReference('dstr_type').store.load({params:{up_code_id:'DSTR_TYPE'}});  
	 this.lookupReference('nat_cd').store.load();  
	 this.lookupReference('inq_status').store.load({params:{up_code_id:'INQ_STATUS'}});  */

    /* var pumpItem = this.lookupReference('sample_pump');
	 var idx = 7;
	 for (var i=0;i<14 ; i++)
	 {  
		for(var j=0;j<8; j++)
		 {
			idx = idx + 1;
			pumpItem.insert(idx,{xtype: 'textfield', name: (idx-7), value: idx});
		 }
	 }
      pumpItem.insert(idx+1,{ xtype: 'label', text: '특이사항', tdAttrs:{style:{width:'40px',backgroundColor:'#EFEFEF'}}});
	  pumpItem.insert(idx+2,{ xtype: 'textareafield', colspan: 7, name: 'pump_rmt',style:{width:'100%'}}); 

	 var bottleItem = this.lookupReference('sample_bottle');
	 idx = 7;
	 for (var i=0;i<8 ; i++)
	 {  
		for(var j=0;j<8; j++)
		 {
			idx = idx + 1;
			bottleItem.insert(idx,{xtype: 'textfield', name: (idx-7), value: idx});
		 }
	 }
      bottleItem.insert(idx+1,{ xtype: 'label', text: '특이사항', tdAttrs:{style:{width:'40px',backgroundColor:'#EFEFEF'}}});
	  bottleItem.insert(idx+2,{ xtype: 'textareafield', colspan: 7, name: 'bottle_rmt',style:{width:'100%'}}); 

	 var overcapItem = this.lookupReference('sample_overcap');
	 idx = 7;
	 for (var i=0;i<5 ; i++)
	 {  
		for(var j=0;j<8; j++)
		 {
			idx = idx + 1;
			overcapItem.insert(idx,{xtype: 'textfield', name: (idx-7), value: idx});
		 }
	 }
      overcapItem.insert(idx+1,{ xtype: 'label', text: '특이사항', tdAttrs:{style:{width:'40px',backgroundColor:'#EFEFEF'}}});
	  overcapItem.insert(idx+2,{ xtype: 'textareafield', colspan: 7, name: 'overcap_rmt',style:{width:'100%'}}); */

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
			hidfield.setValue('dropDetail');
			Ext.getCmp('dropDetail').add(win);
			win.setPosition(70,100);
			win.show();
		//}
	},
    resetVal: function(){
		this.lookupReference('user_nm').setValue('');
		this.lookupReference('user_cd').setValue('');
	},
	onDropBtnChg: function(el, newValue , oldValue , eOpts ){
		var Pl = Ext.getCmp('dropDetail');
		if(newValue == 'Y'){
			Pl.down('#rtnbtn1').show();
		}else{
			Pl.down('#rtnbtn1').hide();
		}
	},
	onReynBtnChg: function(el, newValue , oldValue , eOpts ){
		var Pl = Ext.getCmp('dropDetail');
		if(newValue == 'Y'){
			Pl.down('#rtnbtn2').show();
		}else{
			Pl.down('#rtnbtn2').hide();
		}
	},
	onMyreynBtnChg: function(el, newValue , oldValue , eOpts ){
		var Pl = Ext.getCmp('dropDetail');
		if(newValue == 'Y'){
			Pl.down('#rtnbtn3').show();
		}else{
			Pl.down('#rtnbtn3').hide();
		}
	},
	onRtynBtnChg: function(el, newValue , oldValue , eOpts ){
		var Pl = Ext.getCmp('dropDetail');
		if(newValue == 'Y'){
			Pl.down('#rtnbtn4').show();
		}else{
			Pl.down('#rtnbtn4').hide();
		}
	},
	onDrop: function(){
		var dropPop = Ext.getCmp('common-dropPop');
		var Frm = Ext.getCmp('dropDetail').getForm();
		var smp_cd = Frm.findField('smp_cd').getValue();
		var smp_chasu = Frm.findField('smp_chasu').getValue();
		var smp_status = Frm.findField('smp_status').getValue();
			if(!dropPop){
			  dropPop = new Ysn.view.common.dropPop();
			}
			var hidfield = dropPop.query('#parentfrm')[0];
			hidfield.setValue('dropDetail');
            dropPop.lookupReference('common-dropPopDetail').getForm().load({			
			url: '/popup/popupSampleDrop?smp_cd='+smp_cd+'&smp_chasu='+smp_chasu+'&smp_status='+smp_status,
			success: function(form, action) {
            Ysn.Util.OnsessOut(action.response.responseText);				
					var dataVal = Ext.JSON.decode(action.response.responseText);
					if(dataVal.SMP_DROP == 'N') dropPop.lookupReference('common-dropPopDetail').down('#btn1').show();
			}
			})
			Ext.getCmp('dropDetail').add(dropPop); 
			dropPop.show();
	},
	onRepair: function(){
		var RepairPop = Ext.getCmp('common-RepairPop');
		var Frm = Ext.getCmp('dropDetail').getForm(); 
		var smp_cd = Frm.findField('smp_cd').getValue();
		var smp_chasu = Frm.findField('smp_chasu').getValue();
		var smp_status = Frm.findField('smp_status').getValue();
			if(!RepairPop){
			  RepairPop = new Ysn.view.common.RepairPop();
			}
			var hidfield = RepairPop.query('#parentfrm')[0];
			hidfield.setValue('dropDetail');
            RepairPop.lookupReference('common-RepairPopDetail').getForm().load({			
			url: '/popup/popupSampleRepair?smp_cd='+smp_cd+'&smp_chasu='+smp_chasu+'&smp_status='+smp_status,
			success: function(form, action) {
            Ysn.Util.OnsessOut(action.response.responseText);				
					var dataVal = Ext.JSON.decode(action.response.responseText);
					if(dataVal.INFO.REPAIR_YN == 'N') RepairPop.lookupReference('common-RepairPopDetail').down('#btn1').show();
			}
			})
			Ext.getCmp('dropDetail').add(RepairPop); 
			RepairPop.show();
	},	
	onMyRepair: function(){
		var myRepairPop = Ext.getCmp('common-myRepairPop');
		var Frm = Ext.getCmp('dropDetail').getForm(); 
		var smp_cd = Frm.findField('smp_cd').getValue();
		var smp_chasu = Frm.findField('smp_chasu').getValue();
		var smp_status = Frm.findField('smp_status').getValue();
			if(!myRepairPop){
			  myRepairPop = new Ysn.view.common.myRepairPop();
			}
			var hidfield = myRepairPop.query('#parentfrm')[0];
			hidfield.setValue('dropDetail');
            myRepairPop.lookupReference('common-myRepairPopDetail').getForm().load({			
			url: '/popup/popupSampleMyRepair?smp_cd='+smp_cd+'&smp_chasu='+smp_chasu+'&smp_status='+smp_status,
			success: function(form, action) {
            Ysn.Util.OnsessOut(action.response.responseText);				
					var dataVal = Ext.JSON.decode(action.response.responseText);
					if(dataVal.INFO.REPAIR_YN == 'N') myRepairPop.lookupReference('common-myRepairPopDetail').down('#btn1').show();
			}
			})
			Ext.getCmp('dropDetail').add(myRepairPop); 
			myRepairPop.show();
	},
	onReject: function(){
		var rejectPop = Ext.getCmp('common-rejectPop');
		var Frm = Ext.getCmp('dropDetail').getForm(); 
		var smp_cd = Frm.findField('smp_cd').getValue();
		var smp_chasu = Frm.findField('smp_chasu').getValue();
		var smp_status = Frm.findField('smp_status').getValue();
			if(!rejectPop){
			  rejectPop = new Ysn.view.common.rejectPop();
			}
			var hidfield = rejectPop.query('#parentfrm')[0];
			hidfield.setValue('dropDetail');
            rejectPop.lookupReference('common-rejectPopDetail').getForm().load({			
			url: '/popup/popupSampleReturn?smp_cd='+smp_cd+'&smp_chasu='+smp_chasu+'&smp_status='+smp_status,
			success: function(form, action) {
			    if (!Ysn.Util.OnsessOut(action.response.responseText)) return false;
					var dataVal = Ext.JSON.decode(action.response.responseText);
					if(dataVal.SMP_RT_YN == 'N') rejectPop.lookupReference('common-rejectPopDetail').down('#btn1').show();
			}
			})
			Ext.getCmp('dropDetail').add(rejectPop); 
			rejectPop.show();
	},
	onSubmit: function(){   
	}

});
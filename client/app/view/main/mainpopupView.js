Ext.define('Ysn.view.main.mainpopupView', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainpopupView', 
    requires: [
        'Ysn.view.main.mainpopupViewController' 
    ],
    controller: 'mainpopupView',
    reference: 'mainpopupView', 
	id:'mainpopupView', 
	layout:'fit', 
	title:otitle ,
    initComponent: function() {
         //Ext.getCmp('mainpopupView').add({xtype: popview});
		 //this.removeAll(); 
		 this.items = [{xtype: popview}];
         this.callParent();
    }
});
 

Ext.define('Ysn.view.main.mainpopupViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainpopupView',  
    init: function() {  
		 var urlparam = param2.split('|');
		 var plnm = popview.split('-')[1];
		 //console.log(urlparam[0]+' '+urlparam[1]+' '+urlparam[2]+' '+urlparam[3]+' '+urlparam[4]);
		 var condi = ""; 
		 url = '/' + urlparam[0] + '/' + urlparam[1] + '?' +urlparam[2] + '='; 
		  
		 if(url.length > 3) {condi = '&'+ urlparam[3] + '=' + urlparam[4] } 
		 //console.log(condi);
		 //console.log(plnm);
		 for(var i=0;i++;i<url.length){console.log(url[i])};
		 //this.getView().items.each(function(c){c.disable();})
		 this.getView().items.items[0].dockedItems.items[0].setHidden(true);
		 if (urlparam[0] != 'SampleRequest') {
		     if (urlparam[1] == 'opportunity') {
		         this.getView().items.items[0].getForm().reset();
		         Ext.getStore('opportunityView').load({ params: { oppt_cd: param1 } });
		     } else if (urlparam[1] == 'forecastView') {
		         this.getView().items.items[0].getForm().reset();
		         Ext.getStore('forecastView').load({ params: { oppt_cd: param1, base_ym: urlparam[4] } });
		     } else if (urlparam[1] == 'boardView') {
		         this.getView().items.items[0].getForm().reset();
		         Ext.getStore('boardView').load({ params: { bbs_cd: param1, menuId: urlparam[4] } });
		     } else if (urlparam[1] == 'salesOrderDetail') {
		         this.getView().items.items[0].getForm().reset();
		         Ext.getStore('salesOrderView').load({ params: { lot_no: param1, so_cd: urlparam[2], so_seq: urlparam[3] } });
		     } else if (urlparam[0] == 'productinquiry') {
		         Ext.getCmp(urlparam[1]).lookupReference('itemList').getStore().load({ params: { inq_cd: param1 } });
		         this.getView().items.items[0].getForm().load({
		             url: url+param1+condi //,waitMsg: 'loading...',	 
		         });
             }else {
		         this.getView().items.items[0].getForm().load({
		             url: url+param1+condi //,waitMsg: 'loading...',	 
		         });
		    }
		 }else{
            this.getView().items.items[0].getForm().load({
				url: url+param1+condi, //,waitMsg: 'loading...',	 
				success: function(form, action) {
            Ysn.Util.OnsessOut(action.response.responseText);
					var dataVal = Ext.JSON.decode(action.response.responseText);
					var pl = Ext.getCmp(plnm)
					var pumpPartList = dataVal.PUMP_PART_LIST;
					for(var i=0;i<pumpPartList.length;i++){
						pl.down('#pump_id'+i).setValue(pumpPartList[i].CODE_ID); 
						pl.down('#pump_material'+i).setValue(pumpPartList[i].SMR_MATERIAL); 
						pl.down('#pump_inject'+i).setValue(pumpPartList[i].SMR_INJECT); 
						pl.down('#pump_coat'+i).setValue(pumpPartList[i].SMR_COAT); 
						pl.down('#pump_hstmpc'+i).setValue(pumpPartList[i].SMR_HSTMPC); 
						pl.down('#pump_ss'+i).setValue(pumpPartList[i].SMR_SS); 
						pl.down('#pump_moldno'+i).setValue(pumpPartList[i].SMR_MOLDNO); 
					} 
                    pl.down('#pump_pkg').setValue(dataVal.PUMP_PKG.CMT)
					pl.down('#pump_rmt').setValue(dataVal.PUMP_REMARK_CMT.CMT) 

					var bottlePartList = dataVal.BOTTLE_PART_LIST;
					for(var i=0;i<bottlePartList.length;i++){
						pl.down('#bottle_id'+i).setValue(bottlePartList[i].CODE_ID); 
						pl.down('#bottle_material'+i).setValue(bottlePartList[i].SMR_MATERIAL); 
						pl.down('#bottle_inject'+i).setValue(bottlePartList[i].SMR_INJECT); 
						pl.down('#bottle_coat'+i).setValue(bottlePartList[i].SMR_COAT); 
						pl.down('#bottle_hstmpc'+i).setValue(bottlePartList[i].SMR_HSTMPC); 
						pl.down('#bottle_ss'+i).setValue(bottlePartList[i].SMR_SS); 
						pl.down('#bottle_moldno'+i).setValue(bottlePartList[i].SMR_MOLDNO); 
					} 
                    pl.down('#bottle_pkg').setValue(dataVal.BOTTLE_PKG.CMT);
					pl.down('#bottle_rmt').setValue(dataVal.BOTTLE_REMARK_CMT.CMT);  

					var overcapPartList = dataVal.OVERCAP_PART_LIST;
					for(var i=0;i<overcapPartList.length;i++){
						pl.down('#overcap_id'+i).setValue(overcapPartList[i].CODE_ID); 
						pl.down('#overcap_material'+i).setValue(overcapPartList[i].SMR_MATERIAL); 
						pl.down('#overcap_inject'+i).setValue(overcapPartList[i].SMR_INJECT); 
						pl.down('#overcap_coat'+i).setValue(overcapPartList[i].SMR_COAT); 
						pl.down('#overcap_hstmpc'+i).setValue(overcapPartList[i].SMR_HSTMPC); 
						pl.down('#overcap_ss'+i).setValue(overcapPartList[i].SMR_SS); 
						pl.down('#overcap_moldno'+i).setValue(overcapPartList[i].SMR_MOLDNO); 
					} 
                    pl.down('#overcap_pkg').setValue(dataVal.OVERCAP_PKG.CMT);
					pl.down('#overcap_rmt').setValue(dataVal.OVERCAP_REMARK_CMT.CMT);
					
					var prdInfo = dataVal.PRD_INFO;		
					form.findField('extr_diameter').setValue(prdInfo.EXTR_DIAMETER); 
					form.findField('neck_mold').setValue(prdInfo.NECK_MOLD); 
					form.findField('extr_diameter').setValue(prdInfo.EXTR_DIAMETER); 
					form.findField('offset_filmno').setValue(prdInfo.offset_filmno); 
					form.findField('cap_spec').setValue(prdInfo.CAP_SPEC); 
					form.findField('extr_layer').setValue(prdInfo.EXTR_LAYER); 
					form.findField('neck_orifice').setValue(prdInfo.NECK_ORIFICE); 
					form.findField('offset_pass').setValue(prdInfo.OFFSET_PASS); 
					form.findField('cap_orifice').setValue(prdInfo.CAP_ORIFICE); 
					form.findField('extr_length').setValue(prdInfo.EXTR_LENGTH); 
					form.findField('neck_color').setValue(prdInfo.NECK_COLOR); 
					form.findField('offset_coating').setValue(prdInfo.OFFSET_COATING); 					
					form.findField('cap_outercolor').setValue(prdInfo.CAP_OUTERCOLOR); 					
					form.findField('extr_color').setValue(prdInfo.EXTR_COLOR);					
					form.findField('neck_mb').setValue(prdInfo.NECK_MB); 					
					form.findField('ss_filmno').setValue(prdInfo.SS_FILMNO); 					
					form.findField('cap_innercolor').setValue(prdInfo.CAP_INNERCOLOR); 					
					form.findField('cap_deco').setValue(prdInfo.CAP_DECO);  					
					form.findField('extr_mb').setValue(prdInfo.EXTR_MB);  					
					form.findField('arls_color').setValue(prdInfo.ARLS_COLOR);  					
					form.findField('hs_filmno').setValue(prdInfo.HS_FILMNO);  					
					form.findField('cap_supplier').setValue(prdInfo.CAP_SUPPLIER);   					
					form.findField('arls_silicon').setValue(prdInfo.ARLS_SILICON);   					
					form.findField('cap_safetyseal').setValue(prdInfo.CAP_SAFETYSEAL);    

					var reqDetail = dataVal.REQ_DETAIL;
					form.findField('euser_nm').setValue(reqDetail.EUSER_NM); 
					form.findField('euser_cd').setValue(reqDetail.EUSER_CD); 
					form.findField('smr_chasu').setValue(reqDetail.SMR_CHASU); 
					form.findField('qruser_nm').setValue(reqDetail.QRUSER_NM); 
					form.findField('qruser_cd').setValue(reqDetail.QRUSER_CD); 
					form.findField('qdept_cd').setValue(reqDetail.QDEPT_CD); 
					form.findField('project_poss').setValue(reqDetail.PROJECT_POSS); 
					form.findField('rruser_nm').setValue(reqDetail.RRUSER_NM); 
					form.findField('rruser_cd').setValue(reqDetail.RRUSER_CD); 
					form.findField('smr_podate').setValue(reqDetail.SMR_PODATE); 
					form.findField('item_nm').setValue(reqDetail.ITEM_NM); 
					form.findField('item_cd').setValue(reqDetail.ITEM_CD); 
					form.findField('smp_rqty').setValue(reqDetail.SMP_RQTY); 
					form.findField('smp_status').setValue(reqDetail.SMP_STATUS); 
					form.findField('smp_status_nm').setValue(reqDetail.SMP_STATUS_NM); 
					form.findField('smr_rqdate').setValue(reqDetail.SMR_RQDATE); 
					form.findField('pur_oqty').setValue(reqDetail.PUR_OQTY); 
					form.findField('purp_color').setValue(reqDetail.PURP_COLOR); 
					form.findField('purp_test').setValue(reqDetail.PURP_TEST); 
					form.findField('smr_rrdate').setValue(reqDetail.SMR_RRDATE); 
					form.findField('smr_type').setValue(reqDetail.SMR_TYPE); 
					form.findField('ship_pdate').setValue(reqDetail.SHIP_PDATE); 
					form.findField('prdt_pdate').setValue(reqDetail.PRDT_PDATE); 
					form.findField('ship_to_adrs').setValue(reqDetail.SHIP_TO_ADRS); 
					form.findField('tracking_num').setValue(reqDetail.TRACKING_NUM); 
					form.findField('smr_prdate').setValue(reqDetail.SMR_PRDATE); 
					form.findField('smr_orderdate').setValue(reqDetail.SMR_ORDERDATE); 
					form.findField('smr_cd').setValue(reqDetail.SMR_CD); 
                    
					

				}
			});
		 }
		if(popview == 'customerdb-customerDetail'){
			Ext.getCmp('customrTab').setActiveTab(0);
			Ext.getCmp('customrTab').activeTab.store.load({
								params: {cust_cd: param1}
			}); 
		}else if(popview == 'customerdb-keymanDetail'){
			Ext.getCmp('keymanTab').setActiveTab(0);
			Ext.getCmp('keymanTab').activeTab.store.load({
								params: {km_cd: param1}
			});
		}
	}
});


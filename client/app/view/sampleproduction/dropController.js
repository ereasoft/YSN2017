///<reference path="~/Client/ext/build/ext-all-debug.js">
///<reference path="~/Client/ext/build/ext-debug.js">
Ext.define('Ysn.view.sampleproduction.dropController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sampleproduction-drop',
	requires: [ 
	    'Ysn.store.*'
    ],
    init: function() {
        this.lookupReference('dropSearch').setTitle(pageTitle);
		if(Ext.getCmp('chkpopup').getValue()){ 
			Ext.getCmp('sampleproduction-drop').down('#east').setVisible(false);			
		} 
		Ext.getCmp('dropDetail').down('#muiltFileBox1').down('#AttachFileList').down('#delbtn').hide();
		Ext.getCmp('dropDetail').down('#muiltFileBox1').down('#AttachBtn').hide();

		Ext.getCmp('dropDetail').down('#muiltFileBox2').down('#AttachFileList').down('#delbtn').hide();
		Ext.getCmp('dropDetail').down('#muiltFileBox2').down('#AttachBtn').hide();

		Ext.getCmp('dropDetail').down('#muiltFileBox3').down('#AttachFileList').down('#delbtn').hide();
		Ext.getCmp('dropDetail').down('#muiltFileBox3').down('#AttachBtn').hide();
	},
	itemclick: function(view, record, index, e) { 
		if(Ext.getCmp('chkpopup').getValue()){
            openPopupView('샘플Drop현황','sampleproduction-dropDetail',record.get('SMP_CD'),'SampleManage|selectSampleDetail|smp_cd|smp_chasu|'+record.get('SMP_CHASU')); 
		}else{
			if (Ext.getCmp('sampleproduction-drop').down('#east').collapsed) Ext.getCmp('sampleproduction-drop').down('#east').toggleCollapse(); 
			var Pl = Ext.getCmp('dropDetail');
			Pl.load({
			    url: '/SampleManage/selectSampleDetail?smp_cd=' + record.get('SMP_CD') + '&smp_chasu=' + record.get('SMP_CHASU') //
                , waitMsg: 'loading...'
                , success: function (form, action) {
                    if (!Ysn.Util.OnsessOut(action.response.responseText)) return false;
                    Pl.body.dom.scrollTop = 0;
                    Pl.body.dom.scrollLeft = 0;
                    for (var i = 0; i < Pl.items.items.length; i++) {
                        Pl.items.items[i].body.dom.scrollTop = 0;
                        Pl.items.items[i].body.dom.scrollLeft = 0;
                    }

                }
			}); 
		}
		
		Pl.down('#muiltFileBox1').down('#AttachFileList').getStore().load({
		    params: {
		        biz_gubun: record.get('SMP_CD'),
		        doc_mgt: '',
		        chasu: record.get('SMP_CHASU')
		    }
		});

		Pl.down('#muiltFileBox2').down('#AttachFileList').getStore().load({
		    params: {
		        biz_gubun: record.get('SMP_CD'),
		        doc_mgt: 'makeing',
		        chasu: record.get('SMP_CHASU')
		    }
		});

		Pl.down('#muiltFileBox3').down('#AttachFileList').getStore().load({
		    params: {
		        biz_gubun: record.get('SMR_CD'),
		        doc_mgt: 'sampleDec',
		        chasu: record.get('SMR_CHASU')
		    }
		});
		//Ext.getCmp('productinquiryinquiry').down('#east').show();

		/*Ext.getStore('inquiryDetail').load({
			params:{cust_cd:record.get('CUST_CD')},
			callback : function(records, operation, success){ 
				//console.log(records);	//root프로퍼티에 지정된데이터 
			    //console.log(operation.getProxy().getReader().rawData);	//리턴된 json 데이터전체 
				//console.log(success);	//success 프로퍼티에 지정된 데이터 }
				console.log(Ext.getStore('inquiryDetail').getAt(0));	//success 프로퍼티에 지정된 데이터 }
                Ext.getCmp('inquiryDetail').loadRecord(Ext.getStore('inquiryDetail').getAt(0));  
			}
		}); */
	}, 
	xlsExport: function(){  

		Ext.getCmp('dropList').saveDocumentAs({ 
			headerRowCnt: 1,
            type:       'xlsx',
            title:      Ext.getCmp('drop-search').getTitle(),
            fileName:   '샘플드롭현황' 
		});
	} 
});

Ext.define('Ysn.view.sampleproduction.dropsearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drop-search',
	init: function() {
	 this.lookupReference('bizGroup').store.load();  
	 this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true));
	 this.lookupReference('dstr_type').store.load({params:{up_code_id:'dstr_TYPE', lang: localeCd}});
	 this.lookupReference('biz_type').store.load({params:{up_code_id:'BIZ_TYPE', lang: localeCd}});
	 this.lookupReference('item_type').store.load({params:{up_code_id:'ITEM_TYPE', lang: localeCd}});  
     this.lookupReference('biz_type').setValue(''); 	 
     this.lookupReference('dstr_type').setValue('');  
	 this.lookupReference('item_type').setValue('');  
	 this.lookupReference('smp_drtype').store.load({params:{up_code_id:'SMP_DRTYPE', lang: localeCd}});  
     this.lookupReference('smp_drtype').setValue(''); 
	 if(auth_id != 'A001'){
	//	 this.lookupReference('bizGroup').setConfig({'readOnly':true});
	//	 if(dept_level == '4') this.lookupReference('deptGroup').setConfig({'readOnly':true});
	 }
	 var Today = new Date();
	 this.lookupReference('sdate').setValue(Today.getFullYear()+'-'+('0'+(Today.getMonth()+1)).slice(-2)+'-'+'01');
	},
	openWindow: function(){
       var win = Ext.getCmp('commonSearchcustomer');
        if(!win){
          win = new Ysn.view.common.searchcustomer();
		}
		var hidfield = win.query('#paentFrm')[0];
		hidfield.setValue('drop-search'); 
		win.down('#cust_nm').setValue(this.lookupReference('cust_nm').getValue());
		Ext.getCmp('sampleproduction-drop').add(win);
		win.setPosition(10,-100);
		win.show();
	},
    resetVal: function(){
		this.lookupReference('cust_nm').setValue('');
		this.lookupReference('cust_cd').setValue('');
	}, 
	onChangeBiz: function(el,newVal,oldVal,e){
        var deptCombo = this.lookupReference('deptGroup'); 
        var userCombo = this.lookupReference('userGroup');
        if (newVal != '') {
            deptCombo.store.load({params:{up_dept_cd:newVal}}); 
				 
        } else {
            deptCombo.setValue('');
            userCombo.setValue('');
            deptCombo.store.removeAll();
            userCombo.store.removeAll();
            deptCombo.store.insert(0, {DEPT_CD: '',DEPT_NM: Locale.getMsg('전체')}); 
            userCombo.store.insert(0, {USER_CD: '',USER_NM: Locale.getMsg('전체')}); 				
        }
        if (newVal != '') {
            deptCombo.setValue(Ysn.Util.chkDept(false)); 
        } 
		deptCombo.doQuery();
		userCombo.setValue('');
		userCombo.doQuery(); 
		el.focus();

	},
	onChangeDept: function(el,newVal,oldVal,e){
		var userCombo = this.lookupReference('userGroup');
		if (newVal != '' && newVal != null) {
		userCombo.store.load({params:{dept_cd:newVal,up_dept_cd:this.lookupReference('bizGroup').getValue()}});
		} else {
		    userCombo.store.removeAll();
		}
		userCombo.setValue('');
		userCombo.doQuery(); 
		el.focus();
		//userCombo.focus();

	},
	onSubmitClick: function() {
		    //console.log(Ext.getCmp('productinquiryinquiry'));
			Ext.getStore('sampleDropList').load(
					{params: {  deptGroup : this.lookupReference('deptGroup').getValue(),
								bizGroup  : this.lookupReference('bizGroup').getValue(), 
								userGroup   : this.lookupReference('userGroup').getValue(),
								cust_cd   : this.lookupReference('cust_cd').getValue(),	 							
								biz_type   : this.lookupReference('biz_type').getValue(), 					
								item_type   : this.lookupReference('item_type').getValue(), 					
								//smp_cd   : this.lookupReference('smp_cd').getValue(),
								smp_drtype   : this.lookupReference('smp_drtype').getValue(),
								sdate    : Ext.Date.format(this.lookupReference('sdate').getValue(),'Y-m-d'),
								edate: Ext.Date.format(this.lookupReference('edate').getValue(),'Y-m-d')
		            }}
		);
	}


});

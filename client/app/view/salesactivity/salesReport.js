
Ext.define('Ysn.view.salesactivity.salesReport',{
    extend: 'Ext.panel.Panel',
    xtype: 'salesactivity-salesReport',
    requires: [
        'Ysn.view.salesactivity.salesReportController', 
		'Ysn.view.salesactivity.salesReportList'
    ],

    controller: 'salesactivity-salesReport',
     
    reference: 'salesactivitysalesReport',
	id:'salesactivitysalesReport',
    layout: 'border',
    width: 500,
    height: 400,
    overflow:'hidden',
	scrollable:false,
    header: false,
    bodyBorder: false, 
    defaults: {
        collapsible: true,
        split: true,
        bodyPadding: 0
    }, 
	
	dockedItems: [
	               {
		            title: Locale.getMsg('업무보고현황'),
					xtype: 'salesReport-search',
					reference: 'salesReportSearch',
                           scrollable: true,
					collapsible: true,
					floatable: true,
					split: true,
					dock: 'top',
					height: 140
				   }
	],
	tbar: {

        overflowHandler: 'menu', 
		style: { 'border-top-width': '1px !important;'},
        items: [
		{
			xtype: 'label',
		    itemId: 'total',
			text: 'Total : 0',
			style: { 'font-weight':'bold'}
		},
			  '->',
			 
		{
            xtype: 'button',
			iconCls: 'x-fa fa-file-excel-o',
            text: Locale.getMsg('액셀변환'),
			//disabled : true
			handler: 'onClick'
        } ]
    },

    items: [
		{
					header: false,					
					region: 'center',					
					xtype: 'salesReportList',
					itemId: 'salesReportList',
                    listeners:{
                               select:'itemclick'
                    }

				},{
					title: Locale.getMsg('업무보고 내역'), 
					 
					scrollable:false,
                    x: 10, y: 10,
					region: 'east', 
					itemId: 'east',
					//	reference:'Detail',
					collapsed: true,
					layout: 'fit',
                    width: 800,
                    minWidth: 750,
                    maxWidth: 1200,
					items: {
						itemId: 'salesactivity-salesReportDetail',
						xtype: 'salesactivity-salesReportDetail'
					}
				}
    ]
	
});

Ext.define('Ysn.view.salesactivity.salesReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salesactivity-salesReport',
	requires: [ 
	    'Ysn.store.*'
    ],
    init: function() {
        this.lookupReference('salesReportSearch').setTitle(pageTitle); 
		Ext.getCmp('salesReportDetail').down('#muiltFileBox1').down('#AttachFileList').down('#delbtn').hide();
		Ext.getCmp('salesReportDetail').down('#muiltFileBox1').down('#AttachBtn').hide();
		if(Ext.getCmp('chkpopup').getValue()){ 
			Ext.getCmp('salesactivitysalesReport').down('#east').setVisible(false);			
		} 
	},
	itemclick: function(view, record, index, e) { 
		if(Ext.getCmp('chkpopup').getValue()){
            openPopupView(Locale.getMsg('업무보고현황'),'salesactivity-salesReportDetail',record.get('SA_CD'),'SalesActivity|popupSalesActivityDetail|sa_cd'); 
		}else{
			if (Ext.getCmp('salesactivitysalesReport').down('#east').collapsed) Ext.getCmp('salesactivitysalesReport').down('#east').toggleCollapse(); 
			var Pl = Ext.getCmp('salesReportDetail');
			Pl.load({
				url: '/SalesActivity/popupSalesActivityDetail?sa_cd='+record.get('SA_CD'), //
				waitMsg: 'loading...',
                success: function(form, action) {
                    Pl.down('#muiltFileBox1').down('#AttachFileList').getStore().load({
					    params: {
					        biz_gubun: record.get('SA_CD'),
					        doc_mgt: '',
					        chasu: ''
					    }
					});
                    setTimeout(function () {
                        Pl.body.dom.scrollTop = 0;
                        Pl.body.dom.scrollLeft = 0;
                    }, 500);
					

                }
			});
			
			
		}
		
	}, 
	onClick: function(){  

		Ext.getCmp('salesReportList').saveDocumentAs({ 
			headerRowCnt: 1,
            type:       'xlsx',
            title:      Ext.getCmp('salesReport-search').getTitle(),
            fileName:   Locale.getMsg('업무보고현황') 
		});
	}
});

Ext.define('Ysn.view.salesactivity.salesReportsearch',{
    extend: 'Ext.panel.Panel',
	xtype: 'salesReport-search',

    requires: [
        'Ysn.view.salesactivity.salesReportsearchController', 
	    'Ysn.store.*'
    ],

    controller: 'salesReport-search', 

    frame: false,
    //resizable: true,
    width: 1500,
    minWidth: 900,
    minHeight: 130,
    layout: {
        type: 'table', 
        tableAttrs: {
            style: {
                //width: '100%'
            }
        }
		
    },
    id: 'salesReport-search',
    defaults: {
        layout: 'form',
        xtype: 'container',
        defaultType: 'textfield' 
    },

    items: [{
        items: [
				  {
					xtype: 'fieldcontainer',
					fieldLabel: Locale.getMsg('매출조직'),
					labelAlign: 'right',
					combineErrors: true,
					msgTarget : 'side',
					layout: 'hbox',
					defaults: {
						//flex: 1,
						hideLabel: true 
					},
					items: [{
						xtype: 'combobox',
						reference: 'bizGroup',
						itemId: 'bizGroup',
						name: 'bizGroup',
						publishes: 'value', 
						displayField: 'DEPT_NM',
						valueField: 'DEPT_CD',
						margin: '0 5 0 0',
						store: {
							type: 'bizgroup'
						},
						minChars: 0,
						//width: 120,
						queryMode: 'local', 
						listeners: {
							change : 'onChangeBiz' 
						}
					}, {
						xtype: 'combobox',
						reference: 'deptGroup',
						itemId:'deptGroup',
						name: 'deptGroup',
						publishes: 'value', 
						displayField: 'DEPT_NM',
						valueField: 'DEPT_CD', 
						store: {
							type: 'deptgroup',
							listeners: { load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
												store.insert(0, {DEPT_CD: '',DEPT_NM: Locale.getMsg('전체')});
												var bizCd = Ext.getCmp('salesReport-search').down('#bizGroup');
												if(store.data.items.length < 2){
													Ext.getCmp('salesReport-search').down('#user_cd').store.load({params:{dept_cd:bizCd.getValue(),up_dept_cd:''}});
												}else{
													Ext.getCmp('salesReport-search').down('#user_cd').store.load({params:{dept_cd:'',up_dept_cd:bizCd.getValue()}});
												}
									   }}
						},
						minChars: 0,
						//width: 150,
						maskOnDisable: true,
						queryMode: 'local', 
						listeners: {
							change : 'onChangeDept' 
						}
					}]
				  }
				  
        ]
    },{
        items: [
				  {
					xtype: 'combobox',
					reference: 'userGroup',
					publishes: 'value',
					fieldLabel: Locale.getMsg('업무담당'),
					labelAlign: 'right',
					displayField: 'USER_NM',
					valueField: 'USER_CD',
					name: 'user_cd',
					itemId : 'user_cd',
					maskOnDisable: true,
					anchor: '-15',
					store: {
						type: 'usercd'
					},
					minChars: 0,
					queryMode: 'local'
				  } 
        ]
    }, {
        items: [
            {
			        xtype: 'fieldcontainer', 
				combineErrors: true, 
				layout: 'hbox',
				defaults: {
					//flex: 1,
					//hideLabel: true,
					margin: '0 5 0 0' 
				},
					items: [{
						fieldLabel: Locale.getMsg('업무기간'),
						labelAlign: 'right',
						labelWidth: 80,
						width: 210,
						xtype: 'datefield',
						name: 'sa_sdate', 
						reference : 'sa_sdate',
					    itemId : 'sa_sdate',
						format: 'Y-m-d',
						maxValue: new Date(), 
						margin: '0 5 0 0' 
					},{
						xtype: 'datefield',
						name: 'sa_edate',
						width: 130,
						reference : 'sa_edate',
					    itemId : 'sa_edate',
						format: 'Y-m-d',
						value: new Date(),
						margin: '0 10 0 0' 
					},{
					xtype: 'hiddenfield',
					reference: 'mod_user', 
					name: 'mod_user', 
					itemId : 'mod_user'
					}]
		   } 
        ]
    },{
        items: [
            { 
					xtype: 'button',
					text: Locale.getMsg('검색'),
					height: 30,
				    width: 60,
					listeners: {
							click : 'onSubmitClick' 
					}
		    }
        ]
    } ] 
});

Ext.define('Ysn.view.salesactivity.salesReportsearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salesReport-search',
	init: function() {
	 this.lookupReference('bizGroup').store.load();  
	 this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true));
	 var Today = new Date();
	 if(auth_id != 'A001'){
		// this.lookupReference('bizGroup').setConfig({'readOnly':true});
		// if(dept_level == '4') this.lookupReference('deptGroup').setConfig({'readOnly':true});
	 }
	 this.lookupReference('sa_sdate').setValue(Today.getFullYear()+'-'+('0'+(Today.getMonth()+1)).slice(-2)+'-'+'01');
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
		    //console.log(Ext.getCmp('salesactivitysalesReport'));
			var deptGrp = this.lookupReference('deptGroup');
			var bizGrp = this.lookupReference('bizGroup'); 
			var deptCode = this.lookupReference('deptGroup').getValue();
			var bizCode = this.lookupReference('bizGroup').getValue();
			if (deptGrp.getStore().data.items.length < 2 )
			{
				deptCode = bizCode;
				bizCode = '';
			}
			//'salesactivity-salesReportDetail'
			Ext.getCmp('salesactivitysalesReport').down('#salesactivity-salesReportDetail').getForm().reset();
			Ext.getCmp('salesReportDetail').down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
			Ext.getCmp('salesactivitysalesReport').down('#salesReportList').store.load(
					{params: {  deptGroup : deptCode,
								bizGroup  : bizCode,
								user_cd   : this.lookupReference('userGroup').getValue(''),
								sa_sdate   : this.lookupReference('sa_sdate').getValue(''),
								sa_edate   : this.lookupReference('sa_edate').getValue('')
		            }}
		);
	}


});


Ext.define('Ysn.view.salesactivity.salesReportList',{
    extend: 'Ext.grid.Panel',
    xtype: 'salesReportList',
    requires: [
        'Ysn.view.salesactivity.salesReportListController', 
		'Ysn.store.salesReportList',
		'Ext.grid.filters.Filters'
    ],
    
    controller: 'salesactivity-salesReportList',     
	store: {
        type: 'salesReportList', 
		autoLoad: false,
        autoDestroy: true
    }, 
	style: {'borderTop':'1px solid gray'},
	enableLocking: true,
	id: 'salesReportList',
    columnLines: true,
	multiColumnSort: true, 
	plugins: ['gridfilters',
			  'pmh-grid-exporter'
	],
	columns: [
		    {text: Locale.getMsg('코드'), dataIndex: 'SA_CODE', hidden: true},
            {text: Locale.getMsg('업무일자'), dataIndex: 'SA_SDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true, filter: true}, 
            {text: Locale.getMsg('활동조직'), width: 125, dataIndex: 'DEPT_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
            {text: Locale.getMsg('업무담당'), width: 125, dataIndex: 'USER_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
		    {text: Locale.getMsg('업무내용'), flex:1, dataIndex: 'SA_BODY', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			}
        ],
   height: 700,
   width: 1600,
   syncRowHeight: false,
   viewConfig: {
            stripeRows: true
   },
   listeners: {		
		//itemclick: function(dataview, record, item, index, e) {  
    // }

    } 
});


Ext.define('Ysn.view.salesactivity.salesReportListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salesactivity-salesReportList', 
    init: function() {
	  
	}
});


Ext.define('Ysn.view.salesactivity.salesReportDetail',{
    extend: 'Ext.form.Panel',
    xtype: 'salesactivity-salesReportDetail',
    requires: [
        'Ysn.view.salesactivity.salesReportDetailController'
    ],

    controller: 'salesactivity-salesReportDetail', 


    frame: true,
    id: 'salesReportDetail',
	reference: 'salesReportDetail',
    bodyPadding: 10,
    scrollable:true,
    width: 700,   
    reader: {
        type: 'json',
        model: 'Ysn.model.salesActivityDetail',
        rootProperty: '' 
    },
 
	fieldDefaults: { 
			labelAlign: 'right', 
			msgTarget: 'side' ,
			allowBlank:true
		},
    items: [{
        xtype: 'fieldset',
		scrollable:true,
        title: '보고개요',
        layout: {
            type: 'table', 
			columns:2,
            tableAttrs: {
                style: {
                    width: '100%' 
                }
            }

        },
        items: [
					{	
						fieldLabel: '*'+Locale.getMsg('활동유형'), labelWidth: 100, name: 'sa_type',
						labelAlign: 'right',
						xtype: 'combobox',
						reference: 'sa_type',
						publishes: 'value',  
						displayField: 'CODE_NM',
						valueField: 'CODE_ID',  
						store: {
							type: 'Tcode'
						},
						minChars: 0,
						queryMode: 'local',
						typeAhead: true,
						margin: '0 5 0 0',
						listeners : {
							//change : 'saTypeChg'
						},
						readOnly: true
					}, 
					{
						fieldLabel: '*'+Locale.getMsg('업무담당'), 
						xtype: 'textfield',
						name: 'user_nm',
						reference: 'user_nm',
						itemId: 'user_nm', 
						labelWidth: 70,
						readOnly: true
                    },
					{						 
						xtype: 'hiddenfield',
						name: 'user_cd',
						reference: 'user_cd',
						itemId: 'user_cd'
                    },
					{   
						colspan: 2,
                        xtype: 'fieldcontainer',
                        fieldLabel: '*'+Locale.getMsg('업무일자'),
						labelWidth: 100,
						labelAlign: 'right',
						style:{width:'100%'},
                        combineErrors: true,
                        layout: 'hbox', 
                        defaults: {
                            //flex: 1,
                            hideLabel: true
                        },
                        items: [{ xtype: 'datefield', width:130, format: 'Y-m-d', name: 'sa_sdate',margin: '0 2 0 0', readOnly: true},
								{ xtype: 'combobox', width:100, name: 'sa_sdate_time', displayField: 'TIME', valueField: 'VAL', emptyText: Locale.getMsg('선택'),
								  store: {type:'time'}, minChars: 0, queryMode: 'local', typeAhead: true,margin: '0 5 0 0', readOnly: true},
								{ xtype: 'datefield', width:130, format: 'Y-m-d', name: 'sa_edate',margin: '0 2 0 0', readOnly: true},
								{ xtype: 'combobox', width:100, name: 'sa_edate_time', displayField: 'TIME', valueField: 'VAL', emptyText: Locale.getMsg('선택'),
								  store: {type:'time'}, minChars: 0, queryMode: 'local', typeAhead: true, readOnly: true}
							   ]
                    },
				    { fieldLabel: Locale.getMsg('활동제목'), colspan: 2, labelAlign: 'right',xtype: 'textfield',labelWidth: 100, width:500, name: 'sa_subject',readOnly: true},
					{ fieldLabel: Locale.getMsg('활동내용'), colspan: 2, labelAlign: 'right',xtype: 'textareafield',labelWidth: 100, width:500, height:300, name: 'sa_body',readOnly: true}                 
        ]
    },{
        xtype: 'fieldset',
		scrollable:true,
        title: Locale.getMsg('관련자료'),
        layout: {
            type: 'table',
            columns: 1,
            tableAttrs: {
                style: {
                    width: '100%'
                }
            }

        }, 
        items: [                       
                    {
                        xtype: 'muiltFileBox',
                        reference: 'muiltFileBox1',
                        itemId: 'muiltFileBox1'                      
					}
			  ]
	}
],
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            defaults: {
                minWidth: 100 
            },
            items: [
					{ xtype: 'hiddenfield', reference: 'sa_cd', name: 'sa_cd', itemId : 'sa_cd'},
					{ xtype: 'hiddenfield', reference: 'saveMode', name: 'saveMode', itemId : 'saveMode', value: 'Add'},
					{ xtype: 'component', flex: 1 } 
            ]
        }]
});

Ext.define('Ysn.view.salesactivity.salesReportDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salesactivity-salesReportDetail', 
    init: function() {
	 this.lookupReference('sa_type').store.load({params:{up_code_id:'SA_TYPE', lang: localeCd}});  
	},
	onSubmit: function(){ 
		var form = Ext.getCmp('salesReportDetail').getForm(); 
		Ysn.Util.cbEmptyVal(Ext.getCmp('salesReportDetail')); 
		if (form.isValid()) {
			form.submit({
				waitMsg:'Processing...',
                url: '/salesReport/popupSalesActivityDetail',
                method: 'POST',
				params: form.getValues(),		
				submitEmptyText:false,
				success: function(form, action) {
					if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
					//console.log("response:"+action);
					//console.log("response:"+action.response.responseText);
				   //Ext.Msg.alert('Success', action.response.responseText);
                   //Ext.getCmp('salesReportList').store.reload();
				},
				failure: function(form, action) {
					//console.log('response:'+ action);
					var dataVal = Ext.JSON.decode(action.response.responseText)
					Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.'); 
					//Ext.getCmp('salesReportList').store.reload();
				}
			});
		}
	}

});


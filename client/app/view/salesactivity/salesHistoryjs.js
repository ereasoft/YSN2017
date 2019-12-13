
Ext.define('Ysn.view.salesactivity.salesHistory',{
    extend: 'Ext.panel.Panel',
    xtype: 'salesactivity-salesHistory',
    requires: [
        'Ysn.view.salesactivity.salesHistoryController', 
		'Ysn.view.salesactivity.salesHistoryList'
    ],

    controller: 'salesactivity-salesHistory', 
    reference: 'salesactivitysalesHistory',
	id:'salesactivitysalesHistory',
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
		            title: Locale.getMsg('영업활동현황'),
					xtype: 'salesHistory-search',
					reference: 'salesHistorySearch',
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
					xtype: 'salesHistoryList',
					itemId: 'salesHistoryList',
                    listeners:{
                               select:'itemclick'
                    }

				},{
					title: Locale.getMsg('영업활동 내역'), 
					 
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
						itemId: 'salesactivity-salesHistoryDetail',
						xtype: 'salesactivity-salesHistoryDetail'
					}
				}
    ]
	
});

Ext.define('Ysn.view.salesactivity.salesHistoryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salesactivity-salesHistory',
	requires: [ 
	    'Ysn.store.*'
    ],
    init: function() {
        this.lookupReference('salesHistorySearch').setTitle(pageTitle); 
		Ext.getCmp('salesHistoryDetail').down('#muiltFileBox1').down('#AttachFileList').down('#delbtn').hide();
		Ext.getCmp('salesHistoryDetail').down('#muiltFileBox1').down('#AttachBtn').hide();
		if(Ext.getCmp('chkpopup').getValue()){ 
			Ext.getCmp('salesactivitysalesHistory').down('#east').setVisible(false);			
		}
	},
	itemclick: function(view, record, index, e) { 
		if(Ext.getCmp('chkpopup').getValue()){
            openPopupView(Locale.getMsg('영업활동현황'),'salesactivity-salesHistoryDetail',record.get('SA_CD'),'SalesActivity|popupSalesActivityDetail|sa_cd'); 
		} else {
		    var Pl = Ext.getCmp('salesHistoryDetail');
		    Pl.getForm().reset();
			if (Ext.getCmp('salesactivitysalesHistory').down('#east').collapsed) Ext.getCmp('salesactivitysalesHistory').down('#east').toggleCollapse(); 
			Pl.load({
				url: '/SalesActivity/popupSalesActivityDetail?sa_cd='+record.get('SA_CD') //
				, waitMsg: 'loading...'
                , success: function (form, action) { 
                    Pl.body.dom.scrollTop = 0;
                    Pl.body.dom.scrollLeft = 0;
                    for (var i = 0; i < Pl.items.items.length; i++) {
                        Pl.items.items[i].body.dom.scrollTop = 0;
                        Pl.items.items[i].body.dom.scrollLeft = 0;
                        if(i == 1){ 
                                Pl.items.items[i].items.items[0].body.dom.scrollTop = 0;
                                Pl.items.items[i].items.items[0].body.dom.scrollLeft = 0;
                        }
                    }

                }
			});
			Pl.down('#muiltFileBox1').down('#AttachFileList').getStore().load({
					    params: {
					        biz_gubun: record.get('SA_CD'),
					        doc_mgt: '',
					        chasu: ''
					    }
					});
			
		}
		
	}, 
	onClick: function(){  

		Ext.getCmp('salesHistoryList').saveDocumentAs({ 
			headerRowCnt: 1,
            type:       'xlsx',
            title:      Ext.getCmp('salesHistory-search').getTitle(),
            fileName:   Locale.getMsg('영업활동현황')
		});
	}
});

Ext.define('Ysn.view.salesactivity.salesHistorysearch',{
    extend: 'Ext.panel.Panel',
	xtype: 'salesHistory-search',

    requires: [
        'Ysn.view.salesactivity.salesHistorysearchController', 
	    'Ysn.store.*'
    ],

    controller: 'salesHistory-search',
     
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
    id: 'salesHistory-search',
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
												var bizCd = Ext.getCmp('salesHistory-search').down('#bizGroup');
												if(store.data.items.length < 2){
													Ext.getCmp('salesHistory-search').down('#user_cd').store.load({params:{dept_cd:bizCd.getValue(),up_dept_cd:''}});
												}else{
													Ext.getCmp('salesHistory-search').down('#user_cd').store.load({params:{dept_cd:'',up_dept_cd:bizCd.getValue()}});
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
					fieldLabel: Locale.getMsg('영업담당'),
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
			        xtype: 'combobox',
					reference: 'sa_type',
					publishes: 'value',
					fieldLabel: Locale.getMsg('활동유형'),
					labelAlign: 'right',
					displayField: 'CODE_NM',
					valueField: 'CODE_ID',
					name: 'sa_type',
					anchor: '-15',
					store: {
						type: 'TcodeAll'
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
						fieldLabel: Locale.getMsg('활동기간'),
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

Ext.define('Ysn.view.salesactivity.salesHistorysearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salesHistory-search',
	init: function() {
	 this.lookupReference('bizGroup').store.load();  
     this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true)); 
	 this.lookupReference('sa_type').store.load({params:{up_code_id:'SA_TYPE', lang: localeCd}});   
	 this.lookupReference('sa_type').setValue('');
	 if(auth_id != 'A001'){
		// this.lookupReference('bizGroup').setConfig({'readOnly':true});
		// if(dept_level == '4') this.lookupReference('deptGroup').setConfig({'readOnly':true});
	 }
	 var Today = new Date();
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
		    var deptGrp = this.lookupReference('deptGroup');
			var bizGrp = this.lookupReference('bizGroup'); 
			var deptCode = this.lookupReference('deptGroup').getValue();
			var bizCode = this.lookupReference('bizGroup').getValue();
			if (deptGrp.getStore().data.items.length < 2 )
			{
				deptCode = bizCode;
				bizCode = '';
			}
            //'salesactivity-salesHistoryDetail'
			Ext.getCmp('salesactivitysalesHistory').down('#salesactivity-salesHistoryDetail').getForm().reset();
			Ext.getCmp('salesHistoryDetail').down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
			Ext.getCmp('salesactivitysalesHistory').down('#salesHistoryList').store.load(
					{params: {  deptGroup : deptCode,
								bizGroup  : bizCode,
								user_cd   : this.lookupReference('userGroup').getValue(''),
								sa_sdate   : this.lookupReference('sa_sdate').getValue(''),
								sa_edate   : this.lookupReference('sa_edate').getValue(''),
								sa_type   : this.lookupReference('sa_type').getValue('')   
		            }}
		);
	}


});


Ext.define('Ysn.view.salesactivity.salesHistoryList',{
    extend: 'Ext.grid.Panel',
    xtype: 'salesHistoryList',
    requires: [
        'Ysn.view.salesactivity.salesHistoryListController', 
		'Ysn.store.salesHistoryList',
		'Ext.grid.filters.Filters'
    ],
    
    controller: 'salesactivity-salesHistoryList',     
	store: {
        type: 'salesHistoryList', 
		autoLoad: false,
        autoDestroy: true
    }, 
	style: {'borderTop':'1px solid gray'},
	enableLocking: true,
	id: 'salesHistoryList',
    columnLines: true,
	multiColumnSort: true, 
	plugins: ['gridfilters',
			  'pmh-grid-exporter'
	],
	columns: [
		    {text: Locale.getMsg('코드'), dataIndex: 'SA_CODE', hidden: true},
            {text: Locale.getMsg('활동일자'), dataIndex: 'SA_SDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true, filter: true},
            {text: Locale.getMsg('활동유형'),  width: 150, dataIndex: 'SA_TYPE_NM', sortable: true,   
			 filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
            {text: Locale.getMsg('활동조직'), width: 125, dataIndex: 'DEPT_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
            {text: Locale.getMsg('활동담당'), width: 125, dataIndex: 'USER_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: Locale.getMsg('활동제목'), width: 125, dataIndex: 'SA_SUBJECT', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: Locale.getMsg('고객담당'), width: 125, dataIndex: 'KM_NMS', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: Locale.getMsg('접촉유형'), width: 125, dataIndex: 'SA_CNCT_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
		    {text: Locale.getMsg('활동결과'), width: 125, dataIndex: 'SA_BODY', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: Locale.getMsg('코멘트대상'), width: 125, dataIndex: 'CMT_YN', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
            {text: Locale.getMsg('코멘트'), width: 200, dataIndex: 'SA_COMMENT', sortable: true, 
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


Ext.define('Ysn.view.salesactivity.salesHistoryListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salesactivity-salesHistoryList', 
    init: function() {
	  
	}
});


Ext.define('Ysn.view.salesactivity.salesHistoryDetail',{
    extend: 'Ext.form.Panel',
    xtype: 'salesactivity-salesHistoryDetail',
    requires: [
        'Ysn.view.salesactivity.salesHistoryDetailController'
    ],

    controller: 'salesactivity-salesHistoryDetail', 


    frame: true,
    id: 'salesHistoryDetail',
	reference: 'salesHistoryDetail',
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
        title: Locale.getMsg('활동개요'),
        layout: {
            type: 'table',
            columns: 2, 
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
		                emptyText: Locale.getMsg('선택'),
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
						fieldLabel: '*'+Locale.getMsg('활동담당'), 
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
                        fieldLabel: '*'+Locale.getMsg('활동일자'),
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
					{
                        colspan: 2,
						xtype: 'fieldcontainer',
						fieldLabel: Locale.getMsg('거래처'),
						labelAlign: 'right',
						combineErrors: true,
						msgTarget : 'side',
						layout: 'hbox',
						defaults: {
							//flex: 1,
							hideLabel: true
						},
							items: [{
								xtype: 'textfield',
								name: 'cust_nm', 
								reference : 'cust_nm',
								itemId : 'cust_nm',
								margin: '0 5 0 0',
								width: 400,
								listeners : {
									//change : 'custNmChg'
								},readOnly: true
							}]
				    },
				    {
						colspan: 2,
						xtype: 'fieldcontainer',
						fieldLabel: 'Keyman',
						labelAlign: 'right',
						combineErrors: true,
						msgTarget : 'side',
						layout: 'hbox',
						defaults: {
							//flex: 1,
							hideLabel: true
						},
							items: [{
								xtype: 'textfield',
								name: 'km_nms', 
								reference : 'km_nms',
								itemId : 'km_nms',
								margin: '0 5 0 0',
								width: 400,readOnly: true
							}]
				    },
					{
						colspan: 2,
						xtype: 'fieldcontainer',
						fieldLabel: Locale.getMsg('접촉(지원)유형'),
						labelAlign: 'right',
						combineErrors: true,
						msgTarget : 'side',
						layout: 'hbox',
						defaults: {
							//flex: 1,
							hideLabel: true
						},
							items: [{
								name: 'sa_cnct',
								xtype: 'combobox',
								reference: 'sa_cnct',
								publishes: 'value',  
								displayField: 'CODE_NM',
								valueField: 'CODE_ID', 
								emptyText: Locale.getMsg('선택'),
								store: {
									type: 'Tcode'
								},
								minChars: 0,
								queryMode: 'local',
								typeAhead: true,
								margin: '0 5 0 0',readOnly: true
							},{
								xtype: 'checkboxfield',
								reference: 'cmt_yn',
								name: 'cmt_yn',
								inputValue: 'Y',
								boxLabel: Locale.getMsg('코멘트대상 여부'),
								listeners: {
									//change : 'cmtYnChg'
								},readOnly: true
							}]
				    },
				    {
						colspan: 2,
						xtype: 'fieldcontainer',
						fieldLabel: Locale.getMsg('일정공유자'),
						labelAlign: 'right',
						combineErrors: true,
						msgTarget : 'side',
						layout: 'hbox',
						defaults: {
							//flex: 1,
							hideLabel: true
						},
							items: [{
								xtype: 'textareafield',
								name: 'user_nms', 
								reference : 'user_nms',
								itemId : 'user_nms',
								margin: '0 5 0 0',
								width: 400,readOnly: true
							}]
				    }                    
        ]
    },
	{
    xtype: 'tabpanel',
	dock: 'bottom', 
	layout: 'fit', 
	height: 222,
	//frame: true, 
	defaults: {
		bodyPadding: 10,
		scrollable: true
	},
	reference: 'activityTab', 
	items: [{
				title: Locale.getMsg('활동내용'),
				glyph: 'xf044@FontAwesome',
				itemId: 'keyman',
				items:[
					{ fieldLabel: Locale.getMsg('활동제목'), labelAlign: 'right',xtype: 'textfield',labelWidth: 80, width:500, name: 'sa_subject',readOnly: true},
					{ fieldLabel: Locale.getMsg('활동내용'), labelAlign: 'right',xtype: 'textareafield',labelWidth: 80, width:500, name: 'sa_body',readOnly: true},
					{ fieldLabel: Locale.getMsg('코멘트'), labelAlign: 'right',xtype: 'textareafield',labelWidth: 80, width:500,  name: 'sa_comment',readOnly: true}
				],
				listeners: {
				//activate: function(tab,e){	});
				} 
			}, {
				title: 'KeyFactor',
				glyph: 'xf03a@FontAwesome',
				itemId: 'keyfactor',
				xtype: 'checkboxgroup',
				hideLabel: true,
				columns: 4,
				items: [
					{boxLabel: Locale.getMsg('기회발굴'), name: 'sa_target', itemId: 'SATRG_100', inputValue: 'SATRG_100', readOnly: true},
					{boxLabel: Locale.getMsg('키맨관계강화'), name: 'sa_target', itemId: 'SATRG_200', inputValue: 'SATRG_200', readOnly: true},
					{boxLabel: Locale.getMsg('프로젝트협의'), name: 'sa_target', itemId: 'SATRG_300', inputValue: 'SATRG_300', readOnly: true},
					{boxLabel: Locale.getMsg('신제품미팅'), name: 'sa_target', itemId: 'SATRG_400', inputValue: 'SATRG_400', readOnly: true},
					{boxLabel: Locale.getMsg('제안/견적협의'), name: 'sa_target',itemId: 'SATRG_500', inputValue: 'SATRG_500', readOnly: true},
					{boxLabel: Locale.getMsg('클레임관리'), name: 'sa_target',itemId: 'SATRG_600', inputValue: 'SATRG_600', readOnly: true},
					{boxLabel: Locale.getMsg('기타'), name: 'sa_target',itemId: 'SATRG_900', inputValue: 'SATRG_900', readOnly: true}   
				],
				listeners: {
					//activate: function(tab,e){ 
						//Ext.getCmp('common-tabPlaylist').store.load({
							//params: {cust_cd: Ext.getCmp('customerDetail').down('#cust_cd').getValue()}
					//	});
					//}
				}
			}, {
				title: Locale.getMsg('관련자료'),
				glyph: 'xf15c@FontAwesome',
				itemId: 'attachfile',  
				xtype: 'fieldcontainer',  
				combineErrors: true,
				reference: 'attach_grp1',
				layout: 'column', 
				defaults: {
					//flex: 1,
					hideLabel: true
				},
				items: [ {
                        xtype: 'muiltFileBox',
                        reference: 'muiltFileBox1',
                        itemId: 'muiltFileBox1'                      
					}],
				listeners: {
					//activate: function(tab,e){ 
						//Ext.getCmp('common-tabProject').store.load({
						//params: {cust_cd: Ext.getCmp('customerDetail').down('#cust_cd').getValue()}
					 //   });
					//}
				}
			}
	]
	

}],
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            defaults: {
                minWidth: 100 
            },
            items: [
					{ xtype: 'hiddenfield', reference: 'sa_cd', name: 'sa_cd', itemId : 'sa_cd'},
					{ xtype: 'hiddenfield', reference: 'sa_targets', name: 'sa_targets', itemId : 'sa_targets',
				      listeners: {change : 'keyFactorVal'}
					},
					{ xtype: 'hiddenfield', reference: 'saveMode', name: 'saveMode', itemId : 'saveMode', value: 'Add'},
					{ xtype: 'component', flex: 1 } 
            ]
        }]
});

Ext.define('Ysn.view.salesactivity.salesHistoryDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salesactivity-salesHistoryDetail', 
    init: function() {
	 this.lookupReference('sa_type').store.load({params:{up_code_id:'SA_TYPE', lang: localeCd}}); 
	 this.lookupReference('sa_cnct').store.load({params:{up_code_id:'SA_CNCT', lang: localeCd}});   
	},
	onSubmit: function(){ 
		var form = Ext.getCmp('salesHistoryDetail').getForm(); 
		Ysn.Util.cbEmptyVal(Ext.getCmp('salesHistoryDetail')); 

		if (form.isValid()) {
			form.submit({
				waitMsg:'Processing...',
                url: '/salesHistory/popupSalesActivityDetail',
                method: 'POST',
				params: form.getValues(),		
				submitEmptyText:false,
				success: function(form, action) { 
					if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
					//console.log("response:"+action);
					//console.log("response:"+action.response.responseText);
				   //Ext.Msg.alert('Success', action.response.responseText);
                   //Ext.getCmp('salesHistoryList').store.reload();
				},
				failure: function(form, action) {
					//console.log('response:'+ action);
					var dataVal = Ext.JSON.decode(action.response.responseText)
					Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.'); 
					//Ext.getCmp('salesHistoryList').store.reload();
				}
			});
		}
	},
	keyFactorVal : function(el , newValue , oldValue , eOpts){
		if(newValue != ''){
			var sa_targets = newValue.split(',');
			for(var i in sa_targets){
				Ext.getCmp('salesHistoryDetail').down('#'+sa_targets[i]).setValue(sa_targets[i]);
			}
		}
	}

});


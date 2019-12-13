
Ext.define('Ysn.view.customerdb.customerList',{
    extend: 'Ext.grid.Panel',
    xtype: 'customerList',
    requires: [
        'Ysn.view.customerdb.customerListController', 
		'Ysn.store.customerList',
		'Ext.grid.filters.Filters'
    ],
    
    controller: 'customerdb-customerList',     
	store: {
        type: 'customerList', 
		autoLoad: false,
        autoDestroy: true
    }, 
	style: {'borderTop':'1px solid gray'},
	enableLocking: true,
	id: 'customerList',
    columnLines: true,
	multiColumnSort: true, 
	plugins: ['gridfilters',
			  'pmh-grid-exporter'
	],
	columns: [
            {text: Locale.getMsg('코드'), width: 125, dataIndex: 'CUST_CD2', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
            {text: Locale.getMsg('거래처'),  width: 250, dataIndex: 'CUST_NM', sortable: true,   
			 filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
            {text: Locale.getMsg('국내/해외'), width: 125, dataIndex: 'DMOS_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
            {text: Locale.getMsg('매출조직'), width: 125, dataIndex: 'DEPT_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: Locale.getMsg('영업담당'), width: 125, dataIndex: 'USER_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: Locale.getMsg('국가정보'), width: 125, dataIndex: 'NAT_CD', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: Locale.getMsg('신용등급'), width: 125, dataIndex: 'CUST_GRADE_NAME', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
		    {text: Locale.getMsg('결재조건'), width: 125, dataIndex: 'TRMS_PAY_NAME', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: Locale.getMsg('최근활동일자'), width: 125, dataIndex: 'SA_SDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true, filter: true}, 
            {text: Locale.getMsg('활동여부'), width: 125, dataIndex: 'USE_YN', sortable: true, 
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

Ext.define('Ysn.view.customerdb.customerDetail',{
    extend: 'Ext.form.Panel',
    xtype: 'customerdb-customerDetail',
    requires: [
        'Ysn.view.customerdb.customerDetailController', 
		'Ysn.view.common.tabKeyman',
		'Ysn.view.common.tabPlaylist',
		'Ysn.view.common.tabProject',
		'Ysn.view.common.tabEmail'
    ],

    controller: 'customerdb-customerDetail', 


    frame: true,
    id: 'customerDetail',
	reference: 'customerDetail',
    bodyPadding: 10,
    scrollable:true,
    width: 800,   
    reader: {
        type: 'json',
        model: 'Ysn.model.customerDetail',
        rootProperty: '' 
    },
 
	fieldDefaults: { 
			labelAlign: 'right', 
			msgTarget: 'side' ,
			allowBlank:true
		},
    items: [{ 
        xtype: 'fieldset',
        title: Locale.getMsg('기본 정보'), 
		layout: 'column', 
        defaults: {
			layout: 'form',
			xtype: 'container',			
			defaultType: 'textfield',
			width: '50%',
			anchor: '100%'
		},
		
        items: [
                { 
					items: [
						    { 
								xtype: 'fieldcontainer',
								fieldLabel: '*'+Locale.getMsg('거래처'),
								combineErrors: true, 
								layout: 'hbox',
								defaults: { 
									hideLabel: true
								},
								items:[{name: 'cust_cd2',xtype: 'textfield', width:65, margin: '0 5 0 0', readOnly:true},
									   {name: 'cust_nm',xtype: 'textfield', width:200, margin: '0 5 0 0', readOnly:true},
									   {name: 'cust_cd',itemId: 'cust_cd',xtype: 'textfield',width:60, readOnly:true}
								]
							},
						    { fieldLabel: Locale.getMsg('매출처'), name: 'bcust_nm', allowBlank:false, readOnly:true},
						    { fieldLabel: Locale.getMsg('사업자번호'), name: 'cust_no' , readOnly:true},
						    { fieldLabel: Locale.getMsg('대표이사'), name: 'cust_ceo', readOnly:true },
						    { fieldLabel: Locale.getMsg('업종'), name: 'cust_item', readOnly:true },
						    { fieldLabel: Locale.getMsg('업태'), name: 'cust_ctgr', readOnly:true },
						    {
								xtype: 'combobox',
								reference: 'cust_grade',
								itemId: 'cust_grade',
								publishes: 'value',
								fieldLabel: Locale.getMsg('신용등급'),
								displayField: 'CODE_NM',
								valueField: 'CODE_ID',
								name: 'cust_grade',
								anchor: '-15',
								store: {
									type: 'Tcode'
								},
								minChars: 0,
								queryMode: 'local',
								emptyText:'선택', 
								typeAhead: true
                                
					        },
						    {
								xtype: 'combobox',
								reference: 'trms_pay',
								itemId: 'trms_pay',
								publishes: 'value',
								fieldLabel: '*'+Locale.getMsg('결재조건'),
								displayField: 'CODE_NM',
								valueField: 'CODE_ID',
								allowBlank:false,
								name: 'trms_pay',
								anchor: '-15',
								store: {
									type: 'Tcode'
								},
								minChars: 0,
								queryMode: 'local',
								emptyText:'선택', 
								typeAhead: true
					        }
					     ]	
			    },
				{ 
					items: [
						    { 
								xtype: 'fieldcontainer',
								fieldLabel: '*'+Locale.getMsg('영업담당'),
								combineErrors: true, 
								layout: 'hbox',
								defaults: {
									//flex: 1,
									hideLabel: true
								},
								items: [{
									xtype: 'textfield',
									name: 'user_nm', 
									reference : 'user_nm',
									itemId : 'user_nm',
									margin: '0 5 0 0',
									width: 270
								},{
									xtype: 'hiddenfield',
									reference: 'user_cd', 
									name: 'user_cd', 
									itemId : 'user_cd'
								},{
									xtype: 'hiddenfield',
									reference: 'dept_cd', 
									name: 'dept_cd', 
									itemId : 'dept_cd'
								},{
									xtype: 'hiddenfield', 
									name: 'mod_usr',
									value: loginUser
								}, {
									iconCls: 'x-fa fa-search', 
									xtype: 'button',
									scale: 'small',
									margin: '0 5 0 0',
									handler : 'openWindow',
									style:{ 
										'border':'none' 
									}
								},{
									iconCls: 'x-fa fa-remove', 
									xtype: 'button',
									scale: 'small',
									handler : 'resetVal',
									style:{
										'background-color': 'red !important',
										'background-image': 'none',
										'border':'none' 
									}
								}] 
							},
						    { fieldLabel: Locale.getMsg('매출조직'), name: 'dept_nm', itemId: 'dept_nm'},
						    { fieldLabel: Locale.getMsg('전화번호'), name: 'tel_num' , readOnly:true},
						    { fieldLabel: Locale.getMsg('홈페이지'), name: 'home_page' },
						    {
									xtype: 'combobox',
									reference: 'nat_cd',
									publishes: 'value',
									fieldLabel: '*'+Locale.getMsg('국가정보'),
									itemId: 'nat_cd',
									displayField: 'NAT_NM',
									valueField: 'NAT_CD',
									name: 'nat_cd',
									allowBlank:false,
									anchor: '-15',
									store: {
										type: 'nation'
									},
									minChars: 0, 
								    emptyText:'선택', 
									typeAhead: true,
									queryMode: 'local' 
						    },
						    {  
									xtype: 'combobox',
									reference: 'base_crncy',
									itemId: 'base_crncy',
									publishes: 'value',
									fieldLabel: '*'+Locale.getMsg('기준통화'),
									displayField: 'CODE_NM',
									valueField: 'CODE_ID',
									name: 'base_crncy',
									anchor: '-15',
									store: {
										type: 'Tcode' 
									},
									minChars: 0,
									queryMode: 'local',
									typeAhead: true,
								    emptyText:'선택', 
									allowBlank:false
									
							},
						    { fieldLabel: '*'+Locale.getMsg('전체주소'), name: 'address_all', flex:1, allowBlank:false, readOnly:true},
						    {
									xtype: 'combobox',
									reference: 'use_yn',
									itemId: 'use_yn',
									publishes: 'value',
									fieldLabel: '*활동여부', 
									allowBlank:false,
									displayField: 'CODE_NM',
									valueField: 'CODE_ID',
									name: 'use_yn',
									anchor: '-15',
									store: {
										type: 'Tcode'
									},
									minChars: 0,
									queryMode: 'local',
								    emptyText:'선택', 
									typeAhead: true
						   }
					]
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
        { xtype: 'component', flex: 1 },
        { xtype: 'button', text: Locale.getMsg('저장'), itemId:'saveBtn', margin: '5 5 5 -10', hidden: true,
		  listeners: {click : 'onSubmit'}
		}
    ]
	
}, {
    xtype: 'tabpanel',
	dock: 'bottom', 
	layout: 'fit', 
	height: 250,
	//frame: true, 
	defaults: {
		bodyPadding: 10,
		scrollable: true
	},
	id: 'customrTab', 
	reference: 'customrTab',
	items: [{
				title: Locale.getMsg('고객담당(KeyMan)'),
				glyph: 'xf084@FontAwesome',
				itemId: 'keyman',
				xtype: 'common-tabKeyman',
				listeners: {
				activate: function(tab,e){
					if(Ext.getCmp('customerDetail').down('#cust_cd').getValue() == '') return false;
					this.store.load({
						params: {cust_cd: Ext.getCmp('customerDetail').down('#cust_cd').getValue()}
					});
				}
			}
			}, {
				title: Locale.getMsg('활동현황'),
				glyph: 'xf00b@FontAwesome',
				itemId: 'activelist',
				xtype: 'common-tabPlaylist',
				listeners: {
					activate: function(tab,e){ 
						if(Ext.getCmp('customerDetail').down('#cust_cd').getValue() == '') return false;
						this.store.load({
							params: {cust_cd: Ext.getCmp('customerDetail').down('#cust_cd').getValue()}
						});
					}
				}
			}, {
				title: Locale.getMsg('프로젝트'),
				glyph: 'xf02c@FontAwesome',
				itemId: 'project',
				xtype: 'common-tabProject',
				listeners: {
					activate: function(tab,e){ 
						if(Ext.getCmp('customerDetail').down('#cust_cd').getValue() == '') return false;
						this.store.load({
						params: {cust_cd: Ext.getCmp('customerDetail').down('#cust_cd').getValue()}
					    });
					}
				}
			}, {
				title: Locale.getMsg('E-Mail 송수신'),
				glyph: 'xf0e0@FontAwesome',
				itemId: 'emaillist',
				xtype: 'common-tabEmail',
				listeners: {
					activate: function(tab,e){ 
						if(Ext.getCmp('customerDetail').down('#cust_cd').getValue() == '') return false;
					    this.store.load({
						params: {cust_cd: Ext.getCmp('customerDetail').down('#cust_cd').getValue()}
						});
					}
				}
			}, {
				title: Locale.getMsg('관련자료'),	
				glyph: 'xf15c@FontAwesome',
				itemId: 'attachfile',
				disabled: true,
				listeners: {
					activate: function(tab,e){ 
					}
				}
			}
	]
	

}]
});


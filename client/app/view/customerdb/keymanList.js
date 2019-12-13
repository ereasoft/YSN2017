///<reference path="~/Client/ext/build/ext-all-debug.js">
///<reference path="~/Client/ext/build/ext-debug.js">
Ext.define('Ysn.view.customerdb.keymanList',{
    extend: 'Ext.grid.Panel',
    xtype: 'keymanList',
    requires: [
        'Ysn.view.customerdb.keymanListController', 
		'Ysn.store.keymanList',
		'Ext.grid.filters.Filters'
    ],
    
    controller: 'customerdb-keymanList',     
	store: {
        type: 'keymanList', 
		autoLoad: false,
        autoDestroy: true
    }, 
	style: {'borderTop':'1px solid gray'},
	enableLocking: true,
	id: 'keymanList',
    columnLines: true,
	multiColumnSort: true, 
	plugins: ['gridfilters',
			  'pmh-grid-exporter'
	],
	columns: [
            {text: Locale.getMsg('고객담당'), width: 125, dataIndex: 'KM_NM', sortable: true, 
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
            {text: Locale.getMsg('부서'), width: 125, dataIndex: 'KM_DEPT_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
            {text: Locale.getMsg('직급'), width: 125, dataIndex: 'KM_TITLE_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: Locale.getMsg('업무구분'), width: 125, dataIndex: 'KM_WORK_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: Locale.getMsg('권한정도'), width: 125, dataIndex: 'KM_POWER_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: "Mobile", width: 125, dataIndex: 'M_PHONE', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
		    {text: "Email", width: 125, dataIndex: 'KM_EMAIL', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: Locale.getMsg('영업담당'), width: 125, dataIndex: 'KM_USER_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},  
            {text: Locale.getMsg('활동여부'), width: 125, dataIndex: 'USE_YN_NM', sortable: true, 
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},  
            {text: "고객담당ID", width: 125, dataIndex: 'KM_CD', hidden:true}
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

Ext.define('Ysn.view.customerdb.keymanDetail',{
    extend: 'Ext.form.Panel',
    xtype: 'customerdb-keymanDetail',
    requires: [
        'Ysn.view.customerdb.keymanDetailController', 
		'Ysn.view.common.tabKeyman',
		'Ysn.view.common.searchcustomerModel',		
		'Ysn.view.common.tabPlaylist',
		'Ysn.view.common.tabProject',
		'Ysn.view.common.tabEmail'
    ],

    controller: 'customerdb-keymanDetail', 


    frame: true,
    id: 'keymanDetail',
    reference: 'keymanDetail',
    bodyPadding: '10',
    scrollable:true,
    width: 600,   
    reader: {
        type: 'json',
        model: 'Ysn.model.keymanDetail',
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
        title: Locale.getMsg('기본 정보'),
        layout: {
            type: 'table',
            columns: 4,
            tableAttrs: {
                style: {
                    width: '100%'
                }
            }

        }, 
        items: [
                    {
                        colspan: 2,
                        xtype: 'fieldcontainer',
                        fieldLabel: '*'+Locale.getMsg('고객담당'), 
                        combineErrors: true, 
						labelWidth: 80,
                        layout: 'hbox',
                        defaults: {
                            //flex: 1,
                            hideLabel: true
                        },
                        items: [{
                            xtype: 'textfield',
                            name: 'km_nm',
                            reference: 'km_nm',
                            itemId: 'km_nm',
							allowBlank:false,
                            margin: '0 5 0 0',
                            width: 260
                        }, {
                            xtype: 'hiddenfield',
                            reference: 'km_cd',
                            name: 'km_cd',
                            itemId: 'km_cd'
                        }, {
                            xtype: 'hiddenfield',
                            name: 'idChk', 
							value: 'add',
							allowBlank:false
                        }, {
                            xtype: 'button',
                            text: Locale.getMsg('중복확인'),
							itemId : 'btnIdchk', 
                            handler: 'openKeyman'
                        }]
                    },
                    { fieldLabel: Locale.getMsg('매출조직'), xtype: 'textfield',labelWidth: 80,name: 'dept_nm', readOnly: true },
                    { fieldLabel: Locale.getMsg('등록일'), xtype: 'textfield',labelWidth: 80, width:200,name: 'km_reg_date', readOnly: true },
                    {
                        colspan: 2,
                        xtype: 'fieldcontainer',
                        fieldLabel: '*'+Locale.getMsg('거래처'),
						labelWidth: 80,
                        combineErrors: true,
                        layout: 'hbox',
                        defaults: {
                            //flex: 1,
                            hideLabel: true
                        },
                        items: [{
                            xtype: 'textfield',
                            name: 'cust_nm',
                            reference: 'cust_nm',
                            itemId: 'cust_nm',
							allowBlank:false,
							width: 260,
                            margin: '0 5 0 0'
                        }, {
                            xtype: 'hiddenfield',
                            reference: 'cust_cd',
                            name: 'cust_cd',
                            itemId: 'cust_cd'
                        }, {
                            xtype: 'hiddenfield',
                            reference: 'cust_cd2',
                            name: 'cust_cd2',
                            itemId: 'cust_cd2'
                        }, {
                            xtype: 'hiddenfield',
                            reference: 'km_dept_cd',
                            name: 'km_dept_cd',
                            itemId: 'km_dept_cd'
                        }, {
                            xtype: 'hiddenfield',
                            name: 'mod_usr',
                            value: loginUser
                        }, {
                            iconCls: 'x-fa fa-search',
                            xtype: 'button',
                            scale: 'small',
                            margin: '0 5 0 0',
                            handler: 'openWindow',
                            style: {
                                'border': 'none'
                            }
                        }, {
                            iconCls: 'x-fa fa-remove',
                            xtype: 'button',
                            scale: 'small',
                            handler: 'resetVal',
                            style: {
                                'background-color': 'red !important',
                                'background-image': 'none',
                                'border': 'none'
                            }
                        }]
                    },
                    { fieldLabel: Locale.getMsg('영업담당'), xtype: 'textfield',labelWidth: 80,  name: 'km_user_nm', readOnly: true },
                    { fieldLabel: Locale.getMsg('수정일'), xtype: 'textfield', labelWidth: 80, name: 'mod_dt', width:200,readOnly: true },
                    { fieldLabel: '*'+Locale.getMsg('부서명'), xtype: 'textfield', labelWidth: 80,width:250, name: 'km_dept_nm',allowBlank:false },
                    { fieldLabel: '*'+Locale.getMsg('직급'), xtype: 'textfield',labelWidth: 50, width:180, name: 'km_title',allowBlank:false },
                    { fieldLabel: Locale.getMsg('전화번호'),xtype: 'textfield',labelWidth: 80, name: 'o_phone' },
                    { fieldLabel: 'Mobile', xtype: 'textfield',labelWidth: 80, width:200,name: 'm_phone' },
					{ fieldLabel: Locale.getMsg('업무구분'), colspan:2, labelWidth: 80, name: 'km_work', 
						xtype: 'combobox',
						reference: 'km_work',
						publishes: 'km_work',  
						displayField: 'CODE_NM',
						valueField: 'CODE_ID', 
						store: {
							type: 'Tcode'
						},
						minChars: 0,
						queryMode: 'local',
						emptyText:'선택', 
						typeAhead: true
					},
					{ fieldLabel: Locale.getMsg('회사메일'), colspan:2, xtype: 'textfield',labelWidth: 80, width: 480,name: 'km_email' },
					{ fieldLabel: Locale.getMsg('담당업무'), colspan:2, xtype: 'textfield',labelWidth: 80, width:440, name: 'km_rep_work' },
					{ fieldLabel: Locale.getMsg('근무지'), colspan:2, xtype: 'textfield',labelWidth: 80, name: 'km_rep_work', width: 480,readOnly: true },
					{ fieldLabel: Locale.getMsg('권한정도'), xtype: 'textfield',labelWidth: 80, width:220,name: 'km_power', 
						xtype: 'combobox',
						reference: 'km_power',
						publishes: 'km_power',  
						displayField: 'CODE_NM',
						valueField: 'CODE_ID', 
						store: {
							type: 'Tcode'
						},
						minChars: 0,
						queryMode: 'local',
						emptyText:'선택', 
						typeAhead: true
					},
		            { fieldLabel: '*'+Locale.getMsg('핵심/일반'), xtype: 'km_posit',labelWidth: 80, width:190,name: 'km_posit',  
						xtype: 'combobox',
						reference: 'km_posit',
						publishes: 'km_posit',  
						displayField: 'CODE_NM',
						valueField: 'CODE_ID', 
						store: {
							type: 'Tcode'
						},
						allowBlank:false,
						minChars: 0,
						queryMode: 'local',
						emptyText:'선택', 
						typeAhead: true
					},
				    { 
						colspan: 2,
						xtype: 'fieldcontainer',
                        fieldLabel: Locale.getMsg('해외근무지'),
						itemId: 'ab_nation',
						labelWidth: 80,
                        combineErrors: true,
                        layout: 'hbox',
                        defaults: {
                            //flex: 1,
                            hideLabel: true
                        },
                        items: [{
							width:180,
                            name: 'ab_nation',
                            reference: 'ab_nation',
							itemId: 'ab_nation',
							xtype: 'combobox', 
							displayField: 'NAT_NM',
							valueField: 'NAT_CD', 
							store: {
								type: 'nation'
							},
							minChars: 0,
							queryMode: 'local',
							emptyText:'선택', 
							typeAhead: true,
                            margin: '0 5 0 0'
                        }, {
                            xtype: 'textfield',							
							width:210,
                            name: 'ab_region',
                            reference: 'ab_region' 
                        }] 
					},
				    { fieldLabel: Locale.getMsg('우호도'), colspan:2, xtype: 'textfield',labelWidth: 80, name: 'km_friend',  
						xtype: 'combobox',
						reference: 'km_friend',
						publishes: 'km_friend',  
						displayField: 'CODE_NM',
						valueField: 'CODE_ID', 
						store: {
							type: 'Tcode'
						},
						minChars: 0,
						queryMode: 'local',
						emptyText:'선택', 
						typeAhead: true
					},
					{ fieldLabel: Locale.getMsg('활동여부'), colspan:2, xtype: 'textfield',labelWidth: 80, name: 'use_yn',  
						xtype: 'combobox',
						reference: 'use_yn',
						publishes: 'use_yn',  
						displayField: 'CODE_NM',
						valueField: 'CODE_ID', 
						store: {
							type: 'Tcode'
						},
						minChars: 0,
						queryMode: 'local',
						emptyText:'선택', 
						typeAhead: true
					}
						

        ]
    },{
        xtype: 'fieldset',
		scrollable:true,
        title: Locale.getMsg('부가 정보'),
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
                    { fieldLabel: Locale.getMsg('부가 정보'), xtype: 'textfield',labelWidth: 80,  width: 400, name: 'km_school'},
			        { fieldLabel: Locale.getMsg('외부메일'), xtype: 'textfield',labelWidth: 80, width: 400, name: 'km_o_email'},
			        { fieldLabel: Locale.getMsg('취미'), xtype: 'textfield',labelWidth: 80, width: 400, name: 'km_hobby'},
		            {   
						xtype: 'fieldcontainer',
                        fieldLabel: Locale.getMsg('생일'), 
						labelWidth: 80,
                        combineErrors: true,
                        layout: 'hbox',
                        defaults: {
                            //flex: 1,
                            hideLabel: true
                        },
                        items: [{
							width:100, 
                            name: 'b_mth',
                            reference: 'b_mth',
							publishes: 'b_mth', 
							itemId: 'b_mth',
							xtype: 'combobox',
							displayField: 'MONTH',
							valueField: 'VAL', 
							store: {
								type: 'month'
							},  
							minChars: 0, 
                            margin: '0 5 0 0',
							queryMode: 'local',
							emptyText:'선택', 
						    typeAhead: true
                        }, {
							xtype: 'label',
							html: '월',
                            margin: '5 5 0 0'
                        }, {
                            width:100,
                            name: 'b_data',
							publishes: 'b_data',  
                            reference: 'b_data',
							itemId: 'b_data',
							xtype: 'combobox',
							displayField: 'DAY',
							valueField: 'VAL', 
							store: {
								type: 'day'
							},  
							minChars: 0,  
							margin: '0 5 0 0',
							queryMode: 'local',
							emptyText:'선택', 
						    typeAhead: true
                        }, {
							xtype: 'label',
							html: '일',
							margin: '5 0 0 0'
                        }] 
					},
					{ fieldLabel: Locale.getMsg('종교'), xtype: 'textfield',labelWidth: 80, width:400, name: 'dept_nm'},
					{   
						xtype: 'fieldcontainer',
                        fieldLabel: '결혼기념일', 
						labelWidth: 80,
                        combineErrors: true,
                        layout: 'hbox',
                        defaults: {
                            //flex: 1,
                            hideLabel: true
                        },
                        items: [{
							width:100, 
                            name: '',
                            reference: 'w_mth',
							itemId: 'w_mth',
							xtype: 'combobox',
							displayField: 'MONTH',
							valueField: 'VAL', 
							store: {
								type: 'month'
							}, 
							minChars: 0, 
							emptyText:'선택', 
						    typeAhead: true,
                            margin: '0 5 0 0'
                        }, {
							xtype: 'label',
							html: '월',
                            margin: '5 5 0 0'
                        }, {
                            width:100,
                            name: '',
                            reference: 'w_data',
							itemId: 'w_data',
							xtype: 'combobox',
							displayField: 'DAY',
							valueField: 'VAL', 
							store: {
								type: 'day'
							},
							minChars: 0,  
							emptyText:'선택', 
						    typeAhead: true,
							margin: '0 5 0 0'
                        }, {
							xtype: 'label',
							html: '일',
							margin: '5 0 0 0'
                        }] 
					},
			        { fieldLabel: Locale.getMsg('집주소'), xtype: 'textfield',labelWidth: 80, width: 400, name: 'km_address'},
		            { fieldLabel: Locale.getMsg('비고'), xtype: 'textfield',labelWidth: 80, width: 400, name: 'km_descript'}				
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
                { xtype: 'button', text: Locale.getMsg('저장'), margin: '5 5 5 -10',
                    listeners: {click : 'onSubmit'}
                }
            ]
        }, {
            xtype: 'tabpanel',
			id: 'keymanTab',
            dock: 'bottom', 
            layout: 'fit', 
            height: 250,
            //frame: true, 
            defaults: {
                bodyPadding: 10,
                scrollable: true
            },
            //activeTab: 0, 
            items: [{
                title: Locale.getMsg('활동현황'),
                glyph: 'xf00b@FontAwesome',
                itemId: 'activelist',
                xtype: 'common-tabPlaylist',
                listeners: {
                    activate: function(tab,e){
						this.store.proxy.setConfig('url','/KeyMan/BottomKeymanPlayList');
                        this.store.load({
                            params: {km_cd: Ext.getCmp('keymanDetail').down('#km_cd').getValue()}
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
						this.store.proxy.setConfig('url','/KeyMan/BottomKeymanEmailList')
                        this.store.load({
                            params: {km_cd: Ext.getCmp('keymanDetail').down('#km_cd').getValue()}
                        });
                    }
                }
            } 
            ]
	

        }]
    });


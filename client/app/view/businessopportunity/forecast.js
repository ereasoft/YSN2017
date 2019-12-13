Ext.define('Ysn.view.businessopportunity.forecastsearch', {
    extend: 'Ext.panel.Panel',
    xtype: 'forecast-search',

    requires: [
        'Ysn.view.businessopportunity.forecastsearchController',
	  	'Ysn.view.common.searchcustomer',
	    'Ysn.store.*'
    ],

    controller: 'forecast-search',

    frame: false,
    //resizable: true,
    width: 1000,
    minWidth: 1000,
    minHeight: 140,
    layout: {
        type: 'table',
        columns: 5,
        tableAttrs: {
            style: {
				'padding-top': '5px',
                width: '20%'
            }
        }

    },
    id: 'forecast-search',
    defaults: {
        layout: 'form',
        xtype: 'container',
        defaultType: 'textfield'
    },

    items: [{
        xtype: 'fieldcontainer',
        fieldLabel: Locale.getMsg('매출조직'),
        labelAlign: 'right',
        combineErrors: true,
        msgTarget: 'side',
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
                change: 'onChangeBiz'
            }
        },
            {
                xtype: 'combobox',
                reference: 'deptGroup',
                itemId: 'deptGroup',
                name: 'deptGroup',
                publishes: 'value',
                displayField: 'DEPT_NM',
                valueField: 'DEPT_CD',
                store: {
                    type: 'deptgroup',
                    listeners: {
                        load: function (store) {
                            store.insert(0, { DEPT_CD: '', DEPT_NM: Locale.getMsg('전체') });
                            var bizCd = Ext.getCmp('forecast-search').down('#bizGroup');
                            if (store.data.items.length < 2) {
                                Ext.getCmp('forecast-search').down('#user_cd').store.load({ params: { dept_cd: bizCd.getValue(), up_dept_cd: '' } });
                            } else {
                                Ext.getCmp('forecast-search').down('#user_cd').store.load({ params: { dept_cd: '', up_dept_cd: bizCd.getValue() } });
                            }
                        }
                    }
                },
                minChars: 0,
                //width: 150,
                maskOnDisable: true,
                queryMode: 'local',
                listeners: {
                    change: 'onChangeDept'
                }
            }]
    }, {
        xtype: 'combobox',
        reference: 'userGroup',
        publishes: 'value',
        fieldLabel: Locale.getMsg('영업담당'),
        labelAlign: 'right',
        displayField: 'USER_NM',
        valueField: 'USER_CD',
        name: 'user_cd',
        itemId: 'user_cd',
        maskOnDisable: true,
        anchor: '-15',
        store: {
            type: 'usercd'
        },
        minChars: 0,
        queryMode: 'local'
    }, {
        xtype: 'combobox',
        reference: 'dstr_type',
        publishes: 'value',
        fieldLabel: Locale.getMsg('유통구조'),
        labelAlign: 'right',
        displayField: 'CODE_NM',
        valueField: 'CODE_ID',
        name: 'dstr_type',
        anchor: '-15',
        store: {
            type: 'TcodeAll'
        },
        minChars: 0,
        queryMode: 'local'
    }, {
        xtype: 'fieldcontainer', 
        combineErrors: true,
        layout: 'hbox',
        defaults: {
            //flex: 1,
            //hideLabel: true,
            margin: '0 5 0 0'
        },
        items: [{
            fieldLabel: Locale.getMsg('수주예정일'),
            labelAlign: 'right',
            labelWidth: 80,
            width: 210,
            xtype: 'datefield',
            name: 'sdate',
            reference: 'sdate',
            itemId: 'sdate',
            format: 'Y-m-d',
            maxValue: new Date(),
            margin: '0 5 0 0'
        }, {
            xtype: 'datefield',
            name: 'edate',
            width: 130,
            reference: 'edate',
            itemId: 'edate',
            format: 'Y-m-d',
            value: new Date(),
            margin: '0 10 0 0'
        }, {
            xtype: 'hiddenfield',
            reference: 'mod_user',
            name: 'mod_user',
            itemId: 'mod_user'
        }]
    }, {
        rowspan: 4,
        xtype: 'button',
        text: Locale.getMsg('검색'),
        width: 60,
        height: 60,
        listeners: {
            click: 'onSubmitClick'
        }
    }, {
        xtype: 'fieldcontainer',
        fieldLabel: Locale.getMsg('거래처'),
        labelAlign: 'right',
        combineErrors: true,
        msgTarget: 'side',
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
            margin: '0 5 0 0',
            width: 270
        }, {
            xtype: 'hiddenfield',
            reference: 'cust_cd',
            name: 'cust_cd',
            itemId: 'cust_cd'
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
    }, {
        xtype: 'combobox',
        reference: 'biz_type',
        publishes: 'value',
        fieldLabel: Locale.getMsg('사업유형'),
        labelAlign: 'right',
        displayField: 'CODE_NM',
        valueField: 'CODE_ID',
        name: 'biz_type',
        anchor: '-15',
        store: {
            type: 'TcodeAll'
        },
        minChars: 0,
        queryMode: 'local'
    },  {
        xtype: 'textfield',
        fieldLabel: 'SMP.No', 
        labelAlign: 'right',
        name: 'smp_cd',
        reference: 'smp_cd',
        itemId: 'smp_cd'
    }, {
        xtype: 'combobox',
        reference: 'oppt_status',
        publishes: 'value',
        fieldLabel: Locale.getMsg('진행상태'),
        labelWidth: 80,
        labelAlign: 'right',
        displayField: 'CODE_NM',
        valueField: 'CODE_ID',
        name: 'oppt_status',
        anchor: '-15',
        store: {
            type: 'TcodeAll'
        },
        minChars: 0,
        queryMode: 'local'
    }, {
        xtype: 'fieldcontainer',
        fieldLabel: 'End User',
        labelAlign: 'right',
        combineErrors: true,
        msgTarget: 'side',
        layout: 'hbox',
        defaults: {
            //flex: 1,
            hideLabel: true
        },
        items: [{
            xtype: 'textfield',
            name: 'euser_nm',
            reference: 'euser_nm',
            itemId: 'euser_nm',
            margin: '0 5 0 0',
            width: 270
        }, {
            xtype: 'hiddenfield',
            reference: 'euser_cd',
            name: 'euser_cd',
            itemId: 'euser_cd'
        }, {
            iconCls: 'x-fa fa-search',
            xtype: 'button',
            scale: 'small',
            margin: '0 5 0 0',
            handler: 'openWindow2',
            style: {
                'border': 'none'

            }
        }, {
            iconCls: 'x-fa fa-remove',
            xtype: 'button',
            scale: 'small',
            handler: 'resetVal2',
            style: {
                'background-color': 'red !important',
                'background-image': 'none',
                'border': 'none'

            }
        }]
    },
     {
         xtype: 'fieldcontainer', 
         labelAlign: 'right',
         combineErrors: true,
         msgTarget: 'side',
         layout: 'hbox',
         colspan: 3,
         defaults: {
             //flex: 1,
             //hideLabel: true
         },
         items: [
             {
                 xtype: 'combobox',
                 reference: 'item_type',
                 publishes: 'value',
                 fieldLabel: Locale.getMsg('품목유형'),
                 labelAlign: 'right',
                 displayField: 'CODE_NM',
                 valueField: 'CODE_ID',
                 name: 'item_type',
                 width:200,
                 anchor: '-15',
                 store: {
                     type: 'TcodeAll'
                 },
                 minChars: 0,
                 queryMode: 'local'
             }, {
                 xtype: 'combobox',
                 reference: 'oppt_type',
                 publishes: 'value',
                 fieldLabel: Locale.getMsg('기회유형'),
                 labelAlign: 'right',
                 displayField: 'CODE_NM',
                 valueField: 'CODE_ID',
                 name: 'oppt_type',
                 width: 210,
                 anchor: '-15',
                 store: {
                     type: 'TcodeAll'
                 },
                 minChars: 0,
                 queryMode: 'local'
             }, {
                 xtype: 'combobox',
                 reference: 'wso_psblt',
                 publishes: 'value',
                 fieldLabel: Locale.getMsg('수주가능성'),
                 labelAlign: 'right',
                 width: 200,
                 displayField: 'CODE_NM',
                 valueField: 'CODE_ID',
                 name: 'wso_psblt',
                 anchor: '-15',
                 store: {
                     type: 'TcodeAll'
                 },
                 minChars: 0,
                 queryMode: 'local'
             }, {
                 xtype: 'combobox',
                 reference: 'cnfm_yn',
                 publishes: 'value',
                 fieldLabel: Locale.getMsg('확정여부'),
                 labelAlign: 'right',
                 width: 200,
                 displayField: 'CODE_NM',
                 valueField: 'CODE_ID',
                 name: 'cnfm_yn',
                 anchor: '-15',
                 store: {
                     type: 'TcodeAll'
                 },
                 minChars: 0,
                 queryMode: 'local'
             }
         ]
     }, 
    {
        xtype: 'fieldcontainer',
        fieldLabel: Locale.getMsg('매출처'),
        labelAlign: 'right',
        combineErrors: true,
        msgTarget: 'side',
        layout: 'hbox',
        defaults: {
            //flex: 1,
            hideLabel: true
        },
        items: [{
            xtype: 'textfield',
            name: 'bcust_nm',
            reference: 'bcust_nm',
            itemId: 'bcust_nm',
            margin: '0 5 0 0',
            width: 270
        }, {
            xtype: 'hiddenfield',
            reference: 'bcust_cd',
            name: 'bcust_cd',
            itemId: 'bcust_cd'
        }, {
            iconCls: 'x-fa fa-search',
            xtype: 'button',
            scale: 'small',
            margin: '0 5 0 0',
            handler: 'openWindow3',
            style: {
                'border': 'none'

            }
        }, {
            iconCls: 'x-fa fa-remove',
            xtype: 'button',
            scale: 'small',
            handler: 'resetVal3',
            style: {
                'background-color': 'red !important',
                'background-image': 'none',
                'border': 'none'

            }
        }]
    }, {
        xtype: 'textfield',
        fieldLabel: Locale.getMsg('기회품목'),
        colspan: 2, 
        labelWidth: 100,
        labelAlign: 'right',
        name: 'item_nm',
        reference: 'item_nm',
        itemId: 'item_nm',
        margin: '0 5 0 0',
        style: {width:'100%'}
    }, {
        xtype: 'fieldcontainer',
        combineErrors: true,
        layout: 'hbox',
        fieldLabel: Locale.getMsg('전망년월'), 
        labelWidth: 80,
        labelAlign: 'right',
        defaults: {
            //flex: 1,
            hideLabel: true
        },
        items: [{
            xtype: 'combobox',
            reference: 'base_y',
            publishes: 'value',
            width: 100,
            labelAlign: 'right',
            displayField: 'YEAR',
            valueField: 'VAL',
            name: 'base_y',
            itemId: 'base_y',
            maskOnDisable: true,
            anchor: '-15',
            store: {
                type: 'year'
            },
            minChars: 0,
            queryMode: 'local',
            margin: '0 5 0 0'
        }, {
            xtype: 'combobox',
            reference: 'base_m',
            publishes: 'value',
            labelAlign: 'right',
            width: 70,
            displayField: 'MONTH',
            valueField: 'VAL',
            name: 'base_m',
            itemId: 'base_m',
            maskOnDisable: true,
            anchor: '-15',
            store: {
                type: 'month'
            },
            minChars: 0,
            queryMode: 'local',
            margin: '0 10 0 0'
        } 
        ]
    }
    ]
});

Ext.define('Ysn.view.businessopportunity.forecastsearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.forecast-search',
    init: function () {
        this.lookupReference('bizGroup').store.load();
        this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true));
        this.lookupReference('dstr_type').store.load({ params: { up_code_id: 'DSTR_TYPE',lang:localeCd } });
        this.lookupReference('dstr_type').setValue('');
        this.lookupReference('biz_type').store.load({ params: { up_code_id: 'BIZ_TYPE',lang:localeCd } });
        this.lookupReference('biz_type').setValue('');
        this.lookupReference('oppt_type').store.load({ params: { up_code_id: 'OPPT_TYPE',lang:localeCd } });
        this.lookupReference('oppt_type').setValue('');
        this.lookupReference('oppt_status').store.load({ params: { up_code_id: 'OPPT_STATUS',lang:localeCd} });
        this.lookupReference('oppt_status').setValue('');
        this.lookupReference('item_type').store.load({ params: { up_code_id: 'ITEM_TYPE',lang:localeCd } });
        this.lookupReference('item_type').setValue('');
        this.lookupReference('wso_psblt').store.load({ params: { up_code_id: 'WSO_PSBLT',lang:localeCd } });
        this.lookupReference('wso_psblt').setValue('');
        this.lookupReference('cnfm_yn').store.load({ params: { up_code_id: 'CNFM_YN',lang:localeCd } });
        this.lookupReference('cnfm_yn').setValue('');

        var Today = new Date();
        this.lookupReference('sdate').setValue(Today.getFullYear() + '-' + ('0' + (Today.getMonth() + 1)).slice(-2) + '-' + '01');
        this.lookupReference('base_y').store.load();
        this.lookupReference('base_y').setValue(Today.getFullYear());
        this.lookupReference('base_m').store.load();
        this.lookupReference('base_m').setValue('0' + (Today.getMonth() + 1));
		if(auth_id != 'A001'){
		// this.lookupReference('bizGroup').setConfig({'readOnly':true});
		// if(dept_level == '4') this.lookupReference('deptGroup').setConfig({'readOnly':true});
	 }
    },
    openWindow: function () {
        var win = Ext.getCmp('commonSearchcustomer');
        if (!win) {
            win = new Ysn.view.common.searchcustomer();
        }
        var hidfield = win.query('#paentFrm')[0];

        hidfield.setValue('forecast-search');
		win.down('#cust_nm').setValue(this.lookupReference('cust_nm').getValue());
        Ext.getCmp('businessopportunity-forecast').add(win);
        win.setPosition(10, -100);
        win.show();
    },
    resetVal: function () {
        this.lookupReference('cust_nm').setValue('');
        this.lookupReference('cust_cd').setValue('');
    },
    openWindow2: function () {
        var win2 = Ext.getCmp('commonSearchEndUser');
        if (!win2) {
            win2 = new Ysn.view.common.searchEndUser();
        }
        var hidfield = win2.query('#paentFrm')[0]; 
		win2.down('#euser_nm').setValue(this.lookupReference('euser_nm').getValue());
        hidfield.setValue('forecast-search');
        Ext.getCmp('businessopportunity-forecast').add(win2);
        win2.setPosition(10, -100);
        win2.show();
    },
    resetVal2: function () {
        this.lookupReference('euser_nm').setValue('');
        this.lookupReference('euser_cd').setValue('');
    },
    openWindow3: function () {
        var win3 = Ext.getCmp('commonSearchcustomer2');
        if (!win3) {
            win3 = new Ysn.view.common.searchcustomer2();
        }
        var hidfield = win3.query('#paentFrm')[0]; 
		win3.down('#cust_nm').setValue(this.lookupReference('bcust_nm').getValue());
        hidfield.setValue('forecast-search');
        Ext.getCmp('businessopportunity-forecast').add(win3);
        win3.setPosition(10, -100);
        win3.show();
    },
    resetVal3: function () {
        this.lookupReference('bcust_nm').setValue('');
        this.lookupReference('bcust_cd').setValue('');
    },
    onChangeBiz: function (el, newVal, oldVal, e) {
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
    onChangeDept: function (el, newVal, oldVal, e) {
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
    onSubmitClick: function () {
        //console.log(Ext.getCmp('productinquiryinquiry'));
        Ext.getStore('forecastList').load(
                {
                    params: {
                        deptGroup: this.lookupReference('deptGroup').getValue(),
                        bizGroup: this.lookupReference('bizGroup').getValue(),
                        user_cd: this.lookupReference('userGroup').getValue(),
                        cust_cd: this.lookupReference('cust_cd').getValue(),
                        dstr_type: this.lookupReference('dstr_type').getValue(),
                        biz_type: this.lookupReference('biz_type').getValue(),
                        bcust_cd: this.lookupReference('bcust_cd').getValue(),
                        euser_cd: this.lookupReference('euser_cd').getValue(),
                        item_type: this.lookupReference('item_type').getValue(),
                        item_nm: this.lookupReference('item_nm').getValue(),
                        cnfm_yn: this.lookupReference('cnfm_yn').getValue(),
                        wso_psblt: this.lookupReference('wso_psblt').getValue(),
                        smp_cd: this.lookupReference('smp_cd').getValue(),
                        base_y: this.lookupReference('base_y').getValue(),
                        base_m: this.lookupReference('base_m').getValue(),
                        oppt_status: this.lookupReference('oppt_status').getValue(),
                        sdate: Ext.Date.format(this.lookupReference('sdate').getValue(), 'Y-m-d'),
                        edate: Ext.Date.format(this.lookupReference('edate').getValue(), 'Y-m-d')
                    }
                }
    );
    }


});


Ext.define('Ysn.view.businessopportunity.forecastList', {
    extend: 'Ext.grid.Panel',
    xtype: 'forecastList',
    requires: [
        'Ysn.view.businessopportunity.forecastListController', 
		'Ysn.store.forecastList',
		'Ext.grid.filters.Filters' 
    ],
    
    controller: 'businessopportunity-forecastList',     
	store: {
	    type: 'forecastList',
		autoLoad: false,
        autoDestroy: true
    }, 
	style: {'borderTop':'1px solid gray'},
	enableLocking: true,
	id: 'forecastList',
    columnLines: true,
	multiColumnSort: true, 
	plugins: ['gridfilters', 'pmh-grid-exporter'],
	columns: [
            {
                text: "OPPT_CD", width: 100, dataIndex: 'OPPT_CD', hidden: true
			},
            {
                text: Locale.getMsg('기회유형'), width: 80, dataIndex: 'OPPT_TYPE_NM', sortable: true,
			 filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
            {
                text: Locale.getMsg('기회품목'), width: 200, dataIndex: 'ITEM_NM', sortable: true,
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
            {text: Locale.getMsg('거래처'), width: 125, dataIndex: 'CUST_NM', sortable: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
			{text: Locale.getMsg('End User'), width: 125, dataIndex: 'EUSER_NM', sortable: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},  
			{text: Locale.getMsg('유통구조'), width: 125, dataIndex: 'DSTR_TYPE_NM', sortable: true, 
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
			{text: Locale.getMsg('영업담당'), width: 100, dataIndex: 'USER_NM', sortable: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
			{
			    text: Locale.getMsg('사업유형'), width: 100, dataIndex: 'BIZ_TYPE_NM', sortable: true,
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			}, 
			{text: Locale.getMsg('품목유형'), width: 125, dataIndex: 'ITEM_TYPE_NM', sortable: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
			{
			    text: Locale.getMsg('진행상태'), width: 125, dataIndex: 'OPPT_STATUS_NM', sortable: true,
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
			{
			    text: Locale.getMsg('수주가능성'), width: 80, dataIndex: 'WSO_PSBLT_NM', sortable: true,
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
			{ text: Locale.getMsg('수주가능성'), width: 125, dataIndex: 'WSO_PDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true, filter: true },
			{
			    text: Locale.getMsg('통화'), width: 70, dataIndex: 'BASE_CRNY', sortable: true,
			    filter: {
			        type: 'string',
			        itemDefaults: {
			            emptyText: Locale.getMsg('검색어입력..')
			        }
			    }
			},
            {
                text: Locale.getMsg('수량'), width: 100, dataIndex: 'OPPT_QTY', sortable: true, renderer: 'changeDec',
                filter: {
                    type: 'string',
                    itemDefaults: {
                        emptyText: Locale.getMsg('검색어입력..')
                    }
                }
            },
            {
                text: Locale.getMsg('단가'), width: 70, dataIndex: 'OPPT_UNIT_PRC', sortable: true, renderer: 'changeDbl',
                filter: {
                    type: 'string',
                    itemDefaults: {
                        emptyText: Locale.getMsg('검색어입력..')
                    }
                }
            },
            {
                text: Locale.getMsg('수주예정금액'), width: 125, dataIndex: 'AMOUNT', sortable: true, renderer: 'changeDbl',
                filter: {
                    type: 'string',
                    itemDefaults: {
                        emptyText: Locale.getMsg('검색어입력..')
                    }
                }
            },
            {
                text: Locale.getMsg('수주예정금액(KRW)'), width: 150, dataIndex: 'KRW_AMOUNT', sortable: true, renderer: 'changeDec',
                filter: {
                    type: 'string',
                    itemDefaults: {
                        emptyText: Locale.getMsg('검색어입력..')
                    }
                }
            },
            {
                text: Locale.getMsg('확정여부'), width: 150, dataIndex: 'CNFM_YN', sortable: true, 
                filter: {
                    type: 'string',
                    itemDefaults: {
                        emptyText: Locale.getMsg('검색어입력..')
                    }
                }
            },
            {
                text: Locale.getMsg('전망년월'), width: 150, dataIndex: 'BASE_YM', hidden: true 
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

Ext.define('Ysn.view.businessopportunity.forecastListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.businessopportunity-forecastList',
    init: function () {

    },
    changeDec: function (value) {
        return Ysn.Util.changeDec(value);
    },
    changeDbl: function (value) {
        return Ysn.Util.changeDbl(value);
    } 
});

Ext.define('Ysn.view.businessopportunity.forecastDetail',{
    extend: 'Ext.form.Panel',
    xtype: 'businessopportunity-forecastDetail',
    requires: [
        'Ysn.view.businessopportunity.forecastDetailController'
    ],

    controller: 'businessopportunity-forecastDetail', 


    frame: true,
    id: 'forecastDetail',
	reference: 'forecastDetail',
    bodyPadding: 10,
    scrollable:true,
    width: 900,   
	fieldDefaults: { 
			labelAlign: 'right', 
			msgTarget: 'side',
            readOnly: true
		},
    items: [{
        xtype: 'fieldset',
		scrollable:true,
        title: Locale.getMsg('기본정보'),
        layout: {
            type: 'table',
            columns: 3, 
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
                        fieldLabel: Locale.getMsg('기회품목'),
						labelWidth: 80,
						style:{width:'100%'},
                        combineErrors: true,
                        layout: 'hbox', 
                        defaults: {
                            //flex: 1,
                            hideLabel: true,
                            readOnly: true
                        },
                        items: [{
                            xtype: 'textfield',
                            name: 'oppt_type_nm',
                            reference: 'oppt_type_nm',
                            itemId: 'oppt_type_nm',
                            allowBlank: false,
                            width: 150, 
							margin: '0 5 0 0' 
                        },{
                            xtype: 'hiddenfield',
                            name: 'oppt_type',
                            reference: 'oppt_type',
                            itemId: 'oppt_type', 
                            margin: '0 5 0 0'
                        },{
                            xtype: 'textfield',
                            name: 'item_nm',
                            reference: 'item_nm',
                            itemId: 'item_nm', 
                            width:350,
                            readOnly: true, 
                            margin: '0 5 0 0'
                        }, {
                            xtype: 'hiddenfield',
                            reference: 'item_cd',
                            name: 'item_cd',
                            itemId: 'item_cd'
                        }, {
                            xtype: 'hiddenfield',
                            name: 'mod_usr',
                            value: loginUser
                        }]
                    },
                    {   
                        xtype: 'fieldcontainer',
                        fieldLabel: 'SMP.CD',
						labelWidth: 100,
						style:{width:'100%'},
                        combineErrors: true,
                        layout: 'hbox', 
                        defaults: {
                            //flex: 1,
                            hideLabel: true,
                            readOnly: true
                        },
                        items: [{
                            xtype: 'textfield',
                            name: 'rfc_cd',
                            reference: 'rfc_cd',
                            itemId: 'rfc_cd',
                            width: 100, 
                            margin: '0 5 0 0'
                        },{
                            xtype: 'textfield',
                            name: 'rfc_chasu',
                            reference: 'rfc_chasu',
                            itemId: 'rfc_chasu', 
                            width:50, 
                            margin: '0 5 0 0'
                        }]
                    },
                    { fieldLabel: Locale.getMsg('사업유형'), xtype: 'textfield', labelWidth: 80, name: 'biz_type_nm',   readOnly: true },
                    { xtype: 'hiddenfield', name: 'biz_type'  },
                    { fieldLabel: Locale.getMsg('유통구조'), xtype: 'textfield', labelWidth: 100, name: 'dstr_type_nm',   readOnly: true },
                    { xtype: 'hiddenfield', name: 'dstr_type'},
                    {
                        fieldLabel: Locale.getMsg('진행상태'), labelWidth: 100, name: 'oppt_status',
                        xtype: 'combobox',
                        reference: 'oppt_status',
                        publishes: 'value',
                        displayField: 'CODE_NM',
                        valueField: 'CODE_ID',
                        emptyText: Locale.getMsg('선택'),
                        store: {
                            type: 'Tcode'
                        }, 
                        minChars: 0,
                        queryMode: 'local',
                        readOnly: false,
                        typeAhead: true
                    },
					{
						xtype: 'fieldcontainer', 
						labelWidth: 80,
						fieldLabel: Locale.getMsg('거래처'),
						labelAlign: 'right',
						combineErrors: true,
						msgTarget : 'side',
						layout: 'hbox',
						defaults: {
							//flex: 1,
						    hideLabel: true,
                            readOnly: true
						},
							items: [{
								xtype: 'textfield',
								name: 'cust_nm', 
								reference : 'cust_nm',
								itemId: 'cust_nm', 
								margin: '0 5 0 0',
								readOnly: true,
								width: 250
							},{
								xtype: 'hiddenfield',
								reference: 'cust_cd', 
								name: 'cust_cd', 
								itemId : 'cust_cd'
							}]
					},
				    { fieldLabel: Locale.getMsg('영업담당'), xtype: 'textfield', labelWidth: 100, name: 'user_nm'  },
                    { xtype: 'hiddenfield', name: 'user_cd'  },
                    { fieldLabel: '*수주예정일', xtype: 'datefield', labelWidth: 100, width: 230, format: 'Y-m-d', readOnly: false, name: 'wso_pdate',allowBlank:false },
					{ fieldLabel: 'EndUser', xtype: 'textfield', labelWidth: 80, style: { width: '100%' }, name: 'euser_nm' , readOnly: true },
                    { xtype: 'hiddenfield', name: 'euser_cd'  },
                    { fieldLabel: Locale.getMsg('매출조직'), xtype: 'textfield', labelWidth: 100, name: 'dept_nm' },
                    { xtype: 'hiddenfield', name: 'dept_cd'  },
					{
					    fieldLabel: Locale.getMsg('수주가능성'), labelWidth: 100, name: 'wso_psblt',
						xtype: 'combobox',
						reference: 'wso_psblt',
						publishes: 'value',  
						displayField: 'CODE_NM',
						valueField: 'CODE_ID', 
		                emptyText: Locale.getMsg('선택'),
						store: {
							type: 'Tcode'
						},
						minChars: 0,
						queryMode: 'local',
						readOnly: false,
						typeAhead: true
					}, 
					{ fieldLabel: Locale.getMsg('특이사항'), colspan: 3, xtype: 'textareafield', labelWidth: 80, name: 'oppt_sumry', readOnly: false, style: { width: '100%' } }
        ]
    },{
        xtype: 'fieldset',
        reference : 'itemList',
		scrollable:true,
        title: Locale.getMsg('납품예정 정보'),
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
					    xtype: 'grid',
					    store: {
					        type: 'forecastItem',
					        autoLoad: false,
					        autoDestroy: true,
					        listeners: { 
					        }
					    },
					    plugins: {
					        ptype: 'cellediting',
					        clicksToEdit: 1,
					        listeners: {
                                edit: 'cellEdit'
					        }
					    },
					    itemId: 'forecastItem',
					    reference: 'forecastItem',
					    columnLines: true,  
					    columns: [
                                { text: "IDX", width: 100, dataIndex: 'IDX', hidden: true, sortable: false },
                                { text: Locale.getMsg('품목코드'), width: 120, dataIndex: 'ITEM_CD2', sortable: false },
                                { text: Locale.getMsg('품목명'), width: 250, dataIndex: 'ITEM_NM', sortable: false },
                                { text: Locale.getMsg('통화'), width: 60, dataIndex: 'BASE_CRNY', sortable: false },
                                { text: Locale.getMsg('환율'), width: 100, dataIndex: 'EXCH_RATE', sortable: false, renderer: 'changeDbl' },
                                {
                                    text: Locale.getMsg('수량'), width: 100, dataIndex: 'OPPT_QTY', sortable: false, renderer: 'changeDec',
                                    editor: { xtype: 'numberfield', allowBlank: false, allowDecimals: false, readOnly: false, minValue: 0}
                                },
                                {
                                    text: Locale.getMsg('단가'), width: 100, dataIndex: 'OPPT_UNIT_PRC', sortable: false, renderer: 'changeDbl',
                                    editor: { xtype: 'numberfield', allowBlank: false, readOnly: false, minValue: 0 }
                                },
                                { text: Locale.getMsg('수주금액'), width: 130, dataIndex: 'AMOUNT', sortable: false, renderer: 'changeDbl' },
                                { text: Locale.getMsg('수주금액(KRW)'), width: 130, dataIndex: 'KRW_AMOUNT', sortable: false, renderer: 'changeDec' },
                                {
                                    text: Locale.getMsg('납품예정일'), width: 125, dataIndex: 'SALES_DATE', sortable: false, readOnly: false, renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                                    editor: { xtype: 'datefield', allowBlank: false,  readOnly: false }
                                }
                               
					    ], 
					    style: {width:'100%'},
					    syncRowHeight: true,
					    viewConfig: {
					        stripeRows: true
					    },
					    listeners: {
					        //itemclick: function(dataview, record, item, index, e) {  
					        // }

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
				{ xtype: 'hiddenfield', name: 'oppt_cd' },
                { xtype: 'hiddenfield', name: 'base_crny' },
                { xtype: 'hiddenfield', name: 'exch_rate' },
                { xtype: 'hiddenfield', name: 'pjt_cd' },
                { xtype: 'hiddenfield', name: 'cnfm_yn' },
                { xtype: 'hiddenfield', name: 'chkbaseyn' },
                { xtype: 'hiddenfield', name: 'base_ym' },
				/*{ xtype: 'button', text: 'Drop정보', name: 'rtnbtn1', itemId: 'rtnbtn1', margin: '5 5 5 5',hidden: true,
                    listeners: {click : 'onDrop'}
                }, */ 
				{ xtype: 'button', text: Locale.getMsg('전망확정'), name: 'btn3', itemId: 'btn3',margin: '5 5 5 5', hidden: true,
                    listeners: {click : 'onSubmit'}
                }
            ]
        }]
});

Ext.define('Ysn.view.businessopportunity.forecastDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.businessopportunity-forecastDetail',
    init: function () {
        this.lookupReference('wso_psblt').store.load({ params: { up_code_id: 'WSO_PSBLT' } });
        this.lookupReference('oppt_status').store.load({ params: { up_code_id: 'OPPT_STATUS' } });
    },
    
    changeDec: function (value) {
        return Ysn.Util.changeDec(value);
    },
    changeDbl: function (value) {
        return Ysn.Util.changeDbl(value);
    }, 
    cellEdit: function (editor, e) {
        var sel_model = e.grid.getSelectionModel();
        var record = sel_model.getSelection()[0];
        var amount = parseInt(record.get('OPPT_QTY')) * parseFloat(record.get('OPPT_UNIT_PRC'));
        var krwamount = amount * parseFloat(record.get('EXCH_RATE'));
        record.set("AMOUNT", amount);
        record.set("KRW_AMOUNT", krwamount);
        var pl = Ext.getCmp('forecastDetail');
        pl.down('#oppt_oppt_qty' + e.rowIdx).setValue(record.get('OPPT_QTY'));
        pl.down('#oppt_oppt_unit_prc' + e.rowIdx).setValue(record.get('OPPT_UNIT_PRC'));
        pl.down('#oppt_amount' + e.rowIdx).setValue(record.get('AMOUNT'));
        pl.down('#oppt_krw_amount' + e.rowIdx).setValue(record.get('KRW_AMOUNT'));
        pl.down('#oppt_sales_date' + e.rowIdx).setValue(Ext.Date.format(record.get('SALES_DATE'), 'Y-m-d'));
    },
    onSubmit: function () {
        var form = Ext.getCmp('forecastDetail').getForm();
        Ysn.Util.cbEmptyVal(Ext.getCmp('forecastDetail'));
        if (form.isValid()) {
            var url = '/forecast/forecastSave';
            form.setConfig('url', url);
            form.submit({
                waitMsg: 'Processing...',
                method: 'POST',
                params: form.getValues(),
                submitEmptyText: false,
                success: function (form, action) {
                    if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    Ext.getCmp('forecastDetail').down('#btn3').hide();
                    Ext.Msg.alert(Locale.getMsg('처리상태'), Locale.getMsg('처리완료'));                    
                    Ext.getCmp('forecastList').store.reload();
                },
                failure: function (form, action) {
                    //console.log('response:'+ action);
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.'); 
                    //Ext.getCmp('keymanList').store.reload();
                }
            });
        }
    }

});

Ext.define('Ysn.view.businessopportunity.forecast', {
    extend: 'Ext.panel.Panel',
    xtype: 'businessopportunity-forecast',
    requires: [
        'Ysn.view.businessopportunity.forecastController',
		'Ysn.view.common.searchcustomer'
    ],

    controller: 'businessopportunity-forecast',
    reference: 'businessopportunity-forecast',
    id: 'businessopportunity-forecast',
    layout: 'border',
    width: 500,
    height: 400,
    overflow: 'hidden',
    scrollable: false,
    header: false,
    bodyBorder: false,
    defaults: {
        collapsible: true,
        split: true,
        bodyPadding: 0
    },

    dockedItems: [
	               {
	                   title: '',
	                   xtype: 'forecast-search',
	                   reference: 'forecastSearch',
                           scrollable: true,
	                   collapsible: true,
	                   floatable: true,
	                   split: true,
	                   padding: '0 0 0 0',
	                   dock: 'top',
	                   height: 220
	               }
    ],
    tbar: {

        overflowHandler: 'menu',
        style: { 'border-top-width': '1px !important;' },
        items: [
		{
		    xtype: 'label',
		    itemId: 'total',
		    text: 'Total : 0',
		    style: { 'font-weight': 'bold' }
		},

			  '->',

		{
		    xtype: 'button',
		    iconCls: 'x-fa fa-file-excel-o',
		    text: Locale.getMsg('액셀변환'),
		    handler: 'xlsExport'
		}/*, {
		    xtype: 'button',
		    iconCls: 'x-fa fa-plus-square',
		    text: '신규등록',
		    handler: 'frmClear'
		}*/]
    },

    items: [
		{
		    header: false,
		    region: 'center',
		    xtype: 'forecastList',
		    itemId: 'forecastList',
		    listeners: {
		        select: 'itemclick'
		    }

		}, {
		    title: Locale.getMsg('사업전망 관리'),

		    scrollable: false,
		    x: 10, y: 10,
		    region: 'east',
		    itemId: 'east',
		    //	reference:'Detail',
		    collapsed: true,
		    layout: 'fit',
		    width: 950,
		    minWidth: 850,
		    maxWidth: 1200,
		    items: {
		        xtype: 'businessopportunity-forecastDetail'
		    }
		}
    ]
});

///<reference path="~/Client/ext/build/ext-all-debug.js">
///<reference path="~/Client/ext/build/ext-debug.js">
Ext.define('Ysn.view.businessopportunity.forecastController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.businessopportunity-forecast',
    requires: [
	    'Ysn.store.*'
    ],
    init: function () {
        this.lookupReference('forecastSearch').setTitle(pageTitle);
        if (Ext.getCmp('chkpopup').getValue()) {
            Ext.getCmp('businessopportunity-forecast').down('#east').setVisible(false);
        }   
    },
    itemclick: function (view, record, index, e) {
        var Pl = Ext.getCmp('forecastDetail');
        var Frm = Pl.getForm();
        if (Ext.getCmp('chkpopup').getValue()) {
            openPopupView(Locale.getMsg('사업전망 관리'), 'businessopportunity-forecastDetail', record.get('OPPT_CD'), 'forecast|forecastView|oppt_cd|base_ym|' + record.get('BASE_YM'));
        } else {
			if (Ext.getCmp('businessopportunity-forecast').down('#east').collapsed) Ext.getCmp('businessopportunity-forecast').down('#east').toggleCollapse(); 
			Frm.reset();
			Ext.getStore('forecastView').removeAll();
			Ext.getCmp('businessopportunity-forecast').mask("loading...");
			Ext.getStore('forecastView').load({
			    params: { oppt_cd: record.get('OPPT_CD'), base_ym: record.get('BASE_YM') }
                , callback: function (records, operation, success) {

                    setTimeout(function () {
                        Pl.body.dom.scrollTop = 0;
                        Pl.body.dom.scrollLeft = 0;

                        Pl.items.items[0].body.dom.scrollTop = 0;
                        Pl.items.items[0].body.dom.scrollLeft = 0;
                        Pl.items.items[1].body.dom.scrollTop = 0;
                        Pl.items.items[1].body.dom.scrollLeft = 0;
                    }, 500);
                }
			});
			var task = new Ext.util.DelayedTask(function () {
			    Ext.getCmp('businessopportunity-forecast').down('#east').toggleCollapse();
			});
			if (Ext.getCmp('businessopportunity-forecast').down('#east').collapsed) task.delay(1000);
			var task2 = new Ext.util.DelayedTask(function () {
			    Ext.getCmp('businessopportunity-forecast').unmask();
			});
			task2.delay(1050);
        }  

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
    xlsExport: function () {

        Ext.getCmp('forecastList').saveDocumentAs({
			headerRowCnt: 1,
            type: 'xlsx',
            title: Ext.getCmp('forecast-search').getTitle(),
            fileName: Locale.getMsg('사업전망 관리')
        });
    }
});




    Ext.define('Ysn.view.baseInfo.userChangesearch', {
        extend: 'Ext.panel.Panel',
        xtype: 'userChange-search',

        requires: [
            'Ysn.view.baseInfo.userChangesearchController', 
	        'Ysn.store.*'
        ],

        controller: 'userChange-search',

        frame: false,
        //resizable: true,
        width: 1000,
        minWidth: 1000,
        minHeight: 100,
        layout: {
            type: 'table',
            columns: 4,
            tableAttrs: {
                style: {
					'padding-top': '5px',
                    width: '20%'
                }
            }

        },
        id: 'userChange-search',
        reference: 'userChange-search',
        defaults: {
            layout: 'form',
            xtype: 'container',
            defaultType: 'textfield'
        },

        items: [
            {
                xtype: 'fieldcontainer',
                fieldLabel: Locale.getMsg('거래처'),
                labelAlign: 'right',
                combineErrors: true,
                msgTarget: 'side',
                labelWidth: 80,
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
                reference: 'smp_status',
                publishes: 'value', 
                fieldLabel: Locale.getMsg('진행상태'),
                labelAlign: 'right',
                displayField: 'CODE_NM',
                valueField: 'CODE_ID',
                width:250,
                name: 'smp_status',
                anchor: '-15',
                store: {
                    type: 'TcodeAll'
                },
                minChars: 0,
                queryMode: 'local'
            },{ 
                xtype: 'fieldcontainer',
                fieldLabel: Locale.getMsg('변경전 담당자'),
                labelAlign: 'right',
                labelWidth: 100,
                combineErrors: true, 
                layout: 'hbox',
                defaults: {
                    //flex: 1,
                    hideLabel: true
                },
                items: [{
                    xtype: 'textfield',
                    name: 'user_nm1', 
                    reference : 'user_nm1',
                    itemId : 'user_nm1',
                    margin: '0 5 0 0',
                    width: 100
                },{
                    xtype: 'hiddenfield',
                    reference: 'user_cd1', 
                    name: 'user_cd1', 
                    itemId : 'user_cd1'
                },{
                    xtype: 'hiddenfield',
                    reference: 'dept_cd1', 
                    name: 'dept_cd1', 
                    itemId : 'dept_cd1'
                },{
                    xtype: 'textfield',
                    name: 'dept_nm1',
                    reference: 'dept_nm1',
                    itemId: 'dept_nm1',
                    margin: '0 5 0 0',
                    emptyText:'조직명',
                    readOnly: true,
                    width: 150
                },{
                    xtype: 'hiddenfield', 
                    name: 'mod_usr',
                    value: loginUser
                }, {
                    iconCls: 'x-fa fa-search', 
                    xtype: 'button',
                    scale: 'small',
                    margin: '0 5 0 0',
                    handler : 'openWindow3',
                    style:{ 
                        'border':'none' 
                    }
                },{
                    iconCls: 'x-fa fa-remove', 
                    xtype: 'button',
                    scale: 'small',
                    handler : 'resetVal3',
                    style:{
                        'background-color': 'red !important',
                        'background-image': 'none',
                        'border':'none' 
                    },
                    margin: '0 5 0 0'
                }] 
            },{
            rowspan: 2,
            xtype: 'button',
            text: Locale.getMsg('검색'),
            width: 60,
            height: 50,
            listeners: {
                click: 'onSubmitClick'
            }
        },{
				xtype: 'fieldcontainer',
				fieldLabel: 'End User',
				labelWidth: 80,
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
						name: 'enduser_nm', 
						reference : 'euser_nm',
					    itemId : 'euser_nm',
						margin: '0 5 0 0',
						width: 270
					},{
						xtype: 'hiddenfield',
						reference: 'euser_cd', 
						name: 'euser_cd', 
						itemId : 'euser_cd'
					}, {
						iconCls: 'x-fa fa-search', 
						xtype: 'button',
						scale: 'small',
						margin: '0 5 0 0',
						handler : 'openWindow2',
						style:{ 
							'border':'none' 

						}
					},{
						iconCls: 'x-fa fa-remove', 
						xtype: 'button',
						scale: 'small',
						handler : 'resetVal2',
						style:{
							'background-color': 'red !important',
							'background-image': 'none',
							'border':'none' 

						}
					}]
        }, {
            xtype: 'combobox',
            reference: 'prdt_psblt',
            publishes: 'value',
            fieldLabel: Locale.getMsg('양산가능성'),
            labelAlign: 'right',
            displayField: 'CODE_NM',
            valueField: 'CODE_ID',
            name: 'prdt_psblt',
            width: 250,
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
            displayField: 'CODE_NM',
            valueField: 'CODE_ID',
            width: 250,
            name: 'wso_psblt',
            anchor: '-15',
            store: {
                type: 'TcodeAll'
            },
            minChars: 0,
            queryMode: 'local',
            hidden: true
        }, {
            xtype: 'combobox',
            reference: 'item_type',
            publishes: 'value',
            fieldLabel: Locale.getMsg('품목유형'),
            labelAlign: 'right',
            displayField: 'CODE_NM',
            valueField: 'CODE_ID',
            width: 250,
            name: 'item_type',
            anchor: '-15',
            store: {
                type: 'TcodeAll'
            },
            minChars: 0,
            queryMode: 'local',
            hidden: true
        },{
            xtype: 'fieldcontainer',
            combineErrors: true,
            layout: 'hbox',
            fieldLabel: Locale.getMsg('수주년월'),
            reference: 'base_ym', 
            labelAlign: 'right', 
            hidden: true,
            defaults: {
                //flex: 1,
                hideLabel: true
            },
            items: [{
                xtype: 'combobox',
                reference: 'year',
                publishes: 'value',
                width: 90,
                labelAlign: 'right',
                displayField: 'YEAR',
                valueField: 'VAL',
                name: 'year',
                itemId: 'year',
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
                reference: 'month',
                publishes: 'value',
                labelAlign: 'right',
                width: 70,
                displayField: 'MONTH',
                valueField: 'VAL',
                name: 'month',
                itemId: 'month',
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

    Ext.define('Ysn.view.baseInfo.userChangesearchController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.userChange-search',
        init: function () {
            
            this.lookupReference('smp_status').store.load({ params: { up_code_id: 'SMP_STATUS', lang: localeCd } });
            this.lookupReference('smp_status').setValue('');
            this.lookupReference('prdt_psblt').store.load({ params: { up_code_id: 'PRDT_PSBLT', lang: localeCd } });
            this.lookupReference('prdt_psblt').setValue('');
            this.lookupReference('wso_psblt').store.load({ params: { up_code_id: 'WSO_PSBLT', lang: localeCd } });
            this.lookupReference('wso_psblt').setValue('');
            this.lookupReference('item_type').store.load({ params: { up_code_id: 'ITEM_TYPE', lang: localeCd } });
            this.lookupReference('item_type').setValue(''); 

            var Today = new Date();
            //this.lookupReference('sdate').setValue(Today.getFullYear() + '-' + ('0' + (Today.getMonth() + 1)).slice(-2) + '-' + '01');
            this.lookupReference('year').setValue(Today.getFullYear());
            this.lookupReference('month').setValue('0' + (Today.getMonth() + 1));
        },
        openWindow: function () {
            var win = Ext.getCmp('commonSearchcustomer');
            if (!win) {
                win = new Ysn.view.common.searchcustomer();
            }
            var hidfield = win.query('#paentFrm')[0];
            hidfield.setValue('userChange-search');
		    win.down('#cust_nm').setValue(this.lookupReference('cust_nm').getValue());
            Ext.getCmp('baseInfo-userChange').add(win);
            win.setPosition(20, -150);
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
            hidfield.setValue('userChange-search');
            Ext.getCmp('baseInfo-userChange').add(win2);
            win2.setPosition(100, -150);
            win2.show();
        },
        resetVal2: function () {
            this.lookupReference('euser_nm').setValue('');
            this.lookupReference('euser_cd').setValue('');
        },
        openWindow3: function () {
            var win3 = Ext.getCmp('common-searchPartUser');
            if (!win3) {
                win3 = new Ysn.view.common.searchPartUser();
            }
            var hidfield = win3.query('#paentFrm')[0]; 
            win3.down('#user_nm').setValue(this.lookupReference('user_nm1').getValue());
            win3.down('#idx').setValue('1');
            hidfield.setValue('userChange-search');
            Ext.getCmp('baseInfo-userChange').add(win3);
            win3.setPosition(20, -150);
            win3.show();
        },
        resetVal3: function () {
            this.lookupReference('user_nm1').setValue('');
            this.lookupReference('user_cd1').setValue('');
            this.lookupReference('dept_cd1').setValue('');
            this.lookupReference('dept_nm1').setValue('');
        },        
        onSubmitClick: function () {
            var pl = Ext.getCmp('userChangeList');
            if (this.lookupReference('user_cd1').getValue()){
                pl.getStore().load(
                        {
                            params: { 
                                cust_cd: this.lookupReference('cust_cd').getValue(),
                                cust_nm: this.lookupReference('cust_nm').getValue(),
                                user_cd: this.lookupReference('user_cd1').getValue(),
                                user_nm: this.lookupReference('user_nm1').getValue(),
                                smp_status: this.lookupReference('smp_status').getValue(),
                                prdt_psblt: this.lookupReference('prdt_psblt').getValue(),
                                wso_psblt: this.lookupReference('wso_psblt').getValue(), 
                                enduser_cd: this.lookupReference('euser_cd').getValue(),
                                enduser_nm: this.lookupReference('euser_nm').getValue(),
                                item_type: this.lookupReference('item_type').getValue(),  
                                year: this.lookupReference('year').getValue(),
                                month: this.lookupReference('month').getValue() 
                            },
                            callback: function (records, operation, success) {
                             

                            }
                        }
               );
            } else {
                Ext.Msg.alert('Warning', Locale.getMsg('변경전 담당자를 선택하세요.'));
            }
        }


    });


    Ext.define('Ysn.view.baseInfo.userChangeList', {
        extend: 'Ext.grid.Panel',
        xtype: 'userChangeList',
        requires: [
            'Ysn.view.baseInfo.userChangeListController'
        ],
    
        controller: 'baseInfo-userChangeList',     
	    /*store: {
	        type: 'userChangeList',
		    autoLoad: false,
            autoDestroy: true
        }, */
	    style: { 'borderTop': '1px solid gray' },

	    loadMask: true,
	    enableLocking: true,
	    id: 'userChangeList',
	    columnLines: true,
	    selType: 'checkboxmodel',
	    multiColumnSort: true, 
	    plugins: ['gridfilters'],
	    /*features: [{
	        ftype: 'summary',
	        dock: 'top'
	    }],*/
	    
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

    Ext.define('Ysn.view.baseInfo.userChangeListController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.baseInfo-userChangeList',
        init: function () {
            var Today = new Date();            
            var col = this.changeColumns('1');
            this.getView().reconfigure('sampleProductionList', col);
        },
        changeDec: function (value) {
            return Ysn.Util.changeDec(value);
        },
        changeDbl: function (value) {
            return Ysn.Util.changeDbl(value);
        },
        changePercent: function (value) {
            return Ysn.Util.changeDbl(value) + '%';
        },
        changeColumns: function (type) { 

            var columns1 = [
            {
                text: "SMP.NO", width: 100, dataIndex: 'SMP_CD', sortable: true,
                filter: {
                    type: 'string',
                    itemDefaults: {
                        emptyText: '검색어입력..'
                    }
                }
            },
            {
                text: Locale.getMsg('샘플품목'), width: 200, dataIndex: 'ITEM_NM', sortable: true,
                filter: {
                    type: 'string',
                    itemDefaults: {
                        emptyText: Locale.getMsg('검색어입력..')
                    }
                }
            },
            {
                text: Locale.getMsg('차수'), width: 60, dataIndex: 'SMP_CHASU', sortable: true,
                filter: {
                    type: 'string',
                    itemDefaults: {
                        emptyText: Locale.getMsg('검색어입력..')
                    }
                }
            },
            {
                text: Locale.getMsg('거래처'), width: 125, dataIndex: 'CUST_NM', sortable: true,
                filter: {
                    type: 'string',
                    itemDefaults: {
                        emptyText: Locale.getMsg('검색어입력..')
                    }
                }
            },
			{
			    text: Locale.getMsg('End User'), width: 125, dataIndex: 'EUSER_NM', sortable: true,
			    filter: {
			        type: 'string',
			        itemDefaults: {
			            emptyText: Locale.getMsg('검색어입력..')
			        }
			    }
			},
			{
			    text: Locale.getMsg('유통구조'), width: 125, dataIndex: 'DSTR_TYPE_NM', sortable: true,
			    filter: {
			        type: 'string',
			        itemDefaults: {
			            emptyText: Locale.getMsg('검색어입력..')
			        }
			    }
			},
			{
			    text: Locale.getMsg('매출조직'), width: 125, dataIndex: 'DEPT_NM', sortable: true,
			    filter: {
			        type: 'string',
			        itemDefaults: {
			            emptyText: Locale.getMsg('검색어입력..')
			        }
			    }
			},
			{
			    text: Locale.getMsg('영업담당'), width: 125, dataIndex: 'USER_NM', sortable: true,
			    filter: {
			        type: 'string',
			        itemDefaults: {
			            emptyText: Locale.getMsg('검색어입력..')
			        }
			    }
			},
			{
			    text: Locale.getMsg('제작담당'), width: 125, dataIndex: 'MUSER_NM', sortable: true,
			    filter: {
			        type: 'string',
			        itemDefaults: {
			            emptyText: Locale.getMsg('검색어입력..')
			        }
			    },
			    editor: {
			        xtype: 'combobox',
			        triggerAction: 'all',
			        allowBlank: false,
			        store: {
			            type: 'sucUser'
			        },
			        displayField: 'USER_NM',
			        valueField: 'USER_CD',
			        queryMmode: 'remote',
			        autoLoad: false,
			        autoDestroy: false
			    }
			},
			{
			    text: Locale.getMsg('완료예정일'), width: 125, dataIndex: 'PRDT_PDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true,
			    editor: {
			        xtype: 'datefield',
			        format: 'Y-m-d',
			        allowBlank: false
			    }
			},
			{
			    text: Locale.getMsg('사업유형'), width: 125, dataIndex: 'BIZ_TYPE_NM', sortable: true,
			    filter: {
			        type: 'string',
			        itemDefaults: {
			            emptyText: Locale.getMsg('검색어입력..')
			        }
			    }
			},
			{
			    text: Locale.getMsg('품목유형'), width: 125, dataIndex: 'ITEM_TYPE_NM', sortable: true,
			    filter: {
			        type: 'string',
			        itemDefaults: {
			            emptyText: Locale.getMsg('검색어입력..')
			        }
			    }
			},
			{
			    text: Locale.getMsg('진행상태'), width: 125, dataIndex: 'SMP_STATUS_NM', sortable: true,
			    filter: {
			        type: 'string',
			        itemDefaults: {
			            emptyText: Locale.getMsg('검색어입력..')
			        }
			    }
			},
			{
			    text: Locale.getMsg('양산가능성'), width: 125, dataIndex: 'PRDT_PSBLT_NM', sortable: true,
			    filter: {
			        type: 'string',
			        itemDefaults: {
			            emptyText: Locale.getMsg('검색어입력..')
			        }
			    }
			},
			{ text: Locale.getMsg('접수일'), width: 125, dataIndex: 'SMP_RDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true, filter: true },
			{ text: Locale.getMsg('제품런칭일'), width: 125, dataIndex: 'PRDT_RCDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
			{ text: Locale.getMsg('필름전달예정일'), width: 125, dataIndex: 'FILM_FDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
			{ text: Locale.getMsg('완료요청일'), width: 125, dataIndex: 'CMPT_RDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
			{ text: Locale.getMsg('제작의뢰일'), width: 125, dataIndex: 'PRDT_RDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
			{ text: Locale.getMsg('의뢰승인일'), width: 125, dataIndex: 'PRDT_ADATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
			{ text: Locale.getMsg('사양확정일'), width: 125, dataIndex: 'FILM_RDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
			{ text: Locale.getMsg('제작완료일'), width: 125, dataIndex: 'PRDT_CDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
			{ text: Locale.getMsg('배송[선적]일'), width: 125, dataIndex: 'SHIP_PDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true }
			,
			{
			    text: Locale.getMsg('악성업체유무'), width: 125, dataIndex: 'BAD_AR_YN', sortable: true, hidden: true,
			    filter: {
			        type: 'string',
			        itemDefaults: {
			            emptyText: Locale.getMsg('검색어입력..')
			        }
			    }
			},
			{ text: "유통구조코드", width: 125, dataIndex: 'DSTR_TYPE', hidden: true },
			{ text: "사업유형코드", width: 125, dataIndex: 'BIZ_TYPE', hidden: true },
			{ text: "품목유형코드", width: 125, dataIndex: 'ITEM_TYPE', hidden: true },
			{ text: "진행상태코드", width: 125, dataIndex: 'SMP_STATUS', hidden: true },
			{ text: "양산가능성코드", width: 125, dataIndex: 'PRDT_PSBLT', hidden: true }
            ];
            var columns2 = [
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
            {
                text: Locale.getMsg('거래처'), width: 125, dataIndex: 'CUST_NM', sortable: true,
                filter: {
                    type: 'string',
                    itemDefaults: {
                        emptyText: Locale.getMsg('검색어입력..')
                    }
                }
            },
			{
			    text: Locale.getMsg('End User'), width: 125, dataIndex: 'EUSER_NM', sortable: true,
			    filter: {
			        type: 'string',
			        itemDefaults: {
			            emptyText: Locale.getMsg('검색어입력..')
			        }
			    }
			},
			{
			    text: Locale.getMsg('유통구조'), width: 125, dataIndex: 'DSTR_TYPE_NM', sortable: true,
			    filter: {
			        type: 'string',
			        itemDefaults: {
			            emptyText: Locale.getMsg('검색어입력..')
			        }
			    }
			},
			{
			    text: Locale.getMsg('매출조직'), width: 125, dataIndex: 'DEPT_NM', sortable: true,
			    filter: {
			        type: 'string',
			        itemDefaults: {
			            emptyText: Locale.getMsg('검색어입력..')
			        }
			    }
			},
			{
			    text: Locale.getMsg('영업담당'), width: 100, dataIndex: 'USER_NM', sortable: true,
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
			{
			    text: Locale.getMsg('품목유형'), width: 125, dataIndex: 'ITEM_TYPE_NM', sortable: true,
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
			    text: Locale.getMsg('악성업체유무'), width: 125, dataIndex: 'BAD_AR_YN', sortable: true, hidden: true,
			    filter: {
			        type: 'string',
			        itemDefaults: {
			            emptyText: Locale.getMsg('검색어입력..')
			        }
			    }
			}
            ];
            var columns3 = [
                { text: Locale.getMsg('접수일'), width: 125, dataIndex: 'ORD_CDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true, filter: true },
                {
                    text: Locale.getMsg('주문번호'), width: 80, dataIndex: 'LOT_NO', sortable: true,
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: Locale.getMsg('검색어입력..')
                        }
                    }
                },
                {
                    text: Locale.getMsg('품목정보'), width: 200, dataIndex: 'ITEM_NM', sortable: true,
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: Locale.getMsg('검색어입력..')
                        }
                    }
                },
                {
                    text: Locale.getMsg('거래처'), width: 125, dataIndex: 'CUST_NM', sortable: true,
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: Locale.getMsg('검색어입력..')
                        }
                    }
                },
			    {
			        text: Locale.getMsg('End User'), width: 125, dataIndex: 'EUSER_NM', sortable: true,
			        filter: {
			            type: 'string',
			            itemDefaults: {
			                emptyText: Locale.getMsg('검색어입력..')
			            }
			        }
			    },
			    {
			        text: Locale.getMsg('유통구조'), width: 125, dataIndex: 'DSTR_TYPE_NM', sortable: true,
			        filter: {
			            type: 'string',
			            itemDefaults: {
			                emptyText: Locale.getMsg('검색어입력..')
			            }
			        }
			    },
			    {
			        text: Locale.getMsg('매출조직'), width: 125, dataIndex: 'DEPT_NM', sortable: true,
			        filter: {
			            type: 'string',
			            itemDefaults: {
			                emptyText: Locale.getMsg('검색어입력..')
			            }
			        }
			    },
			    {
			        text: Locale.getMsg('영업담당'), width: 100, dataIndex: 'USER_NM', sortable: true,
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
			    {
			        text: Locale.getMsg('품목유형'), width: 125, dataIndex: 'ITEM_TYPE_NM', sortable: true,
			        filter: {
			            type: 'string',
			            itemDefaults: {
			                emptyText: Locale.getMsg('검색어입력..')
			            }
			        }
			    },
                { text: Locale.getMsg('납기일'), width: 125, dataIndex: 'SALES_PDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true, filter: true },
                { text: Locale.getMsg('확정납기일'), width: 125, dataIndex: 'SALES_DDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true, filter: true },
                { text: Locale.getMsg('최종출고일'), width: 125, dataIndex: 'SALES_ODATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true, filter: true },
			    {
			        text: Locale.getMsg('통화'), width: 125, dataIndex: 'BASE_CRNY', sortable: true,
			        filter: {
			            type: 'string',
			            itemDefaults: {
			                emptyText: Locale.getMsg('검색어입력..')
			            }
			        }
			    },
			    {
			        text: Locale.getMsg('계약현황'),
			        columns: [
                        {
                            text: Locale.getMsg('수량'), width: 125, dataIndex: 'QTY', sortable: true, renderer: 'changeDec', //summaryType: 'count',
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: Locale.getMsg('검색어입력..')
                                }
                            }
                        }, {
                            text: Locale.getMsg('여유분'), width: 125, dataIndex: 'CUST_SP_QTY', sortable: true, renderer: 'changeDec',
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: Locale.getMsg('검색어입력..')
                                }
                            }
                        }, {
                            text: Locale.getMsg('단가'), width: 125, dataIndex: 'UNIT_PRICE', sortable: true, renderer: 'changeDbl',
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: Locale.getMsg('검색어입력..')
                                }
                            }
                        }, {
                            text: Locale.getMsg('계약금액'), width: 125, dataIndex: 'AMOUNT', sortable: true, renderer: 'changeDbl',
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: Locale.getMsg('검색어입력..')
                                }
                            }
                        }, {
                            text: Locale.getMsg('원화금액'), width: 125, dataIndex: 'KRW_AMOUNT', sortable: true, renderer: 'changeDbl',
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: Locale.getMsg('검색어입력..')
                                }
                            }
                        }

			        ]
			    },
                {
                    text: Locale.getMsg('수주현황'),
                    columns: [
                        {
                            text: Locale.getMsg('수량'), width: 125, dataIndex: 'WSO_QTY', sortable: true, renderer: 'changeDec',
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: Locale.getMsg('검색어입력..')
                                }
                            }
                        }, {
                            text: Locale.getMsg('계약금액'), width: 125, dataIndex: 'WSO_AMOUNT', sortable: true, renderer: 'changeDbl',
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: Locale.getMsg('검색어입력..')
                                }
                            }
                        }, {
                            text: Locale.getMsg('원화금액'), width: 125, dataIndex: 'WSO_KRW_AMOUNT', sortable: true, renderer: 'changeDbl',
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: Locale.getMsg('검색어입력..')
                                }
                            }
                        }
                    ]
                },
                 {
                     text: Locale.getMsg('납품현황'),
                     columns: [
                         {
                             text: Locale.getMsg('수량'), width: 125, dataIndex: 'OWH_QTY', sortable: true, renderer: 'changeDec',
                             filter: {
                                 type: 'string',
                                 itemDefaults: {
                                     emptyText: Locale.getMsg('검색어입력..')
                                 }
                             }
                         }, {
                             text: Locale.getMsg('계약금액'), width: 125, dataIndex: 'OWH_AMOUNT', sortable: true, renderer: 'changeDbl',
                             filter: {
                                 type: 'string',
                                 itemDefaults: {
                                     emptyText: Locale.getMsg('검색어입력..')
                                 }
                             }
                         }, {
                             text: Locale.getMsg('원화금액'), width: 125, dataIndex: 'OWH_KRW_AMOUNT', sortable: true, renderer: 'changeDbl',
                             filter: {
                                 type: 'string',
                                 itemDefaults: {
                                     emptyText: Locale.getMsg('검색어입력..')
                                 }
                             }
                         }
                     ]
                 },
               {
                   text: Locale.getMsg('PO번호'), width: 125, dataIndex: 'PO_CD', sortable: true,
                   filter: {
                       type: 'string',
                       itemDefaults: {
                           emptyText: Locale.getMsg('검색어입력..')
                       }
                   }
               }, {
                   text: Locale.getMsg('Order(대)'), width: 125, dataIndex: 'ORD_GB_L_NM', sortable: true,
                   filter: {
                       type: 'string',
                       itemDefaults: {
                           emptyText: Locale.getMsg('검색어입력..')
                       }
                   }
               }, {
                   text: "Order(중)", width: 125, dataIndex: 'ORD_GB_M_NM', sortable: true,
                   filter: {
                       type: 'string',
                       itemDefaults: {
                           emptyText: Locale.getMsg('검색어입력..')
                       }
                   }
               }, {
                   text: "Order(소)", width: 125, dataIndex: 'ORD_GB_S_NM', sortable: true,
                   filter: {
                       type: 'string',
                       itemDefaults: {
                           emptyText: Locale.getMsg('검색어입력..')
                       }
                   }
               }, {
                   text: Locale.getMsg('카다로그'), width: 125, dataIndex: 'CTLG_CD', sortable: true,
                   filter: {
                       type: 'string',
                       itemDefaults: {
                           emptyText: Locale.getMsg('검색어입력..')
                       }
                   }
               }, {
                   text: Locale.getMsg('프로젝트'), width: 125, dataIndex: 'PJT_NM', sortable: true,
                   filter: {
                       type: 'string',
                       itemDefaults: {
                           emptyText: Locale.getMsg('검색어입력..')
                       }
                   }
               }, {
                   text: Locale.getMsg('수주번호'), width: 125, dataIndex: 'SO_CD', sortable: true,
                   filter: {
                       type: 'string',
                       itemDefaults: {
                           emptyText: Locale.getMsg('검색어입력..')
                       }
                   }
               }, {
                   text: "SO_SEQ", dataIndex: 'SO_SEQ', hidden: true
               }
            ];

            if (type == '1') {
                return columns1;
            } else if(type == '2') {
                return columns2;
            } else {
                return columns3;
            }
        }
    });

   

    Ext.define('Ysn.view.baseInfo.userChange', {
        extend: 'Ext.panel.Panel',
        xtype: 'baseInfo-userChange',
        requires: [
            'Ysn.view.baseInfo.userChangeController',
		    'Ysn.view.common.searchcustomer',
            'Ysn.view.baseInfo.userChangesearch',
            'Ysn.view.baseInfo.userChangeList'
        ],

        controller: 'baseInfo-userChange',
        reference: 'baseInfo-userChange',
        id: 'baseInfo-userChange',
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
	                       xtype: 'userChange-search',
	                       reference: 'userChangeSearch',
	                       itemId: 'userChangeSearch',
                           scrollable: true,
	                       collapsible: true,
	                       floatable: true,
	                       split: true,
	                       padding: '0 0 0 0',
	                       dock: 'top',
	                       height: 150
	                   }
        ],
        tbar: {

            overflowHandler: 'menu',
            style: { 'border-top-width': '1px !important;' },
            items: [
            {
                xtype: 'segmentedbutton',
                items: [{ text: Locale.getMsg('샘플변경'), pressed: true },
                        { text: Locale.getMsg('기회변경') },
                        { text: Locale.getMsg('수주변경') }
                ],
                listeners: {
                    toggle: 'btnToggle'
                }
							
            }, {
                xtype: 'hiddenfield',
                reference: 'tab_num',
                itemId: 'tab_num',
                value: '1'
            },
		    {
		        xtype: 'label',
		        reference: 'total',
		        itemId: 'total',
		        text: 'Total : 0',
		        style: { 'font-weight': 'bold' }
		    },

			      '->',
            { 
                xtype: 'fieldcontainer',
                fieldLabel: Locale.getMsg('변경후 담당자'),
                combineErrors: true, 
                layout: 'hbox',
                defaults: {
                    //flex: 1,
                    hideLabel: true
                },
                items: [{
                    xtype: 'textfield',
                    name: 'user_nm2', 
                    reference : 'user_nm2',
                    itemId : 'user_nm2',
                    margin: '0 5 0 0',
                    width: 200
                },{
                    xtype: 'hiddenfield',
                    reference: 'user_cd2', 
                    name: 'user_cd2', 
                    itemId : 'user_cd2'
                },{
                    xtype: 'hiddenfield',
                    reference: 'dept_cd2', 
                    name: 'dept_cd2', 
                    itemId : 'dept_cd2'
                },{
                    xtype: 'textfield',
                    name: 'dept_nm2',
                    reference: 'dept_nm2',
                    itemId: 'dept_nm2',
                    margin: '0 5 0 0',
                    width: 200,
                    emptyText:'변경후 조직명',
                    readOnly: true
                },{
                    xtype: 'hiddenfield', 
                    name: 'mod_usr',
                    value: loginUser
                }, {
                    iconCls: 'x-fa fa-search', 
                    xtype: 'button',
                    scale: 'small',
                    margin: '0 5 0 0',
                    handler : 'openWindow3',
                    style:{ 
                        'border':'none' 
                    }
                },{
                    iconCls: 'x-fa fa-remove', 
                    xtype: 'button',
                    scale: 'small',
                    handler : 'resetVal3',
                    style:{
                        'background-color': 'red !important',
                        'background-image': 'none',
                        'border':'none' 
                    }
                }] 
            },
             {
                xtype: 'button',
                iconCls: 'x-fa fa-check-square',
                text: Locale.getMsg('변경'),
                handler: 'userChange'
            }
		    /*{
		        xtype: 'button',
		        iconCls: 'x-fa fa-file-excel-o',
		        text: Locale.getMsg('액셀변환'),
		        handler: 'xlsExport'
		    }, {
		        xtype: 'button',
		        iconCls: 'x-fa fa-plus-square',
		        text: Locale.getMsg('신규등록'),
		        handler: 'frmClear'
		    }*/]
        },

        items: [
		    {
		        header: false,
		        region: 'center',
		        xtype: 'userChangeList',
		        reference: 'userChangeList',
		        itemId: 'userChangeList',
		        listeners: {
		            //select: 'itemclick'
		        }

		    } 
        ]
    });

    ///<reference path="~/Client/ext/build/ext-all-debug.js">
    ///<reference path="~/Client/ext/build/ext-debug.js">
    Ext.define('Ysn.view.baseInfo.userChangeController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.baseInfo-userChange',
        requires: [
	        'Ysn.store.*'
        ],
        init: function () {
            this.lookupReference('userChangeSearch').setTitle(pageTitle); 
        },
        openWindow3: function () {
            var win3 = Ext.getCmp('common-searchPartUser');
            if (!win3) {
                win3 = new Ysn.view.common.searchPartUser();
            }
            var hidfield = win3.query('#paentFrm')[0];
            win3.down('#user_nm').setValue(this.lookupReference('user_nm2').getValue());
            win3.down('#idx').setValue('2');
            hidfield.setValue('baseInfo-userChange');
            Ext.getCmp('baseInfo-userChange').add(win3);
            win3.setPosition(20, -150);
            win3.show();
        },
        resetVal3: function () {
            this.lookupReference('user_nm2').setValue('');
            this.lookupReference('user_cd2').setValue('');
            this.lookupReference('dept_cd2').setValue('');
            this.lookupReference('dept_nm2').setValue('');
        },
        btnToggle: function (container, button, pressed) {
            var pl = this.getView().lookupReference('userChangeSearch');
            var p2 = this.getView().lookupReference('userChangeList');
            var controller = p2.getController('baseInfo - userChangeList');
            var col, store;
            switch (button.getText()) {
                case Locale.getMsg('샘플변경'):
                    this.getView().lookupReference('tab_num').setValue('1'); 
                    pl.lookupReference('prdt_psblt').show(); 
                    pl.lookupReference('wso_psblt').hide();
                    pl.lookupReference('item_type').hide();
                    pl.lookupReference('base_ym').hide();
                    col = controller.changeColumns('1');
                    store = 'sampleProductionList4';
                    break;
                case Locale.getMsg('기회변경'):
                    this.getView().lookupReference('tab_num').setValue('2');
                    pl.lookupReference('prdt_psblt').hide();
                    pl.lookupReference('wso_psblt').show();
                    pl.lookupReference('item_type').hide();
                    pl.lookupReference('base_ym').hide();
                    col = controller.changeColumns('2');
                    store = 'opportunityList';
                    break;
                case Locale.getMsg('수주변경'):
                    this.getView().lookupReference('tab_num').setValue('3');
                    pl.lookupReference('prdt_psblt').hide();
                    pl.lookupReference('wso_psblt').hide();
                    pl.lookupReference('item_type').show();
                    pl.lookupReference('base_ym').show();
                    col = controller.changeColumns('3');
                    store = 'salesOrderList';
                    break;
            }
            p2.getStore().removeAll();
            this.getView().lookupReference('total').setText('Total : 0');
            p2.reconfigure(store,col);
        },
        userChange: function () {
             
            if (this.lookupReference('user_cd2').getValue()) {
                var selRecs = Ext.getCmp('userChangeList').getSelectionModel().getSelection();
                var user_cd2 = this.lookupReference('user_cd2').getValue('');
                var tab_num = this.lookupReference('tab_num').getValue('');
                var ids = '';
                for (var i = 0; i < selRecs.length; i++) {
                    var split = '';
                    var icode = '';
                    if (i < (selRecs.length - 1)) {
                        split = '|'
                    }
                    if (tab_num == '1') {
                        icode = selRecs[i].data.SMP_CD;
                    } else if (tab_num == '2') {
                        icode = selRecs[i].data.OPPT_CD;
                    } else {
                        icode = selRecs[i].data.SO_CD;
                    }
                    ids = ids + icode + split;
                }

                Ext.Ajax.request({
                    url: '/AdminUserChange/userChangeUpdate',
                    method: 'POST',
                    params: {
                        tab_num: tab_num, user_cd2: user_cd2, ids: ids
                    },
                    success: function (action) {
						if(!Ysn.Util.OnsessOut(action.responseText)) return false;
                        var dataVal = Ext.decode(action.responseText)
                        if (dataVal.success == false) {
                            Ext.Msg.alert('Failed', dataVal.errmsg);
                        }else{
                            Ext.Msg.alert(Locale.getMsg('처리상태'), Locale.getMsg('담당자변경완료'));
                            Ext.getCmp('userChangeList').getStore().reload();
                        }
                    },
                    failure: function (action) {
                        var dataVal = Ext.decode(action.responseText)
                        Ext.Msg.alert('Failed', dataVal.errmsg);
                    }
                });
            } else {
                Ext.Msg.alert('Warning', Locale.getMsg('변경후 담당자를 선택하세요.'));
            }
        }
         
    });




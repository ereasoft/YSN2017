    Ext.define('Ysn.view.admin.adminUsersearch', {
        extend: 'Ext.panel.Panel',
        xtype: 'adminUser-search',

        requires: [
            'Ysn.view.admin.adminUsersearchController', 
	        'Ysn.store.*'
        ],

        controller: 'adminUser-search',

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
        id: 'adminUser-search',
        reference: 'adminUser-search',
        defaults: {
            layout: 'form',
            xtype: 'container',
            defaultType: 'textfield'
        },

        items: [
            {
                xtype: 'fieldcontainer',
                fieldLabel: Locale.getMsg('조직명'),
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
                    reference: 'selCompany',
                    itemId: 'selCompany',
                    name: 'selCompany',
                    publishes: 'value',
                    displayField: 'DEPT_NM',
                    valueField: 'DEPT_CD',
                    margin: '0 5 0 0',
                    store: {
                        type: 'selCompany',
                        autoLoad: true
                    },
                    minChars: 0,
                    //width: 120,
                    queryMode: 'local',
                    listeners: {
                        change: 'onselCompany'
                    }
                }, {
                    xtype: 'combobox',
                    reference: 'selPart1',
                    itemId: 'selPart1',
                    name: 'selPart1',
                    publishes: 'value',
                    displayField: 'DEPT_NM',
                    valueField: 'DEPT_CD',
                    margin: '0 5 0 0',
                    store: {
                        type: 'selPart1',
                        autoLoad: true
                    },
                    minChars: 0,
                    //width: 120,
                    queryMode: 'local',
                    listeners: {
                        change: 'onselPart1'
                    }
                }, {
                    xtype: 'combobox',
                    reference: 'selPart2',
                    itemId: 'selPart2',
                    name: 'selPart2',
                    publishes: 'value',
                    displayField: 'DEPT_NM',
                    valueField: 'DEPT_CD',
                    margin: '0 5 0 0',
                    store: {
                        type: 'selPart2',
                        autoLoad: true
                    },
                    minChars: 0,
                    //width: 120,
                    queryMode: 'local',
                    listeners: {
                        change: 'onselPart2'
                    }
                }, {
                    xtype: 'combobox',
                    reference: 'selPart3',
                    itemId: 'selPart3',
                    name: 'selPart3',
                    publishes: 'value',
                    displayField: 'DEPT_NM',
                    valueField: 'DEPT_CD',
                    margin: '0 5 0 0',
                    store: {
                        type: 'selPart3',
                        autoLoad: true
                    },
                    minChars: 0,
                    //width: 120,
                    queryMode: 'local'
                }]
            }, 
            {
                xtype: 'textfield',
                name: 'searchUserNm',
                fieldLabel: Locale.getMsg('User명'),
                labelAlign: 'right',
                reference: 'searchUserNm',
                itemId: 'searchUserNm',
                margin: '0 5 0 0',
                labelWidth: 60,
                width: 210
            },
            {
                xtype: 'combobox',
                reference: 'searchUseYn',
                publishes: 'value',
                fieldLabel: Locale.getMsg('활동여부'),
                labelWidth: 60,
                width: 160,
                labelAlign: 'right',
                displayField: 'name',
                valueField: 'code',
                name: 'searchUseYn',
                anchor: '-15',
                store: {
                    fields: ['code','name'],
                    data: [{ code: '', name: '전체' }, { code: 'Y', name: 'Y' }, { code: 'N', name: 'N' }],
                    proxy: {
                        type: 'memory',
                        reader: {
                            type: 'json',
                            rootProperty: ''
                        }
                    },
                    autoLoad: true
                },
                minChars: 0,
                queryMode: 'local',

                margin: '0 5 0 0'
            },
            { 
                xtype: 'button',
                text: Locale.getMsg('검색'),
                width: 60,
                height: 30,
                listeners: {
                    click: 'onSubmitClick'
                }
            }
        ] 
    });

    Ext.define('Ysn.view.admin.adminUsersearchController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.adminUser-search',
        init: function () { 
            this.lookupReference('searchUseYn').setValue(''); 
            this.lookupReference('selCompany').setValue('YONWOO');
            this.lookupReference('selPart1').setValue('');
            this.lookupReference('selPart2').setValue('');
            this.lookupReference('selPart3').setValue('');
            
        },
        onselCompany: function (el, newVal, oldVal, e) {
            var selPart1 = this.lookupReference('selPart1');
            var selPart2 = this.lookupReference('selPart2');
            var selPart3 = this.lookupReference('selPart3');
            if (newVal != '') {
                selPart1.store.load({ params: { company_cd: newVal } });

            }
            var Frm = Ext.getCmp('adminUserDetail').getForm();
            Frm.findField('company_cd').setValue(newVal);
            Frm.findField('company_nm').setValue(el.getRawValue());
            selPart2.store.removeAll();
            selPart3.store.removeAll();
            selPart1.setValue(''); 

        },
        onselPart1: function (el, newVal, oldVal, e) {
            var company = this.lookupReference('selCompany').getValue();
            var selPart2 = this.lookupReference('selPart2');
            var selPart3 = this.lookupReference('selPart3');
            if (newVal != '') {
                selPart2.store.load({ params: { company_cd: company, up_dept_cd: newVal } });

            } 
            selPart3.store.removeAll();
            selPart2.setValue(''); 

        },
        onselPart2: function (el, newVal, oldVal, e) { 
            var company = this.lookupReference('selCompany').getValue();
            var selPart3 = this.lookupReference('selPart3');
            if (newVal != '') {
                selPart3.store.load({ params: { company_cd: company, up_dept_cd: newVal } });

            }
            selPart3.setValue(''); 

        },
        onSubmitClick: function () {
            var pl = Ext.getCmp('adminUserList');

            pl.getStore().load(
                    {
                        params: {
                            searchUserNm: this.lookupReference('searchUserNm').getValue(),
                            searchUseYn: this.lookupReference('searchUseYn').getValue(),
                            selCompany: this.lookupReference('selCompany').getValue(),
                            selPart1: this.lookupReference('selPart1').getValue(),
                            selPart2: this.lookupReference('selPart2').getValue(),
                            selPart3: this.lookupReference('selPart3').getValue()
                        },
                        callback: function (records, operation, success) {
                           

                        }
                    }
        );
        }


    }); 

    Ext.define('Ysn.view.admin.adminUserList', {
        extend: 'Ext.grid.Panel',
        xtype: 'adminUserList',
        requires: [
            'Ext.grid.filters.Filters'
        ],
    
        controller: 'admin-adminUserList',
        id : 'adminUserList',
        store: {
            fields: [ 
                     { name: 'COMPANY_CD', type: 'string' },
                     { name: 'COMPANY_NM', type: 'string' },
                     { name: 'USER_CD', type: 'string' }, 
                     { name: 'USER_NM', type: 'string' },
                     { name: 'USER_ENG_NM', type: 'string' },
                     { name: 'DEPT_CD', type: 'string' },
                     { name: 'DEPT_NM', type: 'string' },
                     { name: 'USER_TITLE', type: 'string' },
                     { name: 'USER_TITLE_NM', type: 'string' },
                     { name: 'USER_POSIT', type: 'string' },
                     { name: 'USER_POSIT_NM', type: 'string' },
                     { name: 'O_PHONE', type: 'string' },
                     { name: 'M_PHONE', type: 'string' },
                     { name: 'EMAIL', type: 'string' },
                     { name: 'USER_WORK', type: 'string' },
                     { name: 'MULTI_LANG', type: 'string' },
                     { name: 'USER_IMG', type: 'string' },
                     { name: 'SA_YN', type: 'string' },
                     { name: 'USE_YN', type: 'string' },
                     { name: 'MGR_YN', type: 'string' },
                     { name: 'MBO_YN', type: 'string' },
                     { name: 'DSTR_CHN', type: 'string' } ],
            proxy: {
                type: 'ajax',
                url: '/adminUser/getUpMenuList',
                reader: {
                    type: 'json',
                    rootProperty: 'LIST'
                }
            }, 
			listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
							},
            autoLoad: false
        }, 
	    style: { 'borderTop': '1px solid gray' },   
	    /*features: [{
	        ftype: 'summary',
	        dock: 'top'
	    }],*/ 
	    enableLocking: true,
	    id: 'adminUserList',
	    columnLines: true,
	    multiColumnSort: true,
	    plugins: ['gridfilters',
                  'pmh-grid-exporter'
	    ],
	    columns : [ 
             { text: Locale.getMsg('사번'), width: 80, dataIndex: 'USER_CD', sortable: true },
             { text: Locale.getMsg('성명'), width: 100, dataIndex: 'USER_NM', sortable: true },
             {
                 text: Locale.getMsg('법인'), width: 150, dataIndex: 'COMPANY_NM', sortable: true,
                 filter: {
                     type: 'string',
                     itemDefaults: {
                         emptyText: Locale.getMsg('검색어입력..')
                     }
                 }
             },
             {
                 text: Locale.getMsg('활동조직명'), width: 150, dataIndex: 'DEPT_NM', sortable: true,
                 filter: {
                     type: 'string',
                     itemDefaults: {
                         emptyText: Locale.getMsg('검색어입력..')
                     }
                 }
             },
             {
                 text: Locale.getMsg('직위'), width: 60, dataIndex: 'USER_TITLE_NM', sortable: true,
                 filter: {
                     type: 'string',
                     itemDefaults: {
                         emptyText: Locale.getMsg('검색어입력..')
                     }
                 }
             },
             {
                 text: Locale.getMsg('직책'), width: 60, dataIndex: 'USER_POSIT_NM', sortable: true,
                 filter: {
                     type: 'string',
                     itemDefaults: {
                         emptyText: Locale.getMsg('검색어입력..')
                     }
                 }
             },
             {
                 text: Locale.getMsg('전화번호'), width: 100, dataIndex: 'O_PHONE', sortable: true
             },
             {
                 text: Locale.getMsg('핸드폰'), width: 100, dataIndex: 'M_PHONE', sortable: true
             },
             {
                 text: Locale.getMsg('EMAIL'), width: 150, dataIndex: 'EMAIL', sortable: true
             },  
             {
                 text: Locale.getMsg('활동여부'), width: 80, dataIndex: 'USE_YN', sortable: true,
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

    Ext.define('Ysn.view.admin.adminUserListController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.admin-adminUserList',
        init: function () { 
        }  
    });

    Ext.define('Ysn.view.admin.adminUserDetail', {
        extend: 'Ext.form.Panel',
        xtype: 'admin-adminUserDetail',
        requires: [ 
        ],

        controller: 'admin-adminUserDetail',


        frame: true,
        id: 'adminUserDetail',
        reference: 'adminUserDetail',
        bodyPadding: 10,
        scrollable: true,
        width: 700,

        fieldDefaults: {
            labelAlign: 'right',
            msgTarget: 'side',
            allowBlank: true
        },
        items: [{
            xtype: 'fieldset',
            scrollable: true,
            title: '기본정보',
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
                     colspan: 3,
                     xtype: 'fieldcontainer',
                     fieldLabel: '*' + Locale.getMsg('사번/이름'),
                     labelWidth: 80,
                     style: { width: '100%' },
                     combineErrors: true,
                     layout: 'hbox',
                     defaults: {
                         //flex: 1,
                         hideLabel: true
                     },
                     items: [{
                         xtype: 'textfield',
                         name: 'userCd',
                         reference: 'userCd',
                         itemId: 'userCd',
                         width: 80,
                         allowBlank: false,
                         readOnly: true,
                         margin: '0 5 0 0'

                     }, {
                         xtype: 'textfield',
                         name: 'userNm',
                         reference: 'userNm',
                         itemId: 'userNm',
                         width: 150,
                         allowBlank: false,
                         readOnly: false,
                         margin: '0 5 0 0'
                     }, {
                         xtype: 'textfield',
                         name: 'company_nm',
                         reference: 'company_nm',
                         itemId: 'company_nm',
                         allowBlank: true,
                         width: 150,
                         readOnly: true,
                         margin: '0 5 0 0'
                     }, {
                         xtype: 'hiddenfield',
                         reference: 'company_cd',
                         name: 'company_cd',
                         itemId: 'company_cd'
                     } ]
                 },
                 {
                     colspan: 2,
                     fieldLabel: Locale.getMsg('영문명'),
                     xtype: 'textfield',
                     name: 'userEngNm',
                     reference: 'userEngNm',
                     itemId: 'userEngNm',
                     labelWidth: 80,
                     width:300,
                     readOnly: false
                 },
                 {
                    fieldLabel: Locale.getMsg('전화번호'),
                    xtype: 'textfield',
                    name: 'qPhone',
                    reference: 'qPhone',
                    itemId: 'qPhone',
                    labelWidth: 100,
                    readOnly: false
                 },
                 {
                     colspan: 2,
                     fieldLabel: '*' + Locale.getMsg('회사메일'),
                     xtype: 'textfield',
                     name: 'email',
                     reference: 'email',
                     itemId: 'email',
                     labelWidth: 80,
                     width: 300,
                     readOnly: false
                 },
                 {
                     fieldLabel: '*' + Locale.getMsg('핸드폰'),
                     xtype: 'textfield',
                     name: 'mPhone',
                     reference: 'mPhone',
                     itemId: 'mPhone',
                     labelWidth: 100,
                     readOnly: false
                 },
                 {
                     colspan: 2,
                     xtype: 'fieldcontainer',
                     fieldLabel: '*'+Locale.getMsg('조직명'),
                     labelWidth: 80, 
                     style:{width:'100%'},
                     combineErrors: true,
                     layout: 'hbox', 
                     defaults: {
                         //flex: 1,
                         hideLabel: true
                     },
                     items: [{
                         xtype: 'textfield',
                         name: 'deptNm',
                         reference: 'deptNm',
                         itemId: 'deptNm', 
                         width: 200,
                         readOnly: true,
                         margin: '0 5 0 0' 
							
                     }, {
                         xtype: 'hiddenfield',
                         reference: 'deptCd',
                         name: 'deptCd',
                         itemId: 'deptCd'
                     }, {
                         iconCls: 'x-fa fa-search',
                         xtype: 'button',
                         itemId: 'btn00',
                         scale: 'small',
                         margin: '0 5 0 0',
                         handler: 'openWindow',
                         style: {
                             'border': 'none'
                         }
                     }, {
                         iconCls: 'x-fa fa-remove',
                         xtype: 'button',
                         itemId: 'btn01',
                         scale: 'small',
                         margin: '0 5 0 0',
                         handler: 'resetVal',
                         style: {
                             'background-color': 'red !important',
                             'background-image': 'none',
                             'border': 'none'
                         }
                     } ]
                 },
                 {
                     fieldLabel: Locale.getMsg('유통채널'), labelWidth: 100, name: 'dstrChn', 
                     xtype: 'combobox',
                     reference: 'dstrChn',
                     publishes: 'value',
                     displayField: 'CODE_NM',
                     valueField: 'CODE_ID',
                     emptyText: Locale.getMsg('선택'),
                     store: {
                         type: 'Tcode'
                     },
                     minChars: 0,
                     queryMode: 'local',
                     allowBlank: true,
                     typeAhead: true
                 },
                 { 
                     fieldLabel: Locale.getMsg('직위'), labelWidth: 80, name: 'userTitle',
                     xtype: 'combobox',
                     reference: 'userTitle',
                     publishes: 'value',
                     displayField: 'CODE_NM',
                     valueField: 'CODE_ID',
                     emptyText: Locale.getMsg('선택'),
                     store: {
                         type: 'Tcode'
                     },
                     minChars: 0,
                     queryMode: 'local',
                     allowBlank: true,
                     typeAhead: true
                 },
                 { 
                     fieldLabel: Locale.getMsg('직책'), labelWidth: 80, name: 'userPosit',
                     xtype: 'combobox',
                     reference: 'userPosit',
                     publishes: 'value',
                     displayField: 'CODE_NM',
                     valueField: 'CODE_ID',
                     emptyText: Locale.getMsg('선택'),
                     store: {
                         type: 'Tcode'
                     },
                     minChars: 0,
                     queryMode: 'local',
                     allowBlank: true,
                     typeAhead: true
                 },
                 { 
                     fieldLabel: Locale.getMsg('관리자여부'), labelWidth: 100, name: 'mgr_Yn',
                     xtype: 'combobox',
                     reference: 'mgr_Yn',
                     publishes: 'value',
                     displayField: 'CODE',
                     valueField: 'CODE', 
                     store: {
                         type: 'yn' ,
                         listeners: {
                             load: function (store) {
                                 //Ext.getCmp('adminUserDetail').lookupReference('mgr_Yn').setValue(store.getAt(0).get('CODE'));
                             }
                         }
                     },
                     minChars: 0, 
                     allowBlank: true,
                     typeAhead: true
                 },
                 {
                     colspan: 2,
                     fieldLabel: Locale.getMsg('담당업무'),
                     xtype: 'textfield',
                     name: 'userWork',
                     reference: 'userWork',
                     itemId: 'userWork',
                     labelWidth: 80,
                     width: 300,
                     readOnly: false
                 },
                 {
                     fieldLabel: Locale.getMsg('목표대상여부'), labelWidth: 100, name: 'mbo_Yn',
                     xtype: 'combobox',
                     reference: 'mbo_Yn',
                     publishes: 'value',
                     displayField: 'CODE',
                     valueField: 'CODE', 
                     store: {
                         type: 'yn' ,
                         listeners: {
                             load: function (store) {
                                 //Ext.getCmp('adminUserDetail').lookupReference('mbo_Yn').setValue(store.getAt(0).get('CODE'));
                             }
                         }
                     },
                     minChars: 0,
                     queryMode: 'local',
                     allowBlank: true,
                     typeAhead: true
                 },
                  { 
                      fieldLabel: Locale.getMsg('언어'), labelWidth: 80, name: 'multiLang',
                      xtype: 'combobox',
                      reference: 'multiLang',
                      publishes: 'value',
                      displayField: 'CODE_NM',
                      valueField: 'CODE_ID', 
                      store: {
                          type: 'Tcode',
                          listeners: {
                              load: function (store) {
                                  //Ext.getCmp('adminUserDetail').lookupReference('multiLang').setValue(store.getAt(0).get('CODE_ID'));
                            }
                        }
                      },
                      minChars: 0,
                      queryMode: 'local',
                      allowBlank: true,
                      typeAhead: true
                  },
                 {
                     fieldLabel: Locale.getMsg('영업활동여부'), labelWidth: 100, name: 'sa_Yn',
                     xtype: 'combobox',
                     reference: 'sa_Yn',
                     publishes: 'value',
                     displayField: 'CODE',
                     valueField: 'CODE', 
                     store: {
                         type: 'yn',
                         listeners: {
                             load: function (store) {
                                 //Ext.getCmp('adminUserDetail').lookupReference('sa_Yn').setValue(store.getAt(0).get('CODE'));
                             }
                         }
                     },
                     minChars: 0,
                     queryMode: 'local',
                     allowBlank: true,
                     typeAhead: true
                 },
                 {
                     fieldLabel: Locale.getMsg('활동여부'), labelWidth: 100, name: 'useYn',
                     xtype: 'combobox',
                     reference: 'useYn',
                     publishes: 'value',
                     displayField: 'CODE',
                     valueField: 'CODE', 
                     store: {
                         type: 'yn' ,
                         listeners: {
                             load: function (store) {
                                 //Ext.getCmp('adminUserDetail').lookupReference('useYn').setValue(store.getAt(0).get('CODE'));
                             }
                         }
                     },
                     minChars: 0,
                     queryMode: 'local',
                     allowBlank: true,
                     typeAhead: true
                 }  ]
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
					{ xtype: 'hiddenfield', reference: 'mode', name: 'mode', itemId: 'mode', value: 'I' },
                    { xtype: 'hiddenfield', reference: 'preUserCd', name: 'preUserCd', itemId: 'preUserCd', value: 'I' },
					{ xtype: 'component', flex: 1 },
                    {
                        xtype: 'button', text: Locale.getMsg('저장'), name: 'btn1', itemId: 'btn1', margin: '5 5 5 5',  
                        listeners: { click: 'onSubmit' }
                    }
            ]
        }]
    });

    Ext.define('Ysn.view.admin.adminUserDetailController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.admin-adminUserDetail',
        init: function () {
            this.lookupReference('dstrChn').store.load({ params: { up_code_id: 'DSTR_TYPE', lang: localeCd } });
            this.lookupReference('userTitle').store.load({ params: { up_code_id: 'USER_TITLE', lang: localeCd } });
            this.lookupReference('userPosit').store.load({ params: { up_code_id: 'USER_POSIT', lang: localeCd } });
            this.lookupReference('multiLang').store.load({ params: { up_code_id: 'MULTI_LANG', lang: localeCd } }); 
            this.lookupReference('multiLang').setValue('KOR');
            this.lookupReference('useYn').setValue('Y');
            this.lookupReference('sa_Yn').setValue('N');
            this.lookupReference('mgr_Yn').setValue('N');
            this.lookupReference('mbo_Yn').setValue('N');
        },
        openWindow: function () {
            //if(!Ext.getCmp('common-searchPartUser')){
            var win = Ext.getCmp('common-findDept');
            if (!win) {
                win = new Ysn.view.common.findDept();
            }
            var hidfield = win.query('#paentFrm')[0];
            var selCompany = win.query('#selCompany')[0];
            hidfield.setValue('adminUserDetail');
            selCompany.setValue(this.getView().getForm().findField('company_cd').getValue());
            this.getView().add(win);
            win.show();
            //}
        },
        resetVal: function () {
            this.lookupReference('user_nm').setValue('');
            this.lookupReference('user_cd').setValue('');
        },
        onSubmit: function () {
            var form = Ext.getCmp('adminUserDetail').getForm();
            Ysn.Util.cbEmptyVal(Ext.getCmp('adminUserDetail'));
            if (form.isValid()) {
                form.submit({
                    waitMsg: 'Processing...',
                    url: '/adminUser/userReg',
                    method: 'POST',
                    params: form.getValues(),
                    submitEmptyText: false,
                    success: function (form, action) {
						if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
                        //console.log("response:"+action);
                        //console.log("response:"+action.response.responseText);
                        //Ext.Msg.alert('Success', action.response.responseText);
                        Ext.getCmp('adminUserList').store.reload();
                    },
                    failure: function (form, action) {
                        //console.log('response:'+ action);
                        var dataVal = Ext.JSON.decode(action.response.responseText)
                        Ext.Msg.alert('Failed', dataVal.errmsg);
                        //Ext.getCmp('adminUserList').store.reload();
                    }
                });
            }
        }

    });

    Ext.define('Ysn.view.admin.adminUser', {
        extend: 'Ext.panel.Panel',
        xtype: 'admin-adminUser',
        requires: [
            'Ysn.view.admin.adminUserController',
		    'Ysn.view.common.searchcustomer',
            'Ysn.view.admin.adminUsersearch',
            'Ysn.view.admin.adminUserList'
        ],

        controller: 'admin-adminUser',
        reference: 'admin-adminUser',
        id: 'admin-adminUser',
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
	                       xtype: 'adminUser-search',
	                       reference: 'adminUserSearch',
	                       itemId: 'adminUserSearch',
                           scrollable: true,
	                       collapsible: true,
	                       floatable: true,
	                       split: true,
	                       padding: '0 0 0 0',
	                       dock: 'top',
	                       height: 80
	                   }
        ],
        tbar: {

            overflowHandler: 'menu',
            style: { 'border-top-width': '1px !important;' },
            items: [
		 /*   {
		        xtype: 'label',
		        itemId: 'total',
		        text: 'Total : 0',
		        style: { 'font-weight': 'bold' }
		    },*/

			      '->',

		   {
		        xtype: 'button',
		        iconCls: 'x-fa fa-file-excel-o',
		        text: Locale.getMsg('액셀변환'),
		        handler: 'xlsExport'
		    },{
		        xtype: 'button',
		        iconCls: 'x-fa fa-plus-square',
		        text: Locale.getMsg('등록'),
		        handler: 'frmClear'
		    }]
        },

        items: [
		    {
		        header: false,
		        region: 'center',
		        xtype: 'adminUserList',
		        reference: 'adminUserList',
		        itemId: 'adminUserList',
		        listeners: {
		            select: 'itemclick'
		        }

		    },{
		        title: Locale.getMsg('USER상세정보'),

		        scrollable: false,
		        x: 10, y: 10,
		        region: 'east',
		        itemId: 'east',
		        //	reference:'Detail',
		        collapsed: true,
		        layout: 'fit',
		        width: 900,
		        minWidth: 750,
		        maxWidth: 1200,
		        items: {
		            xtype: 'admin-adminUserDetail'
		        }
		    }
        ]
    });

    ///<reference path="~/Client/ext/build/ext-all-debug.js">
    ///<reference path="~/Client/ext/build/ext-debug.js">
    Ext.define('Ysn.view.admin.adminUserController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.admin-adminUser',
        requires: [
	        'Ysn.store.*'
        ],
        init: function () {
            this.lookupReference('adminUserSearch').setTitle(pageTitle); 
        }, 
        itemclick: function (view, record, index, e) {
      
            if (Ext.getCmp('admin-adminUser').down('#east').collapsed) Ext.getCmp('admin-adminUser').down('#east').toggleCollapse();
            var pl = Ext.getCmp('adminUserDetail').getForm();
            pl.reset();
            pl.findField('userCd').setConfig({ 'readOnly': true }) //preUserCd
            pl.findField('userCd').setValue(record.get('USER_CD'));
            pl.findField('preUserCd').setValue(record.get('USER_CD'));
            pl.findField('userNm').setValue(record.get('USER_NM'));
            pl.findField('userEngNm').setValue(record.get('USER_ENG_NM'));
            pl.findField('company_nm').setValue(record.get('COMPANY_NM'));
            pl.findField('company_cd').setValue(record.get('COMPANY_CD'));
            pl.findField('qPhone').setValue(record.get('O_PHONE'));
            pl.findField('mPhone').setValue(record.get('M_PHONE'));
            pl.findField('deptNm').setValue(record.get('DEPT_NM'));
            pl.findField('deptCd').setValue(record.get('DEPT_CD'));
            pl.findField('dstrChn').setValue(record.get('DSTR_CHN'));
            pl.findField('email').setValue(record.get('EMAIL'));
            pl.findField('userTitle').setValue(record.get('USER_TITLE'));
            pl.findField('mgr_Yn').setValue(record.get('MGR_YN'));
            pl.findField('userPosit').setValue(record.get('USER_POSIT'));
            pl.findField('mbo_Yn').setValue(record.get('MBO_YN'));
            pl.findField('userWork').setValue(record.get('USER_WORK'));
            pl.findField('sa_Yn').setValue(record.get('SA_YN'));
            pl.findField('multiLang').setValue(record.get('MULTI_LANG'));
            pl.findField('useYn').setValue(record.get('USE_YN'));
            pl.findField('mode').setValue('M');

        },
        frmClear: function () {
            var Pl = Ext.getCmp('adminUserDetail');
            var comp = Ext.getCmp('adminUser-search').lookupReference('selCompany');
            var Frm = Pl.getForm();
            Frm.reset();
            Frm.findField('company_cd').setValue(comp.getValue());
            Frm.findField('company_nm').setValue(comp.getRawValue());
            Frm.findField('multiLang').setValue('KOR');
            Frm.findField('useYn').setValue('Y');
            Frm.findField('sa_Yn').setValue('N');
            Frm.findField('mgr_Yn').setValue('N');
            Frm.findField('mbo_Yn').setValue('N');
            Frm.findField('mode').setValue('I');
            Frm.findField('userCd').setConfig({ 'readOnly': false })

            if (Ext.getCmp('admin-adminUser').down('#east').collapsed) {
                Ext.getCmp('admin-adminUser').down('#east').toggleCollapse();
            }

        },
        xlsExport: function () {

            Ext.getCmp('adminUserList').saveDocumentAs({
			headerRowCnt: 1,
                type: 'xlsx',
                title: Ext.getCmp('adminUser-search').getTitle(),
                fileName: Locale.getMsg('USER관리')
            });
        }
    });




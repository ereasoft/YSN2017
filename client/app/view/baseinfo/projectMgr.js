    Ext.define('Ysn.view.baseinfo.projectMgrsearch', {
        extend: 'Ext.panel.Panel',
        xtype: 'projectMgr-search',

        requires: [
            'Ysn.view.baseinfo.projectMgrsearchController', 
	        'Ysn.store.*'
        ],

        controller: 'projectMgr-search',

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
        id: 'projectMgr-search',
        reference: 'projectMgr-search',
        defaults: {
            layout: 'form',
            xtype: 'container',
            defaultType: 'textfield'
        },

        items: [
            {
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
					            load: function (store, records, successful, operation) {
					                if (!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
					                store.insert(0, { DEPT_CD: '', DEPT_NM: Locale.getMsg('전체') });
					                var bizCd = Ext.getCmp('projectMgr-search').down('#bizGroup');
					                if (store.data.items.length < 2) {
					                    Ext.getCmp('projectMgr-search').down('#user_cd').store.load({ params: { dept_cd: bizCd.getValue(), up_dept_cd: '' } });
					                } else {
					                    Ext.getCmp('projectMgr-search').down('#user_cd').store.load({ params: { dept_cd: '', up_dept_cd: bizCd.getValue() } });
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
            },
            {
               colspan:2,
               xtype: 'fieldcontainer',
               //fieldLabel: '등록기간',
               combineErrors: true,
               layout: 'hbox',
               defaults: {
                   //flex: 1,
                   //hideLabel: true,
                   margin: '0 5 0 0'
               },
               items: [{
                   fieldLabel: Locale.getMsg('프로젝트기간'),
                   labelAlign: 'right',
                   labelWidth: 100,
                   width: 230,
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
               rowspan: 3,
               xtype: 'button',
               text: Locale.getMsg('검색'),
               width: 60,
               height: 60,
               listeners: {
                   click: 'onSubmitClick'
               }
           }, {
               xtype: 'fieldcontainer',
               fieldLabel: Locale.getMsg('프로젝트'),
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
                   name: 'pjt_nm',
                   reference: 'pjt_nm',
                   itemId: 'pjt_nm',
                   margin: '0 5 0 0',
                   width: 270
               }, {
                   xtype: 'hiddenfield',
                   reference: 'pjt_cd',
                   name: 'pjt_cd',
                   itemId: 'pjt_cd'
               }, {
                   iconCls: 'x-fa fa-search',
                   xtype: 'button',
                   scale: 'small',
                   margin: '0 5 0 0',
                   handler: 'openPrj',
                   style: {
                       'border': 'none'

                   }
               }, {
                   iconCls: 'x-fa fa-remove',
                   xtype: 'button',
                   scale: 'small',
                   handler: 'resetPrj',
                   style: {
                       'background-color': 'red !important',
                       'background-image': 'none',
                       'border': 'none'

                   }
               }]
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
               xtype: 'combobox',
               reference: 'end_yn',
               publishes: 'value',
               fieldLabel: Locale.getMsg('종료여부'),
               labelWidth: 100,
               width: 200,
               labelAlign: 'right',
               displayField: 'name',
               valueField: 'code',
               name: 'end_yn',
               anchor: '-15',
               store: {
                   fields: ['name', 'code'],
                   data: [{ name: Locale.getMsg('전체'), code: '' }, { name: Locale.getMsg('진행'), code: 'Y' }, { name: Locale.getMsg('종료'), code: 'N' }],
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
           }, {
               xtype: 'combobox',
               reference: 'use_yn',
               publishes: 'value',
               fieldLabel: Locale.getMsg('사용여부'),
               labelWidth: 60,
               width: 200,
               labelAlign: 'right',
               displayField: 'name',
               valueField: 'code',
               name: 'use_yn',
               anchor: '-15',
               store: {
                   fields: ['name', 'code'],
                   data: [{ name: Locale.getMsg('전체'), code: '' }, { name: Locale.getMsg('사용가능'), code: 'Y' }, { name: Locale.getMsg('사용불가능'), code: 'N' }],
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
               xtype: 'textfield',
               name: 'end_user',
               fieldLabel: Locale.getMsg('EndUser'),
               labelAlign: 'right',
               reference: 'end_user',
               itemId: 'end_user',
               margin: '0 5 0 0'
           }, {
               colspan: 2,
               xtype: 'textfield',
               name: 'smp_cd',
               fieldLabel: Locale.getMsg('SMP.CD'),
               labelAlign: 'right',
               reference: 'smp_cd',
               itemId: 'smp_cd',
               hidden: true,
               margin: '0 5 0 0'
           }
        ] 
    });

    Ext.define('Ysn.view.baseinfo.projectMgrsearchController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.projectMgr-search',
        init: function () { 
            this.lookupReference('bizGroup').store.load();
            this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true));
            this.lookupReference('dstr_type').store.load({ params: { up_code_id: 'DSTR_TYPE', lang: localeCd } });
            this.lookupReference('dstr_type').setValue('');
            this.lookupReference('end_yn').setValue('');
            this.lookupReference('use_yn').setValue('');
            var Today = new Date();
            this.lookupReference('sdate').setValue(Today.getFullYear() + '-' + ('0' + (Today.getMonth() + 1)).slice(-2) + '-' + '01');
        },
        openPrj: function () {
            var prj = Ext.getCmp('commonSearchpjt');
            if (!prj) {
                prj = new Ysn.view.common.searchpjt();
            }
            var hidfield = prj.query('#paentFrm')[0];
            prj.down('#pjt_nm').setValue(this.lookupReference('pjt_nm').getValue());
            hidfield.setValue('projectMgr-search');
            Ext.getCmp('baseinfo-projectMgr').add(prj);
            prj.setPosition(10, -100);
            prj.show();
        },
        resetPrj: function () {
            this.lookupReference('pjt_nm').setValue('');
            this.lookupReference('pjt_cd').setValue('');
        },
        openWindow: function () {
            var win = Ext.getCmp('commonSearchcustomer');
            if (!win) {
                win = new Ysn.view.common.searchcustomer();
            }
            var hidfield = win.query('#paentFrm')[0];
            win.down('#cust_nm').setValue(this.lookupReference('cust_nm').getValue());
            hidfield.setValue('projectMgr-search');
            Ext.getCmp('baseinfo-projectMgr').add(win);
            win.setPosition(10, -100);
            win.show();
        },
        resetVal: function () {
            this.lookupReference('cust_nm').setValue('');
            this.lookupReference('cust_cd').setValue('');
        },
        onChangeBiz: function (el, newVal, oldVal, e) {
            var deptCombo = this.lookupReference('deptGroup');
            var userCombo = this.lookupReference('userGroup');
            if (newVal != '') {
                deptCombo.store.load({ params: { up_dept_cd: newVal } });

            } else {
                deptCombo.setValue('');
                userCombo.setValue('');
                deptCombo.store.removeAll();
                userCombo.store.removeAll();
                deptCombo.store.insert(0, { DEPT_CD: '', DEPT_NM: Locale.getMsg('전체') });
                userCombo.store.insert(0, { USER_CD: '', USER_NM: Locale.getMsg('전체') });
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
                userCombo.store.load({ params: { dept_cd: newVal, up_dept_cd: this.lookupReference('bizGroup').getValue() } });
            } else {
                userCombo.store.removeAll();
            }
            userCombo.setValue('');
            userCombo.doQuery();
            el.focus();
            //userCombo.focus();

        },
        onSubmitClick: function () {
            var pl = Ext.getCmp('projectMgrList');

            pl.getStore().load(
                    {
                        params: {
                            bizGroup: this.lookupReference('bizGroup').getValue(),
                            deptGroup: this.lookupReference('deptGroup').getValue(), 
                            user_cd: this.lookupReference('userGroup').getValue(),
                            sdate: Ext.Date.format(this.lookupReference('sdate').getValue(), 'Ymd'),
                            edate: Ext.Date.format(this.lookupReference('edate').getValue(), 'Ymd'),
                            pjt_nm: this.lookupReference('pjt_nm').getValue(),
                            pjt_cd: this.lookupReference('pjt_cd').getValue(), 
                            end_yn: this.lookupReference('end_yn').getValue(),
                            cust_nm: this.lookupReference('cust_nm').getValue(),
                            cust_cd: this.lookupReference('cust_cd').getValue(),
                            smp_cd: this.lookupReference('smp_cd').getValue(),
                            dstr_type: this.lookupReference('dstr_type').getValue(),
                            use_yn: this.lookupReference('use_yn').getValue(),
                            end_user: this.lookupReference('end_user').getValue()
                        },
                        callback: function (records, operation, success) {
                           

                        }
                    }
        );
        }


    }); 

    Ext.define('Ysn.view.baseinfo.projectMgrList', {
        extend: 'Ext.grid.Panel',
        xtype: 'projectMgrList',
        requires: [
            'Ext.grid.filters.Filters'
        ],
    
        controller: 'baseinfo-projectMgrList',
        id : 'projectMgrList',
        store: {
            fields: [ 
                     { name: 'PJT_CD', type: 'string' },
                     { name: 'PJT_NM', type: 'string' },
                     { name: 'SMP_CD', type: 'string' },
                     { name: 'SMP_CHASU', type: 'string' },
                     { name: 'CUST_CD', type: 'string' },
                     { name: 'CUST_NM', type: 'string' },
                     { name: 'USER_CD', type: 'string' },
                     { name: 'USER_NM', type: 'string' },
                     { name: 'DEPT_CD', type: 'string' },
                     { name: 'DEPT_NM', type: 'string' },
                     { name: 'BIZ_TYPE', type: 'string' },
                     { name: 'BIZ_TYPE_NM', type: 'string' },
                     { name: 'DSTR_TYPE', type: 'string' },
                     { name: 'DSTR_TYPE_NM', type: 'string' },
                     { name: 'EUSR_CD', type: 'string' },
                     { name: 'EUSR_NM', type: 'string' },
                     { name: 'PJT_DATE', type: 'string' },
                     { name: 'END_YN', type: 'string' },
                     { name: 'USE_YN', type: 'string' }  ],
            proxy: {
                type: 'ajax',
                url: '/BaseInfo/projectMngList',
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
	    id: 'projectMgrList',
	    columnLines: true,
	    multiColumnSort: true,
	    plugins: ['gridfilters',
                  'pmh-grid-exporter'
	    ],
	    columns : [  
             {
                 text: Locale.getMsg('프로젝트명'), width: 150, dataIndex: 'PJT_NM', sortable: true,
                 filter: {
                     type: 'string',
                     itemDefaults: {
                         emptyText: Locale.getMsg('검색어입력..')
                     }
                 }
             },
             {
                 text: Locale.getMsg('거래처'), width: 150, dataIndex: 'CUST_NM', sortable: true,
                 filter: {
                     type: 'string',
                     itemDefaults: {
                         emptyText: Locale.getMsg('검색어입력..')
                     }
                 }
             },
             {
                 text: Locale.getMsg('EndUser'), width: 150, dataIndex: 'EUSR_NM', sortable: true,
                 filter: {
                     type: 'string',
                     itemDefaults: {
                         emptyText: Locale.getMsg('검색어입력..')
                     }
                 }
             },
             {
                 text: Locale.getMsg('매출조직'), width: 100, dataIndex: 'DEPT_NM', sortable: true,
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
                 text: Locale.getMsg('유통구조'), width: 100, dataIndex: 'DSTR_TYPE_NM', sortable: true,
                 filter: {
                     type: 'string',
                     itemDefaults: {
                         emptyText: Locale.getMsg('검색어입력..')
                     }
                 }
             },
             {
                 text: Locale.getMsg('프로젝트기간'), width: 150, dataIndex: 'PJT_DATE', sortable: true,
                 filter: {
                     type: 'string',
                     itemDefaults: {
                         emptyText: Locale.getMsg('검색어입력..')
                     }
                 }
             },
             {
                 text: Locale.getMsg('종료여부'), width: 80, dataIndex: 'END_YN', sortable: true
             },
             {
                 text: Locale.getMsg('사용여부'), width: 100, dataIndex: 'USE_YN', sortable: true
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

    Ext.define('Ysn.view.baseinfo.projectMgrListController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.baseinfo-projectMgrList',
        init: function () { 
        }  
    });

    Ext.define('Ysn.view.baseinfo.projectMgrDetail', {
        extend: 'Ext.form.Panel',
        xtype: 'baseinfo-projectMgrDetail',
        requires: [ 
        ],

        controller: 'baseinfo-projectMgrDetail',


        frame: true,
        id: 'projectMgrDetail',
        reference: 'projectMgrDetail',
        bodyPadding: 10,
        scrollable: true,
        width: 700,
        reader: {
            type: 'json',
            model: 'Ysn.model.projectMgrDetail',
            rootProperty: ''
        },
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
                     colspan: 2,  
                     xtype: 'fieldcontainer',
                     fieldLabel: '*' + Locale.getMsg('프로젝트'),
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
                         name: 'pjt_nm',
                         reference: 'pjt_nm',
                         itemId: 'pjt_nm',
                         width: 250,
                         allowBlank: false,
                         readOnly: false,
                         margin: '0 5 0 0'

                     }, {
                         xtype: 'textfield',
                         name: 'pjt_cd',
                         reference: 'pjt_cd',
                         itemId: 'pjt_cd',
                         width: 100,
                         allowBlank: true,
                         readOnly: true,
                         margin: '0 5 0 0'
                     }  ]
                 },
                 {
                     xtype: 'fieldcontainer',
                     fieldLabel: '*' + Locale.getMsg('프로젝트기간'),
                     combineErrors: true,
                     layout: 'hbox',
                     defaults: {
                         //flex: 1,
                         hideLabel: true,
                         margin: '0 5 0 0'
                     },
                     items: [{
                         labelAlign: 'right',
                         width: 130,
                         xtype: 'datefield',
                         name: 'sdate',
                         reference: 'sdate',
                         itemId: 'sdate',
                         format: 'Y-m-d',
                         margin: '0 5 0 0'
                     }, {
                         xtype: 'datefield',
                         name: 'edate',
                         width: 130,
                         reference: 'edate',
                         itemId: 'edate',
                         format: 'Y-m-d',
                         margin: '0 10 0 0'
                     }]
                 },
                 {
                     colspan: 2,
                     xtype: 'fieldcontainer', 
                     labelWidth: 80,
                     fieldLabel: '*' + Locale.getMsg('거래처'),
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
                         //readOnly: true,
                         width: 300
                     }, {
                         xtype: 'hiddenfield',
                         reference: 'cust_cd',
                         name: 'cust_cd',
                         itemId: 'cust_cd'
                     }, {
                         iconCls: 'x-fa fa-search',
                         xtype: 'button',
                         itemId: 'btn03',
                         scale: 'small',
                         margin: '0 5 0 0',
                         handler: 'openWindow1',
                         style: {
                             'border': 'none'

                         }
                     }, {
                         iconCls: 'x-fa fa-remove',
                         xtype: 'button',
                         itemId: 'btn04',
                         scale: 'small',
                         handler: 'resetVal1',
                         margin: '0 5 0 0',
                         style: {
                             'background-color': 'red !important',
                             'background-image': 'none',
                             'border': 'none'

                         }
                     }]
                 },
                 {
                     fieldLabel: '*' + Locale.getMsg('유통구조'), labelWidth: 100, name: 'dstr_type',
                     xtype: 'combobox',
                     reference: 'dstr_type',
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
                     colspan:2,
                     xtype: 'fieldcontainer', 
                     labelWidth: 80,
                     fieldLabel: '*' + Locale.getMsg('End User'),
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
                         //readOnly: true,
                         width: 300
                     }, {
                         xtype: 'hiddenfield',
                         reference: 'euser_cd',
                         name: 'euser_cd',
                         itemId: 'euser_cd'
                     }, {
                         iconCls: 'x-fa fa-search',
                         xtype: 'button',
                         itemId: 'btn05',
                         scale: 'small',
                         margin: '0 5 0 0',
                         handler: 'openWindow2',
                         style: {
                             'border': 'none'

                         }
                     }, {
                         iconCls: 'x-fa fa-remove',
                         xtype: 'button',
                         itemId: 'btn06',
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
                     fieldLabel: '*' + Locale.getMsg('사업유형'), labelWidth: 100, name: 'biz_type',
                     xtype: 'combobox',
                     reference: 'biz_type',
                     publishes: 'value',
                     displayField: 'CODE_NM',
                     valueField: 'CODE_ID',
                     emptyText: Locale.getMsg('선택'),
                     store: {
                         type: 'Tcode'
                     },
                     minChars: 0,
                     queryMode: 'local',
                     allowBlank: false,
                     typeAhead: true
                 },
                  {
                      colspan: 2,
                      xtype: 'fieldcontainer',
                      labelWidth: 80,
                      fieldLabel: '*' + Locale.getMsg('영업담당'),
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
                          name: 'user_nm',
                          reference: 'user_nm',
                          itemId: 'user_nm',
                          margin: '0 5 0 0',
                          //readOnly: true,
                          width: 300
                      }, {
                          xtype: 'hiddenfield',
                          reference: 'user_cd',
                          name: 'user_cd',
                          itemId: 'user_cd'
                      }, {
                          xtype: 'hiddenfield',
                          reference: 'dept_cd',
                          name: 'dept_cd',
                          itemId: 'dept_cd'
                      }, {
                          iconCls: 'x-fa fa-search',
                          xtype: 'button',
                          itemId: 'btn03',
                          scale: 'small',
                          margin: '0 5 0 0',
                          handler: 'openWindow3',
                          style: {
                              'border': 'none'

                          }
                      }, {
                          iconCls: 'x-fa fa-remove',
                          xtype: 'button',
                          itemId: 'btn04',
                          scale: 'small',
                          handler: 'resetVal3',
                          margin: '0 5 0 0',
                          style: {
                              'background-color': 'red !important',
                              'background-image': 'none',
                              'border': 'none'

                          }
                      }]
                  },
                 { 
                     fieldLabel: '*' + Locale.getMsg('매출조직'),
                     xtype: 'textfield',
                     name: 'dept_nm',
                     reference: 'dept_nm',
                     itemId: 'dept_nm',
                     labelWidth: 100,
                     width: 300,
                     readOnly: true
                 }, 
                {
                fieldLabel: '*' + Locale.getMsg('기준통화'), labelWidth: 80, name: 'base_crny',
                width: 180,
                xtype: 'combobox',
                reference: 'base_crny',
                publishes: 'value',
                displayField: 'CODE_NM',
                valueField: 'CODE_ID',
                emptyText: Locale.getMsg('선택'),
                store: {
                    type: 'Tcode'
                },
                minChars: 0,
                queryMode: 'local',
                allowBlank: false,
                typeAhead: true
                },
                {
                    xtype: 'combobox',
                    reference: 'end_yn',
                    publishes: 'value',
                    fieldLabel: Locale.getMsg('종료여부'),
                    labelWidth: 80,
                    width: 180,
                    labelAlign: 'right',
                    displayField: 'name',
                    valueField: 'code', 
                    emptyText: Locale.getMsg('선택'),
                    name: 'end_yn',
                    anchor: '-15',
                    store: {
                        fields: ['name', 'code'],
                        data: [ { name: Locale.getMsg('진행'), code: 'Y' }, { name: Locale.getMsg('종료'), code: 'N' }],
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
                    queryMode: 'local'
                },
                {
                    xtype: 'combobox',
                    reference: 'use_yn',
                    publishes: 'value',
                    fieldLabel: Locale.getMsg('사용가능'),
                    labelWidth: 100,
                    width: 240,
                    labelAlign: 'right',
                    displayField: 'name',
                    valueField: 'code',
                    emptyText: Locale.getMsg('선택'),
                    name: 'use_yn',
                    anchor: '-15',
                    store: {
                        fields: ['name', 'code'], 
                        data: [{ name: Locale.getMsg('사용가능'), code: 'Y' }, { name: Locale.getMsg('사용불가능'), code: 'N' }],
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

                }
            ]
        }, {
            xtype: 'fieldset',
            reference: 'smpList',
            scrollable: true,
            title: Locale.getMsg('샘플제작정보'),
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
                                model : 'Ysn.model.sampleProductionList',
                                //fields: [ 'LIST', 'COUNT'],
                                proxy: {
                                    method: "POST",
                                    type: 'ajax',
                                    url: '/SampleManage/sampleManageList',			 
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
                                autoLoad: false,
                                autoDestroy: true, 
                            }, 
                            itemId: 'prjItemList',
                            reference: 'prjItemList',
                            columnLines: true,
                            columns: [
                                   { text: "SMP.NO", width: 100, dataIndex: 'SMP_CD', sortable: true },
                                    { text: Locale.getMsg('샘플품목'), width: 200, dataIndex: 'ITEM_NM', sortable: true  },
                                    {
                                        text: Locale.getMsg('차수'), width: 60, dataIndex: 'SMP_CHASU', sortable: true 
                                    },
                                    {
                                        text: Locale.getMsg('거래처'), width: 125, dataIndex: 'CUST_NM', sortable: true 
                                    },
			                        {
			                            text: Locale.getMsg('End User'), width: 125, dataIndex: 'EUSER_NM', sortable: true 
			                        },
			                        {
			                            text: Locale.getMsg('유통구조'), width: 125, dataIndex: 'DSTR_TYPE_NM', sortable: true 
			                        },
			                        {
			                            text: Locale.getMsg('매출조직'), width: 125, dataIndex: 'DEPT_NM', sortable: true 
			                        },
			                        {
			                            text: Locale.getMsg('영업담당'), width: 125, dataIndex: 'USER_NM', sortable: true 
			                        },
			                        {
			                            text: "제작담당", width: 125, dataIndex: 'MUSER_NM', sortable: true 
			                        },
			                        {
			                            text: Locale.getMsg('사업유형'), width: 125, dataIndex: 'BIZ_TYPE_NM', sortable: true 
			                        },
			                        {
			                            text: Locale.getMsg('품목유형'), width: 125, dataIndex: 'ITEM_TYPE_NM', sortable: true 
			                        },
			                        {
			                            text: Locale.getMsg('진행상태'), width: 125, dataIndex: 'SMP_STATUS_NM', sortable: true 
			                        },
                                    {
                                        text: Locale.getMsg('샘플유형'), width: 100, dataIndex: 'SMP_TYPE_NM', sortable: true 
                                    },
			                        {
			                            text: "양산가능성", width: 125, dataIndex: 'PRDT_PSBLT_NM', sortable: true 
			                        },
			                        { text: Locale.getMsg('접수일'), width: 125, dataIndex: 'SMP_RDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
			                        { text: Locale.getMsg('수주예정일'), width: 125, dataIndex: 'PRDT_RCDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true }, 
			                        { text: Locale.getMsg('완료요청일'), width: 125, dataIndex: 'CMPT_RDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
			                        { text: Locale.getMsg('제작의뢰일'), width: 125, dataIndex: 'PRDT_RDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
			                        { text: Locale.getMsg('의뢰승인일'), width: 125, dataIndex: 'PRDT_ADATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
			                        { text: Locale.getMsg('완료예정일'), width: 125, dataIndex: 'PRDT_PDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
			                        { text: Locale.getMsg('2치완료예정일'), width: 125, dataIndex: 'PRDT_PDATE2', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
			                        {
			                            text: Locale.getMsg('샘플공정'), width: 125, dataIndex: 'PROCESS_NM', sortable: true 
			                        },
			                        { text: Locale.getMsg('지연사유'), width: 125, dataIndex: 'DELAY_COMMENT_NM', sortable: true },
			                        { text: Locale.getMsg('사양확정일'), width: 125, dataIndex: 'FILM_RDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
			                        { text: Locale.getMsg('제작완료일'), width: 125, dataIndex: 'PRDT_CDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
			                        { text: Locale.getMsg('배송[선적]일'), width: 125, dataIndex: 'SHIP_PDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },			                         
			                        {
			                            text: Locale.getMsg('악성업체유무'), width: 125, dataIndex: 'BAD_AR_YN', sortable: true, hidden: true,
			                            filter: {
			                                type: 'string',
			                                itemDefaults: {
			                                    emptyText: Locale.getMsg('검색어입력..')
			                                }
			                            }
			                        }

                                                    ],
                                                    style: { width: '100%' },
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
					{ xtype: 'component', flex: 1 },
                    {
                        xtype: 'button', text: Locale.getMsg('저장'), name: 'btn1', itemId: 'btn1', margin: '5 5 5 5',  
                        listeners: { click: 'onSubmit' }
                    }
            ]
        }]
    });

    Ext.define('Ysn.view.baseinfo.projectMgrDetailController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.baseinfo-projectMgrDetail',
        init: function () {
            this.lookupReference('dstr_type').store.load({ params: { up_code_id: 'DSTR_TYPE', lang: localeCd } });
            this.lookupReference('biz_type').store.load({ params: { up_code_id: 'BIZ_TYPE', lang: localeCd } });
            this.lookupReference('base_crny').store.load({ params: { up_code_id: 'CRNY_TYPE', lang: localeCd } });
        },
        openWindow1: function () {
            //if(!Ext.getCmp('common-searchPartUser')){
            var win3 = Ext.getCmp('commonSearchcustomer');
            if (!win3) {
                win3 = new Ysn.view.common.searchcustomer();
            }
            var hidfield = win3.query('#paentFrm')[0];
            win3.down('#cust_nm').setValue(this.lookupReference('cust_nm').getValue());
            hidfield.setValue('projectMgrDetail');
            Ext.getCmp('projectMgrDetail').add(win3);
            win3.show();
            //}
        },
        resetVal1: function () {
            this.lookupReference('cust_nm').setValue('');
            this.lookupReference('cust_cd').setValue('');
        },
        openWindow2: function () {
            var win4 = Ext.getCmp('commonSearchEndUser');
            if (!win4) {
                win4 = new Ysn.view.common.searchEndUser();
            }
            var hidfield = win4.query('#paentFrm')[0];
            win4.down('#euser_nm').setValue(this.lookupReference('euser_nm').getValue());
            hidfield.setValue('projectMgrDetail');
            Ext.getCmp('projectMgrDetail').add(win4);
            win4.show();
        },
        resetVal2: function () {
            this.lookupReference('euser_nm').setValue('');
            this.lookupReference('euser_cd').setValue('');
        },
        openWindow3: function () {
            //if(!Ext.getCmp('common-searchPartUser')){
            var win = Ext.getCmp('common-searchPartUser');
            if (!win) {
                win = new Ysn.view.common.searchPartUser();
            }
            var hidfield = win.down('#paentFrm');
            win.down('#user_nm').setValue(this.lookupReference('user_nm').getValue());
            hidfield.setValue('projectMgrDetail');
            Ext.getCmp('projectMgrDetail').add(win);
            win.setPosition(70, 100);
            win.show();
            //}
        },
        resetVal3: function () {
            this.lookupReference('user_nm').setValue('');
            this.lookupReference('user_cd').setValue('');
            this.lookupReference('dept_cd').setValue('');
            this.lookupReference('dept_nm').setValue('');
        },
        onSubmit: function () {
            var form = Ext.getCmp('projectMgrDetail').getForm();
            Ysn.Util.cbEmptyVal(Ext.getCmp('projectMgrDetail'));
            var url = '/BaseInfo/updateProject';
            if (form.findField('pjt_cd').getValue()) {
                url = '/BaseInfo/updateProject';
            } else {
                url = '/BaseInfo/insertProject';
            }
            if (form.isValid()) {
                form.submit({
                    waitMsg: 'Processing...',
                    url: url,
                    method: 'POST',
                    params: form.getValues(),
                    submitEmptyText: false,
                    success: function (form, action) {
						if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
                        //console.log("response:"+action);
                        //console.log("response:"+action.response.responseText);
                        //Ext.Msg.alert('Success', action.response.responseText);
                        Ext.getCmp('projectMgrList').store.reload();
                    },
                    failure: function (form, action) {
                        //console.log('response:'+ action);
                        var dataVal = Ext.JSON.decode(action.response.responseText)
                        Ext.Msg.alert('Failed', dataVal.errmsg);
                        //Ext.getCmp('projectMgrList').store.reload();
                    }
                });
            }
        }

    });

    Ext.define('Ysn.view.baseinfo.projectMgr', {
        extend: 'Ext.panel.Panel',
        xtype: 'baseinfo-projectMgr',
        requires: [
            'Ysn.view.baseinfo.projectMgrController',
		    'Ysn.view.common.searchcustomer',
            'Ysn.view.baseinfo.projectMgrsearch',
            'Ysn.view.baseinfo.projectMgrList'
        ],

        controller: 'baseinfo-projectMgr',
        reference: 'baseinfo-projectMgr',
        id: 'baseinfo-projectMgr',
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
	                       xtype: 'projectMgr-search',
	                       reference: 'projectMgrSearch',
	                       itemId: 'projectMgrSearch',
                           scrollable: true,
	                       collapsible: true,
	                       floatable: true,
	                       split: true,
	                       padding: '0 0 0 0',
	                       dock: 'top',
	                       height: 190
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
		        xtype: 'projectMgrList',
		        reference: 'projectMgrList',
		        itemId: 'projectMgrList',
		        listeners: {
		            select: 'itemclick'
		        }

		    },{
		        title: Locale.getMsg('프로젝트 상세정보'),

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
		            xtype: 'baseinfo-projectMgrDetail'
		        }
		    }
        ]
    });

    ///<reference path="~/Client/ext/build/ext-all-debug.js">
    ///<reference path="~/Client/ext/build/ext-debug.js">
    Ext.define('Ysn.view.baseinfo.projectMgrController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.baseinfo-projectMgr',
        requires: [
	        'Ysn.store.*'
        ],
        init: function () {
            this.lookupReference('projectMgrSearch').setTitle(pageTitle); 
        }, 
        itemclick: function (view, record, index, e) {
      
            if (Ext.getCmp('baseinfo-projectMgr').down('#east').collapsed) Ext.getCmp('baseinfo-projectMgr').down('#east').toggleCollapse();
            var Pl = Ext.getCmp('projectMgrDetail');
            var frm = Pl.getForm();
            frm.reset();
            Ext.getCmp('projectMgrDetail').load({
                url: '/BaseInfo/projectDetail?pjt_cd=' + record.get('PJT_CD'), //,
                waitMsg: 'loading...',
                success: function (form, action) {
                    if (!Ysn.Util.OnsessOut(action.response.responseText)) return false; 
                    var dataVal = Ext.JSON.decode(action.response.responseText);
                    Pl.down('#prjItemList').getStore().removeAll();
                    Pl.down('#prjItemList').getStore().load(
					{
					    params: { 
					        pjt_cd: dataVal.PJT_CD,
					        pjt_nm: dataVal.PJT_NM
					    }
					}
		);
                    Pl.body.dom.scrollTop = 0;
                    Pl.body.dom.scrollLeft = 0;
                    for (var i = 0; i < Pl.items.items.length; i++) {
                        Pl.items.items[i].body.dom.scrollTop = 0;
                        Pl.items.items[i].body.dom.scrollLeft = 0;
                    }

                }
            });
            var task = new Ext.util.DelayedTask(function () {
                Ext.getCmp('baseinfo-projectMgr').down('#east').toggleCollapse();
            });
            if (Ext.getCmp('baseinfo-projectMgr').down('#east').collapsed) task.delay(500);
        },
        frmClear: function () {
            Ext.getCmp('projectMgrDetail').getForm().reset(); 
            Ext.getCmp('projectMgrDetail').down('#prjItemList').getStore().removeAll();
            Ext.getCmp('projectMgrDetail').getForm().findField('user_cd').setValue(loginUser);
            Ext.getCmp('projectMgrDetail').getForm().findField('user_nm').setValue(username);
            Ext.getCmp('projectMgrDetail').getForm().findField('dept_cd').setValue(dept_cd);
            Ext.getCmp('projectMgrDetail').getForm().findField('dept_nm').setValue(dept_nm);
            Ext.getCmp('projectMgrDetail').getForm().findField('dstr_type').setValue(dstr_chn);
            if (Ext.getCmp('baseinfo-projectMgr').down('#east').collapsed) {
                Ext.getCmp('baseinfo-projectMgr').down('#east').toggleCollapse();
            }
        },
        xlsExport: function () {

            Ext.getCmp('projectMgrList').saveDocumentAs({
			headerRowCnt: 1,
                type: 'xlsx',
                title: Ext.getCmp('projectMgr-search').getTitle(),
                fileName: Locale.getMsg('프로젝트관리')
            });
        }
    });




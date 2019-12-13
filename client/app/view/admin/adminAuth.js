    Ext.define('Ysn.view.admin.adminAuthsearch', {
        extend: 'Ext.panel.Panel',
        xtype: 'adminAuth-search',

        requires: [
            'Ysn.view.admin.adminAuthsearchController', 
	        'Ysn.store.*'
        ],

        controller: 'adminAuth-search',

        frame: false,
        //resizable: true,
        width: 1000,
        minWidth: 1000,
        minHeight: 50,
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
        id: 'adminAuth-search',
        reference: 'adminAuth-search',
        defaults: {
            layout: 'form',
            xtype: 'container',
            defaultType: 'textfield'
        },

        items: [
            {
                xtype: 'combobox',
                labelWidth: 80,
                fieldLabel: Locale.getMsg('조직명'),
                reference: 'company_cd',
                itemId: 'company_cd',
                name: 'company_cd',
                publishes: 'value',
                displayField: 'DEPT_NM',
                valueField: 'DEPT_CD',
                margin: '0 5 0 0',
                store: {
                    type: 'selCompany',
                    autoLoad: true
                },
                minChars: 0,
                width: 300,
                queryMode: 'local',
                listeners: {
                    //change: 'onselCompany'
                }
            },
            {
                xtype: 'textfield',
                name: 'searchAuthId',
                fieldLabel: Locale.getMsg('권한코드'),
                labelAlign: 'right',
                reference: 'searchAuthId',
                itemId: 'searchAuthId',
                margin: '0 5 0 0',
                width: 210
            },
            {
                xtype: 'textfield',
                name: 'searchAuthNm',
                fieldLabel: Locale.getMsg('권한명'),
                labelAlign: 'right',
                reference: 'searchAuthNm',
                itemId: 'searchAuthNm',
                margin: '0 5 0 0',
                width: 300
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

    Ext.define('Ysn.view.admin.adminAuthsearchController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.adminAuth-search',
        init: function () {
            this.lookupReference('company_cd').setValue('YONWOO');
        },
       
        onSubmitClick: function () {
            var pl = Ext.getCmp('adminAuthList');

            pl.getStore().load(
                    {
                        params: {
                            company_cd: this.lookupReference('company_cd').getValue(),
                            searchAuthId: this.lookupReference('searchAuthId').getValue(),
                            searchAuthNm: this.lookupReference('searchAuthNm').getValue() 
                        },
                        callback: function (records, operation, success) {
                           

                        }
                    }
        );
        }


    }); 

    Ext.define('Ysn.view.admin.adminAuthList', {
        extend: 'Ext.grid.Panel',
        xtype: 'adminAuthList',
        requires: [
            
        ],
    
        controller: 'admin-adminAuthList',
        id : 'adminAuthList',
        store: {
            fields: [{ name: 'MODE', type: 'string' },
                     { name: 'COMPANY_CD', type: 'string' },
                     { name: 'AUTH_ID', type: 'string' },
                     { name: 'AUTH_NM', type: 'string' },
                     { name: 'AUTH_DIV', type: 'string' },
                     { name: 'AUTH_TEAM', type: 'string' },
                     { name: 'AUTH_PERS_1', type: 'string' },
                     { name: 'AUTH_PERS_2', type: 'string' },
                     { name: 'AUTH_DESCRIPT', type: 'string' },
                     { name: 'USE_YN', type: 'string' }  ],
            proxy: {
                type: 'ajax',
                url: '/adminAuth/authorityList',
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
            autoLoad:false
		   
        }, 
	    style: { 'borderTop': '1px solid gray' },   
	    /*features: [{
	        ftype: 'summary',
	        dock: 'top'
	    }],*/ 
	    //useArrows: true, 
	    multiSelect: false, 
        //selModel: 'cellmodel',
	    plugins: {
	        //ptype: 'cellediting',
	        //clicksToEdit: 1,
	        ptype: 'rowediting',
	        clicksToMoveEditor: 1,
	        autoCancel: true,
	        listeners: {
	            edit: 'edit'
	        }
	    }, 
	    columns: [
             { text: Locale.getMsg('MODE'), dataIndex: 'MODE', hidden:true },
             { text: Locale.getMsg('권한코드'), width: 80, dataIndex: 'AUTH_ID', editor: {}, sortable: true },
             {
                 text: Locale.getMsg('권한명'), width: 150, dataIndex: 'AUTH_NM', editor: {}, sortable: true,
                 filter: {
                     type: 'string',
                     itemDefaults: {
                         emptyText: Locale.getMsg('검색어입력..')
                     }
                 }
             },
             {
                 text: Locale.getMsg('사업부조회'), width: 100, dataIndex: 'AUTH_DIV', sortable: true,
                 editor: {
                     xtype: 'combo', displayField: 'code', valueField: 'code',
                     store: {
                         fields: ['code'],
                         data: [{ code: 'Y' }, { code: 'N' }],
                         proxy: {
                             type: 'memory',
                             reader: {
                                 type: 'json',
                                 rootProperty: ''
                             }
                         },
                         autoLoad: true
                     }, minChars: 0, queryMode: 'true', typeAhead: true
                 }
             },
             {
                 text: Locale.getMsg('팀조회'), width: 80, dataIndex: 'AUTH_TEAM', editor: {}, sortable: true,
                 editor: {
                     xtype: 'combo', displayField: 'code', valueField: 'code',
                     store: {
                         fields: ['code'],
                         data: [{ code: 'Y' }, { code: 'N' }],
                         proxy: {
                             type: 'memory',
                             reader: {
                                 type: 'json',
                                 rootProperty: ''
                             }
                         }, 
                         autoLoad: true
                     }, minChars: 0, queryMode: 'true', typeAhead: true
                 }
             },
             {
                 text: Locale.getMsg('담당1'), width: 80, dataIndex: 'AUTH_PERS_1', sortable: true,
                 editor: {
                     xtype: 'combo', displayField: 'code', valueField: 'code',
                     store: {
                         fields: ['code'],
                         data: [{ code: 'Y' }, { code: 'N' }],
                         proxy: {
                             type: 'memory',
                             reader: {
                                 type: 'json',
                                 rootProperty: ''
                             }
                         }, 
                         autoLoad: true
                     }, minChars: 0, queryMode: 'true', typeAhead: true
                 }
             },
             {
                 text: Locale.getMsg('담당2'), width: 80, dataIndex: 'AUTH_PERS_2', sortable: true,
                 editor: {
                     xtype: 'combo', displayField: 'code', valueField: 'code',
                     store: {
                         fields: ['code'],
                         data: [{ code: 'Y' }, { code: 'N' }],
                         proxy: {
                             type: 'memory',
                             reader: {
                                 type: 'json',
                                 rootProperty: ''
                             }
                         }, 
                         autoLoad: true
                     }, minChars: 0, queryMode: 'true', typeAhead: true
                 }
             },
             { text: Locale.getMsg('비고'), width: 250, dataIndex: 'AUTH_DESCRIPT', editor: {}, sortable: true },
             {
                 text: Locale.getMsg('사용여부'), width: 100, dataIndex: 'USE_YN', sortable: true,
                 editor: {
                     xtype: 'combo', displayField: 'code', valueField: 'code',
                     store: {
                         fields: ['code'],
                         data: [{ code: 'Y' }, { code: 'N' }],
                         proxy: {
                             type: 'memory',
                             reader: {
                                 type: 'json',
                                 rootProperty: ''
                             }
                         },
                         autoLoad: true
                     }, minChars: 0, queryMode: 'true', typeAhead: true
                 }
             }
	    ],
       height: 300,
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

    Ext.define('Ysn.view.admin.adminAuthListController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.admin-adminAuthList',
        init: function () { 
        },  
        deptAdd: function(){
            var store = this.getView().getStore(); 
            var plugin = this.getView().findPlugin('rowediting');
            plugin.cancelEdit(); 
            var rec = {
                MODE: 'I',
                AUTH_DIV: 'N',
                AUTH_TEAM: 'N',
                AUTH_PERS_1: 'N',
                AUTH_PERS_2: 'N',  
                USE_YN: 'Y'
            };
            store.insert(0, rec);
            plugin.startEdit(0, 0);

               
        },
        edit: function (editor, context, eOpts) { 
            var rec = context.record.data;
            Ext.Ajax.request({
                url: '/adminAuth/authReg',
                method: 'post',
                params: {
                    mode: rec.MODE,
                    auth_id: rec.AUTH_ID,
                    auth_nm: rec.AUTH_NM,
                    auth_div: rec.AUTH_DIV,
                    auth_team: rec.AUTH_TEAM,
                    auth_pers_1: rec.AUTH_PERS_1,
                    auth_pers_2: rec.AUTH_PERS_2,
                    auth_descript: rec.AUTH_DESCRIPT,
                    use_yn: rec.USE_YN 
                },
                success: function (response, opts) {
					if(!Ysn.Util.OnsessOut(response.responseText)) return false;
                },

                failure: function (response, opts) {
                    Ext.Msg.alert('Failed', Locale.getMsg('오류가 발생했습니다.'));
                }

            });
        }
         
    });

    Ext.define('Ysn.view.admin.authUserList', {
        extend: 'Ext.grid.Panel',
        xtype: 'authUserList',
        requires: [

        ],

        controller: 'admin-authUserList',
        id: 'authUserList',
        store: {
            fields: [
                     { name: 'COMPANY_CD', type: 'string' },
                     { name: 'AUTH_ID', type: 'string' },
                     { name: 'USER_CD', type: 'string' },
                     { name: 'USER_NM', type: 'string' },
                     { name: 'DEPT_NM', type: 'string' },
                     { name: 'EMAIL', type: 'string' },
                     { name: 'DESCRIPT', type: 'string' },
                     { name: 'USE_YN', type: 'string' } ],
            proxy: {
                type: 'ajax',
                url: '/AdminAuth/authUserList',
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
        tbar: {

            overflowHandler: 'menu',
            //style: { 'border-top-width': '1px !important;' },
            items: [
		    {
		        xtype: 'label', 
		        text: '권한별 사용자', 
		        style: { 'font-weight': 'bold' }
		    },

			      '->',
           {
		        xtype: 'button',
		        iconCls: 'x-fa fa-plus-square',
		        text: Locale.getMsg('담당자추가'), 
		        handler: 'mngFind'
		    }]
        },
        style: { 'borderTop': '1px solid gray' },
        /*features: [{
	        ftype: 'summary',
	        dock: 'top'
	    }],*/
        //useArrows: true, 
        multiSelect: false,
        selModel: 'cellmodel',
        actions: {
            del: {
                iconCls: 'x-fa  fa-minus-circle',
                //text: Locale.getMsg('저장'),
                tooltip: 'Delete',
                handler: 'delete'
            } 
        },
        columns: [ 
             {
                 text: Locale.getMsg('성명'), width: 150, dataIndex: 'USER_NM', sortable: true,
                 filter: {
                     type: 'string',
                     itemDefaults: {
                         emptyText: Locale.getMsg('검색어입력..')
                     }
                 }
             },
             {
                 text: Locale.getMsg('소속팀'), width: 150, dataIndex: 'DEPT_NM', sortable: true,
                 filter: {
                     type: 'string',
                     itemDefaults: {
                         emptyText: Locale.getMsg('검색어입력..')
                     }
                 }
             },
             {
                 text: Locale.getMsg('E-MAIL'), width: 200, dataIndex: 'EMAIL', sortable: true,
                 filter: {
                     type: 'string',
                     itemDefaults: {
                         emptyText: Locale.getMsg('검색어입력..')
                     }
                 }
             },
            {
                menuDisabled: true, sortable: false,
                xtype: 'actioncolumn',
                itemId: 'deletebtn',
                width: 30,
                items: ['@del']
            }
             
        ],
        height: 300,
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

    Ext.define('Ysn.view.admin.authUserListController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.admin-authUserList',
        init: function () {
        },
        mngFind: function () {
            
            var win = Ext.getCmp('common-searchPartUser');
            var adminAuthList = Ext.getCmp('adminAuthList').getSelectionModel().getSelection();
            if (adminAuthList.length == 0) {
                Ext.Msg.alert('Warning', '권한을 먼저 선택하세요.');
                return false;
            }
            var auth_id = adminAuthList[0].get('AUTH_ID');
            if (!win) {
                win = new Ysn.view.common.searchPartMng();
            }
            var hidfield = win.query('#paentFrm')[0];
            var in_authId = win.query('#auth_id')[0];
            in_authId.setValue(auth_id);
            hidfield.setValue('authUserList');
            Ext.getCmp('admin-adminAuth').add(win);
            win.setPosition(10, 10);
            win.show();
        },
        delete: function (grid, rowIndex, colIndex) { 
            Ext.Msg.confirm('Data Delete', 'Are You Delete?', function (button) {
                if (button == 'yes') {
                    var rec = grid.getStore().getAt(rowIndex);
                    Ext.Ajax.request({
                        url: '/AdminAuth/popupAuthUserDelete',
                        method: 'post',
                        params: {
                            selectAuthId: rec.get('AUTH_ID'),
                            company_cd: rec.get('COMPANY_CD'),
                            selectUserCd: rec.get('USER_CD'),
                            mode: 'D'
                        },
                        success: function (response, opts) {
							if(!Ysn.Util.OnsessOut(response.responseText)) return false;
                            Ext.Msg.alert('Success', '처리하였습니다. ');
                            grid.getStore().reload();
                        },

                        failure: function (response, opts) {
                            Ext.Msg.alert('Failed', '오류가 발생했습니다.');
                        }

                    });
                }
            });
           
        }
    });

    Ext.define('Ysn.view.admin.AuthMenuList', {
        extend: 'Ext.tree.Panel',
        xtype: 'AuthMenuList',
        requires: [
            'Ext.grid.*',
            'Ext.tree.*',
            'Ext.grid.column.Check'
        ],

        controller: 'admin-AuthMenuList',
        id: 'AuthMenuList',
        store: {
            fields: [{ name: 'MODE', type: 'string' },
                     { name: 'COMPANY_CD', type: 'string' },
                     { name: 'AUTH_ID', type: 'string' },
                     { name: 'MENU_ID', type: 'string' },
                     { name: 'MENU_NM', type: 'string' },
                     { name: 'MENU_LEVEL', type: 'string' }, 
                     { name: 'UP_MENU_ID', type: 'string' },
                     { name: 'USE_SCOPE', type: 'string' },
                     { name: 'DEPT_YN', type: 'string' },
                     { name: 'ODEPT_SCOPE', type: 'string' },
                     { name: 'IDEPT_SCOPE', type: 'string' },
                     { name: 'DESCRIPT', type: 'string' }, 
                     { name: 'USE_YN', type: 'string' }, 
                     { name: 'CHILD_CNT', type: 'string' }
            ],
            proxy: {
                type: 'ajax',
                url: '/AdminAuth/getTreeCodeList',
                reader: {
                    type: 'json',
                    rootProperty: 'LIST'
                }
            },
            root: {
                id: 'M_ROOT',
                expanded: true
            },
            lazyFill: false,
            autoLoad: false,
            listeners: {
				listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
							},
                beforeload: function (store, operation, eOpts) {
                    var node = operation.node;
                    var company_cd = '';
                    var auth_id = '';
                    var adminAuthList = Ext.getCmp('adminAuthList').getSelectionModel().getSelection();
                    if (adminAuthList.length != 0) {
                        company_cd = adminAuthList[0].get('COMPANY_CD');
                        auth_id = adminAuthList[0].get('AUTH_ID');
                    } 
                    operation.setParams({
                        company_cd: company_cd,
                        selectAuthId: auth_id,
                        node: node.get('id')
                    });
                }
            }
        },
        tbar: { 
            overflowHandler: 'menu',
            //style: { 'border-top-width': '1px !important;' },
            items: [
		    {
		        xtype: 'label',
		        text: '권한별 메뉴',
		        style: { 'font-weight': 'bold' }
		    },

			      '->'
           /*{
               xtype: 'button',
               iconCls: 'x-fa fa-plus-square',
               text: Locale.getMsg('담당자추가'),
               handler: 'mngFind'
           }*/]
        },
        style: { 'borderTop': '1px solid gray' },
        /*features: [{
	        ftype: 'summary',
	        dock: 'top'
	    }],*/
        reserveScrollbar: true,
        //useArrows: true,
        rootVisible: false,
        multiSelect: false,
        singleExpand: true,
        //selModel: 'cellmodel',
        plugins: [{
            //ptype: 'cellediting',
            //clicksToEdit: 1,
            ptype: 'rowediting',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'edit'
            }
        }],
        columns: [
             { xtype: 'treecolumn', text: Locale.getMsg('메뉴'), width: 250, dataIndex: 'MENU_NM', sortable: true }, 
             { text: Locale.getMsg('레벨'), width: 80, dataIndex: 'MENU_LEVEL', sortable: true },
             {
                 text: Locale.getMsg('사용여부'), width: 80, dataIndex: 'USE_YN', sortable: true, 
                 editor: {
                     xtype: 'combo', displayField: 'code', valueField: 'code',
                     store: {
                         fields: ['code'],
                         data: [{ code: 'Y' }, { code: 'N' }],
                         proxy: {
                             type: 'memory',
                             reader: {
                                 type: 'json',
                                 rootProperty: ''
                             }
                         },
                         autoLoad: true
                     }, minChars: 0, queryMode: 'true', typeAhead: true
                 }
             },
             {
                 text: Locale.getMsg('사용범위'), width: 100, dataIndex: 'USE_SCOPE', sortable: true,
                 renderer: Ysn.Util.ComboRenderer,
                 editor: {
                     xtype: 'combo', displayField: 'CODE_NM', valueField: 'CODE_ID',
                     store: {
                         fields: ['CODE_ID','CODE_NM'], 
                         proxy: {
                             method: "GET",
                             type: 'ajax',
                             url: '/CodeList/TCode?up_code_id=ITEM_SCOPE&lang=' + localeCd,
                             reader: {
                                 type: 'json',
                                 rootProperty: ''
                             }
                         },
							 listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
							},
                         autoLoad: true
                     }, minChars: 0, queryMode: 'remote', typeAhead: true
                 }
                 
             },
             {
                 text: Locale.getMsg('조직권한'), width: 80, dataIndex: 'DEPT_YN', sortable: true,
                  editor: {
                     xtype: 'combo', displayField: 'code', valueField: 'code',
                     store: {
                         fields: ['code'],
                         data: [{ code: 'Y' }, { code: 'N' }],
                         proxy: {
                             type: 'memory',
                             reader: {
                                 type: 'json',
                                 rootProperty: ''
                             }
                         },
                         autoLoad: true
                     }, minChars: 0, queryMode: 'true', typeAhead: true
                 }
             },
             {
                 text: Locale.getMsg('조직범위'), width: 100, dataIndex: 'ODEPT_SCOPE', sortable: true,
                 renderer: Ysn.Util.ComboRenderer,
                 editor: {
                     xtype: 'combo', displayField: 'CODE_NM', valueField: 'CODE_ID',
                     store: {
                         fields: ['CODE_ID', 'CODE_NM'],
                         proxy: {
                             method: "GET",
                             type: 'ajax',
                             url: '/CodeList/TCode?up_code_id=GROUP_SCOPE&lang=' + localeCd,
                             reader: {
                                 type: 'json',
                                 rootProperty: ''
                             }
                         },
						listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
							},
                         autoLoad: true
                     }, minChars: 0, queryMode: 'remote', typeAhead: true
                 }
             },
             {
                 text: Locale.getMsg('다운로드'), width: 80, dataIndex: 'IDEPT_SCOPE', editor: {}, sortable: true,
                 editor: {
                     xtype: 'combo', displayField: 'code', valueField: 'code',
                     store: {
                         fields: ['code'],
                         data: [{ code: 'Y' }, { code: 'N' }],
                         proxy: {
                             type: 'memory',
                             reader: {
                                 type: 'json',
                                 rootProperty: ''
                             }
                         },
                         autoLoad: true
                     }, minChars: 0, queryMode: 'true', typeAhead: true
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

    Ext.define('Ysn.view.admin.AuthMenuListController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.admin-AuthMenuList',
        init: function () {
        },
        edit: function (editor, context, eOpts) {
            var rec = context.record.data;
            Ext.Ajax.request({
                url: '/AdminAuth/authMenuReg',
                method: 'post',
                params: {
                    company_cd: rec.COMPANY_CD,
                    menu_id: rec.MENU_ID,
                    auth_id: rec.AUTH_ID,
                    use_scope: rec.USE_SCOPE,
                    dept_yn: rec.DEPT_YN,
                    odept_scope: rec.ODEPT_SCOPE,
                    idept_scope: rec.IDEPT_SCOPE, 
                    use_yn: rec.USE_YN,
                    mode:  rec.MODE
                },
                success: function (response, opts) {
                  if(!Ysn.Util.OnsessOut(response.responseText)) return false; 
                },

                failure: function (response, opts) {
                    Ext.Msg.alert('Failed', Locale.getMsg('오류가 발생했습니다.'));
                }

            });
        }

    });

    Ext.define('Ysn.view.admin.adminAuth', {
        extend: 'Ext.panel.Panel',
        xtype: 'admin-adminAuth',
        requires: [
            'Ysn.view.admin.adminAuthController',
		    'Ysn.view.common.searchcustomer',
            'Ysn.view.admin.adminAuthsearch',
            'Ysn.view.admin.adminAuthList'
        ],

        controller: 'admin-adminAuth',
        reference: 'admin-adminAuth',
        id: 'admin-adminAuth',
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
	                       xtype: 'adminAuth-search',
	                       reference: 'adminAuthSearch',
	                       itemId: 'adminAuthSearch',
                           scrollable: true,
	                       collapsible: true,
	                       floatable: true,
	                       split: true,
	                       padding: '0 0 0 0',
	                       dock: 'top',
	                       height: 100
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

		   /* {
		        xtype: 'button',
		        iconCls: 'x-fa fa-file-excel-o',
		        text: Locale.getMsg('액셀변환'),
		        handler: 'xlsExport'
		    }/*,*/ {
		        xtype: 'button',
		        iconCls: 'x-fa fa-plus-square',
		        text: Locale.getMsg('권한추가'),
		        handler: 'DeptAdd'
		    }]
        },

        items: [
		    {
		        header: false,
		        title: '권한 등록',
		        region: 'north',
                flex:2,
		        xtype: 'adminAuthList',
		        reference: 'adminAuthList',
		        itemId: 'adminAuthList',
		        listeners: {
		            select: 'itemclick'
		        }

		    },
            {
                title: '권한 별 사용자',
                header: false,
                tools: [
					{ type: 'button', text: '담당자추가' }
                ],
                region: 'west',
                xtype: 'authUserList',
                reference: 'authUserList',
                itemId: 'authUserList',
                flex: 2,
                listeners: {
                    //select: 'itemclick'
                }

            },
             {
                 title: '권한별 메뉴',
                 header: false,
                 flex: 3,
                 region: 'center',
                 xtype: 'AuthMenuList',
                 reference: 'AuthMenuList',
                 itemId: 'AuthMenuList',
                 listeners: {
                     //select: 'itemclick'
                 }

             }
        ]
    });

    ///<reference path="~/Client/ext/build/ext-all-debug.js">
    ///<reference path="~/Client/ext/build/ext-debug.js">
    Ext.define('Ysn.view.admin.adminAuthController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.admin-adminAuth',
        requires: [
	        'Ysn.store.*'
        ],
        init: function () {
            this.lookupReference('adminAuthSearch').setTitle(pageTitle); 
        },

        DeptAdd: function(){
            this.lookupReference('adminAuthList').getController('admin-adminAuthList').deptAdd();
        },
        itemclick: function (view, record, index, e) {
            this.lookupReference('authUserList').getStore().load({params:{
                company_cd: record.get('COMPANY_CD'),
                selectAuthId: record.get('AUTH_ID')
            }
            });
            this.lookupReference('AuthMenuList').getStore().load({
                params: {
                    company_cd: record.get('COMPANY_CD'),
                    selectAuthId: record.get('AUTH_ID'),
                    node: 'M_ROOT'
                }
            });
        },
        xlsExport: function () {

            Ext.getCmp('adminAuthList').saveDocumentAs({
			headerRowCnt: 1,
                type: 'xlsx',
                title: Ext.getCmp('adminAuth-search').getTitle(),
                fileName: Locale.getMsg('권한관리')
            });
        }
    });




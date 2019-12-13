    Ext.define('Ysn.view.admin.adminMenusearch', {
        extend: 'Ext.panel.Panel',
        xtype: 'adminMenu-search',

        requires: [
            'Ysn.view.admin.adminMenusearchController', 
	        'Ysn.store.*'
        ],

        controller: 'adminMenu-search',

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
        id: 'adminMenu-search',
        reference: 'adminMenu-search',
        defaults: {
            layout: 'form',
            xtype: 'container',
            defaultType: 'textfield'
        },

        items: [ 
            {
                xtype: 'textfield',
                name: 'searchMenuId',
                fieldLabel: Locale.getMsg('메뉴코드'),
                labelAlign: 'right',
                reference: 'searchMenuId',
                itemId: 'searchMenuId',
                margin: '0 5 0 0',
                width: 300
            },
            {
                xtype: 'textfield',
                name: 'searchMenuNm',
                fieldLabel: Locale.getMsg('메뉴명'),
                labelAlign: 'right',
                reference: 'searchMenuNm',
                itemId: 'searchMenuNm',
                margin: '0 5 0 0',
                width: 300
            },
            {
                xtype: 'combobox',
                reference: 'searchLevel',
                publishes: 'value',
                fieldLabel: Locale.getMsg('메뉴레벨'),
                labelWidth: 80,
                labelAlign: 'right',
                displayField: 'code',
                valueField: 'code',
                name: 'searchLevel',
                anchor: '-15',
                store: {
                    fields: ['code'],
                    data: [{ code: '0' }, { code: '1' }, { code: '2' }, { code: '3' }],
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

    Ext.define('Ysn.view.admin.adminMenusearchController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.adminMenu-search',
        init: function () { 
            this.lookupReference('searchLevel').setValue(this.lookupReference('searchLevel').getStore().getAt(0).get('code'));
            
        },
       
        onSubmitClick: function () {
            var pl = Ext.getCmp('adminMenuList');

            pl.getStore().load(
                    {
                        params: {
                            searchMenuId: this.lookupReference('searchMenuId').getValue(),
                            searchMenuNm: this.lookupReference('searchMenuNm').getValue(),
                            searchLevel: this.lookupReference('searchLevel').getValue() 
                        },
                        callback: function (records, operation, success) {
                           

                        }
                    }
        );
        }


    }); 

    Ext.define('Ysn.view.admin.adminMenuList', {
        extend: 'Ext.tree.Panel',
        xtype: 'adminMenuList',
        requires: [
            'Ext.grid.*',
            'Ext.tree.*',
            'Ext.grid.column.Check'
        ],
    
        controller: 'admin-adminMenuList',
        id : 'adminMenuList',
        store: {
            fields: [{ name: 'MODE', type: 'string' },
                     { name: 'MENU_ID', type: 'string' },
                     { name: 'MENU_NM', type: 'string' },
                     { name: 'MENU_LEVEL', type: 'string' },
                     { name: 'MENU_ORDER', type: 'string' },
                     { name: 'UP_MENU_ID', type: 'string' },
                     { name: 'MENU_URL', type: 'string' },
                     { name: 'MENU_URL2', type: 'string' },
                     { name: 'MENU_DESCRIPT', type: 'string' },
                     { name: 'USE_YN', type: 'string' },
                     { name: 'CLASS_NAME', type: 'string' },
                     { name: 'CHILD_CNT', type: 'string' }
            ],
            proxy: {
                type: 'ajax',
                url: '/adminMenu/getUpMenuList',
                reader: {
                    type: 'json',
                    rootProperty: 'LIST'
                }
            },
            root: { 
                id: 'root', 
                expanded: true
            }, 
			listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
							},
            lazyFill: false,
            autoLoad: true
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
	    columns : [
             { xtype: 'treecolumn', text: Locale.getMsg('메뉴명'), width: 250, dataIndex: 'MENU_NM', editor: {}, sortable: true },
             { text: Locale.getMsg('메뉴코드'), width: 80, dataIndex: 'MENU_ID', editor: {}, sortable: true },
             { text: Locale.getMsg('메뉴레벨'), width: 80, dataIndex: 'MENU_LEVEL', sortable: true },
             { text: Locale.getMsg('메뉴순서'), width: 80, dataIndex: 'MENU_ORDER', editor: {}, sortable: true },
             { text: Locale.getMsg('메뉴URL'), width: 200, dataIndex: 'MENU_URL2', editor: {}, sortable: true },
             { text: Locale.getMsg('OldURL'), width: 150, dataIndex: 'MENU_URL', sortable: true },
             { text: Locale.getMsg('OldClass'), width: 150, dataIndex: 'CLASS_NAME', sortable: true },
             { text: Locale.getMsg('설명'), width: 150, dataIndex: 'MENU_DESCRIPT', editor: {}, sortable: true }, 
             {
                text: Locale.getMsg('사용여부'), width: 80, dataIndex: 'USE_YN', sortable: true,
                filter: {
                    type: 'string',
                    itemDefaults: {
                        emptyText: Locale.getMsg('검색어입력..')
                    }
                },
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

    Ext.define('Ysn.view.admin.adminMenuListController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.admin-adminMenuList',
        init: function () { 
        },  
        deptAdd: function(){
            var sel_model = this.getView().getSelectionModel();
            if (sel_model.getSelection().length == 0) {
                Ext.Msg.alert('Warning', Locale.getMsg('상위메뉴을 먼저 선택하세요.'));
            } else {
                var plugin = this.getView().findPlugin('rowediting');
                plugin.cancelEdit();
                var node = sel_model.getSelection()[0];
                node.set('leaf', false);
                node.appendChild({
                    leaf: true,
                    UP_MENU_ID: node.get('PREID'),
                    MENU_LEVEL: parseInt(node.get('MENU_LEVEL')) + 1, 
                    USE_YN: 'Y'
                });
                //this.getView().refresh();
                node.expand();
                plugin.startEdit(node.childNodes[node.childNodes.length-1], 0);

                //node.expand();
            }
            //var record = sel_model.getSelection()[0];
        },
        edit: function (editor, context, eOpts) { 
            var rec = context.record.data;
            Ext.Ajax.request({
                url: '/adminMenu/getMenuReg',
                method: 'post',
                params: {
                    menuId: rec.MENU_ID,
                    menuNm: rec.MENU_NM,
                    upMenuId: rec.UP_MENU_ID,
                    menuLevel: rec.MENU_LEVEL,
                    menuOrder: rec.MENU_ORDER,
                    menuUrl2: rec.MENU_URL2,
                    menuDescript: rec.MENU_DESCRIPT,
                    useYn: rec.USE_YN,
                    preId: rec.PREID, 
                    mode: 'M'
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

   

    Ext.define('Ysn.view.admin.adminMenu', {
        extend: 'Ext.panel.Panel',
        xtype: 'admin-adminMenu',
        requires: [
            'Ysn.view.admin.adminMenuController',
		    'Ysn.view.common.searchcustomer',
            'Ysn.view.admin.adminMenusearch',
            'Ysn.view.admin.adminMenuList'
        ],

        controller: 'admin-adminMenu',
        reference: 'admin-adminMenu',
        id: 'admin-adminMenu',
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
	                       xtype: 'adminMenu-search',
	                       reference: 'adminMenuSearch',
	                       itemId: 'adminMenuSearch',
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
		        text: Locale.getMsg('추가'),
		        handler: 'DeptAdd'
		    }]
        },

        items: [
		    {
		        header: false,
		        region: 'center',
		        xtype: 'adminMenuList',
		        reference: 'adminMenuList',
		        itemId: 'adminMenuList',
		        listeners: {
		            //select: 'itemclick'
		        }

		    } 
        ]
    });

    ///<reference path="~/Client/ext/build/ext-all-debug.js">
    ///<reference path="~/Client/ext/build/ext-debug.js">
    Ext.define('Ysn.view.admin.adminMenuController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.admin-adminMenu',
        requires: [
	        'Ysn.store.*'
        ],
        init: function () {
            this.lookupReference('adminMenuSearch').setTitle(pageTitle); 
        },

        DeptAdd: function(){
            this.lookupReference('adminMenuList').getController('admin-adminMenuList').deptAdd();
        },
       
        xlsExport: function () {

            Ext.getCmp('adminMenuList').saveDocumentAs({
			headerRowCnt: 1,
                type: 'xlsx',
                title: Ext.getCmp('adminMenu-search').getTitle(),
                fileName: Locale.getMsg('메뉴관리')
            });
        }
    });




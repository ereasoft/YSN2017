    Ext.define('Ysn.view.admin.adminCodesearch', {
        extend: 'Ext.panel.Panel',
        xtype: 'adminCode-search',

        requires: [
            'Ysn.view.admin.adminCodesearchController', 
	        'Ysn.store.*'
        ],

        controller: 'adminCode-search',

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
        id: 'adminCode-search',
        reference: 'adminCode-search',
        defaults: {
            layout: 'form',
            xtype: 'container',
            defaultType: 'textfield'
        },

        items: [ 
            {
                xtype: 'textfield',
                name: 'searchCodeId',
                fieldLabel: Locale.getMsg('코드'),
                labelAlign: 'right',
                reference: 'searchCodeId',
                itemId: 'searchCodeId',
                margin: '0 5 0 0',
                width: 300
            },
            {
                xtype: 'textfield',
                name: 'searchCodeNm',
                fieldLabel: Locale.getMsg('코드명'),
                labelAlign: 'right',
                reference: 'searchCodeNm',
                itemId: 'searchCodeNm',
                margin: '0 5 0 0',
                width: 300
            },
            {
                xtype: 'combobox',
                reference: 'searchLevel',
                publishes: 'value',
                fieldLabel: Locale.getMsg('코드레벨'),
                labelWidth: 80,
                labelAlign: 'right',
                displayField: 'code',
                valueField: 'code',
                name: 'searchLevel',
                anchor: '-15',
                store: {
                    fields: ['code'],
                    data: [{ code: '0' }, { code: '1' }, { code: '2' }],
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

    Ext.define('Ysn.view.admin.adminCodesearchController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.adminCode-search',
        init: function () { 
            this.lookupReference('searchLevel').setValue(this.lookupReference('searchLevel').getStore().getAt(0).get('code'));
            
        },
       
        onSubmitClick: function () {
            var pl = Ext.getCmp('adminCodeList');

            pl.getStore().load(
                    {
                        params: {
                            searchCodeId: this.lookupReference('searchCodeId').getValue(),
                            searchCodeNm: this.lookupReference('searchCodeNm').getValue(),
                            searchLevel: this.lookupReference('searchLevel').getValue()
                        },
                        callback: function (records, operation, success) {
                           

                        }
                    }
        );
        }


    }); 

    Ext.define('Ysn.view.admin.adminCodeList', {
        extend: 'Ext.tree.Panel',
        xtype: 'adminCodeList',
        requires: [
            'Ext.grid.*',
            'Ext.tree.*',
            'Ext.grid.column.Check'
        ],
    
        controller: 'admin-adminCodeList',
        id : 'adminCodeList',
        store: {
            fields: [{ name: 'MODE', type: 'string' },
                     { name: 'UP_CODE_ID', type: 'string' },
                     { name: 'CODE_ID', type: 'string' },
                     { name: 'PREID', type: 'string' },
                     { name: 'CODE_NM', type: 'string' },
                     { name: 'CODE_KOR', type: 'string' },
                     { name: 'CODE_ENG', type: 'string' },
                     { name: 'CODE_CHN', type: 'string' },
                     { name: 'CODE_JPN', type: 'string' },
                     { name: 'CODE_LEVEL', type: 'string' },
                     { name: 'CODE_ORDER', type: 'string' },
                     { name: 'VALUE_1', type: 'string' },
                     { name: 'VALUE_2', type: 'string' },
                     { name: 'VALUE_3', type: 'string' },
                     { name: 'VALUE_4', type: 'string' },
                     { name: 'VALUE_5', type: 'string' },
                     { name: 'CODE_DESCRIPT', type: 'string' },
                     { name: 'USE_YN', type: 'string' }
            ],
            proxy: {
                type: 'ajax',
                url: '/AdminCode/getUpCodeList',
                reader: {
                    type: 'json',
                    rootProperty: 'LIST'
                }
            },
            root: { 
                id: 'ROOT', 
                expanded: true
            }, 
            lazyFill: false,
			listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
							},
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
             { xtype: 'treecolumn', text: Locale.getMsg('코드'), width: 200, dataIndex: 'CODE_ID', editor: {}, sortable: true },
             { text: Locale.getMsg('한글명'), width: 100, dataIndex: 'CODE_KOR', editor: {}, sortable: true },
             { text: Locale.getMsg('영문명'), width: 100, dataIndex: 'CODE_ENG', editor: {}, sortable: true },
             { text: Locale.getMsg('중국명'), width: 100, dataIndex: 'CODE_CHN', editor: {}, sortable: true },
             { text: Locale.getMsg('일본명'), width: 100, dataIndex: 'CODE_JPN', editor: {}, sortable: true },
             { text: Locale.getMsg('코드레벨'), width: 80, dataIndex: 'CODE_LEVEL', sortable: true },
             { text: Locale.getMsg('코드순서'), width: 80, dataIndex: 'CODE_ORDER', editor: { allowBlank: false}, sortable: true },
             { text: Locale.getMsg('값_1'), width: 60, dataIndex: 'VALUE_1', editor: {}, sortable: true },
             { text: Locale.getMsg('값_2'), width: 60, dataIndex: 'VALUE_2', editor: {}, sortable: true },
             { text: Locale.getMsg('값_3'), width: 60, dataIndex: 'VALUE_3', editor: {}, sortable: true },
             { text: Locale.getMsg('값_4'), width: 60, dataIndex: 'VALUE_4', editor: {}, sortable: true },
             { text: Locale.getMsg('값_5'), width: 60, dataIndex: 'VALUE_5', editor: {}, sortable: true },
             { text: Locale.getMsg('설명'), width: 200, dataIndex: 'CODE_DESCRIPT', editor: {}, sortable: true },
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

    Ext.define('Ysn.view.admin.adminCodeListController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.admin-adminCodeList',
        init: function () { 
        },  
        deptAdd: function(){
            var sel_model = this.getView().getSelectionModel();
            if (sel_model.getSelection().length == 0) {
                Ext.Msg.alert('Warning', Locale.getMsg('상위코드를 먼저 선택하세요.'));
            } else {
                var plugin = this.getView().findPlugin('rowediting');
                plugin.cancelEdit();
                var node = sel_model.getSelection()[0];
                node.set('leaf', false);
                node.appendChild({
                    leaf: true,
                    UP_CODE_ID: node.get('PREID'),
                    CODE_LEVEL: parseInt(node.get('CODE_LEVEL')) + 1,
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
                url: '/AdminCode/getCodeReg',
                method: 'post',
                params: {
                    upCode: rec.UP_CODE_ID,
                    code: rec.CODE_ID,
                    korName: rec.CODE_KOR,
                    engName: rec.CODE_ENG,
                    chnName: rec.CODE_CHN,
                    jpnName: rec.CODE_JPN,
                    codeLevel: rec.CODE_LEVEL,
                    codeOrder: rec.CODE_ORDER,
                    codeValue1: rec.VALUE_1,
                    codeValue2: rec.VALUE_2,
                    codeValue3: rec.VALUE_3,
                    codeValue4: rec.VALUE_4,
                    codeValue5: rec.VALUE_5,
                    descript: rec.CODE_DESCRIPT,
                    useYn: rec.USE_YN,
                    preCode: rec.PREID, 
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

   

    Ext.define('Ysn.view.admin.adminCode', {
        extend: 'Ext.panel.Panel',
        xtype: 'admin-adminCode',
        requires: [
            'Ysn.view.admin.adminCodeController',
		    'Ysn.view.common.searchcustomer',
            'Ysn.view.admin.adminCodesearch',
            'Ysn.view.admin.adminCodeList'
        ],

        controller: 'admin-adminCode',
        reference: 'admin-adminCode',
        id: 'admin-adminCode',
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
	                       xtype: 'adminCode-search',
	                       reference: 'adminCodeSearch',
	                       itemId: 'adminCodeSearch',
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
		        xtype: 'adminCodeList',
		        reference: 'adminCodeList',
		        itemId: 'adminCodeList',
		        listeners: {
		            //select: 'itemclick'
		        }

		    } 
        ]
    });

    ///<reference path="~/Client/ext/build/ext-all-debug.js">
    ///<reference path="~/Client/ext/build/ext-debug.js">
    Ext.define('Ysn.view.admin.adminCodeController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.admin-adminCode',
        requires: [
	        'Ysn.store.*'
        ],
        init: function () {
            this.lookupReference('adminCodeSearch').setTitle(pageTitle); 
        },

        DeptAdd: function(){
            this.lookupReference('adminCodeList').getController('admin-adminCodeList').deptAdd();
        },
       
        xlsExport: function () {

            Ext.getCmp('adminCodeList').saveDocumentAs({
			headerRowCnt: 1,
                type: 'xlsx',
                title: Ext.getCmp('adminCode-search').getTitle(),
                fileName: Locale.getMsg('코드관리')
            });
        }
    });




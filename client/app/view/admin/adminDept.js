    Ext.define('Ysn.view.admin.adminDeptsearch', {
        extend: 'Ext.panel.Panel',
        xtype: 'adminDept-search',

        requires: [
            'Ysn.view.admin.adminDeptsearchController', 
	        'Ysn.store.*'
        ],

        controller: 'adminDept-search',

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
        id: 'adminDept-search',
        reference: 'adminDept-search',
        defaults: {
            layout: 'form',
            xtype: 'container',
            defaultType: 'textfield'
        },

        items: [ 
            {
                xtype: 'textfield',
                name: 'searchDeptId',
                fieldLabel: Locale.getMsg('조직코드'),
                labelAlign: 'right',
                reference: 'searchDeptId',
                itemId: 'searchDeptId',
                margin: '0 5 0 0',
                width: 210
            },
            {
                xtype: 'textfield',
                name: 'searchDeptNm',
                fieldLabel: Locale.getMsg('조직명'),
                labelAlign: 'right',
                reference: 'searchDeptNm',
                itemId: 'searchDeptNm',
                margin: '0 5 0 0',
                width: 210
            },
            {
                xtype: 'combobox',
                reference: 'searchLevel',
                publishes: 'value',
                fieldLabel: Locale.getMsg('조직레벨'),
                labelWidth: 80,
                labelAlign: 'right',
                displayField: 'code',
                valueField: 'code',
                name: 'searchLevel',
                anchor: '-15',
                store: {
                    fields: ['code'],
                    data: [{ code: '1' }, { code: '2' }, { code: '3' }],
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

    Ext.define('Ysn.view.admin.adminDeptsearchController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.adminDept-search',
        init: function () { 
            this.lookupReference('searchLevel').setValue(this.lookupReference('searchLevel').getStore().getAt(0).get('code'));
            
        },
       
        onSubmitClick: function () {
            var pl = Ext.getCmp('adminDeptList');

            pl.getStore().load(
                    {
                        params: {
                            searchDeptId: this.lookupReference('searchDeptId').getValue(),
                            searchDeptNm: this.lookupReference('searchDeptNm').getValue(),
                            searchLevel: this.lookupReference('searchLevel').getValue() 
                        },
                        callback: function (records, operation, success) {
                           

                        }
                    }
        );
        }


    }); 

    Ext.define('Ysn.view.admin.adminDeptList', {
        extend: 'Ext.tree.Panel',
        xtype: 'adminDeptList',
        requires: [
            'Ext.grid.*',
            'Ext.tree.*',
            'Ext.grid.column.Check'
        ],
    
        controller: 'admin-adminDeptList',
        id : 'adminDeptList',
        store: {
            fields: [{ name: 'MODE', type: 'string' },
                     { name: 'COMPANY_CD', type: 'string' },
                     { name: 'COMPANY_NM', type: 'string' },
                     { name: 'DEPT_CD', type: 'string' },
                     { name: 'PREID', type: 'string' },
                     { name: 'DEPT_NM', type: 'string' },
                     { name: 'DEPT_ENG_NM', type: 'string' },
                     { name: 'DEPT_LEVEL', type: 'string' },
                     { name: 'UP_DEPT_CD', type: 'string' },
                     { name: 'DEPT_MGR', type: 'string' },
                     { name: 'DEPT_MGR_NM', type: 'string' },
                     { name: 'DEPT_SDATE', type: 'string', type: 'date', dateFormat: 'Ymd' },
                     { name: 'DEPT_EDATE', type: 'string', type: 'date', dateFormat: 'Ymd' },
                     { name: 'CHILD_CNT', type: 'string' },
                     { name: 'CCTR', type: 'string' },
                     { name: 'PRCTR', type: 'string' },
                     { name: 'SADEPT_YN', type: 'string' },
                     { name: 'USE_YN', type: 'string' }  ],
            proxy: {
                type: 'ajax',
                url: '/AdminDept/getUpMenuList',
                reader: {
                    type: 'json',
                    rootProperty: 'LIST'
                }
            },
            root: {
                text: 'ROOT',
                id: 'D_ROOT',
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
	    singleExpand: false,
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
	    actions: {
	        del: {
	            iconCls: 'x-fa  fa-minus-circle',
                //text: Locale.getMsg('저장'),
	            tooltip: 'Delete',
	            handler: 'delete'
	        },
	        find: {
	            iconCls: 'x-fa  fa-search-plus',
	            //text: Locale.getMsg('저장'),
	            tooltip: 'Find',
	            handler: 'mngFind'
	        }
	    },
	    columns : [
             { xtype: 'treecolumn', text: Locale.getMsg('조직명'), width: 200, dataIndex: 'DEPT_NM', editor: {}, sortable: true },
             { text: Locale.getMsg('조직코드'), width: 80, dataIndex: 'DEPT_CD', editor: {}, sortable: true },
             { text: Locale.getMsg('레벨'), width: 50, dataIndex: 'DEPT_LEVEL', sortable: true },
             { text: Locale.getMsg('영문조직명'), width: 150, dataIndex: 'DEPT_ENG_NM', editor: {}, sortable: true },
             { text: Locale.getMsg('조직의장'), width: 150, dataIndex: 'DEPT_MGR_NM', sortable: true }, 
             {
                menuDisabled: true, sortable: false, 
                 xtype: 'actioncolumn',
                 itemId: 'findbtn',
                 width: 30,
                 items: ['@find']
             },
             { text: Locale.getMsg('법인'), width: 200, dataIndex: 'COMPANY_NM', sortable: true },
             {
                 text: Locale.getMsg('시작일'), width: 100, dataIndex: 'DEPT_SDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                 editor: {
                     xtype: 'datefield',
                     format: 'Y-m-d'
                 },
                 sortable: true
             },
             {
                 text: Locale.getMsg('종료일'), width: 100, dataIndex: 'DEPT_EDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                 editor: {
                     xtype: 'datefield',
                     format: 'Y-m-d'
                 },
                 sortable: true
             },
             {
                 text: Locale.getMsg('영업조직'), width: 80, dataIndex: 'SADEPT_YN', sortable: true,
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
             },
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
            },
            {
                menuDisabled: true, sortable: false,
                xtype: 'actioncolumn',
                itemId: 'deletebtn',
                width: 30,
                items: ['@del']
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

    Ext.define('Ysn.view.admin.adminDeptListController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.admin-adminDeptList',
        init: function () { 
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

        mngFind: function (tree, rowIndex, colIndex) {
            if (this.getView().getSelectionModel().getSelection().length == 0) {
                Ext.Msg.alert('Warning', Locale.getMsg('조직을 먼저 선택하세요.'));
                return false;
            }
            var win = Ext.getCmp('common-searchPartUser');
            if (!win) {
                win = new Ysn.view.common.searchPartMng();
            }
            var hidfield = win.query('#paentFrm')[0]; 
            //win.down('#dept_cd').setValue(tree.getStore().getAt(rowIndex).get('DEPT_CD'));
            hidfield.setValue('adminDeptList');
            Ext.getCmp('admin-adminDept').add(win);
            win.setPosition(10, 10);
            win.show();
        },

        deptAdd: function(){
            var sel_model = this.getView().getSelectionModel();
            if (sel_model.getSelection().length == 0) {
                Ext.Msg.alert('Warning', Locale.getMsg('상위조직을 먼저 선택하세요.'));
            } else {
                var plugin = this.getView().findPlugin('rowediting');
                plugin.cancelEdit();
                var node = sel_model.getSelection()[0];
                node.set('leaf', false);
                node.appendChild({
                    leaf: true,
                    UP_DEPT_CD: node.get('PREID'),
                    DEPT_LEVEL: parseInt(node.get('DEPT_LEVEL')) + 1,
                    COMPANY_CD: node.get('COMPANY_CD'),
                    COMPANY_NM: node.get('COMPANY_NM'),
                    SADEPT_YN: 'N',
                    USE_YN: 'N'
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
                url: '/AdminDept/getMenuReg',
                method: 'post',
                params: {
                    deptName: rec.DEPT_NM,
                    deptId: rec.DEPT_CD,
                    level: rec.DEPT_LEVEL,
                    engName: rec.DEPT_ENG_NM,
                    mgrName: rec.DEPT_MGR_NM,
                    startDate: Ext.Date.format(rec.DEPT_SDATE, 'Ymd'),
                    endDate: Ext.Date.format(rec.DEPT_EDATE, 'Ymd'),
                    sadeptYn: rec.SADEPT_YN,
                    useYn: rec.USE_YN,
                    upDeptCd: rec.UP_DEPT_CD,
                    mgrCd: rec.DEPT_MGR,
                    preId: rec.PREID,
                    company_cd: rec.COMPANY_CD,
                    mode: 'M'
                },
                success: function (response, opts) {
					if(!Ysn.Util.OnsessOut(response.responseText)) return false;
                },

                failure: function (response, opts) {
                    Ext.Msg.alert('Failed', Locale.getMsg('오류가 발생했습니다.'));
                }

            });
        },
        delete: function (tree, rowIndex, colIndex) {
            var rec = tree.getStore().getAt(rowIndex);
            if (rec.get('CHILD_CNT') != '0') {
                Ext.Msg.alert('Warning', '하위조직이 존재합니다.');
                return false;
            }
            Ext.Msg.confirm('Data Delete', 'Are You Delete?', function (button) {
                if (button == 'yes') {
                    var rec = tree.getStore().getAt(rowIndex);
                    Ext.Ajax.request({
                        url: '/AdminDept/getMenuReg',
                        method: 'post',
                        params: {
                            preId: rec.get('PREID'),
                            company_cd: rec.get('COMPANY_CD'),
                            mode: 'D'
                        },
                        success: function (response, opts) {
							if(!Ysn.Util.OnsessOut(response.responseText)) return false;
                            rec.parentNode.removeChild(rec);
                        },

                        failure: function (response, opts) {
                            Ext.Msg.alert('Failed', '오류가 발생했습니다.');
                        }

                    });
                }
            });

            Ext.Ajax.request({
                url: '/AdminDept/getMenuReg',
                method: 'post',
                params: { 
                    preId: rec.PREID,
                    company_cd: rec.COMPANY_CD,
                    mode: 'D'
                },
                success: function (response, opts) {
					if(!Ysn.Util.OnsessOut(response.responseText)) return false;
                    context.parentNode.expand();
                },

                failure: function (response, opts) {
                    Ext.Msg.alert('Failed', Locale.getMsg('오류가 발생했습니다.'));
                }

            });
        }
    });

   

    Ext.define('Ysn.view.admin.adminDept', {
        extend: 'Ext.panel.Panel',
        xtype: 'admin-adminDept',
        requires: [
            'Ysn.view.admin.adminDeptController',
		    'Ysn.view.common.searchcustomer',
            'Ysn.view.admin.adminDeptsearch',
            'Ysn.view.admin.adminDeptList'
        ],

        controller: 'admin-adminDept',
        reference: 'admin-adminDept',
        id: 'admin-adminDept',
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
	                       xtype: 'adminDept-search',
	                       reference: 'adminDeptSearch',
	                       itemId: 'adminDeptSearch',
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
		        xtype: 'adminDeptList',
		        reference: 'adminDeptList',
		        itemId: 'adminDeptList',
		        listeners: {
		            //select: 'itemclick'
		        }

		    } 
        ]
    });

    ///<reference path="~/Client/ext/build/ext-all-debug.js">
    ///<reference path="~/Client/ext/build/ext-debug.js">
    Ext.define('Ysn.view.admin.adminDeptController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.admin-adminDept',
        requires: [
	        'Ysn.store.*'
        ],
        init: function () {
            this.lookupReference('adminDeptSearch').setTitle(pageTitle); 
        },

        DeptAdd: function(){
            this.lookupReference('adminDeptList').getController('admin-adminDeptList').deptAdd();
        },
       
        xlsExport: function () {

            Ext.getCmp('adminDeptList').saveDocumentAs({
			headerRowCnt: 1,
                type: 'xlsx',
                title: Ext.getCmp('adminDept-search').getTitle(),
                fileName: Locale.getMsg('조직관리')
            });
        }
    });




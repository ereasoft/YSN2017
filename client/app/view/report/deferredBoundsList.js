    Ext.define('Ysn.view.report.deferredBoundssearch', {
        extend: 'Ext.panel.Panel',
        xtype: 'deferredBounds-search',

        requires: [
            'Ysn.view.report.deferredBoundssearchController', 
	        'Ysn.store.*'
        ],

        controller: 'deferredBounds-search',

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
        id: 'deferredBounds-search',
        reference: 'deferredBounds-search',
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
                                var bizCd = Ext.getCmp('deferredBounds-search').down('#bizGroup');
                                if (store.data.items.length < 2) {
                                    Ext.getCmp('deferredBounds-search').down('#user_cd').store.load({ params: { dept_cd: bizCd.getValue(), up_dept_cd: '' } });
                                } else {
                                    Ext.getCmp('deferredBounds-search').down('#user_cd').store.load({ params: { dept_cd: '', up_dept_cd: bizCd.getValue() } });
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
            labelWidth: 80,
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
            reference: 'bad_ar_yn',
            labelWidth: 100,
            itemId: 'bad_ar_yn',
            publishes: 'value',
            fieldLabel: Locale.getMsg('악성채권여부'),
            labelAlign: 'right',
            displayField: 'name',
            valueField: 'code',
            name: 'bad_ar_yn',
            anchor: '-15',
            store: {
                fields: ['name','code'],
                data: [{ name: Locale.getMsg('전체'), code: '' }, { name: Locale.getMsg('악성'), code: 'Y' }, { name: Locale.getMsg('정상'), code:'N' }],
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
        }, {
            fieldLabel: Locale.getMsg('기준일자'),
            labelAlign: 'right',
            labelWidth: 80,
            width: 210,
            xtype: 'datefield',
            name: 'base_date',
            reference: 'base_date',
            itemId: 'base_date',
            format: 'Y-m-d',
            value: new Date(),
            maxValue: new Date(),
            margin: '0 5 0 0'
        }, {
            rowspan: 4,
            xtype: 'button',
            text: Locale.getMsg('검색'),
            width: 60,
            height: 40,
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
        },{
            xtype: 'combobox',
            labelWidth: 80,
             reference: 'unit',
             publishes: 'value',
             fieldLabel: Locale.getMsg('단위'), 
             labelAlign: 'right',
             displayField: 'name',
             valueField: 'code',
             name: 'unit',
             anchor: '-15',
             store: {
                 fields: ['name','code'],
                 data: [{ name: Locale.getMsg('억원'), code: '100000000' }, { name: Locale.getMsg('백만원'), code: '1000000' },{ name: Locale.getMsg('천원'), code: '1000' },{ name: Locale.getMsg('원'), code: '1' }],
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
    }
        ] 
    });

    Ext.define('Ysn.view.report.deferredBoundssearchController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.deferredBounds-search',
        init: function () {
            this.lookupReference('bizGroup').store.load();
            this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true));
            this.lookupReference('bad_ar_yn').setValue('');
            this.lookupReference('unit').setValue(this.lookupReference('unit').getStore().getAt(2).get('code')); 
             
		    if(auth_id != 'A001'){
		   //  this.lookupReference('bizGroup').setConfig({'readOnly':true});
		   //  if(dept_level == '4') this.lookupReference('deptGroup').setConfig({'readOnly':true});
	     }
        },
        openWindow: function () {
            var win = Ext.getCmp('commonSearchcustomer');
            if (!win) {
                win = new Ysn.view.common.searchcustomer();
            }
            var hidfield = win.query('#paentFrm')[0];
            hidfield.setValue('deferredBounds-search');
		    win.down('#cust_nm').setValue(this.lookupReference('cust_nm').getValue());
            Ext.getCmp('report-deferredBounds').add(win);
            win.setPosition(20, -150);
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
            var pl = Ext.getCmp('deferredBoundsList');

            pl.getStore().load(
                    {
                        params: {
                            deptGroup: this.lookupReference('deptGroup').getValue(),
                            bizGroup: this.lookupReference('bizGroup').getValue(),
                            user_cd: this.lookupReference('userGroup').getValue(),
                            cust_cd: this.lookupReference('cust_cd').getValue(), 
                            base_date: Ext.Date.format(this.lookupReference('base_date').getValue(),'Y-m-d'), 
						    unit: this.lookupReference('unit').getValue(),
						    bad_ar_yn: this.lookupReference('bad_ar_yn').getValue()
                        },
                        callback: function (records, operation, success) {
                           

                        }
                    }
        );
        }


    });


    Ext.define('Ysn.view.report.deferredBoundsList', {
        extend: 'Ext.grid.Panel',
        xtype: 'deferredBoundsList',
        requires: [
            'Ysn.view.report.deferredBoundsListController', 
		    'Ysn.store.deferredBoundsList',
		    'Ext.grid.filters.Filters'
        ],
    
        controller: 'report-deferredBoundsList',     
	    store: {
	        type: 'deferredBoundsList',
		    autoLoad: false,
            autoDestroy: true
        }, 
	    style: { 'borderTop': '1px solid gray' },

	    loadMask: true,
	    enableLocking: true,
	    id: 'deferredBoundsList',
        columnLines: true,
	    multiColumnSort: true, 
	    plugins: ['gridfilters', 'pmh-grid-exporter'],
	    /*features: [{
	        ftype: 'summary',
	        dock: 'top'
	    }],*/
	    columns :[
                 {
                     text: Locale.getMsg('영업팀'), width: 80, dataIndex: 'UP_DEPT_NM', sortable: true,
                     filter: {
                         type: 'string',
                         itemDefaults: {
                             emptyText: Locale.getMsg('검색어입력..')
                         }
                     }
                 },
                 {
                     text: Locale.getMsg('영업파트'), width: 100, dataIndex: 'DEPT_NM', sortable: true,
                     filter: {
                         type: 'string',
                         itemDefaults: {
                             emptyText: Locale.getMsg('검색어입력..')
                         }
                     }
                 },
                 {
                     text: Locale.getMsg('영업담당'), width: 80, dataIndex: 'USER_NM', sortable: true,
                     filter: {
				         type: 'string',
				         itemDefaults: {
					        emptyText: Locale.getMsg('검색어입력..')
				        }
                     }
                 },
                 { text: Locale.getMsg('거래처'), width: 100, dataIndex: 'CUST_NM', sortable: true },
                 { text: Locale.getMsg('결재조건'), width: 100, dataIndex: 'TRMS_PAY_NM', sortable: true },
                 { text: "미수총액", width: 150, dataIndex: 'AMOUNT_1', sortable: true, renderer: 'changeDbl' },
                 { text: "1일~30일", width: 150, dataIndex: 'AMOUNT_2', sortable: true, renderer: 'changeDbl' },
                 { text: "31일~60일", width: 150, dataIndex: 'AMOUNT_3', sortable: true, renderer: 'changeDbl' },
                 { text: "61일~90일", width: 150, dataIndex: 'AMOUNT_4', sortable: true, renderer: 'changeDbl' },
                 { text: "91일~120일", width: 150, dataIndex: 'AMOUNT_5', sortable: true, renderer: 'changeDbl' },
                 { text: "121일~150일", width: 150, dataIndex: 'AMOUNT_6', sortable: true, renderer: 'changeDbl' },
                 { text: "151일~180일", width: 150, dataIndex: 'AMOUNT_7', sortable: true, renderer: 'changeDbl' },
                 { text: "180일이상", width: 150, dataIndex: 'AMOUNT_8', sortable: true, renderer: 'changeDbl' }
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

    Ext.define('Ysn.view.report.deferredBoundsListController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.report-deferredBoundsList',
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
        }
    });

   

    Ext.define('Ysn.view.report.deferredBounds', {
        extend: 'Ext.panel.Panel',
        xtype: 'report-deferredBounds',
        requires: [
            'Ysn.view.report.deferredBoundsController',
		    'Ysn.view.common.searchcustomer',
            'Ysn.view.report.deferredBoundssearch',
            'Ysn.view.report.deferredBoundsList'
        ],

        controller: 'report-deferredBounds',
        reference: 'report-deferredBounds',
        id: 'report-deferredBounds',
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
	                       xtype: 'deferredBounds-search',
	                       reference: 'deferredBoundsSearch',
	                       itemId: 'deferredBoundsSearch',
                           scrollable: true,
	                       collapsible: true,
	                       floatable: true,
	                       split: true,
	                       padding: '0 0 0 0',
	                       dock: 'top',
	                       height: 180
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
		        text: Locale.getMsg('신규등록'),
		        handler: 'frmClear'
		    }*/]
        },

        items: [
		    {
		        header: false,
		        region: 'center',
		        xtype: 'deferredBoundsList',
		        reference: 'deferredBoundsList',
		        itemId: 'deferredBoundsList',
		        listeners: {
		            //select: 'itemclick'
		        }

		    } 
        ]
    });

    ///<reference path="~/Client/ext/build/ext-all-debug.js">
    ///<reference path="~/Client/ext/build/ext-debug.js">
    Ext.define('Ysn.view.report.deferredBoundsController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.report-deferredBounds',
        requires: [
	        'Ysn.store.*'
        ],
        init: function () {
            this.lookupReference('deferredBoundsSearch').setTitle(pageTitle); 
        },
       
        xlsExport: function () {

            Ext.getCmp('deferredBoundsList').saveDocumentAs({
			headerRowCnt: 1,
                type: 'xlsx',
                title: Ext.getCmp('deferredBounds-search').getTitle(),
                fileName: '미수채권현황'
            });
        }
    });




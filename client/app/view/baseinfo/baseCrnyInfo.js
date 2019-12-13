    Ext.define('Ysn.view.baseInfo.baseCrnyInfosearch', {
        extend: 'Ext.panel.Panel',
        xtype: 'baseCrnyInfo-search',

        requires: [
            'Ysn.view.baseInfo.baseCrnyInfosearchController', 
	        'Ysn.store.*'
        ],

        controller: 'baseCrnyInfo-search',

        frame: false,
        //resizable: true,
        width: 1000,
        minWidth: 1000,
        minHeight: 100,
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
        id: 'baseCrnyInfo-search',
        reference: 'baseCrnyInfo-search',
        defaults: {
            layout: 'form',
            xtype: 'container',
            defaultType: 'textfield'
        },

        items: [
            {
                fieldLabel: Locale.getMsg('기준년도'),
                xtype: 'combobox',
                reference: 'base_yr',
                publishes: 'value',
                width: 200,
                labelAlign: 'right',
                displayField: 'YEAR',
                valueField: 'VAL',
                name: 'base_yr',
                itemId: 'base_yr',
                maskOnDisable: true,
                anchor: '-15',
                store: {
                    type: 'year'
                },
                minChars: 0,
                queryMode: 'local',
                margin: '0 5 0 0'
            },
            {
                xtype: 'combobox',
                name: 'base_crny',
                fieldLabel: Locale.getMsg('통화코드'),
                labelAlign: 'right',
                reference: 'base_crny',
                displayField: 'CODE_NM',
                valueField: 'CODE_ID',
                name: 'base_crny',
                anchor: '-15',
                store: {
                    type: 'TcodeAll'
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

    Ext.define('Ysn.view.baseInfo.baseCrnyInfosearchController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.baseCrnyInfo-search',
        init: function () {
            this.lookupReference('base_crny').store.load({ params: { up_code_id: 'CRNY_TYPE' } });
            this.lookupReference('base_crny').setValue(''); 
            var Today = new Date();
            //this.lookupReference('sdate').setValue(Today.getFullYear() + '-' + ('0' + (Today.getMonth() + 1)).slice(-2) + '-' + '01');
            this.lookupReference('base_yr').store.load();
            this.lookupReference('base_yr').setValue(Today.getFullYear());
        },
       
        onSubmitClick: function () {
            var pl = Ext.getCmp('baseCrnyInfoList');

            pl.getStore().load(
                    {
                        params: {
                            base_crny: this.lookupReference('base_crny').getValue(),
                            base_yr: this.lookupReference('base_yr').getValue() 
                        },
                        callback: function (records, operation, success) {
                           

                        }
                    }
        );
        }


    });


    Ext.define('Ysn.view.baseInfo.baseCrnyInfoList', {
        extend: 'Ext.grid.Panel',
        xtype: 'baseCrnyInfoList',
        requires: [
            'Ysn.view.baseInfo.baseCrnyInfoListController', 
		    'Ysn.store.baseCrnyInfoList',
		    'Ext.grid.filters.Filters'
        ],
    
        controller: 'baseInfo-baseCrnyInfoList',     
	    store: {
	        type: 'baseCrnyInfoList',
		    autoLoad: false,
            autoDestroy: true
        }, 
	    style: { 'borderTop': '1px solid gray' },

	    loadMask: true,
	    enableLocking: true,
	    id: 'baseCrnyInfoList',
        columnLines: true,
	    multiColumnSort: true, 
	    plugins: ['gridfilters', 'pmh-grid-exporter',
                 {
                     ptype: 'cellediting',
                     clicksToEdit: 1,
                     listeners: {
                         //edit: 'cellEdit'
                     }
                 }
	    ],
	    /*features: [{
	        ftype: 'summary',
	        dock: 'top'
	    }],*/
	    selModel: 'cellmodel',
	    actions: {
	        modify: {
	            iconCls: 'x-fa  fa-check-circle',
                //text: Locale.getMsg('저장'),
	            tooltip: 'Modify',
	            handler: 'modify'
	        }
	    },
	    columns : [
             {
                 text: Locale.getMsg('기준년도'), width: 80, dataIndex: 'BASE_YR', sortable: true,
                 filter: {
                     type: 'string',
                     itemDefaults: {
                         emptyText: Locale.getMsg('검색어입력..')
                     }
                 }
             },
                  {
                      text: Locale.getMsg('통화코드'), width: 120, dataIndex: 'BASE_CRNY', sortable: true,
                      filter: {
                          type: 'string',
                          itemDefaults: {
                              emptyText: Locale.getMsg('검색어입력..')
                          }
                      }, 
                          editor: {
                              xtype: 'combo', displayField: 'CODE_NM', valueField: 'CODE_ID', 
                              store: {
                                      model: 'Ysn.model.schtcode',
                                      storeId: 'Tcode',

                                      proxy: {
                                          method: "GET",
                                          type: 'ajax',
                                          url: '/CodeList/TCode?up_code_id=CRNY_TYPE',
                                          reader: {
                                              type: 'json',
                                              rootProperty: ''
                                          }
                                      },
                                      listeners: {
                                          load: function (store) {
                                              //store.insert(0, {CODE_ID: '',CODE_NM: Locale.getMsg('선택')});
                                          }
                                      },
                                      autoLoad: true,
                                      autoDestroy: true
                              }, minChars: 0, queryMode: 'remote', typeAhead: true
                          }
                  },
                  {
                      text: Locale.getMsg('기준환율'), width: 200, dataIndex: 'EXCH_RATE', sortable: true, renderer: 'changeDbl',
                      filter: {
                          type: 'string',
                          itemDefaults: {
                              emptyText: Locale.getMsg('검색어입력..')
                          }
                      }, editor: 'textfield'
                  },
                  {
                      text: Locale.getMsg('순서'), width: 80, dataIndex: 'CRNY_ORDER', sortable: true,
                      filter: {
                          type: 'string',
                          itemDefaults: {
                              emptyText: Locale.getMsg('검색어입력..')
                          }
                      }, editor: 'textfield'
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
                          xtype: 'combo', displayField: 'name', valueField: 'code', 
                          store: {
                              fields: ['name', 'code'],
                              data: [{ name: 'Y', code: 'Y' }, { name: 'N', code: 'N' }],
                              proxy: {
                                  type: 'memory',
                                  reader: {
                                      type: 'json',
                                      rootProperty: ''
                                  }
                              },
                              autoLoad: true
                          }, minChars: 0, queryMode: 'remote', typeAhead: true
                      }
                  },
                  {
                      text: Locale.getMsg('저장'),
                      //hidden: false,
                      menuDisabled: true,
                      sortable: false,
                      itemId: 'modifybtn',
                      xtype: 'actioncolumn',
                      width: 50,
                      items: ['@modify']
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

    Ext.define('Ysn.view.baseInfo.baseCrnyInfoListController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.baseInfo-baseCrnyInfoList',
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
        modify: function (grid, rowIndex, colIndex) {

            Ext.Msg.confirm('Data Modify', 'Are You Modify?', function (button) {
                if (button == 'yes') {
                    var rec = grid.getStore().getAt(rowIndex);
                    Ext.Ajax.request({
                        url: '/BaseInfo/baseCrnyInfoUpdate',
                        method: 'post',
                        params: { base_yr: rec.get('BASE_YR'), base_crny: rec.get('BASE_CRNY'), base_rate: rec.get('EXCH_RATE'), crny_order: rec.get('CRNY_ORDER'), use_yn: rec.get('USE_YN') },
                        success: function (response, opts) {
							if(!Ysn.Util.OnsessOut(response.responseText)) return false;
                           // grid.getStore().reload();
                        },

                        failure: function (response, opts) {
                            Ext.Msg.alert('Failed', '오류가 발생했습니다.');
                        }

                    });
                }
            });
        }
    });

   

    Ext.define('Ysn.view.baseInfo.baseCrnyInfo', {
        extend: 'Ext.panel.Panel',
        xtype: 'baseInfo-baseCrnyInfo',
        requires: [
            'Ysn.view.baseInfo.baseCrnyInfoController',
		    'Ysn.view.common.searchcustomer',
            'Ysn.view.baseInfo.baseCrnyInfosearch',
            'Ysn.view.baseInfo.baseCrnyInfoList'
        ],

        controller: 'baseInfo-baseCrnyInfo',
        reference: 'baseInfo-baseCrnyInfo',
        id: 'baseInfo-baseCrnyInfo',
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
	                       xtype: 'baseCrnyInfo-search',
	                       reference: 'baseCrnyInfoSearch',
	                       itemId: 'baseCrnyInfoSearch',
                           scrollable: true,
	                       collapsible: true,
	                       floatable: true,
	                       split: true,
	                       padding: '0 0 0 0',
	                       dock: 'top',
	                       height: 50
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
		    }, {
		        xtype: 'button',
		        iconCls: 'x-fa fa-plus-square',
		        text: Locale.getMsg('신규등록'),
		        handler: 'dataAdd'
		    }]
        },

        items: [
		    {
		        header: false,
		        region: 'center',
		        xtype: 'baseCrnyInfoList',
		        reference: 'baseCrnyInfoList',
		        itemId: 'baseCrnyInfoList',
		        listeners: {
		            //select: 'itemclick'
		        }

		    } 
        ]
    });

    ///<reference path="~/Client/ext/build/ext-all-debug.js">
    ///<reference path="~/Client/ext/build/ext-debug.js">
    Ext.define('Ysn.view.baseInfo.baseCrnyInfoController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.baseInfo-baseCrnyInfo',
        requires: [
	        'Ysn.store.*'
        ],
        init: function () {
            this.lookupReference('baseCrnyInfoSearch').setTitle(pageTitle); 
        },
        dataAdd: function(){
            this.lookupReference('baseCrnyInfoList').getStore().insert(0, {
                BASE_YR: this.lookupReference('baseCrnyInfoSearch').lookupReference('base_yr').getValue(),
                BASE_CRNY:'',
                EXCH_RATE: '',
                CRNY_ORDER: '',
                USE_YN: 'Y'
            });
            this.lookupReference('baseCrnyInfoList').findPlugin('cellediting').startEditByPosition({ row: 0, column: 1 });
        }, 
        xlsExport: function () {

            Ext.getCmp('baseCrnyInfoList').saveDocumentAs({
			headerRowCnt: 1,
                type: 'xlsx',
                title: Ext.getCmp('baseCrnyInfo-search').getTitle(),
                fileName: Locale.getMsg('환율정보')
            });
        }
    });




    Ext.define('Ysn.view.baseInfo.nationInfosearch', {
        extend: 'Ext.panel.Panel',
        xtype: 'nationInfo-search',

        requires: [
            'Ysn.view.baseInfo.nationInfosearchController', 
	        'Ysn.store.*'
        ],

        controller: 'nationInfo-search',

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
        id: 'nationInfo-search',
        reference: 'nationInfo-search',
        defaults: {
            layout: 'form',
            xtype: 'container',
            defaultType: 'textfield'
        },

        items: [
            {
                xtype: 'combobox',
                reference: 'nat_cd',
                publishes: 'value',
                fieldLabel: '국가코드',
                labelAlign: 'right',
                displayField: 'NAT_NM',
                valueField: 'NAT_CD',
                name: 'nat_cd',
                anchor: '-15',
                store: {
                    type: 'nationAll'
                },
                minChars: 0,
                queryMode: 'local',

                margin: '0 5 0 0'
            },
            {
                xtype: 'textfield',
                name: 'nat_nm',
                fieldLabel: Locale.getMsg('국가명'),
                labelAlign: 'right',
                reference: 'nat_nm',
                itemId: 'nat_nm',
                margin: '0 5 0 0',
                width: 210
            },
            {
                xtype: 'textfield',
                name: 'nat_eng_nm',
                fieldLabel: Locale.getMsg('국가영문명'),
                labelAlign: 'right',
                reference: 'nat_eng_nm',
                itemId: 'nat_eng_nm',
                margin: '0 5 0 0',
                width: 210
            },
            {
                xtype: 'combobox',
                reference: 'use_yn',
                publishes: 'value',
                fieldLabel: Locale.getMsg('사용여부'),
                labelWidth: 80,
                labelAlign: 'right',
                displayField: 'name',
                valueField: 'code',
                name: 'use_yn',
                anchor: '-15',
                store: {
                    fields: ['name', 'code'],
                    data: [{ name: Locale.getMsg('전체'), code: '' }, { name: Locale.getMsg('사용'), code: 'Y' }, { name: Locale.getMsg('미사용'), code: 'N' }],
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

    Ext.define('Ysn.view.baseInfo.nationInfosearchController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.nationInfo-search',
        init: function () {
            this.lookupReference('nat_cd').store.load();
            this.lookupReference('nat_cd').setValue('');
            this.lookupReference('use_yn').setValue('');
            
        },
       
        onSubmitClick: function () {
            var pl = Ext.getCmp('nationInfoList');

            pl.getStore().load(
                    {
                        params: {
                            nat_cd: this.lookupReference('nat_cd').getValue(),
                            nat_nm: this.lookupReference('nat_nm').getValue(),
                            nat_eng_nm: this.lookupReference('nat_eng_nm').getValue(),
                            use_yn: this.lookupReference('use_yn').getValue() 
                        },
                        callback: function (records, operation, success) {
                           

                        }
                    }
        );
        }


    });


    Ext.define('Ysn.view.baseInfo.nationInfoList', {
        extend: 'Ext.grid.Panel',
        xtype: 'nationInfoList',
        requires: [
            'Ysn.view.baseInfo.nationInfoListController', 
		    'Ysn.store.nationInfoList',
		    'Ext.grid.filters.Filters'
        ],
    
        controller: 'baseInfo-nationInfoList',     
	    store: {
	        type: 'nationInfoList',
		    autoLoad: false,
            autoDestroy: true
        }, 
	    style: { 'borderTop': '1px solid gray' },

	    loadMask: true,
	    enableLocking: true,
	    id: 'nationInfoList',
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
                 text: Locale.getMsg('국가코드'), width: 80, dataIndex: 'NAT_CD', sortable: true,
                 filter: {
                     type: 'string',
                     itemDefaults: {
                         emptyText: Locale.getMsg('검색어입력..')
                     }
                 }
             },
                  {
                      text: Locale.getMsg('국가명'), width: 120, dataIndex: 'NAT_NM', sortable: true, editor: {},
                      filter: {
                          type: 'string',
                          itemDefaults: {
                              emptyText: Locale.getMsg('검색어입력..')
                          }
                      } 
                  },
                  {
                      text: Locale.getMsg('국가영문명'), width: 200, dataIndex: 'NAT_ENG_NM', sortable: true, editor: {},
                      filter: {
                          type: 'string',
                          itemDefaults: {
                              emptyText: Locale.getMsg('검색어입력..')
                          }
                      }
                  },
                  {
                      text: Locale.getMsg('순서'), width: 80, dataIndex: 'NAT_ORDER', sortable: true, editor: {},
                      filter: {
                          type: 'string',
                          itemDefaults: {
                              emptyText: Locale.getMsg('검색어입력..')
                          }
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
                          xtype: 'combo', displayField: 'name', valueField: 'code', 
                          store: {
                              fields: ['name', 'code'],
                              data: [{ name: Locale.getMsg('사용'), code: 'Y' }, { name: Locale.getMsg('미사용'), code: 'N' }],
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
                      text: Locale.getMsg('변경'),
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

    Ext.define('Ysn.view.baseInfo.nationInfoListController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.baseInfo-nationInfoList',
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
                        url: '/BaseInfo/nationInfoUpdate',
                        method: 'post',
                        params: { nat_cd: rec.get('NAT_CD'), use_yn: rec.get('USE_YN'), nat_nm: rec.get('NAT_NM'), nat_eng_nm: rec.get('NAT_ENG_NM'), nat_order: rec.get('NAT_ORDER') },
                        success: function (response, opts) { 
							if(!Ysn.Util.OnsessOut(response.responseText)) return false;
                        },

                        failure: function (response, opts) {
                            Ext.Msg.alert('Failed', Locale.getMsg('오류가 발생했습니다.'));
                        }

                    });
                }
            });
        }
    });

   

    Ext.define('Ysn.view.baseInfo.nationInfo', {
        extend: 'Ext.panel.Panel',
        xtype: 'baseInfo-nationInfo',
        requires: [
            'Ysn.view.baseInfo.nationInfoController',
		    'Ysn.view.common.searchcustomer',
            'Ysn.view.baseInfo.nationInfosearch',
            'Ysn.view.baseInfo.nationInfoList'
        ],

        controller: 'baseInfo-nationInfo',
        reference: 'baseInfo-nationInfo',
        id: 'baseInfo-nationInfo',
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
	                       xtype: 'nationInfo-search',
	                       reference: 'nationInfoSearch',
	                       itemId: 'nationInfoSearch',
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
		        xtype: 'nationInfoList',
		        reference: 'nationInfoList',
		        itemId: 'nationInfoList',
		        listeners: {
		            //select: 'itemclick'
		        }

		    } 
        ]
    });

    ///<reference path="~/Client/ext/build/ext-all-debug.js">
    ///<reference path="~/Client/ext/build/ext-debug.js">
    Ext.define('Ysn.view.baseInfo.nationInfoController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.baseInfo-nationInfo',
        requires: [
	        'Ysn.store.*'
        ],
        init: function () {
            this.lookupReference('nationInfoSearch').setTitle(pageTitle); 
        },
       
        xlsExport: function () {

            Ext.getCmp('nationInfoList').saveDocumentAs({
			headerRowCnt: 1,
                type: 'xlsx',
                title: Ext.getCmp('nationInfo-search').getTitle(),
                fileName: Locale.getMsg('국가정보')
            });
        }
    });




Ext.define( 'Ysn.view.estimate.estimateDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'estimateDetail',

    requires: [
          'Ysn.store.estimateitem',
          'Ysn.view.estimate.estimateDetailController',
          'Ysn.store.cateLV'
    ],

    controller: 'estimateDetail',
    frame: false,
    border: false,
    bodyPadding: 1,
    scrollable: true,
    id: 'estimateDetail',
    layout: {
        type: 'fit',
        /*(columns: 1,
        tableAttrs: {
            style: {
                width: '100%'
            }
        }*/

    },
    dockedItems: [
             {
                 xtype: 'toolbar',
                 dock: 'top',
                 ui: 'footer',
                 items: [
                     {
                         xtype: 'tbfill'
                     },
                     {
                         xtype: 'button',
                         iconCls: 'fa fa-floppy-o',
                         text: '등록'
                     },
                     {
                         xtype: 'button',
                         iconCls: 'fa fa-level-up',
                         text: '결재요청'
                     },
                     {
                         xtype: 'button',
                         iconCls: 'fa fa-file-excel-o',
                         text: '견적서액셀저장'
                     }
                 ]
             }
    ],
    fieldDefaults: {
        labelAlign: 'right',
        msgTarget: 'side',
        allowBlank: true,
        readOnly: false
    },
    items: [
        {
            xtype: 'fieldset',
            scrollable: true,
            //width: 1100,
            height: 145,
            layout: {
                type: 'table',
                columns: 4,
                tableAttrs: {
                    style: {
                        width: '100%' 
                    }
                }

            },
            items: [
              {
                  xtype: 'radiogroup',
                  width: 270,
                  fieldLabel: '<b>견적구분</b>',
                  labelAlign: 'right',
                  labelWidth: 60,
                  items: [
                      {
                          xtype: 'radiofield',
                          boxLabel: '한국어'
                      },
                      {
                          xtype: 'radiofield',
                          boxLabel: '영어'
                      },
                      {
                          xtype: 'radiofield',
                          boxLabel: '알본어'
                      }
                  ]
              },
        {
            xtype: 'radiogroup',
            width: 270,
            fieldLabel: '<b>견적타입</b>',
            labelWidth: 60,
            items: [
                {
                    xtype: 'radiofield',
                    boxLabel: 'A'
                },
                {
                    xtype: 'radiofield',
                    boxLabel: 'B'
                }
            ]
        },
        {
            xtype: 'datefield',
            width: 200,
            fieldLabel: '<b>견적일</b>',
            labelWidth: 60,
            value: '11/20/2019'
        },
        {
            xtype: 'textfield',
            width: 230,
            fieldLabel: '<b>견적번호</b>',
            labelWidth: 60
        },
        {
            xtype: 'combobox',
            width: 230,
            fieldLabel: '<b>유통구조</b>',
            labelWidth: 60,
            reference: 'dstr_chn',
            itemId: 'dstr_chn',
            name: 'dstr_chn',
            publishes: 'value',
            displayField: 'CODE_NM',
            valueField: 'CODE_ID',
            margin: '0 5 0 0',
            store: {
                type: 'Tcode'
            },
            minChars: 0,
            //width: 120,
            queryMode: 'local',
            listeners: {
                //change: 'onChangeBiz'
            }
        },      
        {        
            xtype: 'fieldcontainer',
            fieldLabel: '<b>거래처</b>',
            labelWidth: 60,
            combineErrors: false,
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
                allowBlank: false,
                width: 200,
                margin: '0 5 0 0'
            }, {
                xtype: 'hiddenfield',
                reference: 'cust_cd',
                name: 'cust_cd',
                itemId: 'cust_cd'
            }, {
                xtype: 'hiddenfield',
                name: 'mod_usr',
                value: loginUser
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
        },
        {
            xtype: 'textfield',
            width: 230,
            fieldLabel: '<b>영업담당</b>',
            labelWidth: 60
        },
        {
            xtype: 'hiddenfield',
            width: 230,
            fieldLabel: '<b>영업담당</b>',
            labelWidth: 60
        },
        {
            xtype: 'combobox',
            width: 230,
            fieldLabel: '<b>환율</b>',
            labelWidth: 60
        },
        {
            xtype: 'textfield',
            colspan: 2,
            width: 610,
            fieldLabel: '<b>제목</b>',
            labelWidth: 60
        },
        {
            xtype: 'combobox',
            width: 230,
            fieldLabel: '<b>참조자</b>',
            labelWidth: 60
        },
        {
            xtype: 'combobox',
            width: 230,
            fieldLabel: '<b>결재자</b>',
            labelWidth: 60
        },
         {
             xtype: 'fieldset',     
             colspan: 4,
             layout: {
                 type: 'vbox',
                 pack: 'start',
                 align: 'stretch'
             },
             border: false,
             defaults: { hideLabel: false },
             items: [{
                 xtype: 'gridpanel',
                 reference: 'estimateItem',
                 height: 480,
                 header: false,
                 store: { type: 'estimateitem' },
                 columns: [
                     {
                         xtype: 'gridcolumn',
                         dataIndex: 'no',
                         hidden: false,
                         width:30
                     },
                     {
                         xtype: 'widgetcolumn',
                         dataIndex: 'cate_lv1',
                         text: '품목분류1',
                         widget: {
                             xtype: 'combobox',
                             store: {
                                 type: 'cateLV'
                             },
                             minChars: 1,
                             //queryParam: 'customer_name',
                             queryMode: 'local',
                             publishes: 'value',
                             displayField: 'catenm',
                             valueField: 'catenm',
                             hideTrigger: true,
                         }
                     },
                     {
                         xtype: 'widgetcolumn',
                         dataIndex: 'cate_lv2',
                         text: '품목분류2',
                         widget: {
                             xtype: 'combobox',
                             store: {
                                 type: 'cateLV'
                             },
                             minChars: 1,
                             //queryParam: 'customer_name',
                             queryMode: 'local',
                             publishes: 'value',
                             displayField: 'catenm',
                             valueField: 'catenm',
                             hideTrigger: true,
                         }
                     },
                     {
                         xtype: 'widgetcolumn',
                         dataIndex: 'prod_code',
                         text: '재품코드',
                         widget: {
                             xtype: 'combobox'
                         }
                     },
                     {
                         xtype: 'widgetcolumn',
                         dataIndex: 'prod_desc',
                         text: '재품설명',
                         widget: {
                             xtype: 'textfield'
                         }
                     },
                     {
                         xtype: 'widgetcolumn',
                         dataIndex: 'unit_price',
                         text: '단가',
                         widget: {
                             xtype: 'numberfield'
                         }
                     },
                     {
                         xtype: 'widgetcolumn',
                         dataIndex: 'quantity',
                         text: '수량',
                         widget: {
                             xtype: 'numberfield'
                         }
                     },
                     {
                         xtype: 'widgetcolumn',
                         dataIndex: 'amount',
                         text: '금액',
                         widget: {
                             xtype: 'numberfield'
                         }
                     },
                     {
                         xtype: 'widgetcolumn',
                         dataIndex: 'qty_5k',
                         text: '5K',
                         widget: {
                             xtype: 'numberfield'
                         }
                     },
                     {
                         xtype: 'widgetcolumn',
                         dataIndex: 'qty_10k',
                         text: '10K',
                         widget: {
                             xtype: 'numberfield'
                         }
                     },
                     {
                         xtype: 'widgetcolumn',
                         dataIndex: 'qty_30k',
                         text: '30K',
                         widget: {
                             xtype: 'numberfield'
                         }
                     },
                     {
                         xtype: 'widgetcolumn',
                         dataIndex: 'qty_50k',
                         text: '50K',
                         widget: {
                             xtype: 'numberfield'
                         }
                     },
                     {
                         xtype: 'widgetcolumn',
                         dataIndex: 'qty_100k',
                         text: '100K',
                         widget: {
                             xtype: 'numberfield'
                         }
                     },
                     {
                         xtype: 'widgetcolumn',
                         width: 228,
                         dataIndex: 'remark',
                         text: '비고',
                         widget: {
                             xtype: 'textfield'
                         }
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'idx',
                         text: 'idx'
                     }
                 ],
                 selModel: {
                     selType: 'checkboxmodel',
                     checkOnly: true
                 } 
             }]
         },
         {
             xtype: 'fieldset',
             colspan: 4,   
             layout: {
                 type: 'vbox',
                 pack: 'start',
                 align: 'stretch'
             },
             border: false,
             defaults: { hideLabel: false },
             items: [{
                 xtype: 'textareafield',
                 height: 190,
                 padding: 0,
                 fieldLabel: '<b>특이사항</b>',
                 labelAlign: 'right',
                 labelWidth: 60,
                 value: 'Origin                      : Republic of Korea\nPacking                    : Export Standard Packaging\nShipment                 : To be advised  \nShipping port            : To be advised\nInspection                : Manufacturer Standard\nDestination               : To be advised\nPayment                  : By T/T 50% in advance, 50% before shipment\nCurrency                  : USD\nDelivery Term           : FOB KOREA\nValidity                     : Valid in 30days after date of issue.'
             }]
         }

            ]
        }


    ]


} );
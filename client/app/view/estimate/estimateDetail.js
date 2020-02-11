Ext.define( 'Ysn.view.estimate.estimateDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'estimateDetail',

    requires: [
          'Ysn.store.estimateitem',
          'Ysn.store.submitcd',
          'Ysn.view.estimate.estimateDetailController',
          'Ysn.store.cateLv',
          'Ysn.store.cateLv2',
          'Ysn.store.baseOption'
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
                         xtype: 'button',
                         iconCls: 'fa fa-recycle',
                         reference: 'recylebtn',
                         text: '재사용',
                         handler: 'resetId'
                     },
                       {
                           xtype: 'button',
                           iconCls: 'fa fa-eraser',
                           reference: 'newbtn',
                           text: '신규작성',
                           handler: 'resetAll'
                       },
                     {
                         xtype: 'tbfill'
                     },
                     {
                         xtype: 'button',
                         iconCls: 'fa fa-plus-square-o',
                         reference: 'tempbtn',
                         text: '임시저장',
                         listeners: {
                             click: {
                                 fn: 'Save',
                                 args: ['임시저장', '0']
                             }
                         }
                     },
                     {
                         xtype: 'button',
                         iconCls: 'fa fa-plus-square',
                         reference: 'reqbtn',
                         text: '결재상신',
                         listeners: {
                             click: {
                                 fn: 'Save',
                                 args: ['결재상신', '1']
                             }
                         }
                     },
                     {
                         xtype: 'button',
                         iconCls: 'fa fa-file-excel-o',
                         text: '견적서액셀저장',
                         listeners: {
                             click: {
                                 fn: 'ExcelDown',
                                 args: ['견적서액셀저장', '1']
                             }
                         }
                     },

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
                    xtype: 'hiddenfield',
                    reference: 'idx',
                    name: 'idx',
                },
              {
                  xtype: 'radiogroup',
                  width: 270,
                  fieldLabel: '<b>견적구분</b>',
                  reference: 'form_lang',
                  name: 'form_lang',
                  labelAlign: 'right',
                  labelWidth: 60,
                  items: [
                      {
                          xtype: 'radiofield',
                          boxLabel: '한국어',
                          inputValue: 'kr'
                      },
                      {
                          xtype: 'radiofield',
                          boxLabel: '영어',
                          inputValue: 'en',
                          checked: true
                      },
                      {
                          xtype: 'radiofield',
                          boxLabel: '알본어',
                          inputValue: 'jp'
                      }
                  ],     
                listeners: {
                    change: 'chgForm'
                }
              },
        {
            xtype: 'radiogroup',
            width: 270,
            fieldLabel: '<b>견적타입</b>',
            reference: 'form_type',
            name: 'form_type',
            labelWidth: 60,
            items: [
                {
                    xtype: 'radiofield',
                    boxLabel: 'A',
                    inputValue: 'A' ,
                    checked: true      
                },
                {
                    xtype: 'radiofield',
                    boxLabel: 'B',
                    inputValue: 'B',
                    checked: false

                }
            ],
            listeners: {
                change: 'chgType'
            }
        },
        {
            xtype: 'datefield',
            width: 200,
            reference: 'estimate_date',
            name: 'estimate_date',
            fieldLabel: '<b>견적일</b>',
            labelWidth: 60
        },
        {
            xtype: 'textfield',
            width: 230,
            reference: 'estimate_id',
            name: 'estimate_id',
            fieldLabel: '<b>견적번호</b>',
            labelWidth: 60,
            readOnly: true
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
            reference: 'user_nm',
            name: 'user_nm',
            labelWidth: 60,
            readOnly: true
        },
        {
            xtype: 'hiddenfield',
            reference: 'user_cd',
            name: 'user_cd',
        },
        {
            xtype: 'hiddenfield',
            reference: 'status_cd',
            name: 'status_cd',
        },
        {
            xtype: 'hiddenfield',
            reference: 'ditems',
            name: 'ditems',
        },
         {
             xtype: 'hiddenfield',
             reference: 'exch_rate',
             name: 'exch_rate',
         },
        {
            xtype: 'combobox',
            width: 230,
            fieldLabel: '<b>환율</b>',
            labelWidth: 60,
            reference: 'currency',
            name: 'currency',
            publishes: 'value',
            displayField: 'BASE_CRNY',
            valueField: 'BASE_CRNY',
            store: {
                type: 'baseCrnyInfoList2'
            },
            minChars: 0,
            allowBlank: false,
            //width: 120,
            queryMode: 'local',
            listeners: {
                change: 'onChangeCrny'
            }
        },
        {
            xtype: 'textfield',
            colspan: 2,
            width: 610,
            fieldLabel: '<b>제목</b>',
            reference: 'subject',
            name: 'subject',
            allowBlank: false,
            labelWidth: 60
        },
        /*{
            xtype: 'combobox',
            width: 230,
            fieldLabel: '<b>참조자</b>',
            labelWidth: 60,
            reference: 'ref_cd',
            name: 'ref_cd',
            publishes: 'value',
            displayField: 'USER_NM',
            valueField: 'USER_CD',
            allowBlank: false,
            store: {
                type: 'usercd2'
            },
            minChars: 0,
            queryMode: 'local'

        },*/
       {
           xtype: 'combobox',
           colspan: 2,
           width: 230,
           fieldLabel: '<b>결재자</b>',
           labelWidth: 60,
           reference: 'submit_cd',
           name: 'submit_cd',
           publishes: 'value',
           displayField: 'USER_NM',
           valueField: 'USER_CD',
           allowBlank: false,
           store: {
               type: 'submitcd'
           },
           minChars: 0,
           queryMode: 'local'

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
                 viewConfig: {
                     stripeRows: true,
                     enableTextSelection: false,
                     markDirty: false
                 },

                 multiSelect: false,
                 singleExpand: true,
                 //selModel: 'cellmodel',
                 plugins: {
                     ptype: 'cellediting',
                     clicksToEdit: 1,
                     listeners: {
                         //edit: 'edit'
                     }
                 },

                 store: { type: 'estimateitem' },

                 listeners: {
                     itemcontextmenu: 'itemcontextmenu1',
                     destroy: 'gridDestroy',
                     itemclick: 'itemclick1'   
                 },

                 tbar: {
                     items: [
                     {
                         xtype: 'combobox',
                         width: 340,
                         fieldLabel: '<b>Product Code</b>',
                         reference: 'prod_code',
                         name: 'prod_code',
                         labelWidth: 100,
                         store: {
                             type: 'baseProd',
                             autoLoad: false,
                             autoDestroy: true,
                             listeners: {
                                 beforeload: function ( obj, e, eOpts )
                                 {
                                     //   if ( Ysn.Global.getEstCateLv1() != '' &&   Ysn.Global.getEstCateLv2() != ''){
                                     obj.getProxy().setExtraParams( {
                                         cate_lv1: Ysn.Global.getEstCateLv1(),
                                         cate_lv2: Ysn.Global.getEstCateLv2()
                                     } );
                                     //  }   
                                 }
                             }
                         },
                         minChars: 1,
                         queryParam: 'prod_code',
                         //enableKeyEvents : true, 
                         queryMode: 'remote',
                         publishes: 'value',
                         displayField: 'prod_code',
                         valueField: 'prod_code',
                         hideTrigger: false,
                         listeners: {
                             beforequery: 'beforeQuery',
                             select: 'setProdCode'
                         }
                     },
                     {
                         xtype: 'textfield',
                         width: 280,
                         fieldLabel: '<b>Product Name</b>',
                         reference: 'prod_name',
                         name: 'prod_name',
                         labelWidth: 100,
                         readOnly: false
                     },
                     {
                         xtype: 'textfield',
                         width: 240,
                         fieldLabel: '<b>Item Name</b>',
                         reference: 'item_name',
                         name: 'item_name',
                         labelWidth: 70,
                         readOnly: false
                     },
                     {
                         xtype: 'numberfield',
                         width: 170,
                         fieldLabel: '<b>Quantity</b>',
                         reference: 'item_qty',
                         name: 'item_qty',

                         value: 100,
                         labelWidth: 60,
                         listeners: {
                             change: 'setQty'
                         },
                         hidden: true,
                         readOnly: false
                     }]
                 },

                 columns: [
                     {
                         xtype: 'gridcolumn',
                         dataIndex: 'no',
                         hidden: false,
                         width: 30
                     },
                     {
                         xtype: 'gridcolumn',
                         dataIndex: 'header_yn',
                         text: 'Step.',
                         width: 130,
                         renderer: function ( val )
                         {
                             if ( val == 'Y' ) return 'BASE';
                             if ( val == 'N' ) return 'OPTION';
                         },
                         editor: {
                             xtype: 'combobox',
                             //bind: '{record.header_yn}',
                             store: {
                                 fields: [{ name: 'code' }, { name: 'cdnm' }],
                                 data: {
                                     items: [
                                           { cdnm: 'BASE', code: 'Y' },
                                           { cdnm: 'OPTION', code: 'N' }
                                     ]
                                 },
                                 proxy: {
                                     type: 'memory',
                                     reader: {
                                         type: 'json',
                                         rootProperty: 'items'
                                     }
                                 }
                             },
                             flex: 1,
                             minChars: 1,
                             queryMode: 'local',
                             publishes: 'value',
                             displayField: 'cdnm',
                             valueField: 'code',
                             hideTrigger: false,
                             listeners: {
                                 //specialkey: 'findCateLv2',
                                 select: 'setStep'
                             }
                         }
                     },
                     {
                         xtype: 'gridcolumn',
                         dataIndex: 'prod_code',
                         text: 'Prod.Code',
                         width: 0
                     },
                     {
                         xtype: 'gridcolumn',
                         dataIndex: 'prod',
                         text: 'Product',
                         width: 170,
                         renderer: function ( val )
                         {
                             if ( val == 'Bottle' ) return 'BOTTLE';
                             if ( val == 'InnerBottle' ) return 'INNER BOTTLE';
                             if ( val == 'Pump_Cap' ) return 'PUMP';
                             if ( val == 'Cap' ) return 'CAP';
                             if ( val == 'TubeSleeve_Headering' ) return 'TUBE';
                             if ( val == 'Others' ) return 'OTHER';
                             if ( val == 'SET' ) return 'SET';
                         },
                         editor: {
                             xtype: 'combobox',
                             //bind: '{record.prod}',
                             store: {
                                 fields: [{ name: 'code' }, { name: 'cdnm' }],
                                 data: {
                                     items: [
                                           { code: 'Bottle', cdnm: 'BOTTLE' },
                                           { code: 'InnerBottle', cdnm: 'INNER BOTTLE' },
                                           { code: 'Pump_Cap', cdnm: 'PUMP' },
                                           { code: 'Cap', cdnm: 'CAP' },
                                           { code: 'TubeSleeve_Headering', cdnm: 'TUBE' },
                                           { code: 'Others', cdnm: 'OTHER' },
                                           { code: 'SET', cdnm: 'SET' }
                                     ]
                                 },
                                 proxy: {
                                     type: 'memory',
                                     reader: {
                                         type: 'json',
                                         rootProperty: 'items'
                                     }
                                 }
                             },
                             flex: 1,
                             minChars: 1,
                             queryMode: 'local',
                             publishes: 'value',
                             displayField: 'cdnm',
                             valueField: 'code',
                             hideTrigger: false,
                             listeners: {
                                 // beforequery: 'beforeQuery',
                                 select: 'setProd',
                                 // change: 'chgCateLv2'
                             }
                         }
                     },
                     {
                         xtype: 'gridcolumn',
                         dataIndex: 'prod_option',
                         text: 'Option',
                         width: 220,
                         editor: {
                             xtype: 'combobox',
                             //bind: '{record.prod_option}',
                             store: {
                                 type: 'baseOption',
                                 autoLoad: false,
                                 autoDestroy: true,
                                 listeners: {
                                     beforeload: function ( obj, e, eOpts )
                                     {
                                         var prod_code = 'BASE';
                                         if ( Ysn.Global.getEstStep() == 'N' )
                                         {
                                             prod_code = Ysn.Global.getEstProdCode();
                                         }
                                         obj.getProxy().setExtraParams( {
                                             prod_code: prod_code
                                         } );


                                     }
                                 }
                             },
                             flex: 1,
                             minChars: 1,
                             queryParam: 'prod_option',
                             //enableKeyEvents : true, 
                             queryMode: 'remote',
                             publishes: 'value',
                             displayField: 'prod_option',
                             valueField: 'prod_option',
                             hideTrigger: false,
                             listeners: {
                                 beforequery: 'beforeQuery',
                                 select: 'setProdOption',
                                 click: function ()
                                 {
                                     alert( 'aaa' );
                                 }
                             }
                         }
                     },
                     {
                         xtype: 'gridcolumn',
                         dataIndex: 'sample_modify',
                         text: '샘플여부',
                         width: 0,
                         editor: {
                             xtype: 'combobox',
                             //bind: '{record.sample_modify}',
                             store: {
                                 fields: [{ name: 'code' }],
                                 data: {
                                     items: [
                                           { code: 'Y' },
                                           { code: 'N' }
                                     ]
                                 },
                                 proxy: {
                                     type: 'memory',
                                     reader: {
                                         type: 'json',
                                         rootProperty: 'items'
                                     }
                                 }
                             },
                             flex: 1,
                             minChars: 1,
                             queryMode: 'local',
                             publishes: 'value',
                             displayField: 'code',
                             valueField: 'code',
                             hideTrigger: false,
                             listeners: {
                                 // beforequery: 'beforeQuery',
                                 //select: 'setSampleYn',
                                 // change: 'chgCateLv2'
                             }
                         }
                     },
                     {
                         xtype: 'gridcolumn',
                         dataIndex: 'prod_desc',
                         text: 'Description',
                         width: 200,
                         editor: {
                             xtype: 'textfield',
                             //bind: '{record.prod_desc}',
                             flex: 1
                         }
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'quantity',
                         text: 'Quantity',
                         width: 150,
                         editor: {
                             xtype: 'numberfield',
                             //ind: '{record.quantity}',
                             flex: 1,
                             listeners: {
                                 //  beforequery: 'beforeQuery',
                                 change: 'calcAmt'
                             }
                         }
                     },
                     {
                         xtype: 'numbercolumn',
                         hidden: true,
                         dataIndex: 'unit_price',
                         text: 'Unit Price',
                         width: 150,
                         format: '0.00',
                         editor: {
                             xtype: 'numberfield',
                             //bind: '{record.unit_price}',
                             format: '0.0000',
                             flex: 1,
                              listeners: {
                                 //  beforequery: 'beforeQuery',
                                 change: 'calcAmt2'
                             }
                         }
                     },
                     {
                         xtype: 'numbercolumn',
                         dataIndex: 'amount',
                         hidden: true,
                         text: 'Amount',
                         width: 150,
                         format: '0.00',
                         editor: {
                             xtype: 'numberfield',
                             //bind: '{record.amount}',
                             flex: 1
                         }
                     },
                     {
                         xtype: 'numbercolumn',
                         dataIndex: 'qty_5k',
                         text: '5K',
                         width: 150,
                         format: '0.00',
                         editor: {
                             xtype: 'numberfield',
                             //bind: '{record.qty_5k}',
                             format: '0.0000',
                             flex: 1
                         }
                     },
                     {
                         xtype: 'numbercolumn',
                         dataIndex: 'qty_10k',
                         text: '10K',
                         width: 150,
                         format: '0.00',
                         editor: {
                             xtype: 'numberfield',
                             //bind: '{record.qty_10k}',
                             format: '0.0000',
                             flex: 1
                         }
                     },
                     {
                         xtype: 'numbercolumn',
                         dataIndex: 'qty_30k',
                         text: '30K',
                         width: 150,
                         format: '0.00',
                         editor: {
                             xtype: 'numberfield',
                             //bind: '{record.qty_30k}',
                             format: '0.0000',
                             flex: 1
                         }
                     },
                     {
                         xtype: 'numbercolumn',
                         dataIndex: 'qty_50k',
                         text: '50K',
                         width: 150,
                         format: '0.00',
                         editor: {
                             xtype: 'numberfield',
                             //bind: '{record.qty_50k}',
                             format: '0.0000',
                             flex: 1
                         }
                     },
                     {
                         xtype: 'numbercolumn',
                         dataIndex: 'qty_100k',
                         text: '100K',
                         width: 150,
                         format: '0.00',
                         editor: {
                             xtype: 'numberfield',
                             //bind: '{record.qty_100k}',
                             format: '0.0000',
                             flex: 1
                         }
                     },
                     {
                         xtype: 'gridcolumn',
                         dataIndex: 'remark',
                         text: 'Remark',
                         width: 250,
                         editor: {
                             xtype: 'textfield',
                             //bind: '{record.remark}',
                             flex: 1
                         }
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'idx',
                         text: 'idx'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'prod_option1',
                         text: 'prod_option1'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'prod_others',
                         text: 'prod_others'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'eco_category',
                         text: 'eco_category'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'sample_modify',
                         text: 'sample_modify'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'bottle_5K',
                         text: 'bottle_5K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'Innerbottle_5K',
                         text: 'Innerbottle_5K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'pumpcap_5K',
                         text: 'pumpcap_5K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'cap_5K',
                         text: 'cap_5K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'tubesleeveheadering_5K',
                         text: 'tubesleeveheadering_5K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'others_5K',
                         text: 'others_5K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'set_5K',
                         text: 'set_5K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'bottle_10K',
                         text: 'bottle_10K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'Innerbottle_10K',
                         text: 'Innerbottle_10K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'pumpcap_10K',
                         text: 'pumpcap_10K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'cap_10K',
                         text: 'cap_10K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'tubesleeveheadering_10K',
                         text: 'tubesleeveheadering_10K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'others_10K',
                         text: 'others_10K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'set_10K',
                         text: 'set_10K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'bottle_30K',
                         text: 'bottle_30K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'Innerbottle_30K',
                         text: 'Innerbottle_30K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'pumpcap_30K',
                         text: 'pumpcap_30K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'cap_30K',
                         text: 'cap_30K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'tubesleeveheadering_30K',
                         text: 'tubesleeveheadering_30K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'others_30K',
                         text: 'others_30K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'set_30K',
                         text: 'set_30K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'bottle_50K',
                         text: 'bottle_50K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'Innerbottle_50K',
                         text: 'Innerbottle_50K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'pumpcap_50K',
                         text: 'pumpcap_50K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'cap_50K',
                         text: 'cap_50K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'tubesleeveheadering_50K',
                         text: 'tubesleeveheadering_50K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'others_50K',
                         text: 'others_50K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'set_50K',
                         text: 'set_50K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'bottle_100K',
                         text: 'bottle_100K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'Innerbottle_100K',
                         text: 'Innerbottle_100K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'pumpcap_100K',
                         text: 'pumpcap_100K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'cap_100K',
                         text: 'cap_100K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'tubesleeveheadering_100K',
                         text: 'tubesleeveheadering_100K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'Innerbottle_100K',
                         text: 'Innerbottle_100K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'others_100K',
                         text: 'others_100K'
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: true,
                         dataIndex: 'set_100K',
                         text: 'set_100K'
                     }
                 ],
                 selModel: {
                    // selType: 'checkboxmodel',
                    // checkOnly: true
                 }
             },
             {
                 xtype: 'gridpanel',
                 reference: 'estimateItem2',
                 height: 480,
                 header: false,
                 hidden: true,          
                 listeners: {
                 //    itemcontextmenu: 'itemcontextmenu2',
                     destroy: 'gridDestroy',
                     itemclick: 'itemclick2'
                 },
                 viewConfig: {
                     stripeRows: true,
                     enableTextSelection: false,
                     markDirty: false
                 },           
                 multiSelect: false,
                 singleExpand: true,
                 plugins: {
                     ptype: 'cellediting',
                     clicksToEdit: 1,
                     listeners: {
                         //edit: 'edit'
                     }
                 },
                 store: { type: 'estimateitem' },

                 tbar: {
                     items: [           
                     {
                         xtype: 'textfield',
                         width: 240,
                         fieldLabel: '<b>참조</b>',
                         reference: 'summary_yn',
                         name: 'summary_yn',
                         labelWidth: 70,
                         readOnly: false
                     },
                     {
                         xtype: 'textfield',
                         width: 400,
                         fieldLabel: '<b>품명</b>',
                         reference: 'prod_name2',
                         name: 'prod_name',
                         labelWidth: 100,
                         readOnly: false
                     }
                     ]
                 },

                 columns: [
                      {
                          xtype: 'gridcolumn',
                          dataIndex: 'no',
                          hidden: true     
                      },
                     {
                         xtype: 'gridcolumn',
                         dataIndex: 'prod',
                         text: '구분',
                         width: 100,
                         editor: {
                             xtype: 'combobox',            
                             store: {
                                 fields: [{ name: 'code' }, { name: 'cdnm' }],
                                 data: {
                                     items: [
                                           { code: '용기', cdnm: '용기' },
                                           { code: '내용기', cdnm: '내용기' },
                                           { code: '펌프', cdnm: '펌프' },
                                           { code: '캡', cdnm: '캡' },
                                           { code: '류브', cdnm: '류브' },
                                           { code: '기타', cdnm: '기타' },
                                           { code: 'SET', cdnm: 'SET' }
                                     ]
                                 },
                                 proxy: {
                                     type: 'memory',
                                     reader: {
                                         type: 'json',
                                         rootProperty: 'items'
                                     }
                                 }
                             },
                             flex: 1,
                             minChars: 1,
                             queryMode: 'local',
                             publishes: 'value',
                             displayField: 'cdnm',
                             valueField: 'code',
                             hideTrigger: false,
                             listeners: {
                                 // beforequery: 'beforeQuery',
                                 select: 'setProd2',
                                 // change: 'chgCateLv2'
                             }
                         }
                     },
                     {
                         xtype: 'gridcolumn',
                         dataIndex: 'prod_desc',
                         text: '세부견적내역',
                         width: 250,
                         editor: {
                             xtype: 'textfield',       
                             flex: 1
                         }
                     },
                     {
                         xtype: 'gridcolumn',           
                         dataIndex: 'item_name',
                         text: '수량',
                         width: 150,
                         editor: {
                             xtype: 'textfield',      
                             flex: 1,
                             listeners: {
                                 //  beforequery: 'beforeQuery',
                                // change: 'calcAmt'
                             }
                         }
                     },
                     {
                         xtype: 'gridcolumn',
                         hidden: false,
                         dataIndex: 'unit_price',
                         text: '단가(원)',
                         width: 150,
                         editor: {
                             xtype: 'numberfield',
                             decimalPrecision:0,
                             allowDecimals: false,
                             format: '0,000',
                             flex: 1
                         }
                     },
                     {
                         xtype: 'gridcolumn',
                         dataIndex: 'remark',
                         text: '비고',
                         width: 250,
                         editor: {
                             xtype: 'textfield',         
                             flex: 1
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
                  //   selType: 'checkboxmodel',
                 //    checkOnly: true
                 }
             }
             ]
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
                 name: 'remark',
                 labelAlign: 'right',
                 labelWidth: 60,
                 value: 'Origin : Republic of Korea\nPacking : Export Standard Packaging\nShipment : To be advised  \nShipping port : To be advised\nInspection : Manufacturer Standard\nDestination : To be advised\nPayment : By T/T 50% in advance, 50% before shipment\nCurrency : USD\nDelivery Term : FOB KOREA\nValidity : Valid in 30days after date of issue.'
             }]
         }

            ]
        }


    ]


} );
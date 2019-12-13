
Ext.define('Ysn.view.productinquiry.inquiryList',{
    extend: 'Ext.grid.Panel',
    xtype: 'inquiryList',
    requires: [
        'Ysn.view.productinquiry.inquiryListController', 
		'Ysn.store.customerList',
		'Ext.grid.filters.Filters' 
    ],
    
    controller: 'productinquiry-inquiryList',     
	store: {
        type: 'inquiryList', 
		autoLoad: false,
        autoDestroy: true
    }, 
	style: {'borderTop':'1px solid gray'},
	enableLocking: true,
	id: 'inquiryList',
    columnLines: true,
	multiColumnSort: true, 
	plugins: ['gridfilters', 'pmh-grid-exporter'],
	columns: [
            {text: Locale.getMsg('접수일'), width: 125, dataIndex: 'INQ_RDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true, filter: true},
            {text: Locale.getMsg('문의경로'),  width: 250, dataIndex: 'INQ_CHNL_NM', sortable: true,   
			 filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
            {text: Locale.getMsg('접수담당자'), width: 125, dataIndex: 'INQ_RUSER_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
            {text: Locale.getMsg('사후조치자'), width: 125, dataIndex: 'USER_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: Locale.getMsg('유통구조'), width: 125, dataIndex: 'DSTR_TYPE_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: Locale.getMsg('진행사항'), width: 125, dataIndex: 'INQ_STATUS_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: Locale.getMsg('문의자'), width: 125, dataIndex: 'INQ_USER_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
		    {text: Locale.getMsg('문의유형'), width: 125, dataIndex: 'INQ_TYPE_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
		    {text: Locale.getMsg('문의제품'), width: 125, dataIndex: 'INQ_ITEM_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
            {text: Locale.getMsg('조치내역'), width: 125, dataIndex: 'POST_ARNG', sortable: true, 
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
            },
            {
                text: Locale.getMsg('매출발생여부'), width: 125, dataIndex: 'ORDER_YN', sortable: true,
                filter: {
                    type: 'string',
                    itemDefaults: {
                        emptyText: Locale.getMsg('검색어입력..')
                    }
                }
            },
            {
                text: Locale.getMsg('매출금액'), width: 125, dataIndex: 'ORDER_AMOUNT', sortable: true, renderer:function (value) { return Ysn.Util.changeDec(value); },
                filter: {
                    type: 'string',
                    itemDefaults: {
                        emptyText: Locale.getMsg('검색어입력..')
                    }
                }
            },
			{text: "접수번호", dataIndex: 'INQ_CD', hidden: true }
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

Ext.define('Ysn.view.productinquiry.inquiryDetail',{
    extend: 'Ext.form.Panel',
    xtype: 'productinquiry-inquiryDetail',
    requires: [
        'Ysn.view.productinquiry.inquiryDetailController', 
		'Ysn.view.common.tabKeyman',
		'Ysn.view.common.tabPlaylist',
		'Ysn.view.common.tabProject',
		'Ysn.view.common.tabEmail'
    ],

    controller: 'productinquiry-inquiryDetail', 


    frame: true,
    id: 'inquiryDetail',
	reference: 'inquiryDetail',
    bodyPadding: 10,
    scrollable:true,
    width: 800,   
    reader: {
        type: 'json',
        model: 'Ysn.model.inquiryDetail',
        rootProperty: '' 
    },
 
	fieldDefaults: { 
			labelAlign: 'right', 
			msgTarget: 'side' ,
			allowBlank:true
		},
    items: [{
        xtype: 'fieldset',
		scrollable:true,
        title: '문의 정보',
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
                    { fieldLabel: '*'+Locale.getMsg('문의경로'), labelWidth: 80, name: 'inq_chnl', allowBlank:false, 
						xtype: 'combobox',
						reference: 'inq_chnl',
						publishes: 'value',  
						displayField: 'CODE_NM',
						valueField: 'CODE_ID', 
		                emptyText: Locale.getMsg('선택'),
						store: {
							type: 'Tcode'
						},
						minChars: 0,
						queryMode: 'local',
						typeAhead: true
					},
                    { fieldLabel: Locale.getMsg('접수담당자'), xtype: 'textfield',labelWidth: 80,name: 'inq_ruser_nm', readOnly: true },
					{ fieldLabel: Locale.getMsg('접수담당자명'),xtype: 'hiddenfield',name: 'inq_ruser_cd', value: loginUser},
                    { fieldLabel: Locale.getMsg('접수일'), xtype: 'textfield', labelWidth: 80, width:200, name: 'inq_rdate', readOnly: true},
					{ fieldLabel: Locale.getMsg('고객사'), xtype: 'textfield', labelWidth: 80, width:200, name: 'inq_company'},
					{ fieldLabel: Locale.getMsg('주소'), colspan:2, xtype: 'textfield', labelWidth: 80, width:600, name: 'inq_addr'},
					{ fieldLabel: '*'+Locale.getMsg('문의자'), xtype: 'textfield', labelWidth: 80, width:200, name: 'inq_user_nm', allowBlank:false},
					{ fieldLabel: '*'+Locale.getMsg('이메일'), xtype: 'textfield', labelWidth: 80, width:400, name: 'inq_email', allowBlank:false},
					{ fieldLabel: 'Mobile', xtype: 'textfield', labelWidth: 80, width:200, name: 'inq_mphone'},
					{ fieldLabel: '*'+Locale.getMsg('문의유형'), labelWidth: 80, name: 'inq_type', allowBlank:false, 
						xtype: 'combobox',
						reference: 'inq_type',
						publishes: 'value',  
						displayField: 'CODE_NM',
						valueField: 'CODE_ID', 
		                emptyText: Locale.getMsg('선택'),
						store: {
							type: 'Tcode'
						},
						minChars: 0,
						queryMode: 'local',
						typeAhead: true
					},
					{ fieldLabel: Locale.getMsg('전달자'), xtype: 'textfield', labelWidth: 80, width:200, name: 'dlv_user_nm', readOnly: true},
					{ fieldLabel: Locale.getMsg('전달일'), xtype: 'textfield', labelWidth: 80, width:200, name: 'inq_ddate', readOnly: true},
					{ fieldLabel: Locale.getMsg('문의내용'), xtype: 'textareafield', labelWidth: 80, style:{width:'100%'}, name: 'inq_contents', colspan:3 },
					{
					    colspan: 3,
					    xtype: 'Prod_itemList',
					    fieldLabel: Locale.getMsg('문의제품'),
					    labelWidth: 80, 
					    reference: 'Prod_itemList'
					}
                    ]
                        
        
    },{
        xtype: 'fieldset',
		scrollable:true,
        title: Locale.getMsg('사후조치자 및 진행사항'),
        layout: {
            type: 'table',
            columns: 2,
            tableAttrs: {
                style: {
                    width: '100%'
                }
            }

        }, 
        items: [                       
                    { 
								xtype: 'fieldcontainer',
								fieldLabel: '*'+Locale.getMsg('사후조치자'),
								combineErrors: true, 
								layout: 'hbox',
								defaults: {
									//flex: 1,
									hideLabel: true
								},
								items: [{
									xtype: 'textfield',
									name: 'user_nm', 
									reference : 'user_nm',
									itemId : 'user_nm',
									allowBlank:false,
									margin: '0 5 0 0',
									width: 250
								},{
									xtype: 'hiddenfield',
									reference: 'user_cd', 
									name: 'user_cd', 
									itemId: 'user_cd'
								},{
									xtype: 'hiddenfield',
									reference: 'dept_cd', 
									name: 'dept_cd', 
									itemId : 'dept_cd'
								},{
									xtype: 'hiddenfield',
									reference: 'dept_nm', 
									name: 'dept_nm', 
									itemId : 'dept_nm'
								},{
									iconCls: 'x-fa fa-search', 
									xtype: 'button',
									scale: 'small',
									margin: '0 5 0 0',
									handler : 'openWindow',
									style:{ 
										'border':'none' 
									}
								},{
									iconCls: 'x-fa fa-remove', 
									xtype: 'button',
									scale: 'small',
									handler : 'resetVal',
									style:{
										'background-color': 'red !important',
										'background-image': 'none',
										'border':'none' 
									}
								}] 
					}, 
					{ fieldLabel: Locale.getMsg('유통구조'), labelWidth: 80, name: 'dstr_type',
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
						typeAhead: true
					},
					{ fieldLabel: Locale.getMsg('국가'),  name: 'nat_cd',
						xtype: 'combobox',
						reference: 'nat_cd',
						publishes: 'value',  
						displayField: 'NAT_NM',
						valueField: 'NAT_CD', 
		                emptyText: Locale.getMsg('선택'),
						store: {
							type: 'nation'
						},
						minChars: 0,
						queryMode: 'local',
						typeAhead: true
					},
					{
					    fieldLabel: Locale.getMsg('진행사항'), xtype: 'textfield', labelWidth: 80, name: 'inq_status_nm', reference: 'inq_status_nm', readOnly: true
					    
					},
					{ fieldLabel: Locale.getMsg('사후조치내용'), xtype: 'textareafield', labelWidth: 100, style:{width:'100%',height:'150px'}, name: 'post_arng', rowspan:2,readOnly: true },
					{ fieldLabel: Locale.getMsg('매출발생여부'), xtype: 'checkboxfield', labelWidth: 100, inputValue:'Y', name: 'order_yn', readOnly:true},	
					{ fieldLabel: Locale.getMsg('매출금액'), minValue: 0, xtype: 'numberfield', allowDecimals: false, labelWidth: 100, style: { width: '100%' }, name: 'order_amount', readOnly: true },
					{ xtype: 'hiddenfield', name: 'addchk', value: 'add'}, 
					{
					    xtype: 'hiddenfield', name: 'inq_status', reference: 'inq_status', readOnly: true,
                        listeners: { change : 'onStatusChg'}
					},
					{ xtype: 'hiddenfield', name: 'inq_cd'}
        ]
    }],
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            defaults: {
                minWidth: 100 
            },
            items: [
                { xtype: 'component', flex: 1 },
                { xtype: 'button', text: Locale.getMsg('DROP'), margin: '5 5 5 0', itemId: 'btn1', hidden:true,
                    listeners: {click : 'onDrop'}
                },
                {
                    xtype: 'button', text: Locale.getMsg('상담완료'), margin: '5 5 5 0', itemId: 'btn2', hidden: true,
                    listeners: { click: 'onEnd' }
                },
                {
                    xtype: 'button', text: Locale.getMsg('상담진행'), margin: '5 5 5 0', itemId: 'btn3', hidden: true,
                    listeners: { click: 'onProgress' }
                },
                {
                    xtype: 'button', text: Locale.getMsg('회신후대기'), margin: '5 5 5 0', itemId: 'btn4', hidden: true,
                    listeners: { click: 'onWaiting' }
                },
                {
                    xtype: 'button', text: Locale.getMsg('전달반려'), margin: '5 5 5 0', itemId: 'btn5', hidden: true,
                    listeners: { click: 'onCompanion' }
                },
                {
                    xtype: 'button', text: Locale.getMsg('삭제'), margin: '5 5 5 0', itemId: 'btn6', hidden: true,
                    listeners: { click: 'onDel' }
                },
                {
                    xtype: 'button', text: Locale.getMsg('전달취소'), margin: '5 5 5 0', itemId: 'btn7', hidden: true,
                    listeners: { click: 'onCancel' }
                },
                {
                    xtype: 'button', text: Locale.getMsg('문의전달'), margin: '5 5 5 0', itemId: 'btn8', hidden: true,
                    listeners: { click: 'onContact' }
                },
                { xtype: 'button', text: Locale.getMsg('접수등록'), margin: '5 5 5 0', itemId: 'btn9',
                    listeners: {click : 'onNew'}
                }
            ]
        }]
});


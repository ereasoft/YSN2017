
Ext.define('Ysn.view.samplerequest.requestList',{
    extend: 'Ext.grid.Panel',
    xtype: 'requestList',
    requires: [
        'Ysn.view.samplerequest.requestListController', 
		'Ysn.store.customerList',
		'Ext.grid.filters.Filters' 
    ],
    
    controller: 'samplerequest-requestList',     
	store: {
        type: 'sampleRequestList', 
		autoLoad: false,
        autoDestroy: true
    }, 
	style: {'borderTop':'1px solid gray'},
	enableLocking: true,
	id: 'requestList',
    columnLines: true,
	multiColumnSort: true, 
	plugins: ['gridfilters', 'pmh-grid-exporter'],
	columns: [
            {text: Locale.getMsg('샘플품목'), width: 200, dataIndex: 'ITEM_NM', sortable: true, 
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: '검색어입력..'
				}
             }
			},
            {text: Locale.getMsg('차수'),  width: 70, dataIndex: 'SMR_CHASU', sortable: true,
			 filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
            {text: Locale.getMsg('거래처'), width: 125, dataIndex: 'EUSER_NM', sortable: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
            {text: Locale.getMsg('매출조직'), width: 125, dataIndex: 'QDEPT_NM', sortable: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
            {text: Locale.getMsg('영업담당'), width: 125, dataIndex: 'QRUSER_NM', sortable: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
			{text: Locale.getMsg('접수담당'), width: 125, dataIndex: 'RRUSER_NM', sortable: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},  
			{text: Locale.getMsg('검토자'), width: 125, dataIndex: 'RAUSER_NM', sortable: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
			{text: Locale.getMsg('진행상태'), width: 125, dataIndex: 'SMP_STATUS', sortable: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
            {
                text: Locale.getMsg( '수량' ), width: 100, dataIndex: 'SMP_RQTY', sortable: true,
                filter: {
                    type: 'string',
                    itemDefaults: {
                        emptyText: Locale.getMsg( '검색어입력..' )
                    }
                }
            },
            {
                text: Locale.getMsg( '예상발주수량' ), width: 100, dataIndex: 'PUR_OQTY', sortable: true,
                filter: {
                    type: 'string',
                    itemDefaults: {
                        emptyText: Locale.getMsg( '검색어입력..' )
                    }
                }
            },
            {
                text: Locale.getMsg('송장번호'), width: 125, dataIndex: 'TRACKING_NUM', sortable: true,
                filter: {
                    type: 'string',
                    itemDefaults: {
                        emptyText: Locale.getMsg('검색어입력..')
                    }
                }
            },
            {
                text: Locale.getMsg('샘플공정'), width: 125, dataIndex: 'PROCESS_NM', sortable: true,
                filter: {
                    type: 'string',
                    itemDefaults: {
                        emptyText: Locale.getMsg('검색어입력..')
                    }
                }
            },
            {
                text: Locale.getMsg('지연사유'), width: 125, dataIndex: 'DELAY_COMMENT_NM', sortable: true,
                filter: {
                    type: 'string',
                    itemDefaults: {
                        emptyText: Locale.getMsg('검색어입력..')
                    }
                }
            },
			{text: Locale.getMsg('요청일'), width: 125, dataIndex: 'SMR_RQDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true, filter: true},
			{text: Locale.getMsg('요청철회일'), width: 125, dataIndex: 'SMR_BKDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true},
			{text: Locale.getMsg('접수일'), width: 125, dataIndex: 'SMR_RRDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true},
			{text: Locale.getMsg('요청반려일'), width: 125, dataIndex: 'SMR_FBDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true},
			{text: Locale.getMsg('검토승인일'), width: 125, dataIndex: 'SMR_RADATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true},
			{ text: Locale.getMsg('완료예정일'), width: 125, dataIndex: 'PRDT_PDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
			{ text: Locale.getMsg('완료예정일2'), width: 125, dataIndex: 'PRDT_PDATE2', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
			{text: Locale.getMsg('배송선적일'), width: 125, dataIndex: 'SHIP_PDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true},
			{text: Locale.getMsg('샘플수령일'), width: 125, dataIndex: 'SMR_PRDATE',renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true},
			{text: Locale.getMsg('발주예정일'), width: 125, dataIndex: 'SMR_PODATE',renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true},
			{text: Locale.getMsg('초도선적요청일'), width: 125, dataIndex: 'SMR_ORDERDATE',renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true},
			{text: Locale.getMsg('프로젝트가능성'), width: 125, dataIndex: 'PROJECT_POSS',sortable: true},
			{text: Locale.getMsg('샘플요청코드'), dataIndex: 'SMR_CD',hidden:true}
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

    }  ////
});

Ext.define('Ysn.view.samplerequest.requestDetail',{
    extend: 'Ext.form.Panel',
    xtype: 'samplerequest-requestDetail',
    requires: [
        'Ysn.view.samplerequest.requestDetailController'
    ],

    controller: 'samplerequest-requestDetail', 


    frame: true,
    id: 'requestDetail',
	reference: 'requestDetail',
    bodyPadding: 10,
    scrollable:true,
    width: 1000,   
    reader: {
        type: 'json',
        model: 'Ysn.model.sampleRequestDetail',
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
        title: Locale.getMsg('기본정보'),
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
                        xtype: 'hiddenfield', name: 'smr_cd', reference: 'smr_cd' 
                    },
					{   
						rowspan: 2,
                        xtype: 'fieldcontainer',
                        fieldLabel: '*'+Locale.getMsg('고객사명'),
						labelWidth: 80,
                        combineErrors: true,
                        layout: 'hbox', 
                        defaults: {
                            //flex: 1,
                            hideLabel: true
                        },
                        items: [{
                            xtype: 'textareafield',
                            name: 'euser_nm',
                            reference: 'cust_nm',
                            itemId: 'cust_nm',
							allowBlank:false,
							width: 200,
                            margin: '0 5 0 0'
                        }, {
                            xtype: 'hiddenfield',
                            reference: 'cust_cd',
                            name: 'euser_cd',
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
                    { fieldLabel: Locale.getMsg('차수'), border: true, xtype: 'textfield', labelWidth: 100, width: 150, name: 'smr_chasu', reference: 'smr_chasu', readOnly: true },
					{ fieldLabel: Locale.getMsg('영업담당'), xtype: 'textfield',labelWidth: 80, name: 'qruser_nm', value: username, readOnly: true},
					{ fieldLabel: Locale.getMsg('영업담당ID'),xtype: 'hiddenfield',name: 'qruser_cd', value: loginUser},
					{ xtype: 'hiddenfield',name: 'qdept_cd', value: dept_cd},
                    { fieldLabel: Locale.getMsg('샘플완료요청일'), xtype: 'datefield', labelWidth: 100, width:230, format: 'Y-m-d', name: 'smr_crdate'},
					{ fieldLabel: Locale.getMsg('프로젝트가능성'), labelWidth: 100, width: 200, name: 'project_poss',
						xtype: 'combobox',
						reference: 'project_poss',
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
					{ fieldLabel: Locale.getMsg('접수담당'), xtype: 'textfield',labelWidth: 80, name: 'rruser_nm', readOnly: true },
					{ fieldLabel: Locale.getMsg('접수담당ID'),xtype: 'hiddenfield',name: 'rruser_cd', value: loginUser},
					{ fieldLabel: '*'+Locale.getMsg('발주예정일'), xtype: 'datefield', labelWidth: 100, width:230, format: 'Y-m-d', name: 'smr_podate',allowBlank:false},
				    {                         
                        rowspan: 2,
						xtype: 'fieldcontainer',
                        fieldLabel: '*'+Locale.getMsg('제품명'),
						labelWidth: 80,
                        combineErrors: true,
                        layout: 'hbox',
                        defaults: {
                            //flex: 1,
                            hideLabel: true
                        },
                        items: [{
                            xtype: 'textareafield',
                            name: 'item_nm',
                            reference: 'item_nm',
                            itemId: 'item_nm',
							allowBlank:false,
							width: 200,
                            margin: '0 5 0 0'
                        }, {
                            xtype: 'hiddenfield',
                            reference: 'item_cd',
                            name: 'item_cd',
                            itemId: 'item_cd'
                        }, {
                            iconCls: 'x-fa fa-search',
                            xtype: 'button',
                            scale: 'small',
                            margin: '0 5 0 0',
                            handler: 'openWindow2',
                            style: {
                                'border': 'none'
                            }
                        }, {
                            iconCls: 'x-fa fa-remove',
                            xtype: 'button',
                            scale: 'small',
                            handler: 'resetVal2',
                            style: {
                                'background-color': 'red !important',
                                'background-image': 'none',
                                'border': 'none'
                            }
                        }]
                    },
					{ fieldLabel: '*'+Locale.getMsg('수량'), xtype: 'numberfield', minValue:1, labelWidth: 100, width:250, name: 'smp_rqty', allowBlank:false, allowDecimals: false},
					{ fieldLabel: Locale.getMsg('진행상태'), labelWidth: 80, name: 'smp_status_nm', readOnly: true, xtype: 'textfield', reference: 'smp_status_nm'},
					{ fieldLabel: Locale.getMsg('요청일'), xtype: 'datefield', labelWidth: 100, width:230, format: 'Y-m-d', name: 'smr_rqdate', readOnly: true},					
					{ fieldLabel: '*'+Locale.getMsg('예상발주수량'), xtype: 'numberfield', minValue:1, labelWidth: 100, width:250, name: 'pur_oqty', allowBlank:false, allowDecimals: false},
					{ fieldLabel: '*'+Locale.getMsg('샘플목적'), xtype: 'fieldcontainer', labelWidth: 80, combineErrors: true, 
                        layout: 'hbox',
						defaultType: 'checkbox',
                        defaults: {
                            //flex: 1,
                            //hideLabel: true
                        },
                        items: [
							{ name: 'purp_color', reference: 'purp_color', itemId: 'purp_color', boxLabel: 'Color / Deco', checked: true, inputValue: 'Y', margin: '0 5 0 0'}, 
							{ name: 'purp_test', reference: 'purp_test', itemId: 'purp_test', boxLabel: 'Test', inputValue: 'Y'} 
						]
                    },
					{ fieldLabel: Locale.getMsg('접수일'), xtype: 'datefield', labelWidth: 100, width:230,  format: 'Y-m-d', name: 'smr_rrdate',readOnly: true},
					{ fieldLabel: Locale.getMsg('샘플유형'), labelWidth: 80, name: 'smr_type', colspan: 2,
					    xtype: 'combobox',
					    itemId: 'smr_type',
						reference: 'smr_type',
						publishes: 'value',  
						displayField: 'CODE_NM',
						valueField: 'CODE_ID',
		                emptyText: Locale.getMsg('선택'),
						store: {
							type: 'Tcode'
						},
						minChars: 0,
						queryMode: 'local',
						typeAhead: true,
						listeners: {
							change : 'onChange'
						}
					},					
					{ fieldLabel: Locale.getMsg('배송일'),xtype: 'datefield', labelWidth: 80, width:210, format: 'Y-m-d', name: 'ship_pdate',readOnly: true },					
					{ fieldLabel: Locale.getMsg('완료예정일'),xtype: 'datefield', labelWidth: 100, width:230, format: 'Y-m-d', name: 'prdt_pdate',readOnly: true },
					{ fieldLabel: '*'+Locale.getMsg('배송지'), xtype: 'textareafield', labelWidth: 80, style:{width:'100%',height:'100%'}, name: 'ship_to_adrs', allowBlank:false , rowspan:2, colspan:2 },
					{ fieldLabel: Locale.getMsg('송장번호'), xtype: 'textareafield', labelWidth: 80, style:{width:'100%'}, name: 'tracking_num', readOnly: true,rowspan:2 },
					{ fieldLabel: Locale.getMsg('수령일'),xtype: 'datefield', labelWidth: 100, width:230, format: 'Y-m-d', name: 'smr_prdate',readOnly: true},					
					{ fieldLabel: Locale.getMsg('초도선적요청일'), xtype: 'datefield', labelWidth: 100, width: 230, format: 'Y-m-d', name: 'smr_orderdate' }, 
                    { fieldLabel: Locale.getMsg('프로젝트정보 및 특이사항'), colspan: '3', xtype: 'textareafield', labelWidth: 80, style: { width: '100%', height: '200px' }, readOnly: false, name: 'smr_comment' }
        ]
    },{
        xtype: 'fieldset',
		scrollable:true,
        title: Locale.getMsg('샘플자료'),
        layout: {
            type: 'table',
            columns: 1,
            tableAttrs: {
                style: {
                    width: '100%'
                }
            }

        }, 
        items: [                       
                    {
                        xtype: 'muiltFileBox',
                        reference: 'muiltFileBox1',
                        itemId: 'muiltFileBox1'                      
					}
			  ]
	},{
        xtype: 'fieldset',
		scrollable:true,
        title: Locale.getMsg('샘플상세자료'),
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
                        xtype: 'muiltFileBox',
                        reference: 'muiltFileBox2',
                        itemId: 'muiltFileBox2',
                        colspan: 2
                    },
					{ fieldLabel: Locale.getMsg('인쇄필름번호'), xtype: 'textfield', name: 'artwork_no', width: 600, reference: 'artwork_no', itemId: 'artwork_no' },
					{
					    fieldLabel: 'Packing info', xtype: 'textfield', name: 'packing_info',
					    xtype: 'combobox',
					    reference: 'packing_info',
					    publishes: 'value',
					    displayField: 'CODE_NM',
					    valueField: 'CODE_ID', 
					    store: {
					        type: 'TcodeAll'
					    },
					    minChars: 0,
					    queryMode: 'local',
					    typeAhead: true
					}
        ]
    },{
        xtype: 'fieldset',
		scrollable:true,
        title: Locale.getMsg('제품정보'),
		itemid: 'sample_prodinfo',
		reference: 'sample_prodinfo',
        layout: {
            type: 'table',
            columns: 12,
            tableAttrs: {
                style: {
                    width: '100%',
					backgroundColor:'#BBBBBB', 
					'border-spacing': '1px'
                }
            },
			tdAttrs :{
                style: {
					'vertical-align': 'middle',
					'text-align': 'center',
					'padding': '2px  !important',
					backgroundColor:'#FFFFFF',
					'word-wrap': 'break-word'
                }
            }, 
			itemCls: 'cellmargin'
        },
		defaults: {
			xtype: 'textfield',
			hideLabel: true
		},
        items: [    
					{ xtype: 'label', text: Locale.getMsg('압출'), rowspan:7, tdAttrs:{style:{'font-weight': 'bold',width:'20px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('구경'), tdAttrs:{style:{width:'30px',backgroundColor:'#EFEFEF'}}},{ name:'extr_diameter',width:140,fieldStyle: 'background:#f6f6f6'},
					{ xtype: 'label', text: Locale.getMsg('사출'), rowspan:5, tdAttrs:{style:{'font-weight': 'bold',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('금형'), tdAttrs:{style:{width:'57px',backgroundColor:'#EFEFEF'}}},
				    { name:'neck_mold',itemId: 'neck_mold',inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',readOnly:true,width:140},
					{ xtype: 'label', text: Locale.getMsg('옵셋'), rowspan:3, tdAttrs:{style:{'font-weight': 'bold',width:'20px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('필름 NO'), tdAttrs:{style:{width:'57px',backgroundColor:'#EFEFEF'}}},
				    { name:'offset_filmno',itemId: 'offset_filmno',inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',width:140,readOnly:true},				
					{ xtype: 'label', text: Locale.getMsg('갭/조립'), rowspan:7, tdAttrs:{style:{'font-weight': 'bold',width:'20px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('종류'), tdAttrs:{style:{width:'57px',backgroundColor:'#EFEFEF'}}},{ name:'cap_spec',width:140,fieldStyle: 'background:#f6f6f6'},
					{ xtype: 'label', text: Locale.getMsg('겹수'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},{ name:'extr_layer',width:140,fieldStyle: 'background:#f6f6f6'},
					{ xtype: 'label', text: Locale.getMsg('유출구'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},{ name:'neck_orifice',width:140,fieldStyle: 'background:#f6f6f6'},
					{ xtype: 'label', text: Locale.getMsg('도수'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},{ name:'offset_pass',width:140,fieldStyle: 'background:#f6f6f6'},
					{ xtype: 'label', text: Locale.getMsg('유출구'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},{ name:'cap_orifice',width:140,fieldStyle: 'background:#f6f6f6'},				
					{ xtype: 'label', text: Locale.getMsg('길이'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},{ name:'extr_length',width:140,fieldStyle: 'background:#f6f6f6'},
					{ xtype: 'label', text: Locale.getMsg('색상'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},{ name:'neck_color',width:140,fieldStyle: 'background:#f6f6f6'},
					{ xtype: 'label', text: Locale.getMsg('코팅'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},{ name:'offset_coating',width:140,fieldStyle: 'background:#f6f6f6'},
					{ xtype: 'label', text: Locale.getMsg('외캡색상'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},{ name:'cap_outercolor',width:140,fieldStyle: 'background:#f6f6f6'},
					{ xtype: 'label', text: Locale.getMsg('색상'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},{ name:'extr_color',width:140,fieldStyle: 'background:#f6f6f6'},
					{ xtype: 'label', text: 'M/B', rowspan:2, tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},
				    { rowspan:2, name:'neck_mb',itemId: 'neck_mb',inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',width:70,readOnly:true},				
					{ xtype: 'label', text: Locale.getMsg('실크'), rowspan:2, tdAttrs:{style:{'font-weight': 'bold',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('필름 NO'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},
				    { name:'ss_filmno',itemId: 'ss_filmno',inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',width:70,readOnly:true},
					{ xtype: 'label', text: Locale.getMsg('내캡색상'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},
				    { name:'cap_innercolor',itemId: 'cap_innercolor',inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',width:70,readOnly:true},
					{ xtype: 'label', text: 'M/B', rowspan:3, tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},
				    { rowspan:3, name:'extr_mb',itemId: 'extr_mb',inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',width:70,readOnly:true}, 
					{ xtype: 'label', text: Locale.getMsg('도수'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},{ name:'ss_pass',width:140,fieldStyle: 'background:#f6f6f6'},
					{ xtype: 'label', text: Locale.getMsg('후가공'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},{ name:'cap_deco',width:140,fieldStyle: 'background:#f6f6f6'},
					{ xtype: 'label', html: 'Air<br>les<br>s', rowspan:2, tdAttrs:{style:{'font-weight': 'bold',width:'20px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('노출색상'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},{ name:'arls_color',width:140,fieldStyle: 'background:#f6f6f6'},
					{ xtype: 'label', text: Locale.getMsg('박'), rowspan:2, tdAttrs:{style:{'font-weight': 'bold',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('필름 NO'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},
				    { name:'hs_filmno',itemId: 'hs_filmno',inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',width:70,readOnly:true}, 				
					{ xtype: 'label', text: Locale.getMsg('공급처'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},
				    { name:'cap_supplier',itemId: 'cap_supplier',inputWrapCls: '', triggerWrapCls: '',fieldStyle: 'background:none',width:70,readOnly:true}, 	
					{ xtype: 'label', text: Locale.getMsg('실리콘'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},{ name:'arls_silicon',width:140,fieldStyle: 'background:#f6f6f6'},
					{ xtype: 'label', text: Locale.getMsg('도수'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},{ name:'hs_pass',width:140,fieldStyle: 'background:#f6f6f6'},
					{ xtype: 'label', text: Locale.getMsg('리드실'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},{ name:'cap_safetyseal',width:140,fieldStyle: 'background:#f6f6f6'}
        ]
    },{
        xtype: 'fieldset',
		scrollable:true,
        title: 'PUMP',
		itemid: 'sample_pump',
		reference: 'sample_pump',
        layout: {
            type: 'table',
            columns: 8,
            tableAttrs: {
                style: {
                    width: '100%',
					backgroundColor:'#BBBBBB', 
					'border-spacing': '1px'
                }
            },
			tdAttrs :{
                style: {
					'vertical-align': 'middle',
					'text-align': 'center',
					'padding': '2px  !important',
					backgroundColor:'#FFFFFF',
					'word-wrap': 'break-word'
                }
            }, 
			itemCls: 'cellmargin'
        },
		defaults: {
			xtype: 'textfield',
			hideLabel: true
		},
        items: [    
					{ xtype: 'label', text: Locale.getMsg('부자재명'), tdAttrs:{style:{width:'70px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('규격'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},
				    { xtype: 'label', text: Locale.getMsg('사출재질'), tdAttrs:{style:{width:'100px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('사출색상'), tdAttrs:{style:{width:'100px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('코팅/증착사양'), tdAttrs:{style:{width:'100px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('박인쇄'), tdAttrs:{style:{width:'100px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('실크인쇄사양'), tdAttrs:{style:{width:'100px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('설비번호'), tdAttrs:{style:{width:'100px',backgroundColor:'#EFEFEF'}}}
        ]
    },{
        xtype: 'fieldset',
		scrollable:true,
        title: 'BOTTLE',
		itemid: 'sample_bottle',
		reference: 'sample_bottle',
        layout: {
            type: 'table',
            columns: 8,
            tableAttrs: {
                style: {
                    width: '100%',
					backgroundColor:'#BBBBBB', 
					'border-spacing': '1px'
                }
            },
			tdAttrs :{
                style: {
					'vertical-align': 'middle',
					'text-align': 'center',
					'padding': '2px  !important',
					backgroundColor:'#FFFFFF',
					'word-wrap': 'break-word'
                }
            }, 
			itemCls: 'cellmargin'
        },
		defaults: {
			xtype: 'textfield',
			hideLabel: true
		},
        items: [    
					{ xtype: 'label', text: Locale.getMsg('부자재명'), tdAttrs:{style:{width:'70px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('규격'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},
				    { xtype: 'label', text: Locale.getMsg('사출재질'), tdAttrs:{style:{width:'100px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('사출색상'), tdAttrs:{style:{width:'100px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('코팅/증착사양'), tdAttrs:{style:{width:'100px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('박인쇄'), tdAttrs:{style:{width:'100px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('실크인쇄사양'), tdAttrs:{style:{width:'100px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('설비번호'), tdAttrs:{style:{width:'100px',backgroundColor:'#EFEFEF'}}} 
        ]
    },{
        xtype: 'fieldset',
		scrollable:true,
        title: 'OVERCAP',
		itemid: 'sample_overcap',
		reference: 'sample_overcap',
        layout: {
            type: 'table',
            columns: 8,
            tableAttrs: {
                style: {
                    width: '100%',
					backgroundColor:'#BBBBBB', 
					'border-spacing': '1px'
                }
            },
			tdAttrs :{
                style: {
					'vertical-align': 'middle',
					'text-align': 'center',
					'padding': '2px  !important',
					backgroundColor:'#FFFFFF',
					'word-wrap': 'break-word'
                }
            }, 
			itemCls: 'cellmargin'
        },
		defaults: {
			xtype: 'textfield',
			hideLabel: true
		},
        items: [    
					{ xtype: 'label', text: Locale.getMsg('부자재명'), tdAttrs:{style:{width:'70px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('규격'), tdAttrs:{style:{backgroundColor:'#EFEFEF'}}},
				    { xtype: 'label', text: Locale.getMsg('사출재질'), tdAttrs:{style:{width:'100px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('사출색상'), tdAttrs:{style:{width:'100px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('코팅/증착사양'), tdAttrs:{style:{width:'100px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('박인쇄'), tdAttrs:{style:{width:'100px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('실크인쇄사양'), tdAttrs:{style:{width:'100px',backgroundColor:'#EFEFEF'}}},
					{ xtype: 'label', text: Locale.getMsg('설비번호'), tdAttrs:{style:{width:'100px',backgroundColor:'#EFEFEF'}}} 
        ]
    },{
        xtype: 'fieldset',
		scrollable:true,
        title: Locale.getMsg('특이사항'),
		itemid: 'sample_remark_cmt',
		reference: 'sample_remark_cmt', 
        layout: 'column',
        items: [    
					{xtype: 'textareafield', name: 'remark_cmt',style:{width:'100%'}}
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
			    { xtype: 'hiddenfield', itemId: 'smp_status', name: 'smp_status', listeners: { change: 'onStatusChg' } },
                { xtype: 'hiddenfield', itemId: 'old_status', name: 'old_status'},
                { xtype: 'hiddenfield', itemId: 'btn_yn', name: 'btn_yn' },
                { xtype: 'hiddenfield', itemId: 'smp_detail_file_cnt', name: 'smp_detail_file_cnt' },
                 { xtype: 'hiddenfield', itemId: 'max_chasu', name: 'max_chasu' },
                { xtype: 'hiddenfield', itemId: 'req_return_yn', name: 'req_return_yn' },
                { xtype: 'hiddenfield', itemId: 'req_return_yn', name: 'req_return_yn' },
                { xtype: 'hiddenfield', itemId: 'req_review_yn', name: 'req_review_yn' },
                { xtype: 'hiddenfield', itemId: 'req_repair_yn', name: 'req_repair_yn' },
                { xtype: 'hiddenfield', itemId: 'drop_yn', name: 'drop_yn' },
            { xtype: 'hiddenfield', name: 'addchk' },
                { xtype: 'hiddenfield', name: 'status' },
                { xtype: 'hiddenfield', name: 'printBody', reference: 'printBody' },
                { xtype: 'hiddenfield', reference: 'smp_cd', name: 'smp_cd'},
                { xtype: 'hiddenfield', reference: 'smp_chasu', name: 'smp_chasu' },
                { xtype: 'hiddenfield', reference: 'specchk_cnt', name: 'specchk_cnt' },
                { xtype: 'hiddenfield', reference: 'spec_yn', name: 'spec_yn', value: 'N'  },
                {
                    xtype: 'button', text: Locale.getMsg('PPS확인'), name: 'fbtn5', itemId: 'fbtn5', margin: '5 5 5 5', hidden: true,
                    listeners: { click: 'onPPS' }
                },
                {
                    xtype: 'button', text: Locale.getMsg('요청반려 사유'), margin: '5 5 5 5', itemId: 'fbtn1', hidden: true,
                    listeners: { click: 'onReturn' }
                },
                {
                    xtype: 'button', text: Locale.getMsg('검토반려 사유'), margin: '5 5 5 5', itemId: 'fbtn2', hidden: true,
                    listeners: { click: 'onReturn2' }
                },
                {
                    xtype: 'button', text: Locale.getMsg('DROP 사유'), margin: '5 5 5 5', itemId: 'fbtn3', hidden: true,
                    listeners: { click: 'onDropHis' }
                },
                {
                    xtype: 'button', text: Locale.getMsg('샘플재작업 사유'), margin: '5 5 5 5', itemId: 'fbtn4', hidden: true,
                    listeners: { click: 'onRepairHis' }
                },
                { xtype: 'component', flex: 1 },
				{ xtype: 'hiddenfield', reference: 'modType', name: 'modType', itemId : 'modType', value : 'req'},  
				{ xtype: 'hiddenfield', name: 'mode', value: 'R' }, 
                {
                    xtype: 'button', text: Locale.getMsg('PRINT'), itemId: 'print', hidden: true,
                    handler: 'print'
                },
                {
                    xtype: 'button', text: Locale.getMsg('샘플재작업'), itemId: 'btn5', margin: '5 5 5 5', hidden: true,
                    listeners: { click: 'onRepairNew' }
                },
                {
                    xtype: 'button', text: Locale.getMsg('DROP'), itemId: 'btn6', margin: '5 5 5 5', hidden: true,
                    listeners: { click: 'onDropNew' }
                },
                {
                    xtype: 'button', text: Locale.getMsg('양산'), itemId: 'btn7', margin: '5 5 5 5', hidden: true,
                    listeners: { click: 'onProduction' }
                },
                {
                    xtype: 'button', text: Locale.getMsg('샘플수령'), itemId: 'btn8', margin: '5 5 5 5', hidden: true,
                    listeners: { click: 'onReceipt' }
                },
				{ xtype: 'button', text: Locale.getMsg('샘플요청'), itemId : 'btn1',  margin: '5 5 5 5', hidden: true,
					listeners: {click : 'onRequest'}
				},
                {
                    xtype: 'button', text: Locale.getMsg('요청철회'), itemId: 'btn9',  margin: '5 5 5 5', hidden: true,
                    listeners: { click: 'onCancel' }
                },
				{
				    xtype: 'button', text: Locale.getMsg('삭제'), itemId: 'btn2', margin: '5 5 5 5', hidden: true,
				    listeners: { click: 'onDelete' }
				},
                { xtype: 'button', text: Locale.getMsg('신규저장'), itemId : 'btn3', margin: '5 5 5 5', hidden: true,
                    listeners: {click : 'onCopy'}					
				},
                { xtype: 'button', text: Locale.getMsg('임시저장'), reference:'btn4', itemId : 'btn4', margin: '5 5 5 5',hidden: true,
                    listeners: {click : 'onSubmit'}
                },
                {
                    xtype: 'button', text: Locale.getMsg('정보수정'), itemId: 'btn10', margin: '5 5 5 5', hidden: true,
                    listeners: { click: 'onModify' }
                },
                 {
                     xtype: 'button', text: Locale.getMsg('메일발송'), name: 'btn11', itemId: 'btn11', margin: '5 5 5 5',
                     listeners: { click: 'openMail' }
                 }

            ]
        }]
});




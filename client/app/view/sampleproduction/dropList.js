
Ext.define('Ysn.view.sampleproduction.dropList',{
    extend: 'Ext.grid.Panel',
    xtype: 'dropList',
    requires: [
        'Ysn.view.sampleproduction.dropListController', 
		'Ysn.store.subSampleProductionList',
		'Ext.grid.filters.Filters' 
    ],
    
    controller: 'sampleproduction-dropList',     
	store: {
        type: 'sampleDropList', 
		autoLoad: false,
        autoDestroy: true
    }, 
	style: {'borderTop':'1px solid gray'},
	enableLocking: true,
	id: 'dropList',
    columnLines: true,
	multiColumnSort: true, 
	plugins: ['gridfilters', 'pmh-grid-exporter'],
	columns: [
			{text: Locale.getMsg('Drop일자'), width: 125, dataIndex: 'SMP_DRDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true, filter: true},
            {text: "SMP.NO", width: 100, dataIndex: 'SMP_CD', sortable: true, 
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
            {text: Locale.getMsg('샘플품목'),  width: 200, dataIndex: 'ITEM_NM', sortable: true,
			 filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
            {text: Locale.getMsg('차수'), width: 60, dataIndex: 'SMP_CHASU', sortable: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
            {text: Locale.getMsg('거래처'), width: 125, dataIndex: 'CUST_NM', sortable: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
			{text: Locale.getMsg('End User'), width: 125, dataIndex: 'EUSER_NM', sortable: true, 
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
			{text: Locale.getMsg('매출조직'), width: 125, dataIndex: 'DEPT_NM', sortable: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
			{text: Locale.getMsg('영업담당'), width: 125, dataIndex: 'USER_NM', sortable: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
			{text: "Drop유형", width: 125, dataIndex: 'SMP_DRTYPE_NM', sortable: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			}, 
			{text: Locale.getMsg('사업유형'), width: 125, dataIndex: 'BIZ_TYPE_NM', sortable: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
			{text: Locale.getMsg('품목유형'), width: 125, dataIndex: 'ITEM_TYPE_NM', sortable: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			}, 
			{text: Locale.getMsg('제작완료일'), width: 125, dataIndex: 'PRDT_CDATE',renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true},
			{text: Locale.getMsg('배송[선적]일'), width: 125, dataIndex: 'SHIP_PDATE',renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true}, 
			{text: Locale.getMsg('악성업체유무'), width: 125, dataIndex: 'BAD_AR_YN', sortable: true, hidden: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
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

Ext.define('Ysn.view.sampleproduction.dropDetail',{
    extend: 'Ext.form.Panel',
    xtype: 'sampleproduction-dropDetail',
    requires: [
        'Ysn.view.sampleproduction.dropDetailController'
    ],

    controller: 'sampleproduction-dropDetail', 


    frame: true,
    id: 'dropDetail',
	reference: 'dropDetail',
    bodyPadding: 10,
    scrollable:true,
    width: 900,   
    reader: {
        type: 'json',
        model: 'Ysn.model.sampleDropDetail',
        rootProperty: '' 
    },
 
	fieldDefaults: { 
			labelAlign: 'right', 
			msgTarget: 'side' , 
			readOnly: true
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
						colspan: 3,
                        xtype: 'fieldcontainer',
                        fieldLabel: '*'+Locale.getMsg('샘플품목'),
						labelWidth: 80,
						style:{width:'100%'},
                        combineErrors: true,
                        layout: 'hbox', 
                        defaults: {
                            //flex: 1,
                            hideLabel: true
                        },
                        items: [{
                            xtype: 'textfield',
                            name: 'smp_cd',
                            reference: 'smp_cd',
                            itemId: 'smp_cd', 
							width: 150,
                            margin: '0 5 0 0'
                        },{
                            xtype: 'textfield',
                            name: 'smp_chasu',
                            reference: 'smp_chasu',
                            itemId: 'smp_chasu', 
							width: 30,
                            margin: '0 5 0 0'
                        },{
                            xtype: 'textfield',
                            name: 'item_nm',
                            reference: 'item_nm',
                            itemId: 'item_nm', 
                            width:350,
                            margin: '0 5 0 0'
                        }, {
                            xtype: 'hiddenfield',
                            reference: 'item_cd',
                            name: 'item_cd',
                            itemId: 'item_cd'
                        }, {
                            xtype: 'hiddenfield',
                            name: 'mod_usr',
                            value: loginUser
                        }]
                    },
                    {   
                        xtype: 'fieldcontainer',
                        fieldLabel: Locale.getMsg('SMR코드명'),
						labelWidth: 100,
						style:{width:'100%'},
                        combineErrors: true,
                        layout: 'hbox', 
                        defaults: {
                            //flex: 1,
                            hideLabel: true
                        },
                        items: [{
                            xtype: 'textfield',
                            name: 'smr_cd',
                            reference: 'smr_cd',
                            itemId: 'smr_cd', 
							width: 100,
                            margin: '0 5 0 0'
                        },{
                            xtype: 'textfield',
                            name: 'smr_chasu',
                            reference: 'smr_chasu',
                            itemId: 'smr_chasu', 
                            width:50,
                            margin: '0 5 0 0'
                        }]
                    },
					{
						xtype: 'fieldcontainer',
						colspan: 3,
						labelWidth: 80,
						fieldLabel: Locale.getMsg('거래처'),
						labelAlign: 'right',
						combineErrors: true,
						msgTarget : 'side',
						layout: 'hbox',
						defaults: {
							//flex: 1,
							hideLabel: true
						},
							items: [{
								xtype: 'textfield',
								name: 'cust_nm', 
								reference : 'cust_nm',
								itemId : 'cust_nm',
								margin: '0 5 0 0',
								width: 300
							},{
								xtype: 'hiddenfield',
								reference: 'cust_cd', 
								name: 'cust_cd', 
								itemId : 'cust_cd'
							}]
					},
				    { fieldLabel: Locale.getMsg('고객의뢰번호'), xtype: 'textfield',labelWidth: 100, name: 'cust_smp_cd' },
					{ fieldLabel: Locale.getMsg('End User'), colspan: 3, xtype: 'textfield',labelWidth: 80, style:{width:'100%'}, name: 'euser_nm', readOnly: true},
                    { fieldLabel: '*'+Locale.getMsg('접수일'), xtype: 'datefield', labelWidth: 100, width:230, format: 'Y-m-d', name: 'smp_rdate'},
					{ fieldLabel: Locale.getMsg('유통구조'), xtype: 'textfield',labelWidth: 80, name: 'dstr_type_nm', readOnly: true },	
					{ fieldLabel: '유통구조코드', xtype: 'hiddenfield',name: 'dstr_type'},	
					{ fieldLabel: Locale.getMsg('샘플유형'), xtype: 'textfield',labelWidth: 100, name: 'smp_type_nm' },
					{ xtype: 'hiddenfield', name: 'smp_type' },
					{ fieldLabel: Locale.getMsg('사업유형'), xtype: 'textfield',labelWidth: 100, name: 'biz_type_nm' },
					{ xtype: 'hiddenfield', name: 'biz_type' },
					{ fieldLabel: Locale.getMsg('제품런칭일'), xtype: 'datefield', labelWidth: 100, width:230, format: 'Y-m-d', name: 'prdt_rcdate'},
					{ fieldLabel: Locale.getMsg('영업담당'), xtype: 'textfield',labelWidth: 80, name: 'user_nm', readOnly: true },
					{ fieldLabel: Locale.getMsg('양산가능성'), xtype: 'textfield',labelWidth: 100, name: 'prdt_psblt_nm' },
					{ xtype: 'hiddenfield', name: 'prdt_psblt' }, 
					{ fieldLabel: Locale.getMsg('진행상태'), xtype: 'textfield',labelWidth: 80, width: 230, name: 'smp_status_nm', readOnly: true }, 
				    { fieldLabel: Locale.getMsg('필름전달예정일'), xtype: 'datefield', labelWidth: 100, width:230, format: 'Y-m-d', name: 'film_fdate'},
					{ fieldLabel: Locale.getMsg('매출조직'), xtype: 'textfield',labelWidth: 80, name: 'dept_nm', readOnly: true},
					{ fieldLabel: Locale.getMsg('의뢰접수담당'), colspan: 2, xtype: 'textfield',labelWidth: 100, name: 'ruser_nm', readOnly: true},
					{ fieldLabel: '*'+Locale.getMsg('완료요청일'), xtype: 'datefield', labelWidth: 100, width:230, format: 'Y-m-d', name: 'cmpt_rdate'},
					{ fieldLabel: Locale.getMsg('금형번호'), xtype: 'textfield',labelWidth: 80, name: 'mold_no'}, 
					{   						 
                        xtype: 'fieldcontainer',
                        fieldLabel: '*'+Locale.getMsg('제작의뢰수량'),
						colspan: 2, 
						labelWidth: 100,
                        combineErrors: true,
                        layout: 'hbox', 
                        defaults: {
                            //flex: 1,
                            hideLabel: true
                        },
                        items: [{ xtype: 'numberfield', minValue:1, width:150, name: 'smp_rqty', allowDecimals: false, margin: '0 5 0 0'},
								{ xtype: 'label', html: '<b>+</b>', margin: '6 5 0 0'},
								{ xtype: 'numberfield', minValue:1, width:150, name: 'smp_rqty2',allowDecimals: false}]
                    },
					{ fieldLabel: Locale.getMsg('제작의뢰일'), xtype: 'datefield', labelWidth: 100, width:230, format: 'Y-m-d', name: 'prdt_rdate'},
					{ fieldLabel: Locale.getMsg('특이사항'), rowspan:2, colspan:3, xtype: 'textareafield', labelWidth: 80, name: 'smp_sumry', style:{width:'100%'}},
					{ fieldLabel: Locale.getMsg('배송(선적)일'), xtype: 'datefield', labelWidth: 100, width:230, format: 'Y-m-d', name: 'ship_pdate'},
					{   						 
                        xtype: 'fieldcontainer',
                        fieldLabel: '*'+Locale.getMsg('기준통화'),
						labelWidth: 100,
                        combineErrors: true,
                        layout: 'hbox', 
                        defaults: {
                            //flex: 1,
                            hideLabel: true
                        },
                        items: [
								{ xtype: 'textfield', name:'base_yr', width:55,margin: '0 1 0 0'},
								{ xtype: 'textfield', name:'base_crny', width:50,margin: '0 1 0 0'},
								{ xtype: 'textfield', name:'exch_rate', width:60}
					    ] 
                    }
        ]
    },{
        xtype: 'fieldset',
		scrollable:true,
        title: Locale.getMsg('샘플 제작 정보'),
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
			        { fieldLabel: Locale.getMsg('제작담당'), xtype: 'textfield',labelWidth: 100, name: 'muser_nm', readOnly: true },
			        { xtype: 'hiddenfield', name: 'muser_cd'},
					{ fieldLabel: Locale.getMsg('제작승인일'), xtype: 'datefield', labelWidth: 100, format: 'Y-m-d', name: 'prdt_adate', readOnly: true},
					{ fieldLabel: Locale.getMsg('완료예정일'), xtype: 'datefield', labelWidth: 100, format: 'Y-m-d', name: 'prdt_pdate', readOnly: true}, 
					{ fieldLabel: Locale.getMsg('제작수량'), xtype: 'numberfield', minValue:1, labelWidth:150, allowDecimals: false, readOnly: true, name: 'smp_qty'},
					{ fieldLabel: Locale.getMsg('사양확정일'), xtype: 'datefield', labelWidth: 100, format: 'Y-m-d', name: 'film_rdate', readOnly: true},
					{ fieldLabel: Locale.getMsg('제작완료일'), xtype: 'datefield', labelWidth: 100, format: 'Y-m-d', name: 'prdt_cdate', readOnly: true},
					{ fieldLabel: Locale.getMsg('제작지시사항'), colspan:3, xtype: 'textareafield', labelWidth: 100, name: 'prdt_cmt', readOnly: true, style:{width:'100%'}}
        ]
    },{
        xtype: 'fieldset',
		scrollable:true,
        title: Locale.getMsg('영업 관련 자료'),
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
        title: Locale.getMsg('제작 관련 자료'),
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
                         reference: 'muiltFileBox2',
                         itemId: 'muiltFileBox2'
                     }
			  ]
	},{
        xtype: 'fieldset',
		scrollable:true,
        title: Locale.getMsg('샘플요청 관련 자료'),
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
                         reference: 'muiltFileBox3',
                         itemId: 'muiltFileBox3'
                     }
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
				{ xtype: 'hiddenfield', name:'drop_btn_yn', value: 'N',listeners: {change : 'onDropBtnChg'}}, 
				{ xtype: 'hiddenfield', name:'smp_re_yn', value: 'N' ,listeners: {change : 'onReynBtnChg'} }, 
				{ xtype: 'hiddenfield', name:'smp_my_re_yn', value: 'N' ,listeners: {change : 'onMyreynBtnChg'}}, 
				{ xtype: 'hiddenfield', name:'smp_rt_yn', value: 'N',listeners: {change : 'onRtynBtnChg'} }, 
				{ xtype: 'button', text: Locale.getMsg('Drop정보'), name: 'rtnbtn1', itemId: 'rtnbtn1', margin: '5 5 5 5',hidden: true,
                    listeners: {click : 'onDrop'}
                },
				{ xtype: 'button', text: Locale.getMsg('샘플재작업정보'), name: 'rtnbtn2', itemId: 'rtnbtn2', margin: '5 5 5 5',hidden: true,
                    listeners: {click : 'onRepair'}
                },
				{ xtype: 'button', text: Locale.getMsg('자체재작업정보'), name: 'rtnbtn3', itemId: 'rtnbtn3', margin: '5 5 5 5',hidden: true,
                    listeners: {click : 'onMyRepair'}
                },
				{ xtype: 'button', text: Locale.getMsg('의뢰반려정보'), name: 'rtnbtn4', itemId: 'rtnbtn4', margin: '5 5 5 5',hidden: true,
                    listeners: {click : 'onReject'}
                },
				{ xtype: 'hiddenfield', name:'addchk', value: 'modify' }, 
				{ xtype: 'hiddenfield', name: 'smp_status'},
				{ xtype: 'hiddenfield', name: 'state', value: ''},
				'->'
            ]
        }]
});


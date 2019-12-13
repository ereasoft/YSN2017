
Ext.define('Ysn.view.sampleproduction.instanceList',{
    extend: 'Ext.grid.Panel',
    xtype: 'instanceList',
    requires: [
        'Ysn.view.sampleproduction.instanceListController', 
		'Ysn.store.subSampleProductionList',
		'Ext.grid.filters.Filters' 
    ],
    
    controller: 'sampleproduction-instanceList',     
	store: {
        type: 'sampleProductionList' 
    }, 
	style: {'borderTop':'1px solid gray'},
	enableLocking: true,
	id: 'instanceList',
    columnLines: true,
	multiColumnSort: true, 
	plugins: ['gridfilters', 'pmh-grid-exporter'],
	columns: [
            {text: "SMP.NO", width: 100, dataIndex: 'SMP_CD', sortable: true, 
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: '검색어입력..'
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
			{text: "제작담당", width: 125, dataIndex: 'MUSER_NM', sortable: true, 
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
			{text: Locale.getMsg('진행상태'), width: 125, dataIndex: 'SMP_STATUS_NM', sortable: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
            {
			    text: Locale.getMsg('샘플유형'), width: 100, dataIndex: 'SMP_TYPE_NM', sortable: true,
			    filter: {
			        type: 'string',
			        itemDefaults: {
			            emptyText: Locale.getMsg('검색어입력..')
			        }
			    }
			},
			{text: "양산가능성", width: 125, dataIndex: 'PRDT_PSBLT_NM', sortable: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
			{ text: Locale.getMsg( '예상발주수량' ), width: 125, dataIndex: 'PUR_OQTY', },
            { text: Locale.getMsg( '제작의뢰수량' ), width: 125, dataIndex: 'SMP_RQTY', },
			{text: Locale.getMsg('접수일'), width: 125, dataIndex: 'SMP_RDATE',renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true, filter: true},
			{ text: Locale.getMsg( '수주예정일' ), width: 125, dataIndex: 'PRDT_RCDATE', renderer: Ext.util.Format.dateRenderer( 'Y-m-d' ), sortable: true },      
			{text: Locale.getMsg('필름전달예정일'), width: 125, dataIndex: 'FILM_FDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true},
            { text: Locale.getMsg( '필름전달일' ), width: 125, dataIndex: 'FILM_CDATE', renderer: Ext.util.Format.dateRenderer( 'Y-m-d' ), sortable: true },
            { text: Locale.getMsg( '타겟전달일' ), width: 125, dataIndex: 'TARGET_FDATE', renderer: Ext.util.Format.dateRenderer( 'Y-m-d' ), sortable: true },
			{text: Locale.getMsg('완료요청일'), width: 125, dataIndex: 'CMPT_RDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true},
			{text: Locale.getMsg('제작의뢰일'), width: 125, dataIndex: 'PRDT_RDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true},
			{text: Locale.getMsg('의뢰승인일'), width: 125, dataIndex: 'PRDT_ADATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true},
			{ text: Locale.getMsg('완료예정일'), width: 125, dataIndex: 'PRDT_PDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
			{ text: Locale.getMsg('2치완료예정일'), width: 125, dataIndex: 'PRDT_PDATE2', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
			{
			    text: Locale.getMsg('샘플공정'), width: 125, dataIndex: 'PROCESS_NM', sortable: true,
			    filter: {
			        type: 'string',
			        itemDefaults: {
			            emptyText: Locale.getMsg('검색어입력..')
			        }
			    }
			},
			{ text: Locale.getMsg('지연사유'), width: 125, dataIndex: 'DELAY_COMMENT_NM', sortable: true },
			{text: Locale.getMsg('사양확정일'), width: 125, dataIndex: 'FILM_RDATE',renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true},
			{text: Locale.getMsg('제작완료일'), width: 125, dataIndex: 'PRDT_CDATE',renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true},
			{text: Locale.getMsg('배송[선적]일'), width: 125, dataIndex: 'SHIP_PDATE',renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true}
			,
			/*{text: "프로젝트", width: 125, dataIndex: 'PJT_NM', sortable: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			}
			,*/
            { text: Locale.getMsg('유상여부'), width: 80, dataIndex: 'NONFREE_YN', sortable: true },
            { text: Locale.getMsg('샘플재작업유형'), width: 150, dataIndex: 'SMP_CRTYPE_NM', sortable: true },
			{text: Locale.getMsg('악성업체유무'), width: 125, dataIndex: 'BAD_AR_YN', sortable: true, hidden: true, 
			  filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
			{text: Locale.getMsg('유통구조명'), width: 125, dataIndex: 'DSTR_TYPE_NM', hidden: true},
			{text: Locale.getMsg('사업유형명'), width: 125, dataIndex: 'BIZ_TYPE_NM', hidden: true},
			{text: Locale.getMsg('품목유형명'), width: 125, dataIndex: 'ITEM_TYPE_NM', hidden: true},
			{text: Locale.getMsg('진행상태명'), width: 125, dataIndex: 'SMP_STATUS_NM', hidden: true},
			{ text: Locale.getMsg('양산가능성명'), width: 125, dataIndex: 'PRDT_PSBLT_NM', hidden: true },
            { text: Locale.getMsg('샘플유형'), dataIndex: 'SMP_TYPE', hidden: true }
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

Ext.define('Ysn.view.sampleproduction.instanceDetail',{
    extend: 'Ext.form.Panel',
    xtype: 'sampleproduction-instanceDetail',
    requires: [
        'Ysn.view.sampleproduction.instanceDetailController'
    ],

    controller: 'sampleproduction-instanceDetail', 


    frame: true,
    id: 'instanceDetail',
	reference: 'instanceDetail',
    bodyPadding: 10,
    scrollable:true,
    width: 900,   
    reader: {
        type: 'json',
        model: 'Ysn.model.sampleProductionDetail',
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
						colspan: 3,
                        xtype: 'fieldcontainer',
                        fieldLabel: '*'+Locale.getMsg('샘플품목'),
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
                            name: 'smp_cd',
                            reference: 'smp_cd',
                            itemId: 'smp_cd', 
							width: 150,
							readOnly: true,
                            margin: '0 5 0 0' 
							
                        },{
                            xtype: 'textfield',
                            name: 'smp_chasu',
                            reference: 'smp_chasu',
                            itemId: 'smp_chasu', 
							width: 30,
							readOnly: true,
                            margin: '0 5 0 0' 
                        },{
                            xtype: 'textfield',
                            name: 'item_nm',
                            reference: 'item_nm',
                            itemId: 'item_nm',
							allowBlank:false,
                            width:340,
							//readOnly: true,
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
                        }, {
                            iconCls: 'x-fa fa-search',
                            xtype: 'button',
							itemId: 'btn00',
                            scale: 'small',
                            margin: '0 5 0 0',
                            handler: 'openWindow',
                            style: {
                                'border': 'none'
                            }
                        }, {
                            iconCls: 'x-fa fa-remove',
                            xtype: 'button',
							itemId: 'btn01',
							scale: 'small',
							margin: '0 5 0 0',
                            handler: 'resetVal',
                            style: {
                                'background-color': 'red !important',
                                'background-image': 'none',
                                'border': 'none'
                            }
                        }, { 
                            xtype: 'button',
                            itemId: 'btn02',
                            text: Locale.getMsg('샘플품목등록'),
                            handler: 'insItem',
                            style: {
                                'border': 'none'
                            }
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
							readOnly: true,
                            margin: '0 5 0 0'
                        },{
                            xtype: 'textfield',
                            name: 'smr_chasu',
                            reference: 'smr_chasu',
                            itemId: 'smr_chasu', 
                            width:50,
							readOnly: true,
                            margin: '0 5 0 0'
                        }]
                    },
                    {
                        colspan: 2,
                        xtype: 'fieldcontainer',
                        fieldLabel: Locale.getMsg('프로젝트'),
                        labelWidth: 100,
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
                            name: 'pjt_nm',
                            reference: 'pjt_nm',
                            itemId: 'pjt_nm',
                            margin: '0 5 0 0',
                            width: 250
                        }, {
                            xtype: 'hiddenfield',
                            reference: 'pjt_cd',
                            name: 'pjt_cd',
                            itemId: 'pjt_cd'
                        }, {
                            iconCls: 'x-fa fa-search',
                            xtype: 'button',
                            scale: 'small',
                            margin: '0 5 0 0',
                            handler: 'openPrj',
                            style: {
                                'border': 'none'

                            }
                        }, {
                            iconCls: 'x-fa fa-remove',
                            xtype: 'button',
                            scale: 'small',
                            handler: 'resetPrj',
                            style: {
                                'background-color': 'red !important',
                                'background-image': 'none',
                                'border': 'none'

                            }, margin: '0 5 0 0'
                        }, { xtype: 'textfield', width: 120, name: 'smpcd_chasu', reference: 'smpcd_chasu', readOnly: true }]
                    },
                    { fieldLabel: Locale.getMsg('유상여부'), xtype: 'checkboxfield', labelWidth: 100, name: 'nonfree_yn' ,inputValue: 'Y', checked: false},
				    { fieldLabel: Locale.getMsg('고객의뢰번호'), xtype: 'textfield', labelWidth: 100, name: 'cust_smp_cd' },
					{
						xtype: 'fieldcontainer',
						colspan: 2,
						labelWidth: 100,
						fieldLabel: '*' + Locale.getMsg('거래처'),
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
								//readOnly: true,
								width: 300
							},{
								xtype: 'hiddenfield',
								reference: 'cust_cd', 
								name: 'cust_cd', 
								itemId : 'cust_cd'
							}, {
								iconCls: 'x-fa fa-search', 
								xtype: 'button',
								itemId: 'btn03',
								scale: 'small',
								margin: '0 5 0 0',
								handler : 'openWindow3',
								style:{ 
									'border':'none' 

								}
							},{
								iconCls: 'x-fa fa-remove', 
								xtype: 'button',
								itemId: 'btn04',
								scale: 'small',
								handler: 'resetVal3',
								margin: '0 5 0 0',
								style:{
									'background-color': 'red !important',
									'background-image': 'none',
									'border':'none' 

								}
							} ]
					},
					{ fieldLabel: Locale.getMsg('영업담당'), xtype: 'textfield', labelWidth: 100, itemId:'user_nm', name: 'user_nm', readOnly: true },
					{ fieldLabel: Locale.getMsg('매출조직'), xtype: 'textfield', labelWidth: 100, itemId: 'dept_nm', name: 'dept_nm', readOnly: true },
                    {
                        xtype: 'fieldcontainer',
                        colspan: 2,
                        labelWidth: 100,
                        fieldLabel: Locale.getMsg('End User'),
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
                            name: 'euser_nm',
                            reference: 'euser_nm',
                            itemId: 'euser_nm',
                            margin: '0 5 0 0',
                            //readOnly: true,
                            width: 300
                        }, {
                            xtype: 'hiddenfield',
                            reference: 'euser_cd',
                            name: 'euser_cd',
                            itemId: 'euser_cd'
                        }, {
                            iconCls: 'x-fa fa-search',
                            xtype: 'button',
                            itemId: 'btn05',
                            scale: 'small',
                            margin: '0 5 0 0',
                            handler: 'openWindow4',
                            style: {
                                'border': 'none'

                            }
                        }, {
                            iconCls: 'x-fa fa-remove',
                            xtype: 'button',
                            itemId: 'btn06',
                            scale: 'small',
                            handler: 'resetVal4',
                            style: {
                                'background-color': 'red !important',
                                'background-image': 'none',
                                'border': 'none'

                            }
                        }]
                    },
					{ fieldLabel: Locale.getMsg('의뢰접수담당'), xtype: 'textfield', labelWidth: 100, name: 'ruser_nm', readOnly: true },
                    { fieldLabel: '*' + Locale.getMsg('접수일'), xtype: 'datefield', labelWidth: 100, width: 230, format: 'Y-m-d', reference: 'smp_rdate', name: 'smp_rdate' },			
                    {
                        fieldLabel: '*' + Locale.getMsg('유통구조'), labelWidth: 100, name: 'dstr_type',
                        xtype: 'combobox',
                        itemId: 'dstr_type',
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
                        allowBlank: true,
                        typeAhead: true
                    },
                    {
                        fieldLabel: '*' + Locale.getMsg('샘플유형'), labelWidth: 100, name: 'smp_type',
						xtype: 'combobox',
						reference: 'smp_type',
						publishes: 'value',  
						displayField: 'CODE_NM',
						valueField: 'CODE_ID', 
		                emptyText: Locale.getMsg('선택'),
						store: {
							type: 'Tcode'
						},
						minChars: 0,
						queryMode: 'local',
						allowBlank:false,
						typeAhead: true,
						listeners: {
                            change : 'allowBlankChk'
						}
					},
					{ fieldLabel: '*'+Locale.getMsg('사업유형'), labelWidth: 100, name: 'biz_type',
						xtype: 'combobox',
						reference: 'biz_type',
						publishes: 'value',  
						displayField: 'CODE_NM',
						valueField: 'CODE_ID', 
		                emptyText: Locale.getMsg('선택'),
						store: {
							type: 'Tcode'
						},
						minChars: 0,
						queryMode: 'local',
						allowBlank:false,
						typeAhead: true
					},
					{ fieldLabel: '*' + Locale.getMsg('수주예정일'), xtype: 'datefield', labelWidth: 100, width: 230, format: 'Y-m-d', reference: 'prdt_rcdate', itemId: 'prdt_rcdate', name: 'prdt_rcdate' },
					{ fieldLabel: Locale.getMsg('금형번호'), xtype: 'textfield', labelWidth: 100, name: 'mold_no' },
					{ fieldLabel: Locale.getMsg('양산가능성'), labelWidth: 100, name: 'prdt_psblt',itemId: 'prdt_psblt',
						xtype: 'combobox',
						reference: 'prdt_psblt',
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
                    { fieldLabel: Locale.getMsg( '예상발주수량' ), xtype: 'numberfield', labelWidth: 100, width: 230, itemId: 'pur_oqty', name: 'pur_oqty', minValue: 0, allowDecimals: false, readOnly: false },
				    { fieldLabel: Locale.getMsg('필름전달예정일'), xtype: 'datefield', labelWidth: 100, width: 230, format: 'Y-m-d', name: 'film_fdate' },
					{
					    xtype: 'fieldcontainer',
					    fieldLabel: '*' + Locale.getMsg('제작의뢰수량'),
					    colspan: 2,
					    labelWidth: 100,
					    combineErrors: true,
					    layout: 'hbox',
					    defaults: {
					        //flex: 1,
					        hideLabel: true
					    },
					    items: [{ xtype: 'numberfield', minValue: 0, width: 150, name: 'smp_rqty', reference: 'smp_rqty', itemId: 'smp_rqty', allowBlank: false, allowDecimals: false, margin: '0 5 0 0' },
								{ xtype: 'label', html: '<b>+</b>', margin: '6 5 0 0' },
								{ xtype: 'numberfield', minValue: 0, width: 150, name: 'smp_rqty2', reference: 'smp_rqty2', allowBlank: true, allowDecimals: false }]
					},
					{ fieldLabel: Locale.getMsg('제작의뢰일'), xtype: 'datefield', labelWidth: 100, width: 230, format: 'Y-m-d', name: 'prdt_rdate', readOnly: true },
					{ fieldLabel: Locale.getMsg( '필름전달일' ), xtype: 'datefield', labelWidth: 100, width: 230, format: 'Y-m-d', name: 'film_cdate', reference: 'film_cdate' ,allowBlank:true },
					{ fieldLabel: Locale.getMsg('특이사항'), rowspan:5, colspan:2, xtype: 'textareafield', labelWidth: 100,height:180, name: 'smp_sumry', style:{width:'100%'}},
                    { fieldLabel: Locale.getMsg( '송장번호' ), rowspan: 5, xtype: 'textareafield', labelWidth: 100, height: 180, name: 'tracking_num', style: { width: '100%' } },
                    { fieldLabel: Locale.getMsg( '타겟전달일' ), xtype: 'datefield', labelWidth: 100, width: 230, format: 'Y-m-d', name: 'target_fdate', reference: 'target_fdate' ,allowBlank:true },
                    { fieldLabel: '*' + Locale.getMsg( '완료요청일' ), xtype: 'datefield', labelWidth: 100, width: 230, format: 'Y-m-d', name: 'cmpt_rdate', reference: 'cmpt_rdate'/*,allowBlank:true*/ },
                    { fieldLabel: Locale.getMsg( '배송(선적)일' ), xtype: 'datefield', labelWidth: 100, width: 230, format: 'Y-m-d', name: 'ship_pdate', readOnly: false },
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
                        items: [{ iconCls: 'x-fa fa-search', xtype: 'button', name:'btn0', itemId:'btn0', scale: 'small', handler: 'openCrny', margin: '0 1 0 0'},
								{ xtype: 'textfield', name: 'base_yr', reference: 'base_yr', itemId: 'base_yr', width: 55, allowBlank: false, margin: '0 1 0 0' },
								{ xtype: 'textfield', name: 'base_crny', reference: 'base_crny', itemId: 'base_crny', width: 50, allowBlank: false, margin: '0 1 0 0' },
								{ xtype: 'textfield', name: 'exch_rate', reference: 'exch_rate', itemId: 'exch_rate', width: 60, allowBlank: false }
					    ] 
					}, 
					{ fieldLabel: Locale.getMsg( '진행상태' ), xtype: 'textfield', labelWidth: 100, name: 'smp_status_nm', readOnly: true }
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
					{ fieldLabel: Locale.getMsg('제작담당'), xtype: 'textfield',labelWidth: 100, name: 'prdt_cuser_nm', readOnly: true },
					{ fieldLabel: Locale.getMsg('제작승인일'), xtype: 'datefield', labelWidth: 100, format: 'Y-m-d', name: 'prdt_adate', readOnly: true},
					{ fieldLabel: Locale.getMsg('완료예정일'), xtype: 'datefield', labelWidth: 100, format: 'Y-m-d', name: 'prdt_pdate', readOnly: true},
					{ fieldLabel: Locale.getMsg('제작수량'), xtype: 'numberfield', minValue:1, labelWidth:100, name: 'smp_qty',  allowDecimals: false,readOnly: true},
					{ fieldLabel: Locale.getMsg('사양확정일'), xtype: 'datefield', labelWidth: 100, format: 'Y-m-d', name: 'film_rdate', readOnly: true},
					{ fieldLabel: Locale.getMsg('제작완료일'), xtype: 'datefield', labelWidth: 100, format: 'Y-m-d', name: 'prdt_cdate', readOnly: true},
                    { fieldLabel: Locale.getMsg('제작공정'), xtype: 'textfield', labelWidth: 100, name: 'process_nm', readOnly: true },
                    { fieldLabel: Locale.getMsg('지연사유'), xtype: 'textfield', labelWidth: 100, name: 'delay_comment_nm', readOnly: true },
                    { fieldLabel: Locale.getMsg('2차완료예정일'), xtype: 'datefield', labelWidth: 100, format: 'Y-m-d', name: 'prdt_pdate2', readOnly: true },
                    { fieldLabel: Locale.getMsg('제작지시사항'), colspan: 3, xtype: 'textareafield', labelWidth: 100, name: 'prdt_cmt', style: { width: '100%' } }
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
				{ xtype: 'hiddenfield', name: 'smp_rt_yn', value: 'N', listeners: { change: 'onRtynBtnChg' } },
                { xtype: 'hiddenfield', reference: 'spec_yn', name: 'spec_yn', value: 'N', listeners: { change: 'onSpecBtnChg' } },
				{ xtype: 'hiddenfield', name: 'addchk', value: 'add' },
                { xtype: 'hiddenfield', name: 'mode', value: 'A' },
				{ xtype: 'hiddenfield', name: 'smp_status', listeners: {change : 'onStatusChg'}},
				{ xtype: 'hiddenfield', reference: 'user_cd', itemId: 'user_cd', name: 'user_cd' },
                { xtype: 'hiddenfield', reference: 'dept_cd', itemId: 'dept_cd', name: 'dept_cd' },
                { xtype: 'hiddenfield', reference: 'state', name: 'state', value:'NEW' },
                {
                    xtype: 'button', text: Locale.getMsg('PPS확인'), name: 'rtnbtn5', itemId: 'rtnbtn5', margin: '5 5 5 5', hidden: true,
                    listeners: { click: 'onPPS' }
                },
				{ xtype: 'button', text: Locale.getMsg('Drop정보'), name: 'rtnbtn1', itemId: 'rtnbtn1', margin: '5 5 5 5',hidden: true,
                    listeners: {click : 'onDrop'}
                },
				{ xtype: 'button', text: Locale.getMsg('샘플재작업정보'), name: 'rtnbtn2', itemId: 'rtnbtn2', margin: '5 5 5 5',hidden: true,
                    listeners: {click : 'onRepairHis'}
                },
				{ xtype: 'button', text: Locale.getMsg('자체재작업정보'), name: 'rtnbtn3', itemId: 'rtnbtn3', margin: '5 5 5 5',hidden: true,
                    listeners: {click : 'onMyRepair'}
                },
				{ xtype: 'button', text: Locale.getMsg('의뢰반려정보'), name: 'rtnbtn4', itemId: 'rtnbtn4', margin: '5 5 5 5',hidden: true,
                    listeners: {click : 'onReject'}
                },
                { xtype: 'component', flex: 1 },
                { xtype: 'button', text: Locale.getMsg('샘플요청'), name: 'btn1', itemId: 'btn1', margin: '5 5 5 5',
                    listeners: {click : 'openWindow2'}
                },
				{ xtype: 'button', text: Locale.getMsg('DROP'), name: 'btn2', itemId: 'btn2',margin: '5 5 5 5', hidden: true,
                    listeners: {click : 'onDrop'}
                },
				{ xtype: 'button', text: Locale.getMsg('삭제'), name: 'btn3', itemId: 'btn3',margin: '5 5 5 5', hidden: true,
                    listeners: {click : 'onDelete'}
                },
				{ xtype: 'button', text: Locale.getMsg('제작의뢰취소'), name: 'btn4',itemId: 'btn4',margin: '5 5 5 5', hidden: true,
                    listeners: {click : 'onCancel'}
                },
                { xtype: 'button', text: Locale.getMsg('제작의뢰'), name: 'btn5', itemId: 'btn5',margin: '5 5 5 5', hidden: true,
                    listeners: {click : 'onCommition'}
                },
				{ xtype: 'button', text: Locale.getMsg('접수등록'), name: 'btn6', itemId: 'btn6',margin: '5 5 5 5',
                    listeners: {click : 'onNew'}
                }, 
				{ xtype: 'button', text: Locale.getMsg('자체재작업'), name: 'btn7', itemId: 'btn7',margin: '5 5 5 5', hidden: true,
                    listeners: {click : 'onMyRepair'}
                },
				{ xtype: 'button', text: Locale.getMsg('배송[선적]'), name: 'btn8', itemId: 'btn8',margin: '5 5 5 5', hidden: true,
                    listeners: {click : 'onShipping'}
                },
				{ xtype: 'button', text: Locale.getMsg('샘플재작업'), name: 'btn9', itemId: 'btn9',margin: '5 5 5 5', hidden: true,
                    listeners: {click : 'onRepairNew'}
                },
				{
				    xtype: 'button', text: Locale.getMsg('양산'), name: 'btn10', itemId: 'btn10', margin: '5 5 5 5', hidden: true,
				    listeners: { click: 'onProduction' }
				},
                {
                    xtype: 'button', text: Locale.getMsg('메일발송'), name: 'btn11', itemId: 'btn11', margin: '5 5 5 5',
                    listeners: { click: 'openMail' }
                }
            ]
        }]
});

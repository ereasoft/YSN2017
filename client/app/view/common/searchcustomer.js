Ext.define('Ysn.view.common.chgpwd', {
    extend: 'Ext.window.Window',
    xtype: 'common-chgpwd',
    requires: [
        'Ysn.view.common.chgpwdController' 
    ],

    controller: 'common-chgpwd',
    title: Locale.getMsg('비밀번호 변경'),
    reference: 'common-chgpwd',
    id: 'common-chgpwd',
    modal: true,
    width: 500,
    height: 270,
    bodyPadding: 10,
    resizable: false,
    defaultType: 'textfield', 
    items: [{
        allowBlank: false,
        fieldLabel: '*' + Locale.getMsg('기존비밀번호'),
        labelAlign: 'right',
        labelWidth: 130,
        width:450,
        itemId: 'current_pw',
        name: 'current_pw',
        inputType: 'password'
    }, {
        allowBlank: false,
        fieldLabel: '*' + Locale.getMsg('신규비밀번호'),
        labelAlign: 'right',
        labelWidth: 130,
        width: 450,
        itemId: 'new_pw',
        name: 'new_pw',  
        inputType: 'password'
    }, {
        allowBlank: false,
        fieldLabel: '*' + Locale.getMsg('신규비밀번호재확인'),
        labelAlign: 'right',
        labelWidth: 130,
        width: 450,
        itemId: 'renew_pw',
        name: 'renew_pw',  
        inputType: 'password'
    } ],
				
    buttons: [ 
        { 
            text:'Change' ,
            handler: 'chgPwd'
        }
    ]
});

Ext.define('Ysn.view.common.searchpjt', {
    extend: 'Ext.window.Window',
    xtype: 'common-searchpjt',
    requires: [
        'Ysn.view.common.searchpjtController', 
		'Ext.grid.filters.Filters'
    ],

    controller: 'common-searchpjt',
    title: Locale.getMsg('프로젝트 찾기'),
    reference: 'commonSearchpjt',
    id: 'commonSearchpjt',
    modal: true,
    width: 600,
    height: 400,
    bodyBorder: false,
    resizable: false,
    dockedItems: [
	               {
	                   title: '',
	                   layout: {
	                       type: 'table',
	                       columns: 3,
	                       tableAttrs: {
	                           style: {
	                               //'padding-top': '5px' 
	                           }
	                       }

	                   },
	                   defaults: {
	                       layout: 'form',
	                       xtype: 'container',
	                       defaultType: 'textfield'
	                   },
	                   items: [{
	                       xtype: 'textfield',
	                       fieldLabel: Locale.getMsg('거래처'),
	                       labelWidth: 60,
	                       width: 320,
	                       itemId: 'cust_nm',
	                       name: 'cust_nm',
	                       reference: 'cust_nm',
                           margin: '5 5 0 5'
	                   }, {
	                       xtype: 'textfield',
	                       fieldLabel: Locale.getMsg('영업담당'),
	                       labelWidth: 60,
                           width:160,
	                       name: 'user_nm',
	                       itemId: 'user_nm',
	                       reference: 'user_nm',
	                       margin: '5 5 0 0'
	                   }, {
	                       xtype: 'hiddenfield',
	                       reference: 'paentFrm',
	                       itemId: 'paentFrm',
	                       listeners: { change: 'onChange' }
	                   }, {
                           rowspan:2,
                           xtype: 'button',
                           height:60,
	                       text: Locale.getMsg('검색'),
	                       handler: 'chkSearch'
	                   }, {
	                       xtype: 'textfield',
	                       fieldLabel: Locale.getMsg('프로젝트'),
	                       labelWidth: 60,
	                       width: 320,
	                       margin: '5 0 0 5',
	                       name: 'pjt_nm',
	                       itemId: 'pjt_nm',
	                       reference: 'pjt_nm'
	                   }
	                   ],
	                   dock: 'top',
	                   height: 80
	               }
    ],

    items: [
		{
		    header: false,
		    region: 'center',
		    //scrollable: true,
		    overflow: 'scroll',
		    layout: 'fit',
		    items: [
                  {
                      xtype: 'grid',
                      reference: 'searchGrid',
                      store: {
                          fields: [
                              { name: 'PJT_CD', type: 'string' },
                              { name: 'PJT_NM', type: 'string' },
                              { name: 'CUST_CD', type: 'string' },
                              { name: 'CUST_NM', type: 'string' },
                              { name: 'EUSR_CD', type: 'string' },
                              { name: 'EUSR_NM', type: 'string' },
                              { name: 'USER_CD', type: 'string' },
                              { name: 'USER_NM', type: 'string' },
                              { name: 'DEPT_CD', type: 'string' },
                              { name: 'DEPT_NM', type: 'string' },
                              { name: 'DSTR_TYPE', type: 'string' },
                              { name: 'DSTR_TYPE_NM', type: 'string' }
                          ],

                          proxy: {
                              method: "POST",
                              type: 'ajax',
                              url: '/BaseInfo/pjt',
                              reader: {
                                  type: 'json',
                                  rootProperty: 'LIST'
                              }
                          },
                          listeners: {
                              load: function (store, records, successful, operation) {
                                  if (!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
                              }
                          },
                          autoLoad: false,
                          autoDestroy: true
                      },
                      style: { 'borderTop': '1px solid gray' },
                      columnLines: true,
                      plugins: 'gridfilters',
                      columns: [
                              {
                                  text: Locale.getMsg('프로젝트명'), flex:1, dataIndex: 'PJT_NM', sortable: true,
                                  filter: {
                                      type: 'string',
                                      itemDefaults: {
                                          emptyText: Locale.getMsg('검색어입력..')
                                      }
                                  }
                              },
                              {
                                  text: Locale.getMsg('거래처명'), width: 180, dataIndex: 'CUST_NM', sortable: true,
                                  filter: {
                                      type: 'string',
                                      itemDefaults: {
                                          emptyText: Locale.getMsg('검색어입력..')
                                      }
                                  }
                              },
                              {
                                  text: Locale.getMsg('영업담당'), width: 70, dataIndex: 'USER_NM', sortable: true,
                                  filter: {
                                      type: 'string',
                                      itemDefaults: {
                                          emptyText: Locale.getMsg('검색어입력..')
                                      }
                                  }
                              }
                      ],
                      scrollable: true,
                      height: 280,
                      width: 300,
                      syncRowHeight: false,
                      viewConfig: {

                      },
                      listeners: {
                          select: 'onSelect'
                      }
                  }
		    ]

		}
    ]

});

Ext.define('Ysn.view.common.searchcustomer',{
    extend: 'Ext.window.Window',
    xtype: 'common-searchcustomer',
    requires: [
        'Ysn.view.common.searchcustomerController',
        'Ysn.view.common.searchcustomerModel',		
		'Ext.grid.filters.Filters'
    ],

    controller: 'common-searchcustomer', 
	title: Locale.getMsg('거래처 조회'),
	reference: 'commonSearchcustomer', 
	id: 'commonSearchcustomer', 
	modal:true,
    width: 600,
    height: 400, 
    bodyBorder: false, 
	resizable: false,
	dockedItems: [
	               {
		            title: '',
					layout: 'column',
					defaults: {
						layout: 'form',
						xtype: 'container',
						defaultType: 'textfield',
						margin: '10 10 10 10'
					},
					items:[{
						    xtype: 'textfield',
							fieldLabel: Locale.getMsg('거래처'), 
							labelWidth: 50,
							itemId: 'cust_nm',
							name: 'cust_nm', 
							reference : 'cust_nm'  
							},{
						    xtype: 'textfield',
							fieldLabel: Locale.getMsg('영업담당'),
							labelWidth: 60,		
							name: 'user_nm',
							itemId: 'user_nm',
							reference : 'user_nm'  
							},{
							xtype: 'hiddenfield',
							reference: 'paentFrm', 
							itemId : 'paentFrm',
							listeners:{change:'onChange'}
							},{
						    xtype: 'button',
							text: Locale.getMsg('검색'), 
							handler: 'chkSearch'
							}
					],					
					dock: 'top',
					height: 50
					}
	] ,

    items: [
		{
					header: false,					
					region: 'center',
					//scrollable: true,
					overflow:'scroll',
					layout:'fit',
					items:[
			              {	xtype: 'grid',
						    reference : 'searchGrid' ,
							store: {
								fields: [
									{name: 'CUST_ENG_NM', type: 'string'},
									{name: 'USER_NM', type: 'string'},
									{name: 'CUST_GRADE_NM', type: 'string'},
									{name: 'USER_CD', type: 'string'},
									{name: 'CUST_NM', type: 'string'},
									{name: 'CUST_CD', type: 'string'},
									{name: 'CUST_GRADE', type: 'string'} 
								],

								proxy: {
								    method: "POST",
									type: 'ajax',
									url: '/Popup/popupCustList',									
									reader: {
										type: 'json',
										rootProperty: '' 
									}
								},
								listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
							},
								autoLoad: false,
								autoDestroy: true
							}, 
							style: {'borderTop':'1px solid gray'},
							columnLines: true, 
							plugins: 'gridfilters',
							columns: [
									{text: Locale.getMsg('거래처'), width: 300, dataIndex: 'CUST_NM', sortable: true,  
									 filter: {
										 type: 'string',
										 itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 }
									},
									{text: Locale.getMsg('담당자'),  width: 150, dataIndex: 'USER_NM', sortable: true,  
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 }
									}, 
									{text: Locale.getMsg('신용등급'), width: 100, dataIndex: 'CUST_GRADE_NM', sortable: true,
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 } 
									}
								],
						   scrollable: true, 
						   height: 300,
						   width: 600,
						   syncRowHeight: false,
						   viewConfig: {
								 
							},
						    listeners: {									 
										itemclick: 'onSelect'
							} 
						  }
					]

		} 
    ]
	
});

Ext.define('Ysn.view.common.searchcustomer2', {
    extend: 'Ext.window.Window',
    xtype: 'common-searchcustomer2',
    requires: [
        'Ysn.view.common.searchcustomer2Controller',
        'Ysn.view.common.searchcustomerModel',
		'Ext.grid.filters.Filters'
    ],

    controller: 'common-searchcustomer2', 
    title: '매출처 조회',
    reference: 'commonSearchcustomer2',
    id: 'commonSearchcustomer2',
    modal: true,
    width: 600,
    height: 400,
    bodyBorder: false,
    resizable: false,
    dockedItems: [
	               {
	                   title: '',
	                   layout: 'column',
	                   defaults: {
	                       layout: 'form',
	                       xtype: 'container',
	                       defaultType: 'textfield',
	                       margin: '10 10 10 10'
	                   },
	                   items: [{
	                       xtype: 'textfield',
	                       fieldLabel: Locale.getMsg('거래처'),
	                       labelWidth: 50,
	                       name: 'cust_nm',
	                       itemId: 'cust_nm',
	                       reference: 'cust_nm'
	                   }, {
	                       xtype: 'textfield',
	                       fieldLabel: Locale.getMsg('영업담당'),
	                       labelWidth: 60,
	                       name: 'user_nm',
	                       itemId: 'user_nm',
	                       reference: 'user_nm'
	                   }, {
	                       xtype: 'hiddenfield',
	                       reference: 'paentFrm',
	                       itemId: 'paentFrm',
						   listeners:{change:'onChange'}
	                   }, {
	                       xtype: 'button',
	                       text: Locale.getMsg('검색'),
	                       handler: 'chkSearch'
	                   }
	                   ],
	                   dock: 'top',
	                   height: 50
	               }
    ],

    items: [
		{
		    header: false,
		    region: 'center',
		    //scrollable: true,
		    overflow: 'scroll',
		    layout: 'fit',
		    items: [
                  {
                      xtype: 'grid',
                      reference: 'searchGrid',
                      store: {
                          fields: [
                              { name: 'CUST_ENG_NM', type: 'string' },
                              { name: 'USER_NM', type: 'string' },
                              { name: 'CUST_GRADE_NM', type: 'string' },
                              { name: 'USER_CD', type: 'string' },
                              { name: 'CUST_NM', type: 'string' },
                              { name: 'CUST_CD', type: 'string' },
                              { name: 'CUST_GRADE', type: 'string' }
                          ],

                          proxy: {
                              method: "POST",
                              type: 'ajax',
                              url: '/Popup/popupCustList',
                              reader: {
                                  type: 'json',
                                  rootProperty: ''
                              }
                          },
						  listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
							},
                          autoLoad: false,
                          autoDestroy: true
                      },
                      style: { 'borderTop': '1px solid gray' },
                      columnLines: true,
                      plugins: 'gridfilters',
                      columns: [
                              {
                                  text: Locale.getMsg('거래처'), width: 300, dataIndex: 'CUST_NM', sortable: true,
                                  filter: {
                                      type: 'string',
                                      itemDefaults: {
                                      emptyText: Locale.getMsg('검색어입력..')
                                      }
                                  }
                              },
                              {
                                  text: Locale.getMsg('담당자'), width: 150, dataIndex: 'USER_NM', sortable: true,
                                  filter: {
                                      type: 'string',
                                      itemDefaults: {
                                          emptyText: Locale.getMsg('검색어입력..')
                                      }
                                  }
                              },
                              {
                                  text: Locale.getMsg('신용등급'), width: 100, dataIndex: 'CUST_GRADE_NM', sortable: true,
                                  filter: {
                                      type: 'string',
                                      itemDefaults: {
                                          emptyText: '신용등급입력...'
                                      }
                                  }
                              }
                      ],
                      scrollable: true,
                      height: 300,
                      width: 600,
                      syncRowHeight: false,
                      viewConfig: {

                      },
                      listeners: {
                          itemclick: 'onSelect'
                      }
                  }
		    ]

		}
    ]

});


Ext.define('Ysn.view.common.searchPartUser',{
    extend: 'Ext.window.Window',
    xtype: 'common-searchPartUser',
    requires: [
        'Ysn.view.common.searchPartUserController', 
		'Ext.grid.filters.Filters'
    ],

    controller: 'common-searchPartUser', 
	title: Locale.getMsg('영업담당 찾기'),
	reference: 'commonsearchPartUser', 
	id: 'common-searchPartUser', 
	modal:true,
    width: 800,
    height: 400, 
    bodyBorder: false, 
	resizable: false,
	dockedItems: [
	               {
		            title: '',
					layout: {
						type: 'table',
						columns: 3,
						tableAttrs: {
							style: {
								//width: '100%'
							}
						}
					},
					defaults: {
						layout: 'form',
						xtype: 'container',
						defaultType: 'textfield',
						margin: '10 5 5 0'
					}, 
					items:[{
						    xtype: 'textfield',
							fieldLabel: Locale.getMsg('이름'), 
							labelWidth: 50,	 
							name: 'user_nm', 
							reference: 'user_nm',
							itemId : 'user_nm',
							allowBlank:true
							},{
							xtype: 'fieldcontainer',
							fieldLabel: Locale.getMsg('매출조직'),
							labelWidth: 70,	
							combineErrors: true,
							msgTarget : 'side',
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
										allowBlank:true,
										listeners: {
											change : 'onChangeBiz' 
										}
									}, {
										xtype: 'combobox',
										reference: 'deptGroup',
										itemId:'deptGroup',
										name: 'deptGroup',
										publishes: 'value', 
										displayField: 'DEPT_NM',
										valueField: 'DEPT_CD', 
										store: {
											type: 'deptgroup',
											listeners: { load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
												store.insert(0, {DEPT_CD: '',DEPT_NM: Locale.getMsg('전체')}); 
											}}
										},
										minChars: 0,
										//width: 150,
										maskOnDisable: true,
										queryMode: 'local', 
										allowBlank:true,
										listeners: {
											//change : 'onChangeDept' 
										}
								    }]		
							},{
							xtype: 'hiddenfield',
							reference: 'paentFrm', 
							itemId: 'paentFrm', 
							listeners:{change:'onChange'},
							allowBlank:true
							}, {
							    xtype: 'hiddenfield',
							    reference: 'idx',
							    itemId: 'idx' 
							}, {
						    xtype: 'button',
							text: Locale.getMsg('검색'), 
							handler: 'chkSearch'
							}
					],					
					dock: 'top',
					height: 50
					}
	] ,

    items: [
		{ 
					header: false,					
					region: 'center',
					//scrollable: true,
					overflow:'scroll',
					layout:'fit',
					items:[
			              {	xtype: 'grid',
						    reference : 'searchGrid' ,
							store: {
								fields: [
									{name: 'USER_CD', type: 'string'},
									{name: 'USER_NM', type: 'string'},
									{name: 'DEPT_CD', type: 'string'},
									{name: 'UP_DEPT_CD', type: 'string'},
									{name: 'DEPT_NM', type: 'string'},
									{name: 'O_PHONE', type: 'string'},
									{name: 'M_PHONE', type: 'string'},
									{name: 'EMAIL', type: 'string'}
								],

								proxy: {
								    method: "POST",
									type: 'ajax',
									url: '/Popup/popupCustUserList',									
									reader: {
										type: 'json',
										rootProperty: '' 
									}
								},
								listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
							},
								autoLoad: false,
								autoDestroy: true
							}, 
							style: {'borderTop':'1px solid gray'},
							columnLines: true, 
							plugins: 'gridfilters',
							columns: [
									   { text: Locale.getMsg('이름'), width: 150, dataIndex: 'USER_NM', sortable: true,  
										 filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') }}
									   },
									   { text: Locale.getMsg('부서명'),  width: 150, dataIndex: 'DEPT_NM', sortable: true,  
									     filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..')}}
									   }, 
									   { text: Locale.getMsg('전화번호'), width: 150, dataIndex: 'M_PHONE', sortable: true,
									     filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..')}} 
									   }, 
									   { text: "MAIL", flex:1, dataIndex: 'EMAIL', sortable: true,
										 filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') }}
									   }, 
									   { text: Locale.getMsg('사번'), dataIndex: 'USER_CD', width: 100, hidden:true },
									   { text: Locale.getMsg('부서코드'), dataIndex: 'DEPT_CD', width: 100, hidden:true}
								],
						   scrollable: true, 
						   height: 700,
						   width: 1600,
						   syncRowHeight: false,
						   viewConfig: {
								 stripeRows: true
							},
						    listeners: {									 
										itemclick: 'onSelect'
							} 
						  }
					]

		} 
    ]
	
});

Ext.define('Ysn.view.common.searchSelUser',{
    extend: 'Ext.window.Window',
    xtype: 'common-searchSelUser',
    requires: [
        'Ysn.view.common.searchSelUserController', 
		'Ext.grid.filters.Filters'
    ],

    controller: 'common-searchSelUser', 
	title: Locale.getMsg('사후조치자 찾기'),
	reference: 'commonsearchSelUser', 
	id: 'common-searchSelUser', 
	modal:true,
    width: 800,
    height: 400, 
    bodyBorder: false, 
	resizable: false,
	dockedItems: [
	               {
		            title: '',
					layout: {
						type: 'table',
						columns: 3,
						tableAttrs: {
							style: {
								//width: '100%'
							}
						}
					},
					defaults: {
						layout: 'form',
						xtype: 'container',
						defaultType: 'textfield',
						margin: '10 5 5 0'
					}, 
					items:[{
						    xtype: 'textfield',
							fieldLabel: Locale.getMsg('이름'), 
							labelWidth: 50,	 
							name: 'user_nm', 
							reference: 'user_nm',
							itemId : 'user_nm',
							allowBlank:true
							},{
							xtype: 'fieldcontainer',
							fieldLabel: Locale.getMsg('매출조직'),
							labelWidth: 70,	 
							combineErrors: true,
							msgTarget : 'side',
							layout: 'hbox',
							defaults: {
								//flex: 1,
								hideLabel: true 
							},
							items: [{
                                  xtype: 'combobox',
                                  reference: 'selCompany',
                                  itemId: 'selCompany',
                                  name: 'selCompany',
                                  publishes: 'value',
                                  displayField: 'DEPT_NM',
                                  valueField: 'DEPT_CD',
                                  margin: '0 5 0 0',
                                  store: {
                                      type: 'selCompany',
                                      autoLoad: true
                                  },
                                  minChars: 0,
                                  width: 120,
                                  queryMode: 'local',
                                  listeners: {
                                      change: 'onselCompany'
                                  }
                            },{
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
										width: 120,
										queryMode: 'local',
										allowBlank:true,
										listeners: {
											change : 'onChangeBiz' 
										}
									}, {
										xtype: 'combobox',
										reference: 'deptGroup',
										itemId:'deptGroup',
										name: 'deptGroup',
										publishes: 'value', 
										displayField: 'DEPT_NM',
										valueField: 'DEPT_CD', 
										store: {
											type: 'deptgroup',
											listeners: { load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
												store.insert(0, {DEPT_CD: '',DEPT_NM: Locale.getMsg('전체')}); 
											}}
										},
										minChars: 0,
										width: 150,
										maskOnDisable: true,
										queryMode: 'local', 
										allowBlank:true,
										listeners: {
											//change : 'onChangeDept' 
										}
								    }]		
							},{
							xtype: 'hiddenfield',
							reference: 'paentFrm', 
							itemId : 'paentFrm',
							allowBlank:true
							}, {
							    xtype: 'hiddenfield',
							    reference: 'idx',
							    itemId: 'idx' 
							}, {
						    xtype: 'button',
							text: Locale.getMsg('검색'), 
							handler: 'chkSearch'
							}
					],					
					dock: 'top',
					height: 50
					}
	] ,

    items: [
		{ 
					header: false,					
					region: 'center',
					//scrollable: true,
					overflow:'scroll',
					layout:'fit',
					items:[
			              {	xtype: 'grid',
						    reference : 'searchGrid' ,
							store: {
								fields: [
									{name: 'USER_CD', type: 'string'},
									{name: 'USER_NM', type: 'string'},
									{name: 'DEPT_CD', type: 'string'},
									{name: 'UP_DEPT_CD', type: 'string'},
									{name: 'DEPT_NM', type: 'string'},
									{name: 'O_PHONE', type: 'string'},
									{name: 'M_PHONE', type: 'string'},
									{name: 'EMAIL', type: 'string'}
								],

								proxy: {
								    method: "POST",
									type: 'ajax',
									url: '/Popup/popupCustUserList',									
									reader: {
										type: 'json',
										rootProperty: '' 
									}
								},
								listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
							},
								autoLoad: false,
								autoDestroy: true
							}, 
							style: {'borderTop':'1px solid gray'},
							columnLines: true, 
							plugins: 'gridfilters',
							columns: [
									   { text: Locale.getMsg('이름'), width: 150, dataIndex: 'USER_NM', sortable: true,  
										 filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') }}
									   },
									   { text: Locale.getMsg('부서명'),  width: 150, dataIndex: 'DEPT_NM', sortable: true,  
									     filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..')}}
									   }, 
									   { text: Locale.getMsg('전화번호'), width: 150, dataIndex: 'M_PHONE', sortable: true,
									     filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..')}} 
									   }, 
									   { text: "MAIL", flex:1, dataIndex: 'EMAIL', sortable: true,
										 filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') }}
									   }, 
									   { text: Locale.getMsg('사번'), dataIndex: 'USER_CD', width: 100, hidden:true },
									   { text: Locale.getMsg('부서코드'), dataIndex: 'DEPT_CD', width: 100, hidden:true}
								],
						   scrollable: true, 
						   height: 700,
						   width: 1600,
						   syncRowHeight: false,
						   viewConfig: {
								 stripeRows: true
							},
						    listeners: {									 
						        itemclick: 'onSelect'
							} 
						  }
					]

		} 
    ]
	
});

Ext.define('Ysn.view.common.searchPartMng', {
    extend: 'Ext.window.Window',
    xtype: 'common-searchPartMng',
    requires: [
        'Ysn.view.common.searchPartMngController',
		'Ext.grid.filters.Filters'
    ],

    controller: 'common-searchPartMng',
    title: Locale.getMsg('USER 찾기'),
    reference: 'commonsearchPartMng',
    id: 'common-searchPartMng',
    modal: true,
    width: 1000,
    height: 500,
    bodyBorder: false,
    resizable: false,
    layout: 'fit',
    dockedItems: [
	               {
	                   title: '',
	                   layout: {
	                       type: 'table',
	                       columns: 2,
	                       tableAttrs: {
	                           style: {
	                               //width: '100%'
	                           }
	                       }
	                   },
	                   defaults: {
	                       layout: 'form',
	                       xtype: 'container',
	                       defaultType: 'textfield',
	                       margin: '5 5 5 0'
	                   },
	                   items: [
                          {
                              xtype: 'fieldcontainer',
                              fieldLabel: Locale.getMsg('조직명'),
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
                                  reference: 'selCompany',
                                  itemId: 'selCompany',
                                  name: 'selCompany',
                                  publishes: 'value',
                                  displayField: 'DEPT_NM',
                                  valueField: 'DEPT_CD',
                                  margin: '0 5 0 0',
                                  store: {
                                      type: 'selCompany',
                                      autoLoad: true
                                  },
                                  minChars: 0,
                                  //width: 120,
                                  queryMode: 'local',
                                  listeners: {
                                      change: 'onselCompany'
                                  }
                              }, {
                                  xtype: 'combobox',
                                  reference: 'selPart1',
                                  itemId: 'selPart1',
                                  name: 'selPart1',
                                  publishes: 'value',
                                  displayField: 'DEPT_NM',
                                  valueField: 'DEPT_CD',
                                  margin: '0 5 0 0',
                                  store: {
                                      type: 'selPart1',
                                      autoLoad: true
                                  },
                                  minChars: 0,
                                  //width: 120,
                                  queryMode: 'local',
                                  listeners: {
                                      change: 'onselPart1'
                                  }
                              }, {
                                  xtype: 'combobox',
                                  reference: 'selPart2',
                                  itemId: 'selPart2',
                                  name: 'selPart2',
                                  publishes: 'value',
                                  displayField: 'DEPT_NM',
                                  valueField: 'DEPT_CD',
                                  margin: '0 5 0 0',
                                  store: {
                                      type: 'selPart2',
                                      autoLoad: true
                                  },
                                  minChars: 0,
                                  //width: 120,
                                  queryMode: 'local',
                                  listeners: {
                                      change: 'onselPart2'
                                  }
                              }, {
                                  xtype: 'combobox',
                                  reference: 'selPart3',
                                  itemId: 'selPart3',
                                  name: 'selPart3',
                                  publishes: 'value',
                                  displayField: 'DEPT_NM',
                                  valueField: 'DEPT_CD',
                                  margin: '0 5 0 0',
                                  store: {
                                      type: 'selPart3',
                                      autoLoad: true
                                  },
                                  minChars: 0,
                                  //width: 120,
                                  queryMode: 'local'
                              }]
                          },
                           {
                              rowspan:2,
                              xtype: 'button',
                              text: Locale.getMsg('검색'),
                              width: 60,
                              height:60,
                              handler: 'chkSearch'
                          },
                   {
                       xtype: 'textfield',
                       labelAlign: 'right',
	                    fieldLabel: Locale.getMsg('이름'),
	                    labelWidth: 100,
	                    name: 'user_nm',
	                    reference: 'user_nm',
	                    itemId: 'user_nm',
	                    allowBlank: true
	                }, {
	                    xtype: 'hiddenfield',
	                    reference: 'paentFrm',
	                    itemId: 'paentFrm',
	                    allowBlank: true
	                },{
	                    xtype: 'hiddenfield',
	                    reference: 'auth_id',
	                    itemId: 'auth_id',
	                    allowBlank: true
	                }, {
	                    xtype: 'hiddenfield',
	                    reference: 'dept_cd',
	                    itemId: 'dept_cd',
	                    listeners: {
	                        change : 'onChange' 
	                    }
	                }
	                   ],
	                   dock: 'top',
	                   height: 90
	               }
    ],

    items: [
		{
		    header: false,
		    region: 'center',
		    //scrollable: true,
		    overflow: 'scroll',
		    layout: 'fit',
		    items: [
                  {
                      xtype: 'grid',
                      reference: 'searchGrid',
                      store: {
                          fields: [
                              { name: 'COMPANY_CD', type: 'string' },
                              { name: 'USER_CD', type: 'string' },
                              { name: 'USER_NM', type: 'string' }, 
                              { name: 'DEPT_NM', type: 'string' },
                              { name: 'USER_TITLE', type: 'string' },
                              { name: 'USER_POSIT', type: 'string' },
                              { name: 'EMAIL', type: 'string' }
                          ],                          
                          proxy: {
                              method: "POST",
                              type: 'ajax',
                              url: '/AdminDept/popupMgrList',                              
                              reader: {
                                  type: 'json',
                                  rootProperty: 'LIST'
                              }
                          },
						  listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
							},
                          autoLoad: false,
                          autoDestroy: true 
                      },
                      style: { 'borderTop': '1px solid gray' },
                      columnLines: true,
                      plugins: 'gridfilters',
                      columns: [
                                 {
                                     text: Locale.getMsg('이름'), width: 150, dataIndex: 'USER_NM', sortable: true,
                                     filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') } }
                                 },
                                 {
                                     text: Locale.getMsg('부서명'), width: 150, dataIndex: 'DEPT_NM', sortable: true,
                                     filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') } }
                                 },
                                 {
                                     text: Locale.getMsg('직책'), width: 60, dataIndex: 'USER_TITLE', sortable: true,
                                     filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') } }
                                 },
                                 {
                                     text: Locale.getMsg('직위'), width: 60, dataIndex: 'USER_POSIT', sortable: true,
                                     filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') } }
                                 },
                                 {
                                     text: "MAIL", flex: 1, dataIndex: 'EMAIL', sortable: true,
                                     filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') } }
                                 },
                                 { text: Locale.getMsg('사번'), dataIndex: 'USER_CD', width: 100, hidden: true },
                                 { text: Locale.getMsg('부서코드'), dataIndex: 'DEPT_CD', width: 100, hidden: true }
                      ],
                      scrollable: true,
                      height: 300,
                      width: 800,
                      syncRowHeight: false,
                      viewConfig: {
                          stripeRows: true
                      },
                      listeners: {
                          itemclick: 'onSelect'
                      }
                  }
		    ]

		}
    ]

});


Ext.define('Ysn.view.common.searchKeyman',{
    extend: 'Ext.window.Window',
    xtype: 'common-searchKeyman',
    requires: [
        'Ysn.view.common.searchKeymanController', 
		'Ext.grid.filters.Filters'
    ],

    controller: 'common-searchKeyman', 
	title: '이름을 선택하시면, 선택한 고객담당자정보로 이동합니다. ',
	reference: 'common-searchKeyman', 
	id: 'common-searchKeyman', 
	modal:true,
    width: 800,
    height: 250, 
    bodyBorder: false, 
	resizable: false,
	dockedItems: [
	               {
						xtype: 'toolbar',
							dock: 'top',
							ui: 'footer',
							defaults: {
								minWidth: 100 
							},
							items: [
								{ xtype: 'component', flex: 1 },
								{ xtype: 'button', text: Locale.getMsg('신규등록'), margin: '5 5 5 -10',
									listeners: {click : 'onChkAdd'}
								}
							]
		           }
	] ,
    items: [
	           {
							xtype: 'hiddenfield',
							reference: 'paentFrm', 
							itemId : 'paentFrm',
							allowBlank:true
			   },{ 
					header: false,					
					region: 'center',
					scrollable: true,
					//overflow:'scroll',
					layout:'fit',
					items:[
			              {	xtype: 'grid',
						    itemId: 'searchGrid',
						    reference : 'searchGrid' ,
							store: {
								fields: [
									{name: 'KM_NM', type: 'string'},
									{name: 'KM_CD', type: 'string'},
									{name: 'KM_DEPT_NM', type: 'string'},
									{name: 'CUST_NAME', type: 'string'},
									{name: 'KM_TITLE', type: 'string'},
									{name: 'M_PHONE', type: 'string'}
								],

								proxy: {
								    method: "GET",
									type: 'ajax',
									url: '/KeyMan/keyManDetail',									
									reader: {
										type: 'json',
										rootProperty: '' 
									}
								}, 
								listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
							},
								autoLoad: false,
								autoDestroy: false
							}, 
							style: {'borderTop':'1px solid gray'},
							columnLines: true, 
							plugins: 'gridfilters',
							columns: [
									   { text: Locale.getMsg('이름'), width: 150, dataIndex: 'KM_NM', sortable: true,  
										 filter: { type: 'string', itemDefaults: { emptyText: '검색어입력..' }}
									   },
									   { text: Locale.getMsg('거래처명'),  flex:1, dataIndex: 'CUST_NM', sortable: true,  
									     filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..')}}
									   }, 
									   { text: Locale.getMsg('부서명'), width: 150, dataIndex: 'KM_DEPT_NM', sortable: true,
									     filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..')}} 
									   }, 
									   { text: Locale.getMsg('직급'), flex:1, dataIndex: 'KM_TITLE', sortable: true,
										 filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') }}
									   }, 
									   { text: "Mobile", dataIndex: 'M_PHONE', width: 150, sortable: true,
										 filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') }}
									   }, 
									   { text: "ID", dataIndex: 'KM_CD', width: 100, hidden:true}
								],
						   scrollable: true, 
						   height: 700,
						   width: 1600,
						   syncRowHeight: false,
						   viewConfig: {
								 stripeRows: true
							},
						    listeners: {									 
										itemclick: 'onSelect'
							} 
						  }
					]

		} 
    ]
	
});

Ext.define('Ysn.view.common.searchKeyman2',{
    extend: 'Ext.window.Window',
    xtype: 'common-searchKeyman2',
    requires: [
        'Ysn.view.common.searchKeyman2Controller', 
		'Ext.grid.filters.Filters'
    ],

    controller: 'common-searchKeyman2',
	title: '고객(Keyman) 조회',
	reference: 'commonSearchKeyman2', 
	id: 'commonSearchKeyman2', 
	modal:true,
    width: 700,
    height: 600, 
    bodyBorder: false, 
	resizable: false,
	dockedItems: [
	               {
		            title: '',
					layout: 'column',
					defaults: {
						layout: 'form',
						xtype: 'container',
						defaultType: 'textfield',
						margin: '10 10 10 10'
					},
					items:[{
						    xtype: 'textfield',
							fieldLabel: Locale.getMsg('고객명'), 
							labelWidth: 50,
							itemId: 'km_nm',
							name: 'km_nm', 
							reference : 'km_nm'  
							},{
						    xtype: 'textfield',
							fieldLabel: Locale.getMsg('매출처'),
							labelWidth: 60,		
							name: 'cust_nm',
							itemId: 'cust_nm',
							reference : 'cust_nm'  
							},{
							xtype: 'hiddenfield',
							reference: 'cust_cd', 
							itemId : 'cust_cd'
							},{
							xtype: 'hiddenfield',
							reference: 'paentFrm', 
							itemId : 'paentFrm'
							},{
						    xtype: 'button',
							text: Locale.getMsg('검색'), 
							handler: 'chkSearch'
							},{
						    xtype: 'button',
							text: Locale.getMsg('저장'), 
							handler: 'addKeyman'
							}
					],					
					dock: 'top',
					height: 50
					}
	] ,

    items: [
		{
					header: false,					
					region: 'center',
					overflow:'scroll',						
					//scrollable: true,
					items:[
			              {	xtype: 'grid',
						    reference : 'searchGrid' ,     
						    overflow:'scroll',
						    scrollable: true,
							store: {
								fields: [
									{name: 'KM_NM', type: 'string'},
									{name: 'KM_DEPT_NM', type: 'string'},
									{name: 'KM_TITLE', type: 'string'},
									{name: 'O_PHONE', type: 'string'},
									{name: 'KM_EMAIL', type: 'string'},
									{name: 'KM_CD', type: 'string'}
								],

								proxy: {
								    method: "POST",
									type: 'ajax',
									url: '/Popup/popupkeymanList',			
									reader: {
										type: 'json',
										rootProperty: '' 
									}
								},
								listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
							},
								autoLoad: false,
								autoDestroy: true
							}, 
							style: {'borderTop':'1px solid gray'},
							columnLines: true, 
							plugins: 'gridfilters',
							columns: [
									{text: Locale.getMsg('고객명'), width: 100, dataIndex: 'KM_NM', sortable: true,  
									 filter: {
										 type: 'string',
										 itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 }
									},
									{text: Locale.getMsg('부서명'),  width: 100, dataIndex: 'KM_DEPT_NM', sortable: true,  
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 }
									}, 
									{text: Locale.getMsg('직급'), width: 50, dataIndex: 'KM_TITLE', sortable: true,
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 } 
									}, 
									{text: Locale.getMsg('전화번호'), width: 100, dataIndex: 'O_PHONE', sortable: true,
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 } 
									}, 
									{text: "MAIL", flex:1, dataIndex: 'KM_EMAIL', sortable: true,
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 } 
									}, 
									{text: "KM_CD", dataIndex: 'KM_CD', hidden: true}
								], 
						   width:690,
						   height: 250, 
						   syncRowHeight: false,
						   viewConfig: {
								 
							},
						    listeners: {									 
						        itemclick: 'onSelect'
							} 
						  },
						  {	xtype: 'grid',
						    reference : 'searchGrid2' ,     
					        scrollable: true,
						    overflow:'scroll',
							store: {
								fields: [
									{name: 'KM_NM', type: 'string'},
									{name: 'KM_DEPT_NM', type: 'string'},
									{name: 'KM_TITLE', type: 'string'},
									{name: 'O_PHONE', type: 'string'},
									{name: 'KM_EMAIL', type: 'string'},
									{name: 'KM_CD', type: 'string'}
								],

								proxy: {
								    method: "POST",
									type: 'memory',  												
									reader: {
										type: 'json',
										rootProperty: '' 
									}
								},
								listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
							},
								autoLoad: false,
								autoDestroy: true
							}, 
							style: {'borderTop':'1px solid gray'},
							columnLines: true, 
							plugins: 'gridfilters',
							columns: [
									{text: Locale.getMsg('고객명'), width: 100, dataIndex: 'KM_NM', sortable: true,  
									 filter: {
										 type: 'string',
										 itemDefaults: {
											emptyText: '검색어입력..'
										}
									 }
									},
									{text: Locale.getMsg('부서명'),  width: 100, dataIndex: 'KM_DEPT_NM', sortable: true,  
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 }
									}, 
									{text: Locale.getMsg('직급'), width: 50, dataIndex: 'KM_TITLE', sortable: true,
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 } 
									}, 
									{text: Locale.getMsg('전화번호'), width: 100, dataIndex: 'O_PHONE', sortable: true,
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 } 
									}, 
									{text: "MAIL", flex:1, dataIndex: 'KM_EMAIL', sortable: true,
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 } 
									}, 
									{text: "KM_CD", dataIndex: 'KM_CD', hidden: true}
								],  
						   width:690,
						   height: 250, 
						   syncRowHeight: false,
						   viewConfig: {
								 
							},
						    listeners: {									 
						        itemclick: 'onSelect2'
							} 
						  }
					]

		} 
    ]
	
});

Ext.define('Ysn.view.common.searchPartUser2',{
    extend: 'Ext.window.Window',
    xtype: 'common-searchPartUser2',
    requires: [
        'Ysn.view.common.searchPartUser2Controller', 
		'Ext.grid.filters.Filters'
    ],

    controller: 'common-searchPartUser2',
	title: '일정공유자 조회',
	reference: 'commonsearchPartUser2', 
	id: 'commonsearchPartUser2', 
	modal:true,
    width: 700,
    height: 600, 
    bodyBorder: false, 
	resizable: false,
	dockedItems: [
	               {
		            title: '',
					layout: 'column',
					defaults: {
						layout: 'form',
						xtype: 'container',
						defaultType: 'textfield',
						margin: '10 10 10 10'
					},
					items:[{
						    xtype: 'textfield',
							fieldLabel: Locale.getMsg('이름'), 
							labelWidth: 50,
							width:150,
							name: 'user_nm', 
							reference: 'user_nm',
							itemId : 'user_nm',
							allowBlank:true
							},{
							xtype: 'fieldcontainer',
							fieldLabel: Locale.getMsg('매출조직'),
							labelWidth: 70,	
							combineErrors: true,
							msgTarget : 'side',
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
										width: 120,
										queryMode: 'local',
										allowBlank:true,
										listeners: {
											change : 'onChangeBiz' 
										}
									}, {
										xtype: 'combobox',
										reference: 'deptGroup',
										itemId:'deptGroup',
										name: 'deptGroup',
										publishes: 'value', 
										displayField: 'DEPT_NM',
										valueField: 'DEPT_CD', 
										store: {
											type: 'deptgroup',
											listeners: { load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
												store.insert(0, {DEPT_CD: '',DEPT_NM: Locale.getMsg('전체')}); 
											}}
										},
										minChars: 0,
										width: 150,
										maskOnDisable: true,
										queryMode: 'local', 
										allowBlank:true,
										listeners: {
											//change : 'onChangeDept' 
										}
								    }]		
							},{
							xtype: 'hiddenfield',
							reference: 'paentFrm', 
							itemId : 'paentFrm'
							},{
						    xtype: 'button',
							text: Locale.getMsg('검색'), 
							handler: 'chkSearch'
							},{
						    xtype: 'button',
							text: Locale.getMsg('저장'), 
							handler: 'addShareUser'
							}
					],					
					dock: 'top',
					height: 50
					}
	] ,

    items: [
		{
					header: false,					
					region: 'center',
					overflow:'scroll',						
					//scrollable: true,
					items:[
			              {	xtype: 'grid',
						    reference : 'searchGrid' ,     
						    overflow:'scroll',
						    scrollable: true,
							store: {
								fields: [
									{name: 'USER_CD', type: 'string'},
									{name: 'USER_NM', type: 'string'},
									{name: 'DEPT_CD', type: 'string'},
									{name: 'UP_DEPT_CD', type: 'string'},
									{name: 'DEPT_NM', type: 'string'},
									{name: 'O_PHONE', type: 'string'},
									{name: 'M_PHONE', type: 'string'},
									{name: 'EMAIL', type: 'string'}
								],

								proxy: {
								    method: "POST",
									type: 'ajax',
									url: '/Popup/popupCustUserList',									
									reader: {
										type: 'json',
										rootProperty: '' 
									}
								},
								listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
							},
								autoLoad: false,
								autoDestroy: true
							}, 
							style: {'borderTop':'1px solid gray'},
							columnLines: true, 
							plugins: 'gridfilters',
							columns: [
									{text: Locale.getMsg('이름'), width: 100, dataIndex: 'USER_NM', sortable: true,  
									 filter: {
										 type: 'string',
										 itemDefaults: {
											emptyText: '검색어입력..'
										}
									 }
									},
									{text: Locale.getMsg('부서명'),  width: 100, dataIndex: 'DEPT_NM', sortable: true,  
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 }
									}, 
									{text: Locale.getMsg('전화번호'), width: 100, dataIndex: 'O_PHONE', sortable: true,
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 } 
									}, 
									{text: "MAIL", flex:1, dataIndex: 'EMAIL', sortable: true,
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 } 
									}, 
									{text: "USER_CD", dataIndex: 'USER_CD', hidden: true}
								], 
						   width:690,
						   height: 250, 
						   syncRowHeight: false,
						   viewConfig: {
								 
							},
						    listeners: {									 
						        itemclick: 'onSelect'
							} 
						  },
						  {	xtype: 'grid',
						    reference : 'searchGrid2' ,     
					        scrollable: true,
						    overflow:'scroll',
							store: {
								fields: [
									{name: 'USER_CD', type: 'string'},
									{name: 'USER_NM', type: 'string'},
									{name: 'DEPT_CD', type: 'string'},
									{name: 'UP_DEPT_CD', type: 'string'},
									{name: 'DEPT_NM', type: 'string'},
									{name: 'O_PHONE', type: 'string'},
									{name: 'M_PHONE', type: 'string'},
									{name: 'EMAIL', type: 'string'}
								],

								proxy: {
								    method: "POST",
									type: 'memory',  												
									reader: {
										type: 'json',
										rootProperty: '' 
									}
								},
								listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
							},
								autoLoad: false,
								autoDestroy: true
							}, 
							style: {'borderTop':'1px solid gray'},
							columnLines: true, 
							plugins: 'gridfilters',
							columns: [
									{text: Locale.getMsg('이름'), width: 100, dataIndex: 'USER_NM', sortable: true,  
									 filter: {
										 type: 'string',
										 itemDefaults: {
											emptyText: '검색어입력..'
										}
									 }
									},
									{text: Locale.getMsg('부서명'),  width: 100, dataIndex: 'DEPT_NM', sortable: true,  
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 }
									}, 
									{text: Locale.getMsg('전화번호'), width: 100, dataIndex: 'O_PHONE', sortable: true,
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 } 
									}, 
									{text: "MAIL", flex:1, dataIndex: 'EMAIL', sortable: true,
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 } 
									}, 
									{text: "USER_CD", dataIndex: 'USER_CD', hidden: true}
								],  
						   width:690,
						   height: 250, 
						   syncRowHeight: false,
						   viewConfig: {
								 
							},
						    listeners: {									 
						        itemclick: 'onSelect2'
							} 
						  }
					]

		} 
    ]
	
});



Ext.define('Ysn.view.common.fileupload',{
    extend: 'Ext.window.Window',
    xtype: 'common-fileupload',
    requires: [
        'Ysn.view.common.fileuploadController'
    ],

    controller: 'common-fileupload',
	title: '영문CSV파일업로드',
	reference: 'commonfileupload', 
	id: 'commonfileupload', 
	modal:true,
    width: 500,
    height: 180, 
    bodyBorder: false, 
	resizable: false, 
 
    items: [  { xtype: 'form',
                reference: 'csvfileupload', 
				bodyPadding: '10 10 10 10',
				style: {
					'margin-bottom': '20px'
				},
				items:[
					{
						labelWidth: 80,
						width:450,
						fieldLabel: 'CSV파일',
						xtype: 'filefield', 
						name: 'excelFile',
						reference: 'filefield',
						margin: '10 10 10 10'
					},
					{
						xtype: 'hiddenfield',
						reference: 'paentFrm',
						name: 'paentFrm',
						itemId : 'paentFrm'
					}, 
					{
						xtype: 'button',
						text: '파일저장',
						width: 450,
						handler: 'firstFormSave',
						margin: '10 10 10 10'
					}
				]

			}
		
    ]
	
});

Ext.define('Ysn.view.common.fileupload2', {
    extend: 'Ext.window.Window',
    xtype: 'common-fileupload2',
    requires: [
        'Ysn.view.common.fileupload2Controller'
    ],

    controller: 'common-fileupload2',
    title: '중문CSV파일업로드',
    reference: 'commonfileupload2',
    id: 'commonfileupload2',
    modal: true,
    width: 500,
    height: 180,
    bodyBorder: false,
    resizable: false,

    items: [{
        xtype: 'form',
        reference: 'csvfileupload2',
        bodyPadding: '10 10 10 10',
        style: {
            'margin-bottom': '20px'
        },
        items: [
            {
                labelWidth: 80,
                width: 450,
                fieldLabel: 'CSV파일',
                xtype: 'filefield',
                name: 'excelFile',
                reference: 'filefield',
                margin: '10 10 10 10'
            },
            {
                xtype: 'hiddenfield',
                reference: 'paentFrm',
                name: 'paentFrm',
                itemId: 'paentFrm'
            },
            {
                xtype: 'button',
                text: '파일저장',
                width: 450,
                handler: 'firstFormSave',
                margin: '10 10 10 10'
            }
        ]

    }

    ]

});

Ext.define('Ysn.view.common.xlsfileupload',{
    extend: 'Ext.window.Window',
    xtype: 'common-xlsfileupload',
    requires: [
        'Ysn.view.common.xlsfileuploadController'
    ],

    controller: 'common-xlsfileupload',
	title: '국문CSV파일업로드',
	reference: 'commonxlafileupload', 
	id: 'commonxlsfileupload', 
	modal:true,
    width: 500,
    height: 180, 
    bodyBorder: false, 
	resizable: false, 
 
	items: [{
	    xtype: 'form',
                reference: 'xlsfileupload', 
				bodyPadding: '10 10 10 10',
				style: {
					'margin-bottom': '20px'
				},
				items:[
					{
						labelWidth: 80,
						width:450,
						fieldLabel: 'XLSX파일',
						xtype: 'filefield', 
						name: 'excelFile',
						reference: 'filefield',
						margin: '10 10 10 10'
					},
					{
						xtype: 'hiddenfield',
						reference: 'paentFrm',
						name: 'paentFrm',
						itemId : 'paentFrm'
					}, 
					{
						xtype: 'button',
						text: '파일저장',
						width: 450,
						handler: 'firstFormSave',
						margin: '10 10 10 10'
					}
				]

			}
		
    ]
	
});

Ext.define('Ysn.view.common.specChklist',{
    extend: 'Ext.window.Window',
    xtype: 'common-specChklist',
    requires: [ 
    ],

    controller: 'common-specChklist',
	title: Locale.getMsg('PPS 확인'),
	reference: 'commonspecChklist', 
	id: 'commonspecChklist', 
	modal:true,
    width: 950,
    height: 600, 
    bodyBorder: false, 
    resizable: false, 
    scrollable: true,
	items: [{
	    xtype: 'form',
	    reference: 'commonspecChkform', 
	    id: 'commonspecChkform',
	    reader: {
	        type: 'json',
	        model: 'Ysn.model.sampleSpecChk',
	        rootProperty: 'LIST'
	    },
	    items:[
            {
                xtype: 'fieldset',
                scrollable:true,
                title: Locale.getMsg('튜브'),
                itemid: 'tubechecklist',
                reference: 'tubechecklist',
                layout: {
                    type: 'table',
                    columns: 7,
                    tableAttrs: {
                        style: {
                            width: '900px',
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
                            'word-wrap': 'break-word',
                            'height': '20px'
                        }
                    }, 
                    itemCls: 'cellmargin'
                },
                defaults: {
                    xtype: 'textfield',
                    hideLabel: true
                },
                items: [    
							{ xtype: 'label', rowspan: 2, text: Locale.getMsg('목록'), tdAttrs: { style: { 'font-weight': 'bold', width: '40px', backgroundColor: '#EFEFEF' } } },
                            { xtype: 'label', colspan: 3, text: Locale.getMsg('Sample Team'), tdAttrs: { style: { 'font-weight': 'bold',height: '20px',backgroundColor: '#EFEFEF' } } },
                            { xtype: 'label', colspan: 3, text: Locale.getMsg('Customer'), tdAttrs: { style: { 'font-weight': 'bold', height: '20px', backgroundColor: '#EFEFEF' } } },
							{ xtype: 'label', text: Locale.getMsg('이상유무'), tdAttrs:{style:{'font-weight': 'bold',width:'40px',backgroundColor:'#EFEFEF'}}},
							{ xtype: 'label', text: Locale.getMsg('특이사항'), tdAttrs: { style: { 'font-weight': 'bold', width: '200px', backgroundColor: '#EFEFEF' } } },
							{ xtype: 'label', text: Locale.getMsg('체크'), tdAttrs: { style: { 'font-weight': 'bold', width: '20px', backgroundColor: '#EFEFEF' } } },
							{ xtype: 'label', text: Locale.getMsg('이상유무'), tdAttrs: { style: { 'font-weight': 'bold', width: '40px', backgroundColor: '#EFEFEF' } } },
							{ xtype: 'label', text: Locale.getMsg('특이사항'), tdAttrs: { style: { 'font-weight': 'bold', width: '200px', backgroundColor: '#EFEFEF' } } },
							{ xtype: 'label', text: Locale.getMsg('체크'), tdAttrs: { style: { 'font-weight': 'bold', width: '20px', backgroundColor: '#EFEFEF' } } },
							{ xtype: 'label', text: Locale.getMsg('오버캡') },
                            { name: 'a_tube_overcap_check', xtype: 'checkboxfield', inputValue: 'Y', margin: '4 0 0 10' },
                            { name: 'a_tube_overcap_comment', margin: '3 0 0 5', style: { width: '220px' } },
                            { name: 'a_tube_overcap', xtype: 'checkboxfield', inputValue: 'Y', margin: '5 0 0 5', checked: true },
                            { name: 'p_tube_overcap_check', xtype: 'checkboxfield', inputValue: 'Y', margin: '4 0 0 10', readOnly: true },
                            { name: 'p_tube_overcap_comment', margin: '3 0 0 5', style: { width: '220px' }, readOnly: true },
                            { name: 'p_tube_overcap', xtype: 'checkboxfield', inputValue: 'Y', margin: '5 0 0 5', checked: false, readOnly: true },
							{ xtype: 'label', text: Locale.getMsg('펌프') },
                             { name: 'a_tube_pump_check', xtype: 'checkboxfield', inputValue: 'Y', margin: '4 0 0 10' },
                            { name: 'a_tube_pump_comment', margin: '3 0 0 5', style: { width: '220px' } },
                            { name: 'a_tube_pump', xtype: 'checkboxfield', inputValue: 'Y', margin: '5 0 0 5', checked: true },
                            { name: 'p_tube_pump_check', xtype: 'checkboxfield', inputValue: 'Y', margin: '4 0 0 10', readOnly: true },
                            { name: 'p_tube_pump_comment', margin: '3 0 0 5', style: { width: '220px' }, readOnly: true },
                            { name: 'p_tube_pump', xtype: 'checkboxfield', inputValue: 'Y', margin: '5 0 0 5', checked: false, readOnly: true },
							{ xtype: 'label', text: Locale.getMsg('슬리브') },
                             { name: 'a_tube_sleeve_check', xtype: 'checkboxfield', inputValue: 'Y', margin: '4 0 0 10' },
                            { name: 'a_tube_sleeve_comment', margin: '3 0 0 5', style: { width: '220px' } },
                            { name: 'a_tube_sleeve', xtype: 'checkboxfield', inputValue: 'Y', margin: '5 0 0 5', checked: true },
                            { name: 'p_tube_sleeve_check', xtype: 'checkboxfield', inputValue: 'Y', margin: '4 0 0 10', readOnly: true },
                            { name: 'p_tube_sleeve_comment', margin: '3 0 0 5', style: { width: '220px' }, readOnly: true },
                            { name: 'p_tube_sleeve', xtype: 'checkboxfield', inputValue: 'Y', margin: '5 0 0 5', checked: false, readOnly: true }
                ]
            },
            {
                xtype: 'fieldset',
                scrollable:true,
                title: Locale.getMsg('펌프'),
                itemid: 'pumpchecklist',
                reference: 'pumpchecklist',
                layout: {
                    type: 'table',
                    columns: 7,
                    tableAttrs: {
                        style: {
                            width: '900px',
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
                            'word-wrap': 'break-word',
                            'height': '15px'
                        }
                    }, 
                    itemCls: 'cellmargin'
                },
                defaults: {
                    xtype: 'textfield',
                    hideLabel: true
                },
                items: [
                    { xtype: 'label', rowspan: 2, text: Locale.getMsg('목록'), tdAttrs: { style: { 'font-weight': 'bold', width: '40px', backgroundColor: '#EFEFEF' } } },
                            { xtype: 'label', colspan: 3, text: Locale.getMsg('Sample Team'), tdAttrs: { style: { 'font-weight': 'bold', height: '20px', backgroundColor: '#EFEFEF' } } },
                            { xtype: 'label', colspan: 3, text: Locale.getMsg('Customer'), tdAttrs: { style: { 'font-weight': 'bold', height: '20px', backgroundColor: '#EFEFEF' } } },
							{ xtype: 'label', text: Locale.getMsg('이상유무'), tdAttrs: { style: { 'font-weight': 'bold', width: '40px', backgroundColor: '#EFEFEF' } } },
							{ xtype: 'label', text: Locale.getMsg('특이사항'), tdAttrs: { style: { 'font-weight': 'bold', width: '200px', backgroundColor: '#EFEFEF' } } },
							{ xtype: 'label', text: Locale.getMsg('체크'), tdAttrs: { style: { 'font-weight': 'bold', width: '20px', backgroundColor: '#EFEFEF' } } },
							{ xtype: 'label', text: Locale.getMsg('이상유무'), tdAttrs: { style: { 'font-weight': 'bold', width: '40px', backgroundColor: '#EFEFEF' } } },
							{ xtype: 'label', text: Locale.getMsg('특이사항'), tdAttrs: { style: { 'font-weight': 'bold', width: '200px', backgroundColor: '#EFEFEF' } } },
							{ xtype: 'label', text: Locale.getMsg('체크'), tdAttrs: { style: { 'font-weight': 'bold', width: '20px', backgroundColor: '#EFEFEF' } } },
							{ xtype: 'label', text: Locale.getMsg('오버캡') },
                            { name: 'a_pump_overcap_check', xtype: 'checkboxfield', inputValue: 'Y', margin: '4 0 0 10' },
                            { name: 'a_pump_overcap_comment', margin: '3 0 0 5', style: { width: '220px' } },
                            { name: 'a_pump_overcap', xtype: 'checkboxfield', inputValue: 'Y', margin: '5 0 0 5', checked: true},
                            { name: 'p_pump_overcap_check', xtype: 'checkboxfield', inputValue: 'Y', margin: '4 0 0 10', readOnly: true },
                            { name: 'p_pump_overcap_comment', margin: '3 0 0 5', style: { width: '220px' }, readOnly: true },
                            { name: 'p_pump_overcap', xtype: 'checkboxfield', inputValue: 'Y', margin: '5 0 0 5', checked: false, readOnly: true },
							{ xtype: 'label', text: Locale.getMsg('펌프') },
                            { name: 'a_pump_pump_check', xtype: 'checkboxfield', inputValue: 'Y', margin: '4 0 0 10' },
                            { name: 'a_pump_pump_comment', margin: '3 0 0 5', style: { width: '220px' } },
                            { name: 'a_pump_pump', xtype: 'checkboxfield', inputValue: 'Y', margin: '5 0 0 5', checked: true },
                            { name: 'p_pump_pump_check', xtype: 'checkboxfield', inputValue: 'Y', margin: '4 0 0 10', readOnly: true },
                            { name: 'p_pump_pump_comment', margin: '3 0 0 5', style: { width: '220px' }, readOnly: true },
                            { name: 'p_pump_pump', xtype: 'checkboxfield', inputValue: 'Y', margin: '5 0 0 5', checked: false, readOnly: true },
							{ xtype: 'label', text: Locale.getMsg('용기') },
                            { name: 'a_pump_cont_check', xtype: 'checkboxfield', inputValue: 'Y', margin: '4 0 0 10' },
                            { name: 'a_pump_cont_comment', margin: '3 0 0 5', style: { width: '220px' } },
                            { name: 'a_pump_cont', xtype: 'checkboxfield', inputValue: 'Y', margin: '5 0 0 5', checked: true },
                            { name: 'p_pump_cont_check', xtype: 'checkboxfield', inputValue: 'Y', margin: '4 0 0 10', readOnly: true },
                            { name: 'p_pump_cont_comment', margin: '3 0 0 5', style: { width: '220px' }, readOnly: true },
                            { name: 'p_pump_cont', xtype: 'checkboxfield', inputValue: 'Y', margin: '5 0 0 5', checked: false, readOnly: true },
                            { xtype: 'label', text: Locale.getMsg('받침') },
                            { name: 'a_pump_support_check', xtype: 'checkboxfield', inputValue: 'Y', margin: '4 0 0 10' },
                            { name: 'a_pump_support_comment', margin: '3 0 0 5', style: { width: '220px' } },
                            { name: 'a_pump_support', xtype: 'checkboxfield', inputValue: 'Y', margin: '5 0 0 5', checked: true }, 
                            { name: 'p_pump_support_check', xtype: 'checkboxfield', inputValue: 'Y', margin: '4 0 0 10', readOnly: true },
                            { name: 'p_pump_support_comment', margin: '3 0 0 5', style: { width: '220px' }, readOnly: true },
                            { name: 'p_pump_support', xtype: 'checkboxfield', inputValue: 'Y', margin: '5 0 0 5', checked: false, readOnly: true }
                ]
            }
	    ],
	        dockedItems: [{
	            xtype: 'toolbar',
	            dock: 'top',
	            ui: 'footer',
	            defaults: {
	                minWidth: 100
	            },
	            items: [
                    { xtype: 'hiddenfield', name: 'paentFrm', reference: 'paentFrm', itemId: 'paentFrm' },
                    { xtype: 'hiddenfield', name: 'mode', reference: 'mode', itemId: 'mode' },
                     { xtype: 'hiddenfield', name: 'smp_cd', reference: 'smp_cd', itemId: 'smp_cd' },
                     { xtype: 'hiddenfield', name: 'smp_chasu', reference: 'smp_chasu', itemId: 'smp_chasu' },
                     { xtype: 'hiddenfield', name: 'smr_cd', reference: 'smr_cd', itemId: 'smr_cd' },
                     { xtype: 'hiddenfield', name: 'smr_chasu', reference: 'smr_chasu', itemId: 'smr_chasu' },
                     { xtype: 'hiddenfield', name: 'chkYn', reference: 'chkYn', itemId: 'chkYn' },
                    { xtype: 'component', flex: 1 },
                    {
                        xtype: 'button', text: Locale.getMsg('외관확인'), margin: '5 5 5 5', itemId: 'btn1', hidden: false,
                        listeners: { click: 'onCheck' }
                    } 
	            ]
	        }]
	}
				
    ]
	
});


Ext.define('Ysn.view.common.searchItem',{
    extend: 'Ext.window.Window',
    xtype: 'common-searchItem',
    requires: [
        'Ysn.view.common.searchItemController', 	
		'Ext.grid.filters.Filters'
    ],

    controller: 'common-searchItem', 
	title: '품목 조회',
	reference: 'commonsearchItem', 
	id: 'commonsearchItem', 
	modal:true,
    width: 600,
    height: 400, 
    bodyBorder: false, 
	resizable: false,
	dockedItems: [
	               {
		            title: '',
					layout: 'column',
					defaults: {
						layout: 'form',
						xtype: 'container',
						defaultType: 'textfield',
						margin: '10 10 10 10'
					},
					items:[{
								xtype: 'textfield',
								fieldLabel: '품목코드/명', 
								labelWidth: 100,							
								name: 'item',
								itemId: 'item',
								reference : 'item'
								
							},
							{
								xtype: 'combobox',
								reference: 'item_level1',
								itemId: 'item_level1',
								name: 'item_level1',
								publishes: 'value', 
								displayField: 'ITEM_LEVEL1',
								valueField: 'ITEM_LEVEL1', 
								store: {
									type: 'itemLevel',
									autoLoad: true,
								    autoDestroy: true
								},
								minChars: 0,
								//width: 120,
								queryMode: 'local', 
								listeners: {
									//change : 'onChangeBiz' 
								}
							},{
							xtype: 'hiddenfield',
							reference: 'paentFrm', 
							itemId : 'paentFrm',
							listeners:{change:'onChange'}
							},{
						    xtype: 'button',
							text: Locale.getMsg('검색'), 
							handler: 'chkSearch'
							}
					],					
					dock: 'top',
					height: 50
					}
	] ,

    items: [
		{
					header: false,					
					region: 'center',
					//scrollable: true,
					overflow:'scroll',
					layout:'fit',
					items:[
			              {	xtype: 'grid',
						    reference : 'searchGrid' ,
							store: {
								fields: [
									{name: 'ITEM_CD', type: 'string'}, 
									{name: 'ITEM_NM', type: 'string'}, 
									{name: 'ITEM_LEVEL1', type: 'string'}, 
									{name: 'ITEM_LEVEL2', type: 'string'} , 
									{name: 'ITEM_LEVEL3', type: 'string'}  
								],

								proxy: {
								    method: "POST",
									type: 'ajax',
									url: '/popup/product_item',									
									reader: {
										type: 'json',
										rootProperty: '' 
									}
								},
								listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
							},
								autoLoad: false,
								autoDestroy: true
							}, 
							style: {'borderTop':'1px solid gray'},
							columnLines: true, 
							plugins: 'gridfilters',
							columns: [
									{text: Locale.getMsg('품목코드'), width: 100, dataIndex: 'ITEM_CD', sortable: true,  
									 filter: {
										 type: 'string',
										 itemDefaults: {
											emptyText: '검색어입력..'
										}
									 }
									},
									{text: Locale.getMsg('품목명'),  width: 250, dataIndex: 'ITEM_NM', sortable: true,  
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 }
									}, 
									{text: Locale.getMsg('대분류'), width: 100, dataIndex: 'ITEM_LEVEL1', sortable: true,
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 } 
									}, 
									{text: Locale.getMsg('중분류'), width: 100, dataIndex: 'ITEM_LEVEL2', sortable: true,
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 } 
									}, 
									{text: Locale.getMsg('소분류'), width: 100, dataIndex: 'ITEM_LEVEL3', sortable: true,
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 } 
									}
								],
						   scrollable: true, 
						   height: 300,
						   width: 600,
						   syncRowHeight: false,
						   viewConfig: {
								 
							},
						    listeners: {									 
						        itemclick: 'onSelect'
							} 
						  }
					]

		} 
    ]
	
});

Ext.define('Ysn.view.common.searchEndUser',{
    extend: 'Ext.window.Window',
    xtype: 'common-searchEndUser',
    requires: [
        'Ysn.view.common.searchEndUserController', 
		'Ext.grid.filters.Filters'
    ],

    controller: 'common-searchEndUser', 
	title: 'EndUser 조회',
	reference: 'commonSearchEndUser', 
	id: 'commonSearchEndUser', 
	modal:true,
    width: 600,
    height: 400, 
    bodyBorder: false, 
	resizable: false,
	dockedItems: [
	               {
		            title: '',
					layout: 'column',
					defaults: {
						layout: 'form',
						xtype: 'container',
						defaultType: 'textfield',
						margin: '10 10 10 10'
					},
					items:[{
						    xtype: 'textfield',
							fieldLabel: Locale.getMsg('End User'), 
							labelWidth: 60,							
							name: 'euser_nm',
							itemId: 'euser_nm',
							reference : 'euser_nm'  
							},{
						    xtype: 'textfield',
							fieldLabel: Locale.getMsg('영문명'),
							labelWidth: 60,		
							name: 'euser_eng_nm',
							itemId: 'euser_eng_nm',
							reference : 'euser_eng_nm'  
							},{
							xtype: 'hiddenfield',
							reference: 'paentFrm', 
							itemId: 'paentFrm',
							listeners: { change: 'onChange' }
							},{
						    xtype: 'button',
							text: Locale.getMsg('검색'), 
							handler: 'chkSearch'
							}
					],					
					dock: 'top',
					height: 50
					}
	] ,

    items: [
		{
					header: false,					
					region: 'center',
					//scrollable: true,
					overflow:'scroll',
					layout:'fit',
					items:[
			              {	xtype: 'grid',
						    reference : 'searchGrid' ,
							store: {
								fields: [
									{name: 'EUSER_NM', type: 'string'},
									{name: 'EUSER_ENG_NM', type: 'string'},
									{name: 'EUSER_CD', type: 'string'} 
								],

								proxy: {
								    method: "POST",
									type: 'ajax',
									url: '/Popup/endUserList',
									reader: {
										type: 'json',
										rootProperty: '' 
									}
								},
								listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
							},
								autoLoad: false,
								autoDestroy: true
							}, 
							style: {'borderTop':'1px solid gray'},
							columnLines: true, 
							plugins: 'gridfilters',
							columns: [
									{text: "End User명", width: 300, dataIndex: 'EUSER_NM', sortable: true,  
									 filter: {
										 type: 'string',
										 itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 }
									},
									{text: Locale.getMsg('영문명'),  width: 150, dataIndex: 'EUSER_ENG_NM', sortable: true,  
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: Locale.getMsg('검색어입력..')
										}
									 }
									}, 
									{text: "EUSER_CD", width: 100, dataIndex: 'EUSER_CD', sortable: true, hidden: true}
								],
						   scrollable: true, 
						   height: 300,
						   width: 600,
						   syncRowHeight: false,
						   viewConfig: {
								 
							},
						    listeners: {									 
						        itemclick: 'onSelect'
							} 
						  }
					]

		} 
    ]
	
});

Ext.define('Ysn.view.common.searchSmpCd',{
    extend: 'Ext.window.Window',
    xtype: 'common-searchSmpCd',
    requires: [
        'Ysn.view.common.searchSmpCdController', 
		'Ext.grid.filters.Filters'
    ],

    controller: 'common-searchSmpCd', 
	title: '샘플요청건 조회',
	reference: 'commonsearchSmpCd', 
	id: 'commonsearchSmpCd', 
	modal:true,
    width: 600,
    height: 400, 
    bodyBorder: false, 
	resizable: false,
	dockedItems: [
	               {
		            title: '',
					layout: 'column',
					defaults: {
						layout: 'form',
						xtype: 'container',
						defaultType: 'textfield',
						margin: '10 10 10 10'
					},
					items:[{
						    xtype: 'textfield',
							fieldLabel: Locale.getMsg('품목명'), 
							labelWidth: 60,							
							name: 'item_nm',
							itemId: 'item_nm',
							reference : 'item_nm'  
							},{
						    xtype: 'textfield',
							fieldLabel: Locale.getMsg('거래처'),
							labelWidth: 60,		
							name: 'cust_nm', 
							reference : 'cust_nm'  
							},{
							xtype: 'hiddenfield',
							reference: 'paentFrm', 
							itemId : 'paentFrm'
							},{
						    xtype: 'button',
							text: Locale.getMsg('검색'), 
							handler: 'chkSearch'
							}
					],					
					dock: 'top',
					height: 50
					}
	] ,

    items: [
		{
					header: false,					
					region: 'center',
					//scrollable: true,
					overflow:'scroll',
					layout:'fit',
					items:[
			              {	xtype: 'grid',
						    reference : 'searchGrid' ,
							store: {
								fields: [
									{name: 'SMR_CD', type: 'string'},
									{name: 'SMR_CHASU', type: 'string'},
									{name: 'ITEM_CD', type: 'string'},
									{name: 'ITEM_NM', type: 'string'},
									{name: 'EUSER_CD', type: 'string'},
									{name: 'EUSER_NM', type: 'string'},
									{ name: 'SMP_RQTY', type: 'string' },
                                    { name: 'PUR_OQTY', type: 'string' },
									{ name: 'PROJECT_POSS', type: 'string' },
								    { name: 'SMR_PODATE', type: 'date', dateFormat: 'Ymd' } 
								],

								proxy: {
								    method: "POST",
									type: 'ajax',
									url: '/Popup/sampleRequestPopup',
									reader: {
										type: 'json',
										rootProperty: '' 
									}
								},
								listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
							},
								autoLoad: false,
								autoDestroy: true
							}, 
							style: {'borderTop':'1px solid gray'},
							columnLines: true, 
							plugins: 'gridfilters',
							columns: [
									{text: "SMR_CD", width: 100, dataIndex: 'SMR_CD', sortable: true,  
									 filter: {
										 type: 'string',
										 itemDefaults: {
											emptyText: '검색어입력..'
										}
									 }
									},
									{text: Locale.getMsg('차수'),  width: 60, dataIndex: 'SMR_CHASU', sortable: true,  
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: '검색어입력..'
										}
									 }
									},
									{text: Locale.getMsg('거래처'),  width:150, dataIndex: 'EUSER_NM', sortable: true,  
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: '검색어입력..'
										}
									 }
									},
									{text: Locale.getMsg('품목명'),  flex:1, dataIndex: 'ITEM_NM', sortable: true,  
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: '검색어입력..'
										}
									 }
									},
									{ text: "SMP_RQTY", width: 100, dataIndex: 'SMP_RQTY', sortable: true, hidden: true },
                                    { text: "PUR_OQTY", width: 100, dataIndex: 'PUR_OQTY', sortable: true, hidden: true },
									{text: "EUSER_CD", width: 100, dataIndex: 'EUSER_CD', sortable: true, hidden: true}, 
									{text: "ITEM_CD", width: 100, dataIndex: 'ITEM_CD', sortable: true, hidden: true}
								],
						   scrollable: true, 
						   height: 300,
						   width: 600,
						   syncRowHeight: false,
						   viewConfig: {
								 
							},
						    listeners: {									 
						        itemclick: 'onSelect'
							} 
						  }
					]

		} 
    ]
	
});

Ext.define('Ysn.view.common.searchBaseCrny',{
    extend: 'Ext.window.Window',
    xtype: 'common-searchBaseCrny',
    requires: [
        'Ysn.view.common.searchBaseCrnyController', 
		'Ext.grid.filters.Filters'
    ],

    controller: 'common-searchBaseCrny', 
	title: '환율정보 조회',
	reference: 'commonsearchBaseCrny', 
	id: 'commonsearchBaseCrny', 
	modal:true,
    width: 400,
    height: 400, 
    bodyBorder: false, 
	resizable: false,
	dockedItems: [
	               {
		            title: '',
					layout: 'column',
					defaults: {
						layout: 'form',
						xtype: 'container',
						defaultType: 'textfield',
						margin: '10 10 10 10'
					},
					items:[
							{
								xtype: 'combobox',
								fieldLabel: Locale.getMsg('기준년도'), 
								reference: 'base_yr',
								itemId: 'base_yr',
								name: 'base_yr',
								publishes: 'value', 
								displayField: 'YEAR',
								valueField: 'VAL', 
								store: {
									type: 'year',
									autoLoad: true,
								    autoDestroy: true
								},
								minChars: 0,
								//width: 120,
								queryMode: 'local', 
								listeners: {
									//change : 'onChangeBiz' 
								}
							},{
							xtype: 'hiddenfield',
							reference: 'paentFrm', 
							itemId : 'paentFrm'
							},{
						    xtype: 'button',
							text: Locale.getMsg('검색'), 
							handler: 'chkSearch'
							}
					],					
					dock: 'top',
					height: 50
					}
	] ,

    items: [
		{
					header: false,					
					region: 'center',
					//scrollable: true,
					overflow:'scroll',
					layout:'fit',
					items:[
			              {	xtype: 'grid',
						    reference : 'searchGrid' ,
							store: {
								fields: [
									{name: 'BASE_YR', type: 'string'},
									{name: 'BASE_CRNY', type: 'string'},
									{name: 'EXCH_RATE', type: 'string'} 
								],

								proxy: {
								    method: "POST",
									type: 'ajax',
									url: '/popup/base_crny',
									reader: {
										type: 'json',
										rootProperty: '' 
									}
								},
								listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
							},
								autoLoad: false,
								autoDestroy: true
							}, 
							style: {'borderTop':'1px solid gray'},
							columnLines: true, 
							plugins: 'gridfilters',
							columns: [
									{text: Locale.getMsg('기준년도'), width: 100, dataIndex: 'BASE_YR', sortable: true,  
									 filter: {
										 type: 'string',
										 itemDefaults: {
											emptyText: '검색어입력..'
										}
									 }
									},
									{text: Locale.getMsg('통화'),  width: 100, dataIndex: 'BASE_CRNY', sortable: true,  
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: '검색어입력..'
										}
									 }
									},
									{text: Locale.getMsg('환율'),  flex:1, dataIndex: 'EXCH_RATE', sortable: true,  
									 filter: {
										type: 'string',
										itemDefaults: {
											emptyText: '검색어입력..'
										}
									 }
									} 
								],
						   scrollable: true, 
						   height: 300,
						   width: 600,
						   syncRowHeight: false,
						   viewConfig: {
								 
							},
						    listeners: {									 
						        itemclick: 'onSelect'
							} 
						  }
					]

		} 
    ]
	
});

Ext.define('Ysn.view.common.dropPop',{
    extend: 'Ext.window.Window',
    xtype: 'common-dropPop',
    requires: [
        'Ysn.view.common.dropPopController'
    ],

    controller: 'common-dropPop', 
	title: '샘플 DROP 내역',
	reference: 'common-dropPop', 
	id: 'common-dropPop', 
	modal:true,
    width: 425,
    height: 450, 
    bodyBorder: false, 
	resizable: false,
	layout:'fit',
    items: [
		{
					header: false,					
					region: 'center',
					scrollable: true,
					//overflow:'scroll',
					id: 'common-dropPopDetail',
					reference: 'common-dropPopDetail',
					xtype:'form', 
					reader: {
						type: 'json',
						model: 'Ysn.model.sampleDropPopup',
						rootProperty: '' 
					},
					layout: 'vbox',  
					items:[
						   { xtype: 'fieldcontainer',layout: 'hbox',
						    items:[
						           { fieldLabel: 'SMP.CD', xtype: 'textfield',labelWidth: 80, width:200, name: 'smp_cd', readOnly: true },
						           { fieldLabel: Locale.getMsg('차수'), xtype: 'textfield',labelWidth: 50, width:100, name: 'smp_chasu', readOnly: true }
					              ]
						   },
						   { fieldLabel: Locale.getMsg('샘플품목'), xtype: 'textareafield',name: 'item_nm', labelWidth: 80, width:390,readOnly: true  },
						   { fieldLabel: Locale.getMsg('Drop담당'), xtype: 'textfield',name: 'login_user_nm', labelWidth: 80, readOnly: true  },
						   { fieldLabel: Locale.getMsg('Drop일자'), xtype: 'datefield', name: 'drop_day', labelWidth: 80, format: 'Y-m-d', readOnly: true },
						   { fieldLabel: Locale.getMsg('Drop유형'), xtype: 'combobox', labelWidth: 80, name: 'smp_drtype',allowBlank:false,
						     reference: 'smp_drtype', publishes: 'value', displayField: 'CODE_NM', valueField: 'CODE_ID', 
							 emptyText: Locale.getMsg('선택'), store: { type: 'Tcode' }, minChars: 0, queryMode: 'local', typeAhead: true },
						   { fieldLabel: Locale.getMsg('Drop사유'), xtype: 'textareafield',labelWidth: 80, name: 'smp_drdescript',allowBlank:false,width:390}
					],
					dockedItems: [{
							xtype: 'toolbar',
							dock: 'top',
							ui: 'footer',
							defaults: {
								minWidth: 100 
							},
							items: [
								{ xtype: 'hiddenfield', name: 'smp_status'},
								{ xtype: 'hiddenfield', name: 'smp_drop', value:'N'}, 
								{ xtype: 'hiddenfield', name: 'parentfrm', itemId: 'parentfrm'},
								{ xtype: 'component', flex: 1 },
								{ xtype: 'button', text: Locale.getMsg('저장'), margin: '5 5 5 5', itemId:'btn1',name:'btn1', hidden: true,
									listeners: {click : 'onSubmit'}
								} 
							]
				 }]

		} 
    ] 
	
});

Ext.define('Ysn.view.common.opptdropPop', {
    extend: 'Ext.window.Window',
    xtype: 'common-opptdropPop',
    requires: [
        'Ysn.view.common.opptdropPopController'
    ],

    controller: 'common-opptdropPop',
    title: '사업기회 DROP 등록',
    reference: 'common-opptdropPop',
    id: 'common-opptdropPop',
    modal: true,
    width: 425,
    height: 450,
    bodyBorder: false,
    resizable: false,
    layout: 'fit',
    items: [
		{
		    header: false,
		    region: 'center',
		    scrollable: true,
		    //overflow:'scroll',
		    id: 'common-dopptropPopDetail',
		    reference: 'common-opptdropPopDetail',
		    xtype: 'form',
		    reader: {
		        type: 'json',
		        model: 'Ysn.model.opportunityDetail',
		        rootProperty: 'LIST'
		    },
		    layout: 'vbox',
		    items: [ 
                   { fieldLabel: Locale.getMsg('기회품목'), xtype: 'textareafield', name: 'item_nm', labelWidth: 80, width: 390, readOnly: true },
                   { fieldLabel: Locale.getMsg('거래처'), xtype: 'textareafield', name:'cust_nm', labelWidth: 80, width: 390, readOnly: true },
                   { fieldLabel: Locale.getMsg('Drop담당'), xtype: 'textfield', name: 'user_nm', labelWidth: 80, readOnly: true },
                   { fieldLabel: Locale.getMsg('Drop일자'), xtype: 'datefield', name: 'oppt_drdate', reference: 'oppt_drdate', labelWidth: 80, format: 'Y-m-d', readOnly: true },
                   {
                       fieldLabel: Locale.getMsg('Drop유형'), xtype: 'combobox', labelWidth: 80, name: 'oppt_drtype', allowBlank: false,
                       reference: 'oppt_drtype', publishes: 'value', displayField: 'CODE_NM', valueField: 'CODE_ID',
                       emptyText: Locale.getMsg('선택'), store: { type: 'Tcode' }, minChars: 0, queryMode: 'local', typeAhead: true, readOnly: false
                   },
                   { fieldLabel: Locale.getMsg('Drop사유'), xtype: 'textareafield', labelWidth: 80, name: 'oppt_drdescript', allowBlank: false, readOnly: false, width: 390 }
		    ],
		    dockedItems: [{
		        xtype: 'toolbar',
		        dock: 'top',
		        ui: 'footer',
		        defaults: {
		            minWidth: 100
		        },
		        items: [
                    { xtype: 'hiddenfield', name: 'oppt_cd' },
                    { xtype: 'hiddenfield', name: 'item_cd' },
                    { xtype: 'hiddenfield', name: 'user_cd', value: 'loginUser' },
                    { xtype: 'hiddenfield', name: 'parentfrm', itemId: 'parentfrm' },
                    { xtype: 'component', flex: 1 },
                    {
                        xtype: 'button', text: Locale.getMsg('저장'), margin: '5 5 5 5', itemId: 'btn1', name: 'btn1', hidden: true,
                        listeners: { click: 'onSubmit' }
                    }
		        ]
		    }]

		}
    ]

});

Ext.define('Ysn.view.common.myRepairPop',{
    extend: 'Ext.window.Window',
    xtype: 'common-myRepairPop',
    requires: [
        'Ysn.view.common.myRepairPopController'
    ],

    controller: 'common-myRepairPop', 
	title: '자체재작업 내역',
	reference: 'common-myRepairPop', 
	id: 'common-myRepairPop', 
	modal:true,
    width: 425,
    height: 500, 
    bodyBorder: false, 
	resizable: false,
	layout:'fit',
    items: [
		{
					header: false,					
					region: 'center',
					scrollable: true,
					//overflow:'scroll',
					id: 'common-myRepairPopDetail',
					reference: 'common-myRepairPopDetail',
					xtype:'form', 
					reader: {
						type: 'json',
						model: 'Ysn.model.sampleMyrepairPopup',
						rootProperty: 'INFO' 
					},
					layout: 'vbox',  
					items:[
						   { xtype: 'fieldcontainer',layout: 'hbox',
						    items:[
						           { fieldLabel: 'SMP.CD', xtype: 'textfield',labelWidth: 100, width:230, name: 'smp_cd', readOnly: true },
						           { fieldLabel: Locale.getMsg('차수'), xtype: 'textfield',labelWidth: 50, width:100, name: 'smp_chasu', readOnly: true }
					              ]
						   },
						   { fieldLabel: Locale.getMsg('샘플품목'), xtype: 'textareafield',name: 'item_nm', labelWidth: 100, width:390,readOnly: true  },
						   { fieldLabel: Locale.getMsg('거래처'), xtype: 'textfield',name: 'cust_nm', labelWidth: 100, width:390,readOnly: true  },
						   { fieldLabel: Locale.getMsg('재작업요청자'), xtype: 'textfield',name: 'login_user_nm', labelWidth: 100, readOnly: true  },
						   { fieldLabel: Locale.getMsg('재작업요청일'), xtype: 'datefield',name: 'repair_day', labelWidth: 100, format: 'Y-m-d',readOnly: true },
						   { fieldLabel: Locale.getMsg('재작업유형'), xtype: 'combobox', labelWidth: 100, name: 'smp_qrtype',allowBlank:false,
						     reference: 'smp_qrtype', publishes: 'value', displayField: 'CODE_NM', valueField: 'CODE_ID', 
							 emptyText: Locale.getMsg('선택'), store: { type: 'Tcode' }, minChars: 0, queryMode: 'local', typeAhead: true },
						   { fieldLabel: Locale.getMsg('재작업사유'), xtype: 'textareafield',labelWidth: 100, name: 'smp_qrdescript',allowBlank:false,width:390}
					],
					dockedItems: [{
							xtype: 'toolbar',
							dock: 'top',
							ui: 'footer',
							defaults: {
								minWidth: 100 
							},
							items: [
								{ xtype: 'hiddenfield', name: 'smp_status'},
								{ xtype: 'hiddenfield', name: 'repair_yn', value:'N'}, 
								{ xtype: 'hiddenfield', name: 'parentfrm', itemId: 'parentfrm'},
								{ xtype: 'component', flex: 1 },
								{ xtype: 'button', text: Locale.getMsg('저장'), margin: '5 5 5 5', itemId:'btn1',name:'btn1', hidden: true,
									listeners: {click : 'onSubmit'}
								} 
							]
				 }]

		} 
    ] 
	
});

Ext.define('Ysn.view.common.RepairPop',{
    extend: 'Ext.window.Window',
    xtype: 'common-RepairPop',
    requires: [
        'Ysn.view.common.RepairPopController'
    ],

    controller: 'common-RepairPop', 
	title: '샘플재작업 내역',
	reference: 'common-RepairPop', 
	id: 'common-RepairPop', 
	modal:true,
    width: 425,
    height: 500, 
    bodyBorder: false, 
	resizable: false,
	layout:'fit',
    items: [
		{
					header: false,					
					region: 'center',
					scrollable: true,
					//overflow:'scroll',
					id: 'common-RepairPopDetail',
					reference: 'common-RepairPopDetail',
					xtype:'form', 
					reader: {
						type: 'json',
						model: 'Ysn.model.sampleRepairPopup',
						rootProperty: 'INFO' 
					},
					layout: 'vbox',  
					items:[
						   { xtype: 'fieldcontainer',layout: 'hbox',
						    items:[
						           { fieldLabel: 'SMP.CD', xtype: 'textfield',labelWidth: 100, width:200, name: 'smp_cd', readOnly: true },
						           { fieldLabel: Locale.getMsg('차수'), xtype: 'textfield',labelWidth: 50, width:100, name: 'smp_chasu', readOnly: true }
					              ]
						   },
						   { fieldLabel: Locale.getMsg('샘플품목'), xtype: 'textareafield',name: 'item_nm', labelWidth: 100, width:390,readOnly: true  },
						   { fieldLabel: Locale.getMsg('거래처'), xtype: 'textfield',name: 'cust_nm', labelWidth: 100, width:390,readOnly: true  },
						   { fieldLabel: Locale.getMsg('재작업요청자'), xtype: 'textfield',name: 'login_user_nm', labelWidth: 100, readOnly: true  },
						   { fieldLabel: Locale.getMsg('재작업요청일'), xtype: 'datefield',name: 'repair_day', labelWidth: 100, format: 'Y-m-d',readOnly: true },
						   { fieldLabel: Locale.getMsg('재작업유형'), xtype: 'combobox', labelWidth: 100, name: 'smp_crtype',allowBlank:false,
						      reference: 'smp_crtype', publishes: 'value', displayField: 'CODE_NM', valueField: 'CODE_ID', 
							 emptyText: Locale.getMsg('선택'), store: { type: 'Tcode' }, minChars: 0, queryMode: 'local', typeAhead: true },
						   { fieldLabel: Locale.getMsg('재작업사유'), xtype: 'textareafield',labelWidth: 100, name: 'smp_crdescript',allowBlank:false,width:390}
					],
					dockedItems: [{
							xtype: 'toolbar',
							dock: 'top',
							ui: 'footer',
							defaults: {
								minWidth: 100 
							},
							items: [
								{ xtype: 'hiddenfield', name: 'smp_status'},
								{ xtype: 'hiddenfield', name: 'repair_yn', value:'N'}, 
								{ xtype: 'hiddenfield', name: 'parentfrm', itemId: 'parentfrm'},
								{ xtype: 'component', flex: 1 },
								{ xtype: 'button', text: Locale.getMsg('저장'), margin: '5 5 5 5', itemId:'btn1',name:'btn1', hidden: true,
									listeners: {click : 'onSubmit'}
								} 
							]
				 }]

		} 
    ] 
	
});

Ext.define('Ysn.view.common.rejectPop',{
    extend: 'Ext.window.Window',
    xtype: 'common-rejectPop',
    requires: [
        'Ysn.view.common.rejectPopController'
    ],

    controller: 'common-rejectPop', 
	title: '의뢰반려 내역',
	reference: 'common-rejectPop', 
	id: 'common-rejectPop', 
	modal:true,
    width: 425,
    height: 500, 
    bodyBorder: false, 
	resizable: false,
	layout:'fit',
    items: [
		{
					header: false,					
					region: 'center',
					scrollable: true,
					//overflow:'scroll',
					id: 'common-rejectPopDetail',
					reference: 'common-rejectPopDetail',
					xtype:'form', 
					reader: {
						type: 'json',
						model: 'Ysn.model.sampleRejectPopup',
						rootProperty: '' 
					},
					layout: 'vbox',  
					items:[
						   { xtype: 'fieldcontainer',layout: 'hbox',
						    items:[
						           { fieldLabel: 'SMP.CD', xtype: 'textfield',labelWidth: 100, width:200, name: 'smp_cd', readOnly: true },
						           { fieldLabel: Locale.getMsg('차수'), xtype: 'textfield',labelWidth: 50, width:100, name: 'smp_chasu', readOnly: true }
					              ]
						   },
						   { fieldLabel: Locale.getMsg('샘플품목'), xtype: 'textareafield',name: 'item_nm', labelWidth: 100, width:390,readOnly: true  },
						   { fieldLabel: Locale.getMsg('거래처'), xtype: 'textfield',name: 'cust_nm', labelWidth: 100, width:390,readOnly: true  },
						   { fieldLabel: Locale.getMsg('의뢰반려담당'), xtype: 'textfield',name: 'login_user_nm', labelWidth: 100, readOnly: true  },
						   { fieldLabel: Locale.getMsg('의뢰반려일자'), xtype: 'datefield',name: 'smp_rtdate', labelWidth: 100, format: 'Y-m-d',readOnly: true },
						   { fieldLabel: Locale.getMsg('의뢰반려유형'), xtype: 'combobox', labelWidth: 100, name: 'smp_rttype',allowBlank:false,
						      reference: 'smp_rttype', publishes: 'value', displayField: 'CODE_NM', valueField: 'CODE_ID', 
							 emptyText: Locale.getMsg('선택'), store: { type: 'Tcode' }, minChars: 0, queryMode: 'local', typeAhead: true,readOnly: false },
						   { fieldLabel: Locale.getMsg('의뢰반려사유'), xtype: 'textareafield',labelWidth: 100, name: 'smp_rtdescript',allowBlank:false,readOnly: false, width:390}
					],
					dockedItems: [{
							xtype: 'toolbar',
							dock: 'top',
							ui: 'footer',
							defaults: {
								minWidth: 100 
							},
							items: [
								{ xtype: 'hiddenfield', name: 'smp_status'},
								{ xtype: 'hiddenfield', name: 'btn_yn', value:'Y'}, 
								{ xtype: 'hiddenfield', name: 'parentfrm', itemId: 'parentfrm'},
								{ xtype: 'component', flex: 1 },
								{ xtype: 'button', text: Locale.getMsg('저장'), margin: '5 5 5 5', itemId:'btn1',name:'btn1', hidden: true,
									listeners: {click : 'onSubmit'}
								} 
							]
				 }]

		} 
    ] 
	
});

Ext.define('Ysn.view.common.smr_rejectPop',{
    extend: 'Ext.window.Window',
    xtype: 'common-smr_rejectPop',
    requires: [
        'Ysn.view.common.smr_rejectPopController'
    ],

    controller: 'common-smr_rejectPop', 
	title: '의뢰반려 내역',
	reference: 'common-smr_rejectPop', 
	id: 'common-smr_rejectPop', 
	modal:true,
    width: 425,
    height: 500, 
    bodyBorder: false, 
	resizable: false,
	layout:'fit',
    items: [
		{
					header: false,					
					region: 'center',
					scrollable: true,
					//overflow:'scroll',
					id: 'common-smr_rejectPopDetail',
					reference: 'common-smr_rejectPopDetail',
					xtype:'form', 
					reader: {
						type: 'json',
						model: 'Ysn.model.sampleSmrRejectPopup',
						rootProperty: '' 
					},
					layout: 'vbox',  
					items:[
						   { xtype: 'fieldcontainer',layout: 'hbox',
						    items:[
						           { fieldLabel: 'SMR.CD', xtype: 'textfield',labelWidth: 100, width:200, name: 'smr_cd', readOnly: true },
						           { fieldLabel: Locale.getMsg('차수'), xtype: 'textfield',labelWidth: 50, width:100, name: 'smr_chasu', readOnly: true }
					              ]
						   },
						   { fieldLabel: Locale.getMsg('샘플품목'), xtype: 'textareafield',name: 'item_nm', labelWidth: 100, width:390,readOnly: true  },
						   { fieldLabel: Locale.getMsg('거래처'), xtype: 'textfield',name: 'cust_nm', labelWidth: 100, width:390,readOnly: true  },
						   { fieldLabel: Locale.getMsg('의뢰반려담당'), xtype: 'textfield',name: 'login_user_nm', labelWidth: 100, readOnly: true },
						   { fieldLabel: Locale.getMsg('의뢰반려일자'), xtype: 'datefield',name: 'smr_rtdate', labelWidth: 100, format: 'Y-m-d',readOnly: true },
						   { fieldLabel: Locale.getMsg('의뢰반려유형'), xtype: 'combobox', labelWidth: 100, name: 'smr_rttype',allowBlank:false,
						      reference: 'smr_rttype', publishes: 'value', displayField: 'CODE_NM', valueField: 'CODE_ID', 
							 emptyText: Locale.getMsg('선택'), store: { type: 'Tcode' }, minChars: 0, queryMode: 'local', typeAhead: true,readOnly: false },
						   { fieldLabel: Locale.getMsg('의뢰반려사유'), xtype: 'textareafield',labelWidth: 100, name: 'smr_rtdescript',allowBlank:false,readOnly: false, width:390}
					],
					dockedItems: [{
							xtype: 'toolbar',
							dock: 'top',
							ui: 'footer',
							defaults: {
								minWidth: 100 
							},
							items: [
								{ xtype: 'hiddenfield', name: 'smr_status'},
								{ xtype: 'hiddenfield', name: 'btn_yn', itemId: 'btn_yn', value: 'N' },
								{ xtype: 'hiddenfield', name: 'parentfrm', itemId: 'parentfrm'},
								{ xtype: 'component', flex: 1 },
								{ xtype: 'button', text: Locale.getMsg('저장'), margin: '5 5 5 5', itemId:'btn1',name:'btn1', hidden: true,
									listeners: {click : 'onSubmit'}
								} 
							]
				 }]

		} 
    ] 
	
});

Ext.define('Ysn.view.common.smr_reviewPop', {
    extend: 'Ext.window.Window',
    xtype: 'common-smr_reviewPop',
    requires: [
        'Ysn.view.common.smr_reviewPopController'
    ],

    controller: 'common-smr_reviewPop',
    title: '검토반려 내역',
    reference: 'common-smr_reviewPop',
    id: 'common-smr_reviewPop',
    modal: true,
    width: 425,
    height: 500,
    bodyBorder: false,
    resizable: false,
    layout: 'fit',
    items: [
		{
		    header: false,
		    region: 'center',
		    scrollable: true,
		    //overflow:'scroll',
		    id: 'common-smr_reviewPopDetail',
		    reference: 'common-smr_reviewPopDetail',
		    xtype: 'form',
		    reader: {
		        type: 'json',
		        model: 'Ysn.model.sampleSmrReviewPopup',
		        rootProperty: 'INFO'
		    },
		    layout: 'vbox',
		    items: [
                   {
                       xtype: 'fieldcontainer', layout: 'hbox',
                       items: [
                              { fieldLabel: 'SMR.CD', xtype: 'textfield', labelWidth: 100, width: 200, name: 'smr_cd', readOnly: true },
                              { fieldLabel: Locale.getMsg('차수'), xtype: 'textfield', labelWidth: 50, width: 100, name: 'smr_chasu', readOnly: true }
                       ]
                   },
                   { fieldLabel: Locale.getMsg('샘플품목'), xtype: 'textareafield', name: 'item_nm', labelWidth: 100, width: 390, readOnly: true },
                   { fieldLabel: Locale.getMsg('거래처'), xtype: 'textfield', name: 'cust_nm', labelWidth: 100, width: 390, readOnly: true },
                   { fieldLabel: Locale.getMsg('검토반려담당'), xtype: 'textfield', name: 'login_user_nm', labelWidth: 100, readOnly: true },
                   { fieldLabel: Locale.getMsg('검토반려일자'), xtype: 'datefield', name: 'smr_rvdate', labelWidth: 100, format: 'Y-m-d', readOnly: true },
                   {
                       fieldLabel: Locale.getMsg('검토반려유형'), xtype: 'combobox', labelWidth: 100, name: 'smr_rvtype', allowBlank: false,
                       reference: 'smr_rvtype', publishes: 'value', displayField: 'CODE_NM', valueField: 'CODE_ID',
                       emptyText: Locale.getMsg('선택'), store: { type: 'Tcode' }, minChars: 0, queryMode: 'local', typeAhead: true, readOnly: false
                   },
                   { fieldLabel: Locale.getMsg('검토반려 사유'), xtype: 'textareafield', labelWidth: 100, name: 'smr_rvdescript', allowBlank: false, readOnly: false, width: 390 }
		    ],
		    dockedItems: [{
		        xtype: 'toolbar',
		        dock: 'top',
		        ui: 'footer',
		        defaults: {
		            minWidth: 100
		        },
		        items: [
                    { xtype: 'hiddenfield', name: 'smr_status' },
                    { xtype: 'hiddenfield', name: 'btn_yn', itemId: 'btn_yn', value: 'N' },
                    { xtype: 'hiddenfield', name: 'parentfrm', itemId: 'parentfrm' },
                    { xtype: 'component', flex: 1 },
                    {
                        xtype: 'button', text: Locale.getMsg('저장'), margin: '5 5 5 5', itemId: 'btn1', name: 'btn1', hidden: true,
                        listeners: { click: 'onSubmit' }
                    }
		        ]
		    }]

		}
    ]

});

Ext.define('Ysn.view.common.smr_RepairPop', {
    extend: 'Ext.window.Window',
    xtype: 'common-smr_RepairPop',
    requires: [
        'Ysn.view.common.smr_RepairPopController'
    ],

    controller: 'common-smr_RepairPop',
    title: '샘플재작업 내역',
    reference: 'common-smr_RepairPop',
    id: 'common-smr_RepairPop',
    modal: true,
    width: 425,
    height: 500,
    bodyBorder: false,
    resizable: false,
    layout: 'fit',
    items: [
		{
		    header: false,
		    region: 'center',
		    scrollable: true,
		    //overflow:'scroll',
		    id: 'common-smr_RepairPopDetail',
		    reference: 'common-smr_RepairPopDetail',
		    xtype: 'form',
		    reader: {
		        type: 'json',
		        model: 'Ysn.model.sampleSmrRepairPopup',
		        rootProperty: 'INFO'
		    },
		    layout: 'vbox',
		    items: [
                   {
                       xtype: 'fieldcontainer', layout: 'hbox',
                       items: [
                              { fieldLabel: 'SMR.CD', xtype: 'textfield', labelWidth: 100, width: 200, name: 'smr_cd', readOnly: true },
                              { fieldLabel: Locale.getMsg('차수'), xtype: 'textfield', labelWidth: 50, width: 100, name: 'smr_chasu', readOnly: true }
                       ]
                   },
                   { fieldLabel: Locale.getMsg('샘플품목'), xtype: 'textareafield', name: 'item_nm', labelWidth: 100, width: 390, readOnly: true },
                   { fieldLabel: Locale.getMsg('거래처'), xtype: 'textfield', name: 'cust_nm', labelWidth: 100, width: 390, readOnly: true },
                   { fieldLabel: Locale.getMsg('재작업요청자'), xtype: 'textfield', name: 'login_user_nm', labelWidth: 100, readOnly: true },
                   { fieldLabel: Locale.getMsg('재작업요청일'), xtype: 'datefield', name: 'repair_day', labelWidth: 100, format: 'Y-m-d', readOnly: true },
                   {
                       fieldLabel: Locale.getMsg('재작업유형'), xtype: 'combobox', labelWidth: 100, name: 'smr_crtype', allowBlank: false,
                       reference: 'smr_crtype', publishes: 'value', displayField: 'CODE_NM', valueField: 'CODE_ID',
                       emptyText: Locale.getMsg('선택'), store: { type: 'Tcode' }, minChars: 0, queryMode: 'local', typeAhead: true
                   },
                   { fieldLabel: Locale.getMsg('재작업사유'), xtype: 'textareafield', labelWidth: 100, name: 'smr_crdescript', allowBlank: false, width: 390 }
		    ],
		    dockedItems: [{
		        xtype: 'toolbar',
		        dock: 'top',
		        ui: 'footer',
		        defaults: {
		            minWidth: 100
		        },
		        items: [
                    { xtype: 'hiddenfield', name: 'smp_status' },
                    { xtype: 'hiddenfield', name: 'repair_yn', value: 'N' },
                    { xtype: 'hiddenfield', name: 'parentfrm', itemId: 'parentfrm' },
                    { xtype: 'component', flex: 1 },
                    {
                        xtype: 'button', text: Locale.getMsg('저장'), margin: '5 5 5 5', itemId: 'btn1', name: 'btn1', hidden: true,
                        listeners: { click: 'onSubmit' }
                    }
		        ]
		    }]

		}
    ]

});

Ext.define('Ysn.view.common.smr_dropPop', {
    extend: 'Ext.window.Window',
    xtype: 'common-smr_dropPop',
    requires: [
        'Ysn.view.common.smr_dropPopController'
    ],

    controller: 'common-smr_dropPop',
    title: '샘플 드롭 내역',
    reference: 'common-smr_dropPop',
    id: 'common-smr_dropPop',
    modal: true,
    width: 425,
    height: 450,
    bodyBorder: false,
    resizable: false,
    layout: 'fit',
    items: [
		{
		    header: false,
		    region: 'center',
		    scrollable: true,
		    //overflow:'scroll',
		    id: 'common-smr_dropPopDetail',
		    reference: 'common-smr_dropPopDetail',
		    xtype: 'form',
		    reader: {
		        type: 'json',
		        model: 'Ysn.model.sampleSmrDropPopup',
		        rootProperty: 'INFO'
		    },
		    layout: 'vbox',
		    items: [
                   {
                       xtype: 'fieldcontainer', layout: 'hbox',
                       items: [
                              { fieldLabel: 'SMR.CD', xtype: 'textfield', labelWidth: 80, width: 200, name: 'smr_cd', readOnly: true },
                              { fieldLabel: Locale.getMsg('차수'), xtype: 'textfield', labelWidth: 50, width: 100, name: 'smr_chasu', readOnly: true }
                       ]
                   },
                   { fieldLabel: Locale.getMsg('샘플품목'), xtype: 'textareafield', name: 'item_nm', labelWidth: 80, width: 390, readOnly: true },
                   { fieldLabel: Locale.getMsg('Drop담당'), xtype: 'textfield', name: 'login_user_nm', labelWidth: 80, readOnly: true },
                   { fieldLabel: Locale.getMsg('Drop일자'), xtype: 'datefield', name: 'drop_day', labelWidth: 80, format: 'Y-m-d', readOnly: true },
                   {
                       fieldLabel: Locale.getMsg('Drop유형'), xtype: 'combobox', labelWidth: 80, name: 'smr_drtype', allowBlank: false,
                       reference: 'smr_drtype', publishes: 'value', displayField: 'CODE_NM', valueField: 'CODE_ID',
                       emptyText: Locale.getMsg('선택'), store: { type: 'Tcode' }, minChars: 0, queryMode: 'local', typeAhead: true
                   },
                   { fieldLabel: Locale.getMsg('Drop사유'), xtype: 'textareafield', labelWidth: 80, name: 'smr_drdescript', allowBlank: false, width: 390 }
		    ],
		    dockedItems: [{
		        xtype: 'toolbar',
		        dock: 'top',
		        ui: 'footer',
		        defaults: {
		            minWidth: 100
		        },
		        items: [
                    { xtype: 'hiddenfield', name: 'smp_status' },
                    { xtype: 'hiddenfield', name: 'smr_drop', value: 'N' },
                    { xtype: 'hiddenfield', name: 'parentfrm', itemId: 'parentfrm' },
                    { xtype: 'component', flex: 1 },
                    {
                        xtype: 'button', text: Locale.getMsg('저장'), margin: '5 5 5 5', itemId: 'btn1', name: 'btn1', hidden: true,
                        listeners: { click: 'onSubmit' }
                    }
		        ]
		    }]

		}
    ]

});

Ext.define('Ysn.view.common.multiFileUpload', {
    extend: 'Ext.grid.Panel',
    xtype: 'AttachFileList',
    requires: [
    ],
    store: {
        fields: [
            { name: 'FILE_NO', type: 'string' },
            { name: 'DOC_MGT', type: 'string' },
            { name: 'DOC_TYPE', type: 'string' },
            { name: 'FILE_TYPE', type: 'string' },
            { name: 'FILE_SIZE', type: 'string' },
            { name: 'FILE_NM', type: 'string' },
            { name: 'FILE_PATH', type: 'string' }
        ],

        proxy: {
            method: "POST",
            type: 'ajax',
            url: '/File/selectAttachFile',
            reader: {
                type: 'json',
                rootProperty: ''
            }
        },
        autoLoad: false,
        autoDestroy: true 
    },
    actions: {
        del: {
            iconCls: 'x-fa fa-minus-circle',
            tooltip: 'Delete File',
            handler: function (grid, rowIndex, colIndex) {
       
                Ext.Msg.confirm('File Delete', 'Are You Delete?', function (button) {
                    if (button == 'yes'){
                        var rec = grid.getStore().getAt(rowIndex);
                        if (!rec.get('FILE_NO')) {
                            Ext.Ajax.request({
                                url: '/File/TempFileDelete',
                                method: 'post',
                                params: {file_name:rec.get('FILE_NM')},
                                success: function (response, opts) {
                                    grid.getStore().removeAt(rowIndex);
                                },

                                failure: function (response, opts) {
                                    Ext.Msg.alert('Failed', '오류가 발생했습니다.');
                                }

                            });
                        } else {                             
                            grid.up('form').add({ xtype: 'hiddenfield', name: 'del_file', value: rec.get('FILE_NO') });
                            grid.getStore().removeAt(rowIndex);
                        }
                    }
            });
            }
        }
    },
    hideHeaders: true,
    columnLines: false,
    columns: [
            {
                hidden: false,
                menuDisabled: true,
                sortable: false,
                itemId: 'delbtn',
                xtype: 'actioncolumn',
                width: 20,
                items: ['@del']
            },
            { text: "FILE_NO", dataIndex: 'FILE_NO', hidden: true },
            { text: "FILE_NM", flex: 1, dataIndex: 'FILE_NM', sortable: true },
            { text: "FILE_PATH", dataIndex: 'FILE_PATH', hidden: true }
            
    ],
    scrollable: true,
    syncRowHeight: true,
    viewConfig: {
        stripeRows: false
    },
    listeners: {
        cellclick: function (dataview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
            if (cellIndex == 2){
                var pathsplit = record.data.FILE_PATH.replace('D:\\web\\upfile', '').replace('\\', '/') + "/";
                var link = document.createElement("a");
				document.body.appendChild(link);
                link.download = record.data.FILE_NM;
                link.href = pathsplit + encodeURIComponent(record.data.FILE_NM);
                link.click(); 
            }
        }
    }
});

Ext.define('Ysn.view.common.muiltFileupload', {
    extend: 'Ext.form.Panel',
    xtype: 'muiltFileupload',
    requires: [
         
    ],

    title: '',
    reference: 'muiltFileupload',
    //id: 'muiltFileupload',
    width: 10,
    height: 10,
    bodyBorder: false,
    resizable: false,
 
        bodyPadding: '10 10 10 10',
        style: {
            'margin-bottom': '20px'
        },
        items: [
            {
                xtype: 'filefield',
                reference: 'file_name',
                itemId: 'file_name',
                buttonConfig: {
                    text: '',
                    iconCls: 'x-fa fa-plus'
                },
                //buttonOnly: true,
                name: 'file_name',
                margin: '0 5 0 0',
                listeners: {
                    afterrender: function (object) {
                        //input type="file" 태그 속성중  multiple이라는 속성 추가
                        object.fileInputEl.set({ multiple: 'multiple' });
                    },
                    change: function (object, value, eOpts) {
                         
                        var frm = object.up("form").getForm();
                        var fullPath = frm.findField('file_name').getValue();
                        //var chk_char = '#';   //파일명 앞자리에 들어가지 말아야할 특수문자들
                        if (fullPath) {
                            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
                            var filename = fullPath.substring(startIndex);
                            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                                filename = filename.substring(1);
                            }
                            for (var i = 0; i < filename.length; i++) {
                                if (chk_char.indexOf(filename.charAt(i)) > -1) {
                                    Ext.Msg.alert('Warning', '파일명에 사용불가한 특수문자가 있습니다.</br> 파일명 변경후 업로드하세요.');
                                    frm.findField('file_name').setValue('');
                                    return false;
                                }
                            }
                        }
                         
                        if (frm.isValid()) {
                            frm.submit({
                                url: '/File/TempFileUpload',
                                params: frm.getValues(),
                                success: function (fp, res) {
                                    //json text to json object
                                    var jsonResult = Ext.JSON.decode(res.response.responseText);
                                   // alert(fp.findField('paentFrm').getValue());
                                    //jQuery $.each 와 동일 문법
                                    var i = 0;
                                    Ext.each(jsonResult.file_list, function (object) {
                                        var pl; 
                                        if (fp.findField('paentFrm').getValue() == 'mboardDetail') {
                                            Ext.each(Ext.ComponentQuery.query('panel[reference=board-mboard]'), function (obj) {
                                                if (obj.itemId == Ysn.Global.activeMenu) {
                                                    pl = obj.lookupReference('mboardDetail');
                                                }
                                            }); 
                                        } else {
                                            pl = Ext.getCmp(fp.findField('paentFrm').getValue());
                                        }
                                        pl.down(fp.findField('childFrm').getValue()).down('#AttachFileList').getStore().add({
                                            DOC_MGT: fp.findField('doc_mgt').getValue(),
                                            FILE_NM: object.file_name,
                                            FILE_PATH: 'D:\\web\\upfile\\temp\\' + loginUser + '\\'
                                        });   //{xtype: 'textfield', name: 'pump_code', fieldStyle: 'background:#f6f6f6',itemId: 'pump_code'+i }
                                        pl.add({ xtype: 'hiddenfield', name: 'file_name', value: object.file_name });
                                        pl.add({ xtype: 'hiddenfield', name: 'file_mode', value: 'I' });
                                        pl.add({ xtype: 'hiddenfield', name: 'doc_mgt', value: fp.findField('doc_mgt').getValue() });
                                       
                                        i = i + 1;
                                        // msg += object.filename + "(" + object.filesize + " byte)" + ",";
                                    });
                                     
                                    //한번 submit 처리가 되면 filefield는 초기화 되므로
                                    //다시 filefield에 multiple 속성 설정
                                    object.fileInputEl.set({ multiple: 'multiple' });
                                }
                            });
                        }
                    }
                }
            },
            {
                xtype: 'hiddenfield',
                reference: 'paentFrm',
                name: 'paentFrm',
                itemId: 'paentFrm'
            } ,
            {
                xtype: 'hiddenfield',
                reference: 'childFrm',
                name: 'childFrm',
                itemId: 'childFrm'
            },
            {
                xtype: 'hiddenfield',
                reference: 'doc_mgt',
                name: 'doc_mgt',
                itemId: 'doc_mgt'
            }

    ]

});

Ext.define('Ysn.view.common.muiltFileBox', {
    extend: 'Ext.form.FieldContainer',
    xtype: 'muiltFileBox',
    requires: [

    ], 
    combineErrors: true,
    reference: 'muiltFileBox',
    layout: 'column',
    defaults: {
        //flex: 1,
        hideLabel: true
    },
    items: [
        {
            xtype: 'AttachFileList',
            reference: 'AttachFileList',
            itemId: 'AttachFileList',
            width: 500,
            margin: '0 5 0 0'
        },{
            xtype: 'hiddenfield',
            reference: 'paentFrm',
            name: 'paentFrm',
            itemId: 'paentFrm'
        }, {
            xtype: 'hiddenfield',
            reference: 'childFrm',
            name: 'childFrm',
            itemId: 'childFrm'
        }, {
            iconCls: 'x-fa fa-plus',
            xtype: 'button',
            itemId: 'AttachBtn',
            scale: 'small',
            listeners: {
                click: function (el, e, eOpts) {
                    if (el.up('fieldcontainer').down('#paentFrm').getValue() == 'board-mboard') {
                        Ext.each(Ext.ComponentQuery.query('panel[reference=board-mboard]'), function (obj) {
                            if (obj.itemId == Ysn.Global.activeMenu) {
                                obj.down(el.up('fieldcontainer').down('#childFrm').getValue()).down('#file_name').fileInputEl.dom.click();   //fireEvent('click'
                            }
                        }); 
                        } else {
                        Ext.getCmp(el.up('fieldcontainer').down('#paentFrm').getValue()).down(el.up('fieldcontainer').down('#childFrm').getValue()).down('#file_name').fileInputEl.dom.click();   //fireEvent('click'
                    }
                }
            }
        }
    ]
});

Ext.define('Ysn.view.common.Prod_itemList', {
    extend: 'Ext.form.FieldContainer',
    xtype: 'Prod_itemList',
    requires: [

    ],
    combineErrors: false,
    layout: 'column', 
    defaults: {
        //flex: 1,
        hideLabel: true
    },
    items: [
        {
            reference: 'itemList',
            xtype: 'grid',
            frameBorder:1,
            store: {
                type: 'inquiryItemList'
                /*fields: [
                    { name: 'INQ_CD', type: 'string'},
                    { name: 'SEQ_NO', type: 'string'},
                    { name: 'INQ_ITEM_NM', type: 'string' } 
                ], 
                proxy: {
                    method: "POST",
                    type: 'ajax',
                    url: '/ProductInquiry/inquiryItemList',	
                    reader: {
                        type: 'json',
                        rootProperty: ''
                    }
               }*/
            },
            plugins: {
                ptype: 'cellediting',
                clicksToEdit: 1,
                listeners: {
                    //edit: 'cellEdit'
                }
            },
           selModel: 'cellmodel',
           actions: {
                del: {
                    iconCls: 'x-fa fa-minus-circle',
                    tooltip: 'Delete File',
                    handler: function (grid, rowIndex, colIndex) {

                        Ext.Msg.confirm('item Delete', 'Are You Delete?', function (button) {
                            if (button == 'yes') grid.getStore().removeAt(rowIndex);   
                        }); 
                    }  
                }
           }, 
            //hideHeaders: true, 
            columnLines: true,
            columns: [
                    {
                        hidden: false,
                        menuDisabled: true,
                        sortable: false,
                        itemId: 'delbtn',
                        xtype: 'actioncolumn',
                        width: 20,
                        items: ['@del']
                    },
                    {
                        text: Locale.getMsg('구분'), width:100, dataIndex: 'INQ_ITEM_GB', 
                        editor: {
                            xtype: 'combo', displayField: 'CODE_NM', valueField: 'CODE_NM', 
                            store: { type: 'InqItem' }, minChars: 0, queryMode: 'true', typeAhead: true
                        }
                    },
                    {
                        text: Locale.getMsg('제품명'), flex: 1, dataIndex: 'INQ_ITEM_NM', editor: 'textfield'
                    }

            ],
            //scrollable: true,
            width: 600,
            //height:100,
            syncRowHeight: true,
            viewConfig: {
                stripeRows: false
            }, 
            margin: '0 5 0 0'
        },  {
            iconCls: 'x-fa fa-plus',
            xtype: 'button',
            reference: 'addBtn',
            itemId: 'addBtn',
            scale: 'small',
            margin: '0 0 0 5',
            listeners: {
                click: function (el, e, eOpts) {
                    el.up('panel').lookupReference('itemList').getStore().insert(0, { INQ_ITEM_GB: '', INQ_ITEM_NM:''});
                    el.up('panel').lookupReference('itemList').findPlugin('cellediting').startEditByPosition({ row: 0,  column: 1 });
                }
            }
        }
    ]
});

Ext.define('Ysn.view.common.itemInsert', {
    extend: 'Ext.window.Window',
    xtype: 'common-itemInsert',
    requires: [
        'Ysn.view.common.itemInsertController'
    ],

    controller: 'common-itemInsert',
    title: '샘플품목 등록',
    reference: 'common-itemInsert',
    id: 'common-itemInsert',
    modal: true,
    width: 425,
    height: 250,
    bodyBorder: false,
    resizable: false,
    layout: 'fit',
    items: [
		{
		    header: false,
		    region: 'center',
		    scrollable: true,
		    //overflow:'scroll',
		    id: 'common-itemInsertDetail',
		    reference: 'common-itemInsertDetail',
		    xtype: 'form', 
		    layout: 'vbox',
		    items: [
                   { fieldLabel: '*' + Locale.getMsg('품목명'), xtype: 'textareafield', itemId:'item_nm', name: 'item_nm', labelWidth: 80, width: 390, allowBlank: false },
                   {
                       fieldLabel: Locale.getMsg('품목유형'), xtype: 'combobox', labelWidth: 80, name: 'item_type', allowBlank: false,
                       reference: 'item_type', publishes: 'value', displayField: 'CODE_NM', valueField: 'CODE_ID',
                       emptyText: Locale.getMsg('선택'), store: { type: 'Tcode' }, minChars: 0, queryMode: 'local', typeAhead: true 
                   } 
		    ],
		    dockedItems: [{
		        xtype: 'toolbar',
		        dock: 'top',
		        ui: 'footer',
		        defaults: {
		            minWidth: 100
		        },
		        items: [
                    ,{
                        xtype: 'hiddenfield',
                        reference: 'paentFrm',
                        name: 'paentFrm',
                        itemId: 'paentFrm'
                    },
                    { xtype: 'component', flex: 1 },
                    {
                        xtype: 'button', text: Locale.getMsg('저장'), margin: '5 5 5 5', itemId: 'btn1', name: 'btn1',  
                        listeners: { click: 'onSubmit' }
                    }
		        ]
		    }]

		}
    ]

});

Ext.define('Ysn.view.common.findDept', {
    extend: 'Ext.window.Window',
    xtype: 'common-findDept',
    requires: [
        'Ysn.view.common.findDeptController'
    ],

    controller: 'common-findDept',
    title: '조직찾기',
    reference: 'common-findDept',
    id: 'common-findDept',
    modal: true,
    width: 425,
    height: 250,
    bodyBorder: false,
    resizable: false,
    layout: 'fit',
    items: [
		{
		    header: false,
		    region: 'center',
		    scrollable: true,
		    //overflow:'scroll',
		    id: 'common-findDeptDetail',
		    reference: 'common-findDeptDetail',
		    xtype: 'form',
		    layout: 'vbox',
		    items: [
                   {
                       fieldLabel: Locale.getMsg('최상위부서'), labelWidth: 100, width: 400,
                       xtype: 'combobox',
                       reference: 'selPart1',
                       itemId: 'selPart1',
                       name: 'selPart1',
                       publishes: 'value',
                       displayField: 'DEPT_NM',
                       valueField: 'DEPT_CD',
                       margin: '0 5 0 0',
                       store: {
                           type: 'selPart1',
                           autoLoad: true
                       },
                       minChars: 0,
                       //width: 120,
                       queryMode: 'local',
                       listeners: {
                           change: 'onselPart1'
                       }
                   }, {
                       fieldLabel: Locale.getMsg('상위부서'), labelWidth: 100, width:400,
                       xtype: 'combobox',
                       reference: 'selPart2',
                       itemId: 'selPart2',
                       name: 'selPart2',
                       publishes: 'value',
                       displayField: 'DEPT_NM',
                       valueField: 'DEPT_CD',
                       margin: '0 5 0 0',
                       store: {
                           type: 'selPart2',
                           autoLoad: true
                       },
                       minChars: 0,
                       //width: 120,
                       queryMode: 'local',
                       listeners: {
                           change: 'onselPart2'
                       }
                   }, {
                       fieldLabel: Locale.getMsg('하위부서'), labelWidth: 100, width: 400,
                       xtype: 'combobox',
                       reference: 'selPart3',
                       itemId: 'selPart3',
                       name: 'selPart3',
                       publishes: 'value',
                       displayField: 'DEPT_NM',
                       valueField: 'DEPT_CD',
                       margin: '0 5 0 0',
                       store: {
                           type: 'selPart3',
                           autoLoad: true
                       },
                       minChars: 0,
                       //width: 120,
                       queryMode: 'local',
                       listeners: {
                           change: 'onselPart3'
                       }
                   }
		    ],
		    dockedItems: [{
		        xtype: 'toolbar',
		        dock: 'top',
		        ui: 'footer',
		        defaults: {
		            minWidth: 100
		        },
		        items: [
                    , {
                        xtype: 'hiddenfield',
                        reference: 'paentFrm',
                        name: 'paentFrm',
                        itemId: 'paentFrm'
                    }, {
                        xtype: 'hiddenfield',
                        reference: 'dept_cd',
                        name: 'dept_cd',
                        itemId: 'dept_cd'
                    }, {
                        xtype: 'hiddenfield',
                        reference: 'dept_nm',
                        name: 'dept_nm',
                        itemId: 'dept_nm'
                    }, {
                        xtype: 'hiddenfield',
                        reference: 'selCompany',
                        name: 'selCompany',
                        itemId: 'selCompany',
                        listeners: { change: 'onselCompany' }
                    },
                    { xtype: 'component', flex: 1 },
                    {
                        xtype: 'button', text: Locale.getMsg('등록'), margin: '5 5 5 5', itemId: 'btn1', name: 'btn1',
                        listeners: { click: 'onSubmit' }
                    }
		        ]
		    }]

		}
    ]

});

Ext.define('Ysn.view.common.mailForm', {
    extend: 'Ext.window.Window',
    xtype: 'common-mailForm',
    requires: [ 
    ],

    controller: 'common-mailForm',
    title: 'SEND MAIL',
    reference: 'common-mailForm',
    id: 'common-mailForm',
    modal: true,
    width: 800,
    height: 600,
    bodyBorder: false,
    resizable: false,
    layout: 'fit',
    items: [
		{
		    header: false,
		    region: 'center',
		    scrollable: true,
		    //overflow:'scroll',
		    id: 'common-htmlEditor',
		    reference: 'common-htmlEditor',
		    xtype: 'form',
		    layout: 'vbox',
		    items: [
                    { 
                        xtype: 'fieldcontainer',
                        fieldLabel: '수신자',
                        labelAlign: 'right',
                        combineErrors: true,
                        msgTarget : 'side',
                        layout: 'hbox',
                        labelWidth: 60,
                        margin: '5 0 5 0',
                        defaults: {
                            //flex: 1,
                            hideLabel: true
                        },
                        items: [{
                            xtype: 'textareafield',
                            name: 'toEmailNm',
                            reference: 'toEmailNm',
                            itemId: 'toEmailNm',
                            margin: '0 5 0 0',
                            readOnly: false,
                            allowBlank: false,
                            width: 620
                        }, {
                            xtype: 'hiddenfield',
                            name: 'toEmail',
                            reference: 'toEmail',
                            itemId: 'toEmail',
                            margin: '0 5 0 0',
                            width: 620
                        }, {
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
                   {
                       fieldLabel: Locale.getMsg('제목'), labelWidth: 60, width: 760,
                       labelAlign: 'right',
                       xtype: 'textfield',
                       name: 'mailTitle',
                       reference: 'mailTitle',
                       itemId: 'mailTitle',
                       allowBlank: false
                   }, {
                       fieldLabel: Locale.getMsg('본문'), labelWidth: 60, width: 760, height: 400 ,
                       labelAlign: 'right',
                       xtype: 'htmleditor',
                       reference: 'mailBody',
                       itemId: 'mailBody',
                       name: 'mailBody',
                       allowBlank: false,
                       enableColors: false,
                       enableAlignments: false,
                       enableFont: false,
                       enableSourceEdit: false

                   } 
		    ],
		    dockedItems: [{
		        xtype: 'toolbar',
		        dock: 'top',
		        ui: 'footer',
		        defaults: {
		            minWidth: 100
		        },
		        items: [
                    {
                        xtype: 'hiddenfield',
                        reference: 'paentFrm',
                        name: 'paentFrm',
                        itemId: 'paentFrm'
                    }, {
                        xtype: 'hiddenfield',
                        reference: 'fromEmail',
                        name: 'fromEmail',
                        itemId: 'fromEmail',
                        value: 'Ysn@yonwookorea.com'
                    }, /*{
                        xtype: 'hiddenfield',
                        reference: 'mailBody',
                        name: 'mailBody',
                        itemId: 'mailBody'
                    },*/
                    { xtype: 'component', flex: 1 },
                    {
                        xtype: 'button', text: Locale.getMsg('PRINT'), margin: '5 5 5 5', itemId: 'btn1', name: 'btn1',
                        listeners: { click: 'onPrint' }
                    },
                    {
                        xtype: 'button', text: Locale.getMsg('SEND'), margin: '5 5 5 5', itemId: 'btn2', name: 'btn2',
                        listeners: { click: 'onSEND' }
                    }
		        ]
		    }]

		}
    ]

});

Ext.define('Ysn.view.common.searchMailUser', {
    extend: 'Ext.window.Window',
    xtype: 'common-searchMailUser',
    requires: [
        'Ysn.view.common.searchMailUserController',
		'Ext.grid.filters.Filters'
    ],

    controller: 'common-searchMailUser',
    title: Locale.getMsg('수신자 찾기'),
    reference: 'commonsearchMailUser',
    id: 'common-searchMailUser',
    modal: true,
    width: 800,
    height: 600,
    bodyBorder: false,
    resizable: false,
    layout: 'fit',
    dockedItems: [
	               {
	                   title: '',
	                   layout: {
	                       type: 'table',
	                       columns: 3,
	                       tableAttrs: {
	                           style: {
	                               //width: '100%'
	                           }
	                       }
	                   },
	                   defaults: {
	                       layout: 'form',
	                       xtype: 'container',
	                       defaultType: 'textfield',
	                       margin: '5 5 5 0'
	                   },
	                   items: [
                          {
                              xtype: 'fieldcontainer',
                              fieldLabel: Locale.getMsg('조직명'),
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
                                  reference: 'selPart1',
                                  itemId: 'selPart1',
                                  name: 'selPart1',
                                  publishes: 'value',
                                  displayField: 'DEPT_NM',
                                  valueField: 'DEPT_CD',
                                  margin: '0 5 0 0',
                                  store: {
                                      type: 'selPart1',
                                      autoLoad: true
                                  },
                                  minChars: 0,
                                  //width: 120,
                                  queryMode: 'local',
                                  listeners: {
                                      change: 'onselPart1'
                                  }
                              }, {
                                  xtype: 'combobox',
                                  reference: 'selPart2',
                                  itemId: 'selPart2',
                                  name: 'selPart2',
                                  publishes: 'value',
                                  displayField: 'DEPT_NM',
                                  valueField: 'DEPT_CD',
                                  margin: '0 5 0 0',
                                  store: {
                                      type: 'selPart2',
                                      autoLoad: true
                                  },
                                  minChars: 0,
                                  //width: 120,
                                  queryMode: 'local',
                                  listeners: {
                                      change: 'onselPart2'
                                  }
                              }, {
                                  xtype: 'combobox',
                                  reference: 'selPart3',
                                  itemId: 'selPart3',
                                  name: 'selPart3',
                                  publishes: 'value',
                                  displayField: 'DEPT_NM',
                                  valueField: 'DEPT_CD',
                                  margin: '0 5 0 0',
                                  store: {
                                      type: 'selPart3',
                                      autoLoad: true
                                  },
                                  minChars: 0,
                                  //width: 120,
                                  queryMode: 'local'
                              }]
                          },
                           {
                               rowspan: 2,
                               xtype: 'button',
                               text: Locale.getMsg('검색'),
                               width: 60,
                               height: 60,
                               handler: 'chkSearch'
                           }, {
                               rowspan: 2,
                               xtype: 'button',
                               text: Locale.getMsg('등록'),
                               width: 60,
                               height: 60,
                               handler: 'addShareUser'
                           },
                   {
                       xtype: 'textfield',
                       labelAlign: 'right',
                       fieldLabel: Locale.getMsg('이름'),
                       labelWidth: 100,
                       name: 'user_nm',
                       reference: 'user_nm',
                       itemId: 'user_nm'
                   }, {
                       xtype: 'hiddenfield',
                       reference: 'paentFrm',
                       itemId: 'paentFrm'
                   }, {
                       xtype: 'hiddenfield',
                       reference: 'emailUsers',
                       itemId: 'emailUsers' 
                   }
	                   ],
	                   dock: 'top',
	                   height: 90
	               }
    ],

    items: [
		{
		    header: false,
		    region: 'center',
		    //scrollable: true,
		    overflow: 'scroll',
		    layout: 'column', 
		    defaults: {
		        //bodyPadding: 15,
		        height: 462
		    },
		    items: [
                  {
                      xtype: 'grid',
                      reference: 'searchGrid',
                      dockedItems: [{
                          xtype: 'toolbar',
                          dock: 'top',
                          //ui: 'footer',
                          //height:50,
                          defaults: {
                              minWidth: 100 
                          },
                          items: [ 
                              {
                                  xtype: 'button', text: Locale.getMsg('전체선택'), itemId: 'btn1',  
                                  listeners: { click: 'onSelectAll' }
                              }
                          ]
                      }],
                      store: {
                          fields: [
                              { name: 'COMPANY_CD', type: 'string', hidden:true},
                              { name: 'USER_CD', type: 'string' },
                              { name: 'USER_NM', type: 'string' },
                              { name: 'DEPT_NM', type: 'string' },
                              { name: 'USER_TITLE', type: 'string' },
                              { name: 'USER_POSIT', type: 'string' },
                              { name: 'EMAIL', type: 'string' }
                          ],
                          proxy: {
                              method: "POST",
                              type: 'ajax',
                              url: '/AdminDept/popupMgrList',
                              reader: {
                                  type: 'json',
                                  rootProperty: 'LIST'
                              }
                          },
                          listeners: {
                              load: function (store, records, successful, operation) {
                                  if (!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
                              }
                          },
                          autoLoad: false,
                          autoDestroy: true
                      },
                      style: { 'borderTop': '1px solid gray', 'borderRight': '4px solid gray' }, 
                      columnLines: true,
                      plugins: 'gridfilters',
                      columns: [
                                 {
                                     text: Locale.getMsg('이름'), width: 150, dataIndex: 'USER_NM', sortable: true,
                                     filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') } }
                                 },
                                 {
                                     text: Locale.getMsg('부서명'), width: 150, dataIndex: 'DEPT_NM', sortable: true,
                                     filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') } }
                                 },
                                 {
                                     text: Locale.getMsg('직책'), width: 60, dataIndex: 'USER_TITLE', sortable: true,
                                     filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') } }
                                 },
                                 {
                                     text: Locale.getMsg('직위'), width: 60, dataIndex: 'USER_POSIT', sortable: true,
                                     filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') } }
                                 },
                                 {
                                     text: "MAIL", width: 200, dataIndex: 'EMAIL', sortable: true,
                                     filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') } }
                                 },
                                 { text: Locale.getMsg('사번'), dataIndex: 'USER_CD', width: 100, hidden: true },
                                 { text: Locale.getMsg('부서코드'), dataIndex: 'DEPT_CD', width: 100, hidden: true }
                      ],
                      scrollable: true,
                     // height: 200,
                      //width: 800,
                      columnWidth: 0.5,
                      syncRowHeight: false,
                      viewConfig: {
                          stripeRows: true
                      },
                      listeners: {
                          select: 'onSelect'
                      }
                  },
                  {
                      xtype: 'grid',
                      reference: 'searchGrid2',
                      scrollable: true,
                      overflow: 'scroll',
                      dockedItems: [{
                          xtype: 'toolbar',
                          dock: 'top',
                          //ui: 'footer',
                          //height:50,
                          defaults: {
                              minWidth: 100
                          },
                          items: [
                              {
                                  xtype: 'button', text: Locale.getMsg('전체취소'), itemId: 'btn2',
                                  listeners: { click: 'onCancelAll' }
                              }
                          ]
                      }],
                      store: {
                          fields: [
                              { name: 'COMPANY_CD', type: 'string', hidden: true },
                              { name: 'USER_CD', type: 'string' },
                              { name: 'USER_NM', type: 'string' },
                              { name: 'DEPT_NM', type: 'string' },
                              { name: 'USER_TITLE', type: 'string' },
                              { name: 'USER_POSIT', type: 'string' },
                              { name: 'EMAIL', type: 'string' }
                          ],

                          proxy: {
                              method: "POST",
                              type: 'memory',
                              reader: {
                                  type: 'json',
                                  rootProperty: ''
                              }
                          },
                          listeners: {
                              load: function (store, records, successful, operation) {
                                  if (!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
                              }
                          },
                          autoLoad: false,
                          autoDestroy: true
                      },
                      style: { 'borderTop': '1px solid gray' },
                      columnLines: true,
                      plugins: 'gridfilters',
                      columns: [
                              {
                                  text: Locale.getMsg('이름'), width: 150, dataIndex: 'USER_NM', sortable: true,
                                  filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') } }
                              },
                                 {
                                     text: Locale.getMsg('부서명'), width: 150, dataIndex: 'DEPT_NM', sortable: true,
                                     filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') } }
                                 },
                                 {
                                     text: Locale.getMsg('직책'), width: 60, dataIndex: 'USER_TITLE', sortable: true,
                                     filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') } }
                                 },
                                 {
                                     text: Locale.getMsg('직위'), width: 60, dataIndex: 'USER_POSIT', sortable: true,
                                     filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') } }
                                 },
                                 {
                                     text: "MAIL", width: 200, dataIndex: 'EMAIL', sortable: true,
                                     filter: { type: 'string', itemDefaults: { emptyText: Locale.getMsg('검색어입력..') } }
                                 },
                                 { text: Locale.getMsg('사번'), dataIndex: 'USER_CD', width: 100, hidden: true },
                                 { text: Locale.getMsg('부서코드'), dataIndex: 'DEPT_CD', width: 100, hidden: true }
                      ],
                      //width: 800,
                      //height: 300,
                      columnWidth: 0.5,
                      syncRowHeight: false,
                      viewConfig: {

                      },
                      listeners: {
                          select: 'onSelect2'
                      }
                  }
		    ]

		}
    ]

});



Ext.define('Ysn.view.common.mainPopup', {
    extend: 'Ext.window.Window',
    xtype: 'common-mainPopup',
    requires: [
         
    ],
    controller: 'common-mainPopup',
    title: '공지사항',
    reference: 'mainPopup',
    id: 'mainPopup',
    title: '공지사항',
    layout: 'accordion',
    autoShow: true,
    //hidden: true,
    alwaysOnTop: true,
    layoutOnTabChange: true,
    alignOnScroll: true,
    bodyBorder: false,
    width: 600,
    height: 500,
    defaults: {
        bodyPadding: 10
    },
    items: [
        {
            xtype: 'grid',
            title: '장기 미수채권 업체',
            reference: 'mainUserBadCustList',
            store: {
                type: 'mainUserBadCustList',
                autoLoad: true,
                autoDestroy: true
            },
            // style: { 'borderTop': '1px solid gray' },

            loadMask: true,
            enableLocking: true,
            columnLines: true,
            multiColumnSort: true,
            syncRowHeight: false,
            viewConfig: {
                stripeRows: true
            },
            columns: [
                { text: Locale.getMsg('코드'), width: 80, dataIndex: 'CUST_CD', sortable: true },
                { text: Locale.getMsg('거래처'), flex: 1, dataIndex: 'CUST_NM', sortable: true }
            ]
        }, {
            xtype: 'grid',
            title: '제품문의 사후관리',
            reference: 'mainUserBadInqList',
            store: {
                type: 'mainUserBadInqList',
                autoLoad: false,
                autoDestroy: true
            },
            //style: { 'borderTop': '1px solid gray' },

            loadMask: true,
            enableLocking: true,
            columnLines: true,
            multiColumnSort: true,
            syncRowHeight: false,
            viewConfig: {
                stripeRows: true
            },
            columns: [
                { text: Locale.getMsg('전달/회신일'), width: 125, dataIndex: 'INQ_SDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
                { text: Locale.getMsg('접수담당자'), flex: 1, dataIndex: 'INQ_RUSER_NM', sortable: true },
                { text: Locale.getMsg('문의유형'), width: 125, dataIndex: 'INQ_TYPE_NM', sortable: true },
                { text: Locale.getMsg('진행사항'), width: 125, dataIndex: 'INQ_STATUS_NM', sortable: true }

            ],
            listeners: {
                expand: function () {
                    //alert();
                    this.getStore().load();
                }
            }
        }, {
            xtype: 'grid',
            title: '샘플요청관리',
            reference: 'mainSmrRequestList',
            store: {
                type: 'mainSmrRequestList',
                autoLoad: false,
                autoDestroy: true
            },
            //style: { 'borderTop': '1px solid gray' },

            loadMask: true,
            enableLocking: true,
            columnLines: true,
            multiColumnSort: true,
            syncRowHeight: false,
            viewConfig: {
                stripeRows: true
            },
            columns: [
                { text: Locale.getMsg('요청번호'), width: 125, dataIndex: 'SMR_CD', sortable: true },
                { text: Locale.getMsg('차수'), width: 125, dataIndex: 'SMR_CHASU', sortable: true },
                { text: Locale.getMsg('고객사'), flex: 1, dataIndex: 'EUSER_NM', sortable: true },
                { text: Locale.getMsg('접수일'), width: 125, dataIndex: 'SMR_RQDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true }

            ],
            listeners: {
                expand: function () {
                    //alert();
                    this.getStore().load();
                }
            }
        }

    ] 

});
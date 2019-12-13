
Ext.define('Ysn.view.common.tabKeyman',{
    extend: 'Ext.grid.Panel',
    xtype: 'common-tabKeyman',
    requires: [ 
		'Ext.grid.filters.Filters'
    ], 
	reference: 'common-tabKeyman', 
	//id: 'common-tabKeyman', 
	store: {
        fields: [
					{name: 'KM_CD', type: 'string'},
					{name: 'KM_NM', type: 'string'},
					{name: 'KM_USER_CD', type: 'string'},
					{name: 'KM_USER_NM', type: 'string'},
					{name: 'KM_DEPT_NM', type: 'string'},
					{name: 'CUST_CD', type: 'string'},
					{name: 'CUST_NM', type: 'string'},
					{name: 'KM_EMAIL', type: 'string'},
					{name: 'M_PHONE', type: 'string'},
					{name: 'USE_YN', type: 'string'},
					{name: 'KM_TITLE', type: 'string'}
				],

				proxy: {
					method: "POST",
					type: 'ajax',
					url: '/Customer/sectCustKeymanList',									
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
	enableLocking: true,
    columnLines: true,
	multiColumnSort: true, 
	plugins: 'gridfilters',
	columns: [
            {text: Locale.getMsg('고객담당'), width: 125, dataIndex: 'KM_NM', sortable: true, 
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
            {text: Locale.getMsg('거래처'),  width: 250, dataIndex: 'CUST_NM', sortable: true,   
			 filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
            {text: Locale.getMsg('부서'), width: 125, dataIndex: 'KM_DEPT_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
            {text: Locale.getMsg('직급'), width: 125, dataIndex: 'KM_TITLE', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: "Mobile", width: 125, dataIndex: 'KM_EMAIL', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: "E-Mail", width: 125, dataIndex: 'KM_EMAIL', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			}, 
		    {text: Locale.getMsg('등록자'), width: 125, dataIndex: 'KM_USER_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
            {text: Locale.getMsg('활동여부'), width: 125, dataIndex: 'USE_YN', sortable: true, 
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

Ext.define('Ysn.view.common.tabPlaylist',{
    extend: 'Ext.grid.Panel',
    xtype: 'common-tabPlaylist',
    requires: [ 	
		'Ext.grid.filters.Filters'
    ],   
	reference: 'common-tabPlaylist', 
	//id: 'common-tabPlaylist', 
	store: {
        fields: [
					{name: 'SA_CD', type: 'string'},
			        {name: 'SA_SDATE', type: 'date', dateFormat:'Ymd'},
					{name: 'KM_NM', type: 'string'},
					{name: 'USER_CD', type: 'string'},
					{name: 'USER_NM', type: 'string'},
					{name: 'KM_DEPT_NM', type: 'string'},
					{name: 'SA_TARGET', type: 'string'},
					{name: 'SA_BODY', type: 'string'}, 
					{name: 'SA_COMMENT', type: 'string'},
		            {name: 'DEPT_CD', type: 'string'} 
				],

				proxy: {
					method: "POST",
					type: 'ajax',
					url: '/Customer/selectCustPlayList',									
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
	enableLocking: true,
    columnLines: true,
	multiColumnSort: true, 
	plugins: 'gridfilters',
	columns: [
            {text: Locale.getMsg('활동일자'), width: 125, dataIndex: 'SA_SDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true, filter: true }, 
            {text: Locale.getMsg('고객(Keyman)'),  width: 125, dataIndex: 'KM_NM', sortable: true,   
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
            {text: Locale.getMsg('주요활동'), flex:1, dataIndex: 'SA_TARGET', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: Locale.getMsg('활동결과'), flex:2, dataIndex: 'SA_BODY', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: Locale.getMsg('관리자코멘트'), flex:3, dataIndex: 'SA_COMMENT', sortable: true,  
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
 

 Ext.define('Ysn.view.common.tabProject',{
    extend: 'Ext.grid.Panel',
    xtype: 'common-tabProject',
    requires: [   		
		'Ext.grid.filters.Filters'
    ], 
	reference: 'common-tabProject', 
	//id: 'common-tabProject', 
	store: {
        fields: [
					{name: 'PJT_CD', type: 'string'},
			        {name: 'PJT_DATE', type: 'string'},
					{name: 'PJT_NM', type: 'string'},
					{name: 'CUST_CD', type: 'string'},
					{name: 'CUST_NM', type: 'string'},
					{name: 'USER_CD', type: 'string'},
					{name: 'USER_NM', type: 'string'},
					{name: 'DEPT_CD', type: 'string'}, 
					{name: 'DEPT_NM', type: 'string'},
		            {name: 'DSTR_TYPE', type: 'string'}, 
			        {name: 'EUSR_CD', type: 'string'},
                    {name: 'EUSR_NM', type: 'string'},
			        {name: 'END_YN', type: 'string'}
				],

				proxy: {
					method: "POST",
					type: 'ajax',
					url: '/Customer/selectCustProjectList',									
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
	enableLocking: true,
    columnLines: true,
	multiColumnSort: true, 
	plugins: 'gridfilters',
	columns: [              
            {text: Locale.getMsg('프로젝트명'),  width: 125, dataIndex: 'PJT_NM', sortable: true,   
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
            {text: Locale.getMsg('End User'), width: 125, dataIndex: 'EUSR_NM', sortable: true,  
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
			{text: Locale.getMsg('유통구조'), width: 125, dataIndex: 'DSTR_TYPE', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: Locale.getMsg('계약기간'), width: 200, dataIndex: 'PJT_DATE', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: Locale.getMsg('종료여부'), flex:3, dataIndex: 'END_YN', sortable: true,  
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

 Ext.define('Ysn.view.common.tabEmail',{
    extend: 'Ext.grid.Panel',
    xtype: 'common-tabEmail',
    requires: [   		
		'Ext.grid.filters.Filters'
    ],  
	reference: 'common-tabEmail', 
	//id: 'common-tabEmail', 
	store: {
        fields: [
					{name: 'COMPANY_CD', type: 'string'},
			        {name: 'EMAIL_CD', type: 'string'},
					{name: 'EMAIL_DT', type: 'string'},
					{name: 'EMAIL_TYPE', type: 'string'},
					{name: 'EMAIL_TYPE_NM', type: 'string'},
					{name: 'USER_CD', type: 'string'},
					{name: 'USER_NM', type: 'string'},
					{name: 'KM_CD', type: 'string'}, 
					{name: 'KM_NM', type: 'string'},
		            {name: 'SUBJECT', type: 'string'} 
				],

				proxy: {
					method: "POST",
					type: 'ajax',
					url: '/Customer/selectCustEmailList',									
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
	enableLocking: true,
    columnLines: true,
	multiColumnSort: true, 
	plugins: 'gridfilters',
	columns: [              
            {text: Locale.getMsg('송수신일자'),  width: 125, dataIndex: 'EMAIL_DT', sortable: true,   
			 filter: {
				type: 'string',
				itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
		     }
			},
            {text: Locale.getMsg('송수신구분'), width: 125, dataIndex: 'EMAIL_TYPE_NM', sortable: true,  
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
			{text: Locale.getMsg('고객(Keyman)'), width: 125, dataIndex: 'KM_NM', sortable: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: Locale.getMsg('검색어입력..')
				}
             }
			},
			{text: Locale.getMsg('메일제목'), flex:1, dataIndex: 'SUBJECT', sortable: true,  
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
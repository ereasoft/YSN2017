Ext.define('Ysn.view.main.mainViewsearch',{
    extend: 'Ext.panel.Panel',
	xtype: 'mainView-search',

    requires: [
        'Ysn.view.main.mainViewsearchController', 
	    'Ysn.store.*'
    ],

    controller: 'mainView-search', 

    frame: false,
    //resizable: true,
    width: 500,
    minWidth: 700,
    minHeight: 55,
    frameBorder:10,
    layout: {
        type: 'table', 
        tableAttrs: {
            style: {
                //width: '100%'
            }
        }
		
    },
    id: 'mainView-search',
    defaults: {
        layout: 'form',
        xtype: 'container',
        defaultType: 'textfield' 
    },

    items: [{
        items: [
				  {
					xtype: 'fieldcontainer',
					fieldLabel: Locale.getMsg('매출조직'),
					labelAlign: 'right',
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
												var bizCd = Ext.getCmp('mainView-search').down('#bizGroup');
												if(store.data.items.length < 2){
													Ext.getCmp('mainView-search').down('#user_cd').store.load({params:{dept_cd:bizCd.getValue(),up_dept_cd:''}});
												}else{
													Ext.getCmp('mainView-search').down('#user_cd').store.load({params:{dept_cd:'',up_dept_cd:bizCd.getValue()}});
												}
									   }}
						},
						minChars: 0,
						width: 150,
						maskOnDisable: true,
						queryMode: 'local', 
						listeners: {
							change : 'onChangeDept' 
						}
					}]
				  }
				  
        ]
    },{
        items: [
				  {
					xtype: 'combobox',
					reference: 'userGroup',
					publishes: 'value',
					fieldLabel: Locale.getMsg('영업담당'),
					labelAlign: 'right',
					displayField: 'USER_NM',
					valueField: 'USER_CD',
					name: 'user_cd',
					itemId : 'user_cd',
					maskOnDisable: true,
					anchor: '-15',
					store: {
						type: 'usercd'
					},
					minChars: 0,
					width: 160,
					queryMode: 'local'
				  } 
        ]
    }, {
        items: [
				{
			        xtype: 'combobox',
					reference: 'dstr_type',
					itemId: 'dstr_type',
					publishes: 'value',
					fieldLabel: Locale.getMsg('유통구조'),
					labelAlign: 'right',
					displayField: 'CODE_NM',
					valueField: 'CODE_ID',
					name: 'dstr_type',
					anchor: '-15',
					store: {
						type: 'TcodeAll'
					},
					minChars: 0,
					width: 160,
					queryMode: 'local' 
		   } 
        ]
    }, {
        items: [
				{
			        xtype: 'combobox',
					reference: 'sales_base',
					itemId: 'sales_base',
					publishes: 'value',
					fieldLabel: Locale.getMsg('매출기준'),
					labelAlign: 'right',
					displayField: 'lang',
					valueField: 'name',
					name: 'sales_base',
					anchor: '-15',
					store: {
						fields: [ 'name','lang' ], 
						data: [{ name: '거래명세표', lang: Locale.getMsg('거래명세표') }, { name: '세금계산서', lang: Locale.getMsg('세금계산서') }],
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
					width: 160,
					queryMode: 'local'
		   } 
        ]
    }, {
        items: [
            {
			    xtype: 'fieldcontainer', 
				combineErrors: true, 
				layout: 'hbox',
				fieldLabel: Locale.getMsg('기준년월'),
				defaults: {
					//flex: 1,
					hideLabel: true
				},
				items: [{
					xtype: 'combobox',
					reference: 'base_y',
					publishes: 'value',
					width: 100,
					labelAlign: 'right',
					displayField: 'YEAR',
					valueField: 'VAL',
					name: 'base_y',
					itemId : 'base_y',
					maskOnDisable: true,
					anchor: '-15',
					store: {
						type: 'year'
					},
					minChars: 0,
					queryMode: 'local',
					margin: '0 5 0 0' 
				},{
					xtype: 'combobox',
					reference: 'base_m',
					publishes: 'value', 
					labelAlign: 'right',
					width: 70,
					displayField: 'MONTH',
					valueField: 'VAL',
					name: 'base_m',
					itemId : 'base_m',
					maskOnDisable: true,
					anchor: '-15',
					store: {
						type: 'month'
					},
					minChars: 0,
					queryMode: 'local',
					margin: '0 10 0 0' 
				},
				{xtype:'hiddenfield', itemId:'t2button', value:'today'}
			  ]
		   } 
        ]
    },{
        items: [
            { 
					xtype: 'button',
					text: Locale.getMsg('검색'),
					height: 30,
				    width: 60,
					listeners: {
							click : 'onSearch' 
					}
            } 
        ]
    }] 
});

Ext.define('Ysn.view.main.mainViewsearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainView-search',
	init: function() {
	    var Today = new Date();
	 this.lookupReference('bizGroup').store.load();
	 this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true));
	 this.lookupReference('dstr_type').store.load({params:{up_code_id:'DSTR_TYPE',lang:localeCd}});   
	 this.lookupReference('dstr_type').setValue('');
	 this.lookupReference('sales_base').setValue(this.lookupReference('sales_base').getStore().getAt(0).get('name'));
     this.lookupReference('base_y').store.load();  
     this.lookupReference('base_y').setValue(Today.getFullYear()); 
	 this.lookupReference('base_m').store.load();  
     this.lookupReference('base_m').setValue('0'+(Today.getMonth()+1));  
     if (sa_yn == 'Y') {
		 this.lookupReference('bizGroup').setConfig({'readOnly':true});
		 if(dept_level == '4') this.lookupReference('deptGroup').setConfig({'readOnly':true});
	 }


	// if (loginUser != 'Sysadmin') this.lookupReference('userGroup').setValue(loginUser);
	}, 
	onChangeBiz: function(el,newVal,oldVal,e){
		var deptCombo = this.lookupReference('deptGroup'); 
		var userCombo = this.lookupReference('userGroup');
		if (newVal != '') {
            deptCombo.store.load({params:{up_dept_cd:newVal}}); 
				 
        } else {
            deptCombo.setValue('');
            userCombo.setValue('');
            deptCombo.store.removeAll();
            userCombo.store.removeAll();
            deptCombo.store.insert(0, {DEPT_CD: '',DEPT_NM: Locale.getMsg('전체')}); 
            userCombo.store.insert(0, {USER_CD: '',USER_NM: Locale.getMsg('전체')}); 				
        }
        if (newVal != '') {
            deptCombo.setValue(Ysn.Util.chkDept(false)); 
        } 
		deptCombo.doQuery();
		userCombo.setValue('');
		userCombo.doQuery();
		el.focus();

	},
	onPopup: function(){
	    var fn = Ext.getCmp('mainmainView').getController('mainViewController');
	    fn.openWindow();

	},
	onChangeDept: function(el,newVal,oldVal,e){
		var userCombo = this.lookupReference('userGroup');
		if (newVal != '' && newVal != null) {
		userCombo.store.load({params:{dept_cd:newVal,up_dept_cd:this.lookupReference('bizGroup').getValue()}});
		} else {
		    userCombo.store.removeAll();
		}
		userCombo.setValue('');
		userCombo.doQuery(); 
		el.focus();
		//userCombo.focus();

	},
	onSearch: function(){
		var fn = Ext.getCmp('mainmainView').getController('mainViewController');  
		fn.onChart1();
		fn.onChart2();
		fn.getT1_info();
		/*fn.getT2_info();*/
		fn.getT3_info();
		fn.getT4_info1();
		fn.getT4_info2();
	}


});

Ext.define('Ysn.view.main.mainView',{
    extend: 'Ext.panel.Panel',
    xtype: 'main-mainView',
    requires: [
        'Ysn.view.main.mainViewController',
		'Ext.chart.series.*',
		'Ext.chart.theme.Muted'
    ],

    controller: 'main-mainView', 
    reference: 'mainmainView',
	id:'mainmainView',  
    overflow:'hidden',
	scrollable:false,
    header: false,
    bodyBorder: true, 	
    bodyPadding: 20,
	dockedItems: [
	               {
		            header: false,
					xtype: 'mainView-search',
					reference: 'mainViewSearch',
					collapsible: true,
					scrollable: true,
					floatable: true,
					split: true,
					dock: 'top',
					height: 40
	               }
	], 

	layout: {
        type: 'hbox',
        align: 'stretch'
    },

	items: [
                  {
        xtype: 'container',
        flex: 1, 
        margin: '0 0 0 0',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [ 
             /*{
                 xtype: 'window',
                 
            ,*/
			{  
			    title: Locale.getMsg('매출 분석'),
				glyph: 'xf275@FontAwesome',
				tools: [ 
					{ type: 'refresh', handler:'getT1_info'} 
				],
		        xtype: 'form',
				reference : 'T1_info',
		        frameBorder: true,
				flex: 1, 
		        layout: {
					type: 'table',
					columns: 7,
					tableAttrs: {
						style: {
							width: '100%',
							height: '100%',
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
					}
				},
				defaults: {
					xtype: 'label'
				}, 
				tbar: { 
					defaultButtonUI: 'default',
					overflowHandler: 'menu', 
					items: [  
						  '->',
						{
							xtype: 'label', 
							text: '('+Locale.getMsg('단위 : 백만원')+')' 
						} 
					]
				},
				items:[
					{ text: Locale.getMsg('구분'), rowspan:2, tdAttrs:{style:{'font-weight': 'bold',width:'80px',backgroundColor:'#EFEFEF'}}},
					{ text: '2015년매출정보', rowspan:2, itemId: 'preYeartot',  tdAttrs:{style:{'font-weight': 'bold',width:'15%',backgroundColor:'#EFEFEF'}}},
					{ text: '2016년매출정보', colspan:3, itemId: 'thisYeartot',  tdAttrs:{style:{'font-weight': 'bold',height:'40px',backgroundColor:'#EFEFEF'}}},					
					{ text: '2015년대비', colspan:2, itemId: 'preYearvs', tdAttrs:{style:{'font-weight': 'bold',backgroundColor:'#EFEFEF'}}},
					{ text: Locale.getMsg('목표'), tdAttrs:{style:{'font-weight': 'bold',height:'40px',width:'15%',backgroundColor:'#EFEFEF'}}},
					{ text: Locale.getMsg('실적'), tdAttrs:{style:{'font-weight': 'bold',width:'15%',backgroundColor:'#EFEFEF'}}},
					{ text: Locale.getMsg('달성율'), tdAttrs:{style:{'font-weight': 'bold',width:'15%',backgroundColor:'#EFEFEF'}}},
					{ text: Locale.getMsg('신장금액'), tdAttrs:{style:{'font-weight': 'bold',width:'15%',backgroundColor:'#EFEFEF'}}},
					{ text: Locale.getMsg('신장율'), tdAttrs: { style: { 'font-weight': 'bold', width: '15%', backgroundColor: '#EFEFEF' } } },
					{ text: '11월누계', itemId: 'preMontot', tdAttrs:{style:{'font-weight': 'bold',backgroundColor:'#EFEFEF'}}},
					{ text: '0.0', itemId: 'T1_1_1'},{ text: '0.0', itemId: 'T1_1_2'},{ text: '0.0', itemId: 'T1_1_3'},
					{ text: '0.0%', itemId: 'T1_1_4'},{ text: '0.0', itemId: 'T1_1_5'},{ text: '0.0%', itemId: 'T1_1_6'},
					{ text: '12월실적', itemId: 'thisMonper', tdAttrs:{style:{'font-weight': 'bold',backgroundColor:'#EFEFEF'}}},
					{ text: '0.0', itemId: 'T1_2_1'},{ text: '1', itemId: 'T1_2_2'},{ text: '2', itemId: 'T1_2_3'},
					{ text: '0.0%', itemId: 'T1_2_4'},{ text: '0.0', itemId: 'T1_2_5'},{ text: '0.0%', itemId: 'T1_2_6'},
					{ text: '12월누계', itemId: 'thisMontot', tdAttrs:{style:{'font-weight': 'bold',backgroundColor:'#EFEFEF'}}},
					{ text: '0.0', itemId: 'T1_3_1'},{ text: '0.0', itemId: 'T1_3_2'},{ text: '0.0', itemId: 'T1_3_3'},
					{ text: '0.0%', itemId: 'T1_3_4'},{ text: '0.0', itemId: 'T1_3_5'},{ text: '0.0%', itemId: 'T1_3_6'}
				] 
			},
            {
                title: Locale.getMsg('매출현황'),
                xtype: 'tabpanel',
                glyph: 'xf03a@FontAwesome',
                flex: 1, 
                margin: '20 0 0 0', 
                icon: null, 
                tabBarHeaderPosition: 2,
                reference: 'tabpanel',
                plain: false,
                defaults: {
                    //bodyPadding: 10,
                    scrollable: true,
                    border: false
                }, 
                items: [
                    {
                        title: Locale.getMsg('월별'),
                        glyph: 'xf080@FontAwesome',
                        xtype: 'cartesian', 
                        reference: 'chart',
                        flex: 1,
                        margin: '20 0 0 0',
                        theme: 'Muted',
                        store: {
                            fields: ['MONTH', 'KRW_AMOUNT1', 'KRW_AMOUNT2'],
                            proxy: {
                                method: "POST",
                                type: 'ajax',
                                url: '/Main/getMonthChartTot',
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
                        interactions: {
                            type: 'itemedit',
                            tooltip: {
                                renderer: 'onEditTipRender'
                            }
                        },
                        legend: {
                            dock: 'bottom'
                        },
                        insetPadding: { top: 20, left: 20, right: 20, bottom: 20 },
                        axes: [{
                            type: 'numeric3d',
                            position: 'left',
                            adjustByMajorUnit: true,
                            grid: true,
                            fields: ['KRW_AMOUNT1', 'KRW_AMOUNT2'],
                            renderer: 'onAxisLabelRender',
                            //maximum: 30000,
                            minimum: 0
                        }, {
                            type: 'category3d',
                            position: 'bottom',
                            grid: true,
                            fields: ['MONTH']
                        }],
                        series: [{
                            type: 'bar3d',
                            title: [Locale.getMsg('목표'), Locale.getMsg('실적')],
                            xField: 'MONTH',
                            yField: ['KRW_AMOUNT1', 'KRW_AMOUNT2'],
                            stacked: false,
                            highlight: true,
                            tooltip: {
                                renderer: 'onBarTipRender'
                            }
                        }]
                    }
                    ,
                    {
                        title: Locale.getMsg('누계'),
                        glyph: 'xf201@FontAwesome',
                        frameBorder: true,
                        flex: 1,
                        margin: '20 0 0 0',
                        xtype: 'cartesian',
                        reference: 'chart2',
                        theme: 'Muted',
                        store: {
                            fields: ['MONTH', 'KRW_AMOUNT1', 'KRW_AMOUNT2', 'KRW_AMOUNT3'],
                            proxy: {
                                method: "POST",
                                type: 'ajax',
                                url: '/Main/getNonMonthChartTot',
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
                        interactions: {
                            type: 'itemedit',
                            tooltip: {
                                renderer: 'onEditTipRender'
                            }
                        },
                        legend: {
                            dock: 'bottom'
                        },
                        insetPadding: { top: 20, left: 20, right: 20, bottom: 20 },
                        axes: [{
                            type: 'numeric',
                            position: 'left',
                            adjustByMajorUnit: true,
                            grid: true,
                            fields: ['KRW_AMOUNT1', 'KRW_AMOUNT2', 'KRW_AMOUNT3'],
                            renderer: 'onAxisLabelRender',
                            //maximum: 250000,
                            minimum: 0
                        }, {
                            type: 'category',
                            position: 'bottom',
                            grid: true,
                            fields: ['MONTH']
                        }],
                        series: [{
                            type: 'line',
                            title: Locale.getMsg('실적'),
                            xField: 'MONTH',
                            yField: 'KRW_AMOUNT1',
                            marker: {
                                type: 'square',
                                fx: {
                                    duration: 200,
                                    easing: 'backOut'
                                }
                            },
                            highlightCfg: {
                                scaling: 2
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onSeriesTooltipRender'
                            }
                        }, {
                            type: 'line',
                            title: Locale.getMsg('추정'),
                            xField: 'MONTH',
                            yField: 'KRW_AMOUNT2',
                            marker: {
                                type: 'triangle',
                                fx: {
                                    duration: 200,
                                    easing: 'backOut'
                                }
                            },
                            highlightCfg: {
                                scaling: 2
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onSeriesTooltipRender'
                            }
                        }, {
                            type: 'line',
                            title: Locale.getMsg('목표'),
                            xField: 'MONTH',
                            yField: 'KRW_AMOUNT3',
                            marker: {
                                type: 'arrow',
                                fx: {
                                    duration: 200,
                                    easing: 'backOut'
                                }
                            },
                            highlightCfg: {
                                scaling: 2
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onSeriesTooltipRender'
                            }
                        }]
                    }
                ]
            }
		]
    }, {
        xtype: 'container',
        flex: 1,
        margin: '0 0 0 30',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [
			{  
			    title: Locale.getMsg('예상매출현황'),  			
			    glyph: 'xf03a@FontAwesome',
			    xtype: 'tabpanel',
			    glyph: 'xf03a@FontAwesome',
			    flex: 1, 
			    margin: '0 0 0 0', 
			    icon: null, 
			    tabBarHeaderPosition: 2,
			    reference: 'tabpanel2',
			    plain: false,
			    defaults: {
			        //bodyPadding: 10,
			        scrollable: true,
			        border: false
			    }, 
			    items: [
                    {
                        title: Locale.getMsg('해외영업'),
                        glyph: 'xf03a@FontAwesome',
                        xtype: 'grid',
                        flex: 1,
                        reference: 'T4_info1',
                        store: {
                            fields: [
                                { name: 'DEPT_TYPE', type: 'string' },
                                { name: 'DSTR_NM', type: 'string' },
                                { name: 'KRW_AMOUNT1', type: 'int' },
                                { name: 'KRW_AMOUNT2', type: 'int' }
                            ],

                            proxy: {
                                method: "POST",
                                type: 'ajax',
                                url: '/Main/getT4_info',
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
                        style: { 'borderBottom': '1px solid gray' },
                        features: [{
                            ftype: 'summary',
                            dock: 'bottom'
                        }],
                        columnLines: true,
                        columns: [ 
                                {
                                    text: Locale.getMsg('유통구조'), flex: 1, dataIndex: 'DSTR_NM', sortable: true,
                                    summaryRenderer: function (value, summaryData, dataIndex) {
                                        return Ext.String.format('합계');
                                    }
                                },
                                {
                                    text: Locale.getMsg('당월예상금액'), width: 180, dataIndex: 'KRW_AMOUNT1', renderer: 'changeDbl', sortable: true, summaryType: 'sum',
                                    summaryRenderer: 'changeDbl'
                                },
                                {
                                    text: Locale.getMsg('익월예상금액'), width: 180, dataIndex: 'KRW_AMOUNT2', renderer: 'changeDbl', sortable: true, summaryType: 'sum',
                                    summaryRenderer: 'changeDbl'
                                }
                        ],
                        scrollable: true,
                        syncRowHeight: false
                    },
                    {
                        title: Locale.getMsg('국내영업'),
                        glyph: 'xf03a@FontAwesome',
                        xtype: 'grid',
                        flex: 1,
                        reference: 'T4_info2',
                        store: {
                            fields: [
                                { name: 'DEPT_TYPE', type: 'string' },
                                { name: 'DSTR_NM', type: 'string' },
                                { name: 'KRW_AMOUNT1', type: 'int' },
                                { name: 'KRW_AMOUNT2', type: 'int' }
                            ],

                            proxy: {
                                method: "POST",
                                type: 'ajax',
                                url: '/Main/getT4_info',
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
                        style: { 'borderBottom': '1px solid gray' },
                        features: [{
                            ftype: 'summary',
                            dock: 'bottom'
                        }],
                        columnLines: true,
                        columns: [
                                {
                                    text: Locale.getMsg('유통구조'),flex: 1, dataIndex: 'DSTR_NM',
                                    summaryRenderer: function (value, summaryData, dataIndex) {
                                        return Ext.String.format('합계');
                                    }
                                },
                                {
                                    text: Locale.getMsg('당월예상금액'), width: 180, dataIndex: 'KRW_AMOUNT1', renderer: 'changeDbl', summaryType: 'sum',
                                    summaryRenderer: 'changeDbl'
                                },
                                {
                                    text: Locale.getMsg('익월예상금액'), width: 180, dataIndex: 'KRW_AMOUNT2', renderer: 'changeDbl',  summaryType: 'sum',
                                    summaryRenderer: 'changeDbl'
                                }
                        ],
                        scrollable: true,
                        syncRowHeight: false
                    }
                ]
				
		    }, 
			{   
			    title: Locale.getMsg('Sample진행현황'),
			    glyph: 'xf080@FontAwesome',
			    xtype: 'cartesian',
			    reference: 'T3_info',
			    flex: 1,
			    margin: '20 0 0 0',
                tools: [
                    { type: 'refresh', handler: 'getT3_info' }
                ], 
			    /*margin: '20 0 0 0',
                xtype: 'grid',
                store: {
                    fields: [
                        { name: 'ITEM_NM', type: 'string' },
                        { name: 'SMP_STATUS_NM', type: 'string' },
                        { name: 'CMPT_RDATE', type: 'date', dateFormat: 'Ymd' },
                        { name: 'PRDT_PDATE', type: 'date', dateFormat: 'Ymd' }
                    ],

                    proxy: {
                        method: "POST",
                        type: 'ajax',
                        url: '/Main/getT3_info',
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
                style: { 'borderBottom': '1px solid gray' },
                columnLines: true,
                columns: [
                        { text: Locale.getMsg('샘플품목'), flex: 1, dataIndex: 'ITEM_NM', sortable: true },
                        { text: Locale.getMsg('진행상태'), width: 120, dataIndex: 'SMP_STATUS_NM', sortable: true },
                        { text: Locale.getMsg('완료요청일'), width: 120, dataIndex: 'CMPT_RDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true },
                        { text: Locale.getMsg('완료예정일'), width: 120, dataIndex: 'PRDT_PDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true }
                ],
                scrollable: true,
                syncRowHeight: false*/
                
                theme: 'Muted',
                store: {
                    fields: ['MONTH', 'SMSTAT_400', 'SMSTAT_500'],
                    proxy: {
                        method: "POST",
                        type: 'ajax',
                        url: '/Main/getT3_info',
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
                interactions: {
                    type: 'itemedit',
                    tooltip: {
                        renderer: 'onEditTipRender'
                    }
                },
                legend: {
                    dock: 'bottom'
                },
                insetPadding: { top: 20, left: 20, right: 20, bottom: 20 },
                axes: [{
                    type: 'numeric3d',
                    position: 'left',
                    adjustByMajorUnit: true,
                    grid: true,
                    fields: ['SMSTAT_400', 'SMSTAT_500'],
                    renderer: 'onAxisLabelRender',
                    //maximum: 1000,
                    minimum: 0
                }, {
                    type: 'category3d',
                    position: 'bottom',
                    grid: true,
                    fields: ['MONTH']
                }],
                series: [{
                    type: 'bar3d',
                    title: [Locale.getMsg('제작진행'), Locale.getMsg('제작완료')],
                    xField: 'MONTH',
                    yField: ['SMSTAT_400', 'SMSTAT_500'],
                    stacked: false,
                    highlight: true,
                    tooltip: {
                        renderer: 'onBarTipRender'
                    }
                }]

			}
	   ]
    }]




	
});

Ext.define('Ysn.view.main.mainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-mainView',
	requires: [ 
    ],
	init: function () {
	    if (sa_yn == 'Y' || loginUser == 'Sysadmin') {
	        this.openWindow();
	     }  
	    //  alert
	    
		this.onChart1();
		this.onChart2();
		this.getT1_info(); 
		this.getT3_info();
		this.getT4_info1();
		this.getT4_info2();
	}, 
	changeDec: function (value) {
	    return Ysn.Util.changeDec(value);
	},
	changeDbl: function (value) {
	    return Ysn.Util.changeDbl(value);
	},
	openWindow: function () {
	    var win = Ext.getCmp('mainPopup');
	    if (!win) {
	        win = new Ysn.view.common.mainPopup();
	    }
	    Ext.getStore('mainPopup').load();
	    Ext.getCmp('mainmainView').add(win);
	    //win.setPosition(10, 10);
	    win.show();
	},
	btnToggle: function(container, button, pressed){
        var t2button = this.lookupReference('mainViewSearch').down('#t2button'); 
		switch(button.getText()){
			case "Yesterday":
				t2button.setValue('yesterday'); 
				break;
            case "Today":
				t2button.setValue('today'); 
			    break;
			case "Tomorrow":
				t2button.setValue('tomorrow'); 
			    break;
		}
	},

	btnToggle2: function (container, button, pressed) { 
	    switch (button.getText()) {
	        case Locale.getMsg('월별'):
	            this.lookupReference('chart').show();
	            this.lookupReference('chart2').hide();
	            break;
	        case Locale.getMsg('누계'):
	            this.lookupReference('chart').hide();
	            this.lookupReference('chart2').show();
	            break; 
	    }
	},

	getT4_info1: function () {
	    var dstr_type = this.lookupReference('mainViewSearch').down('#dstr_type').getValue();
	    var bizGroup = this.lookupReference('mainViewSearch').down('#bizGroup').getValue();
	    var deptGroup = this.lookupReference('mainViewSearch').down('#deptGroup').getValue();
	    var user_cd = this.lookupReference('mainViewSearch').down('#user_cd').getValue();
	    var year = this.lookupReference('mainViewSearch').down('#base_y').getValue();
	    var month = this.lookupReference('mainViewSearch').down('#base_m').getValue();
	    var sales_base = this.lookupReference('mainViewSearch').down('#sales_base').getValue();
	    var t2button = this.lookupReference('mainViewSearch').down('#t2button').getValue();

	    Ext.getCmp('mainmainView').lookupReference('T4_info1').getStore().load(
			{
			    params: {
			        dstr_type: dstr_type, bizGroup: bizGroup, deptGroup: deptGroup, user_cd: user_cd,
			        year: year, month: month, sales_base: sales_base, t2button: t2button, dept_type: '해영'
			    }
			}
		);
	},

	getT4_info2: function () {
	    var dstr_type = this.lookupReference('mainViewSearch').down('#dstr_type').getValue();
	    var bizGroup = this.lookupReference('mainViewSearch').down('#bizGroup').getValue();
	    var deptGroup = this.lookupReference('mainViewSearch').down('#deptGroup').getValue();
	    var user_cd = this.lookupReference('mainViewSearch').down('#user_cd').getValue();
	    var year = this.lookupReference('mainViewSearch').down('#base_y').getValue();
	    var month = this.lookupReference('mainViewSearch').down('#base_m').getValue();
	    var sales_base = this.lookupReference('mainViewSearch').down('#sales_base').getValue();
	    var t2button = this.lookupReference('mainViewSearch').down('#t2button').getValue();

	    Ext.getCmp('mainmainView').lookupReference('T4_info2').getStore().load(
			{
			    params: {
			        dstr_type: dstr_type, bizGroup: bizGroup, deptGroup: deptGroup, user_cd: user_cd,
			        year: year, month: month, sales_base: sales_base, t2button: t2button, dept_type: '국영'
			    }
			}
		);
	},

	getT3_info: function () {
	    var dstr_type = this.lookupReference('mainViewSearch').down('#dstr_type').getValue();
	    var bizGroup = this.lookupReference('mainViewSearch').down('#bizGroup').getValue();
	    var deptGroup = this.lookupReference('mainViewSearch').down('#deptGroup').getValue();
	    var user_cd = this.lookupReference('mainViewSearch').down('#user_cd').getValue();
	    var year = this.lookupReference('mainViewSearch').down('#base_y').getValue();
	    var month = this.lookupReference('mainViewSearch').down('#base_m').getValue();
	    var sales_base = this.lookupReference('mainViewSearch').down('#sales_base').getValue();
	    var t2button = this.lookupReference('mainViewSearch').down('#t2button').getValue();

	    Ext.getCmp('mainmainView').lookupReference('T3_info').getStore().load(
			{
			    params: {
			        dstr_type: dstr_type, bizGroup: bizGroup, deptGroup: deptGroup, user_cd: user_cd,
			        year: year, month: month, sales_base: sales_base, t2button: t2button
			    }
			}
		);
	},

	/*getT2_info: function(){
		var dstr_type = this.lookupReference('mainViewSearch').down('#dstr_type').getValue();
		var bizGroup = this.lookupReference('mainViewSearch').down('#bizGroup').getValue();
		var deptGroup = this.lookupReference('mainViewSearch').down('#deptGroup').getValue();
		var user_cd = this.lookupReference('mainViewSearch').down('#user_cd').getValue();
		var year = this.lookupReference('mainViewSearch').down('#base_y').getValue();
		var month = this.lookupReference('mainViewSearch').down('#base_m').getValue();
		var sales_base = this.lookupReference('mainViewSearch').down('#sales_base').getValue(); 
		var t2button = this.lookupReference('mainViewSearch').down('#t2button').getValue(); 
		
		Ext.getCmp('mainmainView').lookupReference('T2_info').getStore().load(
			{params:{dstr_type:dstr_type,bizGroup:bizGroup,deptGroup:deptGroup,user_cd:user_cd,
			    year:year,month:month,sales_base:sales_base,t2button:t2button }
		    }
		);
	},*/
	getT1_info: function(){
		var dstr_type = this.lookupReference('mainViewSearch').down('#dstr_type').getValue();
		var bizGroup = this.lookupReference('mainViewSearch').down('#bizGroup').getValue();
		var deptGroup = this.lookupReference('mainViewSearch').down('#deptGroup').getValue();
		var user_cd = this.lookupReference('mainViewSearch').down('#user_cd').getValue();
		var year = this.lookupReference('mainViewSearch').down('#base_y').getValue();
		var month = this.lookupReference('mainViewSearch').down('#base_m').getValue();
		var sales_base = this.lookupReference('mainViewSearch').down('#sales_base').getValue(); 

        var util = Ysn.Util;
		Ext.Ajax.request({
	   	url: '/Main/getT1_info', 
	   	method: 'POST',
	    params:{dstr_type:dstr_type,bizGroup:bizGroup,deptGroup:deptGroup,user_cd:user_cd,
			    year:year,month:month,sales_base:sales_base,t1button:'sales' }, 
	   	success: function(action){ 
				   var dataVal = Ext.decode(action.responseText).LIST[0];
                   var pl = Ext.getCmp('mainmainView').lookupReference('T1_info'); 
                   pl.down('#preYeartot').setText(parseInt(year) - 1 + Locale.getMsg('년 매출 정보'));
                   pl.down('#thisYeartot').setText(year + Locale.getMsg('년 매출 정보'));
                   pl.down('#preYearvs').setText(parseInt(year) - 1 + Locale.getMsg('년 대비'));
                   pl.down('#preYearvs').setText(parseInt(year) - 1 + Locale.getMsg('년 대비'));
                   pl.down('#preMontot').setText(parseInt(month) - 1 + Locale.getMsg('월 누계'));
                   pl.down('#thisMonper').setText(parseInt(month) + Locale.getMsg('월 실적'));
                   pl.down('#thisMontot').setText(parseInt(month) + Locale.getMsg('월 누계'));
				   if(month == '01'){
						pl.down('#T1_1_1').setText('0.0');
						pl.down('#T1_1_2').setText('0.0');
						pl.down('#T1_1_3').setText('0.0');
						pl.down('#T1_1_4').setText('0.0%');
						pl.down('#T1_1_5').setText('0.0');
						pl.down('#T1_1_6').setText('0.0%'); 
						pl.down('#T1_3_1').setText(util.YWnumberFm(dataVal.T1_2_1),true);
						pl.down('#T1_3_2').setText(util.YWnumberFm(dataVal.T1_2_2),true);
						pl.down('#T1_3_3').setText(util.YWnumberFm(dataVal.T1_2_3),true);
						pl.down('#T1_3_4').setText(util.YWpercentFm(dataVal.T1_2_3,dataVal.T1_2_2));
						pl.down('#T1_3_5').setText(util.YWminusFm(dataVal.T1_2_3,dataVal.T1_2_1));
						pl.down('#T1_3_6').setText(util.YWvspercentFm(dataVal.T1_2_3,dataVal.T1_2_1)); 
				   }else{
						pl.down('#T1_1_1').setText(util.YWnumberFm(dataVal.T1_1_1),true);
						pl.down('#T1_1_2').setText(util.YWnumberFm(dataVal.T1_1_2),true);
						pl.down('#T1_1_3').setText(util.YWnumberFm(dataVal.T1_1_3),true);
						pl.down('#T1_1_4').setText(util.YWpercentFm(dataVal.T1_1_3,dataVal.T1_1_2));
						pl.down('#T1_1_5').setText(util.YWminusFm(dataVal.T1_1_3,dataVal.T1_1_1));
						pl.down('#T1_1_6').setText(util.YWvspercentFm(dataVal.T1_1_3,dataVal.T1_1_1)); 
						pl.down('#T1_3_1').setText(util.YWnumberFm(dataVal.T1_3_1),true);
						pl.down('#T1_3_2').setText(util.YWnumberFm(dataVal.T1_3_2),true);
						pl.down('#T1_3_3').setText(util.YWnumberFm(dataVal.T1_3_3),true);
						pl.down('#T1_3_4').setText(util.YWpercentFm(dataVal.T1_3_3,dataVal.T1_3_2));
						pl.down('#T1_3_5').setText(util.YWminusFm(dataVal.T1_3_3,dataVal.T1_3_1));
						pl.down('#T1_3_6').setText(util.YWvspercentFm(dataVal.T1_3_3,dataVal.T1_3_1)); 
                   }
                   
                   pl.down('#T1_2_1').setText(util.YWnumberFm(dataVal.T1_2_1),true);
				   pl.down('#T1_2_2').setText(util.YWnumberFm(dataVal.T1_2_2),true);
				   pl.down('#T1_2_3').setText(util.YWnumberFm(dataVal.T1_2_3),true);
				   pl.down('#T1_2_4').setText(util.YWpercentFm(dataVal.T1_2_3,dataVal.T1_2_2));
				   pl.down('#T1_2_5').setText(util.YWminusFm(dataVal.T1_2_3,dataVal.T1_2_1));
				   pl.down('#T1_2_6').setText(util.YWvspercentFm(dataVal.T1_2_3,dataVal.T1_2_1)); 
					  
	   	},
	   	failure: function(action){
			      var dataVal = Ext.JSON.decode(action.response.responseText)
	   			  Ext.Msg.alert('Failed', dataVal.errmsg); 
	   	}
	 });
	},
	onChart1: function(){
		var dstr_type = this.lookupReference('mainViewSearch').down('#dstr_type').getValue();
		var bizGroup = this.lookupReference('mainViewSearch').down('#bizGroup').getValue();
		var deptGroup = this.lookupReference('mainViewSearch').down('#deptGroup').getValue();
		var user_cd = this.lookupReference('mainViewSearch').down('#user_cd').getValue();
		var year = this.lookupReference('mainViewSearch').down('#base_y').getValue();
		var month = this.lookupReference('mainViewSearch').down('#base_m').getValue();
		var sales_base = this.lookupReference('mainViewSearch').down('#sales_base').getValue(); 
		 this.lookupReference('chart').store.load({
			params:{dstr_type:dstr_type,bizGroup:bizGroup,deptGroup:deptGroup,user_cd:user_cd,
				    year:year,month:month,sales_base:sales_base,t1button:'sales',t3button:'month' }
			});  
	},
	onChart2: function(){
		var dstr_type = this.lookupReference('mainViewSearch').down('#dstr_type').getValue();
		var bizGroup = this.lookupReference('mainViewSearch').down('#bizGroup').getValue();
		var deptGroup = this.lookupReference('mainViewSearch').down('#deptGroup').getValue();
		var user_cd = this.lookupReference('mainViewSearch').down('#user_cd').getValue();
		var year = this.lookupReference('mainViewSearch').down('#base_y').getValue();
		var month = this.lookupReference('mainViewSearch').down('#base_m').getValue();
		var sales_base = this.lookupReference('mainViewSearch').down('#sales_base').getValue(); 
		 this.lookupReference('chart2').store.load({
			params:{dstr_type:dstr_type,bizGroup:bizGroup,deptGroup:deptGroup,user_cd:user_cd,
				    year:year,month:month,sales_base:sales_base,t1button:'sales',t3button:'notmonth' }
			});  
	},
	onPreview: function() {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart;
		
	    if(this.lookupReference('chart'))chart = this.lookupReference('chart')  ;
	    if (this.lookupReference('chart2')) chart = this.lookupReference('chart2');
	    if (this.lookupReference('T3_info')) chart = this.lookupReference('T3_info');
        chart.preview();
    },

    onThemeSwitch: function () {

        var chart;
		
	    if(this.lookupReference('chart'))chart = this.lookupReference('chart')  ;
	    if (this.lookupReference('chart2')) chart = this.lookupReference('chart2');
	    if (this.lookupReference('T3_info')) chart = this.lookupReference('T3_info');
            currentThemeClass = Ext.getClassName(chart.getTheme()),
            themes = Ext.chart.theme,
            themeNames = [],
            currentIndex = 0,
            name;

        for (name in themes) {
            if (Ext.getClassName(themes[name]) === currentThemeClass) {
                currentIndex = themeNames.length;
            }
            if (name !== 'Base' && name.indexOf('Gradients') < 0) {
                themeNames.push(name);
            }
        }
        chart.setTheme(themes[themeNames[++currentIndex % themeNames.length]]);
    },
 
    // The 'target' here is an object that contains information
    // about the target value when the drag operation on the column ends.
    onEditTipRender: function (tooltip, item, target, e) {
        var fieldIndex = Ext.Array.indexOf(item.series.getYField(), target.yField),
            browser = item.series.getTitle()[fieldIndex];

        tooltip.setHtml(
            item.record.get('MONTH')+'월 ' + browser +': ' +
            target.yValue.toFixed(1)  );
    },

    onBarTipRender: function (tooltip, record, item) {
        var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
            browser = item.series.getTitle()[fieldIndex];

        tooltip.setHtml( record.get('MONTH')+'월 ' + browser + ': ' +
            record.get(item.field) );
    },

    onGridMonthRender: function (value) {
        return value;
    },

    onGridValueRender: function (value) { 
        return Ysn.Util.YWnumberFm(value,true) ;
    },

    onAxisLabelRender: function (axis, label, layoutContext) {
        //return Ysn.Util.YWnumberFm(layoutContext.renderer(label),false) ;
         return Ext.util.Format.number(layoutContext.renderer(label), '0,000');
    },
	onSeriesTooltipRender: function (tooltip, record, item) {
        var title = item.series.getTitle();

        tooltip.setHtml(record.get('MONTH')+'월 ' + title + ': ' +
            record.get(item.series.getYField()));
    }//return Ext.util.Format.number(layoutContext.renderer(label) / 1000, '0,000');

});






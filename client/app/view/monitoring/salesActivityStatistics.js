Ext.define('Ysn.view.monitoring.salesActivityStatsearch',{
    extend: 'Ext.panel.Panel',
	xtype: 'salesActivityStat-search',

    requires: [
        'Ysn.view.monitoring.salesActivityStatsearchController'   
    ],

    controller: 'salesActivityStat-search', 

    frame: false,
    //resizable: true,
    width: 800,
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
    id: 'salesActivityStat-search',
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
												var bizCd = Ext.getCmp('salesActivityStat-search').down('#bizGroup');
												if(store.data.items.length < 2){
													Ext.getCmp('salesActivityStat-search').down('#user_cd').store.load({params:{dept_cd:bizCd.getValue(),up_dept_cd:''}});
												}else{
													Ext.getCmp('salesActivityStat-search').down('#user_cd').store.load({params:{dept_cd:'',up_dept_cd:bizCd.getValue()}});
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
			        reference: 'condi_type',
					itemId: 'condi_type',
					publishes: 'value',
					fieldLabel: Locale.getMsg('기준'),
					labelAlign: 'right',
					displayField: 'name',
					valueField: 'id',
					name: 'condi_type',
					anchor: '-15',
					store: {
						fields: [ 'name','id' ], 
						data: [{ name: Locale.getMsg('월별'),id: '0'},{ name: Locale.getMsg('누계'),id: '1'}],
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
				fieldLabel: Locale.getMsg('활동년월'),
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
				}
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

Ext.define('Ysn.view.monitoring.salesActivityStatsearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salesActivityStat-search',
	init: function() {
	 var Today = new Date(); 
	 this.lookupReference('bizGroup').store.load();  
     this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true));  
     this.lookupReference('condi_type').setValue(this.lookupReference('condi_type').getStore().getAt(0).get('id'));
     this.lookupReference('base_y').store.load();  
     this.lookupReference('base_y').setValue(Today.getFullYear()); 
	 this.lookupReference('base_m').store.load();  
     this.lookupReference('base_m').setValue('0'+(Today.getMonth()+1));  
	 if(auth_id != 'A001'){
		// this.lookupReference('bizGroup').setConfig({'readOnly':true});
		// if(dept_level == '4') this.lookupReference('deptGroup').setConfig({'readOnly':true});
	 }
	 if (loginUser != 'Sysadmin') this.lookupReference('userGroup').setValue(loginUser);
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
		var fn = Ext.getCmp('monitoringsalesActivityStat').getController('salesActivityStatController');  
		fn.salesActivityStat();
	}


});

Ext.define('Ysn.store.salesActivityStat', {
    extend: 'Ext.data.Store',
    alias: 'store.salesActivityStat',
    storeId: 'salesActivityStat',
    fields: ['LIST1', 'LIST2', 'LIST3'], 
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/Monitoring/saTypeStatistics',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            Ext.getCmp('monitoringsalesActivityStat').down('#chart').getStore().loadRawData(store.data.items[0].data['LIST1']);
            Ext.getCmp('monitoringsalesActivityStat').down('#chart2').getStore().loadRawData(store.data.items[0].data['LIST2']);
            Ext.getCmp('monitoringsalesActivityStat').down('#chart3').getStore().loadRawData(store.data.items[0].data['LIST3']);
            //Ext.getStore('subSampleRequestList').loadRawData(store.data.items[0].data['LIST']); 
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.view.monitoring.salesActivityStat',{
    extend: 'Ext.panel.Panel',
    xtype: 'monitoring-salesActivityStat',
    requires: [
        'Ysn.view.monitoring.salesActivityStatController',
		'Ext.chart.series.*',
		'Ext.chart.theme.Muted'
    ],

    controller: 'monitoring-salesActivityStat', 
    reference: 'monitoringsalesActivityStat',
	id:'monitoringsalesActivityStat',  
    overflow:'hidden',
	scrollable:false,
    header: false,
    bodyBorder: true, 	
    bodyPadding: 20,
	dockedItems: [
	               {
		            header: false,
					xtype: 'salesActivityStat-search',
					reference: 'salesActivityStatSearch',
					collapsible: true,
					floatable: true,
					split: true,
					dock: 'top',
					height: 40
				   }
	], 

	layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'container',
        flex: 1, 
        margin: '0 0 0 0',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [
			{   
				title: Locale.getMsg('활동유형'), 
				glyph: 'xf00b@FontAwesome', 
				xtype: 'cartesian',
				reference: 'chart',
				itemId: 'chart',
				flex: 1,                 
                margin: '20 10 0 0',			
                theme: 'Muted',
                store: {
                    fields: ['CODE_NM','CODE_ID','BASE_YM','TOTAL'],

                    proxy: {
                        method: "POST",
                        type: 'memory',
                        reader: {
                            type: 'json',
                            rootProperty: 'LIST1'
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
				insetPadding: { top: 20, left: 20, right: 20,bottom: 20 }, 
				axes: [{
					type: 'numeric3d',
					position: 'left',
					adjustByMajorUnit: true,
					//adjustMinimumByMajorUnit : true,
				    //adjustMaximumByMinorUnit : true,
					grid: {
					    odd: {
					        fillStyle: 'rgba(255, 255, 255, 0.06)'
					    },
					    even: {
					        fillStyle: 'rgba(0, 0, 0, 0.03)'
					    }
					},
					fields: 'TOTAL',
					renderer: 'onAxisLabelRender',
					//maximum: 100,
					minimum: 0
				}, {
					type: 'category3d',
					position: 'bottom',
					grid: true,
					fields: ['CODE_NM']
				}],
				series: [{
					type: 'bar3d',
					title: Locale.getMsg('활동유형'),
					xField: 'CODE_NM',
					yField: 'TOTAL',
					stacked: false, 
					highlight: true,
					tooltip: {
						renderer: 'onBarTipRender'
					}
				} 
			] 
			},{  
				title: Locale.getMsg('업무유형'), 
				glyph: 'xf0ae@FontAwesome',
				frameBorder: true,
				flex: 1,                 
                margin: '20 0 0 10',
                xtype: 'cartesian', 
                reference: 'chart2',
                flipXY: true,
                itemId: 'chart2',
                theme: 'Muted',
                store: {
                    fields: ['CODE_NM', 'CODE_ID', 'BASE_YM', 'TOTAL'],

                    proxy: {
                        method: "POST",
                        type: 'memory',
                        reader: {
                            type: 'json',
                            rootProperty: 'LIST2'
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
				insetPadding: { top: 20, left: 20, right: 20,bottom: 20 }, 
				axes: [{
					type: 'numeric3d',
					position: 'bottom',
					//maximum: 100,
					minimum: 0,
					//majorTickSteps: 10,
					fields: 'TOTAL',
					renderer: 'onAxisLabelRender',
					grid: {
					        odd: {
					            fillStyle: 'rgba(245, 245, 245, 1.0)'
					        },
					        even: {
					            fillStyle: 'rgba(255, 255, 255, 1.0)'
					        }
                        }
				}, {
				    type: 'category3d',
					position: 'left', 
					fields: 'CODE_NM'
				}], 
				series: [{
				    type: 'bar3d', 
				    xField: 'CODE_NM',
				    yField: 'TOTAL',
				    style: {
				        minGapWidth: 10
				    },
				    highlight: true,
				    label: {
				        field: 'TOTAL',
				        display: 'insideEnd',
				        renderer: 'onSeriesLabelRender'
				    },
				    tooltip: {
				        trackMouse: true,
				        renderer: 'onSeriesTooltipRender'
				    }
				} ]
			}
		]
    } , {
        title: Locale.getMsg('활동현황'),
        glyph: 'xf080@FontAwesome',
        xtype: 'cartesian',
        reference: 'chart3',
        itemId: 'chart3',
        flex: 1,
        margin: '20 0 0 0',
        theme: 'Muted',
        store: {
            fields: ['CODE_ID', 'SATYPE_100', 'SATYPE_200', 'SATYPE_300', 'SATYPE_400'],

            proxy: {
                method: "POST",
                type: 'memory',
                reader: {
                    type: 'json',
                    rootProperty: 'LIST3'
                }
            },
            autoLoad: false,
            autoDestroy: true
        },
        interactions:  ['itemhighlight'],
        insetPadding: { top: 20, left: 20, right: 20, bottom: 20 },
        axes: [{
            type: 'numeric3d',
            position: 'left',
            adjustByMajorUnit: true,
            grid: {
                odd: {
                    fillStyle: 'rgba(255, 255, 255, 0.06)'
                },
                even: {
                    fillStyle: 'rgba(0, 0, 0, 0.03)'
                }
            }, 
            renderer: 'onAxisLabelRender',
            //maximum: 30,
            minimum: 0,  
            listeners: {
                //rangechange: 'onAxisRangeChange'
            }
        }, {
            type: 'category3d',
            position: 'bottom',
            grid: true 
        }],
        legend: {
            docked: 'bottom'
        },
        series: [{
            type: 'bar3d',
            title: [Locale.getMsg('잠재기회'),Locale.getMsg('수주영업'),Locale.getMsg('협업지원')],
            xField: 'CODE_ID',
            yField: ['SATYPE_100', 'SATYPE_200', 'SATYPE_300'],
            style: {
                //maxBarWidth: 80
            },
           // stacked: true,
            highlight: true,
            tooltip: {
                trackMouse: true,
                renderer: 'onTooltipRender'
            }
        }
        ]
    }
    ]




	
});

Ext.define('Ysn.view.monitoring.salesActivityStatController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.monitoring-salesActivityStat',
	requires: [ 
    ],
    init: function() {    
       
        this.salesActivityStat();
	}, 

	salesActivityStat: function(){ 
		var bizGroup = this.lookupReference('salesActivityStatSearch').down('#bizGroup').getValue();
		var deptGroup = this.lookupReference('salesActivityStatSearch').down('#deptGroup').getValue();
		var user_cd = this.lookupReference('salesActivityStatSearch').down('#user_cd').getValue();
		var year = this.lookupReference('salesActivityStatSearch').down('#base_y').getValue();
		var month = this.lookupReference('salesActivityStatSearch').down('#base_m').getValue();
		var condi_type = this.lookupReference('salesActivityStatSearch').down('#condi_type').getValue();  
		
		Ext.getStore('salesActivityStat').load(
           {params:{bizGroup:bizGroup,deptGroup:deptGroup,user_cd:user_cd,
               year:year,month:month,condi_type:condi_type }
           })
	},
	onPreview: function() {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart;
		
	    if(this.lookupReference('chart'))chart = this.lookupReference('chart')  ;
	    if (this.lookupReference('chart2')) chart = this.lookupReference('chart2');
	    if (this.lookupReference('chart3')) chart = this.lookupReference('chart3');
        chart.preview();
    },
	onSeriesLabelRender: function (v) {
	    return Ext.util.Format.number(v, '0,000');
	},
    onThemeSwitch: function () {

        var chart;
		
	    if(this.lookupReference('chart'))chart = this.lookupReference('chart')  ;
	    if (this.lookupReference('chart2')) chart = this.lookupReference('chart2');
	    if (this.lookupReference('chart3')) chart = this.lookupReference('chart3');
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
            item.record.get('CODE_NM')  + ': ' +
            target.yValue.toFixed(1)  );
    },

    onBarTipRender: function (tooltip, record, item) {
        var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
            browser = item.series.getTitle()[fieldIndex];

        tooltip.setHtml(record.get('CODE_NM') + ': ' +
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

        tooltip.setHtml(record.get('CODE_NM') + ': ' +
            record.get(item.series.getYField()));
	},//return Ext.util.Format.number(layoutContext.renderer(label) / 1000, '0,000');
    onTooltipRender: function (tooltip, record, item) {
        var formatString = '0,000 ',
            fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
            sector = item.series.getTitle()[fieldIndex],
            value = Ext.util.Format.number(record.get(item.field), formatString);

        tooltip.setHtml(sector + ': ' + value);
    },
    onAxisRangeChange: function (axis, range) {
        //alert(range[1]);
        if (!range) {
            return;
        }
        // expand the range slightly to make sure markers aren't clipped
        if (range[1] < 50) {
            range[1] = 50;
        }
    }

});






Ext.define('Ysn.view.main.mainView2search',{
    extend: 'Ext.panel.Panel',
	xtype: 'mainView2-search',

    requires: [
        'Ysn.view.main.mainView2searchController', 
	    'Ysn.store.*'
    ],

    controller: 'mainView2-search', 

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
    id: 'mainView2-search',
    defaults: {
        layout: 'form',
        xtype: 'container',
        defaultType: 'textfield' 
    },

    items: [{
        items: [
				  {
					xtype: 'textfield',
					reference: 'user_nm',
					name: 'user_nm', 
					fieldLabel: Locale.getMsg('영업담당'),
					value: username,
					labelAlign: 'right'
				  }, { xtype: 'hiddenfield', name: 'user_cd', itemId: 'user_cd', reference: 'user_cd', value: loginUser }
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

Ext.define('Ysn.view.main.mainView2searchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainView2-search',
	init: function() {
	    var Today = new Date();
	  
     this.lookupReference('base_y').store.load();  
     this.lookupReference('base_y').setValue(Today.getFullYear()); 
	 this.lookupReference('base_m').store.load();  
	 this.lookupReference('base_m').setValue('0' + (Today.getMonth() + 1));

	 this.onSearch();
      


	// if (loginUser != 'Sysadmin') this.lookupReference('userGroup').setValue(loginUser);
	}, 
	 
	onSearch: function(){
	    Ext.getStore('mainView2').load(
            {
                params: { 
                    user_cd: this.lookupReference('user_cd').getValue(), 
                    base_yy: this.lookupReference('base_y').getValue(),
                    base_mm: this.lookupReference('base_m').getValue()
                }
            }
        );
	}


});

Ext.define('Ysn.view.main.mainView2',{
    extend: 'Ext.panel.Panel',
    xtype: 'main-mainView2',
    requires: [
        'Ysn.view.main.mainView2Controller',
		'Ext.chart.series.*',
		'Ext.chart.theme.Muted'
    ],

    controller: 'main-mainView2', 
    reference: 'mainmainView2',
	id:'mainmainView2',  
	scrollable:true,
    header: false,
    bodyBorder: true, 	
    bodyPadding: 20,
	dockedItems: [
	               {
		            header: false,
					xtype: 'mainView2-search',
					reference: 'mainView2Search',
					collapsible: true,
					scrollable: true,
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

	items: [
        {
            title: Locale.getMsg('Sample Status'),
            glyph: 'xf275@FontAwesome',
            xtype: 'form',
            itemId: 'pmain1',
            reference: 'pmain1',
            frameBorder: true,
            flex: 1,
            layout: {
                type: 'table',
                columns: 13,
                tableAttrs: {
                    style: {
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#BBBBBB',
                        'border-spacing': '1px'
                    }
                },
                tdAttrs: {
                    style: {
                        'vertical-align': 'middle',
                        'text-align': 'center',
                        'padding': '2px  !important',
                        backgroundColor: '#FFFFFF',
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
                        text: '(' + Locale.getMsg('Unit : Ea') + ')'
                    }
                ]
            },
            items: [
                { text: Locale.getMsg('Section'), rowspan: 2, tdAttrs: { style: { 'font-weight': 'bold', backgroundColor: '#EFEFEF' } } },
                { text: Locale.getMsg('Registration'), rowspan: 2, tdAttrs: { style: { 'font-weight': 'bold',  backgroundColor: '#EFEFEF' } } },
                { text: Locale.getMsg('Request Status'), colspan: 3, tdAttrs: { style: { 'font-weight': 'bold',  backgroundColor: '#EFEFEF' } } },
                { text: Locale.getMsg('Review Stage'), colspan: 2, tdAttrs: { style: { 'font-weight': 'bold',  backgroundColor: '#EFEFEF' } } },
                { text: Locale.getMsg('Production Stage'), tdAttrs: { style: { 'font-weight': 'bold',  backgroundColor: '#EFEFEF' } } },
                { text: Locale.getMsg('Shipment Stage'), colspan: 2, tdAttrs: { style: { 'font-weight': 'bold',  backgroundColor: '#EFEFEF' } } },
                { text: Locale.getMsg('Contract Stage'), colspan: 3, tdAttrs: { style: { 'font-weight': 'bold',  backgroundColor: '#EFEFEF' } } }, 
                { text: Locale.getMsg('Total'), tdAttrs: { style: { 'font-weight': 'bold',  backgroundColor: '#EFEFEF' } } },
                { text: Locale.getMsg('Reject'), tdAttrs: { style: { 'font-weight': 'bold', backgroundColor: '#EFEFEF' } } },
                { text: Locale.getMsg('Registration'), tdAttrs: { style: { 'font-weight': 'bold',  backgroundColor: '#EFEFEF' } } },
                { text: Locale.getMsg('Reject'), tdAttrs: { style: { 'font-weight': 'bold',  backgroundColor: '#EFEFEF' } } },
                { text: Locale.getMsg('Approval'), tdAttrs: { style: { 'font-weight': 'bold',  backgroundColor: '#EFEFEF' } } },
                { text: Locale.getMsg('In progres'), tdAttrs: { style: { 'font-weight': 'bold',  backgroundColor: '#EFEFEF' } } },
                { text: Locale.getMsg('Shipment'), tdAttrs: { style: { 'font-weight': 'bold',  backgroundColor: '#EFEFEF' } } },
                { text: Locale.getMsg('Receipt'), tdAttrs: { style: { 'font-weight': 'bold',  backgroundColor: '#EFEFEF' } } },
                { text: Locale.getMsg('Drop'), tdAttrs: { style: { 'font-weight': 'bold', backgroundColor: '#EFEFEF' } } },
                { text: Locale.getMsg('Production'), tdAttrs: { style: { 'font-weight': 'bold',  backgroundColor: '#EFEFEF' } } },
                { text: Locale.getMsg('Production Rate'), tdAttrs: { style: { 'font-weight': 'bold',  backgroundColor: '#EFEFEF' } } },
                { text: Locale.getMsg('Current Month'), tdAttrs: { style: { backgroundColor: '#EFEFEF' } } },
                { text: '0', itemId: 'T1_1' }, { text: '0', itemId: 'T1_2' }, { text: '0', itemId: 'T1_3' }, { text: '0', itemId: 'T1_4' }, 
                { text: '0', itemId: 'T1_5' }, { text: '0', itemId: 'T1_6' }, { text: '0', itemId: 'T1_7' }, { text: '0', itemId: 'T1_8' }, 
                { text: '0', itemId: 'T1_9' }, { text: '0', itemId: 'T1_10' }, { text: '0', itemId: 'T1_11' }, { text: '0', itemId: 'T1_12' },
                { text: Locale.getMsg('Total'), tdAttrs: { style: {  backgroundColor: '#EFEFEF' } } },
                { text: '0', itemId: 'T2_1' }, { text: '0', itemId: 'T2_2' }, { text: '0', itemId: 'T2_3' }, { text: '0', itemId: 'T2_4' },
                { text: '0', itemId: 'T2_5' }, { text: '0', itemId: 'T2_6' }, { text: '0', itemId: 'T2_7' }, { text: '0', itemId: 'T2_8' },
                { text: '0', itemId: 'T2_9' }, { text: '0', itemId: 'T2_10' }, { text: '0', itemId: 'T2_11' }, { text: '0', itemId: 'T2_12' }
            ]
        },
                  {
        xtype: 'container',
        flex: 2.5, 
        margin: '0 0 0 0',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [ 
             /*{
                 xtype: 'window',
                 
            ,*/

            
			{  
			    title: Locale.getMsg('Personal Sample Status'),
				glyph: 'xf275@FontAwesome',
				 
		        xtype: 'form',
		        reference: 'pmain2',
		        itemId: 'pmain2',
				frameBorder: true,
				margin: '20 0 0 0', 
				flex: 1, 
		        layout: {
					type: 'table',
					columns: 3,
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
                          '->'
                         
				    ]
				},
				items:[
					{ text: Locale.getMsg('Division'), tdAttrs: { style: { 'font-weight': 'bold', backgroundColor: '#EFEFEF' } } },
                    { text: Locale.getMsg('Current Month'), tdAttrs: { style: { 'font-weight': 'bold', backgroundColor: '#EFEFEF' } } },
				    { text: Locale.getMsg('Total'), tdAttrs: { style: { 'font-weight': 'bold', backgroundColor: '#EFEFEF' } } },
                    { text: Locale.getMsg('Request'), tdAttrs: { style: { backgroundColor: '#EFEFEF' } } },
					{ text: '0.0', itemId: 'T1_1' }, { text: '0.0', itemId: 'T1_2' },
                    { text: Locale.getMsg('Reject(Request)'), tdAttrs: { style: { backgroundColor: '#EFEFEF' } } },
					{ text: '0.0', itemId: 'T2_1' }, { text: '0.0', itemId: 'T2_2' },
                    { text: Locale.getMsg('Registration'), tdAttrs: { style: { backgroundColor: '#EFEFEF' } } },
					{ text: '0.0', itemId: 'T3_1' }, { text: '0.0', itemId: 'T3_2' },
                    { text: Locale.getMsg('Reject(Review)'), tdAttrs: { style: { backgroundColor: '#EFEFEF' } } },
					{ text: '0.0', itemId: 'T4_1' }, { text: '0.0', itemId: 'T4_2' },
                    { text: Locale.getMsg('Approval'), tdAttrs: { style: { backgroundColor: '#EFEFEF' } } },
					{ text: '0.0', itemId: 'T5_1' }, { text: '0.0', itemId: 'T5_2' },
                    { text: Locale.getMsg('In progress'), tdAttrs: { style: { backgroundColor: '#EFEFEF' } } },
					{ text: '0.0', itemId: 'T6_1' }, { text: '0.0', itemId: 'T6_2' },
                    { text: Locale.getMsg('Shipment'), tdAttrs: { style: { backgroundColor: '#EFEFEF' } } },
					{ text: '0.0', itemId: 'T7_1' }, { text: '0.0', itemId: 'T7_2' },
                    { text: Locale.getMsg('Receipt'), tdAttrs: { style: { backgroundColor: '#EFEFEF' } } },
					{ text: '0.0', itemId: 'T8_1' }, { text: '0.0', itemId: 'T8_2' },
                     { text: Locale.getMsg('Drop'), tdAttrs: { style: { backgroundColor: '#EFEFEF' } } },
					{ text: '0.0', itemId: 'T9_1' }, { text: '0.0', itemId: 'T9_2' },
                    { text: Locale.getMsg('Production'), tdAttrs: { style: { backgroundColor: '#EFEFEF' } } },
					{ text: '0.0', itemId: 'T10_1' }, { text: '0.0', itemId: 'T10_2' },
                    { text: Locale.getMsg('Production Rate'), tdAttrs: { style: { backgroundColor: '#EFEFEF' } } },
					{ text: '0.0', itemId: 'T11_1' }, { text: '0.0', itemId: 'T11_2' }
				] 
			},
            {
                xtype: 'container',
                flex: 3,
                margin: '20 0 0 0',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        title: Locale.getMsg('Montly Sample Production Status (Registration Vs Production)'),
                        glyph: 'xf080@FontAwesome',
                        margin: '0 0 0 20',
                        xtype: 'cartesian',
                        reference: 'chart',
                        itemId: 'chart',
                        flex: 1, 
                        theme: 'Muted',
                        store: {
                            fields: ['MONTH', 'REGIST', 'PRODUCT'],
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
                                   // if (!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
                                }
                            },
                            autoLoad: true,
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
                            fields: ['REGIST', 'PRODUCT'],
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
                            title: [Locale.getMsg('Registration'), Locale.getMsg('Production')],
                            xField: 'MONTH',
                            yField: ['REGIST', 'PRODUCT'],
                            stacked: false,
                            highlight: true,
                            tooltip: {
                                renderer: 'onBarTipRender'
                            }
                        }]
                    }, {
                        xtype: 'container',
                        flex: 1,
                        margin: '20 0 0 0',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                title: Locale.getMsg('Current Month Status'),
                                glyph: 'xf200@FontAwesome',
                                flex: 1,
                                margin: '0 20 0 20',
                                xtype: 'polar',
                                reference: 'chart2',
                                itemId: 'chart2',
                                theme: 'default-gradients', 
                                insetPadding: { top: 20, left: 20, right: 20, bottom: 20 },
                                store: {
                                    fields: ['NAME', 'Y'],
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
                                         //   if (!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
                                        }
                                    },
                                    autoLoad: true,
                                    autoDestroy: true
                                },
                                legend: {
                                    docked: 'bottom'
                                },
                                interactions: ['rotate'], 
                                series: [{
                                    type: 'pie',
                                    angleField: 'Y',
                                    label: {
                                        field: 'NAME',
                                        calloutLine: {
                                            length: 60,
                                            width: 3
                                            // specifying 'color' is also possible here
                                        }
                                    },
                                    highlight: true,
                                    tooltip: {
                                        trackMouse: true,
                                        renderer: 'onSeriesTooltipRender'
                                    }
                                }]
                            },
                            {
                                title: Locale.getMsg('Total Status (Individual)'),
                                glyph: 'xf200@FontAwesome',
                                flex: 1,
                                margin: '0 20 0 0',
                                xtype: 'polar',
                                reference: 'chart3',
                                itemId: 'chart3',
                                theme: 'default-gradients',
                                insetPadding: { top: 20, left: 20, right: 20, bottom: 20 },
                                store: {
                                    fields: ['NAME', 'Y'],
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
                                           // if (!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
                                        }
                                    },
                                    autoLoad: true,
                                    autoDestroy: true
                                },
                                legend: {
                                    docked: 'bottom'
                                },
                                interactions: ['rotate'],
                                series: [{
                                    type: 'pie',
                                    angleField: 'Y',
                                    label: {
                                        field: 'NAME',
                                        calloutLine: {
                                            length: 60,
                                            width: 3
                                            // specifying 'color' is also possible here
                                        }
                                    },
                                    highlight: true,
                                    tooltip: {
                                        trackMouse: true,
                                        renderer: 'onSeriesTooltipRender'
                                    }
                                }]
                            },
                            {
                                title: Locale.getMsg('Total Status (Overall)'),
                                glyph: 'xf200@FontAwesome',
                                margin: '0 0 0 0',
                                xtype: 'polar',
                                flex: 1,
                                reference: 'chart4',
                                itemId: 'chart4',
                                theme: 'default-gradients', 
                                insetPadding: { top: 20, left: 20, right: 20, bottom: 20 },
                                store: {
                                    fields: ['NAME', 'Y'],
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
                                          //  if (!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
                                        }
                                    },
                                    autoLoad: true,
                                    autoDestroy: true
                                },
                                legend: {
                                    docked: 'bottom'
                                },
                                interactions: ['rotate'], 
                                series: [{
                                    type: 'pie',
                                    angleField: 'Y',
                                    label: {
                                        field: 'NAME',
                                        calloutLine: {
                                            length: 60,
                                            width: 3
                                            // specifying 'color' is also possible here
                                        }
                                    },
                                    highlight: true,
                                    tooltip: {
                                        trackMouse: true,
                                        renderer: 'onSeriesTooltipRender'
                                    }
                                }]

                            }
                        ]
                    }
                ]
            }
            
		]
    }]




	
});

Ext.define('Ysn.view.main.mainView2Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-mainView2',
	requires: [ 
    ],
	init: function () {
	   
	    //  alert
	    
	/*	this.onChart1();
		this.onChart2();
		this.getT1_info(); 
		this.getT3_info();
		this.getT4_info1();
		this.getT4_info2();*/
	}, 
	changeDec: function (value) {
	    return Ysn.Util.changeDec(value);
	},
	changeDbl: function (value) {
	    return Ysn.Util.changeDbl(value);
	},
	onSeriesTooltipRender: function (tooltip, record, item) {
	    tooltip.setHtml(record.get('NAME') + ': ' + record.get('Y') + '%');
	},
    onEditTipRender: function (tooltip, item, target, e) {
    var fieldIndex = Ext.Array.indexOf(item.series.getYField(), target.yField),
        browser = item.series.getTitle()[fieldIndex];

    tooltip.setHtml(
        Locale.getMsg(item.record.get('MONTH')+'월') + ' ' + browser +': ' +
        target.yValue.toFixed(1)  );
    },

    onBarTipRender: function (tooltip, record, item) {
        var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
            browser = item.series.getTitle()[fieldIndex];

        tooltip.setHtml(Locale.getMsg(item.record.get('MONTH') + '월') + ' ' +browser + ': ' +
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
    onSeriesTooltipRender2: function (tooltip, record, item) {
        var title = item.series.getTitle();

        tooltip.setHtml(Locale.getMsg(item.record.get('MONTH') + '월') + ' ' + title + ': ' +
            record.get(item.series.getYField()));
    }//return Ext.util.Format.number(layoutContext.renderer(label) / 1000, '0,000');
	

});






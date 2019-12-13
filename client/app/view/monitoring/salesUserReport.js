Ext.define('Ysn.view.monitoring.salesUserReportsearch', {
    extend: 'Ext.panel.Panel',
    xtype: 'salesUserReport-search',

    requires: [
        'Ysn.view.monitoring.salesUserReportsearchController' 
    ],

    controller: 'salesUserReport-search',

    frame: false,
    //resizable: true,
    width: 800,
    minWidth: 700,
    minHeight: 55,
    frameBorder: 10,
    layout: {
        type: 'table',
        columns: 8,
        tableAttrs: {
            style: {
                //width: '100%'
            }
        }

    },
    id: 'salesUserReport-search',
    defaults: {
        layout: 'form',
        xtype: 'container',
        defaultType: 'textfield'
    },

    items: [
        {
            xtype: 'combobox',
            reference: 'sales_type',
            itemId: 'sales_type',
            publishes: 'value',
            fieldLabel: '당월/누계',
            labelAlign: 'right',
            displayField: 'name',
            valueField: 'code',
            name: 'sales_type',
            margin: '5 0 0 0',
            anchor: '-15',
            store: {
                fields: ['name', 'code'],
                data: [{ name: Locale.getMsg('당월'), code: '당월' },
                       { name: Locale.getMsg('누계'), code: '누계' }
                       ],
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
            width: 190,
            queryMode: 'local'
        }, {
            xtype: 'combobox',
            reference: 'sales_base',
            itemId: 'sales_base',
            publishes: 'value',
            fieldLabel: Locale.getMsg('매출기준'),
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            displayField: 'name',
            valueField: 'name2',
            name: 'sales_base',
            margin: '5 0 0 0',
            anchor: '-15',
            store: {
                fields: ['name', 'name2'],
                data: [{ name: '거래명세표', name2: Locale.getMsg('거래명세표') }, { name: '세금계산서', name2: Locale.getMsg('세금계산서') }],
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
            queryMode: 'local'
        },{
            xtype: 'fieldcontainer',
            combineErrors: true,
            layout: 'hbox',
            fieldLabel: Locale.getMsg('기준년월'),
            labelAlign: 'right',
            labelWidth: 60,
            margin: '5 0 0 0',
            defaults: {
                //flex: 1,
                hideLabel: true
            },
            items: [{
                xtype: 'combobox',
                reference: 'year',
                publishes: 'value',
                width: 95,
                labelAlign: 'right',
                displayField: 'YEAR',
                valueField: 'VAL',
                name: 'year',
                itemId: 'year',
                maskOnDisable: true,
                anchor: '-15',
                store: {
                    type: 'year'
                },
                minChars: 0,
                queryMode: 'local',
                margin: '0 5 0 0'
            }, {
                xtype: 'combobox',
                reference: 'month',
                publishes: 'value',
                labelAlign: 'right',
                width: 70,
                displayField: 'MONTH',
                valueField: 'VAL',
                name: 'month',
                itemId: 'month',
                maskOnDisable: true,
                anchor: '-15',
                store: {
                    type: 'month'
                },
                minChars: 0,
                queryMode: 'local',
                margin: '0 5 0 0'
            }
            ]
        }, {
            xtype: 'button',
            text: Locale.getMsg('검색'),
            height: 30,
            width: 60,
            margin: '5 0 0 0',
            listeners: {
                click: 'onSearch'
            }
        }
    ]
});

Ext.define('Ysn.view.monitoring.salesUserReportsearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salesUserReport-search',
    init: function () {
        var Today = new Date(); 
        this.lookupReference('sales_type').setValue(this.lookupReference('sales_type').getStore().getAt(0).get('code'));
        this.lookupReference('sales_base').setValue(this.lookupReference('sales_base').getStore().getAt(0).get('name'));
        this.lookupReference('year').store.load();
        this.lookupReference('year').setValue(Today.getFullYear());
        this.lookupReference('month').store.load();
        this.lookupReference('month').setValue('0' + (Today.getMonth() + 1));
        if (auth_id != 'A001') {
            this.lookupReference('bizGroup').setConfig({ 'readOnly': true });
            if (dept_level == '4') this.lookupReference('deptGroup').setConfig({ 'readOnly': true });
        }
        // if (loginUser != 'Sysadmin') this.lookupReference('userGroup').setValue(loginUser); 
    },
    onChangeBiz: function (el, newVal, oldVal, e) {
        var deptCombo = this.lookupReference('deptGroup');
        if (newVal != '') {
            deptCombo.store.load({params:{up_dept_cd:newVal}}); 
				 
        } else {
            deptCombo.setValue(''); 
            deptCombo.store.removeAll(); 
            deptCombo.store.insert(0, {DEPT_CD: '',DEPT_NM: Locale.getMsg('전체')});  			
        }
        if (newVal != '') {
            deptCombo.setValue(Ysn.Util.chkDept(false)); 
        } 
        deptCombo.doQuery();
        el.focus();

    },
    onSearch: function () { 
        var fn = Ext.getCmp('monitoringsalesUserReport').getController('monitoring-salesUserReport');
        fn.getChart();
        fn.getChart2(); 
         
    }


});

Ext.define('Ysn.view.monitoring.salesUserReport', {
    extend: 'Ext.panel.Panel',
    xtype: 'monitoring-salesUserReport',
    requires: [
        'Ysn.view.monitoring.salesUserReportController',
		'Ext.chart.series.*',
		'Ext.chart.theme.Muted'
    ],

    controller: 'monitoring-salesUserReport',
    reference: 'monitoringsalesUserReport',
    id: 'monitoringsalesUserReport',
    overflow: 'hidden',
    scrollable: false,
    header: false,
    bodyBorder: true,
    bodyPadding: 20,
    dockedItems: [
	               {
	                   header: false,
	                   xtype: 'salesUserReport-search',
	                   reference: 'salesUserReportSearch',
	                   collapsible: true,
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
                        {
                            title: '국내영업팀',
                            glyph: 'xf03a@FontAwesome',
                            scrollable: true,
                            flex: 1,
                            frameBorder: true,
                            xtype: 'cartesian',
                            reference: 'chart',
                            flipXY: true,
                            itemId: 'chart',
                            theme: 'Muted',
                            store: {
                                fields: ['USER_CD', 'USER_NM', 'AMOUNT'],

                                proxy: {
                                    method: "POST",
                                    type: 'ajax',
                                    url: '/Monitoring/salesUserReportList',
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
                            interactions: {
                                type: 'itemedit',
                                tooltip: {
                                    renderer: 'onEditTipRender'
                                }
                            },
                            insetPadding: { top: 20, left: 20, right: 20, bottom: 20 },
                            axes: [{
                                type: 'numeric3d',
                                position: 'bottom', 
                                renderer: 'onAxisLabelRender',
                                adjustByMajorUnit: true,
                                grid: true,
                                //maximum: 100,
                                minimum: 0
                            }, {
                                type: 'category3d',
                                position: 'left',
                                fields: 'USER_NM',
                                grid: true
                            }],
                            legend: {
                                docked: 'bottom'
                            },
                            series: [{
                                type: 'bar3d',
                                title: [Locale.getMsg('달성률')],
                                xField: 'USER_NM',
                                yField: ['AMOUNT'],
                                stacked: true,
                                style: {
                                    // minGapWidth: 10
                                },
                                highlight: true,
                                label: {
			                        field: 'AMOUNT',
			                        display: 'insideEnd',
			                        renderer: 'onSeriesLabelRender'
			                    },
                                tooltip: {
                                    trackMouse: true,
                                    renderer: 'onSeriesTooltipRender'
                                }
                            }]

                        }
                    ]

                },
                {
                    xtype: 'container',
                    flex: 1,
                    margin: '0 0 0 30',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
			            {
			                title: '해외영업팀',
			                glyph: 'xf03a@FontAwesome',
			                scrollable: true,
			                flex: 1,
			                frameBorder: true,
			                xtype: 'cartesian',
			                reference: 'chart2',
			                flipXY: true,
			                itemId: 'chart2',
			                theme: 'Muted',
			                store: {
			                    fields: ['USER_CD', 'USER_NM', 'AMOUNT'],

			                    proxy: {
			                        method: "POST",
			                        type: 'ajax',
			                        url: '/Monitoring/salesUserReportList',
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
			                interactions: {
			                    type: 'itemedit',
			                    tooltip: {
			                        renderer: 'onEditTipRender'
			                    }
			                },
			                insetPadding: { top: 20, left: 20, right: 20, bottom: 20 },
			                axes: [{
			                    type: 'numeric3d',
			                    position: 'bottom',
			                    adjustByMajorUnit: true,
			                    fields: 'AMOUNT',
			                    grid: true,
			                    renderer: 'onAxisLabelRender',
			                    //maximum: 100,
			                    minimum: 0
			                }, {
			                    type: 'category3d',
			                    position: 'left',
			                    fields: 'USER_NM',
			                    grid: true
			                }],
			                legend: {
			                    docked: 'bottom'
			                },
			                series: [{
			                    type: 'bar3d',
			                    title: Locale.getMsg('달성률'),
			                    xField: 'USER_NM',
			                    yField: 'AMOUNT',
			                    stacked: true,
			                    style: {
			                        // minGapWidth: 10
			                    },
			                    highlight: true,
			                    label: {
			                        field: 'AMOUNT',
			                        display: 'insideEnd',
			                        renderer: 'onSeriesLabelRender'
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





});



Ext.define('Ysn.view.monitoring.salesUserReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.monitoring-salesUserReport',
    requires: [
    ],
    init: function () {
        // this.lookupReference('salesUserReportSearch').getController('salesUserReport-search').onSearch();
        this.getChart();
        this.getChart2();
    },

    getChart: function () {
        var pl = this.lookupReference('salesUserReportSearch');
         
        this.lookupReference('chart').getStore().load({
            params: {
                sales_type: pl.down('#sales_type').getValue(),
                bizGroup: '3', 
                year: pl.down('#year').getValue(),
                sales_base: pl.down('#sales_base').getValue(),
                month: pl.down('#month').getValue(),

            }
        }); 
    },
    getChart2: function () {
        var pl = this.lookupReference('salesUserReportSearch');

        this.lookupReference('chart2').getStore().load({
            params: {
                sales_type: pl.down('#sales_type').getValue(),
                bizGroup: '4',
                year: pl.down('#year').getValue(),
                sales_base: pl.down('#sales_base').getValue(),
                month: pl.down('#month').getValue(),

            }
        });
    },

    onPreview: function () {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart;

        if (this.lookupReference('chart')) chart = this.lookupReference('chart');
        if (this.lookupReference('chart2')) chart = this.lookupReference('chart2');
        chart.preview();
    },
    onSeriesLabelRender: function (v) {
        return Ext.util.Format.number(v, '0,000');
    },
    onThemeSwitch: function () {

        var chart;

        if (this.lookupReference('chart')) chart = this.lookupReference('chart');
        if (this.lookupReference('chart2')) chart = this.lookupReference('chart2');
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
            item.record.get('MONTH') + '월 ' + browser + ': ' +
            target.yValue.toFixed(1));
    },

    onBarTipRender: function (tooltip, record, item) {
        var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
            browser = item.series.getTitle()[fieldIndex];

        tooltip.setHtml(record.get('MONTH') + '월 ' + browser + ': ' +
            record.get(item.field));
    },

    onGridMonthRender: function (value) {
        return value;
    },

    onGridValueRender: function (value) {
        return Ysn.Util.YWnumberFm(value, true);
    },

    onSeriesRender: function (sprite, config, data, index) {
        /*var isNegative = data.store.getAt(index).get('TOTAL') < 0;

        if (isNegative) {
            return {
                fillStyle: '#974144' // dark red
            };
        } else {

        }*/

    },

    onAxisLabelRender: function (axis, label, layoutContext) {
        //return Ysn.Util.YWnumberFm(layoutContext.renderer(label),false) ;
        return layoutContext.renderer(label);
    },
    onSeriesTooltipRender: function (tooltip, record, item) {
        var title = item.series.getTitle();

        tooltip.setHtml(title + ': ' +
            record.get(item.series.getYField()) + '%');
    },
    onSeriesTooltipRender2: function (tooltip, record, item) {
        var title = item.series.getTitle();
        tooltip.setHtml(record.get('MONTH') + '월 ' + title + ': ' +
         Ysn.Util.YWnumberFm2(record.get(item.series.getYField()), 1) + '억');
    }

});






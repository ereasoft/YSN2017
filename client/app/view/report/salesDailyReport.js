Ext.define('Ysn.view.report.salesDailyreportsearch', {
    extend: 'Ext.panel.Panel',
    xtype: 'salesDailyreport-search',

    requires: [
        'Ysn.view.report.salesDailyreportsearchController' 
    ],

    controller: 'salesDailyreport-search',

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
    id: 'salesDailyreport-search',
    defaults: {
        layout: 'form',
        xtype: 'container',
        defaultType: 'textfield'
    },

    items: [
        {
             
            labelAlign: 'left',
            xtype: 'label',
            text: '(단위:백만원)',
            labelWidth: 30,
            margin: '20 20 20 10', 
            width: 210,
        },
       {
           fieldLabel: Locale.getMsg('기준일'),
           labelAlign: 'right',
           labelWidth: 80,
           width: 210,
           xtype: 'datefield',
           name: 'edate', 
           reference : 'edate',
           itemId : 'edate',
           format: 'Y-m-d',
           value: Ext.Date.add(new Date(), Ext.Date.DAY, -1),
           maxValue: Ext.Date.add(new Date(), Ext.Date.DAY, -1),
           minValue: '2017-08-10',
           margin: '5 5 0 0' 
       }, {
           xtype: 'hiddenfield',
           reference: 'sdate',
           name: 'sdate',
           itemId: 'sdate'
       }, {
           xtype: 'button',
           text: Locale.getMsg('검색'),
           height: 30,
           width: 60,
           margin: '5 20 0 0',
           listeners: {
               click: 'onSearch'
           }
       }, {
           xtype: 'button',
           iconCls: 'x-fa fa-file-excel-o',
           text: Locale.getMsg('액셀변환'),
           height: 30,
           width: 100,
           margin: '5 0 0 0',
           handler: 'xlsExport'
       }
    ]
});

Ext.define('Ysn.view.report.salesDailyreportsearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salesDailyreport-search', 
    init: function () { 
        //this.lookupReference('sdate').setValue(Today.getFullYear() + '-' + ('0' + (Today.getMonth() + 1)).slice(-2) + '-' + '01'); 
       /* if (sa_yn == 'Y') {
            this.lookupReference('bizGroup').setConfig({ 'readOnly': true });
            if (dept_level == '4') this.lookupReference('deptGroup').setConfig({ 'readOnly': true });
        }*/
        // if (loginUser != 'Sysadmin') this.lookupReference('userGroup').setValue(loginUser); 
    }, 
    onSearch: function () { 
        var pl = Ext.getCmp('reportsalesDailyreport');
        var sh = this;
        pl.lookupReference('list1').getStore().load(
            {
                params: { 
                    preday: Ext.Date.format(Ext.Date.add(this.lookupReference('edate').getValue(), Ext.Date.DAY, -1), 'Ymd'),
                    nowyymm: Ext.Date.format(this.lookupReference('edate').getValue(), 'Ym'),
                    nextyymm: Ext.Date.format(Ext.Date.add(this.lookupReference('edate').getValue(), Ext.Date.MONTH, 1), 'Ym'),
                },
                callback: function (records, operation, success) {
                    var col = pl.getController('report-salesDailyreport').changeColumns(sh.lookupReference('edate').getValue());
                    pl.lookupReference('list1').reconfigure(col);

                }
            }
        );

    },
    xlsExport: function () {
        var pl = Ext.getCmp('reportsalesDailyreport');  
        pl.lookupReference('list1').saveDocumentAs({
        headerRowCnt: 3,
        type: 'xlsx',
        title: pl.lookupReference('salesDailyreportSearch').getTitle(),
        fileName: Locale.getMsg('유통구조별수주진척상황')
    });
}

});



Ext.define('Ysn.view.report.salesDailyreport', {
    extend: 'Ext.panel.Panel',
    xtype: 'report-salesDailyreport',
    requires: [
        'Ysn.view.report.salesDailyreportController',
		'Ext.chart.series.*',
		'Ext.chart.theme.Muted'
    ],

    controller: 'report-salesDailyreport',
    reference: 'reportsalesDailyreport',
    id: 'reportsalesDailyreport',
    overflow: 'hidden',
    scrollable: false,
    header: false,
    bodyBorder: true,
    //bodyPadding: 20,
    dockedItems: [
	               {
	                   title: Locale.getMsg('유통구조별 수주 진척상황'),
	                   xtype: 'salesDailyreport-search',
	                   reference: 'salesDailyreportSearch',
	                   collapsible: true,
	                   floatable: true,
	                   split: true,
	                   dock: 'top',
	                   height: 90
	               }
    ],
   /* tbar: {

        overflowHandler: 'menu',
        style: { 'border-top-width': '1px !important;' },
        items: [
        {
            xtype: 'label',
            itemId: 'total',
            text: 'Total : 0',
            style: { 'font-weight': 'bold' }
        },

              '->',

        {
            xtype: 'button',
            iconCls: 'x-fa fa-file-excel-o',
            text: Locale.getMsg('액셀변환'),
            handler: 'xlsExport'
        }/*, {
		        xtype: 'button',
		        iconCls: 'x-fa fa-plus-square',
		        text: Locale.getMsg('신규등록'),
		        handler: 'frmClear'
		    }] 
    }, */
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
                            header: false,
                            //title: Locale.getMsg('유통구조별 수주 진척상황'),
                            //glyph: 'xf00b@FontAwesome',
                            /*tools: [
					            { iconCls: 'x-fa fa-file-excel-o', handler: 'xlsExport1' }
                            ],*/
                            reference: 'list1',
                            itemId: 'list1',
                            scrollable: true, 
                            xtype: 'grid',
                            flex: 1,
                            store: {
                                fields:[ 
                                    { name: 'UP_DEPT_NM', type: 'string' }, 
                                    { name: 'DSTR_TYPE', type: 'string' },
                                    { name: 'DSTR_TYPE_NM', type: 'string' },
                                    { name: 'NOW_BASE_AMOUNT_TUBE', type: 'int' },
                                    { name: 'NOW_BASE_AMOUNT_PUMP', type: 'int' },
                                    { name: 'NOW_BASE_AMOUNT_SUM', type: 'int' },
                                    { name: 'NOW_TOT_AMOUNT_TUBE', type: 'int' },
                                    { name: 'NOW_TOT_AMOUNT_PUMP', type: 'int' },
                                    { name: 'NOW_TOT_AMOUNT_SUM', type: 'int' },
                                    { name: 'NOW_AMOUNT_TUBE1', type: 'int' },
                                    { name: 'NOW_AMOUNT_PUMP1', type: 'int' },
                                    { name: 'NOW_AMOUNT_SUM1', type: 'int' },
                                    { name: 'NOW_AMOUNT_TUBE2', type: 'int' },
                                    { name: 'NOW_AMOUNT_PUMP2', type: 'int' },
                                    { name: 'NOW_AMOUNT_SUM2', type: 'int' },
                                    { name: 'NOW_AMOUNT_PERCENT2', type: 'int' },
                                    { name: 'NEXT_BASE_AMOUNT_TUBE', type: 'int' },
                                    { name: 'NEXT_BASE_AMOUNT_PUMP', type: 'int' },
                                    { name: 'NEXT_BASE_AMOUNT_SUM', type: 'int' },
                                    { name: 'NEXT_TOT_AMOUNT_TUBE', type: 'int' },
                                    { name: 'NEXT_TOT_AMOUNT_PUMP', type: 'int' },
                                    { name: 'NEXT_TOT_AMOUNT_SUM', type: 'int' },
                                    { name: 'NEXT_TOT_AMOUNT_PERCENT', type: 'int' },
                                    { name: 'DIFF_DAY_SUM', type: 'int' },
                                    { name: 'DIFF_MONTH_SUM', type: 'int' }

                                ],
                                groupField: 'UP_DEPT_NM',
                                proxy: {
                                    method: "POST",
                                    type: 'ajax',
                                    url: '/DaliyInfo/salesDailyList',
                                    reader: {
                                        type: 'json',
                                        rootProperty: 'LIST'
                                    }
                                }, 
                                autoLoad: false,
                                autoDestroy: true,
                                listeners: {
                                    load: function (store, records, successful, operation) { 
                                        Ext.getCmp('reportChart').getStore().loadRawData(store.data.items);
                                    }
                                }
                            },
                             plugins: ['pmh-grid-exporter'],
                            //plugins: ['gridexporter'],
                            features: [{
                                ftype: 'summary',
                                dock: 'bottom'
                            }, {
                                id: 'group',
                                ftype: 'groupingsummary',
                                groupHeaderTpl: '{name}',
                                hideGroupedHeader: true,
                                enableGroupingMenu: true
                            }

                            ],
                            style: { 'borderBottom': '1px solid gray' }, 
                            columnLines: true, 
                            scrollable: true,
                            syncRowHeight: false
                        },
                        {
                            header: false,
                            xtype: 'cartesian',
                            reference: 'chart',
                            id:'reportChart',
                            height:200,
                            margin: '20 0 0 0',
                            theme: 'Muted',
                            store:  {
                                fields: [
                                    { name: 'UP_DEPT_NM', type: 'string' },
                                    { name: 'DSTR_TYPE', type: 'string' },
                                    { name: 'DSTR_TYPE_NM', type: 'string' },
                                    { name: 'NOW_AMOUNT_PERCENT2', type: 'int' }, 
                                    { name: 'NEXT_TOT_AMOUNT_PERCENT', type: 'int' }

                                ],
                                sorters: [{
                                    property: 'UP_DEPT_NM',
                                    direction: 'DESC'
                                },{
                                    property: 'DSTR_TYPE',
                                    direction: 'DESC'
                                }],
                                proxy: { 
                                    type: 'memory', 
                                    reader: {
                                        type: 'json',
                                        rootProperty: ''
                                    }
                                }, 
                                autoLoad: false,
                                autoDestroy: true,
                                listeners: {
                                    load: function (store, records, successful, operation) { 
                                        //   pl = Ext.getCmp('reportsalesDailyreport');
                                        //  pl.lookupReference('list1').unmask(); 
                                    }
                                }
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
                            insetPadding: { top: 5, left: 5, right: 5, bottom: 5 },
                            axes: [{
                                type: 'numeric3d',
                                position: 'left', 
                                grid: true,
                                fields: ['NOW_AMOUNT_PERCENT2', 'NEXT_TOT_AMOUNT_PERCENT'],
                                renderer: 'onAxisLabelRender',
                                maximum: 120,
                                minimum: 0
                            }, {
                                type: 'category3d',
                                position: 'bottom',
                                renderer: 'onAxisLabelRender2',
                                grid: true,
                                fields: ['DSTR_TYPE']
                            }],
                            series: [{
                                type: 'bar3d',
                                title: [Locale.getMsg('당월'), Locale.getMsg('익월')],
                                xField: 'DSTR_TYPE',
                                yField: ['NOW_AMOUNT_PERCENT2', 'NEXT_TOT_AMOUNT_PERCENT'],
                                stacked: false,
                                highlight: true,
                                tooltip: {
                                    renderer: 'onBarTipRender'
                                }
                            }]

                        }
                        
                    ]

                }
    ]





});



Ext.define('Ysn.view.report.salesDailyreportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.report-salesDailyreport',
    requires: [
    ],
    init: function () {
        var day = this.lookupReference('salesDailyreportSearch').lookupReference('edate').getValue();
        var col = this.changeColumns(day);
        this.lookupReference('list1').reconfigure(col);
        //this.lookupReference('salesDailyreportSearch').getController('salesDailyreport-search').onSearch();
    },
    changeDec: function (value) {
        return Ysn.Util.changeDec(value/1000000);
    },
    changeDbl: function (value) {
        return Ysn.Util.changeDbl(value/1000000);
    },
    changePcnt: function (value) {
        return (value*1000000) + '%';
    },
    changeColumns: function () {
        var day = this.lookupReference('salesDailyreportSearch').lookupReference('edate').getValue();
        var nextMM = Ext.Date.format(Ext.Date.add(day, Ext.Date.MONTH, 1), 'Y-m');
        var nowMM = Ext.Date.format(day, 'Y-m'); 

        var columns = [
            { text: Locale.getMsg('영업팀'), width: 80, dataIndex: 'UP_DEPT_NM',  hidden: true },
            {
                text: Locale.getMsg('구분'), width:100, dataIndex: 'DSTR_TYPE_NM', summaryRenderer: function (value, summaryData, dataIndex) {
                    return ('합계');
                },
            },
            {
                text: nowMM,
                columns: [ 
                    {
                        text: '매출목표', style: 'text-align:center',
                        columns: [
                            { text: 'Pump', width: 60, dataIndex: 'NOW_BASE_AMOUNT_PUMP', renderer: 'changeDec', summaryType: 'sum', summaryRenderer: 'changeDec' },
                            { text: 'Tube', width: 60, dataIndex: 'NOW_BASE_AMOUNT_TUBE', renderer: 'changeDec', summaryType: 'sum', summaryRenderer: 'changeDec' },
                            { text: '합계', width: 80, dataIndex: 'NOW_BASE_AMOUNT_SUM', renderer: 'changeDec', summaryType: 'sum', summaryRenderer: 'changeDec' }
                        ]
                    },
                    {
                        text: '수주합계(A+B)',
                        columns: [
                            { text: 'Pump', width: 80, dataIndex: 'NOW_TOT_AMOUNT_PUMP', renderer: 'changeDec', summaryType: 'sum', summaryRenderer: 'changeDec' },
                            { text: 'Tube', width: 80, dataIndex: 'NOW_TOT_AMOUNT_TUBE', renderer: 'changeDec', summaryType: 'sum', summaryRenderer: 'changeDec' },
                            { text: '합계', width: 80, dataIndex: 'NOW_TOT_AMOUNT_SUM', renderer: 'changeDec', summaryType: 'sum', summaryRenderer: 'changeDec' }
                        ]
                    },
                    {
                        text: '이월수주(A)',
                        columns: [
                            { text: 'Pump', width: 80, dataIndex: 'NOW_AMOUNT_PUMP1', renderer: 'changeDec', summaryType: 'sum', summaryRenderer: 'changeDec' },
                            { text: 'Tube', width: 80, dataIndex: 'NOW_AMOUNT_TUBE1', renderer: 'changeDec', summaryType: 'sum', summaryRenderer: 'changeDec' },
                            { text: '합계', width: 80, dataIndex: 'NOW_AMOUNT_SUM1', renderer: 'changeDec', summaryType: 'sum', summaryRenderer: 'changeDec' }
                        ]
                    },
                    {
                        text: '순수수주(B)',
                        columns: [
                            { text: 'Pump', width: 60, dataIndex: 'NOW_AMOUNT_PUMP2', renderer: 'changeDec', summaryType: 'sum', summaryRenderer: 'changeDec' },
                            { text: 'Tube', width: 60, dataIndex: 'NOW_AMOUNT_TUBE2', renderer: 'changeDec', summaryType: 'sum', summaryRenderer: 'changeDec' },
                            { text: '합계', width: 80, dataIndex: 'NOW_AMOUNT_SUM2', renderer: 'changeDec', summaryType: 'sum', summaryRenderer: 'changeDec' },
                            { text: '진척율', width: 60, dataIndex: 'NOW_AMOUNT_PERCENT2', renderer: 'changePcnt' }
                        ]
                    }
                ]
            },
             {
                 text: nextMM,
                 columns: [
                     {
                         text: '매출목표',
                         columns: [
                             { text: 'Pump', width: 60, dataIndex: 'NEXT_BASE_AMOUNT_PUMP', renderer: 'changeDec', summaryType: 'sum', summaryRenderer: 'changeDec' },
                             { text: 'Tube', width: 60, dataIndex: 'NEXT_BASE_AMOUNT_TUBE', renderer: 'changeDec', summaryType: 'sum', summaryRenderer: 'changeDec' },
                             { text: '합계', width: 80, dataIndex: 'NEXT_BASE_AMOUNT_SUM', renderer: 'changeDec', summaryType: 'sum', summaryRenderer: 'changeDec' }
                         ]
                     }, 
                     {
                         text: '수주합계',
                         columns: [
                             { text: 'Pump', width: 60, dataIndex: 'NEXT_TOT_AMOUNT_PUMP', renderer: 'changeDec', summaryType: 'sum', summaryRenderer: 'changeDec' },
                             { text: 'Tube', width: 60, dataIndex: 'NEXT_TOT_AMOUNT_TUBE', renderer: 'changeDec', summaryType: 'sum', summaryRenderer: 'changeDec' },
                             { text: '합계', width: 80, dataIndex: 'NEXT_TOT_AMOUNT_SUM', renderer: 'changeDec', summaryType: 'sum', summaryRenderer: 'changeDec' },
                             { text: '진척율', width: 60, dataIndex: 'NEXT_TOT_AMOUNT_PERCENT', renderer: 'changePcnt', summaryType: 'sum', summaryRenderer: 'changeDec' }
                         ]
                     }
                 ]
             },
            {
                text: '전일대비',
                columns: [
                    { text: '순수수주', width: 80, dataIndex: 'DIFF_DAY_SUM', renderer: 'changeDec', summaryType: 'sum', summaryRenderer: 'changeDec' },
                    { text: '익월수주', width: 80, dataIndex: 'DIFF_MONTH_SUM', renderer: 'changeDec', summaryType: 'sum', summaryRenderer: 'changeDec' }
                ]
            }
        ];
        return columns;
    },
    xlsExport1: function () { 
        this.lookupReference('list1').saveDocumentAs({
			headerRowCnt: 3,
        type: 'xlsx',
        title: this.lookupReference('list1').getTitle(),
        fileName: this.lookupReference('list1').getTitle()
    });
    },
    onEditTipRender: function (tooltip, item, target, e) {
        var fieldIndex = Ext.Array.indexOf(item.series.getYField(), target.yField),
            browser = item.series.getTitle()[fieldIndex];

        tooltip.setHtml(
            item.record.get('DSTR_TYPE_NM') + ' ' + browser + ': ' +
            target.yValue.toFixed(1) + '%');
    },

    onBarTipRender: function (tooltip, record, item) {
        var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
            browser = item.series.getTitle()[fieldIndex];

        tooltip.setHtml(record.get('DSTR_TYPE_NM') + ' ' + browser + ': ' +
            record.get(item.field) + '%');
    },

    onGridMonthRender: function (value) {
        return value;
    },

    onGridValueRender: function (value) {
        return Ysn.Util.YWnumberFm(value, true);
    },

    onAxisLabelRender2: function (axis, label, layoutContext) {
        var lb = label;
        switch (label) {
            case '8004001':
                lb = 'AP';
                break;
            case '8004002':
                lb = 'CM';
                break;
            case '8004003':
                lb = ' LG';
                break;
            case '8004004':
                lb = '미주';
                break;
            case '8004005':
                lb = '유럽';
                break;
            case '8004006':
                lb = '아시아';
                break;
            case '8004007':
                lb = 'AP_기타';
                break;
            case '8004008':
                lb = 'LG_기타';
                break;
            case '8004009':
                lb = '국내아시아';
                break;
            case '8004010':
                lb = '일본';
                break;
            case '8004011':
                lb = '중국';
                break; 
        }
        return lb;
    },

    onAxisLabelRender: function (axis, label, layoutContext) {
        return label.toFixed(label < 10 ? 1 : 0) + '%';
    },
    onSeriesTooltipRender: function (tooltip, record, item) {
        var title = item.series.getTitle();

        tooltip.setHtml(record.get('DSTR_TYPE_NM') + ' ' + title + ': ' +
            record.get(item.series.getYField()) + '%');
    }//return Ext.util.Format.number(layoutContext.renderer(label) / 1000, '0,000');
});







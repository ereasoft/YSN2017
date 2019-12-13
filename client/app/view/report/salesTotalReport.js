Ext.define('Ysn.view.report.salesTotalreportsearch', {
    extend: 'Ext.panel.Panel',
    xtype: 'salesTotalreport-search',

    requires: [
        'Ysn.view.report.salesTotalreportsearchController' 
    ],

    controller: 'salesTotalreport-search',

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
    id: 'salesTotalreport-search',
    defaults: {
        layout: 'form',
        xtype: 'container',
        defaultType: 'textfield'
    },

    items: [
        {
            xtype: 'fieldcontainer',
            fieldLabel: Locale.getMsg('영업조직'),
            labelAlign: 'right',
            labelWidth: 60,
            combineErrors: true,
            margin: '5 0 0 0',
            msgTarget: 'side',
            layout: 'hbox', 
            defaults: {
                //flex: 1,
                hideLabel: true
            },
            items: [{
                xtype: 'combobox',
                reference: 'up_dept_cd',
                itemId: 'up_dept_cd',
                name: 'up_dept_cd',
                publishes: 'value',
                displayField: 'name',
                valueField: 'name2',
                margin: '0 5 0 0',
                store: {
                    fields: ['name', 'name2'],
                    data: [{ name: '전체', name2: '' }, { name: '국내영업팀', name2: '3' }, { name: '해외영업팀', name2: '4' }, { name: '중국영업팀', name2: '241' }],
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
                width: 125,
                queryMode: 'local',
                listeners: {
                    //change: 'onChangeBiz'
                }
            } ]

        },{
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
            minValue: '2017-01-01',
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
            margin: '5 10 0 0',
            listeners: {
                click: 'onSearch'
            }
        }, {
            xtype: 'button',
            text: Locale.getMsg('실적변경'),
            height: 30,
            width: 100,
            margin: '5 5 0 0',
            listeners: {
                click: 'onModify'
            }
        },
        {
            xtype: 'label',
            html: '<font color=red>(실적변경: 변경할 날짜를 기준일에서 선택후, 실적변경버튼을 클릭)</font>',
            margin: '20 0 0 0',
        }
    ]
});

Ext.define('Ysn.view.report.salesTotalreportsearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salesTotalreport-search',
    init: function () {
        var Today = new Date(); 
        this.lookupReference('up_dept_cd').setValue(Ysn.Util.chkDept(true)); 
        //this.lookupReference('sdate').setValue(Today.getFullYear() + '-' + ('0' + (Today.getMonth() + 1)).slice(-2) + '-' + '01'); 
       /* if (sa_yn == 'Y') {
            this.lookupReference('bizGroup').setConfig({ 'readOnly': true });
            if (dept_level == '4') this.lookupReference('deptGroup').setConfig({ 'readOnly': true });
        }*/
        // if (loginUser != 'Sysadmin') this.lookupReference('userGroup').setValue(loginUser); 
    }, 
    onSearch: function () { 
        var pl = Ext.getCmp('reportsalesTotalreport');
        var yyyymm = Ext.Date.format(this.lookupReference('edate').getValue(), 'Y') + '년 ' + Ext.Date.format(this.lookupReference('edate').getValue(), 'm') + '월 ';
        pl.lookupReference('list1').setTitle('유통구조별 실적' + '(' + yyyymm + ')');
        pl.lookupReference('list2').setTitle('영업파트별 실적' + '(' + yyyymm + ')');
        pl.lookupReference('list3').setTitle('영업담당자별 실적' + '(' + yyyymm + ')');
        pl.lookupReference('list1').getStore().load(
            {
                params: {
                    up_dept_cd: this.lookupReference('up_dept_cd').getValue(),
                    st_date: Ext.Date.format(this.lookupReference('edate').getValue(), 'Ym') + '01',
                    ed_date: Ext.Date.format(this.lookupReference('edate').getValue(),'Ymd')
                } 
            }
        );
        pl.lookupReference('list2').getStore().load(
            {
                params: {
                    up_dept_cd: this.lookupReference('up_dept_cd').getValue(),
                    st_date: Ext.Date.format(this.lookupReference('edate').getValue(), 'Ym') + '01',
                    ed_date: Ext.Date.format(this.lookupReference('edate').getValue(), 'Ymd')
                }
            }
        );
        pl.lookupReference('list3').getStore().load(
            {
                params: {
                    up_dept_cd: this.lookupReference('up_dept_cd').getValue(),
                    st_date: Ext.Date.format(this.lookupReference('edate').getValue(), 'Ym') + '01',
                    ed_date: Ext.Date.format(this.lookupReference('edate').getValue(), 'Ymd')
                }
            }
        );
    }, onModify: function () { 
        Ext.MessageBox.confirm('실적변경', '['+ this.lookupReference('edate').getRawValue() + ']의 실적을 변경하시겠습니까?', this.showResult, this); 
    },
    showResult: function (btn, text) {
        var pl = this;
        var parent = Ext.getCmp('reportsalesTotalreport');
        if (btn == 'yes') {
            //pl.showToast(Ext.String.format(pl.lookupReference('edate').getRawValue(), btn));
            parent.mask('실적을 변경하고 있으니, 잠시만 기다리세요.');
            Ext.Ajax.request({
                url: '/DaliyInfo/amountDaliyUpdate',
                method: 'POST',
                params: {
                    yyyymmdd: Ext.Date.format(pl.lookupReference('edate').getValue(), 'Ymd')
                },
                success: function (action) {
                    if (!Ysn.Util.OnsessOut(action.responseText)) return false;
                    parent.unmask();
                    Ext.Msg.alert(Locale.getMsg('실적변경완료'), '처리가 완료되었습니다.</br> 검색버튼을 클릭하여 정상처리되었는지 확인하세요.');
                },
                failure: function (action) {
                    var dataVal = Ext.decode(action.responseText)
                    Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.');
                }
            });

        }
    },
    showToast: function (s, title) { // 화면애 메세지 창을 띄웠다가 자동 사라짐
        Ext.toast({
            html: s,
            closable: false,
            align: 't',
            slideInDuration: 400,
            minWidth: 400
        });
    },



});



Ext.define('Ysn.view.report.salesTotalreport', {
    extend: 'Ext.panel.Panel',
    xtype: 'report-salesTotalreport',
    requires: [
        'Ysn.view.report.salesTotalreportController',
		'Ext.chart.series.*',
		'Ext.chart.theme.Muted'
    ],

    controller: 'report-salesTotalreport',
    reference: 'reportsalesTotalreport',
    id: 'reportsalesTotalreport',
    overflow: 'hidden',
    scrollable: false,
    header: false,
    bodyBorder: true,
    bodyPadding: 20,
    dockedItems: [
	               {
	                   header: false,
	                   xtype: 'salesTotalreport-search',
	                   reference: 'salesTotalreportSearch',
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
                            title: Locale.getMsg('유통구조별 제작현황'),
                            glyph: 'xf00b@FontAwesome',
                            tools: [
					            { iconCls: 'x-fa fa-file-excel-o', handler: 'xlsExport1' }
                            ],
                            reference: 'list1', 
                            scrollable: true, 
                            xtype: 'grid',
                            flex: 1,
                            store: {
                                fields:[ 
                                    { name: 'UP_DEPT_NM', type: 'string' },
                                    { name: 'DSTR_TYPE_NM', type: 'string' },
                                    { name: 'CDATE_AMOUNT_TUBE', type: 'int' },
                                    { name: 'CDATE_AMOUNT_PUMP', type: 'int' },
                                    { name: 'CDATE_AMOUNT_SUM', type: 'int' },
                                    { name: 'SALES_GOAL', type: 'int' },
                                    { name: 'SALES_PERCENT', type: 'int' }
                                ],
                                proxy: {
                                    method: "POST",
                                    type: 'ajax',
                                    url: '/DaliyInfo/daliyDstrList',
                                    reader: {
                                        type: 'json',
                                        rootProperty: 'LIST'
                                    }
                                }, 
                                autoLoad: true,
                                autoDestroy: true,
                                listeners: {
                                    load: function (store, records, successful, operation) { 
                                     //   pl = Ext.getCmp('reportsalesTotalreport');
                                      //  pl.lookupReference('list1').unmask(); 
                                    }
                                }
                            },
                            plugins: ['pmh-grid-exporter'],
                            features: [{
                                ftype: 'summary',
                                dock: 'bottom'
                            }],
                            style: { 'borderBottom': '1px solid gray' }, 
                            columnLines: true,
                            columns: [  
                                    { text: Locale.getMsg('영업조직'), width: 100, dataIndex: 'UP_DEPT_NM', sortable: true },
                                    {
                                        text: Locale.getMsg('유통구조'), flex: 1, dataIndex: 'DSTR_TYPE_NM', sortable: true,
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.String.format('합계');
                                        }
                                    },
                                    {
                                        text: Locale.getMsg('펌프수출'), width: 120, dataIndex: 'CDATE_AMOUNT_PUMP', renderer: 'changeDec', sortable: true,
                                        summaryType: 'sum',
                                        summaryRenderer: 'changeDec'
                                    },
                                    {
                                        text: Locale.getMsg('튜브수출'), width: 120, dataIndex: 'CDATE_AMOUNT_TUBE', renderer: 'changeDec', sortable: true,
                                        summaryType: 'sum',
                                        summaryRenderer: 'changeDec'
                                    },
                                    {
                                        text: Locale.getMsg('합계'), width: 120, dataIndex: 'CDATE_AMOUNT_SUM', renderer: 'changeDec', sortable: true,
                                        summaryType: 'sum',
                                        summaryRenderer: 'changeDec'
                                    },
                                    {
                                        text: Locale.getMsg('매출목표'), width: 120, dataIndex: 'SALES_GOAL', renderer: 'changeDec', sortable: true,
                                        summaryType: 'sum',
                                        summaryRenderer: 'changeDec'
                                    },
                                    {
                                        text: Locale.getMsg('목표대비'), width: 80, dataIndex: 'SALES_PERCENT', renderer: 'changePcnt', sortable: true,
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            if (summaryData["gridcolumn-1184"] == 0) {
                                                return '0%';
                                            } else {
                                                return Ext.util.Format.number(100 * summaryData["gridcolumn-1183"] / summaryData["gridcolumn-1184"], '0,000.00') + '%';
                                            } 
                                        }
                                    }
                            ], 
                            scrollable: true,
                            syncRowHeight: false
                        },
                        {
                            title: Locale.getMsg('파트별 제작현황'),
                            glyph: 'xf00b@FontAwesome',
                            tools: [
					            { iconCls: 'x-fa fa-file-excel-o', handler: 'xlsExport2' }
                            ],
                            reference: 'list2',
                            scrollable: true,
                            xtype: 'grid',
                            flex: 1,
                            store: {
                                fields: [
                                    { name: 'UP_DEPT_NM', type: 'string' },
                                    { name: 'DEPT_NM', type: 'string' },
                                    { name: 'CDATE_AMOUNT_TUBE', type: 'int' },
                                    { name: 'CDATE_AMOUNT_PUMP', type: 'int' },
                                    { name: 'CDATE_AMOUNT_SUM', type: 'int' },
                                    { name: 'SALES_GOAL', type: 'int' },
                                    { name: 'SALES_PERCENT', type: 'int' }
                                ],
                                proxy: {
                                    method: "POST",
                                    type: 'ajax',
                                    url: '/DaliyInfo/daliyDeptList',
                                    reader: {
                                        type: 'json',
                                        rootProperty: 'LIST'
                                    }
                                },
                                autoLoad: true,
                                autoDestroy: true,
                                listeners: {
                                    load: function (store, records, successful, operation) {
                                        //   pl = Ext.getCmp('reportsalesTotalreport');
                                        //  pl.lookupReference('list1').unmask(); 
                                    }
                                }
                            },
                            plugins: ['pmh-grid-exporter'],
                            features: [{
                                ftype: 'summary',
                                dock: 'bottom'
                            }],
                            style: { 'borderBottom': '1px solid gray' },
                            columnLines: true,
                            columns: [
                                    { text: Locale.getMsg('영업조직'), width: 100, dataIndex: 'UP_DEPT_NM', sortable: true },
                                    {
                                        text: Locale.getMsg('파트명'), flex: 1, dataIndex: 'DEPT_NM', sortable: true,
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.String.format('합계');
                                        }
                                    },
                                    {
                                        text: Locale.getMsg('펌프수출'), width: 120, dataIndex: 'CDATE_AMOUNT_PUMP', renderer: 'changeDec', sortable: true,
                                        summaryType: 'sum',
                                        summaryRenderer: 'changeDec'
                                    },
                                    {
                                        text: Locale.getMsg('튜브수출'), width: 120, dataIndex: 'CDATE_AMOUNT_TUBE', renderer: 'changeDec', sortable: true,
                                        summaryType: 'sum',
                                        summaryRenderer: 'changeDec'
                                    },
                                    {
                                        text: Locale.getMsg('합계'), width: 120, dataIndex: 'CDATE_AMOUNT_SUM', renderer: 'changeDec', sortable: true,
                                        summaryType: 'sum',
                                        summaryRenderer: 'changeDec'
                                    },
                                    {
                                        text: Locale.getMsg('매출목표'), width: 120, dataIndex: 'SALES_GOAL', renderer: 'changeDec', sortable: true,
                                        summaryType: 'sum',
                                        summaryRenderer: 'changeDec'
                                    },
                                    {
                                        text: Locale.getMsg('목표대비'), width: 80, dataIndex: 'SALES_PERCENT', renderer: 'changePcnt', sortable: true,
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            if (summaryData["gridcolumn-1194"] == 0) {
                                                return '0%';
                                            } else {
                                                return Ext.util.Format.number(100 * summaryData["gridcolumn-1193"] / summaryData["gridcolumn-1194"], '0,000.00') + '%';
                                            }
                                        }
                                    }
                            ],
                            scrollable: true,
                            syncRowHeight: false
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
                            title: Locale.getMsg('담당자별 제작현황'),
                            glyph: 'xf00b@FontAwesome',
                            tools: [
					            { iconCls: 'x-fa fa-file-excel-o', handler: 'xlsExport3' }
                            ],
                            reference: 'list3',
                            scrollable: true,
                            xtype: 'grid',
                            flex: 1,
                            store: {
                                fields: [
                                    { name: 'UP_DEPT_NM', type: 'string' },
                                    { name: 'USER_NM', type: 'string' },
                                    { name: 'CDATE_AMOUNT_TUBE', type: 'int' },
                                    { name: 'CDATE_AMOUNT_PUMP', type: 'int' },
                                    { name: 'CDATE_AMOUNT_SUM', type: 'int' },
                                    { name: 'SALES_GOAL', type: 'int' },
                                    { name: 'SALES_PERCENT', type: 'int' }
                                ],
                                proxy: {
                                    method: "POST",
                                    type: 'ajax',
                                    url: '/DaliyInfo/daliyUserList',
                                    reader: {
                                        type: 'json',
                                        rootProperty: 'LIST'
                                    }
                                },
                                autoLoad: true,
                                autoDestroy: true,
                                listeners: {
                                    load: function (store, records, successful, operation) {
                                        //   pl = Ext.getCmp('reportsalesTotalreport');
                                        //  pl.lookupReference('list1').unmask(); 
                                    }
                                }
                            },
                            plugins: ['pmh-grid-exporter'],
                            features: [{
                                ftype: 'summary',
                                dock: 'bottom'
                            }],
                            style: { 'borderBottom': '1px solid gray' },
                            columnLines: true,
                            columns: [
                                    { text: Locale.getMsg('영업조직'), width: 100, dataIndex: 'UP_DEPT_NM', sortable: true },
                                    {
                                        text: Locale.getMsg('담당자명'), flex: 1, dataIndex: 'USER_NM', sortable: true,
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.String.format('합계');
                                        }
                                    },
                                    {
                                        text: Locale.getMsg('펌프수출'), width: 120, dataIndex: 'CDATE_AMOUNT_PUMP', renderer: 'changeDec', sortable: true,
                                        summaryType: 'sum',
                                        summaryRenderer: 'changeDec'
                                    },
                                    {
                                        text: Locale.getMsg('튜브수출'), width: 120, dataIndex: 'CDATE_AMOUNT_TUBE', renderer: 'changeDec', sortable: true,
                                        summaryType: 'sum',
                                        summaryRenderer: 'changeDec'
                                    },
                                    {
                                        text: Locale.getMsg('합계'), width: 120, dataIndex: 'CDATE_AMOUNT_SUM', renderer: 'changeDec', sortable: true,
                                        summaryType: 'sum',
                                        summaryRenderer: 'changeDec'
                                    },
                                    {
                                        text: Locale.getMsg('매출목표'), width: 120, dataIndex: 'SALES_GOAL', renderer: 'changeDec', sortable: true,
                                        summaryType: 'sum',
                                        summaryRenderer: 'changeDec'
                                    },
                                    {
                                        text: Locale.getMsg('목표대비'), width: 80, dataIndex: 'SALES_PERCENT', renderer: 'changePcnt', sortable: true,
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            if (summaryData["gridcolumn-1205"] == 0) {
                                                return '0%';
                                            } else {
                                                return Ext.util.Format.number(100 * summaryData["gridcolumn-1204"] / summaryData["gridcolumn-1205"], '0,000.00') + '%';
                                            }
                                        }
                                    }
                            ],
                            scrollable: true,
                            syncRowHeight: false
                        }
                    ]
                }
    ]





});



Ext.define('Ysn.view.report.salesTotalreportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.report-salesTotalreport',
    requires: [
    ],
    init: function () {
         
        this.lookupReference('salesTotalreportSearch').getController('salesTotalreport-search').onSearch();
    },
    changeDec: function (value) {
        return Ysn.Util.changeDec(value);
    },
    changeDbl: function (value) {
        return Ysn.Util.changeDbl(value);
    },
    changePcnt: function (value) {
        return Ysn.Util.changeDec(value*100) + '%';
    }, 
    xlsExport1: function () { 
        this.lookupReference('list1').saveDocumentAs({
		headerRowCnt: 1,
        type: 'xlsx',
        title: this.lookupReference('list1').getTitle(),
        fileName: this.lookupReference('list1').getTitle()
    });
    },
    xlsExport2: function () {

        this.lookupReference('list2').saveDocumentAs({
			headerRowCnt: 1,
            type: 'xlsx',
            title: this.lookupReference('list2').getTitle(),
            fileName: this.lookupReference('list2').getTitle()
        });
    },
    xlsExport3: function () {

        this.lookupReference('list3').saveDocumentAs({
			headerRowCnt: 1,
            type: 'xlsx',
            title: this.lookupReference('list3').getTitle(),
            fileName: this.lookupReference('list3').getTitle()
        });
    }
});






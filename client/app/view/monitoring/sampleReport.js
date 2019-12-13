Ext.define('Ysn.view.monitoring.sampleReportsearch', {
    extend: 'Ext.panel.Panel',
    xtype: 'sampleReport-search',

    requires: [
        'Ysn.view.monitoring.sampleReportsearchController' 
    ],

    controller: 'sampleReport-search',

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
    id: 'sampleReport-search',
    defaults: {
        layout: 'form',
        xtype: 'container',
        defaultType: 'textfield'
    },

    items: [
        {
            xtype: 'fieldcontainer',
            fieldLabel: Locale.getMsg('매출조직'),
            labelAlign: 'right',
            labelWidth: 60,
            combineErrors: true,
            msgTarget: 'side',
            layout: 'hbox',
            margin: '5 0 0 0',
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
                width: 125,
                queryMode: 'local',
                listeners: {
                    change: 'onChangeBiz'
                }
            }, {
                xtype: 'combobox',
                reference: 'deptGroup',
                itemId: 'deptGroup',
                name: 'deptGroup',
                publishes: 'value',
                displayField: 'DEPT_NM',
                valueField: 'DEPT_CD',
                store: {
                    type: 'deptgroup',
                    listeners: {
                        load: function (store) {
                            store.insert(0, { DEPT_CD: '', DEPT_NM: Locale.getMsg('전체') });
                        }
                    }
                },
                minChars: 0,
                width: 150,
                maskOnDisable: true,
                queryMode: 'local',
                listeners: {
                    //change : 'onChangeDept' 
                }
            }]

        }, {
            xtype: 'combobox',
            reference: 'userGroup',
            publishes: 'value',
            fieldLabel: Locale.getMsg('영업담당'),
            labelAlign: 'right',
            labelWidth: 60,
            width: 180,
            displayField: 'USER_NM',
            valueField: 'USER_CD',
            name: 'user_cd',
            itemId: 'user_cd',
            maskOnDisable: true,
            margin: '5 0 0 0',
            anchor: '-15',
            store: {
                type: 'usercd'
            },
            minChars: 0,
            width: 160,
            queryMode: 'local' 
        }, {
            xtype: 'combobox',
            reference: 'dstr_type',
            margin: '5 0 0 0',
            itemId: 'dstr_type',
            publishes: 'value',
            labelWidth: 60,
            width: 180,
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
        } ,{
            xtype: 'combobox',
            reference: 'biz_type',
            labelWidth: 60,
            width: 180,
            margin: '5 0 0 0',
            publishes: 'value',
            fieldLabel: Locale.getMsg('사업유형'),
            labelAlign: 'right',
            displayField: 'CODE_NM',
            valueField: 'CODE_ID',
            name: 'biz_type',
            anchor: '-15',
            store: {
                type: 'TcodeAll'
            },
            minChars: 0,
            queryMode: 'local'
        }, {
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

Ext.define('Ysn.view.monitoring.sampleReportsearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sampleReport-search',
    init: function () {
        var Today = new Date();
        this.lookupReference('bizGroup').store.load();
        this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true));
        this.lookupReference('biz_type').store.load({ params: { up_code_id: 'BIZ_TYPE', lang: localeCd } });
        this.lookupReference('biz_type').setValue('');
        this.lookupReference('dstr_type').store.load({ params: { up_code_id: 'DSTR_TYPE', lang: localeCd } });
        this.lookupReference('dstr_type').setValue('');
        this.lookupReference('year').store.load();
        this.lookupReference('year').setValue(Today.getFullYear());
        this.lookupReference('month').store.load();
        this.lookupReference('month').setValue('0' + (Today.getMonth() + 1));
        if (sa_yn == 'Y') {
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
    onChangeDept: function (el, newVal, oldVal, e) {
        var userCombo = this.lookupReference('userGroup');
        if (newVal != '' && newVal != null) {
            userCombo.store.load({ params: { dept_cd: newVal, up_dept_cd: this.lookupReference('bizGroup').getValue() } });
        } else {
            userCombo.store.removeAll();
        }
        userCombo.setValue('');
        userCombo.doQuery();
        el.focus();
        //userCombo.focus();

    },
    onSearch: function () {
        /*Ext.getStore('sampleReport').load(
            {
                params: {
                    bizGroup: this.lookupReference('bizGroup').getValue(),
                    deptGroup: this.lookupReference('deptGroup').getValue(),
                    user_cd: this.lookupReference('userGroup').getValue(),
                    dstr_type: this.lookupReference('dstr_type').getValue(),
                    biz_type: this.lookupReference('biz_type').getValue(), 
                    base_yy: this.lookupReference('year').getValue(),
                    base_mm: this.lookupReference('month').getValue()
                } 
            }
        );*/
        //Ext.getCmp('monitoringsampleReport').down('#muserSelDay').setValue();
        Ext.getCmp('monitoringsampleReport').lookupReference('list1').getStore().load(
            {
                params: {
                    bizGroup: this.lookupReference('bizGroup').getValue(),
                    deptGroup: this.lookupReference('deptGroup').getValue(),
                    user_cd: this.lookupReference('userGroup').getValue(),
                    dstr_type: this.lookupReference('dstr_type').getValue(),
                    biz_type: this.lookupReference('biz_type').getValue(),
                    base_yy: this.lookupReference('year').getValue(),
                    base_mm: this.lookupReference('month').getValue()
                }
            }
        );
        Ext.getCmp('monitoringsampleReport').lookupReference('list2').getStore().load(
           {
               params: {
                   bizGroup: this.lookupReference('bizGroup').getValue(),
                   deptGroup: this.lookupReference('deptGroup').getValue(),
                   user_cd: this.lookupReference('userGroup').getValue(),
                   dstr_type: this.lookupReference('dstr_type').getValue(),
                   biz_type: this.lookupReference('biz_type').getValue(),
                   base_yy: this.lookupReference('year').getValue(),
                   base_mm: this.lookupReference('month').getValue()
               }
           }
       ); 
        Ext.getCmp('monitoringsampleReport').lookupReference('list3').getStore().load(
            {
                params: {
                    bizGroup: this.lookupReference('bizGroup').getValue(),
                    deptGroup: this.lookupReference('deptGroup').getValue(),
                    user_cd: this.lookupReference('userGroup').getValue(),
                    dstr_type: this.lookupReference('dstr_type').getValue(),
                    biz_type: this.lookupReference('biz_type').getValue(),
                    base_yy: this.lookupReference('year').getValue(),
                    base_mm: this.lookupReference('month').getValue()
                }
            }
        );
        Ext.getCmp('monitoringsampleReport').lookupReference('list4').getStore().load(
           {
               params: {
                   bizGroup: this.lookupReference('bizGroup').getValue(),
                   deptGroup: this.lookupReference('deptGroup').getValue(),
                   user_cd: this.lookupReference('userGroup').getValue(),
                   dstr_type: this.lookupReference('dstr_type').getValue(),
                   biz_type: this.lookupReference('biz_type').getValue(),
                   base_yy: this.lookupReference('year').getValue(),
                   base_mm: this.lookupReference('month').getValue()
               }
           }
       );
    }


});

/*Ext.define('Ysn.store.sampleReport', {
    extend: 'Ext.data.Store',
    alias: 'store.sampleReport',
    storeId: 'sampleReport',
    fields: ['LIST1', 'LIST2', 'LIST4'],
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/Monitoring/sampleAnalysisOrder',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        beforeload: function (store, operation) {
            pl = Ext.getCmp('monitoringsampleReport');
            pl.lookupReference('list1').mask('Loading...');
            pl.lookupReference('list2').mask('Loading...');
            //pl.lookupReference('list3').mask('Loading...');
            pl.lookupReference('list4').mask('Loading...');
        }, 
        load: function (store, records, successful, operation) {
            if (!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            pl = Ext.getCmp('monitoringsampleReport');
            pl.lookupReference('list1').getStore().loadRawData(store.data.items[0].data['LIST1']);
            pl.lookupReference('list2').getStore().loadRawData(store.data.items[0].data['LIST2']);
           // pl.lookupReference('list3').getStore().loadRawData(store.data.items[0].data['LIST3']);
            pl.lookupReference('list4').getStore().loadRawData(store.data.items[0].data['LIST4']);
            pl.lookupReference('list1').unmask();
            pl.lookupReference('list2').unmask();
           // pl.lookupReference('list3').unmask();
            pl.lookupReference('list4').unmask();
        }
    },
    autoLoad: false,
    autoDestroy: false

});*/

Ext.define('Ysn.view.monitoring.sampleReport', {
    extend: 'Ext.panel.Panel',
    xtype: 'monitoring-sampleReport',
    requires: [
        'Ysn.view.monitoring.sampleReportController',
		'Ext.chart.series.*',
		'Ext.chart.theme.Muted'
    ],

    controller: 'monitoring-sampleReport',
    reference: 'monitoringsampleReport',
    id: 'monitoringsampleReport',
    overflow: 'hidden',
    scrollable: false,
    header: false,
    bodyBorder: true,
    bodyPadding: 20,
    dockedItems: [
	               {
	                   header: false,
	                   xtype: 'sampleReport-search',
	                   reference: 'sampleReportSearch',
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
                            title: Locale.getMsg('월별 제작현황'),
                            glyph: 'xf00b@FontAwesome',
                            reference: 'list1', 
                            scrollable: true, 
                            xtype: 'grid',
                            flex: 1,
                            store: {
                                model: 'Ysn.model.sampleAnalysisOrder',
                                groupField: 'IDX',
                                proxy: {
                                    method: "POST",
                                    type: 'ajax',
                                    url: '/Monitoring/sampleAnalysisOrder',
                                    reader: {
                                        type: 'json',
                                        rootProperty: 'LIST1'
                                    }
                                },
                                autoLoad: true,
                                autoDestroy: true,
                                listeners: {
                                    load: function (store, records, successful, operation) { 
                                     //   pl = Ext.getCmp('monitoringsampleReport');
                                      //  pl.lookupReference('list1').unmask(); 
                                    }
                                }
                            }, 
                            style: { 'borderBottom': '1px solid gray' }, 
                            columnLines: true,
                            columns: [
                                   {dataIndex: 'IDX', hidden:true},
                                    { text: Locale.getMsg('구분'), dataIndex: 'COLTYPE', hidden: true },
                                    { text: Locale.getMsg('품목유형'), flex: 1, dataIndex: 'ITEM_TYPE_NM', sortable: true },
                                    { text: Locale.getMsg('의뢰'), width: 80, dataIndex: 'SMSTAT_200', renderer: 'changeDec', sortable: true },
                                    { text: Locale.getMsg('승인'), width: 80, dataIndex: 'SMSTAT_400', renderer: 'changeDec', sortable: true },
                                    { text: Locale.getMsg('완료'), width: 80, dataIndex: 'SMSTAT_500', renderer: 'changeDec', sortable: true },
                                    { text: Locale.getMsg('적기'), width: 80, dataIndex: 'CURR_CNT', renderer: 'changeDec', sortable: true },
                                    { text: Locale.getMsg('지연'), width: 80, dataIndex: 'OVER_CNT', renderer: 'changeDec', sortable: true },
                                    { text: Locale.getMsg('리드타임'), width: 80, dataIndex: 'LEAD_TIME', renderer: 'changeDbl', sortable: true } 
                            ],
                            features: [{
                                ftype: 'grouping',
                                startCollapsed: false, 
                                hideGroupedHeader: true,
                                enableGroupingMenu: false,
                                groupHeaderTpl: '{name}'+'월'
                            }],
                            scrollable: true,
                            syncRowHeight: false
                        },
                        {
                            title: Locale.getMsg('담당별 제작현황(당월)'),
                            glyph: 'xf00b@FontAwesome',
                            reference: 'list3', 
                            scrollable: true,
                            xtype: 'grid',
                            flex: 1,
                            tools: [
                                {
                                    xtype: 'combobox', 
                                    padding: '-7 0 -7 0', 
                                    itemId: 'muserSelDay',
                                    reference: 'muserSelDay',
                                    width:120,
                                    valueField: 'VAL',
                                    displayField: 'DAY',
                                    publishes: 'value',
                                    store: {
                                        fields: [
			                                    { name: 'DAY', type: 'string' },
                                                { name: 'VAL', type: 'string' } 
                                        ],
                                        storeId: 'day',
                                        listeners: {
                                            load: function (store) {
                                                store.insert(0, { DAY: '일자선택', VAL: '' });
                                                for (var i = 1; i < 32; i++) {
                                                    store.insert(i, { DAY: ("0" + (i)).slice(-2)+'일', VAL: ("0" + (i)).slice(-2) });
                                                }
                                            }
                                        },
                                        minChars: 0,
                                        queryMode: 'local',
                                        autoLoad: true,
                                        autoDestroy: true 

                                    },
                                    listeners: {
                                        change: function (el, newVal, oldVal, e) {
                                            var pl = Ext.getCmp('monitoringsampleReport');
                                            var sh = pl.lookupReference('sampleReportSearch');
                                            pl.lookupReference('list3').getStore().load(
                                               {
                                                   params: {
                                                       bizGroup: sh.lookupReference('bizGroup').getValue(),
                                                       deptGroup: sh.lookupReference('deptGroup').getValue(),
                                                       user_cd: sh.lookupReference('userGroup').getValue(),
                                                       dstr_type: sh.lookupReference('dstr_type').getValue(),
                                                       biz_type: sh.lookupReference('biz_type').getValue(),
                                                       base_yy: sh.lookupReference('year').getValue(),
                                                       base_mm: sh.lookupReference('month').getValue(),
                                                       base_dd: newVal
                                                   }
                                               }
                                           );
                                        },
                                        afterrender: function (el) {
                                            el.setValue('');
                                        }
                                    }
                                }, {
                                    padding: '-7 0 -7 0',
                                    iconCls: 'x-fa fa-file-excel-o', handler: 'xlsExport1'
                                }
                            ],
                            store: {
                                model: 'Ysn.model.sampleAnalysisOrder',
                                groupField: 'IDX',
                                proxy: {
                                    method: "POST",
                                    type: 'ajax',
                                    url: '/Monitoring/sampleAnalysisOrderMuser',
                                    reader: {
                                        type: 'json',
                                        rootProperty: 'LIST3'
                                    }
                                },
                                autoLoad: true,
                                autoDestroy: true,
                                listeners: {
                                    load: function (store, records, successful, operation) {
                                     //   pl = Ext.getCmp('monitoringsampleReport');
                                     //   pl.lookupReference('list3').unmask();
                                    }
                                }
                            }, plugins: ['pmh-grid-exporter'],
                            style: { 'borderBottom': '1px solid gray' },
                            columnLines: true,
                            columns: [
                                    {dataIndex: 'IDX', hidden:true},
                                    { text: Locale.getMsg('구분'), dataIndex: 'COLTYPE', hidden: true },
                                    { text: Locale.getMsg('품목유형'), flex: 1, dataIndex: 'ITEM_TYPE_NM', sortable: true },
                                    { text: Locale.getMsg('의뢰'), width: 80, dataIndex: 'SMSTAT_200', renderer: 'changeDec', sortable: true },
                                    { text: Locale.getMsg('승인'), width: 80, dataIndex: 'SMSTAT_400', renderer: 'changeDec', sortable: true },
                                    { text: Locale.getMsg('완료'), width: 80, dataIndex: 'SMSTAT_500', renderer: 'changeDec', sortable: true },
                                    { text: Locale.getMsg('적기'), width: 80, dataIndex: 'CURR_CNT', renderer: 'changeDec', sortable: true },
                                    { text: Locale.getMsg('지연'), width: 80, dataIndex: 'OVER_CNT', renderer: 'changeDec', sortable: true },
                                    { text: Locale.getMsg('리드타임'), width: 80, dataIndex: 'LEAD_TIME', renderer: 'changeDbl', sortable: true }
                            ],
                            features: [{
                                ftype: 'grouping',
                                startCollapsed: false, 
                                hideGroupedHeader: true,
                                enableGroupingMenu: false,
                                groupHeaderTpl: '{name}'
                            }],
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
			                title: Locale.getMsg('년간 제작현황'),
			                glyph: 'xf00b@FontAwesome',
			                reference: 'list2',
			                scrollable: true,
			                xtype: 'grid',
			                flex: 1,
			                store: {
			                    model: 'Ysn.model.sampleAnalysisOrder',
			                    groupField: 'IDX',
			                    proxy: {
			                        method: "POST",
			                        type: 'ajax',
			                        url: '/Monitoring/sampleAnalysisOrder2',
			                        reader: {
			                            type: 'json',
			                            rootProperty: 'LIST2'
			                        }
			                    },
			                    autoLoad: true,
			                    autoDestroy: true
			                },
			                style: { 'borderBottom': '1px solid gray' },
			                columnLines: true,
			                columns: [
                                   { dataIndex: 'IDX', hidden: true },
                                    { text: Locale.getMsg('구분'), dataIndex: 'COLTYPE', hidden: true },
                                    { text: Locale.getMsg('품목유형'), flex: 1, dataIndex: 'ITEM_TYPE_NM', sortable: true },
                                    { text: Locale.getMsg('의뢰'), width: 80, dataIndex: 'SMSTAT_200', renderer: 'changeDec', sortable: true },
                                    { text: Locale.getMsg('승인'), width: 80, dataIndex: 'SMSTAT_400', renderer: 'changeDec', sortable: true },
                                    { text: Locale.getMsg('완료'), width: 80, dataIndex: 'SMSTAT_500', renderer: 'changeDec', sortable: true },
                                    { text: Locale.getMsg('적기'), width: 80, dataIndex: 'CURR_CNT', renderer: 'changeDec', sortable: true },
                                    { text: Locale.getMsg('지연'), width: 80, dataIndex: 'OVER_CNT', renderer: 'changeDec', sortable: true },
                                    { text: Locale.getMsg('리드타임'), width: 80, dataIndex: 'LEAD_TIME', renderer: 'changeDbl', sortable: true }
			                ],
			                    features: [{
			                        ftype: 'grouping',
			                        startCollapsed: false, 
			                        hideGroupedHeader: true,
			                        enableGroupingMenu: false,
			                        groupHeaderTpl: [ 
                                    '<div>{name:this.formatName}</div>',
                                    {
                                        formatName: function (name) {
                                            return Ext.String.trim(name+'년도');
                                        }
                                    }
			                        ]
			                    }],
			                scrollable: true,
			                syncRowHeight: false,
			                listeners: {
			                    load: function (store, records, successful, operation) {
			                    //    pl = Ext.getCmp('monitoringsampleReport');
			                      //  pl.lookupReference('list2').unmask();
			                    }
			                }
			            },
			             {
			                 title: Locale.getMsg('지역별 제작현황(당월)'),
			                 glyph: 'xf00b@FontAwesome',
			                 reference: 'list4',
			                 scrollable: true,
			                 xtype: 'grid',
			                 flex: 1,
			                 store: {
			                     model: 'Ysn.model.sampleAnalysisOrder',
			                     groupField: 'IDX',
			                     proxy: {
			                         method: "POST",
			                         type: 'ajax',
			                         url: '/Monitoring/sampleAnalysisOrder3',
			                         reader: {
			                             type: 'json',
			                             rootProperty: 'LIST4'
			                         }
			                     },
			                     autoLoad: true,
			                     autoDestroy: true,
			                     listeners: {
			                         load: function (store, records, successful, operation) {
			                            // pl = Ext.getCmp('monitoringsampleReport');
			                            // pl.lookupReference('list4').unmask();
			                         }
			                     }
			                 },
			                 style: { 'borderBottom': '1px solid gray' },
			                 columnLines: true,
			                 columns: [
                                    { dataIndex: 'IDX', hidden: true },
                                    { text: Locale.getMsg('구분'), dataIndex: 'COLTYPE', hidden: true },
                                    { text: Locale.getMsg('품목유형'), flex: 1, dataIndex: 'ITEM_TYPE_NM', sortable: true },
                                    { text: Locale.getMsg('의뢰'), width: 80, dataIndex: 'SMSTAT_200', renderer: 'changeDec', sortable: true },
                                    { text: Locale.getMsg('승인'), width: 80, dataIndex: 'SMSTAT_400', renderer: 'changeDec', sortable: true },
                                    { text: Locale.getMsg('완료'), width: 80, dataIndex: 'SMSTAT_500', renderer: 'changeDec', sortable: true },
                                    { text: Locale.getMsg('적기'), width: 80, dataIndex: 'CURR_CNT', renderer: 'changeDec', sortable: true },
                                    { text: Locale.getMsg('지연'), width: 80, dataIndex: 'OVER_CNT', renderer: 'changeDec', sortable: true },
                                    { text: Locale.getMsg('리드타임'), width: 80, dataIndex: 'LEAD_TIME', renderer: 'changeDbl', sortable: true }
			                 ],
			                 features: [{
			                     ftype: 'grouping',
			                     startCollapsed: false, 
			                     hideGroupedHeader: true,
			                     enableGroupingMenu: false,
			                     groupHeaderTpl: [ 
                                    '<div>{name:this.formatName}</div>',
                                    {
                                        formatName: function (name) {
                                            if (name == '1') return Ext.String.trim('국내');
                                            if (name == '2') return Ext.String.trim('해외');
                                            if (name == '3') return Ext.String.trim('PM');
                                            if (name == '4') return Ext.String.trim('기타');
                                        }
                                    }
			                     ]
			                 }],
			                 scrollable: true,
			                 syncRowHeight: false
			             }
                    ]
                }
    ]





});



Ext.define('Ysn.view.monitoring.sampleReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.monitoring-sampleReport',
    requires: [
    ],
    init: function () {
        //Ext.getCmp('muserSelDay').setValue(''); 
        this.lookupReference('sampleReportSearch').getController('sampleReport-search').onSearch();
    },
    changeDec: function (value) {
        return Ysn.Util.changeDec(value);
    },
    changeDbl: function (value) {
        return Ysn.Util.changeDbl(value);
    },
    xlsExport1: function () {
			headerRowCnt: 1,
        this.lookupReference('list3').saveDocumentAs({
            type: 'xlsx',
            title: this.lookupReference('list3').getTitle(),
            fileName: this.lookupReference('list3').getTitle()
        });
    },

    

});






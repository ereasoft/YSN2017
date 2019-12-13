    Ext.define('Ysn.view.report.salesTargetSalessearch', {
        extend: 'Ext.panel.Panel',
        xtype: 'salesTargetSales-search',

        requires: [
            'Ysn.view.report.salesTargetSalessearchController', 
	        'Ysn.store.*'
        ],

        controller: 'salesTargetSales-search',

        frame: false,
        //resizable: true,
        width: 1000,
        minWidth: 1000,
        minHeight: 140,
        layout: {
            type: 'table',
            columns: 5,
            tableAttrs: {
                style: {
					'padding-top': '5px',
                    width: '20%'
                }
            }

        },
        id: 'salesTargetSales-search',
        reference: 'salesTargetSales-search',
        defaults: {
            layout: 'form',
            xtype: 'container',
            defaultType: 'textfield'
        },

        items: [{
            xtype: 'fieldcontainer',
            fieldLabel: Locale.getMsg('매출조직'),
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
                listeners: {
                    change: 'onChangeBiz'
                }
            },
                {
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
                                var bizCd = Ext.getCmp('salesTargetSales-search').down('#bizGroup');
                                if (store.data.items.length < 2) {
                                    Ext.getCmp('salesTargetSales-search').down('#user_cd').store.load({ params: { dept_cd: bizCd.getValue(), up_dept_cd: '' } });
                                } else {
                                    Ext.getCmp('salesTargetSales-search').down('#user_cd').store.load({ params: { dept_cd: '', up_dept_cd: bizCd.getValue() } });
                                }
                            }
                        }
                    },
                    minChars: 0,
                    //width: 150,
                    maskOnDisable: true,
                    queryMode: 'local',
                    listeners: {
                        change: 'onChangeDept'
                    }
                }]
        }, {
            xtype: 'combobox',
            reference: 'userGroup',
            publishes: 'value',
            fieldLabel: Locale.getMsg('영업담당'),
            labelWidth: 80,
            labelAlign: 'right',
            displayField: 'USER_NM',
            valueField: 'USER_CD',
            name: 'user_cd',
            itemId: 'user_cd',
            maskOnDisable: true,
            anchor: '-15',
            store: {
                type: 'usercd'
            },
            minChars: 0,
            queryMode: 'local'
        }, {
            xtype: 'combobox',
            reference: 'dstr_type',
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
            queryMode: 'local'
        }, {
            xtype: 'fieldcontainer',
            combineErrors: true,
            layout: 'hbox',
            fieldLabel: Locale.getMsg('기준년월'),
            labelWidth: 80,
            labelAlign: 'right',
            defaults: {
                //flex: 1,
                hideLabel: true
            },
            items: [{
                xtype: 'combobox',
                reference: 'base_yy',
                publishes: 'value',
                width: 90,
                labelAlign: 'right',
                displayField: 'YEAR',
                valueField: 'VAL',
                name: 'base_yy',
                itemId: 'base_yy',
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
                reference: 'base_mm1',
                publishes: 'value',
                labelAlign: 'right',
                width: 70,
                displayField: 'MONTH',
                valueField: 'VAL',
                name: 'base_mm1',
                itemId: 'base_mm1',
                maskOnDisable: true,
                anchor: '-15',
                store: {
                    type: 'month'
                },
                minChars: 0,
                queryMode: 'local',
                margin: '0 10 0 0'
            },{
                xtype: 'label',  
                text: '-',
                margin: '7 0 0 0',
                width: 10
            }, {
                xtype: 'combobox',
                reference: 'base_mm2',
                publishes: 'value',
                labelAlign: 'right',
                width: 70,
                displayField: 'MONTH',
                valueField: 'VAL',
                name: 'base_mm2',
                itemId: 'base_mm2',
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
        }, {
            rowspan: 4,
            xtype: 'button',
            text: Locale.getMsg('검색'),
            width: 60,
            height: 60,
            listeners: {
                click: 'onSubmitClick'
            }
        }, {
            xtype: 'fieldcontainer',
            fieldLabel: Locale.getMsg('거래처'),
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
                name: 'cust_nm',
                reference: 'cust_nm',
                itemId: 'cust_nm',
                margin: '0 5 0 0',
                width: 270
            }, {
                xtype: 'hiddenfield',
                reference: 'cust_cd',
                name: 'cust_cd',
                itemId: 'cust_cd'
            }, {
                iconCls: 'x-fa fa-search',
                xtype: 'button',
                scale: 'small',
                margin: '0 5 0 0',
                handler: 'openWindow',
                style: {
                    'border': 'none'

                }
            }, {
                iconCls: 'x-fa fa-remove',
                xtype: 'button',
                scale: 'small',
                handler: 'resetVal',
                style: {
                    'background-color': 'red !important',
                    'background-image': 'none',
                    'border': 'none'

                }
            }]
        },{
				xtype: 'fieldcontainer',
				fieldLabel: 'End User',
				labelWidth: 80,
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
						name: 'enduser_nm', 
						reference : 'euser_nm',
					    itemId : 'euser_nm',
						margin: '0 5 0 0',
						width: 270
					},{
						xtype: 'hiddenfield',
						reference: 'euser_cd', 
						name: 'euser_cd', 
						itemId : 'euser_cd'
					}, {
						iconCls: 'x-fa fa-search', 
						xtype: 'button',
						scale: 'small',
						margin: '0 5 0 0',
						handler : 'openWindow2',
						style:{ 
							'border':'none' 

						}
					},{
						iconCls: 'x-fa fa-remove', 
						xtype: 'button',
						scale: 'small',
						handler : 'resetVal2',
						style:{
							'background-color': 'red !important',
							'background-image': 'none',
							'border':'none' 

						}
					}]
	   }, {
            xtype: 'combobox',
            reference: 'biz_type',
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
        },{
			 xtype: 'combobox',
			 labelAlign: 'right', 
			 fieldLabel: Locale.getMsg('품목유형'),
			 labelWidth: 80,
			 reference: 'item_type',
			 publishes: 'value', 
			 displayField: 'CODE_NM',
			 valueField: 'CODE_ID',
			 name: 'item_type', 
			 anchor: '-15',
			 store: {
				 type: 'TcodeAll'
			 },
			 minChars: 0,
			 queryMode: 'local',
			 margin: '0 5 0 0'                  
         }, 
        {
            xtype: 'fieldcontainer',
            fieldLabel: Locale.getMsg('매출처'),
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
                name: 'bcust_nm',
                reference: 'bcust_nm',
                itemId: 'bcust_nm',
                margin: '0 5 0 0',
                width: 270
            }, {
                xtype: 'hiddenfield',
                reference: 'bcust_cd',
                name: 'bcust_cd',
                itemId: 'bcust_cd'
            }, {
                iconCls: 'x-fa fa-search',
                xtype: 'button',
                scale: 'small',
                margin: '0 5 0 0',
                handler: 'openWindow3',
                style: {
                    'border': 'none'

                }
            }, {
                iconCls: 'x-fa fa-remove',
                xtype: 'button',
                scale: 'small',
                handler: 'resetVal3',
                style: {
                    'background-color': 'red !important',
                    'background-image': 'none',
                    'border': 'none'

                }
            }]
        },{
             xtype: 'combobox',
             reference: 'order_type',
             publishes: 'value',
             fieldLabel: Locale.getMsg('수주가능성'),
             labelWidth: 80,
             labelAlign: 'right',
             displayField: 'name',
             valueField: 'code',
             name: 'order_type',
             anchor: '-15',
             store: {
                 fields: ['name','code'],
                 data: [{ name: '적용', code: 'Y' }, { name: '미적용',code: 'N' }],
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
             xtype: 'combobox',
             reference: 'unit',
             publishes: 'value',
             fieldLabel: Locale.getMsg('단위'), 
             labelAlign: 'right',
             displayField: 'name',
             valueField: 'code',
             name: 'unit',
             anchor: '-15',
             store: {
                 fields: ['name','code'],
                 data: [{ name: Locale.getMsg('억원'), code: '100000000' }, { name: Locale.getMsg('백만원'), code: '1000000' },{ name: Locale.getMsg('천원'), code: '1000' },{ name: Locale.getMsg('원'), code: '1' }],
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
        xtype: 'combobox',
        reference: 'sales_base',
        labelWidth: 80,
        itemId: 'sales_base',
        publishes: 'value',
        fieldLabel: Locale.getMsg('매출기준'),
        labelAlign: 'right',
        displayField: 'name',
        valueField: 'name',
        name: 'sales_base',
        anchor: '-15',
        store: {
            fields: [ 'name' ], 
            data: [{ name: '세금계산서'},{ name: '거래명세표'}],
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
    } 
        ] 
    });

    Ext.define('Ysn.view.report.salesTargetSalessearchController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.salesTargetSales-search',
        init: function () {
            this.lookupReference('bizGroup').store.load();
            this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true));
            this.lookupReference('dstr_type').store.load({ params: { up_code_id: 'DSTR_TYPE' } });
            this.lookupReference('dstr_type').setValue('');
            this.lookupReference('biz_type').store.load({ params: { up_code_id: 'BIZ_TYPE' } });
            this.lookupReference('biz_type').setValue('');  
            this.lookupReference('item_type').store.load({ params: { up_code_id: 'ITEM_TYPE' } });
            this.lookupReference('item_type').setValue('');
            this.lookupReference('order_type').setValue(this.lookupReference('order_type').getStore().getAt(1).get('code'));
            this.lookupReference('unit').setValue(this.lookupReference('unit').getStore().getAt(2).get('code'));
            this.lookupReference('sales_base').setValue(this.lookupReference('sales_base').getStore().getAt(0).get('name'));
            var Today = new Date();
            //this.lookupReference('sdate').setValue(Today.getFullYear() + '-' + ('0' + (Today.getMonth() + 1)).slice(-2) + '-' + '01');
            this.lookupReference('base_yy').store.load();
            this.lookupReference('base_yy').setValue(Today.getFullYear());
            this.lookupReference('base_mm1').store.load();
			this.lookupReference('base_mm1').setValue('01');
            this.lookupReference('base_mm2').store.load();
            this.lookupReference('base_mm2').setValue('0' + (Today.getMonth() + 1));
		    if(auth_id != 'A001'){
		    // this.lookupReference('bizGroup').setConfig({'readOnly':true});
		    // if(dept_level == '4') this.lookupReference('deptGroup').setConfig({'readOnly':true});
	     }
        },
        openWindow: function () {
            var win = Ext.getCmp('commonSearchcustomer');
            if (!win) {
                win = new Ysn.view.common.searchcustomer();
            }
            var hidfield = win.query('#paentFrm')[0];
            hidfield.setValue('salesTargetSales-search');
		    win.down('#cust_nm').setValue(this.lookupReference('cust_nm').getValue());
            Ext.getCmp('report-salesTargetSales').add(win);
            win.setPosition(20, -150);
            win.show();
        },
        resetVal: function () {
            this.lookupReference('cust_nm').setValue('');
            this.lookupReference('cust_cd').setValue('');
        },
        openWindow2: function () {
            var win2 = Ext.getCmp('commonSearchEndUser');
            if (!win2) {
                win2 = new Ysn.view.common.searchEndUser();
            }
            var hidfield = win2.query('#paentFrm')[0];
		    win2.down('#euser_nm').setValue(this.lookupReference('euser_nm').getValue());
            hidfield.setValue('salesTargetSales-search');
            Ext.getCmp('report-salesTargetSales').add(win2);
            win2.setPosition(100, -150);
            win2.show();
        },
        resetVal2: function () {
            this.lookupReference('euser_nm').setValue('');
            this.lookupReference('euser_cd').setValue('');
        },
        openWindow3: function () {
            var win3 = Ext.getCmp('commonSearchcustomer2');
            if (!win3) {
                win3 = new Ysn.view.common.searchcustomer2();
            }
            var hidfield = win3.query('#paentFrm')[0];
		    win3.down('#cust_nm').setValue(this.lookupReference('bcust_nm').getValue());
            hidfield.setValue('salesTargetSales-search');
            Ext.getCmp('report-salesTargetSales').add(win3);
            win3.setPosition(20, -150);
            win3.show();
        },
        resetVal3: function () {
            this.lookupReference('bcust_nm').setValue('');
            this.lookupReference('bcust_cd').setValue('');
        },
        onChangeBiz: function (el, newVal, oldVal, e) {
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
        onChangeDept: function (el, newVal, oldVal, e) {
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
        onSubmitClick: function () {
            var pl = Ext.getCmp('salesTargetSalesList');

            pl.getStore().load(
                    {
                        params: {
                            deptGroup: this.lookupReference('deptGroup').getValue(),
                            bizGroup: this.lookupReference('bizGroup').getValue(),
                            user_cd: this.lookupReference('userGroup').getValue(),
                            cust_cd: this.lookupReference('cust_cd').getValue(),
                            dstr_type: this.lookupReference('dstr_type').getValue(),
                            biz_type: this.lookupReference('biz_type').getValue(),
                            bcust_cd: this.lookupReference('bcust_cd').getValue(),
                            enduser_nm: this.lookupReference('euser_nm').getValue(),
                            enduser_cd: this.lookupReference('euser_cd').getValue(),
                            item_type: this.lookupReference('item_type').getValue(),  
                            base_yy: this.lookupReference('base_yy').getValue(),
						    base_mm1: this.lookupReference('base_mm1').getValue(),
						    base_mm2: this.lookupReference('base_mm2').getValue(),  
						    order_type: this.lookupReference('order_type').getValue(),  
						    unit: this.lookupReference('unit').getValue(),
						    sales_base: this.lookupReference('sales_base').getValue()
                        },
                        callback: function (records, operation, success) {
                            var col = pl.getController('report-salesTargetSalesList').changeColumns(operation._params.base_yy, parseInt(operation._params.base_mm1), parseInt(operation._params.base_mm2));
                            pl.reconfigure(col);

                        }
                    }
        );
        }


    });


    Ext.define('Ysn.view.report.salesTargetSalesList', {
        extend: 'Ext.grid.Panel',
        xtype: 'salesTargetSalesList',
        requires: [
            'Ysn.view.report.salesTargetSalesListController', 
		    'Ysn.store.salesTargetSalesList'
        ],
    
        controller: 'report-salesTargetSalesList',     
	    store: {
	        type: 'salesTargetSalesList',
		    autoLoad: false,
            autoDestroy: true
        }, 
	    style: { 'borderTop': '1px solid gray' },

	    loadMask: true,
	    enableLocking: true,
	    id: 'salesTargetSalesList',
        columnLines: true,
	    multiColumnSort: true, 
	    plugins: ['pmh-grid-exporter'],
	    /*features: [{
	        ftype: 'summary',
	        dock: 'top'
	    }],*/
	    
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

    Ext.define('Ysn.view.report.salesTargetSalesListController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.report-salesTargetSalesList',
        init: function () {
            var Today = new Date();            
            var col = this.changeColumns(Today.getFullYear(), '1', Today.getMonth() + 1);
            this.getView().reconfigure(col); 
        },
        changeDec: function (value) {
            return Ysn.Util.changeDec(value);
        },
        changeDbl: function (value) {
            return Ysn.Util.changeDbl(value);
        },
        changePercent: function (value) {
            return Ysn.Util.changeDbl(value) + '%';
        },
        changeColumns: function (year, month1, month2) {
            var preyear = parseInt(year) - 1;
            var mm1 = parseInt(month1);
            var mm2 = parseInt(month2);

            var columns = [
                { text: Locale.getMsg('영업팀'), width: 80, dataIndex: 'UP_DEPT_NM', sortable: true },
                { text: Locale.getMsg('영업파트'), width: 80, dataIndex: 'DEPT_NM', sortable: true },
                { text: Locale.getMsg('영업담당'), width: 80, dataIndex: 'USER_NM', sortable: true },
                { text: Locale.getMsg('유통구조'), width: 100, dataIndex: 'DSTR_TYPE_NM', sortable: true },
			    { text: Locale.getMsg('사업유형'), width: 100, dataIndex: 'BIZ_TYPE_NM', sortable: true },
			    { text: Locale.getMsg('품목유형'), width: 80, dataIndex: 'ITEM_TYPE_NM', sortable: true },
                { text: Locale.getMsg('거래처'), width: 125, dataIndex: 'CUST_NM', sortable: true },
			    { text: Locale.getMsg('End User'), width: 125, dataIndex: 'EUSER_NM', sortable: true },
			    {
			        text: year + "년" + mm1 + "월부터 "+ mm2 +"월까지 수주합계",
			        columns: [
                        { text: preyear+"년 실적", width: 125, dataIndex: 'AMOUNT1', sortable: true, renderer: 'changeDbl' },
                        {
                            text: year+"년", 
                            columns: [
                                { text: '목표', width: 125, dataIndex: 'AMOUNT2', sortable: true, renderer: 'changeDbl' },
                                { text: '실적', width: 125, dataIndex: 'AMOUNT3', sortable: true, renderer: 'changeDbl' }
                            ]
                        },
                        {
                            text: "목표대비",
                            columns: [
                                { text: '증감내역', width: 125, dataIndex: 'AMOUNT4', sortable: true, renderer: 'changeDbl' },
                                { text: '달성율', width: 125, dataIndex: 'ARCHIVE_RATE5', sortable: true, renderer: 'changePercent' }
                            ]
                        },
                        {
                            text: "전년대비",
                            columns: [
                                { text: '증감내역', width: 125, dataIndex: 'AMOUNT6', sortable: true, renderer: 'changeDbl' },
                                { text: '신장율', width: 125, dataIndex: 'ELONG_RATE7', sortable: true, renderer: 'changePercent' }
                            ]
                        }
			        ]
			    },
			    {
			        text: year+"년 수주실적 및 추정", reference: 'col3',
			        columns: [
                        { text: preyear+"년간 실적", reference: 'col4', width: 125, dataIndex: 'AMOUNT11', sortable: true, renderer: 'changeDbl' },
                        {
                            text: year+"년", reference: 'col5',
                            columns: [
                                { text: '년간목표', width: 125, dataIndex: 'AMOUNT12', sortable: true, renderer: 'changeDbl' },
                                { text: '실적+추정', width: 125, dataIndex: 'AMOUNT13', sortable: true, renderer: 'changeDbl' }
                            ]
                        },
                        {
                            text: "목표대비",
                            columns: [
                                { text: '증감내역', width: 125, dataIndex: 'AMOUNT14', sortable: true, renderer: 'changeDbl' },
                                { text: '달성율', width: 125, dataIndex: 'ARCHIVE_RATE15', sortable: true, renderer: 'changePercent' }
                            ]
                        },
                        {
                            text: "전년대비",
                            columns: [
                                { text: '증감내역', width: 125, dataIndex: 'AMOUNT16', sortable: true, renderer: 'changeDbl' },
                                { text: '신장율', width: 125, dataIndex: 'ELONG_RATE17', sortable: true, renderer: 'changePercent' }
                            ]
                        }
			        ]
			    },
                {
                    text: year+"년 월별 수주실적 및 추정", reference: 'col6',
                    columns: [
                        { text: "1월", width: 125, dataIndex: 'MM1', sortable: true, renderer: 'changeDbl' },
			            { text: "2월", width: 125, dataIndex: 'MM2', sortable: true, renderer: 'changeDbl' },
			            { text: "3월", width: 125, dataIndex: 'MM3', sortable: true, renderer: 'changeDbl' },
			            { text: "4월", width: 125, dataIndex: 'MM4', sortable: true, renderer: 'changeDbl' },
			            { text: "5월", width: 125, dataIndex: 'MM5', sortable: true, renderer: 'changeDbl' },
			            { text: "6월", width: 125, dataIndex: 'MM6', sortable: true, renderer: 'changeDbl' },
			            { text: "7월", width: 125, dataIndex: 'MM7', sortable: true, renderer: 'changeDbl' },
			            { text: "8월", width: 125, dataIndex: 'MM8', sortable: true, renderer: 'changeDbl' },
			            { text: "9월", width: 125, dataIndex: 'MM9', sortable: true, renderer: 'changeDbl' },
			            { text: "10월", width: 125, dataIndex: 'MM10', sortable: true, renderer: 'changeDbl' },
			            { text: "11월", width: 125, dataIndex: 'MM11', sortable: true, renderer: 'changeDbl' },
			            { text: "12월", width: 125, dataIndex: 'MM12', sortable: true, renderer: 'changeDbl' }
                    ]
                }
            ];
            return columns;
        }
    });

   

    Ext.define('Ysn.view.report.salesTargetSales', {
        extend: 'Ext.panel.Panel',
        xtype: 'report-salesTargetSales',
        requires: [
            'Ysn.view.report.salesTargetSalesController',
		    'Ysn.view.common.searchcustomer',
            'Ysn.view.report.salesTargetSalessearch',
            'Ysn.view.report.salesTargetSalesList'
        ],

        controller: 'report-salesTargetSales',
        reference: 'report-salesTargetSales',
        id: 'report-salesTargetSales',
        layout: 'border',
        width: 500,
        height: 400,
        overflow: 'hidden',
        scrollable: false,
        header: false,
        bodyBorder: false,
        defaults: {
            collapsible: true,
            split: true,
            bodyPadding: 0
        },

        dockedItems: [
	                   {
	                       title: '',
	                       xtype: 'salesTargetSales-search',
	                       reference: 'salesTargetSalesSearch',
	                       itemId: 'salesTargetSalesSearch',
                           scrollable: true,
	                       collapsible: true,
	                       floatable: true,
	                       split: true,
	                       padding: '0 0 0 0',
	                       dock: 'top',
	                       height: 220
	                   }
        ],
        tbar: {

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
		    }*/]
        },

        items: [
		    {
		        header: false,
		        region: 'center',
		        xtype: 'salesTargetSalesList',
		        reference: 'salesTargetSalesList',
		        itemId: 'salesTargetSalesList',
		        listeners: {
		            //select: 'itemclick'
		        }

		    } 
        ]
    });

    ///<reference path="~/Client/ext/build/ext-all-debug.js">
    ///<reference path="~/Client/ext/build/ext-debug.js">
    Ext.define('Ysn.view.report.salesTargetSalesController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.report-salesTargetSales',
        requires: [
	        'Ysn.store.*'
        ],
        init: function () {
            this.lookupReference('salesTargetSalesSearch').setTitle(pageTitle); 
        },
       
        xlsExport: function () {

            Ext.getCmp('salesTargetSalesList').saveDocumentAs({
			headerRowCnt: 3,
                type: 'xlsx',
                title: Ext.getCmp('salesTargetSales-search').getTitle(),
                fileName: '매출목표Vs실적분석'
            });
        }
    });




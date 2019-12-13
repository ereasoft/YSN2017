    Ext.define('Ysn.view.report.selectSalesResultsearch', {
        extend: 'Ext.panel.Panel',
        xtype: 'selectSalesResult-search',

        requires: [
            'Ysn.view.report.selectSalesResultsearchController', 
	        'Ysn.store.*'
        ],

        controller: 'selectSalesResult-search',

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
        id: 'selectSalesResult-search',
        reference: 'selectSalesResult-search',
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
                                var bizCd = Ext.getCmp('selectSalesResult-search').down('#bizGroup');
                                if (store.data.items.length < 2) {
                                    Ext.getCmp('selectSalesResult-search').down('#user_cd').store.load({ params: { dept_cd: bizCd.getValue(), up_dept_cd: '' } });
                                } else {
                                    Ext.getCmp('selectSalesResult-search').down('#user_cd').store.load({ params: { dept_cd: '', up_dept_cd: bizCd.getValue() } });
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
            width: 235,
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
            reference: 'base_type',
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
                width: 85,
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
                xtype: 'combobox',
                hidden: true,
                reference: 'base_div1',
                publishes: 'value',
                labelAlign: 'right',
                width: 85,
                displayField: 'DIV',
                valueField: 'VAL',
                name: 'base_mm1',
                itemId: 'base_div1',
                maskOnDisable: true,
                anchor: '-15',
                store: {
                    type: 'div'
                },
                minChars: 0,
                queryMode: 'local',
                margin: '0 10 0 0'
            },{
                xtype: 'label',  
				text: '-',
                width: 10
            },{
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
            },{
                xtype: 'combobox',
                hidden: true,
                reference: 'base_div2',
                publishes: 'value',
                labelAlign: 'right',
                width: 85,
                displayField: 'DIV',
                valueField: 'VAL',
                name: 'base_mm1',
                itemId: 'base_div2',
                maskOnDisable: true,
                anchor: '-15',
                store: {
                    type: 'div'
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
	       width: 235,
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
            width: 235,
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
        queryMode: 'local'
    }
        ]
    });

    Ext.define('Ysn.view.report.selectSalesResultsearchController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.selectSalesResult-search',
        init: function () {
            this.lookupReference('bizGroup').store.load();
            this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true));
            this.lookupReference('dstr_type').store.load({ params: { up_code_id: 'DSTR_TYPE', lang:localeCd } });
            this.lookupReference('dstr_type').setValue('');
            this.lookupReference('biz_type').store.load({ params: { up_code_id: 'BIZ_TYPE', lang:localeCd } });
            this.lookupReference('biz_type').setValue('');  
            this.lookupReference('item_type').store.load({ params: { up_code_id: 'ITEM_TYPE', lang:localeCd } });
            this.lookupReference('item_type').setValue('');
            this.lookupReference('order_type').setValue(this.lookupReference('order_type').getStore().getAt(1).get('code'));
            this.lookupReference('unit').setValue(this.lookupReference('unit').getStore().getAt(2).get('code'));
            this.lookupReference('sales_base').setValue(this.lookupReference('sales_base').getStore().getAt(0).get('name'));

            var Today = new Date();
            //this.lookupReference('sdate').setValue(Today.getFullYear() + '-' + ('0' + (Today.getMonth() + 1)).slice(-2) + '-' + '01');
            this.lookupReference('base_yy').store.load();
            this.lookupReference('base_yy').setValue(Today.getFullYear()); 
			this.lookupReference('base_mm1').setValue('01'); 
			this.lookupReference('base_mm2').setValue('0' + (Today.getMonth() + 1));
			this.lookupReference('base_div1').setValue('1');
			this.lookupReference('base_div2').setValue(Math.ceil((Today.getMonth() + 1) / 3));
		    if(auth_id != 'A001'){
		    // this.lookupReference('bizGroup').setConfig({'readOnly':true});
		   //  if(dept_level == '4') this.lookupReference('deptGroup').setConfig({'readOnly':true});
	     }
        },
        openWindow: function () {
            var win = Ext.getCmp('commonSearchcustomer');
            if (!win) {
                win = new Ysn.view.common.searchcustomer();
            }
            var hidfield = win.query('#paentFrm')[0];
            hidfield.setValue('selectSalesResult-search');
		    win.down('#cust_nm').setValue(this.lookupReference('cust_nm').getValue());
            Ext.getCmp('report-selectSalesResult').add(win);
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
            hidfield.setValue('selectSalesResult-search');
            Ext.getCmp('report-selectSalesResult').add(win2);
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
            hidfield.setValue('selectSalesResult-search');
            Ext.getCmp('report-selectSalesResult').add(win3);
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
            var pl = Ext.getCmp('selectSalesResultList');

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
                             

                        }
                    }
        );
        }


    });


    Ext.define('Ysn.view.report.selectSalesResultList', {
        extend: 'Ext.grid.Panel',
        xtype: 'selectSalesResultList',
        requires: [
            'Ysn.view.report.selectSalesResultListController', 
		    'Ysn.store.selectSalesResultList'
        ],
    
        controller: 'report-selectSalesResultList',     
	    store: {
	        type: 'selectSalesResultList',
		    autoLoad: false,
            autoDestroy: true
        }, 
	    style: { 'borderTop': '1px solid gray' },

	    loadMask: true,
	    enableLocking: true,
	    id: 'selectSalesResultList',
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

    Ext.define('Ysn.view.report.selectSalesResultListController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.report-selectSalesResultList',
        init: function () {
            var Today = new Date();            
            var col = this.changeColumns(Today.getFullYear(), '1', Today.getMonth() + 1, '1');
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
        changeColumns: function (year, month1, month2, type) {
            var preyear = parseInt(year) - 1;
            var mm1 = parseInt(month1);
            var mm2 = parseInt(month2);

            var columns1 = [
                { text: Locale.getMsg('영업팀'), width: 80, dataIndex: 'UP_DEPT_NM', sortable: true },
                { text: Locale.getMsg('영업파트'), width: 80, dataIndex: 'DEPT_NM', sortable: true },
                { text: Locale.getMsg('영업담당'), width: 80, dataIndex: 'USER_NM', sortable: true },
                { text: Locale.getMsg('유통구조'), width: 100, dataIndex: 'DSTR_TYPE_NM', sortable: true },
			    { text: Locale.getMsg('사업유형'), width: 100, dataIndex: 'BIZ_TYPE_NM', sortable: true },
			    { text: Locale.getMsg('품목유형'), width: 80, dataIndex: 'ITEM_TYPE_NM', sortable: true },
                { text: Locale.getMsg('거래처'), width: 125, dataIndex: 'CUST_NM', sortable: true },
			    { text: Locale.getMsg('End User'), width: 125, dataIndex: 'EUSER_NM', sortable: true },
			    {
			        text: mm1 + "월부터 " + mm2 + "월까지 합계실적",
			        columns: [
                        { text: preyear + "년 실적", width: 125, dataIndex: 'AMOUNT1', sortable: true, renderer: 'changeDbl' },
                        { text: year + "년", width: 125, dataIndex: 'AMOUNT2', sortable: true, renderer: 'changeDbl' },
                        { text: '증감내역', width: 125, dataIndex: 'AMOUNT3', sortable: true, renderer: 'changeDbl' },
                        { text: '신장율', width: 125, dataIndex: 'RATE4', sortable: true, renderer: 'changePercent' }
			        ]
			    },
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
            ];
            var columns2 = [
                { text: Locale.getMsg('영업팀'), width: 80, dataIndex: 'UP_DEPT_NM', sortable: true },
                { text: Locale.getMsg('영업파트'), width: 80, dataIndex: 'DEPT_NM', sortable: true },
                { text: Locale.getMsg('영업담당'), width: 80, dataIndex: 'USER_NM', sortable: true },
                { text: Locale.getMsg('유통구조'), width: 100, dataIndex: 'DSTR_TYPE_NM', sortable: true },
                { text: Locale.getMsg('사업유형'), width: 100, dataIndex: 'BIZ_TYPE_NM', sortable: true },
                { text: Locale.getMsg('품목유형'), width: 80, dataIndex: 'ITEM_TYPE_NM', sortable: true },
                { text: Locale.getMsg('거래처'), width: 125, dataIndex: 'CUST_NM', sortable: true },
                { text: Locale.getMsg('End User'), width: 125, dataIndex: 'EUSER_NM', sortable: true },
                {
                    text: mm1 + "분기부터 " + mm2 + "분기까지 합계실적",
                    columns: [
                        { text: preyear + "년 실적", width: 125, dataIndex: 'AMOUNT1', sortable: true, renderer: 'changeDbl' },
                        { text: year + "년", width: 125, dataIndex: 'AMOUNT2', sortable: true, renderer: 'changeDbl' },
                        { text: '증감내역', width: 125, dataIndex: 'AMOUNT3', sortable: true, renderer: 'changeDbl' },
                        { text: '신장율', width: 125, dataIndex: 'RATE4', sortable: true, renderer: 'changePercent' }
                    ]
                },
                { text: "1분기", width: 125, dataIndex: 'MM1', sortable: true, renderer: 'changeDbl' },
                { text: "2분기", width: 125, dataIndex: 'MM2', sortable: true, renderer: 'changeDbl' },
                { text: "3분기", width: 125, dataIndex: 'MM3', sortable: true, renderer: 'changeDbl' },
                { text: "4분기", width: 125, dataIndex: 'MM4', sortable: true, renderer: 'changeDbl' } 
            ];
            if (type == '1') {
                return columns1;
            } else {
                return columns2;
            }
        }
    });

   

    Ext.define('Ysn.view.report.selectSalesResult', {
        extend: 'Ext.panel.Panel',
        xtype: 'report-selectSalesResult',
        requires: [
            'Ysn.view.report.selectSalesResultController',
		    'Ysn.view.common.searchcustomer',
            'Ysn.view.report.selectSalesResultsearch',
            'Ysn.view.report.selectSalesResultList'
        ],

        controller: 'report-selectSalesResult',
        reference: 'report-selectSalesResult',
        id: 'report-selectSalesResult',
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
	                       xtype: 'selectSalesResult-search',
	                       reference: 'selectSalesResultSearch',
	                       itemId: 'selectSalesResultSearch',
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
                xtype: 'segmentedbutton',
                items: [{ text: '월별매출실적', pressed: true },
                        { text: '분기별매출실적' } 
                ],
                listeners: {
                    toggle: 'btnToggle'
                }
							
            }, 
		    {
		        xtype: 'label',
		        reference: 'total',
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
		        xtype: 'selectSalesResultList',
		        reference: 'selectSalesResultList',
		        itemId: 'selectSalesResultList',
		        listeners: {
		            //select: 'itemclick'
		        }

		    } 
        ]
    });

    ///<reference path="~/Client/ext/build/ext-all-debug.js">
    ///<reference path="~/Client/ext/build/ext-debug.js">
    Ext.define('Ysn.view.report.selectSalesResultController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.report-selectSalesResult',
        requires: [
	        'Ysn.store.*'
        ],
        init: function () {
            this.lookupReference('selectSalesResultSearch').setTitle(pageTitle); 
        },
        btnToggle: function (container, button, pressed) {
            var pl = this.getView().lookupReference('selectSalesResultSearch');
            var p2 = this.getView().lookupReference('selectSalesResultList');
            var col, store;
            switch (button.getText()) {
                case "월별매출실적":
                    pl.lookupReference('base_type').setFieldLabel('기준년월');
                    pl.lookupReference('base_mm1').show();
                    pl.lookupReference('base_mm2').show();
                    pl.lookupReference('base_div1').hide();
                    pl.lookupReference('base_div2').hide();
                    col = p2.getController('report-selectSalesResultList').changeColumns(pl.lookupReference('base_yy').getValue(), parseInt(pl.lookupReference('base_mm1').getValue()), parseInt(pl.lookupReference('base_mm2').getValue()), '1');
                    store = 'selectSalesResultList';
                    break;
                case "분기별매출실적":
                    pl.lookupReference('base_type').setFieldLabel('기준분기');
                    pl.lookupReference('base_mm1').hide();
                    pl.lookupReference('base_mm2').hide();
                    pl.lookupReference('base_div1').show();
                    pl.lookupReference('base_div2').show();
                    col = p2.getController('report-selectSalesResultList').changeColumns(pl.lookupReference('base_yy').getValue(), parseInt(pl.lookupReference('base_div1').getValue()), parseInt(pl.lookupReference('base_div2').getValue()), '2');
                    store = 'selectDivOrderResultList';
                    break; 
            }
            p2.getStore().removeAll();
            this.getView().lookupReference('total').setText('Total : 0');
            p2.reconfigure(store,col);
        },
        xlsExport: function () {

            Ext.getCmp('selectSalesResultList').saveDocumentAs({
			    headerRowCnt: 2,
                type: 'xlsx',
                title: Ext.getCmp('selectSalesResult-search').getTitle(),
                fileName: '매출실적분석'
            });
        }
    });




    Ext.define('Ysn.view.businessopportunity.salesOrdersearch', {
        extend: 'Ext.panel.Panel',
        xtype: 'salesOrder-search',

        requires: [
            'Ysn.view.businessopportunity.salesOrdersearchController',
	  	    'Ysn.view.common.searchcustomer',
	        'Ysn.store.*'
        ],

        controller: 'salesOrder-search',

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
        id: 'salesOrder-search',
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
                                var bizCd = Ext.getCmp('salesOrder-search').down('#bizGroup');
                                if (store.data.items.length < 2) {
                                    Ext.getCmp('salesOrder-search').down('#user_cd').store.load({ params: { dept_cd: bizCd.getValue(), up_dept_cd: '' } });
                                } else {
                                    Ext.getCmp('salesOrder-search').down('#user_cd').store.load({ params: { dept_cd: '', up_dept_cd: bizCd.getValue() } });
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
                reference: 'year',
                publishes: 'value',
                width: 90,
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
                margin: '0 10 0 0'
            }/*, {
                xtype: 'combobox',
                reference: 'day',
                publishes: 'value',
                labelAlign: 'right',
                width: 70,
                displayField: 'DAY',
                valueField: 'VAL',
                name: 'day',
                itemId: 'day',
                maskOnDisable: true,
                anchor: '-15',
                store: {
                    type: 'day',
                    listeners: {
                        load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;  
                                store.insert(0,{DAY:'전체',VAL:''});
                            }
                        }
  
                },
                autoLoad: true,
                autoDestroy: true,
                minChars: 0,
                queryMode: 'local',
                margin: '0 10 0 0'
            } */
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
        },  {
            xtype: 'fieldcontainer',
            labelAlign: 'right',
            fieldLabel: Locale.getMsg('Order구분'),
            combineErrors: true,
            msgTarget: 'side',
            layout: 'hbox', 
            defaults: {
                //flex: 1,
                //hideLabel: true
            },
            items: [
                {
                    xtype: 'combobox',
                    reference: 'ord_gb_l',
                    publishes: 'value',
                    displayField: 'CODE_NM',
                    valueField: 'CODE_ID',
                    name: 'ord_gb_l',
                    width: 95,
                    anchor: '-15',
                    store: {
                        type: 'TcodeAll'
                    },
                    minChars: 0,
                    margin: '0 5 0 0',
                    queryMode: 'local' 
                }, {
                    xtype: 'combobox',
                    reference: 'ord_gb_m',
                    publishes: 'value',
                    displayField: 'CODE_NM',
                    valueField: 'CODE_ID',
                    name: 'ord_gb_m',
                    width: 120,
                    anchor: '-15',
                    store: {
                        type: 'TcodeAll'
                    },
                    minChars: 0,
                    margin: '0 5 0 0',
                    queryMode: 'local' 
                }, {
                    xtype: 'combobox',
                    reference: 'ord_gb_s',
                    publishes: 'value',
                    displayField: 'CODE_NM',
                    valueField: 'CODE_ID',
                    name: 'ord_gb_s',
                    width: 120,
                    anchor: '-15',
                    store: {
                        type: 'TcodeAll'
                    },
                    minChars: 0,
                    queryMode: 'local'
                }
            ]
        }, {
            xtype: 'combobox',
            reference: 'wso_gubun',
            publishes: 'value',
            fieldLabel: Locale.getMsg('수주구분'),
            labelWidth: 80,
            labelAlign: 'right',
            displayField: 'CODE_NM',
            valueField: 'CODE_ID',
            name: 'wso_gubun',
            anchor: '-15',
            store: {
                type: 'TcodeAll'
            },
            minChars: 0,
            queryMode: 'local'
        }, {
            xtype: 'fieldcontainer',
            fieldLabel: 'End User',
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
                name: 'euser_nm',
                reference: 'euser_nm',
                itemId: 'euser_nm',
                margin: '0 5 0 0',
                width: 270
            }, {
                xtype: 'hiddenfield',
                reference: 'euser_cd',
                name: 'euser_cd',
                itemId: 'euser_cd'
            }, {
                iconCls: 'x-fa fa-search',
                xtype: 'button',
                scale: 'small',
                margin: '0 5 0 0',
                handler: 'openWindow2',
                style: {
                    'border': 'none'

                }
            }, {
                iconCls: 'x-fa fa-remove',
                xtype: 'button',
                scale: 'small',
                handler: 'resetVal2',
                style: {
                    'background-color': 'red !important',
                    'background-image': 'none',
                    'border': 'none'

                }
            }]
        },
         {
             xtype: 'fieldcontainer', 
             labelAlign: 'right', 
             fieldLabel: Locale.getMsg('품목유형/명'),
             combineErrors: true,
             msgTarget: 'side',
             layout: 'hbox', 
             defaults: {
                 //flex: 1,
                 //hideLabel: true
             },
             items: [
                 {
                     xtype: 'combobox',
                     reference: 'item_type',
                     publishes: 'value', 
                     displayField: 'CODE_NM',
                     valueField: 'CODE_ID',
                     name: 'item_type',
                     width:100,
                     anchor: '-15',
                     store: {
                         type: 'TcodeAll'
                     },
                     minChars: 0,
                     queryMode: 'local',
                     margin: '0 5 0 0'
                 }, {
                     xtype: 'textfield',
                     name: 'item_nm',
                     reference: 'item_nm',
                     itemId: 'item_nm',
                     margin: '0 5 0 0',
                     width: 150
                 }
             ]
         },
         {
             xtype: 'fieldcontainer',
             labelAlign: 'right',
             fieldLabel: Locale.getMsg('품목분류'),
             combineErrors: true,
             msgTarget: 'side',
             layout: 'hbox', 
             defaults: {
                 //flex: 1,
                 //hideLabel: true
             },
             items: [
                 {
                     xtype: 'combobox',
                     reference: 'item_level1',
                     publishes: 'value', 
                     displayField: 'NAME1',
                     valueField: 'CODE1',
                     name: 'item_level1',
                     width: 95,
                     anchor: '-15',
                     store: {
                         type: 'ItemLevel1'
                     },
                     minChars: 0,
                     queryMode: 'local',
                     margin: '0 5 0 0',
                     listeners: {
                         change: 'onItemLv1'
                     }
                 }, {
                     xtype: 'combobox',
                     reference: 'item_level2',
                     publishes: 'value',
                     displayField: 'NAME2',
                     valueField: 'CODE2',
                     name: 'item_level2',
                     width: 100,
                     anchor: '-15',
                     margin: '0 5 0 0',
                     store: {
                         type: 'ItemLevel2'
                     },
                     minChars: 0,
                     queryMode: 'local',
                     listeners: {
                         change: 'onItemLv2'
                     }
                 }, {
                     xtype: 'combobox',
                     reference: 'item_level3',
                     publishes: 'value',
                     displayField: 'NAME3',
                     valueField: 'CODE3',
                     name: 'item_level3',
                     width: 100,
                     anchor: '-15',
                     store: {
                         type: 'ItemLevel3'
                     },
                     minChars: 0,
                     queryMode: 'local'
                 }
             ]
         },
         {
             xtype: 'combobox',
             reference: 'salesBdate',
             publishes: 'value',
             fieldLabel: Locale.getMsg('납품현황'),
             labelWidth: 80,
             labelAlign: 'right',
             displayField: 'name',
             valueField: 'code',
             name: 'salesBdate',
             anchor: '-15',
             store: {
                 fields: ['name','code'],
                 data: [{ name: Locale.getMsg('전체'), code: 'all' }, { name: Locale.getMsg('당월'),code: 'month' }],
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
        }, {
            xtype: 'textfield',
            fieldLabel: 'SMP.No',
            labelAlign: 'right',
            name: 'smp_cd',
            reference: 'smp_cd',
            itemId: 'smp_cd'
        },{
            xtype: 'textfield',
            fieldLabel: Locale.getMsg('카다로그'),
            labelAlign: 'right',
            name: 'ctlg_cd',
            reference: 'ctlg_cd',
            itemId: 'ctlg_cd'
        }, {
            xtype: 'textfield',
            fieldLabel: Locale.getMsg('PO번호'), 
            labelWidth: 80,
            labelAlign: 'right',
            name: 'po_cd',
            reference: 'po_cd',
            itemId: 'po_cd',
            margin: '0 5 0 0',
            style: {width:'100%'}
        }
        ]
    });

    Ext.define('Ysn.view.businessopportunity.salesOrdersearchController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.salesOrder-search',
        init: function () {
            this.lookupReference('bizGroup').store.load();
            this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true));
            this.lookupReference('dstr_type').store.load({ params: { up_code_id: 'DSTR_TYPE', lang: localeCd } });
            this.lookupReference('dstr_type').setValue('');
            this.lookupReference('biz_type').store.load({ params: { up_code_id: 'BIZ_TYPE', lang: localeCd } });
            this.lookupReference('biz_type').setValue('');
            this.lookupReference('wso_gubun').store.load({ params: { up_code_id: 'WSO_GUBUN', lang: localeCd } });
            this.lookupReference('wso_gubun').setValue('');
            this.lookupReference('item_level1').store.load();
            this.lookupReference('item_level1').setValue('');
            this.lookupReference('item_type').store.load({ params: { up_code_id: 'ITEM_TYPE', lang: localeCd } });
            this.lookupReference('item_type').setValue('');
            this.lookupReference('ord_gb_l').store.load({ params: {  up_code_id: 'ORDER_GB', value_1: '대', lang: localeCd } });
            this.lookupReference('ord_gb_l').setValue('');
            this.lookupReference('ord_gb_m').store.load({ params: { up_code_id: 'ORDER_GB', value_1: '중', lang: localeCd } });
            this.lookupReference('ord_gb_m').setValue('');
            this.lookupReference('ord_gb_s').store.load({ params: { up_code_id: 'ORDER_GB', value_1: '소', lang: localeCd } });
            this.lookupReference('ord_gb_s').setValue(''); 
            this.lookupReference('salesBdate').setValue('all');
           // this.lookupReference('day').setValue('');

            var Today = new Date();
            //this.lookupReference('sdate').setValue(Today.getFullYear() + '-' + ('0' + (Today.getMonth() + 1)).slice(-2) + '-' + '01');
            this.lookupReference('year').store.load();
            this.lookupReference('year').setValue(Today.getFullYear());
            this.lookupReference('month').store.load();
            this.lookupReference('month').setValue('0' + (Today.getMonth() + 1));
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
            hidfield.setValue('salesOrder-search');
		    win.down('#cust_nm').setValue(this.lookupReference('cust_nm').getValue());
            Ext.getCmp('businessopportunity-salesOrder').add(win);
            win.setPosition(10, -100);
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
            hidfield.setValue('salesOrder-search');
            Ext.getCmp('businessopportunity-salesOrder').add(win2);
            win2.setPosition(10, -100);
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
            hidfield.setValue('salesOrder-search');
            Ext.getCmp('businessopportunity-salesOrder').add(win3);
            win3.setPosition(10, -100);
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
        onItemLv1: function (el, newVal, oldVal, e) {
            var lv2 = this.lookupReference('item_level2');
            var lv3 = this.lookupReference('item_level3');
            if (newVal != '') {
                lv2.store.load({ params: { item_level1: newVal } });

            } else {
                lv2.store.insert(0, { CODE2: '', NAME2: Locale.getMsg('전체') });
                lv3.store.insert(0, { CODE3: '', NAME3: Locale.getMsg('전체') });
            }
            lv2.setValue('');
            lv2.doQuery();
            lv3.setValue('');
            lv3.doQuery();
            el.focus();

        },
        onItemLv2: function (el, newVal, oldVal, e) {
            var lv1 = this.lookupReference('item_level1');
            var lv3 = this.lookupReference('item_level3');
            if (newVal != '') {
                lv3.store.load({ params: { item_level1: lv1.getValue(), item_level2: newVal } });

            } else { 
                lv3.store.insert(0, { CODE3: '', NAME3: Locale.getMsg('전체') });
            } 
            lv3.setValue('');
            lv3.doQuery(); 

        },
        onSubmitClick: function () {
            //console.log(Ext.getCmp('productinquiryinquiry'));
            Ext.getStore('salesOrderList').load(
                    {
                        params: {
                            deptGroup: this.lookupReference('deptGroup').getValue(),
                            bizGroup: this.lookupReference('bizGroup').getValue(),
                            user_cd: this.lookupReference('userGroup').getValue(),
                            cust_cd: this.lookupReference('cust_cd').getValue(),
                            dstr_type: this.lookupReference('dstr_type').getValue(),
                            biz_type: this.lookupReference('biz_type').getValue(),
                            bcust_cd: this.lookupReference('bcust_cd').getValue(),
                            euser_cd: this.lookupReference('euser_cd').getValue(),
                            item_type: this.lookupReference('item_type').getValue(),
                            item_nm: this.lookupReference('item_nm').getValue(),
                            wso_gubun: this.lookupReference('wso_gubun').getValue(),
                            item_level1: this.lookupReference('item_level1').getValue(),
                            item_level2: this.lookupReference('item_level2').getValue(),
                            item_level3: this.lookupReference('item_level3').getValue(),
                            smp_cd: this.lookupReference('smp_cd').getValue(),
                            year: this.lookupReference('year').getValue(),
                            month: this.lookupReference('month').getValue(),
                            ord_gb_l: this.lookupReference('ord_gb_l').getValue(),
                            ord_gb_m: this.lookupReference('ord_gb_m').getValue(),
                            ord_gb_s: this.lookupReference('ord_gb_s').getValue(),
                            ctlg_cd: this.lookupReference('ctlg_cd').getValue(),
                            po_cd: this.lookupReference('po_cd').getValue(),
                            salesBdate: this.lookupReference('salesBdate').getValue()/*,
                            day: this.lookupReference('day').getValue()*/
                        }
                    }
        );
        }


    });


    Ext.define('Ysn.view.businessopportunity.salesOrderList', {
        extend: 'Ext.grid.Panel',
        xtype: 'salesOrderList',
        requires: [
            'Ysn.view.businessopportunity.salesOrderListController', 
		    'Ysn.store.salesOrderList',
		    'Ext.grid.filters.Filters' 
        ],
    
        controller: 'businessopportunity-salesOrderList',     
	    store: {
	        type: 'salesOrderList',
		    autoLoad: false,
            autoDestroy: true
        }, 
	    style: { 'borderTop': '1px solid gray' },
	    scrollable: true,
	    loadMask: true,
	    //enableLocking: true,
	    id: 'salesOrderList',
        columnLines: true,
        multiColumnSort: true,
        //forceFit: true,
	    plugins: ['gridfilters', 'pmh-grid-exporter'],
	    features: [{
	        ftype: 'summary',
            dock: 'top'
	    }],
	    columns: [
                {
                    text: Locale.getMsg('접수일'), width: 125, dataIndex: 'ORD_CDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true, filter: true,
                    summaryRenderer: function (value, summaryData, dataIndex) {
                        return Ext.String.format('합계');
                    }
                },
                {
                    text: Locale.getMsg('주문번호'), width: 80, dataIndex: 'LOT_NO', sortable: true,
			     filter: {
				    type: 'string',
				    itemDefaults: {
					    emptyText: Locale.getMsg('검색어입력..')
				    }
		         }
                }, 
                /*{
                    text: Locale.getMsg('품목정보'), width: 200, dataIndex: 'ITEM_NM', sortable: true,
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: Locale.getMsg('검색어입력..')
                        }
                    }
                },*/
                {
                    text: Locale.getMsg('거래처품명'), width: 200, dataIndex: 'DUMMY8', sortable: true,
			      filter: {
				    type: 'string',
				    itemDefaults: {
					    emptyText: Locale.getMsg('검색어입력..')
				    }
		         }
                },
                {
                    text: Locale.getMsg('완성품번'), width: 200, dataIndex: 'ITEM_CD2', sortable: true,
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
			    {text: Locale.getMsg('End User'), width: 125, dataIndex: 'EUSER_NM', sortable: true, 
			      filter: {
				    type: 'string',
				    itemDefaults: {
					    emptyText: Locale.getMsg('검색어입력..')
				    }
		         }
			    },  
			    {text: Locale.getMsg('유통구조'), width: 125, dataIndex: 'DSTR_TYPE_NM', sortable: true, 
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
			    {text: Locale.getMsg('영업담당'), width: 100, dataIndex: 'USER_NM', sortable: true, 
			      filter: {
				    type: 'string',
				    itemDefaults: {
					    emptyText: Locale.getMsg('검색어입력..')
				    }
		         }
			    },
			    {
			        text: Locale.getMsg('생산파트'), width: 100, dataIndex: 'JNB_DEPT_NM', sortable: true,
			        filter: {
			            type: 'string',
			            itemDefaults: {
			                emptyText: Locale.getMsg('검색어입력..')
			            }
			        }
			    },
			    {
			        text: Locale.getMsg('사업유형'), width: 100, dataIndex: 'BIZ_TYPE_NM', sortable: true,
			      filter: {
				    type: 'string',
				    itemDefaults: {
					    emptyText: Locale.getMsg('검색어입력..')
				    }
		         }
			    }, 
			    {text: Locale.getMsg('품목유형'), width: 125, dataIndex: 'ITEM_TYPE_NM', sortable: true, 
			      filter: {
				    type: 'string',
				    itemDefaults: {
					    emptyText: Locale.getMsg('검색어입력..')
				    }
		         }
			    },
                { text: Locale.getMsg('납기일'), width: 125, dataIndex: 'SALES_PDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true, filter: true },
                { text: Locale.getMsg('확정납기일'), width: 125, dataIndex: 'SALES_DDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true, filter: true },
                { text: Locale.getMsg('최종출고일'), width: 125, dataIndex: 'SALES_ODATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true, filter: true },
			    {
			        text: Locale.getMsg('통화'), width: 125, dataIndex: 'BASE_CRNY', sortable: true, 
			      filter: {
				    type: 'string',
				    itemDefaults: {
					    emptyText: Locale.getMsg('검색어입력..')
				    }
		         }
			    },
			    {
			        text: Locale.getMsg('계약현황'),
			        columns: [
                        {
                            text: Locale.getMsg('수량'), width: 125, dataIndex: 'QTY', sortable: true, renderer: 'changeDec', //summaryType: 'count',,
                            summaryType: 'sum',
                            summaryRenderer: 'changeDec',
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: Locale.getMsg('검색어입력..')
                                }
                            }
                        }, {
                            text: Locale.getMsg('여유분'), width: 125, dataIndex: 'CUST_SP_QTY', sortable: true, renderer: 'changeDec',
                            summaryType: 'sum',
                            summaryRenderer: 'changeDec',
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: Locale.getMsg('검색어입력..')
                                }
                            }
                        }, {
                            text: Locale.getMsg('총수량'), width: 125, sortable: true, renderer: function (value, record) {
                                return Ext.util.Format.number(parseFloat(record.record.data['QTY']) + parseFloat(record.record.data['CUST_SP_QTY']), '0,000');
                            }, 
                            summaryType: 'sum',
                            summaryRenderer: function (value, summaryData, dataIndex) {   
                                return Ext.util.Format.number(summaryData["gridcolumn-1195"] + summaryData["gridcolumn-1196"], '0,000');
                            }
                             
                        }, {
                            text: Locale.getMsg('단가'), width: 125, dataIndex: 'UNIT_PRICE', sortable: true, renderer: 'changeDbl',
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: Locale.getMsg('검색어입력..')
                                }
                            }
                        }, {
                            text: Locale.getMsg('계약금액'), width: 125, dataIndex: 'AMOUNT', sortable: true, renderer: 'changeDbl',
                            summaryType: 'sum',
                            summaryRenderer: 'changeDbl',
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: Locale.getMsg('검색어입력..')
                                }
                            }
                        }, {
                            text: Locale.getMsg('원화금액'), width: 125, dataIndex: 'KRW_AMOUNT', sortable: true, renderer: 'changeDec',
                            summaryType: 'sum',
                            summaryRenderer: 'changeDec',
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: Locale.getMsg('검색어입력..')
                                }
                            }
                        },{
                            text: Locale.getMsg('코멘트'), width: 125, dataIndex: 'REMARK', sortable: true,  
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: Locale.getMsg('검색어입력..')
                                }
                            }
                        }

			        ]
			    },
                {
			        text: Locale.getMsg('수주현황'),
			        columns: [
                        {
                            text: Locale.getMsg('수량'), width: 125, dataIndex: 'WSO_QTY', sortable: true, renderer: 'changeDec',
                            summaryType: 'sum',
                            summaryRenderer: 'changeDec',
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: Locale.getMsg('검색어입력..')
                                }
                            }
                        }, {
                            text: Locale.getMsg('계약금액'), width: 125, dataIndex: 'WSO_AMOUNT', sortable: true, renderer: 'changeDbl',
                            summaryType: 'sum',
                            summaryRenderer: 'changeDbl',
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: Locale.getMsg('검색어입력..')
                                }
                            }
                        }, {
                            text: Locale.getMsg('원화금액'), width: 125, dataIndex: 'WSO_KRW_AMOUNT', sortable: true, renderer: 'changeDec',
                            summaryType: 'sum',
                            summaryRenderer: 'changeDec',
                            filter: {
                                type: 'string',
                                itemDefaults: {
                                    emptyText: Locale.getMsg('검색어입력..')
                                }
                            }
                        }
			        ]
                },
                 {
                     text: Locale.getMsg('납품현황'),
                     columns: [
                         {
                             text: Locale.getMsg('수량'), width: 125, dataIndex: 'OWH_QTY', sortable: true, renderer: 'changeDec',
                             summaryType: 'sum',
                             summaryRenderer: 'changeDec',
                             filter: {
                                 type: 'string',
                                 itemDefaults: {
                                     emptyText: Locale.getMsg('검색어입력..')
                                 }
                             }
                         }, {
                             text: Locale.getMsg('계약금액'), width: 125, dataIndex: 'OWH_AMOUNT', sortable: true, renderer: 'changeDbl',
                             summaryType: 'sum',
                             summaryRenderer: 'changeDbl',
                             filter: {
                                 type: 'string',
                                 itemDefaults: {
                                     emptyText: Locale.getMsg('검색어입력..')
                                 }
                             }
                         }, {
                             text: Locale.getMsg('원화금액'), width: 125, dataIndex: 'OWH_KRW_AMOUNT', sortable: true, renderer: 'changeDec',
                             summaryType: 'sum',
                             summaryRenderer: 'changeDec',
                             filter: {
                                 type: 'string',
                                 itemDefaults: {
                                     emptyText: Locale.getMsg('검색어입력..')
                                 }
                             }
                         }
                     ]
                 }, 
               {
                    text: Locale.getMsg('PO번호'), width: 125, dataIndex: 'PO_CD', sortable: true,
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: Locale.getMsg('검색어입력..')
                        }
                    }
                }, {
                    text: Locale.getMsg('Order(대)'), width: 125, dataIndex: 'ORD_GB_L_NM', sortable: true,
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: Locale.getMsg('검색어입력..')
                        }
                    }
                }, {
                    text: "Order(중)", width: 125, dataIndex: 'ORD_GB_M_NM', sortable: true,
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: Locale.getMsg('검색어입력..')
                        }
                    }
                }, {
                    text: "Order(소)", width: 125, dataIndex: 'ORD_GB_S_NM', sortable: true,
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: Locale.getMsg('검색어입력..')
                        }
                    }
                }, {
                    text: Locale.getMsg('PO번호'), width: 125, dataIndex: 'CTLG_CD', sortable: true,
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: Locale.getMsg('검색어입력..')
                        }
                    }
                }, {
                    text: Locale.getMsg('프로젝트'), width: 125, dataIndex: 'PJT_NM', sortable: true,
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: Locale.getMsg('검색어입력..')
                        }
                    }
                }, {
                    text: Locale.getMsg('수주번호'), width: 125, dataIndex: 'SO_CD', sortable: true,
                    filter: {
                        type: 'string',
                        itemDefaults: {
                            emptyText: Locale.getMsg('검색어입력..')
                        }
                    }
                }, {
                    text: "SO_SEQ", dataIndex: 'SO_SEQ', hidden: true 
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

    Ext.define('Ysn.view.businessopportunity.salesOrderListController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.businessopportunity-salesOrderList',
        init: function () {

        },
        changeDec: function (value) {
            return Ysn.Util.changeDec(value);
        },
        changeDbl: function (value) {
            return Ysn.Util.changeDbl(value);
        } 
    });

    Ext.define('Ysn.view.businessopportunity.salesOrderDetail',{
        extend: 'Ext.form.Panel',
        xtype: 'businessopportunity-salesOrderDetail',
        requires: [
            'Ysn.view.businessopportunity.salesOrderDetailController'
        ],

        controller: 'businessopportunity-salesOrderDetail', 


        frame: true,
        id: 'salesOrderDetail',
	    reference: 'salesOrderDetail',
        bodyPadding: 10,
        scrollable:true,
        width: 900,   
	    fieldDefaults: { 
			    labelAlign: 'right', 
			    msgTarget: 'side'
                //readOnly: true
		    },
        items: [{
            xtype: 'fieldset',
		    scrollable:true,
            title: Locale.getMsg('기본정보'),
            layout: {
                type: 'table',
                columns: 4, 
                tableAttrs: {
                    style: {
                        width: '100%' 
                    }
                }

            },
            items: [
                    
					      {   
						    colspan: 2,
                            xtype: 'fieldcontainer',
                            fieldLabel: Locale.getMsg('주문번호'),
						    labelWidth: 80,
						    style:{width:'100%'},
                            combineErrors: true,
                            layout: 'hbox', 
                            defaults: {
                                //flex: 1,
                                hideLabel: true,
                                readOnly: true
                            },
                            items: [{
                                xtype: 'textfield',
                                name: 'lot_no',
                                reference: 'lot_no',
                                itemId: 'lot_no',
                                allowBlank: false,
                                width: 150, 
							    margin: '0 5 0 0' 
                            },{
                                xtype: 'textfield',
                                name: 'item_nm',
                                reference: 'item_nm',
                                itemId: 'item_nm', 
                                width:350,
                                readOnly: true, 
                                margin: '0 5 0 0'
                            }]
					      },
                          { fieldLabel: Locale.getMsg('PO번호'), xtype: 'textfield', labelWidth: 80, name: 'po_cd', readOnly: true },
                        {   
                            xtype: 'fieldcontainer',
                            fieldLabel: 'SMP.CD',
						    labelWidth: 110,
						    style:{width:'100%'},
                            combineErrors: true,
                            layout: 'hbox', 
                            defaults: {
                                //flex: 1,
                                hideLabel: true,
                                readOnly: true
                            },
                            items: [{
                                xtype: 'textfield',
                                name: 'smp_cd',
                                reference: 'smp_cd',
                                itemId: 'smp_cd',
                                width: 100, 
                                margin: '0 5 0 0'
                            },{
                                xtype: 'textfield',
                                name: 'smp_chasu',
                                reference: 'smp_chasu',
                                itemId: 'smp_chasu', 
                                width:50, 
                                margin: '0 5 0 0'
                            }]
                        },
                        {
                            xtype: 'fieldcontainer',
                            labelWidth: 80,
                            fieldLabel: Locale.getMsg('거래처'),
                            labelAlign: 'right',
                            combineErrors: true,
                            msgTarget: 'side',
                            layout: 'hbox',
                            defaults: {
                                //flex: 1,
                                hideLabel: true,
                                readOnly: true
                            },
                            items: [{
                                xtype: 'textfield',
                                name: 'cust_nm',
                                reference: 'cust_nm',
                                itemId: 'cust_nm',
                                margin: '0 5 0 0',
                                readOnly: true,
                                width: 250
                            }, {
                                xtype: 'hiddenfield',
                                reference: 'cust_cd',
                                name: 'cust_cd',
                                itemId: 'cust_cd'
                            }]
                        },
                        { fieldLabel: Locale.getMsg('사업유형'), xtype: 'textfield', labelWidth: 80, name: 'biz_type_nm',   readOnly: true },
                        { xtype: 'hiddenfield', name: 'biz_type' },
				        { fieldLabel: Locale.getMsg('영업담당'), xtype: 'textfield', labelWidth: 100, name: 'user_nm' },
                        { xtype: 'hiddenfield', name: 'user_cd' },
                        {
                            xtype: 'combobox',
                            reference: 'close_yn',
                            publishes: 'value',
                            fieldLabel: Locale.getMsg('강제마감여부'),
                            labelWidth: 110,
                            labelAlign: 'right',
                            displayField: 'name',
                            valueField: 'name',
                            name: 'close_yn',
                            anchor: '-15',
                            store: {
                                fields: ['name'],
                                data: [{ name: 'N'}, { name: 'Y'}],
                                proxy: {
                                    type: 'memory',
                                    reader: {
                                        type: 'json',
                                        rootProperty: ''
                                    }
                                },
                                autoLoad: true, 
                                readOnly: false
                            },
                            minChars: 0,
                            queryMode: 'local'
                        },
                        { fieldLabel: Locale.getMsg('End User'), xtype: 'textfield', labelWidth: 80, style: { width: '100%' }, name: 'euser_nm', readOnly: true },
                        { xtype: 'hiddenfield', name: 'euser_cd' },
                        { fieldLabel: Locale.getMsg('유통구조'), xtype: 'textfield', labelWidth: 100, name: 'dstr_type_nm',   readOnly: true },
                        { xtype: 'hiddenfield', name: 'dstr_type' },
                         { fieldLabel: Locale.getMsg('매출조직'), xtype: 'textfield', labelWidth: 100, name: 'dept_nm' },
                         { xtype: 'hiddenfield', name: 'dept_cd' }, 
                        { fieldLabel: Locale.getMsg('접수[수주확정]일'), xtype: 'datefield', labelWidth: 110, width: 250, format: 'Y-m-d', readOnly: true, name: 'ord_cdate' },
                         {
                             xtype: 'fieldcontainer',
                             labelWidth: 80,
                             fieldLabel: Locale.getMsg('품목분류'),
                             labelAlign: 'right',
                             combineErrors: true,
                             msgTarget: 'side',
                             layout: 'hbox',
                             defaults: {
                                 //flex: 1,
                                 hideLabel: true,
                                 readOnly: true
                             },
                             items: [{
                                 xtype: 'textfield',
                                 name: 'item_level1',
                                 reference: 'item_level1',
                                 itemId: 'item_level1',
                                 margin: '0 5 0 0',
                                 readOnly: true,
                                 width: 120
                             }, {
                                 xtype: 'textfield',
                                 name: 'item_level2',
                                 reference: 'item_level2',
                                 itemId: 'item_level2',
                                 margin: '0 5 0 0',
                                 readOnly: true,
                                 width: 120
                             }, {
                                 xtype: 'textfield',
                                 name: 'item_level3',
                                 reference: 'item_level3',
                                 itemId: 'item_level3',
                                 margin: '0 5 0 0',
                                 readOnly: true,
                                 width: 120
                             }]
                         },
                         {
                             xtype: 'fieldcontainer',
                             colspan:2,
                             labelWidth: 80,
                             fieldLabel: Locale.getMsg('Order구분'),
                             labelAlign: 'right',
                             combineErrors: true,
                             msgTarget: 'side',
                             layout: 'hbox',
                             defaults: {
                                 //flex: 1,
                                 hideLabel: true,
                                 readOnly: true
                             },
                             items: [{
                                 xtype: 'textfield',
                                 name: 'ord_gb_l_nm',
                                 reference: 'ord_gb_l_nm',
                                 itemId: 'ord_gb_l_nm',
                                 margin: '0 5 0 0',
                                 readOnly: true,
                                 width: 120
                             }, {
                                 xtype: 'textfield',
                                 name: 'ord_gb_m_nm',
                                 reference: 'ord_gb_m_nm',
                                 itemId: 'ord_gb_m_nm',
                                 margin: '0 5 0 0',
                                 readOnly: true,
                                 width: 120
                             }, {
                                 xtype: 'textfield',
                                 name: 'ord_gb_s_nm',
                                 reference: 'ord_gb_s_nm',
                                 itemId: 'ord_gb_s_nm',
                                 margin: '0 5 0 0',
                                 readOnly: true,
                                 width: 120
                             }]
                         },
                         { fieldLabel: Locale.getMsg('카다로그'), xtype: 'textfield', labelWidth: 100, name: 'ctlg_cd' },
                         { fieldLabel: Locale.getMsg('코멘트'), colspan: 3, xtype: 'textfield', labelWidth: 80, width:700, name: 'remark' },
                         { fieldLabel: Locale.getMsg('생산파트'), xtype: 'textfield', labelWidth: 100, name: 'jnb_dept_nm' }
            ]
        },{
            xtype: 'fieldset',
            reference : 'itemList1',
		    scrollable:true,
            title: '수주계약정보',
            layout: {
                type: 'table',
                columns: 1, 
                tableAttrs: {
                    style: {
                        width: '100%' 
                    }
                }

            },
            items: [                   
					    {
					        xtype: 'grid',
					        store: {
					            type: 'salesOrderItem1',
					            autoLoad: false,
					            autoDestroy: true,
					            listeners: { 
					            }
					        }, 
					        itemId: 'salesOrderItem1',
					        reference: 'salesOrderItem1',
					        columnLines: true,  
					        columns: [ 
                                    { text: Locale.getMsg('품목코드'), width: 120, dataIndex: 'ITEM_CD', sortable: false },
                                    { text: Locale.getMsg('품목명'), width: 250, dataIndex: 'ITEM_NM', sortable: false },
                                    { text: Locale.getMsg('통화'), width: 60, dataIndex: 'BASE_CRNY', sortable: false },
                                    { text: Locale.getMsg('환율'), width: 100, dataIndex: 'EXCH_RATE', sortable: false, renderer: 'changeDbl' },
                                    { text: Locale.getMsg('수량'), width: 100, dataIndex: 'WSO_QTY', sortable: false, renderer: 'changeDec' },
                                    { text: Locale.getMsg('단가'), width: 100, dataIndex: 'OWH_UNIT_PRICE', sortable: false, renderer: 'changeDbl' },
                                    { text: Locale.getMsg('수주금액'), width: 130, dataIndex: 'OWH_AMOUNT', sortable: false, renderer: 'changeDbl' },
                                    { text: Locale.getMsg('수주금액(KRW)'), width: 130, dataIndex: 'OWH_KRW_AMOUNT', sortable: false, renderer: 'changeDec' },
                                    { text: Locale.getMsg('납기일'), width: 125, dataIndex: 'SALES_ODATE', sortable: false, readOnly: false, renderer: Ext.util.Format.dateRenderer('Y-m-d') },
                                    { text: Locale.getMsg('최종납기일'), width: 125, dataIndex: 'SALES_ODATE', sortable: false, readOnly: false, renderer: Ext.util.Format.dateRenderer('Y-m-d') }
                               
					        ], 
					        style: {width:'100%'},
					        syncRowHeight: true,
					        viewConfig: {
					            stripeRows: true
					        },
					        listeners: {
					            //itemclick: function(dataview, record, item, index, e) {  
					            // }

					        }
					    }
            ]
        }, {
            xtype: 'fieldset',
            reference: 'itemList2',
            scrollable: true,
            title: '납품정보',
            layout: {
                type: 'table',
                columns: 1,
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                }

            },
            items: [
					    {
					        xtype: 'grid',
					        store: {
					            type: 'salesOrderItem2',
					            autoLoad: false,
					            autoDestroy: true,
					            listeners: {
					            }
					        },
					        itemId: 'salesOrderItem2',
					        reference: 'salesOrderItem2',
					        columnLines: true,
					        columns: [
                                    { xtype: 'rownumberer' },
                                    { text: Locale.getMsg('품목코드'), width: 120, dataIndex: 'ITEM_CD2', sortable: false },
                                    { text: Locale.getMsg('품목명'), width: 250, dataIndex: 'ITEM_NM', sortable: false },
                                    { text: Locale.getMsg('통화'), width: 60, dataIndex: 'BASE_CRNY', sortable: false },
                                    { text: Locale.getMsg('환율'), width: 100, dataIndex: 'EXCH_RATE', sortable: false, renderer: 'changeDbl' },
                                    { text: Locale.getMsg('출고수량'), width: 100, dataIndex: 'OWH_QTY', sortable: false, renderer: 'changeDec' },
                                    { text: Locale.getMsg('단가'), width: 100, dataIndex: 'OWH_UNIT_PRICE', sortable: false, renderer: 'changeDbl' },
                                    { text: Locale.getMsg('출고금액'), width: 130, dataIndex: 'OWH_AMOUNT', sortable: false, renderer: 'changeDbl' },
                                    { text: Locale.getMsg('출고금액(KRW)'), width: 130, dataIndex: 'OWH_KRW_AMOUNT', sortable: false, renderer: 'changeDec' },
                                    { text: Locale.getMsg('출고일'), width: 125, dataIndex: 'SALES_ODATE', sortable: false, readOnly: false, renderer: Ext.util.Format.dateRenderer('Y-m-d') }

					        ],
					        style: { width: '100%' },
					        syncRowHeight: true,
					        viewConfig: {
					            stripeRows: true
					        },
					        listeners: {
					            //itemclick: function(dataview, record, item, index, e) {  
					            // }

					        }
					    }
            ]
        }, {
            xtype: 'fieldset',
            reference: 'itemList3',
            scrollable: true,
            title: '청구정보',
            layout: {
                type: 'table',
                columns: 1,
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                }

            },
            items: [
					    {
					        xtype: 'grid',
					        store: {
					            type: 'salesOrderItem3',
					            autoLoad: false,
					            autoDestroy: true,
					            listeners: {
					            }
					        },
					        itemId: 'salesOrderItem3',
					        reference: 'salesOrderItem3',
					        columnLines: true,
					        columns: [
                                    { xtype: 'rownumberer'},
                                    { text: Locale.getMsg('품목코드'), width: 120, dataIndex: 'ITEM_CD2', sortable: false },
                                    { text: Locale.getMsg('품목명'), width: 250, dataIndex: 'ITEM_NM', sortable: false },
                                    { text: Locale.getMsg('통화'), width: 60, dataIndex: 'BASE_CRNY', sortable: false },
                                    { text: Locale.getMsg('환율'), width: 100, dataIndex: 'EXCH_RATE', sortable: false, renderer: 'changeDbl' },
                                    { text: Locale.getMsg('청구수량'), width: 100, dataIndex: 'BILL_QTY', sortable: false, renderer: 'changeDec' },
                                    { text: Locale.getMsg('단가'), width: 100, dataIndex: 'BILL_UNIT_PRICE', sortable: false, renderer: 'changeDbl' },
                                    { text: Locale.getMsg('청구금액'), width: 130, dataIndex: 'BILL_AMOUNT', sortable: false, renderer: 'changeDbl' },
                                    { text: Locale.getMsg('청구금액(KRW)'), width: 130, dataIndex: 'BILL_KRW_AMOUNT', sortable: false, renderer: 'changeDec' },
                                    { text: Locale.getMsg('청구일'), width: 125, dataIndex: 'SALES_BDATE', sortable: false, readOnly: false, renderer: Ext.util.Format.dateRenderer('Y-m-d') }

					        ],
					        style: { width: '100%' },
					        syncRowHeight: true,
					        viewConfig: {
					            stripeRows: true
					        },
					        listeners: {
					            //itemclick: function(dataview, record, item, index, e) {  
					            // }

					        }
					    }
            ]
        }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                ui: 'footer',
                defaults: {
                    minWidth: 100 
                },
                items: [
				    { xtype: 'hiddenfield', name: 'so_cd' },
                    { xtype: 'hiddenfield', name: 'so_seq' },
                    { xtype: 'hiddenfield', name: 'pjt_cd' },
                    { xtype: 'hiddenfield', name: 'so_serl' },
				    { xtype: 'button', text: Locale.getMsg('저장'), name: 'btn3', itemId: 'btn3',margin: '5 5 5 5', 
                        listeners: {click : 'onSubmit'}
                    }
                ]
            }]
    });

    Ext.define('Ysn.view.businessopportunity.salesOrderDetailController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.businessopportunity-salesOrderDetail',
        init: function () {
             
        },
    
        changeDec: function (value) {
            return Ysn.Util.changeDec(value);
        },
        changeDbl: function (value) {
            return Ysn.Util.changeDbl(value);
        },  
        onSubmit: function () {
            var form = Ext.getCmp('salesOrderDetail').getForm();
            Ysn.Util.cbEmptyVal(Ext.getCmp('salesOrderDetail'));
            if (form.isValid()) {
                var url = '/SalesOrder/salesOrderSave';
                form.setConfig('url', url);
                form.submit({
                    waitMsg: 'Processing...',
                    method: 'POST',
                    params: form.getValues(),
                    submitEmptyText: false,
                    success: function (form, action) {
                        if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
                        var dataVal = Ext.JSON.decode(action.response.responseText);
                        Ext.Msg.alert(Locale.getMsg('처리상태'), Locale.getMsg('처리완료'));                    
                        Ext.getCmp('salesOrderList').store.reload();
                    },
                    failure: function (form, action) {
                        //console.log('response:'+ action);
                        var dataVal = Ext.JSON.decode(action.response.responseText);
                        Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.'); 
                        //Ext.getCmp('keymanList').store.reload();
                    }
                });
            }
        }

    });

    Ext.define('Ysn.view.businessopportunity.salesOrder', {
        extend: 'Ext.panel.Panel',
        xtype: 'businessopportunity-salesOrder',
        requires: [
            'Ysn.view.businessopportunity.salesOrderController',
		    'Ysn.view.common.searchcustomer',
            'Ysn.view.businessopportunity.salesOrdersearch',
            'Ysn.view.businessopportunity.salesOrderList',
            'Ysn.view.businessopportunity.salesOrderDetail'
        ],

        controller: 'businessopportunity-salesOrder',
        reference: 'businessopportunity-salesOrder',
        id: 'businessopportunity-salesOrder',
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
	                       xtype: 'salesOrder-search',
	                       reference: 'salesOrderSearch',
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
		        xtype: 'salesOrderList',
		        itemId: 'salesOrderList',
		        listeners: {
		            select: 'itemclick'
		        }

		    }, {
		        title: Locale.getMsg('수주정보내역'),

		        scrollable: false,
		        x: 10, y: 10,
		        region: 'east',
		        itemId: 'east',
		        //	reference:'Detail',
		        collapsed: true,
		        layout: 'fit',
		        width: 950,
		        minWidth: 850,
		        maxWidth: 1200,
		        items: {
		            xtype: 'businessopportunity-salesOrderDetail'
		        }
		    }
        ]
    });

    ///<reference path="~/Client/ext/build/ext-all-debug.js">
    ///<reference path="~/Client/ext/build/ext-debug.js">
    Ext.define('Ysn.view.businessopportunity.salesOrderController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.businessopportunity-salesOrder',
        requires: [
	        'Ysn.store.*'
        ],
        init: function () {
            this.lookupReference('salesOrderSearch').setTitle(pageTitle);
            if (Ext.getCmp('chkpopup').getValue()) {
                Ext.getCmp('businessopportunity-salesOrder').down('#east').setVisible(false);
            }   
        },
        itemclick: function (view, record, index, e) {
            var Pl = Ext.getCmp('salesOrderDetail');
            var Frm = Pl.getForm();
            if (Ext.getCmp('chkpopup').getValue()) {
                openPopupView('수주정보내역', 'businessopportunity-salesOrderDetail', record.get('LOT_NO'), 'salesOrder|salesOrderDetail|' + record.get('SO_CD') + '|' + record.get('SO_SEQ'));
            } else {
                Frm.reset();
                Ext.getStore('salesOrderItem1').removeAll()
                Ext.getCmp('businessopportunity-salesOrder').mask("loading...");
                if (Ext.getCmp('businessopportunity-salesOrder').down('#east').collapsed) Ext.getCmp('businessopportunity-salesOrder').down('#east').toggleCollapse(); 
                Ext.getStore('salesOrderView').load({
                    params: { lot_no: record.get('LOT_NO'), so_cd: record.get('SO_CD'), so_seq: record.get('SO_SEQ') }
                   ,callback: function (records, operation, success) {
                       setTimeout(function () {
                           Pl.body.dom.scrollTop = 0;
                           Pl.body.dom.scrollLeft = 0;
                           for (var i = 0; i < Pl.items.items.length; i++) {
                               Pl.items.items[i].body.dom.scrollTop = 0;
                               Pl.items.items[i].body.dom.scrollLeft = 0;
                           }
                       }, 500);
                    }
                });
                var task = new Ext.util.DelayedTask(function () {
                    Ext.getCmp('businessopportunity-salesOrder').down('#east').toggleCollapse();
                });
                if (Ext.getCmp('businessopportunity-salesOrder').down('#east').collapsed) task.delay(1000);
                var task2 = new Ext.util.DelayedTask(function () {
                    Ext.getCmp('businessopportunity-salesOrder').unmask();
                });
                task2.delay(1100);
            }

            //Ext.getCmp('productinquiryinquiry').down('#east').show();

            /*Ext.getStore('inquiryDetail').load({
			    params:{cust_cd:record.get('CUST_CD')},
			    callback : function(records, operation, success){ 
				    //console.log(records);	//root프로퍼티에 지정된데이터 
			        //console.log(operation.getProxy().getReader().rawData);	//리턴된 json 데이터전체 
				    //console.log(success);	//success 프로퍼티에 지정된 데이터 }
				    console.log(Ext.getStore('inquiryDetail').getAt(0));	//success 프로퍼티에 지정된 데이터 }
                    Ext.getCmp('inquiryDetail').loadRecord(Ext.getStore('inquiryDetail').getAt(0));  
			    }
		    }); */
        }, 
        xlsExport: function () {

            Ext.getCmp('salesOrderList').saveDocumentAs({
			headerRowCnt: 2,
                type: 'xlsx',
                title: Ext.getCmp('salesOrder-search').getTitle(),
                fileName: '수주대장관리'
            });
        }
    });




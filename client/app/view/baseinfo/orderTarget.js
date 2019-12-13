    Ext.define('Ysn.view.baseInfo.orderTargetsearch', {
        extend: 'Ext.panel.Panel',
        xtype: 'orderTarget-search',

        requires: [
            'Ysn.view.baseInfo.orderTargetsearchController', 
	        'Ysn.store.*'
        ],

        controller: 'orderTarget-search',

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
        id: 'orderTarget-search',
        reference: 'orderTarget-search',
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
                                var bizCd = Ext.getCmp('orderTarget-search').down('#bizGroup');
                                if (store.data.items.length < 2) {
                                    Ext.getCmp('orderTarget-search').down('#user_cd').store.load({ params: { dept_cd: bizCd.getValue(), up_dept_cd: '' } });
                                } else {
                                    Ext.getCmp('orderTarget-search').down('#user_cd').store.load({ params: { dept_cd: '', up_dept_cd: bizCd.getValue() } });
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
            fieldLabel: Locale.getMsg('기준년도'),
            xtype: 'combobox',
            reference: 'base_yy',
            publishes: 'value',
            width: 200,
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
            rowspan: 4,
            xtype: 'button',
            text: Locale.getMsg('검색'),
            width: 60,
            height: 40,
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
            xtype: 'fieldcontainer',
            fieldLabel: 'End User',
            labelWidth: 80,
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
                name: 'enduser_nm',
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
        }, {
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
        }, {
            xtype: 'combobox',
            labelWidth: 80,
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
        }, {
            xtype: 'hiddenfield',
            reference: 'preunit',
            name: 'preunit',
            itemId: 'preunit'
        }
        ] 
    });

    Ext.define('Ysn.view.baseInfo.orderTargetsearchController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.orderTarget-search',
        init: function () {
            this.lookupReference('bizGroup').store.load();
            this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true));
            this.lookupReference('dstr_type').store.load({ params: { up_code_id: 'DSTR_TYPE', lang: localeCd } });
            this.lookupReference('dstr_type').setValue('');
            this.lookupReference('biz_type').store.load({ params: { up_code_id: 'BIZ_TYPE', lang: localeCd  } });
            this.lookupReference('biz_type').setValue('');
            this.lookupReference('item_type').store.load({ params: { up_code_id: 'ITEM_TYPE', lang: localeCd  } });
            this.lookupReference('item_type').setValue('');
            this.lookupReference('unit').setValue(this.lookupReference('unit').getStore().getAt(2).get('code')); 
            
            var Today = new Date();
            //this.lookupReference('sdate').setValue(Today.getFullYear() + '-' + ('0' + (Today.getMonth() + 1)).slice(-2) + '-' + '01');
            this.lookupReference('base_yy').store.load();
            this.lookupReference('base_yy').setValue(Today.getFullYear());

		    if(auth_id != 'A001'){
		   //  this.lookupReference('bizGroup').setConfig({'readOnly':true});
		   //  if(dept_level == '4') this.lookupReference('deptGroup').setConfig({'readOnly':true});
	     }
        },
        openWindow: function () {
            var win = Ext.getCmp('commonSearchcustomer');
            if (!win) {
                win = new Ysn.view.common.searchcustomer();
            }
            var hidfield = win.query('#paentFrm')[0];
            hidfield.setValue('orderTarget-search');
            win.down('#cust_nm').setValue(this.lookupReference('cust_nm').getValue());
            Ext.getCmp('baseInfo-orderTarget').add(win);
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
            hidfield.setValue('orderTarget-search');
            Ext.getCmp('baseInfo-orderTarget').add(win2);
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
            hidfield.setValue('orderTarget-search');
            Ext.getCmp('baseInfo-orderTarget').add(win3);
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
                deptCombo.store.load({ params: { up_dept_cd: newVal } });

            } else {
				deptCombo.setValue('');
				userCombo.setValue('');
				deptCombo.store.removeAll();
				userCombo.store.removeAll();
                deptCombo.store.insert(0, { DEPT_CD: '', DEPT_NM: Locale.getMsg('전체') });
                userCombo.store.insert(0, { USER_CD: '', USER_NM: Locale.getMsg('전체') });
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
            var pl = Ext.getCmp('orderTargetList');
            this.lookupReference('preunit').setValue(this.lookupReference('unit').getValue());

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
                            enduser_cd: this.lookupReference('euser_cd').getValue(),
                            item_type: this.lookupReference('item_type').getValue(),
                            base_yy: this.lookupReference('base_yy').getValue(),  
                            unit: this.lookupReference('unit').getValue()
                        },
                        callback: function (records, operation, success) {
                            var col = pl.getController('baseInfo-orderTargetList').changeColumns(operation._params.base_yy);
                            pl.reconfigure(col);


                        }
                    }
        );
        }


    });


    Ext.define('Ysn.view.baseInfo.orderTargetList', {
        extend: 'Ext.grid.Panel',
        xtype: 'orderTargetList',
        requires: [
            'Ysn.view.baseInfo.orderTargetListController', 
		    'Ysn.store.orderTargetList',
		    'Ext.grid.filters.Filters'
        ],
    
        controller: 'baseInfo-orderTargetList',     
	    store: {
	        type: 'orderTargetList'
        }, 
	    style: { 'borderTop': '1px solid gray' },

	    loadMask: true,
	    enableLocking: true,
	    reference: 'orderTargetList',
	    id: 'orderTargetList',
	    columnLines: true,
        
	    multiSelect: false,
	    multiColumnSort: true,
	    selModel: 'rowmodel',
	    plugins: [{ ptype: 'gridfilters' }, { ptype: 'pmh-grid-exporter' },
            {
                ptype: 'cellediting',
                clicksToEdit: 2
	    } 
	    ],
	    actions: {
	        edit: {
	            iconCls: 'x-fa  fa-check-circle',
	            //text: Locale.getMsg('저장'),
	            tooltip: 'Edit',
	            handler: 'edit'
	        } 
	    },
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

    Ext.define('Ysn.view.baseInfo.orderTargetListController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.baseInfo-orderTargetList',
        init: function () {
            var Today = new Date();
            var col = this.changeColumns(Today.getFullYear());
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
        edit: function (grid, rowIndex, colIndex) {
            if (Ext.getCmp('orderTarget-search').lookupReference('preunit').getValue() != '1') {
                Ext.Msg.alert('Warning', Locale.getMsg('검색조건에 단위를 원으로 선택후, 조회를 먼저 하세요.'));
                return false;
            }
            //alert(context.value + ',' + context.originalValue);
            var rec = grid.getStore().getAt(rowIndex);
            Ext.Ajax.request({
                url: '/BaseInfo/xlsxBaseOrderUpdate',
                method: 'post',
                params: {
                    dept_cd: rec.get('DEPT_CD'),
                    user_cd: rec.get('USER_CD'),
                    dstr_type: rec.get('DSTR_TYPE'),
                    biz_type: rec.get('BIZ_TYPE'),
                    item_type: rec.get('ITEM_TYPE'),
                    cust_cd: rec.get('CUST_CD'),
                    euser_cd: rec.get('EUSER_CD'),
                    bcust_cd: rec.get('CUST_CD'),
                    base_yy: rec.get('BASE_YY'),
                    m01: rec.get('M01'),
                    m02: rec.get('M02'),
                    m03: rec.get('M03'),
                    m04: rec.get('M04'),
                    m05: rec.get('M05'),
                    m06: rec.get('M06'),
                    m07: rec.get('M07'),
                    m08: rec.get('M08'),
                    m09: rec.get('M09'),
                    m10: rec.get('M10'),
                    m11: rec.get('M11'),
                    m12: rec.get('M12')
                },
                success: function (response, opts) {
					if(!Ysn.Util.OnsessOut(response.responseText)) return false;
                    Ext.Msg.alert('Success', Locale.getMsg('처리를 완료하였습니다.'));
                },

                failure: function (response, opts) {
                    Ext.Msg.alert('Failed', Locale.getMsg('오류가 발생하였습니다.'));
                }

            });
        },
        changeColumns: function (year) { 
       
        var columns = [
            {
                text: Locale.getMsg('영업팀'), width: 80, dataIndex: 'UP_DEPT_NM', sortable: true,
                filter: {
                    type: 'string',
                    itemDefaults: {
                        emptyText: Locale.getMsg('검색어입력..')
                    }
                }
            },
                 {
                     text: Locale.getMsg('영업파트'), width: 100, dataIndex: 'DEPT_NM', sortable: true,
                     filter: {
                         type: 'string',
                         itemDefaults: {
                             emptyText: Locale.getMsg('검색어입력..')
                         }
                     }
                 },
                 {
                     text: Locale.getMsg('영업담당'), width: 80, dataIndex: 'USER_NM', sortable: true,
                     filter: {
                         type: 'string',
                         itemDefaults: {
                             emptyText: Locale.getMsg('검색어입력..')
                         }
                     }
                 },
                 {
                     text: Locale.getMsg('유통구조'), width: 80, dataIndex: 'DSTR_TYPE_NM', sortable: true,
                     filter: {
                         type: 'string',
                         itemDefaults: {
                             emptyText: Locale.getMsg('검색어입력..')
                         }
                     }
                 },
                 {
                     text: Locale.getMsg('사업유형'), width: 80, dataIndex: 'BIZ_TYPE_NM', sortable: true,
                     filter: {
                         type: 'string',
                         itemDefaults: {
                             emptyText: Locale.getMsg('검색어입력..')
                         }
                     }
                 },
                 {
                     text: Locale.getMsg('품목유형'), width: 80, dataIndex: 'ITEM_TYPE', sortable: true,
                     filter: {
                         type: 'string',
                         itemDefaults: {
                             emptyText: Locale.getMsg('검색어입력..')
                         }
                     }
                 },
                 {
                     text: Locale.getMsg('고객사'), width: 150, dataIndex: 'CUST_NM', sortable: true,
                     filter: {
                         type: 'string',
                         itemDefaults: {
                             emptyText: Locale.getMsg('검색어입력..')
                         }
                     }
                 },
                  {
                      text: Locale.getMsg('End User'), width: 150, dataIndex: 'EUSER_NM', sortable: true,
                      filter: {
                          type: 'string',
                          itemDefaults: {
                              emptyText: Locale.getMsg('검색어입력..')
                          }
                      }
                  },
                 { text: year+'년 합계', width: 120, dataIndex: 'TOTAL', sortable: true },
                 {
                     text: year + '-01', width: 120, dataIndex: 'M01', sortable: true, renderer: 'changeDbl',
                     editor: {
                         xtype: 'numberfield', allowBlank: false, allowDecimals: false, readOnly: false, minValue: 0
                     }
                 },
                 {
                     text: year + '-02', width: 120, dataIndex: 'M02', sortable: true, renderer: 'changeDbl',
                     editor: { xtype: 'numberfield', allowBlank: false, allowDecimals: false, readOnly: false, minValue: 0 }
                 },
                 {
                     text: year + '-03', width: 120, dataIndex: 'M03', sortable: true, renderer: 'changeDbl',
                     editor: { xtype: 'numberfield', allowBlank: false, allowDecimals: false, readOnly: false, minValue: 0 }
                 },
                 {
                     text: year + '-04', width: 120, dataIndex: 'M04', sortable: true, renderer: 'changeDbl',
                     editor: { xtype: 'numberfield', allowBlank: false, allowDecimals: false, readOnly: false, minValue: 0 }
                 },
                 {
                     text: year + '-05', width: 120, dataIndex: 'M05', sortable: true, renderer: 'changeDbl',
                     editor: { xtype: 'numberfield', allowBlank: false, allowDecimals: false, readOnly: false, minValue: 0 }
                 },
                 {
                     text: year + '-06', width: 120, dataIndex: 'M06', sortable: true, renderer: 'changeDbl',
                     editor: { xtype: 'numberfield', allowBlank: false, allowDecimals: false, readOnly: false, minValue: 0 }
                 },
                 {
                     text: year + '-07', width: 120, dataIndex: 'M07', sortable: true, renderer: 'changeDbl',
                     editor: { xtype: 'numberfield', allowBlank: false, allowDecimals: false, readOnly: false, minValue: 0 }
                 },
                 {
                     text: year + '-08', width: 120, dataIndex: 'M08', sortable: true, renderer: 'changeDbl',
                     editor: { xtype: 'numberfield', allowBlank: false, allowDecimals: false, readOnly: false, minValue: 0 }
                 },
                 {
                     text: year + '-09', width: 120, dataIndex: 'M09', sortable: true, renderer: 'changeDbl',
                     editor: { xtype: 'numberfield', allowBlank: false, allowDecimals: false, readOnly: false, minValue: 0 }
                 },
                 {
                     text: year + '-10', width: 120, dataIndex: 'M10', sortable: true, renderer: 'changeDbl',
                     editor: { xtype: 'numberfield', allowBlank: false, allowDecimals: false, readOnly: false, minValue: 0 }
                 },
                 {
                     text: year + '-11', width: 120, dataIndex: 'M11', sortable: true, renderer: 'changeDbl',
                     editor: { xtype: 'numberfield', allowBlank: false, allowDecimals: false, readOnly: false, minValue: 0 }
                 },
                 {
                     text: year + '-12', width: 120, dataIndex: 'M12', sortable: true, renderer: 'changeDbl',
                     editor: { xtype: 'numberfield', allowBlank: false, allowDecimals: false, readOnly: false, minValue: 0 }
                 },
                {
                    menuDisabled: true, sortable: false,
                    xtype: 'actioncolumn',
                    itemId: 'editbtn',
                    width: 30,
                    items: ['@edit']
                }
        ];
        return columns;
    }
    });

   

    Ext.define('Ysn.view.baseInfo.orderTarget', {
        extend: 'Ext.panel.Panel',
        xtype: 'baseInfo-orderTarget',
        requires: [
            'Ysn.view.baseInfo.orderTargetController',
		    'Ysn.view.common.searchcustomer',
            'Ysn.view.baseInfo.orderTargetsearch',
            'Ysn.view.baseInfo.orderTargetList'
        ],

        controller: 'baseInfo-orderTarget',
        reference: 'baseInfo-orderTarget',
        id: 'baseInfo-orderTarget',
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
	                       xtype: 'orderTarget-search',
	                       reference: 'orderTargetSearch',
	                       itemId: 'orderTargetSearch',
                           scrollable: true,
	                       collapsible: true,
	                       floatable: true,
	                       split: true,
	                       padding: '0 0 0 0',
	                       dock: 'top',
	                       height: 180
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
		    }, {
		        xtype: 'button',
		        iconCls: 'x-fa fa-angle-double-up',
		        text: Locale.getMsg('일괄등록'),
		        handler: 'openWindow'
		    }]
        },

        items: [
		    {
		        header: false,
		        region: 'center',
		        xtype: 'orderTargetList',
		        reference: 'orderTargetList',
		        itemId: 'orderTargetList',
		        listeners: {
		            //select: 'itemclick'
		        }

		    }, {
		        xtype: 'window',
		        title: '수주목표 업로드',
		        reference: 'xlsUpload',
		        itemId: 'xlsUpload',
		        modal: true,
		        hidden: true,
		        width: 500,
		        height: 180,
		        bodyBorder: false,
		        resizable: false,

		        items: [{
		            xtype: 'form',
		            reference: 'xlsUploadfrm',
		            bodyPadding: '10 10 10 10',
		            style: {
		                'margin-bottom': '20px'
		            },
		            items: [
                        {
                            labelWidth: 80,
                            width: 450,
                            fieldLabel: '파일(xls,xlsx)',
                            xtype: 'filefield',
                            name: 'excelFile',
                            reference: 'filefield', 
                            margin: '10 10 10 10'
                        },  
                        {
                            xtype: 'button',
                            text: '파일저장',
                            width: 450,
                            handler: 'firstFormSave',
                            margin: '10 10 10 10'
                        }
		            ]}
                    ]
		        }
        ]
    });

    ///<reference path="~/Client/ext/build/ext-all-debug.js">
    ///<reference path="~/Client/ext/build/ext-debug.js">
    Ext.define('Ysn.view.baseInfo.orderTargetController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.baseInfo-orderTarget',
        requires: [
	        'Ysn.store.*'
        ],
        init: function () {
            this.lookupReference('orderTargetSearch').setTitle(pageTitle); 
        },
        openWindow: function () {
           /* if (this.lookupReference('orderTargetSearch').lookupReference('unit').getValue() != '1') {
                Ext.Msg.alert('Warning', '검색조건의 단위를 원으로 선택하셔야 합니다.');
                return false;
            }*/
            this.lookupReference('xlsUpload').show();
        },
        firstFormSave: function () {
            var win = this.lookupReference('xlsUpload');
            var form = this.lookupReference('xlsUploadfrm').getForm();
            var pl = this.lookupReference('orderTargetSearch');

            if (form.isValid()) {
                form.submit({
                    url: '/BaseInfo/xlsxBaseOrderUpload',
                    waitMsg: 'Uploading .',
                    success: function (fp, o) {
                        var tpl = new Ext.XTemplate(
                            '수주목표 업로드 완료'
                        );

                        var dataVal = Ext.JSON.decode(o.response.responseText)
                        Ext.Msg.alert('Success', tpl.apply(o.result));
                        pl.lookupReference('bizGroup').setValue('');
                        pl.lookupReference('cust_cd').setValue('');
                        pl.lookupReference('dstr_type').setValue('');
                        pl.lookupReference('biz_type').setValue('');
                        pl.lookupReference('bcust_cd').setValue('');
                        pl.lookupReference('euser_cd').setValue('');
                        pl.lookupReference('item_type').setValue('');
                        pl.lookupReference('base_yy').setValue(dataVal.baseyy);
                        pl.lookupReference('unit').setValue('1');
                        pl.getController('orderTarget-search').onSubmitClick();
                        /* Ext.getStore('inquiry').load(
                             {
                                 params: {
                                     deptGroup: Ext.getCmp('inquiry-search').lookupReference('deptGroup').getValue(),
                                     bizGroup: Ext.getCmp('inquiry-search').lookupReference('bizGroup').getValue(),
                                     inq_chnl: Ext.getCmp('inquiry-search').lookupReference('inq_chnl').getValue(),
                                     userGroup: Ext.getCmp('inquiry-search').lookupReference('userGroup').getValue(),
                                     inq_type: Ext.getCmp('inquiry-search').lookupReference('inq_type').getValue(),
                                     inq_status: Ext.getCmp('inquiry-search').lookupReference('inq_status').getValue(),
                                     inq_rsdate: Ext.Date.format(Ext.getCmp('inquiry-search').lookupReference('inq_rsdate').getValue(), 'Y-m-d'),
                                     inq_redate: Ext.Date.format(Ext.getCmp('inquiry-search').lookupReference('inq_redate').getValue(), 'Y-m-d')
                                 }
                             }
                         );*/
                        fp.reset();
                        win.hide();
                    }
                });
            }

            //this.getView().close();
        },
        xlsExport: function () {

            Ext.getCmp('orderTargetList').saveDocumentAs({
			headerRowCnt: 1,
                type: 'xlsx',
                title: Ext.getCmp('orderTarget-search').getTitle(),
                fileName: Locale.getMsg('수주목표')
            });
        }
    });




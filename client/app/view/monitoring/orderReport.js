Ext.define('Ysn.view.monitoring.orderReportsearch', {
    extend: 'Ext.panel.Panel',
    xtype: 'orderReport-search',

    requires: [
        'Ysn.view.monitoring.orderReportsearchController' 
    ],

    controller: 'orderReport-search',

    frame: false,
    //resizable: true,
    width: 800,
    minWidth: 700,
    minHeight: 55,
    frameBorder: 10,
    layout: {
        type: 'table',
        columns: 7,
        tableAttrs: {
            style: {
                //width: '100%'
            }
        }

    },
    id: 'orderReport-search',
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
            reference: 'order_ym_type',
            itemId: 'order_ym_type',
            publishes: 'value',
            fieldLabel: '당월/누계/년간',
            labelAlign: 'right',
            displayField: 'name',
            valueField: 'code',
            name: 'order_ym_type',
            margin: '5 0 0 0',
            anchor: '-15',
            store: {
                fields: ['name', 'code'],
                data: [{ name: Locale.getMsg('당월'), code: '당월' },
                       { name: Locale.getMsg('누계'), code: '누계' },
                       { name: Locale.getMsg('M+1'), code: 'M1' },
                       { name: Locale.getMsg('M+2'), code: 'M2' },
                       { name: Locale.getMsg('M+3'), code: 'M3' },
                       { name: Locale.getMsg('년간'), code: '년간' }],
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
            xtype: 'combobox',
            reference: 'item_type',
            publishes: 'value',
            fieldLabel: Locale.getMsg('품목유형'),
            labelAlign: 'right',
            displayField: 'CODE_NM',
            valueField: 'CODE_ID',
            labelWidth: 60,
            width: 160,
            margin: '5 0 0 0',
            name: 'item_type',
            anchor: '-15',
            store: {
                type: 'TcodeAll'
            },
            minChars: 0,
            queryMode: 'local'
        }, {
            xtype: 'combobox',
            reference: 'wso_psblt',
            publishes: 'value',
            fieldLabel: Locale.getMsg('수주가능성'),
            labelWidth: 80,
            width: 180,
            margin: '5 0 0 0',
            labelAlign: 'right',
            displayField: 'name',
            valueField: 'code',
            name: 'wso_psblt',
            anchor: '-15',
            store: {
                fields: ['name', 'code'],
                data: [{ name: Locale.getMsg('적용'), code: '적용' }, { name: Locale.getMsg('미적용'), code: '미적용' }],
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
} );

Ext.define('Ysn.view.monitoring.orderReportsearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.orderReport-search',
	init: function() {
	    var Today = new Date();
	 this.lookupReference('bizGroup').store.load();
	 this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true));
	 this.lookupReference('biz_type').store.load({ params: { up_code_id: 'BIZ_TYPE', lang: localeCd } });
	 this.lookupReference('biz_type').setValue(''); 
	 this.lookupReference('item_type').store.load({ params: { up_code_id: 'ITEM_TYPE', lang: localeCd } });
	 this.lookupReference('item_type').setValue('');
	 this.lookupReference('wso_psblt').setValue(this.lookupReference('wso_psblt').getStore().getAt(1).get('code'));
	 this.lookupReference('order_ym_type').setValue(this.lookupReference('order_ym_type').getStore().getAt(0).get('code'));
     this.lookupReference('year').store.load();  
     this.lookupReference('year').setValue(Today.getFullYear());
	 this.lookupReference('month').store.load();  
	 this.lookupReference('month').setValue('0' + (Today.getMonth() + 1));
	 if(auth_id != 'A001'){
	//	 this.lookupReference('bizGroup').setConfig({'readOnly':true});
	//	 if(dept_level == '4') this.lookupReference('deptGroup').setConfig({'readOnly':true});
	 }
	    // if (loginUser != 'Sysadmin') this.lookupReference('userGroup').setValue(loginUser); 
	}, 
	onChangeBiz: function(el,newVal,oldVal,e){
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
	    var el = this.lookupReference('order_ym_type').getValue();
	    var pl = Ext.getCmp('monitoringorderReport');
	    switch (el) {
	        case '누계': 
	            pl.lookupReference('mbodetail').down('#mbo1').setFieldLabel(Locale.getMsg('당월누계목표'));
	            pl.lookupReference('mbodetail').down('#mbo2').setFieldLabel(Locale.getMsg('당월누계추정'));
	            pl.lookupReference('mbodetail').down('#mbo3').setFieldLabel(Locale.getMsg('전년누계실적'));
	            pl.lookupReference('mbodetail').down('#mbo4').setFieldLabel(Locale.getMsg('전월누계추정'));
	            break;
	        case 'M1':
	            pl.lookupReference('mbodetail').down('#mbo1').setFieldLabel(Locale.getMsg('(M+1)누계목표'));
	            pl.lookupReference('mbodetail').down('#mbo2').setFieldLabel(Locale.getMsg('(M+1)누계추정'));
	            pl.lookupReference('mbodetail').down('#mbo3').setFieldLabel(Locale.getMsg('(M+1)전년실적'));
	            pl.lookupReference('mbodetail').down('#mbo4').setFieldLabel(Locale.getMsg('(M+1)전월추정'));
	            break;
	        case 'M2':
	            pl.lookupReference('mbodetail').down('#mbo1').setFieldLabel(Locale.getMsg('(M+2)누계목표'));
	            pl.lookupReference('mbodetail').down('#mbo2').setFieldLabel(Locale.getMsg('(M+2)누계추정'));
	            pl.lookupReference('mbodetail').down('#mbo3').setFieldLabel(Locale.getMsg('(M+2)전년실적'));
	            pl.lookupReference('mbodetail').down('#mbo4').setFieldLabel(Locale.getMsg('(M+2)전월추정'));
	            break;
	        case 'M3':
	            pl.lookupReference('mbodetail').down('#mbo1').setFieldLabel(Locale.getMsg('(M+3)누계목표'));
	            pl.lookupReference('mbodetail').down('#mbo2').setFieldLabel(Locale.getMsg('(M+3)누계추정'));
	            pl.lookupReference('mbodetail').down('#mbo3').setFieldLabel(Locale.getMsg('(M+3)전년실적'));
	            pl.lookupReference('mbodetail').down('#mbo4').setFieldLabel(Locale.getMsg('(M+3)전월추정'));
	            break;
	        case '년간':
	            pl.lookupReference('mbodetail').down('#mbo1').setFieldLabel(Locale.getMsg('년간목표'));
	            pl.lookupReference('mbodetail').down('#mbo2').setFieldLabel(Locale.getMsg('년간추정'));
	            pl.lookupReference('mbodetail').down('#mbo3').setFieldLabel(Locale.getMsg('전년실적'));
	            pl.lookupReference('mbodetail').down('#mbo4').setFieldLabel(Locale.getMsg('전월추정'));
	            break;
	        default :
	            pl.lookupReference('mbodetail').down('#mbo1').setFieldLabel(Locale.getMsg('당월목표'));
	            pl.lookupReference('mbodetail').down('#mbo2').setFieldLabel(Locale.getMsg('당월추정'));
	            pl.lookupReference('mbodetail').down('#mbo3').setFieldLabel(Locale.getMsg('전년실적'));
	            pl.lookupReference('mbodetail').down('#mbo4').setFieldLabel(Locale.getMsg('전월추정'));
	            break;
	    } 
	    Ext.getStore('orderReport').load(
            {params:{ 
                bizGroup:this.lookupReference('bizGroup').getValue(),
                deptGroup:this.lookupReference('deptGroup').getValue(),
                order_ym_type:this.lookupReference('order_ym_type').getValue(),
                biz_type:this.lookupReference('biz_type').getValue(),
                item_type:this.lookupReference('item_type').getValue(),
                wso_psblt:this.lookupReference('wso_psblt').getValue(),
                year: this.lookupReference('year').getValue(),
                month: this.lookupReference('month').getValue()
            } 
           }
        ); 
	}


});

Ext.define('Ysn.store.orderReport', {
    extend: 'Ext.data.Store',
    alias: 'store.orderReport',
    storeId: 'orderReport',
    fields: ['LIST1', 'MBOCHART', 'LIST2_1', 'LIST2_2', 'LIST3', 'CHART1', 'CHART2', 'CHART3', 'CHART4'],
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/Monitoring/orderReport',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            var pl = Ext.getCmp('monitoringorderReport');
            var rec = store.data.items[0].data['LIST1'];
            var rateVal = 100000000;   
             
            pl.lookupReference('mbodocktop').down('#mbo1').setValue(Ysn.Util.fmCrny(rec[0].REPORT1_LEFT_VALUE1, rateVal) +'억');
            pl.lookupReference('mbodocktop').down('#mbo2').setValue(Ysn.Util.fmCrny(rec[0].REPORT1_LEFT_VALUE2, rateVal) + '억');
            pl.lookupReference('mbodocktop').down('#mbo3').setValue(Ysn.Util.fmCrny(rec[0].REPORT1_LEFT_VALUE3, rateVal) + '억');
            pl.lookupReference('mbodocktop').down('#mbo4').setValue(Ysn.Util.fmCrny(rec[0].REPORT1_LEFT_VALUE4, rateVal) + '억');

            pl.lookupReference('mbodetail').down('#img1').setHtml(
                '<img src=\"resources/' + Ysn.Util.YWCompare(rec[0].REPORT1_LEFT_VALUE2, rec[0].REPORT1_LEFT_VALUE1) + '.png\" width=\"45%\"/><br>'+ 
                 Ysn.Util.YWminusFm2(rec[0].REPORT1_LEFT_VALUE2, rec[0].REPORT1_LEFT_VALUE1, rateVal) + '억 <br>' +
                 Ysn.Util.YWpercentFm2(rec[0].REPORT1_LEFT_VALUE2, rec[0].REPORT1_LEFT_VALUE1) + '%'
            );
            pl.lookupReference('mbodetail').down('#img2').setHtml(
                '<img src=\"resources/' + Ysn.Util.YWCompare(rec[0].REPORT1_LEFT_VALUE2, rec[0].REPORT1_LEFT_VALUE4) + '.png\" width=\"45%\"/><br>' +
                 Ysn.Util.YWminusFm2(rec[0].REPORT1_LEFT_VALUE2, rec[0].REPORT1_LEFT_VALUE4, rateVal) + '억 <br>' +
                 Ysn.Util.YWpercentFm2(rec[0].REPORT1_LEFT_VALUE2, rec[0].REPORT1_LEFT_VALUE4) + '%'
            );
            pl.lookupReference('mbodetail').down('#img3').setHtml(
                '<img src=\"resources/' + Ysn.Util.YWCompare(rec[0].REPORT1_LEFT_VALUE2, rec[0].REPORT1_LEFT_VALUE3) + '.png\" width=\"45%\"/><br>' +
                 Ysn.Util.YWminusFm2(rec[0].REPORT1_LEFT_VALUE2, rec[0].REPORT1_LEFT_VALUE3, rateVal) + '억 <br>' +
                 Ysn.Util.YWpercentFm2(rec[0].REPORT1_LEFT_VALUE2, rec[0].REPORT1_LEFT_VALUE3) + '%'
            );

            pl.down('#chart').getStore().loadRawData(store.data.items[0].data['LIST3']);
            
            var rec2 = store.data.items[0].data['LIST2_1'];
            var td = pl.lookupReference('bDetail');
            td.removeAll();
            var subtotal1 = new Array(0, 0, 0 );
            var subtotal2 = new Array(0, 0, 0 );
            var total = new Array(0, 0, 0);
            td.add({ xtype: 'label', text: Locale.getMsg('구분'), itemId:'lb1', tdAttrs: { style: { 'font-weight': 'bold', height: '30px', backgroundColor: '#EFEFEF' } } });
            td.add({ xtype: 'label', text: Locale.getMsg('유통구조'), tdAttrs: { style: { 'font-weight': 'bold', height: '30px', backgroundColor: '#EFEFEF' } } });
            td.add({ xtype: 'label', text: Locale.getMsg('목표(A)'), tdAttrs: { style: { 'font-weight': 'bold', height: '30px', backgroundColor: '#EFEFEF' } } });
            td.add({ xtype: 'label', text: Locale.getMsg('실적/추정(B)'), tdAttrs: { style: { 'font-weight': 'bold', height: '30px', backgroundColor: '#EFEFEF' } } });
            td.add({ xtype: 'label', text: Locale.getMsg('증감(B-A)'), tdAttrs: { style: { 'font-weight': 'bold', height: '30px', backgroundColor: '#EFEFEF' } } });
            td.add({ xtype: 'label', text: Locale.getMsg('달성율'), tdAttrs: { style: { 'font-weight': 'bold', height: '30px', backgroundColor: '#EFEFEF' } } });
            td.add({ xtype: 'label', text: Locale.getMsg('국영'), rowspan: rec2.length+1 });
            for (var i = 0; i < rec2.length; i++) {
                var item1 = Ysn.Util.YWnumberFm2(rec2[i].REPORT2_VALUE1_1, rateVal);
                var item2 = Ysn.Util.YWnumberFm2(rec2[i].REPORT2_VALUE1_2, rateVal);
                var item3 = Ysn.Util.YWnumberFm2(rec2[i].REPORT2_VALUE1_3, rateVal);
                var item4 = Ysn.Util.YWpercentFm2(rec2[i].REPORT2_VALUE1_2,rec2[i].REPORT2_VALUE1_1, rateVal) + '%';

                td.add({ xtype: 'label', text: Locale.getMsg(rec2[i].CODE_NM) });
                td.add({ xtype: 'label', text: item1 });
                td.add({ xtype: 'label', text: item2 });
                td.add({ xtype: 'label', text: item3 });
                td.add({ xtype: 'label', text: item4 });
                subtotal1[0] = subtotal1[0] + parseFloat(item1);
                subtotal1[1] = subtotal1[1] + parseFloat(item2);
                subtotal1[2] = subtotal1[2] + parseFloat(item3); 
            }
            td.add({ xtype: 'label', text: 'TOTAL', tdAttrs: { style: { 'font-weight': 'bold' } } });
            td.add({ xtype: 'label', text: Ysn.Util.YWnumberFm2(subtotal1[0],1) ,tdAttrs: { style: { 'font-weight': 'bold'} } });
            td.add({ xtype: 'label', text: Ysn.Util.YWnumberFm2(subtotal1[1], 1), tdAttrs: { style: { 'font-weight': 'bold' } } });
            td.add({ xtype: 'label', text: Ysn.Util.YWnumberFm2(subtotal1[2], 1), tdAttrs: { style: { 'font-weight': 'bold' } } });
            td.add({ xtype: 'label', text: Ysn.Util.YWpercentFm2(subtotal1[1], subtotal1[0]) + '%', tdAttrs: { style: { 'font-weight': 'bold' } } });
            rec2 = store.data.items[0].data['LIST2_2'];
            td.add({ xtype: 'label', text: Locale.getMsg('해외'), rowspan: rec2.length + 1 });
            for (var i = 0; i < rec2.length; i++) {
                var item1 = Ysn.Util.YWnumberFm2(rec2[i].REPORT2_VALUE1_1, rateVal);
                var item2 = Ysn.Util.YWnumberFm2(rec2[i].REPORT2_VALUE1_2, rateVal);
                var item3 = Ysn.Util.YWnumberFm2(rec2[i].REPORT2_VALUE1_3, rateVal);
                var item4 = Ysn.Util.YWpercentFm2(rec2[i].REPORT2_VALUE1_2, rec2[i].REPORT2_VALUE1_1, rateVal) + '%';

                td.add({ xtype: 'label', text: Locale.getMsg(rec2[i].CODE_NM) });
                td.add({ xtype: 'label', text: item1 });
                td.add({ xtype: 'label', text: item2 });
                td.add({ xtype: 'label', text: item3 });
                td.add({ xtype: 'label', text: item4 });
                subtotal2[0] = subtotal2[0] + parseFloat(item1);
                subtotal2[1] = subtotal2[1] + parseFloat(item2);
                subtotal2[2] = subtotal2[2] + parseFloat(item3);
            }
            td.add({ xtype: 'label', text: 'TOTAL', tdAttrs: { style: { 'font-weight': 'bold' } } });
            td.add({ xtype: 'label', text: Ysn.Util.YWnumberFm2(subtotal2[0], 1), tdAttrs: { style: { 'font-weight': 'bold' } } });
            td.add({ xtype: 'label', text: Ysn.Util.YWnumberFm2(subtotal2[1], 1), tdAttrs: { style: { 'font-weight': 'bold' } } });
            td.add({ xtype: 'label', text: Ysn.Util.YWnumberFm2(subtotal2[2], 1), tdAttrs: { style: { 'font-weight': 'bold' } } });
            td.add({ xtype: 'label', text: Ysn.Util.YWpercentFm2(subtotal2[1], subtotal2[0]) + '%', tdAttrs: { style: { 'font-weight': 'bold' } } });
            total[0] = parseFloat(subtotal2[0]) + parseFloat(subtotal1[0]);
            total[1] = parseFloat(subtotal2[1]) + parseFloat(subtotal1[1]);
            total[2] = parseFloat(subtotal2[2]) + parseFloat(subtotal1[2]);
            td.add({ xtype: 'label', text: 'TOTAL', colspan: 2, tdAttrs: { style: { 'font-weight': 'bold' } } });
            td.add({ xtype: 'label', text: Ysn.Util.YWnumberFm2(total[0], 1), tdAttrs: { style: { 'font-weight': 'bold' } } });
            td.add({ xtype: 'label', text: Ysn.Util.YWnumberFm2(total[1], 1), tdAttrs: { style: { 'font-weight': 'bold' } } });
            td.add({ xtype: 'label', text: Ysn.Util.YWnumberFm2(total[2], 1), tdAttrs: { style: { 'font-weight': 'bold' } } });
            td.add({ xtype: 'label', text: Ysn.Util.YWpercentFm2(total[1], total[0]) + '%', tdAttrs: { style: { 'font-weight': 'bold' } } });

            pl.down('#chart2').getStore().loadRawData(store.data.items[0].data['CHART']);
            
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.view.monitoring.orderReport',{
    extend: 'Ext.panel.Panel',
    xtype: 'monitoring-orderReport',
    requires: [
        'Ysn.view.monitoring.orderReportController',
		'Ext.chart.series.*',
		'Ext.chart.theme.Muted'
    ],

    controller: 'monitoring-orderReport', 
    reference: 'monitoringorderReport',
	id:'monitoringorderReport',  
    overflow:'hidden',
	scrollable:false,
    header: false,
    bodyBorder: true, 	
    bodyPadding: 20,
	dockedItems: [
	               {
		            header: false,
					xtype: 'orderReport-search',
					reference: 'orderReportSearch',
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
                            title: Locale.getMsg('MBO Analysis'),
                            glyph: 'xf00b@FontAwesome',
                            reference: 'mbodetail',

                            scrollable: true,
                            dockedItems: [
	                                       {
	                                           title: '',
	                                           xtype: 'panel',
	                                           reference: 'mbodocktop',
	                                           collapsible: false,
	                                           floatable: false,
	                                           split: false,
	                                           padding: '0 0 0 0',
	                                           dock: 'top', 
                                               //width:500,
	                                           height: 40,
	                                           layout: {
	                                               type: 'hbox'

	                                           },
	                                           items: [
                                                   {
                                                       xtype: 'textfield',
                                                       fieldLabel: Locale.getMsg('당월목표'),
                                                       labelAlign: 'right',
                                                       labelWidth: 95,
                                                       width: 180,
                                                       name: 'mbo1', 
                                                       margin: '5 0 0 0',  
                                                       reference: 'mbo1',
                                                       itemId: 'mbo1',
                                                       fieldStyle: 'background:none', inputWrapCls: '', triggerWrapCls: '',
                                                       readOnly: true
                                                   }, {
                                                       xtype: 'textfield',
                                                       fieldLabel: Locale.getMsg('당월추정'),
                                                       labelAlign: 'right',
                                                       labelWidth: 95,
                                                       width: 180,
                                                       name: 'mbo2',
                                                       margin: '5 0 0 0',
                                                       reference: 'mbo2',
                                                       itemId: 'mbo2',
                                                       fieldStyle: 'background:none', inputWrapCls: '', triggerWrapCls: '',
                                                       readOnly: true
                                                   }, {
                                                       xtype: 'textfield',
                                                       fieldLabel: Locale.getMsg('전년실적'),
                                                       labelAlign: 'right',
                                                       labelWidth: 95,
                                                       width: 180,
                                                       name: 'mbo3',
                                                       margin: '5 0 0 0',
                                                       reference: 'mbo3',
                                                       itemId: 'mbo3',
                                                       fieldStyle: 'background:none', inputWrapCls: '', triggerWrapCls: '',
                                                       readOnly: true
                                                   }, {
                                                       xtype: 'textfield',
                                                       fieldLabel: Locale.getMsg('전월추정'),
                                                       labelAlign: 'right',
                                                       labelWidth: 95,
                                                       width: 180,
                                                       name: 'mbo4',
                                                       margin: '5 0 0 0',
                                                       reference: 'mbo4',
                                                       itemId: 'mbo4',
                                                       fieldStyle: 'background:none', inputWrapCls: '', triggerWrapCls: '',
                                                       readOnly: true
                                                   }
	                                           ]
	                                       }
                            ],
                             
                            xtype: 'panel',
                            flex: 1,
                            layout: {
                                type: 'table',
                                columns: 3,
                                tableAttrs: {
                                    style: {
                                        width: '99%',
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
                            items: [
                                { text: Locale.getMsg('목표대비'), itemId: 'bg1', tdAttrs: { style: { 'font-weight': 'bold', height: '30px', backgroundColor: '#EFEFEF' } } },
                                { text: Locale.getMsg('전월추정'), itemId: 'bg2', tdAttrs: { style: { 'font-weight': 'bold', height: '30px', backgroundColor: '#EFEFEF' } } },
                                { text: Locale.getMsg('전년대비'), itemId: 'bg3', tdAttrs: { style: { 'font-weight': 'bold', height: '30px', backgroundColor: '#EFEFEF' } } },
                                { html: '<img src=\"resources/icons_up.png\" width=\"60%\"/>', itemId: 'img1' },
                                { html: '<img src=\"resources/icons_up.png\" width=\"60%\"/>', itemId: 'img2' },
                                { html: '<img src=\"resources/icons_up.png\" width=\"60%\"/>', itemId: 'img3' }
                            ]
                        }, 
                        {   
                            title: 'Business Detail', 
                            glyph: 'xf080@FontAwesome',
                            scrollable: true,
                            reference: 'bDetail',
                            margin: '20 0 0 0', 
                            xtype: 'panel',
                            flex: 2,
                            layout: {
                                type: 'table',
                                columns: 6,
                                tableAttrs: {
                                    style: {
                                        width: '99%',
                                        height: '90%',
                                        'margin-top': '10px',
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
                            items: [
                                
                            ]

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
			                title: 'Actual/Forecasting by Business',  			
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
			                    fields: ['CODE_NM', 'Cosmetic', 'Pharma', 'B/D'],

			                    proxy: {
			                        method: "POST",
			                        type: 'memory',
			                        reader: {
			                            type: 'json',
			                            rootProperty: ''
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
			                    adjustByMajorUnit: true,
			                    grid: true,
			                    renderer: 'onAxisLabelRender',
			                    //maximum: 30,
			                    minimum: 0
			                }, {
			                    type: 'category3d',
			                    position: 'left',
			                    grid: true 
			                }], 
			                legend: {
			                    docked: 'bottom'
			                },
			                series: [{
			                    type: 'bar3d', 
			                    title: [Locale.getMsg('Cosmetic'),Locale.getMsg('Pharma'),Locale.getMsg('B/D')],
			                    xField: 'CODE_NM',
			                    yField: ['Cosmetic', 'Pharma', 'B/D'],
			                    stacked: true,
			                    style: {
			                       // minGapWidth: 10
			                    },
			                    highlight: true,
			                    /*label: {
			                        field: 'TOTAL',
			                        display: 'insideEnd',
			                        renderer: 'onSeriesLabelRender'
			                    },*/
			                    tooltip: {
			                        trackMouse: true,
			                        renderer: 'onSeriesTooltipRender'
			                    }
			                } ]  
		                }, 
			            {  
			                title: 'Actual/Forecasting', 
			                glyph: 'xf201@FontAwesome',
			                scrollable: true,
			                flex: 2,
			                margin: '20 0 0 0',
			                xtype: 'cartesian',
			                reference: 'chart2',
			                itemId: 'chart2',
			                theme: 'Muted',
			                store: {
			                    fields: ['MONTH', 'KRW_AMOUNT1', 'KRW_AMOUNT2', 'KRW_AMOUNT3', 'KRW_AMOUNT4'],
			                    proxy: {
			                        method: "POST",
			                        type: 'memory', 
			                        reader: {
			                            type: 'json',
			                            rootProperty: ''
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
			                legend: {
			                    docked: 'bottom'
			                },
			                insetPadding: { top: 20, left: 20, right: 20, bottom: 20 },
			                axes: [{
			                    type: 'numeric',
			                    position: 'left',
			                    adjustByMajorUnit: true,
			                    grid: true,
			                    fields: ['KRW_AMOUNT1', 'KRW_AMOUNT2', 'KRW_AMOUNT3', 'KRW_AMOUNT4'],
			                    renderer: 'onAxisLabelRender',
			                    maximum: 3000,
			                    minimum: 0
			                }, {
			                    type: 'category',
			                    position: 'bottom',
			                    grid: true,
			                    fields: ['MONTH']
			                }],
			                series: [{
			                    type: 'bar',
			                    title: Locale.getMsg('실적'),
			                    xField: 'MONTH',
			                    yField: 'KRW_AMOUNT1',
			                    marker: {
			                        type: 'square',
			                        fx: {
			                            duration: 200,
			                            easing: 'backOut'
			                        }
			                    },
			                    highlightCfg: {
			                        scaling: 2
			                    },
			                    tooltip: {
			                        trackMouse: true,
			                        renderer: 'onSeriesTooltipRender2'
			                    }
			                }, {
			                    type: 'line',
			                    title: Locale.getMsg('추정'),
			                    xField: 'MONTH',
			                    yField: 'KRW_AMOUNT2',
			                    marker: {
			                        type: 'cross',
			                        fx: {
			                            duration: 200,
			                            easing: 'backOut'
			                        }
			                    },
			                    highlightCfg: {
			                        scaling: 2
			                    },
			                    tooltip: {
			                        trackMouse: true,
			                        renderer: 'onSeriesTooltipRender2'
			                    }
			                }, {
			                    type: 'line',
			                    title: Locale.getMsg('목표'),
			                    xField: 'MONTH',
			                    yField: 'KRW_AMOUNT3',
			                    marker: {
			                        type: 'triangle',
			                        fx: {
			                            duration: 200,
			                            easing: 'backOut'
			                        }
			                    },
			                    highlightCfg: {
			                        scaling: 2
			                    },
			                    tooltip: {
			                        trackMouse: true,
			                        renderer: 'onSeriesTooltipRender2'
			                    }
			                }, {
			                    type: 'line',
			                    title: Locale.getMsg('년간추정(전월)'),
			                    xField: 'MONTH',
			                    yField: 'KRW_AMOUNT4',
			                    marker: {
			                        type: 'arrow',
			                        fx: {
			                            duration: 200,
			                            easing: 'backOut'
			                        }
			                    },
			                    highlightCfg: {
			                        scaling: 2
			                    },
			                    tooltip: {
			                        trackMouse: true,
			                        renderer: 'onSeriesTooltipRender2'
			                    }
			                }]

				
			            }
	               ]
    }
    ]




	
});



Ext.define('Ysn.view.monitoring.orderReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.monitoring-orderReport',
	requires: [ 
    ],
 init: function() {     
     this.lookupReference('orderReportSearch').getController('orderReport-search').onSearch();
	}, 
	
	  
	onPreview: function() {
        if (Ext.isIE8) {
            Ext.Msg.alert('Unsupported Operation', 'This operation requires a newer version of Internet Explorer.');
            return;
        }
        var chart;
		
	    if(this.lookupReference('chart'))chart = this.lookupReference('chart')  ;
        if(this.lookupReference('chart2'))chart = this.lookupReference('chart2')  ;
        chart.preview();
    },

    onThemeSwitch: function () {

        var chart;
		
	    if(this.lookupReference('chart'))chart = this.lookupReference('chart')  ;
        if(this.lookupReference('chart2'))chart = this.lookupReference('chart2')  ;
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
            item.record.get('MONTH')+'월 ' + browser +': ' +
            target.yValue.toFixed(1)  );
    },

    onBarTipRender: function (tooltip, record, item) {
        var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
            browser = item.series.getTitle()[fieldIndex];

        tooltip.setHtml( record.get('MONTH')+'월 ' + browser + ': ' +
            record.get(item.field) );
    },

    onGridMonthRender: function (value) {
        return value;
    },

    onGridValueRender: function (value) { 
        return Ysn.Util.YWnumberFm(value,true) ;
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
            tooltip.setHtml('Cosmetic: ' + Ysn.Util.YWnumberFm2(record.get('Cosmetic'),1) + '억<br>' + 'Pharma: ' + Ysn.Util.YWnumberFm2(record.get('Pharma'),1) + '억<br>' + 'B/D: ' + Ysn.Util.YWnumberFm2(record.get('B/D'),1) + '억');
         
	},
    onSeriesTooltipRender2: function (tooltip, record, item) {
    var title = item.series.getTitle(); 
        tooltip.setHtml(record.get('MONTH') + '월 ' + title + ': ' +
         Ysn.Util.YWnumberFm2(record.get(item.series.getYField()), 1) + '억');
    }

});






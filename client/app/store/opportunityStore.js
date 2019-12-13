Ext.define('Ysn.store.opportunityList', {
    extend: 'Ext.data.Store',
    alias: 'store.opportunityList',
    storeId: 'opportunityList',
    model: 'Ysn.model.opportunityList', 
    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/Opportunity/opportunityList',			 
			reader: {
				type: 'json',
				rootProperty: 'LIST' 
			}
	},
	listeners: {
            load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
                //console.log(store);
                var pl;
                if (Ext.getCmp('baseInfo-userChange')) pl = Ext.getCmp('baseInfo-userChange');
                if (Ext.getCmp('businessopportunity-opportunity')) pl = Ext.getCmp('businessopportunity-opportunity');
                pl.down('#total').setHtml('Total : ' + store.data.items.length);
            }
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.opportunityView', {
    extend: 'Ext.data.Store',
    alias: 'store.opportunityView',

    fields: ['LIST', 'ITEM_LIST'],
    storeId: 'opportunityView',
    
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/Opportunity/opportunityDetail',
        masked: {
            xtype: 'loadmask',
            message: 'loading...'
        },
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            if (!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            //Ext.getStore('opportunityDetail').loadRawData(store.data.items[0].data['LIST']);
            var frm = Ext.getCmp('opportunityDetail').getForm();
            var rec = store.data.items[0].data['LIST'];
            frm.findField('oppt_cd').setValue(rec.OPPT_CD);
            frm.findField('oppt_type_nm').setValue(rec.OPPT_TYPE_NM);
            frm.findField('oppt_type').setValue(rec.OPPT_TYPE); 
            frm.findField('item_cd').setValue(rec.ITEM_CD);
            frm.findField('item_nm').setValue(rec.ITEM_NM);
            frm.findField('rfc_cd').setValue(rec.RFC_CD);
            frm.findField('rfc_chasu').setValue(rec.RFC_CHASU);  
            frm.findField('biz_type').setValue(rec.BIZ_TYPE); 
            frm.findField('dstr_type').setValue(rec.DSTR_TYPE);
            frm.findField('oppt_status').setValue(rec.OPPT_STATUS);
            frm.findField('cust_nm').setValue(rec.CUST_NM);
            frm.findField('cust_cd').setValue(rec.CUST_CD); 
            frm.findField('wso_pdate').setValue(Ext.Date.parse(rec.WSO_PDATE,'Ymd'));
            frm.findField('euser_nm').setValue(rec.EUSER_NM);
            frm.findField('euser_cd').setValue(rec.EUSER_CD);
            frm.findField('user_nm').setValue(rec.USER_NM);
            frm.findField('user_cd').setValue(rec.USER_CD);
            frm.findField('dept_nm').setValue(rec.DEPT_NM);
            frm.findField('dept_cd').setValue(rec.DEPT_CD);
            frm.findField('wso_psblt').setValue(rec.WSO_PSBLT);
            frm.findField('oppt_sumry').setValue(rec.OPPT_SUMRY);
            frm.findField('base_crny').setValue(rec.BASE_CRNY);
            frm.findField('exch_rate').setValue(rec.EXCH_RATE);
            frm.findField('pjt_cd').setValue(rec.PJT_CD);
            Ext.getStore('opportunityItem').loadRawData(store.data.items[0].data['ITEM_LIST']);
            

        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.opportunityDetail', {
    extend: 'Ext.data.Store',
    alias: 'store.opportunityDetail',

    model: 'Ysn.model.opportunityDetail',
    storeId: 'opportunityDetail',

    proxy: {
            type: 'memory', 
            reader: {
                type: 'json',
                rootProperty: ''
            }
	},
	listeners: {
	    load: function (store) { 
				//console.log(store);
				//Ext.getCmp('productinquiry-inquiry').down('#total').setHtml('Total : ' + store.data.items.length);
                
            }
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.opportunityItem', {
    extend: 'Ext.data.Store',
    alias: 'store.opportunityItem',

    model: 'Ysn.model.opportunityItem',
    storeId: 'opportunityItem',

    proxy: { 
        type: 'memory', 
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        refresh: function (store) { 
            var pl = Ext.getCmp('opportunityDetail');
            for (var i = 0; i < store.data.items.length; i++) {
                pl.add({ xtype: 'hiddenfield', name: 'oppt_item_cd', itemId: 'oppt_item_cd' + i, value: store.data.items[i].data.ITEM_CD2 });
                pl.add({ xtype: 'hiddenfield', name: 'oppt_sales_date', itemId: 'oppt_sales_date' + i, value: Ext.Date.format(store.data.items[i].data.SALES_DATE, 'Y-m-d') });
                pl.add({ xtype: 'hiddenfield', name: 'oppt_oppt_qty', itemId: 'oppt_oppt_qty' + i, value: store.data.items[i].data.OPPT_QTY });
                pl.add({ xtype: 'hiddenfield', name: 'oppt_oppt_unit_prc', itemId: 'oppt_oppt_unit_prc' + i, value: store.data.items[i].data.OPPT_UNIT_PRC });
                pl.add({ xtype: 'hiddenfield', name: 'oppt_amount', itemId: 'oppt_amount' + i, value: store.data.items[i].data.AMOUNT });
                pl.add({ xtype: 'hiddenfield', name: 'oppt_krw_amount', itemId: 'oppt_krw_amount' + i, value: store.data.items[i].data.KRW_AMOUNT });
            }

        }
    },
    autoLoad: false,
    autoDestroy: false

});


Ext.define('Ysn.store.forecastList', {
    extend: 'Ext.data.Store',
    alias: 'store.forecastList',
    storeId: 'forecastList',
    model: 'Ysn.model.forecastList',
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/Forecast/forecastList',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            if (!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            //console.log(store);
            Ext.getCmp('businessopportunity-forecast').down('#total').setHtml('Total : ' + store.data.items.length);
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.forecastView', {
    extend: 'Ext.data.Store',
    alias: 'store.forecastView',

    fields: ['LIST', 'ITEM_LIST'],
    storeId: 'forecastView',

    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/Forecast/forecastDetail',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            if (!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            //Ext.getStore('forecastDetail').loadRawData(store.data.items[0].data['LIST']);
            var pl = Ext.getCmp('forecastDetail')
            var frm = pl.getForm();
            var rec = store.data.items[0].data['LIST'];
            var title = '납품예정 정보 [전망년월:' + rec.BASE_YM + ']'; 
            Ext.getCmp('forecastDetail').lookupReference('itemList').setTitle(title)
            frm.findField('oppt_cd').setValue(rec.OPPT_CD);
            frm.findField('oppt_type_nm').setValue(rec.OPPT_TYPE_NM);
            frm.findField('oppt_type').setValue(rec.OPPT_TYPE);
            frm.findField('item_nm').setValue(rec.ITEM_NM);
            frm.findField('item_cd').setValue(rec.ITEM_CD);
            frm.findField('rfc_cd').setValue(rec.RFC_CD);
            frm.findField('rfc_chasu').setValue(rec.RFC_CHASU);
            frm.findField('oppt_type').setValue(rec.OPPT_TYPE);
            frm.findField('oppt_type_nm').setValue(rec.OPPT_TYPE_NM);
            frm.findField('biz_type_nm').setValue(rec.BIZ_TYPE_NM);
            frm.findField('biz_type').setValue(rec.BIZ_TYPE);
            frm.findField('dstr_type_nm').setValue(rec.DSTR_TYPE_NM);
            frm.findField('dstr_type').setValue(rec.DSTR_TYPE);
            frm.findField('oppt_status').setValue(rec.OPPT_STATUS);
            frm.findField('cust_nm').setValue(rec.CUST_NM);
            frm.findField('cust_cd').setValue(rec.CUST_CD);
            frm.findField('oppt_type_nm').setValue(rec.OPPT_TYPE_NM);
            frm.findField('wso_pdate').setValue(Ext.Date.parse(rec.WSO_PDATE, 'Ymd'));
            frm.findField('euser_nm').setValue(rec.EUSER_NM);
            frm.findField('euser_cd').setValue(rec.EUSER_CD);
            frm.findField('user_nm').setValue(rec.USER_NM);
            frm.findField('user_cd').setValue(rec.USER_CD);
            frm.findField('dept_nm').setValue(rec.DEPT_NM);
            frm.findField('dept_cd').setValue(rec.DEPT_CD);
            frm.findField('wso_psblt').setValue(rec.WSO_PSBLT);
            frm.findField('oppt_sumry').setValue(rec.OPPT_SUMRY);
            frm.findField('base_crny').setValue(rec.BASE_CRNY);
            frm.findField('exch_rate').setValue(rec.EXCH_RATE);
            frm.findField('pjt_cd').setValue(rec.PJT_CD);
            frm.findField('cnfm_yn').setValue(rec.CNFM_YN);
            frm.findField('chkbaseyn').setValue(rec.CHKBASEYN);
            frm.findField('base_ym').setValue(rec.BASE_YM);
            if (rec.CNFM_YN == 'N' && rec.CHKBASEYN == 'N') {
                pl.down('#btn3').show();
            } else {
                pl.down('#btn3').hide();
            }
            Ext.getStore('forecastItem').loadRawData(store.data.items[0].data['ITEM_LIST']);

        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.forecastDetail', {
    extend: 'Ext.data.Store',
    alias: 'store.forecastDetail',

    model: 'Ysn.model.forecastDetail',
    storeId: 'forecastDetail',

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        load: function (store) {
            //console.log(store);
            //Ext.getCmp('productinquiry-inquiry').down('#total').setHtml('Total : ' + store.data.items.length);

        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.forecastItem', {
    extend: 'Ext.data.Store',
    alias: 'store.forecastItem',

    model: 'Ysn.model.forecastItem',
    storeId: 'forecastItem',

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        refresh: function (store) {
            var pl = Ext.getCmp('forecastDetail');
            for (var i = 0; i < store.data.items.length; i++) {
                pl.add({ xtype: 'hiddenfield', name: 'oppt_item_cd', itemId: 'oppt_item_cd' + i, value: store.data.items[i].data.ITEM_CD2 });
                pl.add({ xtype: 'hiddenfield', name: 'oppt_sales_date', itemId: 'oppt_sales_date' + i, value: Ext.Date.format(store.data.items[i].data.SALES_DATE, 'Y-m-d') });
                pl.add({ xtype: 'hiddenfield', name: 'oppt_oppt_qty', itemId: 'oppt_oppt_qty' + i, value: store.data.items[i].data.OPPT_QTY });
                pl.add({ xtype: 'hiddenfield', name: 'oppt_oppt_unit_prc', itemId: 'oppt_oppt_unit_prc' + i, value: store.data.items[i].data.OPPT_UNIT_PRC });
                pl.add({ xtype: 'hiddenfield', name: 'oppt_amount', itemId: 'oppt_amount' + i, value: store.data.items[i].data.AMOUNT });
                pl.add({ xtype: 'hiddenfield', name: 'oppt_krw_amount', itemId: 'oppt_krw_amount' + i, value: store.data.items[i].data.KRW_AMOUNT });
            }

        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.salesOrderList', {
    extend: 'Ext.data.Store',
    alias: 'store.salesOrderList',
    storeId: 'salesOrderList',
    model: 'Ysn.model.salesOrderList',
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/SalesOrder/salesOrderList',
        timeout: 900000,
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store) {
            //console.log(store);
            var pl;
            if (Ext.getCmp('baseInfo-userChange')) pl = Ext.getCmp('baseInfo-userChange');
            if (Ext.getCmp('businessopportunity-salesOrder')) pl = Ext.getCmp('businessopportunity-salesOrder');
            pl.down('#total').setHtml('Total : ' + store.data.items.length);
        }
    },
    remoteGroup: true,
    leadingBufferZone: 300,
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.salesOrderView', {
    extend: 'Ext.data.Store',
    alias: 'store.salesOrderView',

    fields: ['LIST', 'ORDER_COUNT', 'ORDER_LIST', 'BILL_COUNT', 'BILL_LIST'],
    storeId: 'salesOrderView',

    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/SalesOrder/salesOrderDetail',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        load: function (store) {
            //Ext.getStore('forecastDetail').loadRawData(store.data.items[0].data['LIST']);
            var pl = Ext.getCmp('salesOrderDetail')
            var frm = pl.getForm();
            var rec = store.data.items[0].data['LIST'];  
            frm.findField('lot_no').setValue(rec.LOT_NO); 
            frm.findField('item_nm').setValue(rec.ITEM_NM);
            frm.findField('po_cd').setValue(rec.PO_CD);
            //frm.findField('smp_cd').setValue(rec.SMP_CD);
            // frm.findField('smp_chasu').setValue(rec.SMP_CHASU);
            frm.findField('cust_nm').setValue(rec.CUST_NM);
            frm.findField('cust_cd').setValue(rec.CUST_CD);
            frm.findField('biz_type_nm').setValue(rec.BIZ_TYPE_NM);
            frm.findField('biz_type').setValue(rec.BIZ_TYPE);
            frm.findField('user_nm').setValue(rec.USER_NM);
            frm.findField('user_cd').setValue(rec.USER_CD);
            frm.findField('close_yn').setValue(rec.CLOSE_YN);
            frm.findField('euser_nm').setValue(rec.EUSER_NM);
            frm.findField('euser_cd').setValue(rec.EUSER_CD);
            frm.findField('dstr_type_nm').setValue(rec.DSTR_TYPE_NM);
            frm.findField('dstr_type').setValue(rec.DSTR_TYPE);
            frm.findField('dept_nm').setValue(rec.DEPT_NM);
            frm.findField('dept_cd').setValue(rec.DEPT_CD);
            frm.findField('ord_cdate').setValue(rec.ORD_CDATE);
            frm.findField('item_level1').setValue(rec.ORD_CDATE);
            frm.findField('item_level2').setValue(rec.ITEM_LEVEL1);
            frm.findField('item_level3').setValue(rec.ITEM_LEVEL2);
            frm.findField('ord_gb_l_nm').setValue(rec.ORD_GB_L_NM);
            frm.findField('ord_gb_m_nm').setValue(rec.ORD_GB_M_NM);
            frm.findField('ord_gb_s_nm').setValue(rec.ORD_GB_S_NM);
            frm.findField('so_cd').setValue(rec.SO_CD);
            frm.findField('so_seq').setValue(rec.SO_SEQ);
            frm.findField('pjt_cd').setValue(rec.PJT_CD);
            frm.findField('so_serl').setValue(rec.SO_SERL);
            frm.findField('ctlg_cd').setValue(rec.CTLG_CD);
            Ext.getStore('salesOrderItem1').add({
                ITEM_CD2: rec.ITEM_CD2,
                ITEM_NM: rec.ITEM_NM,
                BASE_CRNY: rec.BASE_CRNY,
                EXCH_RATE: rec.EXCH_RATE,
                QTY: rec.QTY,
                UNIT_PRICE: rec.UNIT_PRICE,
                AMOUNT: rec.AMOUNT,
                KRW_AMOUNT: rec.KRW_AMOUNT,
                SALES_PDATE: rec.SALES_PDATE,
                SALES_DDATE: rec.SALES_DDATE,
                SO_CD: rec.SO_CD,
                SO_SEQ: rec.SO_SEQ,
                SO_SERL: rec.SO_SERL,
                ITEM_CD: rec.ITEM_CD,
                LOT_NO: rec.LOT_NO
            });
            pl.lookupReference('itemList2').setTitle('납품정보[' + store.data.items[0].data['ORDER_COUNT'] + '건]')
            pl.lookupReference('itemList3').setTitle('청구정보[' + store.data.items[0].data['BILL_COUNT'] + '건]')
            Ext.getStore('salesOrderItem2').loadRawData(store.data.items[0].data['ORDER_LIST']);
            Ext.getStore('salesOrderItem3').loadRawData(store.data.items[0].data['BILL_LIST']);

        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.salesOrderItem1', {
    extend: 'Ext.data.Store',
    alias: 'store.salesOrderItem1',
    storeId: 'salesOrderItem1',
    model: 'Ysn.model.salesOrderItem1',
    proxy: { 
        type: 'memory',
        url: '',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        load: function (store) {
            //console.log(store);
           // Ext.getCmp('businessopportunity-salesOrder').down('#total').setHtml('Total : ' + store.data.items.length);
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.salesOrderItem2', {
    extend: 'Ext.data.Store',
    alias: 'store.salesOrderItem2',
    storeId: 'salesOrderItem2',
    model: 'Ysn.model.salesOrderItem2',
    proxy: { 
        type: 'memory',
        url: '',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        load: function (store) {
            //console.log(store);
            // Ext.getCmp('businessopportunity-salesOrder').down('#total').setHtml('Total : ' + store.data.items.length);
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.salesOrderItem3', {
    extend: 'Ext.data.Store',
    alias: 'store.salesOrderItem3',
    storeId: 'salesOrderItem3',
    model: 'Ysn.model.salesOrderItem3',
    proxy: { 
        type: 'memory',
        url: '',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        load: function (store) {
            //console.log(store);
            // Ext.getCmp('businessopportunity-salesOrder').down('#total').setHtml('Total : ' + store.data.items.length);
        }
    },
    autoLoad: false,
    autoDestroy: false

});
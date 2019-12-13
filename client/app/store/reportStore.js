Ext.define('Ysn.store.orderTargetSalesList', {
    extend: 'Ext.data.Store',
    alias: 'store.orderTargetSalesList',
    storeId: 'opportunityList',
    model: 'Ysn.model.orderTargetSalesList', 
    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/Report/orderTargetList',			 
			reader: {
				type: 'json',
				rootProperty: 'LIST' 
			}
	},
	listeners: {
            load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
                //console.log(store);
                Ext.getCmp('report-orderTargetSales').down('#total').setHtml('Total : ' + store.data.items.length);
            }
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.selectOrderResultList', {
    extend: 'Ext.data.Store',
    alias: 'store.selectOrderResultList',
    storeId: 'selectOrderResultList',
    model: 'Ysn.model.selectOrderResult',
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/Report/selectOrderResultAnalysisList',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store) {
            //console.log(store);
            Ext.getCmp('report-selectOrderResult').down('#total').setHtml('Total : ' + store.data.items.length);
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.selectDivOrderResultList', {
    extend: 'Ext.data.Store',
    alias: 'store.selectDivOrderResultList',
    storeId: 'selectDivOrderResultList',
    model: 'Ysn.model.selectDivOrderResult',
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/Report/selectDivOrderResultAnalysisList',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store) {
            //console.log(store);
            Ext.getCmp('report-selectOrderResult').down('#total').setHtml('Total : ' + store.data.items.length);
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.salesTargetSalesList', {
    extend: 'Ext.data.Store',
    alias: 'store.salesTargetSalesList',
    storeId: 'opportunityList',
    model: 'Ysn.model.salesTargetSalesList',
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/Report/salesTargetSalesAnalysisList',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store) {
            //console.log(store);
            Ext.getCmp('report-salesTargetSales').down('#total').setHtml('Total : ' + store.data.items.length);
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.selectSalesResultList', {
    extend: 'Ext.data.Store',
    alias: 'store.selectSalesResultList',
    storeId: 'selectSalesResultList',
    model: 'Ysn.model.selectSalesResult',
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/Report/selectSalesResultAnalysisList',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store) {
            //console.log(store);
            Ext.getCmp('report-selectSalesResult').down('#total').setHtml('Total : ' + store.data.items.length);
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.selectDivSalesResultList', {
    extend: 'Ext.data.Store',
    alias: 'store.selectDivSalesResultList',
    storeId: 'selectDivSalesResultList',
    model: 'Ysn.model.selectDivSalesResult',
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/Report/selectDivSalesResultAnalysisList',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store) {
            //console.log(store);
            Ext.getCmp('report-selectSalesResult').down('#total').setHtml('Total : ' + store.data.items.length);
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.deferredBoundsList', {
    extend: 'Ext.data.Store',
    alias: 'store.deferredBoundsList',
    storeId: 'deferredBoundsList',
    model: 'Ysn.model.deferredBoundsList',
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/Report/deferredBoundsList',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store) {
            //console.log(store);
            Ext.getCmp('report-deferredBounds').down('#total').setHtml('Total : ' + store.data.items.length);
        }
    },
    autoLoad: false,
    autoDestroy: false

});
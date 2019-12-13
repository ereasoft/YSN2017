Ext.define('Ysn.store.salesActivityPlan', {
    extend  : 'Sch.data.EventStore',
	model   : 'Ysn.model.salesActivityPlan',
    storeId : 'salesActivityPlan',
    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/SalesActivity/calCustDataList',			 
			reader: {
				type: 'json',
				rootProperty: 'LIST' 
			}
	},
	listeners: {
            load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
				//console.log(store);
				
            }
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.salesHistoryList', {
    extend  : 'Ext.data.Store',
	model   : 'Ysn.model.salesActivityList',
	alias: 'store.salesHistoryList',
    storeId : 'salesHistoryList',
    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/SalesActivity/salesActivityStatusList',			 
			reader: {
				type: 'json',
				rootProperty: 'LIST' 
			}
	},
	listeners: {
            load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
				//console.log(store);
				Ext.getCmp('salesactivitysalesHistory').down('#total').setHtml('Total : ' + store.data.items.length);
            }
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.salesCommentList', {
    extend  : 'Ext.data.Store',
	model   : 'Ysn.model.salesCommentList',
	alias: 'store.salesCommentList',
    storeId : 'salesCommentList',
    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/SalesActivity/salesActivityCommentList',			 
			reader: {
				type: 'json',
				rootProperty: 'LIST' 
			}
	},
	listeners: {
            load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
				//console.log(store);
				Ext.getCmp('salesactivitysalesComment').down('#total').setHtml('Total : ' + store.data.items.length);
            }
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.salesReportList', {
    extend  : 'Ext.data.Store',
	model   : 'Ysn.model.salesActivityList',
	alias: 'store.salesReportList',
    storeId : 'salesReportList',
    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/SalesActivity/salesActivityWorkList',			 
			reader: {
				type: 'json',
				rootProperty: 'LIST' 
			}
	},
	listeners: {
            load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
				//console.log(store);
				Ext.getCmp('salesactivitysalesReport').down('#total').setHtml('Total : ' + store.data.items.length);
            }
    },
	autoLoad: false,
	autoDestroy: false

});


Ext.define('Ysn.store.salesMonitoringList', {
    extend  : 'Ext.data.Store',
	model   : 'Ysn.model.salesMonitoringList',
	alias: 'store.salesMonitoringList',
    storeId : 'salesMonitoringList',
    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/SalesActivity/salesActiveMonitoringList',			 
			reader: {
				type: 'json',
				rootProperty: 'LIST' 
			}
	},
	listeners: {
            load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
				//console.log(store);
				Ext.getCmp('salesactivitysalesMonitoring').down('#total').setHtml('Total : ' + store.data.items.length);
            }
    },
	autoLoad: false,
	autoDestroy: false

});
Ext.define('Ysn.store.orderTargetList', {
    extend: 'Ext.data.Store',
    alias: 'store.orderTargetList',
    storeId: 'orderTargetList',
    model: 'Ysn.model.orderTargetList', 
    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/BaseInfo/orderTargetList',
			reader: {
				type: 'json',
				rootProperty: 'LIST' 
			}
	},
	listeners: {
            load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
                //console.log(store);
                Ext.getCmp('baseInfo-orderTarget').down('#total').setHtml('Total : ' + store.data.items.length);
            }
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.salesTargetList', {
    extend: 'Ext.data.Store',
    alias: 'store.salesTargetList',
    storeId: 'salesTargetList',
    model: 'Ysn.model.orderTargetList',
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/BaseInfo/salesTargetList',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store) {
            //console.log(store);
            Ext.getCmp('baseInfo-salesTarget').down('#total').setHtml('Total : ' + store.data.items.length);
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.nationInfoList', {
    extend: 'Ext.data.Store',
    alias: 'store.nationInfoList',
    storeId: 'nationInfoList',
    model: 'Ysn.model.nationInfoList',
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/BaseInfo/nationInfoList',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store) {
            //console.log(store);
            Ext.getCmp('baseInfo-nationInfo').down('#total').setHtml('Total : ' + store.data.items.length);
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.baseCrnyInfoList', {
    extend: 'Ext.data.Store',
    alias: 'store.baseCrnyInfoList',
    storeId: 'baseCrnyInfo',
    model: 'Ysn.model.baseCrnyInfoList',
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/BaseInfo/baseCrnyInfoList',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store) {
            //console.log(store);
            Ext.getCmp('baseInfo-baseCrnyInfo').down('#total').setHtml('Total : ' + store.data.items.length);
        }
    },
    autoLoad: false,
    autoDestroy: false

} );

Ext.define('Ysn.store.baseCrnyInfoList2', {
    extend: 'Ext.data.Store',
    alias: 'store.baseCrnyInfoList2',
    storeId: 'baseCrnyInfo2',
    model: 'Ysn.model.baseCrnyInfoList',
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/BaseInfo/baseCrnyInfoList',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store) {       }
    },
    autoLoad: true,
    autoDestroy: true

});
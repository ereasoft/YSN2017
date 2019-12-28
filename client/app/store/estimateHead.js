Ext.define('Ysn.store.estimatehead', {
    extend: 'Ext.data.Store',
    alias: 'store.estimatehead',
    storeId: 'estimatehead',
    model: 'Ysn.model.estimateheadModel',
    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/Estimate/estimateHeadList',
			reader: {
				type: 'json',
				rootProperty: 'LIST' 
			}
	},
	listeners: {
            load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
                //console.log(store);
                //Ext.getCmp('baseInfo-orderTarget').down('#total').setHtml('Total : ' + store.data.items.length);
            }
    },
	autoLoad: false,
	autoDestroy: false

});
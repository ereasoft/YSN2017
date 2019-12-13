Ext.define('Ysn.store.estimateitem', {
    extend: 'Ext.data.Store',
    alias: 'store.estimateitem',
    storeId: 'estimateitem',
    model: 'Ysn.model.estimateitemModel',
    proxy: {
			method: "POST",
			type: 'memory',    
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
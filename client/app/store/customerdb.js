Ext.define('Ysn.store.customerList', {
    extend: 'Ext.data.Store',
    alias: 'store.customerList',

    model : 'Ysn.model.customerList',
    storeId: 'customerList',

    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/Customer/customerList',			 
			reader: {
				type: 'json',
				rootProperty: 'LIST' 
			}
	},
	listeners: {
            load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
				//console.log(store);
				Ext.getCmp('customerdbCustomer').down('#total').setHtml('Total : ' + store.data.items.length);
            }
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.customerDetail', {
    extend: 'Ext.data.Store',
    alias: 'store.customerDetail',

    model : 'Ysn.model.customerDetail',
    storeId: 'customerDetail',

    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/Customer/customerDetail',			 
			reader: {
				type: 'json',
				rootProperty: '' 
			}
	},
	listeners: { 
		exception: function(proxy, type, action, o, response, args){
			Ext.MessageBox.alert('Error', response.errors.reason, function(){return true;});
		}
    },
	autoLoad: false,
	autoDestroy: false

});


Ext.define('Ysn.store.keymanList', {
    extend: 'Ext.data.Store',
    alias: 'store.keymanList',

    model : 'Ysn.model.keymanList',
    storeId: 'keymanList',

    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/KeyMan/keyManList',			 
			reader: {
				type: 'json',
				rootProperty: 'LIST' 
			}
	},
	listeners: {
            load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
				//console.log(store);
				Ext.getCmp('customerdbkeyman').down('#total').setHtml('Total : ' + store.data.items.length);
            }
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.keymanDetail', {
    extend: 'Ext.data.Store',
    alias: 'store.keymanDetail',

    model : 'Ysn.model.keymanDetail',
    storeId: 'keymanDetail',

    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/KeyMan/keyManDetail',			 
			reader: {
				type: 'json',
				rootProperty: '' 
			}
	},
	listeners: { 
		load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
				 
        },
		exception: function(proxy, type, action, o, response, args){
			Ext.MessageBox.alert('Error', response.errors.reason, function(){return true;});
		}
    },
	autoLoad: true,
	autoDestroy: true

});





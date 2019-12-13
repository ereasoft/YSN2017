Ext.define('Ysn.store.sampleRequestList', {
    extend: 'Ext.data.Store',
    alias: 'store.sampleRequestList',
    storeId: 'sampleRequestList',
    //fields: [ 'LIST', 'COUNT'],
	model : 'Ysn.model.sampleRequestList',
    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/SampleRequest/sampleRequestList',			 
			reader: {
				type: 'json',
				rootProperty: 'LIST' 
			}
	},
	listeners: {
            load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
				//console.log(store);
				Ext.getCmp('samplerequest-request').down('#total').setHtml('Total : ' + store.data.items.length);
                //Ext.getStore('subSampleRequestList').loadRawData(store.data.items[0].data['LIST']); 
            }
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.subSampleRequestList', {
    extend: 'Ext.data.Store',
    alias: 'store.subSampleRequestList',

    model : 'Ysn.model.sampleRequestList',
    storeId: 'subSampleRequestList',

    proxy: {
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
				//Ext.getCmp('productinquiry-inquiry').down('#total').setHtml('Total : ' + store.data.items.length);
                
            }
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.sampleReceiptList', {
    extend: 'Ext.data.Store',
    alias: 'store.sampleReceiptList',
    storeId: 'sampleReceiptList',
   //fields: [ 'LIST', 'COUNT'],	
	model : 'Ysn.model.sampleRequestList',
    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/SampleRequest/sampleRequestList',			 
			reader: {
				type: 'json',
				rootProperty: 'LIST' 
			}
	},
	listeners: {
            load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
				//console.log(store);
				Ext.getCmp('samplerequest-receipt').down('#total').setHtml('Total : ' + store.data.items.length);
                //Ext.getStore('subSampleReceiptList').loadRawData(store.data.items[0].data['LIST']); 
            }
    },
	autoLoad: false,
	autoDestroy: false

});
 

Ext.define('Ysn.store.sampleReviewList', {
    extend: 'Ext.data.Store',
    alias: 'store.sampleReviewList',
    storeId: 'sampleReviewList',
	model : 'Ysn.model.sampleRequestList',
    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/SampleRequest/sampleRequestList',			 
			reader: {
				type: 'json',
				rootProperty: 'LIST' 
			}
	},
	listeners: {
            load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
				//console.log(store);
				Ext.getCmp('samplerequest-review').down('#total').setHtml('Total : ' + store.data.items.length);
                //Ext.getStore('subSampleReviewList').loadRawData(store.data.items[0].data['LIST']); 
            }
    },
	autoLoad: false,
	autoDestroy: false

});
 


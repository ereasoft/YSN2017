Ext.define('Ysn.store.sampleProductionList', {
    extend: 'Ext.data.Store',
    alias: 'store.sampleProductionList',
    storeId: 'sampleProductionList',
	model : 'Ysn.model.sampleProductionList',
    //fields: [ 'LIST', 'COUNT'],
    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/SampleManage/sampleManageList',			 
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
				if(Ext.getCmp('sampleproduction-instance')) pl = Ext.getCmp('sampleproduction-instance'); 
				pl.down('#total').setHtml('Total : ' + store.data.items.length);
            }
    },
	autoLoad: false,
	autoDestroy: true

});

Ext.define('Ysn.store.sampleProductionList2', {
    extend: 'Ext.data.Store',
    alias: 'store.sampleProductionList2',
    storeId: 'sampleProductionList2',
    model: 'Ysn.model.sampleProductionList',
    //fields: [ 'LIST', 'COUNT'],
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/SampleManage/sampleManageList',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            if (!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            //console.log(store);
            var pl;
             
            if (Ext.getCmp('sampleproduction-approval')) {
                pl = Ext.getCmp('sampleproduction-approval');
                if (pl.lookupReference('approvalSearch').lookupReference('smp_status').getValue() == 'SMSTAT_200' && pl.lookupReference('approvalSearch').lookupReference('smp_type').getValue() != '') {
                    pl.down('#batchCommit').show();
                } else {
                    pl.down('#batchCommit').hide();
                }
            }
            
            pl.down('#total').setHtml('Total : ' + store.data.items.length);
        }
    },
    autoLoad: false,
    autoDestroy: true

});

Ext.define('Ysn.store.sampleProductionList3', {
    extend: 'Ext.data.Store',
    alias: 'store.sampleProductionList3',
    storeId: 'sampleProductionList3',
    model: 'Ysn.model.sampleProductionList',
    //fields: [ 'LIST', 'COUNT'],
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/SampleManage/sampleManageList',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            if (!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            //console.log(store);
            var pl;
             
            if (Ext.getCmp('sampleproduction-complet')) pl = Ext.getCmp('sampleproduction-complet');
            if (Ext.getCmp('sampleproduction-complet')) {
                pl = Ext.getCmp('sampleproduction-complet');
                if (pl.lookupReference('completSearch').lookupReference('smp_status').getValue() == 'SMSTAT_400') {
                    pl.down('#batchCommit').show();
                    pl.down('#batchCommit2').show();
                } else {
                    pl.down('#batchCommit').hide();
                    pl.down('#batchCommit2').hide();
                }
            } 
            pl.down('#total').setHtml('Total : ' + store.data.items.length);
        }
    },
    autoLoad: false,
    autoDestroy: true

});

Ext.define('Ysn.store.sampleProductionList4', {
    extend: 'Ext.data.Store',
    alias: 'store.sampleProductionList4',
    storeId: 'sampleProductionList4',
    model: 'Ysn.model.sampleProductionList',
    //fields: [ 'LIST', 'COUNT'],
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/SampleManage/sampleManageList',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            if (!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            //console.log(store);
            var pl;
             
            //pl.down('#total').setHtml('Total : ' + store.data.items[0].data['COUNT']);
            if (Ext.getCmp('baseInfo-userChange')) pl = Ext.getCmp('baseInfo-userChange');
            pl.down('#total').setHtml('Total : ' + store.data.items.length);
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.subSampleProductionList', {
    extend: 'Ext.data.Store',
    alias: 'store.subSampleProductionList',

    model : 'Ysn.model.sampleProductionList',
    storeId: 'subSampleProductionList',

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

Ext.define('Ysn.store.sampleDropList', {
    extend: 'Ext.data.Store',
    alias: 'store.sampleDropList',
    storeId: 'sampleDropList',
	model : 'Ysn.model.sampleDropList',
    //fields: [ 'LIST', 'COUNT'],
    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/SampleManage/selectDropList',			 
			reader: {
				type: 'json',
				rootProperty: 'LIST' 
			}
	},
	listeners: {
            load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
				//console.log(store);
				pl = Ext.getCmp('sampleproduction-drop'); 
				pl.down('#total').setHtml('Total : ' + store.data.items.length);
            }
    },
	autoLoad: false,
	autoDestroy: false

});
/*
Ext.define('Ysn.store.inquiryDetail', {
    extend: 'Ext.data.Store',
    alias: 'store.inquiryDetail',

    model : 'Ysn.model.inquiryDetail',
    storeId: 'inquiryDetail',

    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/ProductInquiry/inquiryDetail',			 
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
*/



Ext.define('Ysn.store.baseProd', {
    extend: 'Ext.data.Store',
    alias: 'store.baseProd',

    model: 'Ysn.model.baseproductModel',
    storeId: 'baseProd',

    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/Estimate/baseProdList',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            //store.insert(0, { DEPT_CD: '', DEPT_NM: Locale.getMsg('전체') });
            //Ext.getCmp('customer-search').down('#user_cd').store.removeAll();
        }
    },
    autoLoad: false,
    autoDestroy: false

});






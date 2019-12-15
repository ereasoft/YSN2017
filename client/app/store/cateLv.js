Ext.define('Ysn.store.cateLv', {
    extend: 'Ext.data.Store',
    alias: 'store.cateLv',       
    storeId: 'cateLv',

    fields: [{ name: 'catenm' }, { name: 'cd' }],
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/Estimate/cate_lv1',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },     
    listeners: {
        load: function (store, records, successful, operation) {
            if ( !Ysn.Util.OnsessOut( operation._response.responseText ) ) return false;     
            store.insert( 0, { catenm: 'NA', cd: '' } );
            //Ext.getCmp('customer-search').down('#user_cd').store.removeAll();
        }
    },
    autoLoad: true,
    autoDestroy: true

});






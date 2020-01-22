Ext.define( 'Ysn.store.submitcd', {
    extend: 'Ext.data.Store',
    alias: 'store.submitcd',

    fields: [
             { name: 'USER_CD', type: 'string' },
             { name: 'USER_NM', type: 'string' },
             { name: 'DEPT_NM', type: 'string' }

    ],
    storeId: 'submitcd',

    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/CodeList/SubmitUser',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        load: function ( store, records, successful, operation )
        {
           
        }
    },
    autoLoad: false,
    autoDestroy: false

} );
Ext.define( 'Ysn.view.estimate.estimateDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.estimateDetail',

    init: function ()
    {
        this.lookupReference( 'dstr_chn' ).getStore().load( { params: { up_code_id: 'DSTR_TYPE', lang: localeCd } } );
        var store = this.lookupReference( 'estimateItem' ).getStore();
        for ( var i = 0; i < 30; i++ )
        {
            store.insert( i + 1, { no: i + 1 } );
        }
    },        

    openWindow: function ()
    {
        //if(!Ext.getCmp('common-searchPartUser')){
        var win = Ext.getCmp( 'commonSearchcustomer' );
        if ( !win )
        {
            win = new Ysn.view.common.searchcustomer();
        }
        var hidfield = win.query( '#paentFrm' )[0];
        win.down( '#cust_nm' ).setValue( this.lookupReference( 'cust_nm' ).getValue() )
        hidfield.setValue( 'estimateDetail' );
        Ext.getCmp( 'estimateDetail' ).add( win );
        win.setPosition( 10, 10 );
        win.show();
        //}
    },
    resetVal: function ()
    {
        this.lookupReference( 'cust_nm' ).setValue( '' );
        this.lookupReference( 'cust_cd' ).setValue( '' );
    }
} );
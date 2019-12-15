Ext.define( 'Ysn.view.estimate.estimateDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.estimateDetail',

    init: function ()
    {
        this.lookupReference( 'dstr_chn' ).getStore().load( { params: { up_code_id: 'DSTR_TYPE', lang: localeCd } } ); 
        var store = this.lookupReference( 'estimateItem' ).getStore();
        for ( var i = 0; i < 30; i++ )
        {
            store.insert( i + 1, { no: i + 1, header_yn: 'Y' } );
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

    beforeQuery: function ( qplan, eOpts ){
        qplan.combo.getStore().reload();
    },

    setCateLv1: function ( obj, e, eOpts )
    {
        var rowIdx = obj.up( 'gridview' ).indexOf( obj.el.up( 'table' ) );
        obj.up( 'grid' ).getStore().data.items[rowIdx].set('cate_lv1', obj.getValue());
        Ysn.Global.setEstCateLv1( obj.getValue() );
        Ysn.Global.setEstRowIdx( rowIdx );         
    },

    setCateLv2: function ( obj, e, eOpts )
    {
        var rowIdx = obj.up( 'gridview' ).indexOf( obj.el.up( 'table' ) );
        obj.up( 'grid' ).getStore().data.items[rowIdx].set('cate_lv2', obj.getValue());
        Ysn.Global.setEstCateLv2( obj.getValue() );
        Ysn.Global.setEstRowIdx( rowIdx );
    },

    setProd: function ( obj, e, eOpts )
    {
        var rowIdx = obj.up( 'gridview' ).indexOf( obj.el.up( 'table' ) );
        obj.up( 'grid' ).getStore().data.items[rowIdx].set('prod', obj.getValue()); 
        Ysn.Global.setEstRowIdx( rowIdx );
    },

    setProdCode: function ( obj, e, eOpts )
    {
        var rowIdx = obj.up( 'gridview' ).indexOf( obj.el.up( 'table' ) );
        var store = obj.up( 'grid' ).getStore();
        var rec = store.data.items[rowIdx];    
        //rec = obj.getSelectedRecord();    
        //rec.set( 'prod_name', 'zszczcxzc' );

        //obj.up( 'grid' ).getView().refresh();

        Ysn.Global.setEstRowIdx( rowIdx );
    },

    chgCateLv1: function ( obj, newValue, oldValue, eOpts )
    {
        if ( newValue != 'NA' ) return false;

        var rowIdx = obj.up( 'gridview' ).indexOf( obj.el.up( 'table' ) );
        obj.up( 'grid' ).getStore().data.items[rowIdx].data.cate_lv1 = '';
        obj.up( 'grid' ).getStore().data.items[rowIdx].data.cate_lv2 = '';
        Ysn.Global.setEstCateLv1( '' );
        Ysn.Global.setEstCateLv2( '' );
        Ysn.Global.setEstRowIdx( rowIdx );
    },

    chgCateLv2: function ( obj, newValue, oldValue, eOpts )
    {
        if ( newValue != '' ) return false;

        var rowIdx = obj.up( 'gridview' ).indexOf( obj.el.up( 'table' ) );
        obj.up( 'grid' ).getStore().data.items[rowIdx].data.cate_lv2 = '';    
        Ysn.Global.setEstCateLv2( '' );
        Ysn.Global.setEstRowIdx( rowIdx );
    },

    resetVal: function ()
    {
        this.lookupReference( 'cust_nm' ).setValue( '' );
        this.lookupReference( 'cust_cd' ).setValue( '' );
    }
} );
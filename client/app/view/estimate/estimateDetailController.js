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
        var seldata = obj.getSelectedRecord();
        //obj.lookupViewModel().set( obj.getSelectedRecord() );   
        Ysn.Global.setEstRowIdx( rowIdx );          
        rec.set( 'prod_name', seldata.get( 'prod_name' ) );
        rec.set( 'prod_desc', seldata.get( 'prod_desc' ) );
        rec.set( 'unit_price', seldata.get( 'unit_price' ) );
        rec.set( 'quantity', seldata.get( 'quantity' ) );
        rec.set( 'amount', seldata.get( 'amount' ) );
        rec.set( 'qty_5k', seldata.get( 'qty_5k' ) );
        rec.set( 'qty_10k', seldata.get( 'qty_10k' ) );
        rec.set( 'qty_30k', seldata.get( 'qty_30k' ) );
        rec.set( 'qty_50k', seldata.get( 'qty_50k' ) );
        rec.set( 'qty_100k', seldata.get( 'qty_100k' ) );
        rec.set( 'remark', seldata.get( 'remark' ) );
        rec.set( 'idx', seldata.get( 'idx' ) );
        rec.set( 'prod_option1', seldata.get( 'prod_option1' ) );
        rec.set( 'prod_others', seldata.get( 'prod_others' ) );
        rec.set( 'eco_category', seldata.get( 'eco_category' ) );
        rec.set( 'sample_modify', seldata.get( 'sample_modify' ) );
        rec.set( 'bottle_5K', seldata.get( 'bottle_5K' ) );
        rec.set( 'bottle_10K', seldata.get( 'bottle_10K' ) );
        rec.set( 'bottle_30K', seldata.get( 'bottle_30K' ) );
        rec.set( 'bottle_50K', seldata.get( 'bottle_50K' ) );
        rec.set( 'bottle_100K', seldata.get( 'bottle_100K' ) );
        rec.set( 'Innerbottle_5K', seldata.get( 'Innerbottle_5K' ) );
        rec.set( 'Innerbottle_10K', seldata.get( 'Innerbottle_10K' ) );
        rec.set( 'Innerbottle_50K', seldata.get( 'Innerbottle_50K' ) );
        rec.set( 'Innerbottle_100K', seldata.get( 'Innerbottle_100K' ) );
        rec.set( 'pumpcap_5K', seldata.get( 'pumpcap_5K' ) );
        rec.set( 'pumpcap_10K', seldata.get( 'pumpcap_10K' ) );
        rec.set( 'pumpcap_30K', seldata.get( 'pumpcap_30K' ) );
        rec.set( 'pumpcap_50K', seldata.get( 'pumpcap_50K' ) );
        rec.set( 'pumpcap_100K', seldata.get( 'pumpcap_100K' ) );
        rec.set( 'cap_5K', seldata.get( 'cap_5K' ) );
        rec.set( 'cap_10K', seldata.get( 'cap_10K' ) );
        rec.set( 'cap_30K', seldata.get( 'cap_30K' ) );
        rec.set( 'cap_50K', seldata.get( 'cap_50K' ) );
        rec.set( 'cap_100K', seldata.get( 'cap_100K' ) );
        rec.set( 'tubesleeveheadering_5K', seldata.get( 'tubesleeveheadering_5K' ) );
        rec.set( 'tubesleeveheadering_10K', seldata.get( 'tubesleeveheadering_10K' ) );
        rec.set( 'tubesleeveheadering_30K', seldata.get( 'tubesleeveheadering_30K' ) );
        rec.set( 'tubesleeveheadering_50K', seldata.get( 'tubesleeveheadering_50K' ) );
        rec.set( 'tubesleeveheadering_100K', seldata.get( 'tubesleeveheadering_100K' ) );
        rec.set( 'others_5K', seldata.get( 'others_5K' ) );
        rec.set( 'others_10K', seldata.get( 'others_10K' ) );
        rec.set( 'others_30K', seldata.get( 'others_30K' ) );
        rec.set( 'others_50K', seldata.get( 'others_50K' ) );
        rec.set( 'others_100K', seldata.get( 'others_100K' ) );
        rec.set( 'set_5K', seldata.get( 'set_5K' ) );
        rec.set( 'set_10K', seldata.get( 'set_10K' ) );
        rec.set( 'set_30K', seldata.get( 'set_30K' ) );
        rec.set( 'set_50K', seldata.get( 'set_50K' ) );
        rec.set( 'set_100K', seldata.get( 'set_100K' ) );
        
    },

    setProd: function ( obj, e, eOpts )
    {
        var rowIdx = obj.up( 'gridview' ).indexOf( obj.el.up( 'table' ) );
        switch ( obj.getValue() )
        {
            case 'Bottle':
                break;
            case 'InnerBottle':
                break;
            case 'Pump_Cap':
                break;
            case 'Cap':
                break;
            case 'TubeSleeve_Headering':
                break;
            case 'Others':
                break;
            case 'SET':
                break; 
        }
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
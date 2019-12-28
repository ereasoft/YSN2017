Ext.define( 'Ysn.view.estimate.estimateDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.estimateDetail',

    init: function ()
    {
        var now = new Date();
        var year = Ext.Date.format( now, 'Y' );

        this.lookupReference( 'dstr_chn' ).getStore().load( { params: { up_code_id: 'DSTR_TYPE', lang: localeCd } } );
        this.lookupReference( 'currency' ).getStore().load( { params: { base_yr: year, lang: localeCd } } );
        this.lookupReference( 'submit_cd' ).getStore().load( { params: { dept_cd: dept_cd, lang: localeCd } } );
        this.lookupReference( 'ref_cd' ).getStore().load( { params: { dept_cd: dept_cd, lang: localeCd } } );
        //this.lookupReference( 'estimate_date' ).setValue( now );
        this.lookupReference( 'currency' ).setValue( 'KRW' );
        Ysn.Global.setEstQty( this.lookupReference( 'item_qty' ).getValue() );
        this.lookupReference( 'dstr_chn' ).setValue( dstr_chn );
        this.lookupReference( 'user_cd' ).setValue( loginUser );
        this.lookupReference( 'user_nm' ).setValue( username );


        var store = this.lookupReference( 'estimateItem' ).getStore();        

        for ( var i = 0; i < 30; i++ )
        {
            store.insert( i + 1, { no: i + 1, header_yn: 'Y' } );
        }


                    
    },

    chgType : function(obj, newValue, oldValue, eOpts)
    {             
        var grid = this.lookupReference( 'estimateItem' );
        var item_qty = this.lookupReference( 'item_qty' );
        if ( newValue.form_type == 'A' )        
        {
            item_qty.setHidden( false );
            grid.columns[7].setHidden( false );
            grid.columns[8].setHidden( false );
            grid.columns[9].setHidden( false );
            grid.columns[10].setHidden( true );
            grid.columns[11].setHidden( true );
            grid.columns[12].setHidden( true );
            grid.columns[13].setHidden( true );
            grid.columns[14].setHidden( true );       
        } else
        {
            item_qty.setHidden( true );
            grid.columns[7].setHidden( true );
            grid.columns[8].setHidden( true );
            grid.columns[9].setHidden( true );
            grid.columns[10].setHidden( false );
            grid.columns[11].setHidden( false );
            grid.columns[12].setHidden( false );
            grid.columns[13].setHidden( false );
            grid.columns[14].setHidden( false );
        }
       
    },

    calcAmt: function ( obj, newValue, oldValue, eOpts )
    {
        if ( newValue == null || newValue == '' ) return false;
        var grid = this.lookupReference( 'estimateItem' );
        var rec = obj.lookupViewModel().get( 'record' );
        rec.set( 'amount', rec.get( 'unit_price' ) * rec.get( 'quantity' ) );

    },


    setQty: function ( obj, newValue, oldValue, eOpts )
    {
        Ysn.Global.setEstQty( newValue );     
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

    beforeQuery: function ( qplan, eOpts )
    {
        qplan.combo.getStore().reload();
    },

    setStep: function ( obj, e, eOpts )
    {  
        var rowIdx = obj.up( 'gridview' ).indexOf( obj.el.up( 'table' ) );
        var store = obj.up( 'grid' ).getStore();
        var seldata = store.data.items[0];
        var rec = obj.lookupViewModel().get( 'record' );
        if ( obj.getValue() == 'Y' )
        {     
            return false;
        }             
        seldata = store.data.items[rowIdx - 1];
        //obj.lookupViewModel().set( obj.getSelectedRecord() );  
        Ysn.Global.setEstRowIdx( rowIdx );
        Ysn.Global.setEstStep( obj.getValue() );
        rec.set( 'prod_code', seldata.get( 'prod_code' ) );
        rec.set( 'prod', seldata.get( 'prod' ) );
        rec.set( 'sample_modify', seldata.get( 'sample_modify' ) );
    },

    setCateLv1: function ( obj, e, eOpts )
    {
        var rowIdx = obj.up( 'gridview' ).indexOf( obj.el.up( 'table' ) );
        obj.up( 'grid' ).getStore().data.items[rowIdx].set( 'cate_lv1', obj.getValue() );
        Ysn.Global.setEstCateLv1( obj.getValue() );
        Ysn.Global.setEstRowIdx( rowIdx );
    },

    setCateLv2: function ( obj, e, eOpts )
    {
        var rowIdx = obj.up( 'gridview' ).indexOf( obj.el.up( 'table' ) );
        obj.up( 'grid' ).getStore().data.items[rowIdx].set( 'cate_lv2', obj.getValue() );
        Ysn.Global.setEstCateLv2( obj.getValue() );
        Ysn.Global.setEstRowIdx( rowIdx );
    },     

    setProdCode: function ( obj, e, eOpts )
    {
        var rowIdx = 0;
        var store = obj.up( 'grid' ).getStore();
        var rec = store.data.items[rowIdx];
        var seldata = obj.getSelectedRecord();
        this.lookupReference( 'prod_name' ).setValue( seldata.get( 'prod_desc' ) );
        //obj.lookupViewModel().set( obj.getSelectedRecord() );   
        Ysn.Global.setEstRowIdx( rowIdx );    
        Ysn.Global.setEstProdCode( obj.getValue() );
        //rec.set( 'prod_name', seldata.get( 'prod_name' ) );
        //rec.set( 'prod_desc', seldata.get( 'prod_desc' ) );
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



    setProdOption: function ( obj, e, eOpts )
    {
        var rec = obj.lookupViewModel().get( 'record' );
        var seldata = obj.getSelectedRecord();
        var quantity = Ysn.Global.getEstQty();
        rec.set( 'quantity', quantity );
        rec.set( 'prod_name', seldata.get( 'prod_name' ) );
        rec.set( 'prod_desc', obj.getValue() );
        rec.set( 'global_basic', seldata.get( 'global_basic' ) );
        rec.set( 'global_sample', seldata.get( 'global_sample' ) );
        rec.set( 'japan_basic', seldata.get( 'japan_basic' ) );
        rec.set( 'japan_sample', seldata.get( 'japan_sample' ) );

        var currency = parseFloat( Ysn.Global.getEstCrny() );
        var chk = obj.up( 'form' ).getForm().findField( 'form_lang' ).getValue();

        switch ( rec.get( 'sample_modify' ) )
        {
            case 'Y':
                if ( chk.form_lang.indexOf( 'en' ) > -1 )
                {
                    rec.set( 'unit_price', rec.get( 'global_sample' ) / currency );
                    rec.set( 'qty_5k', rec.get( 'global_sample' ) / currency );
                    rec.set( 'qty_10k', rec.get( 'global_sample' ) / currency );
                    rec.set( 'qty_30k', rec.get( 'global_sample' ) / currency );
                    rec.set( 'qty_50k', rec.get( 'global_sample' ) / currency );
                    rec.set( 'qty_100k', rec.get( 'global_sample' ) / currency );
                } else
                {
                    rec.set( 'unit_price', rec.get( 'japan_sample' ) / currency );
                    rec.set( 'qty_5k', rec.get( 'japan_sample' ) / currency );
                    rec.set( 'qty_10k', rec.get( 'japan_sample' ) / currency );
                    rec.set( 'qty_30k', rec.get( 'japan_sample' ) / currency );
                    rec.set( 'qty_50k', rec.get( 'japan_sample' ) / currency );
                    rec.set( 'qty_100k', rec.get( 'japan_sample' ) / currency );
                }

                break;
            case 'N':
                if ( chk.form_lang.indexOf( 'en' ) > -1 )
                {
                    rec.set( 'unit_price', rec.get( 'global_basic' ) / currency );
                    rec.set( 'qty_5k', rec.get( 'global_basic' ) / currency );
                    rec.set( 'qty_10k', rec.get( 'global_basic' ) / currency );
                    rec.set( 'qty_30k', rec.get( 'global_basic' ) / currency );
                    rec.set( 'qty_50k', rec.get( 'global_basic' ) / currency );
                    rec.set( 'qty_100k', rec.get( 'global_basic' ) / currency );
                } else
                {
                    rec.set( 'unit_price', rec.get( 'japan_basic' ) / currency );
                    rec.set( 'qty_5k', rec.get( 'japan_basic' ) / currency );
                    rec.set( 'qty_10k', rec.get( 'japan_basic' ) / currency );
                    rec.set( 'qty_30k', rec.get( 'japan_basic' ) / currency );
                    rec.set( 'qty_50k', rec.get( 'japan_basic' ) / currency );
                    rec.set( 'qty_100k', rec.get( 'japan_basic' ) / currency );
                }
                break;
        }
        rec.set( 'amount', rec.get( 'unit_price' ) * rec.get( 'quantity' ) );

    },


    setSampleYn: function ( obj, e, eOpts )
    {
        var rec = obj.lookupViewModel().get( 'record' );
        var currency = parseFloat( Ysn.Global.getEstCrny() );
        var chk = obj.up( 'form' ).getForm().findField( 'form_lang' ).getValue();
        switch ( obj.getValue() )
        {
            case 'Y':
                if ( chk.form_lang.indexOf( 'en' ) > -1 )
                {
                    rec.set( 'unit_price', rec.get( 'global_sample' ) / currency );
                    rec.set( 'qty_5k', rec.get( 'global_sample' ) / currency );
                    rec.set( 'qty_10k', rec.get( 'global_sample' ) / currency );
                    rec.set( 'qty_30k', rec.get( 'global_sample' ) / currency );
                    rec.set( 'qty_50k', rec.get( 'global_sample' ) / currency );
                    rec.set( 'qty_100k', rec.get( 'global_sample' ) / currency );
                } else
                {
                    rec.set( 'unit_price', rec.get( 'japan_sample' ) / currency );
                    rec.set( 'qty_5k', rec.get( 'japan_sample' ) / currency );
                    rec.set( 'qty_10k', rec.get( 'japan_sample' ) / currency );
                    rec.set( 'qty_30k', rec.get( 'japan_sample' ) / currency );
                    rec.set( 'qty_50k', rec.get( 'japan_sample' ) / currency );
                    rec.set( 'qty_100k', rec.get( 'japan_sample' ) / currency );
                }

                break;
            case 'N':
                if ( chk.form_lang.indexOf( 'en' ) > -1 )
                {
                    rec.set( 'unit_price', rec.get( 'global_basic' ) / currency );
                    rec.set( 'qty_5k', rec.get( 'global_basic' ) / currency );
                    rec.set( 'qty_10k', rec.get( 'global_basic' ) / currency );
                    rec.set( 'qty_30k', rec.get( 'global_basic' ) / currency );
                    rec.set( 'qty_50k', rec.get( 'global_basic' ) / currency );
                    rec.set( 'qty_100k', rec.get( 'global_basic' ) / currency );
                } else
                {
                    rec.set( 'unit_price', rec.get( 'japan_basic' ) / currency );
                    rec.set( 'qty_5k', rec.get( 'japan_basic' ) / currency );
                    rec.set( 'qty_10k', rec.get( 'japan_basic' ) / currency );
                    rec.set( 'qty_30k', rec.get( 'japan_basic' ) / currency );
                    rec.set( 'qty_50k', rec.get( 'japan_basic' ) / currency );
                    rec.set( 'qty_100k', rec.get( 'japan_basic' ) / currency );
                }
                break;
        }
    },
                                                     



    setProd: function ( obj, e, eOpts )
    {
        var rec = obj.lookupViewModel().get( 'record' );
        var currency = parseFloat( Ysn.Global.getEstCrny() );
        var quantity = Ysn.Global.getEstQty();
        var rowIdx = obj.up( 'gridview' ).indexOf( obj.el.up( 'table' ) );     
        rec.set( 'quantity', quantity );

        if ( rec.get( 'header_yn' ) == 'Y' )
        {
            if ( rowIdx > 0 )
            {
                var store = obj.up( 'grid' ).getStore();
                var seldata = store.data.items[0];
                rec.set( 'unit_price', seldata.get( 'unit_price' ) );
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
            }
            rec.set( 'prod_desc', obj.getRawValue() + ' ' + 'BASE' );
            
        }

        switch ( obj.getValue() )
        {
            case 'Bottle':

                rec.set( 'unit_price', rec.get( 'bottle_5K' ) / currency );   
                rec.set( 'qty_5k', rec.get( 'bottle_5K' ) / currency );
                rec.set( 'qty_10k', rec.get( 'bottle_10K' ) / currency );
                rec.set( 'qty_30k', rec.get( 'bottle_30K' ) / currency );
                rec.set( 'qty_50k', rec.get( 'bottle_50K' ) / currency );
                rec.set( 'qty_100k', rec.get( 'bottle_100K' ) / currency );
                break;
            case 'InnerBottle':
                rec.set( 'unit_price', rec.get( 'Innerbottle_5K' ) / currency );
                rec.set( 'qty_5k', rec.get( 'Innerbottle_5K' ) / currency );
                rec.set( 'qty_10k', rec.get( 'Innerbottle_10K' ) / currency );
                rec.set( 'qty_30k', rec.get( 'Innerbottle_30K' ) / currency );
                rec.set( 'qty_50k', rec.get( 'Innerbottle_50K' ) / currency );
                rec.set( 'qty_100k', rec.get( 'Innerbottle_100K' ) / currency );
                break;
            case 'Pump_Cap':
                rec.set( 'unit_price', rec.get( 'pumpcap_5K' ) / currency );
                rec.set( 'qty_5k', rec.get( 'pumpcap_5K' ) / currency );
                rec.set( 'qty_10k', rec.get( 'pumpcap_10K' ) / currency );
                rec.set( 'qty_30k', rec.get( 'pumpcap_30K' ) / currency );
                rec.set( 'qty_50k', rec.get( 'pumpcap_50K' ) / currency );
                rec.set( 'qty_100k', rec.get( 'pumpcap_100K' ) / currency );
                break;
            case 'Cap':
                rec.set( 'unit_price', rec.get( 'cap_5K' ) / currency );
                rec.set( 'qty_5k', rec.get( 'cap_5K' ) / currency );
                rec.set( 'qty_10k', rec.get( 'cap_10K' ) / currency );
                rec.set( 'qty_30k', rec.get( 'cap_30K' ) / currency );
                rec.set( 'qty_50k', rec.get( 'cap_50K' ) / currency );
                rec.set( 'qty_100k', rec.get( 'cap_100K' ) / currency );
                break;
            case 'TubeSleeve_Headering':
                rec.set( 'unit_price', rec.get( 'tubesleeveheadering_5K' ) / currency );
                rec.set( 'qty_5k', rec.get( 'tubesleeveheadering_5K' ) / currency );
                rec.set( 'qty_10k', rec.get( 'tubesleeveheadering_10K' ) / currency );
                rec.set( 'qty_30k', rec.get( 'tubesleeveheadering_30K' ) / currency );
                rec.set( 'qty_50k', rec.get( 'tubesleeveheadering_50K' ) / currency );
                rec.set( 'qty_100k', rec.get( 'tubesleeveheadering_100K' ) / currency );
                break;
            case 'Others':
                rec.set( 'unit_price', rec.get( 'others_5K' ) / currency );
                rec.set( 'qty_5k', rec.get( 'others_5K' ) / currency );
                rec.set( 'qty_10k', rec.get( 'others_10K' ) / currency );
                rec.set( 'qty_30k', rec.get( 'others_30K' ) / currency );
                rec.set( 'qty_50k', rec.get( 'others_50K' ) / currency );
                rec.set( 'qty_100k', rec.get( 'others_100K' ) / currency );
                break;
            case 'SET':
                rec.set( 'unit_price', rec.get( 'set_5K' ) / currency );
                rec.set( 'qty_5k', rec.get( 'set_5K' ) / currency );
                rec.set( 'qty_10k', rec.get( 'set_10K' ) / currency );
                rec.set( 'qty_30k', rec.get( 'set_30K' ) / currency );
                rec.set( 'qty_50k', rec.get( 'set_50K' ) / currency );
                rec.set( 'qty_100k', rec.get( 'set_100K' ) / currency );
                break;
        }    
        rec.set( 'amount', rec.get( 'unit_price' ) * rec.get( 'quantity' ) );
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

    onChangeCrny: function ( obj, newValue, oldValue, eOpts )
    {
        if ( newValue == null || newValue == '' ) return false;
        var estCrny = obj.getSelectedRecord().get( 'EXCH_RATE' );
        Ysn.Global.setEstCrny( estCrny );
        Ysn.Global.setEstScrny( newValue );
    },

    resetVal: function ()
    {
        this.lookupReference( 'cust_nm' ).setValue( '' );
        this.lookupReference( 'cust_cd' ).setValue( '' );
    },

    resetId: function ()
    {
        this.lookupReference( 'idx' ).setValue( null );
        this.lookupReference( 'estimate_id' ).setValue( null );
        this.lookupReference( 'tempbtn' ).setDisabled( false );
        this.lookupReference( 'reqbtn' ).setDisabled( false );
    },

    resetAll: function ()
    {
        this.getView().getForm().reset();        
        this.lookupReference( 'user_cd' ).setValue( loginUser );
        this.lookupReference( 'user_nm' ).setValue( username );
        this.lookupReference( 'currency' ).setValue( Ysn.Global.getEstScrny() );     
        this.lookupReference( 'tempbtn' ).setDisabled( false );
        this.lookupReference( 'reqbtn' ).setDisabled( false );
        var store = this.lookupReference( 'estimateItem' ).getStore();
        store.removeAll();
        for ( var i = 0; i < 30; i++ )
        {
            store.insert( i + 1, { no: i + 1, header_yn: 'Y' } );
        }

    },

    Save: function (title, status)
    {
        me = this;

        var form = me.getView().getForm();
        var idx = form.findField( 'idx' ).getValue();     
        form.findField( 'exch_rate' ).setValue( Ysn.Global.getEstCrny() );
        form.findField( 'status_cd' ).setValue( status );
        if ( status == '1' ) form.findField( 'estimate_date' ).setValue( new Date() );
        Ysn.Util.cbEmptyVal(me.getView()); 
        if ( form.isValid() )
        {
            var url = '/Estimate/estimateHeadInsert';

            if ( idx != null && idx != "" ) url = '/Estimate/estimateHeadUpdate';

            params = form.getValues();
            params.ref_nm = form.findField( 'ref_cd' ).getRawValue();
            params.submit_nm = form.findField( 'submit_cd' ).getRawValue();
            params.detailitem = Ext.encode( Ext.pluck( me.lookupReference( 'estimateItem' ).getStore().data.items, 'data' ) );
            form.setConfig( 'url', url );
            form.submit( {
                waitMsg: 'Processing...',
                method: 'POST',
                params: params,
                submitEmptyText: false,
                success: function ( form, action )
                {
                    var dataVal = Ext.JSON.decode( action.response.responseText )
                    Ext.Msg.alert( title, '\uCC98\uB9AC\uC644\uB8CC' );
                    form.findField( 'idx' ).setValue( dataVal.idx );;
                    form.findField( 'estimate_id' ).setValue( dataVal.estimate_id );
                    if ( dataVal.estimate_id != null )
                    {
                        me.lookupReference( 'tempbtn' ).setDisabled( true );
                        me.lookupReference( 'reqbtn' ).setDisabled( true );
                    }
                    Ext.getCmp( 'estimateList' ).getStore().reload();

                },
                failure: function ( form, action )
                {
                    //console.log('response:'+ action);
                    var dataVal = Ext.JSON.decode( action.response.responseText )
                    Ext.Msg.alert( 'Warning', '\uC11C\uBE44\uC2A4\uC5D0 \uC774\uC0C1\uC774 \uC788\uC73C\uB2C8 \uAD00\uB9AC\uC790\uC5D0\uAC8C \uBB38\uC758\uD558\uC138\uC694.' );
                    //Ext.getCmp('keymanList').store.reload();
                }
            } );
        }

    }
} );
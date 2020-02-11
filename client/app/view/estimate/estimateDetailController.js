Ext.define( 'Ysn.view.estimate.estimateDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.estimateDetail',

    init: function ()
    {
        var now = new Date();
        var year = Ext.Date.format( now, 'Y' );
        year = '2019';

        Ysn.Global.setFormType( this.lookupReference( 'form_type' ).getValue().form_type );

        this.lookupReference( 'dstr_chn' ).getStore().load( { params: { up_code_id: 'DSTR_TYPE', lang: localeCd } } );
        this.lookupReference( 'currency' ).getStore().load( { params: { base_yr: year, lang: localeCd } } );
        this.lookupReference( 'submit_cd' ).getStore().load( { params: { up_dept_cd: up_dept_cd, dept_cd: dept_cd} } );
        // this.lookupReference( 'ref_cd' ).getStore().load( { params: { dept_cd: dept_cd, lang: localeCd } } );
        this.lookupReference( 'estimate_date' ).setValue( now );
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

        var store2 = this.lookupReference( 'estimateItem2' ).getStore();

        for ( var i = 0; i < 30; i++ )
        {
            store2.insert( i + 1, { no: i + 1 } );
        }



    },

    chgType: function ( obj, newValue, oldValue, eOpts )
    {
        var grid = this.lookupReference( 'estimateItem' );
        var grid2 = this.lookupReference( 'estimateItem2' );
        var formLang =  this.lookupReference( 'form_lang' ).getValue().form_lang; 
        Ysn.Global.setFormType( newValue.form_type );
        if ( formLang == 'kr' )
        {
            if ( newValue.form_type == 'A' )
            {

            }
            else
            {
                var recs = grid2.getStore().data.items;
                for ( var i = 0; i < recs.length; i++ )
                {
                    if ( recs[i].get( 'prod' ) != null && recs[i].get( 'prod' ) != '' && recs[i].get( 'prod' ) != 'SET' )
                    {
                        recs[i].set( 'unit_price', 0 );
                    }
                }
            }
        } else
        {
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
        }

        

    },


    chgForm: function ( obj, newValue, oldValue, eOpts )
    {
        var grid1 = this.lookupReference( 'estimateItem' );
        var grid2 = this.lookupReference( 'estimateItem2' );
        if ( newValue.form_lang == 'kr' )
        {
            grid1.setHidden( true );
            grid2.setHidden( false );
            this.lookupReference( 'prod_name2' ).setDisabled( false );
            this.lookupReference( 'prod_name' ).setDisabled( true );
        } else
        {
            grid2.setHidden( true );
            grid1.setHidden( false );
            this.lookupReference( 'prod_name2' ).setDisabled( true );
            this.lookupReference( 'prod_name' ).setDisabled( false );
        }
    },

    calcAmt: function ( obj, newValue, oldValue, eOpts )
    {
       // if ( newValue == null || newValue == '' ) return false;
        var grid = this.lookupReference( 'estimateItem' );
        var rec = obj.up( 'grid' ).getSelection()[0];
        rec.set( 'amount', rec.get( 'unit_price' ) * newValue );

    },

    calcAmt2: function ( obj, newValue, oldValue, eOpts )
    {
        // if ( newValue == null || newValue == '' ) return false;
        var grid = this.lookupReference( 'estimateItem' );
        var rec = obj.up( 'grid' ).getSelection()[0];
        rec.set( 'amount', newValue * rec.get( 'quantity' ) );

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
        var rec = obj.up( 'grid' ).getSelection()[0];
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
        var rec = obj.up( 'grid' ).getSelection()[0];
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
        var rec = obj.up( 'grid' ).getSelection()[0];
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

    setProd2: function ( obj, e, eOpts )
    {
        //var rec =  obj.up( 'grid' ).getSelection()[0];
        var rec = obj.up( 'grid' ).getSelection()[0];
        var rowIdx = obj.up( 'gridview' ).indexOf( obj.el.up( 'table' ) );

        if ( rowIdx > 0 )
        {
            prevRec = obj.up( 'grid' ).getStore().data.items[rowIdx - 1];
            if ( obj.getValue() == prevRec.get( 'prod' ) )
            {
                rec.set( 'item_name', prevRec.get( 'item_name' ) )
                rec.set( 'sub_prod', prevRec.get( 'sub_prod' ) );
            } else
            {
                if ( obj.getValue() != 'SET' )   rec.set( 'sub_prod', rec.get( 'no' ) );
            }
            if ( obj.getValue() == 'SET' )
            {
                if ( Ysn.Global.getFormType() == 'A' )
                {
                    var frecs = obj.up( 'grid' ).getStore().queryBy( function ( rec, id ) { return ( rec.get( 'sub_prod' ) == prevRec.get( 'sub_prod' ) ); } )
                    var total = 0;
                    for ( var i = 0; i < frecs.items.length; i++ )
                    {
                        total += frecs.items[i].get( 'unit_price' );
                    }
                    rec.set( 'unit_price', total );
                }     
                rec.set( 'prod_desc', prevRec.get( 'prod' ) + '  SET' );
                rec.set( 'item_name', prevRec.get( 'item_name' ) )
            }
        }
               
    },


    setProd: function ( obj, e, eOpts )
    {
        //var rec =  obj.up( 'grid' ).getSelection()[0];
        var rec = obj.up( 'grid' ).getSelection()[0];
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

    itemclick2: function ( obj, record, item, index, e, eOpts )
    {
       // alert('');
    },

    itemclick1: function ( obj, record, item, index, e, eOpts )
    {
        Ysn.Global.setEstStep( record.get( 'header_yn' ) );
        Ysn.Global.setEstProdCode( this.lookupReference( 'prod_code' ).getValue() ); Ysn.Global.setEstProdCode( this.lookupReference( 'prod_code' ).getValue() );
        var estCrny = this.lookupReference( 'currency' ).getSelectedRecord().get( 'EXCH_RATE' );
        Ysn.Global.setEstCrny( estCrny );
        Ysn.Global.setEstScrny( this.lookupReference( 'currency' ).getValue() );
        Ysn.Global.setEstRowIdx( index );
        Ysn.Global.setEstQty( this.lookupReference( 'item_qty' ).getValue() );
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
        var now = new Date();
        var year = Ext.Date.format( now, 'Y' );
        year = '2019';          
        this.lookupReference( 'estimate_date' ).setValue( now );

        var store = this.lookupReference( 'estimateItem' ).getStore();
        var store2 = this.lookupReference( 'estimateItem2' ).getStore();
        store.removeAll();
        for ( var i = 0; i < 30; i++ )
        {
            store.insert( i + 1, { no: i + 1, header_yn: 'Y' } );
        }

        store2.removeAll();
        for ( var i = 0; i < 30; i++ )
        {
            store2.insert( i + 1, { no: i + 1 } );
        }

    },

    itemcontextmenu1: function ( view, record, item, index, e, eopts )
    {
        if ( e.position.colIdx > 2 ) return false;
        e.stopEvent();
        var mymenu = new Ext.menu.Menu( {
            items: [
              {
                  text: '\uD589 \uCD94\uAC00(\uC120\uD0DD\uD589 \uC544\uB798)',
                  handler: function ()
                  {
                      var rec = {
                          no: e.position.rowIdx + 2 
                      }             
                      var seldata = view.up( 'grid' ).getSelection()[0];
                      rec.quantity = seldata.get( 'quantity' );
                      rec.idx = seldata.get( 'idx' );
                      rec.bottle_5K = seldata.get( 'bottle_5K' );
                      rec.bottle_10K = seldata.get( 'bottle_10K' );
                      rec.bottle_30K = seldata.get( 'bottle_30K' );
                      rec.bottle_50K = seldata.get( 'bottle_50K' );
                      rec.bottle_100K = seldata.get( 'bottle_100K' );
                      rec.Innerbottle_5K = seldata.get( 'Innerbottle_5K' );
                      rec.Innerbottle_10K = seldata.get( 'Innerbottle_10K' );
                      rec.Innerbottle_50K = seldata.get( 'Innerbottle_50K' );
                      rec.Innerbottle_100K = seldata.get( 'Innerbottle_100K' );
                      rec.pumpcap_5K = seldata.get( 'pumpcap_5K' );
                      rec.pumpcap_10K = seldata.get( 'pumpcap_10K' );
                      rec.pumpcap_30K = seldata.get( 'pumpcap_30K' );
                      rec.pumpcap_50K = seldata.get( 'pumpcap_50K' );
                      rec.pumpcap_100K = seldata.get( 'pumpcap_100K' );
                      rec.cap_5K = seldata.get( 'cap_5K' );
                      rec.cap_10K = seldata.get( 'cap_10K' );
                      rec.cap_30K = seldata.get( 'cap_30K' );
                      rec.cap_50K = seldata.get( 'cap_50K' );
                      rec.cap_100K = seldata.get( 'cap_100K' );
                      rec.tubesleeveheadering_5K = seldata.get( 'tubesleeveheadering_5K' );
                      rec.tubesleeveheadering_10K = seldata.get( 'tubesleeveheadering_10K' );
                      rec.tubesleeveheadering_30K = seldata.get( 'tubesleeveheadering_30K' );
                      rec.tubesleeveheadering_50K = seldata.get( 'tubesleeveheadering_50K' );
                      rec.tubesleeveheadering_100K = seldata.get( 'tubesleeveheadering_100K' );
                      rec.others_5K = seldata.get( 'others_5K' );
                      rec.others_10K = seldata.get( 'others_10K' );
                      rec.others_30K = seldata.get( 'others_30K' );
                      rec.others_50K = seldata.get( 'others_50K' );
                      rec.others_100K = seldata.get( 'others_100K' );
                      rec.set_5K = seldata.get( 'set_5K' );
                      rec.set_10K = seldata.get( 'set_10K' );
                      rec.set_30K = seldata.get( 'set_30K' );
                      rec.set_50K = seldata.get( 'set_50K' );
                      rec.set_50K = seldata.get( 'others_10K' );
                      rec.set_100K = seldata.get( 'set_100K' );
                      rec.set_100K = seldata.get( 'set_100K' );
                      rec.set_100K = seldata.get( 'set_100K' );
                      rec.set_100K = seldata.get( 'set_100K' );
                      var store = view.up( 'grid' ).getStore();
                      store.insert( e.position.rowIdx + 1, rec );
                      for ( var i = e.position.rowIdx + 2; i < store.data.items.length; i++ )
                      {
                          store.data.items[i].set( 'no', i + 1 );
                      }
                  }
              }, {
                  text: '\uC120\uD0DD\uD55C \uD589 \uC0AD\uC81C',
                  handler: function ()
                  {
                      var store = view.up( 'grid' ).getStore();
                      store.remove( record );
                      for ( var i = e.position.rowIdx ; i < store.data.items.length; i++ )
                      {
                          store.data.items[i].set( 'no', i + 1  );
                      }
                  }
              }
            ],
            listeners: {
                hide: function ()
                {
                    setTimeout( function ()
                    {
                        mymenu.destroy();
                    }, 2000 );
                }
            }
        } );
        mymenu.showAt( e.getXY() );
    },

    itemcontextmenu2: function ( view, record, item, index, e, eopts )
    {
        if ( e.position.colIdx > 2 ) return false;
        e.stopEvent();
        var mymenu = new Ext.menu.Menu( {
            items: [
              {
                  text: '\uD589 \uCD94\uAC00(\uC120\uD0DD\uD589 \uC544\uB798)',
                  handler: function ()
                  {
                      var rec = {
                          no: e.position.rowIdx + 2
                      }
                      var seldata = view.up( 'grid' ).getSelection()[0];
                      rec.quantity = seldata.get( 'quantity' );
                      rec.idx = seldata.get( 'idx' );
                      rec.bottle_5K = seldata.get( 'bottle_5K' );
                      rec.bottle_10K = seldata.get( 'bottle_10K' );
                      rec.bottle_30K = seldata.get( 'bottle_30K' );
                      rec.bottle_50K = seldata.get( 'bottle_50K' );
                      rec.bottle_100K = seldata.get( 'bottle_100K' );
                      rec.Innerbottle_5K = seldata.get( 'Innerbottle_5K' );
                      rec.Innerbottle_10K = seldata.get( 'Innerbottle_10K' );
                      rec.Innerbottle_50K = seldata.get( 'Innerbottle_50K' );
                      rec.Innerbottle_100K = seldata.get( 'Innerbottle_100K' );
                      rec.pumpcap_5K = seldata.get( 'pumpcap_5K' );
                      rec.pumpcap_10K = seldata.get( 'pumpcap_10K' );
                      rec.pumpcap_30K = seldata.get( 'pumpcap_30K' );
                      rec.pumpcap_50K = seldata.get( 'pumpcap_50K' );
                      rec.pumpcap_100K = seldata.get( 'pumpcap_100K' );
                      rec.cap_5K = seldata.get( 'cap_5K' );
                      rec.cap_10K = seldata.get( 'cap_10K' );
                      rec.cap_30K = seldata.get( 'cap_30K' );
                      rec.cap_50K = seldata.get( 'cap_50K' );
                      rec.cap_100K = seldata.get( 'cap_100K' );
                      rec.tubesleeveheadering_5K = seldata.get( 'tubesleeveheadering_5K' );
                      rec.tubesleeveheadering_10K = seldata.get( 'tubesleeveheadering_10K' );
                      rec.tubesleeveheadering_30K = seldata.get( 'tubesleeveheadering_30K' );
                      rec.tubesleeveheadering_50K = seldata.get( 'tubesleeveheadering_50K' );
                      rec.tubesleeveheadering_100K = seldata.get( 'tubesleeveheadering_100K' );
                      rec.others_5K = seldata.get( 'others_5K' );
                      rec.others_10K = seldata.get( 'others_10K' );
                      rec.others_30K = seldata.get( 'others_30K' );
                      rec.others_50K = seldata.get( 'others_50K' );
                      rec.others_100K = seldata.get( 'others_100K' );
                      rec.set_5K = seldata.get( 'set_5K' );
                      rec.set_10K = seldata.get( 'set_10K' );
                      rec.set_30K = seldata.get( 'set_30K' );
                      rec.set_50K = seldata.get( 'set_50K' );
                      rec.set_50K = seldata.get( 'others_10K' );
                      rec.set_100K = seldata.get( 'set_100K' );
                      rec.set_100K = seldata.get( 'set_100K' );
                      rec.set_100K = seldata.get( 'set_100K' );
                      rec.set_100K = seldata.get( 'set_100K' );
                      var store = view.up( 'grid' ).getStore();
                      store.insert( e.position.rowIdx + 1, rec );
                      for ( var i = e.position.rowIdx + 2; i < store.data.items.length; i++ )
                      {
                          store.data.items[i].set( 'no', i + 1 );
                      }
                  }
              }, {
                  text: '\uC120\uD0DD\uD55C \uD589 \uC0AD\uC81C',
                  handler: function ()
                  {
                      var store = view.up( 'grid' ).getStore();
                      store.remove( record );
                      for ( var i = e.position.rowIdx ; i < store.data.items.length; i++ )
                      {
                          store.data.items[i].set( 'no', i + 1 );
                      }
                  }
              }
            ],
            listeners: {
                hide: function ()
                {
                    setTimeout( function ()
                    {
                        mymenu.destroy();
                    }, 2000 );
                }
            }
        } );
        mymenu.showAt( e.getXY() );
    },

    gridDestroy: function ( grid )
    {
        var menu = grid.getView().mymenu;

        if ( menu )
        {
            Ext.destroy( menu );
        }
    },

    itemselect1: function ( grid, record, index )
    {
        alert( '11' );
    },

    Save: function ( title, status )
    {
        me = this;

        var form = me.getView().getForm();
        var idx = form.findField( 'idx' ).getValue();
        form.findField( 'exch_rate' ).setValue( Ysn.Global.getEstCrny() );
        form.findField( 'status_cd' ).setValue( status );
        if ( status == '1' ) form.findField( 'estimate_date' ).setValue( new Date() );
        Ysn.Util.cbEmptyVal( me.getView() );
        if ( form.isValid() )
        {
            var url = '/Estimate/estimateHeadInsert';

            if ( idx != null && idx != "" ) url = '/Estimate/estimateHeadUpdate';

            params = form.getValues();
            //params.ref_nm = form.findField( 'ref_cd' ).getRawValue();
            params.submit_nm = form.findField( 'submit_cd' ).getRawValue();
            if ( form.findField( 'form_lang' ).getValue().form_lang == 'kr' )
            {
                params.detailitem = Ext.encode( Ext.pluck( me.lookupReference( 'estimateItem2' ).getStore().data.items, 'data' ) );
            } else
            {
                params.detailitem = Ext.encode( Ext.pluck( me.lookupReference( 'estimateItem' ).getStore().data.items, 'data' ) );
            }
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
                    me.getView().up( '[xtype=requestMain]' ).down( '#center' ).getStore().reload();

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

    } ,

    ExcelDown: function ( title, status )
    {
        var idx = this.lookupReference( 'idx' ).getValue();

        if ( idx == null || idx == '' )
        {
            Ext.Msg.alert( '견적서액셀변환', '견적서를 저장하셔야 합니다.' );
            return false;
        }


        var form_lang = this.lookupReference( 'form_lang' ).getValue().form_lang;
        var form_type = this.lookupReference( 'form_type' ).getValue().form_type;
        var type = '00';

        if ( form_lang == 'kr' )
        {
            type = '00';
        } else
        {
            if ( form_type == 'A' ) type = '01';
            if ( form_type == 'B' ) type = '02';
        }
           
        Ext.MessageBox.show( {
            title: '견적서 액셀저장',
            msg: '견적서를 액셀로 변환하시겠습니까 ?',        
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: '견적요약본 출력',
                no: '세부견적 출력'
            },
            scope: this,       
            fn: function ( btn, text )
            {
                var summary_yn = 'N'
                if ( btn == 'yes' ) summary_yn = 'Y';
                location.href = '/Estimate/downXls?idx=' + idx + '&type=' + type + '&summary_yn=' + summary_yn;            
            }
        } );
      
    }


} );
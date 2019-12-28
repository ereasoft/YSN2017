Ext.define( 'Ysn.view.estimate.requestMainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.requestMain',
    init: function ()
    {
        this.lookupReference( 'dstr_chn' ).getStore().load( { params: { up_code_id: 'DSTR_TYPE', lang: localeCd } } );
        this.lookupReference( 'dstr_chn' ).setValue( '' );
    },

    findList: function ()
    {
        me = this;
        me.getView().down( 'estimateList' ).items.items[0].getStore().load(
                     {
                         params: {   
                             user_nm: me.lookupReference( 'user_nm' ).getValue(),
                             cust_nm: me.lookupReference( 'cust_nm' ).getValue(),
                             dstr_type: me.lookupReference( 'dstr_chn' ).getValue(),  
                             status_cd: me.lookupReference( 'status_cd' ).getValue(),
                         }
                     }
         );
    },

    itemclick: function ( view, record, index, e )
    {
         
        var me = Ext.getCmp( 'estimateDetail' );   
        var grid =  me.lookupReference('estimateItem');
        var frm = me.getForm();          
        frm.reset();
        
        grid.getStore().removeAll();

        Ext.Ajax.request( {
            url: '/Estimate/estimateDetail',
            method: 'POST',
            params: {
                idx: record.get('idx')
            },
            success: function ( response, eopts )
            {
                var obj = Ext.decode( response.responseText );
                var data = obj.DATA;
                frm.setValues( data );
                var items = obj.ITEMS;
                grid.getStore().loadData( items );      
                frm.findField( 'form_type' ).setValue( { form_type: data.form_type } )
                if ( record.get( 'status_cd' ) == '0' )
                {
                    me.lookupReference( 'tempbtn' ).setDisabled( false );
                    me.lookupReference( 'reqbtn' ).setDisabled( false );
                } else
                {
                    me.lookupReference( 'tempbtn' ).setDisabled( true );
                    me.lookupReference( 'reqbtn' ).setDisabled( true );
                }
            },

            failure: function ( response, eopts )
            {
               
                Ext.Msg.alert( 'System Error', response.statusText );     


            }

        } );
    }
} );
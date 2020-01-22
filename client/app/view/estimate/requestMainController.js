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
                             stype: '0',
                             user_cd: loginUser,
                             user_nm: me.lookupReference( 'user_nm' ).getValue(),
                             cust_nm: me.lookupReference( 'cust_nm' ).getValue(),
                             dstr_type: me.lookupReference( 'dstr_chn' ).getValue(),  
                             status_cd: me.lookupReference( 'status_cd' ).getValue(),
                         }
                     }
         );
    },

    findList2: function ()
    {
        me = this;
        me.getView().down( 'estimateList2' ).items.items[0].getStore().load(
                     {
                         params: {
                             stype: '1',
                             user_nm: me.lookupReference( 'user_nm' ).getValue(),
                             cust_nm: me.lookupReference( 'cust_nm' ).getValue(),
                             dstr_type: me.lookupReference( 'dstr_chn' ).getValue(),
                             status_cd: me.lookupReference( 'status_cd' ).getValue(),
                             dept_cd: dept_cd
                         }
                     }
         );
    },

    findList3: function ()
    {
        me = this;
        me.getView().down( 'estimateList3' ).items.items[0].getStore().load(
                     {
                         params: {
                             stype: '2',
                             submit_cd: loginUser,
                             user_nm: me.lookupReference( 'user_nm' ).getValue(),
                             cust_nm: me.lookupReference( 'cust_nm' ).getValue(),
                             dstr_type: me.lookupReference( 'dstr_chn' ).getValue() 
                         }
                     }
         );
    },

    itemclick: function ( view, record, index, e )
    {
         
        var me = Ext.getCmp( 'estimateDetail' );   
        var grid = me.lookupReference( 'estimateItem' );
        var grid2 = me.lookupReference( 'estimateItem2' );
        var frm = me.getForm();          
        frm.reset();
        
        grid.getStore().removeAll();
        grid2.getStore().removeAll();

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
                frm.findField( 'form_type' ).setValue( { form_type: data.form_type } )
                frm.findField( 'form_lang' ).setValue( { form_lang: data.form_lang } )
                me.lookupReference( 'prod_name2' ).setValue( data.prod_name );
                if ( data.form_lang == 'kr' )
                {
                    grid2.getStore().loadData( items );
                } else
                {
                    grid.getStore().loadData( items );
                }
               
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
    } ,
    itemclick2: function ( view, record, index, e )
    {
         
        var me = Ext.getCmp( 'estimateDetail2' );   
        var grid = me.lookupReference( 'estimateItem' );
        var grid2 = me.lookupReference( 'estimateItem2' );
        var frm = me.getForm();          
        frm.reset();
        
        grid.getStore().removeAll();
        grid2.getStore().removeAll();

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
                frm.findField( 'form_type' ).setValue( { form_type: data.form_type } )
                frm.findField( 'form_lang' ).setValue( { form_lang: data.form_lang } )
                me.lookupReference( 'prod_name2' ).setValue( data.prod_name );
                if ( data.form_lang == 'kr' )
                {
                    grid2.getStore().loadData( items );
                } else
                {
                    grid.getStore().loadData( items );
                }
               
               
            },

            failure: function ( response, eopts )
            {
               
                Ext.Msg.alert( 'System Error', response.statusText );     


            }

        } );
    },
    itemclick3: function ( view, record, index, e )
    {

        var me = Ext.getCmp( 'estimateDetail3' );
        var grid = me.lookupReference( 'estimateItem' );
        var grid2 = me.lookupReference( 'estimateItem2' );
        var frm = me.getForm();
        frm.reset();

        grid.getStore().removeAll();
        grid2.getStore().removeAll();

        Ext.Ajax.request( {
            url: '/Estimate/estimateDetail',
            method: 'POST',
            params: {
                idx: record.get( 'idx' )
            },
            success: function ( response, eopts )
            {
                var obj = Ext.decode( response.responseText );
                var data = obj.DATA;
                frm.setValues( data );
                var items = obj.ITEMS;
                frm.findField( 'form_type' ).setValue( { form_type: data.form_type } )
                frm.findField( 'form_lang' ).setValue( { form_lang: data.form_lang } )
                me.lookupReference( 'prod_name2' ).setValue( data.prod_name );
                if ( data.form_lang == 'kr' )
                {
                    grid2.getStore().loadData( items );
                } else
                {
                    grid.getStore().loadData( items );
                }

                if ( record.get( 'status_cd' ) == '1' )
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
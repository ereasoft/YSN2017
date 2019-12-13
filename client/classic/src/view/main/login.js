Ext.define('Ysn.view.main.login', {
    extend: 'Ext.form.Panel',
    xtype: 'ysn-login', 
    requires: [
        'Ysn.view.main.loginController' 
    ],
    controller: 'main-login',
    reference: 'ysn-login', 
	id:'ysn-login', 
	layout:'fit',
    items: [{ 
				xtype:'window',
				itemId:'loginwin', 
				autoShow: true,
				closable: false,
				draggable: false,
				title: 'YSN LOGIN',
				frame:true,
				width: 500,
				bodyPadding: 10,				
				defaultType: 'textfield',
				reference: 'ysn-login', 
				items: [{
					allowBlank: false,
					fieldLabel: 'User ID',
					itemId: 'user',
					name: 'user',
					emptyText: 'user id'
				}, {
					allowBlank: false,
					fieldLabel: 'Password',
					itemId: 'pass',
					name: 'pass',
					emptyText: 'password',
					inputType: 'password'
				}, {
					xtype:'checkbox',
					fieldLabel: 'Remember me',
					name: 'remember',
					itemId: 'remember',
                    inputValue: 'Y'
				}],
				
				buttons: [ 
					{ 
					  text:'Login' ,
					  handler: 'onLogon'
					}
				]
	}], 
    
    initComponent: function() {
        this.defaults = {
            anchor: '100%',
            labelWidth: 120
        };
        
        this.callParent();
    }
});


Ext.define('Ysn.view.main.loginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-login',  
    init: function() { 
        var pl = this.lookupReference('ysn-login');
        if (getCookie('YSN')) {
            var child = getCookie('YSN').split('^');
            pl.down('#user').setValue(child[0]);
            pl.down('#pass').setValue(child[1]);
            pl.down('#remember').setValue('Y');
        }
	},
    onLogon: function() {
        var pl = this.lookupReference('ysn-login');
        if (pl.down('#user').getValue() && pl.down('#pass').getValue())
		{
            if (pl.down('#remember').getValue() ) {
                setCookie('YSN', pl.down('#user').getValue() + '^' + pl.down('#pass').getValue());
            } else {
                delCookie('YSN');
            }
			Ext.Ajax.request({
									 url: '/Member/LoginCheck',
									 method: 'POST',
									 params: {user_cd : this.lookupReference('ysn-login').down('#user').getValue(),
											  pass_wd : this.lookupReference('ysn-login').down('#pass').getValue()
									 },
									 success: function(response, opts) {
									     var obj = Ext.decode(response.responseText);
									     var profile = "triton";
									     var lang = 'ko';
									     if (obj.lang == 'ENG') {
									         profile = "classic";
									         lang = 'en';
									     }
									     location.href = "/client/index.aspx?locale=" + lang;
											//var mainview = Ext.getCmp('ysn-login');
											//mainview.removeAll();
											//mainview.add({xtype: 'app-main'});  				 
						                    //mainview.updateLayout();
									 },

									 failure: function(response, opts) {
										 Ext.Msg.alert('Login Failed', 'ID 또는 PASSWORD를 확인하세요.',function(){return false;});
									 }
				}); 		
	   }
	}
});


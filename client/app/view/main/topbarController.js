Ext.define('Ysn.view.main.topbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-topbar',
    init: function () {
        if (company_cd != 'YONWOO') Ext.getCmp('logo').setHtml('<img src=\"resources/spr.jpg\" width=215 height=50 />');
    },
	logOut: function(){
		Ext.Ajax.request({
							 url: '/Member/LogOut',
							 method: 'POST', 
							 success: function(response, opts) {
									//var obj = Ext.decode(response.responseText);
									location.href="/client/index.aspx";
									//var mainview = Ext.getCmp('ysn-login');
									//mainview.removeAll();
									//mainview.add({xtype: 'app-main'});  				 
									//mainview.updateLayout();
							 },

							 failure: function(response, opts) {
								 location.href="/client/index.aspx";
							 }
		}); 		
	},
	chgPwd: function () {
	    var win4 = Ext.getCmp('common-chgpwd');
	    if (!win4) {
	        win4 = new Ysn.view.common.chgpwd();
	    }   
	    Ext.getCmp('centerregion').add(win4);
	    win4.show();
	},
    onChangeChk: function(el,newVal,oldVal,e){ 
        Ext.each(Ext.getCmp('centerregion').items.items, function (obj) { 
            var viewPl = obj.down('#east');
            if (viewPl) {
                if (newVal) {
                    viewPl.setVisible(false);
                } else {
                    viewPl.setVisible(true);
                }
            }
        });
		
    },

	golink: function(){
          window.open('/Member/YSNSSO', '_blank');
	},

	chgKor: function(){
	    this.goUrl('ko');
	},
	chgEng: function () {
	    this.goUrl('en');
	},

	goUrl: function (lang) {
	    location.href = 'index.aspx?locale=' + lang;
	},

	chgTheme1: function () {
	    this.modifyTheme('triton', locale);
	},
	chgTheme2: function () {
	    this.modifyTheme('neptune', locale);
	},
	chgTheme3: function () {
	    this.modifyTheme('crisp', locale);
	},
	chgTheme4: function () {
	    this.modifyTheme('classic', locale);
	},
	chgTheme5: function () {
	    this.modifyTheme('gray', locale);
	},

	modifyTheme: function (theme, locale) {
	    Ext.Ajax.request({
	        url: '/Member/upTheme',
	        method: 'POST',
	        params: { theme: theme },
	        success: function (response, opts) {
	            //var obj = Ext.decode(response.responseText);
	            location.href = "/client/index.aspx?locale=" + locale + "&profile=" + theme;
	            //var mainview = Ext.getCmp('ysn-login');
	            //mainview.removeAll();
	            //mainview.add({xtype: 'app-main'});  				 
	            //mainview.updateLayout();
	        },

	        failure: function (response, opts) {
	            location.href = "/client/index.aspx";
	        }
	    });
	}
    
});

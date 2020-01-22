/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Ysn.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.window.Window',
        'Ysn.view.main.MainController',
        'Ysn.view.main.MainModel', 
	    'Ext.layout.container.Border',
		'Ysn.view.main.topbar',
        'Ext.form.RadioGroup'
    ],

    controller: 'main',
    id: 'main',
    layout: 'border',
    width: 500,
    height: 400,
    //overflow:'auto',
	autoScroll: true,
	bodyBorder: true, 
	scrollable: false,
    
    defaults: {
        collapsible: true,
        split: true,
        bodyPadding: 0
    },
	
	dockedItems: [
		           {
					xtype: 'main-topbar',
					dock: 'top',
					autoScroll: true,
					height: 60
					}

	],

    items: [

        {
            title: 'Navigation',
            region:'west',
			itemId:'westregion',
            floatable: true,
            margin: '0 0 0 0',
            width: 220,
            minWidth: 100,
            maxWidth: 250, 
			autoScroll: true,
			items: [
			   {xtype: 'mainMenu'}
			]
        },

        {
            title: 'Center',
            xtype: 'tabpanel',
			region: 'center',
            margin: '0 0 0 0',
            id: 'centerregion',
            //ui: 'grey-tab',
            plain: true,
            reference: 'Detail',
			header: false, 
			defaults: {
			collapsible: true,
			split: true
			
			},
			layout: 'fit',
			items:[
				 
			],
			listeners: {
			    tabchange: function (tabs, newTab, oldTab) {
			        Ysn.Global.activeMenu = newTab.itemId; 
			    }
			}
        }
    ]
	
});

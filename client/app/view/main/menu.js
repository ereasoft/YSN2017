
Ext.define('Ysn.view.main.menu',{
    extend: 'Ext.Container',
    xtype: 'mainMenu',
    requires: [
        'Ysn.view.main.menuController', 
		'Ysn.view.main.menuModel',  
		'Ext.tree.*',
		'Ext.panel.*', 
		'Ysn.*'
    ],

    controller: 'main-menu', 
    viewModel: {
        type: 'main-menu'
    },
	title: 'Menu', 
    items: {
        xtype: 'treepanel',
        width: 220, 
		//	textAlign: 'left',
        rootVisible: false,
        // Sharing the store synchronizes the views:
        store: { proxy: {
		        
				type: 'ajax',
				url: '/Main/leftMenuAuth?lang='+localeCd, 
				reader: {
				type: 'json',
				rootProperty: 'LIST'
			    }

			},
			root: {
				text: 'YSN',
				id: 'M10000',
				expanded: true
	     },
		  listeners: {
								load: function (store, records, successful, operation) {
									if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
								}
					}
				},
	   listeners:{
			 itemclick: function(view, record, item, index, e)
			  {
				  
				if(record.data.leaf == true) {
					//Ext.getCmp("centerregion").remove();
					//this.viewport = Ext.getCmp('main');
					//this.centerRegion = this.viewport.down('[region=center]');
                    //Ext.getCmp('main').viewport.down('[region=center]').add( Ext.create('Ext.panel.Panel', { 
                    //                        title:'테스트'
				    if(!record.get('url')){
				        Ext.MessageBox.alert('Information', '준비중입니다.', function(){return true;});
				    }else{
				        pageTitle = record.parentNode.data.text + " > " + record.data.text;
				        var urlary = record.get('url').split('?');
				        if (urlary.length > 0) boardId = urlary[1]; 
				       /* Ext.getCmp('centerregion').removeAll();
						var win = Ext.getCmp('urlary[0]')
				        Ext.getCmp('centerregion').add({xtype: urlary[0]});  				 
				        Ext.getCmp('main').updateLayout(); 
                        */
				        var tabs = Ext.getCmp('centerregion'),
                        id = record.data.id ,
                        tab = tabs.items.getByKey(id);
				        var cfg = {
				            xtype: urlary[0],
				            title:record.data.text,
				            session: true
				        }
				        if (!tab) {
				            Ysn.Global.activeMenu = id;
				            cfg.itemId = id; 
				            cfg.closable = true;
				            tab = tabs.add(cfg);
				        }

				        tabs.setActiveTab(tab);
					}	
				}
			  } 
	   }
    } 
});

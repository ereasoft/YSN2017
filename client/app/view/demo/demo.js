
Ext.define('Ysn.view.demo.demo',{
    extend: 'Ext.panel.Panel',
    xtype: 'demo',
    requires: [
		'Ext.plugin.Viewport',
        'Ysn.view.demo.demoController'
    ],

    controller: 'demo',  
    id: 'demo',
    layout: 'border',
    width: 500,
    height: 400,
    overflow:'auto',
    header: false,
    bodyBorder: false, 
    defaults: {
        collapsible: true,
        split: true,
        bodyPadding: 0
    },
	
	dockedItems: [
	               {
		            title: '화면위치', 
					xtype: 'demosearch',
					collapsible: true,
                           scrollable: true,
					floatable: true,
					split: true,
					dock: 'top',
					height: 200
					}
	],
	tbar: {

        overflowHandler: 'menu', 
        items: [			
			  '->',
			 
		{
            xtype: 'button',
			iconCls: 'x-fa fa-file-excel-o',
            text: Locale.getMsg('액셀변환') 
        }, {
            xtype: 'button',
			iconCls: 'x-fa fa-print',
            text: '인쇄' 
        }]
    },

    items: [
		{
					header: false,					
					region: 'center',					
					xtype: 'sampleaccept',
                        listeners:{
                                  itemclick:'itemclick'
                                  }

				},{
					title: '상세화면', 
					collapsible: true,
                    x: 10, y: 10,
					region: 'east', 
					//	reference:'Detail',
					layout: 'fit',
                    width: 600,
                    minWidth: 300,
                    maxWidth: 600,
					items: {
						xtype: 'detail'
					}
				}
    ]
	
});

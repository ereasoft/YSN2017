
Ext.define('Ysn.view.demo.search',{
    extend: 'Ext.panel.Panel',
	xtype: 'demosearch',

    requires: [
        'Ysn.view.demo.searchController',
        'Ysn.view.demo.searchModel'
    ],

    controller: 'demo-search',
    viewModel: {
        type: 'demo-search'
    },

    frame: true,
    resizable: true,
    width: 1000,
    minWidth: 800,
    minHeight: 130,

    layout: 'column',

    defaults: {
        layout: 'form',
        xtype: 'container',
        defaultType: 'textfield',
        style: 'width: 33%'
    },

    items: [{
        items: [
          {
            xtype: 'combobox',
            reference: 'combo1',
            publishes: 'value',
            fieldLabel: Locale.getMsg('매출조직'),
            displayField: 'deptname',
            anchor: '-15',
            store: {
                type: 'combo1'
            },
            minChars: 0,
            queryMode: 'local',
            typeAhead: true
          },
            {
			       xtype: 'textfield',
			       name: 'aaa',
			       fieldLabel : Locale.getMsg('거래처조회'),
			       itemId : 'a1', 
			       style: {			            
			             borderBottom: 'solid 1px #c3daf9',
			             width: '100%'
			       }
		   }
        ]
    }, {
        items: [
				{
			       xtype: 'textfield',
			       name: 'bbb',
			       fieldLabel : Locale.getMsg('영업담당'),
			       itemId : 'bbb', 
			       style: {			            
			             borderBottom: 'solid 1px #c3daf9',
			             width: '100%'
			       }
		   },
            {
			       xtype: 'textfield',
			       name: 'ccc',
			       fieldLabel : '품목',
			       itemId : 'ccc', 
			       style: {			            
			             borderBottom: 'solid 1px #c3daf9',
			             width: '100%'
			       }
		   }
        ]
    }, {
        items: [
            {
            xtype: 'datefield',
            fieldLabel: Locale.getMsg('접수일'),
            name: 'dob',
            allowBlank: false,
            maxValue: new Date()
        },
            {
			       xtype: 'textfield',
			       name: 'ccc',
			       fieldLabel : Locale.getMsg('진행상태'),
			       itemId : 'ccc', 
			       style: {			            
			             borderBottom: 'solid 1px #c3daf9',
			             width: '100%'
			       }
		   }
        ]
    }],

    buttons: [
        { text: Locale.getMsg('검색') } 
    ]
});

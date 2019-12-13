Ext.define('Ysn.view.estimate.requestMain',{
    extend: 'Ext.panel.Panel',
    xtype: 'requestMain',

    requires: [
        'Ysn.view.estimate.requestMainController'
    ],

    controller: 'requestMain',

    frame: false,
    //resizable: true,
    width: 1000,
    minWidth: 1000,
    minHeight: 140,
    layout: {
        type: 'table',
        columns: 4,	
        tableAttrs: {
            style: {
				'padding-top': '5px',
                width: '25%'
            }
        }
		
    },
    id: 'receipt-search',
    defaults: {
        layout: 'form',
        xtype: 'container',
        defaultType: 'textfield' 
    },

    items: [{
				xtype: 'fieldcontainer',
				fieldLabel: Locale.getMsg('유통구조'),
				labelAlign: 'right',
				combineErrors: true,
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					//flex: 1,
					hideLabel: true 
				},
				items: [{
						xtype: 'combobox',
						reference: 'dstr_chn',
						itemId: 'dstr_chn',
						name: 'dstr_chn',
						publishes: 'value', 
						displayField: 'CODE_NM',
						valueField: 'CODE_ID',
						margin: '0 5 0 0',
						store: {
							type: 'TcodeAll'
						},
						minChars: 0,
						//width: 120,
						queryMode: 'local', 
						listeners: {
							change : 'onChangeBiz' 
						}
					}]
		},{
				xtype: 'combobox',
				reference: 'userGroup',
				publishes: 'value',
				fieldLabel: Locale.getMsg('영업담당'),
				labelAlign: 'right',
				displayField: 'USER_NM',
				valueField: 'USER_CD',
				name: 'user_cd',
				itemId : 'user_cd',
				maskOnDisable: true,
				anchor: '-15',
				store: {
					type: 'dstr_usercd'
				},
				minChars: 0,
				queryMode: 'local'
	   },{
				xtype: 'fieldcontainer',
				//fieldLabel: Locale.getMsg('등록기간'),
				combineErrors: true, 
				layout: 'hbox',
				defaults: {
					//flex: 1,
					//hideLabel: true,
					margin: '0 5 0 0' 
				},
					items: [{
						fieldLabel: Locale.getMsg('요청일'),
						labelAlign: 'right',
						labelWidth: 80,
						width: 210,
						xtype: 'datefield',
						name: 'sdate', 
						reference : 'sdate',
					    itemId : 'sdate',
						format: 'Y-m-d',
						maxValue: new Date(), 
						margin: '0 5 0 0' 
					},{
						xtype: 'datefield',
						name: 'edate',
						width: 130,
						reference : 'edate',
					    itemId : 'edate',
						format: 'Y-m-d',
						value: new Date(),
						margin: '0 10 0 0' 
					},{
					xtype: 'hiddenfield',
					reference: 'mod_user', 
					name: 'mod_user', 
					itemId : 'mod_user'
					}]
	   },{
				rowspan: 2,
				xtype: 'button',
				text: Locale.getMsg('검색'), 
				width: 60,
				height: 60,
				listeners: {
						click : 'onSubmitClick' 
				}	
       },{
				xtype: 'fieldcontainer',
				fieldLabel: Locale.getMsg('거래처'),
				labelAlign: 'right',
				combineErrors: true,
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					//flex: 1,
					hideLabel: true
				},
					items: [{
						xtype: 'textfield',
						name: 'cust_nm', 
						reference : 'cust_nm',
					    itemId : 'cust_nm',
						margin: '0 5 0 0',
						width: 270
					},{
						xtype: 'hiddenfield',
						reference: 'cust_cd', 
						name: 'cust_cd', 
						itemId : 'cust_cd'
					}, {
						iconCls: 'x-fa fa-search', 
						xtype: 'button',
						scale: 'small',
						margin: '0 5 0 0',
						handler : 'openWindow',
						style:{ 
							'border':'none' 

						}
					},{
						iconCls: 'x-fa fa-remove', 
						xtype: 'button',
						scale: 'small',
						handler : 'resetVal',
						style:{
							'background-color': 'red !important',
							'background-image': 'none',
							'border':'none' 

						}
					}]
	   },{
				xtype: 'textfield',
				fieldLabel: '품목명',
				labelWidth: 100,
                labelAlign: 'right',
				name: 'item_nm', 
				reference : 'item_nm',
				itemId : 'item_nm' 
	   },{
				xtype: 'combobox',
				reference: 'smp_status',
				publishes: 'value',
				fieldLabel: Locale.getMsg('진행상태'),
				labelWidth: 80,
				labelAlign: 'right',
				displayField: 'CODE_NM',
				valueField: 'CODE_ID',
				name: 'smp_status',
				anchor: '-15',
				store: {
					type: 'TcodeAll'
				},
				minChars: 0,
				queryMode: 'local' 
	   }
  ] 
});

Ext.define('Ysn.view.samplerequest.receipt',{
    extend: 'Ext.panel.Panel',
    xtype: 'samplerequest-receipt',
    requires: [
        'Ysn.view.samplerequest.receiptController', 
		'Ysn.view.common.searchcustomer'
    ],

    controller: 'samplerequest-receipt',
    reference: 'samplerequest-receipt',
	id:'samplerequest-receipt',
    layout: 'border',
    width: 500,
    height: 400,
    overflow:'hidden',
	scrollable:false,
    header: false,
    bodyBorder: false, 
    defaults: {
        collapsible: true,
        split: true,
        bodyPadding: 0
    }, 
	
	dockedItems: [
	               {
		            title: '',
					xtype: 'receipt-search',
					reference: 'receiptSearch',
                           scrollable: true,
					collapsible: true,
					floatable: true,
					split: true,
					padding: '0 0 0 0',
					dock: 'top',
					height: 140
				   }
	],
	tbar: {

        overflowHandler: 'menu', 
		style: { 'border-top-width': '1px !important;'},
        items: [
		{
			xtype: 'label',
		    itemId: 'total',
			text: 'Total : 0',
			style: { 'font-weight':'bold'}
		},
		
			  '->',
			 
		{
            xtype: 'button',
			iconCls: 'x-fa fa-file-excel-o',
            text: Locale.getMsg('액셀변환'), 
			handler: 'xlsExport'
        }  ]
    },

    items: [
		{
					header: false,					
					region: 'center',					
					xtype: 'receiptList',
					itemId: 'receiptList',
                    listeners:{
                               select:'itemclick'
                    }

				},{
					title: 'Sample 접수', 
					 
					scrollable:false,
                    x: 10, y: 10,
					region: 'east', 
					itemId: 'east',
					//	reference:'Detail',
					collapsed: true,
					layout: 'fit',
                    width: 1200,
                    minWidth: 850,
                    maxWidth: 1200,
					items: {
						xtype: 'samplerequest-receiptDetail'
					}
				}, {
				    header: false,
				    xtype: 'muiltFileupload',
				    reference: 'muiltFile1',
				    itemId: 'muiltFile1',
				    width: 0,
				    height: 0,
				    hidden: true
				}, {
				    header: false,
				    xtype: 'muiltFileupload',
				    reference: 'muiltFile2',
				    itemId: 'muiltFile2',
				    width: 0,
				    height: 0,
				    hidden: true
				}
    ]
});

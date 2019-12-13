Ext.define('Ysn.view.samplerequest.requestsearch',{
    extend: 'Ext.panel.Panel',
	xtype: 'request-search',

    requires: [
        'Ysn.view.samplerequest.requestsearchController', 
	  	'Ysn.view.common.searchcustomer',
	    'Ysn.store.*',
        'Ysn.Util'
    ],

    controller: 'request-search', 

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
    id: 'request-search',
    defaults: {
        layout: 'form',
        xtype: 'container',
        defaultType: 'textfield' 
    },

    items: [{
				xtype: 'fieldcontainer',
				fieldLabel: Locale.getMsg('매출조직'),
                reference: 'deptLabel',
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
						reference: 'bizGroup',
						itemId: 'bizGroup',
						name: 'bizGroup',
						publishes: 'value', 
						displayField: 'DEPT_NM',
						valueField: 'DEPT_CD',
						margin: '0 5 0 0',
						store: {
							type: 'bizgroup'
						},
						minChars: 0,
						//width: 120,
						queryMode: 'local', 
						listeners: {
							change : 'onChangeBiz' 
						}
					}, 
					{
						xtype: 'combobox',
						reference: 'deptGroup',
						itemId:'deptGroup',
						name: 'deptGroup',
						publishes: 'value', 
						displayField: 'DEPT_NM',
						valueField: 'DEPT_CD', 
						store: {
							type: 'deptgroup',
							listeners: { load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
												store.insert(0, {DEPT_CD: '',DEPT_NM: Locale.getMsg('전체')});
												var bizCd = Ext.getCmp('request-search').down('#bizGroup');
												if(store.data.items.length < 2){
													Ext.getCmp('request-search').down('#user_cd').store.load({params:{dept_cd:bizCd.getValue(),up_dept_cd:''}});
												}else{
													Ext.getCmp('request-search').down('#user_cd').store.load({params:{dept_cd:'',up_dept_cd:bizCd.getValue()}});
												}
									   }}
						},
						minChars: 0,
						//width: 150,
						maskOnDisable: true,
						queryMode: 'local', 
						listeners: {
							change : 'onChangeDept' 
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
					type: 'usercd'
				},
				minChars: 0,
				queryMode: 'local'
	   },{
				xtype: 'fieldcontainer',
				//fieldLabel: '등록기간',
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
				fieldLabel: Locale.getMsg('품목명'),
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

Ext.define('Ysn.view.samplerequest.request',{
    extend: 'Ext.panel.Panel',
    xtype: 'samplerequest-request',
    requires: [
        'Ysn.view.samplerequest.requestController', 
		'Ysn.view.common.searchcustomer'
    ],

    controller: 'samplerequest-request',
    reference: 'samplerequest-request',
	id:'samplerequest-request',
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
					xtype: 'request-search',
					reference: 'requestSearch',
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
        }
		,{
            xtype: 'button',
			iconCls: 'x-fa fa-plus-square',
            text: Locale.getMsg('신규등록'),
			handler: 'frmClear'
        } ]
    },

    items: [
		{
					header: false,					
					region: 'center',					
					xtype: 'requestList',
					itemId: 'requestList',
                    listeners:{
                               select:'itemclick'
                    }

				},{
					title: Locale.getMsg('Sample 요청'), 
					 
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
					    xtype: 'samplerequest-requestDetail'
					}
				}, {
				    header: false,
				    xtype: 'muiltFileupload',
				    reference: 'muiltFile1',
				    itemId: 'muiltFile1',
				    width: 0,
				    height: 0,
                    hidden : true
				}, {
				    header: false,
				    xtype: 'muiltFileupload',
				    reference: 'muiltFile2',
				    itemId: 'muiltFile2',
				    width: 0,
				    height: 0,
                    hidden : true
				}
    ]
});

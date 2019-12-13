Ext.define('Ysn.view.customerdb.customersearch',{
    extend: 'Ext.panel.Panel',
	xtype: 'customer-search',

    requires: [
        'Ysn.view.customerdb.customersearchController',
        'Ysn.view.customerdb.customersearchModel',
	  	'Ysn.view.common.searchcustomer',
	    'Ysn.store.*'
    ],

    controller: 'customer-search',
    viewModel: {
        type: 'customer-search'
    },

    frame: false,
    //resizable: true,
    width: 1500,
    minWidth: 900,
    minHeight: 130,
    layout: {
        type: 'table',
        //columns: 5,
        tableAttrs: {
            style: {
                //width: '100%'
            }
        }
		
    },
    id: 'customer-search',
    defaults: {
        layout: 'form',
        xtype: 'container',
        defaultType: 'textfield' 
    },

    items: [{
        items: [
				  {
					xtype: 'fieldcontainer',
					fieldLabel: Locale.getMsg('매출조직'),
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
					}, {
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
												var bizCd = Ext.getCmp('customer-search').down('#bizGroup');
												if(store.data.items.length < 2){
													Ext.getCmp('customer-search').down('#user_cd').store.load({params:{dept_cd:bizCd.getValue(),up_dept_cd:''}});
												}else{
													Ext.getCmp('customer-search').down('#user_cd').store.load({params:{dept_cd:'',up_dept_cd:bizCd.getValue()}});
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
				  },
				  {
					xtype: 'fieldcontainer',
					fieldLabel: Locale.getMsg('거래처조회'),
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
				  }
        ]
    },{
        items: [
				  {
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
				  },
				  {
					xtype: 'combobox',
					reference: 'dmos_cd',
					publishes: 'value',
					fieldLabel: '국내/해외',
					labelAlign: 'right',
					displayField: 'CODE_NM',
					valueField: 'CODE_ID',
					name: 'dmos_cd',
					anchor: '-15',
					store: {
						type: 'dmoscd'
					},
					minChars: 0,
					queryMode: 'local',
					typeAhead: true
				  }
        ]
    }, {
        items: [
				{
			        xtype: 'combobox',
					reference: 'cust_grade',
					publishes: 'value',
					fieldLabel: Locale.getMsg('신용등급'),
					labelAlign: 'right',
					displayField: 'CODE_NM',
					valueField: 'CODE_ID',
					name: 'cust_grade',
					anchor: '-15',
					store: {
						type: 'custgrade'
					},
					minChars: 0,
					queryMode: 'local' 
		   },
            {
			        xtype: 'combobox',
					reference: 'nat_cd',
					publishes: 'value',
					fieldLabel: Locale.getMsg('국가정보'),
					labelAlign: 'right',
					displayField: 'NAT_NM',
					valueField: 'NAT_CD',
					name: 'nat_cd',
					anchor: '-15',
					store: {
						type: 'nationAll'
					},
					minChars: 0,
					queryMode: 'local' 
		   }
        ]
    }, {
        items: [
            {
			        xtype: 'combobox',
					reference: 'trms_pay',
					publishes: 'value',
					fieldLabel: '결재조건',
					labelAlign: 'right',
					displayField: 'CODE_NM',
					valueField: 'CODE_ID',
					name: 'trms_pay',
					anchor: '-15',
					store: {
						type: 'trmspay'
					},
					minChars: 0,
					queryMode: 'local',
					typeAhead: true
		   },
            {
			        xtype: 'combobox',
					reference: 'use_yn',
					publishes: 'value',
					fieldLabel: Locale.getMsg('활동여부'),
					labelAlign: 'right',
					displayField: 'CODE_NM',
					valueField: 'CODE_ID',
					name: 'use_yn',
					anchor: '-15',
					store: {
						type: 'sayn'
					},
					minChars: 0,
					queryMode: 'local',
					typeAhead: true
		   }
        ]
    },{
        items: [
            {
			        rowspan: 2,
					xtype: 'button',
					text: Locale.getMsg('검색'),
					height: 60,
				    width: 60,
					listeners: {
							click : 'onSubmitClick' 
					}
		    }
        ]
    } ] 
});

Ext.define('Ysn.view.customerDb.customer',{
    extend: 'Ext.panel.Panel',
    xtype: 'customerDb-customer',
    requires: [
        'Ysn.view.customerdb.customerController',
        'Ysn.view.customerdb.customerModel',
		'Ysn.view.customerdb.customerList',
		'Ysn.view.common.searchcustomer'
    ],

    controller: 'customerdb-customer',
    viewModel: {
        type: 'customerdb-customer'
    },
    reference: 'customerdbCustomer',
	id:'customerdbCustomer',
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
		            title: Locale.getMsg('거래처'),
					xtype: 'customer-search',
					reference: 'customerSearch',
                           scrollable: true,
					collapsible: true,
					floatable: true,
					split: true,
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
			//disabled : true
			handler: 'onClick'
        } ]
    },

    items: [
		{
					header: false,					
					region: 'center',					
					xtype: 'customerList',
					itemId: 'customerList',
                    listeners:{
                               select:'itemclick'
                    }

				},{
					title: '거래처 등록', 
					 
					scrollable:false,
                    x: 10, y: 10,
					region: 'east', 
					itemId: 'east',
					//	reference:'Detail',
					collapsed: true,
					layout: 'fit',
                    width: 950,
                    minWidth: 850,
                    maxWidth: 1200,
					items: {
						itemId: 'customerdb-customerDetail',
						xtype: 'customerdb-customerDetail'
					}
				}
    ]
	
});

Ext.define('Ysn.view.customerdb.keymansearch',{
    extend: 'Ext.panel.Panel',
	xtype: 'keyman-search',

    requires: [
        'Ysn.view.customerdb.keymansearchController', 
	  	'Ysn.view.common.searchcustomer',
	    'Ysn.store.*'
    ],

    controller: 'keyman-search',

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
    id: 'keyman-search',
	reference: 'keyman-search',
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
												var bizCd = Ext.getCmp('keyman-search').down('#bizGroup');
												if(store.data.items.length < 2){
													Ext.getCmp('keyman-search').down('#userGroup').store.load({params:{dept_cd:bizCd.getValue(),up_dept_cd:''}});
												}else{
													Ext.getCmp('keyman-search').down('#userGroup').store.load({params:{dept_cd:'',up_dept_cd:bizCd.getValue()}});
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
					name: 'userGroup',
					itemId : 'userGroup',
					maskOnDisable: true,
					anchor: '-15',
					store: {
						type: 'usercd'
					},
					minChars: 0,
					queryMode: 'local'
				  },
				  {
					xtype: 'textfield',
					fieldLabel: Locale.getMsg('고객담당'),
					labelAlign: 'right',
					name: 'km_nm', 
					reference : 'km_nm',
					itemId : 'km_nm', 
					width: 50
				  }
        ]
    }, {
        items: [
				{
			        xtype: 'combobox',
					reference: 'km_power',
					publishes: 'value',
					fieldLabel: Locale.getMsg('권한정도'),
					labelAlign: 'right',
					displayField: 'CODE_NM',
					valueField: 'CODE_ID', 
					name: 'km_power',
					anchor: '-15',
					store: {
						type: 'TcodeAll'
					},
					minChars: 0,
					queryMode: 'local' 
		   },
            {
			        xtype: 'textfield',
					fieldLabel: Locale.getMsg('직급'),
					labelAlign: 'right',
					name: 'km_power', 
					reference : 'km_title',
					itemId : 'km_title'
		   }
        ]
    }, {
        items: [
            {
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
						fieldLabel: Locale.getMsg('등록기간'),
						labelAlign: 'right',
						labelWidth: 60,
						width: 190,
						xtype: 'datefield',
						name: 's_reg_date', 
						reference : 's_reg_date',
					    itemId : 's_reg_date',
						format: 'Y-m-d',
						margin: '0 5 0 0' 
					},{
						xtype: 'datefield',
						name: 'e_reg_date',
						width: 130,
						reference : 'e_reg_date',
					    itemId : 'e_reg_date',
						format: 'Y-m-d'
					}]
		   },
            {
			        xtype: 'fieldcontainer',  
					layout: 'hbox',
					defaultType: 'textfield',
					items: [{
						xtype: 'combobox',
						reference: 'km_work',
						publishes: 'km_work',
						fieldLabel: Locale.getMsg('업무구분'),
						labelAlign: 'right',
						displayField: 'CODE_NM',
						valueField: 'CODE_ID', 
						name: 'km_work',
						labelWidth: 60,
						width: 160,
						anchor: '-15',
						store: {
							type: 'TcodeAll'
						},
						minChars: 0,
						queryMode: 'local',
						typeAhead: true,
						margin: '0 5 0 0'
					},{
						xtype: 'combobox',
						reference: 'use_yn',
						publishes: 'value', 
						fieldLabel: Locale.getMsg('활동여부'),
						labelWidth: 60,
						width: 160,
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
					}] 
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

Ext.define('Ysn.view.customerDb.keyman',{
    extend: 'Ext.panel.Panel',
    xtype: 'customerDb-keyman',
    requires: [
        'Ysn.view.customerdb.keymanController', 
		'Ysn.view.customerdb.keymanList'/*,
		'Ysn.view.common.searchkeyman'*/
    ],

    controller: 'customerdb-keyman', 
    reference: 'customerdbkeyman',
	id:'customerdbkeyman',
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
		            title: Locale.getMsg('고객담당(Keyman)'),
					xtype: 'keyman-search',
					reference: 'keyman-search',
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
			handler: 'onClick'
        },{
            xtype: 'button',
			iconCls: 'x-fa fa-address-card-o',
            text: Locale.getMsg('신규등록'),
			handler: 'frmClear'
        } ]
    },

    items: [
		{
					header: false,					
					region: 'center',					
					xtype: 'keymanList',
					itemId: 'keymanList',
                    listeners:{
                               select:'itemclick'
                    }

				},{
					title: Locale.getMsg('고객담당 등록'), 
					 
					scrollable:false,
                    x: 10, y: 10,
					region: 'east', 
					itemId: 'east',
					//	reference:'Detail',
					collapsed: true,
					layout: 'fit',
                    width: 1000,
                    minWidth: 850,
                    maxWidth: 1200,
					items: {
						itemId: 'customerdb-keymanDetail',
						xtype: 'customerdb-keymanDetail'
					}
				}
    ]
	
});

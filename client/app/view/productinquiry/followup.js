Ext.define('Ysn.view.productinquiry.followupsearch',{
    extend: 'Ext.panel.Panel',
	xtype: 'followup-search',

    requires: [
        'Ysn.view.productinquiry.inquirysearchController', 
	  	'Ysn.view.common.searchcustomer',
	    'Ysn.store.*'
    ],

    controller: 'followup-search', 

    frame: false,
    //resizable: true,
    width: 1000,
    minWidth: 1000,
    minHeight: 130,
    layout: {
        type: 'table',
        columns: 5,
        tableAttrs: {
            style: {
                //width: '100%'
            }
        }
		
    },
    id: 'followup-search',
	reference: 'followup-search',
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
												var bizCd = Ext.getCmp('followup-search').down('#bizGroup');
												if(store.data.items.length < 2){
												    Ext.getCmp('followup-search').down('#user_cd').store.load({ params: { dept_cd: bizCd.getValue(), up_dept_cd: '' } });
												}else{
												    Ext.getCmp('followup-search').down('#user_cd').store.load({ params: { dept_cd: '', up_dept_cd: bizCd.getValue() } });
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
					xtype: 'combobox',
					reference: 'inq_chnl',
					publishes: 'value',
					fieldLabel: Locale.getMsg('문의경로'),
					labelAlign: 'right',
					displayField: 'CODE_NM',
					valueField: 'CODE_ID',
					name: 'inq_chnl',
					itemId : 'inq_chnl', 
					maskOnDisable: true,
					anchor: '-15',
					store: {
						type: 'TcodeAll'
					},
					minChars: 0,
					queryMode: 'local'
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
					reference: 'inq_type',
					publishes: 'value',
					fieldLabel: Locale.getMsg('문의유형'),
					labelAlign: 'right',
					displayField: 'CODE_NM',
					valueField: 'CODE_ID',
					name: 'inq_type',
					anchor: '-15',
					store: {
						type: 'TcodeAll'
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
					reference: 'dstr_type',
					publishes: 'value',
					fieldLabel: Locale.getMsg('유통구조'),
					labelAlign: 'right',
					displayField: 'CODE_NM',
					valueField: 'CODE_ID',
					name: 'dstr_type',
					anchor: '-15',
					store: {
						type: 'TcodeAll'
					},
					minChars: 0,
					queryMode: 'local' 
		   },
            {
			        xtype: 'combobox',
					reference: 'inq_status',
					publishes: 'value',
					fieldLabel: Locale.getMsg('진행사항'),
					labelAlign: 'right',
					displayField: 'CODE_NM',
					valueField: 'CODE_ID',
					name: 'inq_status',
					anchor: '-15',
					store: {
						type: 'TcodeAll'
					},
					minChars: 0,
					queryMode: 'local' 
		   }
        ]
    }, {
        items: [
            {
			        xtype: 'fieldcontainer',
			        fieldLabel: Locale.getMsg('접수일'),
			        labelAlign: 'right',
					combineErrors: true, 
					layout: 'hbox',
					defaults: {
						//flex: 1,
						hideLabel: true,
						margin: '0 5 0 0' 
					},
					items: [{  
						width: 120,
						xtype: 'datefield',
						name: 'inq_rsdate', 
						reference : 'inq_rsdate',
					    itemId : 'inq_rsdate',
						format: 'Y-m-d',
						maxValue: new Date(), 
						margin: '0 5 0 0' 
					},{
						xtype: 'datefield',
						name: 'inq_redate',
						width: 120,
						reference : 'inq_redate',
					    itemId : 'inq_redate',
						format: 'Y-m-d',
						value: new Date()
					}]
            },
             {
                 xtype: 'fieldcontainer', 
                 labelAlign: 'right',
                 combineErrors: true,
                 layout: 'hbox',
                 fieldLabel: Locale.getMsg('국가'),
                 defaults: {
                     //flex: 1,
                     hideLabel: false,
                     margin: '0 5 0 0'
                 },
                 items: [
                 {
                     //fieldLabel: Locale.getMsg('국가'),
                     //labelWidth: 20,
                     width: 150,
                     name: 'nat_cd',
                     xtype: 'combobox',
                     reference: 'nat_cd',
                     publishes: 'value',  
                     displayField: 'NAT_NM',
                     valueField: 'NAT_CD',  
                     store: {
                         type: 'nationAll'
                     },
                     minChars: 0,
                     queryMode: 'local',
                     typeAhead: true
                 },
                 {
                     fieldLabel: Locale.getMsg('매출발생'), labelAlign: 'right', labelWidth: 60, width: 80, xtype: 'checkboxfield', inputValue: 'Y', name: 'order_yn', reference: 'order_yn',
                     margin: '0 5 0 0'
                 } ]
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


Ext.define('Ysn.view.productinquiry.followup',{
    extend: 'Ext.panel.Panel',
    xtype: 'productinquiry-followup',
    requires: [
        'Ysn.view.productinquiry.followupController',
		'Ysn.view.productinquiry.followupList',
		'Ysn.view.common.searchcustomer'
    ],

    controller: 'productinquiry-followup',
    reference: 'productinquiry-followup',
	id:'productinquiry-followup',
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
		            title: Locale.getMsg('제품문의사후조치'),
					xtype: 'followup-search',
					reference: 'followupSearch',
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
		{
			xtype: 'tbspacer', 
			width: 20
		},
		{
			xtype: 'label',
		    itemId: 'status_cnt',
			text: ''
			//style: { 'font-weight':'bold'}
		},
			  '->',
			 
		{
            xtype: 'button',
			iconCls: 'x-fa fa-file-excel-o',
            text: Locale.getMsg('액셀변환'), 
			handler: 'onClick'
        } ]
    },

    items: [
		{
					header: false,					
					region: 'center',					
					xtype: 'followupList',
					//itemId: 'inquiryList',
                    listeners:{
                               select:'itemclick'
                    }

				},{
				    title: Locale.getMsg('제품문의사후조치'), 
					 
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
						xtype: 'productinquiry-followupDetail',
					    itemId: 'productinquiry-followupDetail'
					}
				}
    ]
	
});

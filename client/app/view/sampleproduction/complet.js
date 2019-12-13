Ext.define('Ysn.view.sampleproduction.completsearch',{
    extend: 'Ext.panel.Panel',
	xtype: 'complet-search',

    requires: [
        'Ysn.view.sampleproduction.completsearchController', 
	  	'Ysn.view.common.searchcustomer',
	    'Ysn.store.*'
    ],

    controller: 'complet-search', 

    frame: false,
    //resizable: true,
    width: 1000,
    minWidth: 1000,
    minHeight: 140,
    layout: {
        type: 'table',
        columns: 5,	
        tableAttrs: {
            style: {
				'padding-top': '5px',
                width: '20%'
            }
        }
		
    },
    id: 'complet-search',
    defaults: {
        layout: 'form',
        xtype: 'container',
        defaultType: 'textfield' 
    },

    items: [{
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
												var bizCd = Ext.getCmp('complet-search').down('#bizGroup');
												if(store.data.items.length < 2){
													Ext.getCmp('complet-search').down('#user_cd').store.load({params:{dept_cd:bizCd.getValue(),up_dept_cd:''}});
												}else{
													Ext.getCmp('complet-search').down('#user_cd').store.load({params:{dept_cd:'',up_dept_cd:bizCd.getValue()}});
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
						fieldLabel: Locale.getMsg('제작승인일'),
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
				rowspan: 3,
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
       }, {
           colspan: 3,
           xtype: 'fieldcontainer',
           hideLabel: true,
           labelAlign: 'right',
           combineErrors: true,
           msgTarget: 'side',
           layout: 'hbox',
           defaults: {
               //flex: 1,
               //hideLabel: true
           },
           items: [{
               xtype: 'combobox',
               reference: 'biz_type',
               publishes: 'value',
               fieldLabel: Locale.getMsg('사업유형'),
               labelAlign: 'right',
               displayField: 'CODE_NM',
               valueField: 'CODE_ID',
               name: 'biz_type',
               labelWidth: 100,
               width: 220,
               anchor: '-15',
               store: {
                   type: 'TcodeAll'
               },
               minChars: 0,
               queryMode: 'local'
           }, {
               fieldLabel: Locale.getMsg('제작담당'),
               xtype: 'textfield',
               reference: 'muser_nm',
               labelAlign: 'right',
               labelWidth: 80,
               width: 200,
               name: 'muser_nm',
               value: username,
               readOnly: true
           },  {
               xtype: 'hiddenfield',
               fieldLabel: 'muser_cd',
               labelWidth: 60,
               labelAlign: 'right',
               name: 'muser_cd',
               reference: 'muser_cd',
               value: loginUser,
               itemId: 'muser_cd'
           },{
               xtype: 'combobox',
               reference: 'smp_status',
               publishes: 'value',
               fieldLabel: Locale.getMsg('진행상태'),
               labelWidth: 80,
               labelAlign: 'right',
               displayField: 'CODE_NM',
               valueField: 'CODE_ID', 
               width: 250,
               name: 'smp_status',
               anchor: '-15',
               store: {
                   type: 'TcodeAll'
               },
               minChars: 0,
               queryMode: 'local'
           }, {
               xtype: 'combobox',
               reference: 'process',
               publishes: 'value',
               fieldLabel: Locale.getMsg('샘플공정'),
               labelWidth: 80,
               labelAlign: 'right',
               displayField: 'CODE_NM',
               valueField: 'CODE_ID', 
               width: 200,
               name: 'process',
               anchor: '-15',
               store: {
                   type: 'TcodeAll'
               },
               minChars: 0,
               queryMode: 'local'
           }]
       },{
				xtype: 'fieldcontainer',
				fieldLabel: 'End User',
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
						name: 'end_user_nm', 
						reference : 'end_user_nm',
					    itemId : 'end_user_nm',
						margin: '0 5 0 0',
						width: 270
					},{
						xtype: 'hiddenfield',
						reference: 'end_user_cd', 
						name: 'end_user_cd', 
						itemId : 'end_user_cd'
					}, {
						iconCls: 'x-fa fa-search', 
						xtype: 'button',
						scale: 'small',
						margin: '0 5 0 0',
						handler : 'openWindow2',
						style:{ 
							'border':'none' 

						}
					},{
						iconCls: 'x-fa fa-remove', 
						xtype: 'button',
						scale: 'small',
						handler : 'resetVal2',
						style:{
							'background-color': 'red !important',
							'background-image': 'none',
							'border':'none' 

						}
					}]
	   }, {
	       colspan: 3,
	       xtype: 'fieldcontainer',
	       hideLabel: true,
	       labelAlign: 'right',
	       combineErrors: true,
	       msgTarget: 'side',
	       layout: 'hbox',
	       defaults: {
	           //flex: 1,
	           //hideLabel: true
	       },
	       items: [{
	           xtype: 'combobox',
	           reference: 'item_type',
	           publishes: 'value',
	           fieldLabel: Locale.getMsg('품목유형'),
	           labelAlign: 'right',
	           displayField: 'CODE_NM',
	           valueField: 'CODE_ID',
	           name: 'item_type',
	           labelWidth: 100,
	           width: 200,
	           anchor: '-15',
	           store: {
	               type: 'TcodeAll'
	           },
	           minChars: 0,
	           queryMode: 'local'
	       }, {
	           xtype: 'combobox',
	           reference: 'smp_type',
	           publishes: 'value',
	           fieldLabel: Locale.getMsg('샘플유형'),
	           labelAlign: 'right',
	           displayField: 'CODE_NM',
	           valueField: 'CODE_ID',
	           name: 'smp_type',
	           labelWidth: 60,
	           width: 200,
	           anchor: '-15',
	           store: {
	               type: 'TcodeAll'
	           },
	           minChars: 0,
	           queryMode: 'local'
	       }, {
	           xtype: 'combobox',
	           reference: 'prdt_psblt',
	           publishes: 'value',
	           fieldLabel: Locale.getMsg('양산가능성'),
	           labelAlign: 'right',
	           displayField: 'CODE_NM',
	           valueField: 'CODE_ID',
	           name: 'prdt_psblt',
	           labelWidth: 80,
	           width: 200,
	           anchor: '-15',
	           store: {
	               type: 'TcodeAll'
	           },
	           minChars: 0,
	           queryMode: 'local'
	       }, {
	           xtype: 'textfield',
	           fieldLabel: 'SMP.No',
	           labelWidth: 60,
	           labelAlign: 'right',
	           name: 'smp_cd',
	           reference: 'smp_cd',
	           itemId: 'smp_cd'
	       }]
	   }
  ] 
});

Ext.define('Ysn.view.sampleproduction.complet',{
    extend: 'Ext.panel.Panel',
    xtype: 'sampleproduction-complet',
    requires: [
        'Ysn.view.sampleproduction.completController', 
		'Ysn.view.common.searchcustomer'
    ],

    controller: 'sampleproduction-complet',
    reference: 'sampleproduction-complet',
	id:'sampleproduction-complet',
    layout: 'border',
    width: 500,
    height: 400,
    overflow:'hidden',
	scrollable:true,
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
					xtype: 'complet-search',
					reference: 'completSearch',
                           scrollable: true,
					collapsible: true,
					floatable: true,
					split: true,
					padding: '0 0 0 0',
					dock: 'top',
					height: 175
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
            iconCls: 'x-fa fa-angle-double-up',
            text: '일괄사양확정',
            itemId: 'batchCommit',
            hidden: true,
            handler: 'batchCommit'
        },
        {
            xtype: 'button',
            iconCls: 'x-fa fa-angle-double-up',
            text: '일괄제작완료',
            itemId: 'batchCommit2',
            hidden: true,
            handler: 'batchCommit2'
        },
		{
            xtype: 'button',
			iconCls: 'x-fa fa-file-excel-o',
            text: Locale.getMsg('액셀변환'), 
			handler: 'xlsExport'
        } ]
    },

    items: [
		{
					header: false,					
					region: 'center',					
					xtype: 'completList',
					itemId: 'completList',
                    listeners:{
                               select:'itemclick'
                    }

				},{
					title: Locale.getMsg('Sample 제작완료'), 
					 
					scrollable:false,
                    x: 10, y: 10,
					region: 'east', 
					itemId: 'east',
					//	reference:'Detail',
					collapsed: true,
					layout: 'fit',
                    width: 1100,
                    minWidth: 850,
                    maxWidth: 1200,
					items: {
						xtype: 'sampleproduction-completDetail'
					}
				}, {
				    header: false,
				    xtype: 'muiltFileupload',
				    reference: 'muiltFile1',
				    itemId: 'muiltFile1',
				    width: 0,
				    height: 0,
				    hidden: true
				}
    ]
});

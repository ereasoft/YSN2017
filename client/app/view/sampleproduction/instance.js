Ext.define('Ysn.view.sampleproduction.instancesearch',{
    extend: 'Ext.panel.Panel',
	xtype: 'instance-search',

    requires: [
        'Ysn.view.sampleproduction.instancesearchController', 
	  	'Ysn.view.common.searchcustomer',
	    'Ysn.store.*'
    ],

    controller: 'instance-search', 

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
    id: 'instance-search',
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
												var bizCd = Ext.getCmp('instance-search').down('#bizGroup');
												if(store.data.items.length < 2){
													Ext.getCmp('instance-search').down('#user_cd').store.load({params:{dept_cd:bizCd.getValue(),up_dept_cd:''}});
												}else{
													Ext.getCmp('instance-search').down('#user_cd').store.load({params:{dept_cd:'',up_dept_cd:bizCd.getValue()}});
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
						fieldLabel: Locale.getMsg('접수일'),
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
       },{
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
               xtype: 'combobox',
               reference: 'muser_cd',
               publishes: 'value',
               fieldLabel: Locale.getMsg('제작담당'),
               labelAlign: 'right',
               displayField: 'USER_NM',
               valueField: 'USER_CD',
               name: 'muser_cd',
               labelWidth: 100,
               width: 220,
               anchor: '-15',
               store: {
                   type: 'sucUser',
                   listeners: {
                       load: function (store) {
                           store.insert(0, { USER_CD: '', USER_NM: Locale.getMsg('전체') });
                       }
                   }
               },
               minChars: 0,
               queryMode: 'local'
           }, {
               xtype: 'combobox',
               reference: 'smp_status',
               publishes: 'value',
               fieldLabel: Locale.getMsg('진행상태'),
               labelWidth: 80,
               labelAlign: 'right',
               displayField: 'CODE_NM',
               valueField: 'CODE_ID',
               labelWidth: 100,
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
               labelWidth: 100,
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
						name: 'euser_nm', 
						reference : 'euser_nm',
					    itemId : 'euser_nm',
						margin: '0 5 0 0',
						width: 270
					},{
						xtype: 'hiddenfield',
						reference: 'euser_cd', 
						name: 'euser_cd', 
						itemId : 'euser_cd'
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
	       },{
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

Ext.define('Ysn.view.sampleproduction.instance',{
    extend: 'Ext.panel.Panel',
    xtype: 'sampleproduction-instance',
    requires: [
        'Ysn.view.sampleproduction.instanceController', 
		'Ysn.view.common.searchcustomer'
    ],

    controller: 'sampleproduction-instance',
    reference: 'sampleproduction-instance',
	id:'sampleproduction-instance',
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
					xtype: 'instance-search',
					reference: 'instanceSearch',
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
			iconCls: 'x-fa fa-file-excel-o',
            text: Locale.getMsg('액셀변환'), 
			handler: 'xlsExport'
        },{
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
					xtype: 'instanceList',
					itemId: 'instanceList',
                    listeners:{
                               select:'itemclick'
                    }

				},{
					title: Locale.getMsg('Sample 제작의뢰'), 
					 
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
						xtype: 'sampleproduction-instanceDetail'
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

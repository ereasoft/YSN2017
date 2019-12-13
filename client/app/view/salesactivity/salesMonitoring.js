
Ext.define('Ysn.view.salesactivity.salesMonitoring',{
    extend: 'Ext.panel.Panel',
    xtype: 'salesactivity-salesMonitoring',
    requires: [
        'Ysn.view.salesactivity.salesMonitoringController', 
		'Ysn.view.salesactivity.salesMonitoringList'
    ],

    controller: 'salesactivity-salesMonitoring',
    viewModel: {
        type: 'salesactivity-salesMonitoring'
    },
    reference: 'salesactivitysalesMonitoring',
	id:'salesactivitysalesMonitoring',
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
		            title: Locale.getMsg('영업활동모니터링'),
					xtype: 'salesMonitoring-search',
					reference: 'salesMonitoringSearch',
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
					xtype: 'salesMonitoringList',
					itemId: 'salesMonitoringList',
                    listeners:{
                               //select:'itemclick'
                    }

				} 
    ]
	
});

Ext.define('Ysn.view.salesactivity.salesMonitoringController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salesactivity-salesMonitoring',
	requires: [ 
	    'Ysn.store.*'
    ],
    init: function() {
        this.lookupReference('salesMonitoringSearch').setTitle(pageTitle);
		if(Ext.getCmp('chkpopup').getValue()){ 
			Ext.getCmp('salesactivitysalesMonitoring').down('#east').setVisible(false);			
		} 
	},
	/*itemclick: function(view, record, index, e) { 
		if(Ext.getCmp('chkpopup').getValue()){
            openPopupView('영업활동모니터링','salesactivity-salesMonitoringDetail',record.get('SA_CD'),'SalesActivity|popupSalesActivityDetail|sa_cd'); 
		}else{
			Ext.getCmp('salesMonitoringDetail').load({
				url: '/SalesActivity/popupSalesActivityDetail?sa_cd='+record.get('SA_CD') //,waitMsg: 'loading...',	
			});
			
		}
		
	}, */
	onClick: function(){  

		Ext.getCmp('salesMonitoringList').saveDocumentAs({ 
			headerRowCnt: 2,
            type:       'xlsx',
            title:      Ext.getCmp('salesMonitoring-search').getTitle(),
            fileName:   Locale.getMsg('영업활동모니터링') 
		});
	}
});

Ext.define('Ysn.view.salesactivity.salesMonitoringsearch',{
    extend: 'Ext.panel.Panel',
	xtype: 'salesMonitoring-search',

    requires: [
        'Ysn.view.salesactivity.salesMonitoringsearchController', 
	    'Ysn.store.*'
    ],

    controller: 'salesMonitoring-search',
    viewModel: {
        type: 'salesMonitoring-search'
    },

    frame: false,
    //resizable: true,
    width: 1500,
    minWidth: 900,
    minHeight: 130,
    layout: {
        type: 'table', 
        tableAttrs: {
            style: {
                //width: '100%'
            }
        }
		
    },
    id: 'salesMonitoring-search',
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
												var bizCd = Ext.getCmp('salesMonitoring-search').down('#bizGroup');
												if(store.data.items.length < 2){
													Ext.getCmp('salesMonitoring-search').down('#user_cd').store.load({params:{dept_cd:bizCd.getValue(),up_dept_cd:''}});
												}else{
													Ext.getCmp('salesMonitoring-search').down('#user_cd').store.load({params:{dept_cd:'',up_dept_cd:bizCd.getValue()}});
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
				  } 
        ]
    }, {
        items: [
            {
			        xtype: 'fieldcontainer', 
				combineErrors: true, 
				layout: 'hbox',
				defaults: {
					//flex: 1,
					//hideLabel: true,
					margin: '0 5 0 0' 
				},
					items: [{
						xtype: 'combobox',
						reference: 'base_y',
						publishes: 'value',
						fieldLabel: Locale.getMsg('활동년월'),
						width: 200,
						labelAlign: 'right',
						displayField: 'YEAR',
						valueField: 'VAL',
						name: 'base_y',
						itemId : 'base_y',
						maskOnDisable: true,
						anchor: '-15',
						store: {
							type: 'year'
						},
						minChars: 0,
						queryMode: 'local',
						margin: '0 5 0 0' 
					},{
						xtype: 'combobox',
						reference: 'base_m',
						publishes: 'value', 
						labelAlign: 'right',
						width: 100,
						displayField: 'MONTH',
						valueField: 'VAL',
						name: 'base_m',
						itemId : 'base_m',
						maskOnDisable: true,
						anchor: '-15',
						store: {
							type: 'month'
						},
						minChars: 0,
						queryMode: 'local',
						margin: '0 10 0 0' 
					},{
					xtype: 'hiddenfield',
					reference: 'mod_user', 
					name: 'mod_user', 
					itemId : 'mod_user'
					}]
		   } 
        ]
    },{
        items: [
            { 
					xtype: 'button',
					text: Locale.getMsg('검색'),
					height: 30,
				    width: 60,
					listeners: {
							click : 'onSubmitClick' 
					}
		    }
        ]
    } ] 
});

Ext.define('Ysn.view.salesactivity.salesMonitoringsearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salesMonitoring-search',
	init: function() {
	 var Today = new Date();
	 this.lookupReference('bizGroup').store.load();  
     this.lookupReference('bizGroup').setValue(Ysn.Util.chkDept(true)); 
     this.lookupReference('base_y').store.load();  
     this.lookupReference('base_y').setValue(Today.getFullYear()); 
	 this.lookupReference('base_m').store.load();  
     this.lookupReference('base_m').setValue('0'+(Today.getMonth()+1)); 
	 if(auth_id != 'A001'){
		// this.lookupReference('bizGroup').setConfig({'readOnly':true});
		// if(dept_level == '4') this.lookupReference('deptGroup').setConfig({'readOnly':true});
	 }
	}, 
	onChangeBiz: function(el,newVal,oldVal,e){
        var deptCombo = this.lookupReference('deptGroup'); 
        var userCombo = this.lookupReference('userGroup');
        if (newVal != '') {
            deptCombo.store.load({params:{up_dept_cd:newVal}}); 
				 
        } else {
            deptCombo.setValue('');
            userCombo.setValue('');
            deptCombo.store.removeAll();
            userCombo.store.removeAll();
            deptCombo.store.insert(0, {DEPT_CD: '',DEPT_NM: Locale.getMsg('전체')}); 
            userCombo.store.insert(0, {USER_CD: '',USER_NM: Locale.getMsg('전체')}); 				
        }
        if (newVal != '') {
            deptCombo.setValue(Ysn.Util.chkDept(false)); 
        } 
		deptCombo.doQuery();
		userCombo.setValue('');
		userCombo.doQuery(); 
		el.focus();

	},
	onChangeDept: function(el,newVal,oldVal,e){
		var userCombo = this.lookupReference('userGroup');
		if (newVal != '' && newVal != null) {
		userCombo.store.load({params:{dept_cd:newVal,up_dept_cd:this.lookupReference('bizGroup').getValue()}});
		} else {
		    userCombo.store.removeAll();
		}
		userCombo.setValue('');
		userCombo.doQuery(); 
		el.focus();
		//userCombo.focus();

	},
	onSubmitClick: function() {
		    var deptGrp = this.lookupReference('deptGroup');
			var bizGrp = this.lookupReference('bizGroup'); 
			var deptCode = this.lookupReference('deptGroup').getValue();
			var bizCode = this.lookupReference('bizGroup').getValue();
			if (deptGrp.getStore().data.items.length < 2 )
			{
				deptCode = bizCode;
				bizCode = '';
			}

			Ext.getCmp('salesactivitysalesMonitoring').down('#salesMonitoringList').store.load(
					{params: {  deptGroup : deptCode,
								bizGroup  : bizCode,
								user_cd   : this.lookupReference('userGroup').getValue(''),
								base_y   : this.lookupReference('base_y').getValue(''),
								base_m   : this.lookupReference('base_m').getValue(''),
				                base_ym   : this.lookupReference('base_y').getValue('')+this.lookupReference('base_m').getValue('')
		            }}
		);
	}


});


Ext.define('Ysn.view.salesactivity.salesMonitoringList',{
    extend: 'Ext.grid.Panel',
    xtype: 'salesMonitoringList',
    requires: [
        'Ysn.view.salesactivity.salesMonitoringListController', 
		'Ysn.store.salesMonitoringList',
		'Ext.grid.filters.Filters'
    ],
    
    controller: 'salesactivity-salesMonitoringList',     
	store: {
        type: 'salesMonitoringList', 
		autoLoad: false,
        autoDestroy: true
    }, 
	style: {'borderTop':'1px solid gray'},
	enableLocking: true,
	id: 'salesMonitoringList',
    columnLines: true,
	multiColumnSort: true, 
	plugins: ['gridfilters',
			  'pmh-grid-exporter'
	],
	columns: [
            {text: Locale.getMsg('활동조직'), 
		      columns:[
		       {text: Locale.getMsg('영업팀'), width: 125, dataIndex: 'UP_DEPT_NM', sortable: true,  
				 filter: {
					 type: 'string',
					 itemDefaults: {
						emptyText: Locale.getMsg('검색어입력..')
					}
				 }
				},
				{text: Locale.getMsg('영업파트'), width: 125, dataIndex: 'DEPT_NM', sortable: true,  
				 filter: {
					 type: 'string',
					 itemDefaults: {
						emptyText: Locale.getMsg('검색어입력..')
					}
				 }
				},
				{text: Locale.getMsg('영업담당'), width: 125, dataIndex: 'USER_NM', sortable: true,  
				 filter: {
					 type: 'string',
					 itemDefaults: {
						emptyText: Locale.getMsg('검색어입력..')
					}
				 }
				}
		      ]
			},
			{text: Locale.getMsg('영업활동'), 
		      columns:[
		       {text: Locale.getMsg('기회발굴'), width: 125, dataIndex: 'SUM_1'},
			   {text: Locale.getMsg('수주영업'), width: 125, dataIndex: 'SUM_2'},
			   {text: Locale.getMsg('협업지원'), width: 125, dataIndex: 'SUM_3'},
			   {text: Locale.getMsg('업무보고'), width: 125, dataIndex: 'SUM_4'},
			   {text: Locale.getMsg('총활동실적'), width: 125, dataIndex: 'SUM_5'} 
		      ]
			},
			{text: Locale.getMsg('핵심Keyman면담활동'), 
		      columns:[
		       {text: Locale.getMsg('총키맨'), width: 125, dataIndex: 'SUM_6'},
			   {text: Locale.getMsg('핵심키맨'), width: 125, dataIndex: 'SUM_7'},
			   {text: Locale.getMsg('면담핵심키맨'), width: 125, dataIndex: 'SUM_8'},
			   {text: Locale.getMsg('면담율'), width: 125, dataIndex: 'SUM_9',renderer: 'renderPercent' } 
		      ]
			},
			{text: Locale.getMsg('관리자Comment현황'), 
		      columns:[
		       {text: Locale.getMsg('총대상건수'), width: 125, dataIndex: 'SUM_10'},
			   {text: Locale.getMsg('코멘트건수'), width: 125, dataIndex: 'SUM_11'},
			   {text: Locale.getMsg('코멘트율'), width: 125, dataIndex: 'SUM_12',renderer: 'renderPercent'} 
		      ]
			}
        ],
   height: 700,
   width: 1600,
   syncRowHeight: false,
   viewConfig: {
            stripeRows: true
   },
   listeners: {		
		//itemclick: function(dataview, record, item, index, e) {  
    // }

    } 
});


Ext.define('Ysn.view.salesactivity.salesMonitoringListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salesactivity-salesMonitoringList', 
    init: function() {
	  
	},
	renderPercent: function (value) {
        return this.renderSign(value, '0.00%');
    },

    renderSign: function (value, format) {
        var text = Ext.util.Format.number(value, format),
            tpl = this.signTpl,
            data = this.data;

        if (Math.abs(value) > 0.1) {
            if (!tpl) {
                this.signTpl = tpl = this.getView().lookupTpl('signTpl');
                this.data = data = {};
            }

            data.value = value;
            data.text = text;

            text = tpl.apply(data);
        }

        return text;
    }
});

Ext.define('Ysn.view.estimate.requestMain3',{
    extend: 'Ext.panel.Panel',
    xtype: 'requestMain3',

    requires: [
        'Ysn.view.estimate.requestMainController',
        'Ysn.view.estimate.estimateDetail3',
        'Ysn.view.estimate.estimateList3'
    ],

    controller: 'requestMain',

    reference: 'requestMain3',
    id: 'estimate-requestMain3',
    layout: 'border',
    width: 500,
    height: 400,
    overflow: 'hidden',
    scrollable: false,
    header: false,
    bodyBorder: true,
    defaults: {
        collapsible: true,
        split: true,
        bodyPadding: 0
    },

    dockedItems: [
	               {
	                   title: '조회',
	                   xtype: 'panel',   
                       layout: 'column', 
	                   reference: 'requestSearch',
	                   scrollable: true,
	                   collapsible: true,
	                   floatable: true,
	                   split: true,
	                   bodyPadding: 7,
	                   dock: 'top',
	                   height: 100,   
	                   items: [
                           {
                               xtype: 'combobox',
                               labelAlign: 'right',
                               msgTarget: 'side',
                               allowBlank: true,
                               readOnly: false,
                               width: 230,
                               fieldLabel: '<b>유통구조</b>',
                               labelWidth: 60,
                               reference: 'dstr_chn',
                               itemId: 'dstr_chn',
                               name: 'dstr_chn',
                               publishes: 'value',
                               displayField: 'CODE_NM',
                               valueField: 'CODE_ID',
                               margin: '0 5 0 0',
                               store: {
                                   type: 'TcodeAll',
                                   autoLoad: true,    
                                   autoDestroy: true
                               },
                               minChars: 0,
                               //width: 120,
                               queryMode: 'local',
                               listeners: {
                                   //change: 'onChangeBiz'
                               }
                           },
                           {
                               xtype: 'textfield',
                               labelAlign: 'right',
                               msgTarget: 'side',
                               allowBlank: true,
                               readOnly: false,
                               width: 230,
                               fieldLabel: '<b>거래처명</b>',
                               reference: 'cust_nm',
                               name: 'cust_nm',
                               labelWidth: 80 
                           },
                           {
                               xtype: 'textfield',
                               labelAlign: 'right',
                               msgTarget: 'side',
                               allowBlank: true,
                               readOnly: false,
                               width: 230,
                               fieldLabel: '<b>영업담당</b>',
                               reference: 'user_nm',
                               name: 'user_nm',
                               labelWidth: 60,
                               margin: '0 5 0 0'
                           },    /*
                           {
                               xtype: 'combobox',
                               labelAlign: 'right',
                               msgTarget: 'side',
                               allowBlank: true,
                               readOnly: false,
                               fieldLabel: '<b>견적상태</b>',     
                               labelWidth: 60, 
                               reference: 'status_cd',
                               store: {
                                   fields: [{ name: 'code' }, { name: 'cdnm' } ],
                                   data: {
                                       items: [
                                             { cdnm: '전체', code: '' },
                                             { cdnm: '임시', code: '0' },
                                             { cdnm: '상신', code: '1' },
                                             { cdnm: '승인', code: '2' },
                                             { cdnm: '반려', code: '3' }
                                       ]
                                   },
                                   proxy: {
                                       type: 'memory',
                                       reader: {
                                           type: 'json',
                                           rootProperty: 'items'
                                       }
                                   }
                               },
                               flex: 1,
                               minChars: 1,
                               queryMode: 'local',
                               publishes: 'value',
                               displayField: 'cdnm',
                               valueField: 'code',
                               hideTrigger: false,
                               margin: '0 5 0 0'
                           },  */
                           {
                               xtype: 'button',
                               iconCls: 'fa fa-search',
                               text: '검색',
                               handler: 'findList3'
                           }
	                   ]
	               }
    ],

    items: [
		{
		    header: false,
		    region: 'center',
		    itemId: 'center',
		    xtype: 'estimateList3', 
		    listeners: {
		        select: 'itemclick3'
		    }

		}, {
		    title: '상세견적',

		    scrollable: false,
		    x: 10, y: 10,
		    region: 'east',
		    itemId: 'east',       
		    collapsed: true,
		    layout: 'fit',
		    width: 1200,
		    minWidth: 850,
		    maxWidth: 1920,
		    items: {
		        xtype: 'estimateDetail3'
		    }
		}
    ]
   
});
      

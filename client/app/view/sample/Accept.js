
Ext.define('Ysn.view.sample.Accept',{
    extend: 'Ext.grid.Panel',
    xtype: 'sampleaccept',
    requires: [
        'Ysn.view.sample.AcceptController',
        'Ysn.view.sample.AcceptModel',
		'Ysn.store.SampleAccept',
		'Ext.grid.filters.Filters',
		'Ext.toolbar.Paging'
    ],
    
    controller: 'acceptcontrol',
    viewModel: {
        type: 'sample-accept'
    },
	store: {
        type: 'samlpeaccept', 
		autoLoad: true,
        autoDestroy: true
    }, 
	style: {'borderTop':'1px solid gray'},
    columnLines: true,
	multiColumnSort: true, 
	plugins: 'gridfilters',
	columns: [
            {text: "샘플품목", width: 200, dataIndex: 'ITEM_NM', sortable: true,locked: true,  
			 filter: {
				 type: 'string',
				 itemDefaults: {
					emptyText: '품목입력..'
				}
             }
			},
            {text: "차수",  width: 70, dataIndex: 'SMR_CHASU', sortable: true,locked: true,   
			 filter: {
				type: 'string',
				itemDefaults: {
					emptyText: '차수입력...'
				}
		     }
			},
            {text: "거래처", width: 125, dataIndex: 'COMPANY_CD', sortable: true,locked: true  },
            {text: "영업담당", width: 125, dataIndex: 'EUSER_NM', sortable: true, locked: true  },
			{text: "접수담당", width: 125, dataIndex: 'QRUSER_NM', sortable: true},
			{text: "검토자", width: 125, dataIndex: 'RAUSER_NM', sortable: true},
			{text: "진행상태", width: 125, dataIndex: 'SMP_STATUS_NM', sortable: true},
			{text: "요청일", width: 125, dataIndex: 'SMR_RQDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true, filter: true},
			{text: "요청철회일", width: 125, dataIndex: 'SMR_BKDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true},
			{text: "접수일", width: 125, dataIndex: 'SMR_RRDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true},
			{text: "요청반려일", width: 125, dataIndex: 'SMR_FBDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true},
			{text: "검토승인일", width: 125, dataIndex: 'SMR_PRDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true},
			{text: "완료예정일", width: 125, dataIndex: 'SMR_ORDERDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true},
			{text: "배송선적일", width: 125, dataIndex: 'SHIP_PDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'),sortable: true},
			{text: "샘플수령일", width: 125, dataIndex: 'SMR_PODATE',renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true}
        ],
   scrollable: true, 
   height: 700,
   width: 1600,
   syncRowHeight: false,
			listeners: {
			//itemclick: function(dataview, record, item, index, e) { 
				//Ysn.view.main.Main.down('#east').show();
            //}
		itemclick: function(dataview, record, item, index, e) {  
       }

    } 
});

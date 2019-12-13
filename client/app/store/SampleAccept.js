Ext.define('Ysn.store.SampleAccept', {
    extend: 'Ext.data.Store',

    alias: 'store.samlpeaccept',

    fields: [
        {name: 'COMPANY_CD', type: 'string'},
		{name: 'SMR_CD', type: 'string'},
		{name: 'SMR_CHASU', type: 'string'},
		{name: 'ITEM_CD', type: 'string'},
		{name: 'ITEM_NM', type: 'string'},
		{name: 'EUSER_CD', type: 'string'},
		{name: 'EUSER_NM', type: 'string'},
		{name: 'QRUSER_CD', type: 'string'},
		{name: 'QRUSER_NM', type: 'string'},
		{name: 'QDEPT_CD', type: 'string'},
		{name: 'QDEPT_NM', type: 'string'},
		{name: 'RRUSER_CD', type: 'string'},
		{name: 'RRUSER_NM', type: 'string'},
		{name: 'RAUSER', type: 'string'},
		{name: 'RAUSER_NM', type: 'string'},
		{name: 'SMP_STATUS', type: 'string'},
		{name: 'SMP_STATUS_NM', type: 'string'},
		{name: 'SMR_RQDATE', type: 'date', dateFormat:'Ymd'},
		{name: 'SMR_BKDATE', type: 'date', dateFormat:'Ymd'},
		{name: 'SMR_RRDATE', type: 'date', dateFormat:'Ymd'},
		{name: 'SMR_FBDATE', type: 'date', dateFormat:'Ymd'},
		{name: 'SMR_PRDATE', type: 'date', dateFormat:'Ymd'},
		{name: 'PRDT_PDATE', type: 'date', dateFormat:'Ymd'},
		{name: 'SHIP_PDATE', type: 'date', dateFormat:'Ymd'},
		{name: 'SMR_RADATE', type: 'date', dateFormat:'Ymd'},
		{name: 'SMR_PODATE', type: 'date', dateFormat:'Ymd'},
		{name: 'SMR_ORDERDATE', type: 'date', dateFormat:'Ymd'},
		{name: 'SHIP_PDATE', type: 'date', dateFormat:'Ymd'}, 
	    {name: 'PROJECT_POSS', type: 'string'} 
    ],

    proxy: {
        type: 'ajax',
        url: 'data/SampleAccept.json',
        reader: {
            type: 'json',
            rootProperty: 'data' 
        }
	},
   autoLoad: true,
   pageSize: 10
});
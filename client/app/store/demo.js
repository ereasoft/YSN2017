Ext.define('Ysn.store.demo', {
    extend: 'Ext.data.Store',

    alias: 'store.demo',

    fields: [
		{name: 'cd1', type: 'string'},
        {name: 'cd2', type: 'string'},
		{name: 'cd3', type: 'string'},
		{name: 'cd4', type: 'string'},
		{name: 'cd5', type: 'string'},
		{name: 'cd6', type: 'string'},
		{name: 'cd7', type: 'string'},
		{name: 'cd8', type: 'string'},
		{name: 'cd9', type: 'string'},
		{name: 'cd10', type: 'string'},
		{name: 'cd11', type: 'string'},
		{name: 'cd12', type: 'string'},
		{name: 'cd13', type: 'string'},
		{name: 'cd14', type: 'string'},
		{name: 'cd15', type: 'string'},
		{name: 'cd16', type: 'string'},
		{name: 'cd17', type: 'string'},
		{name: 'cd18', type: 'string'},
		{name: 'date1', type: 'date', dateFormat:'Ymd'},
		{name: 'date2', type: 'date', dateFormat:'Ymd'},
		{name: 'date3', type: 'date', dateFormat:'Ymd'},
		{name: 'date4', type: 'date', dateFormat:'Ymd'},
		{name: 'date5', type: 'date', dateFormat:'Ymd'}  
    ],

    proxy: {
        type: 'ajax',
        url: '/data/demo.json',
        reader: {
            type: 'json',
            rootProperty: 'data' 
        }
	},
   autoLoad: true
});
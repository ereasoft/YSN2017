Ext.define('Ysn.model.mainUserBadCustList', {
            extend: 'Ext.data.Model', 
            fields: [  
                { name: 'CUST_CD', type: 'string' },
				{ name: 'CUST_NM', type: 'string' }
            ]  
});

Ext.define('Ysn.model.mainUserBadInqList', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'INQ_STATUS', type: 'string' },
        { name: 'INQ_STATUS_NM', type: 'string' },
        { name: 'INQ_RUSER_CD', type: 'string' },
        { name: 'INQ_RUSER_NM', type: 'string' },
        { name: 'INQ_TYPE_NM', type: 'string' },
        { name: 'INQ_SDATE', type: 'date', dateFormat: 'Ymd' }, 
        { name: 'INQ_YN', type: 'string' } 
    ]
});

Ext.define('Ysn.model.mainSmrRequestList', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'SMR_CD', type: 'string' },
        { name: 'SMR_CHASU', type: 'string' },
        { name: 'EUSER_NM', type: 'string' },
        { name: 'SMR_RQDATE', type: 'date', dateFormat: 'Ymd' }
    ]
});

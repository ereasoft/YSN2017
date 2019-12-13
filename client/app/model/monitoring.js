Ext.define('Ysn.model.sampleAnalysisOrder', {   
            extend: 'Ext.data.Model', 
            fields: [
                { name: 'IDX', type: 'string' },
                { name: 'COLTYPE', type: 'string' },
				{ name: 'ITEM_TYPE_NM', type: 'string' },
				{ name: 'SMSTAT_200', type: 'string' },
				{ name: 'SMSTAT_400', type: 'string' },
				{ name: 'SMSTAT_500', type: 'string' },
				{ name: 'CURR_CNT', type: 'string' },
				{ name: 'OVER_CNT', type: 'string' },
                { name: 'LEAD_TIME', type: 'string' } 
            ]  
});








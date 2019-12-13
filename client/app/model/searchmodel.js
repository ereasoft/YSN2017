Ext.define('Ysn.model.schtcode', {  
            extend: 'Ext.data.Model', 
            fields: [  
                {name: 'CODE_ID', type: 'string'},
				{name: 'CODE_NM', type: 'string'}  
            ]  
});  

Ext.define('Ysn.model.schdeptcode', {  
            extend: 'Ext.data.Model', 
            fields: [  
                {name: 'COMPANY_CD', type: 'string'},
				{name: 'DEPT_CD', type: 'string'},
				{name: 'DEPT_NM', type: 'string'} 
            ]  
});   
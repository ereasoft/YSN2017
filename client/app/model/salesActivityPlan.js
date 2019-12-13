Ext.define('Ysn.model.salesActivityPlan', {
    extend  : 'Sch.model.Event',
    
	startDateField  : 'START_DATE',
    endDateField    : 'END_DATE',

    // just rename the fields
    resourceIdField : 'SA_TYPE',
    nameField       : 'SA_SUBJECT',

    fields      : [
        // completely change the definition of fields
        { name: 'START_DATE', type: 'date', dateFormat : 'YmdHis' }, //시작일
        { name: 'END_DATE', type: 'date', dateFormat : 'YmdHis' },   //종료일
		{ name: 'SA_CD', type: 'string'}, //일정 KEY
		{ name: 'SA_TYPE', type: 'string'}, //활동유형
		{ name: 'SA_SUBJECT', type: 'string'} //활동제목
    ]
});

Ext.define('Ysn.model.salesActivityDetail', {
    extend  : 'Ext.data.Model',  

	fields: [  
				{mapping: 'SA_TYPE', name:'sa_type', type: 'string'},
				{mapping: 'SA_TYPE_NM', name:'sa_type_nm', type: 'string'},
				{mapping: 'SA_CD', name:'sa_cd', type: 'string'},
				{mapping: 'USER_CD', name:'user_cd', type: 'string'},
				{mapping: 'USER_NM', name:'user_nm', type: 'string'},
				{mapping: 'DEPT_CD', name:'dept_cd', type: 'string'},
				{mapping: 'DEPT_NM', name:'dept_nm', type: 'string'},
				{mapping: 'SA_SDATE', name:'sa_sdate', type: 'date', dateFormat : 'Ymd'},
		        {mapping: 'SA_SDATE_TIME', name:'sa_sdate_time', type: 'string' },
				{mapping: 'SA_EDATE', name:'sa_edate', type: 'date', dateFormat : 'Ymd'}, 
				{mapping: 'SA_EDATE_TIME', name:'sa_edate_time', type: 'string' }, 
                {mapping: 'CUST_CD', name:'cust_cd', type: 'string'}, 
				{mapping: 'CUST_NM', name:'cust_nm', type: 'string'},
				{mapping: 'SA_KEYMAN_CDS', name:'km_cds', type: 'string'},
				{mapping: 'SA_KEYMAN_NMS', name:'km_nms', type: 'string'}, 
				{mapping: 'SA_CNCT', name:'sa_cnct', type: 'string'},
				{mapping: 'SA_CNCT_NM', name:'sa_cnct_nm',type: 'string'},
				{mapping: 'PJT_CD', name:'pjt_cd', type: 'string'},
				{mapping: 'PJT_NM', name:'pjt_nm', type: 'string'},
				{mapping: 'SA_SUBJECT', name:'sa_subject', type: 'string'},		        
				{mapping: 'SA_BODY', name:'sa_body', type: 'string'},
				{mapping: 'SA_COMMENT', name:'sa_comment', type: 'string'},
				{mapping: 'EDIT_YN', name:'edit_yn', type: 'string'},
				{mapping: 'SA_TARGETS', name:'sa_targets', type: 'string'},
				{mapping: 'CMT_YN', name:'cmt_yn', type: 'string'},
				{mapping: 'USER_CDS', name:'user_cds', type: 'string'},
				{mapping: 'USER_NMS', name:'user_nms', type: 'string'},
				{mapping: 'USER_NMS_VIEW', name:'user_nms_view', type: 'string'}      
            ]  
});

Ext.define('Ysn.model.salesActivityList', {
    extend  : 'Ext.data.Model',  

	fields: [  
				{mapping: 'SA_TYPE', name:'SA_TYPE', type: 'string'},
				{mapping: 'SA_TYPE_NM', name:'SA_TYPE_NM', type: 'string'},
				{mapping: 'SA_CD', name:'SA_CD', type: 'string'},
				{mapping: 'USER_CD', name:'USER_CD', type: 'string'},
				{mapping: 'USER_NM', name:'USER_NM', type: 'string'},
				{mapping: 'DEPT_CD', name:'DEPT_CD', type: 'string'},
				{mapping: 'DEPT_NM', name:'DEPT_NM', type: 'string'},
				{mapping: 'SA_SDATE', name:'SA_SDATE', type: 'date', dateFormat : 'Ymd'},  
				{mapping: 'KM_NMS', name:'KM_NMS', type: 'string'},  
				{mapping: 'SA_CNCT_NM', name:'SA_CNCT_NM',type: 'string'},
				{mapping: 'PJT_CD', name:'PJT_CD', type: 'string'}, 
				{mapping: 'SA_SUBJECT', name:'SA_SUBJECT', type: 'string'},	        
				{mapping: 'SA_BODY', name:'SA_BODY', type: 'string'},
				{mapping: 'SA_COMMENT', name:'SA_COMMENT', type: 'string'},  
				{mapping: 'CMT_YN', name:'CMT_YN', type: 'string'}
            ]  
});

Ext.define('Ysn.model.salesCommentList', {
    extend  : 'Ext.data.Model',  

	fields: [   
				{mapping: 'SA_TARGET', name:'SA_TARGET', type: 'string'},
				{mapping: 'SA_CD', name:'SA_CD', type: 'string'},
		        {mapping: 'SA_SDATE', name:'SA_SDATE', type: 'date', dateFormat : 'Ymd'},  
				{mapping: 'USER_CD', name:'USER_CD', type: 'string'},
				{mapping: 'USER_NM', name:'USER_NM', type: 'string'},
		        {mapping: 'CUST_CD', name:'CUST_CD', type: 'string'},
				{mapping: 'CUST_NM', name:'CUST_NM', type: 'string'},
				{mapping: 'DEPT_CD', name:'DEPT_CD', type: 'string'},
				{mapping: 'DEPT_NM', name:'DEPT_NM', type: 'string'},  
				{mapping: 'SA_SUBJECT', name:'SA_SUBJECT', type: 'string'},	        
				{mapping: 'SA_BODY', name:'SA_BODY', type: 'string'},
				{mapping: 'SA_COMMENT', name:'SA_COMMENT', type: 'string'} 
            ]  
});

Ext.define('Ysn.model.salesMonitoringList', {
    extend  : 'Ext.data.Model',  

	fields: [  
				{name: 'UP_DEPT_NM', type: 'string'},
				{name: 'DEPT_NM', type: 'string'},
				{name: 'USER_NM', type: 'string'},
				{name: 'SUM_1', type: 'int'},
				{name: 'SUM_2', type: 'int'},
				{name: 'SUM_3', type: 'int'},
				{name: 'SUM_4', type: 'int'},
				{name: 'SUM_5', type: 'int'},
				{name: 'SUM_6', type: 'int'},
				{name: 'SUM_7', type: 'int'},
				{name: 'SUM_8', type: 'int'},
				{name: 'SUM_9', type: 'int'},
				{name: 'SUM_10', type: 'int'},
				{name: 'SUM_11', type: 'int'},
				{name: 'SUM_12', type: 'int'} 
            ]  
});
Ext.define('Ysn.model.boardList', {   
            extend: 'Ext.data.Model', 
            fields: [  
                { name: 'COMPANY_CD', type: 'string' },
				{ name: 'COMP_NM', type: 'string' },
				{ name: 'BBS_CD', type: 'string'},
				{ name: 'USER_CD', type: 'string' },
				{ name: 'USER_NM', type: 'string' },
				{ name: 'USER_NM_STR', type: 'string' },
				{ name: 'BBS_RDATE', type: 'date', dateFormat: 'Ymd' },
				{ name: 'BBS_SUBJECT', type: 'string' },
				{ name: 'BBS_CONTENTS', type: 'string' },
				{ name: 'MENU_ID', type: 'string' },
				{ name: 'USE_YN', type: 'string'},
				{ name: 'CMT_CNT', type: 'string' } 
            ]  
});  

Ext.define('Ysn.model.boardDetail', {
    extend: 'Ext.data.Model',
    fields: ['DETAIL', 'CMT_LIST']
});



Ext.define('Ysn.model.boardCmtList', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'COMPANY_CD', type: 'string' },
        { name: 'BBS_CD', type: 'string' },
        { name: 'BBD_CD', type: 'string' },
        { name: 'USER_NM', type: 'string' },
        { name: 'USER_CD', type: 'string' },
        { name: 'COMP_NM', type: 'string' },
        { name: 'BBD_CMT', type: 'string' },
        { name: 'USE_YN', type: 'string' },
        { name: 'REG_DT', type: 'date', dateFormat: 'Y-m-d'}
    ]
});

Ext.define('Ysn.model.boardCmtList2', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'company_cd', mapping: 'COMPANY_CD', type: 'string' },
        { name: 'bbs_cd', mapping: 'BBS_CD', type: 'string'   },
        { name:'bbd_cd', mapping: 'BBD_CD', type: 'string' },
        { name:'user_nm', mapping: 'USER_NM', type: 'string' },
        { name: 'user_cd', mapping: 'USER_CD', type: 'string'    },
        { name:'comp_nm', mapping: 'COMP_NM', type: 'string' },
        { name:'bbd_cmt', mapping: 'BBD_CMT', type: 'string' },
        { name:'use_yn', mapping: 'USE_YN', type: 'string' },
        { name: 'reg_dt', mapping: 'REG_DT', type: 'date', dateFormat: 'Y-m-d'}
    ]
});



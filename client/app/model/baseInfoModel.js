Ext.define( 'Ysn.model.orderTargetList', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'BASE_YY', type: 'string' },
        { name: 'UP_DEPT_CD', type: 'string' },
        { name: 'UP_DEPT_NM', type: 'string' },
        { name: 'DEPT_CD', type: 'string' },
        { name: 'DEPT_NM', type: 'string' },
        { name: 'USER_CD', type: 'string' },
        { name: 'USER_NM', type: 'string' },
        { name: 'DSTR_TYPE', type: 'string' },
        { name: 'DSTR_TYPE_NM', type: 'string' },
        { name: 'BIZ_TYPE', type: 'string' },
        { name: 'BIZ_TYPE_NM', type: 'string' },
        { name: 'ITEM_TYPE', type: 'string' },
        { name: 'ITEM_TYPE_NM', type: 'string' },
        { name: 'CUST_CD', type: 'string' },
        { name: 'CUST_NM', type: 'string' },
        { name: 'EUSER_CD', type: 'string' },
        { name: 'EUSER_NM', type: 'string' },
        { name: 'MO1', type: 'string' },
        { name: 'MO2', type: 'string' },
        { name: 'MO3', type: 'string' },
        { name: 'MO4', type: 'string' },
        { name: 'MO5', type: 'string' },
        { name: 'MO6', type: 'string' },
        { name: 'MO7', type: 'string' },
        { name: 'MO8', type: 'string' },
        { name: 'MO9', type: 'string' },
        { name: 'MO10', type: 'string' },
        { name: 'MO11', type: 'string' },
        { name: 'MO12', type: 'string' },
        { name: 'TOTAL', type: 'string' }
    ]
} );

Ext.define( 'Ysn.model.nationInfoList', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'NAT_CD', type: 'string' },
        { name: 'NAT_NM', type: 'string' },
        { name: 'NAT_ENG_NM', type: 'string' },
        { name: 'NAT_ORDER', type: 'string' },
        { name: 'USE_YN', type: 'string' }
    ]
} );

Ext.define( 'Ysn.model.baseCrnyInfoList', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'BASE_YR', type: 'string' },
        { name: 'BASE_CRNY', type: 'string' },
        { name: 'EXCH_RATE', type: 'string' },
        { name: 'CRNY_ORDER', type: 'string' },
        { name: 'USE_YN', type: 'string' }
    ]
} );


Ext.define( 'Ysn.model.projectMgrDetail', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'pjt_cd', mapping: 'PJT_CD', type: 'string' },
        { name: 'pjt_nm', mapping: 'PJT_NM', type: 'string' },
        { name: 'smp_cd', mapping: 'SMP_CD', type: 'string' },
        { name: 'smp_chasu', mapping: 'SMP_CHASU', type: 'string' },
        { name: 'cust_cd', mapping: 'CUST_CD', type: 'string' },
        { name: 'cust_nm', mapping: 'CUST_NM', type: 'string' },
        { name: 'user_cd', mapping: 'USER_CD', type: 'string' },
        { name: 'user_nm', mapping: 'USER_NM', type: 'string' },
        { name: 'dept_cd', mapping: 'DEPT_CD', type: 'string' },
        { name: 'dept_nm', mapping: 'DEPT_NM', type: 'string' },
        { name: 'base_crny', mapping: 'BASE_CRNY', type: 'string' },
        { name: 'biz_type', mapping: 'BIZ_TYPE', type: 'string' },
        { name: 'biz_type_nm', mapping: 'BIZ_TYPE_NM', type: 'string' },
        { name: 'dstr_type', mapping: 'DSTR_TYPE', type: 'string' },
        { name: 'dstr_type_nm', mapping: 'DSTR_TYPE_NM', type: 'string' },
        { name: 'euser_cd', mapping: 'EUSR_CD', type: 'string' },
        { name: 'euser_nm', mapping: 'EUSR_NM', type: 'string' },
        { name: 'sdate', mapping: 'PJT_SDATE', type: 'date', dateFormat: 'Ymd' },
        { name: 'edate', mapping: 'PJT_EDATE', type: 'date', dateFormat: 'Ymd' },
        { name: 'end_yn', mapping: 'END_YN', type: 'string' },
        { name: 'use_yn', mapping: 'USE_YN', type: 'string' },
    ]
} );


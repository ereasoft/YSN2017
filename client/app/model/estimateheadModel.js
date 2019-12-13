Ext.define( 'Ysn.model.\estimateheadModel.', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idx', type: 'int' },
        { name: 'estimate_id', type: 'string' },
        { name: 'form_lang', type: 'string' },
        { name: 'form_type', type: 'string' },
        { name: 'form_id', type: 'string' },
        { name: 'dstr_type', type: 'string' },
        { name: 'user_cd', type: 'string' },
        { name: 'user_nm', type: 'string' },
        { name: 'estimate_date', type: 'date' },
        { name: 'cust_cd', type: 'string' },
        { name: 'ref_cd', type: 'string' },
        { name: 'ref_nm', type: 'string' },
        { name: 'submit_cd', type: 'string' },
        { name: 'submit_nm', type: 'string' },
        { name: 'currency', type: 'string' },
        { name: 'subject', type: 'string' },
        { name: 'summary_yn', type: 'string' },   
        { name: 'remark', type: 'string' },
        { name: 'create_id', type: 'string' },
        { name: 'create_date', type: 'date' },
        { name: 'modify_id', type: 'string' },
        { name: 'modify_date', type: 'date' },
        { name: 'del_yn', type: 'string' }
    ]
} );
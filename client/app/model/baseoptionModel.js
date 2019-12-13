Ext.define( 'Ysn.model.baseoptionModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idx', type: 'int' },   
        { name: 'prod_code', type: 'string' },
        { name: 'prod', type: 'string' },
        { name: 'sub_prod', type: 'string' },
        { name: 'prod_option', type: 'string' }, 
        { name: 'global_basic', type: 'float' },
        { name: 'global_sample', type: 'float' },
        { name: 'japan_basic', type: 'float' },
        { name: 'japan_sample', type: 'float' },
        { name: 'remark', type: 'string' },
        { name: 'create_id', type: 'string' },
        { name: 'create_date', type: 'date' },
        { name: 'modify_id', type: 'string' },
        { name: 'modify_date', type: 'date' },
        { name: 'del_yn', type: 'string' }
    ]
} );
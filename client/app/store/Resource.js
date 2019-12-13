Ext.define('Ysn.store.Resource', {
    extend  : 'Sch.data.ResourceStore',
    model   : 'Ysn.model.Resource',
    storeId : 'resource',
    proxy   : 'memory',
    data    : [
        { Id : 'SATYPE_100', Name : '잠재기회', Color : '#03b4d5' },
        { Id : 'SATYPE_200', Name : '수주영업', Color : '#9cc96b' },
        { Id : 'SATYPE_300', Name : '협업지원', Color : '#ffc107' },
        { Id : 'SATYPE_400', Name : '업무보고', Color : '#e44959' },
        { Id : 'SATYPE_999', Name : '공유일정', Color : '#949495' } 
    ]
});
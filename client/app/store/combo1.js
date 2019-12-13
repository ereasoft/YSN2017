Ext.define('Ysn.store.Combo1', {
   extend: 'Ext.data.ArrayStore',
   alias: 'store.combo1',

   fields: [
        'deptcd',
        'deptname'
    ],
    storeId: 'combo1',

    data: [
        ["0","전체"],
        ["1","영업관리팀"],
		["2","국내영업팀"],
		["3","해외영업팀"],
		["4","마켓팅팀"],
		["5","중국영업팀"], 
		["6","중국영업팀2"] 
    ]
});

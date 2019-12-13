Ext.define('Ysn.store.selCompany', {
    extend: 'Ext.data.Store',
    alias: 'store.selCompany',

    model: 'Ysn.model.schdeptcode',
    storeId: 'selCompany',

    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/CodeList/selCompany',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            //store.insert(0, { DEPT_CD: '', DEPT_NM: Locale.getMsg('전체') });
            //Ext.getCmp('customer-search').down('#user_cd').store.removeAll();
        }
    },
    autoLoad: false,
    autoDestroy: false

});


Ext.define('Ysn.store.selPart1', {
    extend: 'Ext.data.Store',
    alias: 'store.selPart1',

    model: 'Ysn.model.schdeptcode',
    storeId: 'selPart1',

    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/CodeList/selPart1',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            store.insert(0, { DEPT_CD: '', DEPT_NM: Locale.getMsg('전체') });
            //Ext.getCmp('customer-search').down('#user_cd').store.removeAll();
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.selPart2', {
    extend: 'Ext.data.Store',
    alias: 'store.selPart2',

    model: 'Ysn.model.schdeptcode',
    storeId: 'selPart2',

    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/CodeList/selPart2',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            store.insert(0, { DEPT_CD: '', DEPT_NM: Locale.getMsg('전체') });
            //Ext.getCmp('customer-search').down('#user_cd').store.removeAll();
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.selPart3', {
    extend: 'Ext.data.Store',
    alias: 'store.selPart3',

    model: 'Ysn.model.schdeptcode',
    storeId: 'selPart3',

    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/CodeList/selPart3',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            store.insert(0, { DEPT_CD: '', DEPT_NM: Locale.getMsg('전체') });
            //Ext.getCmp('customer-search').down('#user_cd').store.removeAll();
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.bizgroup', {
   extend: 'Ext.data.Store',
   alias: 'store.bizgroup',

    model : 'Ysn.model.schdeptcode',
    storeId: 'bizgroup',

    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/CodeList/DePart3',			 
			reader: {
				type: 'json',
				rootProperty: '' 
			}
	},
	listeners: {
	    load: function (store, records, successful, operation) {
	            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
                store.insert(0, {DEPT_CD: '',DEPT_NM: Locale.getMsg('전체')});
                //Ext.getCmp('customer-search').down('#user_cd').store.removeAll();
            }
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.deptgroup', {
   extend: 'Ext.data.Store',
   alias: 'store.deptgroup',

    model : 'Ysn.model.schdeptcode',
    storeId: 'deptgroup',

    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/CodeList/DePart4',			 
			reader: {
				type: 'json',
				rootProperty: 'LIST' 
			}
	},
	listeners: {
	    load: function (store, records, successful, operation) {
	        if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
              /*  store.insert(0, {DEPT_CD: '',DEPT_NM: '전체'});
				var bizCd = Ext.getCmp('customer-search').down('#bizGroup');
				if(store.data.items.length < 2){
                    Ext.getStore('usercd').load({params:{dept_cd:bizCd.getValue(),up_dept_cd:''}});
				}else{
					Ext.getStore('usercd').load({params:{dept_cd:'',up_dept_cd:bizCd.getValue()}});
				}*/
            }
    },
	autoLoad: false,
	autoDestroy: false

});
/*
deptgroupStore = Ext.define('Ysn.store.deptgroup', {
    extend: 'Ext.data.Store',
    alias: 'store.deptgroup',

    fields: [ 'LIST', 'TOTAL'],
    storeId: 'deptgroup',

    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/CodeList/DePart4?company_cd='+company_cd,			 
			reader: {
				type: 'json',
				rootProperty: ''
			}
	},
	listeners: {
            load: function(store) { 
				Ext.getStore('deptgroupsub1').loadRawData(store.data.items[0].data['LIST']);
                Ext.getStore('deptgroupsub1').insert(0, {DEPT_CD: store.data.items[0].data['TOTAL'],DEPT_NM: '전체'}); 
				Ext.getCmp('customer-search').down('#deptGroup').setValue('');
				Ext.getCmp('customer-search').down('#deptGroup').doQuery();
            }
    },
	autoLoad: false,
	autoDestroy: false

}); */

Ext.define('Ysn.store.deptgroupsub1', {
   extend: 'Ext.data.Store',
   alias: 'store.deptgroupsub1',

    model : 'Ysn.model.schdeptcode',
    storeId: 'deptgroupsub1',

    proxy: {
			type: 'memory', 	 
			reader: {
				type: 'json',
				rootProperty: 'LIST'
			}
	},
	listeners: {
	    load: function (store, records, successful, operation) {
	        if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
                //store.insert(0, {DEPT_CD: '',DEPT_NM: '전체'});
            }
    },
	autoLoad: false,
	autoDestroy: false

});


Ext.define('Ysn.store.usercd', {
   extend: 'Ext.data.Store',
   alias: 'store.usercd',

   fields: [
			{name: 'USER_CD', type: 'string'},
			{name: 'USER_NM', type: 'string'},
			{name: 'DEPT_NM', type: 'string'} 

    ],
    storeId: 'usercd',

    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/CodeList/DePartUser',			 
			reader: {
				type: 'json',
				rootProperty: '' 
			}
	},
	listeners: {
	    load: function (store, records, successful, operation) {
	        if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
                store.insert(0, {USER_CD: '',USER_NM: Locale.getMsg('전체')});
            }
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.dstr_usercd', {
   extend: 'Ext.data.Store',
   alias: 'store.dstr_usercd',

   fields: [
			{name: 'USER_CD', type: 'string'},
			{name: 'USER_NM', type: 'string'},
			{name: 'DEPT_NM', type: 'string'} 

    ],
    storeId: 'dstr_usercd',

    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/CodeList/DstrUser',			 
			reader: {
				type: 'json',
				rootProperty: '' 
			}
	},
	listeners: {
	    load: function (store, records, successful, operation) {
	        if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
                store.insert(0, {USER_CD: '',USER_NM: Locale.getMsg('전체')});
            }
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.Tcode', {
   extend: 'Ext.data.Store',
   alias: 'store.Tcode',

    model: 'Ysn.model.schtcode', 
    storeId: 'Tcode',

    proxy: {
			method: "GET",
			type: 'ajax',
			url: '/CodeList/TCode',			 
			reader: {
				type: 'json',
				rootProperty: '' 
			}
	},
	listeners: {
	    load: function (store, records, successful, operation) {
	        if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
                //store.insert(0, {CODE_ID: '',CODE_NM: '선택'});
            }
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.TcodeAll', {
   extend: 'Ext.data.Store',
   alias: 'store.TcodeAll',

    model: 'Ysn.model.schtcode', 
    storeId: 'TcodeAll',

    proxy: {
			method: "GET",
			type: 'ajax',
			url: '/CodeList/TCode',			 
			reader: {
				type: 'json',
				rootProperty: '' 
			}
	},
	listeners: {
	    load: function (store, records, successful, operation) { 
		    
				if(!Ysn.Util.OnsessOut(operation._response.responseText)) {
					return false;
				}else{
                    store.insert(0, {CODE_ID: '',CODE_NM: Locale.getMsg('전체')});
				}
		}
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.dmoscd', {
   extend: 'Ext.data.Store',
   alias: 'store.dmoscd',
   
    model: 'Ysn.model.schtcode', 
    storeId: 'dmoscd',

    proxy: {
			method: "GET",
			type: 'ajax',
			url: '/CodeList/TCode?up_code_id=DMOS_CD&lang=' + localeCd,
			reader: {
				type: 'json',
				rootProperty: '' 
			}
	},
	listeners: {
	    load: function (store, records, successful, operation) {
	        if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
                store.insert(0, {CODE_ID: '',CODE_NM: Locale.getMsg('전체')});
            }
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.custgrade', {
   extend: 'Ext.data.Store',
   alias: 'store.custgrade',

    model: 'Ysn.model.schtcode', 
    storeId: 'custgrade',

    proxy: {
			method: "GET",
			type: 'ajax',
			url: '/CodeList/TCode?up_code_id=CUST_GRADE&lang=' + localeCd,			 
			reader: {
				type: 'json',
				rootProperty: '' 
			}
	},
	listeners: {
	    load: function (store, records, successful, operation) {
	        if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
                store.insert(0, {CODE_ID: '',CODE_NM: Locale.getMsg('전체')});
            }
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.trmspay', {
   extend: 'Ext.data.Store',
   alias: 'store.trmspay',

    model: 'Ysn.model.schtcode', 
    storeId: 'trmspay',

    proxy: {
			method: "GET",
			type: 'ajax',
			url: '/CodeList/TCode?up_code_id=TRMS_PAY&lang=' + localeCd,
			reader: {
				type: 'json',
				rootProperty: '' 
			}
	},
	listeners: {
	    load: function (store, records, successful, operation) {
	        if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
                store.insert(0, {CODE_ID: '',CODE_NM: Locale.getMsg('전체')});
            }
    },
	autoLoad: false,
	autoDestroy: false

});


Ext.define('Ysn.store.sayn', {
   extend: 'Ext.data.Store',
   alias: 'store.sayn',

    model: 'Ysn.model.schtcode', 
    storeId: 'sayn',

    proxy: {
			method: "GET",
			type: 'ajax',
			url: '/CodeList/TCode?up_code_id=SA_YN&lang=' + localeCd,
			reader: {
				type: 'json',
				rootProperty: '' 
			}
	},
	listeners: {
	    load: function (store, records, successful, operation) {
	        if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
                store.insert(0, {CODE_ID: '',CODE_NM: Locale.getMsg('전체')});
            }
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.nationAll', {
   extend: 'Ext.data.Store',
   alias: 'store.nationAll',

   fields: [
			{name: 'NAT_CD', type: 'string'},
			{name: 'NAT_NM', type: 'string'}  

    ],
    storeId: 'nation',

    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/CodeList/Nation?lang=' + localeCd,			 
			reader: {
				type: 'json',
				rootProperty: '' 
			}
	},
	listeners: {
	    load: function (store, records, successful, operation) {
	        if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
                store.insert(0, {NAT_CD: '',NAT_NM: Locale.getMsg('전체')});
            }
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.nation', {
   extend: 'Ext.data.Store',
   alias: 'store.nation',

   fields: [
			{name: 'NAT_CD', type: 'string'},
			{name: 'NAT_NM', type: 'string'}  

    ],
    storeId: 'nation',

    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/CodeList/Nation?lang=' + localeCd,
			reader: {
				type: 'json',
				rootProperty: '' 
			}
	},
	listeners: {
            load: function (store, records, successful, operation) {
	        if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
                store.insert(0, {NAT_CD: '',NAT_NM: Locale.getMsg('전체')});
            }
    },
	autoLoad: false,
	autoDestroy: false

});


Ext.define('Ysn.store.year', {
   extend: 'Ext.data.Store',
   alias: 'store.year',

   fields: [
			{name: 'YEAR', type: 'string'},
	        {name: 'VAL', type: 'string'} 

    ],
    storeId: 'year',  
	listeners: {
            load: function(store) { 
				for(var i=2012;i<2021;i++){
					store.insert(i,{YEAR:i,VAL:i});
				}
            }
    },
	autoLoad: true,
	autoDestroy: true

});

Ext.define('Ysn.store.month', {
   extend: 'Ext.data.Store',
   alias: 'store.month',

   fields: [
			{name: 'MONTH', type: 'string'},
	        {name: 'VAL', type: 'string'} 

    ],
    storeId: 'month',  
	listeners: {
            load: function(store) { 
				for(var i=0;i<12;i++){
					store.insert(i,{MONTH:("0" + (i+1)).slice (-2),VAL:("0" + (i+1)).slice (-2)});
				}
            }
    },
	autoLoad: true,
	autoDestroy: true

});

Ext.define('Ysn.store.div', {
    extend: 'Ext.data.Store',
    alias: 'store.div',

    fields: [
             { name: 'DIV', type: 'string' },
             { name: 'VAL', type: 'string' }

    ],
    storeId: 'div',
    listeners: {
        load: function (store) {
            for (var i = 1; i < 5; i++) {
                store.insert(i, { DIV: i + Locale.getMsg('분기'), VAL: i });
            }
        }
    },
    autoLoad: true,
    autoDestroy: true

});

Ext.define('Ysn.store.day', {
   extend: 'Ext.data.Store',
   alias: 'store.day',

   fields: [
			{name: 'DAY', type: 'string'}, 
            {name: 'VAL', type: 'string'} 

    ],
    storeId: 'day',  
	listeners: {
            load: function(store) { 
				for(var i=0;i<31;i++){
					store.insert(i,{DAY:("0" + (i+1)).slice (-2),VAL:("0" + (i+1)).slice (-2)});
				}
            }
    },
	autoLoad: true,
	autoDestroy: true

});

Ext.define('Ysn.store.time', {
   extend: 'Ext.data.Store',
   alias: 'store.time',

   fields: [
			{name: 'TIME', type: 'string'}, 
            {name: 'VAL', type: 'string'} 

    ],
    storeId: 'time',  
	listeners: {
            load: function(store) { 
				var k = 0;
				for(var i=0;i<24;i++){
					var hour = ("0" + (i)).slice(-2); 
					store.insert(k,{TIME:hour+":00",VAL:hour+"0000"});
					store.insert(k+1,{TIME:hour+":30",VAL:hour+"3000"});
					k = k+2;
				}
            }
    },
	autoLoad: true,
	autoDestroy: true

});

Ext.define('Ysn.store.itemLevel', {
   extend: 'Ext.data.Store',
   alias: 'store.itemLevel',

   fields: [
			{name: 'ITEM_LEVEL1', type: 'string'} 

    ],
    storeId: 'itemLevel',

    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/Popup/product_item_level1_Grp',			 
			reader: {
				type: 'json',
				rootProperty: '' 
			}
	},
	listeners: {
	    load: function (store, records, successful, operation) {
	        if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
                store.insert(0, {USER_CD: '',USER_NM: Locale.getMsg('선택')});
            }
    },
	autoLoad: false,
	autoDestroy: false

}); 

Ext.define('Ysn.store.sucUser', {
   extend: 'Ext.data.Store',
   alias: 'store.sucUser',

   fields: [
			{name: 'USER_CD', type: 'string'},
			{name: 'USER_NM', type: 'string'}

    ],
    storeId: 'sucUser',

    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/SampleManage/selectSucUserList',			 
			reader: {
				type: 'json',
				rootProperty: 'LIST' 
			}
	},
	listeners: {
	    load: function (store, records, successful, operation) {
	        if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
               // store.insert(0, {USER_CD: '',USER_NM: '전체'});
            }
    },
	autoLoad: false,
	autoDestroy: false

});


Ext.define('Ysn.store.suc2User', {
   extend: 'Ext.data.Store',
   alias: 'store.suc2User',

   fields: [
			{name: 'USER_CD', type: 'string'},
			{name: 'USER_NM', type: 'string'}

    ],
    storeId: 'suc2User',

    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/SampleManage/selectSuc2UserList',			 
			reader: {
				type: 'json',
				rootProperty: 'LIST' 
			}
	},
	listeners: {
	    load: function (store, records, successful, operation) {
	        if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
             //   store.insert(0, {USER_CD: '',USER_NM: '전체'});
            }
    },
	autoLoad: false,
	autoDestroy: false

});


Ext.define('Ysn.store.ItemLevel1', {
    extend: 'Ext.data.Store',
    alias: 'store.ItemLevel1',

    fields: [
             { name: 'NAME1', type: 'string' },
             { name: 'CODE1', type: 'string' }

    ],
    storeId: 'ItemLevel',

    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/CodeList/getItemSubLevel',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            store.insert(0, { CODE1: '', NAME1: Locale.getMsg('전체') });
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.ItemLevel2', {
    extend: 'Ext.data.Store',
    alias: 'store.ItemLevel2',

    fields: [
             { name: 'NAME2', type: 'string' },
             { name: 'CODE2', type: 'string' }

    ],
    storeId: 'ItemLeve2',

    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/CodeList/getItemSubLevel',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            store.insert(0, { CODE2: '', NAME2: Locale.getMsg('전체') });
        }
    },
    autoLoad: false,
    autoDestroy: false

});


Ext.define('Ysn.store.ItemLevel3', {
    extend: 'Ext.data.Store',
    alias: 'store.ItemLevel3',

    fields: [
             { name: 'NAME3', type: 'string' },
             { name: 'CODE3', type: 'string' }

    ],
    storeId: 'ItemLeve3',

    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/CodeList/getItemSubLevel',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            store.insert(0, { CODE3: '', NAME3: Locale.getMsg('전체') });
        }
    },
    autoLoad: false,
    autoDestroy: false

});


Ext.define('Ysn.store.InqItem', {
    extend: 'Ext.data.Store',
    alias: 'store.InqItem',

    model: 'Ysn.model.schtcode',
    storeId: 'InqItem',

    proxy: {
        method: "GET",
        type: 'ajax',
        url: '/CodeList/TCode?up_code_id=INQ_ITEM',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            //store.insert(0, {CODE_ID: '',CODE_NM: '선택'});
        }
    },
    autoLoad: true,
    autoDestroy: true

});

Ext.define('Ysn.store.yn', {
    extend: 'Ext.data.Store',
    alias: 'store.yn',

    fields: [ { name: 'CODE', type: 'string' } ],
    data: [{ CODE: 'Y' }, { CODE: 'N' }],
    storeId: 'yn',

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    }, 
    autoLoad: true,
    autoDestroy: true

});






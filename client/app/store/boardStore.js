Ext.define('Ysn.store.boardList', {
    extend: 'Ext.data.Store',
    alias: 'store.boardList',
    storeId: 'boardList',
    model: 'Ysn.model.boardList', 
    proxy: {
			method: "POST",
			type: 'ajax',
			url: '/Board/boardList',
			reader: {
				type: 'json',
				rootProperty: 'LIST' 
			}
	},
	listeners: {
            load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
                //console.log(store);
                Ext.getCmp('board-mboard').down('#total').setHtml('Total : ' + store.data.items.length);
            }
    },
	autoLoad: false,
	autoDestroy: false

});

Ext.define('Ysn.store.boardView', {
    extend: 'Ext.data.Store',
    alias: 'store.boardView',

    fields: ['DETAIL', 'CMT_LIST'],
    storeId: 'boardView',

    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/Board/boardDetail',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            if(!Ysn.Util.OnsessOut(operation._response.responseText)) return false; 
            //Ext.getStore('boardDetail').loadRawData(store.data.items[0].data['LIST']);
            var frm = Ext.getCmp('mboardDetail').getForm();
            var rec = store.data.items[0].data['DETAIL'];
            frm.findField('bbs_subject').setValue(rec.BBS_SUBJECT);
            frm.findField('user_nm').setValue(rec.USER_NM_STR);
            frm.findField('user_cd').setValue(rec.USER_CD);
            frm.findField('bbs_rdate').setValue(Ext.Date.parse(rec.BBS_RDATE,'Ymd'));
            frm.findField('bbs_contents').setValue(rec.BBS_CONTENTS);
            frm.findField('menuId').setValue(rec.MENU_ID);
            frm.findField('bbs_cd').setValue(rec.BBS_CD);
            frm.findField('use_yn').setValue(rec.USE_YN);
            frm.findField('cmt_cnt').setValue(rec.CMT_CNT); 
            Ext.getStore('boardCmtList').loadRawData(store.data.items[0].data['CMT_LIST']);

        }
    },
    autoLoad: false,
    autoDestroy: false

});


Ext.define('Ysn.store.boardCmtList', {
    extend: 'Ext.data.Store',
    alias: 'store.boardCmtList',

    model: 'Ysn.model.boardCmtList',
    storeId: 'boardCmtList',

    proxy: { 
        type: 'memory', 
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: { 
    },
    autoLoad: false,
    autoDestroy: false

});

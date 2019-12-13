Ext.define('Ysn.store.inquiry', {
    extend: 'Ext.data.Store',
    alias: 'store.inquiry',
    storeId: 'inquiry',
    fields: ['LIST', 'COUNT', 'ETC'],
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/ProductInquiry/inquiryList',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            if (!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            //console.log(store);
            Ext.getCmp('productinquiry-inquiry').down('#total').setHtml('Total : ' + store.data.items[0].data['COUNT']);
            Ext.getCmp('productinquiry-inquiry').down('#status_cnt').setHtml(store.data.items[0].data['ETC'][0].ETC_TOTAL.replace(/ /g, '&nbsp;'));
            Ext.getStore('inquiryList').loadRawData(store.data.items[0].data['LIST']);
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.followup', {
    extend: 'Ext.data.Store',
    alias: 'store.followup',
    storeId: 'followup',
    fields: ['LIST', 'COUNT', 'ETC'],
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/ProductInquiry/inquiryList',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            if (!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            //console.log(store);
            Ext.getCmp('productinquiry-followup').down('#total').setHtml('Total : ' + store.data.items[0].data['COUNT']);

            var chgLang = store.data.items[0].data['ETC'][0].ETC_TOTAL;

            chgLang = chgLang.replace(/건/g, Locale.getMsg('건'));
            chgLang = chgLang.replace('회신후 대기', Locale.getMsg('회신후대기'));
            chgLang = chgLang.replace('상담진행', Locale.getMsg('상담진행'));
            chgLang = chgLang.replace('상담종료', Locale.getMsg('상담종료'));
            chgLang = chgLang.replace(/ /g, '&nbsp;');

            Ext.getCmp('productinquiry-followup').down('#status_cnt').setHtml(chgLang);


            Ext.getStore('followupList').loadRawData(store.data.items[0].data['LIST']);
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.inquiryList', {
    extend: 'Ext.data.Store',
    alias: 'store.inquiryList',

    model: 'Ysn.model.inquiryList',
    storeId: 'inquiryList',

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            if (!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            //console.log(store);
            //Ext.getCmp('productinquiry-inquiry').down('#total').setHtml('Total : ' + store.data.items.length);

        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.followupList', {
    extend: 'Ext.data.Store',
    alias: 'store.followupList',

    model: 'Ysn.model.inquiryList',
    storeId: 'followupList',

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'LIST'
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
            if (!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            //console.log(store);
            //Ext.getCmp('productinquiry-inquiry').down('#total').setHtml('Total : ' + store.data.items.length);

        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.inquiryDetail', {
    extend: 'Ext.data.Store',
    alias: 'store.inquiryDetail',

    model: 'Ysn.model.inquiryDetail',
    storeId: 'inquiryDetail',

    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/ProductInquiry/inquiryDetail',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        exception: function (proxy, type, action, o, response, args) {
            Ext.MessageBox.alert('Error', response.errors.reason, function () { return true; });
        }
    },
    autoLoad: false,
    autoDestroy: false

});


Ext.define('Ysn.store.inquiryItemList', {
    extend: 'Ext.data.Store',
    alias: 'store.inquiryItemList',

    fields: ['INQ_CD', 'SEQ_NO', 'INQ_ITEM_GB', 'INQ_ITEM_NM'],
    storeId: 'inquiryItemList',

    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/ProductInquiry/inquiryItemList',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        load: function (store) {

            /*  var fielditem = Ext.getCmp('inquiryDetail').lookupReference('inq_item_grp').items;
              if(store.data.items.length > 0){
                  fielditem.items[0].setValue(store.data.items[0].data.INQ_ITEM_NM);
                  fielditem.items[0].doQuery(); 
                  fielditem.items[0].focus();
              }
              if(store.data.items.length > 1){
                  for(var i=1;i<store.data.items.length;i++){
                      fielditem.insert(fielditem.items.length-2,
                          {   xtype: 'combobox', 
                              publishes: 'inq_item_nm',  
                              displayField: 'CODE_NM',
                              valueField: 'CODE_NM', 
                              name: 'inq_item_nm', 
                              store: {
                                  type: 'Tcode'  
                              },
                              minChars: 0,
                              queryMode: 'local',
                              typeAhead: true,
                              margin: '0 5 0 0' 
                       }); 
                       fielditem.items.items[fielditem.items.length-3].store.load({params:{up_code_id:'INQ_ITEM'}});
                       fielditem.items.items[fielditem.items.length-3].setValue(store.data.items[i].data.INQ_ITEM_NM);
                  }
              }*/

        },
        exception: function (proxy, type, action, o, response, args) {
            Ext.MessageBox.alert('Error', response.errors.reason, function () { return true; });
        }
    },
    autoLoad: false,
    autoDestroy: true

});



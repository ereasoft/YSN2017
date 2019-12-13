Ext.define('Ysn.store.mainPopup', {
    extend: 'Ext.data.Store',
    alias: 'store.mainPopup',

    fields: ['LIST1', 'LIST2', 'LIST3'],
    storeId: 'mainPopup',
    
    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/Main/MainNoticePopup',
        masked: {
            xtype: 'loadmask',
            message: 'loading...'
        },
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        load: function (store, records, successful, operation) {
          //  if (!Ysn.Util.OnsessOut(operation._response.responseText)) return false;
            
            Ext.getStore('mainUserBadCustList').loadRawData(store.data.items[0].data['LIST1']);
            //Ext.getStore('mainUserBadInqList').loadRawData(store.data.items[0].data['LIST2']);
           // Ext.getStore('mainSmrRequestList').loadRawData(store.data.items[0].data['LIST3']); 
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.mainView2', {
    extend: 'Ext.data.Store',
    alias: 'store.mainView2',

    fields: ['A', 'B', 'C', 'D', 'F', 'G1', 'G2', 'G3'],
    storeId: 'mainView2',

    proxy: {
        method: "POST",
        type: 'ajax',
        url: '/Main/getMainPartner',
        masked: {
            xtype: 'loadmask',
            message: 'loading...'
        },
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        beforeload: function (store, operation) {
            var mainPl = Ext.getCmp('mainmainView2');
            var pmain1 = mainPl.down('#pmain1');
            var pmain2 = mainPl.down('#pmain2');
            var chart = mainPl.down('#chart');
            var chart2 = mainPl.down('#chart2');
            var chart3 = mainPl.down('#chart3');
            var chart4 = mainPl.down('#chart4');
            pmain1.mask('Loading...');
            pmain2.mask('Loading...');
            chart.mask('Loading...');
            chart2.mask('Loading...');
            chart3.mask('Loading...');
            chart4.mask('Loading...');
        },
        load: function (store, records, successful, operation) {
            var mainPl = Ext.getCmp('mainmainView2');
            var pmain1 = mainPl.down('#pmain1');
            var pmain2 = mainPl.down('#pmain2');
            var chart = mainPl.down('#chart');
            var chart2 = mainPl.down('#chart2');
            var chart3 = mainPl.down('#chart3');
            var chart4 = mainPl.down('#chart4');
            var Data1 = store.data.items[0].data['A'][0];
            var Data2 = store.data.items[0].data['B'][0];
            var Data3 = store.data.items[0].data['C'][0];
            var Data4 = store.data.items[0].data['D'][0];
            pmain1.down('#T1_1').setText(Data1.SMSTAT_ALL);
            pmain1.down('#T1_2').setText(Data1.SMSTAT_N010);
            pmain1.down('#T1_3').setText(Data1.SMSTAT_060);
            pmain1.down('#T1_4').setText(Data1.SMSTAT_050);
            pmain1.down('#T1_5').setText(Data1.SMSTAT_080);
            pmain1.down('#T1_6').setText(Data1.SMSTAT_070);
            pmain1.down('#T1_7').setText(Data1.SMSTAT_400);
            pmain1.down('#T1_8').setText(Data1.SMSTAT_600);
            pmain1.down('#T1_9').setText(Data1.SMSTAT_650);
            pmain1.down('#T1_10').setText(Data1.SMSTAT_900);
            pmain1.down('#T1_11').setText(Data1.SMSTAT_700);
            pmain1.down('#T1_12').setText(Data1.SMSTAT_RUAL+'%');
            pmain1.down('#T2_1').setText(Data2.SMSTAT_ALL);
            pmain1.down('#T2_2').setText(Data2.SMSTAT_N010);
            pmain1.down('#T2_3').setText(Data2.SMSTAT_060);
            pmain1.down('#T2_4').setText(Data2.SMSTAT_050);
            pmain1.down('#T2_5').setText(Data2.SMSTAT_080);
            pmain1.down('#T2_6').setText(Data2.SMSTAT_070);
            pmain1.down('#T2_7').setText(Data2.SMSTAT_400);
            pmain1.down('#T2_8').setText(Data2.SMSTAT_600);
            pmain1.down('#T2_9').setText(Data2.SMSTAT_650);
            pmain1.down('#T2_10').setText(Data2.SMSTAT_900);
            pmain1.down('#T2_11').setText(Data2.SMSTAT_700);
            pmain1.down('#T2_12').setText(Data2.SMSTAT_RUAL + '%');
            pmain2.down('#T1_1').setText(Data3.SMSTAT_N010);
            pmain2.down('#T1_2').setText(Data4.SMSTAT_N010);
            pmain2.down('#T2_1').setText(Data3.SMSTAT_060);
            pmain2.down('#T2_2').setText(Data4.SMSTAT_060);
            pmain2.down('#T3_1').setText(Data3.SMSTAT_050);
            pmain2.down('#T3_2').setText(Data4.SMSTAT_050);
            pmain2.down('#T4_1').setText(Data3.SMSTAT_080);
            pmain2.down('#T4_2').setText(Data4.SMSTAT_080);
            pmain2.down('#T5_1').setText(Data3.SMSTAT_070);
            pmain2.down('#T5_2').setText(Data4.SMSTAT_070);
            pmain2.down('#T6_1').setText(Data3.SMSTAT_400);
            pmain2.down('#T6_2').setText(Data4.SMSTAT_400);
            pmain2.down('#T7_1').setText(Data3.SMSTAT_600);
            pmain2.down('#T7_2').setText(Data4.SMSTAT_600);
            pmain2.down('#T8_1').setText(Data3.SMSTAT_650);
            pmain2.down('#T8_2').setText(Data4.SMSTAT_650);
            pmain2.down('#T9_1').setText(Data3.SMSTAT_900);
            pmain2.down('#T9_2').setText(Data4.SMSTAT_900);
            pmain2.down('#T10_1').setText(Data3.SMSTAT_700);
            pmain2.down('#T10_2').setText(Data4.SMSTAT_700);
            pmain2.down('#T11_1').setText(Data3.SMSTAT_RUAL + '%');
            pmain2.down('#T11_2').setText(Data4.SMSTAT_RUAL + '%');
            chart.getStore().loadRawData(store.data.items[0].data['F']);
            chart2.getStore().loadRawData(store.data.items[0].data['G1']);
            chart3.getStore().loadRawData(store.data.items[0].data['G2']);
            chart4.getStore().loadRawData(store.data.items[0].data['G3']);
            pmain1.unmask();
            pmain2.unmask();
            chart.unmask();
            chart2.unmask();
            chart3.unmask();
            chart4.unmask();
        }
    },
    autoLoad: false,
    autoDestroy: false

});

Ext.define('Ysn.store.mainUserBadCustList', {
    extend: 'Ext.data.Store',
    alias: 'store.mainUserBadCustList',

    model: 'Ysn.model.mainUserBadCustList',
    storeId: 'mainUserBadCustList',

    proxy: {
            type: 'memory', 
            reader: {
                type: 'json',
                rootProperty: ''
            }
	},
	listeners: {
	    load: function (store) { 
				//console.log(store);
				//Ext.getCmp('productinquiry-inquiry').down('#total').setHtml('Total : ' + store.data.items.length);
                
            }
    },
	autoLoad: true,
	autoDestroy: true

});

Ext.define('Ysn.store.mainUserBadInqList', {
    extend: 'Ext.data.Store',
    alias: 'store.mainUserBadInqList',

    model: 'Ysn.model.mainUserBadInqList',
    storeId: 'mainUserBadInqList',

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        load: function (store) { 
            store.loadRawData(Ext.getStore('mainPopup').data.items[0].data['LIST2']);
            //setTimeout(100);
           // console.log(store);
            //Ext.getCmp('productinquiry-inquiry').down('#total').setHtml('Total : ' + store.data.items.length);

        }
    },
    autoLoad: false,
    autoDestroy: true

});

Ext.define('Ysn.store.mainSmrRequestList', {
    extend: 'Ext.data.Store',
    alias: 'store.mainSmrRequestList',

    model: 'Ysn.model.mainSmrRequestList',
    storeId: 'mainSmrRequestList',

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },
    listeners: {
        load: function (store) {
            store.loadRawData(Ext.getStore('mainPopup').data.items[0].data['LIST3']);
            //setTimeout(100);
           // console.log(store);
            //Ext.getCmp('productinquiry-inquiry').down('#total').setHtml('Total : ' + store.data.items.length);

        }
    },
    autoLoad: false,
    autoDestroy: true

});
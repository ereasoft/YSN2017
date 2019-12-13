Ext.define('Ysn.view.board.mboardsearch', {
    extend: 'Ext.panel.Panel',
    xtype: 'mboard-search',

    requires: [
        'Ysn.view.board.mboardsearchController',
	    'Ysn.store.*'
    ],

    controller: 'mboard-search',

    frame: false, 
    frameBorder: 10,
    width: 1000,
    minWidth: 1000,
    minHeight: 140,
    layout: {
        type: 'table',
        columns: 4,
        tableAttrs: {
            style: {
				'padding-top' : '5px',
                width: '20%'
            }
        }

    },
    //id: 'mboard-search',
    reference: 'mboard-search',
    defaults: {
        layout: 'form',
        xtype: 'container',
        defaultType: 'textfield'
    },

    items: [
        {
            xtype: 'textfield',
            fieldLabel: Locale.getMsg('글쓴이'), 
            labelAlign: 'right',
            name: 'user_nm',
            reference: 'user_nm',
            itemId: 'user_nm',
            margin: '5 5 0 0'
        },
        {
            xtype: 'textfield',
            fieldLabel: Locale.getMsg('제목'),
            labelAlign: 'right',
            name: 'bbs_subject',
            reference: 'bbs_subject',
            itemId: 'bbs_subject',
            width: 350,
            margin: '5 5 0 0'
        }, {
            xtype: 'fieldcontainer', 
            combineErrors: true,
            layout: 'hbox',
            defaults: {
                //flex: 1,
                //hideLabel: true,
                margin: '5 5 0 0'
            },
            items: [{
                fieldLabel: Locale.getMsg('등록일자'),
                labelAlign: 'right',
                labelWidth: 80,
                width: 210,
                xtype: 'datefield',
                name: 'sdate',
                reference: 'sdate',
                itemId: 'sdate',
                format: 'Y-m-d',
                maxValue: new Date(),
                margin: '15 5 0 0'
            }, {
                xtype: 'datefield',
                name: 'edate',
                width: 130,
                reference: 'edate',
                itemId: 'edate',
                format: 'Y-m-d',
                value: new Date(),
                margin: '15 10 0 0'
            }, {
                xtype: 'hiddenfield',
                reference: 'menuId',
                name: 'menuId',
                itemId: 'menuId'
            }, { 
                xtype: 'button',
                text: Locale.getMsg('검색'),
                width: 60,
                margin: '15 5 0 0',
                height: 30,
                listeners: {
                    click: 'onSubmitClick'
                }
            }]
        }
    ]
});

Ext.define('Ysn.view.board.mboardsearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mboard-search',
    init: function () {
        var Today = new Date();
        this.lookupReference('sdate').setValue(Today.getFullYear() + '-' + ('0' + (Today.getMonth() + 1)).slice(-2) + '-' + '01'); 
        this.lookupReference('menuId').setValue(boardId);
    },
    
    onSubmitClick: function () {
        //console.log(Ext.getCmp('productinquiryinquiry'));
        this.getView().up('panel').lookupReference('mboardList').getStore().load(
                {
                    params: {
                        user_nm: this.lookupReference('user_nm').getValue(),
                        bbs_subject: this.lookupReference('bbs_subject').getValue(),
                        menuId: this.lookupReference('menuId').getValue(),
                        sdate: Ext.Date.format(this.lookupReference('sdate').getValue(), 'Y-m-d'),
                        edate: Ext.Date.format(this.lookupReference('edate').getValue(), 'Y-m-d')
                    }
                }
    );
    }


});


Ext.define('Ysn.view.board.mboardList', {
    extend: 'Ext.grid.Panel',
    xtype: 'mboardList',
    requires: [
        'Ysn.view.board.mboardListController', 
		'Ysn.store.boardList',
		'Ext.grid.filters.Filters' 
    ],
    
    controller: 'board-mboardList',     
    store: {
        //parent: this,
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
	            Ext.each(Ext.ComponentQuery.query('panel[reference=board-mboard]'), function (obj) {
	                if(obj.itemId == Ysn.Global.activeMenu){
	                    obj.down('#total').setHtml('Total : ' + store.data.items.length);
	                    return false;
	                }
	            }); 
	        }
	    },
	    autoLoad: false,
	    autoDestroy: false 
    }, 
	style: {'borderTop':'1px solid gray'},
	enableLocking: true,
	//id: 'mboardList',
    reference: 'mboardList',
    columnLines: true,
	multiColumnSort: true, 
	plugins: ['gridfilters', 'pmh-grid-exporter'],
	columns: [
            {
                text: "BBS_CD", width: 100, dataIndex: 'BBS_CD', hidden: true
            },
            {
                text: "MENU_ID", width: 100, dataIndex: 'MENU_ID', hidden: true
            },
            { text: Locale.getMsg('등록일'), width: 125, dataIndex: 'BBS_RDATE', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: true, filter: true },
			{
			    text: Locale.getMsg('제목'), flex:1, dataIndex: 'BBS_SUBJECT', sortable: true,
			    filter: {
			        type: 'string',
			        itemDefaults: {
			            emptyText: Locale.getMsg('검색어입력..')
			        }
			    }
			},
            {
                text: Locale.getMsg('댓글수'), width: 80, dataIndex: 'CMT_CNT', sortable: true
			}
        ],
   height: 700,
   width: 1600,
   syncRowHeight: false,
   viewConfig: {
            stripeRows: true
   },
   listeners: {		
		//itemclick: function(dataview, record, item, index, e) {  
    // }

    } 
});

Ext.define('Ysn.view.board.mboardListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.board-mboardList',
    init: function () {

    }
});

Ext.define('Ysn.view.board.mboardDetail',{
    extend: 'Ext.form.Panel',
    xtype: 'board-mboardDetail',
    requires: [
        'Ysn.view.board.mboardDetailController'
    ],

    controller: 'board-mboardDetail', 


    frame: true,
    //id: 'mboardDetail',
	reference: 'mboardDetail',
    bodyPadding: 10,
    scrollable:true,
    width: 800,
    reader: {
        type: 'json',
        model: 'Ysn.model.boardDetail',
        rootProperty: ''
    },
	fieldDefaults: { 
			labelAlign: 'right', 
			msgTarget: 'side',
            readOnly: true
		},
    items: [{
        xtype: 'fieldset',
		scrollable:true,
        title: Locale.getMsg('기본정보'),
        layout: {
            type: 'vbox', 
            tableAttrs: {
                style: {
                    width: '100%' 
                }
            }

        },
        items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: Locale.getMsg('제목'),
                        name: 'bbs_subject',
                        reference: 'bbs_subject',
                        itemId: 'bbs_subject',
                        width: 500,
                        readOnly: false,
                        style: { width: '100%' }
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: Locale.getMsg('글쓴이'),
                        name: 'user_nm',
                        reference: 'user_nm',
                        itemId: 'user_nm',
                        width: 300
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: Locale.getMsg('등록일자'),
                        name: 'bbs_rdate',
                        reference: 'bbs_rdate',
                        itemId: 'bbs_rdate',
                        format: 'Y-m-d',
                        width: 200,
                        readOnly: true
                    },
					{ fieldLabel: Locale.getMsg('내용'), colspan: 3, xtype: 'textareafield',  name: 'bbs_contents', readOnly:false, width:700, height:300 }
        ]
    }, {
        xtype: 'fieldset',
        scrollable: true,
        title: Locale.getMsg('첨부파일'),
        layout: {
            type: 'table',
            columns: 1,
            tableAttrs: {
                style: {
                    width: '100%'
                }
            }

        },
        items: [
                     {
                         xtype: 'muiltFileBox',
                         reference: 'muiltFileBox1',
                         itemId: 'muiltFileBox1'
                     }
        ]
    }, {
        xtype: 'fieldset',
        reference : 'cmtList',
		scrollable:true,
        title: Locale.getMsg('댓글현황'),
        layout: {
            type: 'table',
            columns: 2
        },
        items: [                   
					{
					    xtype: 'grid',
					    store: {
					        proxy: {
					            type: 'memory',
					            reader: {
					                type: 'json',
					                rootProperty: ''
					            }
					        },
					        autoLoad: false,
					        autoDestroy: true,
					        listeners: {

					        }
					    }, 
					    itemId: 'boardCmtList',
					    reference: 'boardCmtList',
					    hideHeaders: true,
					    columnLines: false,  
					    columns: [
                                { text: "BBS_CD", width: 100, dataIndex: 'BBS_CD', hidden: true },
                                { text: "BBD_CD", width: 100, dataIndex: 'BBD_CD', hidden: true },
                                { text: "USER_CD", width: 100, dataIndex: 'USER_CD', hidden: true },
                                { text: "REG_DT", width: 100, dataIndex: 'REG_DT', renderer: Ext.util.Format.dateRenderer('Y-m-d'), sortable: false },
                                { text: "USER_NM", width: 120, dataIndex: 'USER_NM', sortable: false },
                                { text: "COMP_NM", width: 350, dataIndex: 'COMP_NM', sortable: false }                               
					    ],
					    plugins: [{
					        ptype: 'rowexpander',
					        rowBodyTpl : new Ext.XTemplate(
                                '{BBD_CMT:this.formatChange}',
                            {
                                formatChange: function(v){
                                    return v.replace(/\n/g,'</br>'); 
                                }
                            })
					    }],
					    style: {width:'100%'},
					    syncRowHeight: true,
					    viewConfig: {
					        stripeRows: true
					    },
					    listeners: {
					        cellclick: 'viewCmt'

					    } 
					},
					    {
                                xtype: 'button',
                                iconCls: 'x-fa fa-plus-square',
                                text: Locale.getMsg('댓글쓰기'),
                                handler: 'openCmt',
                                margin: '0 0 5 0',
                                itemId: 'btn01',
                                hidden: true
					    }
					   
        ]
    }],
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            defaults: {
                minWidth: 100 
            },
            items: [
				{ xtype: 'hiddenfield', name: 'bbs_cd' },
                { xtype: 'hiddenfield', name: 'menuId' }, 
                { xtype: 'hiddenfield', name: 'user_cd', listeners: {chang:'btnChg'}},
                { xtype: 'hiddenfield', name: 'use_yn' }, 
                { xtype: 'hiddenfield', name: 'cmt_cnt' }, 
                '->',  
				/*{ xtype: 'button', text: Locale.getMsg('Drop정보'), name: 'rtnbtn1', itemId: 'rtnbtn1', margin: '5 5 5 5',hidden: true,
                    listeners: {click : 'onDrop'}
                }, */ 
                { xtype: 'button', text: Locale.getMsg('삭제'), name: 'btn1', itemId: 'btn1',margin: '5 5 5 5', hidden: false,
                    listeners: {click : 'onDelete'}
                },
				{ xtype: 'button', text: Locale.getMsg('저장'), name: 'btn2', itemId: 'btn2',margin: '5 5 5 5', hidden: false,
                    listeners: {click : 'onSubmit'}
                }
            ]
        }]
});

Ext.define('Ysn.view.board.mboardDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.board-mboardDetail',
    init: function () {

        this.getView().getForm().findField('user_nm').setValue(username); 
        this.getView().getForm().findField('user_cd').setValue(loginUser);
        this.getView().getForm().findField('bbs_rdate').setValue(new Date());
        this.getView().getForm().findField('menuId').setValue(boardId);
    },
    
    btnCfg: function (el, newValue, oldValue, eOpts) {
        if (newValue == loginUser) { 
            this.lookupReference('mboardDetail').down('#btn1').show();
            this.lookupReference('mboardDetail').down('#btn2').show();
        } else {
            this.lookupReference('mboardDetail').down('#btn1').hide();
            this.lookupReference('mboardDetail').down('#btn2').hide();
        }
    },

    viewCmt: function (dataview, td, cellIndex, record, tr, rowIndex, e) {
        if (cellIndex > 0) { 
            var bbs_cd = record.get('BBS_CD');
            var bbd_cd = record.get('BBD_CD'); 
            var win = new Ysn.view.board.cmtPop(); 

            win.lookupReference('board-cmtPopDetail').getForm().load({
                url: '/Board/boardCmtDetail?bbs_cd=' + bbs_cd + '&bbd_cd=' + bbd_cd,
                success: function (form, action) {
                    var dataVal = Ext.JSON.decode(action.response.responseText);
                    if (loginUser == dataVal[0].USER_CD) {
                        win.lookupReference('board-cmtPopDetail').down('#btn1').show();
                        win.lookupReference('board-cmtPopDetail').down('#btn2').show();
                    } else {
                        win.lookupReference('board-cmtPopDetail').down('#btn1').hide();
                        win.lookupReference('board-cmtPopDetail').down('#btn2').show();
                    }
                }
            })
            this.getView().add(win);
            win.setPosition(10, 10);
            win.show();
        }
    },

    openCmt: function () { 
        var win = new Ysn.view.board.cmtPop(); 
        var hidfield = win.query('#paentFrm')[0];
        hidfield.setValue('mboardDetail');

        win.lookupReference('board-cmtPopDetail').getForm().reset();
        win.lookupReference('board-cmtPopDetail').getForm().findField('reg_dt').setValue(new Date());
        win.lookupReference('board-cmtPopDetail').getForm().findField('user_cd').setValue(loginUser);
        win.lookupReference('board-cmtPopDetail').getForm().findField('user_nm').setValue(username);
        win.lookupReference('board-cmtPopDetail').getForm().findField('bbs_cd').setValue(this.getView().getForm().findField('bbs_cd').getValue());
        this.getView().add(win);
        win.setPosition(10,10);
        win.show();
    },
    
    onDelete: function () {
        var pl = this.getView();
        var form = pl.getForm();
        //Ysn.Util.cbEmptyVal(this.lookupReference('mboardDetail'));
        if (form.isValid()) {
            var url = '/Board/boardDelete';
            form.setConfig('url', url);
            form.submit({
                waitMsg: 'Processing...',
                method: 'POST',
                params: form.getValues(),
                submitEmptyText: false,
                success: function (form, action) {
                    if(!Ysn.Util.OnsessOut(action.response.responseText)) return false; 
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.alert(Locale.getMsg('처리상태'), Locale.getMsg('삭제완료'));                    
                    pl.up('panel').up('panel').lookupReference('mboardList').store.reload();
                },
                failure: function (form, action) {
                    //console.log('response:'+ action);
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.alert('Failed', dataVal.errmsg);
                    //Ext.getCmp('keymanList').store.reload();
                }
            });
        }
    },
    
    onSubmit: function () {
        var pl = this.getView();
        var form = pl.getForm(); 
        if (form.isValid()) {
            var url = '/Board/boardSave';
            form.setConfig('url', url);
            form.submit({
                waitMsg: 'Processing...',
                method: 'POST',
                params: form.getValues(),
                submitEmptyText: false,
                success: function (form, action) {
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.alert(Locale.getMsg('처리상태'), Locale.getMsg('저장완료'));
                    Ext.each(pl.query('hiddenfield[name=file_name]'), function (obj) {
                        pl.remove(obj);
                    });
                    Ext.each(pl.query('hiddenfield[name=file_mode]'), function (obj) {
                        pl.remove(obj);
                    });
                    Ext.each(pl.query('hiddenfield[name=doc_mgt]'), function (obj) {
                        pl.remove(obj);
                    });
                    Ext.each(pl.query('hiddenfield[name=del_file]'), function (obj) {
                        pl.remove(obj);
                    });
                    //Ext.getCmp('mboardList').store.reload();
                    pl.up('panel').up('panel').lookupReference('mboardSearch').getController('mboard-search').onSubmitClick();
                },
                failure: function (form, action) {
                    //console.log('response:'+ action);
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.alert('Failed', dataVal.errmsg);
                    //Ext.getCmp('keymanList').store.reload();
                }
            });
        }
    }

});

Ext.define('Ysn.view.board.mboard', {
    extend: 'Ext.panel.Panel',
    xtype: 'board-mboard',
    requires: [
        'Ysn.view.board.mboardController'
    ],

    controller: 'board-mboard',
    reference: 'board-mboard',
    //id: 'board-mboard',
    layout: 'border',
    width: 500,
    height: 400,
    overflow: 'hidden',
    scrollable: false,
    header: false,
    bodyBorder: false,
    defaults: {
        collapsible: true,
        split: true,
        bodyPadding: 0
    },

    dockedItems: [
	               {
	                   title: '',
	                   xtype: 'mboard-search',
	                   reference: 'mboardSearch',
	                   collapsible: true,
                           scrollable: true,
	                   floatable: true,
	                   split: true,
	                   padding: '0 0 0 0',
	                   dock: 'top',
	                   height: 30
	               }
    ],
    tbar: {

        overflowHandler: 'menu',
        style: { 'border-top-width': '1px !important;' },
        items: [
		{
		    xtype: 'label',
		    itemId: 'total',
		    text: 'Total : 0',
		    style: { 'font-weight': 'bold' }
		}, {
		    xtype: 'hiddenfield',
		    itemId: 'menuId',
            value: boardId,
		    name: 'menuId'
		},

			  '->',

		{
		    xtype: 'button',
		    iconCls: 'x-fa fa-file-excel-o',
		    text: Locale.getMsg('액셀변환'),
		    handler: 'xlsExport'
		}, {
		    xtype: 'button',
		    iconCls: 'x-fa fa-plus-square',
		    text: Locale.getMsg('글쓰기'),
		    handler: 'frmClear'
		}]
    },

    items: [
		{
		    header: false,
		    region: 'center',
		    xtype: 'mboardList',
		    itemId: 'mboardList',
		    listeners: {
		        select: 'itemclick'
		    }

		}, {
		    title: Locale.getMsg('게시물 정보'),

		    scrollable: false,
		    x: 10, y: 10,
		    region: 'east',
		    itemId: 'east',
		    //	reference:'Detail',
		    collapsed: true,
		    layout: 'fit',
		    width: 950,
		    minWidth: 850,
		    maxWidth: 1200,
		    items: {
		        xtype: 'board-mboardDetail'
		    }
		}, {
		    header: false,
		    xtype: 'muiltFileupload',
		    reference: 'muiltFile1',
		    itemId: 'muiltFile1',
		    width: 0,
		    height: 0,
		    hidden: true
		}
    ]
});

///<reference path="~/Client/ext/build/ext-all-debug.js">
///<reference path="~/Client/ext/build/ext-debug.js">
Ext.define('Ysn.view.board.mboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.board-mboard',
    requires: [
	    'Ysn.store.*'
    ],
    init: function () {
        this.lookupReference('mboardSearch').setTitle(pageTitle);
        if (Ext.getCmp('chkpopup').getValue()) {
            this.down('#east').setVisible(false);
        }
        
        this.lookupReference('muiltFile1').down('#paentFrm').setValue('mboardDetail');
        this.lookupReference('muiltFile1').down('#childFrm').setValue('#muiltFileBox1');
        this.lookupReference('muiltFile1').down('#doc_mgt').setValue('file');
        this.lookupReference('mboardDetail').down('#muiltFileBox1').down('#paentFrm').setValue('board-mboard');
        this.lookupReference('mboardDetail').down('#muiltFileBox1').down('#childFrm').setValue('#muiltFile1');
    },
    itemclick: function (view, record, index, e) {
        var Pl = this.lookupReference('mboardDetail');
        var main = this.getView();;
        var Frm = Pl.getForm();
        if (Ext.getCmp('chkpopup').getValue()) {
            openPopupView('게시판', 'board-mboardDetail', record.get('BBS_CD'), 'board|boardView|bbs_cd|menuId|' + record.get('MENU_ID'));
        } else {
            Frm.reset();
            Pl.down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
            Pl.down('#boardCmtList').getStore().removeAll();
            this.lookupReference('muiltFile1').down('#paentFrm').setValue('mboardDetail');
            this.lookupReference('muiltFile1').down('#childFrm').setValue('#muiltFileBox1');
            this.lookupReference('muiltFile1').down('#doc_mgt').setValue('file');
            this.lookupReference('mboardDetail').down('#muiltFileBox1').down('#paentFrm').setValue('board-mboard');
            this.lookupReference('mboardDetail').down('#muiltFileBox1').down('#childFrm').setValue('#muiltFile1');
            Pl.down('#btn01').show();
            Pl.load({
                url: '/Board/boardDetail?bbs_cd=' + record.get('BBS_CD') + '&menuId=' + record.get('MENU_ID'), //,
                waitMsg: 'loading...',
                success: function (form, action) {
                    if (!Ysn.Util.OnsessOut(action.response.responseText)) return false;
                    var dataVal = Ext.JSON.decode(action.response.responseText);
                    var detail = dataVal.DETAIL;
                    Frm.findField('bbs_subject').setValue(detail.BBS_SUBJECT);
                    Frm.findField('user_nm').setValue(detail.USER_NM_STR);
                    Frm.findField('user_cd').setValue(detail.USER_CD);
                    Frm.findField('bbs_rdate').setValue(Ext.Date.parse(detail.BBS_RDATE, 'Ymd'));
                    Frm.findField('bbs_contents').setValue(detail.BBS_CONTENTS);
                    Frm.findField('menuId').setValue(detail.MENU_ID);
                    Frm.findField('bbs_cd').setValue(detail.BBS_CD);
                    Frm.findField('use_yn').setValue(detail.USE_YN);
                    Frm.findField('cmt_cnt').setValue(detail.CMT_CNT);
                    Pl.lookupReference('boardCmtList').getStore().loadRawData(dataVal.CMT_LIST);
                }
            });
            Pl.down('#muiltFileBox1').down('#AttachFileList').getStore().load({
                params: {
                    biz_gubun: record.get('BBS_CD'),
                    doc_mgt: 'file',
                    chasu: '0'
                }
            });
        }  
        var task = new Ext.util.DelayedTask(function () {
            main.down('#east').toggleCollapse();
        });
        if (main.down('#east').collapsed) task.delay(1000); 
        //Ext.getCmp('productinquiryinquiry').down('#east').show();

        /*Ext.getStore('inquiryDetail').load({
			params:{cust_cd:record.get('CUST_CD')},
			callback : function(records, operation, success){ 
				//console.log(records);	//root프로퍼티에 지정된데이터 
			    //console.log(operation.getProxy().getReader().rawData);	//리턴된 json 데이터전체 
				//console.log(success);	//success 프로퍼티에 지정된 데이터 }
				console.log(Ext.getStore('inquiryDetail').getAt(0));	//success 프로퍼티에 지정된 데이터 }
                Ext.getCmp('inquiryDetail').loadRecord(Ext.getStore('inquiryDetail').getAt(0));  
			}
		}); */
    },
    frmClear: function(){
        this.lookupReference('mboardDetail').getForm().reset();
        this.lookupReference('mboardDetail').getForm().findField('user_nm').setValue(username);
        this.lookupReference('mboardDetail').getForm().findField('user_cd').setValue(loginUser);
        this.lookupReference('mboardDetail').getForm().findField('bbs_rdate').setValue(new Date());
        this.lookupReference('mboardDetail').getForm().findField('menuId').setValue(this.lookupReference('mboardSearch').down('#menuId').getValue());
        
        this.lookupReference('mboardDetail').down('#muiltFileBox1').down('#AttachFileList').down('#delbtn').show();
        this.lookupReference('mboardDetail').down('#muiltFileBox1').down('#AttachBtn').show();

        this.lookupReference('mboardDetail').down('#muiltFileBox1').down('#paentFrm').setValue('board-mboard');
        this.lookupReference('mboardDetail').down('#muiltFileBox1').down('#childFrm').setValue('#muiltFile1'); 
        //Ext.getCmp('requestDetail').getForm().findField('addchk').setValue('add');
        if (this.getView().down('#east').collapsed) {
            this.getView().down('#east').toggleCollapse();
        }
        
        this.lookupReference('mboardDetail').down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
        this.lookupReference('mboardDetail').down('#boardCmtList').getStore().removeAll();
        this.lookupReference('mboardDetail').down('#btn01').hide();
    },
    
    xlsExport: function () {

        this.lookupReference('mboardList').saveDocumentAs({
			headerRowCnt: 1,
            type: 'xlsx',
            title: this.lookupReference('mboard-search').getTitle(),
            fileName: 'Board'
        });
    }
});


Ext.define('Ysn.view.board.cmtPop',{
    extend: 'Ext.window.Window',
    xtype: 'board-cmtPop',
    requires: [
        'Ysn.view.board.cmtPopController'
    ],

    controller: 'board-cmtPop', 
    title: Locale.getMsg('댓글내역'),
    reference: 'board-cmtPop', 
    //id: 'board-cmtPop', 
    modal:true,
    width: 425,
    height: 400, 
    bodyBorder: 10, 
    resizable: false,
    layout:'fit',
    items: [
		{
		    header: false,					
		    region: 'center',
		    scrollable: true,
		    //overflow:'scroll',
		    //id: 'board-cmtPopDetail',
		    reference: 'board-cmtPopDetail',
		    xtype:'form', 
		    reader: {
		        type: 'json',
		        model: 'Ysn.model.boardCmtList2',
		        rootProperty: '' 
		    },
		    layout: 'vbox',  
		    items:[ 
                   { fieldLabel: Locale.getMsg('등록일'), xtype: 'datefield', name: 'reg_dt', labelWidth: 80, format: 'Y-m-d', readOnly: true, style: { width: '200px' } },
                   { fieldLabel: Locale.getMsg('댓글내역'), xtype: 'textfield', name: 'user_nm', labelWidth: 80, readOnly: true, style: { width: '300px' } },
                   { fieldLabel:'*'+ Locale.getMsg('내용'), xtype: 'textareafield', labelWidth: 80, name: 'bbd_cmt', readOnly:false,allowBlank: false, style: { width: '400px',height:'200px' } }
		    ],
		    dockedItems: [{
		        xtype: 'toolbar',
		        dock: 'top',
		        ui: 'footer',
		        defaults: {
		            minWidth: 100 
		        },
		        items: [
                    { xtype: 'hiddenfield', name: 'bbs_cd'},
                    { xtype: 'hiddenfield', name: 'bbd_cd'},
                    { xtype: 'hiddenfield', name: 'user_cd'}, 
                    { xtype: 'hiddenfield', name: 'paentFrm', itemId: 'paentFrm' },
                    { xtype: 'component', flex: 1 },
                    { xtype: 'button', text: Locale.getMsg('삭제'), margin: '5 5 5 5', itemId:'btn1',name:'btn1', hidden: true,
                        listeners: {click : 'onDelete'}
                    }, 
                    { xtype: 'button', text: Locale.getMsg('저장'), margin: '5 5 5 5', itemId:'btn2',name:'btn2', hidden: false,
                        listeners: {click : 'onSubmit'}
                    } 
		        ]
		    }]

		} 
    ] 
	
});

Ext.define('Ysn.view.board.cmtPopController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.board-cmtPop',
    init: function(){   
    }, 
    onDelete: function(){
        var pl = this.getView();
        var form = pl.lookupReference('board-cmtPopDetail').getForm(); 
        Ysn.Util.cbEmptyVal(pl); 
        if (form.isValid()) {
            var url = '/Board/boardCmtDelete';
            form.setConfig('url',url);
            form.submit({
                waitMsg:'Processing...', 
                method: 'POST',
                params: form.getValues(),
                submitEmptyText:false,
                success: function(form, action) {
            Ysn.Util.OnsessOut(action.response.responseText); 
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.alert(Locale.getMsg('처리상태'), Locale.getMsg('삭제완료'));
                    Ext.each(Ext.ComponentQuery.query('panel[reference=board-mboard]'), function (obj) {
                        if (obj.itemId == Ysn.Global.activeMenu) {
                            obj.lookupReference('mboardDetail').load({
                                url: '/Board/boardDetail?bbs_cd=' + obj.lookupReference('mboardDetail').getForm().findField('bbs_cd').getValue() + '&menuId=' + obj.lookupReference('mboardDetail').getForm().findField('menuId').getValue(), //,
                                waitMsg: 'loading...',
                                success: function (form, action) {
                                    if (!Ysn.Util.OnsessOut(action.response.responseText)) return false;
                                    var dataVal = Ext.JSON.decode(action.response.responseText);
                                    var detail = dataVal.DETAIL;
                                    form.findField('bbs_subject').setValue(detail.BBS_SUBJECT);
                                    form.findField('user_nm').setValue(detail.USER_NM_STR);
                                    form.findField('user_cd').setValue(detail.USER_CD);
                                    form.findField('bbs_rdate').setValue(Ext.Date.parse(detail.BBS_RDATE, 'Ymd'));
                                    form.findField('bbs_contents').setValue(detail.BBS_CONTENTS);
                                    form.findField('menuId').setValue(detail.MENU_ID);
                                    form.findField('bbs_cd').setValue(detail.BBS_CD);
                                    form.findField('use_yn').setValue(detail.USE_YN);
                                    form.findField('cmt_cnt').setValue(detail.CMT_CNT);
                                   // setTimeout(function () {
                                        obj.lookupReference('mboardDetail').lookupReference('boardCmtList').getStore().loadRawData(dataVal.CMT_LIST);
                                   // }, 500);
                                    
                                }
                            });
                           
                            obj.lookupReference('mboardList').getStore().reload();
                        }
                    });
                    pl.close();
                },
                failure: function(form, action) {
                    //console.log('response:'+ action);
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.alert('Failed', dataVal.errmsg); 
                    //Ext.getCmp('keymanList').store.reload();
                }
            });
        }
    },
    onSubmit: function(){
        var pl = this.getView();
        var form = pl.lookupReference('board-cmtPopDetail').getForm(); 
        //Ysn.Util.cbEmptyVal(pl); 
        if (form.isValid()) {
            var url = '/Board/boardCmtSave';
            form.setConfig('url',url);
            form.submit({
                waitMsg:'Processing...', 
                method: 'POST',
                params: form.getValues(),
                submitEmptyText:false,
                success: function(form, action) {
            Ysn.Util.OnsessOut(action.response.responseText); 
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.alert(Locale.getMsg('처리상태'), Locale.getMsg('저장완료'));
                    Ext.each(Ext.ComponentQuery.query('panel[reference=board-mboard]'), function (obj) {
                        if (obj.itemId == Ysn.Global.activeMenu) { 
                            obj.lookupReference('mboardDetail').load({
                                url: '/Board/boardDetail?bbs_cd=' + obj.lookupReference('mboardDetail').getForm().findField('bbs_cd').getValue() + '&menuId=' + obj.lookupReference('mboardDetail').getForm().findField('menuId').getValue(), //,
                                waitMsg: 'loading...',
                                success: function (form, action) {
                                    if (!Ysn.Util.OnsessOut(action.response.responseText)) return false;
                                    var dataVal = Ext.JSON.decode(action.response.responseText);
                                    var detail = dataVal.DETAIL;
                                    form.findField('bbs_subject').setValue(detail.BBS_SUBJECT);
                                    form.findField('user_nm').setValue(detail.USER_NM_STR);
                                    form.findField('user_cd').setValue(detail.USER_CD);
                                    form.findField('bbs_rdate').setValue(Ext.Date.parse(detail.BBS_RDATE, 'Ymd'));
                                    form.findField('bbs_contents').setValue(detail.BBS_CONTENTS);
                                    form.findField('menuId').setValue(detail.MENU_ID);
                                    form.findField('bbs_cd').setValue(detail.BBS_CD);
                                    form.findField('use_yn').setValue(detail.USE_YN);
                                    form.findField('cmt_cnt').setValue(detail.CMT_CNT);
                                  //  setTimeout(function () {
                                        obj.lookupReference('mboardDetail').lookupReference('boardCmtList').getStore().loadRawData(dataVal.CMT_LIST);
                                   // }, 500);
                                }
                            }); 
                            obj.lookupReference('mboardList').getStore().reload();
                        }
                    });
                    pl.close();
                },
                failure: function(form, action) {
                    //console.log('response:'+ action);
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.'); 
                    //Ext.getCmp('keymanList').store.reload();
                }
            });
        }
    }


});

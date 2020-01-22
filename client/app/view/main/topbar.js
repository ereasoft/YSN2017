/// <reference path="../estimate/estimateDetail.js" />

Ext.define('Ysn.view.main.topbar',{
    extend: 'Ext.panel.Panel',
    xtype: 'main-topbar',
    requires: [
        'Ysn.view.main.topbarController',
        'Ysn.view.main.topbarModel',
        'Ysn.view.estimate.estimateDetail'
    ],

    controller: 'main-topbar',
    viewModel: {
        type: 'main-topbar'
    },

    frame: true,
    height: 100, 
    tbar: {
        overflowHandler: 'menu', 
        items: [
			 {
			//xtype: 'image',
			//src: '/images/yonwoo.jpg',
			//Width: 100,
			//Height: 20
			     xtype: 'panel',
                 id : 'logo',
                 html: '<img src=\"resources/yonwoo.jpg\" width=215 height=50 />'
			},
			  '->',
           /* {
                  xtype: 'button',
                  iconCls: 'x-fa  fa-external-link',
                  text: Locale.getMsg( '견적서작성' ),
                  listeners: {
                      click: function(){
                          var tabs = Ext.getCmp('centerregion'),
                          id = 'requestMain',
                          tab = tabs.items.getByKey(id);
                          var cfg = {
                              xtype: 'requestMain',
                              title:'견적서작성',
                              session: true
                          }
                          if (!tab) {
                              Ysn.Global.activeMenu = id;
                              cfg.itemId = id; 
                              cfg.closable = true;
                              tab = tabs.add(cfg);
                          }

                          tabs.setActiveTab(tab);
                      }
                  }
            },
            {
                 xtype: 'button',
                 iconCls: 'x-fa  fa-external-link',
                 text: Locale.getMsg( '견적서참조' ),
                 listeners: {
                     click: function ()
                     {
                         var tabs = Ext.getCmp( 'centerregion' ),
                         id = 'requestMain2',
                         tab = tabs.items.getByKey( id );
                         var cfg = {
                             xtype: 'requestMain2',
                             title: '견적서참조',
                             session: true
                         }
                         if ( !tab )
                         {
                             Ysn.Global.activeMenu = id;
                             cfg.itemId = id;
                             cfg.closable = true;
                             tab = tabs.add( cfg );
                         }

                         tabs.setActiveTab( tab );
                     }
                 }
             },   
             {
                 xtype: 'button',
                 iconCls: 'x-fa  fa-external-link',
                 text: Locale.getMsg( '견적서승인' ),
                 listeners: {
                     click: function ()
                     {
                         var tabs = Ext.getCmp( 'centerregion' ),
                         id = 'requestMain3',
                         tab = tabs.items.getByKey( id );
                         var cfg = {
                             xtype: 'requestMain3',
                             title: '견적서승인',
                             session: true
                         }
                         if ( !tab )
                         {
                             Ysn.Global.activeMenu = id;
                             cfg.itemId = id;
                             cfg.closable = true;
                             tab = tabs.add( cfg );
                         }

                         tabs.setActiveTab( tab );
                     }
                 }
             },        */
             '-',
			{
				xtype: 'checkboxfield',
				id: 'chkpopup',
				fieldLabel: Locale.getMsg('상세화면팝업'),
				tooltip: '체크하시면 상세화면이 팝업창으로 표시됩니다.',
				labelWidth: 90,
				listeners: {
							change : 'onChangeChk' 
				}
			},{
            xtype: 'button',
			iconCls: 'x-fa  fa-external-link',
			text: Locale.getMsg('舊YSN이동'),
			handler: 'golink'
            },
			 '-',
			 {
            text: username, 
            iconCls: 'x-fa fa-user',
            menu: {
                xtype: 'menu',
                plain: true,
                items: {
                    xtype: 'buttongroup', 
                    columns: 2,
                    defaults: {
                        xtype: 'button',
                        scale: 'large',
                        iconAlign: 'left',
                        handler: 'onButtonClick'
                    },
                    items: [/*{
                        xtype: 'panel',
						html: '<img src=\"images/pic.jpg\" width=102 height=138 />',
                        height: '4em',
						colspan: 2
                    }, {
                        colspan: 2,
                        width: '100%',
                        text: '직책:파트장' ,
					    scale: 'small'
                    }, */{
                        colspan: 2,
						xtype: 'label',
                        width: '100%',
                        text: '부서:'+dept_nm,
                        scale: 'small'
                    }]
                }
            }
        }, 
		'-',
		{
		    text:Locale.getMsg('언어변경'),
            iconCls: 'x-fa fa-language', 
            menu: {
				items: [
					{
						text: '한국어', handler: 'chgKor'
					},
					{
					    text: 'English', handler: 'chgEng'
					}
				]
			}
		},
        {
            text: Locale.getMsg('테마변경'),
            iconCls: 'x-fa fa-exchange',
            menu: {
				items: [
					{
						text: 'Triton', handler: 'chgTheme1'
					},
					{
					    text: 'Neptune', handler: 'chgTheme2'
					},
					{
					    text: 'Crisp', handler: 'chgTheme3'
					},
					{
					    text: 'Classic', handler: 'chgTheme4'
					},
					{
					    text: 'Gray', handler: 'chgTheme5'
					}
				]
			}
		},
		{
            xtype: 'button',
			iconCls: 'x-fa fa-key', 
			text: Locale.getMsg('암호변경'),
		    handler: 'chgPwd'
        }, {
            xtype: 'button',
			iconCls: 'x-fa fa-sign-out',
			text: Locale.getMsg('로그아웃'),
            handler: 'logOut'
        }]
    }
});

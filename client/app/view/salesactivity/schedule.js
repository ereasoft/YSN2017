Ext.define('Ysn.MonthContainerOverride', {
    override : 'Cal.container.Month',
    readOnly : true,
    getEventEditor : function (justCheck) {
        if (!justCheck && !this.eventEditor) {

            this.eventEditor = Ext.create(Ext.apply({
// HERE IS YOUR EDITOR XTYPE (ALIAS)
                xtype : 'salesactivity_modify'
            }, this.eventEditorConfig));
        }

        return this.eventEditor;
    },
	createNewEvent : function (startDate, endDate, isFullDay, showEditor) {
        startDate = startDate || new Date();

        var DATE     = Sch.util.Date;
        var newEvent = new this.eventStore.model();
        var unit     = isFullDay ? DATE.DAY : DATE.HOUR;
        var start    = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), isFullDay ? 0 : new Date().getHours());

        /*newEvent.beginEdit();

        newEvent.setName(this.L('newEvent'));
        newEvent.setStartEndDate(start, endDate || DATE.add(start, unit, 1));

        var resource = this.eventStore.getResourceStore().first();

        if (resource) {
            newEvent.setResourceId(resource.getId());
        }

        newEvent.endEdit();  

        if (showEditor !== false) {
            var el = this.getElementsFromEventRecord(newEvent).first();

            this.showEventEditor(newEvent, el, true);
        }
        
        return newEvent; */
    }
});

Ext.define('Ysn.WeekViewOverride', {
    override : 'Sch.view.WeekView', 
	onEventAdd : function (s, recs) {
        if (!this.view.headerCt.items.get(0).rendered) return;

        var view = this.view;

        if (recs.length === 1) {
            //this.renderSingle(recs[0]);
        } else {
            view.repaintAllEvents();
        }
    }
});

/*Ext.define('Ysn.SchedulerViewOverride', {
    override : 'Sch.mixin.AbstractSchedulerView',

    getEventEditor : function () {
       // if (!this.eventEditor) {

            this.eventEditor =  new Ysn.view.salesactivity.modify();
     //   }

        return this.eventEditor;
    }
});*/



Ext.define('Ysn.view.salesactivity.schedule',{
    extend: 'Ext.panel.Panel',
    xtype: 'salesactivity-schedule',
    requires: [
        'Ysn.view.MainPanelController',
		'Cal.window.EventEditor',
		'Sch.panel.SchedulerGrid',
        'interact'
    ],

    controller: 'calendar-mainpanel',
    reference: 'salesactivity-schedule',
	id:'salesactivity-schedule', 
    width: 500,
    height: 400,
    overflow:'hidden',
	scrollable:false,
	hideCollapseTool: true,
    title:'영업활동 일정관리',
    bodyBorder: false, 
    viewModel  : {
        data : {
            date             : new Date(),
            activeMode       : 'month',
            activeCard       : 'monthview',
            activeViewPreset : 'week'
        }
    },
    layout     : 'border',
    items      : [
        {
            xtype  : 'calendar-navigationbar',
            region : 'north'
        },
        {
            xtype  : 'calendar-resourcefilter',
			title  : '활동유형',
            region : 'east'
        },
        {
            xtype     : 'panel',
            reference : 'cardpanel',
            region    : 'center',
            layout    : 'card',
            bind      : {
                activeItem : '{activeCard}'
            },
            items     : [
                {
                    xtype     : 'calendar-monthview',
                    itemId    : 'monthview',
                    listeners : {
                        weeknumberclick : 'onMonthViewWeekNumberClick',
                        daynumberclick  : 'onMonthViewDayNumberClick',
						eventclick: 'eventclick',
						eventvaliddrop : 'eventvaliddrop',
						eventvalidresize : 'eventvalidresize',
						dayclick: 'dayclick',
						rangeselect: 'rangeselect'
                    },
                    bind      : {
                        startDate : '{date}'
                    }
                },
                {
                    xtype  : 'calendar-scheduler',
                    itemId : 'weekview',
                    bind   : {
                        startDate  : '{date}',
                        viewPreset : '{activeViewPreset}'
                    },
                    listeners: {
                        viewchange : 'fixStartDateAfterViewPresetChange',
						eventclick : 'weekeventclick',
						dragcreateend : 'weekdragcreateend',
						eventdrop : 'weekeventdrop',
						eventresizeend : 'weekeventresizeend'
                    }
                }
            ]
        }
    ]
});

Ext.define('Ysn.view.salesactivity.modify',{
    extend: 'Ext.window.Window', 
	alias    : ['widget.salesactivity_modify'],
	closeAction  : 'hide',
	closable : true,
	controller: 'salesactivity_modify',
	title: '활동실적 상세내용',
	reference: 'salesactivity-modify', 
	id: 'salesactivity-plan', 
	modal:false,
    width: 650,
    height: 700, 
    items: [
        { xtype: 'salesactivity-detail', itemId: 'detail', reference: 'detail' },
        {
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

Ext.define('Ysn.view.salesactivity.Detail',{
    extend: 'Ext.form.Panel',	 
	controller: 'salesactivity-Detail',
    xtype: 'salesactivity-detail',
    requires: [ 
    ],
    //controller: 'common-searchPartUser',  
	reference: 'salesactivity-Detail', 
	id: 'salesactivity-Detail',  
    width: 650,
    height: 700, 
    bodyBorder: false, 
	resizable: false,
	scrollable:false,
	reader: {
        type: 'json',
        model: 'Ysn.model.salesActivityDetail',
        rootProperty: '' 
    },
	fieldDefaults: { 
			labelAlign: 'right', 
			msgTarget: 'side' ,
			allowBlank:true
		},
    items: [{
        xtype: 'fieldset',
		scrollable:true,
        title: '활동개요',
        layout: {
            type: 'table',
            columns: 2, 
            tableAttrs: {
                style: {
                    width: '100%' 
                }
            }

        },
        items: [
					{	
						fieldLabel: '*활동유형', labelWidth: 100, name: 'sa_type',
						labelAlign: 'right',
						xtype: 'combobox',
						reference: 'sa_type',
						publishes: 'value',  
						displayField: 'CODE_NM',
						valueField: 'CODE_ID', 
		                emptyText: '선택',
						store: {
							type: 'Tcode'
						},
						minChars: 0,
						queryMode: 'local',
						typeAhead: true,
						margin: '0 5 0 0',
						allowBlank: false,
						listeners : {
							change : 'saTypeChg'
						}
					}, 
					{
						fieldLabel: '*활동담당', 
						xtype: 'textfield',
						name: 'user_nm',
						reference: 'user_nm',
						itemId: 'user_nm',
						allowBlank:false,
						labelWidth: 70
                    },
					{						 
						xtype: 'hiddenfield',
						name: 'user_cd',
						reference: 'user_cd',
						itemId: 'user_cd'
                    },
					{   
						colspan: 2,
                        xtype: 'fieldcontainer',
                        fieldLabel: '*활동일자',
						labelWidth: 100,
						labelAlign: 'right',
						style:{width:'100%'},
                        combineErrors: true,
                        layout: 'hbox', 
                        defaults: {
                            //flex: 1,
                            hideLabel: true
                        },
                        items: [{ xtype: 'datefield', width:130, format: 'Y-m-d', name: 'sa_sdate',margin: '0 2 0 0'},
								{ xtype: 'combobox', width:100, name: 'sa_sdate_time', displayField: 'TIME', valueField: 'VAL', emptyText: '선택',
								  store: {type:'time'}, minChars: 0, queryMode: 'local', typeAhead: true,margin: '0 5 0 0'},
								{ xtype: 'datefield', width:130, format: 'Y-m-d', name: 'sa_edate',margin: '0 2 0 0'},
								{ xtype: 'combobox', width:100, name: 'sa_edate_time', displayField: 'TIME', valueField: 'VAL', emptyText: '선택',
								  store: {type:'time'}, minChars: 0, queryMode: 'local', typeAhead: true}
							   ]
                    },
					{
                        colspan: 2,
						xtype: 'fieldcontainer',
						fieldLabel: '거래처',
						labelAlign: 'right',
						combineErrors: true,
						msgTarget : 'side',
						layout: 'hbox',
						defaults: {
							//flex: 1,
							hideLabel: true
						},
							items: [{
								xtype: 'textfield',
								name: 'cust_nm', 
								reference : 'cust_nm',
								itemId : 'cust_nm',
								margin: '0 5 0 0',
								width: 400,
								listeners : {
									change : 'custNmChg'
								}
							},{
								xtype: 'hiddenfield',
								reference: 'cust_cd', 
								name: 'cust_cd', 
								itemId : 'cust_cd'
							}, {
								iconCls: 'x-fa fa-search', 
								xtype: 'button',
								scale: 'small',
								margin: '0 5 0 0',
								handler : 'openWindow',
								style:{ 
									'border':'none' 

								}
							},{
								iconCls: 'x-fa fa-remove', 
								xtype: 'button',
								scale: 'small',
								handler : 'resetVal',
								style:{
									'background-color': 'red !important',
									'background-image': 'none',
									'border':'none' 

								}
							}]
				    },
				    {
						colspan: 2,
						xtype: 'fieldcontainer',
						fieldLabel: 'Keyman',
						labelAlign: 'right',
						combineErrors: true,
						msgTarget : 'side',
						layout: 'hbox',
						defaults: {
							//flex: 1,
							hideLabel: true
						},
							items: [{
								xtype: 'textfield',
								name: 'km_nms', 
								reference : 'km_nms',
								itemId : 'km_nms',
								margin: '0 5 0 0',
								width: 400
							},{
								xtype: 'hiddenfield',
								reference: 'km_cds', 
								name: 'km_cds', 
								itemId : 'km_cds'
							}, {
								iconCls: 'x-fa fa-search', 
								xtype: 'button',
								scale: 'small',
								margin: '0 5 0 0',
								handler : 'openWindow2',
								style:{ 
									'border':'none' 

								}
							},{
								iconCls: 'x-fa fa-remove', 
								xtype: 'button',
								scale: 'small',
								handler : 'resetVal2',
								style:{
									'background-color': 'red !important',
									'background-image': 'none',
									'border':'none' 

								}
							}]
				    },
					{
						colspan: 2,
						xtype: 'fieldcontainer',
						fieldLabel: '접촉(지원)유형',
						labelAlign: 'right',
						combineErrors: true,
						msgTarget : 'side',
						layout: 'hbox',
						defaults: {
							//flex: 1,
							hideLabel: true
						},
							items: [{
								name: 'sa_cnct',
								xtype: 'combobox',
								reference: 'sa_cnct',
								publishes: 'value',  
								displayField: 'CODE_NM',
								valueField: 'CODE_ID', 
								emptyText: '선택',
								store: {
									type: 'Tcode'
								},
								minChars: 0,
								queryMode: 'local',
								typeAhead: true,
								margin: '0 5 0 0'
							},{
								xtype: 'checkboxfield',
								reference: 'cmt_yn',
								name: 'cmt_yn',
								inputValue: 'Y',
								boxLabel: '코멘트대상 여부',
								listeners: {
									change : 'cmtYnChg'
								}
							}]
				    },
				    {
						colspan: 2,
						xtype: 'fieldcontainer',
						fieldLabel: '일정공유자',
						labelAlign: 'right',
						combineErrors: true,
						msgTarget : 'side',
						layout: 'hbox',
						defaults: {
							//flex: 1,
							hideLabel: true
						},
							items: [{
								xtype: 'textareafield',
								name: 'user_nms', 
								reference : 'user_nms',
								itemId : 'user_nms',
								margin: '0 5 0 0',
								width: 400
							},{
								xtype: 'hiddenfield',
								reference: 'user_cds', 
								name: 'user_cds', 
								itemId : 'user_cds'
							}, {
								iconCls: 'x-fa fa-search', 
								xtype: 'button',
								scale: 'small',
								margin: '0 5 0 0',
								handler : 'openWindow3',
								style:{ 
									'border':'none' 

								}
							},{
								iconCls: 'x-fa fa-remove', 
								xtype: 'button',
								scale: 'small',
								handler : 'resetVal3',
								style:{
									'background-color': 'red !important',
									'background-image': 'none',
									'border':'none' 

								}
							}]
				    }                    
        ]
    },
	{
    xtype: 'tabpanel',
	dock: 'bottom', 
	layout: 'fit', 
	height: 222,
	//frame: true, 
	defaults: {
		bodyPadding: 10,
		scrollable: true
	},
	id: 'activityTab',
	reference: 'activityTab', 
	items: [{
				title: '활동내용',
				glyph: 'xf044@FontAwesome',
				itemId: 'keyman',
				items:[
					{ fieldLabel: '활동제목', labelAlign: 'right',xtype: 'textfield',labelWidth: 80, width:500, name: 'sa_subject'},
					{ fieldLabel: '활동내용', labelAlign: 'right',xtype: 'textareafield',labelWidth: 80, width:500, name: 'sa_body'},
					{ fieldLabel: '코멘트', labelAlign: 'right',xtype: 'textareafield',labelWidth: 80, width:500,  name: 'sa_comment', hidden: true}
				],
				listeners: {
				//activate: function(tab,e){	});
				} 
			}, {
				title: 'KeyFactor',
				glyph: 'xf03a@FontAwesome',
				itemId: 'keyfactor',
				xtype: 'checkboxgroup',
				hideLabel: true,
				columns: 4,
				items: [
					{boxLabel: '기회발굴', name: 'sa_target', itemId: 'SATRG_100', inputValue: 'SATRG_100'},
					{boxLabel: '키맨관계강화', name: 'sa_target',itemId: 'SATRG_200', inputValue: 'SATRG_200'},
					{boxLabel: '프로젝트협의', name: 'sa_target',itemId: 'SATRG_300', inputValue: 'SATRG_300'},
					{boxLabel: '신제품미팅', name: 'sa_target', itemId: 'SATRG_400',inputValue: 'SATRG_400'},
					{boxLabel: '제안/견적협의', name: 'sa_target',itemId: 'SATRG_500',inputValue: 'SATRG_500'},
					{boxLabel: '클레임관리', name: 'sa_target',itemId: 'SATRG_600',inputValue: 'SATRG_600'},
					{boxLabel: '기타', name: 'sa_target',itemId: 'SATRG_900',inputValue: 'SATRG_900'}   
				],
				listeners: {
					//activate: function(tab,e){ 
						//Ext.getCmp('common-tabPlaylist').store.load({
							//params: {cust_cd: Ext.getCmp('customerDetail').down('#cust_cd').getValue()}
					//	});
					//}
				}
			}, {
				title: '관련자료',
				glyph: 'xf15c@FontAwesome', 
				xtype: 'muiltFileBox',
				reference: 'muiltFileBox1',
				itemId: 'muiltFileBox1',
                 
				listeners: {
					//activate: function(tab,e){ 
						//Ext.getCmp('common-tabProject').store.load({
						//params: {cust_cd: Ext.getCmp('customerDetail').down('#cust_cd').getValue()}
					 //   });
					//}
				}
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
					{ xtype: 'hiddenfield', reference: 'sa_cd', name: 'sa_cd', itemId : 'sa_cd'},
					{ xtype: 'hiddenfield', reference: 'sa_targets', name: 'sa_targets', itemId : 'sa_targets',
				      listeners: {change : 'keyFactorVal'}
					},
					{ xtype: 'hiddenfield', reference: 'saveMode', name: 'saveMode', itemId : 'saveMode', value: 'Add'},
					{ xtype: 'component', flex: 1 },
					{ xtype: 'button', text: '저장', itemId: 'addbtn', margin: '0 5 0 0',
						listeners: {click : 'onSubmit'}
					},
					{ xtype: 'button', text: '삭제', itemId: 'delbtn', margin: '0 5 0 0',
						listeners: {click : 'onDelete'}
					} 
            ]
        }]
});





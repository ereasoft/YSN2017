/* globals Cal, Kanban */

Ext.define('Ysn.view.MainPanelController', {
    extend : 'Ext.app.ViewController',
    alias  : 'controller.calendar-mainpanel',
	requires: [ 
		'Ysn.view.salesactivity.modify'
    ],
    init: function() {
        this.lookupReference('cardpanel').down('#monthview').getEventStore().load({params:{user_cd:loginUser}}); 
       
	},
    onModeChange : function (cmp, button, isPressed) {
        if (!isPressed) return;

        var vm = this.getViewModel();

        if (button.viewMode === 'weekview') {
            vm.set('activeViewPreset', button.viewPreset);
        }

        vm.set({
            activeMode : button.mode,
            activeCard : button.viewMode
        });

        vm.notify();
    },

    // Since we bind viewPreset via viewModel we can't set start date.
    // Binding allows to pass only one parameter.
    // So we can only fix start date after viewPreset is applied
    fixStartDateAfterViewPresetChange : function (cmp) {
        cmp.setStartDate(this.getViewModel().get('date'));
    },

    onTodayClick : function () {
        this.getViewModel().set('date', Sch.util.Date.setDateToMidnight(new Date()));
    },

    onShiftBack : function () {
        this.shiftPeriod(-1);
    },

    onShiftForward : function () {
        this.shiftPeriod(1);
    },

    shiftPeriod : function (value) {
        var vm   = this.getViewModel(),
            card = this.lookup('cardpanel').getLayout().getActiveItem(),
            date = card.getStartDate(),
            mode = vm.get('activeMode');

        vm.set('date', Sch.util.Date.add(date, Sch.util.Date[Ext.util.Format.uppercase(mode)], value));
    },

    onMonthViewWeekNumberClick : function (monthView, date) {
        this.switchFromMonthToWeekOrDay(date, 'week');
    },

    onMonthViewDayNumberClick : function (monthView, date) {
        this.switchFromMonthToWeekOrDay(date, 'day');
    },

    switchFromMonthToWeekOrDay : function (date, buttonName) {
        this.lookup('navigationbar').down('button[viewPreset=' + buttonName + ']').setPressed();
        this.getViewModel().set('date', Sch.util.Date.setDateToMidnight(date));
    },

	eventclick: function( view, eventRecord, e, eOpts ){

		var win = Ext.getCmp('salesactivity-plan');
        if(!win){
          win = new Ysn.view.salesactivity.modify();
		} 
		var pl = win.down('#detail');
		pl.getForm().reset(); 
		pl.down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
		pl.getForm().findField('paentFrm').setValue('salesactivity-plan');
		pl.getForm().findField('childFrm').setValue('#muiltFile1');
		pl.getForm().findField('saveMode').setValue('Edit');
        pl.getForm().findField('sa_type').getStore().load({params:{up_code_id:'SA_TYPE'}});
		pl.getForm().findField('sa_sdate_time').getStore().load();
		pl.getForm().findField('sa_edate_time').getStore().load();
		pl.getForm().findField('sa_cnct').getStore().load({params:{up_code_id:'SA_CNCT'}});
		pl.load({
				url: '/SalesActivity/popupSalesActivityDetail?sa_cd='+eventRecord.get('SA_CD') //,waitMsg: 'loading...',	
			});

        pl.down('#muiltFileBox1').down('#AttachFileList').getStore().load({
					    params: {
					        biz_gubun: eventRecord.get('SA_CD'),
					        doc_mgt: '',
					        chasu: ''
					    }
					});

		Ext.getCmp('salesactivity-schedule').add(win);
		//win.setPosition(10,-100);
		win.show();
	},
	
	eventvaliddrop :  function(view, record, start, end, eOpts ){
		this.planModefiy(view, record, start, end, eOpts, 'drop');
	},
	
	eventvalidresize : function(view, record, start, end, eOpts){
		this.planModefiy(view, record, start, end, eOpts, 'resize');
	},
    dayclick: function(view, date, e, eOpts){
			this.popupPlan(date, date, '090000', '180000');
	},
	rangeselect: function(view, start, end, eOpts){ 
			this.popupPlan(start, end, '090000', '180000');
	}, 
	weekeventclick : function(scheduler, eventRecord, e, eOpts){ 
			this.eventclick( scheduler, eventRecord, e, eOpts );
	}, 
	weekdragcreateend : function(scheduler, newEventRecord, resource, e, el, eOpts){ 

			this.popupPlan(newEventRecord.get('START_DATE'),newEventRecord.get('END_DATE'), Ext.Date.format(newEventRecord.get('START_DATE'),'His'),Ext.Date.format(newEventRecord.get('END_DATE'),'His'));
	}, 
	weekeventdrop : function( scheduler, records, isCopy, eOpts ){
		     this.planModefiy(scheduler, records[0], records[0].get('START_DATE'), records[0].get('END_DATE'), eOpts, 'week');
	},
	weekeventresizeend : function(scheduler, record, eOpts){
		this.planModefiy(scheduler, record, record.get('START_DATE'), record.get('END_DATE'), eOpts, 'week');
	},
    planModefiy : function(view, record, start, end, eOpts, type){ 
		var win = Ext.getCmp('salesactivity-plan');
        if(!win){
          win = new Ysn.view.salesactivity.modify();
		} 
		var pl = win.down('#detail');
		pl.getForm().findField('saveMode').setValue('Edit');
		pl.getForm().findField('sa_type').getStore().load({params:{up_code_id:'SA_TYPE'}});
		pl.getForm().findField('sa_sdate_time').getStore().load();
		pl.getForm().findField('sa_edate_time').getStore().load();
		pl.getForm().findField('sa_cnct').getStore().load({params:{up_code_id:'SA_CNCT'}});
		Ysn.Util.cbEmptyVal(pl); 
		//win.show();
		pl.load({
					url: '/SalesActivity/popupSalesActivityDetail?sa_cd='+record.get('SA_CD'), //,waitMsg: 'loading...',	
					success: function(form, action) {
                     if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
                        
						if (type == 'resize')
						{ 
								form.findField('sa_sdate_time').setValue('090000');  							 
								form.findField('sa_edate_time').setValue('000000');  
						} 
						if (type == 'week')
						{ 
								form.findField('sa_sdate_time').setValue(Ext.Date.format(start,'His'));  							 
								form.findField('sa_edate_time').setValue(Ext.Date.format(end,'His'));  
						} 
						form.findField('sa_sdate').setValue(start);
						form.findField('sa_edate').setValue(end);
					
						form.submit({
								//waitMsg:'Processing...',
								url: '/salesActivity/salesActivitySave',
								method: 'POST',
								params: form.getValues(), 
								submitEmptyText:false,
								success: function(form, action) {
                                   if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
								   Ext.getCmp('salesactivity-schedule').down('#monthview').getEventStore().reload(); 
								},
								failure: function(form, action) {
									//console.log('response:'+ action);
									var dataVal = Ext.JSON.decode(action.response.responseText)
									Ext.Msg.alert('Failed', dataVal.errmsg); 
								}
							});
			 }
			}); 
 
	},

	openPlan : function () { 
		this.popupPlan(new Date(), new Date(), '090000', '180000');
    },

	popupPlan : function (startdate,enddate,starttime,endtime) { 
	    var win = Ext.getCmp('salesactivity-plan');
        if(!win){
          win = new Ysn.view.salesactivity.modify();
		} 
		var pl = win.down('#detail');
		pl.getForm().reset();  
		pl.down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
		pl.getForm().findField('paentFrm').setValue('salesactivity-plan');
		pl.getForm().findField('childFrm').setValue('#muiltFile1');
		pl.getForm().findField('saveMode').setValue('Add');
		pl.getForm().findField('user_nm').setValue(username);
		pl.getForm().findField('user_cd').setValue(loginUser);
		pl.getForm().findField('sa_type').getStore().load({params:{up_code_id:'SA_TYPE'}});
		pl.getForm().findField('sa_sdate_time').getStore().load();
		pl.getForm().findField('sa_edate_time').getStore().load();
		pl.getForm().findField('sa_sdate').setValue(startdate);
		pl.getForm().findField('sa_edate').setValue(enddate);
        pl.getForm().findField('sa_sdate_time').setValue(starttime);
		pl.getForm().findField('sa_edate_time').setValue(endtime);
		pl.getForm().findField('sa_cnct').getStore().load({params:{up_code_id:'SA_CNCT'}});
        pl.getForm().findField('sa_target').setValue('SATRG_100');
		Ext.getCmp('salesactivity-schedule').add(win);
		//win.setPosition(10,-100);
		win.show();
    },
	
	openReport : function () {
        Ext.getCmp('salesactivity-report').show();
    }

});
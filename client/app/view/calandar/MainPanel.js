Ext.override('Sch.widget.EventEditor', {
     initComponent: function () {
         // extra processing...
         alert('override');
         this.callParent();
     }
 });

Ext.define('Ysn.view.MainPanel', {
    extend     : 'Ext.Container',
    alias      : 'widget.calendar-mainpanel',
    requires   : [
        'Ysn.view.MainPanelController',
        'Ysn.view.NavigationBar',
        'Ysn.view.Scheduler',
        'Ysn.view.MonthView',
        'Ysn.view.ResourceFilter',
        'Ysn.store.Event',
        'Ysn.store.Resource',
        'Sch.panel.SchedulerGrid',
        'interact'
    ],
    controller : 'calendar-mainpanel',
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
                        daynumberclick  : 'onMonthViewDayNumberClick'
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
                        viewchange : 'fixStartDateAfterViewPresetChange'
                    }
                }
            ]
        }
    ],

    initComponent : function () {
        this.callParent(arguments);

        var editor = Ext.create({
            xtype  : 'calendar_eventeditorwindow',
            header : false,
			items : [{xtype: 'salesactivity-modify'}
			]
        });

        this.down('#weekview').normalGrid.addPlugin(editor);
        this.down('#monthview').monthView.eventEditor = editor;
    }
});
 Ext.define('Ysn.locale.Ko', {
        extend    : 'Sch.locale.Locale',
        singleton : true,

        // MyApp.locale.De extends set of phrases provided by Sch.locale.De
        requires  : 'Sch.locale.Ko',

        l10n : {
					'Cal.menu.Day' : {
					newEvent : '',
					paste    : 'Paste'
				},

				'Cal.container.Month' : {
					newEvent : ''
				},

				'Cal.form.EventEditor' : {
					resourceText : 'Calendar'
				},

				'Cal.menu.Event' : {
					showDetails : 'Show Details',
					resource    : 'Calendar',
					'delete'    : 'Delete',
					cut         : 'Cut',
					copy        : 'Copy',
					paste       : 'Paste',
					duplicate   : 'Duplicate'
				},

				'Cal.toolbar.Navigation' : {
					today : 'Today'
				}
		}
});


Ext.define('Ysn.view.Scheduler', {
    extend    : 'Sch.panel.SchedulerGrid',
    alias     : 'widget.calendar-scheduler',
    reference : 'scheduler',

    resourceStore : 'resource',
    eventStore    : 'salesActivityPlan',
    reference : 'scheduler',
    showTodayLine : true,
    weekStartDay : 0,

    viewPreset           : 'week',
    mode                 : 'weekview',
    eventResizeHandles   : 'end',
    eventBodyTemplate    : '{Name}',
    snapToIncrement      : true,
    highlightCurrentTime : true,
    rowHeight            : 35,
    calendarTimeAxisCfg  : {
        height : 30
    },
    padding              : 10,
    bodyBorder           : true,
    split                : false,

   
	initComponent : function() {
        var me = this,
            style = '',
            styleTpl = new Ext.XTemplate(
                '.sch-event-hover.{Name}, .{Name} {',
                '   background-color: {[this.getBackgroundColor(values)]};',
                '   border-color: {Color};',
                '}',
                '.sch-event-hover.sch-event-selected.{Name}, .sch-event-selected.{Name}, .cal-event-selected.{Name} {',
                '   background-color: {Color} !important;',
                '   border-color: {Color};',
                '}',
                {
                    getBackgroundColor : function(values) {
                        return Sch.shadeColor(values.Color, 0.9);
                    }
                }
            );

        me.callParent(arguments);

        me.resourceStore.each(function(record) {
            style += styleTpl.apply(record.data);
			//console.log(styleTpl.apply(record.data));
        });

        Ext.util.CSS.createStyleSheet(style, 'resource-styles');
    },

    setResourceStore : function(store, initial) {
        this.callParent(arguments);
    },

    eventRenderer : function (event, resource, data) {
        //data.style = 'border-color:' + resource.getColor() + '; background-color:' + Sch.shadeColor(resource.getColor(), 0.9);
		if(resource.getName() != undefined){
		data.cls = resource.getName();
		}
		this.eventBodyTemplate.html = '{SA_SUBJECT}';
        return event.data;
    }
});

Sch.shadeColor = function (color, percent) {
    var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
};



Ext.define('Ysn.view.MonthView', {
    extend    : 'Cal.panel.Calendar',
    alias     : 'widget.calendar-monthview',
 
    reference : 'monthview',
    
    padding           : 10,
    hideNavigationBar : true,
    hideMonthBar      : true,
    resourceStore     : 'resource',
    eventStore        : 'salesActivityPlan', 
	eventRenderer : function(event, metaData) {
        var resource = event.getResource(),
            name = resource && resource.getName();
        if (name) metaData.cls += name;
    },
	
	showWeekNumber : false,
	weekStartDay : 0,
	listeners: { 
		dayclick: function(view, date, e, eOpts){
			
		},
		rangeselect: function(start, end, eOpts){ 
		}
		
	}
   

});
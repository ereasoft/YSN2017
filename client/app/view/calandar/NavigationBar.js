Ext.define('Ysn.view.NavigationBar', {
    extend    : 'Ext.panel.Header',
    alias     : 'widget.calendar-navigationbar',
    reference : 'navigationbar',

    cls       : 'navigationbar',
    padding   : '0 10 0 5',
    height    : 40,
    border    : false,
	style	  : {'background-color':'#FFF', color:'#000'},
    viewModel : {
        formulas : {
            period : function (get) {
                var mode     = get('activeMode'),
                    date     = get('date'),
                    startStr = '',
                    endStr   = '';

                switch (mode) {
                    case 'month':
                        startStr = Ext.Date.format(date, 'Y년 m월');
                        break;
                    case 'week':
                        startStr = Ext.Date.format(Sch.util.Date.getWeekStartDate(date), 'Y년 m월 j일') + ' - ' + Ext.Date.format(Sch.util.Date.getWeekEndDate(date), 'Y년 m월 j일');
                        break;
                    case 'day':
                        startStr = Ext.Date.format(date, 'Y년 m월 j일');
                        break;
                }

                return {
                    startDateStr : startStr
                };
            }
        }
    },
	bind: {
		title : '<b>{period.startDateStr}</b>'
	}, 
	titleAlign: 'center',
   // bind      :  '{period}' , 
	//tpl : '<div class="current-period" style="width:50%;text-align:center !important"><b>{startDateStr} {[values.endDateStr ? (" - " + values.endDateStr) : ""]}</b></div>',
    items     : [
	                
					{
					  
						xtype     : 'segmentedbutton',
						width     : 190,
						defaults  : {
							focusable : false 
						},
						items     : [
							{
								text     : 'Month',
								mode     : 'month',
								width    : 70,
								viewMode : 'monthview',
								pressed  : true
							},
							{
								text       : 'Week',
								mode       : 'week',
								width      : 60,
								viewPreset : 'week',
								viewMode   : 'weekview'
							}/*,
							{
								text       : 'Day',
								disabled   : true,
								mode       : 'day',
								width      : 60,
								viewPreset : 'day',
								viewMode   : 'weekview'
							}*/
						],
						listeners : {
							toggle : 'onModeChange'
						}
					},
					{
						xtype       : 'segmentedbutton',
						reference   : 'shiftingbuttons',
						width       : 120,
						allowToggle : false,
						defaults    : {
							focusable : false
						},			
						margin : '0 2 0 0',
						items       : [
							{
								xtype     : 'button',
								width     : 30,
								glyph     : 'xf0d9@FontAwesome',
								focusable : false,
								handler   : 'onShiftBack'
							},
							{
								xtype     : 'button',
								width     : 60,
								text      : 'Today',
								focusable : false,
								handler   : 'onTodayClick'
							},
							{
								xtype     : 'button',
								width     : 30,
								glyph     : 'xf0da@FontAwesome',
								focusable : false,
								handler   : 'onShiftForward'
							}
						]
					},
					{
						xtype     : 'button', 
						text     : '활동등록',
						focusable : false,
						handler   : 'openPlan'
					} 
    ]
});

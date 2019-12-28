
/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'Ysn',

    extend: 'Ysn.Application',

    requires: [
        'Ysn.view.main.Main',
		'Ysn.view.main.login',
		'Ysn.view.main.mainpopupView',
	    'Sch.locale.En',
		'Sch.locale.Ko',
	    'Ysn.view.salesactivity.Detail',
		'Ysn.view.main.menuController',
		'Ysn.view.main.menu', 
        'Ysn.view.board.mboardsearch',
		'Ext.chart.*',
        'PmhTech.plugin.grid.Exporter' 
    ],

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
   // mainView: 'Ysn.view.main.Main'
	
	launch: function() {
	    Sch.locale[localeClass].apply();
	   // this.setMainView( 'Ysn.view.estimate.estimateDetail' );
		if(flag == 0){
		    this.setMainView('Ysn.view.main.Main');      
		}else if(flag == 1){
		    this.setMainView('Ysn.view.main.login');
		}else if(flag == 3){
		    this.setMainView( 'Ysn.view.estimate.requestMain' );
		}else{
			this.setMainView('Ysn.view.main.mainpopupView'); 
		}   

	   // this.setMainView( 'Ysn.view.estimate.estimateDetail' );

	
    }
    //-------------------------------------------------------------------------
    // Most customizations should be made to Ysn.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});

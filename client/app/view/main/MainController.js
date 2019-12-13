/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Ysn.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    init: function () {
     
        if (company_cd == 'YONWOO') {
            Ext.getCmp('centerregion').add({ xtype: 'main-mainView', title: 'Dashboard' });
        } else {
            Ext.getCmp('centerregion').add({ xtype: 'main-mainView2', title: 'Dashboard' });
        }
    }
    

});
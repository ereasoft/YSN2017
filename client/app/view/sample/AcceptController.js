Ext.define('Ysn.view.sample.AcceptController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acceptcontrol',
    view: 'sample.Accept',

    init: function() {
        this.control({
            'sampleaccept': {
                itemclick: function(dataview, record, item, index, e) {
					openPerfectPopup(300,'태스트','팝업테스트');
					//this.lookupReference('Detail') 
						}
            } 
        });
    },
    showAlert : function(){
        alert("출력");
    }


});

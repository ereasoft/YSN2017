Ext.define('Ysn.view.common.chgpwdController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-chgpwd',
    init: function () { 
    },
    chgPwd: function () {
        var pl = Ext.getCmp('common-chgpwd');
        if (pl.down('#current_pw').getValue() == '') {
            Ext.Msg.alert('Warning', Locale.getMsg('기존비밀번호를 입력하세요.'));
            return false;
        }
        if (pl.down('#new_pw').getValue() == '') {
            Ext.Msg.alert('Warning', Locale.getMsg('신규비밀번호를 입력하세요.'));
            return false;
        }
        if (pl.down('#renew_pw').getValue() == '') {
            Ext.Msg.alert('Warning', Locale.getMsg('신규비밀번호재확인을 입력하세요.'));
            return false;
        }
        if (pl.down('#new_pw').getValue() != pl.down('#renew_pw').getValue()) {
            Ext.Msg.alert('Warning', Locale.getMsg('신규비밀번호와 신규비밀번호재확인이 다릅니다.'));
            return false;
        }

        Ext.Ajax.request({
            url: '/Member/PasswdChange',
            method: 'POST',
            params: {
                current_pw: pl.down('#current_pw').getValue(),
                change_pw: pl.down('#new_pw').getValue()
            },
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                if (obj.success) {
                    Ext.Msg.alert('Success', Locale.getMsg('비밀번호 변경완료.'), function () { pl.close() });
                } else {
                    Ext.Msg.alert('Fail', Locale.getMsg(obj.errmsg));
                }
            },

            failure: function (response, opts) {
                Ext.Msg.alert('Fail', Locale.getMsg('비밀번호 변경실패') );
            }
        });
    }


});

Ext.define('Ysn.view.common.searchpjtController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-searchpjt',
    init: function () {
        var userNm = this.lookupReference('user_nm');
        if (auth_id != 'A001') userNm.setValue(username);
    },
    onChange: function (el, newValue, oldValue, eOpts) {
        if (newValue != null && newValue != '') {
            var pl = el.up('container');
            var paentFrm = Ext.getCmp(newValue);
            //pl.items.items[0].setValue(paentFrm.down('#pjt_nm').getValue());
            this.chkSearch();
        }
    },
    chkSearch: function () {
        var pjt_nm = this.lookupReference('pjt_nm');
        var userNm = this.lookupReference('user_nm');
        //if(!userNm.getValue() && !custNm.getValue() ){ 
        //	Ext.MessageBox.alert('Warning', '검색어를 입력하세요.', function(){return true;});
        //}else{ 
        this.lookupReference('searchGrid').store.load({
            params: {
                pjt_nm: pjt_nm.getValue(),
                user_nm: userNm.getValue() 
            }
        });
        //}
    },
    onSelect: function (view, record, index, e) {
        var paentFrm = Ext.getCmp(this.lookupReference('paentFrm').getValue());
        if (this.lookupReference('paentFrm').getValue() == 'projectMgr-search') {
            paentFrm.down('#pjt_nm').setValue(record.get('PJT_NM'));
            paentFrm.down('#pjt_cd').setValue(record.get('PJT_CD'));
        } else { 
            paentFrm.down('#pjt_nm').setValue(record.get('PJT_NM'));
            paentFrm.down('#pjt_cd').setValue(record.get('PJT_CD'));
            paentFrm.down('#user_cd').setValue(record.get('USER_CD'));
            paentFrm.down('#user_nm').setValue(record.get('USER_NM'));
            paentFrm.down('#dept_cd').setValue(record.get('DEPT_CD'));
            paentFrm.down('#dept_nm').setValue(record.get('DEPT_NM'));
            paentFrm.down('#cust_cd').setValue(record.get('CUST_CD'));
            paentFrm.down('#cust_nm').setValue(record.get('CUST_NM'));
            paentFrm.down('#euser_cd').setValue(record.get('EUSR_CD'));
            paentFrm.down('#euser_nm').setValue(record.get('EUSR_NM'));
            paentFrm.down('#dstr_type').setValue(record.get('DSTR_TYPE'));
        }
        //console.log(this); 
        this.getView().close();
        //this.close();
    }


});

Ext.define('Ysn.view.common.searchcustomerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-searchcustomer',
    init: function(){ 
        var userNm = this.lookupReference('user_nm');  
		if(auth_id != 'A001') userNm.setValue(username);
	},
	onChange: function(el, newValue, oldValue, eOpts){
		if(newValue != null && newValue != ''){
			var pl = el.up('container');
			var paentFrm = Ext.getCmp(newValue);
			pl.items.items[0].setValue(paentFrm.down('#cust_nm').getValue());
			this.chkSearch();
		}
	},
	chkSearch: function(){ 
        var userNm = this.lookupReference('user_nm');
        var custNm = this.lookupReference('cust_nm'); 
		//if(!userNm.getValue() && !custNm.getValue() ){ 
		//	Ext.MessageBox.alert('Warning', '검색어를 입력하세요.', function(){return true;});
		//}else{ 
           this.lookupReference('searchGrid').store.load({
			   params:{cust_nm: custNm.getValue(),
			   user_nm: userNm.getValue()}
		   });
		//}
	},
	onSelect: function(view,record,index,e){
		var paentFrm = Ext.getCmp(this.lookupReference('paentFrm').getValue());
	    paentFrm.down('#cust_nm').setValue(record.get('CUST_NM'));
		paentFrm.down('#cust_cd').setValue(record.get('CUST_CD'));
	    //console.log(this); 
		this.getView().close();
		//this.close();
	}


});

Ext.define('Ysn.view.common.searchcustomer2Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-searchcustomer2',
	init: function(){ 
        var userNm = this.lookupReference('user_nm');  
		if(auth_id != 'A001') userNm.setValue(username);
	},
	onChange: function(el, newValue, oldValue, eOpts){
		if(newValue != null && newValue != ''){
			var pl = el.up('container');
			var paentFrm = Ext.getCmp(newValue);
			pl.items.items[0].setValue(paentFrm.down('#bcust_nm').getValue());
			this.chkSearch();
		}
	},
    chkSearch: function () {
        var userNm = this.lookupReference('user_nm');
        var custNm = this.lookupReference('cust_nm');
        if (!userNm.getValue() && !custNm.getValue()) {
            //Ext.MessageBox.alert('Warning', '검색어를 입력하세요.', function () { return true; });
        } else {
            this.lookupReference('searchGrid').store.load({
                params: {
                    cust_nm: custNm.getValue(),
                    user_nm: userNm.getValue()
                }
            });
        }
    },
    onSelect: function (view, record, index, e) {
        var paentFrm = Ext.getCmp(this.lookupReference('paentFrm').getValue());
        paentFrm.down('#bcust_nm').setValue(record.get('CUST_NM'));
        paentFrm.down('#bcust_cd').setValue(record.get('CUST_CD'));
        //console.log(this);
        this.getView().close();
        //this.close();
    }


});

Ext.define('Ysn.view.common.searchPartUserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-searchPartUser',
    init: function(){
		this.lookupReference('bizGroup').store.load();  
        this.lookupReference('bizGroup').setValue('');
	},
	onChangeBiz: function(el,newVal,oldVal,e){
		var deptCombo = this.lookupReference('deptGroup'); 
		if(oldVal != null){
				deptCombo.store.load({params:{up_dept_cd:newVal}}); 
				 
		}else{
				deptCombo.store.insert(0, {DEPT_CD: '',DEPT_NM: Locale.getMsg('전체')});  				
		}
		deptCombo.setValue('');
		deptCombo.doQuery(); 
		el.focus();

	},
	onChange: function (el, newValue, oldValue, eOpts) {
	    if (newValue != null && newValue != '') {
	        var pl = el.up('container');
	        var paentFrm = Ext.getCmp(newValue);
	        pl.items.items[0].setValue(paentFrm.down('#user_nm').getValue());
	        this.chkSearch();
	    }
	},
	chkSearch: function(){
		   var user_nm,up_dept_cd,up_cd, vdept_cd;
		   var bizGroup = this.lookupReference('bizGroup');
		   var deptGroup = this.lookupReference('deptGroup');
		   var user_nm = this.lookupReference('user_nm').getValue();
		   if(deptGroup.store.data.items.length < 2){
             up_dept_cd = '';
			 vdept_cd = bizGroup.getValue();
		   }else{
			  up_dept_cd = bizGroup.getValue();
			  vdept_cd = deptGroup.getValue();
		   }
           this.lookupReference('searchGrid').store.load({
			   params:{user_nm: user_nm,
				       up_dept_cd: up_dept_cd,
				       dept_cd: vdept_cd}
		   });
	},
	onSelect: function(view,record,index,e){
	    var paentFrm = Ext.getCmp(this.lookupReference('paentFrm').getValue());
	    var idx = this.lookupReference('idx').getValue()
	    paentFrm.down('#user_nm' + idx).setValue(record.get('USER_NM'));
	    paentFrm.down('#user_cd' + idx).setValue(record.get('USER_CD'));
	    paentFrm.down('#dept_nm' + idx).setValue(record.get('DEPT_NM'));
	    paentFrm.down('#dept_cd' + idx).setValue(record.get('DEPT_CD'));
		//console.log(this);
		this.getView().close();
		//this.close();
	} 


});

Ext.define('Ysn.view.common.searchSelUserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-searchSelUser',
    init: function(){
        this.lookupReference('selCompany').store.load();  
        this.lookupReference('selCompany').setValue('YONWOO');
		this.lookupReference('bizGroup').store.load();  
        this.lookupReference('bizGroup').setValue('');
	},
	onChangeBiz: function(el,newVal,oldVal,e){
		var deptCombo = this.lookupReference('deptGroup'); 
		if(oldVal != null){
				deptCombo.store.load({params:{up_dept_cd:newVal}}); 
				 
		}else{
				deptCombo.store.insert(0, {DEPT_CD: '',DEPT_NM: Locale.getMsg('전체')});  				
		}
		deptCombo.setValue('');
		deptCombo.doQuery(); 
		el.focus();

	},	 
	chkSearch: function(){
		   var user_nm,up_dept_cd,up_cd;
		   var company_cd = this.lookupReference('selCompany').getValue();
		   var bizGroup = this.lookupReference('bizGroup');
		   var deptGroup = this.lookupReference('deptGroup');
		   var user_nm = this.lookupReference('user_nm').getValue();
		   if(deptGroup.store.data.items.length < 2){
             up_dept_cd = '';
			 dept_cd = bizGroup.getValue();
		   }else{
			  up_dept_cd = bizGroup.getValue();
			  dept_cd = deptGroup.getValue();
		   }
           this.lookupReference('searchGrid').store.load({
			   params:{user_nm: user_nm,
				       up_dept_cd: up_dept_cd,
				       dept_cd: dept_cd,
				       company_cd : company_cd
				   }
		   });
	},
	onSelect: function(view,record,index,e){
	    var paentFrm = Ext.getCmp(this.lookupReference('paentFrm').getValue());
	    var idx = this.lookupReference('idx').getValue()
	    paentFrm.down('#user_nm' + idx).setValue(record.get('USER_NM'));
	    paentFrm.down('#user_cd' + idx).setValue(record.get('USER_CD'));
	    paentFrm.down('#dept_nm' + idx).setValue(record.get('DEPT_NM'));
	    paentFrm.down('#dept_cd' + idx).setValue(record.get('DEPT_CD'));
		//console.log(this);
		this.getView().close();
		//this.close();
	} 


});

Ext.define('Ysn.view.common.searchPartMngController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-searchPartMng',
    init: function () {
       // this.lookupReference('bizGroup').store.load();
        // this.lookupReference('bizGroup').setValue('');
        //this.chkSearch(); 
        this.lookupReference('selCompany').setValue('YONWOO');
        this.lookupReference('selPart1').store.load({ params: { company_cd: 'YONWOO' } }); 
    },
    onselCompany: function (el, newVal, oldVal, e) {
        var selPart1 = this.lookupReference('selPart1');
        var selPart2 = this.lookupReference('selPart2');
        var selPart3 = this.lookupReference('selPart3');
        if (newVal != '') {
            selPart1.store.load({ params: { company_cd: newVal } });
        }  
        selPart2.store.removeAll();
        selPart3.store.removeAll();
        selPart1.setValue('');

    },
    onselPart1: function (el, newVal, oldVal, e) {
        var company = this.lookupReference('selCompany').getValue();
        var selPart2 = this.lookupReference('selPart2');
        var selPart3 = this.lookupReference('selPart3');
        if (newVal != '') {
            selPart2.store.load({ params: { company_cd: company, up_dept_cd: newVal } });

        }
        selPart3.store.removeAll();
        selPart2.setValue('');

    },
    onselPart2: function (el, newVal, oldVal, e) {
        var company = this.lookupReference('selCompany').getValue();
        var selPart3 = this.lookupReference('selPart3');
        if (newVal != '') {
            selPart3.store.load({ params: { company_cd: company, up_dept_cd: newVal } });

        }
        selPart3.setValue('');

    }, 
    onChange: function (el, newVal, oldVal, e) {
        this.chkSearch();
    },

    chkSearch: function () {
        var user_nm = this.lookupReference('user_nm').getValue();
        var selCompany = this.lookupReference('selCompany').getValue();
        var selPart1 = this.lookupReference('selPart1').getValue();
        var selPart2 = this.lookupReference('selPart2').getValue();
        var selPart3 = this.lookupReference('selPart3').getValue();
       /* var bizGroup = this.lookupReference('bizGroup');
        var deptGroup = this.lookupReference('deptGroup');
        var user_nm = this.lookupReference('user_nm').getValue();
        if (deptGroup.store.data.items.length < 2) {
            up_dept_cd = '';
            dept_cd = bizGroup.getValue();
        } else {
            up_dept_cd = bizGroup.getValue();
            dept_cd = deptGroup.getValue();
        } */
        this.lookupReference('searchGrid').store.load({
            params: {
                searchUserNm: user_nm,
                selCompany: selCompany,
                selPart1: selPart1,
                selPart2: selPart2,
                selPart3: selPart3
            }
        });
    },
    onSelect: function (view, record, index, e) {
        var paentFrm = Ext.getCmp(this.lookupReference('paentFrm').getValue());
        var auth_id = this.lookupReference('auth_id').getValue();
        if (this.lookupReference('paentFrm').getValue() == 'adminDeptList') {
        var sel_model = paentFrm.getSelectionModel();
        sel_model.getSelection()[0].set("DEPT_MGR_NM", record.get('USER_NM'));
        sel_model.getSelection()[0].set("DEPT_MGR_CD", record.get('USER_CD')); 
        }
        if (this.lookupReference('paentFrm').getValue() == 'authUserList') {
            Ext.Ajax.request({
                url: '/AdminAuth/popupAuthUserReg',
                method: 'post',
                params: { company_cd: record.get('COMPANY_CD'), auth_id: auth_id, auth_user_cd: record.get('USER_CD') },
                success: function (response, opts) {
                    Ext.Msg.alert('담당자추가', '담당자가 추가되었습니디.');
                    paentFrm.getStore().reload();
                },

                failure: function (response, opts) {
                    Ext.Msg.alert('Failed', '오류가 발생했습니다.');
                }

            });
        }
        //console.log(this);
        this.getView().close();
        //this.close();
    }


});


Ext.define('Ysn.view.common.searchKeymanController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-searchKeyman',
    init: function(){ 
		var paentFrm = Ext.getCmp('keymanDetail');
		this.getView().down('#searchGrid').store.load({params:{km_nm:paentFrm.getForm().findField("km_nm").getValue()}});
		//if(this.getView().down('#searchGrid').store.data.items.length == 0) this.getView().close();
	}, 
	onSelect: function(view,record,index,e){
		var paentFrm = Ext.getCmp(this.lookupReference('paentFrm').getValue()); 
		paentFrm.getForm().load({url: '/keyman/keyManDetail?km_cd='+record.get('KM_CD')});
		paentFrm.getForm().findField("km_nm").setConfig('readOnly',true);
        paentFrm.down('#btnIdchk').hide();
		paentFrm.getForm().findField("idChk").setValue('');
		this.getView().close();
	    /*paentFrm.down('#km_nm').setValue(record.get('KM_NM'));
		paentFrm.down('#km_cd').setValue(record.get('KM_CD'));
		paentFrm.down('#dept_nm').setValue(record.get('DEPT_NM'));
		paentFrm.down('#dept_cd').setValue(record.get('DEPT_CD'));*/
		//console.log(this);

		//this.getView().close();
		//this.close();
	}, 
	onChkAdd: function(){
		var paentFrm = Ext.getCmp(this.lookupReference('paentFrm').getValue());
	    /*paentFrm.down('#km_nm').setValue(record.get('KM_NM'));
		paentFrm.down('#km_cd').setValue(record.get('KM_CD'));
		paentFrm.down('#dept_nm').setValue(record.get('DEPT_NM'));
		paentFrm.down('#dept_cd').setValue(record.get('DEPT_CD'));*/
		//console.log(this);
        paentFrm.getForm().findField("idChk").setValue('add');
		this.getView().close();
		//this.close();
	} 


});

Ext.define('Ysn.view.common.searchKeyman2Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-searchKeyman2',
    
	chkSearch: function(){
        var kmNm = this.lookupReference('km_nm');
        var custCd = this.lookupReference('cust_cd');
		if(!kmNm.getValue() && !custCd.getValue() ){ 
			Ext.MessageBox.alert('Warning', '검색어를 입력하세요.', function(){return true;});
		}else{ 
           this.lookupReference('searchGrid').store.load({
			   params:{cust_cd: custCd.getValue(),
			   km_nm: kmNm.getValue()}
		   });
		}
	},
	onSelect: function(view,record,index,e){
		var selGripStore = Ext.getCmp('commonSearchKeyman2').lookupReference('searchGrid2').getStore();
        selGripStore.insert(0,record);
		view.getStore().removeAt(index);

	},
	onSelect2: function(view,record,index,e){
		var selGripStore = Ext.getCmp('commonSearchKeyman2').lookupReference('searchGrid').getStore();
		selGripStore.insert(0,record);
		view.getStore().removeAt(index);
	},
	addKeyman: function(){
		var selGripStore = Ext.getCmp('commonSearchKeyman2').lookupReference('searchGrid2').getStore();
		var records = selGripStore.getData().items;
		var km_cd = '',km_nm = '';
        for(var i=0;i<selGripStore.getCount();i++){
			km_nm = km_nm + records[i].get('KM_NM');
			km_cd = km_cd + records[i].get('KM_CD');
			if(i<selGripStore.getCount()-1) {
               km_nm = km_nm + ',';
			   km_cd = km_cd + ',';
			}
		}
          
		var paentFrm = Ext.getCmp(this.lookupReference('paentFrm').getValue());
	    paentFrm.down('#km_nms').setValue(km_nm);
		paentFrm.down('#km_cds').setValue(km_cd); 
        //paentFrm.getForm().findField("idChk").setValue('add');
		this.getView().close();
		//this.close();
	} 


});

Ext.define('Ysn.view.common.searchPartUser2Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-searchPartUser2',
    init: function(){
		this.lookupReference('bizGroup').store.load();  
        this.lookupReference('bizGroup').setValue('');
	},
	onChangeBiz: function(el,newVal,oldVal,e){
		var deptCombo = this.lookupReference('deptGroup'); 
		if(oldVal != null){
				deptCombo.store.load({params:{up_dept_cd:newVal}}); 
				 
		}else{
				deptCombo.store.insert(0, {DEPT_CD: '',DEPT_NM: Locale.getMsg('전체')});  				
		}
		deptCombo.setValue('');
		deptCombo.doQuery(); 
		el.focus();

	},	 
	chkSearch: function(){
		   var user_nm,up_dept_cd,up_cd;
		   var bizGroup = this.lookupReference('bizGroup');
		   var deptGroup = this.lookupReference('deptGroup');
		   var user_nm = this.lookupReference('user_nm').getValue();
		   if(deptGroup.store.data.items.length < 2){
             up_dept_cd = '';
			 dept_cd = bizGroup.getValue();
		   }else{
			  up_dept_cd = bizGroup.getValue();
			  dept_cd = deptGroup.getValue();
		   }
           this.lookupReference('searchGrid').store.load({
			   params:{user_nm: user_nm,
				       up_dept_cd: up_dept_cd,
				       dept_cd: dept_cd}
		   });
	},
	onSelect: function(view,record,index,e){
		var selGripStore = Ext.getCmp('commonsearchPartUser2').lookupReference('searchGrid2').getStore();
        selGripStore.insert(0,record);
		view.getStore().removeAt(index);

	},
	onSelect2: function(view,record,index,e){
		var selGripStore = Ext.getCmp('commonsearchPartUser2').lookupReference('searchGrid').getStore();
		selGripStore.insert(0,record);
		view.getStore().removeAt(index);
	},
	addShareUser: function(){
		var selGripStore = Ext.getCmp('commonsearchPartUser2').lookupReference('searchGrid2').getStore();
		var records = selGripStore.getData().items;
		var user_cd = '',user_nm = '';
        for(var i=0;i<selGripStore.getCount();i++){
			user_nm = user_nm + records[i].get('USER_NM')+'['+records[i].get('USER_CD')+']';
			user_cd = user_cd + records[i].get('USER_CD');
			if(i<selGripStore.getCount()-1) {
               user_nm = user_nm + ',';
			   user_cd = user_cd + ',';
			}
		}
          
		var paentFrm = Ext.getCmp(this.lookupReference('paentFrm').getValue());
	    paentFrm.down('#user_nms').setValue(user_nm);
		paentFrm.down('#user_cds').setValue(user_cd); 
        //paentFrm.getForm().findField("idChk").setValue('add');
		this.getView().close();
		//this.close();
	} 


});

Ext.define('Ysn.view.common.fileuploadController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-fileupload',
    init: function(){ 
	},
	firstFormSave: function() {
        var form = this.lookupReference('csvfileupload').getForm();

        if (form.isValid()) {
            form.submit({
                url: '/ProductInquiry/csvUpload',
                waitMsg: 'Uploading .',
                success: function(fp, o) {
					if(!Ysn.Util.OnsessOut(o.response.responseText)) return false;
                    var tpl = new Ext.XTemplate(
                        '영문일괄업로드 완료'
                    );

                    Ext.Msg.alert('Success', tpl.apply(o.result)); 
					Ext.getStore('inquiry').load(
						{params: {  deptGroup : Ext.getCmp('inquiry-search').lookupReference('deptGroup').getValue(),
									bizGroup  : Ext.getCmp('inquiry-search').lookupReference('bizGroup').getValue(),
									inq_chnl   : Ext.getCmp('inquiry-search').lookupReference('inq_chnl').getValue(),
									userGroup   : Ext.getCmp('inquiry-search').lookupReference('userGroup').getValue(),
									inq_type   : Ext.getCmp('inquiry-search').lookupReference('inq_type').getValue(),
									inq_status   : Ext.getCmp('inquiry-search').lookupReference('inq_status').getValue(),
									inq_rsdate    : Ext.Date.format(Ext.getCmp('inquiry-search').lookupReference('inq_rsdate').getValue(),'Y-m-d'),
									inq_redate: Ext.Date.format(Ext.getCmp('inquiry-search').lookupReference('inq_redate').getValue(),'Y-m-d')          
						}}
					);
					Ext.getCmp('commonfileupload').close();
                },
                failure: function (fp, o) {
                    var dataVal = Ext.JSON.decode(o.response.responseText);
                    Ext.Msg.alert('파일업로드실패', '원인:' + dataVal.errmsg + '</br>' + '파일내용을 재확인하거나 관리자에게 문의하세요.');
                }
            });
        }
		
		//this.getView().close();
    }
});

Ext.define('Ysn.view.common.fileupload2Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-fileupload2',
    init: function () {
    },
    firstFormSave: function () {
        var form = this.lookupReference('csvfileupload2').getForm();

        if (form.isValid()) {
            form.submit({
                url: '/ProductInquiry/csvUpload2',
                waitMsg: 'Uploading .',
                success: function (fp, o) {
					if(!Ysn.Util.OnsessOut(o.response.responseText)) return false;
                    var tpl = new Ext.XTemplate(
                        '중문일괄업로드 완료'
                    );

                    Ext.Msg.alert('Success', tpl.apply(o.result));
                    Ext.getStore('inquiry').load(
						{
						    params: {
						        deptGroup: Ext.getCmp('inquiry-search').lookupReference('deptGroup').getValue(),
						        bizGroup: Ext.getCmp('inquiry-search').lookupReference('bizGroup').getValue(),
						        inq_chnl: Ext.getCmp('inquiry-search').lookupReference('inq_chnl').getValue(),
						        userGroup: Ext.getCmp('inquiry-search').lookupReference('userGroup').getValue(),
						        inq_type: Ext.getCmp('inquiry-search').lookupReference('inq_type').getValue(),
						        inq_status: Ext.getCmp('inquiry-search').lookupReference('inq_status').getValue(),
						        inq_rsdate: Ext.Date.format(Ext.getCmp('inquiry-search').lookupReference('inq_rsdate').getValue(), 'Y-m-d'),
						        inq_redate: Ext.Date.format(Ext.getCmp('inquiry-search').lookupReference('inq_redate').getValue(), 'Y-m-d')
						    }
						}
					);
                    Ext.getCmp('commonfileupload2').close();
                },
                failure: function (fp, o) {
                    var dataVal = Ext.JSON.decode(o.response.responseText);
                    Ext.Msg.alert('파일업로드실패', '원인:' + dataVal.errmsg + '</br>' + '파일내용을 재확인하거나 관리자에게 문의하세요.');
                }

            });
        }

        //this.getView().close();
    }
});

Ext.define('Ysn.view.common.xlsfileuploadController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-xlsfileupload',
    init: function(){ 
	},
	firstFormSave: function() {
        var form = this.lookupReference('xlsfileupload').getForm();

        if (form.isValid()) {
            form.submit({
                url: '/ProductInquiry/cvsKorUpload',
                waitMsg: 'Uploading .',
                success: function(fp, o) {
					if(!Ysn.Util.OnsessOut(o.response.responseText)) return false;
                    var tpl = new Ext.XTemplate(
                        '국문일괄업로드 완료'
                    );

                    Ext.Msg.alert('Success', tpl.apply(o.result)); 
					Ext.getStore('inquiry').load(
						{params: {  deptGroup : Ext.getCmp('inquiry-search').lookupReference('deptGroup').getValue(),
									bizGroup  : Ext.getCmp('inquiry-search').lookupReference('bizGroup').getValue(),
									inq_chnl   : Ext.getCmp('inquiry-search').lookupReference('inq_chnl').getValue(),
									userGroup   : Ext.getCmp('inquiry-search').lookupReference('userGroup').getValue(),
									inq_type   : Ext.getCmp('inquiry-search').lookupReference('inq_type').getValue(),
									inq_status   : Ext.getCmp('inquiry-search').lookupReference('inq_status').getValue(),
									inq_rsdate    : Ext.Date.format(Ext.getCmp('inquiry-search').lookupReference('inq_rsdate').getValue(),'Y-m-d'),
									inq_redate: Ext.Date.format(Ext.getCmp('inquiry-search').lookupReference('inq_redate').getValue(),'Y-m-d')          
						}}
					);
					Ext.getCmp('commonxlsfileupload').close();
                },
                failure: function (fp, o) {
                    var dataVal = Ext.JSON.decode(o.response.responseText);
                    Ext.Msg.alert('파일업로드실패','원인:' + dataVal.errmsg + '</br>' + '파일내용을 재확인하거나 관리자에게 문의하세요.');
                } 
            });
        }
		
		
    }


});

Ext.define('Ysn.view.common.searchItemController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-searchItem',
    
    init: function(){

	}, 
	onChange: function(el, newValue, oldValue, eOpts){
		if(newValue != null && newValue != ''){
			var pl = el.up('container');
			var paentFrm = Ext.getCmp(newValue);
			pl.items.items[0].setValue(paentFrm.down('#item_nm').getValue());
			//this.chkSearch();
		}
	},
	chkSearch: function(){
        var item = this.lookupReference('item');
        var item_level1 = this.lookupReference('item_level1');
        this.lookupReference('searchGrid').store.load({
			   params:{item: item.getValue(),
			   item_level1: item_level1.getValue()}
		});
	},
	onSelect: function(view,record,index,e){
		var paentFrm = Ext.getCmp(this.lookupReference('paentFrm').getValue());
	    paentFrm.down('#item_nm').setValue(record.get('ITEM_NM'));
		paentFrm.down('#item_cd').setValue(record.get('ITEM_CD'));
		//console.log(this);
		this.getView().close();
		//this.close();
	}


});

Ext.define('Ysn.view.common.specChklistController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-specChklist',
    init: function(){ 

    },
    onCheck: function () { 
        var pl = Ext.getCmp('commonspecChklist');
        var form = pl.lookupReference('commonspecChkform').getForm();
        var url = '/SampleManage/specInsert';
        if (form.findField('paentFrm').getValue() == 'requestDetail') {  
            if (form.findField('mode').getValue() != 'SMRTP_100' && !form.findField('p_tube_overcap').checked) {
                Ext.Msg.alert('Tube > Overcap', ' No check!');
                //form.findField('p_tube_overcap').focus()
                return false;
            }
            if (form.findField('mode').getValue() != 'SMRTP_100' && !form.findField('p_tube_pump').checked) {
                Ext.Msg.alert('Tube > Pump', ' No check!');
                //form.findField('p_tube_pump').focus()
                return false;
            }
            if (form.findField('mode').getValue() != 'SMRTP_100' && !form.findField('p_tube_sleeve').checked) {
                Ext.Msg.alert('Tube > Sleeve', ' No check!');
                //form.findField('p_tube_sleeve').focus()
                return false;
            }
            if (form.findField('mode').getValue() != 'SMRTP_200' && !form.findField('p_pump_overcap').checked) {
                Ext.Msg.alert('Pump > Overcap', ' No check!');
                //form.findField('p_pump_overcap').focus()
                return false;
            }
            if (form.findField('mode').getValue() != 'SMRTP_200' && !form.findField('p_pump_pump').checked) {
                Ext.Msg.alert('Pump > Pump', ' No check!');
               // form.findField('p_pump_pump').focus()
                return false;
            }
            if (form.findField('mode').getValue() != 'SMRTP_200' && !form.findField('p_pump_cont').checked) {
                Ext.Msg.alert('Pump > Bottle', 'No check!');
               // form.findField('p_pump_cont').focus()
                return false;
            }
            if (form.findField('mode').getValue() != 'SMRTP_200' && !form.findField('p_pump_support').checked) {
                Ext.Msg.alert('Pump > Base', 'No check!');
               // form.findField('p_pump_support').focus()
                return false;
            }
            url = '/SampleManage/specUpdate';
        }
        if (form.isValid()) { 
            form.setConfig('url', url);
            form.submit({
                waitMsg: 'Processing...',
                method: 'POST',
                params: form.getValues(),
                success: function (frm, action) { 
					if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
                    //Ext.Msg.alert('처리상태', '처리완료');
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    var parent = frm.findField('paentFrm').getValue();
                    if (parent == 'completDetail') {
                        Ext.getCmp(parent).getForm().findField('spec_yn').setValue('Y'); 
                        Ext.getCmp(parent).getForm().findField('process_cd').setValue('SMP_STEP200'); 
                        Ext.getCmp(parent).getForm().findField('prdt_cdate').setValue(new Date());
                        Ext.getCmp(parent).getController('sampleproduction-completDetail').onSubmit();
                    } else {
                        Ext.getCmp(parent).getForm().findField('spec_yn').setValue('Y');
                        Ext.getCmp(parent).getForm().findField('smp_status').setValue('SMSTAT_650');
                        Ext.getCmp(parent).getController('samplerequest-requestDetail').onSubmit();
                    }
                    pl.close();
                },
                failure: function (frm, action) {
                    //console.log('response:'+ action);
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.'); 
                    //Ext.getCmp('keymanList').store.reload();
                }
            });
        }
    }

});

Ext.define('Ysn.view.common.searchEndUserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-searchEndUser',
    onChange: function (el, newValue, oldValue, eOpts) {
        if (newValue != null && newValue != '') {
            var pl = el.up('container');
            var paentFrm = Ext.getCmp(newValue);
            pl.items.items[0].setValue(paentFrm.down('#euser_nm').getValue());
            this.chkSearch();
        }
    },
	chkSearch: function(){
        var euser_nm = this.lookupReference('euser_nm');
        var euser_eng_nm = this.lookupReference('euser_eng_nm');
	    this.lookupReference('searchGrid').store.load({
		   params:{euser_nm: euser_nm.getValue(),euser_eng_nm: euser_eng_nm.getValue()}
	    });
	},
	onSelect: function(view,record,index,e){
		var paentFrm = Ext.getCmp(this.lookupReference('paentFrm').getValue());
	    paentFrm.down('#euser_nm').setValue(record.get('EUSER_NM'));
		paentFrm.down('#euser_cd').setValue(record.get('EUSER_CD'));
		//console.log(this);
		this.getView().close();
		//this.close();
	}


});

Ext.define('Ysn.view.common.searchSmpCdController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-searchSmpCd',
    
	chkSearch: function(){
        var item_nm = this.lookupReference('item_nm');
        var cust_nm = this.lookupReference('cust_nm');
	    this.lookupReference('searchGrid').store.load({
		   params:{item_nm: item_nm.getValue(),cust_nm: cust_nm.getValue()}
	    });
	},
	onSelect: function(view,record,index,e){
		var paentFrm = Ext.getCmp(this.lookupReference('paentFrm').getValue());
	    paentFrm.down('#euser_cd').setValue(record.get('EUSER_CD'));
		paentFrm.down('#euser_nm').setValue(record.get('EUSER_NM'));
		paentFrm.down('#item_nm').setValue(record.get('ITEM_NM')); 
		paentFrm.down('#item_cd').setValue(record.get('ITEM_CD'));
		paentFrm.down('#smp_rqty').setValue(record.get('SMP_RQTY'));
		paentFrm.down('#smr_cd').setValue(record.get('SMR_CD'));
		paentFrm.down('#smr_chasu').setValue(record.get('SMR_CHASU'));
		paentFrm.down('#pur_oqty').setValue(record.get('PUR_OQTY'));
		paentFrm.down('#prdt_rcdate').setValue(record.get('SMR_PODATE'));
		switch (record.get('PROJECT_POSS')) {
		    case  'A' :
		        paentFrm.down('#prdt_psblt').setValue('PRPB_100');
		        break;
		    case 'B':
		        paentFrm.down('#prdt_psblt').setValue('PRPB_200');
		        break;
		    case 'C':
		        paentFrm.down('#prdt_psblt').setValue('PRPB_300');
		        break;
		    case 'D':
		        paentFrm.down('#prdt_psblt').setValue('PRPB_400');
		        break;
		    case 'E':
		        paentFrm.down('#prdt_psblt').setValue('PRPB_500');
		        break;

		}
		paentFrm.down('#muiltFileBox3').down('#AttachFileList').getStore().load({
		    params: {
		        biz_gubun: record.get('SMR_CD'),
		        doc_mgt: 'sampleDec',
		        chasu: record.get('SMR_CHASU')
		    }
		});
		//console.log(this);
		this.getView().close();
		//this.close();
	}


});

Ext.define('Ysn.view.common.searchBaseCrnyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-searchBaseCrny',
    init: function(){
      var today = new Date();
	  this.lookupReference('base_yr').setValue(today.getFullYear());
	},
	chkSearch: function(){
        var base_yr = this.lookupReference('base_yr'); 
	    this.lookupReference('searchGrid').store.load({
		   params:{base_yr: base_yr.getValue()}
	    });
	},
	onSelect: function(view,record,index,e){
		var paentFrm = Ext.getCmp(this.lookupReference('paentFrm').getValue());
	    paentFrm.down('#base_yr').setValue(record.get('BASE_YR'));
		paentFrm.down('#base_crny').setValue(record.get('BASE_CRNY'));
		paentFrm.down('#exch_rate').setValue(record.get('EXCH_RATE'));
		//console.log(this);
		this.getView().close();
		//this.close();
	}


});

Ext.define('Ysn.view.common.dropPopController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-dropPop',
    init: function(){  
		this.lookupReference('smp_drtype').store.load({
		   params:{up_code_id: 'SMP_DRTYPE'}
		});
	}, 
	onSubmit: function(){
		var pl = Ext.getCmp('common-dropPop');
		var form = pl.lookupReference('common-dropPopDetail').getForm();
		var parentfrm = form.findField('parentfrm').getValue();  
		Ysn.Util.cbEmptyVal(pl); 
		if (form.isValid()) {
			var url = '/SampleManage/sampleDrop';
			form.setConfig('url',url);
			form.submit({
				waitMsg:'Processing...', 
                method: 'POST',
				params: form.getValues(),
				submitEmptyText:false,
				success: function(form, action) {
                   if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
				   var dataVal = Ext.JSON.decode(action.response.responseText)
				   Ext.Msg.alert(Locale.getMsg('처리상태'), Locale.getMsg('처리완료')); 
				   Ext.getCmp(parentfrm).getForm().findField('smp_status').setValue('SMSTAT_900');
				   Ext.getCmp(parentfrm).getForm().findField('smp_status_nm').setValue('DROP(고객)');
                   Ext.getCmp(parentfrm).getForm().findField('drop_btn_yn').setValue('Y');
                   Ext.getCmp('instanceList').store.reload();
				   pl.close();
				},
				failure: function(form, action) {
					//console.log('response:'+ action);
					var dataVal = Ext.JSON.decode(action.response.responseText)
					Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.');  
					//Ext.getCmp('keymanList').store.reload();
				}
			});
		}
	}


});

Ext.define('Ysn.view.common.opptdropPopController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-opptdropPop',
    init: function () {
        var Today = new Date();
        this.lookupReference('oppt_drdate').setValue(Today);
        this.lookupReference('oppt_drtype').store.load({
            params: { up_code_id: 'OPPT_DRTYPE' }
        });
    },
    onSubmit: function () {
        var pl = Ext.getCmp('common-opptdropPop');
        var form = pl.lookupReference('common-opptdropPopDetail').getForm();
        var parentfrm = form.findField('parentfrm').getValue();
        Ysn.Util.cbEmptyVal(pl);
        if (form.isValid()) {
            var url = '/Opportunity/opportunityDrop';
            form.setConfig('url', url);
            form.submit({
                waitMsg: 'Processing...',
                method: 'POST',
                params: form.getValues(),
                submitEmptyText: false,
                success: function (form, action) {
					if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.alert(Locale.getMsg('처리상태'), Locale.getMsg('처리완료')); 
                    Ext.getCmp('opportunityList').store.reload();
                    Ext.getCmp('opportunityList').getForm().reset();
                    Ext.getCmp('businessopportunity-opportunity').down('#east').toggleCollapse();
                    pl.close();
                },
                failure: function (form, action) {
                    //console.log('response:'+ action);
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.'); 
                    //Ext.getCmp('keymanList').store.reload();
                }
            });
        }
    }


});


Ext.define('Ysn.view.common.myRepairPopController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-myRepairPop',
    init: function(){  
		this.lookupReference('smp_qrtype').store.load({
		   params:{up_code_id: 'SMP_QRTYPE'}
		});
	}, 
	onSubmit: function(){
		var pl = Ext.getCmp('common-myRepairPop');
		var form = pl.lookupReference('common-myRepairPopDetail').getForm();
		var parentfrm = form.findField('parentfrm').getValue();  
		Ysn.Util.cbEmptyVal(pl); 
		if (form.isValid()) {
			var url = '/SampleManage/sampleMyRepair';
			form.setConfig('url',url);
			form.submit({
				waitMsg:'Processing...', 
                method: 'POST',
				params: form.getValues(),
				submitEmptyText:false,
				success: function(form, action) {
                   if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
				   var dataVal = Ext.JSON.decode(action.response.responseText)
				   /*Ext.getCmp(parentfrm).getForm().load({
						url: '/SampleManage/selectSampleDetail?smp_cd='+dataVal.smp_cd+'&smp_chasu='+dataVal.smp_chasu //,waitMsg: 'loading...',	
				   }); */
				   Ext.getCmp(parentfrm).getForm().reset();
				   Ext.getCmp(parentfrm).down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
				   Ext.getCmp(parentfrm).down('#muiltFileBox2').down('#AttachFileList').getStore().removeAll();
				   Ext.getCmp(parentfrm).down('#muiltFileBox3').down('#AttachFileList').getStore().removeAll();
				    
				   Ext.getCmp(parentfrm).down('#muiltFileBox1').down('#paentFrm').setValue('sampleproduction-instance');
				   Ext.getCmp(parentfrm).down('#muiltFileBox1').down('#childFrm').setValue('#muiltFile1');  
				    
                   Ext.getCmp('instanceList').store.reload();				   
				   Ext.Msg.alert(Locale.getMsg('처리상태'), Locale.getMsg('처리완료'));  
				   pl.close();
				},
				failure: function(form, action) {
					//console.log('response:'+ action);
					var dataVal = Ext.JSON.decode(action.response.responseText)
					Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.');  
					//Ext.getCmp('keymanList').store.reload();
				}
			});
		}
	}


});


Ext.define('Ysn.view.common.RepairPopController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-RepairPop',
    init: function(){  
		this.lookupReference('smp_crtype').store.load({
		   params:{up_code_id: 'SMP_CRTYPE'}
		});
	}, 
	onSubmit: function(){
		var pl = Ext.getCmp('common-RepairPop');
		var form = pl.lookupReference('common-RepairPopDetail').getForm();
		var parentfrm = form.findField('parentfrm').getValue();  
		Ysn.Util.cbEmptyVal(pl); 
		if (form.isValid()) {
			var url = '/SampleManage/sampleRepair';
			form.setConfig('url',url);
			form.submit({
				waitMsg:'Processing...', 
                method: 'POST',
				params: form.getValues(),
				submitEmptyText:false,
				success: function(form, action) {
                   if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
				   var dataVal = Ext.JSON.decode(action.response.responseText)
				   /*Ext.getCmp(parentfrm).getForm().load({
						url: '/SampleManage/selectSampleDetail?smp_cd='+dataVal.smp_cd+'&smp_chasu='+dataVal.smp_chasu //,waitMsg: 'loading...',	
				   }); */
				   Ext.getCmp(parentfrm).getForm().reset();
				   Ext.getCmp(parentfrm).down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
				   Ext.getCmp(parentfrm).down('#muiltFileBox2').down('#AttachFileList').getStore().removeAll();
				   Ext.getCmp(parentfrm).down('#muiltFileBox3').down('#AttachFileList').getStore().removeAll();
				    
				   Ext.getCmp(parentfrm).down('#muiltFileBox1').down('#paentFrm').setValue('sampleproduction-instance');
				   Ext.getCmp(parentfrm).down('#muiltFileBox1').down('#childFrm').setValue('#muiltFile1');  
                   Ext.getCmp('instanceList').store.reload(); 
				   Ext.Msg.alert(Locale.getMsg('처리상태'), Locale.getMsg('처리완료')); 
				   pl.close();
				},
				failure: function(form, action) {
					//console.log('response:'+ action);
					var dataVal = Ext.JSON.decode(action.response.responseText)
					Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.');  
					//Ext.getCmp('keymanList').store.reload();
				}
			});
		}
	}


});

Ext.define('Ysn.view.common.rejectPopController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-rejectPop',
    init: function(){  
		this.lookupReference('smp_rttype').store.load({
		   params:{up_code_id: 'SMP_RTTYPE'}
		});
	}, 
	onSubmit: function(){
		var pl = Ext.getCmp('common-rejectPop');
		var form = pl.lookupReference('common-rejectPopDetail').getForm();
		var parentfrm = form.findField('parentfrm').getValue();  
		Ysn.Util.cbEmptyVal(pl); 
		if (form.isValid()) {
			var url = '/SampleManage/sampleReturn';
			form.setConfig('url',url);
			form.submit({
				waitMsg:'Processing...', 
                method: 'POST',
				params: form.getValues(),
				submitEmptyText:false,
				success: function(form, action) {
                   if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
				   var dataVal = Ext.JSON.decode(action.response.responseText)
				   /*Ext.getCmp(parentfrm).getForm().load({
						url: '/SampleManage/selectSampleDetail?smp_cd='+dataVal.smp_cd+'&smp_chasu='+dataVal.smp_chasu //,waitMsg: 'loading...',	
				   }); */
				   Ext.getCmp(parentfrm).getForm().reset();
				   Ext.getCmp(parentfrm).down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
				   Ext.getCmp(parentfrm).down('#muiltFileBox2').down('#AttachFileList').getStore().removeAll();
				   Ext.getCmp(parentfrm).down('#muiltFileBox3').down('#AttachFileList').getStore().removeAll();
                   Ext.getCmp('approvalList').store.reload();				   
				   Ext.Msg.alert(Locale.getMsg('처리상태'), Locale.getMsg('처리완료')); 
				   pl.close();
				},
				failure: function(form, action) {
					//console.log('response:'+ action);
					var dataVal = Ext.JSON.decode(action.response.responseText)
					Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.');  
					//Ext.getCmp('keymanList').store.reload();
				}
			});
		}
	}


});

Ext.define('Ysn.view.common.smr_rejectPopController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-smr_rejectPop',
    init: function(){  
		this.lookupReference('smr_rttype').store.load({
		   params:{up_code_id: 'SMP_RTTYPE'}
		});
	}, 
	onSubmit: function(){
		var pl = Ext.getCmp('common-smr_rejectPop');
		var form = pl.lookupReference('common-smr_rejectPopDetail').getForm();
		var parentfrm = form.findField('parentfrm').getValue();  
		Ysn.Util.cbEmptyVal(pl); 
		if (form.isValid()) {
			var url = '/SampleRequest/sampleReturn';
			form.setConfig('url',url);
			form.submit({
				waitMsg:'Processing...', 
                method: 'POST',
				params: form.getValues(),
				submitEmptyText:false,
				success: function(form, action) {
                    if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
				    var dataVal = Ext.JSON.decode(action.response.responseText)
				    var tpl = Ext.getCmp(parentfrm);
				    /*tpl.getForm().findField('smp_status').setValue('SMSTAT_060');
				    tpl.getForm().findField('smp_status_nm').setValue('요청반려');*/
				    tpl.down('#fbtn1').hide(); 
					 tpl.down('#fbtn2').hide();  
					 tpl.down('#fbtn3').hide();  
					 tpl.down('#fbtn4').hide();  
					 tpl.down('#fbtn5').hide();  
                    tpl.getForm().reset();
                    tpl.down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
		            tpl.down('#muiltFileBox2').down('#AttachFileList').getStore().removeAll();
	                tpl.down('#muiltFileBox1').down('#paentFrm').setValue('samplerequest-receipt');
	                tpl.down('#muiltFileBox1').down('#childFrm').setValue('#muiltFile1');
	                tpl.down('#muiltFileBox2').down('#paentFrm').setValue('samplerequest-receipt');
	                tpl.down('#muiltFileBox2').down('#childFrm').setValue('#muiltFile2');
                   Ext.getCmp('receiptList').store.reload();				   
				   Ext.Msg.alert(Locale.getMsg('처리상태'), Locale.getMsg('처리완료')); 
				   pl.close();
				},
				failure: function(form, action) {
					//console.log('response:'+ action);
					var dataVal = Ext.JSON.decode(action.response.responseText)
					Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.');  
					//Ext.getCmp('keymanList').store.reload();
				}
			});
		}
	}


});

Ext.define('Ysn.view.common.smr_reviewPopController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-smr_reviewPop',
    init: function () {
        this.lookupReference('smr_rvtype').store.load({
            params: { up_code_id: 'SMP_RTTYPE' }
        });
    },
    onSubmit: function () {
        var pl = Ext.getCmp('common-smr_reviewPop');
        var form = pl.lookupReference('common-smr_reviewPopDetail').getForm();
        var parentfrm = form.findField('parentfrm').getValue();
        Ysn.Util.cbEmptyVal(pl);
        if (form.isValid()) {
            var url = '/SampleRequest/sampleRequestCheckReturnPopProc';
            form.setConfig('url', url);
            form.submit({
                waitMsg: 'Processing...',
                method: 'POST',
                params: form.getValues(),
                submitEmptyText: false,
                success: function (form, action) {
					if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    var tpl = Ext.getCmp(parentfrm);
                    /*tpl.getForm().findField('smp_status').setValue('SMSTAT_080');
                    tpl.getForm().findField('smp_status_nm').setValue('검토반려');*/

                    tpl.down('#fbtn1').hide(); 
					 tpl.down('#fbtn2').hide();  
					 tpl.down('#fbtn3').hide();  
					 tpl.down('#fbtn4').hide();  
					 tpl.down('#fbtn5').hide();  
					tpl.getForm().reset();
                    tpl.down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
		            tpl.down('#muiltFileBox2').down('#AttachFileList').getStore().removeAll();
	                tpl.down('#muiltFileBox1').down('#paentFrm').setValue('samplerequest-review');
	                tpl.down('#muiltFileBox1').down('#childFrm').setValue('#muiltFile1');
	                tpl.down('#muiltFileBox2').down('#paentFrm').setValue('samplerequest-review');
	                tpl.down('#muiltFileBox2').down('#childFrm').setValue('#muiltFile2');
                    Ext.getCmp('reviewList').store.reload();
                    Ext.Msg.alert(Locale.getMsg('처리상태'), Locale.getMsg('처리완료'));
                    pl.close();
                },
                failure: function (form, action) {
                    //console.log('response:'+ action);
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.'); 
                    //Ext.getCmp('keymanList').store.reload();
                }
            });
        }
    }


});

Ext.define('Ysn.view.common.smr_RepairPopController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-smr_RepairPop',
    init: function () {
        this.lookupReference('smr_crtype').store.load({
            params: { up_code_id: 'SMP_CRTYPE' }
        });
    },
    onSubmit: function () {
        var pl = Ext.getCmp('common-smr_RepairPop');
        var form = pl.lookupReference('common-smr_RepairPopDetail').getForm();
        var parentfrm = form.findField('parentfrm').getValue();
        Ysn.Util.cbEmptyVal(pl);
        if (form.isValid()) {
            var url = '/SampleRequest/sampleRequestRepairProc';
            form.setConfig('url', url);
            form.submit({
                waitMsg: 'Processing...',
                method: 'POST',
                params: form.getValues(),
                submitEmptyText: false,
                success: function (form, action) {
					if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    var tpl = Ext.getCmp(parentfrm);
                    /*tpl.getForm().findField('smp_status').setValue('SMSTAT_020');
                    tpl.getForm().findField('smp_status_nm').setValue('샘플요청');
                    tpl.getForm().findField('smr_chasu').setValue(parseInt(tpl.getForm().findField('max_chasu').getValue()) + 1);*/
                    tpl.down('#fbtn1').hide(); 
					 tpl.down('#fbtn2').hide();  
					 tpl.down('#fbtn3').hide();  
					 tpl.down('#fbtn4').hide();  
					 tpl.down('#fbtn5').hide();  
					tpl.getForm().reset();
                    tpl.down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
		            tpl.down('#muiltFileBox2').down('#AttachFileList').getStore().removeAll();
	                tpl.down('#muiltFileBox1').down('#paentFrm').setValue('samplerequest-request');
	                tpl.down('#muiltFileBox1').down('#childFrm').setValue('#muiltFile1');
	                tpl.down('#muiltFileBox2').down('#paentFrm').setValue('samplerequest-request');
	                tpl.down('#muiltFileBox2').down('#childFrm').setValue('#muiltFile2');
                    Ext.getCmp('requestList').store.reload();
                    Ext.Msg.alert(Locale.getMsg('처리상태'), Locale.getMsg('처리완료'));
                    pl.close();
                },
                failure: function (form, action) {
                    //console.log('response:'+ action);
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.'); 
                    //Ext.getCmp('keymanList').store.reload();
                }
            });
        }
    }


});

Ext.define('Ysn.view.common.smr_dropPopController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-smr_dropPop',
    init: function () {
        this.lookupReference('smr_drtype').store.load({
            params: { up_code_id: 'SMP_DRTYPE' }
        });
    },
    onSubmit: function () {
        var pl = Ext.getCmp('common-smr_dropPop');
        var form = pl.lookupReference('common-smr_dropPopDetail').getForm();
        var parentfrm = form.findField('parentfrm').getValue();
        Ysn.Util.cbEmptyVal(pl);
        if (form.isValid()) {
            var url = '/SampleRequest/sampleRequestDropPopProc';
            form.setConfig('url', url);
            form.submit({
                waitMsg: 'Processing...',
                method: 'POST',
                params: form.getValues(),
                submitEmptyText: false,
                success: function (form, action) {
					if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    var tpl = Ext.getCmp(parentfrm);
                    /*tpl.getForm().findField('smp_status').setValue('SMSTAT_900');
                    tpl.getForm().findField('smp_status_nm').setValue('DROP');*/ 
					 tpl.down('#fbtn1').hide(); 
					 tpl.down('#fbtn2').hide();  
					 tpl.down('#fbtn3').hide();  
					 tpl.down('#fbtn4').hide();  
					 tpl.down('#fbtn5').hide();  
					tpl.getForm().reset();
                    tpl.down('#muiltFileBox1').down('#AttachFileList').getStore().removeAll();
		            tpl.down('#muiltFileBox2').down('#AttachFileList').getStore().removeAll();
	                tpl.down('#muiltFileBox1').down('#paentFrm').setValue('samplerequest-request');
	                tpl.down('#muiltFileBox1').down('#childFrm').setValue('#muiltFile1');
	                tpl.down('#muiltFileBox2').down('#paentFrm').setValue('samplerequest-request');
	                tpl.down('#muiltFileBox2').down('#childFrm').setValue('#muiltFile2');
                    Ext.getCmp('requestList').store.reload();
                    Ext.Msg.alert(Locale.getMsg('처리상태'), Locale.getMsg('처리완료'));
                    pl.close();
                },
                failure: function (form, action) {
                    //console.log('response:'+ action);
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.'); 
                    //Ext.getCmp('keymanList').store.reload();
                }
            });
        }
    }


});

Ext.define('Ysn.view.common.itemInsertController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-itemInsert',
    init: function () {
        this.lookupReference('item_type').store.load({
            params: { up_code_id: 'ITEM_TYPE', lang: localeCd }
        });
    },
    onSubmit: function () {
        var pl = Ext.getCmp('common-itemInsert');
        var form = pl.lookupReference('common-itemInsertDetail').getForm();
        var parentfrm = form.findField('paentFrm').getValue();
        Ysn.Util.cbEmptyVal(pl);
        if (form.isValid()) {
            var url = '/SampleManage/sampleItemInsert';
            form.setConfig('url', url);
            form.submit({
                waitMsg: 'Processing...',
                method: 'POST',
                params: form.getValues(),
                submitEmptyText: false,
                success: function (form, action) {
					if(!Ysn.Util.OnsessOut(action.response.responseText)) return false;
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    var tpl = Ext.getCmp(parentfrm);
                    tpl.getForm().findField('item_cd').setValue(dataVal.item_cd);
                    tpl.getForm().findField('item_nm').setValue(dataVal.item_nm); 
                    Ext.Msg.alert(Locale.getMsg('처리상태'), Locale.getMsg('등록완료'));
                    pl.close();
                },
                failure: function (form, action) {
                    //console.log('response:'+ action);
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.alert('Warning', '서비스에 이상이 있으니 관리자에게 문의하세요.'); 
                    //Ext.getCmp('keymanList').store.reload();
                }
            });
        }
    }


});

Ext.define('Ysn.view.common.findDeptController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-findDept',
    init: function () {   
        this.lookupReference('selPart1').setValue('');
        this.lookupReference('selPart2').setValue('');
        this.lookupReference('selPart3').setValue('');
            
    },
    onselCompany: function (el, newVal, oldVal, e) {
        var selPart1 = this.lookupReference('selPart1');
        var selPart2 = this.lookupReference('selPart2');
        var selPart3 = this.lookupReference('selPart3');
        if (newVal != '') {
            selPart1.store.load({ params: { company_cd: newVal } });

        } 
        selPart2.store.removeAll();
        selPart3.store.removeAll();
        selPart1.setValue('');

    },
    onselPart1: function (el, newVal, oldVal, e) {
        var company = this.lookupReference('selCompany').getValue();
        var selPart2 = this.lookupReference('selPart2');
        var selPart3 = this.lookupReference('selPart3');
        if (newVal != '') {
            selPart2.store.load({ params: { company_cd: company, up_dept_cd: newVal } });

        }
        this.lookupReference('dept_cd').setValue(newVal);
        this.lookupReference('dept_nm').setValue(el.getRawValue());
        selPart3.store.removeAll();
        selPart2.setValue('');

    },
    onselPart2: function (el, newVal, oldVal, e) {
        var company = this.lookupReference('selCompany').getValue();
        var selPart3 = this.lookupReference('selPart3');
        if (newVal != '') {
            selPart3.store.load({ params: { company_cd: company, up_dept_cd: newVal } });

        }
        this.lookupReference('dept_cd').setValue(newVal);
        this.lookupReference('dept_nm').setValue(el.getRawValue());
        selPart3.setValue('');

    },
    onselPart3: function (el, newVal, oldVal, e) { 
        this.lookupReference('dept_cd').setValue(newVal);
        this.lookupReference('dept_nm').setValue(el.getRawValue()); 

    },
    onSubmit: function () { 
        var pl = Ext.getCmp('common-findDept');
        var form = pl.lookupReference('common-findDeptDetail').getForm();
        var parentfrm = form.findField('paentFrm').getValue();
        Ext.getCmp(parentfrm).getForm().findField('deptNm').setValue(form.findField('dept_nm').getValue()); 
        Ext.getCmp(parentfrm).getForm().findField('deptCd').setValue(form.findField('dept_cd').getValue());
        pl.close();
    }


});

Ext.define('Ysn.view.common.mailFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-mailForm',
    init: function () {
        

    },

    openWindow: function () {
        //if(!Ext.getCmp('common-searchPartUser')){
        var win = Ext.getCmp('common-searchMailUser');
        if (!win) {
            win = new Ysn.view.common.searchMailUser();
        }
        var hidfield = win.query('#paentFrm')[0];
        hidfield.setValue('common-mailForm'); 
        Ext.getCmp('common-mailForm').add(win);
        win.show();
        //}
    },
    resetVal: function () {
        this.lookupReference('toEmailNm').setValue('');
        this.lookupReference('toEmail').setValue('');
    },
    
    onSEND: function () {
        var pl = Ext.getCmp('common-mailForm'); 
        var form = pl.lookupReference('common-htmlEditor').getForm();
        if (form.isValid()) { 
           // form.findField('mailBody').setValue(form.findField('mailBodyOri').getValue().replace(/</gi, '^!').replace(/>/gi, '!^'));
            var url = '/SampleRequest/SampleSendMail';
            form.setConfig('url',url);
            form.submit({
                waitMsg: 'Processing...',
                method: 'POST',
                params: form.getValues(),
                submitEmptyText: false,
                success: function (form, action) {
                    Ext.Msg.alert('Success', '메일발송완료');
                    pl.close();
                },
                failure: function (form, action) {
                    var dataVal = Ext.JSON.decode(action.response.responseText)
                    Ext.Msg.alert('Warning', dataVal.errmsg);
                }
            });
        }
        
    },
    onPrint: function () {
        var printBody = '<html><head></head><body>' + this.lookupReference('mailBodyOri').getValue() + '</body></html>';
        bodyPrint(printBody);

    }


});

Ext.define('Ysn.view.common.searchMailUserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-searchMailUser',
    init: function () { 
        this.lookupReference('selPart1').store.load({ params: { company_cd: 'YONWOO' } });
        this.lookupReference('selPart1').setValue('');
    }, 
    onselPart1: function (el, newVal, oldVal, e) { 
        var selPart2 = this.lookupReference('selPart2');
        var selPart3 = this.lookupReference('selPart3');
        if (newVal != '') {
            selPart2.store.load({ params: { company_cd: 'YONWOO', up_dept_cd: newVal } });

        }
        selPart3.store.removeAll();
        selPart2.setValue('');

    },
    onselPart2: function (el, newVal, oldVal, e) { 
        var selPart3 = this.lookupReference('selPart3');
        if (newVal != '') {
            selPart3.store.load({ params: { company_cd: 'YONWOO', up_dept_cd: newVal } });

        }
        selPart3.setValue('');

    }, 

    chkSearch: function () {
        var user_nm = this.lookupReference('user_nm').getValue(); 
        var selPart1 = this.lookupReference('selPart1').getValue();
        var selPart2 = this.lookupReference('selPart2').getValue();
        var selPart3 = this.lookupReference('selPart3').getValue();
        /* var bizGroup = this.lookupReference('bizGroup');
         var deptGroup = this.lookupReference('deptGroup');
         var user_nm = this.lookupReference('user_nm').getValue();
         if (deptGroup.store.data.items.length < 2) {
             up_dept_cd = '';
             dept_cd = bizGroup.getValue();
         } else {
             up_dept_cd = bizGroup.getValue();
             dept_cd = deptGroup.getValue();
         } */
        this.lookupReference('searchGrid').store.load({
            params: {
                searchUserNm: user_nm,
                selCompany: 'YONWOO',
                selPart1: selPart1,
                selPart2: selPart2,
                selPart3: selPart3
            }
        });
    }, 
    onSelect: function (view, record, index, e) {
        var selGripStore = Ext.getCmp('common-searchMailUser').lookupReference('searchGrid2').getStore();
        selGripStore.insert(0, record);
        view.getStore().removeAt(index);

    },
    onSelect2: function (view, record, index, e) {
        var selGripStore = Ext.getCmp('common-searchMailUser').lookupReference('searchGrid').getStore();
        selGripStore.insert(0, record);
        view.getStore().removeAt(index);
    },
    onSelectAll: function () {
        //Ext.getCmp('common-searchMailUser').mask('Processing ...');
        var oriGripStore = Ext.getCmp('common-searchMailUser').lookupReference('searchGrid').getStore();
        var records = oriGripStore.getData().items;
        var selGripStore = Ext.getCmp('common-searchMailUser').lookupReference('searchGrid2').getStore();
        for (var i = 0; i < oriGripStore.getCount() ; i++) {
            selGripStore.insert(0, records[i]);
        }
        oriGripStore.removeAll();
        //Ext.getCmp('common-searchMailUser').unmask();

    },
    onCancelAll: function () {
        //Ext.getCmp('common-searchMailUser').mask('Processing ...');
        var oriGripStore = Ext.getCmp('common-searchMailUser').lookupReference('searchGrid2').getStore();
        var records = oriGripStore.getData().items;
        var selGripStore = Ext.getCmp('common-searchMailUser').lookupReference('searchGrid').getStore();
        for (var i = 0; i < oriGripStore.getCount() ; i++) {
            selGripStore.insert(0, records[i]);
        }
        oriGripStore.removeAll();
       // Ext.getCmp('common-searchMailUser').unmask();
    },
    addShareUser: function () {
        var selGripStore = Ext.getCmp('common-searchMailUser').lookupReference('searchGrid2').getStore();
        var records = selGripStore.getData().items;
        var toEmail = '', toEmailNm = '';
        for (var i = 0; i < selGripStore.getCount() ; i++) {
            toEmailNm = toEmailNm + records[i].get('USER_NM') + '[' + records[i].get('USER_CD') + ']';
            toEmail = toEmail + records[i].get('USER_CD') + '@yonwookorea.com';
            if (i < selGripStore.getCount() - 1) {
                toEmailNm = toEmailNm + ',';
                toEmail = toEmail + ',';
            }
        }

        var paentFrm = Ext.getCmp(this.lookupReference('paentFrm').getValue());
        paentFrm.down('#toEmailNm').setValue(toEmailNm);
        paentFrm.down('#toEmail').setValue(toEmail);
        //paentFrm.getForm().findField("idChk").setValue('add');
        this.getView().close();
        //this.close();
    }


});

Ext.define('Ysn.view.common.mainPopupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.common-mainPopup',
    init: function () {
       // Ext.getStore('mainPopup').load();

    } 

     
});
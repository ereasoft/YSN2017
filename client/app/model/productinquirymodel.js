Ext.define('Ysn.model.inquiryList', {  //T_PRDT_INQRY 
            extend: 'Ext.data.Model', 
            fields: [  
                {name: 'INQ_RDATE', type: 'date', dateFormat:'Y-m-d'}, //접수일
				{name: 'INQ_CHNL', type: 'string'},  //문의경로
				{name: 'INQ_CHNL_NM', type: 'string'},  //문의경로
				{name: 'INQ_RUSER_NM', type: 'string'}, //접수담당자
				{name: 'USER_NM', type: 'string'}, //사후조치자
				{name: 'DSTR_TYPE', type: 'string'},  //유통구조
				{ name: 'DSTR_TYPE_NM', type: 'string' },  //유통구조
                { name: 'NAT_NM', type: 'string' },  //국가
				{name: 'INQ_STATUS', type: 'string'}, //진행사항
				{name: 'INQ_STATUS_NM', type: 'string'}, //진행사항
				{name: 'INQ_USER_NM', type: 'string'}, //문의자
				{name: 'INQ_TYPE', type: 'string'},  //문의유형
				{name: 'INQ_ITEM_NM', type: 'string'}, //문의제품
				{name: 'POST_ARNG', type: 'string'}, //조치내역
				{ name: 'INQ_CD', type: 'string' },  //접수번호
                { name: 'ORDER_YN', type: 'string' },  //매출발생여부
                 { name: 'ORDER_AMOUNT', type: 'string' }  //매출금액
            ]  
});  

Ext.define('Ysn.model.inquiryDetail', {  //T_PRDT_INQRY 
            extend: 'Ext.data.Model', 
            fields: [  
				{name: 'inq_cd',		mapping: 'INQ_CD',			type: 'string'},  //접수번호,
			    {name: 'inq_chnl',		mapping: 'INQ_CHNL',		type: 'string'},  //문의경로
				{name: 'inq_chnl_nm',	mapping: 'INQ_CHNL_NM',	type: 'string'},  //문의경로명
				{name: 'inq_type',		mapping: 'INQ_TYPE',		type: 'string'},  //문의유형
				{name: 'inq_type_nm',	mapping: 'INQ_TYPE_NM',	type: 'string'},  //문의유형명
				{name: 'inq_ruser_cd',	mapping: 'INQ_RUSER_CD',	type: 'string'}, //접수담당자
				{name: 'inq_ruser_nm',	mapping: 'INQ_RUSER_NM',	type: 'string'}, //접수담당자명
				{name: 'user_cd',		mapping: 'USER_CD',		type: 'string'}, //사후조치자
				{name: 'user_nm',		mapping: 'USER_NM',		type: 'string'}, //사후조치자명
				{name: 'dept_cd',		mapping: 'DEPT_CD',		type: 'string'}, //부서코드
				{name: 'dept_nm',		mapping: 'DEPT_NM',		type: 'string'}, //부서명
                {name: 'inq_rdate',		mapping: 'INQ_RDATE',		type: 'string'}, //접수일
                {name: 'inq_ddate',		mapping: 'INQ_DDATE',		type: 'string'}, //전달일
				{name: 'dlv_user_cd',	mapping: 'DLV_USER_CD',	type: 'string'}, //전달자
				{name: 'dlv_user_nm',	mapping: 'DLV_USER_NM',	type: 'string'}, //전달자명
				{name: 'dstr_type',		mapping: 'DSTR_TYPE',		type: 'string'},  //유통구조
				{name: 'dstr_type_nm',	mapping: 'DSTR_TYPE_NM',	type: 'string'},  //유통구조명
				{name: 'inq_status',	mapping: 'INQ_STATUS',		type: 'string'}, //진행사항
				{name: 'inq_status_nm',	mapping: 'INQ_STATUS_NM',	type: 'string'}, //진행사항명
				{name: 'inq_company',	mapping: 'INQ_COMPANY',	type: 'string'}, //고객사
				{name: 'inq_addr',		mapping: 'INQ_ADDR',		type: 'string'}, //주소
				{name: 'inq_user_nm',	mapping: 'INQ_USER_NM',	type: 'string'}, //문의자
				{name: 'inq_email',		mapping: 'INQ_EMAIL',		type: 'string'}, //문의자이메일
				{name: 'inq_mphone',	mapping: 'INQ_MPHONE',		type: 'string'}, //문의자휴대폰
				{name: 'inq_contents',	mapping: 'INQ_CONTENTS',	type: 'string'}, //문의내용
				{name: 'post_arng',		mapping: 'POST_ARNG',		type: 'string'}, //조치내역
				{name: 'nat_cd',		mapping: 'NAT_CD',			type: 'string'}, //국가코드
				{name: 'inq_item_nm',		mapping: 'INQ_ITEM_NM',			type: 'string'}, //문의제품명
				{ name: 'use_yn', mapping: 'USE_YN', type: 'string' }, //사용여부	
                { name: 'order_yn', mapping: 'ORDER_YN', type: 'string' },  //매출발생여부
                 { name: 'order_amount', mapping: 'ORDER_AMOUNT', type: 'string' }  //매출금액
            ]  
});  


 
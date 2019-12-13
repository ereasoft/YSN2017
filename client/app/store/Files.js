Ext.define('Ysn.store.Files', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.files'


 /*rootData: {
        text: 'Ext JS',
        expanded: false,
        children: [
            {
                text: '고객정보 DB',
				align: 'left',
                children: [
                    { leaf:true, text: '거래처', url: 'customerDb-customer' },
					{ leaf:true, text: '고객담당(keyman)', url: 'customerDb-keyman' }
                ]
            },
            {
                text: '영업활동 관리', 
                children: [
                    { leaf:true, text: '영업활동 일정 관리', url: 'salesactivity-schedule'},
                    { leaf:true, text: '영업활동 현황', url: 'salesactivity-salesHistory'},
                    { leaf:true, text: '영업활동 코멘트 관리',url: 'salesactivity-salesComment' },
					{ leaf:true, text: '영업활동 모니터링', url: 'salesactivity-salesMonitoring'},
                    { leaf:true, text: '업무보고 현황', url:'salesactivity-salesReport' } 
                ]
            },
            {
                text: '제품문의 관리',
                children: [
                    { leaf:true, text: '제품문의 등록', url: 'productinquiry-inquiry' },
                    { leaf:true, text: '제품문의 사후조치', url: 'productinquiry-followup' } //productinquiry-followup
                ]
            },
            {
                text: '샘플요청 관리',

                        children: [
                            { leaf:true, text: '샘플 요청', url: 'samplerequest-request' },
                            { leaf:true, text: '샘플 접수', url: 'samplerequest-receipt'  },
							{ leaf:true, text: '샘플 검토', url: 'samplerequest-review'  }
                        ]
            },
            {
                text: '샘플제작 관리',
                children: [
                    { leaf:true, text: '샘플 의뢰/배송', url: 'sampleproduction-instance'  },
                    { leaf:true, text: '샘플 제작승인', url: 'sampleproduction-approval'  },
                    { leaf:true, text: '샘플 제작완료', url: 'sampleproduction-complet'  },
                    { leaf:true, text: '샘플 드롭현황', url: 'sampleproduction-drop'  } 
                ]
            },
            {
                text: '기회및 수주관리',
                children: [
                    { leaf:true, text: '사업기회 관리' },
                    { leaf:true, text: '사업전망 관리' },
                    { leaf:true, text: '수주대장 관리' } 
                ]
            },{
                text: '리포트',
                children: [
                    { leaf:true, text: '수주목표Vs실적분석' },
                    { leaf:true, text: '수주실적 분석' },
                    { leaf:true, text: '매출목표Vs실적분석' } 
                ]
            },{
                text: '모니터링',
                children: [
                    { leaf:true, text: '활동분석' },
                    { leaf:true, text: '수주분석' },
                    { leaf:true, text: '매출분석' } 
                ]
            },{
                text: '게시판',
                children: [
                    { leaf:true, text: 'Loreal' },
                    { leaf:true, text: 'P&G' },
                    { leaf:true, text: 'Unilever' } 
                ]
            },{
                text: '기준정보',
                children: [
                    { leaf:true, text: '수주목표 조회' },
                    { leaf:true, text: '매출목표 조회' },
                    { leaf:true, text: '국가정보 관리' } 
                ]
            }
        ]
    },

    constructor: function (config) {
        // Since records claim the data object given to them, clone the data
        // for each instance.
        config = Ext.apply({
            root: Ext.clone(this.rootData)
        }, config);

        this.callParent([config]);
    }*/
});

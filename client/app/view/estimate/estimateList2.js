Ext.define('Ysn.view.estimate.estimateList2',{
    extend: 'Ext.grid.Panel',
    xtype: 'estimateList2',

    requires: [     
        'Ysn.store.estimatehead'  ,
        'Ysn.view.estimate.estimateListController'
    ],

    controller: 'estimateList', 
  //  id: 'estimateList2',      
    title: '견적목록',
    store: {
        type: 'estimatehead'
    },
   /* dockedItems: [
        {
            xtype: 'toolbar',     
            style: { 'border-top-width': '1px !important;' },
            dock: 'top',
            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    iconCls: 'fa fa-recycle',
                    text: '재사용'
                },
                {
                    xtype: 'button',
                    iconCls: 'fa fa-plus',
                    text: '신규작성'
                },
                {
                    xtype: 'button',
                    iconCls: 'fa fa-download',
                    text: '액셀다운'
                }
            ]
        }
    ],   */
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'idx',
            width:70,
            text: '번호'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'cust_nm',
            width: 200,
            text: '고객사'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'subject',
            width: 200,
            text: '제목'
        },
        {
            xtype: 'datecolumn',
            dataIndex: 'estimate_date',
            text: '견적일',   
            format: 'Y-m-d',
            width:100 
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'estimate_id',      
            width:150,
            text: '견적번호'
        }, 
        {
            xtype: 'gridcolumn',
            dataIndex: 'status_nm',    
            width:80,
            text: '견적상테'
        },
      {
          xtype: 'gridcolumn',
          dataIndex: 'user_nm',
          width: 90,
          text: '등록자'
      },
        {
            xtype: 'gridcolumn',
            dataIndex: 'submit_nm',
            width: 80,
            text: '결재자'
        },
        {
            xtype: 'datecolumn', 
            dataIndex: 'create_date',     
            width:100,
            text: '등록일' ,
            format: 'Y-m-d'
        } 
    ],
    viewConfig: {
        width: 187
    }     
});

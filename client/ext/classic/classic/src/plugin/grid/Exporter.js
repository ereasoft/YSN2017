/**
 *
 *  CSV 또는 Excel로 Exporting Plugin 입니다
 *
 *  ExtJS Premium에 export가 내장되어 있으나 대용량처리(3천건이상)시에 Export하는 속도가 느리고
 *  빌드버전에서 간헐적으로 오류가 발생합니다.
 *  특히 CSV파일 Export할경우 한글이 깨져서 나오는 현상을 수정하였습니다.
 *
 *
 *  SheetJS를 참고하여 만들었으니
 *
 *  https://github.com/SheetJS/js-xlsx/blob/master/dist/xlsx.core.min.js
 *
 *  위파일을 반드시 다운받으신뒤 Requires 시켜주시길 바랍니다.
 *
 *
 *
 *
 *
 *         @example
 *		   Ext.create('Ext.grid.Panel', {
 *		       renderTo: Ext.getBody(),
 *		       height: 500,
 *		       plugins: [{
 *		           ptype: 'pmh-grid-exporter'
 *		       }],
 *		       store: Ext.create('Ext.data.Store', {
 *		           autoLoad: true,
 *		           proxy: {
 *		               type: 'ajax',
 *		               url: 'resources/json/GridData.json',
 *
 *		               reader: {
 *		                   type: 'json',
 *		                   rootProperty: 'data'
 *		               }
 *		           }
 *		       }),
 *		       columns: [
 *		           {text: 'Company', dataIndex: 'Company'},
 *		           {text: 'Price', dataIndex: 'Price'},
 *		           {text: 'Change', dataIndex: 'Change'},
 *		           {text: '%Change', dataIndex: '%Change'},
 *		           {text: 'LastUpdate', dataIndex: 'LastUpdate'}
 *		       ],
 *		       dockedItems: [{
 *		           xtype: 'toolbar',
 *		           dock: 'top',
 *		           items: [{
 *		               xtype: 'button',
 *		               text: 'CSV다운로드',
 *		               handler: function (button) {
 *
 *		                   var grid = button.up('grid');
 *		                   grid.saveDocumentAs({
 *		                       type: 'csv',
 *		                       fileName: 'default'
 *		                   });
 *		               }
 *		           }, {
 *		               xtype: 'button',
 *		               text: 'Excel 다운로드',
 *		               handler: function (button) {
 *
 *		                   var grid = button.up('grid');
 *		                   grid.saveDocumentAs({
 *		                       type: 'xlsx',
 *		                       title: 'Sheet1',
 *		                       fileName: 'defulat'
 *		                   });
 *
 *		               }
 *		           }]
 *		       }]
 *		   });
 *
 */
Ext.define('PmhTech.plugin.grid.Exporter', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.pmh-grid-exporter',

    init: function (grid) {
        var me = this;
        me.grid = grid;
        me.grid.saveDocumentAs = Ext.Function.bind(me.saveDocumentAs, me);
    },
    getCsvData: function () {


        //일부 IE에서나 FireFox상에서는 Click이벤트 미 작동됨.
        HTMLElement.prototype.click = function () {
            var evt = this.ownerDocument.createEvent('MouseEvents');
            evt.initMouseEvent('click', true, true, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
            this.dispatchEvent(evt);
        };


        var me = this,
            grid = this.grid,
            csvContent = '',
            noCsvSupport = ( 'download' in document.createElement('a') ) ? false : true,
            sdelimiter = noCsvSupport ? "<td>" : "",
            edelimiter = noCsvSupport ? "</td>" : ",",
            snewLine = noCsvSupport ? "<tr>" : "",
            enewLine = noCsvSupport ? "</tr>" : "\r\n",
            printableValue = '';

        csvContent += snewLine;


        var records = [];
        var store = grid.getStore();

        for (var i = 0; i < store.getCount(); i++) {
            records.push(store.getAt(i));
        }
        var gridColumns = grid.getColumnManager().getColumns();
        var startIndex = gridColumns[0].xtype == 'rownumberer' ? 1 : 0;

        for (var j = startIndex; j < gridColumns.length; j++) {
            csvContent += sdelimiter + gridColumns[j].text;
            if (j < gridColumns.length - 1) csvContent += edelimiter;
        }

        csvContent += enewLine;
        for (var i = 0; i < records.length; i++) {
            var data = records[i].data;

            //csvContent += snewLine;
            //csvContent += sdelimiter + '' + edelimiter;
            for (var j = startIndex; j < gridColumns.length; j++) {

                var dataIndex = gridColumns[j].dataIndex; 
                    if (dataIndex != null && dataIndex.indexOf('DATE') > -1) {
                    var value = data[dataIndex] == null ? '' : Ext.Date.format(data[dataIndex], 'Y-m-d');
                } else {
                    var value = data[dataIndex] == null ? '' : data[dataIndex];
                }

                printableValue = ((noCsvSupport) && value == '') ? '' : value;
                printableValue = String(printableValue).replace(/,/g, "");
                printableValue = String(printableValue).replace(/(\r\n|\n|\r)/gm, "");
                csvContent += sdelimiter + printableValue;
                if (j < gridColumns.length - 1) csvContent += edelimiter;
            }
            csvContent += enewLine;
        }
        return csvContent
    },
    saveData: function (blob, fileName) {


        if (window.navigator.msSaveBlob) {
            // FOR IE BROWSER
            navigator.msSaveBlob(blob, fileName);
        } else {
            // FOR OTHER BROWSERS
            var link = document.createElement("a");
            var csvUrl = URL.createObjectURL(blob);
            link.href = csvUrl;
            link.style = "visibility:hidden";
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    },
    downloadCSV: function (fileName) {


        var me = this;
        var blob = new Blob(['\uFEFF', me.getCsvData()], {
            type: "application/csv;charset=utf-8;"
        });
        me.saveData(blob, fileName);


    },
    convertXLSX: function (headerRowCnt) {
        var tempData = this.getCsvData().split('\r\n');
        var data = [];
        var grid = this.grid;
        var k = 0, m = 0, s = 0, fridx = 0;
        var topHeader; 
        if (headerRowCnt > 1) k = 1;
        for (var i = k; i < tempData.length ; i++) {
            data.push(tempData[i].split(','));
        }
        var ws = {};
        var mergeAry = [];
        var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
        var cell_ref;
        var cell;
        if (headerRowCnt > 1) {

            if (grid.getColumnManager().headerCt.items.length > 0) {
                topHeader = grid.getColumnManager().headerCt.items;
            } else {
                topHeader = grid.getColumnManager().secondHeaderCt.items;
            } 
            for (var i = 0; i < topHeader.items.length; i++) {
                cell = { v: topHeader.items[i].text };
                cell.t = 's';
                fridx = s;
                cell_ref = XLSX.utils.encode_cell({ r: 0, c: s });
                ws[cell_ref] = cell;
                if (topHeader.items[i].items.length == 0) {  
                    mergeAry.push({ s: { r: 0, c: i + m }, e: { r: headerRowCnt - 1, c: i + m } }); 
                    s++;
                } else { 
                    var sub1cnt = topHeader.items[i].items.length;
                    var sub1cnt2 = 0;
                    for (var j = 0; j < topHeader.items[i].items.length; j++) {
                        sub1cnt2 = 0;
                        cell = { v: topHeader.items[i].items.items[j].text };
                        cell.t = 's';
                        cell_ref = XLSX.utils.encode_cell({ r: 1, c: s });
                        ws[cell_ref] = cell;
                        if (topHeader.items[i].items.items[j].items.length == 0) { 
                            if (headerRowCnt > 2) mergeAry.push({ s: { r: 1, c: s }, e: { r: headerRowCnt - 1, c: s } });
                            s++;
                        } else {
                            sub1cnt2 = topHeader.items[i].items.items[j].items.length;
                            mergeAry.push({ s: { r: 1, c: s }, e: { r: 1, c: s + sub1cnt2 -1 } });
                            for (var l = 0; l < topHeader.items[i].items.items[j].items.length; l++) { 
                                cell = { v: topHeader.items[i].items.items[j].items.items[l].text };
                                cell.t = 's';
                                cell_ref = XLSX.utils.encode_cell({ r: 2, c: s  });
                                ws[cell_ref] = cell;
                                s++;
                            } 
                            cell = { v: topHeader.items[i].items.items[j].text };
                            cell.t = 's';
                            cell_ref = XLSX.utils.encode_cell({ r: 1, c: s });
                            ws[cell_ref] = cell;
                            //s += i*j + l - 1;
                        }
                        
                    }  
                    mergeAry.push({ s: { r: 0, c: fridx }, e: { r: 0, c: s-1 } });
                    m+=j-1;
                } 
                range = { s: { c: 0, r: 0 }, e: { c: grid.getColumnManager().columns.length - 1, r: headerRowCnt - 1 } };
                ws['!merges'] = mergeAry;
            }
        }else{
            headerRowCnt = 0;
        }
        for (var R = 0; R < data.length; ++R) { 
            for (var C = 0; C < data[R].length; ++C) {
                if (range.s.r > R + headerRowCnt ) range.s.r = R + headerRowCnt;
                if (range.s.c > C) range.s.c = C;
                if (range.e.r < R + headerRowCnt) range.e.r = R + headerRowCnt;
                if (range.e.c < C) range.e.c = C;
                //var cell = {v: data[R][C]};
				cell = {v: data[R][C],
							s: { font: {sz: 14, bold: true, color: '#FF00FF' },
							    fill: { PatternType: 'Solid', BackgroundColor: '#CCCCCC' }
				            }
                };
				if (cell.v == null) continue;
                cell_ref = XLSX.utils.encode_cell({ c: C, r: R + headerRowCnt});
                
                /* TEST: proper cell types and value handling */
                //var chkCellType = parseInt(cell.v);
                //if (isNaN(chkCellType) == false) cell.v = 'n'; 
                if (R > (0-k)){
                    var dataIndex = grid.getColumnManager().getColumns()[C].dataIndex;
                    if (dataIndex != null && (dataIndex.indexOf('QTY') > -1 || dataIndex.indexOf('AMOUNT') > -1 || dataIndex.indexOf('SUM') > -1 || dataIndex.indexOf('MM') == 0)) {
                        if (cell.v == '') cell.v = 0;
                        cell.v = parseInt(cell.v);
                        if (cell.v > 999 || cell.v < -999) cell.z = '0,000';
                    } 
                }
                if (typeof cell.v === 'number') cell.t = 'n';
                else if (typeof cell.v === 'boolean') cell.t = 'b';
                else if (cell.v instanceof Date) {
                    cell.t = 'n';
                    cell.z = XLSX.SSF._table[14];
                    //cell.v = datenum(cell.v);
                }                
                else cell.t = 's'; 
                ws[cell_ref] = cell;
            }
        }

        /* TEST: proper range */
        if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);

        return ws;
    },
    downloadXLSX: function (headerRowCnt, title, fileName) {


        var me = this;
        var wb = {
            SheetNames: [],
            Sheets: {}
        };
        wb.SheetNames.push(title);
        wb.Sheets[title] = me.convertXLSX(headerRowCnt);

        var wopts = {bookType: 'xlsx', bookSST: false, type: 'binary'};
        var wbout = XLSX.write(wb, wopts);

        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }

        var blob = new Blob([s2ab(wbout)], {type: ""});
        me.saveData(blob, fileName);
    },

    /**
     * CSV 또는 엑셀 다운로드 함수
     *
     *     @example
     *     grid.saveDocumentAs({
     *           type: 'xlsx',
     *           title: 'Sheet1',
     *           fileName: 'default.xlsx'
     *      });
     *
     *
     * @param {Object} options 파라미터는 Object로 넘겨야 하며 사항은 아래와 같습니다
     * @param {String} options.type : 엑셀인경우 : xlsx , CSV인경우 : csv
     * @param {String} options.title : 엑셀인경우 SheetName 값입니다.
     * @param {String} options.fileName : 파일명을 입력합니다.
     */
    saveDocumentAs: function (options) {

        var me = this;
        var headerRowCnt = options.headerRowCnt;
        var type = options.type || 'csv';
        var fileName = options.fileName || 'default';
        var title = options.title || 'Sheet1';

        if (type == 'csv') {
            me.downloadCSV(fileName+'.csv');
        }

        if (type == 'xlsx') {
            me.downloadXLSX(headerRowCnt, title, fileName+'.xlsx');
        }
    }
});



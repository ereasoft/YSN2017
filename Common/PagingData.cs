using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/* 
 * 작성자 : 이태석(leets377@mediawill.com)
 * 작성일 : 2011.04.24 
 * 프로그램명: 공통모듈 - 페이징 데이터
 */

namespace YSN2017.ComLIB {
    public class PagingData<T> : List<T> {


        public IEnumerable<T> BoardList { get; set; }
        public PagingInfo PagingInfo { get; set; }
        public string CurrentCategory { get; set; }
        public string CurrentCategory2 { get; set; }

    }
}
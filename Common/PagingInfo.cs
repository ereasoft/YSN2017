using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/* 
 * 작성자 : 이태석(leets377@mediawill.com)
 * 작성일 : 2011.04.24 
 * 프로그램명: 공통모듈 - 페이징 정보
 */

namespace YSN2017.ComLIB {
    public class PagingInfo {


        public int CurrentPage { get; set; }    // 현재 페이지
        public int TotalCount { get; set; }     // 총 게시물 수
        public int PageSize { get; set; }       // 페이지 사이즈
        public int ItemSize { get; set; }       // 게시물 수

        public PagingInfo() { }

        public PagingInfo(int CurrentPage, int TotalCount, int PageSize, int ItemSize) {
            this.CurrentPage = CurrentPage;
            this.TotalCount = TotalCount;
            this.PageSize = PageSize;
            this.ItemSize = ItemSize;
        }

        //public int TotalPages {               // 총 페이지 수
        //    get { return (int)Math.Ceiling((decimal)TotalCount / PageSize); }
        //}

        //public int startPage {
        //    get { return (CurrentPage - 1) * CurrentPage + 1; }
        //}
        //public int endPage {
        //    get { return Math.Min(TotalPages, CurrentPage + 1); }
        //}

        //public int pageCount {
        //    get { return (int)Math.Ceiling(this.TotalCount / (double)this.PageSize); }
        //}
    }
}
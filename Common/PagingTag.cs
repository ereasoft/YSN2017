using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Text;
using System.Web.Routing;

/* 
 * 작성자 : 이태석(leets377@mediawill.com)
 * 작성일 : 2011.04.24 
 * 프로그램명: 공통모듈 - 페이징 태그
 */

namespace YSN2017.ComLIB
{
    public static class PagingTag
    {


        // 페이징 태그 랜더링
        public static MvcHtmlString PageLinksTag(this HtmlHelper html, PagingInfo pagingInfo, Func<int, string> pageUrl) {

            StringBuilder sb = new StringBuilder();

            TagBuilder tag = new TagBuilder("a");


            if (pagingInfo.TotalCount == 0) { // 데이터없을때...
                sb.AppendLine("<div>게시물이 없습니다.</div>");
            } else {

                int totalPage = (pagingInfo.TotalCount + pagingInfo.ItemSize - 1) / pagingInfo.ItemSize;
                
                int CurrentSection = (pagingInfo.CurrentPage + pagingInfo.PageSize - 1) / pagingInfo.PageSize;

                int startPage = (CurrentSection - 1) * pagingInfo.PageSize + 1;
                int endPage = CurrentSection * pagingInfo.PageSize;
   
                if(endPage > totalPage){
                    endPage = totalPage;
                }


                // 이전 10개 이동 버튼 => 데이터 로드줄이기 위해 사용하지 않음
                //if (CurrentSection > 1) {

                //    tag = new TagBuilder("a");
                //    tag.MergeAttribute("class", "num_prev");
                //    tag.MergeAttribute("href", pageUrl(startPage - 1));
                //    tag.InnerHtml = "<<";
                //    sb.AppendLine(tag.ToString());

                //}


                    tag = new TagBuilder("a");
                    tag.MergeAttribute("class", "num_prev");
                    tag.MergeAttribute("href", pageUrl(1));
                    tag.InnerHtml = "처음";
                    sb.AppendLine(tag.ToString());


                if(pagingInfo.CurrentPage > 1){
                    
                    tag = new TagBuilder("a");
                    tag.MergeAttribute("class", "num_prev");
                    tag.MergeAttribute("href", pageUrl(pagingInfo.CurrentPage - 1));
                    tag.InnerHtml = "이전";
                    sb.AppendLine(tag.ToString());
                } 
                
                //else {

                //    tag = new TagBuilder("a");
                //    tag.MergeAttribute("class", "num_prev");
                //    tag.MergeAttribute("src", "#");
                //    tag.InnerHtml = "이전";
                //    sb.AppendLine(tag.ToString());
                //}

                for (int i = startPage; i <= endPage; i++) {
                    if (i > 0) {
                        if (i == pagingInfo.CurrentPage) {
                            
                            tag = new TagBuilder("strong");
                            tag.MergeAttribute("class", "cur_num");
                            tag.InnerHtml = i.ToString();
                            sb.AppendLine(tag.ToString());

                        } else {
                            
                            tag = new TagBuilder("a");
                            tag.MergeAttribute("href", pageUrl(i));
                            tag.MergeAttribute("class", "num_box");
                            tag.InnerHtml = i.ToString();
                            sb.AppendLine(tag.ToString());
                        }
                    }
                }



                if (pagingInfo.CurrentPage < totalPage) {
                  
                    tag = new TagBuilder("a");
                    tag.MergeAttribute("class", "num_next");
                    tag.MergeAttribute("href", pageUrl(pagingInfo.CurrentPage + 1));
                    tag.InnerHtml = "다음";
                    sb.AppendLine(tag.ToString());


                }


                    tag = new TagBuilder("a");
                    tag.MergeAttribute("class", "num_next");
                    tag.MergeAttribute("href", pageUrl( (pagingInfo.TotalCount-1) / pagingInfo.ItemSize+1 ));
                    tag.InnerHtml = "끝";
                    sb.AppendLine(tag.ToString());

                
                //else {
                   
                //    tag = new TagBuilder("a");
                //    tag.MergeAttribute("class", "num_next");
                //    tag.MergeAttribute("src", "#");
                //    tag.InnerHtml = "다음";
                //    sb.AppendLine(tag.ToString());
                //}

                // 다음 10개 이동 버튼 => 데이터 로드줄이기 위해 사용하지 않음
                //if (endPage < totalPage) {
                //    tag = new TagBuilder("a");
                //    tag.MergeAttribute("class", "num_next");
                //    tag.MergeAttribute("href", pageUrl(endPage + 1));
                //    tag.InnerHtml = ">>";
                //    sb.AppendLine(tag.ToString());


                //}


            }


            return MvcHtmlString.Create(sb.ToString());
        }



        public class PageNavigator  {

            public int PageCount = 1;
            public int CurrentPage = 1;

            public string txtStart = "[<<]";
            public string txtPrev = "[<]";
            public string txtNext = "[>]";
            public string txtEnd = "[>>]";

            public string Action = "notsetted.aspx?p={0}";

            private string makeLink(string linkStr, int page, string title) {
                return String.Format("<a href=\"{0}\" title=\"{1}\">{2}</a>"
                  , String.Format(Action, page)
                  , title
                  , linkStr);
            }

            protected string PageLink {
                get {
                    int pageStart;
                    int pageEnd;
                    string str = "";

                    pageStart = CurrentPage - 4;
                    if (pageStart < 1)
                        pageStart = 1;
                    pageEnd = pageStart + 8;
                    if (pageEnd >= PageCount)
                        pageEnd = PageCount;
                    pageStart = pageEnd - 8;
                    if (pageStart < 1)
                        pageStart = 1;

                    if (CurrentPage > 1) {
                        str = makeLink(txtStart, 1, "첫 페이지")
                            + " " + makeLink(txtPrev, CurrentPage - 1, "이전 페이지");
                    } else {
                        str = txtStart + " " + txtPrev;
                    }
                    str += " ";

                    for (int i = pageStart; i <= pageEnd; i++) {
                        if (i == CurrentPage)
                            str += "<b>[" + i + "]</b> ";
                        else
                            str += makeLink("[" + i + "]", i, i + " 페이지") + " ";
                    }

                    if (CurrentPage < PageCount) {
                        str += makeLink(txtNext, CurrentPage + 1, "다음 페이지")
                               + " " + makeLink(txtEnd, PageCount, "끝 페이지");
                    } else {
                        str += txtNext + " " + txtEnd;
                    }
                    return str;
                }
            }


        }





    }
}

<%@ Page Language="VB" ValidateRequest="false" %>
<!DOCTYPE HTML>
<html class="x-viewport">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes">

    <title>Ysn</title>   
<style type="text/css" media="screen">
   html, body{
      margin:0px;
      padding:0px;
      height:100%;
      overflow:hidden;
   }

</style>
<link href="resources/cssForschedulingsuite.css" rel="stylesheet" type="text/css"/>

<script src="resources/locale.js" ></script>
<script type="text/javascript"> 

    function setCookie(cKey, cValue)  // name,pwd
    {
        var date = new Date(); // 오늘 날짜
        // 만료시점 : 오늘날짜+10 설정
        var validity = 1;
        date.setDate(date.getDate() + validity);
        // 쿠키 저장
        document.cookie = cKey + '=' + escape(cValue) + ';expires=' + date.toGMTString() + ';path=/';

    }

    function delCookie(cKey) {
        // 동일한 키(name)값으로
        // 1. 만료날짜 과거로 쿠키저장
        // 2. 만료날짜 설정 않는다. 
        //    브라우저가 닫힐 때 제명이 된다    

        var date = new Date(); // 오늘 날짜 
        var validity = -10;
        date.setDate(date.getDate() + validity);
        document.cookie =
              cKey + '=;expires=' + date.toGMTString() + ';path=/';
    }

    function getCookie(cKey) {
        var allcookies = document.cookie;
        var cookies = allcookies.split("; ");
        for (var i = 0; i < cookies.length; i++) {
            var keyValues = cookies[i].split("=");
            if (keyValues[0] == cKey) {
                return unescape(keyValues[1]);
            }
        }
        return "";
    }


        var Ext = Ext || {}; // Ext namespace won't be defined yet...
        var printBody;
		 var pageTitle = "고객정보DB > 거래처";
		 var loginUser = "test";
		 var flag, keyman, username, company_cd, lang, localeCd, popview, param1, param2, otitle, dept_cd, dept_nm, boardId, auth_id, dept_level, up_dept_cd, sa_dept_yn, dstr_chn, dstr_chn_nm, smpReqDtFileYn, sa_yn, theme;
		 smpReqDtFileYn = 'N';
		 var chk_char = '#';   //파일명 앞자리에 들어가지 말아야할 특수문자들
    //var company_cd="YONWOO";
		 //alert("<%=User.Identity.Name%>");
        <%          
    If (User.Identity.IsAuthenticated) Then
        Dim uid = User.Identity.Name.Split("|")(0).ToString()
        Dim uname = User.Identity.Name.Split("|")(1).ToString()
        Dim company_cd = User.Identity.Name.Split("|")(2).ToString()
        Dim lang = User.Identity.Name.Split("|")(3).ToString()
        Dim deptCd = User.Identity.Name.Split("|")(4).ToString()
        Dim deptNm = User.Identity.Name.Split("|")(5).ToString()
        Dim authId = User.Identity.Name.Split("|")(6).ToString()
        Dim deptLv = User.Identity.Name.Split("|")(7).ToString()
        Dim upDeptCd = User.Identity.Name.Split("|")(8).ToString()
        Dim saDeptYn = User.Identity.Name.Split("|")(9).ToString()
        Dim dstrChn = User.Identity.Name.Split("|")(10).ToString()
        Dim dstrChnNm = User.Identity.Name.Split("|")(11).ToString()
        Dim saYn = User.Identity.Name.Split("|")(13).ToString()
        Dim theme = User.Identity.Name.Split("|")(14).ToString()
        Dim otitle = Request.QueryString("otitle")
        Dim popview = Request.QueryString("popview")
        Dim param1 = Request.QueryString("param1")
        Dim param2 = Request.QueryString("param2")
        Dim flag = Request.QueryString("flag")
        If (otitle IsNot Nothing) Then
            Response.Write("otitle = '" & otitle & "';" & Chr(13) & Chr(10))
        End If
        If (popview IsNot Nothing) Then
            Response.Write("popview = '" & popview & "';" & Chr(13) & Chr(10))
        End If
        If (param1 IsNot Nothing) Then
            Response.Write("param1 = '" & param1 & "';" & Chr(13) & Chr(10))
        End If
        If (param2 IsNot Nothing) Then
            Response.Write("param2 = '" & param2 & "';" & Chr(13) & Chr(10))
        End If
        If (flag IsNot Nothing) Then
            Response.Write("flag = " & flag & ";" & Chr(13) & Chr(10))
        Else
            Response.Write("flag = 0;" & Chr(13) & Chr(10))
        End If
        Response.Write("username = '" & uname & "';" & Chr(13) & Chr(10))
        Response.Write("loginUser = '" & uid & "';" & Chr(13) & Chr(10))
        Response.Write("company_cd = '" & company_cd & "';" & Chr(13) & Chr(10))
        Response.Write("lang = '" & lang & "';" & Chr(13) & Chr(10))
        Response.Write("dept_cd = '" & deptCd & "';" & Chr(13) & Chr(10))
        Response.Write("dept_nm = '" & deptNm & "';" & Chr(13) & Chr(10))
        Response.Write("auth_id = '" & authId & "';" & Chr(13) & Chr(10))
        Response.Write("dept_level = '" & deptLv & "';" & Chr(13) & Chr(10))
        Response.Write("up_dept_cd = '" & upDeptCd & "';" & Chr(13) & Chr(10))
        Response.Write("sa_dept_yn = '" & saDeptYn & "';" & Chr(13) & Chr(10))
        Response.Write("dstr_chn = '" & dstrChn & "';" & Chr(13) & Chr(10))
        Response.Write("dstr_chn_nm = '" & dstrChnNm & "';" & Chr(13) & Chr(10))
        Response.Write("sa_yn = '" & saYn & "';" & Chr(13) & Chr(10))
        Response.Write("theme = '" & theme & "';" & Chr(13) & Chr(10))
    Else
        Response.Write("flag = 1;")
        Response.Write("theme = 'NOTHING'")
    End If
        %>

       localeCode = lang;
       Locale.setLanguageUrls(['resources/lang/lang_ko_KR.txt', 'resources/lang/lang_en_US.txt']);
       var profile;
       var locale;

       
		var Ext = Ext || {};
        //var Ysn = Ysn || {};

        Ext.beforeLoad = function (tags) {
            var query = location.search.substring(1),
                values = {
                    'false': false,
                    'true': true,
                    'null': null
                },
                paramRe = /([^&=]+)(=([^&]*))?/g,
                plusRe = /\+/g,  // Regex for replacing addition symbol with a space
                params = {},
                match, key, val;

            while (match = paramRe.exec(query)) {
                key = decodeURIComponent(match[1].replace(plusRe, ' '));

                if (match[2]) {
                    val = decodeURIComponent(match[3].replace(plusRe, ' '));
                    if (val in values) {
                        val = values[val];
                    } else if (!isNaN(+val)) {
                        val = +val;
                    }
                } else {
                    val = true;
                }

                params[key] = val;
            }

            profile = params.profile;
            locale = params.locale;

            if (!localeCode) localeCode = 'KOR';

            if (!locale) {
                locale = (localeCode == 'KOR') ? 'ko' : 'en';
            }


            if (!profile) {
                if (!params.classic && !tags.desktop && tags.ios){
                    profile = 'ios';
                } else if (!params.classic && (params.modern || tags.phone)) {
                    profile = 'material';
                } else { 
                    if (theme.replace(/^\s+|\s+$/g, '') == 'NOTHING') {
                        profile = (locale == 'ko') ? 'triton' : 'neptune';
                    } else {
                        profile = theme;
                    }
                }
            }

          /*  match = profile.match(/^(.+?)(?:-(ko|en))$/);
            if (match) { // "profile=triton-en"
                profile = match[1];
                locale = locale || match[2];
            } else {
                locale = locale || 'ko';
            }*/


            localeCd = (locale == 'ko') ? 'KOR' : 'ENG';
            
			language = (locale == 'ko') ? 'ko_KR' : 'en_US';
            //localeCd = 'ENG';
            // TODO: EXTJS-21544 - set platformTags based upon locale's text direction.
           //profile = 'classic'
            //Ysn.profileName = profile;
            //Ysn.locale = locale;

            Ext.manifest = profile + "-" + locale;
            tags.test = !!params.testMode;
            Ext.microloaderTags = tags;
            Locale.setCurrentLanguage(language);
            Locale.loadSync(); 
        };
       


       

	   var localeClass = 'Ko'

    </script>
    
     <script src="resources/custom.js"></script>
    <script src="resources/jszip.js" ></script>
	 <script src="resources/xlsx.core.min.js" ></script>
	 <!--<script src="ext/ext-debug.js"></script>-->
    <!-- The line below must be kept intact for Sencha Cmd to build your application -->
    <script id="microloader" data-app="4dba8050-06b7-4b61-8dc2-72ea3b62cf2e" type="text/javascript" src="bootstrap.js"></script>
	 <!--<script src="exporter-debug.js"></script>-->

</head>
<body></body>
</html>

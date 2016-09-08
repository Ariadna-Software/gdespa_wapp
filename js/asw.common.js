/* ------------------------------------------------
 * asw.common.js
 * Some apis used in all pages
----------------------------------------------------*/

/*
 * aswLanguage
 * api with function language related
*/
var aswLanguage = {
    changeLanguage: function (lg) {
        // change page language
        i18n.init({ lng: lg }, function (t) {
            $(".I18N").i18n();
        });
        var flag = "flag flag-es";
        var lgn = "ES";
        switch (lg) {
            case "en":
                flag = "flag flag-us";
                lgn = "EN";
                break;
            case "es-pa":
                flag = "flag flag-pa";
                lgn = "PA";
                break;
        };
        $('#language-flag').attr('class', flag);
        $('#language-abrv').text(lgn);
        validator_languages(lg);
    }
}

/*
 * aswCookies
 * to mannage cookies in the app
 * this funtions come from http://www.w3schools.com/js/js_cookies.asp
*/
var aswCookies = {
    are_cookies_enabled: function () {
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;
        if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
            document.cookie = "testcookie";
            cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
        }
        return (cookieEnabled);
    },
    setCookie: function (c_name, value, exdays) {
        if (!aswCookies.are_cookies_enabled()) {
            alert("NO COOKIES");
        }
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    },
    deleteCookie: function (c_name) {
        if (!aswCookies.are_cookies_enabled()) {
            alert("NO COOKIES");
        }
        document.cookie = c_name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },
    getCookie: function (c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                return unescape(y);
            }
        }
    }
}

/* 
 * aswNotification
 * An api to build and show messages
*/
var aswNotif = {
    errAjax: function (err) {
        var lg = i18n.lng();
        var ms = i18n.t('error.general');
        if (err.readyState == 0) {
            ms = i18n.t('error.ajax_general');
        }
        if (err.status == 401) {
            ms = i18n.t("error.authorization");
        }
        // Building html response
        var html = ms + "<hr/>"
        html += sprintf("<div><strong>readyState: </strong>%s</div>", err.readyState);
        if (err.responseText) {
            html += sprintf("<div><strong>responseText: </strong>%s</div>", err.readyState);
        }
        html += sprintf("<div><strong>status: </strong>%s</div>", err.status);
        html += sprintf("<div><strong>statusText: </strong>%s</div>", err.statusText);
        html += "<hr/>";
        html += sprintf("<div><small>%s</small></div>", i18n.t('error.close'));
        $.smallBox({
            title: "ERROR",
            content: html,
            color: "#C46A69",
            iconSmall: "fa fa-warning shake animated",
        });
    },
    errAjaxShort: function (err) {
        var lg = i18n.lng();
        var ms = i18n.t('error.general');
        if (err.readyState == 0) {
            ms = i18n.t('error.ajax_general');
        }
        if (err.status == 401) {
            ms = i18n.t("error.authorization");
        }
        // Building html response
        var html = ms
        html += sprintf("<div><small>%s</small></div>", i18n.t('error.close'));
        $.smallBox({
            title: "ERROR",
            content: html,
            color: "#C46A69",
            iconSmall: "fa fa-warning shake animated",
        });
    }
}


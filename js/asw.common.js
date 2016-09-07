// asw.common.js
// Functions in common for all pages but login
var changeLanguage = function (lg) {
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
};

/*
 *   Set and Get Cookies
 *   this funtions come from http://www.w3schools.com/js/js_cookies.asp
 *   they are used in forms in order to and retrieve
 *   field's values in a cookie
 */
function are_cookies_enabled() {
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;
    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
        document.cookie = "testcookie";
        cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
    }
    return (cookieEnabled);
}

function setCookie(c_name, value, exdays) {
    if (!are_cookies_enabled()) {
        alert("NO COOKIES");
    }
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function deleteCookie(c_name) {
    if (!are_cookies_enabled()) {
        alert("NO COOKIES");
    }
    document.cookie = c_name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getCookie(c_name) {
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
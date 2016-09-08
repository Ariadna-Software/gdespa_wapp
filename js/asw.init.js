/* -------------------------------------------------------------------
asw.init.js:
Our own app initialitation
----------------------------------------------------------------------*/
// check if there's an user logged in 
var user = aswCookies.getCookie('gdespa_user');
if (!user) {
    window.open('login.html', '_self');
}

// i18next
i18n.init({
}, function (t) {
    $('.I18N').i18n();
});

// change language flag and abrv
var lg = i18n.lng();
var flag = "flag flag-es";
var lgn = "ES";
switch (lg) {
    case "en":
        flag = "flag flag-us";
        lgn = "EN";
        break;
    case "es-PA":
        flag = "flag flag-pa";
        lgn = "PA";
        break;
};
$('#language-flag').attr('class', flag);
$('#language-abrv').text(lgn);
validator_language(lgn);

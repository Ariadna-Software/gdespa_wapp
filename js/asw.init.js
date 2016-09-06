/* -------------------------------------------------------------------
asw.init.js:
Our own app initialitation
----------------------------------------------------------------------*/

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
    case "es-pa":
        flag = "flag flag-pa";
        lgn = "PA";
        break;
};
$('#language-flag').attr('class', flag);
$('#language-abrv').text(lgn);

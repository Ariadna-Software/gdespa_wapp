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
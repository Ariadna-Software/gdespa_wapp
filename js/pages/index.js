/*
 * index.js
 * Function for the page index.html
*/
var user = JSON.parse(aswCookies.getCookie('gdespa_user'));

var indexAPI = {
    init: function(){
        $('#user_name').text(user.name);
    }
};

indexAPI.init();
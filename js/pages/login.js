/*
 * login.js
 * Functions related to login page
*/

// Internal API for login page
var loginAPI = {
    // Validates form (jquery validate) 
    dataOk: function(){
        
    },
    // When user clicks it's been verified
    loginClick: function(){
        // obtain user and password
        // check login

    }
};

// avoid sending form 
$('#login-form').submit(function(){
    return false;
});
// buttons click events 
$('#btnLogin').click(loginAPI.loginClick);



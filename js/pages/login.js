/*
 * login.js
 * Functions related to login page
*/

// Internal API for login page
var loginAPI = {
    // Validates form (jquery validate) 
    dataOk: function () {
        $('#login-form').validate({
            rules: {
                txtLogin: { required: true },
                txtPassword: { required: true }
            },
            // Do not change code below
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
        //
        return $('#login-form').valid();
    },
    // When user clicks it's been verified
    loginClick: function () {
        // Validate form
        if (!loginAPI.dataOk()) return;
        // obtain user and password
        var login = $('#txtLogin').val();
        var password = $('#txtPassword').val();
        alert("L: " + login + " P: " + password);
        // check login

    }
};

// avoid sending form 
$('#login-form').submit(function () {
    return false;
});
// buttons click events 
$('#btnLogin').click(loginAPI.loginClick);



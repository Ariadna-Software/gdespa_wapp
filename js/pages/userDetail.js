/*
 * userDetail.js
 * Function for the page userDetail.html
*/
var user = JSON.parse(aswCookies.getCookie('gdespa_user'));
var api_key = aswCookies.getCookie('api_key')
var lang = aswCookies.getCookie('gdespa_lang');


var data = null;
var vm = null;

var userDetailAPI = {
    init: function () {
        aswInit.initPage();
        validator_languages(lang);
        $('#user_name').text(user.name);
        // make active menu option
        $('#userGeneral').attr('class', 'active');
        // knockout management
        vm = new userDetailAPI.pageData();
        ko.applyBindings(vm);
        // buttons click events
        $('#btnOk').click(userDetailAPI.btnOk());
        $('#btnExit').click(function (e) {
            e.preventDefault();
            window.open('userGeneral.html', '_self');
        })
        // combos
        $('#cmbLanguages').select2(select2_languages[lang]);
        userDetailAPI.loadLanguages();
        $('#cmbGroups').select2(select2_languages[lang]);
        userDetailAPI.loadGroups();

        // check if an id have been passed
        var id = aswUtil.gup('id');
        userDetailAPI.getUserGroup(id);
    },
    pageData: function () {
        // knockout objects
        var self = this;
        self.id = ko.observable();
        self.name = ko.observable();
        self.userGroupId = ko.observable();
        self.lang = ko.observable();
        // languages combos
        self.optionsLanguages = ko.observableArray([]);
        self.selectedLanguages = ko.observableArray([]);
        self.sLanguage = ko.observable();
        // user group combos
        self.optionsGroups = ko.observableArray([]);
        self.selectedGroups = ko.observableArray([]);
        self.sGroup = ko.observable();
    },
    loadData: function (data) {
        vm.id(data.id);
        vm.name(data.name);
        vm.userGroupId(data.userGroup.id);
        vm.lang(data.lang);
    },
    // Validates form (jquery validate) 
    dataOk: function () {
        $('#userDetail-form').validate({
            rules: {
                txtName: { required: true },
                cmbLanguages: { required: true },
                cmbGroups: { required: true }
            },
            // Do not change code below
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
        return $('#userDetail-form').valid();
    },
    // obtain a  user group from the API
    getUserGroup: function (id) {
        if (!id || (id == 0)) {
            // new user group
            vm.id(0);
            return;
        }
        var url = sprintf("%s/user/%s?api_key=%s", myconfig.apiUrl, id, api_key);
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json",
            success: function (data, status) {
                userDetailAPI.loadData(data[0]);
            },
            error: function (err) {
                aswNotif.errAjax(err);
                if (err.status == 401) {
                    window.open('login.html', '_self');
                }
            }
        });
    },
    btnOk: function () {
        var mf = function (e) {
            // avoid default accion
            e.preventDefault();
            // validate form
            if (!userDetailAPI.dataOk()) return;
            // dat for post or put
            var data = {
                id: vm.id(),
                name: vm.name()
            };
            var url = "", type = "";
            if (vm.id() == 0) {
                // creating new record
                type = "POST";
                url = sprintf('%s/user?api_key=%s', myconfig.apiUrl, api_key);
            } else {
                // updating record
                type = "PUT";
                url = sprintf('%s/user/%s/?api_key=%s', myconfig.apiUrl, vm.id(), api_key);
            }
            $.ajax({
                type: type,
                url: url,
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (data, status) {
                    window.open('userGeneral.html', '_self');
                },
                error: function (err) {
                    aswNotif.errAjax(err);
                    if (err.status == 401) {
                        window.open('login.html', '_self');
                    }
                }
            });
        }
        return mf;
    },
    loadLanguages: function (id) {

    },
    loadGroups: function (id) {
        $.ajax({
            type: "GET",
            url: sprintf('%s/user_group?api_key=%s',myconfig.apiUrl, api_key),
            dataType: "json",
            contentType: "application/json",
            success: function (data, status) {
                var options = [{ id: 0, name: " " }].concat(data);
                vm.optionsGroups(options);
                $("#cmbGroups").val([0]).trigger('change');
            },
            error: function (err) {
                aswNotif.errAjax(err);
                if (err.status == 401) {
                    window.open('login.html', '_self');
                }
            }
        });
    }
};
userDetailAPI.init();
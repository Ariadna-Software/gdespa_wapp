/*
 * userGroupGeneral.js
 * Function for the page userGroupGeneral.html
*/
var user = JSON.parse(aswCookies.getCookie('gdespa_user'));
var api_key = aswCookies.getCookie('api_key')

var data = null;

var userGroupGeneralAPI = {
    init: function () {
        $('#user_name').text(user.name);
        // make active menu option
        $('#userGroupGeneral').attr('class', 'active');
        userGroupGeneralAPI.initUserGroupTable();
        userGroupGeneralAPI.getUserGroups();
    },
    // initializes the table
    initUserGroupTable: function () {
        var options = aswInit.initTableOptions('dt_userGroup');
        options.data = data;
        options.columns = [{
            data: "name"
            },{
                data: "id",
                render: function (data, type, row) {
                    var bt1 = "<button class='btn btn-circle btn-danger btn-lg' onclick='deleteUserGroup(" + data + ");' title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                    var bt2 = "<button class='btn btn-circle btn-success btn-lg' onclick='editUserGroup(" + data + ");' title='Editar registro'> <i class='fa fa-edit fa-fw'></i> </button>";
                    var html = "<div class='pull-right'>" + bt1 + " " + bt2 + "</div>";
                    return html;
                    }
            }];
        $('#dt_userGroup').dataTable(options);
    },
    editUserGroup: function(id){

    },
    deleteUserGroup: function(id){

    },
    // obtain user groups from the API
    getUserGroups: function(){
        var url = sprintf("%s/user_group?api_key=%s", myconfig.apiUrl, api_key);
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json",
            success: function(data, status){
                userGroupGeneralAPI.loadUserGroupsTable(data);
            },
            error: function(err){
                aswNotif.errAjax(err);
                if (err.status == 401){
                    window.open('login.html', '_self');
                }
            }
        });
    },
    loadUserGroupsTable: function(data){
        var dt = $('#dt_userGroup').dataTable();
        dt.fnClearTable();
        dt.fnAddData(data);
        dt.fnDraw();
    }
};

userGroupGeneralAPI.init();
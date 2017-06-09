var url = "http://localhost:8888";

function loginUser() {
    var username = document.getElementsByClassName("username");
    var password = document.getElementsByClassName("password");

    $.ajax({
        url: url + "/login",
        method: "post",
        data: {
            username: username[0].value,
            password: password[0].value
        }
    }).success(function(response){
       window.location.assign("/home");
    }).error(function(response) {
       alert("Incorrect username or password!");
    });
}

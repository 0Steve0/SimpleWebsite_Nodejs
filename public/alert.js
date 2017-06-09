var url = "http://localhost:8888";

function registerUser() {
     var username = document.getElementsByClassName("username");
     var password = document.getElementsByClassName("password");

     $.ajax({
         url: url + "/register",
         method: "post",
         data: {
             username: username[0].value,
             password: password[0].value
         }
     }).success(function(response){
         alert(response.message);
     }).error(function(response) {
         alert(response.message);
     });
}

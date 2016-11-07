'use strict';

$(function () {
  _bind();

  function _bind() {
    $('.sign-up-link').on('click', function () {});
    $('.sign-in-button').on("click", function () {
      var username = $('#username').val();
      var password = $('#password').val();
      $.ajax({
        type: "post",
        url: "/account/login",
        data: {
          username: username,
          password: password
        },
        success: function success(result) {
          if (result == "success") {
            window.location.href = "/";
          } else {
            alert("error");
          }
        }
      });
    });
  }
});
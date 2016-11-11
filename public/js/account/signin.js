'use strict';

$(function () {
  _bind();

  function save() {
    var username = $('#username').val();
    var password = $('#password').val();
    var self = $(this);
    self.text('Sign in ...');
    $.ajax({
      type: "post",
      url: "/account/login",
      data: {
        username: username,
        password: password
      },
      success: function success(result) {
        self.text('Sign in');
        if (result == "success") {
          window.location.href = "/";
        } else {
          alert('something went wrong');
        }
      }
    });
  }

  function _bind() {
    $('#password').on('keyup', function (e) {
      if (e.keyCode == 13) {
        save();
      }
    });
    $('.sign-in-button').on("click", save);
  }
});
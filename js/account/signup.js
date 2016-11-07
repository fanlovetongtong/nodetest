$(function() {
  _bind();

  function _bind() {
    $('.sign-up-button').on('click', function() {
      var username = $('#username').val();
      var password = $('#password').val();
      var self= $(this);
      self.text('Sign up...');
      $.ajax({
        type: 'post',
        url: '/account/signup',
        data: {
          password: password,
          username: username
        }
      }).then(function(result) {
        if (result == "success") {
          window.location.href = "/";
        } else {
          alert("something went wrong");
        }

      }, function(error) {
        alert("something went wrong");

      }).always(function(){
        self.text('Sign up');
      })
    })

  }

})

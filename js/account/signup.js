$(function() {
  _bind();

  function _bind() {
    $('.sign-up-button').on('click', function() {
      var username = $('#username').val();
      var password = $('#password').val();
      $.ajax({
        type: 'post',
        url: '/account/signup',
        data: {
          password: password,
          username: username
        }
      }).then(function(result) {


      }, function(error) {


      })

    })

  }

})

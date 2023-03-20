(function($) {
  'use strict';
  $(function() {
    var email = $('.email');
    var password = $('.password');
    $('.btn').on('click', function() {      
      var settings = {
        "url": "http://142.93.219.133:4001/api/loginAdmin",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "email": email.val(),
          "password": password.val()
        }),
      };
      
      $.ajax(settings).done(function (response) {
        var date = new Date();
        date.setTime(date.getTime() + 24 * 60 * 60 * 1000); 
        $.cookie('token', response.token, { expires: date, path: '/' });
        window.location.replace('../../index.html');
      }).catch(function (error) {
        alert(JSON.parse(error.responseText).message);
      });
    });
  });
})(jQuery);
(function($) {
    'use strict';
    $(function() {
        $('.btn').on("click", function() {
            var settings = {
                "url": "http://142.93.219.133:4001/api/newPassword",
                "method": "POST",
                "timeout": 0,
                "headers": {
                  "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                  "newPassword": $('.newPassword').val(),
                  "otp": $('.otp').val()
                }),
              };
              
              $.ajax(settings).done(function (response) {
                console.log(response);
                alert(response.message);
                $(location).prop('href', `../Login/login.html`)
              }).catch(err => {
                alert(JSON.parse(err.responseText).message);
              });
        }) 
    });
  })(jQuery);
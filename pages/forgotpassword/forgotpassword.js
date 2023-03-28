(function($) {
    'use strict';
    $(function() {
        $('.btn').on("click", function() {
            var settings = {
                "url": "http://142.93.219.133:4001/api/forgetPassword",
                "method": "POST",
                "timeout": 0,
                "headers": {
                  "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                  "email": $('.email').val(),
                }),
              };
              
              $.ajax(settings).done(function (response) {
                console.log(response)
                alert(response.message);
                $(location).prop('href', `./newPassword.html`)
              }).catch(function (err) {
                alert(JSON.parse(err.responseText).message);
              });
        }) 
    });
  })(jQuery);
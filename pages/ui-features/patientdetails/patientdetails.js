
(function($) {
    'use strict';
    $(function() {
        var settings = {
            "url": `http://142.93.219.133:4001/api/patient/${$.cookie('id')}`,
            "method": "GET",
            "timeout": 0,
          };

          $.ajax(settings).done(function (response) {
            console.log(response)

            $('.name').html(response.data.name);            
            $('.email').html(response.data.email);
            $('.phone').html(response.data.phone);

            let date = new Date(response.data.DOB)
            $('.DOB').html(date.getDate() + "-" +  date.getMonth() + "-" + date.getFullYear());
            $('.gender').html(response.data.gender);
            $('.isVerified').html(response.data.isVerified? "True" : "False");
            
          }).catch(err => {
            alert(JSON.parse(err.responseText).message);
          });
    });
  })(jQuery);
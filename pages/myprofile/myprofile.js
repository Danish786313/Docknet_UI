(function($) {
    'use strict';
    $(function() {
      var settings = {
        "url": "http://142.93.219.133:4001/api/admin/1",
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response)
        $('.inputName').val(response.data.name);
        $('.inputEmail').val(response.data.email);
        $('.inputTextArea').val(response.data.termAndCondition);
        $('.inputPhone').val(response.data.supportPhone);
        $('.inputSupportemail').val(response.data.supportEmail);
      });

      $('.savebutton').on("click", function(event){
        event.preventDefault();
        var settings = {
          "url": "http://142.93.219.133:4001/api/admin/1",
          "method": "PATCH",
          "timeout": 0,
          "headers": {
            "Content-Type": "application/json"
          },
          "data": JSON.stringify({
            "name" : $('.inputName').val(),
            "email": $('.inputEmail').val(),
            "termAndCondition": $('.inputTextArea').val(),
            "supportPhone": $('.inputPhone').val(),
            "supportEmail": $('.inputSupportemail').val()
          }),
        };
        
        $.ajax(settings).done(function (response) {
          location.reload(true)
          console.log(response);
        }).catch(err => {
          alert(JSON.parse(err.responseText).message);
        });
      })

    $('.changePassword').on("click", function(event){
      event.preventDefault();
      var settings = {
        "url": "http://142.93.219.133:4001/api/changePassword",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "currentPassword": $('.currentPassword').val(),
          "newPassword": $('.newPassword').val(),
          "confirmPassword": $('.confirmPassword').val()
        }),
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        location.reload(true)
      }).catch(err => {
        alert(JSON.parse(err.responseText).message);
      });
    })
    });
  })(jQuery);

(function($) {
    'use strict';
    $(function() {
        var settings = {
            "url": "http://142.93.219.133:4001/api/speciality",
            "method": "GET",
            "timeout": 0,
          };
          
          var num = $('.rows')
          $.ajax(settings).done(function (response) {
            console.log(response);
            for (var i = 0; i <response.data.length; i++) {
                num.append(`
                    <tr>
                      <td> ${response.data[i].speciality} </td>
                      <td> ${response.data[i].commission} </td>
                      <td> Herman Beck </td>
                    </tr>
                `)
            }
            
            
          });


        $(".submitButton").on("click", function() {
            var speciliaty = $('.speciality').val()
            var commision = $('.commissions').val()
            var settings = {
                "url": "http://142.93.219.133:4001/api/speciality",
                "method": "POST",
                "timeout": 0,
                "headers": {
                  "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                  "speciality": speciliaty,
                  "commission": commision
                }),
              };
              
              $.ajax(settings).done(function (response) {
                location.reload(true)
                console.log(response);
              }).catch(function (error) {
                alert(JSON.parse(error.responseText).message);
              });
        })
        
    });
  })(jQuery);
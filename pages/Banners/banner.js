(function($) {
    'use strict';
    $(function() {
      var settings = {
        "url": "http://142.93.219.133:4001/api/docters?_page=0&_limit=10&searchText=",
        "method": "GET",
        "timeout": 0,
      };
      
      var option = $('#inputID') 
      $.ajax(settings).done(function (response) {
        for (let i = 0; i <= response.data.items.length-1; i++) {
            option.append(`
              <option value="${response.data.items[i].id}"> ${response.data.items[i].fullName}</option>
          `)
        }
      });
      // $("#inputID").on("click", function() {
      //   var selectedCountry = $(this).children("option:selected").val();  
      //   console.log(selectedCountry)
      // })
      $(".submitbutton").on("click", function(event) {
        var id = $("#inputID").children("option:selected").val();
        event.preventDefault();
        var form = new FormData();
        form.append("banner_image", $('input[type=file]')[0].files[0]);
        form.append("link", option.val());
        
        var settings = {
          "url": "http://142.93.219.133:4001/api/banner",
          "method": "POST",
          "timeout": 0,
          "processData": false,
          "mimeType": "multipart/form-data",
          "contentType": false,
          "data": form
        };
        
        $.ajax(settings).done(function (response) {
          location.reload(true);
          console.log(response);
        }).catch(err => {
          alert(JSON.parse(err.responseText).message);
        });
      })
      
      
    });
  })(jQuery);
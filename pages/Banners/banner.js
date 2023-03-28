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
      
      var settings = {
        "url": "http://142.93.219.133:4001/api/banner?_page=0&_limit=10",
        "method": "GET",
        "timeout": 0,
      };
      
      var rows = $('.rows')
      $.ajax(settings).done(function (response) {
        for (let i=0; i<= response.data.items.length -1 ; i++) {
              rows.append(`
              <tr>
                <td> ${i+1} </td>
                <td><img src="${response.data.items[i].image}" alt="image" style="height: 110px; width: 110px;"/> </td>
                <td> <button value="${response.data.items[i].id}" type="button" class="btn btn-danger bannerremove">Remove</button> </td>
              </tr>
          `)
        }

        $(document).on("click", ".bannerremove", function() {
          console.log($(this).val())
          var settings = {
            "url": `http://142.93.219.133:4001/api/banner/${$(this).val()}`,
            "method": "DELETE",
            "timeout": 0,
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
            location.reload(true);
          }).catch(err => {
            alert(JSON.parse(err.responseText).message);
          });
        })

      });
    });
  })(jQuery);
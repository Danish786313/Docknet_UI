(function($) {
    'use strict';
    $(function() {
      var currentPage = 0;
      var settings = {
        "url": "http://142.93.219.133:4001/api/docters?_page=0&_limit=10&searchText=",
        "method": "GET",
        "timeout": 0,
      };
      
      var option = $('#inputID') 
      $.ajax(settings).done(function (response) {
        
        for (let i = 0; i <= response.data.items.length-1; i++) {
            option.append(`
              <option value="${response.data.items[i].fullName}"> ${response.data.items[i].fullName}</option>
          `)
        }
      });
      
      $(".submitbutton").on("click", function(event) {
        console.log($('.otherlink').val())
        var id = $("#inputID").children("option:selected").val();
        event.preventDefault();
        var form = new FormData();
        form.append("banner_image", $('input[type=file]')[0].files[0]);
        form.append("link", option.val());
        form.append("docter_link", $('.otherlink').val())
        
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
        let pagination = $('.paginationdata')
        for (let i=currentPage; i <= response.data.totalPages -1 ; i++) {
          pagination.append(`<li class="page-item"><button value="${i}" type="button" class="page-link paginationbutton">${i + 1}</button></li>`)
        }
        for (let i=0; i<= response.data.items.length -1 ; i++) {
              rows.append(`
              <tr>
                <td> ${i+1} </td>
                <td> <img src="${response.data.items[i].image}" alt="image" style="height: 110px; width: 110px;"/> </td>
                <td> <button value="${response.data.items[i].id}" type="button" class="btn btn-danger bannerremove">Remove</button> </td>
              </tr>
          `)
        }

        $('.paginationbutton').on("click", function() {
          $('.rows>tr').remove()
          currentPage = $(this).val() 
          var settings = {
            "url": `http://142.93.219.133:4001/api/banner?_page=${currentPage}&_limit=10`,
            "method": "GET",
            "timeout": 0,
          };
          $.ajax(settings).done(function (response) {
            for (let i=0; i<= response.data.items.length -1 ; i++) {
              console.log(response.data.items[i].image)
              rows.append(`
              <tr>
                <td> ${i+1} </td>
                <td><img src="${response.data.items[i].image}" alt="image" style="height: 110px; width: 110px;"/> </td>
                <td> <button value="${response.data.items[i].id}" type="button" class="btn btn-danger bannerremove">Remove</button> </td>
              </tr>
          `)
        }
          })
        })
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
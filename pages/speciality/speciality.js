
(function($) {
    'use strict';
    $(function() {
      var search = $(".searchSpeciality")
      var currentPage = 0;
      search.on('input', function(event) {
        event.preventDefault();
        $('.rows>tr').remove()
        var searchText = $(this).val();
        var settings = {
          "url": `http://localhost:4000/api/speciality?searchText=${searchText}`,
          "method": "GET",
          "timeout": 0,
        };
          
        var num = $('.rows')
        $.ajax(settings).done(function (response) {
          console.log(response);
          for (var i = 0; i <response.data.length; i++) {
            num.append(`
                <tr>
                  <td hidden>${response.data[i].id}</td>
                  <td><img src=${response.data[i].logo} alt="image" /> </td>
                  <td> ${response.data[i].speciality} </td>
                  <td> ${response.data[i].commission} </td>
                  <td><button id='aprove_user' type='submit' class='badge badge-danger'>remove</button> </td>
                </tr>
            `)
          }
        });
      })

      var settings = {
        "url": `http://localhost:4000/api/speciality?_page=0&_limit=10`,
        "method": "GET",
        "timeout": 0,
      };
        
      var num = $('.rows')
      $.ajax(settings).done(function (response) {
        let pagination = $('.paginationdata')
        for (let i=currentPage; i <= response.data.totalPages -1 ; i++) {
          pagination.append(`<li class="page-item"><button value="${i}" type="button" class="page-link paginationbutton">${i + 1}</button></li>`)
        }
        for (var i = 0; i <response.data.items.length; i++) {
          num.append(`
              <tr>
                <td hidden>${response.data.items[i].id}</td>
                <td><img src=${response.data.items[i].logo} alt="image" /> </td>
                <td> ${response.data.items[i].speciality} </td>
                <td> ${response.data.items[i].commission} </td>
                <td><button id='aprove_user' type='submit' class='badge badge-danger'>remove</button> </td>
              </tr>
          `)
        }

        $('.paginationbutton').on("click", function() {
          $('.rows>tr').remove()
          currentPage = $(this).val()
          var settings = {
            "url": `http://localhost:4000/api/speciality?_page=${currentPage}&_limit=10`,
            "method": "GET",
            "timeout": 0,
          };
          
          $.ajax(settings).done(function (response) {
            for (var i = 0; i <response.data.items.length; i++) {
              num.append(`
                  <tr>
                    <td hidden>${response.data.items[i].id}</td>
                    <td><img src=${response.data.items[i].logo} alt="image" /> </td>
                    <td> ${response.data.items[i].speciality} </td>
                    <td> ${response.data.items[i].commission} </td>
                    <td><button id='aprove_user' type='submit' class='badge badge-danger'>remove</button> </td>
                  </tr>
              `)
            }
          })
        })
      });

        

        $(".submitbutton").on("click", function(event) {
          console.log("Danish")
          event.preventDefault();
          var formData = new FormData();
          formData.append('speciality', $('.speciality').val());
          formData.append('commission', $('.commissions').val());
          formData.append('SpecialityLogo', $('input[type=file]')[0].files[0])

          var settings = {
              "url": "http://localhost:4000/api/speciality",
              "method": "POST",
              "timeout": 0,
              contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
              processData: false,
              "data": formData
          };
            
          $.ajax(settings).done(function (response) {
            location.reload(true);
            console.log(response);
          }).catch(function (error) {
            alert(JSON.parse(error.responseText).message);
          });
        })
        
        $(document).on("click", "#aprove_user", function(){
          var id = $(this).parents("tr").find("td:eq(0)").html();
          var settings = {
            "url": `http:///localhost:4000/api/speciality/${id}`,
            "method": "DELETE",
            "timeout": 0,
          };
          $.ajax(settings).done(function (response) {
            location.reload(true)
            console.log(response);
          }).catch(error => {
            alert(JSON.parse(error.responseText).message);
          });
        })
    });
  })(jQuery);
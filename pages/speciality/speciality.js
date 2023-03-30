
(function($) {
    'use strict';
    $(function() {
      var search = $(".searchSpeciality")
      search.on('input', function(event) {
        event.preventDefault();
        $('.rows>tr').remove()
        var searchText = $(this).val();
        var settings = {
          "url": `http://142.93.219.133:4001/api/speciality?searchText=${searchText}`,
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
        "url": `http://142.93.219.133:4001/api/speciality`,
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

        

        $(".submitbutton").on("click", function(event) {
          console.log("Danish")
          event.preventDefault();
          var formData = new FormData();
          formData.append('speciality', $('.speciality').val());
          formData.append('commission', $('.commissions').val());
          formData.append('SpecialityLogo', $('input[type=file]')[0].files[0])

          var settings = {
              "url": "http:///142.93.219.133:4001/api/speciality",
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
            "url": `http:///142.93.219.133:4001/api/speciality/${id}`,
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
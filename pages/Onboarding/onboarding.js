
(function($) {
    'use strict';
    $(function() {
        var settings = {
            "url": "http://142.93.219.133:4001/api/getPendingCount?_page=0&_limit=10",
            "method": "GET",
            "timeout": 0,
          };
          
          $.ajax(settings).done(function (response) {
            var num = $('.rows')
            for (let i=0; i<= response.data.items.length - 1; i++) {
              num.append(`
                  <tr>
                      <td>${response.data.items[i].fullName}</td>
                      <td>${response.data.items[i].speciality}</td>
                      <td>${response.data.items[i].degree}</td>
                      <td>${response.data.items[i].email}</td>
                      <td>${response.data.items[i].is_aprove == true ? '<label class="badge badge-danger ">APROVED</label>': "<button id='aprove_user' type='submit' class='badge badge-danger'>Pending</button>"}
                  </tr>
              `)
            }
            }).catch(err => {
              alert(JSON.parse(err.responseText).message);
            });
            $(document).on("click","#aprove_user",function(){
              $(this).button('loading');
              setTimeout(function() {
                $this.button('reset');
            }, 5000);

              var email = $(this).parents("tr").find("td:eq(3)").html();
              var settings = {
                "url": `http://142.93.219.133:4001/api/approve?email=${email}&aprove=true`,
                "method": "GET",
                "timeout": 0,
              };
              $.ajax(settings).done(function (response) {
                $(this).prop('disabled', true);
                location.reload(true);
                console.log(response);
              }).catch(err => {
                alert(JSON.parse(err.responseText).message);
              });
            })
    });
  })(jQuery);
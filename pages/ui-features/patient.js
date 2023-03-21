
(function($) {
    'use strict';
    $(function() {
        var search = $(".searchPatients")
        var searchText = null

        var settings = {
            "url": "http://142.93.219.133:4001/api/patients?_page=0&_limit=10&searchText",
            "method": "GET",
            "timeout": 0,
          };
          $.ajax(settings).done(function (response) {   
            var num = $('.rows')
                for (let i=0; i<= response.data.items.length - 1; i++) {
                  num.append(`
                    <tr>
                        <td class="py-1">
                        <img src="${response.data.items[i].profilePicture}" alt="image" />
                        </td>
                        <td> ${response.data.items[i].name} </td>
                        <td>
                        ${response.data.items[i].email}
                        </td>
                        <td>  ${response.data.items[i].phone} </td>
                        <td> <button type="button" class="btn btn-gradient-primary btn-rounded btn-fw">See full profile</button> </td>
                    </tr>
                `)
                }
          }).catch(err => {
            alert(JSON.parse(err.responseText).message);
          });

          search.on('input', function() {
            $('.rows>tr').remove()
            searchText = $(this).val();
            console.log("searchText: " + searchText)
            var settings = {
              "url": `http://142.93.219.133:4001/api/patients?_page=0&_limit=10&searchText=${searchText}`,
              "method": "GET",
              "timeout": 0,
            };
            $.ajax(settings).done(function (response) {   
              var num = $('.rows')
                  for (let i=0; i<= response.data.items.length - 1; i++) {
                    num.append(`
                      <tr>
                          <td class="py-1">
                          <img src="${response.data.items[i].profilePicture}" alt="image" />
                          </td>
                          <td> ${response.data.items[i].name} </td>
                          <td>
                          ${response.data.items[i].email}
                          </td>
                          <td>  ${response.data.items[i].phone} </td>
                          <td> <button type="button" class="btn btn-gradient-primary btn-rounded btn-fw">See full profile</button> </td>
                      </tr>
                  `)
                  }
            }).catch(err => {
              alert(JSON.parse(err.responseText).message);
            });;
          })
    });
  })(jQuery);

(function($) {
    'use strict';
    $(function() {
        var settings = {
              "url": "http://142.93.219.133:4001/api/get-all-prescriptions",
              "method": "GET",
              "timeout": 0,
            };
            
            $.ajax(settings).done(function (response) {
                var num = $('.rows')
                for (let i=0; i<= response.data.items.length - 1; i++) {
                  num.append(`
                      <tr>
                          <td> ${ i + 1} </td>
                          <td> <img src="${response.data.items[i].patient.profilePicture}" alt="image" /> ${ response.data.items[i].docter.fullName } </td>
                          <td> <img src="${response.data.items[i].patient.profilePicture}" alt="image" /> ${ response.data.items[i].patient.name } </td>
                          <td>
                            <div class="mt-3">
                                <a class="btn-lg font-weight-medium auth-form-btn" href="${ response.data.items[i].prescription_file}">See Invoice</a>
                            </div> 
                          </td>
                      </tr>
                  `)
                }
            }).catch(err => {

            });

    });
  })(jQuery);
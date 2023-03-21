
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
                <td><label class="badge badge-danger">Pending</label></td>
            </tr>
            `)
            }
            }).catch(err => {
              alert(JSON.parse(err.responseText).message);
            });
    });
  })(jQuery);
(function($) {
    'use strict';
    $(function() {
        var currentPage = 0;

    var settings = {
        "url": "http://142.93.219.133:4001/api/fetchAllapointmets?_page=0&_limit=10&searchText",
        "method": "GET",
        "timeout": 0,
    };

    var rows = $('.rows')
    var reason = $('.reason')
    $.ajax(settings).done(function (response) {
        let pagination = $('.paginationdata')
          for (let i=currentPage; i <= response.data.totalPages -1 ; i++) {
            pagination.append(`<li class="page-item"><button value="${i}" type="button" class="page-link paginationbutton">${i + 1}</button></li>`)
          }

          for (let i=0; i <= response.data.items.length -1 ; i++) {
            rows.append(`
                <tr>
                <td> ${i+1} </td>
                  <td> <img src="${response.data.items[i].patient.profilePicture}" alt="image" />${response.data.items[i].patient.name} </td>
                  <td> <img src="${response.data.items[i].docter.photo}" alt="image" /> ${response.data.items[i].docter.fullName} </td>
                  <td> ${response.data.items[i].appointment.payment} </td>
                  <td> ${response.data.items[i].appointment.date} </td>
                  <td> ${response.data.items[i].appointment.time} </td>
                  <td> ${response.data.items[i].appointment.status} </td>
                  <td> <button value="${response.data.items[i].appointment.problem_desc}" type="button" class="btn btn-primary reasonbottun" data-bs-toggle="modal" data-bs-target="#exampleModal">Reason</button>
                  </td>
                </tr>
                `)
            }
            $('.paginationbutton').on("click", function() {
                $('.rows>tr').remove();
                currentPage = $(this).val() 
                var settings = {
                    "url": `http://142.93.219.133:4001/api/fetchAllapointmets?_page=${currentPage}&_limit=10&searchText`,
                    "method": "GET",
                    "timeout": 0,
                };
                $.ajax(settings).done(function (response) {
                    for (let i=0; i <= response.data.items.length -1 ; i++) {
                        rows.append(`
                            <tr>
                              <td> ${i*currentPage ? i*currentPage: i+1} </td>
                              <td> <img src="${response.data.items[i].patient.profilePicture}" alt="image" />${response.data.items[i].patient.name} </td>
                              <td> <img src="${response.data.items[i].docter.photo}" alt="image" /> ${response.data.items[i].docter.fullName} </td>
                              <td> ${response.data.items[i].appointment.payment} </td>
                              <td> ${response.data.items[i].appointment.date} </td>
                              <td> ${response.data.items[i].appointment.time} </td>
                              <td> ${response.data.items[i].appointment.status} </td>
                              <td> <button value="${response.data.items[i].appointment.problem_desc}" type="button" class="btn btn-primary reasonbottun" data-bs-toggle="modal" data-bs-target="#exampleModal">Reason</button>
                              </td>
                            </tr>
                            `)
                        }
                })
            })
        });

        $(document).on("click", ".reasonbottun", function(){
            reason.empty().append($(this).val())
           
        })

        var search = $(".searchapointments")
        search.on('input', function(event) {
            event.preventDefault();
            $('.rows>tr').remove();
            var searchText = $(this).val()
            var settings = {
                "url": `http://142.93.219.133:4001/api/fetchAllapointmets?_page=0&_limit=10&searchText=${searchText}`,
                "method": "GET",
                "timeout": 0,
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                for (let i=0; i <= response.data.items.length -1 ; i++) {
                    rows.append(`
                        <tr>
                            <td> ${i+1} </td>
                            <td> <img src="${response.data.items[i].patient.profilePicture}" alt="image" />${response.data.items[i].patient.name} </td>
                            <td> <img src="${response.data.items[i].docter.photo}" alt="image" /> ${response.data.items[i].docter.fullName} </td>
                            <td> ${response.data.items[i].appointment.payment} </td>
                            <td> ${response.data.items[i].appointment.date} </td>
                            <td> ${response.data.items[i].appointment.time} </td>
                            <td> ${response.data.items[i].appointment.status} </td>
                            <td> <button value="${response.data.items[i].appointment.problem_desc}" type="button" class="btn btn-primary reasonbottun" data-bs-toggle="modal" data-bs-target="#exampleModal">Reason</button>
                        </tr>
                        `)
                    }
                });
        })

    });
  })(jQuery);

(function($) {
    'use strict';
    $(function() {
      var currentPage = 0
      var pagination = $('.paginationdata')
      var searchText
      var num = $('.rows')

      $.ajax({
        "url": `http://142.93.219.133:4001/api/get-all-prescriptions?_page=0&_limit=10&searchText`,
        "method": "GET",
        "timeout": 0,
      })
      .done(function (response) {
        for (let i=currentPage; i <= response.data.totalPages -1 ; i++) {
          pagination.append(`<li class="page-item"><button value="${i}" type="button" class="page-link paginationbutton">${i + 1}</button></li>`)
        }
        for (let i=0; i<= response.data.items.length - 1; i++) {
          num.append(`<tr>
                          <td> ${ i + 1} </td>
                          <td> <img src="${response.data.items[i].patient.profilePicture}" alt="image" /> ${ response.data.items[i].docter.fullName } </td>
                          <td> <img src="${response.data.items[i].patient.profilePicture}" alt="image" /> ${ response.data.items[i].patient.name } </td>
                          <td>
                            <div class="mt-3">
                                <a class="btn-lg font-weight-medium auth-form-btn" href="${ response.data.items[i].prescription_file}">See Invoice</a>
                            </div> 
                          </td>
                      </tr>`
                    )}
      }).catch(err => {
        alert(JSON.parse(err.responseText).message);
      });
      

      $(document).on("click", ".paginationbutton", function() {
        $('.rows>tr').remove()
        $('.paginationdata>li').remove()
        currentPage = $(this).val()
        $.ajax({
          "url": `http://142.93.219.133:4001/api/get-all-prescriptions?_page=${currentPage}&_limit=10&searchText`,
          "method": "GET",
          "timeout": 0,
        })
        .done(function (response) {
          for (let i=currentPage; i <= response.data.totalPages -1 ; i++) {
            pagination.append(`<li class="page-item"><button value="${i}" type="button" class="page-link paginationbutton">${i + 1}</button></li>`)
          }
          for (let i=0; i<= response.data.items.length - 1; i++) {
            num.append(`<tr>
                            <td> ${ i + 1} </td>
                            <td> <img src="${response.data.items[i].patient.profilePicture}" alt="image" /> ${ response.data.items[i].docter.fullName } </td>
                            <td> <img src="${response.data.items[i].patient.profilePicture}" alt="image" /> ${ response.data.items[i].patient.name } </td>
                            <td>
                              <div class="mt-3">
                                  <a class="btn-lg font-weight-medium auth-form-btn" href="${ response.data.items[i].prescription_file}">See Invoice</a>
                              </div> 
                            </td>
                        </tr>`
                      )}
        }).catch(err => {
          alert(JSON.parse(err.responseText).message);
        });
      })
     
      $(".searchOnbaording").on('input', function(event) {
        $('.rows>tr').remove()
        $('.paginationdata>li').remove()
        searchText = $(this).val()
        $.ajax({
          "url": `http://142.93.219.133:4001/api/get-all-prescriptions?_page=&_limit=10&searchText=${searchText}`,
          "method": "GET",
          "timeout": 0,
        })
        .done(function (response) {
          for (let i=currentPage; i <= response.data.totalPages -1 ; i++) {
            pagination.append(`<li class="page-item"><button value="${i}" type="button" class="page-link paginationbutton">${i + 1}</button></li>`)
          }
          for (let i=0; i<= response.data.items.length - 1; i++) {
            num.append(`<tr>
                            <td> ${ i + 1} </td>
                            <td> <img src="${response.data.items[i].patient.profilePicture}" alt="image" /> ${ response.data.items[i].docter.fullName } </td>
                            <td> <img src="${response.data.items[i].patient.profilePicture}" alt="image" /> ${ response.data.items[i].patient.name } </td>
                            <td>
                              <div class="mt-3">
                                  <a class="btn-lg font-weight-medium auth-form-btn" href="${ response.data.items[i].prescription_file}">See Invoice</a>
                              </div> 
                            </td>
                        </tr>`
                      )}
        }).catch(err => {
          alert(JSON.parse(err.responseText).message);
        });
      })
            
            

            
    });
  })(jQuery);
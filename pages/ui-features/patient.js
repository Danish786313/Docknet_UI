
(function($) {
    'use strict';
    $(function() {
        var search = $(".searchPatients")
        var searchText = null
        var currentPage = 0

        var settings = {
            "url": "http://142.93.219.133:4001/api/patients?_page=0&_limit=10&searchText",
            "method": "GET",
            "timeout": 0,
          };
          $.ajax(settings).done(function (response) { 
            let pagination = $('.paginationdata')
            for (let i=currentPage; i <= response.data.totalPages -1 ; i++) {
              pagination.append(`<li class="page-item"><button value="${i}" type="button" class="page-link paginationbutton">${i + 1}</button></li>`)
            }  
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
                        <td> <button type="button" id="viewbutton" class="btn btn-gradient-primary btn-rounded btn-fw"  value=${response.data.items[i].id}>See full profile</button> </td>
                        <td>  ${ response.data.items[i].disable ? `<button type="button" data-id="true" class="btn btn-gradient-danger btn-fw disableButton" value=${response.data.items[i].id} >Deactive</button>`: `<button data-id="false" type="button" class="btn btn-gradient-success btn-fw activeButton" value=${ response.data.items[i].id }>Avtive</button>` } </td>
                    </tr>
                `)
                }
                $('.paginationbutton').on("click", function() {
                  $('.rows>tr').remove()
                  currentPage = $(this).val() 
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
                          <td> <button type="button" id="viewbutton" class="btn btn-gradient-primary btn-rounded btn-fw"  value=${response.data.items[i].id}>See full profile</button> </td>
                          <td>  ${ response.data.items[i].disable ? `<button type="button" data-id="true" class="btn btn-gradient-danger btn-fw disableButton" value=${response.data.items[i].id} >Deactive</button>`: `<button data-id="false" type="button" class="btn btn-gradient-success btn-fw activeButton" value=${ response.data.items[i].id }>Avtive</button>` } </td>
                      </tr>
                    `)
                }
                  }).catch(function(err) {
                    alert(JSON.parse(err.responseText).message);
                  })
                })
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
                          <td> <button type="button" id="viewbutton" class="btn btn-gradient-primary btn-rounded btn-fw"  value=${response.data.items[i].id}>See full profile</button> </td>
                          <td>  ${ response.data.items[i].disable ? `<button type="button" data-id="true" class="btn btn-gradient-danger btn-fw disableButton" value=${response.data.items[i].id} >Deactive</button>`: `<button data-id="false" type="button" class="btn btn-gradient-success btn-fw activeButton" value=${ response.data.items[i].id }>Avtive</button>` } </td>
                      </tr>
                  `)
                  }
            }).catch(err => {
              alert(JSON.parse(err.responseText).message);
            });;
          })

          $(document).on("click", "#viewbutton", function(){
            var date = new Date();
            date.setTime(date.getTime() + 24 * 60 * 60 * 1000); 
            $.cookie('id', $(this).val(), { path: '/' });
            $(location).prop('href', `./patientdetails/patientdetails.html`)
          })
          
          $(document).on("click", ".disableButton", function() {
            
            var settings = {
              "url": `http://142.93.219.133:4001/api/disable-patient?disable=false&patientId=${$(this).val()}`,
              "method": "PATCH",
              "timeout": 0,
            };
            
            $.ajax(settings).done(function (response) {
              location.reload(true);
              console.log(response);
            });
          })
          $(document).on("click", ".activeButton", function() {
      
            var settings = {
              "url": `http://142.93.219.133:4001/api/disable-patient?disable=true&patientId=${$(this).val()}`,
              "method": "PATCH",
              "timeout": 0,
            };
            
            $.ajax(settings).done(function (response) {
              location.reload(true);
              console.log(response);
            });
          })
      });
  })(jQuery);

(function($) {
  'use strict';
  $(function() {
    var search = $(".searchDocters")
    var searchText = null
    search.on('input', function(event, value) {
      $('.rows>tr').remove()
      searchText = $(this).val();
      var settings = {
        "url": `http://142.93.219.133:4001/api/docters?_page=0&_limit=10&searchText=${searchText}`,
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
      var num = $('.rows')
      for (let i=0; i<= response.data.items.length - 1; i++) {
        console.log(response.data.items[i].photo)
        num.append(`
            <tr>
                <td class="py-1">
                  <img src="${response.data.items[i].photo}" alt="image" />
                </td>
                <td> ${response.data.items[i].fullName} </td>
                <td>
                ${response.data.items[i].email}
                </td>
                <td> ${response.data.items[i].phone} </td>
                <td> <button type="button" class="btn btn-gradient-primary btn-rounded btn-fw viewbutton" value=${response.data.items[i].id}>See full profile</button> </td>
            </tr>
      `)
      }
      }).catch(err => {
        alert(JSON.parse(err.responseText).message);
      });
    })

    function searchDocter(search) {
      
      var settings = {
        "url": `http://142.93.219.133:4001/api/docters?_page=0&_limit=10&searchText=`,
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
      var num = $('.rows')
      for (let i=0; i<= response.data.items.length - 1; i++) {
        console.log(response.data.items[i].photo)
        num.append(`
            <tr>
                <td class="py-1">
                  <img src="${response.data.items[i].photo}" alt="image" />
                </td>
                <td> ${response.data.items[i].fullName} </td>
                <td>
                ${response.data.items[i].email}
                </td>
                <td> ${response.data.items[i].phone} </td>
                <td> <button type="button" class="btn btn-gradient-primary btn-rounded btn-fw" id="viewbutton" value=${response.data.items[i].id}>See full profile</button> </td>
            </tr>
      `)
      }
      }).catch(err => {
        alert(JSON.parse(err.responseText).message);
      });
    }

    $(document).on("click", "#viewbutton", function(){
      var date = new Date();
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000); 
      $.cookie('id', $(this).val(), { path: '/' });
      $(location).prop('href', `./docterdetails/docterdetails.html`)
    })

    searchDocter(searchText ? searchText : null)
  });
})(jQuery);
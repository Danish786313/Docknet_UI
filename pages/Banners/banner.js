(function($) {
    'use strict';
    $(function() {
        var settings = {
            "url": "http://142.93.219.133:4001/api/banner?_page=0&_limit=10",
            "method": "GET",
            "timeout": 0,
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
          });
    });
  })(jQuery);
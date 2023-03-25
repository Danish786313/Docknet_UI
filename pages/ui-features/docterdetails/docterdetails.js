
(function($) {
    'use strict';
    $(function() {
        var settings = {
            "url": `http://142.93.219.133:4001/api/docter/${$.cookie('id')}`,
            "method": "GET",
            "timeout": 0,
          };

          $.ajax(settings).done(function (response) {
            console.log(response)

            $('.fullName').html(response.data.fullName);
            $('.isPharmacist').html(response.data.isPharmacist ? "True" : "False")
            
            $('.email').html(response.data.email);            
            $('.Phone').html(response.data.phone);
            $('.gender').html(response.data.gender);
            $('.Degree').html(response.data.degree);
            $('.Speciality').html(response.data.speciality);
            $('.Experience').html(response.data.experience);

            $('.name').html(response.data.bankdetail.name);            
            $('.branchName').html(response.data.bankdetail.branchName);
            $('.ifscCode').html(response.data.bankdetail.ifscCode);
            $('.accountNo').html(response.data.bankdetail.accountNo);
            $('.accountType').html(response.data.bankdetail.accountType);

            $('.achivement').html(response.data.email);            
            $('.state').html(response.data.state);
            $('.city').html(response.data.city);
            $('.consultCharges').html(response.data.consultCharge);
            $('.clinicName').html(response.data.clinicName);
            $('.clinicAddress').html(response.data.clinicAddress);
            
          }).catch(err => {
            alert(JSON.parse(err.responseText).message);
          });
    });
  })(jQuery);
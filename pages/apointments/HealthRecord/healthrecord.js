(function($) {
    'use strict';
    $(function() {
        var settings = {
            "url": `http://142.93.219.133:4001/api/healthrecord/${$.cookie('id')}`,
            "method": "GET",
            "timeout": 0,
          };
          
          var card = $('.dynamiccard');
          $.ajax(settings).done(function (response) {
            console.log(response);
            card.append(`
                <div class="col-md-12 grid-margin stretch-card ">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">${response.data[0].fullName}</h4>
                        <ul class="list-arrow">
                          <li>DOB ${response.data[0].DOB}</li>
                          <li>gender ${response.data[0].gender}</li>
                          <div class="col-md-20">
                            <div class="row">
                              <div class="col-md-4">
                                <h6> emergency_contact </h6>
                                <p>- name: ${response.data[0].emergency_contact.name} </p>
                                <p>- number: ${response.data[0].emergency_contact.number} </p>
                                <p>- relationship: ${response.data[0].emergency_contact.relationship} </p>
                              </div>
                              <div class="col-md-4">
                                <h6>health_metrics</h6>
                                <p>- height: ${response.data[0].health_metrics.height} </p>
                                <p>- weight:  ${response.data[0].health_metrics.weight} </p>
                                <p>- blod_type:  ${response.data[0].health_metrics.blod_type} </p>
                              </div>
                              <div class="col-md-4">
                                <h6> drug_allergies </h6>
                                <p>-  allergy_name: ${response.data[0].drug_allergies.any_allergy} </p>
                                <p>-  allergy_name: ${response.data[0].drug_allergies.allergy_name ? response.data[0].drug_allergies.allergy_name: null} </p>                        
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-4">
                                <h6> other_allergies</h6>
                                <p>- allergy_name: ${response.data[0].other_allergies.allergy_name} </p>
                                <p>- allergy_name: ${response.data[0].other_allergies.any_other_allergy ? response.data[0].other_allergies.any_other_allergy: null} </p>
                              </div>
                              <div class="col-md-4">
                                <h6> vaccination </h6>
                                <p>- any_vaccine ${response.data[0].vaccination.any_vaccine}</p>
                                <p>- vaccine_name ${response.data[0].vaccination.vaccine_name ? response.data[0].vaccination.vaccine_name: null}</p>
                              </div>
                              <div class="col-md-4">
                                <h6> diseases </h6>
                                <p>- any_disease: ${response.data[0].diseases.any_disease} </p>
                                <p>- deseas_name: ${response.data[0].diseases.deseas_name ? response.data[0].diseases.deseas_name: null } </p>            
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-4">
                                <h6> medication </h6>
                                <p>- any_medication: ${response.data[0].medication.any_medication} </p>
                                <p>- medication_name: ${response.data[0].medication.medication_name} </p>
                              </div>
                              <div class="col-md-4">
                                <h6> smoking: ${response.data[0].smoking} </h6>
                                <h6> drinking_alcohol:  ${response.data[0].drinking_alcohol}</h6>
                              </div>
                              <div class="col-md-4">
                                <h6> consent ${response.data[0].consent}</h6>
                                <h6> shareRecord ${response.data[0].shareRecord}</h6>                     
                              </div>
                            </div>
                          </div>
                        </ul>
                      </div>
                `)
            for (let i=1; i<= response.data.length - 1 ; i++) {
                card.append(`
                <div class="col-md-12 grid-margin stretch-card ">
                    <div class="card">
                      <div class="card-body">
                          <div class="col-md-20">
                            <div class="row">
                              <div class="col-md-4">
                                <h6> emergency_contact </h6>
                                <p>- name: ${response.data[i].emergency_contact.name} </p>
                                <p>- number: ${response.data[i].emergency_contact.number} </p>
                                <p>- relationship: ${response.data[i].emergency_contact.relationship} </p>
                              </div>
                              <div class="col-md-4">
                                <h6>health_metrics</h6>
                                <p>- height: ${response.data[i].health_metrics.height} </p>
                                <p>- weight:  ${response.data[i].health_metrics.weight} </p>
                                <p>- blod_type:  ${response.data[i].health_metrics.blod_type} </p>
                              </div>
                              <div class="col-md-4">
                                <h6> drug_allergies </h6>
                                <p>-  allergy_name: ${response.data[i].drug_allergies.any_allergy} </p>
                                <p>-  allergy_name: ${response.data[i].drug_allergies.allergy_name ? response.data[i].drug_allergies.allergy_name: null} </p>                        
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-4">
                                <h6> other_allergies</h6>
                                <p>- allergy_name: ${response.data[i].other_allergies.allergy_name} </p>
                                <p>- allergy_name: ${response.data[i].other_allergies.any_other_allergy ? response.data[i].other_allergies.any_other_allergy: null} </p>
                              </div>
                              <div class="col-md-4">
                                <h6> vaccination </h6>
                                <p>- any_vaccine ${response.data[i].vaccination.any_vaccine}</p>
                                <p>- vaccine_name ${response.data[i].vaccination.vaccine_name ? response.data[i].vaccination.vaccine_name: null}</p>
                              </div>
                              <div class="col-md-4">
                                <h6> diseases </h6>
                                <p>- any_disease: ${response.data[i].diseases.any_disease} </p>
                                <p>- deseas_name: ${response.data[i].diseases.deseas_name ? response.data[i].diseases.deseas_name: null } </p>            
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-4">
                                <h6> medication </h6>
                                <p>- any_medication: ${response.data[i].medication.any_medication} </p>
                                <p>- medication_name: ${response.data[i].medication.medication_name} </p>
                              </div>
                              <div class="col-md-4">
                                <h6> smoking: ${response.data[i].smoking} </h6>
                                <h6> drinking_alcohol:  ${response.data[0].drinking_alcohol}</h6>
                              </div>
                              <div class="col-md-4">
                                <h6> consent ${response.data[i].consent}</h6>
                                <h6> shareRecord ${response.data[i].shareRecord}</h6>                     
                              </div>
                            </div>
                          </div>
                        </ul>
                      </div>
                `)
            }
          }).catch(err => {
            alert(JSON.parse(err.responseText).message);
        });
    });
})(jQuery);
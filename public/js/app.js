/* eslint-disable camelcase */
$(document).ready(function() {
  console.log("I AM HERE");

  var render = function(serviceList) {
    $("#service-board").empty();
    for (var i = 0; i <= serviceList.length; i++) {
      $("#service-board").append(`<div class="col-sm">
          <div class="card" style="width: 18rem; margin-top: 3rem;">
              <div class="card-body">
                  <h5 class="card-title">${serviceList[i].title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">
                    ${serviceList[i].time_date}
                  </h6>
                  <p class="card-text">${serviceList[i].service_des}</p>

              </div>
          </div>
          </div>

      </div>`);
    }
  };

  var getServices = function() {
    $.get("/api/service").then(function(data) {
      render(data);
    });
  };

  getServices();

  var postService = function(e) {
    e.preventDefault();
    //save the input in an object called "newService"
    var newService = {
      title: $("#activityName").val(),
      time_date: $("#date").val(),
      service_des: $("#description").val()
    };
    console.log("---NEW SERVICE---");
    console.log(newService);

    //POST the service to /api/service
    $.post("/api/service", newService).then(function() {
      //after recieving response get services
      getServices();

      //blank out inputs after post
      $("#activityName").val("");
      $("#date").val("");
      $("#description").val("");
    });
  };

  $("#formSubmit").on("click", postService);
});

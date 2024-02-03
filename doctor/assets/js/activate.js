var request;
$("#activate_device").submit(function (event) {
  document.getElementById("loader1").style.visibility = "visible";
  // Prevent default posting of form - put here to work in case of errors
  event.preventDefault();

  // Abort any pending request
  if (request) {
    request.abort();
  }
  // var formData = new FormData(this);
  //   console.log(formData);
  // var dateFormat= new Date();
  // formData.append("sender_id", user_ida);
  // var token = localStorage.getItem('token');
  var pgender = document.getElementById("pgender").value;
  var pemail = document.getElementById("pemail").value;
  var pname = document.getElementById("pname").value;
  var pid = document.getElementById("all_patient_list").value;
  var bday = document.getElementById("bday").value;
  var mac_address = document.getElementById("mac_address").value;
  var device_type = document.getElementById("device_type").value;
  var data = JSON.stringify({
    gender: pgender,
    email: pemail,
    name: pname,
    pid: pid,
    device_type: device_type,
    bday: bday,
    mac_address: mac_address,
  });
  //   var Low_threshold1 = document.getElementById("Low_threshold1").value;
  //   var medical_condition1 = document.getElementById("medical_condition1").value;
  // var notes1 = document.getElementById("notes1").value;
  // console.log(token);
  var settings = {
    url: `${baseurl}/activate-request/`,
    method: "POST",
    timeout: 0,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  // console.log(data);
  //
  $.ajax(settings).done(function (response) {
    document.getElementById("loader1").style.visibility = "hidden";
    console.log(response.status);
    if(response.msg == "Blood Pressure device for this patient is already added and activated"){
                              Swal.fire({
                        title: "Error!",
                        text: response.msg,
                        icon: "error"
                      });
    }
    if (response.res == "success") {
      Swal.fire({
        icon: "success",
        title: "Successful!",
        text: "Device Activated Successfully",
        allowOutsideClick: false,
      });
      $("button.swal2-confirm").click(function () {
        window.location.reload();
      });
    }
  });
});

// document.getElementById("loader1").style.visibility = "visible";
//             $.ajax({
//                 type: "put",
//                 data: data,
//                 url: `${baseurl}/patient-edit/${id}`,
//                 timeout: 0,
//                 headers: {
//                   "Authorization": `Bearer ${token}`,
//                   "Content-Type": "application/json",
//                 },
//                 success: function (response) {
//                     // $("#div11").html(result);
//                     // console.log(result)
//                     Swal.fire({
//                       icon: 'success',
//                       title: 'Successful!',
//                       text: response.message,
//                       allowOutsideClick: false
//                     })
//                     $( 'button.swal2-confirm' ).click(function() {
//                       window.location.reload();
//                     });
//                     document.getElementById("loader1").style.visibility = "hidden";
//                 },
//                 error: function(response) {
//                   // console.log(response);

//                   if(response.responseJSON.message == "Authentication failed"){
//                     window.location.replace("index.html");
//                       }
//                   if(response.status == 500){
//                         Swal.fire({
//                         title: "Error!",
//                         text: response.responseJSON.message1,
//                         icon: "error"
//                       });
//                       }
//                 }
//             });

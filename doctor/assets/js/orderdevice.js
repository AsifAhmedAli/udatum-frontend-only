var request;
if ($(window).width() < 768) {
  $("#search").click(function () {
    $(this).next().slideToggle();
  });
}

if ($(window).width() < 1100) {
  $("#menu").click(function () {
    $("aside").toggleClass("d-flex");
  });
}
var table = $("#example").DataTable({
  dom: "Bfrtip",
  lengthMenu: [8, 32, 50, 75, 100],
});

var token = localStorage.getItem("token");
var user_ida = localStorage.getItem("id");
var messagesanchor = document.getElementById("messagesanchor");
messagesanchor.setAttribute(
  "href",
  `${clientbaseurl}/doctor/chat.html?id=${user_ida}`
);

$("#ordernewdevice").submit(function (event) {
  // Prevent default posting of form - put here to work in case of errors
  event.preventDefault();

  // Abort any pending request
  if (request) {
    request.abort();
  }
  document.getElementById("loader1").style.visibility = "visible";
  var devicetype = document.getElementById("dname").value;
  var address = document.getElementById("address").value;
  var numberofdevices = document.getElementById("numberofdevices").value;
  window.location.replace(
    `${clientbaseurl}/doctor/checkout.html?devicetype=${devicetype}&address=${address}&numberofdevices=${numberofdevices}&did=${user_ida}`
  );
  // data = JSON.stringify({
  //   devicetype: devicetype,
  //   did: user_ida,
  //   numberofdevices: numberofdevices,
  //   address: address,
  // });
  // console.log(devicetype);

  // $.ajax({
  //   type: "post",
  //   url: `${baseurl}/order-device`,
  //   timeout: 0,
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   },
  //   data: data,
  //   success: function (response) {
  //     Swal.fire({
  //       icon: "success",
  //       title: "Successful!",
  //       text: "Device Ordered Successfully",
  //       allowOutsideClick: false,
  //     });
  //     $("button.swal2-confirm").click(function () {
  //       window.location.reload();
  //     });
  //     document.getElementById("loader1").style.visibility = "hidden";
  //   },
  //   error: function (response) {
  //     // console.log(response);

  //     if (response.responseJSON.message == "Already Ordered") {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Failed!",
  //         text: response.responseJSON.message,
  //         allowOutsideClick: false,
  //       });
  //       $("button.swal2-confirm").click(function () {
  //         window.location.reload();
  //       });
  //     }
  //   },
  // });
});
// console.log(token)
if (token == null) {
  window.location.replace("index.html");
} else {
  $.ajax({
    type: "get",
    url: `${baseurl}/patient-list-of-a-doctor`,
    timeout: 0,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    success: function (response) {
      // $("#div11").html(result);
      console.log("success");
      // document.getElementById("loader1").style.visibility = "hidden";
    },
    error: function (response) {
      // console.log(response);

      if (response.responseJSON.message == "Authentication failed") {
        window.location.replace("index.html");
      }
    },
  });
}

// Update clock display every second
setInterval(function () {
  var now = new Date();

  // Format date and time
  var date = now.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  var time = hours + ":" + minutes + ":" + seconds + " " + ampm;

  // Display date and time in clock element
  $("#clock").text(date + " " + time);
}, 1000);

function getpreviousorders() {
  document.getElementById("loader1").style.visibility = "visible";
  var token = localStorage.getItem("token");
  var did = localStorage.getItem("id");
  $.ajax({
    type: "get",
    url: `${baseurl}/get-pervious-orders/${did}`,
    timeout: 0,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    success: function (response) {
      // $("#div11").html(result);
      if(response.length == 0){

      }
      else{
        var i = 1;
        response.forEach((key) => {
          document.getElementById("tdata").innerHTML += `<tr>
          <th scope="row">${i}</th>
          <td>${key.timestamp}</td>
          <td>${key.devicetype}</td>
          <td>${key.numberofdevices}</td>
          <td>${key.address}</td>
          <td>${key.statusoforder}</td>
        </tr>`;
          i++;
        });        
      }
      console.log(response);
      document.getElementById("loader1").style.visibility = "hidden";
    },
    error: function (response) {
      // console.log(response);

      if (response.responseJSON.message == "Authentication failed") {
        window.location.replace("index.html");
      }
    },
  });
}

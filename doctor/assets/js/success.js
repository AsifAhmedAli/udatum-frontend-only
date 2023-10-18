var token = localStorage.getItem("token");
var user_ida = localStorage.getItem("id");
var url_str = window.location.href;
let url = new URL(url_str);
let search_params = url.searchParams;

// get value of "id" parameter
// "100"

if (
  search_params.has("devicetype") &&
  search_params.has("quantity") &&
  search_params.has("address") &&
  search_params.has("did")
) {
  // "100"
  var devicetype = search_params.get("devicetype");
  var numberofdevices = search_params.get("quantity");
  var address = search_params.get("address");
  var did = search_params.get("did");
  data = JSON.stringify({
    devicetype: devicetype,
    did: did,
    numberofdevices: numberofdevices,
    address: address,
  });
  //   console.log(devicetype);

  $.ajax({
    type: "post",
    url: `${baseurl}/order-device`,
    timeout: 0,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: data,
    success: function (response) {
      Swal.fire({
        icon: "success",
        title: "Successful!",
        text: "Device Ordered Successfully",
        allowOutsideClick: false,
      });
      $("button.swal2-confirm").click(function () {
        window.location.replace("./dashboard.html");
      });
      document.getElementById("loader1").style.visibility = "hidden";
    },
    error: function (response) {
      // console.log(response);

      //   if (response.responseJSON.message == "Already Ordered") {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Internal Server Error",
        allowOutsideClick: false,
      });
      $("button.swal2-confirm").click(function () {
        window.location.replace("./dashboard.html");
      });
      //   }
    },
  });
} else {
  window.location.replace("./index.html");
}

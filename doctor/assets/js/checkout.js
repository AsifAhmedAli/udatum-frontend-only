function checkout() {
  // Get the parameters from the URL
var devicetype = getUrlParameter('devicetype');
var numberofdevices = getUrlParameter('numberofdevices');
var address = getUrlParameter('address');
var did = getUrlParameter('did');

// Decode the parameters
  devicetype = decodeParams(devicetype);
  numberofdevices = decodeParams(numberofdevices);
  address = decodeParams(address);
  did = decodeParams(did);
  console.log(devicetype)
  console.log(numberofdevices)
  console.log(address)
  console.log(did)

  // var url_str = window.location.href;
  // console.log(url_str)
  // url_str = decodeURIComponent(url_str);
  // console.log(url_str)
  
  // let url = new URL(url_str);
  // let search_params = url.searchParams;
  // search_params = decodeURIComponent(search_params);
  // console.log(search_params)
  // get value of "id" parameter
  // "100"
  // console.log(search_params.get("devicetype"));

  // console.log(search_params.get("numberofdevices"));
  // console.log(decodeURIComponent(search_params.get("address")));
  if (devicetype != "" &&
  devicetype != undefined &&
  devicetype != null &&
  numberofdevices != "" &&
  numberofdevices != undefined &&
  numberofdevices != null &&
  address != "" &&
  address != undefined &&
  address != null &&
  did != "" &&
  did != undefined &&
  did != null) {
    // data = JSON.stringify({
    //   devicetype: devicetype,
    //   did: did,
    //   numberofdevices: numberofdevices,
    //   address: address,
    // });
    //   console.log(devicetype);
    document.getElementById("loader1").style.visibility = "visible";
    $.ajax({
      type: "post",
      url: `${baseurl}/create-checkout-session`,
      data: {
        devicetype: devicetype,
        did: did,
        numberofdevices: numberofdevices,
        address: address,
      },
      success: function (response) {
        // console.log(response);
        window.location.replace(response.url);
        // document.getElementById("showeverything").innerHTML = response;
        //   Swal.fire({
        //     icon: "success",
        //     title: "Successful!",
        //     text: "Device Ordered Successfully",
        //     allowOutsideClick: false,
        //   });
        //   $("button.swal2-confirm").click(function () {
        //     window.location.reload();
        //   });
        // document.getElementById("loader1").style.visibility = "hidden";
      },
      error: function (response) {
        console.log(response);
        console.log("error");

        // if (response.responseJSON.message == "Already Ordered") {
        //   Swal.fire({
        //     icon: "error",
        //     title: "Failed!",
        //     text: response.responseJSON.message,
        //     allowOutsideClick: false,
        //   });
        //   $("button.swal2-confirm").click(function () {
        //     window.location.reload();
        //   });
        // }
      },
    });
    // console.log(devicetype);
    // console.log(numberofdevices);
    // console.log(address);
  } else {
    alert("error")
    // window.location.replace("./index.html");
  }
}


function decodeParams(params) {
  return decodeURIComponent(params);
}

// Function to get URL parameters
function getUrlParameter(name) {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}


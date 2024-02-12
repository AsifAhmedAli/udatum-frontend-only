function checkout() {
  var url_str = window.location.href;
  let url = new URL(url_str);
  let search_params = url.searchParams;

  // get value of "id" parameter
  // "100"

  if (
    search_params.has("devicetype") &&
    search_params.has("numberofdevices") &&
    search_params.has("address")
  ) {
    // "100"
    var devicetype = search_params.get("devicetype");
    var numberofdevices = search_params.get("numberofdevices");
    var address = search_params.get("address");
    var did = search_params.get("did");
    data = JSON.stringify({
      devicetype: devicetype,
      did: did,
      numberofdevices: numberofdevices,
      address: address,
    });
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
        console.log(response);
        // window.location.replace(response.url);
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
    window.location.replace("./index.html");
  }
}

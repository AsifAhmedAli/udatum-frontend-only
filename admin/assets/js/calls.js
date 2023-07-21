function all_orders() {
  var token = localStorage.getItem("admin_token");
  var orderedby = "";
  document.getElementById("loader1").style.visibility = "visible";
  $.ajax({
    type: "get",
    url: `./all_orders.html`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    success: function (result) {
      $("#showhere").html(result);
    },
  });
  $.ajax({
    type: "get",
    url: `${baseurl}/admin/get-all-orders/`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    success: function (result) {
      var i = 1;

      result.forEach((key) => {
        var orderbyid = "orderedby" + i;
        document.getElementById("tbody").innerHTML += `<tr>
                <th scope="row">${i}</th>
                <td id="${orderbyid}"></td>
                <td>${key.timestamp}</td>
                <td>${key.devicetype}</td>
                <td>${key.numberofdevices}</td>
                <td>${key.statusoforder}</td>
                <td>${key.address}</td>
                <td><button onclick="editorder('${key.id}')" class="btn btn-md btn-outline-dark"><i class="fa fa-edit"></i></button></td>
              </tr>`;
        $.ajax({
          type: "get",
          url: `${baseurl}/admin/get-one-doctor-by-admin/${key.did}`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          success: function (results1) {
            orderedby = results1[0].name;
            document.getElementById(orderbyid).innerHTML = orderedby;
          },
        });
        i++;
      });
      document.getElementById("loader1").style.visibility = "hidden";
    },
    error: function (response) {
      // console.log(response);

      if (response.responseJSON.message == "Authentication failed") {
        window.location.replace("login.html");
      }
    },
  });
}

function editorder(x) {
  var myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {
    keyboard: false,
  });
  myModal.show();
  document.getElementById("orderid").value = x;
  //   console.log(x);
}

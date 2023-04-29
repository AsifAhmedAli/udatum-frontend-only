document.getElementById("loader1").style.visibility = "visible";
var token = localStorage.getItem("admin_token");
$.ajax({
  type: "get",
  url: `${baseurl}/admin/get-all-doctors`,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  success: function (result) {
    console.log("success");
    document.getElementById("loader1").style.visibility = "hidden";
    // $("#showhere").html(result);
  },
  error: function (response) {
    console.log(response);
    if (response.responseJSON.message == "Authentication failed") {
      localStorage.removeItem("admin_id");
      localStorage.removeItem("admin_token");
      window.location.replace("login.html");
    }
  },
});
var admin_id = localStorage.getItem("admin_id");
var admin_token = localStorage.getItem("admin_token");
if (
  typeof admin_id !== "undefined" ||
  typeof admin_token !== "undefined" ||
  admin_id !== null ||
  admin_token !== null
) {
  // your code here
} else {
  localStorage.removeItem("admin_id");
  localStorage.removeItem("admin_token");
  window.location.replace("login.html");
}

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString("en-US", {
    month: "long",
  });
}

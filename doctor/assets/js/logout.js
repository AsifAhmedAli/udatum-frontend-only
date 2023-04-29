$("#logout-btn").click(function (event) {
  event.preventDefault();
  // Display confirmation dialog using SweetAlert2
  Swal.fire({
    title: "Are you sure you want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout",
  }).then((result) => {
    if (result.isConfirmed) {
      // If user confirms logout, get authentication token from local storage
      var token = localStorage.getItem("token");

      // Send POST request to logout API endpoint
      $.ajax({
        url: "http://localhost:3000/doctor-logout",
        type: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
        success: function (response) {
          // If logout successful, remove token from local storage and redirect to login page
          localStorage.removeItem("token");
          localStorage.removeItem("id");
          window.location.href = "./login.html";
        },
        error: function (xhr, status, error) {
          // If error occurred, display error message using SweetAlert2
          Swal.fire({
            title: "Error",
            text: "Logout failed: " + error,
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
        },
      });
    }
  });
});

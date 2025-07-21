function hideAll() {
  document.querySelectorAll("section").forEach((sec) => {
    sec.classList.add("hidden");
    sec.classList.remove("animate");
  });
}

function goBack() {
  hideAll();
  const hero = document.getElementById("hero");
  hero.classList.remove("hidden");
  hero.classList.add("animate");
}

function showStudentLogin() {
  hideAll();
  document
    .getElementById("studentLoginForm")
    .classList.replace("hidden", "animate");
}

function showStudentRegister() {
  hideAll();
  document
    .getElementById("studentRegisterForm")
    .classList.replace("hidden", "animate");
}

function showStaffLogin() {
  hideAll();
  document
    .getElementById("staffLoginForm")
    .classList.replace("hidden", "animate");
}

function showStaffRegister() {
  hideAll();
  document
    .getElementById("staffRegisterForm")
    .classList.replace("hidden", "animate");
}

function showStudentComplaintForm() {
  hideAll();
  document
    .getElementById("studentComplaintForm")
    .classList.replace("hidden", "animate");
}

function showStaffComplaintForm() {
  hideAll();
  document
    .getElementById("staffComplaintForm")
    .classList.replace("hidden", "animate");
}

function showAdminDashboard() {
  hideAll();
  document
    .getElementById("adminDashboard")
    .classList.replace("hidden", "animate");
}

function saveUserData(role, name) {
  const data = { role, name, timestamp: new Date().toISOString() };
  localStorage.setItem("user", JSON.stringify(data));
}

document.addEventListener("DOMContentLoaded", () => {
  // Student Registration Validation
  const studentRegisterForm = document.getElementById("student-register-form");
  const studentPassword = document.getElementById("student-password");
  const studentConfirm = document.getElementById("student-confirm-password");
  const studentError = document.getElementById("password-error");

  if (studentRegisterForm) {
    studentRegisterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (studentPassword.value !== studentConfirm.value) {
        studentError.style.display = "block";
        alert("Passwords do not match.");
        return;
      }
      studentError.style.display = "none";
      alert("Registration successful!");
      saveUserData("student", document.getElementById("student-name").value);
      showStudentComplaintForm();
    });
  }

  // Staff Registration Validation
  const staffRegisterForm = document.getElementById("staff-register-form");
  const staffPassword = document.getElementById("staff-password");
  const staffConfirm = document.getElementById("staff-confirm-password");
  const staffError = document.getElementById("staff-password-error");

  if (staffRegisterForm) {
    staffRegisterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (staffPassword.value !== staffConfirm.value) {
        staffError.style.display = "block";
        alert("Passwords do not match.");
        return;
      }
      staffError.style.display = "none";
      alert("Registration successful!");
      saveUserData("staff", document.getElementById("staff-name").value);
      showStaffComplaintForm();
    });
  }

  // Submit Student Complaint
  const studentSubmitBtn = document.getElementById("student-submit-button");
  if (studentSubmitBtn) {
    studentSubmitBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const name = document.getElementById("student-name").value;
      const department = document.getElementById("student-department").value;
      const id = document.getElementById("student-id").value;
      const category = document.getElementById("complaint-category").value;
      const message = document.getElementById("student-message").value;

      fetch("http://localhost:3000/submitComplaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          department,
          user_id: id,
          category,
          message,
          role: "student",
        }),
      })
        .then((res) => res.text())
        .then((data) => alert(data))
        .catch((err) => console.error(err));
    });
  }

  // Submit Staff Complaint
  const staffSubmitBtn = document.getElementById("staff-submit-button");
  if (staffSubmitBtn) {
    staffSubmitBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const name = document.getElementById("staff-name").value;
      const department = document.getElementById("staff-department").value;
      const id = document.getElementById("staff-id").value;
      const category = document.getElementById(
        "staff-complaint-category"
      ).value;
      const message = document.getElementById("staff-message").value;

      fetch("http://localhost:3000/submitComplaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          department,
          user_id: id,
          category,
          message,
          role: "staff",
        }),
      })
        .then((res) => res.text())
        .then((data) => alert(data))
        .catch((err) => console.error(err));
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  // SHOW REGISTER FORM WHEN LINK CLICKED
  const registerLink = document.getElementById("showstudentRegisterForm");
  const loginForm = document.getElementById("studentLoginForm");
  const registerForm = document.getElementById("studentRegisterForm");

  if (registerLink && loginForm && registerForm) {
    registerLink.addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("hidden");
      registerForm.classList.remove("hidden");
      registerForm.classList.add("animate");
    });
  }

  // The rest of your registration/submit logic remains unchanged...
});
document
  .getElementById("studentRegisterFormElem")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page reload

    // Optional: Add form validation here (e.g., required fields)

    // Hide the register form
    document
      .getElementById("studentRegisterFormElem")
      .parentElement.classList.add("hidden");

    // Show the complaint section
    document
      .getElementById("studentComplaintSection")
      .classList.remove("hidden");
  });

  window.onload = function () {
    const complaintForm = document.getElementById("studentComplaintForm");
    const complaintSection = document.getElementById("studentComplaintSection");
    const successMessage = document.getElementById("studentSuccessMessage");
    const backToHomeBtn = document.getElementById("backToHomeBtn");

    complaintForm.addEventListener("submit", function (e) {
      e.preventDefault(); // stop page reload

      // Hide complaint form
      complaintSection.classList.add("hidden");

      // Show thank you + back button
      successMessage.classList.remove("hidden");
      backToHomeBtn.classList.remove("hidden");
    });
  };

  function goToHomePage() {
    window.location.href = "../index.html"; // change path if needed
  }


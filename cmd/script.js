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
  const form = document.getElementById("studentLoginForm");
  form.classList.remove("hidden");
  form.classList.add("animate");
}

function showStudentRegister() {
  hideAll();
  const form = document.getElementById("studentRegisterForm");
  form.classList.remove("hidden");
  form.classList.add("animate");
}

function showStaffLogin() {
  hideAll();
  const form = document.getElementById("staffLoginForm");
  form.classList.remove("hidden");
  form.classList.add("animate");
}

function showComplaintForm() {
  hideAll();
  const form = document.getElementById("complaintForm");
  form.classList.remove("hidden");
  form.classList.add("animate");
}

function saveUserData(role) {
  const data = {
    role,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem("user", JSON.stringify(data));
}

function submitComplaint() {
  const category = document.getElementById("category").value;
  const message = document.getElementById("message").value;

  if (!category || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const complaint = {
    category,
    message,
    submittedAt: new Date().toISOString(),
  };
  localStorage.setItem("lastComplaint", JSON.stringify(complaint));

  document.getElementById("complaintFormContent").classList.add("hidden");
  document.getElementById("successMessage").classList.remove("hidden");
}
document
  .getElementById("studentRegisterForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // prevent default submission

    const password = document.getElementById("student-password").value;
    const confirmPassword = document.getElementById(
      "student-confirm-password"
    ).value;

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    alert("Registration successful!");
  });
const registerForm = document.getElementById("student-register-form");
const passwordField = document.getElementById("student-password");
const confirmPasswordField = document.getElementById(
  "student-confirm-password"
);
const errorMessage = document.getElementById("password-error");

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const password = passwordField.value.trim();
  const confirmPassword = confirmPasswordField.value.trim();

  if (password !== confirmPassword) {
    errorMessage.style.display = "block";
    passwordField.value = "";
    confirmPasswordField.value = "";
    passwordField.focus();
    return;
  }

  errorMessage.style.display = "none";
  alert("Registration successful!");
  // Add your saving logic here (JSON/database)
});

passwordField.addEventListener("input", () => {
  errorMessage.style.display = "none";
});

confirmPasswordField.addEventListener("input", () => {
  errorMessage.style.display = "none";
});

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

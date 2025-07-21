// UTILITIES: show/hide sections
function hideAllSections() {
  document.querySelectorAll("section").forEach((sec) => {
    sec.classList.add("hidden");
    sec.classList.remove("animate");
  });
}
function showSection(id) {
  hideAllSections();
  const el = document.getElementById(id);
  el.classList.remove("hidden");
  el.classList.add("animate");
}

// Back to home button handler
function goToHomePage() {
  // Clear stored user info on home (optional)
  localStorage.removeItem("user");
  showSection("studentLoginForm");
  hideBackToHome();
  hideSuccessMessage();
}

// Show/hide back to home button
function showBackToHome() {
  document.getElementById("backToHomeBtn").classList.remove("hidden");
}
function hideBackToHome() {
  document.getElementById("backToHomeBtn").classList.add("hidden");
}

// Show/hide success message
function showSuccessMessage(msg = "") {
  const el = document.getElementById("studentSuccessMessage");
  el.textContent =
    msg ||
    "✅ Thank you for your complaint! It has been submitted successfully.";
  el.classList.remove("hidden");
}
function hideSuccessMessage() {
  document.getElementById("studentSuccessMessage").classList.add("hidden");
}

// Show/hide password mismatch error on registration
function showPasswordError(show) {
  const el = document.getElementById("studentPasswordError");
  el.style.display = show ? "block" : "none";
}

// Store user info on login or registration
function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}
// Get stored user info
function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

document.addEventListener("DOMContentLoaded", () => {
  // Initial view: show login form
  showSection("studentLoginForm");
  hideBackToHome();
  hideSuccessMessage();
  showPasswordError(false);

  // Link to show registration form from login form
  document
    .getElementById("showstudentRegisterForm")
    .addEventListener("click", (e) => {
      e.preventDefault();
      showSection("studentRegisterForm");
    });

  // Back to Home button click
  document
    .getElementById("backToHomeBtn")
    .querySelector("button")
    .addEventListener("click", goToHomePage);

  // LOGIN form submit
  document
    .getElementById("studentLoginFormElem")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const user_id = document.getElementById("studentLoginEmail").value.trim();
      const password = document.getElementById("studentLoginPassword").value;
      const role = "student";

      if (!user_id || !password) {
        alert("Please fill in both email and password.");
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id, password, role }),
        });
        const data = await res.json();

        if (res.ok) {
          // Save user info locally
          saveUser({ user_id, role });

          // Show complaint form
          showSection("studentComplaintSection");
          showBackToHome();
          hideSuccessMessage();
        } else {
          alert(data.error || "Login failed.");
        }
      } catch (err) {
        console.error("Login error", err);
        alert("Server error during login.");
      }
    });

  // REGISTRATION form submit
  document
    .getElementById("studentRegisterFormElem")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("studentRegName").value.trim();
      const user_id = document.getElementById("studentRegId").value.trim();
      const department = document.getElementById("studentRegDept").value.trim();
      const email = document.getElementById("studentRegEmail").value.trim();
      const password = document.getElementById("studentRegPassword").value;
      const confirmPassword = document.getElementById(
        "studentRegConfirmPassword"
      ).value;
      const role = "student";

      if (password !== confirmPassword) {
        showPasswordError(true);
        return;
      }
      showPasswordError(false);

      if (!name || !user_id || !department || !email || !password) {
        alert("Please fill all registration fields.");
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id, password, role, name, department }),
        });
        const data = await res.json();

        if (res.ok) {
          alert("Registration successful! Please login.");
          showSection("studentLoginForm");
        } else {
          alert(data.error || "Registration failed.");
        }
      } catch (err) {
        console.error("Registration error", err);
        alert("Server error during registration.");
      }
    });

  // COMPLAINT form submit
  document
    .getElementById("studentComplaintForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const category = document.getElementById(
        "studentComplaintCategory"
      ).value;
      const message = document
        .getElementById("studentComplaintMessage")
        .value.trim();

      if (!category || !message) {
        alert("Please fill all complaint fields.");
        return;
      }

      const user = getUser();
      if (!user) {
        alert("User not logged in. Please login first.");
        showSection("studentLoginForm");
        hideBackToHome();
        return;
      }

      const name = user.name || "Anonymous"; // optionally store name in localStorage on login/register
      const department = user.department || "Unknown"; // same as above
      const user_id = user.user_id;
      const role = user.role;

      try {
        const res = await fetch("http://localhost:3000/submitComplaint", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            department,
            user_id,
            category,
            message,
            role,
          }),
        });
        const data = await res.json();

        if (res.ok) {
          showSuccessMessage(data.message);
          showBackToHome();
          document.getElementById("studentComplaintForm").reset();
        } else {
          alert(data.error || "Failed to submit complaint.");
        }
      } catch (err) {
        console.error("Complaint submission error", err);
        alert("Server error during complaint submission.");
      }
    });
});
function hideAll() {
  document.querySelectorAll("#student-dashboard section").forEach((sec) => {
    sec.classList.add("hidden");
    sec.classList.remove("animate");
  });
}

function showSection(id) {
  hideAll();
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove("hidden");
    el.classList.add("animate");
  }
}

// Example usage
document.getElementById("showLoginBtn").addEventListener("click", () => {
  showSection("studentLoginForm");
});
document.getElementById("showRegisterBtn").addEventListener("click", () => {
  showSection("studentRegisterForm");
});
document.getElementById("showComplaintBtn").addEventListener("click", () => {
  showSection("studentComplaintSection");
});
function hideAll() {
  document.querySelectorAll("#student-dashboard section").forEach((sec) => {
    sec.classList.add("hidden");
    sec.classList.remove("animate");
  });
}
function showStudentLogin() {
  hideAll();
  const el = document.getElementById("studentLoginForm");
  el.classList.remove("hidden");
  el.classList.add("animate");
}

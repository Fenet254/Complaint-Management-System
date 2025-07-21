const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve static files once
app.use("/views", express.static(path.join(__dirname, "cmd", "views")));

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ru0810/15",
  database: "complaint_system",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err);
    process.exit(1); // Exit if no DB connection
  }
  console.log("✅ Connected to MySQL Database");
});

// LOGIN endpoint
app.post("/login", (req, res) => {
  const { user_id, password, role } = req.body;

  if (!user_id || !password || !role) {
    return res
      .status(400)
      .json({ error: "Please provide user_id, password, and role" });
  }

  const sql =
    "SELECT * FROM users WHERE user_id = ? AND password = ? AND role = ?";
  db.query(sql, [user_id, password, role], (err, results) => {
    if (err) {
      console.error("❌ Error querying login:", err);
      return res.status(500).json({ error: "Server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Redirect based on role
    let redirectPath = "";
    if (role === "student") redirectPath = "studentDashboard.html";
    else if (role === "staff") redirectPath = "staffDashboard.html";
    else if (role === "admin") redirectPath = "adminDashboard.html";
    else redirectPath = "login.html"; // fallback

    res
      .status(200)
      .json({ message: "Login successful", redirect: redirectPath });
  });
});


app.post("/submitComplaint", (req, res) => {
  const { name, department, user_id, category, message, role } = req.body;

  if (!name || !department || !user_id || !category || !message || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO complaints (name, department, user_id, category, message, role) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [name, department, user_id, category, message, role],
    (err, results) => {
      if (err) {
        console.error("❌ Error inserting complaint:", err);
        return res.status(500).json({ error: "Server error" });
      }
      // Send success message
      res.status(200).json({ message: "✅ Complaint submitted successfully" });
    }
  );
});

// GET ALL COMPLAINTS
app.get("/getComplaints", (req, res) => {
  const sql = "SELECT * FROM complaints ORDER BY submitted_at DESC"; // Optional ordering if you have submitted_at column
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching complaints:", err);
      return res.status(500).json({ error: "Server error" });
    }
    res.json(results);
  });
});

// GET COMPLAINTS BY ROLE
app.get("/getComplaintsByRole/:role", (req, res) => {
  const role = req.params.role;
  const sql = "SELECT * FROM complaints WHERE role = ?";
  db.query(sql, [role], (err, results) => {
    if (err) {
      console.error(" Error fetching complaints by role:", err);
      return res.status(500).json({ error: "Server error" });
    }
    res.json(results);
  });
});

// GET COMPLAINTS BY USER_ID
app.get("/getComplaintsByUser/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  const sql = "SELECT * FROM complaints WHERE user_id = ?";
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error(" Error fetching complaints by user:", err);
      return res.status(500).json({ error: "Server error" });
    }
    res.json(results);
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
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
// REGISTER endpoint
app.post("/register", (req, res) => {
  const { user_id, name, password, department, role } = req.body;

  if (!user_id || !name || !password || !department || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if user already exists
  const checkSql = "SELECT * FROM users WHERE user_id = ?";
  db.query(checkSql, [user_id], (err, results) => {
    if (err) {
      console.error(" Error checking user existence:", err);
      return res.status(500).json({ error: "Server error" });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Insert new user
    const insertSql =
      "INSERT INTO users (user_id, name, password, department, role) VALUES (?, ?, ?, ?, ?)";
    db.query(insertSql, [user_id, name, password, department, role], (err, results) => {
      if (err) {
        console.error(" Error inserting user:", err);
        return res.status(500).json({ error: "Server error" });
      }

      res.status(201).json({ message: "User registered successfully" });
    });
  });
});



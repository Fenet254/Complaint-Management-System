const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ✅ Serve static files
app.use("/views", express.static(path.join(__dirname, "cmd", "views")));


app.use("/views", express.static(path.join(__dirname, "cmd", "views")));
// FIXED: No extra /views prefix

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ru0810/15",
  database: "complaint_system",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err);
    return;
  }
  console.log("✅ Connected to MySQL Database");
});

// ✅ LOGIN
app.post("/login", (req, res) => {
  const { user_id, password, role } = req.body;

  const sql =
    "SELECT * FROM users WHERE user_id = ? AND password = ? AND role = ?";
  db.query(sql, [user_id, password, role], (err, results) => {
    if (err) return res.status(500).json({ error: "Server error" });

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // ✅ Redirect based on role
    let redirectPath = "";
    if (role === "student") redirectPath = "studentDashboard.html";
    else if (role === "staff") redirectPath = "staffDashboard.html";
    else if (role === "admin") redirectPath = "adminDashboard.html";

    res
      .status(200)
      .json({ message: "Login successful", redirect: redirectPath });
  });
});

// ✅ SUBMIT COMPLAINT
app.post("/submitComplaint", (req, res) => {
  const { name, department, user_id, category, message, role } = req.body;

  if (!name || !department || !user_id || !category || !message || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO complaints (name, department, user_id, category, message, role) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, department, user_id, category, message, role], (err) => {
    if (err) {
      console.error("❌ Error inserting complaint:", err);
      return res.status(500).json({ error: "Server error" });
    }
    res.status(200).json({ message: "✅ Complaint submitted successfully" });
  });
});

// ✅ GET ALL COMPLAINTS
app.get("/getComplaints", (req, res) => {
  db.query("SELECT * FROM complaints", (err, result) => {
    if (err) {
      console.error("❌ Error fetching complaints:", err);
      return res.status(500).send("Server error");
    }
    res.json(result);
  });
});

// ✅ FILTER BY ROLE
app.get("/getComplaintsByRole/:role", (req, res) => {
  const role = req.params.role;
  db.query("SELECT * FROM complaints WHERE role = ?", [role], (err, result) => {
    if (err) return res.status(500).json({ error: "Server error" });
    res.json(result);
  });
});

// ✅ FILTER BY USER ID
app.get("/getComplaintsByUser/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  db.query(
    "SELECT * FROM complaints WHERE user_id = ?",
    [user_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Server error" });
      res.json(result);
    }
  );
});

// ✅ START SERVER
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

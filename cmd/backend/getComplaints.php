<?php
// getComplaints.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Database config
$host = "localhost";   // change if needed
$user = "root";        // your MySQL username
$pass = "";            // your MySQL password
$dbname = "complaints_db"; // your database name

// Connect to database
$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// Fetch complaints
$sql = "SELECT id, name, department, category, message, role, submitted_at FROM complaints ORDER BY submitted_at DESC";
$result = $conn->query($sql);

$complaints = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $complaints[] = $row;
    }
}

// Return JSON
echo json_encode($complaints, JSON_PRETTY_PRINT);

// Close connection
$conn->close();
?>

<?php
// addComplaint.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

// Database config
$host = "localhost";   
$user = "root";        
$pass = "";            
$dbname = "complaints_db"; 

// Connect to database
$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// Get raw POST data
$data = json_decode(file_get_contents("php://input"), true);

if (
    isset($data['name']) &&
    isset($data['department']) &&
    isset($data['category']) &&
    isset($data['message']) &&
    isset($data['role'])
) {
    $name = $conn->real_escape_string($data['name']);
    $department = $conn->real_escape_string($data['department']);
    $category = $conn->real_escape_string($data['category']);
    $message = $conn->real_escape_string($data['message']);
    $role = $conn->real_escape_string($data['role']);

    $sql = "INSERT INTO complaints (name, department, category, message, role)
            VALUES ('$name', '$department', '$category', '$message', '$role')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Complaint submitted successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid input data"]);
}

$conn->close();
?>

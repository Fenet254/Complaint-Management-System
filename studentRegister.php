<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "complaints_db";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['name'], $data['student_id'], $data['department'], $data['email'], $data['password'])) {
    $name = $conn->real_escape_string($data['name']);
    $studentId = $conn->real_escape_string($data['student_id']);
    $department = $conn->real_escape_string($data['department']);
    $email = $conn->real_escape_string($data['email']);
    $password = password_hash($data['password'], PASSWORD_BCRYPT);

    // Check uniqueness
    $check = $conn->query("SELECT id FROM students WHERE student_id='$studentId' OR email='$email'");
    if ($check->num_rows > 0) {
        echo json_encode(["success" => false, "error" => "Student ID or Email already exists"]);
        exit();
    }

    $sql = "INSERT INTO students (student_id, name, department, email, password)
            VALUES ('$studentId', '$name', '$department', '$email', '$password')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Student registered successfully"]);
    } else {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid input"]);
}


$conn->close();
?>

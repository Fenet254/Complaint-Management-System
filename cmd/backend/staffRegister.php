<?php
// staffRegister.php
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

if (isset($data['name'], $data['email'], $data['password'])) {
    $name = $conn->real_escape_string($data['name']);
    $email = $conn->real_escape_string($data['email']);
    $password = password_hash($data['password'], PASSWORD_BCRYPT);

    // Ensure email is unique
    $check = $conn->query("SELECT id FROM staff WHERE email='$email'");
    if ($check->num_rows > 0) {
        echo json_encode(["success" => false, "error" => "Email already registered"]);
        exit();
    }

    $sql = "INSERT INTO staff (name, email, password) VALUES ('$name', '$email', '$password')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Staff registered successfully"]);
    } else {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid input"]);
}

$conn->close();
?>

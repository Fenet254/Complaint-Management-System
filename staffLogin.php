<?php
// staffLogin.php
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

if (isset($data['email'], $data['password'])) {
    $email = $conn->real_escape_string($data['email']);
    $password = $data['password'];

    $sql = "SELECT id, name, password FROM staff WHERE email='$email' LIMIT 1";
    $result = $conn->query($sql);

    if ($result && $result->num_rows === 1) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            echo json_encode(["success" => true, "message" => "Login successful", "staffId" => $row['id'], "name" => $row['name']]);
        } else {
            echo json_encode(["success" => false, "error" => "Invalid password"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "No account found"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid input"]);
}

$conn->close();
?>

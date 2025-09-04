<?php
// staffComplaint.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

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

if (isset($data['staffId'], $data['category'], $data['message'])) {
    $staffId = intval($data['staffId']);
    $category = $conn->real_escape_string($data['category']);
    $message = $conn->real_escape_string($data['message']);

    // Get staff name & role
    $staff = $conn->query("SELECT name FROM staff WHERE id=$staffId LIMIT 1");
    if ($staff && $staff->num_rows === 1) {
        $staffRow = $staff->fetch_assoc();
        $name = $conn->real_escape_string($staffRow['name']);
        $role = "Staff";

        $sql = "INSERT INTO complaints (name, department, category, message, role)
                VALUES ('$name', 'General', '$category', '$message', '$role')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["success" => true, "message" => "Complaint submitted successfully"]);
        } else {
            echo json_encode(["success" => false, "error" => $conn->error]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Invalid staff ID"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid input"]);
}

$conn->close();
?>

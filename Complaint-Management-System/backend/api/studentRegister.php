<?php
// backend/api/studentRegister.php
require 'db.php';
$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$pass = $data['password'] ?? '';

if (!$name || !$email || !$pass) {
  http_response_code(400);
  echo json_encode(['error'=>'Missing fields']);
  exit;
}

$hash = password_hash($pass, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO students (name,email,password_hash) VALUES (?, ?, ?)");
$stmt->bind_param('sss',$name,$email,$hash);

if ($stmt->execute()) {
  echo json_encode(['ok'=>true,'id'=>$stmt->insert_id]);
} else {
  http_response_code(400);
  echo json_encode(['error'=>$conn->error]);
}

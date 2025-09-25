<?php
// backend/api/studentLogin.php
require 'db.php';
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$pass = $data['password'] ?? '';

if (!$email || !$pass) { http_response_code(400); echo json_encode(['error'=>'Missing']); exit; }

$stmt = $conn->prepare("SELECT id, password_hash, name FROM students WHERE email=?");
$stmt->bind_param('s',$email);
$stmt->execute();
$res = $stmt->get_result();
if ($row = $res->fetch_assoc()) {
  if (password_verify($pass, $row['password_hash'])) {
    // naive session token — in prod use JWT or sessions
    echo json_encode(['ok'=>true, 'student'=>['id'=>$row['id'],'name'=>$row['name'],'email'=>$email]]);
  } else {
    http_response_code(401); echo json_encode(['error'=>'Invalid credentials']);
  }
} else {
  http_response_code(401); echo json_encode(['error'=>'Invalid credentials']);
}

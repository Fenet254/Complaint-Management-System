<?php
// backend/api/addComplaint.php
require 'db.php';
$data = json_decode(file_get_contents('php://input'), true);

$title = trim($data['title'] ?? '');
$description = trim($data['description'] ?? '');
$type_id = intval($data['type_id'] ?? 0);
$anonymous = isset($data['anonymous']) ? (int)$data['anonymous'] : 0;
$student_id = isset($data['student_id']) ? intval($data['student_id']) : null;

if (!$title || !$description || !$type_id) {
  http_response_code(400);
  echo json_encode(['error'=>'Missing fields']);
  exit;
}

$stmt = $conn->prepare("INSERT INTO complaints (student_id, type_id, title, description, anonymous) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param('iissi', $student_id, $type_id, $title, $description, $anonymous);

if ($stmt->execute()) {
  echo json_encode(['ok'=>true, 'id'=>$stmt->insert_id]);
} else {
  http_response_code(500);
  echo json_encode(['error'=>$conn->error]);
}

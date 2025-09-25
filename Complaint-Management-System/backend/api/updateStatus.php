<?php
// backend/api/updateStatus.php
require 'db.php';
$data = json_decode(file_get_contents('php://input'), true);
$id = intval($data['id'] ?? 0);
$status = $data['status'] ?? '';

if (!$id || !in_array($status, ['open','in_progress','resolved','dismissed'])) {
  http_response_code(400); echo json_encode(['error'=>'Invalid']);
  exit;
}

$stmt = $conn->prepare("UPDATE complaints SET status=?, updated_at=NOW() WHERE id=?");
$stmt->bind_param('si', $status, $id);
if ($stmt->execute()) echo json_encode(['ok'=>true]);
else { http_response_code(500); echo json_encode(['error'=>$conn->error]); }

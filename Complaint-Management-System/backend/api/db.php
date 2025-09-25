<?php
// backend/api/db.php
header('Content-Type: application/json; charset=utf-8');

$DB_HOST = 'localhost';
$DB_USER = 'root';
$DB_PASS = ''; // set your password
$DB_NAME = 'cms_db';

$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'DB connect error']);
    exit;
}
$conn->set_charset('utf8mb4');

<?php
// backend/api/getTypes.php
require 'db.php';

$res = $conn->query("SELECT id, name FROM complaint_types ORDER BY name");
$types = [];
while ($row = $res->fetch_assoc()) $types[] = $row;
echo json_encode($types);

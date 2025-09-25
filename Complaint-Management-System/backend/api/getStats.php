<?php
// backend/api/getStats.php
require 'db.php';
$res = $conn->query("SELECT status, COUNT(*) as cnt FROM complaints GROUP BY status");
$stats = [];
while ($r = $res->fetch_assoc()) $stats[$r['status']] = intval($r['cnt']);
echo json_encode($stats);

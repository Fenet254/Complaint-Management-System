
<?php
// backend/api/getComplaints.php
require 'db.php';

/*
 Query params supported (GET):
  - q (search)
  - page (int)
  - per (int)
  - type (int)
  - status (open/in_progress/resolved/dismissed)
  - sort (created_at|title|status)
  - dir (asc|desc)
*/

$q = isset($_GET['q']) ? "%{$_GET['q']}%" : null;
$page = max(1, intval($_GET['page'] ?? 1));
$per = max(1, min(100, intval($_GET['per'] ?? 10)));
$type = isset($_GET['type']) ? intval($_GET['type']) : null;
$status = isset($_GET['status']) ? $_GET['status'] : null;
$sort = in_array($_GET['sort'] ?? 'created_at', ['created_at','title','status']) ? $_GET['sort'] : 'created_at';
$dir = (strtolower($_GET['dir'] ?? 'desc') === 'asc') ? 'ASC' : 'DESC';

$start = ($page - 1) * $per;

$where = [];
$params = [];
$types = '';

if ($q !== null) {
  $where[] = "(c.title LIKE ? OR c.description LIKE ? OR t.name LIKE ?)";
  $params[] = $q; $params[] = $q; $params[] = $q; $types .= 'sss';
}
if ($type) { $where[] = "c.type_id = ?"; $params[] = $type; $types .= 'i'; }
if ($status) { $where[] = "c.status = ?"; $params[] = $status; $types .= 's'; }

$where_sql = count($where) ? "WHERE " . implode(" AND ", $where) : "";

$count_stmt = $conn->prepare("SELECT COUNT(*) as cnt FROM complaints c JOIN complaint_types t ON c.type_id = t.id $where_sql");
if ($types) $count_stmt->bind_param($types, ...$params);
$count_stmt->execute();
$count_res = $count_stmt->get_result()->fetch_assoc();
$total = intval($count_res['cnt']);

$sql = "SELECT c.id, c.title, c.description, c.status, c.created_at, c.updated_at, c.anonymous, c.student_id, t.name AS type_name
        FROM complaints c
        JOIN complaint_types t ON c.type_id = t.id
        $where_sql
        ORDER BY c.$sort $dir
        LIMIT ?, ?";
$paramsWithLimit = $params;
$typesWithLimit = $types . 'ii';
$paramsWithLimit[] = $start;
$paramsWithLimit[] = $per;

$stmt = $conn->prepare($sql);
$stmt->bind_param($typesWithLimit, ...$paramsWithLimit);
$stmt->execute();
$res = $stmt->get_result();

$rows = [];
while ($r = $res->fetch_assoc()) $rows[] = $r;

echo json_encode([
  'data' => $rows,
  'meta' => ['total' => $total, 'page' => $page, 'per' => $per]
]);

<?php
include 'db.php';

$result = $conn->query("SELECT * FROM complaint_types");

while($row = $result->fetch_assoc()) {
    echo $row['id'] . " - " . $row['name'] . "<br>";
}
?>

<?php
$host = "localhost";   // MySQL server
$user = "root";        // default user (change if needed)
$pass = "";            // your root password (if you set one)
$db   = "cms_db";      // the database we chose

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

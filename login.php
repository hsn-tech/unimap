<?php
include "db.php";

// استقبال البيانات
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

// استخدام الاستعلام المجهز 
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ? AND password = ?");
$stmt->bind_param("ss", $email, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    echo "success";  
} else {
    echo "error";
}

$stmt->close();
$conn->close();
?>
<?php
session_start();

// Kết nối đến cơ sở dữ liệu
$conn = new mysqli("localhost", "root", "", "rom_database");

if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Tìm kiếm người dùng trong cơ sở dữ liệu
    $sql = "SELECT * FROM users WHERE username = ?";
    if (!$stmt = $conn->prepare($sql)) {
        die("Chuẩn bị câu lệnh SQL thất bại: " . $conn->error);
    }

    // Bind tham số
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    // Kiểm tra mật khẩu (ở đây dùng MD5, nhưng bạn nên dùng password_hash trong môi trường thực)
    if ($user && md5($password) === $user['password']) {
        // Đăng nhập thành công
        $_SESSION['username'] = $user['username'];
        echo "Đăng nhập thành công. Đang chuyển hướng...";

        // Kiểm tra session và chuyển hướng
        if (isset($_SESSION['username'])) {
            header("Location: index.php");  // Chuyển hướng đến trang download ROM
            exit();  // Dừng script sau khi chuyển hướng
        } else {
            echo "Lỗi: Session không lưu trữ.";
        }
    } else {
        // Đăng nhập thất bại
        $error = "Invalid username or password.";
        header("Location: login.php?error=" . urlencode($error));
        exit();
    }
}

$conn->close();
?>
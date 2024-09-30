<?php
session_start();  // Khởi động session

// Kết nối tới cơ sở dữ liệu
$conn = new mysqli("localhost", "root", "", "rom_database");

if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

// Kiểm tra xem người dùng đã đăng nhập chưa
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

// Lấy danh sách thiết bị từ MySQL
$sql = "SELECT * FROM devices";
$result = $conn->query($sql);

if (!$result) {
    die("Truy vấn thất bại: " . $conn->error);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Samsung ROM Download</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <div class="container">
        <h1>Samsung Devices</h1>
        <div class="device-grid">
            <?php
            if ($result->num_rows > 0) {
                // Hiển thị từng thiết bị
                while($row = $result->fetch_assoc()) {
                    echo '<div class="device-card">';
                    echo '<img src="' . $row["image_url"] . '" alt="' . $row["device_name"] . '">';
                    echo '<h3>' . $row["device_name"] . '</h3>';
                    echo '<p>Model: ' . $row["model"] . '</p>';
                    echo '<a href="device.php?id=' . $row["id"] . '" class="download-btn">Download ROM</a>';
                    echo '</div>';
                }
            } else {
                echo "Không có thiết bị nào.";
            }

            // Đóng kết nối cơ sở dữ liệu
            $conn->close();
            ?>
        </div>

        <a href="logout.php">Logout</a>
    </div>

</body>
</html>
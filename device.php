<?php
// Kết nối tới cơ sở dữ liệu
$conn = new mysqli("localhost", "root", "", "rom_database");

if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

// Lấy ID thiết bị từ URL
$device_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Lấy thông tin thiết bị
$sql_device = "SELECT * FROM devices WHERE id = $device_id";
$result_device = $conn->query($sql_device);
$device = $result_device->fetch_assoc();

// Lấy các ROM của thiết bị
$sql_roms = "SELECT * FROM roms WHERE device_id = $device_id";
$result_roms = $conn->query($sql_roms);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Device Details</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <div class="container">
        <div class="device-info">
            <h2>Device Info</h2>
            <p><strong>Device name:</strong> <?php echo $device['device_name']; ?></p>
            <p><strong>Codename:</strong> <?php echo $device['codename']; ?></p>
            <p><strong>Model:</strong> <?php echo $device['model']; ?></p>
        </div>

        <h3>Available ROMs</h3>

        <table class="rom-table">
            <thead>
                <tr>
                    <th>ROM Version</th>
                    <th>Android Version</th>
                    <th>Release Date</th>
                    <th>Recovery</th>
                    <th>Fastboot</th>
                </tr>
            </thead>
            <tbody>
                <?php
                if ($result_roms->num_rows > 0) {
                    while ($rom = $result_roms->fetch_assoc()) {
                        echo '<tr>';
                        echo '<td>' . $rom["rom_version"] . '</td>';
                        echo '<td>' . $rom["android_version"] . '</td>';
                        echo '<td>' . $rom["release_date"] . '</td>';
                        echo '<td><a href="' . $rom["recovery_url"] . '">Download Recovery</a></td>';
                        echo '<td><a href="' . $rom["fastboot_url"] . '">Download Fastboot</a></td>';
                        echo '</tr>';
                    }
                } else {
                    echo '<tr><td colspan="5">Không có ROM nào.</td></tr>';
                }

                $conn->close();
                ?>
            </tbody>
        </table>
    </div>

</body>
</html>
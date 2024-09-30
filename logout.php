<?php
session_start();

// Hủy bỏ tất cả các session và đăng xuất
session_destroy();

header("Location: login.php");
exit();
?>
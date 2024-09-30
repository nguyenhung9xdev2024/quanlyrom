<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng Nhập</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

<div class="background-stripes">
    <!-- Đường chéo vàng -->
    <div class="stripe stripe1"></div>
    <div class="stripe stripe2"></div>
</div>

<div class="login-wrapper">
    <div class="logo">
        <img src="logo.png" alt="Best Moon Logo">
    </div>
    <div class="login-container">
        <h2>ĐĂNG NHẬP</h2>
        <form action="authenticate.php" method="POST">
            <div class="input-group">
                <input type="text" id="username" name="username" placeholder="Tên đăng nhập" required>
            </div>
            <div class="input-group">
                <input type="password" id="password" name="password" placeholder="Mật khẩu" required>
                <a href="#">Quên mật khẩu?</a>
            </div>
            <div class="remember-me">
                <input type="checkbox" id="remember" name="remember">
                <label for="remember">Lưu tài khoản?</label>
            </div>
            <input type="submit" value="Đăng Nhập" class="login-btn">
        </form>
        <div class="extra-links">
            <p>Đã có tài khoản? <a href="#">Đăng Kí</a></p>
            <p><a href="#">Liên hệ</a> | <a href="#">Điều khoản</a></p>
        </div>
    </div>
</div>

</body>
</html>
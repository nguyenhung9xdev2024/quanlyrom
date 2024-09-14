$(document).ready(function() {
    // Khởi tạo DataTable
    var table = $('#rom-table').DataTable({
        "lengthMenu": [ [10, 20, 30], [10, 20, 30] ]
    });

    // Lấy dữ liệu từ file JSON và thêm vào bảng
    fetch('rom-data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(rom => {
                table.row.add([
                    rom.release_date,
                    rom.device_name,
                    rom.android_version,
                    rom.name,
                    rom.rom_type
                ]).draw(false);
            });
        });

    // Chức năng tìm kiếm đơn giản
    $('#search-btn').on('click', function() {
        var keyword = $('#search-box').val();
        table.search(keyword).draw();
    });
});

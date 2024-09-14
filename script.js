$(document).ready(function() {
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
                    rom.rom_type,
                    `<button class="view-details-btn" data-details="${rom.rom_details}">Xem chi tiết</button>`
                ]).draw(false);
            });

            // Thêm sự kiện click cho các nút "Xem chi tiết"
            $('.view-details-btn').on('click', function() {
                var romDetails = $(this).data('details');
                $('#rom-details').html(romDetails);
                $('#rom-detail-popup').show();
            });
        });

    // Đóng popup khi bấm vào nút đóng (x)
    $('.close').on('click', function() {
        $('#rom-detail-popup').hide();
    });

    // Đóng popup khi bấm ngoài vùng popup
    $(window).on('click', function(event) {
        if ($(event.target).is('#rom-detail-popup')) {
            $('#rom-detail-popup').hide();
        }
    });
});

$(document).ready(function() {
    var table = $('#rom-table').DataTable({
        responsive: true,
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
                    `<button class="view-details-btn" 
                        data-details="${rom.rom_details}" 
                        data-image="${rom.image_url}" 
                        data-name="${rom.name}"
                        data-device-name="${rom.device_name}"
                        data-android-version="${rom.android_version}"
                        data-release-date="${rom.release_date}"
                        data-rom-type="${rom.rom_type}"
                        data-hardware-cpu="${rom.hardware_specs ? rom.hardware_specs.cpu : 'N/A'}"
                        data-hardware-ram="${rom.hardware_specs ? rom.hardware_specs.ram : 'N/A'}"
                        data-hardware-storage="${rom.hardware_specs ? rom.hardware_specs.storage : 'N/A'}">Xem chi tiết</button>`
                ]).draw(false);
            });

            // Thêm sự kiện click cho các nút "Xem chi tiết"
            $('.view-details-btn').on('click', function() {
                var romDetails = $(this).data('details');
                var deviceImage = $(this).data('image');
                var name = $(this).data('name');
                var deviceName = $(this).data('device-name');
                var androidVersion = $(this).data('android-version');
                var releaseDate = $(this).data('release-date');
                var romType = $(this).data('rom-type');

                // Thông số phần cứng
                var hardwareCpu = $(this).data('hardware-cpu');
                var hardwareRam = $(this).data('hardware-ram');
                var hardwareStorage = $(this).data('hardware-storage');

                var formattedDetails = romDetails.split('\n').map(function(detail) {
                    return '<li>' + detail + '</li>';
                }).join('');

                $('#rom-details').html('<ul>' + formattedDetails + '</ul>');
                $('#device-image').attr('src', deviceImage);
                $('#name').text(name);
                $('#device_name').text(deviceName);
                $('#android_version').text(androidVersion);
                $('#release_date').text(releaseDate);
                $('#rom_type').text(romType);

                // Cập nhật thông số phần cứng
                $('#hardware_cpu').text(hardwareCpu);
                $('#hardware_ram').text(hardwareRam);
                $('#hardware_storage').text(hardwareStorage);

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

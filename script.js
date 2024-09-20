$(document).ready(function() {
    // Lấy dữ liệu từ JSON
    fetch('rom-data.json')
        .then(response => response.json())
        .then(data => {
            let container = $('.rom-card-container');
            renderRomCards(data, container);

            // Thêm sự kiện cho nút lọc
            $('#filter-btn').on('click', function() {
                const deviceFilter = $('#device-filter').val().trim().toLowerCase();
                const versionFilter = $('#version-filter').val().trim();
                const romTypeFilter = $('#rom-type-filter').val().trim();

                const filteredData = data.filter(rom => {
                    const deviceMatch = rom.device_name.toLowerCase().includes(deviceFilter);
                    const versionMatch = versionFilter === '' || rom.android_version == versionFilter;
                    const romTypeMatch = romTypeFilter === '' || rom.rom_type.trim().toLowerCase() === romTypeFilter.toLowerCase();
                    return deviceMatch && versionMatch && romTypeMatch;
                });

                container.empty();
                renderRomCards(filteredData, container);
            });
        });

    // Hàm render lại các thẻ sau khi lọc
    function renderRomCards(data, container) {
        data.forEach(rom => {
            let romCard = `
                <div class="rom-card">
                    <img src="${rom.image_url}" alt="${rom.device_name}" class="rom-image">
                    <h3>${rom.device_name}</h3>
                    <p>Phiên bản Android: ${rom.android_version}</p>
                    <p>Thể loại rom: ${rom.rom_type}</p>
                    <button class="view-details-btn" 
                        data-details="${rom.rom_details ? rom.rom_details : 'Updating'}" 
                        data-image="${rom.image_url ? rom.image_url : 'Updating' }" 
                        data-name="${rom.name ? rom.name : 'Updating'}"
                        data-device-name="${rom.device_name ? rom.device_name : 'Updating'}"
                        data-android-version="${rom.android_version ? rom.android_version : 'Updating'}"
                        data-release-date="${rom.release_date ? rom.release_date : 'Updating'}"
                        data-rom-type="${rom.rom_type ? rom.rom_type : 'Updating'}"
                        data-hardware-cpu="${rom.hardware_specs ? rom.hardware_specs.cpu : 'N/A'}"
                        data-hardware-ram="${rom.hardware_specs ? rom.hardware_specs.ram : 'N/A'}"
                        data-hardware-storage="${rom.hardware_specs ? rom.hardware_specs.storage : 'N/A'}">Xem chi tiết</button>
                </div>`;
            container.append(romCard);
        });

        // Thêm sự kiện click cho các nút "Xem chi tiết"
        $('.view-details-btn').off('click').on('click', function(event) {
            event.preventDefault();

            var romDetails = $(this).data('details');
            var deviceImage = $(this).data('image');
            var name = $(this).data('name');
            var deviceName = $(this).data('device-name');
            var androidVersion = $(this).data('android-version');
            var releaseDate = $(this).data('release-date');

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

            // Buttons cho loại ROM
            if (romType === 'ROM Gốc') {
                $('#rom-goc').prop('checked', true);
            } else if (romType === 'ROM Cook') {
                $('#rom-cook').prop('checked', true);
            } else if (romType === 'ROM Tùy Chỉnh') {
                $('#rom-custom').prop('checked', true);
            } else {
                $('input[name="rom-type"]').prop('checked', false);
            }

            // Gọi API để lấy số lượt tải và hiển thị
            fetch(`https://hung.ittech.vn/api/get-download-count?romId=${deviceName}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        $('#download-count').text(data.downloadCount);  // Hiển thị số lượt tải
                    } else {
                        $('#download-count').text('0');
                    }
                })
                .catch(error => {
                    console.error('Lỗi khi lấy số lượt tải:', error);
                    $('#download-count').text('Lỗi khi lấy số lượt tải');
                });

            // Hiển thị popup và thêm chức năng tải ROM với token
            $('#rom-detail-popup').show();

            // Thêm nút nhập token và tải ROM
            $('#rom-download-container').html(`
                <input type="text" id="download-token" placeholder="Nhập token để tải ROM" />
                <button id="download-rom-btn" data-rom-id="${deviceName}">Tải ROM</button>
                <p id="download-message" style="color: red;"></p>
            `);

            // Sự kiện click cho nút tải ROM
            $('#download-rom-btn').off('click').on('click', function() {
                var token = $('#download-token').val();
                var romId = $(this).data('rom-id');

                if (!token) {
                    $('#download-message').text('Vui lòng nhập token.');
                    return;
                }

                // Gửi yêu cầu tới API để kiểm tra token và tải ROM
                $.ajax({
                    url: 'https://hung.ittech.vn/api/download-rom',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ token: token, romId: romId }),
                    success: function(response) {
                        if (response.success) {
                            window.location.href = response.romLink;  // Tải ROM
                        } else {
                            $('#download-message').text('Token không hợp lệ. Vui lòng thử lại.');
                        }
                    },
                    error: function() {
                        $('#download-message').text('Token không hợp lệ. Vui lòng thử lại.');
                    }
                });
            });
        });
    }

    // Khi trang web được tải, hiển thị popup với class popup-notice
    window.onload = function() {
        document.querySelector('.popup-notice').style.display = 'flex';
    };
  
    // Đóng popup khi nhấn nút Đóng
    document.getElementById('close-popup-btn').onclick = function() {
        document.querySelector('.popup-notice').style.display = 'none';
    };

    // Đóng popup khi bấm vào nút đóng (x)
    $('.close').on('click touchend', function() {
        $('#rom-detail-popup').hide();
    });

    // Đóng popup khi bấm ngoài vùng popup
    $(window).on('click touchend', function(event) {
        if ($(event.target).is('#rom-detail-popup')) {
            $('#rom-detail-popup').hide();
        }
    });
});

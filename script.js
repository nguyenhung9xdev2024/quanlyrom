$(document).ready(function() {
    fetch('rom-data.json')
        .then(response => response.json())
        .then(data => {
            let container = $('.rom-card-container');
            renderRomCards(data, container);

            // Thêm sự kiện cho nút lọc
            $('#filter-btn').on('click', function() {
                const deviceFilter = $('#device-filter').val().toLowerCase();
                const versionFilter = $('#version-filter').val();
                const romTypeFilter = $('#rom-type-filter').val();

                const filteredData = data.filter(rom => {
                    const deviceMatch = rom.device_name.toLowerCase().includes(deviceFilter);
                    const versionMatch = versionFilter === '' || rom.android_version == versionFilter;
                    const romTypeMatch = romTypeFilter === '' || rom.rom_type === romTypeFilter;
                    return deviceMatch && versionMatch && romTypeMatch;
                });

                container.empty();
                renderRomCards(filteredData, container);
            });
        });

    function renderRomCards(data, container) {
        data.forEach(rom => {
            let romCard = `
                <div class="rom-card">
                    <img src="${rom.image_url}" alt="${rom.device_name}" class="rom-image">
                    <h3>${rom.device_name}</h3>
                    <p class="android-version">Phiên bản Android: ${rom.android_version}</p>
                    <p class="rom-type">Thể loại rom: ${rom.rom_type}</p>
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
        $('.view-details-btn').on('click touchend', function(event) {
            event.preventDefault();

            var romDetails = $(this).data('details');
            var deviceImage = $(this).data('image');
            var name = $(this).data('name');
            var deviceName = $(this).data('device-name');
            var androidVersion = $(this).data('android-version');
            var releaseDate = $(this).data('release-date');
            var romType = $(this).data('rom-type');

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
            $('#hardware_cpu').text(hardwareCpu);
            $('#hardware_ram').text(hardwareRam);
            $('#hardware_storage').text(hardwareStorage);

            $('#rom-detail-popup').show();
        });
    }

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

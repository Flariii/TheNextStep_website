
    // Ініціалізація карти
    var map = L.map('map').setView([49.8397, 24.0297], 13); // Початкова позиція, наприклад, Львів

    // Додаємо OSM шар карти
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Створюємо мітки та зберігаємо їх в об'єкті
    var markers = {
        'marker1': L.marker([49.83098666231625, 23.98874194574129]).addTo(map).bindPopup('Impero Cafe'),
        'marker2': L.marker([49.8500, 24.0155]).addTo(map).bindPopup('Mountain House - 1.500$'),
        'marker3': L.marker([49.8600, 24.0400]).addTo(map).bindPopup('Beach Villa - 2.000$')
    };

    // Функція для фокусування на мітці при натисканні на посилання
    function focusOnMarker(markerId) {
        var marker = markers[markerId];
        if (marker) {
            map.setView(marker.getLatLng(), 15); // Змінює масштаб і фокусується на мітці
            marker.openPopup(); // Відкриває підказку з інформацією про мітку
        }
        document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
    }

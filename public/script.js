
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
        'marker2': L.marker([49.82740, 23.99807]).addTo(map).bindPopup('Mokka 1554'),
        'marker3': L.marker([49.84172, 24.03280]).addTo(map).bindPopup('Львівська копальня кави'),
        'marker4': L.marker([49.84173, 24.02347]).addTo(map).bindPopup('Cate Cafe'),
        'marker5': L.marker([49.84363, 24.03216]).addTo(map).bindPopup('Tante Sophie Càfe Escargot'),
        'marker6': L.marker([49.84161, 24.03012]).addTo(map).bindPopup('На бамбетлі')
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

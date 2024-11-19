async function loadPosts() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');

    if (!type) {
        console.log('No type specified in the URL');
        // alert('No type specified in the URL');
        return;
    }

    try {
        console.log("Fetching data from API...");
        const response = await fetch(`https://thenextstep-api.onrender.com/posts/${type}`);
        
        console.log(`Response status: ${response.status}`);
        if (!response.ok) {
            throw new Error(`API error: ${response.status} - ${response.statusText}`);
        }

        const places = await response.json();  // conver answer to json
        console.log("Fetched posts:", places);

        const container = document.getElementById('places-container');
        container.innerHTML = '';
        
        places.forEach(place => {
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4');

            let placePhoto = place.photo_url ? place.photo_url : './public/images/placeholder.png';
            let status = place.is_open === true ? 'Open now! ✅' : 'This place keeps us guessing.. 🤔'

            card.innerHTML = `
                <div class="card d-flex flex-column h-100">
                    <img src="${placePhoto}" class="card-img-top" alt="${place.name}">
                    <div class="card-body flex-grow-1">
                        <h4 class="card-title fw-bold">${place.name}</h4>
                        <p class="mt-4 card-text">Address: ${place.address}</p>
                        <p class="card-text">Status: ${status}</p>
                        <p class="card-text">Rating: ${place.rating} ⭐</p>
                    </div>
                    <a class="btn btn-success fs-5 mt-2 mb-4 px-4 py-2" 
                        onclick="showOnMap(${place.location.lat}, ${place.location.lng})" 
                        href="#map">
                        Go to map
                    </a>
                </div>
            `;
            
            container.appendChild(card);
        });
    }
    catch (error) {
        console.error('Error with loading posts in webpage', error.message);
    }
}

window.onload = loadPosts;

//#region working with map

let currentMarker;
let map;

async function showOnMap(lat, lng) {
    try {
        let placePosition = { lat, lng };

        map.setCenter(placePosition);

        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

        if (currentMarker) {
            currentMarker.setMap(null);
        }

        currentMarker = new AdvancedMarkerElement({
            map: map,
            position: placePosition,
            title: 'Selected Place',
        });
    }
    catch (error) {
        console.error('Error updating map and marker: ', error.message);
    }
}

async function initMap() {
    try {
        const position = { lat: 49.842957, lng: 24.031111 };

        // Request needed libraries.
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

        // The map, centered at Lviv
        map = new Map(document.getElementById("map"), {
            zoom: 15,
            center: position,
            mapId: "DEMO_MAP_ID",
            gestureHandling: "greedy", // Enables gesture zooming
        });

        const marker = new AdvancedMarkerElement({
            map: map,
            position: position,
            title: "Lviv",
        });
    }
    catch (error) {
        console.error('Error initializing map: ', error.message);
    }
}

initMap();
//#endregion
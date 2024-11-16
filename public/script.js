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
        const response = await fetch(`https://thenextstepapi.onrender.com/posts/${type}`); 
        
        console.log(`Response status: ${response.status}`);
        if (!response.ok) {
            throw new Error(`API error: ${response.status} - ${response.statusText}`);
        }

        const posts = await response.json();  // conver answer to json
        console.log("Fetched posts:", posts);

        const container = document.getElementById('places-container');
        container.innerHTML = '';
        
        posts.forEach(post => {
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4');
            
            const locationText = post.location 
            ? `Location: (${post.location.lat}, ${post.location.lng})`
            : 'Location: Not available';

            card.innerHTML = `
                <div class="card d-flex flex-column h-100">
                    <img src="${post.photo_url}" class="card-img-top" alt="${post.name}">
                    <div class="card-body flex-grow-1">
                        <h4 class="card-title fw-bold">${post.name}</h4>
                        <p class="card-text">Address: ${post.address}</p>
                        <p class="card-text">Rating: ${post.rating}</p>
                    </div>
                    <a class="btn btn-success mt-2 mb-4 px-4 py-2" href="#map">Go to map</a>
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
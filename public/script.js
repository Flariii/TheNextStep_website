async function loadPosts() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');

    if (!type) {
        console.log('No type specified in the URL');
        alert('No type specified in the URL');
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/posts/${type}`); 
        const posts = await response.json();  // Перетворюємо відповідь на JSON

        const container = document.getElementById('places-container');
        container.innerHTML = '';
        
        posts.forEach(post => {
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4');
            
            const locationText = post.location 
            ? `Location: (${post.location.lat}, ${post.location.lng})`
            : 'Location: Not available';

            card.innerHTML = `
                <div class="card">
                    <img src="${post.photo_url}" class="card-img-top" alt="${post.name}">
                    <div class="card-body">
                        <h4 class="card-title fw-bold">${post.name}</h4>
                        <p class="card-text">Address: ${post.address}</p>
                        <p class="card-text">Rating: ${post.rating}</p>
                        <a class="btn btn-success mt-2 px-4 py-2" href="#map">Go to map</a>
                    </div>
                </div>
            `;
            
            container.appendChild(card);
        });
    }
    catch (error) {
        console.error('------> Error with loading posts in webpage', error.message);
    }
}

window.onload = loadPosts;
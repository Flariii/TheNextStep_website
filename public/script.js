async function loadPosts() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');

    // if (!type) {
    //     console.log('No type specified in the URL');
    //     alert('No type specified in the URL');
    //     return;
    // }

    try {
        const response = await fetch(`http://localhost:5000/posts/cafe`);  // ${type}
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
                    <img src="${post.picture}" class="card-img-top" alt="${post.name}">
                    <div class="card-body">
                        <h5 class="card-title">${post.name}</h5>
                        <p class="card-text">Address: ${post.address}</p>
                        <p class="card-text">Rating: ${post.rating}</p>
                        <!-- <p class="card-text">${locationText}</p> <p class="card-text">Place ID: ${post.place_id}</p> -->
                        <a class="btn btn-success mt-2" href="#map">Go to map</a>
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
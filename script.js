document.addEventListener('DOMContentLoaded', () => {
  // Index Page Elements
  const searchInput     = document.getElementById("search-input");
  const searchButton    = document.getElementById("search-button");
  const moviesContainer = document.getElementById("movies-container");
  const emptyState      = document.getElementById("empty-state");
  let allMovieDetails   = [];

  if (searchInput && searchButton && moviesContainer) {
    searchButton.addEventListener("click", async () => {
      const query = searchInput.value.trim();
      searchInput.value = '';
      try {
        const res  = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=fc6b5734`);
        const data = await res.json();
        if (data.Response === "False") {
          moviesContainer.innerHTML = `<p class="text-gray-400 text-center mt-8">No results found.</p>`;
          return;
        }

        // Fetch full details
        allMovieDetails = await Promise.all(
          data.Search.map(m =>
            fetch(`https://www.omdbapi.com/?i=${m.imdbID}&apikey=fc6b5734`).then(r => r.json())
          )
        );

        // Clear & style results container
        moviesContainer.innerHTML = '';
        moviesContainer.classList.remove("items-center","justify-center","mt-40","text-center","text-gray-400");
        moviesContainer.classList.add("overflow-y-auto","max-h-[70vh]","px-2","divide-y","w-full");

        // Render movie cards
        allMovieDetails.forEach(movie => {
          moviesContainer.insertAdjacentHTML('beforeend', `
            <div class="movie-card flex gap-4 py-4">
              <img src="${movie.Poster}" alt="${movie.Title}" class="w-[80px] h-[120px] object-cover rounded" />
              <div class="flex flex-col justify-between flex-1">
                <div>
                  <div class="flex items-center gap-2">
                    <h2 class="text-lg font-semibold text-black">${movie.Title}</h2>
                    <span class="text-yellow-500 text-sm font-medium">⭐ ${movie.imdbRating}</span>
                  </div>
                  <p class="text-sm text-gray-600 mt-1">${movie.Runtime} • ${movie.Genre}</p>
                </div>
                <p class="text-sm text-gray-700 mt-2 line-clamp-3">${movie.Plot}</p>
                <button data-id="${movie.imdbID}" class="add-btn mt-2 text-sm font-semibold flex items-center gap-1 hover:underline">
                  <img src="image/add-Icon.png" alt="Add icon" class="w-4 h-4" />
                  Add to watchlist
                </button>
              </div>
            </div>
          `);
        });

        // Attach add handlers
        moviesContainer.querySelectorAll('.add-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const id        = btn.dataset.id;
            const movie     = allMovieDetails.find(m => m.imdbID === id);
            const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
            if (watchlist.some(m => m.imdbID === id)) {
              return alert("Already in the watchlist ❌");
            }
            watchlist.push(movie);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            alert("Movie added to your watchlist ✅");
          });
        });

        if (emptyState) emptyState.remove();
      } catch (err) {
        console.error(err);
        moviesContainer.innerHTML = `<p class="text-red-500 text-center mt-8">Something went wrong. Try again later.</p>`;
      }
    });
  }

  // Watchlist Page Logic
  const emptySection       = document.getElementById('empty-watchlist');
  const watchlistContainer = document.getElementById('watchlist-container');

  if (emptySection && watchlistContainer) {
    const saved = JSON.parse(localStorage.getItem('watchlist') || '[]');
    if (saved.length === 0) return;

    // Remove empty state and render list
    emptySection.remove();
    const movieList = document.createElement('div');
    movieList.className = "overflow-y-auto max-h-[70vh] divide-y w-full px-4";
    watchlistContainer.parentElement.appendChild(movieList);

    saved.forEach(movie => {
      movieList.insertAdjacentHTML('beforeend', `
        <div class="watch-card flex gap-4 py-4">
          <img src="${movie.Poster}" alt="${movie.Title}" class="w-[80px] h-[120px] object-cover rounded" />
          <div class="flex flex-col justify-between flex-1">
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-lg font-semibold text-black">${movie.Title}</h2>
                <span class="text-yellow-500 text-sm font-medium">⭐ ${movie.imdbRating}</span>
              </div>
              <p class="text-sm text-gray-600 mt-1">${movie.Runtime} • ${movie.Genre}</p>
            </div>
            <p class="text-sm text-gray-700 mt-2 line-clamp-3">${movie.Plot}</p>
            <button data-id="${movie.imdbID}" class="remove-btn mt-2 text-sm font-semibold flex items-center gap-1 hover:underline">
              <img src="image/remove-Icon.png" class="w-4 h-4" /> Remove
            </button>
          </div>
        </div>
      `);
    });

    // Attach remove handlers
    movieList.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id  = btn.dataset.id;
        let list  = JSON.parse(localStorage.getItem('watchlist') || '[]');
        list      = list.filter(m => m.imdbID !== id);
        localStorage.setItem('watchlist', JSON.stringify(list));

        const card = btn.closest('.watch-card');
        if (card) card.remove();
        if (list.length === 0) window.location.reload();
      });
    });
  }
});

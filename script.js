// Index Page Elements
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const moviesContainer = document.getElementById("movies-container");
const emptyState = document.getElementById("empty-state");
// Watchlist Page Elements
const watchlistContainer = document.getElementById("watchlist-container");
const addMovieButton = document.getElementById("add-movie-button");
let savedWatchlist = []
localStorage.setItem("savedWatchlist",JSON.stringify(savedWatchlist))


// Handle Search Page Logic
if (searchInput && searchButton && moviesContainer) {
  searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    searchInput.value = '';
    console.log("Search query:", query);

    try {
      const res = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=fc6b5734`);
      const data = await res.json();

      if (data.Response === "False") {
        moviesContainer.innerHTML = `<p class="text-gray-400 text-center mt-8">No results found.</p>`;
        return;
      }

      const movieDetail = data.Search.map(async (movieId) => {
        const response = await fetch(`http://www.omdbapi.com/?i=${movieId.imdbID}&apikey=fc6b5734`);
        return await response.json();
      });

      const allMovieDetails = await Promise.all(movieDetail);
      localStorage.setItem('watchlist', JSON.stringify(allMovieDetails))

      moviesContainer.innerHTML = '';
      moviesContainer.classList.remove("items-center", "justify-center", "mt-40", "text-center", "text-gray-400");
      moviesContainer.classList.add("overflow-y-auto", "max-h-[70vh]", "px-2", "divide-y", "w-full");

      allMovieDetails.forEach(movie => {
        const movieHTML = `
          <div class="flex gap-4 py-4">
            <img src="${movie.Poster}" alt="${movie.Title}" class="w-[80px] h-[120px] object-cover rounded" />
            <div class="flex flex-col text-left justify-between">
              <div>
                <div class="flex items-center gap-2">
                  <h2 class="text-lg font-semibold text-black">${movie.Title}</h2>
                  <span class="text-yellow-500 text-sm font-medium">⭐ ${movie.imdbRating}</span>
                </div>
                <p class="text-sm text-gray-600 mt-1">${movie.Runtime} • ${movie.Genre}</p>
              </div>
              <p class="text-sm text-gray-700 mt-2 line-clamp-3">${movie.Plot}</p>
              <button class="mt-2 text-sm text-black font-semibold flex items-center gap-1 hover:underline">
                <img src="image/add-Icon.png" alt="Add icon" data-id="${movie.imdbID}" class="w-4 h-4 add-btn" />
                Watchlist
              </button>
            </div>
          </div>
        `;

        moviesContainer.insertAdjacentHTML('beforeend', movieHTML);
      });

      document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', () => {
        const imdbID = button.dataset.id
        savedWatchlist.push(imdbID)
        console.log(imdbID)
        console.log(savedWatchlist)
    })
    });

      if (emptyState) {
        emptyState.remove();
      }

    } catch (error) {
      console.error("Error fetching movies:", error);
      moviesContainer.innerHTML = `<p class="text-red-500 text-center mt-8">Something went wrong. Please try again later.</p>`;
    }
  });
}

 

// Handle Watchlist Page Logic
if (watchlistContainer && addMovieButton) {
    const movieList = document.createElement('div');
    movieList.className = "overflow-y-auto max-h-[70vh] divide-y w-full px-4";
    watchlistContainer.parentElement.appendChild(movieList);

    savedWatchlist.forEach(movie => {
      const movieHTML = `
        <div class="flex gap-4 py-4">
          <img src="${movie.Poster}" alt="${movie.Title}" class="w-[80px] h-[120px] object-cover rounded" />
          <div class="flex flex-col text-left justify-between">
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-lg font-semibold text-black">${movie.Title}</h2>
                <span class="text-yellow-500 text-sm font-medium">⭐ ${movie.imdbRating}</span>
              </div>
              <p class="text-sm text-gray-600 mt-1">${movie.Runtime} • ${movie.Genre}</p>
            </div>
            <p class="text-sm text-gray-700 mt-2 line-clamp-3">${movie.Plot}</p>
            <button class="mt-2 text-sm text-black font-semibold flex items-center gap-1 hover:underline">
              <img src="image/remove-Icon.png" class="w-4 h-4" />
            </button>
          </div>
        </div>
      `;
      movieList.insertAdjacentHTML('beforeend', movieHTML);
    });
  }

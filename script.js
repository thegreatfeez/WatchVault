// Index Page Elements
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const moviesContainer = document.getElementById("movies-container");
// Watchlist Page Elements
const watchlistContainer = document.getElementById("watchlist-container");
const addMovieButton = document.getElementById("add-movie-button");


// Handle Search Page Logic
if (searchInput && searchButton && moviesContainer) {
  searchButton.addEventListener("click", async() => {
    const query = searchInput.value.trim();
    const res = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=fc6b5734`)
    const data = await res.json();

    console.log("Search query:", query);
    searchInput.value = ''

    console.log(data)
    const movieDetail = data.Search.map(async (movieId) => {
        const response =  await fetch(`http://www.omdbapi.com/?i=${movieId.imdbID}&apikey=fc6b5734`)
        return await response.json();
    })
  });
}

// Handle Watchlist Page Logic
if (watchlistContainer && addMovieButton) {
  addMovieButton.addEventListener("click", () => {
    console.log("Redirecting to search page...");
    // Optional: You could do location.href = 'index.html';
  });
}

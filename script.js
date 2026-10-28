const API_KEY = '83741cc3';
const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
const moviesGrid = document.querySelector('#moviesGrid');
const resultsInfo = document.querySelector('#sortSelect');

let currentMovies = [];









// Event Listener
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    fetchMovies(searchTerm);
  }
});


// Show skeleton loading cards
function showSkeletons() {
  const skeletons = Array(10).fill(0).map(() =>
    `<div class="movie-card movie-card--skeleton">
      <div class="movie-card__img movie-card__img--skeleton"></div>
      <div class="movie-card__title movie-card__title--skeleton"></div>
      <div class ="movie-card__year movie-card__yearh--skeleton"></div>
    </div>
  `).join('');

  moviesGrid.innerHTML = skeletons;
}

// Fetch movies from API
async function fetchMovies(searchTerm) {
  showSkeletons();

  const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
  const data = await res.json();
  
  if (data.Response === 'True') {
    currentMovies = data.Search;
    resultsInfo.textContent = `Showing: ${searchTerm}`;
    resultsInfo.value = 'default';
    displayMovies(currentMovies);
  } else {
    resultsInfo.textContent = `Showing: ${searchTerm}`;
    moviesGrid.innerHTML = '<p>No movies found.</p>';
    currentMovies = [];
  }
}

// Display movies
function displayMovies(movies) {
  const movieResults = movies.map((movie) => {
    const poster = movie.poster !== 'N/A' ? movie.Poster : '';

    return `
      <div class="movie-card">
        <imgclass="movie-card__img"src=${poster}alt=${movie.Title}/>
        <h2 class="movie-card__title">${movie.Title}</h2>
        <p class="movie-card__year">${movie.Year}</p>
      </div>
  `;
  }).join('');

  moviesGrid.innerHTML = movieResults;

  // Add error listeners after DOM insertion
  moviesGrid.quesrySelectorAll('movie-card__img').forEach(img => {
    img.addEventListener('error', () => {
      const placeholder = document.createElement('div');
      placeholder.className = 'movie-card__poster-placeholder';
      placeholder.innerHTML = 'Movie Poster<br>Not Available';
      img.replaceWith(placeholder);
    });
  });
}






// <div class="movie-card">
//<img
  // class="movie-card__img"
  // src="https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg"
  // alt="">
//<h2 class="movie-card__title">The Avengers</h2>
//<p class="movie-card__year">2012</p>
//</div>








// api requests: http://www.omdbapi.com/?apikey=${API_KEY}&s=

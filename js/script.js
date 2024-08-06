// Global State

const global = {
    currentPage: window.location.pathname
}

// Display 20 most popular movies

async function displayPopularMovies() {
    const {results} = await fetchAPIData('movie/popular');

    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
                movie.poster_path
                ? `<img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    class="card-img-top"
                    alt="${movie.title}"
                />` 
                : `<img
                    src="images/no-image.jpg"
                    class="card-img-top"
                    alt="${movie.title}"
                />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;
        
        document.querySelector('#popular-movies').appendChild(div);
    })
}

// Display 20 most popular TV Shows

async function displayPopularTVShows() {
    const {results} = await fetchAPIData('tv/popular');

    results.forEach(series => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <a href="tv-details.html?id=${series.id}">
            ${
                series.poster_path
                ? `<img
                    src="https://image.tmdb.org/t/p/w500${series.poster_path}"
                    class="card-img-top"
                    alt="${series.name}"
                />`
                : `<img
                    src="images/no-image.jpg"
                    class="card-img-top"
                    alt="${series.name}"
                />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${series.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${series.first_air_date}</small>
            </p>
          </div>
        `

        document.querySelector('#popular-shows').appendChild(div);
    })
}

// Fetch data from TMDB API

async function fetchAPIData(endpoint) {
    const API_KEY = 'aa62594def961af2ab7d420254e20f57';
    const API_URL = 'https://api.themoviedb.org/3/';

    showSpinner();

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

    const data = await response.json();

    hideSpinner();

    return data;
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');   
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');   
}


// Highlight active link

function highlightActiveLink(e) {
    const links = document.querySelectorAll('.nav-link');

    links.forEach( link => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');      
        }
    })
}

// Init App

function init() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displayPopularMovies();
            break;
        case '/shows.html':
            displayPopularTVShows();
            break;
        case '/movie-details.html':
            console.log('Movie details');
            break;
        case '/tv-details.html':
            console.log('TV details');
            break;
        case '/search.html':
            console.log('Search');
            break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);


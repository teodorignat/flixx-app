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

// Display Movie Details

async function displayMovieDetails() {
     const movieId = window.location.search.split('=')[1];

     const movie = await fetchAPIData(`movie/${movieId}`);
     console.log(movie);

    // Overlay for background image
    displayBackgroundImage('movie', movie.backdrop_path);

     const div = document.createElement('div');
     div.innerHTML = ` <div class="details-top">
          <div>
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
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
                ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
                ${movie.genres.map(genre => {
                    return `<li>${genre.name}</li>`
                }).join('')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} min</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map(company => {
            return ` ${company.name}`;
          })}</div>
        </div>`;

        document.querySelector('#movie-details').appendChild(div);
}

// Display TV Show Details

async function displayTVShowDetails() {
    const seriesId = window.location.search.split('=')[1];

    const series = await fetchAPIData(`tv/${seriesId}`);
    
    displayBackgroundImage('show', series.backdrop_path)

    const div = document.createElement('div');

    div.innerHTML = `<div class="details-top">
          <div>
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
          </div>
          <div>
            <h2>${series.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${series.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${series.first_air_date}</p>
            <p>
                ${series.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
                ${series.genres.map(genre => {
                    return `<li>${genre.name}</li>`
                }).join('')}
            </ul>
            <a href="${series.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>series Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${series.number_of_episodes}</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${series.last_episode_to_air.name}
            </li>
            <li><span class="text-secondary">Status:</span> ${series.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${series.production_companies.map(company => {
            return ` ${company.name}`;
          })}</div>
        </div>`
    
    document.querySelector('#show-details').appendChild(div);
}

// Display Backgdrop on Details Page

function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage =`url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.2';
    
    if (type === 'movie') {
        document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
        document.querySelector('#show-details').appendChild(overlayDiv);
    }
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

function addCommasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
            displayMovieDetails();
            break;
        case '/tv-details.html':
            displayTVShowDetails();
            break;
        case '/search.html':
            console.log('Search');
            break;
    }

    highlightActiveLink();
    console.log(global.currentPage)
}

document.addEventListener('DOMContentLoaded', init);


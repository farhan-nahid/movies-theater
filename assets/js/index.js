const key = "3f858ae293cd40cb5f9a355975f2782c";
const apiURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${key}&page=1`;
const imgPATH = "https://image.tmdb.org/t/p/w1280";
const searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query="`;

const form = document.getElementById("form");
const search = document.getElementById("search");
const moviesContainer = document.getElementById("movie__container");

// get the movies
getMovies(apiURL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

const showMovies = (movies) => {
  moviesContainer.textContent = "";
  movies.forEach((movie) => {
    console.log(movie);
    const { title, poster_path, vote_average, overview } = movie;
    const img = `'${imgPATH}${poster_path}'`;
    console.log(img);
    const movieDiv = document.createElement("div");
    movieDiv.setAttribute("class", "movie");
    movieDiv.innerHTML = `
    
          <img
            src="${imgPATH}${poster_path}"
            alt="${title}"
          />
          <div class="movie__info">
            <h3>${title}</h3>
            <span class="${getClassByVote(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
            <h3>overview</h3>
            <p>${overview.slice(0, 200)}</p>
          </div>
    
    `;
    moviesContainer.appendChild(movieDiv);
  });
};

const getClassByVote = (vote) => {
  if (vote >= 9) {
    return "green";
  } else if (vote >= 7) {
    return "orange";
  } else {
    return "red";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchText = search.value;
  if (searchText && searchText !== "") {
    getMovies(searchAPI + searchText);

    search.value = "";
  } else {
    alert("Please Enter a valid Input");
  }
});

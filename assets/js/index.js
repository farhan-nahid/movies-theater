// all APIs

const baseURL = "https://api.themoviedb.org/3/";
const key = "3f858ae293cd40cb5f9a355975f2782c";
const apiURL = `${baseURL}discover/movie?sort_by=popularity.desc&api_key=${key}&page=1`;
const searchURL = `${baseURL}search/movie?api_key=${key}&query="`;
const filterURL = `${baseURL}genre/movie/list?api_key=${key}`;
const imgPATH = "https://image.tmdb.org/t/p/w1280";

// html elements

const form = document.getElementById("form");
const search = document.getElementById("search");
const moviesContainer = document.getElementById("movie__container");
const category = document.getElementById("category");

const fetchGenres = async () => {
  category.textContent = "";
  const res = await fetch(filterURL);
  const data = await res.json();
  showTheGenres(data.genres);
};

const getMovies = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
};

// show the genres & movies

fetchGenres();
getMovies(apiURL);

// filer movies

const showTheGenres = (movies) => {
  movies.forEach((movie) => {
    const { id, name } = movie;
    const categoryItem = document.createElement("div");
    categoryItem.setAttribute("class", "category__item");
    categoryItem.innerText = name;
    categoryItem.addEventListener("click", () => {
      const url = apiURL + "&with_genres=" + id + ",";
      console.log(url);
    });
    category.appendChild(categoryItem);
  });
};

// show movies function

const showMovies = (movies) => {
  moviesContainer.textContent = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieDiv = document.createElement("div");
    movieDiv.setAttribute("class", "movie");
    movieDiv.innerHTML = `
          <img
            src="${imgPATH + poster_path}"
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

// add class

const getClassByVote = (vote) => {
  if (vote > 8.5) {
    return "green";
  } else if (vote >= 6) {
    return "orange";
  } else {
    return "red";
  }
};

// search function

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchText = search.value;
  if (searchText && searchText !== "") {
    getMovies(searchURL + searchText);

    search.value = "";
  } else {
    alert("Please Enter a valid Input");
  }
});

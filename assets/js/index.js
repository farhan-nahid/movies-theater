const key = "3f858ae293cd40cb5f9a355975f2782c";

const apiURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${key}&page=1`;
const imgPATH = "https://image.tmdb.org/t/p/w1280";
const searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query="`;

const form = document.getElementById("form");
const search = document.getElementById("search");

// get the movies
getMovies(apiURL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  console.log(data.results);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchText = search.value;
  if (searchText && searchText !== "") {
    getMovies(searchAPI + searchText);

    search.value = "";
  } else {
    window.location.reload();
  }
});

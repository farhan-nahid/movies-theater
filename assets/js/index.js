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
const preview = document.getElementById("preview");
const current = document.getElementById("current");
const next = document.getElementById("next");

/* 
const fetchGenres = async () => {
  category.textContent = "";
  const res = await fetch(filterURL);
  const data = await res.json();
  if (data.genres.length != 0) {
    return showTheGenres(data.genres);
  } else {
    return alert("No Result");
  }
};
 */
const getMovies = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (data.results.length != 0) {
    return showMovies(data.results);
  } else {
    return alert("No Result");
  }
};

// show the genres & movies

// fetchGenres();
getMovies(apiURL);

// filer movies
/* 

const selectID = [];
const showTheGenres = (movies) => {
  movies.forEach((movie) => {
    const { id, name } = movie;
    const categoryItem = document.createElement("div");
    categoryItem.setAttribute("class", "category__item");
    categoryItem.setAttribute("id", `${id}`);
    categoryItem.innerText = name;
    categoryItem.addEventListener("click", () => {
      if (selectID.length === 0) {
        selectID.push(id);
      } else {
        if (selectID.includes(id)) {
          selectID.forEach((ID, index) => {
            if (ID === id) {
              selectID.splice(index, 1);
            }
          });
        } else {
          selectID.push(id);
        }
      }
      getMovies(apiURL + "&with_genres=" + encodeURI(selectID.join(",")));
    });
    category.appendChild(categoryItem);
  });
};


const highlightSelection = () => {
  const item = document.getElementsByClassName('category__item')
  item.forEach(element => {
    element.classList.remove('selected')
  })
  if (selectID.length != 0) {
    selectID.forEach((id) => {
      const selectedElement = document.getElementById(id);
      console.log(selectedElement);
      selectedElement.classList.add("selected");
    });
  }
};


*/

// show movies function

const showMovies = (movies) => {
  moviesContainer.textContent = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const altText =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, quas nobis reiciendis debitis eius in ab voluptatibus recusandae corporis porro exercitationem quia, sit est iure corrupti suscipit id?";

    const movieDiv = document.createElement("div");
    movieDiv.setAttribute("class", "movie");
    movieDiv.innerHTML = `
          <img src="${
            poster_path
              ? imgPATH + poster_path
              : "http://via.placeholder.com/1080x1580"
          }" alt="${title}" />
          <div class="movie__info">
            <h3>${title}</h3>
            <span class="${getClassByVote(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
            <h3>overview</h3>
            <p>${overview ? overview.slice(0, 200) : altText}</p>
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

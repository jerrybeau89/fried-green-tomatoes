//This is used to declare the users search input and pass the value as a query in the API.
let movieSearch = $('#search-input').val();
//This creates an event listener for when the users clicks the search button.
$('#search-btn').click(function(event){
    event.preventDefault();
    getOMDBAPI();
    window.location.href = "search-index.html";
  });

//This is a random number generator that is used to determine the page query for the API below. 
function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getOMDBAPI() {
    let OMDBUrl = "http://www.omdbapi.com/?t=" + $('#search-input').val() +  "&apikey=7badcfc8";

    fetch (OMDBUrl)
        .then (function (response){
            if (response.ok) { 
                return response.json();
            }else {
                return Promise.reject("error: "+ response.status)
            }      
        })
        .then (function (data){
            
            let movieTitle = data.Title;
            let topRatingOne = parseFloat(data.Ratings[0].Value);
            let topRatingTwo = parseFloat(data.Ratings[1].Value);
            let topRatingThree = parseFloat(data.Ratings[2].Value);
            let topRatingAvg = ((topRatingOne *10) + topRatingTwo + topRatingThree) / 3;
            let moviePlot = data.Plot;
            let movieActors = data.Actors;
            let moviePoster = data.Poster;
            let movieYear = data.Year;
            let movieRated = data.Rated;
            let movieDirector = data.Director;
            let movieGenre = data.Genre;
            let dataClear = ['#movie-title','#year', '#rated','#genre','#director','#pop','#actors','#overview','#poster'];

            for (let i = 0; i < dataClear.length; i++) {
      
            $(dataClear[i]).html('');
            }

            $('#poster').attr({'src': moviePoster});
            $('#movie-title').append(movieTitle);
            $('#year').append(movieYear);
            $('#rated').append(movieRated);
            $('#genre').append(movieGenre);
            $('#director').append(movieDirector);
            $('#pop').append(topRatingAvg.toFixed(1) + '%');
            $('#actors').append(movieActors);
            $('#overview').append(moviePlot);
        })
}

function getMoviePosterOMDB() {

    for (let f = 0; f < 4; f++) {

    let movieTitle = document.getElementById('movie-title' + f).innerText;

    let OMDBUrl = "http://www.omdbapi.com/?t=" + movieTitle +  "&apikey=7badcfc8";
    
    fetch (OMDBUrl)
        .then (function (response){
            if (response.ok) { 
                return response.json();
            }else {
                return Promise.reject("error: "+ response.status)
            }      
        })
        .then (function (data){
            let moviePosterSRC = data.Poster;
            let dataClear = ['#movie-poster' + f];    
        
            for (let i = 0; i < dataClear.length; i++) {
                $(dataClear[i]).html('');
            }
            if (moviePosterSRC === undefined){
            $('#movie-poster'+ f).attr({'src': 'assets/images/FGTH.png', 'height': '120px','width': '90px'});
            } else {
            $('#movie-poster'+ f).attr({'src': moviePosterSRC});
            }
        })
    }
}
//This API is for generating the Movies by Rating and Movies by Popularity sections. 
function getTMDBMovieLists() {
    //This for loop allows the function to call two separate APIs.
  for (let a = 0; a < 2; a++) {  
    let TMDBUrl;
    if (a < 1){    
        TMDBUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key=ddb8f203c5d7bd9f839a468fe47853cb&page=" + getRandomNumber(500);
    } else {
        TMDBUrl = "https://api.themoviedb.org/3/movie/popular?api_key=ddb8f203c5d7bd9f839a468fe47853cb&page=" + getRandomNumber(5);
    }
    fetch (TMDBUrl)
        .then (function (response){
            if (response.ok) { 
                return response.json();
            }else {
                return Promise.reject("error: "+ response.status)
            }      
        })
        .then (function (data){
           
            for (let i = 0; i < 10; i++) {
            let movieTitle = data.results[i].title;
            let TopRated = (parseFloat(data.results[i].vote_average) *10);
            let movieTemplate = document.getElementById('movie-lists').content;
            let movieHTML = document.importNode(movieTemplate, true);
            
            movieHTML.querySelector('.movieTitleLink').textContent = movieTitle;
            movieHTML.querySelector('.movieRating').textContent = TopRated + "%";

            //Separates the data for the two lists
            if(a<1){
            $('#movieHolder').append(movieHTML);
            }else {
            $('#movieHolder1').append(movieHTML);
            }
        }
    })    
    }
}

//This API is for generating the Featured Movies by Rating. 
function getTMDBFeaturedMovie() {  
  let TMDBFeaturedUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key=ddb8f203c5d7bd9f839a468fe47853cb&page=" + getRandomNumber(4);
  fetch (TMDBFeaturedUrl)
      .then (function (response){
          if (response.ok) { 
              return response.json();
          }else {
              return Promise.reject("error: "+ response.status)
          }      
      })
      .then (function (data){

          for (let f = 0; f < 4; f++) {         
          let featuredMovieTitle = data.results[f].title;
          let featuredTopRated = (parseFloat(data.results[f].vote_average) *10);
          let featuredMovieGenre = data.results[f].genre_ids;
          let movieOverview = data.results[f].overview;

          $('#pop' + f).append(featuredTopRated + "%");
          $('#overview' + f).append(movieOverview);
          $('#genres' + f).append(featuredMovieGenre);
          $('#movie-title' + f).append(featuredMovieTitle);
          }
      })    
}

// async function fetchMovie(id) {
//     const response = await fetch(`https://api.themoviedb.org/3/movie/id?api_key=ddb8f203c5d7bd9f839a468fe47853cb`);
//     const movie = await response.json();
//     return movie;
// }

// let movieId = document.getElementById('genres0').innerText
// for (let f = 0; f < 4; f++) {
//     console.log(movieId);
// fetchMovie(movieId)
    
//     .then(movie => {
//         movie.genres.forEach(genre => {
//             console.log("genre id: " + genre.id + ", genre name: " + genre.name); // output genre and id
//         })
//     });
// }
getTMDBMovieLists();
getTMDBFeaturedMovie();
setTimeout(getMoviePosterOMDB, 700);

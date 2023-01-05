//This is used to declare the users search input and pass the value as a query in the API.
let movieSearch = $('#search-input').val();

//This creates an event listener for when the users clicks the search button.
$('#search-btn').click(function(event){
    event.preventDefault();
    let searchInput = $('#search-input').val();

    if(!searchInput){
        console.error('You need a movie title!');
        return;
    }
    let searchString = './search-index.html?q=' + searchInput;

    location.assign(searchString);
  });

  function onclick_event() {
    let searchString = './search-index.html?q=';
    let movieTitle = document.querySelector('.movieTitleLink').textContent;


    $('.movieTitleLink').attr("href", searchString + movieTitle);
    return;
  }

//This is a random number generator that is used to determine the page query for the API below. 
function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getOMDBGenre() {

    for (let f = 0; f < 4; f++) {
        let movieTitle = document.getElementById('movie-title' + f).innerText;

    let OMDBUrl = "https://www.omdbapi.com/?t=" + movieTitle +  "&apikey=7badcfc8";

    fetch (OMDBUrl)
        .then (function (response){
            if (response.ok) { 
                return response.json();
            }else {
                return Promise.reject("error: "+ response.status)
            }      
        })
        .then (function (data){
            let movieGenre = data.Genre;
            let dataClear = ['#genre'+ f];    
        
            for (let i = 0; i < dataClear.length; i++) {
                $(dataClear[i]).html('');
            }
            if (movieGenre === undefined){
            $('#genres'+ f).append("Error, no Genre to Display!");
            } else {
            $('#genres'+ f).append(movieGenre);
            }
            
        })
    }
}

function getMoviePosterOMDB() {

    for (let f = 0; f < 4; f++) {

    let movieTitle = document.getElementById('movie-title' + f).innerText;

    let OMDBUrl = "https://www.omdbapi.com/?t=" + movieTitle +  "&apikey=7badcfc8";
    
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
          let num = getRandomNumber(16)         
          let featuredMovieTitle = data.results[f + num].title;
          let featuredTopRated = (parseFloat(data.results[f + num].vote_average) *10);
          let movieOverview = data.results[f + num].overview;

          $('#pop' + f).append(featuredTopRated + "%");
          $('#overview' + f).append(movieOverview);
          $('#movie-title' + f).append(featuredMovieTitle);
          }
      })    
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });

getTMDBMovieLists();
getTMDBFeaturedMovie();
setTimeout(getOMDBGenre,400);
setTimeout(getMoviePosterOMDB, 400);
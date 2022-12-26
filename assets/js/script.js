//This is used to declare the users search input and pass the value as a query in the API.
let movieSearch = $('#search-input').val();
//This creates an event listener for when the users clicks the search button.
$('#search-btn').click(function(event){
    event.preventDefault();
    getOMDBAPI();
    console.log(movieSearch);
  });

//This is a random number generator that is used to determine the page query for the API below. 
function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getOMDBAPI() {
    let OMDBUrl = "http://www.omdbapi.com/?t=" + $('#search-input').val() +  "&apikey=7badcfc8";
    console.log(movieSearch);
    fetch (OMDBUrl)
        .then (function (response){
            if (response.ok) { 
                return response.json();
            }else {
                return Promise.reject("error: "+ response.status)
            }      
        })
        .then (function (data){
            console.log (data);

            let movieTitle = data.Title;
            let TopRatedOne = parseFloat(data.Ratings[0].Value);
            let TopRatedTwo = parseFloat(data.Ratings[1].Value);
            let TopRatedThree = parseFloat(data.Ratings[2].Value);
            let TopRatedAvg = ((TopRatedOne *10) + TopRatedTwo + TopRatedThree) / 3;

            
            console.log(TopRatedAvg);

            // let movieModal = $('<div>');
            let movieContent = $('<div>');
            let movieTitleText = $('<h4>');
            let moviePlot = $('<p>');
            let movieGenre = $('<p>');
            let movieActors = $('<p>');
            let movieDirector =$('<p>');
            let movieRating = $('<p>');
            let modalFooter = $('<div>');
            let modalAnchor = $('<a>');
            let anchorClose = "Close";

            movieContent.addClass('modal-content');
            modalFooter.addClass('modal-footer');
            modalAnchor.addClass('modal-close waves-effect waves-green btn-flap');
            modalAnchor.attr({'href': '#!'});
            movieTitleText.append(movieTitle);
            modalAnchor.append(anchorClose);
            movieRating.append(TopRatedAvg);
            movieContent.append(moviePlot, movieGenre, movieActors, movieDirector, movieRating, movieTitleText, movieTitle);
            $('#modal1').append(movieContent);

            $('#search-input').val('');
        })
}

//This API is for generating the Movies by Rating and Movies by Popularity sections. 
function getTMDBAPI() {
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
            console.log (data);

            for (let i = 0; i < 10; i++) {
            let movieTitle = data.results[i].title;
            let TopRated = (parseFloat(data.results[i].vote_average) *10);
            let movieGenre = data.results[i].genre_ids;
           
            console.log(typeof TopRated);

            let movieDivider = $('<div>');
            let movieLine = $('<div>');
            let movieTitleLink = $('<a>');
            let movieRatingContainer = $('<div>');
            let movieRatingLine = $('<div>');
            let movieRatingIcon =$('<img>')
            let movieRating = $('<span>');

            movieDivider.addClass('divider');
            movieLine.addClass('row');
            movieRatingLine.addClass('col s6 right-align');
            movieRatingIcon.addClass('responsive-img');
            movieTitleLink.addClass('btn-flat blue-text col s6 truncate');
            movieRatingIcon.attr({'src': 'assets/images/FGTH.png', 'height': '30px','width': '30px'});
            movieTitleLink.text(movieTitle);
            movieRating.text(TopRated + '%');

            movieRating.append(movieRatingIcon);
            movieRatingContainer.append(movieRatingLine,movieTitleLink);
            movieRatingLine.append(movieRating);
            movieLine.append(movieTitleLink, movieRatingContainer);
            if(a<1){
            $('#movieHolder1').append(movieDivider, movieLine);
            }else {
            $('#movieHolder2').append(movieDivider, movieLine);
            }
        }
    })    
    }
}

//This API is for generating the Featured Movies by Rating. 
function getTMDBFeaturedMovie() {  
  let TMDBFeaturedUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key=ddb8f203c5d7bd9f839a468fe47853cb&page=" + getRandomNumber(3);
  fetch (TMDBFeaturedUrl)
      .then (function (response){
          if (response.ok) { 
              return response.json();
          }else {
              return Promise.reject("error: "+ response.status)
          }      
      })
      .then (function (data){
          console.log (data);

          for (let f = 0; f < 4; f++) {         
        
          let featuredMovieTitle = data.results[f].title;
          let featuredTopRated = (parseFloat(data.results[f].vote_average) *10);
          let featuredMovieGenre = data.results[f].genre_ids;
          let movieOverview = data.results[f].overview;
         
          console.log(featuredMovieGenre);
          console.log(featuredMovieTitle);

          $('#pop' + f).append(featuredTopRated);
          $('#overview' + f).append(movieOverview);
          // $('#genres').append(featuredMovieGenre);
          $('#movie-title' + f).append(featuredMovieTitle);

          }
      })    
}

let id = null;
function myMove() {
  let elem = document.getElementById("fgt-img");   
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 6);
  function frame() {
    if (pos == 950) {
      clearInterval(id);
    } else {
      pos++;  
      elem.style.left = pos + 'px';
      elem.style.top = pos/39 + 'px'; 
    }
  }
}
let id2 = null;
function myMoveTwo() {
  let elem2 = document.getElementById("fgt-img2");   
  let pos2 = 0;
  clearInterval(id2);
  id2 = setInterval(frame, 11);
  function frame() {
    if (pos2 == 537) {
      clearInterval(id2);
    } else {
      pos2++;  
      elem2.style.right = pos2 + 'px';
      elem2.style.top = pos2/24 + 'px'; 
    }
  }
}
setTimeout(myMove, 2000);
setTimeout(myMoveTwo, 2000);
getTMDBAPI();
getTMDBFeaturedMovie();

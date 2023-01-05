//This is used to declare the users search input and pass the value as a query in the API.
var movieSearch = $('#search-input').val();
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

function getURLParams() {
    let urlParams = document.location.search;
    
    let query = urlParams.split('=').pop();
    getOMDBAPI(query)
}  


function getOMDBAPI(query) {
    let OMDBUrl = "https://www.omdbapi.com/?t=" + query +  "&apikey=7badcfc8";

    fetch (OMDBUrl)
        .then (function (response){
            if (response.ok) { 
                return response.json();
            }else {
                return Promise.reject("error: "+ response.status)
            }      
        })
        .then (function (data){
            console.log(data);
            let movieTitle = data.Title;
            console.log(movieTitle);
            if (movieTitle === undefined){
            $('#movie-title').append("Movie not currently in our database, please try another title!");
            $('#poster').attr({'src': 'assets/images/FGTH.png', 'height': '120px','width': '90px'});
            } else if (movieTitle == "Incorrect IMDB ID"){
                $('#movie-title').append("Movie ID incorrect, please try another title!");
                $('#poster').attr({'src': 'assets/images/FGTH.png', 'height': '120px','width': '90px'});
            }else{
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
            $('#year').append("<h6>"+ 'Year: ' + "</h6>" + movieYear);
            $('#rated').append("<h6>"+'Rated: ' + "</h6>" + movieRated);
            $('#genre').append("<h6>"+'Genre(s): ' + "</h6>" + movieGenre);
            $('#director').append("<h6>"+'Director: ' + "</h6>" + movieDirector);
            $('#pop').append("<h6>"+'FGT AVG Rating: ' + "</h6>" + topRatingAvg.toFixed(1) + '%');
            $('#actors').append("<h6>"+'Actors: ' + "</h6>" + movieActors);
            $('#overview').append("<h6>"+'Plot: ' + "</h6>" + moviePlot);
            
            $('#search-input').val('');
        }
        })
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });
getURLParams();
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
    let OMDBUrl = "http://www.omdbapi.com/?t=" + query +  "&apikey=7badcfc8";

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
            
            $('#search-input').val('');
            
        })
}


getURLParams();
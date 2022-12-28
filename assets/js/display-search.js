//This is used to declare the users search input and pass the value as a query in the API.
let movieSearch = $('#search-input').val();
//This creates an event listener for when the users clicks the search button.
$('#search-btn').click(function(event){
    event.preventDefault();
    getOMDBAPI();
    
  });

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
            console.log(data);
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
            $('#pop').append(topRatingAvg + '%');
            $('#actors').append(movieActors);
            $('#overview').append(moviePlot);
            
            $('#search-input').val('');
            
        })
}
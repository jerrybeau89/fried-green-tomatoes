//This is used to declare the users search input and pass the value as a query in the API.
let movieSearch = $('#search-input').val();
//This creates an event listener for when the users clicks the search button.
$('#search-btn').click(function(event){
    event.preventDefault();
    getOMDBAPI();
    console.log(movieSearch);
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
            let TopRatedOne = parseFloat(data.Ratings[0].Value);
            let TopRatedTwo = parseFloat(data.Ratings[1].Value);
            let TopRatedThree = parseFloat(data.Ratings[2].Value);
            let TopRatedAvg = ((TopRatedOne *10) + TopRatedTwo + TopRatedThree) / 3;
            let movieContent = $('<div>');
            let movieTitleText = $('<h4>');
            let moviePlot = $('<p>');
            let movieGenre = $('<p>');
            let movieActors = $('<p>');
            let movieDirector =$('<p>');
            let movieRating = $('<p>');
           

            
            movieTitleText.append(movieTitle);
            movieRating.append(TopRatedAvg);
            movieContent.append(moviePlot, movieGenre, movieActors, movieDirector, movieRating, movieTitleText, movieTitle);
            $('#modal1').append(movieContent);
            $('#search-input').val('');
        })
}
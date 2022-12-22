// function getYoutubeAPI() {
//     let youtubeUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=AIzaSyBssEFU_u6urwUNKclP0wPtcSsYCAqXBl0"
//     fetch (youtubeUrl)
//         .then (function (response){
//             if (response.ok) { 
//                 return response.json();
//             }else {
//                 return Promise.reject("error: "+ response.status)
//             }      
//         }) 
//         .then (function (data){
//             let YoutubeDataUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=AIzaSyBssEFU_u6urwUNKclP0wPtcSsYCAqXBl0"
//             console.log (data);
//         })
// }

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
            console.log (data);
            // let movieTitle = data.Title;
            // let popularityRatingOne = parseFloat(data.Ratings[0].Value);
            // let popularityRatingTwo = parseFloat(data.Ratings[1].Value);
            // let popularityRatingThree = parseFloat(data.Ratings[2].Value);

            // let popularityRatingAvg = ((popularityRatingOne *10) + popularityRatingTwo + popularityRatingThree) / 3;

            // console.log(popularityRatingAvg);

            // let movieDivider = $('<div>');
            // let movieLine = $('<div>');
            // let movieTitleLink = $('<a>');
            // let movieRatingContainer = $('<div>');
            // let movieRatingLine = $('<div>');
            // let movieRatingIcon =$('<img>')
            // let movieRating = $('<span>');

            // movieDivider.addClass('divider');
            // movieLine.addClass('section');
            // movieLine.addClass('black-text')
            // movieRatingContainer.addClass('row');
            // movieRatingLine.addClass('col');
            // movieRatingLine.addClass('s6');
            // movieRatingLine.addClass('offset-s10');
            // movieTitleLink.attr('href', 'https://')
            // movieTitleLink.text(movieTitle);
            // movieRating.text(popularityRatingAvg + '%');
            // movieRatingIcon.attr('src', "assets/images/FGTH.png");
            // movieRatingIcon.attr('height', '15px');
            // movieRatingIcon.attr('width', '15px');

            // movieRating.append(movieRatingIcon);
            // movieRatingContainer.append(movieRatingLine,movieTitleLink);
            // movieRatingLine.append(movieRating);
            // movieLine.append(movieTitleLink, movieRatingContainer);
            // $('#movieHolder').append(movieDivider);
            // $('#movieHolder').append(movieLine);

            $('#search-input').val('');

        })
}
//This is a random number generator that is used to determine the page query for the API below. 
function getRandomMoviePage(max) {
    return Math.floor(Math.random() * max);
}

let movieTitle;
let popularityRating;
let movieOverview;
let movieGenre;

//This API is for generating the Movies by Rating and Movies by Popularity sections. 
function getTMDBAPI() {
    //This for loop allows the function to call two separate APIs.
    for (let a = 0; a < 2; a++) {
        
    let TMDBUrl;
    if (a < 1){    
        TMDBUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key=ddb8f203c5d7bd9f839a468fe47853cb&page=" + getRandomMoviePage(500);
    } else {
        TMDBUrl = "https://api.themoviedb.org/3/movie/popular?api_key=ddb8f203c5d7bd9f839a468fe47853cb&page=" + getRandomMoviePage(5);
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
            movieTitle = data.results[i].title;
            popularityRating = (parseFloat(data.results[i].vote_average) *10);
            movieOverview = data.results[i].overview;
            movieGenre
           
            console.log(popularityRating);

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
            movieTitleLink.addClass('modal-trigger btn-flat blue-text col s6 truncate tooltipped');
            movieTitleLink.attr({
                'id': 'movie-num'+ i, 'data-position': 'right', 'data-tooltip': movieTitle, 'href': '#modal1'});
            movieRatingIcon.attr({'src': 'assets/images/FGTH.png', 'height': '30px','width': '30px'});
            movieTitleLink.text(movieTitle);
            movieRating.text(popularityRating + '%');

            movieRating.append(movieRatingIcon);
            movieRatingContainer.append(movieRatingLine,movieTitleLink);
            movieRatingLine.append(movieRating);
            movieLine.append(movieTitleLink, movieRatingContainer);
            if(a<1){
            $('#movieHolder1').append(movieDivider, movieLine);
            }else {
            $('#movieHolder2').append(movieDivider, movieLine);
            }
            $(document).ready(function(){
                $('.tooltipped').tooltip();
              });
        }
    })    
    }
}
document.addEventListener('DOMContentLoaded', function modalInfo() {
    let elems = document.querySelectorAll('.modal');
    let instances = M.Modal.init(elems, preventScrolling=true);
    // $('modal-title').append(movieTitle);
    // $('modal-overview').append(movieOverview);
  });
getTMDBAPI();
//getYoutubeAPI();

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
setTimeout(myMove, 10000);
setTimeout(myMoveTwo, 10000);
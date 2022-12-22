// let c = 0;
// $('#toggle').click( f => c === 0
//  ? `${$('#scale').removeClass('scale-in').addClass('scale-out')} ${c = c+=1}` 
//  : `${$('#scale').removeClass('scale-out').addClass('scale-in')} ${c = c-=1}`
// );
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
let movieSearch = $('#search-input').val();


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

function getRandomMoviePage(max) {
    return Math.floor(Math.random() * max);
}

let movieTitle;
let popularityRating;
let movieOverview;
let movieGenre;

function getTMDBAPI() {
    for (let a = 0; a < 2; a++) {
        
    let TMDBUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key=ddb8f203c5d7bd9f839a468fe47853cb&page=" + getRandomMoviePage(500);
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
            movieLine.addClass('section');
            movieLine.addClass('black-text')
            movieRatingContainer.addClass('row');
            movieRatingLine.addClass('col',);
            movieRatingLine.addClass('s6');
            movieRatingLine.addClass('offset-s10');
            movieTitleLink.addClass('modal-trigger');
            movieTitleLink.addClass('btn-flat');
            movieTitleLink.addClass('blue-text');
            movieTitleLink.attr('id', 'movie-num'+ i);
            movieTitleLink.attr('href', '#modal1');
            movieTitleLink.text(movieTitle);
            movieRating.text(popularityRating + '%');
            movieRatingIcon.attr('src', "assets/images/FGTH.png");
            movieRatingIcon.addClass('responsive-img');
            movieRatingIcon.attr('height', '30px');
            movieRatingIcon.attr('width', '30px');

            movieRating.append(movieRatingIcon);
            movieRatingContainer.append(movieRatingLine,movieTitleLink);
            movieRatingLine.append(movieRating);
            movieLine.append(movieTitleLink, movieRatingContainer);
            if(a<1){
            $('#movieHolder1').append(movieDivider);
            $('#movieHolder1').append(movieLine);
            }else {
            $('#movieHolder2').append(movieDivider);
            $('#movieHolder2').append(movieLine);
            }
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
//getOMDBAPI();
getTMDBAPI();
//getYoutubeAPI();
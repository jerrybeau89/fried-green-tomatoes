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
function getOMDBAPI() {
    let OMDBUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=7badcfc8";
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
            let popularityRatingOne = data.Ratings[0].Value;
            let popularitySourceOne = data.Ratings[0].Source;
            let popularityRatingTwo = data.Ratings[1].Value;
            let popularitySourceTwo = data.Ratings[1].Source;
            let popularityRatingThree = data.Ratings[2].Value;
            let popularitySourceThree = data.Ratings[2].Source;
            let arr =[(popularitySourceOne + ' ' + popularityRatingOne)
            ];
            console.log(arr);

            let movieContainer = $('<div>');
            let movieLine = $('<div>');
            let movieTitleLink = $('<a>');
            let movieRatingContainer = $('<div>');
            let movieRatingLine = $('<div>');
            let movieRating = $('<span>');

            movieContainer.addClass('divider');
            movieLine.addClass('section');
            movieTitleLink.text(movieTitle);
            movieRatingContainer.addClass('row');
            movieRatingLine.addClass('col');
            movieRatingLine.addClass('s6');
            movieRatingLine.addClass('offset-s10');
            movieRating.text(popularityRatingOne);

           
            movieContainer.append(movieTitle, popularityRatingOne);

            $('#movieHolder').append(movieContainer);
            // console.log(movieTitle);


        })
}

// function getTMDBAPI() {
//     let TMDBUrl = "https://api.themoviedb.org/3/movie/550?api_key=ddb8f203c5d7bd9f839a468fe47853cb";
//     fetch (TMDBUrl)
//         .then (function (response){
//             if (response.ok) { 
//                 return response.json();
//             }else {
//                 return Promise.reject("error: "+ response.status)
//             }      
//         })
//         .then (function (data){
//             let TMDBDataUrl = "https://api.themoviedb.org/3/movie/550?api_key=ddb8f203c5d7bd9f839a468fe47853cb"
//             console.log (data);
//         })
// }

getOMDBAPI();
//getTMDBAPI();
//getYoutubeAPI();
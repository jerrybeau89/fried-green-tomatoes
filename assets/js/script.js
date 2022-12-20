// let c = 0;
// $('#toggle').click( f => c === 0
//  ? `${$('#scale').removeClass('scale-in').addClass('scale-out')} ${c = c+=1}` 
//  : `${$('#scale').removeClass('scale-out').addClass('scale-in')} ${c = c-=1}`
// );
function getYoutubeAPI() {
    let youtubeUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=AIzaSyBssEFU_u6urwUNKclP0wPtcSsYCAqXBl0"
    fetch (youtubeUrl)
        .then (function (response){
            if (response.ok) { 
                return response.json();
            }else {
                return Promise.reject("error: "+ response.status)
            }      
        }) 
        .then (function (data){
            let YoutubeDataUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=AIzaSyBssEFU_u6urwUNKclP0wPtcSsYCAqXBl0"
            console.log (data);
        })
}
function getOMDBAPI() {
    let OMDBUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=7badcfc8"
    fetch (OMDBUrl)
        .then (function (response){
            if (response.ok) { 
                return response.json();
            }else {
                return Promise.reject("error: "+ response.status)
            }      
        })
        .then (function (data){
            let OMDBDataUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=7badcfc8"
            console.log (data);
        })
}

function getTMDBAPI() {
    let TMDBUrl = "https://api.themoviedb.org/3/movie/550?api_key=ddb8f203c5d7bd9f839a468fe47853cb";
    fetch (TMDBUrl)
        .then (function (response){
            if (response.ok) { 
                return response.json();
            }else {
                return Promise.reject("error: "+ response.status)
            }      
        })
        .then (function (data){
            let TMDBDataUrl = "https://api.themoviedb.org/3/movie/550?api_key=ddb8f203c5d7bd9f839a468fe47853cb"
            console.log (data);
        })
}
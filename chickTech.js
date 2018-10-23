// var xhr = new XMLHttpRequest();
// xhr.open("GET", "https://api.meetup.com/2/events?key=5c103fb263438792137465744f197b&group_urlname=girl-develop-it-orange-county&sign=true", true);
// xhr.send(null);
//
// console.log(xhr);

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.meetup.com/2/events?key=5c103fb263438792137465744f197b&group_urlname=ChickTech-Orange-County&sign=true",
    "method": "GET"
    // "headers": {
    //     "cache-control": "no-cache",
    //     "Postman-Token": "41f55fc5-ee41-4cc6-a4d5-b0d9c0211ba2",
        // "Access-Control-Allow-Origin": "http://localhost:63342"

}

$.ajax(settings).done(function (response) {
    console.log(response);
});
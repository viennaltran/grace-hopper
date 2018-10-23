// var xhr = new XMLHttpRequest();
// xhr.open("GET", "https://api.meetup.com/2/events?key=5c103fb263438792137465744f197b&group_urlname=girl-develop-it-orange-county&sign=true", true);
// xhr.send(null);
//
// console.log(xhr);

var settings = {
    "url": "https://api.meetup.com/2/events?key=5c103fb263438792137465744f197b&group_urlname=ChickTech-Orange-County&sign=true",
    "method": "GET",
    dataType: "jsonp",
    success: function (response) {
        console.log(response);
    },
    error: err=>console.log(err)
}

$.ajax(settings)
var global_result;


$(document).ready(initializeApp);

function initializeApp(){
    // $('button').click(getData);
}

var settings = {
    url: "http://api.meetup.com/2/events?key=6d367432270505e343b4d7c60634879&group_urlname=girl-develop-it-orange-county&sign=true",
    // method: "GET",
    dataType:"jsonp",
    success: function(response){
        console.log(response);
        global_result=response;
        var events=global_result.results;
        for(var i=0;i<events.length; i++){
            //lat
            var latitude = global_result.results[i].venue.lat;

            //lon
            var longitude = global_result.results[i].venue.lon;

            //name
            var eventName = global_result.results[i].name;
            
            //date toDateString
            var date = global_result.results[i].time;
            var d = new Date(date);
            var n=d.toLocaleString();

            //time   toTimeString
            var n=d.toTimeString();
            
        }
  
    },
    error: err=>console.log(err)
  }
  
  $.ajax(settings)
$(document).ready(initializeApp)

var map;

function initializeApp () {
    addClickHandlerToSubmitButton();
}

function initMap () {
    var options = {
        zoom: 10,
        center: {lat:34.0522, lng:-118.2437}, //los angeles coords
    }
    map = new google.maps.Map(document.getElementById('map'),options);

    //adding marker to the map
    var marker = new google.maps.Marker ({
        position:{lat:34.0235, lng:-118.2813},
        map:map,
    });

    //adding a custom icon
    var icon = {
        url: "https://cdn3.iconfinder.com/data/icons/ballicons-free/128/imac.png",
        scaledSize: new google.maps.Size(30, 30),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0,0)
    }

    // //the Shrine coords
    // addMarker({lat:34.0522, lng:-118.2437});
    // //hollywood bowl coords
    // addMarker({lat:34.1122, lng:-118.3391});


    //adding multiple markers to the map
    function addMarker (coordinates) {
        var marker = new google.maps.Marker ({
        position:coordinates,
        map:map,
        icon:icon
        });
    }
}

function addClickHandlerToSubmitButton(){
    $('#submit').click(search)
}

function search(){
    $.ajax({
        url: 'http://s-apis.learningfuze.com/hackathon/twitter/index.php?search_term=womenintech',
        dataType:'json',
        success: function(data){
            console.log(data);
            for(item in data.tweets.statuses) {
                $('#tweets').append( $('<li>', {
                    text: data.tweets.statuses[item].text
                }) );
            }
        }
    });
}
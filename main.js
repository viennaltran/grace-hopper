$(document).ready(initializeApp);

var map;
var storeReply = {};
storeReply.chickTech = chickTechStorage;
storeReply.girlDev= girlDevStorage;

function initializeApp () {
    addClickHandlerToSubmitButton();
    createPhotoArray();
    addClickHandlers();
}

function addClickHandlers(){
    $(".events-page").on("click",showEventsPage);
}

function showEventsPage (){
    $("figure").removeClass("hidePage");
    $(".landing-page").addClass("hidePage");
    $("#events-to-choose").removeClass("hidePage");
    $("#event-chosen").addClass("hidePage").removeClass("event_chosen");
    $("#twitter-and-google-maps").addClass("hidePage").removeClass("twitter_and_google_maps");
}

function initMap () {
    var options = {
        zoom: 15,
    }

    map = new google.maps.Map(document.getElementById('map'),options);
}


function hideEventsPageAndShowDataPage () {
    $("#events-to-choose").addClass("hidePage");
    $("#event-chosen").removeClass("hidePage").addClass("event_chosen");
    $("#twitter-and-google-maps").removeClass("hidePage").addClass("twitter_and_google_maps");
}

//add functionality of showing landing page and showing divs

function showLandingPageAndHideDataPage () {
    $("#events-to-choose").removeClass("hidePage");
    $("#event-chosen").addClass("hidePage").removeClass("event_chosen");
    $("#twitter-and-google-maps").addClass("hidePage").removeClass("twitter_and_google_maps");
}

function createPhotoArray(){
    // var linkArray = [];
    // $.ajax({
    //     url: 'https://api.flickr.com/services/rest/',
    //     method: 'get',
    //     dataType: 'json',
    //     data: {
    //         api_key: 'e00e98b08d999c1fbe15689b175ad887',
    //         method:'flickr.people.getPublicPhotos',
    //         user_id: '136629440@N06',
    //         format: 'json',
    //         nojsoncallback: 1
    //     },
    //     success: function(response){
    //         console.log('got data from flickr', response);

    //         for(var i = 66; i < 74; i++){
    //             var photoFarm = response.photos.photo[i].farm;
    //             var photoServer = response.photos.photo[i].server;
    //             var photoID = response.photos.photo[i].id;
    //             var photoSecret = response.photos.photo[i].secret;
    //             var link = 'https://farm' + photoFarm + '.staticflickr.com/' + photoServer + '/' + photoID + '_' + photoSecret + '.jpg';
    //             linkArray.push(link);
    //         }
    //         // pickRandomImages(linkArray);
            
    //     },
        
    //   });
    var b = "wit.jpg";
    var placeholderImages = [b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b,b];
    placeRandomImages(placeholderImages);
}

// function pickRandomImages(array){
//     var randomImages = [];
//     for(var i = 0; i < 8; i++){
//         var image = array[Math.floor(Math.random() * array.length)];
//         var imagePosition = array.indexOf(image);
//         array.splice(imagePosition, 1);
//         randomImages.push(image);
//     }
   
//     console.log(randomImages);
// }

function placeRandomImages(array){
    var figureArray = [];
        for(var i = 0; i < array.length; i++) {
            //create an img with the src from the array and append it to the appropriate figure in the figureArray
            //append that figureArray to #events-to-choose
            var newFigure = $('<figure>');
            var newImage = $('<img>').addClass('picture').attr({
                src: array[i],
                index: i
            });
            newFigure.append(newImage);
            figureArray.push(newFigure);
            var hoverP = $('<p>').addClass('hoverText firstp');
            var hoverP2 = $('<p>').addClass('hoverText2 secondp');
            newFigure.append(hoverP);
            newFigure.append(hoverP2);
            newFigure.addClass("hidePage");
            // $('figure').addClass("hidePage");

        }
        $('#events-to-choose').append(figureArray);
        $("figure").on("mouseenter",addHoverText);
        $(".picture").on("click",addDataOntoPage);
    $(".picture").on("click",hideEventsPageAndShowDataPage);
    $(".active").on("click",showLandingPageAndHideDataPage);

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

function addDataOntoPage () {
    for(let i = 0; i < (storeReply.chickTech.eventName.length + storeReply.girlDev.eventName.length); i++){
        var attributeIndex = i.toString();
        if($(event.currentTarget).attr("index") === attributeIndex){
            console.log("I am alive");
            if(i > storeReply.chickTech.eventName.length-1){
                $(".event-name").text(storeReply.girlDev.eventName[i]);
                
                //stuff inside the replace method is a regex call
                //it grabs everything that starts with "<" and something inside and ends with a ">"
                //and get every instance of that
                //then it replaces them all with an empty string
                // storeReply.chickTech.eventDescriptions[0].replace(/<[^<>]*>/g, '');
                
                var totalEventDescriptions = "";
                for(var index = 0; index < 1; index++){
                    totalEventDescriptions = storeReply.girlDev.eventDescriptions[i].replace(/<[^<>]*>/g, '');
                }
                $(".event-description").text(totalEventDescriptions);
                $(".date").text("Date: " + storeReply.girlDev.date[i]);
                $(".host").text("Hosted by: " + storeReply.girlDev.groupName[i]);
                var oldSrc = 'https://www.televerde.com/wp-content/uploads/2018/08/group-people-meeting-talking.1200x500.jpg';
                $('img[src="' + oldSrc + '"]').attr('src', storeReply.girlDev.groupPhoto[i]);
                if(storeReply.girlDev.venueState[i] === undefined){
                    storeReply.girlDev.venueState[i] = "CA";
                }
                $(".address").text("Address: " + storeReply.girlDev.venueAddress[i] + ", " + storeReply.girlDev.venueCity[i] + ", " + storeReply.girlDev.venueState[i]);
                var coordinates = {
                    lat: storeReply.girlDev.latitude[i],
                    lng: storeReply.girlDev.longitude[i]
                }
                $(".eventURL").attr("href", storeReply.girlDev.eventUrl[i]).css("color", "white");
        
                addOneMarkerToMap(coordinates,oldSrc);
            }
            else{
                $(".event-name").text(storeReply.chickTech.eventName[i]);
                var totalEventDescriptions = "";
                for(var index = 0; index < 1; index++){
                    totalEventDescriptions = storeReply.chickTech.eventDescriptions[i].replace(/<[^<>]*>/g, '');
                }
                $(".event-description").text(totalEventDescriptions);
                $(".date").text("Date: " + storeReply.chickTech.date[i]);
                $(".host").text("Hosted by: " + storeReply.chickTech.groupName[i]);
                var oldSrc = 'https://www.televerde.com/wp-content/uploads/2018/08/group-people-meeting-talking.1200x500.jpg';
                $('img[src="' + oldSrc + '"]').attr('src', storeReply.chickTech.groupPhoto[i]);
                if(storeReply.chickTech.venueState[i] === undefined){
                    storeReply.chickTech.venueState[i] = "CA";
                }
                $(".address").text("Address: " + storeReply.chickTech.venueAddress[i] + ", " + storeReply.chickTech.venueCity[i] + ", " + storeReply.chickTech.venueState[i]);
                var coordinates = {
                    lat: storeReply.chickTech.latitude[i],
                    lng: storeReply.chickTech.longitude[i]
                }

                $(".eventURL").attr("href", storeReply.chickTech.eventUrl[i]).css("color", "white");
        
                addOneMarkerToMap(coordinates);
            }
        } 
    }
}

function addHoverText (event) {
    for(let i = 0; i < (storeReply.chickTech.eventName.length + storeReply.girlDev.eventName.length); i++){
        var attributeIndex = i.toString();

        if($(event.currentTarget).find(".picture").attr("index") === attributeIndex){
            if(i > storeReply.chickTech.eventName.length-1){
                $(".firstp").text(storeReply.girlDev.eventName[i]);
                $(".secondp").text(storeReply.girlDev.date[i]);
            }
            else{
                $(".firstp").text(storeReply.chickTech.eventName[i]);
                $(".secondp").text(storeReply.chickTech.date[i]);
            }
        }
    }

}

//adds a marker for each specific meetup location

function addOneMarkerToMap(coordinates,oldSrc) {
    var icon = {
        url: "https://cdn3.iconfinder.com/data/icons/ballicons-free/128/imac.png",
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0,0)
    }

    var marker = new google.maps.Marker ({
        position:coordinates,
        map:map,
        icon:icon
    });

    var contentString = '<img>{oldSrc}</img><p>Address Placeholder<p>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

    //   marker.addListener('click', function() {
    //     infowindow.open(map, marker);
    //   });

    marker.addListener('mouseover', function() {
        infowindow.open(map, this);
        marker.setAnimation(google.maps.Animation.BOUNCE);
    });
    
    // assuming you also want to hide the infowindow when user mouses-out
    marker.addListener('mouseout', function() {
        infowindow.close();
        marker.setAnimation(null);
    });

    marker.addListener('click', function () {
        marker.setAnimation(null);
    });

    //resets the center of the google map to our specific coordinates
    map.panTo(coordinates);
}
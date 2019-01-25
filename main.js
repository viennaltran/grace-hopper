$(document).ready(initializeApp);

var map;
var global_result;
var meetupStorage = {};
var twitterFlag = false;
var showSpinner = true;

function initializeApp () {
    initSpinner();
    $.ajax(meetup);
    initMap();
    addClickHandlers();
    hideDataPage(); 
    chickTechGallery();
    girlDevelopItGallery();
    girlsInTechGallery();
    search();
    toggleTwitter();
}

var meetup = {
    "url": "meetup.php",
    "method": "GET",
    dataType: "json",
    data: {
        format: 'json',
        zip: '92833',
        text: 'women AND tech',
        time: ',2w',
        and_text: 'true',
        text_format: 'plain',
        radius: '35',
        sign: true,
        key: '554071754212291c41435871a39671'
    },
    success: function (result) {
        showSpinner = false;
        initSpinner();
        global_result = result;
        var events=global_result.results;
        dataStorage(events);
        getEventsList(meetupStorage);
        getFourList(meetupStorage);
    },
    error: err=>console.log("error:",err)
}

function initSpinner () {
    if(showSpinner === false){
        $('.spinner').addClass("hidePage");
        $('.contents-section').removeClass("hidePage");
        $('.contents-section').removeClass("importantHidePage");
    }else {
        $('.spinner').removeClass("hidePage");
    }
}

function dataStorage(events) {
    var groupNameArr = [];
    var eventDescriptionsArr = [];
    var eventUrlArr = [];
    var venueNameArr = [];
    var venueAddressArr = [];
    var venueCityArr = [];
    var venueStateArr = [];
    var latitudeArr = [];
    var longitudeArr = [];
    var eventNameArr = [];
    var dateArr = [];
    var photoUrl = [];

    for (var x = 0; x<events.length; x++) {
        var groupName = global_result.results[x].group.name;
        groupNameArr.push(groupName);

        var groupPhoto1 = global_result.results[x].photo_url;
        if(groupPhoto1 === undefined){
            var oldSrc = 'images/default_pic.jpg';

            groupPhoto1 = oldSrc;
            photoUrl.push(groupPhoto1);
        }
        if(groupPhoto1.indexOf("highres_") === -1){
            var groupPhoto = groupPhoto1.replace("global_", "highres_");
            photoUrl.push(groupPhoto);
        } else{
            photoUrl.push(groupPhoto1);
        }

        if(global_result.results[x].venue === undefined){
            continue;
        } else{
            venueName = global_result.results[x].venue.name;
        }
        venueNameArr.push(venueName);

        var eventDescriptions = global_result.results[x].description;
        eventDescriptionsArr.push(eventDescriptions);

        var eventUrl = global_result.results[x].event_url;
        eventUrlArr.push(eventUrl);

        var venueAddress = global_result.results[x].venue.address_1;
        venueAddressArr.push(venueAddress);

        var venueCity = global_result.results[x].venue.city;
        venueCityArr.push(venueCity);

        var venueState = global_result.results[x].venue.state;
        venueStateArr.push(venueState);

        var latitude =global_result.results[x].venue.lat;
        latitudeArr.push(latitude);

        var longitude = global_result.results[x].venue.lon;
        longitudeArr.push(longitude);

        var eventName = global_result.results[x].name;
        eventNameArr.push(eventName);

        //gets date and converts to readable format
        var date = global_result.results[x].time;
        var newDate = new Date(date);
        var dateToString = newDate.toLocaleString();
        dateArr.push(dateToString);

    }
    meetupStorage.groupName = groupNameArr;
    meetupStorage.groupPhoto = photoUrl;
    meetupStorage.eventName = eventNameArr;
    meetupStorage.eventDescriptions = eventDescriptionsArr;
    meetupStorage.eventUrl = eventUrlArr;
    meetupStorage.venueName = venueNameArr;
    meetupStorage.venueAddress = venueAddressArr;
    meetupStorage.venueCity = venueCityArr;
    meetupStorage.venueState = venueStateArr;
    meetupStorage.latitude = latitudeArr;
    meetupStorage.longitude = longitudeArr;
    meetupStorage.date = dateArr;
}


function addClickHandlers(){
    $(".events-page").on("click",showEventsPage);
    $(".gallery-page").on("click",showGallery);
    $(".showTweets").on("click",toggleTwitter);
}

function toggleTwitter() {
    if(twitterFlag === true){
        $('.twitter-list').addClass("hidePage");
        $('.twitter-header-bird').addClass("hidePage");
        $('.twitter-bird-logo').removeClass("hidePage");
        $('.showTweets').text("Show Tweets");
        twitterFlag = false;
    }
    else {
        $('.twitter-list').removeClass("hidePage");
        $('.twitter-header-bird').removeClass("hidePage");
        $('.twitter-bird-logo').addClass("hidePage");
        $('.showTweets').text("Close Tweets");
        twitterFlag = true;
    }
}

function showEventsPage (){
    $(".landing-page").addClass("hidePage");
    if($(".figure").length === 0){
        $('.spinnerForEvents').removeClass("hidePage");
        setTimeout(function(){
            $('.spinnerForEvents').addClass("hidePage")
            $(".navbar-collapse").removeClass("in");
            $(".figure").removeClass("hidePage");
            $("#events-to-choose").removeClass("hidePage");
            $('#gallery').addClass("hidePage");
            $("#event-chosen").addClass("hidePage").removeClass("event_chosen");
            $("#twitter-and-google-maps").addClass("hidePage").removeClass("twitter_and_google_maps");
            window.setTimeout(function() {
                $(window).scrollTop(0); 
            }, 0);
        }, 1000);
    }else {
        $(".navbar-collapse").removeClass("in");
        $(".figure").removeClass("hidePage");
        $("#events-to-choose").removeClass("hidePage");
        $('#gallery').addClass("hidePage");
        $("#event-chosen").addClass("hidePage").removeClass("event_chosen");
        $("#twitter-and-google-maps").addClass("hidePage").removeClass("twitter_and_google_maps");
        window.setTimeout(function() {
            $(window).scrollTop(0); 
        }, 0);
    }
}

function initMap () {
    var options = {
        zoom: 15,
    }

    map = new google.maps.Map(document.getElementById('map'),options);
}


function hideEventsPageAndShowDataPage () {
    $(".landing-page").addClass("hidePage");
    $("#events-to-choose").addClass("hidePage");
    $("#event-chosen").removeClass("hidePage").addClass("event_chosen");
    $("#twitter-and-google-maps").removeClass("hidePage").addClass("twitter_and_google_maps");
}

function showLandingPageAndHideDataPage () {
    $("#events-to-choose").removeClass("hidePage");
    $("#event-chosen").addClass("hidePage").removeClass("event_chosen");
    $("#twitter-and-google-maps").addClass("hidePage").removeClass("twitter_and_google_maps");
}

function showGallery(){
    $(".navbar-collapse").removeClass("in");
    $(".landing-page").addClass("hidePage");
    $("#events-to-choose").addClass("hidePage");
    $("#event-chosen").addClass("hidePage").removeClass("event_chosen");
    $("#twitter-and-google-maps").addClass("hidePage").removeClass("twitter_and_google_maps");
    $("#gallery").removeClass("hidePage");
    window.setTimeout(function() {
        $(window).scrollTop(0); 
    }, 0);
}

function search () {
    $.ajax({
        url: 'https://s-apis.learningfuze.com/hackathon/twitter/index.php?search_term=womenintech',
        dataType:'json',
        success: function(data){
            for(item in data.tweets.statuses) {
                $('.tweets').append( $('<li>', {
                    text: data.tweets.statuses[item].text
                }) );
            }
        }
    });
}

function hideDataPage () {
    $("#event-chosen").addClass("hidePage");
    $(".spinnerForEvents").addClass("hidePage");
    $("#twitter-and-google-maps").addClass("hidePage");
    $("#gallery").addClass("hidePage");
}

function getEventsList(meetupStorage){
    var figureArray = [];
        for(let i = 0; i <12; i++) {
            var newFigure = $('<figure>').addClass('figure').attr('index',i);
            var newImage = $('<img>').addClass('picture').attr(
                'src', meetupStorage.groupPhoto[i]
            );
            newFigure.append(newImage);
            figureArray.push(newFigure);
            if(meetupStorage.eventName[i].length > 40){
                var nameOfEvent = $('<div>').text(meetupStorage.eventName[i].substring(0,40)+"...").addClass("figure-text");
            }else {
                var nameOfEvent=$('<div>').text(meetupStorage.eventName[i]).addClass("figure-text");
            }
            var city = $ ('<p>').text(meetupStorage.venueCity[i]).addClass("figure-text");
            var date = $('<p>').text(meetupStorage.date[i]).addClass("figure-text");
            newFigure.append(nameOfEvent);
            newFigure.append(city);
            newFigure.append(date);
            newFigure.addClass("hidePage");
        }
        $('#events-to-choose').append(figureArray);
        $(".figure").on("click",addDataOntoPage);
        $(".figure").on("click",hideEventsPageAndShowDataPage);
        $(".active").on("click",showLandingPageAndHideDataPage);
}

function getFourList(meetupStorage){
    var figureArray = [];
        for(let i = 0; i <4; i++) {
            var newFigure = $('<figure>').addClass('four-sections').attr('index',i);
            var newImage = $('<img>').addClass('picture').attr(
                'src', meetupStorage.groupPhoto[i]
            );
            newFigure.append(newImage);
            figureArray.push(newFigure);
            if(meetupStorage.eventName[i].length > 30){
                var nameOfEvent = $('<div>').text(meetupStorage.eventName[i].substring(0,30)+"...").addClass("figure-text");
            }else {
                var nameOfEvent=$('<div>').text(meetupStorage.eventName[i]).addClass("figure-text");
            }
            var city = $ ('<p>').text(meetupStorage.venueCity[i]).addClass("figure-text");
            var date = $('<p>').text(meetupStorage.date[i]).addClass("figure-text");
            newFigure.append(nameOfEvent);
            newFigure.append(location);
            newFigure.append(city);
            newFigure.append(date);
        }
        $('.newest-section').append(figureArray);
        $(".four-sections").on("click",addDataOntoPage);
        $(".four-sections").on("click",hideEventsPageAndShowDataPage);
        $(".active").on("click",showLandingPageAndHideDataPage);

}

function addDataOntoPage () {
    for(let i = 0; i < meetupStorage.eventName.length; i++){
        var attributeIndex = i.toString();
        if($(event.currentTarget).attr("index") === attributeIndex){
            var address = `${meetupStorage.venueAddress[i]}, ${meetupStorage.venueCity[i]}, ${meetupStorage.venueState[i]}`;
            var eventName = meetupStorage.eventName[i];
    
            $(".date").text("Date: " + meetupStorage.date[i]);
            $(".event-name").text(meetupStorage.eventName[i]);
            var shortenedDescription = meetupStorage.eventDescriptions[i].substring(0,500) + "...";
            var seeMoreButton = $("<Button>").addClass("show-more-button btn btn-default").text("See More");
            $(".event-description").text(shortenedDescription).css("margin", "1rem 0px");
            $(".event-description").append(seeMoreButton);
            $(".show-more-button").on("click",() => {
                $(".event-description").text(meetupStorage.eventDescriptions[i]);
            });
            $(".address").text(`Address: ${address}`);
            $(".host").text("Hosted by: " + meetupStorage.groupName[i]);
            $('.event-img').attr('src', meetupStorage.groupPhoto[i]);
    
            var coordinates = {
                lat: meetupStorage.latitude[i],
                lng: meetupStorage.longitude[i]
            }
    
            $(".eventURL").attr({
                href: meetupStorage.eventUrl[i],
                target: "_blank"
            }).css("color", "white");

            $(".back_button").on("click",showEventsPage).css("color", "white");
                
            addOneMarkerToMap(coordinates, eventName, address);

            window.setTimeout(function() {
                $(window).scrollTop(0); 
            }, 0);
        }
    }
}

function chickTechGallery(){
    var chickTechArray = [];

    $.ajax({
        url: 'https://api.flickr.com/services/rest/',
        method: 'get',
        dataType: 'json',
        data: {
            api_key: 'e00e98b08d999c1fbe15689b175ad887',
            method: 'flickr.photosets.getPhotos',
            photoset_id: '72157673615663237',
            user_id: '92769341@N03',
            format: 'json',
            nojsoncallback: 1
        },
        success: function(response){
            var photo = response.photoset.photo;
            
            for(var i = 0; i < 10; i++){
                var link = '';
                var photoFarm = photo[i].farm;
                var photoServer = photo[i].server;
                var photoID = photo[i].id;
                var photoSecret = photo[i].secret;
                link = 'https://farm' + photoFarm + '.staticflickr.com/' + photoServer + '/' + photoID + '_' + photoSecret + '.jpg';
                chickTechArray.push(link);
            }

            placeImages(chickTechArray, '.gallery-chicktech');
        }
    })
}

function girlDevelopItGallery(){
    var girlDevelopItArray = [];

    $.ajax({
        url: 'https://api.flickr.com/services/rest/',
        method: 'get',
        dataType: 'json',
        data: {
            api_key: 'e00e98b08d999c1fbe15689b175ad887',
            method: 'flickr.photosets.getPhotos',
            photoset_id: '72157639104508314',
            user_id: '10512012@N08',
            format: 'json',
            nojsoncallback: 1
        },
        success: function(response){
            var photo = response.photoset.photo;
            
            for(var i = 1; i < 10; i++){

                var link = '';
                var photoFarm = photo[i].farm;
                var photoServer = photo[i].server;
                var photoID = photo[i].id;
                var photoSecret = photo[i].secret;
                link = 'https://farm' + photoFarm + '.staticflickr.com/' + photoServer + '/' + photoID + '_' + photoSecret + '.jpg';
                
                girlDevelopItArray.push(link);
            }
            placeImages(girlDevelopItArray, '.gallery-girldevelopit');
        }
    })
}

function girlsInTechGallery(){
    var girlsInTechArray = [];

    $.ajax({
        url: 'https://api.flickr.com/services/rest/',
        method: 'get',
        dataType: 'json',
        data: {
            api_key: 'e00e98b08d999c1fbe15689b175ad887',
            method: 'flickr.people.getPublicPhotos',
            user_id: '29179749@N03',
            format: 'json',
            nojsoncallback: 1
        },
        success: function(response){
            var photo = response.photos.photo;
            
            for(var i = 0; i < 10; i++){
                var link = '';
                var photoFarm = photo[i].farm;
                var photoServer = photo[i].server;
                var photoID = photo[i].id;
                var photoSecret = photo[i].secret;
                link = 'https://farm' + photoFarm + '.staticflickr.com/' + photoServer + '/' + photoID + '_' + photoSecret + '.jpg';
                
                girlsInTechArray.push(link);
            }
            placeImages(girlsInTechArray, '.gallery-girlsintech');
        }
    })
}

function placeImages(array, section){
    var figureArray = [];
    
    for(var i = 0; i < array.length; i++) {
        var imgFigure = $('<figure>').addClass('gallery-figure');
        var image = $('<img>').addClass('gallery-image').click(displayImage).attr({
            linkData: array[i],
            src: array[i],
            index: i
        });
        imgFigure.append(image);
        figureArray.push(imgFigure);
    }
    
    $(section).append(figureArray);
}

function displayImage(target){
    var link = target.currentTarget.attributes.linkData.nodeValue;
    $('.modal-image img').attr('src', link);
    $('#gallery-modal').modal();
}

function addOneMarkerToMap(coordinates, eventName, address) {

    var icon = {
        url: "https://cdn3.iconfinder.com/data/icons/ballicons-free/128/imac.png",
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0,0)
    }

    if (marker && marker.setMap) {
        marker.setMap(null);
    }

    var marker = new google.maps.Marker ({
        position:coordinates,
        map:map,
        icon:icon
    });

    var contentString = `<p><strong>${eventName}<strong><p><p>${address}</p>`;

    var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

    marker.addListener('mouseover', function() {
        infowindow.open(map, this);
        marker.setAnimation(google.maps.Animation.BOUNCE);
    });
    
    marker.addListener('mouseout', function() {
        infowindow.close();
        marker.setAnimation(null);
    });

    map.panTo(coordinates);
}

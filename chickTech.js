var globalReply;
var storeReply = {};
// var groupNameArr = [];
// var eventDescriptionsArr = [];
// var eventUrlArr = [];
// var venueNameArr = [];
// var venueAddressArr = [];
// var venueCityArr = [];
// var venueStateArr = [];

$(document).ready(initializeApp);

function initializeApp() {
    addClickHandler();
    hideDataPage(); 
    // addImageIndex();
    // $('#joinNow').on('click', eventUrl);
}

function addClickHandler () {
    $(".picture").on("click",addDataOntoPage);
    $(".picture").on("click",hideLandingPageAndShowDataPage);

}

function hideDataPage () {
    $("#event-chosen").addClass("hidePage");
    $("#twitter-and-google-maps").addClass("hidePage");
}

var chickTech = {
    "url": "https://api.meetup.com/2/events?key=5c103fb263438792137465744f197b&group_urlname=ChickTech-Orange-County&sign=true",
    "method": "GET",
    dataType: "jsonp",
    success: function (reply) {
        console.log(reply);
        globalReply = reply;
        var events=globalReply.results;
        dataStorage(events);
    },
    error: err=>console.log(err)
}

$.ajax(chickTech)

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

    for (var x = 0; x<events.length; x++) {
        var groupName = globalReply.results[x].group.name;
        groupNameArr.push(groupName);

        var eventDescriptions = globalReply.results[x].description;
        eventDescriptionsArr.push(eventDescriptions);

        var eventUrl = globalReply.results[x].event_url;
        eventUrlArr.push(eventUrl);

        var venueName = globalReply.results[x].venue.name;
        venueNameArr.push(venueName);

        var venueAddress = globalReply.results[x].venue.address_1;
        venueAddressArr.push(venueAddress);

        var venueCity = globalReply.results[x].venue.city;
        venueCityArr.push(venueCity);

        var venueState = globalReply.results[x].venue.state;
        venueStateArr.push(venueState);

        var latitude =globalReply.results[x].venue.lat;
        latitudeArr.push(latitude);

        var longitude = globalReply.results[x].venue.lon;
        longitudeArr.push(longitude);

        var eventName = globalReply.results[x].name;
        eventNameArr.push(eventName);

        //gets date and converts to readable format
        var date = globalReply.results[x].time;
        var newDate = new Date(date);
        var dateToString = newDate.toLocaleString();
        dateArr.push(dateToString);


    }
    storeReply.groupName = groupNameArr;
    storeReply.eventName = eventNameArr;
    storeReply.eventDescriptions = eventDescriptionsArr;
    storeReply.eventUrl = eventUrlArr;
    storeReply.venueName = venueNameArr;
    storeReply.venueAddress = venueAddressArr;
    storeReply.venueCity = venueCityArr;
    storeReply.venueState = venueStateArr;
    storeReply.latitude = latitudeArr;
    storeReply.longitude = longitudeArr;
    storeReply.date = dateArr;

console.log(storeReply);
}

// function addImageIndex () {
//     var picture = $('.picture');
//     for (var i = 0; i < arr.length; i++){
//         picture.attr(i);
//     }
// }

function addDataOntoPage () {
    if($(event.currentTarget).attr("index") === "0"){
        console.log("I am alive");
        $(".address").text("Address: " + venueAddressArr[0] + ", " + venueCityArr[0] + ", " + venueStateArr[0]);
    }
}

//add functionality of hiding and showing divs

function hideLandingPageAndShowDataPage () {
    // $("header").addClass("hidePage");
    $("#events-to-choose").addClass("hidePage");
    $("#event-chosen").removeClass("hidePage");
    $("#twitter-and-google-maps").removeClass("hidePage");
}



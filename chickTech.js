var globalReply;
var storeReply = {};

$(document).ready(initializeApp);

function initializeApp() {
    $('#joinNow').on('click', eventUrl);
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
        }
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
        venueStateArr.push(venueCity);

    }
}


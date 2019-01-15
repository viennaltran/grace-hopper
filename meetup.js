var meetUp = {
    "url": "https://api.meetup.com/2/open_events.xml?zip=92833&and_text=True&offset=0&format=xml&limited_events=False&text_format=plain&text=women+AND+tech&page=200&time=%2C2w&radius=25.0&key=6d367432270505e343b4d7c60634879&desc=False&status=upcoming",
    "method":"GET",
    dataType:"jsonp",
    success: function (reply){
        console.log(reply);
        globalReply=reply;
        var events=globalReply.results;
        dataStorage(events);
    },
    error: err=> console.log(err)
}

$.ajax(meetUp)

// function dataStorage(events){
//     var groupNameArr = [];
//     var eventDescriptionsArr = [];
//     var eventUrlArr = [];
//     var venueNameArr = [];
//     var venueAddressArr = [];
//     var venueCityArr = [];
//     var venueStateArr = [];
//     var latitudeArr = [];
//     var longitudeArr = [];
//     var eventNameArr = [];
//     var dateArr = [];
//     var photoUrl = [];



// }

var NodeHelper = require("node_helper");
var request = require("request");
var player = null;
var localid ="" ;
module.exports = NodeHelper.create({

	start:function () {
	console.log("JHeart-module helper startted ...");
    },


	// Override socketNotificationReceived method.

	
	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {


        console.log("GET_YoutubeData");
        if(notification === "GET_YOUTUBEDATA"){
        var apiBase = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=양다일&key="+youtubekey+"&maxResults=30&type=video";
        var url = encodeURI(apiBase);
        this.getYouTubeData(url);


        }



	},

    getYouTubeData: function (url) {
	    var self = this;

        this.sendSocketNotification("getYouTubeData", "getYouTubeData1");


        request(url, function (error, response, body) {
            self.sendSocketNotification("getYouTubeDatarequest1", "getYouTubeDatarequest1");
            //Lets convert the body into JSON
            var result = JSON.parse(body);
            self.sendSocketNotification("getYouTubeDatarequest1_1", "getYouTubeDatarequest1_1");
            if (!error && response.statusCode == 200) {
                if (result.status == "error") {
                    self.sendSocketNotification("error", "error");
                    self.sendSocketNotification("YouTube_DATA", { data: null, url: url });
                } else {
                    self.sendSocketNotification("getYouTubeDatarequest1_2", "getYouTubeDatarequest1_2");

                    self.sendSocketNotification("YouTube_DATA",{data:result, url: url});

                }
            } else {
                self.sendSocketNotification("error1", "error1");
                self.sendSocketNotification("YouTube_DATA", { data: null, url: url });
            }
        });


    },






});

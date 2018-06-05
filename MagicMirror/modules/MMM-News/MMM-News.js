var data= null;
var array = null;
var number = 0;
//self.data=null;
Module.register("MMM-News", {

    defaults: {
        query: "/news/",
    },

    requiresVersion: "2.1.0", // Required version of MagicMirror

    start: function() {
        var self = this;
        Log.log("Starting module: " + this.name);

        self.sendSocketNotification("SEND_NEWS", self.config.query);
        setInterval(function() {
            self.sendSocketNotification("SEND_NEWS", self.config.query);
        }, (5 * 60 * 1000));



    },

    getDom: function() {
        var self = this;
        //var strNews = new String(self.news).split(',');
        /*if(strNews[0] == "undefined")
            mms_text.innerHTML = "NAVERNEWS";
        else
            mms_text.innerHTML = new String(strNews[2]).substring(0, 20);*/


        var wrapper = document.createElement("div");
        wrapper.id = "player";
        /*var i;
        for(i=0; i< strNews.length; i++) {
            wrapper.innerHTML = new String(strNews[i]).substring(0, 10);
        }*/
        if(data == null){
            wrapper.innerHTML = "NAVERNEWS"
        }
        else{
            wrapper.innerHTML = data;
        }

        //wrapper.innerHTML = "NAVERNEWS"
        return wrapper;


    },



    // socketNotificationReceived from helper
    socketNotificationReceived: function (notification, payload) {
        var self = this;
       if (notification == "GET_NEWS"){
           console.log('GET_NEWS');
           //data = payload;
           //this.updateDom();
            array = payload.split(',');
           setInterval(function() {
               number++;
               if(number == 21){
                   number=0;
               }
               data = array[number];
               self.updateDom();
           }, (5 * 1000));




       }
       else if(notification == "getYouTubeData"){
           console.log("getYouTubeData");
       }











    },



    notificationReceived: function (notification, payload, sender) {



    },



});

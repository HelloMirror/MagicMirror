var data = null;
var array = null;
var newnumber = 0;
Module.register("MMM-News", {

    defaults: {
        path: "/news/",
    },

    requiresVersion: "2.1.0", // Required version of MagicMirror

    start: function() {
        var self = this;
        Log.log("Starting module: " + this.name);
	self.sendSocketNotification("INIT_NEWS", "init");
	
    },


    getDom: function() {
        var self = this;


        var wrapper = document.createElement("div");

        var div = document.createElement("div");
        div.style.color = "green";
        div.innerHTML = "실시간 검색어";
        var searchdata = document.createElement("div");

        if(data == null){
            searchdata.innerHTML = "NAVERNEWS"
        }
        else{
            searchdata.innerHTML =data;
        }

        wrapper.appendChild(div);
        wrapper.appendChild(searchdata);
        return wrapper;


    },



    // socketNotificationReceived from helper
    socketNotificationReceived: function (notification, payload) {
        var self = this;

	if(notification == "READ_PYTHON") {
		console.log("read python");
		self.sendSocketNotification("SEND_NEWS", self.config.path);
	}
	    else if (notification == "SUCCESS_GET_NEWS"){
            console.log('SUCCESS GET_NEWS');
            array = payload.split(',');
            setInterval(function() {
		        ++newnumber;
                if(newnumber == 21) {
                    newnumber = 0;
                }
                data = array[newnumber];
                self.updateDom(3000);

            }, (6 * 1000));


        }
	    else if (notification == "FAIL_GET_NEWS") {
		    console.log('fail get news');
	    }


    },



    notificationReceived: function (notification, payload, sender) {

    },



});

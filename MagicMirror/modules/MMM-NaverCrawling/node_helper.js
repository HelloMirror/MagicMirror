
const NodeHelper = require('node_helper');
var fs = require("fs");
var path = require("path");
var exec = require("child-process-promise").exec;
module.exports = NodeHelper.create({

    start:function () {
        var self = this;
        console.log("JHeart-module helper startted ...");
    },

    crawling: function () {
	var self = this;
            exec("python3 ~/MagicMirror/modules/MMM-News/crawling.py");
	self.sendSocketNotification("READ_PYTHON", "read");
    },



    // Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        var self = this;


	    if(notification == "INIT_NEWS") {
		self.crawling();
	    }
	    else if(notification == 'SEND_NEWS') {
            
            fs.readFile(path.resolve(global.root_path + payload + "news.js"), 'utf8', function(err, data) {
                if(err) {
		    self.sendSocketNotification("FAIL_GET_NEWS", err);
		}
		    else {
		    self.sendSocketNotification("SUCCESS_GET_NEWS", data);
		    }
            });
            
            
        };
    }

});

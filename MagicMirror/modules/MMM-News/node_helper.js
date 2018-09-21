
const NodeHelper = require('node_helper');
var fs = require("fs");
var path = require("path");
var exec = require("child-process-promise").exec;
module.exports = NodeHelper.create({

    start:function () {
        var self = this;
        console.log("JHeart-module helper startted ...");
        this.crawling();
    },

    crawling: function () {

        fs.writeFile(path.resolve(global.root_path + "/installers/news.sh"), "python3 ~/MagicMirror/modules/MMM-News/crawling.py", function() {
            exec("pm2 start ~/MagicMirror/installers/news.sh");
       });

       // exec("python ~/MagicMirror/modules/MMM-News/crawling.py");
      /*  setTimeout(function() {

        }, 2000);
*/



    },



    // Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        var self = this;



        if(notification == 'SEND_NEWS') {
            
            fs.readFile(path.resolve(global.root_path + payload + "news.js"), 'utf8', function(err, data) {
                self.sendSocketNotification("GET_NEWS", data);
            });
            
            
        };
    }

});

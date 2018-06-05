/*
*
*/
'use strict';

var NodeHelper = require("node_helper");
var path = require("path");
var fs = require('fs');
var exec = require("child-process-promise").exec;

module.exports = NodeHelper.create({


  start: function() {
	var self = this;
	console.log("Starting node helper for: " + this.name);
  },

  socketNotificationReceived: function(notification, payload) {
	var self = this;
	
	if (notification == "PLAY_MUSIC") {
		var music = fs.readdirSync(path.resolve(global.root_path + "/Music/" + payload));
		var random = Math.floor(Math.random() * music.length);

		fs.writeFile(path.resolve(global.root_path + "/installers/omxplayer.sh"), "omxplayer ~/MagicMirror/Music/" + payload + "/" + music[random], "utf-8");
		setTimeout(function() {
			exec("pm2 start ~/MagicMirror/installers/omxplayer.sh");
		}, 2000);
		self.sendSocketNoficiation("SUCCESS_" + payload + "_MUSIC", music[random]);
	}
	else if (notification == "STOP_MUSIC") {
		exec("pm2 stop omxplayer");
	}
	else if (notification == "PLAY_NEXT") {
		
	}
	 
  },

});

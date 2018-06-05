/*
 * Author : BinSin
 * https://github.com/BinSin/MMM-Music-Player:
 */

Module.register("MMM-Music-Player", {
  defaults: {
  },

  start: function() {
	var self = this;
	Log.log("Starting module: " + this.name);
  },

  notificationReceived: function(notification, payload, sender) {
	var self = this;
	if(sender) {
		if (notification == "PLAY_MUSIC_RECOGNITION") {
			console.log("select music : " + payload);
			self.sendSocketNotification("PLAY_MUSIC", payload);
		}
		else if (notification == "RESET_PLAYER_LIST") {
			console.log("reset player list");
			self.sendSocketNotification("RESET_PLAYER_LISTS", payload);
		}
		else if (notification == "COMMAND") {
			if (payload == " stop music") {
				console.log("stop music");
				self.sendSocketNotification("STOP_MUSIC", payload);
			}
			else if (payload == " play next") {
				console.log("play next");
				self.sendSocketNotification("PLAY_NEXT", payload);
			}
		}
	}
  },

  socketNotificationReceived: function(notification, payload) {
	var self = this;
	if(notification == "SUCCESS_PLAY_MUSIC") {
		console.log("success play music : " +  payload);
	}
	else if(notification == "SUCCESS_HAPPY_MUSIC") {
		console.log("happy music start : " + payload);
	}
	else if(notification == "SUCCESS_SAD_MUSIC") {
		console.log("happy music start : " + payload);
	}
  },

});

/*
 * Author : BinSin
 * https://github.com/BinSin/MMM-webCamera
 */

Module.register("MMM-webCamera", {
  defaults: {
	opts: [
		{
    	  		width: 1280,
			height: 720,
			quality: 100,
			delay: 0,
			saveShots: true,
			device: false,
			output: "jpg",
			callbackReturn: "location",
      			verbose: false,
		},
	],
  },

  start: function() {
	 var self = this;
	 Log.log("Starting module: " + this.name);
	 self.sendSocketNotification("INIT_CAMERA", self.config);
  },

  notificationReceived: function(notification, payload, sender) {
	 var self = this;
	 if(sender) {
		if (notification == "COMMAND") {
			if (payload == " take a picture") {
				console.log("take a picture");
				self.sendSocketNotification("TAKE_A_PICTURE", self.config);
			}
			else if (payload == " wake up") {
				console.log("wake up mirror");
				self.sendSocketNotification("MASTER", self.config);
			}
		}
	 }
  },
  
  socketNotificationReceived: function(notification, payload) {
	   var self = this;
	   if(notification == "FAIL_TAKE_A_PICTURE") {
		   console.log("fail take a picture");
	   }
	   else if(notification == "SUCCESS_TAKE_A_PICTURE") {
		   console.log("success take a picture");
		   setTimeout(function() {
		  	 self.sendNotification("SEND_AWS", payload);
		   }, 2000);
	   }
	   else if(notification == "FAIL_MASTER") {
		   console.log("fail take a picture master");
	   }
	   else if(notification == "SUCCESS_MASTER") {
		   console.log("success take a picture master");
		   setTimeout(function() {
		  	 self.sendNotification("SEND_AWS_MASTER", payload);
		   }, 2000);
	   }
  },

});

/*
*
*/
'use strict';

var NodeHelper = require("node_helper");
var NodeWebcam = require("node-webcam");
var moment = require('moment');
var path = require("path");
var Webcam = null;
var fs = require("fs");

module.exports = NodeHelper.create({

  start: function() {
    console.log("Starting node helper for: " + this.name);
  },

  initCamera: function(payload) {
        this.Webcam = NodeWebcam.create(payload.opts);
  },
  
  socketNotificationReceived: function(notification, payload) {
    var self = this;
    if (notification == "INIT_CAMERA") {
      this.initCamera(payload);
    }
    else if (notification == "TAKE_A_PICTURE") {
      const filename = moment().format("YYYYMMDD_HHmmss");
      var full_filename = filename + ".jpg";
      fs.writeFile("imageLocation.js", full_filename, "utf-8");

      var picture_path = "~/Pictures/" + filename + "." + payload.opts[0].output;
      this.Webcam.capture( picture_path , function( err, data ) {
	      if(err){
		 self.sendSocketNotification("FAIL_TAKE_A_PICTURE", err);
	      }
	      else {
	     	 self.sendSocketNotification("SUCCESS_TAKE_A_PICTURE", data);
	      }
      });
    }
    else if (notification == "MASTER") {
      var picture_path = "~/Pictures/Master/person.jpg";
      this.Webcam.capture( picture_path, function( err, data ) {
	      if(err){
		 self.sendSocketNotification("FAIL_MASTER", err);
	      }
	      else {
	     	 self.sendSocketNotification("SUCCESS_MASTER", data);
	      }
      });
    }
  },

});

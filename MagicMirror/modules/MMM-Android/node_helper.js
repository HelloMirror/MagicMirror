/*
*
*/

'use strict';

var NodeHelper = require("node_helper");
var fs = require("fs");
var path = require("path");

module.exports = NodeHelper.create({

  start: function() {
	console.log("Starting node helper for: " + this.name);
  },
/*
  initAndroid: function(payload) {
	var data = " & & ";
	fs.writeFile(path.resolve(global.root_path + payload + "mmsQuery.js"), data, "uft8", function(err){ });
	fs.writeFile(path.resolve(global.root_path + payload + "kakaoQuery.js"), data, "uft8", function(err){ });
	fs.writeFile(path.resolve(global.root_path + payload + "gmailQuery.js"), data, "uft8", function(err){ });
	fs.writeFile(path.resolve(global.root_path + payload + "callQuery.js"), data, "uft8", function(err){ });
  },
*/
  socketNotificationReceived: function(notification, payload) {
    if (notification == "SEND_ANDROID") {
	 var self = this;

	 fs.readFile(path.resolve(global.root_path + payload + "mmsQuery.js"), 'utf8', function(err, data) {
		 self.sendSocketNotification("GET_MMS_QUERY", data);
	 });
	 fs.readFile(path.resolve(global.root_path + payload + "kakaoQuery.js"), 'utf8', function(err, data) {
		 self.sendSocketNotification("GET_KAKAO_QUERY", data);
	 });
	 fs.readFile(path.resolve(global.root_path + payload + "gmailQuery.js"), 'utf8', function(err, data) {
		 self.sendSocketNotification("GET_GMAIL_QUERY", data);
	 });
	 fs.readFile(path.resolve(global.root_path + payload + "callQuery.js"), 'utf8', function(err, data) {
		 self.sendSocketNotification("GET_CALL_QUERY", data);
	 });
    }
	  /*
    else if (notification == "INIT_ANDROID") {
	    this.initAndroid(payload);
    }
    */
  },

});

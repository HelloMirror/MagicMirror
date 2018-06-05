/*
*
*/
'use strict';

var NodeHelper = require("node_helper");

var path = require("path");

var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.region = 'ap-northeast-1';
var s3 = new AWS.S3();

module.exports = NodeHelper.create({

  start: function() {
    	 var self = this;
    	 console.log("Starting node helper for: " + this.name);
  },

  getRandomImage: function(payload) {
    	 var self = this;
	 
	 var params = {
		 Bucket: payload.Bucket
	 };
	 s3.listObjects(params, function(err, data) {
		 if(!err) {
			var len = data.Contents.length;
			var random = Math.floor(Math.random() * len);
			self.sendSocketNotification("SUCCESS_CHANGE_IMAGE", data.Contents[random].Key);
		 }
		 else {
			self.sendSocketNotifcaiton("FAIL_CHANGE_IMAGE", err); 
		 }
	 });

  },

  socketNotificationReceived: function(notification, payload) {
	var self = this;
	
	if (notification == "RANDOM_IMAGE") {
		self.getRandomImage(payload);
	}
  },

});

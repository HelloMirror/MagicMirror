/*
 * Author : BinSin
 * https://github.com/BinSin/MMM-Random-S3-Image:
 */

Module.register("MMM-Random-S3-Image", {
  defaults: {
	Bucket: 'YOUR_BUCKET_NAME'
  },

  start: function() {
	var self = this;
	Log.log("Starting module: " + this.name);
	this.image = null;
	self.sendSocketNotification("RANDOM_IMAGE", self.config);
	setInterval(function() {
		self.sendSocketNotification("RANDOM_IMAGE", self.config);
	}, 50000);
  },

  getDom: function() {
	var wrapper = document.createElement("div");
	var date = document.createElement("div");
	var img = document.createElement("img");

	var imageDate = new String(this.image);
	var year = imageDate.substring(0, 4);
	var month = imageDate.substring(4, 6);
	var day = imageDate.substring(6, 8);
	
	date.innerHTML = year + "년 " + month + "월 " + day + "일";
	img.width = '320';
	img.height = '180';
	img.src = 'https://s3-ap-northeast-1.amazonaws.com/hellomirror3/' + this.image;
	
	wrapper.appendChild(date);
	wrapper.appendChild(img);
	return wrapper;
  },

  socketNotificationReceived: function(notification, payload) {
	var self = this;
	
	if("SUCCESS_CHANGE_IMAGE") {
		console.log("success change image : " + payload);
		this.image = payload;
		self.updateDom(1000);
	}	
	else if("FAIL_CHANGE_IMAGE") {
		console.log("fail change image : " + payload);
		this.image = payload;
		self.updateDom(1000);
	}
  },

});

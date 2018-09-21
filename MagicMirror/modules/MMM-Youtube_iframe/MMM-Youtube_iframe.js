/* global Module */

/* Magic Mirror
 * Module: {{MODULE_NAME}}
 *
 * By {{AUTHOR_NAME}}
 * {{LICENSE}} Licensed.
 */
var service = {};
service.youtube = null;
var resultAPI = null;

var videoid_global;
var localplayer;

Module.register("MMM-Youtube_iframe", {

	defaults: {
        header: "MMM-Youtube_iframe",

	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
        Log.info('Starting module: '+this.name);

		var self = this;


		var resultArray = [];
		//var videoId = null;


		var dataRequest = null;
		var dataNotification = null;

		//Flag for check if module is loaded
		this.loaded = false;
        this.updateTimer = null;


        if (this.config.debug) {
            Log.info(this.url);
        }


	},
    
    getStyles: function () {
        return["MMM-Youtube_iframe.css"];
    },

    getVideoId :function(){
        var self = this;
        var videoId;
        var i;
        if(this.result.items.length > 0 ){
            //나중에 추가적으로 기능을 늘릴예정
            /*responsiveVoice.speak("상위 5개 영상만 보여주j겠습니다. 어떤 영상을 보시겠습니까?","Korean Female");
        	for(i=0 ; i<5; i++){
                this.resultArray.push(this.result.snippet[i].title);*/
            var r = Math.floor((Math.random() * this.result.items.length) + 1);
            this.videoId = this.result.items[r].id.videoId;
            return this.videoId;
        }
        //return default youtube
        return null;

    },

    showYoutube: function () {
        /* // 2. This code loads the IFrame Player API code asynchronously.
         var tag = document.createElement('script');

         tag.src = "https://www.youtube.com/iframe_api";
         var firstScriptTag = document.getElementsByTagName('script')[0];
         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

         // 3. This function creates an <iframe> (and YouTube player)
         //    after the API code downloads.
         */
        player = new YT.Player('player', {
            height: '320',
            width: '240',
            videoId: videoid_global,
            events: {
                'onReady': onPlayerReady,
            }
        });
        function onPlayerReady(event) {
            event.target.playVideo();
        }



        return player;

    },


       var tr3 = document.createElement("tr");
       var td5 = document.createElement("td");

                         td5.innerHTML = "<a aria-hidden=\"true\" tabindex=\"-1\" rel=\"null\" href=\"/watch?v=bU9_CWVD_cg\">\n" +
           "      <yt-img-shadow class=\"style-scope ytd-thumbnail no-transition\" style=\"background-color: transparent;\" loaded=\"\"><img id=\"img\" class=\"style-scope yt-img-shadow\" alt=\"\" width=\"246\" src=\"https://i.ytimg.com/vi/fQObwGhNFEs/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&amp;rs=AOn4CLCnmD08jBGqK3pXJPq3meNuSInlOg\"></yt-img-shadow>      \n" +
           "    </a>";

       var td6 = document.createElement("td");
       td6.className = "youtubeTD";
       td6.innerHTML = "[남자머리] 포마드 할 때 이것만 기억해 ! 물,위,앞,옆~!";

        tr3.appendChild(td5);
       tr3.appendChild(td6);
       table3.appendChild(tr3);


       div.appendChild(table3);
        div.appendChild(table2);
        div.appendChild(table1);
        wrapper.appendChild(div);
        return wrapper;


    },



	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
		if(notification === "YouTube_DATA") {
			 console.log("response")
            this.result = payload.data;
            videoid_global =this.getVideoId();

            localplayer=this.showYoutube();

			this.dataNotification = payload;

		}

    },

    notificationReceived: function (notification, payload, sender) {
		if(sender) {
			if(notification == "COMMAND") {
				console.log("1  " + notification + payload);

				if(payload== " YouTube on"){
                    var id = document.getElementById("youtubediv");
                    id.style.display = "block";
                }

                if(payload== " close YouTube"){
                   /* var id = document.getElementById("youtubediv");
                    id.style.display = "none";*/
			this.updateDom();
                }

                if (payload == " first show") {
                    videoid_global ="C76-2aj3lY8&t=13s";
                   console.log(videoid_global);
                    this.showYoutube();
                }
                if (payload == " second show") {
                    videoid_global ="bU9_CWVD_cg";
                    console.log(videoid_global);
                    this.showYoutube();
                }
                if (payload == " third show") {
                    videoid_global = "f0-G_IagZCc";
                    console.log(videoid_global);
                    this.showYoutube();
                }

                if (payload == " show YouTube") {
                    //responsiveVoice.speak("어떤 동영상을 보시겠습니까", "Korean Female");
                    console.log("2  " + notification + payload);
                   this.sendSocketNotification("GET_YOUTUBEDATA", payload);

                    console.log("Working notification system. Notification:", notification, "payload: ", payload);
                }
                if(payload == " stop YouTube"){
                    console.log("stop youtube~~~~~~~~~~~~~~~~");
                    var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
                    iframe.postMessage('{"event":"command","func":"' + 'pauseVideo' +   '","args":""}', '*');

                }
                if(payload ==" play YouTube"){
                    console.log("play youtube~~~~~~~~~~~~~");
                    var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
                    iframe.postMessage('{"event":"command","func":"' + 'playVideo' +   '","args":""}', '*');
                }


            }


	}

    },





});

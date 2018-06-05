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


    getDom: function() {
        var self = this;

        var wrapper = document.createElement("div");
        wrapper.id = "player";

        var div = document.createElement("div");
        div.id = "youtubediv";


       var table1 = document.createElement("table");
        table1.className = "youtubeTABLE";

       var tr1 = document.createElement("tr");
       var td1 = document.createElement("td");

       td1.innerHTML =" <a aria-hidden=\"true\" tabindex=\"-1\" rel=\"null\" href=\"/watch?v=C76-2aj3lY8\">\n" +
           "<yt-img-shadow class=\"style-scope ytd-thumbnail no-transition\" style=\"background-color: transparent;\" loaded=\"\"><img id=\"img\" class=\"style-scope yt-img-shadow\" alt=\"\" width=\"246\" src=\"https://i.ytimg.com/vi/C76-2aj3lY8/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&amp;rs=AOn4CLCgtPRJ6fimY-YkzEStq0AAQU8-rQ\"></yt-img-shadow>";
       var td2 = document.createElement("td");
       td2.className = "youtubeTD";
       td2.innerHTML = "[이지보이]남자 넥타이 매는법2탄!정말 쉬운 플레인노트법!!"




       tr1.appendChild(td1);
       tr1.appendChild(td2);
       table1.appendChild(tr1);



        var table2 = document.createElement("table");
        table2.className = "youtubeTABLE";
       var tr2 = document.createElement("tr");
       var td3 = document.createElement("td");

       td3.innerHTML ="<a aria-hidden=\"true\" tabindex=\"-1\" rel=\"null\" href=\"/watch?v=bU9_CWVD_cg\">\n" +
           "      <yt-img-shadow class=\"style-scope ytd-thumbnail no-transition\" style=\"background-color: transparent;\" loaded=\"\"><img id=\"img\" class=\"style-scope yt-img-shadow\" alt=\"\" width=\"246\" src=\"https://i.ytimg.com/vi/bU9_CWVD_cg/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&amp;rs=AOn4CLBZPyInisTf_LfLL21X6djA_eCPZA\"></yt-img-shadow>      \n" +
           "    </a>";
       var td4 = document.createElement("td");
       td4.className = "youtubeTD";
       td4.innerHTML ="2분 야매눈화장💄 :: 손고자도 쉽게 따라 할 수 있는 심하게 간단한 인라인 쌍커풀 데일리 눈화장, 학생 메이크업 /";


       tr2.appendChild(td3);
       tr2.appendChild(td4);
       table2.appendChild(tr2);


        var table3 = document.createElement("table");
        table3.className = "youtubeTABLE";


       var tr3 = document.createElement("tr");
       var td5 = document.createElement("td");

       td5.innerHTML = "<img id=\"img\" alt=\"\" width=\"246\" src=\"https://i.ytimg.com/vi/f0-G_IagZCc/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&amp;rs=AOn4CLC_6JMfRcrvild6ty1nsJHERY8S_g\">";

       var td6 = document.createElement("td");
       td6.className = "youtubeTD";
       td6.innerHTML = "[남자머리] 포마드 할 때 이것만 기억해 ! 물,위,앞,옆~!";

        tr3.appendChild(td5);
       tr3.appendChild(td6);
       table3.appendChild(tr3);


       div.appendChild(table1);
        div.appendChild(table2);
        div.appendChild(table3);

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

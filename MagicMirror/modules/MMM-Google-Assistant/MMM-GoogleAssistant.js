/* Magic Mirror
 * Module: MMM-GoogleAssistant
 *
 * By Gaurav
 *
 */

Module.register("MMM-GoogleAssistant", {
  // Module config defaults.
  defaults: {
    header: "Google Asistant",
    maxWidth: "100%",
    publishKey: 'pub-c-0cc9b82a-4cd0-4a90-9ab3-7705e5a07575',
    subscribeKey: 'sub-c-c6f57af0-4134-11e8-afae-2a65d00afee8',
    updateDelay: 500
  },

  // Define start sequence.
  start: function() {
    Log.info('Starting module: Google Assistant Now');
    var self = this;
    this.assistantActive = false;
    this.processing = false;
    this.userQuery = null;
    //this.sendSocketNotification('INIT', 'handshake');
    this.sendSocketNotification('INIT', self.config);
  },

  getDom: function() {
    Log.log('Updating DOM for GA');
    var wrapper = document.createElement("div");

    if (this.assistantActive == true) {
      if (this.processing == true) {
        wrapper.innerHTML = "<img src='MMM-GoogleAssistant/assistant_active.png'></img><br/>" + this.userQuery;
      } else {
        wrapper.innerHTML = "<img src='MMM-GoogleAssistant/assistant_active.png'></img>";
      }
    } else {
      wrapper.innerHTML = "<img src='MMM-GoogleAssistant/assistant_inactive.png'></img>";
    }
    return wrapper;
  },
  
  socketNotificationReceived: function(notification, payload) {
    var self = this;
    delay = self.config.updateDelay;
    if (notification == 'ON_CONVERSATION_TURN_STARTED') {
      this.assistantActive = true;
    } else if (notification == 'ON_CONVERSATION_TURN_FINISHED') {
      this.assistantActive = false;
      this.processing = false;
    } else if (notification == 'ON_RECOGNIZING_SPEECH_FINISHED') {
      this.userQuery = payload;
      this.processing = true;
      delay = 0;
      this.sendNotification("COMMAND", payload);
    }

    this.updateDom(delay);
  },

});

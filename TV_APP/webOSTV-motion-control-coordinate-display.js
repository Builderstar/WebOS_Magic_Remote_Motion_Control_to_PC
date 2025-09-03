(function () {
    var old = console.log;
    var logger = document.getElementById('log');
    console.log = function (message) {
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
        } else {
            logger.innerHTML += message + '<br />';
        }
    }
	})();
	var subscriptionHandle = webOS.service.request(
  	"luna://com.webos.service.mrcu",
  	{
    	method: "sensor2/getSensorEventData",
    	parameters: { sensorType: "coordinate", subscribe: true },
    	onSuccess: function (inResponse) {
      	if (typeof inResponse.subscribed !== "undefined") {
        	if (!inResponse.subscribed) {
          console.log("Failed to subscribe");
        }
      }
      console.log("Result: " + JSON.stringify(inResponse));
      // To-Do something
    },
    onFailure: function (inError) {
      console.log("Error: [" + inError.errorCode + "]: " + inError.errorText);
      // To-Do something
    	},
  	}
	);

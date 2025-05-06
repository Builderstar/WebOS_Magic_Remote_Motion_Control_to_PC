var intervalHandle = webOS.service.request("luna://com.webos.service.mrcu", {
  method: "sensor2/setSensorInterval",
  parameters: { interval: 30 },
  onSuccess: function (inResponse) {
    console.log("Result: " + JSON.stringify(inResponse));
  },
  onFailure: function (inError) {
    console.log("[" + inError.errorCode + "]: " + inError.errorText);
    // If errorCode is 1006 and errorText is "Wrong Callback Interval", it means a
    // wrong interval error. interval is the currently-set event response interval
    // and can be set to a desired interval within the allowed range.
  },
});

var subscriptionHandle = webOS.service.request(
  	"luna://com.webos.service.mrcu",
  	{
    	method: "sensor2/getSensorEventData",
    	parameters: { sensorType: "coordinate", subscribe: true, },
    	onSuccess: function (inResponse) {
      	if (typeof inResponse.subscribed !== "undefined") {
        	if (!inResponse.subscribed) {
          console.log("Failed to subscribe");
        }
      }
      // To-Do something
      var http = new XMLHttpRequest();
      var url = "http://192.168.1.177:8050";
      var params = JSON.stringify(inResponse.coordinate); // Replace with your data
      http.open("POST", url, true);
      http.setRequestHeader("Content-type", "application/json");
      http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
          alert(http.responseText);
          }
      }
      http.send(params);
    },
    onFailure: function (inError) {
      console.log("Error: [" + inError.errorCode + "]: " + inError.errorText);
      // To-Do something
    	},
  	}
	);

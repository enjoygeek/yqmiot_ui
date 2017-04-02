var mqtt =  require('mqtt');
var say = require('say');
var mqttbroker = 'ws://yqmiot.com:8888';
var mqttclient = mqtt.connect(mqttbroker);
//Internal debug
var debug_messages = true;
//Console commands
process.argv.forEach(function (val, index, array) {
    if (val) {
        if (val.toLowerCase() == "debug") {
            debug_messages = true;
        }
    }
});
//Connect to Broker
mqttclient.on('connect', function() {
  DEBUG_LOG('Server Started!');
});
const IOT = {

}

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mqtt = require('mqtt');
var yqm = mqtt.connect('ws://test.mosquitto.org:8080');
yqm.on('connect',function(){
	yqm.publish('yqmiot/2/2/5/ping');
});
app.get('/', function(req, res){
	res.send('<h1>Welcome Realtime Server</h1>');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
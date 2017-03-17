var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var IOT = require('./yqm.js');
var client = new IOT.IOT(2,5);
// console.log(client.ping());
app.get('/', function(req, res){
	res.send('<h1>Welcome Realtime Server</h1>');
});
io.on('connection',function(socket){
	// console.log('主人来了');
});
http.listen(3000, function(){
	console.log('listening on *:3000');
});
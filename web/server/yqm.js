var mqtt = require('mqtt');
/**
 * account:频道号.
 * nodeId:设备号.
 */
function IOT(account,nodeId){
    let that = this;
    this.account = account;
    this.nodeId = nodeId;
    this.yqm = mqtt.connect("ws://test.mosquitto.org:8080");
    this.yqm.subscribe(`yqmiot/${that.account}/0/#`);
    this.yqm.on("connect",function(){
        console.log("connect");
        that.yqm.subscribe('yqmiot/2/5/2/ping');
    });
    this.yqm.on("offline",function(){
        console.log("offline");
    });
    this.yqm.on("error",function(){
        console.log("error");
    });
    this.yqm.on("close",function(){
        console.log("close");
    });
    this.yqm.on('message',function(topic,payload){
    	console.log("message");
    	console.log("topic:"+topic);
        console.log("message:"+that.decode(payload));
        let load = {
            "account": `${that.account}`,
            "action": "message",
            "nodeid": `${that.nodeId}`,
        };
        // that.yqm.publish(`yqmiot/${that.account}/0/#`,that.encode(load));
    });
}

IOT.prototype.ping = function(rece){
    return "hao";
}
IOT.prototype.decode = function(payload){
    let load = payload.toString();
    if(load){
        return JSON.parse(load);
    }
    return undefined;
}
IOT.prototype.encode = function(payload){
    let load = "";
    if(payload){
        load = JSON.stringify(payload);
    }
    return new Buffer(load);
}
module.exports.IOT = IOT;
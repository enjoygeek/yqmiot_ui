# 开发日志

> 月球猫互联控制端

# 2017.3.17
## mtqq协议与socket共存的问题
``` bash
## 解决方式一将所有的mqtt操作放到这里，但是会导致新的问题的产生。用户每登录一次就会产生一次新的监听。随着用户登录次数的增加，最后返回的数据将会给服务器和客户端处理 带来诸多的问题。所这将是一个不宜采取的方式。
io.sockets.on("connetion",function(socket){
    socket.on("publish",function(topic,message){
        mqtt.publish(topic,message);
    });
    socket.on("subcribe",function(topic){
        mqtt.subcribe(topic);
    })
    mqtt.on("message",function(topic,payload){
        socket.emit(topic,payload);
    })
})

## 解决方式二 这种方式显然要复杂许多但是却行之有效。这次我采用了这种方式才得以解决上一种方式产生的问题，但是新的问题也随着出来。当客户端刚开启的时候，需要用户自己先登录初始化，才可以订阅所有的内容。
mqttclient.on('connect', function() {
  DEBUG_LOG('Server Started!');
});


// Subscribe to topic
io.sockets.on('connection', function (socket) {

    //Log subscriptions to console
    DEBUG_LOG('Client Connected: ' + socket.id);

    //Subscribe to an arbitrary number of topics
    socket.on('subscribe', function (data) {

        //Subscribe to all the messages passed as arguments
        for (var i = 0; i < arguments.length; i++) {

            try {

                //Check topic for errors
                if (typeof arguments[i].topic == 'undefined')
                {
                    DEBUG_LOG('Error, topic not valid! Ignoring function...');
                    return false;
                }

                //Topic is not null, subscribe
                mqttclient.subscribe(arguments[i].topic);
                //Log subscriptions to console
                DEBUG_LOG('SUB: ' + arguments[i].topic);
            }
            catch(err) {
                DEBUG_LOG('ERROR: ' + err, true);
            }
        }
    });

    //Publish to topic/message
    socket.on('publish', function (data) {

        //Check message
        if (typeof data.topic == 'undefined')
        {
            DEBUG_LOG('Error, topic not valid! Ignoring function...');
            return false;
        }

        //Log MQTT messages being sent
        DEBUG_LOG('SENT: ' + data.topic + " " + data.message);

        //Publish MQTT message
        try {
            mqttclient.publish(data.topic, data.message);
        }
        catch(err) {
            DEBUG_LOG('ERROR: ' + err, true);
        }
    });

    //Unsubscribe from topic
    socket.on('unsubscribe', function (data) {
	   mqttclient.unsubscribe(data.topic);
    });
});

// Push the message to socket.io
mqttclient.on('message', function(topic, payload) {
    io.sockets.emit('mqtt',
        {'topic'  : topic,
         'payload' : String(payload)
        }
    );

    //Log MQTT messages being received
    DEBUG_LOG('RECEIVED: ' + topic + " " + payload);
});
```

# 2017.3.18
## 加入vuex来解决数据传递的问题
```bash
### 问题提出
因为我之前的解决方式，为以下
在index.vue里当
created(){
    let that = this;
    IOT.init(2,5);
    IOT.socket.on("connect",function(){
        // IOT.socket.emit('subscribe',{topic:"yqmiot/2/#"});
        IOT.socket.emit('subscribe',{topic:"yqmiot/#"});
    });
    IOT.socket.on('mqtt',function(message){
        that.message = message;
        console.log(that.message);
    });
}

很显然这种方式造成了数据不能和多个组件共享的结果。我提出的解决方式就是加入vuex进行状态管理。

## vuex设计

```

## nginx配置socket转发
```bash
### nginx配置文件位置
/etc/nginx/
###配置修改
cd sites-available
nano default
//配置为
location /socket.io/ {
    //此处改为 socket.io 后端的 ip 和端口即可
    proxy_pass http://127.0.0.1:3000;

    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_http_version 1.1;
}
出现新的问题：http和https不能共存。所以我暂且搁置这个问题。我已经把服务端的ssl关了。现在网站是http的形式。

```
## 服务器测试通过

```bash
服务器api告一段落。
```
## vuex学习
```bash
state:单一状态树
getters:

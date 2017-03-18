# 开发日志

> 月球猫互联控制端

## 2017.3.17

``` bash
# mtqq协议与socket共存的问题
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

```


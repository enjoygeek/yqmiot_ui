# 项目说明文档
## 场景

节点事件上报 (publish nodeid event)
节点属性上报 (publish nodeid property )
节点方法被调用 (subscribe nodeid call | publish 0 ack)
*系统广播事件 (subscribe 0 system)

接收属性上报 (subscribe '+' event)
接收事件上报 (subscribe '+' property)
调用节点方法 (publish nodeid call | subscribe 0 ack)
*发送系统广播 (publish 0 system)

*节点关注另外节点事件
*节点关注另外节点属性
*节点调用另外节点方法

## 通用功能定义
开关控制
亮度控制
数据上报
设备上下线

## 通用事件定义
设备上线 (ONLINE)
设备下线 (OFFLINE)
打开开关 (OPEN)
关闭开关 (CLOSE)

## 通用属性定义
设备状态 (STATUS) ONLINE, OFFLINE, UPGRADE
开关状态 (SWITCH)
亮度状态 (LIGHT)



## API 示例 

节点事件上报
yqmnet/<accountid>/<nodeid>/event
{
    sender: <nodeid>,
    name: <eventname>, # 事件名 ONLINE, OFFLINE, OPEN, CLOSE
}

节点属性上报
yqmnet/<accountid>/<nodeid>/property
{
    sender: <nodeid>,
    receiver: <nodeid>, # control node id is 0
    properties: {
        STATUS: "ONLINE",
        switch: 0,
        light: 100,
    }
}

发方法被调用
yqmnet/<accountid>/<nodeid>/call
{
    sender: <nodeid>,
    receiver: <nodeid>, # control node id is 0
    name: <eventname>, # 方法名
    value: <eventvalue>, # 参数
    callid: , 调用序列
}
yqmnet/<accountid>/0/ack
{
    sender: <nodeid>,
    receiver: <nodeid>, # control node id is 0
    callid: , 
    value: <eventvalue>, # 属性值
}

## 主题
nodeid 0 是特殊值
yqmnet/<accountid>/<receiver>/<sender>/<action>
{
    receiver: <receiver>,
    sender: <sender>,
    action: <action>,
}

send(receiver, action, data)
send(action, data)

Call().Ack(data=None)
Ack(receiver)

Client
    __init__(self, accountid, nodeid)
    buildAction('Event')
    buildEventAction()
    buildPropertyAction()
    buildAckAction()
    buildCallAction()
    run()

Action
    __init__(self, accountid, nodeid, )
    receiver
    sender
    action
    publish(receiver=None)


Event(name, data)
    publish()

Property({})
    publish()

Call()

actionProperty = client.buildPropertyAction(receiver=None)
actionProperty.status = 1
actionProperty.light = 255
actionProperty.switch = 0
actionProperty.publish(receiver=None)
/**
 * 系统命令
 */
const YQMIOT_COMMAND_PROPERTY = "property"//属性上报
const YQMIOT_COMMAND_EVENT = "event" //事件上报
const YQMIOT_COMMAND_CALL = "call" //方法调用
const YQMIOT_COMMAND_ACK = "ack" // 方法响应

// 系统事件
const YQMIOT_EVENT_ONLINE = "yqmiot.event.online" // 上线通知
const YQMIOT_EVENT_OFFLINE = "yqmiot.event.offline" // 下线通知
const YQMIOT_EVENT_TEST = "yqmiot.event.test" // 按下测试按钮

// 系统属性
const YQMIOT_PROPERTY_NODEID = "yqmiot.property.nodeid" // 节点id号
const YQMIOT_PROPERTY_ACCOUNTID = "yqmiot.property.accountid" // 节点所在账号id（频道id）频道隔离
const YQMIOT_PROPERTY_MODEL = "yqmiot.property.model" // 设备所属类型
const YQMIOT_PROPERTY_VERSION = "yqmiot.property.version" // 设备所属固件版本号

// 系统方法
const YQMIOT_METHOD_PING = "yqmiot.method.ping" // ping连通测试
const YQMIOT_METHOD_TEST = "yqmiot.method.test" // 方法调用测试


//开关类方法
const YQMIOT_EVNET_TOGGLE = "yqmiot.event.toggle"

export default {
    YQMIOT_COMMAND_PROPERTY,
    YQMIOT_COMMAND_EVENT,
    YQMIOT_COMMAND_CALL,
    YQMIOT_COMMAND_ACK,
    YQMIOT_EVENT_ONLINE,
    YQMIOT_EVENT_OFFLINE,
    YQMIOT_EVENT_TEST,
    YQMIOT_PROPERTY_NODEID,
    YQMIOT_PROPERTY_ACCOUNTID,
    YQMIOT_PROPERTY_MODEL,
    YQMIOT_PROPERTY_VERSION,
    YQMIOT_METHOD_PING,
    YQMIOT_METHOD_TEST,
    YQMIOT_EVNET_TOGGLE,
}
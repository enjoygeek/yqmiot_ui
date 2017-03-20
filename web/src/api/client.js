import io from 'socket.io-client';
import cmd from "../store/mutation-types";
const IOT = {
  /**
   * 常数的定义
   */
  host: "http://" + window.location.hostname + ":3000",
  account: null,//当前节点所在的频道号
  nodeId: null,//当前节点号
  socket: null,//当前socket对象
  action: null,//判断是否已经执行过action
  flag: false,//判断超时标志
  el: null, //当前页面的this
  outTimer: null,//计时器
  /**
   * 器件类型类定义;
   */
  switchs: [],
  /**
  * 编码事件
  */
  buildMessage: function (receiver, ) {
    return {
      action: ""
    }
  },
  /**
  * 解码message
  */
  decode: function (payload) {
    let load = payload;
    if (load) {
      return JSON.parse(load);
    }
    return undefined;
  },
  /**
   * 编码message
   */
  encode: function (payload) {
    let load = "";
    if (payload) {
      load = JSON.stringify(payload);
    }
    return load;
  },

  /**
   * 编码行为
   */
  buildAction: function (command, receiver, message) {
    let topic = "yqmiot/" + this.account + "/" + receiver + "/" + this.nodeId + "/" + command;
  },
  /**
   * 解码事件
   */
  decodeEvent: function (message) {
    let payload = this.decode(message.payload);
    let action = payload.action;
    let sender = payload.sender;
    let receiver = payload.receiver;
    let eventType = "";
    if (action) {
      eventType = action.split(".")[2];
    }
    return {
      eventType,
      sender,
      receiver,
      action,
    }
  },
  /**
   * 数组去重(TODO)
   */
  uniqueObject: function (arr) {
    var v, r = [], o = {};
    for (var i = 0; (v = arr[i]) !== undefined; i++) {
      !o[v] && (r.push(v), o[v] = true);
    }
    return r;
  },

  /**
   * 执行通知消息
   */
  toast: function (title) {
    IOT.el.toast = true
    IOT.el.warnTittle = title;
    if (IOT.el.toastTimer) clearTimeout(IOT.el.toastTimer)
    IOT.el.toastTimer = setTimeout(() => { IOT.el.toast = false }, 2000)
  },

  /**
   * 上线通知
   */
  online: function () {

  },

  /**
   * 检测超时(作为回调函数使用)
   */
  deteckAction: function () {
      IOT.el.$store.commit('timeout');
      IOT.action = null;
  },
  /**
   * 发送事件
   * 调用
   * message格式
   * {
   *  receiver: string,
   *  val: object,
   *  command: string, 
   * }
   * 交互格式
   * {
   *  topic: string,
   *  message:{
   *    action: string,事件的命令
   *    sender: string,发送者
   *    name: string,命令名称实际上是action的最后一部分。(TODO：商量换)
   *    receiver:string,接收方
   *    value: object,信息，包括改变的状态属性
   *  }
   * }
   */
  sendCall: function (message) {
    let name = message.command.split('.')[2];
    IOT.socket.emit("publish", { topic: `yqmiot/${IOT.account}/${message.receiver}/${IOT.nodeId}/call`, message: { "action": message.command, "sender": IOT.nodeId, "name": name, "receiver": message.receiver, "value": message.val } });
  },
  /**
   * 分发给控制器
   */
  dispatch: function (message, callback) {
    IOT.action = message.command;//执行命令的完整版
    console.log(IOT.action);
    IOT.el.$store.dispatch(IOT.action, message);
    if (IOT.outTimer) {
      clearTimeout(IOT.outTimer);
    }
    IOT.outTimer = setTimeout(function () {
      callback();
    }, 10000)
  },

  /**
   * 客户端初始化
   */
  init: function (account, nodeId) {
    this.socket = io.connect(this.host);
    this.account = account;
    this.nodeId = nodeId;
  }
}
export default IOT
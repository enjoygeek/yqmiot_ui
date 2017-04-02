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
  index: null,
  outTimer: null,//计时器
  callseq: null, //回包序号
  bttomNav: 'list',
  device: {
    homeswitch: [ ],

  },
  /**
   * 器件类型类定义;
   */
  switchs: [],
  /**
  * 编码事件
  */
  buildMessage: function (receiver) {
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
    let topic = message.topic.split('/');
    let payload = this.decode(message.payload);
    let action = payload.action;
    let sender = topic[3];
    let receiver = topic[2];
    let eventType = "";
    let params = payload.params;
    let callseq = payload.callseq;
    if (action) {
      eventType = action.split(".")[2];
    }

    return {
      eventType,
      sender,
      receiver,
      action,
      params,
      callseq,
    }
  },
  /**
   * 数组去重(TODO)
   */
  uniqueObject: function (arr, types) {
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
    IOT.el.toast = true;
    IOT.el.warnTittle = title;
    if (IOT.el.toastTimer) clearTimeout(IOT.el.toastTimer)
    IOT.el.toastTimer = setTimeout(() => { IOT.el.toast = false }, 2000)
  },

  /**
   * 上线通知
   */
  online: function () {

  },
  shiftDevice: function (id, type) {
    for (var item in IOT.device[type]) {
      if (id == IOT.device[type][item].id) {
        IOT.device[type].splice(item, 1);
      }
    }
  },
  updateProperty: function (id, type) {
    for (var item in IOT.device[type]) {
      if (id == IOT.device[type][item].id) {
        return IOT.device[type][item];
      }
    }
    return false;
  },
  /**
   * 检测超时(作为回调函数使用)
   */
  deteckAction: function () {
    console.log(IOT.action, IOT.outTimer);
    if (IOT.action && IOT.outTimer) {
      // IOT.el.status = !IOT.el.status;//超时，状态不改变，返回原状态。
      IOT.toast("请求超时");//通知用户已经超时
      clearTimeout(IOT.outTimer);//清除定时器。
      IOT.el.disabled = false; //解除不可操作。使用户可以再次发送。
      IOT.action = null;
    }
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
   *  payload:{
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
    IOT.socket.emit("publish", { topic: `yqmiot/${IOT.account}/${message.receiver}/${IOT.nodeId}/call`, payload: { "action": message.command, "callseq": message.callseq, "params": message.params } });
  },
  /**
   * 分发给控制器
   */
  dispatch: function (message) {
    IOT.sendCall(message);
    return new Promise((resolve, reject) => {
      IOT.outTimer = setTimeout(resolve, 10000);
    });
    // if (IOT.outTimer) {
    //   clearTimeout(IOT.outTimer);
    // }
    // IOT.outTimer = setTimeout(function () {
    //   callback();
    // }, 10000)
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

import io from 'socket.io-client'
const IOT = {
    host: "http://" + window.location.hostname + ":3000",
    account: null,
    nodeId: null,
    socket: null,
    decode: null,
    encode: null,
    flag: false,
    el: 　null,
    outTimer: null,
    deteckToogle: function ($store, status) {
        if (!IOT.flag) {
            console.log("超时");
            $store.commit('timeout', status)
        } else {
            IOT.flag = !IOT.flag;
        }
    },
    decodeEvent: function (message) {
        console.log(message);
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
        }
    },
    dispatch: function ($store, actionname, message, status, callback) {
        $store.dispatch(actionname, message);
        clearTimeout(this.outTimer);
        this.outTimer = setTimeout(function () {
            callback($store, status);
        }, 10000)
    },
    decode: function (payload) {
        let load = payload;
        if (load) {
            return JSON.parse(load);
        }
        return undefined;
    },
    encode: function (payload) {
        let load = "";
        if (payload) {
            load = JSON.stringify(payload);
        }
        return load;
    },
    toast: function (that, title) {
        that.toast = true
        that.warnTittle = title;
        if (that.toastTimer) clearTimeout(that.toastTimer)
        that.toastTimer = setTimeout(() => { that.toast = false }, 2000)
    },
    uniqueObject: function (arr) {
        var v, r = [], o = {};
        for (var i = 0; (v = arr[i]) !== undefined; i++) {
            !o[v] && (r.push(v), o[v] = true);
        }
        return r;
    },
    sendCallToggle: function (IOT, message) {
        IOT.socket.emit("publish", { topic: `yqmiot/${IOT.account}/1000/${IOT.nodeId}/call`, message: { "action": "yqmiot.event.toggle", "sender": IOT.nodeId, "name": message.name, "receiver": message.receiver, "value": message.val } });
    },

    buildAction: function (action, receiver, message) {
        let topic = "yqmiot/" + this.account + "/" + receiver + "/" + this.nodeId + "/" + action;

    },
    callRemoteMethod: function (nodeId, method) {
        let promise = new promise((resolve) => {

        })
        return promise;
    },
    init: function (account, nodeId) {
        this.socket = io.connect(this.host);
        this.account = account;
        this.nodeId = nodeId;
    }
}
export default IOT
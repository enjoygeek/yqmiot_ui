import io from 'socket.io-client'
const IOT = {
    host: "http://" + window.location.hostname + ":3000",
    account: null,
    nodeId: null,
    socket: null,
    decode: null,
    encode: null,
    decode: function (payload) {
        let load = payload.toString();
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
    uniqueObject: function (arr) {
        var v, r = [], o = {};
        for (var i = 0; (v = arr[i]) !== undefined; i++) {
            !o[v] && (r.push(v), o[v] = true);
        }
        return r;
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
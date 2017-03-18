import io from 'socket.io-client'
const IOT = {
    host:"http://www.gebilaowu.cn:3000",
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
        return new Buffer(load);
    },
    buildAction:function(){

    },
    init: function (account, nodeId) {
        this.socket = io.connect(this.host);
        this.account = account;
        this.nodeId = nodeId;
    }
}
export default IOT
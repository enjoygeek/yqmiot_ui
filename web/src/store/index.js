import VUE from "vue"
import Vuex from 'vuex'
import IOT from '../api/client'
import homeSwitch from './modules/homeSwitch'
import event from './modules/event'
import property from './modules/property'
import call from './modules/call'
import ack from './modules/ack'
import createWebSocketPlugin from './plugin'
VUE.use(Vuex);
IOT.init(1, 0);
IOT.socket.on("connect",function(){
    IOT.socket.emit('subscribe',{topic:"yqmiot/#"});
    IOT.socket.emit("publish",{topic:"yqmiot/"+IOT.account+"/2/"+IOT.nodeId+"/call",message:{}})
});

const plugin = createWebSocketPlugin(IOT.socket);

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    modules: {
        homeSwitch,
        event,
        property,
        call,
        ack
    },
    strict: debug,
    plugins: [plugin],
})


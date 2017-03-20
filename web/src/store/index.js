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
IOT.init(2, 5);
IOT.socket.on("connect",function(){
    IOT.socket.emit('subscribe',{topic:"yqmiot/2/"+IOT.nodeId+"/#"});
    IOT.socket.emit('subscribe',{topic:"yqmiot/2/0/#"});
    // IOT.socket.emit("publish",{topic:"yqmiot/"+IOT.account+"/1000/"+IOT.nodeId+"/call",message:{action:"yqmiot.call.property",sender:IOT.nodeId,receiver:'1000',name:"event"}})
});

const plugin = createWebSocketPlugin(IOT.socket);
const state = {
    username: "kira",
    password: '130608',
}
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    state,
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


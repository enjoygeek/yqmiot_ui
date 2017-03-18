import * as types from '../mutation-types'
import IOT from '../../api/client'
const state = {
    homeSwitch:[
        {
            name: "月球猫开关",
            receiver: "switch0",
            val: false,
        },
        {
            name: "kira开关",
            receiver: "switch1",
            val:true,
        }
    ],
    timeout: false,
}

const getters = {

}

const actions = {
    toggle({ commit }, message) {
        console.log("publish toggle");
        IOT.socket.emit("publish", { topic: `yqmiot/${IOT.account}/${message.receiver}/${IOT.nodeId}/call`, message: { "action": "yqmiot.event.toggle", "sender": IOT.nodeId, "name": message.name, "receiver": message.receiver, "value": message.val } });
    }
}
const mutations = {
    // homeSwitch({ commit }, payload) {
    //     state.message = payload;
    // }
}

export default {
    state,
    getters,
    actions,
    mutations
}
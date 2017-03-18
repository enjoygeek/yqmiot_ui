import * as types from '../mutation-types'
import IOT from '../../api/client'
const state = {
    count: 44,
}

const getters = {

}

const actions = {
    toggle({ commit }, message) {
        IOT.socket.on("publish", { topic: `yqmiot/${IOT.account}/${message.receiver}/${IOT.nodeId}/call`, payload: { "action": "yqmiot.event.toggle", "sender": "5", "name": "evnet", "receiver": "27888", "value": message.val } });
    }
}
const mutations = {

}

export default {
    state,
    getters,
    actions,
    mutations
}
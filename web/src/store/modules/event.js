import * as types from '../mutation-types'
import IOT from '../../api/client'
const state = {
    message: {},
}

const getters = {

}

const actions = {
    // event({ commit }, message){

    // }
}
function onlineWarn() {

}

const mutations = {
    event({ commit }, message) {
        let types = IOT.decodeEvent(message);
        switch (types.eventType) {
            case "online":
                IOT.toast(types.sender+"上线了");
                console.log(types.sender + "上线");
                break;
            case "offline":
                IOT.toast(types.sender+"设备离线");
                IOT.shiftDevice(types.sender,"homeswitch");
            default:
                break;
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
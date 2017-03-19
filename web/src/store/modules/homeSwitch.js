import * as types from '../mutation-types'
import IOT from '../../api/client'
const state = {
    homeSwitch: [
        {
            name: "月球猫开关",
            receiver: "switch0",
            val: false,
        },
        {
            name: "kira开关",
            receiver: "switch1",
            val: true,
        }
    ],
    timeout: false,
    timeout1: true,
}

const getters = {

}
const actions = {
    toggle({ commit }, message) {
        IOT.sendCallToggle(IOT,message);
    }
}
const mutations = {
    homeSwitch({ commit }, payload) {
        IOT.flag = true;
    },
    timeout({commit},that){
        that.status = !that.status;
        that.toast = true
        if (that.toastTimer) clearTimeout(that.toastTimer)
        that.toastTimer = setTimeout(() => { that.toast = false }, 2000)       
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
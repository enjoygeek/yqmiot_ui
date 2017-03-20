import cmd from '../mutation-types'
import IOT from '../../api/client'
const state = {
    homeSwitch: [
        {
            name: "月球猫开关",
            id: "1000",
            val: false,
            avatar: "",
        },
        {
            name: "kira开关",
            id: "switch1",
            val: true,
            avatar: "",
        }
    ],
}

const getters = {

}
const actions = {
    [cmd.YQMIOT_EVNET_TOGGLE]({ commit }, message) {
        IOT.sendCall(message);
    }
}
const mutations = {
    homeSwitch({ commit }, payload) {
        // IOT.flag = true;
    },
    timeout({ commit }) {
        IOT.el.status = !IOT.el.status;//超时，状态不改变，返回原状态。
        IOT.toast("请求超时");//通知用户已经超时
        clearTimeout(IOT.outTimer);//清除定时器。
        IOT.el.disabled = false; //解除不可操作。使用户可以再次发送。
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
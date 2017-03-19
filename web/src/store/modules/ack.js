import * as types from '../mutation-types'
import IOT from '../../api/client'
const state = {
    count: 44,
}

const getters = {

}

const actions = {
    event({ commit }, message){
        
    }
}
const mutations = {
    ack({ commit }, message){
       let types = IOT.decodeEvent(message);
        console.log(types);
        switch (types.eventType) {
            case "toggle":
                    IOT.flag = true;
                    clearTimeout(IOT.outTimer);
                    IOT.toast(IOT.el,types.sender+"已执行");
                break;
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
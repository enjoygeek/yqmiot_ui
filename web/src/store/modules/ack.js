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
       let types = IOT.decodeEvent(message);//信息解码，方便处理
       console.log(IOT.callseq,types.callseq);
        switch (types.eventType) {
            case "toggle":
                if(IOT.action == types.action && IOT.callseq == types.callseq){
                    if(IOT.outTimer){
                        clearTimeout(IOT.outTimer);//没有超时清除超时处理。
                    }
                    IOT.toast(types.sender+"已执行");
                    IOT.el.disabled = false;
                    IOT.action = null;
                }
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
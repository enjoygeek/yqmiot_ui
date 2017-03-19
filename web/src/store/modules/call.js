import * as types from '../mutation-types'
import IOT from '../../api/client'
const state = {
    message: 0,
}

const getters = {

}

const actions = {
    event({ commit }, message) {

    }
}
const mutations = {
    call({ commit }, message) {
        // IOT.flag = true;
        let types = IOT.decodeEvent(message);
        
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
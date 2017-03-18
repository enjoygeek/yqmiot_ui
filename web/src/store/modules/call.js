import * as types from '../mutation-types'
import IOT from '../../api/client'
const state = {
    message:{},
}

const getters = {

}

const actions = {
    event({ commit }, message){
        
    }
}
const mutations = {
    call({ commit }, message){
        state.message = message;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
import * as types from '../mutation-types'
import IOT from '../../api/client'
const state = {
    count: 44,
}

const getters = {

}

const actions = {
    
}
const mutations = {
    property({ commit }, message){
        console.log(message);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
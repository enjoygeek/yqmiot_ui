import * as types from '../mutation-types'
import IOT from '../../api/client'
const state = {
    collection: {},
}

const getters = {

}

const actions = {

}
const mutations = {
    property({ commit }, payload) {
        collection = payload;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
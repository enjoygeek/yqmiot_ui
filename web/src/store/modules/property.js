import * as types from '../mutation-types'
import IOT from '../../api/client'
import device from './device'
const state = {
    collection: {},
}

const getters = {

}

const actions = {

}
const mutations = {
    property({ commit }, message) {
        let types = IOT.decodeEvent(message);
        let payload = JSON.parse(message.payload);
        let device = IOT.updateProperty(types.sender, "homeswitch");
        if (device) {
            device.val = payload.params.id;
        } else {
            var newDevice = {
                name: payload.params.name,
                id: types.sender,
                val: false,
                avatar: "",
            }
            IOT.device.homeswitch.push(newDevice);
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
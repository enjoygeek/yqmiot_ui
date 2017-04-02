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
        console.log(payload);
        let device = IOT.updateProperty(types.sender, "homeswitch");
        if (device) {
            // device.val = payload.params.switch;
            if(device.id == types.sender){
              device.val = payload.params.switch;
              device.name = payload.params.name;
            }
            console.log(payload.params.switch);
            // console.log(IOT.el.name == device.name);
        } else {
            var newDevice = {
                name: payload.params.name,
                id: types.sender,
                val: payload.params.switch,
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

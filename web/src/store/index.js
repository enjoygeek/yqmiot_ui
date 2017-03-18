import VUE from "vue"
import Vuex from 'vuex'
import IOT from '../api/client'
import homeSwitch from './modules/homeSwitch'
VUE.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    modules:{
        homeSwitch,
    },
    strict:debug,
})


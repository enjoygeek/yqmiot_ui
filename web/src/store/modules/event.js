import * as types from '../mutation-types'
import IOT from '../../api/client'
// import say from 'say'
// let say = require('../../../node_modules/say');
const state = {
  message: {},
}

const getters = {

}

const actions = {
  // event({ commit }, message){

  // }
}
function onlineWarn() {

}

const mutations = {
  event({ commit }, message) {
    let types = IOT.decodeEvent(message);
    switch (types.eventType) {
      case "online":
        IOT.el = IOT.index;
        IOT.toast(types.sender + "上线了");
        console.log(types.sender + "上线");
        // say.speak(types.sender+"online","Good News",1.0,function(err){
        //   if(err){
        //     return console.log(err);
        //   }else{
        //     console.log('already');
        //   }
        // })
        break;
      case "offline":
        IOT.el = IOT.index;
        IOT.toast(types.sender + "设备离线");
        IOT.shiftDevice(types.sender, "homeswitch");
        if(window.location.href.indexOf("message")>=0){
          IOT.el.$router.push("/index");
        }
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

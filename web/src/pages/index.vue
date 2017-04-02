<template>
  <div class="wrap">
    <div class="index">
      <mheader></mheader>
      <div id="list">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
        <mu-toast v-if="toast" :message="warnTittle" class=" toast" @close="hideToast"/>
      </div>
      <mfooter></mfooter>
    </div>
  </div>
</template>
<script>
import IOT from '../api/client'
import mheader from '../components/header'
import mfooter from '../components/footer'
export default {
  name: 'index',
  created(){
    IOT.el = this;
    IOT.index = this;
  },
  data () {
    return {
      events: false,
      topic: null,
      message: null,
      toast: false,
      warnTittle: "",
      text: 'hello'
    }
  },
  methods: {
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    }
  },
  components:{
    'mheader': mheader,
    'mfooter': mfooter,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.wrap{
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: #545454;
  .index{
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(0,0,0,0.25);
      #list{
        position:absolute;
        top:8%;
        bottom:8%;
        left:0px;
        right:0px;
        overflow-y:scroll;
        -webkit-overflow-scrolling:touch;
        box-sizing:border-box;
        .toast{
          margin-bottom:18%;
        }
      }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
}
</style>

<template>
  <div class="wrap">
    <div class="index">
      <mu-appbar title="月球猫互联" id="shadow">
        <mu-avatar slot="left" :src="myron"/>
      </mu-appbar>

      <div id="list">
        <router-view></router-view>
        <mu-toast v-if="toast" :message="warnTittle" @close="hideToast"/>
      </div>

      <mu-bottom-nav :value="bottomNav" shift @change="handleChange" id="footer">
        <mu-bottom-nav-item value="list" title="设备" icon="ondemand_video"/>
        <mu-bottom-nav-item value="music" title="设置" icon="music_note"/>
      </mu-bottom-nav>
    </div>
  </div>
</template>
<script>
import myron from '../assets/yqm.png';
import IOT from '../api/client'
export default {
  name: 'index',
  created(){
    IOT.el = this;
  },
  data () {
    return {
      myron,
      bottomNav: 'list',
      events: false,
      topic: null,
      message: null,
      toast: false,
      warnTittle: "",
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val;
      this.$router.push(`/${val}`);
    },
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    }
  },
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
      #shadow{
        position:absolute;
        top:0px;
        left:0px;
        height:8%;
        box-sizing:border-box;
      }
      #list{
        position:absolute;
        top:8%;
        bottom:8%;
        left:0px;
        right:0px;
        overflow-y:scroll;
        -webkit-overflow-scrolling:touch;
        box-sizing:border-box;
      }
      #footer{
      position:absolute;
      bottom: 0px;
      left:0px;
      height:8%;
      box-sizing:border-box;
    }
  }
}
</style>

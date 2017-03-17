<template>
  <div class="wrap">
    <div class="index">
      <mu-appbar title="月球猫互联" id="shadow">
        <mu-avatar slot="left" :src="myron"/>
      </mu-appbar>

      <div id="list">
        <router-view></router-view>
      </div>

      <mu-bottom-nav :value="bottomNav" shift @change="handleChange" id="footer">
        <mu-bottom-nav-item value="list" title="设备" icon="ondemand_video"/>
        <mu-bottom-nav-item value="music" title="信息" icon="music_note"/>
        <mu-bottom-nav-item value="books" title="添加" icon="books"/>
        <mu-bottom-nav-item value="pictures" title="我的" icon="photo"/>
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
    IOT.init();
  },
  data () {
    return {
      myron,
      bottomNav: 'list',
      events: false,
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val;
      this.$router.push(`/${val}`);
    },
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

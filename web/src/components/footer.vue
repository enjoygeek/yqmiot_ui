<template>
  <div class="header">
     <mu-bottom-nav :value="bottomNav" shift @change="handleChange" id="footer">
        <mu-bottom-nav-item value="list" title="设备" icon="ondemand_video"/>
        <mu-bottom-nav-item value="community" title="酷玩" icon="favorite"/>
        <mu-bottom-nav-item value="setting" title="个人" icon="books"/>
      </mu-bottom-nav>
  </div>
</template>

<script>
  import myron from '../assets/yqm.png';
  import IOT from '../api/client'
  export default {
    name: 'header',
    data() {
      return {
        bottomNav: IOT.bttomNav,
      }
    },
    methods: {
      handleChange (val) {
        IOT.bttomNav = val;
        this.bottomNav = val;
        this.$router.push(`/${val}`);
      },
    }
  }
</script>

<style scoped lang="less">
  #footer{
      position:absolute;
      bottom: 0px;
      left:0px;
      height:8%;
      box-sizing:border-box;
    }
</style>

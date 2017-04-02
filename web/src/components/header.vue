<template>
  <div class="header">
    <mu-appbar title="月球猫互联" id="shadow">
      <mu-avatar slot="left" :src="myron" @click="toHome" />
    </mu-appbar>
  </div>
</template>

<script>
  import myron from '../assets/yqm.png';
  export default {
    name: 'header',
    data() {
      return {
        myron,
      }
    },
    methods: {
      toHome() {
        this.$router.push("/index");
      }
    }
  }
</script>

<style scoped lang="less">
  #shadow {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 8%;
    box-sizing: border-box;
  }
</style>

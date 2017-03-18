<template>
  <div class="wrap">
    <div class="index">
      <mu-appbar title="月球猫互联" id="shadow">
        <mu-avatar slot="left" :src="myron"/>
      </mu-appbar>
      <div id="list">
         <mu-list>
          <mu-list-item :value="$store.state.homeSwitch.homeSwitch[this.$route.params.index].receiver" :title="$store.state.homeSwitch.homeSwitch[this.$route.params.index].name">
            <mu-avatar :src="avatar1" slot="leftAvatar"/>
            <mu-switch v-model="status" slot="right"/>
          </mu-list-item>
        </mu-list>
      </div>
    </div>
  </div>
</template>
<script>
import myron from '../assets/yqm.png';
import avatar1 from '../assets/1.jpg';
// import IOT from '../api/client'
export default {
  name: 'index',
  created(){
    
  },
  data () {
    return {
      myron,
      status: this.$store.state.homeSwitch.homeSwitch[this.$route.params.index].val,
      topic: null,
      name: this.$store.state.homeSwitch.homeSwitch[this.$route.params.index].name,
      receiver:this.$store.state.homeSwitch.homeSwitch[this.$route.params.index].receiver,
      avatar1,
    }
  },
  methods: {
    
  },
  watch:{
    status:function(newval,oldval){
       let message = {
        "val": newval,
        "receiver": this.receiver,
        "name": this.name
      }
      this.$store.dispatch('toggle',message);
    }
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

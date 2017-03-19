<template>
  <div class="wrap">
    <div class="index">
      <mu-appbar title="月球猫互联" id="shadow">
        <mu-avatar slot="left" :src="myron"/>
      </mu-appbar>
      <div id="list">
         <mu-list>
          <mu-list-item :value="$store.state.homeSwitch.homeSwitch[$route.params.index].receiver" :title="$store.state.homeSwitch.homeSwitch[this.$route.params.index].name">
            <mu-avatar :src="avatar1" slot="leftAvatar"/>
            <div slot="right" @click="changed">
                 <mswitch size="20px" theme="blue" :checked="status"/>
            </div>
          </mu-list-item>
        </mu-list>
        <mu-toast v-if="toast" message="超时" @close="hideToast"/>
      </div>
    </div>
  </div>
</template>
<script>
import myron from '../assets/yqm.png';
import avatar1 from '../assets/1.jpg';
import IOT from '../api/client'
import mySwitch from '../components/switch';
export default {
  name: 'index',
  created(){
    
  },
  data () {
    return {
      myron,
      toggle: true,
      topic: null,
      status: this.$store.state.homeSwitch.homeSwitch[this.$route.params.index].val,
      name: this.$store.state.homeSwitch.homeSwitch[this.$route.params.index].name,
      receiver:this.$store.state.homeSwitch.homeSwitch[this.$route.params.index].receiver,
      avatar1,
      st: "open",
      toast: false,
    }
  },
  methods: {
    changed(){
        this.status = !this.status;
        
        let message = {
            name: this.name,
            receiver: this.receiver,
            val: this.status,
        }
        IOT.dispatch(this.$store,"toggle",message,this,IOT.deteckToogle);
    },
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    }
  },
  watch:{
    
  },
  components:{
    'mswitch': mySwitch
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.wrap {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: #545454;
    .index {
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background-color: rgba(0, 0, 0, 0.25);
        #shadow {
            position: absolute;
            top: 0px;
            left: 0px;
            height: 8%;
            box-sizing: border-box;
        }
        #list {
            position: absolute;
            top: 8%;
            bottom: 0;
            left: 0px;
            right: 0px;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            box-sizing: border-box;
        }
    }
}
</style>

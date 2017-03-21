<template>
  <div class="wrap">
    <div class="index">
      <mu-appbar title="月球猫互联" id="shadow">
        <mu-avatar slot="left" :src="myron"/>
      </mu-appbar>
      <div id="list">
         <mu-list>
          <mu-list-item :value="id" :title="name">
            <mu-avatar :src="avatar1" slot="leftAvatar"/>
            <div slot="right" @click="changed">
                 <mswitch size="20px" theme="blue" :disabled="disabled" :checked="status"/>
            </div>
          </mu-list-item>
        </mu-list>
        <mu-toast v-if="toast" :message="warnTittle" @close="hideToast"/>
      </div>
    </div>
  </div>
</template>
<script>
import myron from '../assets/yqm.png';
import avatar1 from '../assets/1.jpg';
import IOT from '../api/client'
import mySwitch from '../components/switch';
import cmd from "../store/mutation-types";

export default {
  name: 'index',
  created(){
    IOT.el = this;
  },
  data () {
    return {
      myron,
      toggle: true,
      warnTittle: "",
      topic: null,
      status: IOT.device.homeswitch[this.$route.params.index].val,//通断的状态(true:通,false:断)
      name: IOT.device.homeswitch[this.$route.params.index].name,//器件的名字()
      id:IOT.device.homeswitch[this.$route.params.index].id,//器件的id
      avatar1,
      st: "open",
      toast: false,//开启通知标志
      disabled: false,//命令可否执行标志
    }
  },
  methods: {
    changed(){
      if(!this.disabled){//双重验证是否真的按钮不可再点击。
        this.disabled = true;//点击按钮,按钮不在接收点击。直到又返回值。或超时
        this.status = !this.status;//按钮状态改变，给用户以提示，他已经单击，且需耐心等待。
        IOT.action = cmd.YQMIOT_METHOD_TOGGLE;
        IOT.callseq = Math.random()*200;
        let message = {
            command: cmd.YQMIOT_METHOD_TOGGLE,//执行的命令
            receiver: this.id,//信息接收方
            params: {
              "val":this.status,//发送的属性信息(TODO)
            },
            callseq: IOT.callseq,
        }
        IOT.dispatch(message).then(IOT.deteckAction);//message为发送的信息，callback回调函数
      }
    },
    //隐藏通知方法
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

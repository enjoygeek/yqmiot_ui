<template>
  <div>
    <mu-list>
      <mu-list-item :value="id" :title="name">
        <mu-avatar :src="avatar1" slot="leftAvatar"/>
        <div slot="right" @click="changed">
              <mswitch size="20px" theme="blue" :disabled="disabled" :checked="status"/>
        </div>
      </mu-list-item>
    </mu-list>
    <mu-toast v-if="toast" :message="warnTittle" class="toast" @close="hideToast"/>
  </div>
</template>
<script>
import myron from '../assets/yqm.png'
import avatar1 from '../assets/1.jpg'
import IOT from '../api/client'
import mySwitch from '../components/switch'
import mheader from '../components/header'
import mfooter from '../components/footer'
import cmd from "../store/mutation-types"

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
      index: this.$route.params.index,

      // status: IOT.device.homeswitch[this.$route.params.index].val,//通断的状态(true:通,false:断)
      // name: IOT.device.homeswitch[this.$route.params.index].name,//器件的名字()
      // id:IOT.device.homeswitch[this.$route.params.index].id,//器件的id
      avatar1,
      st: "open",
      toast: false,//开启通知标志
      disabled: false,//命令可否执行标志
    }
  },
  computed: {
     status:function(){
       return IOT.device.homeswitch[this.index].val;
     },
     name: function(){
       return IOT.device.homeswitch[this.index].name;
     },
     id: function(){
       return IOT.device.homeswitch[this.index].id;
     }
  },
  methods: {
    changed(){
      if(!this.disabled){//双重验证是否真的按钮不可再点击。
        this.disabled = true;//点击按钮,按钮不在接收点击。直到又返回值。或超时
        // this.status = !this.status;//按钮状态改变，给用户以提示，他已经单击，且需耐心等待。
        IOT.action = cmd.YQMIOT_METHOD_TOGGLE;
        IOT.callseq = Math.ceil(Math.random()*200);
        let message = {
            command: cmd.YQMIOT_METHOD_TOGGLE,//执行的命令
            receiver: this.id,//信息接收方
            params: {
              "val": !this.status,//发送的属性信息(TODO)
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
    },
    toHome () {
      this.$router.push("/index");
    }
  },
  watch:{

  },
  components:{
    'mswitch': mySwitch,
    'mheader': mheader,
    'mfooter': mfooter,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .toast{
    margin-bottom: 18%;
  }
</style>

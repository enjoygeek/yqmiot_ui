<template>
  <mu-list :value="value" @change="handleChange" >
  <mu-sub-header>开关类</mu-sub-header>
    <div v-for="(item, index) in $store.state.homeSwitch.homeSwitch">
      <mu-list-item :value="item.receiver+'/'+index" :title="item.name">
        <mu-avatar :src="avatar1" slot="leftAvatar"/>
      </mu-list-item>
    </div>
  </mu-list>
</template>

<script>
import avatar1 from '../assets/1.jpg';
import avatar2 from '../assets/2.jpg';
import avatar3 from '../assets/3.jpg';
export default {
  name: "list",
  data(){
    return {
      avatar1,
      avatar2,
      avatar3,
      value: 1,
      events:false,
      collect: {},
    }
  },
  methods: {
    handleChange (val) {
      this.value = val.split('/')[0];
      let index = val.split('/')[1];
      this.$router.push({ name: 'message', params: { receiver: this.value,index: index }})
    }
  },
  watch:{
    events:function(newval,oldval){
      let message = {
        "val": newval,
        "receiver":27888
      }
      // this.$store.dispatch('toggle',message);
    },
  },
}
</script>
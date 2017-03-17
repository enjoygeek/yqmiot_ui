<template>
  <mu-list :value="value" @change="handleChange">
    <mu-list-item :value="1" title="月球猫开关">
      <mu-avatar :src="avatar1" slot="leftAvatar"/>
      <mu-switch v-model="events"  slot="right"/>
    </mu-list-item>
    <mu-list-item :value="2" title="Maco Mai">
      <mu-avatar :src="avatar2" slot="leftAvatar"/>
      <mu-icon value="chat_bubble" slot="right"/>
    </mu-list-item>
    <mu-list-item :value="3" title="Alex Qin">
      <mu-avatar :src="avatar3" slot="leftAvatar"/>
      <mu-icon value="chat_bubble" slot="right"/>
    </mu-list-item>
    <mu-list-item :value="4" title="Allen Qun">
      <mu-avatar :src="avatar1" slot="leftAvatar"/>
      <mu-icon value="chat_bubble" slot="right"/>
    </mu-list-item>
    <mu-list-item :value="5" title="Myron Liu">
      <mu-avatar :src="avatar2" slot="leftAvatar"/>
      <mu-icon value="chat_bubble" slot="right"/>
    </mu-list-item>
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
    }
  },
  methods: {
    handleChange (val) {
      this.value = val
    }
  },
  watch:{
    events:function(newval,oldval){
      console.log(newval,"oldval"+oldval)
    }
  }
}
</script>
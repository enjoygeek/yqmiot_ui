<template>
  <div>
    <mu-toast v-if="toast" :message="warnTittle" @close="hideToast"/>
  </div>
</template>

<script>
import IOT from '../api/client'
export default {
  name: "list",
  created(){
    IOT.el = this;
  },
  data(){
    return {
      toast: false,
    }
  },
  methods: {
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    }
  }
}
</script>

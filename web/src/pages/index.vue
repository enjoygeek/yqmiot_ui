<template>
  <div class="wrap">
    <div class="index">
      <mu-appbar title="月球猫互联" id="shadow">
        <mu-avatar slot="left" :src="myron"/>
      </mu-appbar>

      <div id="list">
        <mu-list>
          <mu-list-item disableRipple title="你的猫" @click="handleToggle('events')">
            <mu-icon slot="left" value="send"/>
            <sub diplay="inline">觅食中</sub>
            <mu-switch v-model="events"  slot="right"/>
          </mu-list-item>
          <mu-list-item title="Drafts">
            <mu-icon slot="left" value="drafts"/>
          </mu-list-item>
          <mu-list-item title="Inbox" toggleNested>
            <mu-icon slot="left" value="inbox"/>
            <mu-list-item slot="nested" title="Starred">
              <mu-icon slot="left" value="grade"/>
            </mu-list-item>
            <mu-list-item slot="nested" disabled title="Sent mail" toggleNested>
              <mu-icon slot="left" value="send"/>
              <mu-list-item title="Drafts" slot="nested">
                <mu-icon slot="left" value="drafts"/>
              </mu-list-item>
            </mu-list-item>
            <mu-list-item slot="nested" title="Inbox" toggleNested>
              <mu-icon slot="left" value="inbox"/>
              <mu-list-item title="Drafts" slot="nested">
                <mu-icon slot="left" value="drafts"/>
              </mu-list-item>
            </mu-list-item>
          </mu-list-item>
        </mu-list>
      </div>
      
      <mu-bottom-nav :value="bottomNav" shift @change="handleChange" id="footer">
        <mu-bottom-nav-item value="movies" title="Movies" icon="ondemand_video"/>
        <mu-bottom-nav-item value="music" title="Music" icon="music_note"/>
        <mu-bottom-nav-item value="books" title="Books" icon="books"/>
        <mu-bottom-nav-item value="pictures" title="Pictures" icon="photo"/>
      </mu-bottom-nav>
    </div>
  </div>
</template>
<script>
import myron from '../assets/yqm.png'
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to 月球猫互联',
      myron,
      bottomNav: 'movies',
      bottomNavColor: 'movies',
      events: false,
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
    },
    handleToggle (key) {
      this[key] = !this[key];
      // this.events = !this.events;
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
      #list{
        position:absolute;
        top:6.8%;
        bottom:6%;
        left:0px;
        right:0px;
        overflow-y:scroll;
        -webkit-overflow-scrolling:touch;
      }
      #footer{
      position:absolute;
      bottom: 0px;
      left:0px;
    }
  }
}
</style>

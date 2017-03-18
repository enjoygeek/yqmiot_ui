<template>
 <div class="wrap">
     <div class="login">
        <div class="marg">{{msg}}</div>
        <img src="../assets/yqm2.png" alt="">
        <div id="footer">
            <mu-text-field label="请输入用户名" hintText="请输入用户名" v-model="username" labelFloat/><br/>
            <mu-text-field label="请输入密码" hintText="请输入密码" type="password" v-model="password" labelFloat/>
            <mu-raised-button label="登录" class="demo-raised-button" @click="loginHander" id="buton" secondary/>
        </div>
    </div>
 </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      msg: '月球猫互联登录界面',
      dataSource: [],
    }
  },
  methods: {
      loginHander: function(){
          if(this.username == this.$store.state.username && this.password == this.$store.state.password){
              this.$router.push('/index');
          }
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
     .login{
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        background-color: rgba(0,0,0,0.25);
        text-align: center;
        .marg{
            margin-top:10%;
            margin-bottom:10%;
            color:#fff;
            font-size: 1.5em;
            font-weight: 800;
            text-shadow: 1px 4px 0px #666;
        }
        #footer{
            position:absolute;
            bottom:0px;
            left:0px;
            padding-bottom:15%;
            #buton{
                background-color: rgba(0,0,0,0.5);
                width: 50%;
                margin:auto;
            }
        }
    }
 }
</style>

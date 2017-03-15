<template>
 <div class="wrap">
     <div class="login">
        <div class="marg">{{msg}}</div>
        <img src="../assets/yqm2.png" alt="">
        <div class="marg"></div>
        <mu-auto-complete hintText="请随便输入用户名" :dataSource="dataSource" style="color:#fff" />
        <mu-auto-complete hintText="请随便输入密码" :dataSource="dataSource" style="color:#fff" />
         <mu-raised-button label="login" class="demo-raised-button" id="buton" secondary/>
    </div>
 </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      msg: '月球猫互联登录界面',
      dataSource: [],
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
            margin-top:25%;
            margin-bottom:10%;
            color:#fff;
            font-size: 1.5em;
            font-weight: 800;
            text-shadow: 1px 4px 0px #666;
        }
        .label{
            font-size: 1.5em;
            color:#fff;
            text-align:left;
            text-indent:3em;
        }
        #buton{
            background-color: rgba(0,0,0,0.5);
            width:70%;
        }
    }
 }
</style>

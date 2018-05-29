<template>
  <div class="login">
    <h2>用户登录</h2>
    <div class="form">
      <label for="">
        <input type="text" v-model="username" placeholder="手机/邮箱/用户名">
      </label>
      <label for="">
        <input type="password" v-model="password" placeholder="密码">
      </label>

      <div class="btn-box">
          <button @click="checkUser">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      username:'admin',
      password: 'admin'
    }
  },
  methods:{
    checkUser(){
      let user = this.username,
          pwd = this.password;
      if(user == "" || pwd ==""){
        alert("请输入用户名和密码");
      }else if(user != 'admin' && pwd != 'admin'){
        alert("请输入正确的用户名或密码");
      }else{
        sessionStorage.setItem("user", user);
        this.$router.push({
          path:'/index'
        })
      }
    }
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl'
.login
  h2
    background #0af
    font-size 16px
    text-align center
    line-height 40px
    height 40px
    color #ffffff
  .form
    padding 15px 10px
    font-size 14px
    label
      display block
      margin-bottom 25px
      input 
        width 100%
        box-sizing border-box
        padding 10px
        font-size 14px
        border border-1px($line)
    .btn-box
      position fixed
      width 100%
      bottom 0
      left 0
      button 
        background #56d176
        border none 
        padding 10px
        text-align center 
        width 100%
        color #fff
</style>


<template>
  <div id="login">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="main"></div>
            <div class="form">
              <h3 @click="showRegister">创建账户</h3>
              <transition name="slide">
                <div :class="{show: isShowRegister}" class="register" >
                  <input type="text" :value="register.username" @input="register.username=$event.target.value" placeholder="用户名">
                  <input type="password" v-model="register.password" placeholder="密码">
                  <p v-bind:class="{error: register.isError}">{{register.notice}}</p>
                  <div class="button" @click="onRegister">创建账号</div>
                </div>
              </transition>
              <h3 @click="showLogin">登录</h3>
              <transition name="slide">
                <div :class="{show: isShowLogin}" class="login">
                  <input type="text" v-model="login.username" placeholder="输入用户名">
                  <input type="password" v-model="login.password" placeholder="密码" @keyup.enter="onLogin">
                  <p v-bind:class="{error: login.isError}">{{login.notice}}</p>
                  <div class="button" @click="onLogin">登录</div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import auth from '@/apis/auth'
import Bus from '@/helpers/bus'

auth.get_info()
.then(data => {
  console.log(data)
})


@Component
export default  class Login extends Vue{
  isShowLogin = true
  isShowRegister = false
  login = {
    username: '',
    password: '',
    notice: '输入用户名和密码',
    isError: false
  }
  register = {
    username: '',
    password: '',
    notice: '创建账号后，请记住用户名和密码',
    isError: false
  }

  showRegister(){
    this.isShowRegister = true
    this.isShowLogin = false
  }

  showLogin() {
    this.isShowLogin = true
    this.isShowRegister = false
  }

  onRegister() {
    if(!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.register.username)){
      this.register.isError = true
      this.register.notice = '用户名必须3~15个字符，仅限于字母数字下划线和中文'
      return
    }

    if(!/^.{6,16}$/.test(this.register.password)){
      this.register.isError = true
      this.register.notice = "密码长度须6~16位"
      return
    }

    auth.register({username: this.register.username, password: this.register.password})
        .then(() => {
          this.register.isError = false
          this.register.notice = ''
          this.$router.push({path: '/notebooks'})
        })
  }

  onLogin() {
    // 不需要这样验证，应与服务器匹配用户名是否存在和密码是否正确
    if(!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.login.username)){
      this.login.isError = true
      this.login.notice = '用户名必须3~15个字符，仅限于字母数字下划线和中文'
      return
    }

    if(!/^.{6,16}$/.test(this.login.password)){
      this.login.isError = true
      this.login.notice = "密码长度须6~16位"
      return
    }

    auth.login({username: this.login.username, password: this.login.password})
        .then(() => {
          this.login.isError = false
          this.login.notice = ''
          this.$router.push({path: '/notebooks'})
          Bus.$emit('login', {username: this.login.username})
          console.log('start redirect...')
        })
        .catch(data => {
          this.login.isError = true
          this.login.notice = data.msg
        })
  }

}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.7);
  display: table;
  transition: opacity .3s ease;

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;

    .modal-container {
      width: 800px;
      height: 500px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0,0,0,.33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
      display: flex;

      .main {
        flex: 1;
        background: #36bc64 url('~@/images/login-bg.jpg') center center no-repeat;
        background-size: contain;
      }

      .form {
        width: 270px;
        border-left: 1px solid #ccc;
        overflow: hidden;

        h3 {
          padding: 10px 20px;
          font-weight: normal;
          font-size: 16px;
          border-top: 1px solid #eee;
          cursor: pointer;
          margin-top: -1px;

          &:nth-of-type(2){
            border-bottom: 1px solid #eee;
          }
        }

        .button {
          background-color: #2bb964;
          height: 36px;
          line-height: 36px;
          text-align: center;
          font-weight: bold;
          color: #fff;
          border-radius: 4px;
          margin-top: 18px;
          cursor: pointer;
        }

        .slide-enter-active, .slide-leave-active {
          transition: height 5s;
        }
        .slide-enter-to, .slide-leave-to {
          height: 0;
        }


        .login, .register {
          padding: 0 20px;
          border-top: 1px solid #eee;
          height: 0;
          overflow: hidden;
          transition: height .4s;

          &.show {
            height: 193px;
          }

          input {
            display: block;
            width: 100%;
            height: 35px;
            line-height: 35px;
            padding: 0 6px;
            border-radius: 4px;
            border: 1px solid #ccc;
            outline: none;
            font-size: 14px;
            margin-top: 10px;

            &:focus {
              border: 3px solid #9dcaf8;
            }
          }

          p {
            font-size: 12px;
            margin-top: 10px;
            color: #444;
          }
          .error {
            color: red;
          }

        }
        .login {
          border-top: 0;
        }
      }
    }
  }
}
</style>

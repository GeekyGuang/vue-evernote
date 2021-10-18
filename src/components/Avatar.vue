<template>
  <span :title="username">{{slug}}</span>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import Auth from '@/apis/auth'

@Component
export default class Avatar extends Vue{
    username = 'Valley'
    created(){
      Auth.get_info().then((res: any) => {
        if(res.isLogin) {
          this.username = res.data.username
        }
      })
    }

    get slug() {
      return this.username.charAt(0)
    }
}
</script>


<style lang="scss" scoped>
span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 18px;
  margin-top: 15px;
}
</style>
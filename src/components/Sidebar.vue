<template>
<div id="sidebar">
  <Avatar />
  <div class="icons">
    <router-link to="/note" title="笔记"><i class="iconfont icon-note"></i></router-link>
    <router-link to="/notebooks" title="笔记本"><i class="iconfont icon-notebook"></i></router-link>
    <router-link to="/trash" title="回收站" ><i class="iconfont icon-trash"></i></router-link>
  </div>
  <div class="logout" @click="onLogout">
    <i class="iconfont icon-logout"></i>
  </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import Avatar from './Avatar.vue';
import auth from '@/apis/auth'

@Component({components:{Avatar}})
export default class Sidebar extends Vue{
  onLogout(){
    auth.logout().then(() => this.$router.push({path: '/login'}))
  }
}
</script>


<style lang="scss" scoped>
#sidebar {
  position: relative;
  width: 56px;
  text-align: center;
  background-color: #2c333c;

  > .icons {
    margin-top: 15px;

    > a {
      padding: 6px 0;
      display: block;
    }

    > .router-link-active {
      background: #5e6266;
    }
  }

  .logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }

  .iconfont {
    color: #fff;
  }
}
</style>
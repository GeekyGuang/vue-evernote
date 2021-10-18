<template>
  <div id="notebook-list">
    笔记列表
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Auth from '@/apis/auth'
import {Component} from 'vue-property-decorator'

@Component
export default class NotebookList extends Vue{
  created(){
    Auth.get_info().then(res =>{
      if(!res.isLogin){
        this.$router.push('/login')
      }
    }
    )
  }
}
</script>
<style lang="scss" scoped>
h1 {
    color: red;
}
</style>
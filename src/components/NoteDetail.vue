<template>
  <div id="note-detail">
      笔记详情
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import Auth from '@/apis/auth';

@Component
export default class NoteDetail extends Vue{
  created() {
    Auth.get_info().then((res:any) => {
          if (!res.isLogin) {
            this.$router.push('/login')
          }
        }
    )
  }
}
</script>

<style lang="scss" scoped>
h1 {
    color: blue;
}
</style>
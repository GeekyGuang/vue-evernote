<template>
  <div id="note-detail">
      <h1>notebookId: {{$route.query.notebookId}}</h1>
      <h1>noteId: {{$route.query.noteId}}</h1>
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
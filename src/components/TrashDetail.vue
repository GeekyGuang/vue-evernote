<template>
  <div id="trash-detail">
     回收站
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import Auth from '@/apis/auth';
@Component
export default class TrashDetail extends Vue{
  created() {
    Auth.get_info().then(res => {
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
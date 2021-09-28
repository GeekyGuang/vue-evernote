<template>
  <div>
      {{message}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
@Component
export default  class Login extends Vue{
  message = '登录页'
}
</script>

<style lang="scss" scoped>
</style>

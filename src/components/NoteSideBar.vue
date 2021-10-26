<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="addNote">添加笔记</span>
    <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">黄金糕</el-dropdown-item>
        <el-dropdown-item command="b">狮子头</el-dropdown-item>
        <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
        <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
        <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component
export default class NoteSideBar extends Vue {

}
</script>


<style lang="scss" scoped>
</style>
<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" to="/note/1" class="notebook" :key="notebook.id">
            <div>
              <span class="iconfont icon-notebook"></span> {{notebook.title}}
              <span>{{notebook.noteCounts}}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{notebook.friendlyCreatedAt}}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Auth from '@/apis/auth'
import {Component} from 'vue-property-decorator'
import Notebooks from '@/apis/notebook';


@Component
export default class NotebookList extends Vue{
  notebooks = []

  created(){
    Auth.get_info().then((res: any) =>{
      if(!(res.isLogin)){
        this.$router.push('/login')
      }
    }
    )

    Notebooks.getAll().then(res => this.notebooks = res.data)
    console.log(this.notebooks)
  }
}
</script>
<style lang="scss" scoped>
@import url('~@/assets/css/notebookList.scss');
</style>
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

interface Notebook {
  createdAt: string
  id: number
  noteCounts: number
  title: string
  updatedAt: string
  userId: number
  friendlyCreatedAt?: string
}

@Component
export default class NotebookList extends Vue{
  notebooks: Notebook[] = []

  created(){
    Auth.get_info().then((res: any) =>{
      if(!(res.isLogin)){
        this.$router.push('/login')
      }
    }
    )

    Notebooks.getAll().then((res:any) => this.notebooks = res.data)
    console.log(this.notebooks)
  }

  onCreate() {
    const title = window.prompt('创建笔记本')
    if(title !== null && title.trim() === ''){
      window.alert('笔记本名不可为空')
    }
    if(title !== null && title.trim() !== ''){
      Notebooks.addNotebook({title}).then((res: any) => {
        window.alert(res.msg)
        this.notebooks.unshift(res.data)
      }).catch(err => window.alert(err.msg))
    }
  }

  onEdit(notebook: Notebook) {
    const title = window.prompt('修改笔记本', notebook.title)
    if(title !== null && title.trim() === ''){
      window.alert('笔记本名不可为空')
    }
    if(title !== null && title.trim() !== ''){
      Notebooks.updateNotebook(notebook.id,{title}).then((res: any) => {
        window.alert(res.msg)
        notebook.title = title
      }).catch(err => window.alert(err.msg))
    }
  }

  onDelete(notebook: Notebook) {
    const isConfirm = window.confirm('确定要删除吗？')
    if(isConfirm){
      Notebooks.delete(notebook.id)
      .then((res: any) =>{
        window.alert(res.msg)
        this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
      }
      ).catch(err => window.alert(err.msg))
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/notebook-list.scss';
</style>
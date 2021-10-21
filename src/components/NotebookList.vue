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
import {Notebook} from '@/custom';
import {friendlyDate} from '@/helpers/util';


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
    this.$prompt('请输入笔记本标题', '新建笔记本', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^.{1,30}$/,
      inputErrorMessage: '标题不能为空，且不超过30个字符'
    }).then((obj: any ) => {
      const {value} = obj
      return Notebooks.addNotebook({title: value})
    }).then((res: any) => {
      this.$message.success(res.msg)
      res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
      this.notebooks.unshift(res.data)
    })
  }

  onEdit(notebook: Notebook) {
    let title = ''
    this.$prompt('请输入笔记本标题', '修改笔记本', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^.{1,30}$/,
      inputErrorMessage: '标题不能为空，且不超过30个字符',
      inputValue: notebook.title
    }).then((obj: any ) => {
      title = obj.value
      return Notebooks.updateNotebook(notebook.id,{title})
    }).then((res: any) => {
      notebook.title = title
      this.$message.success(res.msg)
    })
  }

  onDelete(notebook: Notebook) {
    this.$confirm('确定要删除吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      return  Notebooks.delete(notebook.id)
    }).then((res:any) => {
      this.$message.success(res.msg);
      this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
    })

  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/notebook-list.scss';
</style>
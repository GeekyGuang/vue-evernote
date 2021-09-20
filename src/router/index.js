import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import NotebookList from '@/components/NotebookList'
import Note from '@/components/NoteDetail'
import Trash from '@/components/TrashDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/notebooks',
    component: NotebookList
  },
  {
    path: '/note/:noteId',
    component: Note
  },
  {
    path: '/trash/:noteId',
    components: Trash
  }
]

const router = new VueRouter({
  routes
})

export default router

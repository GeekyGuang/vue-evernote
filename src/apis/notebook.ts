import request from '@/helpers/request';
import {friendlyDate} from '@/helpers/util'
import {Notebook} from '@/custom';

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: '/notebooks/:id'
}

export default {
  getAll() {
    return new Promise((resolve, reject)=> {
      request(URL.GET, 'GET').then((res:any) => {
        res.data = res.data.sort((a: Notebook,b: Notebook) => {
          if(a.createdAt === b.createdAt) return 0
          if(a.createdAt > b.createdAt) return -1
          if(a.createdAt < b.createdAt) return 1
        })
        res.data.forEach((notebook:Notebook) => notebook.friendlyCreatedAt = friendlyDate(notebook.createdAt))
        resolve(res)
      }).catch(res => reject(res))
    })
  },
  addNotebook({title=''} = {title: ''}){
    return request(URL.ADD, 'POST', {title})
  },
  updateNotebook(id: number, {title=''} = {title: ''}){
    return request(URL.UPDATE.replace(':id', id.toString()), 'PATCH', {title} )
  },
  delete(id: number){
    return request(URL.DELETE.replace(':id', id.toString()), 'DELETE')
  }
}

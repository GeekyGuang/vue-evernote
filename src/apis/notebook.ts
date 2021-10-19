import request from '@/helpers/request';

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: '/notebooks/:id'
}

export default {
  getAll() {
    return request(URL.GET, 'GET')
  },
  addNotebook({title=''} = {title: ''}){
    return request(URL.ADD, 'POST', 'title')
  },
  updateNotebook(id: string, {title=''} = {title: ''}){
    return request(URL.UPDATE.replace(':id', id), 'PATCH', {title} )
  },
  delete(id: string){
    return request(URL.DELETE.replace(':id', id))
  }
}

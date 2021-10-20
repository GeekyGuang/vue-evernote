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
    return request(URL.ADD, 'POST', {title})
  },
  updateNotebook(id: number, {title=''} = {title: ''}){
    return request(URL.UPDATE.replace(':id', id.toString()), 'PATCH', {title} )
  },
  delete(id: number){
    return request(URL.DELETE.replace(':id', id.toString()), 'DELETE')
  }
}

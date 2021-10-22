// @ts-ignore
import axios,{ AxiosError }  from 'axios'
import { Message } from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'https://note-server.hunger-valley.com'
axios.defaults.withCredentials = true

export default function request(url: string, type='GET', data={}){
  return new Promise((resolve, reject) => {
    const option:any = {
      url,
      method: type,
      validateStatus(status:number) {
        return (status >= 200 && status < 300) || status === 400
      }
    }
    if (type.toLowerCase() === 'get') {
      option.params = data
    } else {
      option.data = data
    }
    axios(option).then((res: { status: number; data: any }) => {
      if(res.status === 200) {
        resolve(res.data)
      } else {
        Message.error(res.data)
        reject(res.data)
      }
    }).catch((e: AxiosError)  => {
      Message.error(e.message)
      reject({msg: '网络异常'})
    })
  })
}
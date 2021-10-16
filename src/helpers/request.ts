// @ts-ignore
import axios,{ AxiosError }  from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'http://note-server.hunger-valley.com'

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
    axios(option).then((res: { status: number; data: unknown }) => {
      if(res.status === 200) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch((e: AxiosError)  => {
      console.error('error: 网络异常')
      reject({msg: '网络异常'})
    })
  })
}
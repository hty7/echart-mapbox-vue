import axios from 'axios'

axios.defaults.timeout = 10000
axios.defaults.baseURL = 'http://tvi3.f3322.net:8053/zhsq'

axios.interceptors.request.use(config => config,
  err => Promise.reject(err)
)
axios.interceptors.response.use(({data, config: { url }}) => {
  if (url.includes('hasData.action') || url.includes('hasBusiScore.action')) {
    return data
  }
  return data.success || !data.msg ? data : Promise.reject(data.msg)
}, err => Promise.reject(err))

export default axios

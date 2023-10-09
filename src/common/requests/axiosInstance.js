//导入axios
import axios from 'axios'
import { globals_config } from '/public/config/globals_config'



//使用axios下面的create([config])方法创建axios实例，其中config参数为axios最基本的配置信息。
const api = axios.create({
	baseURL: globals_config.host_service, //请求后端数据的基本地址，自定义
	timeout: 2000                   //请求超时设置，单位ms
})

// 请求相关处理 请求拦截 在请求拦截中可以补充请求相关的配置
// interceptors axios的拦截器对象
api.interceptors.request.use(config => {
	// config 请求的所有信息
   // console.log(config,'interceptors,request');
   const userInfo_str = localStorage.getItem('userInfo')
   if(userInfo_str){
      const userInfo = JSON.parse(userInfo_str) 
      const token = userInfo.token; // 替换为你的实际 Token
      config.headers.Authorization = `JWT ${token}`;
   }
   
   config.headers['Accept-Language'] = 'zh-hans';
   return config // 将配置完成的config对象返回出去 如果不返回 请求讲不会进行
}, err => {
   // 请求发生错误时的相关处理 抛出错误
  Promise.reject(err)
})

api.interceptors.response.use(res => {
    // 我们一般在这里处理，请求成功后的错误状态码 例如状态码是500，404，403
    // res 是所有相应的信息
   // console.log(res,'interceptors.response')
   return res
}, err => {
    // 服务器响应发生错误时的处理
    Promise.reject(err)
})

//导出我们建立的axios实例模块，ES6 export用法
export default api
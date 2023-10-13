import api from '@/common/requests/axiosInstance.js'
import { ElMessage } from 'element-plus'

export const postApi = async (url,data)=>{
    try{
      const res = await api.post(url,data)
      return res.data
    }catch(error){
      // 处理请求错误
      console.error(error);
      ElMessage({
        message: error.msg,
        type: 'error',
      })
    }
  }
  
export const getApi = async (url)=>{
    try{
      const res = await api.get(url)
      return res.data
    }catch(error){
      // 处理请求错误
      console.error(error);
      ElMessage({
        message: error.msg,
        type: 'error',
      })
    }
  }
  
export const delApi = async (url)=>{
    try{
      const res = await api.delete(url)
      return res.data
    }catch(error){
      // 处理请求错误
      console.error(error);
      ElMessage({
        message: error.msg,
        type: 'error',
      })
    }
  }
  
export const putApi = async (url,data)=>{
    try{
      const res = await api.put(url,data)
      return res.data
    }catch(error){
      // 处理请求错误
      console.error(error);
      ElMessage({
        message: error.msg,
        type: 'error',
      })
    }
  }
  
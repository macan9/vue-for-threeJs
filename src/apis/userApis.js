import api from '@/common/requests/axiosInstance.js'
import { ElMessage } from 'element-plus'

// 用户登录
export const loginReq = async (data)=>{
  return await postApi('/api/v1/login/',data)
}

// 用户注册
export const registerReq = async (data)=>{
  return await postApi('/api/v1/users/register/',data)
}

// 用户查询
export const userListGet = async ()=>{
  return await getApi('/api/v1/users/list/')
}

// 个人信息查询
export const userInfoGet = async ()=>{
  return await getApi('/api/v1/users/a4a2b2f1-2033-4af5-8116-6eedfc5dc3ad/')
}





const postApi = async (url,data)=>{
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

const getApi = async (url)=>{
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



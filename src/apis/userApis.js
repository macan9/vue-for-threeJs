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

// 用户列表查询
export const userListGet = async ()=>{
  return await getApi('/api/v1/users/list/')
}

// 个人信息查询
export const userInfoGet = async (id)=>{
  return await getApi(`/api/v1/users/detail/${id}/`)
}

// 个人信息修改
export const userInfoPut = async (id,data)=>{
  return await putApi(`/api/v1/users/detail/${id}/`,data)
}

// 用户删除
export const userDelete = async (id)=>{
  return await delApi(`/api/v1/users/delete/${id}/`)
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

const delApi = async (url)=>{
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

const putApi = async (url,data)=>{
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



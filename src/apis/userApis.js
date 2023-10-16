import { postApi, getApi, delApi, putApi } from '@/common/requests/requests.js'

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

// 用户登录日志
export const userLogGet = async (pageData)=>{
  return await getApi(`/api/v1/users/login_log/?page=${pageData.currentPage}&page_size=${pageData.pageSize}`)
}


const owner = 'mc150324'
const repo = 'PicGo'
const path = "img"
const access_token = "d18bdb11f5111a41281baef050f7933d"
// gitee 上传图片
export const uploadUserAvatarReq = async (file,name)=>{
  const data_ = {
    content: file ,
    access_token,
    message:"图床测试"
  }
  return await postApi(`/gitee/api/v5/repos/${owner}/${repo}/contents/${path}/${name}`,data_)
}

// gitee 获取图片列表
export const getGiteeImgList =  async () => {
  return await getApi(`/gitee/api/v5/repos/${owner}/${repo}/contents/${path}?access_token=${access_token}`)
}










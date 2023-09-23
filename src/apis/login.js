import api from '@/common/requests/axiosInstance.js'

export const loginReq = async (data)=>{
  try{
    // console.log(data,'login.js')
    const res = await api.post('/login',data)
    // console.log(res,'login.js')
    return res
  }catch(error){
     // 处理请求错误
     console.error(error);
  }
  
}



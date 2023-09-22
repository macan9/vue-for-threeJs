import api from '@/common/requests/axiosInstance.js'

export const loginReq = async ()=>{
  const { res } = await api.get('/login')
  return res
}



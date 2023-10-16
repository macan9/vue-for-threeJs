import api from '@/common/requests/axiosInstance.js'

export const postApi = async (url,data)=>{
  try{
    const res = await api.post(url,data)
    return res.data
  }catch(error){
    console.error(error);
  }
}
  
export const getApi = async (url)=>{
  try{
    const res = await api.get(url)
    return res.data
  }catch(error){
    console.error(error);
  }
}
  
export const delApi = async (url)=>{
  try{
    const res = await api.delete(url)
    return res.data
  }catch(error){
    console.error(error);
  }
}
  
export const putApi = async (url,data)=>{
  try{
    const res = await api.put(url,data)
    return res.data
  }catch(error){
    console.error(error);
  }
}
  
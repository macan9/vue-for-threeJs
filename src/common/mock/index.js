import Mock from "mockjs";
import { globals_config } from '/public/config/globals_config'
const baseURL = globals_config.host_service

import { userList } from './userList.js'

/** get请求
 * 获取用户列表
 */

Mock.mock(`${baseURL}/login`,'post',(options)=>{
  const backData = {
    status: 2,
    message: "用户不存在",
    token: null
  }
  console.log(userList,options,'userList')
  const body =JSON.parse(options.body) 
  userList.map(i=>{
    if(body.username == i.username){
      if(body.password == i.password){
        
        backData.status = 200
        backData.message = "登录成功"
        backData.token = Mock.Random.string(30)
        backData.username = body.username
      }else{
        backData.message = "密码错误"
      }
    }
  })
  return backData
})








Mock.mock("/api/users/person", {
  name: "@name", // 随机生成姓名
  "age|1-10": 5, // 随机生成1-10的数字
  color: "@color", // 随机生成颜色
});

/* get请求
 * 获取用户姓名
 */
Mock.mock("/api/users/name", {
  name: {
    first: "@FIRST",
    middle: "@FIRST",
    last: "@LAST",
    full: "@first @middle @last",
  },
});

/** get请求
 * 获取一个随机生成的数组，这个数组里面的对象是中国所有的省份
 */
Mock.mock("/api/users/array", {
  "array|1-10": [
    {
      name: "@province",
    },
  ],
});

/** get请求
 * 获取一个随机生成的文本
 */
Mock.mock("/api/users/text", {
  text: "@cparagraph",
});
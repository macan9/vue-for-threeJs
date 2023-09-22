import Mock from "mockjs";

/** get请求
 * 获取用户列表
 */

Mock.mock("http://localhost:8010/login",{
  name: "@name", // 随机生成姓名
  "age|1-10": 5, // 随机生成1-10的数字
  color: "@color", // 随机生成颜色
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
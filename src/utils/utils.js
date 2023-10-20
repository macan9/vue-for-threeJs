/* Utils（工具函数）
utils 文件夹用于存放一些通用的功能函数或工具函数，这些函数可以被项目中的不同组件或模块共享和复用
。它们通常是纯粹的 JavaScript 函数，与具体的业务逻辑无关。例如，日期格式化函数、字符串处理函数、网络请
求封装函数等都可以放在 utils 文件夹中。这样，不同的组件或模块可以通过导入这些工具函数来使用，并减少重复
代码的编写。*/

// 标准时间格式 转化成  y-m-d HH:MM:SS
export function DailyTimeFormat(standardTime){
    const date = new Date(standardTime);
    // 获取年、月、日、时、分、秒的值
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始计数的，需要加1，并补零
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // 拼接成您所需的日期时间格式
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime
}
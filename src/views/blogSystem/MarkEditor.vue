<template>
    <div class="home-view-page BlogMain">
        <div id="mark-container"></div>
    </div>
</template>

<script setup>
// # marked(markdownString [options] [callback])
// markdownString 传入 md 字符串 返回一个 html 字符串
// options是你渲染的设置——它是一个对象。
// callback是回调函数。如果 options 参数没有定义，它就是第二个参数。
import { marked }  from 'marked'
import { onMounted } from 'vue';
import "highlight.js/styles/monokai-sublime.css";  //这里有多个样式，自己可以根据需要切换

const hljs = require('highlight.js');

console.log(hljs,'--hljs--')
const rendererMD = new marked.Renderer();

marked.setOptions({ //基本设置
    renderer: rendererMD,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code,lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(lang, code).value;
        } else {
        // 否则默认使用 auto-detect 进行代码高亮
            return hljs.highlightAuto(code).value;
        }
    }
});
console.log(marked('I am using __markdown__.'));


onMounted(()=>{
    const markdownString = '### 遇到的坑\n ```javascript\n console.log("hello"); \n```';
    document.getElementById('mark-container').innerHTML = marked(markdownString);
})

</script>
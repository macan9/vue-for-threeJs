<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="@/assets/logo.png"> -->
    <!-- <button @click="loginOut"> 退出 </button>
    <br/>
    <button @click="getMockData"> 尝试请求 mock 数据 </button>
    <el-button type="primary">Primary</el-button>

    <HelloWorld msg="Welcome to Your Vue.js App"/> -->


    <MenuForTop />
    <div class="display-flex">
      <MenuForLeft />
      <div class="main-display">
        <router-view/>
      </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import MenuForTop from '@/components/menu/MenuForTop.vue'
import MenuForLeft from '@/components/menu/MenuForLeft.vue'

import { loginReq } from "@/apis/login.js"
export default {
  name: 'HomeView',
  components: {
    MenuForTop,
    MenuForLeft,
  },
  setup(){

    const getMockData = () => {
        loginReq()
    }
    return {
      getMockData
    };
  }
}
</script>
<style lang="scss">
.home{
  height: 100%;
  .display-flex{
    height: calc(100% - 60px);
    display: flex;
  }
  .main-display{
    width: calc(100% - 230px);
  }
}
</style>

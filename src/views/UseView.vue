<template>
  <div class="use-home">

    <MenuForTop @update-menu-value="setTopMenuValue" />

    <div class="display-flex">

      <MenuForLeft :topMenuValue="topMenuValue" />

      <div class="main-display">
        xxx
      </div>
      
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import MenuForTop from '@/components/menu/MenuForTop.vue'
import MenuForLeft from '@/components/menu/MenuForLeft.vue'
import { ref, watch } from 'vue';


export default {
  name: 'HomeView',
  components: {
    MenuForTop,
    MenuForLeft,
  },
  setup(){

    const menuVal = localStorage.getItem('topMenuValue')
    const topMenuValue = menuVal ? ref(menuVal) : ref('1')

    const setTopMenuValue = (val) => {
      topMenuValue.value = val
    }

    watch(() => topMenuValue.value, () => {
        localStorage.setItem('topMenuValue',topMenuValue.value)
    });

    const getMockData = () => {
    }

    return {
      topMenuValue,
      getMockData,
      setTopMenuValue,
    };
  }
}
</script>
<style lang="scss">
.use-home{
  height: 100%;
  .display-flex{
    height: calc(100% - 60px);
    display: flex;
  }
  .main-display{
    width: calc(100% - 230px);
    padding: 10px;
  }
  // 子页面样式1
  .use-home-view-page{
     border: 1px solid gainsboro;
     border-radius: 5px;
     box-shadow: 2px 2px 8px gray;
     height: 100%;
  }
}
</style>

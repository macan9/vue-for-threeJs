<template>
  <div class="home">

    <MenuForTop @update-menu-value="setMenuValue" />

    <div class="display-flex">

      <MenuForLeft :topMenuValue="topMenuValue" />

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
import { ref } from 'vue';


export default {
  name: 'HomeView',
  components: {
    MenuForTop,
    MenuForLeft,
  },
  setup(){

    const topMenuValue = ref('1')
    
    const getMockData = () => {
    }
    const setMenuValue = (val) => {
      topMenuValue.value = val
    }

    return {
      topMenuValue,
      getMockData,
      setMenuValue,
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

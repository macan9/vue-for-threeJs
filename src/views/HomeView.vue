<template>
  <div class="home">

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


export default {
  name: 'HomeView',
  components: {
    MenuForTop,
    MenuForLeft,
  },
  setup(){

    const getMockData = () => {
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

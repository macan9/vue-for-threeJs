<template>
    <div class="login-page1">
        <form method="post" @submit="handleSubmit" class="box">
            <h1>Login</h1>
            <br>
            <hr>
            <input type="text" name="username" placeholder="Username">
            <input type="password" name="password" placeholder="Password">
            <input type="submit">
            <p>Forget password ?</p>
        </form>
    </div>
</template>
<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
export default {
    
    setup(){
        
        
        
        const store = useStore()
        const updateLoginStatus = () => {
            store.commit('updateLoginStatus')
        }

        const router = useRouter();
        function handleSubmit(){
            router.push('/home')
            updateLoginStatus()
        }

        return {
            handleSubmit
        };
    }
}
</script>
<style lang="scss" scope>
.title{
  color: #fff;
}
</style>
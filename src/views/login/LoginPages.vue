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
export default {
    setup(){
        const router = useRouter();
        function handleSubmit(){
            console.log('11111---')
            router.push('/')
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
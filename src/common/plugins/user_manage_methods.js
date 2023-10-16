
import router from "@/router/index.js";
export const loginOut = () => {
    // store.commit('updateLoginStatus')
    localStorage.setItem('loginStatus', '');
    localStorage.setItem('userInfo', '');
    router.push('/login')
}
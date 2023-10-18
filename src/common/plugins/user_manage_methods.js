
import router from "@/router/index.js";
export const loginOut = () => {
    // store.commit('updateLoginStatus')
    localStorage.setItem('loginStatus', '');
    localStorage.setItem('userInfo', '');
    localStorage.setItem('giteeConfig', '');
    localStorage.setItem('activeLeftMenu', '');
    router.push('/login')
}
import router from "../router";
import useMyInfoStore from '@/store/myinfo.js';
let myInfoStore = null

router.beforeEach((to, from, next) => {
    myInfoStore = useMyInfoStore()
    if (to.path == '/login') {
        next()
    } else {
        if (sessionStorage.getItem('token')) {
            myInfoStore.login = false
            next()
        } else if (from.path == '/' && to.path == '/home/index') {
            next()
            myInfoStore.login = true
        } else {
            myInfoStore.login = true
            next(false)
        }
    }
})
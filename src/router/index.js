import { createRouter ,createWebHashHistory} from "vue-router";

export default createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path:'/',
            redirect:'/home/index'
        },
        {
            path:'/home',
            component:()=>import('@/layout/index.vue'),
            children: [
                {
                    path:'index',
                    component: () => import('@/view/Main/home.vue')
                },
                {
                    path: 'drama',
                    component: () => import('@/view/Main/drama.vue')
                },
                {
                    path: 'news',
                    component: () => import('@/view/Main/news.vue')
                },
                {
                    path: 'my',
                    component: () => import('@/view/Main/my.vue')
                },
            ]
        },
        {
            path: '/search',
            component: () => import('@/view/Search/index.vue'),
        },
        {
            path: '/detail',
            component: () => import('@/view/Detail/index.vue'),
        },
        {
            path: '/login',
            component: () => import('@/view/Login/index.vue'),
        },
        {
            path: '/userChat',
            component: () => import('@/view/Chat/index.vue'),
        },
        {
            path: '/groupChat',
            component: () => import('@/view/Chat/group.vue'),
        },
        {
            path: '/system',
            component: () => import('@/view/Chat/system.vue'),
        },
        {
            path:'/publish',
            component: () => import('@/view/Publish/index.vue'),
        },
        {
            path:'/user',
            component: () => import('@/view/Detail/UserDetail.vue'),
        },
        {
            path: '/group',
            component: () => import('@/view/Detail/GroupDetail.vue'),
        },
    ],
})
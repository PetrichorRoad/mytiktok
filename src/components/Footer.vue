<template>
    <div class="footer">
        <ul>
            <li v-for="(item, index) in footer" :key="item" :class="{ active: $route.path == item.path }" @click="changeBar(item.path)">
                <i :class="['fa', item.icon, index == 2 ? 'middle' : '']"></i>
                <span>{{ item.text }}</span>
            </li>

        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
let footer = ref([
    { text: '首页', icon: 'fa-home', path: '/home/index' },
    { text: '短剧', icon: 'fa-tv', path: '/home/drama' },
    { text: '', icon: 'fa-plus-square',path:'/publish'},
    { text: '消息', icon: 'fa-paper-plane', path: '/home/news' },
    { text: '我的', icon: 'fa-user', path: '/home/my' }
])
let $router = useRouter()
const changeBar = (path) => {
    $router.push(path)
}
</script>

<style lang="scss" scoped>
.footer {
    width: 100%;
    height: 10vh;
    background-color: #2193b0;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 2% 3%;

    ul {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        li {
            width: 20%;
            height: 90%;
            // border:1px solid pink;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .fa {
                font-size: 20px;
                width: 30px;
                height: 50%;
                text-align: center;
                color: #6dd5ed;
            }

            span {
                // display: none;
                margin-top: 5px;
                font-size: 12px;
                color: #fff;
                // line-height: 20px;
            }

            .middle {
                font-size: 30px;
            }
        }

        .active {
            color: #fff;
            background-color: #45acc6;
            border-radius: 5px;
        }
    }
}
</style>
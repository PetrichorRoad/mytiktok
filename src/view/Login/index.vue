<template>
    <div>
        <div class="tabs">
            <div class="tab" :class="{ active: activeTab === false }" @click="activateTab()">注册</div>
            <div class="tab" :class="{ active: activeTab === true }" @click="activateTab()">登录</div>
        </div>
        <div class="logo">
            <span class="april">四月</span>物<span class="story">语</span>
        </div>
        <div class="form">
            <form v-if="activeTab === false" @submit.prevent="register">
                <h2>注册</h2>
                <!-- 注册表单内容 -->
                <input type="text" placeholder="用户名" v-model="registerForm.username">
                <input type="email" placeholder="用户名" v-model="registerForm.email">
                <input type="password" placeholder="密码" v-model="registerForm.password">
                <input type="password" placeholder="密码" v-model="registerForm.surePassword">
                <button type="submit">注册</button>
            </form>
            <form v-else @submit.prevent="login">
                <h2>登录</h2>
                <!-- 登录表单内容 -->
                <input type="text" placeholder="用户名" v-model="loginForm.userid">
                <input type="password" placeholder="密码" v-model="loginForm.password">
                <button type="submit">登录</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { reqLogin, reqUserinfo } from '@/api/index';
import useMyInfoStore from '@/store/myinfo.js';
import { useRouter } from 'vue-router';

let $router = useRouter()
let myInfoStore = useMyInfoStore()
let activeTab = ref(true);
let registerForm = ref({ username: '', password: '', email: '', surePassword: '' });
let loginForm = ref({ userid: '3189471071', password: '123456' });

const activateTab = () => {
    activeTab.value = !activeTab.value;
};

const register = () => {
    // 处理注册逻辑
    // console.log('注册', registerForm.value);
    // 清空注册表单
    registerForm.value.username = '';
    registerForm.value.password = '';
};

const login =async () => {
    let result = await reqLogin(loginForm.value)
    if (result.status == 0) {
        sessionStorage.setItem('token', result.token)
        sessionStorage.setItem('myinfo', JSON.stringify(result.data))
        myInfoStore.changeMyInfo(result.data)
        $router.push('/')
    }
};
</script>

<style lang="scss" scoped>
.tabs {
    display: flex;

    .tab {
        flex: 1;
        text-align: center;
        padding: 10px;
        background-color: #f2f2f2;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        color: #333;
        border-radius: 10px 10px 0 0;
    }

    .tab:hover {
        background-color: #e9e9e9;
    }

    .tab.active {
        background-color: #ccc;
    }
}


.logo {
    font-family: Arial, sans-serif;
    font-size: 48px;
    font-weight: bold;
    color: #3498db;
    /* 蓝色 */
    text-transform: uppercase;
    text-align: center;
    padding: 20px;

    .april {
        color: #e74c3c;
        /* 红色 */
    }

    .story {
        color: #f39c12;
        /* 橙色 */
    }
}


.form {
    padding: 20px;
}

h2 {
    margin-bottom: 10px;
    color: #333;
    font-size: 20px;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
    background-color: #f2f2f2;
    color: #333;
    font-size: 16px;
    outline: none;
}

button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #ffcc00;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    outline: none;
}

button:hover {
    background-color: #ffa500;
}
</style>
<template>
  <div class="login" v-show="myInfoStore.login">
    <img src="@/assets/vue.svg" alt="" class="brand-logo" />
    <div class="brand-title">四月物语</div>
    <div class="inputs" v-show="scene">
      <label for="">邮箱</label>
      <input type="email" placeholder="请输入邮箱" v-model="loginForm.userid" />
      <label for="">密码</label>
      <input type="password" placeholder="请输入密码" v-model="loginForm.password"/>
      <button @click="login">登录</button>
      <p @click="scene = !scene"  style="margin-top:10px;">没有帐号</p>
    </div>
    <div class="inputs" v-show="!scene">
      <label for="">邮箱</label>
      <input type="email" placeholder="请输入邮箱" v-model="regForm.email" />
      <label for="">昵称</label>
      <input type="email" placeholder="请输入昵称" v-model="regForm.nickname" />
      <label for="">密码</label>
      <input type="password" placeholder="请输入密码" v-model="regForm.password"/>
      <label for="">密码</label>
      <input type="password" placeholder="请确认密码" v-model="regForm.confirm"/>
      <button @click="register">注册</button>
      <p @click="scene = !scene" style="margin-top:10px;">已有帐号</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useMyInfoStore from '@/store/myinfo.js';
import useVideoPlayerStore from "@/store/VideoPlayer.js";
import { reqLogin } from '@/api/index';
import { useRouter } from 'vue-router';
let $router = useRouter()
let myInfoStore = useMyInfoStore()
let VideoPlayerStore = useVideoPlayerStore();

let scene = ref(true)
let loginForm = ref({ userid: '3189471071', password: '123456' });
let regForm = ref({ email: '3189471071@qq.com',nickname:'', password: '123456',confirm:'123456' })
const login =async () => {
    let result = await reqLogin(loginForm.value)
    if (result.status == 0) {
        sessionStorage.setItem('token', result.token)
        sessionStorage.setItem('myinfo', JSON.stringify(result.data))
        myInfoStore.changeMyInfo(result.data)
        VideoPlayerStore.addWorksList()
        myInfoStore.login = false
    }
};
const register = async ()=>{

}
</script>

<style lang="scss" scoped>
.login {
  margin: 0;
  padding: 5%;
  position: absolute;
  z-index: 999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  background-color: #ecf0f3;
  box-shadow: 10px 10px 30px 0px rgb(124, 134, 124),
    inset -8px -8px 16px 0px rgba(117, 133, 117, 0.7),
    inset 0px 14px 28px 0px hsl(120, 20%, 95%);
  border-radius: 10px;
  .brand-logo {
    display: block;
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
    margin: 0 auto;
    box-shadow: 7px 7px 10px #cbced1, -7px -7px 10px white;
  }
  .brand-title {
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    letter-spacing: 2px;
    color: aquamarine;
    font-weight: bolder;
  }
  .inputs {
    text-align: left;
    padding: 2%;
    label,
    input,
    button {
      display: block;
      width: 100%;
      border: none;
      outline: none;
      margin-top: 5px;
    }
    input::placeholder {
        color: gray;
    }
    input{
        padding: 8px 5px 8px 5px;
        font-size: 14px;
        border-radius: 10px;
        background-color: #ecf0f3;
        box-shadow: inset 2px 2px 2px #cbced1,inset -2px -2px 2px white;
        // 光标颜色
        caret-color: #1da1f2;
    }
    button{
        margin-top: 15px;
        height: 40px;
        border-radius: 10px;
        color: white;
        background-color: #1da1f2;
        box-shadow:  4px 4px 4px #cbced1, -6px -6px 6px white;
    }
  }
}
</style>
<template>
    <div class="user">
        <!-- {{ user[0].avatar }} -->
        <div class="top">
            <i class="fa fa-chevron-left" @click="$router.go(-1)"></i>
        </div>
        <div class="user-info">
            <img :src="user.avatar" alt="">
            <button class="edit button">编辑资料</button>
            <button class="plus button" style="background-color: #AF2031;" @click="Apply">+朋友</button>
        </div>
        <div class="introduce">
            <div class="nickname">{{ user.nickname }}</div>
            <div class="id">邮箱：{{ user.email }}</div>
            <div class="suggest">
                {{ user.explain }}
            </div>
        </div>
        <div class="sceneBar">
            <span :class="{ current: scene == 0 }" @click="changeScene(0)">作品</span>
            <span :class="{ current: scene == 1 }" @click="changeScene(1)">喜欢</span>
        </div>
        <VideoList />
    </div>
</template>

<script setup>
import VideoList from '@/components/VideoList.vue'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import useMyInfoStore from '@/store/myinfo.js';
import { reqFriendInfo, applyFriend } from '@/api/index';
let myInfoStore = useMyInfoStore()
let $route = useRoute()
let user = ref({})
let scene = ref(0)

const changeScene = (sceneID) => {
    scene.value = sceneID
}
const getUserInfo = async ()=>{
    let result = await reqFriendInfo($route.query.userID)
    if(result.status == 0){
        // console.log(result.data);
        user.value = result.data
    }
}
const Apply = async ()=>{
    let applyInfo = {
        friendID: $route.query.userID,
        content:`${myInfoStore.MyInfo.nickname}申请你为好友`,
        type:0,
        state:0
    }
    let result = await applyFriend(applyInfo)
    // console.log(result);
    // if(result.status===0){
        
    // }
}
onMounted(()=>{
    getUserInfo()
})
</script>

<style lang="scss" scoped>
.user {
    width: 100vw;
    height: 100vh;
    background-color: #45acc6;

    .top {
        height: 10vh;
        border-bottom: 1px solid #ddd;
        display: flex;
        align-items: center;
        padding-left: 20px;
        font-size: 24px;
    }
    .user-info {
        height: 20%;
        display: flex;
        align-items: center;

        img {
            width: 20%;
            height: 60%;
            border-radius: 50%;
            margin: 0 5%;
            border: 2px solid #fff;
        }

        .button {
            height: 6vh;
            background-color: #ccc;
            line-height: 6vh;
            text-align: center;
            color: #7f7f7f;
            border: none;
            border-radius: 4px;
        }

        .edit {
            width: 35%;
            margin-right: 2%;
        }

        .plus {
            width: 20%;
        }

    }

    .introduce {
        height: 30%;
        padding: 0 5%;
        color: #FBFBFB;

        .nickname {
            color: #fff;
            font-size: 22px;
            font-weight: 600;
            padding: 2% 0;
        }

        .id {
            font-size: 14px;
        }

        .suggest {
            margin-top: 10px;
            font-size: 16px;
            line-height: 20px;
            height: 68%;
            overflow: hidden;
            -webkit-line-clamp: 6;
            text-overflow: ellipsis;
        }
    }

    .sceneBar {
        height: 5vh;
        // background-color: pink;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: gray;

        span {
            width: 50%;
            height: 5vh;
            line-height: 5vh;
            text-align: center;
        }

        .current {
            border-bottom: 2px solid #fff;
            color: #fff;
        }
    }
}
</style>
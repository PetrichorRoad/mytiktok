<template>
    <div class="my">
        <div class="user-info">
            <img :src="myinfo.avatar" alt="">
            <div class="edit button">编辑资料</div>
            <div class="plus button">+朋友</div>
        </div>
        <div class="introduce">
            <div class="nickname">{{ myinfo.nickname }}</div>
            <div class="id">邮箱：{{ myinfo.email }}</div>
            <div class="suggest">
                {{ myinfo.explain }}
            </div>
        </div>
        <div class="sceneBar">
            <span :class="{ current: scene == 0 }" @click="changeScene(0)">作品</span>
            <span :class="{ current: scene == 1 }" @click="changeScene(1)">喜欢</span>
        </div>
        <VideoList/>
    </div>
</template>

<script setup>
import {  ref } from 'vue';
import VideoList from '@/components/VideoList.vue'
import useMyInfoStore from '@/store/myinfo.js';

let myInfoStore = useMyInfoStore()
let myinfo = myInfoStore.MyInfo
let scene = ref(0)
const changeScene = (sceneID) => {
    scene.value = sceneID
}

</script>

<style lang="scss" scoped>
.my {
    width: 100%;
    height: 100%;
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    background-color: #45acc6;

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
}</style>
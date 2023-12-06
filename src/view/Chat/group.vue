<template>
    <div class="group" v-if="chatMessage.length > 0">
        <div class="top">
            <i class="fa fa-chevron-left" @click="$router.go(-1)"></i>
            <img :src="chatMessage[0].groupImg" class="avatar" alt="">
            <div class="title">{{ chatMessage[0].groupName }}</div>
            <i class="fa fa-phone-square"></i>
            <i class="fa fa-navicon" @click.stop="GoGroup($route.query.groupID)"></i>
        </div>
        <div class="content">
            <div class="public" :class="item.userID == myInfoStore.MyInfo.userID ? 'left' : 'right'"
                v-for="(item, index) in chatMessage[0].chatList" :key="index">
                <template v-if="item.userID == myInfoStore.MyInfo.userID">
                    <img :src="item.avatar" alt="" class="avatar">
                    <div class="news" v-if="item.type==0">{{ item.content }}</div>
                    <img v-if="item.type==1" :src="item.content" alt="" class="image">
                </template>
                <template v-else>
                    <div class="news" v-if="item.type==0">{{ item.content }}</div>
                    <img v-if="item.type==1" :src="item.content" alt="" class="image">
                    <img :src="item.avatar" alt="" class="avatar">
                </template>
            </div>
        </div>
        <ChatInput/>
    </div>
</template>

<script setup>
import ChatInput from '@/components/ChatInput.vue';
import useMyInfoStore from '@/store/myinfo.js';
import {  ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
let myInfoStore = useMyInfoStore()
let $route = useRoute()
let $router = useRouter()
let chatMessage = ref(myInfoStore.GroupList.filter((item) => {
    return item.groupID == $route.query.groupID
}))
const GoGroup = (groupID) => {
    $router.push({ path: '/group', query: { groupID: groupID } })
}

myInfoStore.$subscribe((mutation, state) => {
    chatMessage.value = state.GroupList.filter((item) => {
        return item.groupID == $route.query.groupID
    })
})
</script>

<style lang="scss" scoped>
.group {
    width: 100vw;
    height: 100vh;
    position: relative;

    .top {
        width: 100%;
        height: 10%;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .avatar {
            width: 14%;
            height: 70%;
            border-radius: 50%;
        }

        .title {
            width: 50%;
            font-size: 18px;
            font-weight: 600;
        }

        .fa {
            font-size: 24px;
        }
    }

    .content {
        width: 100%;
        height: 82%;
        overflow: scroll;
        padding: 2%;

        .timer {
            font-size: 12px;
            line-height: 20px;
            text-align: center;
        }

        .public {
            display: flex;
            align-items: center;
            padding: 2% 0;

            .avatar {
                width: 50px;
                width: 50px;
                border-radius: 50%;
            }
            .image{
                max-width: 50%;
                height: auto;
            }

            .news {
                max-width: 65%;
                line-height: 22px;
                padding: 2%;
                border-radius: 5px;
            }
        }

        .left {
            justify-content: start;

            .news {
                margin-left: 10px;
                background-color: #ccc;
            }
        }

        .right {
            justify-content: end;

            .news {
                margin-right: 10px;
                background-color: #45ACC6;
            }
        }
    }
}
</style>
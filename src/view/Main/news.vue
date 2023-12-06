<template>
    <div class="message">
        <!-- 好友申请 -->
        <div class="item" v-if="myInfoStore.applyList.length > 0" @click="$router.push({ path: '/system' })">
            <img src="http://127.0.0.1:5500/static/avatar/FAZE.png" alt="">
            <div class="info">
                <div class="top">
                    <span>系统通知</span>
                    <span>{{ new Date().toLocaleDateString() }}</span>
                </div>
                <div class="content">好友申请</div>
            </div>
        </div>
        <!--个人聊天 -->
        <div class="item" v-for="item in myInfoStore.MessageList" :key="item.id"
            @click="$router.push({ path: '/userChat', query: { friendID: item.userID } })">
            <img :src="item.avatar" alt="" @click.stop="GoUser(item.userID)">
            <div class="info">
                <div class="top">
                    <span class="nickname">{{ item.nickname }}</span>
                    <span>{{ item.chatMessageList[item.chatMessageList.length - 1].time.slice(0, 10) }}</span>
                </div>
                <div class="content">{{ item.chatMessageList[item.chatMessageList.length - 1].content }}</div>
            </div>
        </div>
        <!-- 群组聊天 -->
        <div class="item" v-for="item in myInfoStore.GroupList" :key="item.id"
            @click="$router.push({ path: '/groupChat', query: { groupID: item.groupID } })">
            <img :src="item.groupImg" alt="" @click.stop="GoGroup(item.groupID)">
            <div class="info">
                <div class="top">
                    <span class="nickname">{{ item.groupName }}</span>
                    <span>{{ item.chatList.length > 0 ? item.chatList[item.chatList.length - 1].time.slice(0, 10)
                        : '' }}</span>
                </div>
                <div class="content">{{ item.chatList.length > 0 ? item.chatList[item.chatList.length - 1].content : '' }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import useMyInfoStore from '@/store/myinfo.js';
import socket from '../../utils/socket';
import { useRouter } from 'vue-router';

let $router = useRouter()
let myInfoStore = useMyInfoStore()


const GoUser = (userID) => {
    $router.push({ path: '/user', query: { userID: userID } })
}
const GoGroup = (groupID) => {
    $router.push({ path: '/group', query: { groupID: groupID } })
}

onMounted(() => {
    myInfoStore.changeMessageList()
    myInfoStore.changeGroupList()
    socket.emit('login', myInfoStore.MyInfo.userID)
    myInfoStore.GroupList.forEach((item) => {
        socket.emit('Group', item.groupID)
    })
})


</script>

<style lang="scss" scoped>
.message {
    width: 100%;
    height: 100%;

    .item {
        width: 100%;
        height: 10vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 3%;

        img {
            width: 18%;
            height: 80%;
            border-radius: 50%;
        }

        .info {
            flex: 1;
            height: 80%;
            padding: 1% 5%;
            overflow: hidden;

            .top {
                display: flex;
                justify-content: space-between;
                align-items: center;
                line-height: 30px;

                .nickname {
                    font-size: 18px;
                    font-weight: 600;
                }
            }

            .content {
                font-size: 14px;
                line-height: 20px;
                color: #7f7f7f;
            }
        }
    }
}
</style>
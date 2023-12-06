<template>
    <div class="group-detail">
        <div class="top">
            <i class="fa fa-chevron-left" @click="$router.go(-1)"></i>
        </div>
        <div class="card name">
            <img width="50" height="50" :src="groupInfo[0].groupImg" alt="">
            <div class="groupName">{{ groupInfo[0].groupName }}</div>
        </div>
        <div class="card" >
                <div class="title">群应用</div>
                <div class="application"></div>
            </div>
        <div class="card">
            <div class="title">群成员</div>
            <div class="userlist">
                <div class="user" v-for="item in userlist" :key="item.userID">
                    <img width="50" height="50" :src="item.avatar" alt="">
                    <span>{{ item.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reqGroupUserByID } from '@/api/index';
import useMyInfoStore from '@/store/myinfo.js';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

let $route = useRoute()
let myInfoStore = useMyInfoStore()
let userlist = ref([])
let groupInfo = myInfoStore.GroupList.filter((item) => {
    return item.groupID == $route.query.groupID
})
const getGroupUserByID = async () => {
    let result = await reqGroupUserByID($route.query.groupID)
    if (result.status == 0) {
        userlist.value = result.data
    }
}
onMounted(() => {
    getGroupUserByID()
})

</script>

<style lang="scss" scoped>
.group-detail {
    width: 100vw;
    height: 100vh;
    background-color: #45acc6;
    overflow: scroll;
    .top {
        height: 10vh;
        border-bottom: 1px solid #ddd;
        display: flex;
        align-items: center;
        padding-left: 20px;
        font-size: 24px;
    }

    .name {
        display: flex;
        align-items: center;
        height: 10vh;
    }

    .card {
        width: 98%;
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
        margin: 1%;
        box-sizing: border-box;

        img {
            border-radius: 50%;
            margin: 2%;
        }

        .groupName {
            margin-left: 20px;
            font-weight: 600;
        }

        .title {
            font-weight: 600;
            padding: 2%;
        }

        .user {
            display: flex;
            align-items: center;
        }
        .application{
            height: 20vh;
        }
    }

}</style>
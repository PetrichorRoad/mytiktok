<template>
    <div class="system">
        <div class="top">
            <i class="fa fa-chevron-left" @click="$router.go(-1)"></i>
            <img src="http://127.0.0.1:5500/static/avatar/FAZE.png" class="avatar" alt="">
            <div class="title">好友申请</div>
            <i class="fa fa-phone-square"></i>
            <i class="fa fa-navicon"></i>
        </div>
        <div class="content">
            <div class="item" v-for="item in myInfoStore.applyList" :key="item">
                <div class="content">{{ item }}申请你为好友</div>
                <div class="button">
                    <button @click="agree(item)">同意</button>
                    <button @click="refuse(item)">拒绝</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import useMyInfoStore from '@/store/myinfo.js';
import { agreeFriendApply, refuseFriendApply } from '@/api/index';
let myInfoStore = useMyInfoStore()
const agree = async (friendID)=>{
    let result  = await agreeFriendApply({ friendID: friendID ,content:'我们已是好友'})
    if(result.status == 0){
        console.log('ok');
    }
}
const refuse =async (friendID) => {
    let result = await refuseFriendApply(friendID)
    if(result.status == 0){
        console.log('ok');
    }
}
</script>

<style lang="scss" scoped>
.system {
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
        height: 90%;
        overflow: scroll;
        padding: 2%;
        .item{
            .content{
                text-align: center;
                background-color: #DA70D6;
            }
            button{
                width: 50%;
            }
        }
    }
}
</style>
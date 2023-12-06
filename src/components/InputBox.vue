<template>
    <div class="input-box">
        <input type="text" class="input" placeholder="善于结善缘，恶语伤人心" v-model="content">
        <button class="button"><i class="fa fa-paper-plane" type="button" @click="handleSend"></i></button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { addComments } from '@/api/index';
import useVideoPlayerStore from '@/store/VideoPlayer.js';
import useMyInfoStore from '@/store/myinfo.js';
// 仓库实例
let VideoPlayerStore = useVideoPlayerStore()
let myInfoStore = useMyInfoStore()

let content = ref('')
const handleSend =async ()=>{
    // 先渲染出来
    VideoPlayerStore.commentList.unshift({
        avatar: myInfoStore.MyInfo.avatar,
        content:content.value,
        nickname: myInfoStore.MyInfo.nickname,
        worksID: VideoPlayerStore.currentWorksID,
        userID: myInfoStore.MyInfo.userID,
        id:Math.random(),     
    })
    // 在存入数据库
    let result = await addComments(VideoPlayerStore.currentWorksID, content.value)
    if(result.status == 0){
        // 清空输入框
        content.value = ''
    }
    
}
</script>

<style lang="scss" scoped>
.input-box{
    border-top: 1px solid #ddd;
    position: absolute;
    bottom: 10vh;
    left: 0;
    width: 100%;
    height: 8%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2%;
    .input{
        flex: 1;
        height: 100%;
        background-color: #EFEFEF;
        border: 0;
        border-radius:5px 0 0 5px;
        text-indent: 10px;
    }
    .button{
        width: 50px;
        height: 100%;
        border: none;
        color: #45ACC6;
    }
}
</style>
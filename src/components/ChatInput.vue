<template>
    <div class="input-box">
        <div class="top">
            <input type="text" class="input" placeholder="善于结善缘，恶语伤人心" :disabled="preview" v-model="msgInfo.content">
            <button class="button"><i class="fa fa-smile" type="button"></i></button>
            <button class="button"><i class="fa fa-plus-circle" type="button" @click="isPlus=!isPlus"></i></button>
            <button class="button"><i class="fa fa-paper-plane" type="button" @click="handleSend"></i></button>
        </div>
        <div class="container" v-show="isPlus">
            <div class="image" @click="handleFileSend"><i class="fa fa-file-image" type="button"></i></div>
            <div class="video" @click="handleFileSend"><i class="fa fa-file-video" type="button"></i></div>
            <div class="audio" @click="handleFileSend"><i class="fa fa-file-audio" type="button"></i></div>
            <div class="file"><img :src="preview" v-show="preview" alt="" width="50" height="50"></div>
        </div>
        <!-- 选择文件图片 -->
        <input type="file" ref="uploadFile" id="files" style="display:none" @change="handleFileChange">
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { sendMsg, sendGroupMsg,sendImage } from '@/api/index';
import PopMessage from '../utils/popmsg';
import socket from '../utils/socket';
import useMyInfoStore from '@/store/myinfo.js';
let myInfoStore = useMyInfoStore()
let $route = useRoute()
let msgInfo = ref({
    friendID:$route.query.friendID||'',
    groupID: $route.query.groupID ||'',
    content:'',
    type:0,
    state:0
})
// inputFile标签
let uploadFile = ref(null)
let preview = ref(null)
let isPlus = ref(false)
const handleSend = async () => {
    // 发一对一消息
    if($route.query.friendID){
        let result = await sendMsg(msgInfo.value)
        if (result.status == 0) {
            myInfoStore.MessageList.forEach((item) => {
                if (item.userID == $route.query.friendID) {
                    item.chatMessageList.push({ friendID: $route.query.friendID, userID: myInfoStore.MyInfo.userID, content: msgInfo.value.content, type: msgInfo.value.type, time: Date.now().toString() })
                }
            })
            socket.emit('OneMsg', {
                fromid: myInfoStore.MyInfo.userID,
                toid: $route.query.friendID,
                content: msgInfo.value.content,
                type: msgInfo.value.type
            })
            msgInfo.value.content = ''
            preview.value = null
            isPlus.value = false
        }
    } else {
        // 发群消息
        let result = await sendGroupMsg(msgInfo.value)
        if (result.status == 0) {
            myInfoStore.GroupList.forEach((item) => {
                if (item.groupID == $route.query.groupID) {
                    item.chatList.push({ groupID: $route.query.groupID,avatar: myInfoStore.MyInfo.avatar, userID: myInfoStore.MyInfo.userID, content: msgInfo.value.content, type: msgInfo.value.type, time: Date.now().toString() })
                }
            })
            socket.emit('GroupMsg', {
                fromid: myInfoStore.MyInfo.userID,
                groupID: $route.query.groupID,
                content: msgInfo.value.content,
                type: msgInfo.value.type
            })
            msgInfo.value.content = ''
            preview.value = null
            isPlus.value = false
        }
    }
    

}
const handleFileSend =  () => {
    uploadFile.value.click()
}
const handleFileChange = async (event) => {
    // console.log(event.target.files[0]);
    let formData = new FormData()
    formData.append('image', event.target.files[0])
    let result =await sendImage(formData)
    if(result.status == 0){
        preview.value = result.data
        PopMessage({ type: 'success', str: '图片上传成功' })
        msgInfo.value.content = result.data
        msgInfo.value.type = 1
    }else{
        PopMessage({ type: 'error', str: '图片上传失败' })
    }
}
</script>
 
<style lang="scss" scoped>
.input-box {
    border-top: 1px solid #ddd;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 2%;

    .top {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .input {
            flex: 1;
            height: 100%;
            min-height: 6vh;
            background-color: #EFEFEF;
            border: 0;
            border-radius: 5px 0 0 5px;
            text-indent: 10px;
        }

        .button {
            width: 30px;
            height: 6vh;
            border: none;
            color: #45ACC6;
            font-size: 20px;
        }
    }
    .container{
        width: 100%;
        height: 8vh;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 1%;
        div{
            width: 50px;
            height: 50px;
            background-color: #ddd;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

}
</style>
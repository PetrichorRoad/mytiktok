<template>
  <RouterView/>
</template>

<script setup>
import { onMounted } from 'vue';
import socket from '@/utils/socket';
import useMyInfoStore from '@/store/myinfo.js';
let myInfoStore = useMyInfoStore()
onMounted(() => {
  // 拦截消息
  socket.on('msg', (info) => {
    // console.log(info);
    // 重新拿聊天数据
    if(info.fromid!==''){
      myInfoStore.changeMessageList()
    } else{
      console.log('fail');
    } 
  })
  socket.on('gopmsg',(info)=>{
    myInfoStore.changeGroupList()
  })
})
</script>

<style scoped></style>

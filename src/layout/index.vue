<template>
    <div class="container">
        <Login/>
        <Header/>
        <div class="main" @scroll="handleScroll">
            <RouterView/>
        </div>
        <Footer/>
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Login from '@/components/Login.vue';
import useVideoPlayerStore from '@/store/VideoPlayer.js';
import useMyInfoStore from '@/store/myinfo.js';
import { onMounted } from 'vue';
let VideoPlayerStore = useVideoPlayerStore()
let myInfoStore = useMyInfoStore()
const handleScroll = ()=>{
    let timer    
    timer = setTimeout(()=>{
        const container = document.querySelector('.main')
        if(container){
            const { scrollTop, scrollHeight, clientHeight } = container
            if (scrollTop + clientHeight >= scrollHeight) {
                console.log('ok');
                VideoPlayerStore.addWorksList()
                clearTimeout(timer)
            }
        }
    },1000)
    
}
onMounted(()=>{
    myInfoStore.getFriendApply()
})
</script>

<style lang="scss" scoped>
.container {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    position: relative;
    font-family: Arial, 'Microsoft YaHei', Helvetica, sans-serif;
    .main{
        height: 80vh;
        overflow-y:scroll ;
        scroll-snap-type:y mandatory;
        &::-webkit-scrollbar{
            display: none;
        }
    }
}
</style>
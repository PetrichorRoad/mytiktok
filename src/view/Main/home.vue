<template>
    <div class="home">
        <VideoPlayer v-for="item in VideoPlayerStore.worksList" :key="item.worksID" :worksInfo="item" />
        <Popup v-if="VideoPlayerStore.show" />
    </div>
</template>

<script setup>
import VideoPlayer from '@/components/VideoPlayer.vue';
import Popup from '@/components/Popup.vue';
import { onMounted, ref } from 'vue';
import useVideoPlayerStore from '@/store/VideoPlayer.js';

let VideoPlayerStore = useVideoPlayerStore()
onMounted(() => {
    VideoPlayerStore.addWorksList()
})
</script>

<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100%;
}
</style>
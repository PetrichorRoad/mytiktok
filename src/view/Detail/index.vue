<template>
    <div class="detail">
        <VideoPlayer :loop="true"  :src="videoSrc"/>
        <SearchBox/>
    </div>
</template>

<script setup>
import VideoPlayer from '@/components/VideoPlayer.vue';
import SearchBox from '@/components/searchBox.vue';
import videoSrc from '@/assets/test.mp4';
</script>

<style lang="scss" scoped>
.detail{
    width: 100vw;
    height: 100vh;
    position: relative;
}
</style>
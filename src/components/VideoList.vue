<template>
    <div class="videoList">
        <div class="warp" v-for="i in 10" :key="i" @click="$router.push('/detail')">
            <img :src='`https://picsum.photos/120/146?${i}`' alt="">
            <div class="describe">
                <i class="fa fa-heart"></i>
                <span>{{Math.round(Math.random() * 100)/10}}w</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

let VideoList = ref([
    
])
</script>

<style lang="scss" scoped>
.videoList{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .warp{
        width: 33%;
        height: 20vh;
        background-color: #fff;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
        .describe{
            color: #fff;
            font-size: 12px;
            position: absolute;
            left: 5px;
            bottom: 5px;
            i{
                margin-right: 5px;
            }
        }
    }
}
</style>
<template>
    <div class="header">
        <i class="fa fa-camera" style="font-size: 24px;"></i>
        <nav  v-show="$route.path == '/home/index'" v-for="(item,index) in headerBar" :key="item" class="item" @click="changeNav(index)" :class="{ active :current == index}">{{ item }}</nav>
        <i class="fa fa-search" style="font-size: 24px;" @click="$router.push('/search')"></i>
    </div>
</template>

<script setup>
import { ref } from 'vue';

let headerBar = ref(['关注','推荐'])
let current = ref(1)

const changeNav = (index)=>{
    current.value = index
}
</script>

<style scoped lang="scss">
.header{
    padding: 2%  5% 0 5%;
    width: 100%;
    height: 10vh;
    background-color: #2193b0;
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    .item{
        color:#45acc6;
        font-size: 18px;
        font-weight: 600;
        padding: 3% 0;
    }
    .active{
        border-bottom: 2px solid #fff;
        color: #fff;
    }
}
</style>
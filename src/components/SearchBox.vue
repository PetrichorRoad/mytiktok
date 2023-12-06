<template>
    <div class="searchBox">
        <i class="fa fa-chevron-left" style="font-size:22px ;" @click="$router.go(-1)"></i>
        <input placeholder="搜你想看的" @focus="$router.push('/search')" type="text">
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.searchBox{
    width: 100%;
    height: 6vh;
    padding: 1% 5%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    input{
        width: 90%;
        background-color: rgba(255,255,255,0.5);
        border: 0;
        border-radius: 5px;
        height: 4vh;
    }
}
</style>
<template>
    <div class="pop-message" :style="style[type]" v-show="visible">
        <i class="icon" :class="[style[type].icon]"></i>
        <span class="text">{{ str }}</span>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
let visible = ref(false);
let props = defineProps({
    type: {
        type: String,
        //	success 成功
        //	warn 警告
        //	error 错误
        default: "success",
    },
    str: {
        type: String,
        default: "",
    },
})
let style = {
    warn: {
        icon: "fa fa-info-circle",
        color: "#E6A23C",
        backgroundColor: "rgb(253, 246, 236)",
        borderColor: "rgb(250, 236, 216)",
    },
    error: {
        icon: "fa fa-window-close",
        color: "#F56C6C",
        backgroundColor: "rgb(254, 240, 240)",
        borderColor: "rgb(253, 226, 226)",
    },
    success: {
        icon: "fa fa-question",
        color: "#67C23A",
        backgroundColor: "rgb(240, 249, 235)",
        borderColor: "rgb(225, 243, 216)",
    },
};
onMounted(()=>{
    visible.value = true;
})
</script>

<style scoped lang="scss">
//	css样式部分可以根据需求自定义
.pop-message {
    position: absolute;
    z-index: 9999;
    left: 50%;
    margin-left: -150px;
    top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 50px;
    border: 1px solid #e4e4e4;
    background: #f5f5f5;
    color: #999;
    border-radius: 4px;
    //	以下是过渡动画，如不需要可删去亦可改进
    animation: move 0.38s linear forwards;

    @keyframes move {
        0% {
            transform: translate3d(0, -75px, 0);
            opacity: 0.16;
        }

        50% {
            opacity: 0.68;
        }

        100% {
            transform: none;
            opacity: 1;
        }
    }
}
</style>
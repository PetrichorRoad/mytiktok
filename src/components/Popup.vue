<template>
    <div class="popup">
        <div class="empty" @click.stop="hidden"></div>
        <div class="CommentList">
            <div class="top">
                <span>{{ (VideoPlayerStore.commentList ? VideoPlayerStore.commentList.length : '0') + '条评论' }}</span>
                <i class="fa fa-remove"></i>
            </div>
            <div class="commentItem" v-for="item in VideoPlayerStore.commentList" :key="item.id">
                <img class="left" width="35" height="35" :src="item.avatar" alt="">
                <div class="right">
                    <div class="nickname">{{ item.nickname }}</div>
                    <div class="content">{{ item.content }}</div>
                </div>
            </div>
        </div>
        <InputBox/>
    </div>
</template>

<script setup>
import InputBox from './InputBox.vue';
import useVideoPlayerStore from '@/store/VideoPlayer.js';
let VideoPlayerStore = useVideoPlayerStore()
const hidden = ()=>{
    VideoPlayerStore.show = false
}
</script>

<style lang="scss" scoped>
.popup{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    .empty{
        width: 100%;
        height: 30vh;
    }
    .CommentList{
        width: 100%;
        height: 60vh;
        background-color: #fff;
        border-radius: 8px 8px 0 0;
        padding: 0 3% 20vh 3%;
        overflow: auto;
        .top{
            padding: 0 5%;
            height: 5vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span{
                width: 90%;
                text-align: center;
            }
        }
        .commentItem{
            display: flex;
            align-items: center;
            margin-top: 15px;
            .right{
                padding-left:10px ;
                .nickname{
                    font-size: 12px;
                    color: #7f7f7f;
                }
                .content{
                    font-size: 14px;
                    margin-top: 5px;
                }
            }
        }
    }
}
</style>
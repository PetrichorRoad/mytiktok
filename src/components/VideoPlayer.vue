<template>
  <div class="video-player" @click="control">
    <video
      class="video"
      ref="video"
      :src="props.worksInfo.worksSRC"
      :controls="props.controls"
      :autoplay="props.autoplay"
      :loop="props.loop"
    ></video>
    <!-- 通过蒙版代理video的事件处理 -->
    <div class="mask">
      <img
        :src="props.worksInfo.avatar"
        alt=""
        @click.stop="GoUser(props.worksInfo.userID)"
      />
      <div class="item">
        <i
          class="fa fa-heart"
          :class="{ like: isLike }"
          @click.stop="Like(props.worksInfo.worksID)"
        ></i>
        <span>{{ props.worksInfo.totalLikes }}</span>
      </div>
      <div class="item">
        <i
          class="fa fa-commenting"
          @click.stop="comment(props.worksInfo.worksID)"
        ></i>
        <span>{{ props.worksInfo.totalComments }}</span>
      </div>
      <div class="item">
        <i
          class="fa fa-star"
          :class="{ collection: isCollection }"
          @click.stop="isCollection = !isCollection"
        ></i>
      </div>
    </div>
    <div class="info">
      <h1>@{{ props.worksInfo.nickname }}</h1>
      <p>{{ props.worksInfo.workstitle }}</p>
    </div>
    <!--2023-9-3 这里应该根据video的播放或暂停控制，而不是绑定事件 -->
    <!--2023-9-7 好吧！啪啪打脸了，屎山代码继续中 -->
    <i class="fa fa-play play" v-show="hidden" @click.stop="play()"></i>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useVideoPlayerStore from "@/store/VideoPlayer.js";
import { addLike } from "@/api/index";
import { useRouter } from "vue-router";
let $router = useRouter();
let VideoPlayerStore = useVideoPlayerStore();
const props = defineProps({
  worksInfo: {
    default: {},
    type: Object,
  },
  controls: {
    default: false,
    type: Boolean,
  },
  autoplay: {
    default: false,
    type: Boolean,
  },
  loop: {
    default: true,
    type: Boolean,
  },
});
let video = ref();
let isLike = ref(false);
let isCollection = ref(false);
let hidden = ref(false);

const control = () => {
  console.log(video.value.paused, video.value.ended);
  if (video.value.paused) {
    hidden.value = false;
    video.value.play();
  } else {
    hidden.value = true;
    video.value.pause();
  }
};
const play = () => {
  hidden.value = false;
  video.value.play();
};
// const pause = () => {
//   hidden.value = true;
//   video.value.pause();
// };
const GoUser = (userID) => {
  $router.push({ path: "/user", query: { userID: userID } });
};
const Like = async (worksID) => {
  let result = await addLike(worksID);
  if (result.status == 0) {
    isLike.value = !isLike.value;
  }
};
const comment = async (worksID) => {
  VideoPlayerStore.currentWorksID = worksID;
  await VideoPlayerStore.getWorksComment(worksID);
  VideoPlayerStore.show = true;
};
onMounted(() => {
  if (!video.value.paused) {
    hidden.value = false;
  } else {
    hidden.value = true;
  }
});
</script>

<style lang="scss" scoped>
.video-player {
  width: 100%;
  height: 100%;
  position: relative;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  .video {
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-color: #45acc6;
  }

  .mask {
    position: absolute;
    width: 15%;
    height: 50%;
    // border: 1px solid #fff;
    right: 0;
    bottom: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: #fff;
    font-size: 12px;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .fa {
      margin-bottom: 5px;
      font-size: 32px;
    }

    img {
      width: 40px;
      border-radius: 50%;
      border: 2px solid #fff;
    }
    .like {
      color: #fe4450;
    }
    .collection {
      color: #fbd800;
    }
  }
  .info {
    position: absolute;
    padding: 0 2%;
    width: 100%;
    height: 12%;
    bottom: 0;
    color: #fff;
    h1 {
      font-size: 18px;
      font-weight: 600;
    }
    p {
      margin-top: 10px;
      font-size: 14px;
      line-height: 20px;
    }
  }
  .play {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70px;
    height: 70px;
    transform: translate(-50%, -50%);
    color: #fff;
    opacity: 0.5;
    font-size: 60px;
  }
}
</style>
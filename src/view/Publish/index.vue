<template>
  <div class="publish">
    <div class="top">
      <i class="fa fa-chevron-left" @click="$router.go(-1)"></i>
    </div>
    <div class="container">
      <video autoplay ref="videoElement" id="player"></video>
      <button @click="toggleRecording()">{{ recording?'停止录制':'开始录制' }}</button>

      <video :src="recordedVideoUrl" v-if="recordedVideoUrl" autoplay controls></video>
      <button @click="downloadVideo">下载视频</button>

      <form ref="uploadForm" enctype="multipart/form-data" @submit.prevent="submitFile">
        <input type="file" ref="uploadFile" id="file" @change="handleFileChange" />
        <button type="submit" :disabled="!selectedFile">上传</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { publishWorks, addWorks } from "@/api/index";
let selectedFile = ref(null);
let videoElement = ref(null);
let stream = ref(null);
let recording = ref(false);
let recordedVideoUrl = ref("");
let mediaRecorder = ref(null);
let chunks = [];

const submitFile = async () => {
  if (selectedFile) {
    // 创建form对象
    let formData = new FormData();
    formData.append("video", selectedFile.value);
    // formData.append('worksID', '3189400014')
    // formData.append('workstitle', )
    // 开启进度条
    // 写不来
    let result = await publishWorks(formData);
    if (result.status == 0) {
      // console.log(result);
      let reward = await addWorks("3189400014", result.message, "街头歌手");
      if (reward.status == 0) {
        // 挖槽！搞一天了，我快被恶心吐了
        console.log("ok");
      }
    }
  } else {
    alert("请选择文件上传");
  }
};
const handleFileChange = event => {
  console.log(event.target.files[0]);
  selectedFile.value = event.target.files[0];
};
// 调用摄像头,显示画面
const onVideo = async () => {
  try {
    let result = await navigator.mediaDevices.getUserMedia({ video: true });
    stream.value = result;
    videoElement.value.srcObject = result;
  } catch (err) {
    console.error(err);
  }
};
// 开始录制视频
const startRecording = () => {
  if (stream.value) {
    if (MediaRecorder.isTypeSupported("video/webm")) {
      chunks.value = [];
      mediaRecorder.value = new MediaRecorder(stream.value, {
        mimeType: "video/webm"
      });
      mediaRecorder.value.ondataavailable = e => {
        if (e.data && e.data.size > 0) {
          chunks.value.push(e.data);
        }
        console.log(e.data);
      };
      mediaRecorder.value.onstop = () => {
        const recordedBlob = new Blob(chunks.value, { type: "video/webm" });
        chunks.value = [];
        recordedVideoUrl.value = URL.createObjectURL(recordedBlob);
      };
      mediaRecorder.value.start();
      recording.value = true;
    } else {
      console.error("不支持录制视频");
    }
  }
};
// 停止视屏录制
const stopRecording = () => {
  if (recording.value) {
    mediaRecorder.value.stop();
    mediaRecorder.value = null;
    recording.value = false;
  }
};
// 拍视频
const toggleRecording = () => {
  if (!recording.value) {
    startRecording();
  } else {
    stopRecording();
  }
};
// 下载保存视频
const downloadVideo = () => {
  if (recordedVideoUrl.value) {
    const a = document.createElement("a");
    a.href = recordedVideoUrl.value;
    a.download = "recorded_video.webm";
    a.click();
  }
};
// 关闭摄像头

onMounted(() => {
  onVideo();
});
</script>

<style lang="scss" scoped>
.publish {
  width: 100vw;
  height: 100vh;

  .top {
    height: 10vh;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-size: 24px;
  }

  .container {
    height: 90vh;
    video {
      width: 100%;
      height: 40%;
    }

    form {
      width: 100%;
      height: 80%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
    }
  }
}
</style>
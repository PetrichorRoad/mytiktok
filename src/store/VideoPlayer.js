import { defineStore } from "pinia";
import { reqWorksInfo, reqWorksComment } from '@/api/index';
const useVideoPlayerStore = defineStore('VideoPlayer', {
    state: () => {
        return {
            // 控制评论弹出层
            show: false,
            worksList: [],
            commentList: [],
            // 当前视频id
            currentWorksID:'',
            // 分页查询的起始页码
            pages:0
        }
    },
    actions: {
        async getWorksComment(worksID){
            // 每次重新获取数据前先清空数据
            this.commentList = []
            let result = await reqWorksComment(worksID);
            if (result.status == 0 && result.data) {
                this.commentList = result.data
            }else{
                // 弹出提示消息
            }
        },
        async addWorksList() {
            let result = await reqWorksInfo(this.pages)
            console.log(result);
            if (result.status == 0) {
                result.data.forEach((item) => {
                    this.worksList.push(item)
                })

                // 经典冒泡数组去重
                // for (let i = 0; i < this.worksList.length; i++) {
                //     for (let j = i + 1; j < this.worksList.length; j++) {
                //         if (this.worksList[i].id == this.worksList[j].id){
                //             // 删除后面这个元素
                //             this.worksList.splice(j,1);
                //             j--;
                //         }
                        
                //     }
                    
                // }
                this.pages = this.pages+1
            }
            
        }
    }
})
export default useVideoPlayerStore
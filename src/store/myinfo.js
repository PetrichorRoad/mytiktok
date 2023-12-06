import { defineStore } from "pinia";
import { reqMessageList, reqGroupList, queryFriendApply } from '@/api/index';
import PopMessage from '../utils/popmsg';
const useMyInfoStore = defineStore('MyInfo', {
    state: () => {
        return {
            login:false,
            MyInfo: JSON.parse(sessionStorage.getItem('myinfo'))||{},
            MessageList :[],
            GroupList :[],
            applyList:[]
        }
    },
    actions: {
        changeMyInfo(userinfo){
            this.MyInfo = userinfo
        },
        async changeMessageList() {
            let result = await reqMessageList()
            if (result.status == 0) {
                this.MessageList = result.data
                PopMessage({ type: 'success', str: '获取好友成功' })
            }
        },
        async changeGroupList() {
            let result = await reqGroupList()
            if (result.status == 0) {
                this.GroupList = result.data
                PopMessage({ type: 'success', str: '获取群组成功' })
            }
        },
        async getFriendApply(){
            let result = await queryFriendApply()
            if (result.status == 0) {
                this.applyList.push(result.data)
                PopMessage({ type: 'success', str: '获取好友申请成功' })
            }
        }
    },
    getters:{
    }
})
export default useMyInfoStore
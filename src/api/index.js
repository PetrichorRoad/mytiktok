import request from "@/utils/request";

const API = {
    login:'api/login',
    register:'api/register',
    email:'api/emailSignup',

    user:'my/getInfo',
    friend:'my/getUserByID',
    messageList:'my/messageList',
    sendMsg: 'my/sendMsg',
    applyFriend: 'my/applyFriend',
    agreeFriendApply:'my/agreeFriendApply',
    refuseFriendApply:'my/refuseFriendApply',
    queryFriendApply: 'my/queryFriendApply',
    unfriend:'my/unfriend',

    groupList:'group/getGroupInfo',
    sendGroupMsg:'group/sendGroupMsg', 
    getGroupUserByID:'group/getGroupUserByID',

    works:'works/worksInfo',
    worksComment:'works/worksComment',
    addLike:'works/addLike',
    addComments:'works/addComments',

    publish:'upload/video',
    sendImage:'upload/image',
    publishParams:'upload/videoParams',
    
}

export const reqLogin = (userinfo) =>{
    return request({
        method: 'POST',
        url: API.login,
        data: `userid=${userinfo.userid}&password=${userinfo.password}`,
    })
}
export const reqUserinfo = () => {
    return request({
        method: 'GET',
        url: API.user,
    })
}
export const reqFriendInfo = (userID) => {
    return request({
        method: 'POST',
        url: API.friend,
        data: `userID=${userID}`
    })
}
export const reqMessageList = () => {
    return request({
        method: 'GET',
        url: API.messageList,
    })
}
export const reqGroupList = () => {
    return request({
        method: 'GET',
        url: API.groupList,
    })
}
// 获取群用户
export const reqGroupUserByID = (groupID) =>{
    return request({
        method: 'POST',
        url: API.getGroupUserByID,
        data: `groupID=${groupID}`,
    })
}
export const reqWorksInfo = (pages) => {
    return request({
        method: 'POST',
        url: API.works,
        data: `pages=${pages}`,
    })
}
// 根据视频id拿评论数据
export const reqWorksComment = (worksID) => {
    return request({
        method: 'POST',
        url: API.worksComment,
        data: `worksID=${worksID}`,
    })
}
// 根据视频id点赞
export const addLike = (worksID) => {
    return request({
        method:'POST',
        url:API.addLike,
        data: `worksID=${worksID}`
    })
}
// 根据视频id评论
export const addComments = (worksID,content) => {
    return request({
        method: 'POST',
        url: API.addComments,
        data: `worksID=${worksID}&content=${content}`
    })
}
// 发布上传作品
export const publishWorks = (video) =>{
    return request({
        method: 'POST',
        // url: API.publish + `?url=&worksID=${worksID}&workstitle=${workstitle}`,       
        url: API.publish + `?url=ChatData/video`,
        // headers: { 'Content-Type':'multipart/form-data'},
        // data: `video=${video}&worksID=${worksID}&workstitle=${workstitle}`
        data:video,
        // data: `worksID=${worksID}&workstitle=${workstitle}`
    })
}
// 数据库新增作品
export const addWorks = (worksID, worksUrl, workstitle) => {
    return request({
        method: 'POST',
        url: API.publishParams,
        data: `worksID=${worksID}&url=${worksUrl}&workstitle=${workstitle}`,

    })
}
// 发送聊天图片
export const sendImage = (image) =>{
    return request({
        method: 'POST',   
        url: API.sendImage + `?url=ChatData/image`,
        data: image,
    })
}
// 发一对一消息
export const sendMsg = (msgInfo) => {
    return request({
        method: 'POST',
        url: API.sendMsg,
        data: `friendID=${msgInfo.friendID}&content=${msgInfo.content}&type=${msgInfo.type}&state=${msgInfo.state}`,
    })
}
// 发群消息
export const sendGroupMsg = (msgInfo) => {
    return request({
        method: 'POST',
        url: API.sendGroupMsg,
        data: `groupID=${msgInfo.groupID}&content=${msgInfo.content}&type=${msgInfo.type}&state=${msgInfo.state}`,
    })
}
// 发送好友申请
export const applyFriend = (applyInfo) => {
    return request({
        method: 'POST',
        url: API.applyFriend,
        data: `friendID=${applyInfo.friendID}&content=${applyInfo.content}&type=${applyInfo.type}&state=${applyInfo.state}`,
    })
}
// 登陆时查询好友申请
export const queryFriendApply =() =>{
    return request({
        method: 'GET',
        url: API.queryFriendApply,
    })
}
// 同意好友申请
export const agreeFriendApply = (agreeInfo)=>{
    return request({
        method: 'POST',
        url: API.agreeFriendApply,
        data: `friendID=${agreeInfo.friendID}&content=${agreeInfo.content}`
    })
}
// 拒绝好友申请
export const refuseFriendApply = (refuseID) => {
    return request({
        method: 'POST',
        url: API.refuseFriendApply,
        data: `friendID=${refuseID}`
    })
}
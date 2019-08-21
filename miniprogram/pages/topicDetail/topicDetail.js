// miniprogram/pages/topicDetail/topicDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 问题
    topic: null,
    // 输入的评论
    comment: "",
    // 回答列表
    answerList: []

  },

  // 预览照片
  previewImg: function(){
    var that = this;
    wx.previewImage({
      urls: that.data.topic.imageUrl,
    })
  },
  // 获取输入的评论内容
  getComment: function(e){
    this.setData({ comment: e.detail.value });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.topicIndex);
    // console.log(topic);
    const that = this;
    this.setData({ topic: app.globalData.topicList[options.topicIndex]});
    this.loadAnswer(this.data.topic.qid);
  },

  // 加载回答
  loadAnswer: function (qid) {
    let that = this;
    wx.cloud.callFunction({
      name: 'getAnswer',
      data: {
        qid: qid,
        aLimitNum: 20,
        aSkipNum:0
      },
    })
    .then(res => {
      console.log(res);
      that.setData({
        answerList: res.result.data
      })
    })
  },

  // 评论
  sendComment: function(){
    const that = this;
    let userInfo = app.globalData.userInfo;
    wx.cloud.callFunction({
      name: 'answerquestion',
      data:{
        avatarUrl: userInfo.avatarUrl,
        content: that.data.comment,
        nickName: userInfo.nickName,
        uid: wx.getStorageSync("uid"),
        qid: that.data.topic.qid,
        hostuid: that.data.topic.uid
      }
    }).then(res => {
      console.log(res);
      // 清空输入框
      that.setData({ comment: null });
      // 刷新回答区域
      that.loadAnswer(that.data.topic.qid);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


})
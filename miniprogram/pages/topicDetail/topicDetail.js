// miniprogram/pages/topicDetail/topicDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},

    imageUrl: ['../../resources/img/avatar.jpg', '../../resources/img/avatar2.jpg', '../../resources/img/avatar3.jpg'],
    comment: "",
    

    answerList: null

  },

  // 预览照片
  previewImg: function(){
    wx.previewImage({
      urls: that.data.imageUrl,
    })
  },
  getComment: function(e){
    this.setData({ comment: e.detail.value });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  // 加载回答
  loadAnswer: function(qid) {
    let that = this
    wx.cloud.callFunction({
      name: 'getAnswer',
      data: {
        qid: qid
      },
    })
    .then(res => {
      console.log(res)
      that.setData({
        answerList: res.result.data
      })
    })
  }
})
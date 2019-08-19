// miniprogram/pages/newTopic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: null,
    content: null,
    photoArr: []
  },

  onTitleChange: (event) => {
    // console.log(event.detail);
    this.data.title = event.detail;
  },
  onContentChange: event => {
    this.data.content = event.detail;
  },
  addPhoto: function(){
    var that = this;
    wx.chooseImage({
      count: 3,
      success: res => {
        that.setData({photoArr : res.tempFilePaths});
      },
    })
  },
  previewImg: function(e){
    // console.log(e.target.dataset);
    var that = this;
    let index = e.target.dataset.idx;
    wx.previewImage({
      current: that.data.photoArr[index],
      urls: that.data.photoArr,
    })
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

  }
})
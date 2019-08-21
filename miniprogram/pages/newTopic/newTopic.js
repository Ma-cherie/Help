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

  onTitleChange: function(event) {
    // console.log(event.detail);
    this.data.title = event.detail;
  },
  onContentChange:function(event) {
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
  submitTopic: function(){
    let content = this.data.content;
    if(!content){
      wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      });
      return;
    }
    let uid = wx.getStorageSync('uid');
    // wx.cloud.callFunction({
    //   name: 'askquestion',
    //   data: {
    //     uid: uid
    //   }
    // }).then(console.log);
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



})
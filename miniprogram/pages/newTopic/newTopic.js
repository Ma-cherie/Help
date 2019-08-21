// miniprogram/pages/newTopic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: null,
    content: null,
    photoArr: [],   //上传图片后的本地地址
    imageUrl: [],   //upload之后的fileID
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
    const that = this;
    // 判断内容是否为空
    let content = this.data.content;
    if(!content){
      wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      });
      return;
    }
    if(this.data.photoArr.length > 0){
      uploadImgs().then(imgUrl => {
        console.log(imgUrl);
        submit(imgUrl);
      })
    }
    else{
      submit();
    }
    
    // 上传单个图片函数
    function uploadSingleImg(fileName, photo) {
      return new Promise((resolve, reject) => {
        // upload单个图片
        wx.cloud.uploadFile({
          cloudPath: `topicImg/${fileName}`,
          filePath: photo,
        })
          .then(res => {
            resolve(res.fileID);
          })
          .catch(err => {
            console.log("上传单个图片失败", err);
          })
      });
    }

    // 上传图片函数(有可能多个，有可能单个)
    function uploadImgs(){
      return new Promise((resolve,reject) => {
        // 初始化一个无关的promise链
        var p = Promise.resolve();
        let photoArr = that.data.photoArr;
        let imgUrl = that.data.imageUrl;
        for (let i = 0; i < photoArr.length; i++) {
          let photo = photoArr[i];
          let fileNameArr = photo.split('.');
          let fileName = fileNameArr[fileNameArr.length - 2] + "." + fileNameArr[fileNameArr.length - 1];
          p = p.then(() => {
            return uploadSingleImg(fileName, photo).then(singleImgID => {
              // console.log(singleImgID);
              return imgUrl.push(singleImgID);
            });
          })
        }
        p.then(() => { resolve(imgUrl);})
      })
    }

    
    
    // 提交事件函数
    function submit(imgUrl){
      // 提交
      let uid = wx.getStorageSync('uid');
      wx.cloud.callFunction({
        name: 'askquestion',
        data: {
          uid: uid,
          title: that.data.title,
          content: that.data.content,
          imageUrl: imgUrl
        }
      }).then(res => {
        console.log(res);
        wx.navigateBack({});
      });
    }
  },





})
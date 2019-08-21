//app.js
// const cloud = require('wx-server-sdk')

App({
  onLaunch: function() {
    this.globalData = {
      enableCloud: true //<% enableCloud %>
    }
    if (this.globalData.enableCloud === true) {
      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力');
      } else {
        wx.cloud.init({
          env: 'test-38zv4',
          traceUser: true,
        })
      }
    }
    // 注册/登录
    let uid = wx.getStorageSync('uid');
    if(!uid){
      // 如果是空的才需要注册
      wx.cloud.callFunction({
        // 需调用的云函数名
        name: 'register',
        // 成功回调
        success: res => {
          // console.log(res);
          wx.setStorage({
            key: 'uid',
            data: res.result.uid,
          })
        },
        fail: res => {
          console.log("注册登录失败...");
        }
      });
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    

  }
})
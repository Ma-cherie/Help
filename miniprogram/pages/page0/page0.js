// pages/me/me.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    diaryNum: 0
  },
  onLoad: function () {
    // 昵称和头像
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.updateUserInfo();
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
  },

  getUserInfo: function (e) {
    console.log(e);
    if (e.detail.hasOwnProperty('userInfo')) {
      console.log('获取到userInfo了');
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
    else {
      console.log('没获取到userInfo');
    }

  },


  // 更新用户个人信息
  updateUserInfo: function () {
    var data = {
      avatarUrl: app.globalData.userInfo.avatarUrl,
      city: app.globalData.userInfo.city,
      country: app.globalData.userInfo.country,
      gender: app.globalData.userInfo.gender,
      language: app.globalData.userInfo.language,
      name: app.globalData.userInfo.nickName,
      province: app.globalData.userInfo.province,
    }
    var info = wx.getStorageSync('userInfo');
    // 第一次获取到用户个人信息
    if (info == null) {
      console.log("第一次获取到用户个人信息");
      wx.setStorage({
        key: 'userInfo',
        data: app.globalData.userInfo,
      });
    } else {
      // 后续获取用户个人信息，比对变化
      for (let x in app.globalData.userInfo) {
        if (app.globalData.userInfo[x] != info[x]) {
          console.log("用户信息发生变化，更新用户信息");
          wx.setStorage({
            key: 'userInfo',
            data: app.globalData.userInfo,
          });
          break;
        }
      }
    }
    console.log("用户信息未发生变化");
  }
})

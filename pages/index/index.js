//index.js
const application = getApp()
const loginUtil = require('../../utils/login.js')

Page({
    data: {
    },

    onLoad: function () {

    },
    onShow: function () {
        //        if (application.globalData.enableCloud === true) {
        //            wx.showLoading()
        //            const loginManager = loginUtil.loadLoginManager()
        //            loginManager.initIfNeeded()
        //            .then(openid => {
        //                wx.<%navigate_method%>({
        //                    url: '<%first_page_path%>',
        //                })
        //                wx.hideLoading()
        //           })
        //            .catch(err => {
        //                wx.hideLoading()
        //            })
        //        } else {
        wx.switchTab({
            url: "../page11/page11",
        })
        //        }

    }
})

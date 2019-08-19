// miniprogram/pages/page/page.js

const app = require('../../utils/appframework.js')
const ui = require('../../utils/uicomponents.js')
const PageList = require('../../utils/pagelist.js')
const WXAsset__ = app.WXAsset

const Data = require('../../utils/dataset.js')
const charts = require('../../utils/charts.js')
const Assets = require('../../utils/assets')
const WAC = require('../../utils/wac')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setupViews()

        this.setupDataSets();
        this.setupCharts();

        if (options) {
            let str = [];
            for (var p in options)
                if (options.hasOwnProperty(p)) {
                    let value = options[p]
                    delete options[p]
                    options[decodeURIComponent(p)] = decodeURIComponent(value)
                }

            this.bindPageParam(options)
        }
        if (this._onLoad) {
            this._onLoad(options);
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

        if (this._onReady) {
            this._onReady();
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

        if (this._onShow) {
            this._onShow();
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

        if (this._onHide) {
            this._onHide();
        }
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        this.teardownDataSets();
        this.teardownCharts();
        if (this._onUnload) {
            this._onUnload();
        }
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

        if (this._onPullDownRefresh) {
            this._onPullDownRefresh();
        }
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

        if (this._onReachBottom) {
            this._onReachBottom();
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
                return {
            title: '消息',
            path: PageList.page12
        }
    },

    setupViews: function () {
        let data = {}
            /**
             * 开始拼接字符串：
             * 遍历每个BaseFlexModel，构造小程序端的BaseFlexModel和Proxy
             */
            var that_container10 = this;
var container10 = new ui.StackViewFlexModel({ id: "container10", state:"state1" });

var container10_proxy = new Proxy(container10, {
set: function (container, property, value) {
container[property] = value;
that_container10.setData({
container10: container10_proxy
})
return true
},
get: function (target, prop) {
if (prop === '__target__') return target;
else return target[prop];
}

});


data["container10"] = container10_proxy


let list3 = new ui.ListFlexModel({ id: "list3", dataSource: [], styleObject: {} ,container:container10_proxy})
data["list3"] = list3
WAC.bindProxy(this,list3, "list3")

            /**
             * 结束拼接
             */
            this.setData(data)
    },

    //设置数据表绑定
    setupDataSets: function () {
     /**
      * 拼接数据表监听
      */
        
     
     },

    teardownDataSets: function () {

        /**
         *取消数据表监听
         */
        
     
     },

    setupCharts: function () {
        
    },

    teardownCharts: function () {
        
    },

    //绑定页面入参
    bindPageParam: function (options) {
        
    },

    /**********************
     * 自定义事件： 
     *
     */
     //页面变量 e.g. variable : 1


     /*********************
      * 获取用户信息:
      *
      */
      //<% bind_userInfo %>

     /**********************
      * 自定义方法：
      *
      */
     
})

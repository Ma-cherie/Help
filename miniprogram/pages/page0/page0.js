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
  onLoad: function(options) {
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
  onReady: function() {

    if (this._onReady) {
      this._onReady();
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    if (this._onShow) {
      this._onShow();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

    if (this._onHide) {
      this._onHide();
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.teardownDataSets();
    this.teardownCharts();
    if (this._onUnload) {
      this._onUnload();
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

    if (this._onPullDownRefresh) {
      this._onPullDownRefresh();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

    if (this._onReachBottom) {
      this._onReachBottom();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '我的',
      path: PageList.page0
    }
  },

  setupViews: function() {
    let data = {}
    /**
     * 开始拼接字符串：
     * 遍历每个BaseFlexModel，构造小程序端的BaseFlexModel和Proxy
     */
    var that_container14 = this;
    var container14 = new ui.StackViewFlexModel({
      id: "container14",
      state: "state1"
    });

    var container14_proxy = new Proxy(container14, {
      set: function(container, property, value) {
        container[property] = value;
        that_container14.setData({
          container14: container14_proxy
        })
        return true
      },
      get: function(target, prop) {
        if (prop === '__target__') return target;
        else return target[prop];
      }

    });


    data["container14"] = container14_proxy


    let view51 = new ui.ViewFlexModel({
      id: "view51",
      styleObject: {},
      container: container14_proxy
    })
    data["view51"] = view51
    WAC.bindProxy(this, view51, "view51")

    let image73 = new ui.ImageViewFlexModel({
      id: "image73",
      mode: "aspectFill",
      src: "https://servicewechat.com/wxa-dev-logic/visualprogramming?action=download-image&media-id=8h3T3lJtWBS7jv6grtStawQ_jWc-0WiwQ_6576bHLp4PS4DgPt17u-Nju0EHzK4J&content-type=1&openid=orSXl1IHO7hei3jzA9b3sfICqWps&appid=wx20edba31460266c0",
      styleObject: {},
      container: view51
    })
    data["image73"] = image73
    WAC.bindProxy(this, image73, "image73")

    let text98 = new ui.LabelFlexModel({
      id: String.raw `text98`,
      styleObject: {
        "color": "rgba(0,0,0,1.00)"
      },
      value: String.raw `昵称`,
      container: view51
    })
    data["text98"] = text98
    WAC.bindProxy(this, text98, "text98")

    let text99 = new ui.LabelFlexModel({
      id: String.raw `text99`,
      styleObject: {
        "color": "rgba(0,0,0,1.00)"
      },
      value: String.raw `积分：100`,
      container: view51
    })
    data["text99"] = text99
    WAC.bindProxy(this, text99, "text99")

    let component3 = new ui.ComponentFlexModel({
      id: "component3",
      position: 'center',
      dashed: false,
      showText: true,
      text: '',
      styleObject: {}
    })
    data["component3"] = component3
    WAC.bindProxy(this, component3, "component3")

    var that_container17 = this;
    var container17 = new ui.StackViewFlexModel({
      id: "container17",
      state: "state1"
    });

    var container17_proxy = new Proxy(container17, {
      set: function(container, property, value) {
        container[property] = value;
        that_container17.setData({
          container17: container17_proxy
        })
        return true
      },
      get: function(target, prop) {
        if (prop === '__target__') return target;
        else return target[prop];
      }

    });


    data["container17"] = container17_proxy


    let view55 = new ui.ViewFlexModel({
      id: "view55",
      styleObject: {},
      container: container17_proxy
    })
    data["view55"] = view55
    WAC.bindProxy(this, view55, "view55")

    let text104 = new ui.LabelFlexModel({
      id: String.raw `text104`,
      styleObject: {
        "color": "rgba(0,0,0,1.00)"
      },
      value: String.raw `我的提问`,
      container: view55
    })
    data["text104"] = text104
    WAC.bindProxy(this, text104, "text104")

    var that_container19 = this;
    var container19 = new ui.StackViewFlexModel({
      id: "container19",
      state: "state1"
    });

    var container19_proxy = new Proxy(container19, {
      set: function(container, property, value) {
        container[property] = value;
        that_container19.setData({
          container19: container19_proxy
        })
        return true
      },
      get: function(target, prop) {
        if (prop === '__target__') return target;
        else return target[prop];
      }

    });


    data["container19"] = container19_proxy


    let view57 = new ui.ViewFlexModel({
      id: "view57",
      styleObject: {},
      container: container19_proxy
    })
    data["view57"] = view57
    WAC.bindProxy(this, view57, "view57")

    let text106 = new ui.LabelFlexModel({
      id: String.raw `text106`,
      styleObject: {
        "color": "rgba(0,0,0,1.00)"
      },
      value: String.raw `我的回答`,
      container: view57
    })
    data["text106"] = text106
    WAC.bindProxy(this, text106, "text106")

    var that_container21 = this;
    var container21 = new ui.StackViewFlexModel({
      id: "container21",
      state: "state1"
    });

    var container21_proxy = new Proxy(container21, {
      set: function(container, property, value) {
        container[property] = value;
        that_container21.setData({
          container21: container21_proxy
        })
        return true
      },
      get: function(target, prop) {
        if (prop === '__target__') return target;
        else return target[prop];
      }

    });


    data["container21"] = container21_proxy


    let view59 = new ui.ViewFlexModel({
      id: "view59",
      styleObject: {},
      container: container21_proxy
    })
    data["view59"] = view59
    WAC.bindProxy(this, view59, "view59")

    let text108 = new ui.LabelFlexModel({
      id: String.raw `text108`,
      styleObject: {
        "color": "rgba(0,0,0,1.00)"
      },
      value: String.raw `关于`,
      container: view59
    })
    data["text108"] = text108
    WAC.bindProxy(this, text108, "text108")


    /**
     * 结束拼接
     */
    this.setData(data)
  },

  //设置数据表绑定
  setupDataSets: function() {
    /**
     * 拼接数据表监听
     */


  },

  teardownDataSets: function() {

    /**
     *取消数据表监听
     */


  },

  setupCharts: function() {

  },

  teardownCharts: function() {

  },

  //绑定页面入参
  bindPageParam: function(options) {

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
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
    // topic列表
    topicList: [],
    //tab标签页
    active: 0,
    // 查询topic数目(分页用)
    qSkipNum: 0

  },
  // 中间标签页切换
  onTabChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  },
  // 
  toTopicDetail: function() {
    wx.navigateTo({
      url: '../topicDetail/topicDetail?qid=1',
    })
  },
  toNewTopic: function() {
    // 获取用户授权
    wx.getSetting({
      success: function(res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已授权去新建问答
          wx.navigateTo({
            url: '../newTopic/newTopic',
          })
        } else {
          // 未授权
          wx.showToast({
            title: '请先授权登录',
            icon: 'none'
          });
          setTimeout(function() {
            wx.switchTab({
              url: '../page0/page0',
            })
          }, 1000);
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    wx.cloud.callFunction({
      name: 'getquestionByArea',
      data: {
        location: {
          province: '广东省',
          city: '广州市',
          area: '天河区',
        },
        qSkipNum: that.data.qSkipNum,
        qLimitNum: 20
      }
    })
    .then(res => {
      console.log(res);
      let topicList = res.result.data;
      for (let i = 0; i < topicList.length; i++) {
        topicList[i].date = new Date(topicList[i].date).toLocaleDateString();
      }
      that.setData({ topicList: topicList});
    })

    this.setupViews();
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
  onShow: function() {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  setupViews: function() {
    let data = {}
    /**
     * 开始拼接字符串：
     * 遍历每个BaseFlexModel，构造小程序端的BaseFlexModel和Proxy
     */
    let component1 = new ui.ComponentFlexModel({
      id: "component1",
      button: '搜索',
      color: '#333333',
      showIcon: true,
      mode: 'normal',
      radius: 6,
      align: 'left',
      showClear: true,
      iconColor: '#07C160',
      btnColor: '#07C160',
      placeholder: '搜索',
      phColor: '#BBBBBB',
      styleObject: {}
    })
    data["component1"] = component1
    WAC.bindProxy(this, component1, "component1")
    let picker1 = new ui.WeuiRegionPickerModel({
      id: "picker1",
      title: "地区",
      value: ["广东省", "广州市", "海珠区"],
      styleObject: {}
    })
    data["picker1"] = picker1
    WAC.bindProxy(this, picker1, 'picker1')
    let scrolltab1 = new ui.ScrollTabFlexModel({
      id: "scrolltab1",
      navData: [{
        "text": "全部"
      }, {
        "text": "问答"
      }, {
        "text": "求助"
      }, {
        "text": "讨论"
      }],
      option: {
        defaultColor: "#000000",
        activeColor: "#07c160",
        fixed: false,
        hasIndicator: true,
        height: "80rpx",
        backgroundColor: "#f7f7f7",
        fontSize: "16px"
      },
      currentTab: 0,
      styleObject: {}
    })
    data["scrolltab1"] = scrolltab1
    WAC.bindProxy(this, scrolltab1, "scrolltab1")

    var that_container57 = this;
    var container57 = new ui.StackViewFlexModel({
      id: "container57",
      state: "state1"
    });

    var container57_proxy = new Proxy(container57, {
      set: function(container, property, value) {
        container[property] = value;
        that_container57.setData({
          container57: container57_proxy
        })
        return true
      },
      get: function(target, prop) {
        if (prop === '__target__') return target;
        else return target[prop];
      }

    });


    data["container57"] = container57_proxy


    let list4 = new ui.ListFlexModel({
      id: "list4",
      dataSource: [],
      styleObject: {},
      container: container57_proxy
    })
    data["list4"] = list4
    WAC.bindProxy(this, list4, "list4")

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
    this.list4.dataSource = Data.question.items;
    Data.question.subscribe('list4', (dataset) => {
      this.list4.dataSource = dataset.items;
    });

  },

  teardownDataSets: function() {

    /**
     *取消数据表监听
     */
    Data.question.unsubscribe('list4');

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
  onPicker1Change: function(event) {
    this.picker1.updateValue(this, event)
    if (this._onPicker1Change) {
      this._onPicker1Change(event.detail.value, event)
    }
  },
  onScrolltab1Change: function(event) {
    this.scrolltab1.updateValue(this, event)
    if (this._onScrolltab1Change) {
      this._onScrolltab1Change(event.detail.currentTab, event)
    }
  },



})
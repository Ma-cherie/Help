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
    topicList:[
      { id: "1",userName: "Lazy Bone", content: "Yooo.", time: "2019-6-6", location:"广州市天河区",
        imgArr: ['../../resources/img/yourname.jpg', '../../resources/img/yourname.jpg'], 
        avatar: '../../resources/img/avatar.jpg'
      },
      {
        id: "1", userName: "Fisher", content: "Yooooooooo.", time: "2019-6-6", location: "广州市天河区",
        imgArr: null, avatar: '../../resources/img/avatar2.jpg'
      },
      {
        id: "1", userName: "Lazy Bone", content: "Yooo.", time: "2019-6-6", location: "广州市天河区",
        imgArr: null, avatar: '../../resources/img/avatar.jpg'
      },
    ],
    //tab标签页
    active: 0,


  },
  // 中间标签页切换
  onTabChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  },
  // 
  toTopicDetail: function(){
    wx.navigateTo({
      url: '../topicDetail/topicDetail?qid=1',
    })
  },
  toNewTopic: function () {
    wx.navigateTo({
      url: '../newTopic/newTopic',
    })
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
      title: '快问快答',
      path: PageList.page11
    }
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
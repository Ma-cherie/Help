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
            title: '帖子详情页',
            path: PageList.page70
        }
    },

    setupViews: function () {
        let data = {}
            /**
             * 开始拼接字符串：
             * 遍历每个BaseFlexModel，构造小程序端的BaseFlexModel和Proxy
             */
            var that_container27 = this;
var container27 = new ui.StackViewFlexModel({ id: "container27", state:"state1" });

var container27_proxy = new Proxy(container27, {
set: function (container, property, value) {
container[property] = value;
that_container27.setData({
container27: container27_proxy
})
return true
},
get: function (target, prop) {
if (prop === '__target__') return target;
else return target[prop];
}

});


data["container27"] = container27_proxy


let view68 = new ui.ViewFlexModel({ id: "view68", styleObject: {} ,container:container27_proxy})
data["view68"] = view68
WAC.bindProxy(this,view68, "view68")

let image80 = new ui.ImageViewFlexModel({ id: "image80", mode: "aspectFill", src: "https://servicewechat.com/wxa-dev-logic/visualprogramming?action=download-image&media-id=8h3T3lJtWBS7jv6grtStawQ_jWc-0WiwQ_6576bHLp4PS4DgPt17u-Nju0EHzK4J&content-type=1&openid=orSXl1IHO7hei3jzA9b3sfICqWps&appid=wx20edba31460266c0", styleObject: {} ,container:view68})
data["image80"] = image80
WAC.bindProxy(this,image80, "image80")

let text126 = new ui.LabelFlexModel({id: String.raw`text126`, styleObject: {"color":"rgba(0,0,0,1.00)"}, value: String.raw`昵称xxx` ,container:view68})
data["text126"] = text126
WAC.bindProxy(this,text126, "text126")

let text127 = new ui.LabelFlexModel({id: String.raw`text127`, styleObject: {"color":"rgba(0,0,0,1.00)"}, value: String.raw`地点` ,container:view68})
data["text127"] = text127
WAC.bindProxy(this,text127, "text127")

let icon16 = new ui.IconFlexModel({ id: "icon16", src: "../../resources/svg/000000-map-marker.svg", styleObject: {} ,container:view68})
data["icon16"] = icon16
WAC.bindProxy(this,icon16, "icon16")

var that_container22 = this;
var container22 = new ui.StackViewFlexModel({ id: "container22", state:"state1" });

var container22_proxy = new Proxy(container22, {
set: function (container, property, value) {
container[property] = value;
that_container22.setData({
container22: container22_proxy
})
return true
},
get: function (target, prop) {
if (prop === '__target__') return target;
else return target[prop];
}

});


data["container22"] = container22_proxy


let view60 = new ui.ViewFlexModel({ id: "view60", styleObject: {} ,container:container22_proxy})
data["view60"] = view60
WAC.bindProxy(this,view60, "view60")

let image74 = new ui.ImageViewFlexModel({ id: "image74", mode: "aspectFill", src: "https://servicewechat.com/wxa-dev-logic/visualprogramming?action=download-image&media-id=8h3T3lJtWBS7jv6grtStawQ_jWc-0WiwQ_6576bHLp4PS4DgPt17u-Nju0EHzK4J&content-type=1&openid=orSXl1IHO7hei3jzA9b3sfICqWps&appid=wx20edba31460266c0", styleObject: {} ,container:view60})
data["image74"] = image74
WAC.bindProxy(this,image74, "image74")

let text109 = new ui.LabelFlexModel({id: String.raw`text109`, styleObject: {"color":"rgba(0,0,0,1.00)"}, value: String.raw`标题` ,container:view60})
data["text109"] = text109
WAC.bindProxy(this,text109, "text109")

let text110 = new ui.LabelFlexModel({id: String.raw`text110`, styleObject: {"color":"rgba(85,85,85,1.00)"}, value: String.raw`正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文` ,container:view60})
data["text110"] = text110
WAC.bindProxy(this,text110, "text110")

let component2 = new ui.ComponentFlexModel({ id: "component2", text:'wux',showText:false,position:'center',dashed:false, styleObject: {} })
data["component2"] = component2
WAC.bindProxy(this,component2, "component2")

var that_container55 = this;
var container55 = new ui.StackViewFlexModel({ id: "container55", state:"state1" });

var container55_proxy = new Proxy(container55, {
set: function (container, property, value) {
container[property] = value;
that_container55.setData({
container55: container55_proxy
})
return true
},
get: function (target, prop) {
if (prop === '__target__') return target;
else return target[prop];
}

});


data["container55"] = container55_proxy


let view99 = new ui.ViewFlexModel({ id: "view99", styleObject: {} ,container:container55_proxy})
data["view99"] = view99
WAC.bindProxy(this,view99, "view99")

let image87 = new ui.ImageViewFlexModel({ id: "image87", mode: "aspectFill", src: "https://servicewechat.com/wxa-dev-logic/visualprogramming?action=download-image&media-id=8h3T3lJtWBS7jv6grtStawQ_jWc-0WiwQ_6576bHLp4PS4DgPt17u-Nju0EHzK4J&content-type=1&openid=orSXl1IHO7hei3jzA9b3sfICqWps&appid=wx20edba31460266c0", styleObject: {} ,container:view99})
data["image87"] = image87
WAC.bindProxy(this,image87, "image87")

let text168 = new ui.LabelFlexModel({id: String.raw`text168`, styleObject: {"color":"rgba(0,0,0,1.00)"}, value: String.raw`昵称` ,container:view99})
data["text168"] = text168
WAC.bindProxy(this,text168, "text168")

let text169 = new ui.LabelFlexModel({id: String.raw`text169`, styleObject: {"color":"rgba(0,0,0,1.00)"}, value: String.raw`广东 广州` ,container:view99})
data["text169"] = text169
WAC.bindProxy(this,text169, "text169")

let text170 = new ui.LabelFlexModel({id: String.raw`text170`, styleObject: {"color":"rgba(0,0,0,1.00)"}, value: String.raw`2019年6月6日` ,container:view99})
data["text170"] = text170
WAC.bindProxy(this,text170, "text170")

let text171 = new ui.LabelFlexModel({id: String.raw`text171`, styleObject: {"color":"rgba(0,0,0,1.00)"}, value: String.raw`这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本` ,container:view99})
data["text171"] = text171
WAC.bindProxy(this,text171, "text171")

let icon19 = new ui.IconFlexModel({ id: "icon19", src: "../../resources/svg/000000-thumb-up.svg", styleObject: {} ,container:view99})
data["icon19"] = icon19
WAC.bindProxy(this,icon19, "icon19")

let text172 = new ui.LabelFlexModel({id: String.raw`text172`, styleObject: {"color":"rgba(0,0,0,1.00)"}, value: String.raw`666` ,container:view99})
data["text172"] = text172
WAC.bindProxy(this,text172, "text172")

var that_container56 = this;
var container56 = new ui.StackViewFlexModel({ id: "container56", state:"state1" });

var container56_proxy = new Proxy(container56, {
set: function (container, property, value) {
container[property] = value;
that_container56.setData({
container56: container56_proxy
})
return true
},
get: function (target, prop) {
if (prop === '__target__') return target;
else return target[prop];
}

});


data["container56"] = container56_proxy


let view100 = new ui.ViewFlexModel({ id: "view100", styleObject: {} ,container:container56_proxy})
data["view100"] = view100
WAC.bindProxy(this,view100, "view100")

let image88 = new ui.ImageViewFlexModel({ id: "image88", mode: "aspectFill", src: "https://servicewechat.com/wxa-dev-logic/visualprogramming?action=download-image&media-id=8h3T3lJtWBS7jv6grtStawQ_jWc-0WiwQ_6576bHLp4PS4DgPt17u-Nju0EHzK4J&content-type=1&openid=orSXl1IHO7hei3jzA9b3sfICqWps&appid=wx20edba31460266c0", styleObject: {} ,container:view100})
data["image88"] = image88
WAC.bindProxy(this,image88, "image88")

let text173 = new ui.LabelFlexModel({id: String.raw`text173`, styleObject: {"color":"rgba(0,0,0,1.00)"}, value: String.raw`昵称` ,container:view100})
data["text173"] = text173
WAC.bindProxy(this,text173, "text173")

let text174 = new ui.LabelFlexModel({id: String.raw`text174`, styleObject: {"color":"rgba(0,0,0,1.00)"}, value: String.raw`广东 广州` ,container:view100})
data["text174"] = text174
WAC.bindProxy(this,text174, "text174")

let text175 = new ui.LabelFlexModel({id: String.raw`text175`, styleObject: {"color":"rgba(0,0,0,1.00)"}, value: String.raw`2019年6月6日` ,container:view100})
data["text175"] = text175
WAC.bindProxy(this,text175, "text175")

let text176 = new ui.LabelFlexModel({id: String.raw`text176`, styleObject: {"color":"rgba(0,0,0,1.00)"}, value: String.raw`这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本` ,container:view100})
data["text176"] = text176
WAC.bindProxy(this,text176, "text176")

let icon20 = new ui.IconFlexModel({ id: "icon20", src: "../../resources/svg/000000-thumb-up.svg", styleObject: {} ,container:view100})
data["icon20"] = icon20
WAC.bindProxy(this,icon20, "icon20")

let text177 = new ui.LabelFlexModel({id: String.raw`text177`, styleObject: {"color":"rgba(0,0,0,1.00)"}, value: String.raw`666` ,container:view100})
data["text177"] = text177
WAC.bindProxy(this,text177, "text177")


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

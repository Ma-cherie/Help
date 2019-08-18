const WAC = require('./wac')

function saveImageToPhotosAlbum(src) {
    if (!(typeof src === 'string') || src.length <= 0) {
        return
    }
    wx.showActionSheet({
        itemList: ['保存至相册'],
        success(res) {
            if (res.tapIndex != 0) {
                return
            }
            wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success() {
                    wx.downloadFile({
                        url: src,
                        success(res) {
                            if (res.statusCode !== 200) {
                                wx.showToast({
                                    title: '图片下载失败',
                                    icon: 'none',
                                    duration: 2000
                                })
                                return
                            }
                            wx.saveImageToPhotosAlbum({
                                filePath: res.tempFilePath,
                                success(res) {
                                    wx.showToast({
                                        title: '保存成功',
                                        icon: 'success',
                                        duration: 2000
                                    })
                                },
                                fail(res) {
                                    wx.showToast({
                                        title: '保存失败',
                                        icon: 'none',
                                        duration: 2000
                                    })
                                }
                            })
                        }
                    })
                }
            })
        },
    })
}

function previewImage(src) {
    wx.previewImage({
        urls: [src]
    })
}

function navigateTo(dst, output) {
    if (output) {
        var str = [];
        for (var p in output)
            if (output.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(output[p]));
            }
        dst = dst + "?" + str.join("&");
    }
    wx.navigateTo({
        url: dst,
    })
}

function switchTab(page) {
    wx.switchTab({
        url: page
    })
}

function navigateBack() {
    wx.navigateBack({
        delta: 1
    })
}

function gotoHomePage() {
    const pages = getCurrentPages()
    wx.navigateBack({
        delta: pages.length + 1
    })
}

function chooseImage(imageCount, success, fail) {
    wx.chooseImage({
        count: imageCount,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
            success(res.tempFilePaths);
        },
        fail
    })
}

function showToast(text) {
    if (typeof text === 'string') {
        wx.showToast({
            title: text,
            icon: 'none',
            duration: 2000
        })
    }
}

function hideToast() {
    wx.hideToast()
}

function setStorage(key, value) {
    wx.setStorageSync(key, value)
}

function getStorage(key) {
    return wx.getStorageSync(key)
}

function removeStorage(key) {
    wx.removeStorageSync(key)
}

function clearStorage(key, value) {
    wx.clearStorageSync()
}

function getUserInfoSync() {
    const app = getApp()
    if (app.globalData.userInfo == undefined) {
        console.error("找不到用户信息,请确认是否获取用户授权,可以通过按钮的 open-Type 属性申请用户授权")
    }
    return app.globalData.userInfo
}

function getUserInfo(success,fail) {
    wx.getUserInfo({
            success: (res) => {
              const app = getApp()
              app.globalData.userInfo = res.userInfo
              success(res.userInfo)
            },
            fail:(error) => {
                let err = error.errMsg
                if (err == "getUserInfo:fail scope unauthorized") {
                    err = "找不到用户信息,请确认是否获取用户授权,可以通过按钮的 open-Type 属性申请用户授权"
                }
                fail(err)
            }
          })
}

function scanCode(success) {
    wx.scanCode({
        success: res => {
            success(res.result)
        }
    })
}

function showModal(title, content, success) {
    if (typeof title !== 'string') {
        return
    }
    if (typeof content !== 'string') {
        return
    }
    wx.showModal({
        title: title,
        content: content,
        showCancel: false,
        success: () => {
            if (success) {
                success()
            }
        }
    })
}

function makePhoneCall(number) {
    if (typeof number === 'string') {
        wx.makePhoneCall({
            phoneNumber: number
        })
    }
}

function WXAsset(url) {
    return url
}

function showActionSheet(list, callback) {
    wx.showActionSheet({
        itemList: list,
        success(res) {
            callback(res.tapIndex)
        }
    })
}

function pageScrollTo(location) {
    wx.pageScrollTo({
        scrollTop: location,
        duration: 300
    })
}

function setClipboardData(text) {
    wx.setClipboardData({
        data: text
    })
}

function getClipboardData(success) {
    wx.getClipboardData({
        success(res) {
            success(res.data)
        }
    })
}

function playAudio(src, autoplay, loop) {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = autoplay || false
    innerAudioContext.loop = loop || false
    innerAudioContext.src = src
    return innerAudioContext
}

function getWeRunData(success, fail) {
    if (!WAC.requiredSDKVersion('2.7.0')) {
        WAC.safeCall(fail)(new Error('请使用 2.7.0 或以上的基础库以使用该接口获取微信运动数据'))
        return
    }
    const getWeRun = () => {
        wx.getWeRunData({
            success(res) {
                wx.cloud.callFunction({
                    name: "mmbizwxaipad_getCloudIdData",
                    data: {
                    cloudIdData: wx.cloud.CloudID(res.cloudID)
                    }
                }).then(res => {
                    WAC.safeCall(success)(res.result.stepInfoList)
                }).catch(err => {
                    WAC.safeCall(fail)(err)
                })
            }, 
            fail(err) {
                WAC.safeCall(fail)(err)
            }
        })
        }
        wx.getSetting({
            success(res) {
                if (!res.authSetting["scope.werun"]) {
                    wx.authorize({
                        scope: 'scope.werun',
                        success() {
                            getWeRun()
                        },
                        fail() {
                            WAC.safeCall(new Error('用户未授权微信运动步数'))
                        }
                    })
                } else {
                    getWeRun()
                }
            },
            fail(err) {
                WAC.safeCall(fail)(err)
            }
        })
}

var dateFormat = function() {
    var token = /d{1,4}|M{1,4}|yy(?:yy)?|([HhmsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function(val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function(date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            M = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            m = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d: d,
                dd: pad(d),
                ddd: dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                M: M + 1,
                MM: pad(M + 1),
                MMM: dF.i18n.monthNames[M],
                MMMMM: dF.i18n.monthNames[M + 12],
                yy: String(y).slice(2),
                yyyy: y,
                h: H % 12 || 12,
                hh: pad(H % 12 || 12),
                H: H,
                HH: pad(H),
                m: M,
                mm: pad(m),
                s: s,
                ss: pad(s),
                l: pad(L, 3),
                L: pad(L > 99 ? Math.round(L / 10) : L),
                t: H < 12 ? "a" : "p",
                tt: H < 12 ? "am" : "pm",
                T: H < 12 ? "A" : "P",
                TT: H < 12 ? "AM" : "PM",
                Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };

        return mask.replace(token, function($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default": "ddd MMM dd yyyy HH:mm:ss",
    shortDate: "M/d/yy",
    mediumDate: "MMM d, yyyy",
    longDate: "MMMM d, yyyy",
    fullDate: "dddd, MMMM d, yyyy",
    shortTime: "h:mm TT",
    mediumTime: "h:mm:ss TT",
    longTime: "h:mm:ss TT Z",
    isoDate: "yyyy-MM-dd",
    isoTime: "HH:mm:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:mm:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:mm:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "周一", "周二", "周三", "周四", "周五", "周六", "周日",
        "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"
    ],
    monthNames: [
        "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月",
        "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
    ]
};

// For convenience...
Date.prototype.format = function(mask, utc) {
    return dateFormat(this, mask, utc);
};

Math.randomInt = function(min, max) {
    return Math.round(min + Math.random() * (max - min));
}


module.exports = {
    previewImage: previewImage,
    chooseImage: chooseImage,
    saveImageToPhotosAlbum: saveImageToPhotosAlbum,
    navigateTo: navigateTo,
    navigateBack: navigateBack,
    gotoHomePage: gotoHomePage,
    showToast: showToast,
    showModal: showModal,
    makePhoneCall: makePhoneCall,
    WXAsset: WXAsset,
    showActionSheet: showActionSheet,
    pageScrollTo: pageScrollTo,
    switchTab: switchTab,
    hideToast: hideToast,
    setStorage: setStorage,
    getStorage: getStorage,
    removeStorage: removeStorage,
    clearStorage: clearStorage,
    getUserInfoSync: getUserInfoSync,
    getUserInfo: getUserInfo,
    scanCode: scanCode,
    setClipboardData: setClipboardData,
    getClipboardData: getClipboardData,
    playAudio: playAudio,
    getWeRunData: getWeRunData
}
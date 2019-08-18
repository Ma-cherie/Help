const ui = require('./uicomponents.js')

function bindProxy(page, model, key) {
    let proxy = new Proxy(model, {
        set: function (target, property, value) {
            target[property] = value
            if (target instanceof ui.BaseFlexModel) {
                target.updateStyle()
            }
            let data = {}
            data[key] = target
            page.setData(data)
            return true
        },
        get: function (target, prop) {
            if (prop === '__target__') return target;  // This is where the magic happens!
            else if (typeof target[prop] !== 'function') {
                return target[prop]
            }
            else {
                return function() {
                    return target[prop].apply(this, arguments)
                }
            }        // This is normal behavior..
        }
    });
    page[key] = proxy
}

function safeCall(fn) {
    return function() {
        if (typeof fn === 'function') {
            fn(...arguments)
        }
    }
}

function compareVersion(v1, v2) {
    v1 = v1.split('.');
    v2 = v2.split('.');
    var len = Math.max(v1.length, v2.length);
    while (v1.length < len) {
        v1.push('0');
    }
    while (v2.length < len) {
        v2.push('0');
    }
    for (var i = 0; i < len; i++) {
        var num1 = parseInt(v1[i], 10);
        var num2 = parseInt(v2[i], 10);

        if (num1 > num2) {
        return 1;
        } else if (num1 < num2) {
        return -1;
        }
    }
    return 0;
}

function requiredSDKVersion(v) {
    const sdk = wx.getSystemInfoSync().SDKVersion;
    return compareVersion(sdk, v) >= 0
}


const _toString = Object.prototype.toString

function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]'
}

module.exports = {
    bindProxy,
    safeCall,
    requiredSDKVersion,
    isPlainObject
}

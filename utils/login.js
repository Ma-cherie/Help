class LoginManager {
    constructor() {
        this.openid = undefined
        this._storageKey = 'me.anthann.qrcode.key.userinfo'
    }

    load() {
        try {
            let data = wx.getStorageSync(this._storageKey)
            if (typeof data !== 'undefined' && data !== null) {
                this.openid = data.openid
            }
        } catch (e) {
            console.error("wx.getStorageSync error")
        }
    }

    save() {
        try {
            wx.setStorageSync(this._storageKey, {
                openid: this.openid
            })
        } catch (e) {
            console.error('wx.setStorageSync error')
        }
    }

    initIfNeeded() {
        let that = this
        return new Promise(function (resolve, reject) {
            if (typeof that.openid !== 'undefined' && that.openid !== null) {
                console.log('读取本地openid: ', that.openid)
                return resolve(that.openid)
            }
            wx.cloud.callFunction({
                name: 'login'
            }).then(res => {
                console.log('[云函数] [login] user openid: ', res.result.openid)
                that.openid = res.result.openid
                that.save()
                return resolve(res.result.openid)
            }).catch(err => {
                console.error('[云函数] [login] 调用失败', err)
                return reject(err)
            })
        });
    }
}

let loginManager = undefined

function loadLoginManager() {
    if (typeof loginManager !== 'undefined' && loginManager !== null) {
        return loginManager
    }
    loginManager = new LoginManager()
    loginManager.load()
    return loginManager
}

module.exports = {
    loadLoginManager,
}
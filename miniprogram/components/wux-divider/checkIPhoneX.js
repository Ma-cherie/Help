"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkIPhoneX = exports.safeAreaInset = exports.getSystemInfo = void 0;

/**
 * 获取系统信息
 */
let systemInfo = null;

const getSystemInfo = isForce => {
  if (!systemInfo || isForce) {
    try {
      systemInfo = wx.getSystemInfoSync();
    } catch (e) {
      /* Ignore */
    }
  }

  return systemInfo;
}; // iPhoneX 竖屏安全区域


exports.getSystemInfo = getSystemInfo;
const safeAreaInset = {
  top: 88,
  // StatusBar & NavBar
  left: 0,
  right: 0,
  bottom: 34 // Home Indicator

};
exports.safeAreaInset = safeAreaInset;
const IPHONEX_DEVICE_HEIGHT = 812;

const isIPhoneX = (_ref) => {
  let {
    model,
    platform,
    screenHeight
  } = _ref;
  return /iPhone X/.test(model) && platform === 'ios' && screenHeight === IPHONEX_DEVICE_HEIGHT;
};

const checkIPhoneX = isForce => isIPhoneX(getSystemInfo(isForce));

exports.checkIPhoneX = checkIPhoneX;
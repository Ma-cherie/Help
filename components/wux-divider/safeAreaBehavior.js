"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _checkIPhoneX = require("./checkIPhoneX");

const defaultSafeArea = {
  top: false,
  bottom: false
};

const setSafeArea = params => {
  if (typeof params === 'boolean') {
    return Object.assign({}, defaultSafeArea, {
      top: params,
      bottom: params
    });
  } else if (params !== null && typeof params === 'object') {
    return Object.assign({}, defaultSafeArea);
  } else if (typeof params === 'string') {
    return Object.assign({}, defaultSafeArea, {
      [params]: true
    });
  }

  return defaultSafeArea;
};

var _default = Behavior({
  properties: {
    safeArea: {
      type: [Boolean, String, Object],
      value: false
    }
  },
  observers: {
    safeArea(newVal) {
      this.setData({
        safeAreaConfig: setSafeArea(newVal)
      });
    }

  },

  definitionFilter(defFields) {
    const {
      statusBarHeight
    } = (0, _checkIPhoneX.getSystemInfo)() || {};
    const isIPhoneX = (0, _checkIPhoneX.checkIPhoneX)();
    Object.assign(defFields.data = defFields.data || {}, {
      safeAreaConfig: defaultSafeArea,
      statusBarHeight,
      isIPhoneX
    });
  }

});

exports.default = _default;
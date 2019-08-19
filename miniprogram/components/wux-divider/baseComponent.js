"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _computedBehavior = _interopRequireDefault(require("./computedBehavior"));

var _relationsBehavior = _interopRequireDefault(require("./relationsBehavior"));

var _safeAreaBehavior = _interopRequireDefault(require("./safeAreaBehavior"));

var _safeSetDataBehavior = _interopRequireDefault(require("./safeSetDataBehavior"));

var _eventsBehavior = _interopRequireDefault(require("./eventsBehavior"));

var _funcBehavior = _interopRequireDefault(require("./funcBehavior"));

var _compareVersion = _interopRequireDefault(require("./compareVersion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  platform,
  SDKVersion
} = wx.getSystemInfoSync();
const libVersion = '2.6.6'; // check SDKVersion

if (platform === 'devtools' && (0, _compareVersion.default)(SDKVersion, libVersion) < 0) {
  if (wx && wx.showModal) {
    wx.showModal({
      title: '提示',
      content: "\u5F53\u524D\u57FA\u7840\u5E93\u7248\u672C\uFF08".concat(SDKVersion, "\uFF09\u8FC7\u4F4E\uFF0C\u65E0\u6CD5\u4F7F\u7528 Wux Weapp \u7EC4\u4EF6\u5E93\uFF0C\u8BF7\u66F4\u65B0\u57FA\u7840\u5E93\u7248\u672C >=").concat(libVersion, " \u540E\u91CD\u8BD5\u3002")
    });
  }
}

const baseComponent = function baseComponent() {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // add default externalClasses
  options.externalClasses = ['wux-class', 'wux-hover-class', ...(options.externalClasses = options.externalClasses || [])]; // add default behaviors

  options.behaviors = [_relationsBehavior.default, _computedBehavior.default, _safeSetDataBehavior.default, ...(options.behaviors = options.behaviors || [])]; // use safeArea

  if (options.useSafeArea) {
    options.behaviors = [...options.behaviors, _safeAreaBehavior.default];
    delete options.useSafeArea;
  } // use events


  if (options.useEvents) {
    options.behaviors = [...options.behaviors, _eventsBehavior.default];
    delete options.useEvents;
  } // use func


  if (options.useFunc) {
    options.behaviors = [...options.behaviors, _funcBehavior.default];
    delete options.useFunc;
  } // use field


  if (options.useField) {
    options.behaviors = [...options.behaviors, 'wx://form-field'];
    delete options.useField;
  } // use export


  if (options.useExport) {
    options.behaviors = [...options.behaviors, 'wx://component-export'];
    options.methods = _objectSpread({
      export() {
        return this;
      }

    }, options.methods);
    delete options.useExport;
  } // add default options


  options.options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true
  }, options.options);
  return Component(options);
};

var _default = baseComponent;
exports.default = _default;

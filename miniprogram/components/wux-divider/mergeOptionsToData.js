"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 过滤对象的函数属性
 * @param {Object} opts
 */
const mergeOptionsToData = function mergeOptionsToData() {
  let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const options = Object.assign({}, opts);

  for (const key in options) {
    if (options.hasOwnProperty(key) && typeof options[key] === 'function') {
      delete options[key];
    }
  }

  return options;
};

var _default = mergeOptionsToData;
exports.default = _default;
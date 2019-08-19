"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Simple bind, faster than native
 *
 * @param {Function} fn
 * @param {Object} ctx
 * @return {Function}
 */
const bind = (fn, ctx) => {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return args.length ? fn.apply(ctx, args) : fn.call(ctx);
  };
};
/**
 * Object assign
 */


const assign = function assign() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return Object.assign({}, ...args);
};

var _default = Behavior({
  properties: {
    visible: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    /**
     * 合并参数并绑定方法
     *
     * @param {Object} opts 参数对象
     * @param {Object} fns 方法挂载的属性
     */
    $$mergeOptionsAndBindMethods() {
      let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let fns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.fns;
      const options = Object.assign({}, opts);

      for (const key in options) {
        if (options.hasOwnProperty(key) && typeof options[key] === 'function') {
          fns[key] = bind(options[key], this);
          delete options[key];
        }
      }

      return options;
    },

    /**
     * Promise setData
     * @param {Array} args 参数对象
     */
    $$setData() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      const params = assign({}, ...args);
      return new Promise(resolve => {
        this.setData(params, resolve);
      });
    },

    /**
     * 延迟指定时间执行回调函数
     * @param {Function} callback 回调函数
     * @param {Number} timeout 延迟时间
     */
    $$requestAnimationFrame() {
      let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : () => {};
      let timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000 / 60;
      return new Promise(resolve => setTimeout(resolve, timeout)).then(callback);
    }

  },

  /**
   * 组件生命周期函数，在组件实例进入页面节点树时执行
   */
  created() {
    this.fns = {};
  },

  /**
   * 组件生命周期函数，在组件实例被从页面节点树移除时执行
   */
  detached() {
    this.fns = {};
  }

});

exports.default = _default;
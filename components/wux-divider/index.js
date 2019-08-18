"use strict";

var _baseComponent = _interopRequireDefault(require("./baseComponent"));

var _classNames = _interopRequireDefault(require("./classNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _baseComponent.default)({
  properties: {
    prefixCls: {
      type: String,
      value: 'wux-divider'
    },
    position: {
      type: String,
      value: 'center'
    },
    dashed: {
      type: Boolean,
      value: false
    },
    text: {
      type: String,
      value: ''
    },
    showText: {
      type: Boolean,
      value: true
    }
  },
  computed: {
    classes: ['prefixCls, dashed, showText, position', function (prefixCls, dashed, showText, position) {
      const wrap = (0, _classNames.default)(prefixCls, {
        ["".concat(prefixCls, "--dashed")]: dashed,
        ["".concat(prefixCls, "--text")]: showText,
        ["".concat(prefixCls, "--text-").concat(position)]: showText && position
      });
      const text = "".concat(prefixCls, "__text");
      return {
        wrap,
        text
      };
    }]
  }
});
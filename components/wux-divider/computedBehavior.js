"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isEmpty = _interopRequireDefault(require("./isEmpty"));

var _shallowEqual = _interopRequireDefault(require("./shallowEqual"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ALL_DATA_KEY = '**';

const trim = function trim() {
  let str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return str.replace(/\s/g, '');
};

var _default = Behavior({
  lifetimes: {
    attached() {
      this.initComputed();
    }

  },

  definitionFilter(defFields) {
    const {
      computed = {}
    } = defFields;
    const observers = {};
    Object.keys(computed).forEach(key => {
      const [field, getter] = Array.isArray(computed[key]) ? computed[key] : [ALL_DATA_KEY, computed[key]];

      observers[field] = function () {
        if (typeof getter === 'function') {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          const newValue = getter.apply(this, args);
          const oldValue = this.data[key];

          if (!(0, _isEmpty.default)(newValue) && !(0, _shallowEqual.default)(newValue, oldValue)) {
            this.setData({
              [key]: newValue
            });
          }
        }
      };
    });
    Object.assign(defFields.observers = defFields.observers || {}, observers);
    Object.assign(defFields.methods = defFields.methods || {}, {
      initComputed: function initComputed() {
        let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        let isForce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (!this.runInitComputed || isForce) {
          this.runInitComputed = false;
          const context = this;

          const result = _objectSpread({}, this.data, data);

          Object.keys(observers).forEach(key => {
            const values = trim(key).split(',').reduce((acc, name) => [...acc, result[name]], []);
            observers[key].apply(context, values);
          });
          this.runInitComputed = true;
        }
      }
    });
  }

});

exports.default = _default;

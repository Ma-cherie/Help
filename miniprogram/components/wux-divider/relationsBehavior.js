"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isEmpty = _interopRequireDefault(require("./isEmpty"));

var _debounce2 = _interopRequireDefault(require("./debounce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * bind func to obj
 */
function bindFunc(obj, method, observer) {
  const oldFn = obj[method];

  obj[method] = function (target) {
    if (observer) {
      observer.call(this, target, {
        [method]: true
      });
    }

    if (oldFn) {
      oldFn.call(this, target);
    }
  };
} // default methods


const methods = ['linked', 'linkChanged', 'unlinked']; // extra props

const extProps = ['observer'];

var _default = Behavior({
  lifetimes: {
    created() {
      this._debounce = null;
    }

  },

  definitionFilter(defFields) {
    const {
      relations
    } = defFields;

    if (!(0, _isEmpty.default)(relations)) {
      for (const key in relations) {
        const relation = relations[key]; // bind func

        methods.forEach(method => bindFunc(relation, method, relation.observer)); // delete extProps

        extProps.forEach(prop => delete relation[prop]);
      }
    }

    Object.assign(defFields.methods = defFields.methods || {}, {
      getRelationsName: function getRelationsName() {
        let types = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['parent', 'child', 'ancestor', 'descendant'];
        return Object.keys(relations || {}).map(key => {
          if (relations[key] && types.includes(relations[key].type)) {
            return key;
          }

          return null;
        }).filter(v => !!v);
      },
      debounce: function debounce(func) {
        let wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        let immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        return (this._debounce = this._debounce || (0, _debounce2.default)(func.bind(this), wait, immediate)).call(this);
      }
    });
  }

});

exports.default = _default;

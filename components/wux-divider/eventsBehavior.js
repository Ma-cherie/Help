"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const defaultEvents = {
  onChange() {}

};

var _default = Behavior({
  properties: {
    events: {
      type: Object,
      value: defaultEvents,

      observer(newVal) {
        this.setData({
          inputEvents: Object.assign({}, this.data.inputEvents, newVal)
        });
      }

    }
  },
  data: {
    inputEvents: defaultEvents
  },
  methods: {
    emitEvent(name, params) {
      let runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      const {
        inputEvents
      } = this.data;
      const method = "on".concat(name[0].toUpperCase()).concat(name.slice(1));
      const func = inputEvents[method];

      if (runCallbacks && typeof func === 'function') {
        func.call(this, params);
      }

      this.triggerEvent(name, params);
    }

  },

  definitionFilter(defFields) {
    const {
      inputEvents
    } = defFields.data || {};
    defFields.data.inputEvents = Object.assign({}, defaultEvents, defFields.defaultEvents, inputEvents);
  }

});

exports.default = _default;
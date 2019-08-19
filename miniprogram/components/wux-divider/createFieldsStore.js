"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createFieldsStore;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FieldsStore {
  constructor() {
    let fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.fields = fields;
  }

  setFields(fields) {
    Object.assign(this.fields, fields);
  }

  updateFields(fields) {
    this.fields = fields;
  }

  clearField(name) {
    delete this.fields[name];
  }

  getValueFromFields(name, fields) {
    const field = fields[name];

    if (field && 'value' in field) {
      return field.value;
    }

    return field.initialValue;
  }

  getAllFieldsName() {
    const {
      fields
    } = this;
    return fields ? Object.keys(fields) : [];
  }

  getField(name) {
    return _objectSpread({}, this.fields[name], {
      name
    });
  }

  getFieldValuePropValue(fieldOption) {
    const {
      name,
      valuePropName
    } = fieldOption;
    const field = this.getField(name);
    const fieldValue = 'value' in field ? field.value : field.initialValue;
    return {
      [valuePropName]: fieldValue
    };
  }

  getFieldValue(name) {
    return this.getValueFromFields(name, this.fields);
  }

  getFieldsValue(names) {
    const fields = names || this.getAllFieldsName();
    return fields.reduce((acc, name) => {
      acc[name] = this.getFieldValue(name);
      return acc;
    }, {});
  }

  resetFields(ns) {
    const {
      fields
    } = this;
    const names = ns || this.getAllFieldsName();
    return names.reduce((acc, name) => {
      const field = fields[name];

      if (field) {
        acc[name] = field.initialValue;
      }

      return acc;
    }, {});
  }

}

function createFieldsStore(fields) {
  return new FieldsStore(fields);
}

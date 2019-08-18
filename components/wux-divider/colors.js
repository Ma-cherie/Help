"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPresetColor = exports.colors = void 0;
const colors = {
  'light': '#ddd',
  'stable': '#b2b2b2',
  'positive': '#387ef5',
  'calm': '#11c1f3',
  'balanced': '#33cd5f',
  'energized': '#ffc900',
  'assertive': '#ef473a',
  'royal': '#886aea',
  'dark': '#444'
};
exports.colors = colors;

const isPresetColor = color => {
  if (!color) {
    return false;
  }

  return colors[color] ? colors[color] : color;
};

exports.isPresetColor = isPresetColor;
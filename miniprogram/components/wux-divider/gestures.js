"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSwipeDirection = exports.getPointsDistance = exports.isNearbyPoints = exports.isEqualPoints = exports.getPointsNumber = exports.getTouchPoints = void 0;

/**
 * 获取触摸点位置信息
 */
const getTouchPoints = function getTouchPoints(e) {
  let index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  const {
    pageX: x,
    pageY: y
  } = e.touches[index] || e.changedTouches[index];
  return {
    x,
    y
  };
};
/**
 * 获取触摸点个数
 */


exports.getTouchPoints = getTouchPoints;

const getPointsNumber = e => e.touches && e.touches.length || e.changedTouches && e.changedTouches.length;
/**
 * 判断是否为同一点
 */


exports.getPointsNumber = getPointsNumber;

const isEqualPoints = (p1, p2) => p1.x === p2.x && p1.y === p2.y;
/**
 * 判断是否为相近的两点
 */


exports.isEqualPoints = isEqualPoints;

const isNearbyPoints = function isNearbyPoints(p1, p2) {
  let DOUBLE_TAP_RADIUS = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 25;
  const xMove = Math.abs(p1.x - p2.x);
  const yMove = Math.abs(p1.y - p2.y);
  return xMove < DOUBLE_TAP_RADIUS & yMove < DOUBLE_TAP_RADIUS;
};
/**
 * 获取两点之间的距离
 */


exports.isNearbyPoints = isNearbyPoints;

const getPointsDistance = (p1, p2) => {
  const xMove = Math.abs(p1.x - p2.x);
  const yMove = Math.abs(p1.y - p2.y);
  return Math.sqrt(xMove * xMove + yMove * yMove);
};
/**
 * 获取触摸移动方向
 */


exports.getPointsDistance = getPointsDistance;

const getSwipeDirection = (x1, x2, y1, y2) => {
  return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? 'Left' : 'Right' : y1 - y2 > 0 ? 'Up' : 'Down';
};

exports.getSwipeDirection = getSwipeDirection;
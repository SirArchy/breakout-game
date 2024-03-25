"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withoutElement = exports.updateElement = exports.toRadians = exports.toDegrees = exports.registerListener = exports.getRange = exports.getRandomFrom = exports.flatten = void 0;
const toDegrees = radians => radians * 180 / Math.PI;
exports.toDegrees = toDegrees;
const toRadians = degrees => degrees * Math.PI / 180;
exports.toRadians = toRadians;
const getRange = length => [...Array(length).keys()];
exports.getRange = getRange;
const getRandomFrom = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return args[Math.floor(Math.random() * args.length)];
};
exports.getRandomFrom = getRandomFrom;
const flatten = arrays => arrays.reduce((acc, row) => [...acc, ...row], []);
exports.flatten = flatten;
const withoutElement = (array, element) => array.filter(e => e !== element);
exports.withoutElement = withoutElement;
const updateElement = (array, oldElement, newElement) => array.map(e => e === oldElement ? newElement : e);
exports.updateElement = updateElement;
const registerListener = (eventName, handler) => {
  window.addEventListener(eventName, handler);
  return () => window.removeEventListener(eventName, handler);
};
exports.registerListener = registerListener;
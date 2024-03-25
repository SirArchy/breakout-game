"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _utils = require("../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = _ref => {
  let {
    lives,
    containerWidth,
    unit
  } = _ref;
  const width = unit * 2;
  return (0, _utils.getRange)(lives).map(i => /*#__PURE__*/_react.default.createElement("rect", {
    className: "life",
    rx: unit / 4,
    height: unit,
    width: width,
    y: unit,
    x: containerWidth - unit - width * (i + 1) - unit / 2 * i,
    key: i
  }));
};
exports.default = _default;
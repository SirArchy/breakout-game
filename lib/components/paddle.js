"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = _ref => {
  let {
    x,
    y,
    width,
    height
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("rect", {
    className: "paddle",
    x: x,
    y: y,
    width: width,
    height: height
  });
};
exports.default = _default;
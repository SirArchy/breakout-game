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
    radius
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("circle", {
    className: "ball",
    cx: x,
    cy: y,
    r: radius
  });
};
exports.default = _default;
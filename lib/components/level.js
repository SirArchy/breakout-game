"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = _ref => {
  let {
    level,
    unit
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("text", {
    x: unit,
    y: unit * 2,
    fontSize: unit,
    className: "level"
  }, "LEVEL: ", level);
};
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _utils = require("../utils");
var _levels = require("../game/levels");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const colors = (0, _utils.getRange)(_levels.BLOCK_MAX_DENSITY).map(i => "rgba(26, 188, 156, ".concat(1 / (_levels.BLOCK_MAX_DENSITY - i), ")"));
var _default = _ref => {
  let {
    x,
    y,
    width,
    height,
    density
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("rect", {
    className: "block",
    fill: colors[density],
    x: x,
    y: y,
    width: width,
    height: height
  });
};
exports.default = _default;
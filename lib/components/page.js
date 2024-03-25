"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _scene = _interopRequireDefault(require("./scene"));
var _utils = require("../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var _default = () => {
  const sceneContainer = (0, _react.useRef)();
  const [size, setSize] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    const onResize = () => {
      const {
        width,
        height
      } = sceneContainer.current.getBoundingClientRect();
      setSize({
        width,
        height
      });
    };
    const unregisterResizeListener = (0, _utils.registerListener)('resize', onResize);
    onResize();
    return unregisterResizeListener;
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "page"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "scene-container",
    ref: sceneContainer
  }, size && /*#__PURE__*/_react.default.createElement(_scene.default, {
    width: size.width,
    height: size.height
  })));
};
exports.default = _default;
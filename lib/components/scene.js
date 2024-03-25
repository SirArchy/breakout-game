"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _levels = require("../game/levels");
var _core = require("../game/core");
var _utils = require("../utils");
var _level = _interopRequireDefault(require("./level"));
var _lives = _interopRequireDefault(require("./lives"));
var _block = _interopRequireDefault(require("./block"));
var _paddle = _interopRequireDefault(require("./paddle"));
var _ball = _interopRequireDefault(require("./ball"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const MOVEMENT_KEYS = {
  LEFT: [65, 37],
  RIGHT: [68, 39]
};
const STOP_KEY = 32;
const UPDATE_EVERY = 1000 / 60;
const getInitialLevel = () => {
  const inState = localStorage.getItem('level');
  return inState ? parseInt(inState, 10) : 0;
};
const getProjectors = (containerSize, gameSize) => {
  const widthRatio = containerSize.width / gameSize.width;
  const heightRatio = containerSize.height / gameSize.height;
  const unitOnScreen = Math.min(widthRatio, heightRatio);
  return {
    projectDistance: distance => distance * unitOnScreen,
    projectVector: vector => vector.scaleBy(unitOnScreen)
  };
};
const getInitialState = containerSize => {
  const level = getInitialLevel();
  const game = (0, _core.getGameStateFromLevel)(_levels.LEVELS[level]);
  const {
    projectDistance,
    projectVector
  } = getProjectors(containerSize, game.size);
  return {
    level,
    game,
    containerSize,
    projectDistance,
    projectVector,
    time: Date.now(),
    stopTime: undefined,
    movement: undefined
  };
};
const ACTION = {
  CONTAINER_SIZE_CHANGE: 'CONTAINER_SIZE_CHANGE',
  KEY_DOWN: 'KEY_DOWN',
  KEY_UP: 'KEY_UP',
  TICK: 'TICK'
};
const HANDLER = {
  [ACTION.CONTAINER_SIZE_CHANGE]: (state, containerSize) => ({
    ...state,
    containerSize,
    ...getProjectors(containerSize, state.game.size)
  }),
  [ACTION.KEY_DOWN]: (state, key) => {
    if (MOVEMENT_KEYS.LEFT.includes(key)) {
      return {
        ...state,
        movement: _core.MOVEMENT.LEFT
      };
    } else if (MOVEMENT_KEYS.RIGHT.includes(key)) {
      return {
        ...state,
        movement: _core.MOVEMENT.RIGHT
      };
    }
    return state;
  },
  [ACTION.KEY_UP]: (state, key) => {
    const newState = {
      ...state,
      movement: undefined
    };
    if (key === STOP_KEY) {
      if (state.stopTime) {
        return {
          ...newState,
          stopTime: undefined,
          time: state.time + Date.now() - state.stopTime
        };
      } else {
        return {
          ...newState,
          stopTime: Date.now()
        };
      }
    }
    return newState;
  },
  [ACTION.TICK]: state => {
    if (state.stopTime) return state;
    const time = Date.now();
    const newGame = (0, _core.getNewGameState)(state.game, state.movement, time - state.time);
    const newState = {
      ...state,
      time
    };
    if (newGame.lives < 1) {
      return {
        ...newState,
        game: (0, _core.getGameStateFromLevel)(_levels.LEVELS[state.level])
      };
    } else if (newGame.blocks.length < 1) {
      const level = state.level === _levels.LEVELS.length ? state.level : state.level + 1;
      localStorage.setItem('level', level);
      const game = (0, _core.getGameStateFromLevel)(_levels.LEVELS[state.level]);
      return {
        ...newState,
        level,
        game,
        ...getProjectors(state.containerSize, game.size)
      };
    }
    return {
      ...newState,
      game: newGame
    };
  }
};
const reducer = (state, _ref) => {
  let {
    type,
    payload
  } = _ref;
  const handler = HANDLER[type];
  if (!handler) return state;
  return handler(state, payload);
};
var _default = containerSize => {
  const [state, dispatch] = (0, _react.useReducer)(reducer, containerSize, getInitialState);
  const act = (type, payload) => dispatch({
    type,
    payload
  });
  const {
    projectDistance,
    projectVector,
    level,
    game: {
      blocks,
      paddle,
      ball,
      size: {
        width,
        height
      },
      lives
    }
  } = state;
  (0, _react.useEffect)(() => act(ACTION.CONTAINER_SIZE_CHANGE, containerSize), [containerSize]);
  (0, _react.useEffect)(() => {
    const onKeyDown = _ref2 => {
      let {
        which
      } = _ref2;
      return act(ACTION.KEY_DOWN, which);
    };
    const onKeyUp = _ref3 => {
      let {
        which
      } = _ref3;
      return act(ACTION.KEY_UP, which);
    };
    const tick = () => act(ACTION.TICK);
    const timerId = setInterval(tick, UPDATE_EVERY);
    const unregisterKeydown = (0, _utils.registerListener)('keydown', onKeyDown);
    const unregisterKeyup = (0, _utils.registerListener)('keyup', onKeyUp);
    return () => {
      clearInterval(timerId);
      unregisterKeydown();
      unregisterKeyup();
    };
  }, []);
  const viewWidth = projectDistance(width);
  const unit = projectDistance(ball.radius);
  return /*#__PURE__*/_react.default.createElement("svg", {
    width: viewWidth,
    height: projectDistance(height),
    className: "scene"
  }, /*#__PURE__*/_react.default.createElement(_level.default, {
    unit: unit,
    level: level + 1
  }), /*#__PURE__*/_react.default.createElement(_lives.default, {
    lives: lives,
    containerWidth: viewWidth,
    unit: unit
  }), blocks.map(_ref4 => {
    let {
      density,
      position,
      width,
      height
    } = _ref4;
    return /*#__PURE__*/_react.default.createElement(_block.default, _extends({
      density: density,
      key: "".concat(position.x, "-").concat(position.y),
      width: projectDistance(width),
      height: projectDistance(height)
    }, projectVector(position)));
  }), /*#__PURE__*/_react.default.createElement(_paddle.default, _extends({
    width: projectDistance(paddle.width),
    height: projectDistance(paddle.height)
  }, projectVector(paddle.position))), /*#__PURE__*/_react.default.createElement(_ball.default, _extends({}, projectVector(ball.center), {
    radius: unit
  })));
};
exports.default = _default;
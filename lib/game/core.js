"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNewGameState = exports.getInitialPaddleAndBall = exports.getGameStateFromLevel = exports.MOVEMENT = void 0;
var _vector = _interopRequireDefault(require("./vector"));
var _utils = require("../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const PADDLE_AREA = 1 / 3;
const BLOCK_HEIGHT = 1 / 3;
const PADDLE_HEIGHT = BLOCK_HEIGHT;
const BALL_RADIUS = 1 / 5;
const DISTANCE_IN_MS = 0.005;
const MOVEMENT = exports.MOVEMENT = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};
const LEFT = new _vector.default(-1, 0);
const RIGHT = new _vector.default(1, 0);
const UP = new _vector.default(0, -1);
const DOWN = new _vector.default(0, 1);
const LEFT_UP = LEFT.add(UP).normalize();
const RIGHT_UP = RIGHT.add(UP).normalize();
const getInitialPaddleAndBall = (width, height, paddleWidth) => {
  const paddleY = height - PADDLE_HEIGHT;
  const paddle = {
    position: new _vector.default((width - paddleWidth) / 2, paddleY),
    width: paddleWidth,
    height: PADDLE_HEIGHT
  };
  const ball = {
    center: new _vector.default(height / 2, paddleY - BALL_RADIUS * 2),
    radius: BALL_RADIUS,
    direction: (0, _utils.getRandomFrom)(LEFT_UP, RIGHT_UP)
  };
  return {
    paddle,
    ball
  };
};
exports.getInitialPaddleAndBall = getInitialPaddleAndBall;
const getGameStateFromLevel = _ref => {
  let {
    lives,
    paddleWidth,
    speed,
    blocks
  } = _ref;
  const width = blocks[0].length;
  const height = width;
  const blocksStart = (height - height * PADDLE_AREA - blocks.length * BLOCK_HEIGHT) / 2;
  const rowsOfBlocks = blocks.map((row, i) => row.map((density, j) => ({
    density,
    position: new _vector.default(j, blocksStart + i * BLOCK_HEIGHT),
    width: 1,
    height: BLOCK_HEIGHT
  })));
  const size = {
    width,
    height
  };
  return {
    size,
    blocks: (0, _utils.flatten)(rowsOfBlocks),
    ...getInitialPaddleAndBall(width, height, paddleWidth),
    lives,
    speed
  };
};
exports.getGameStateFromLevel = getGameStateFromLevel;
const getDistortedDirection = function (vector) {
  let distortionLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  const getComponent = () => Math.random() * distortionLevel - distortionLevel / 2;
  const distortion = new _vector.default(getComponent(), getComponent());
  return vector.add(distortion).normalize();
};
const getNewPaddle = (paddle, size, distance, movement) => {
  if (!movement) return paddle;
  const direction = movement === MOVEMENT.LEFT ? LEFT : RIGHT;
  const {
    x
  } = paddle.position.add(direction.scaleBy(distance));
  const withNewX = x => ({
    ...paddle,
    position: new _vector.default(x, paddle.position.y)
  });
  if (x < 0) {
    return withNewX(0);
  }
  if (x + paddle.width > size.width) {
    return withNewX(size.width - paddle.width);
  }
  return withNewX(x);
};
const isInBoundaries = (oneSide, otherSide, oneBoundary, otherBoundary) => oneSide >= oneBoundary && oneSide <= otherBoundary || otherSide >= oneBoundary && otherSide <= otherBoundary;
const getAdjustedVector = function (normal, vector) {
  let minAngle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 15;
  const angle = normal.angleBetween(vector);
  const maxAngle = 90 - minAngle;
  if (angle < 0) {
    if (angle > -minAngle) {
      return normal.rotate(-minAngle);
    }
    if (angle < -maxAngle) {
      return normal.rotate(-maxAngle);
    }
  } else {
    if (angle < minAngle) {
      return normal.rotate(minAngle);
    }
    if (angle > maxAngle) {
      return normal.rotate(maxAngle);
    }
  }
  return vector;
};
const getNewGameState = (state, movement, timespan) => {
  const {
    size,
    speed,
    lives
  } = state;
  const distance = timespan * DISTANCE_IN_MS * speed;
  const paddle = getNewPaddle(state.paddle, size, distance, movement);
  const {
    radius
  } = state.ball;
  const oldDirection = state.ball.direction;
  const newBallCenter = state.ball.center.add(oldDirection.scaleBy(distance));
  const ballBottom = newBallCenter.y + radius;
  if (ballBottom > size.height) {
    return {
      ...state,
      ...getInitialPaddleAndBall(size.width, size.height, paddle.width),
      lives: lives - 1
    };
  }
  const withNewBallProps = props => ({
    ...state,
    paddle,
    ball: {
      ...state.ball,
      ...props
    }
  });
  const withNewBallDirection = normal => {
    const distorted = getDistortedDirection(oldDirection.reflect(normal));
    const direction = getAdjustedVector(normal, distorted);
    return withNewBallProps({
      direction
    });
  };
  const ballLeft = newBallCenter.x - radius;
  const ballRight = newBallCenter.x + radius;
  const ballTop = newBallCenter.y - radius;
  const paddleLeft = paddle.position.x;
  const paddleRight = paddleLeft + paddle.width;
  const paddleTop = paddle.position.y;
  const ballGoingDown = Math.abs(UP.angleBetween(oldDirection)) > 90;
  const hitPaddle = ballGoingDown && ballBottom >= paddleTop && ballRight >= paddleLeft && ballLeft <= paddleRight;
  if (hitPaddle) return withNewBallDirection(UP);
  if (ballTop <= 0) return withNewBallDirection(DOWN);
  if (ballLeft <= 0) return withNewBallDirection(RIGHT);
  if (ballRight >= size.width) return withNewBallDirection(LEFT);
  const block = state.blocks.find(_ref2 => {
    let {
      position,
      width,
      height
    } = _ref2;
    return isInBoundaries(ballTop, ballBottom, position.y, position.y + height) && isInBoundaries(ballLeft, ballRight, position.x, position.x + width);
  });
  if (block) {
    const density = block.density - 1;
    const newBlock = {
      ...block,
      density
    };
    const blocks = density < 0 ? (0, _utils.withoutElement)(state.blocks, block) : (0, _utils.updateElement)(state.blocks, block, newBlock);
    const getNewBallNormal = () => {
      const blockTop = block.position.y;
      const blockBottom = blockTop + block.height;
      const blockLeft = block.position.x;
      if (ballTop > blockTop - radius && ballBottom < blockBottom + radius) {
        if (ballLeft < blockLeft) return LEFT;
        if (ballRight > blockLeft + block.width) return RIGHT;
      }
      if (ballTop > blockTop) return DOWN;
      if (ballTop <= blockTop) return UP;
    };
    return {
      ...withNewBallDirection(getNewBallNormal()),
      blocks
    };
  }
  return withNewBallProps({
    center: newBallCenter
  });
};
exports.getNewGameState = getNewGameState;
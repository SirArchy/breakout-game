"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LEVELS = exports.BLOCK_MAX_DENSITY = void 0;
var _utils = require("../utils");
const BLOCK_MAX_DENSITY = exports.BLOCK_MAX_DENSITY = 3;
const getRandomBlock = () => Math.floor(Math.random() * BLOCK_MAX_DENSITY);
const getBlocks = (rows, columns) => (0, _utils.getRange)(rows).map(() => (0, _utils.getRange)(columns).map(getRandomBlock));
const LEVELS = exports.LEVELS = [{
  lives: 5,
  paddleWidth: 2.5,
  speed: 1,
  blocks: getBlocks(3, 6)
}, {
  lives: 4,
  paddleWidth: 2,
  speed: 1.4,
  blocks: getBlocks(4, 7)
}, {
  lives: 3,
  paddleWidth: 1.5,
  speed: 1.8,
  blocks: getBlocks(5, 8)
}, {
  lives: 2,
  paddleWidth: 1,
  speed: 2.2,
  blocks: getBlocks(6, 9)
}];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("../utils");
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  scaleBy(number) {
    return new Vector(this.x * number, this.y * number);
  }
  length() {
    return Math.hypot(this.x, this.y);
  }
  add(_ref) {
    let {
      x,
      y
    } = _ref;
    return new Vector(this.x + x, this.y + y);
  }
  normalize() {
    return this.scaleBy(1 / this.length());
  }
  subtract(_ref2) {
    let {
      x,
      y
    } = _ref2;
    return new Vector(this.x - x, this.y - y);
  }
  dotProduct(_ref3) {
    let {
      x,
      y
    } = _ref3;
    return this.x * x + this.y * y;
  }
  projectOn(other) {
    const amt = this.dotProduct(other) / other.length();
    return new Vector(amt * other.x, amt * other.y);
  }
  reflect(normal) {
    return this.subtract(this.projectOn(normal).scaleBy(2));
  }
  rotate(degrees) {
    const radians = (0, _utils.toRadians)(degrees);
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    return new Vector(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
  }
  crossProduct(_ref4) {
    let {
      x,
      y
    } = _ref4;
    return this.x * y - x * this.y;
  }
  angleBetween(other) {
    return (0, _utils.toDegrees)(Math.atan2(this.crossProduct(other), this.dotProduct(other)));
  }
}
exports.default = Vector;
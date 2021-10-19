"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMap = void 0;

var _classTransformer = require("class-transformer");

class UserMap {
  static toDTO({
    email,
    avatar,
    driver_license,
    name,
    id,
    avatar_url
  }) {
    const user = (0, _classTransformer.classToClass)({
      email,
      avatar,
      driver_license,
      name,
      id,
      avatar_url
    });
    return user;
  }

}

exports.UserMap = UserMap;
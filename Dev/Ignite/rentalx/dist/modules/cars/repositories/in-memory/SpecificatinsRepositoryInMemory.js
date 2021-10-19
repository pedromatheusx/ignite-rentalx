"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepositoryInMemory = void 0;

var _Specification = require("../../infra/typeorm/entities/Specification");

class SpecificationsRepositoryInMemory {
  constructor() {
    this.specification = [];
  }

  async create({
    name,
    description
  }) {
    const specification = new _Specification.Specification();
    Object.assign(specification, {
      name,
      description
    });
    this.specification.push(specification);
    return specification;
  }

  async findByName(name) {
    const specification = await this.specification.find(specifications => specifications.name === name);
    return specification;
  }

  async findByIds(ids) {
    const allSpecifications = this.specification.filter(specification => ids.includes(specification.id));
    return allSpecifications;
  }

}

exports.SpecificationsRepositoryInMemory = SpecificationsRepositoryInMemory;
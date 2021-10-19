"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepository = void 0;

var _typeorm = require("typeorm");

var _Category = require("../entities/Category");

class CategoriesRepository {
  // private categories: Category[];
  // private static INSTANCE: CategoriesRepository;
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Category.Category); // this.categories = [];
  } // public static getInstance(): CategoriesRepository {
  //     if(!CategoriesRepository.INSTANCE){
  //         CategoriesRepository.INSTANCE = new CategoriesRepository();
  //     }
  //     return CategoriesRepository.INSTANCE;
  // }


  async create({
    name,
    description
  }) {
    const category = this.repository.create({
      name,
      description
    });
    await this.repository.save(category); //     const category = new Category();
    // Object.assign(category, {
    //     name,
    //     description,
    //     created_at: new Date()
    // })
    // this.categories.push(category)
  }

  async list() {
    const categories = await this.repository.find();
    return categories; // return this.categories;
  }

  async findByName(name) {
    // const category = this.categories.find(category => category.name === name)
    const category = await this.repository.findOne({
      name
    });
    return category;
  }

}

exports.CategoriesRepository = CategoriesRepository;
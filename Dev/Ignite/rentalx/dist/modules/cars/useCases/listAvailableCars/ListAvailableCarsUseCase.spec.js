"use strict";

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");

var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");

let listAvailableCasrUseCase;
let carsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    listAvailableCasrUseCase = new _ListAvailableCarsUseCase.ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Carro",
      "description": "Test Carro",
      "daily_rate": 110,
      "license_plate": "ABC-1596",
      "fine_amount": 60,
      "brand": "Brand",
      "category_id": "5d1b2e92-8874-4097-93c1-dedd236f9c1a"
    });
    const cars = await listAvailableCasrUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Carro",
      "description": "Test Carro",
      "daily_rate": 110,
      "license_plate": "ABC-1596",
      "fine_amount": 60,
      "brand": "Brand_test",
      "category_id": "5d1b2e92-8874-4097-93c1-dedd236f9c1a"
    });
    const cars = await listAvailableCasrUseCase.execute({
      brand: "Brand_test"
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Carro3",
      "description": "Test Carro3",
      "daily_rate": 110,
      "license_plate": "ABC-1648",
      "fine_amount": 60,
      "brand": "Brand_test",
      "category_id": "5d1b2e92-8874-4097-93c1-dedd236f9c1a"
    });
    const cars = await listAvailableCasrUseCase.execute({
      name: "Carro3"
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Carro3",
      "description": "Test Carro3",
      "daily_rate": 110,
      "license_plate": "ABC-1648",
      "fine_amount": 60,
      "brand": "Brand_test",
      "category_id": "12345"
    });
    const cars = await listAvailableCasrUseCase.execute({
      category_id: "12345"
    });
    expect(cars).toEqual([car]);
  });
});
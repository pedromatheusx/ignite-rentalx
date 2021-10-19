"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");

var _SpecificatinsRepositoryInMemory = require("../../repositories/in-memory/SpecificatinsRepositoryInMemory");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

let createCarSpecificationUseCae;
let carsRepositoryInMemory;
let specificationsRepositoryInMemory;
describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new _SpecificatinsRepositoryInMemory.SpecificationsRepositoryInMemory();
    createCarSpecificationUseCae = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });
  it("should not be able to add a new specification to a now-existent car", async () => {
    const car_id = "12345";
    const specification_id = ["55665"];
    await expect(createCarSpecificationUseCae.execute({
      car_id,
      specification_id
    })).rejects.toEqual(new _AppError.AppError("Car does not exists!"));
  });
  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    });
    const specification = await specificationsRepositoryInMemory.create({
      name: "test",
      description: "test"
    });
    const specification_id = [specification.id];
    const specificationsCars = await createCarSpecificationUseCae.execute({
      car_id: car.id,
      specification_id
    });
    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
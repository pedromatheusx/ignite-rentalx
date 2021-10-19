"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevelutionRentalUseCase = void 0;

var _tsyringe = require("tsyringe");

var _IDateProvider = require("../../../../shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _ICarsRepository = require("../../../cars/repositories/ICarsRepository");

var _IRentalsRepository = require("../../repositories/IRentalsRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let DevelutionRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RentalsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRentalsRepository.IRentalsRepository === "undefined" ? Object : _IRentalsRepository.IRentalsRepository, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class DevelutionRentalUseCase {
  constructor(rentalRepository, carsRepository, dateProvider) {
    this.rentalRepository = rentalRepository;
    this.carsRepository = carsRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    id,
    user_id
  }) {
    const rental = await this.rentalRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minimum_daily = 1;

    if (!rental) {
      throw new _AppError.AppError("Rental does not exists!");
    }

    const dateNow = this.dateProvider.dateNow();
    let daily = this.dateProvider.compareInDay(rental.start_date, this.dateProvider.dateNow());

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.compareInDay(dateNow, rental.expected_return_date);
    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;
    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;
    await this.rentalRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);
    return rental;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.DevelutionRentalUseCase = DevelutionRentalUseCase;
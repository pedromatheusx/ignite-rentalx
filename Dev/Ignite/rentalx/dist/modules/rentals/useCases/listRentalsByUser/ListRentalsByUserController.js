"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRentalsUserController = void 0;

var _tsyringe = require("tsyringe");

var _ListRentalsByUserUseCase = require("./ListRentalsByUserUseCase");

class ListRentalsUserController {
  async handle(request, response) {
    const {
      id
    } = request.user;

    const listRentalsByUserUseCase = _tsyringe.container.resolve(_ListRentalsByUserUseCase.ListRentalsByUserUseCase);

    const rentals = await listRentalsByUserUseCase.execute(id);
    return response.json(rentals);
  }

}

exports.ListRentalsUserController = ListRentalsUserController;
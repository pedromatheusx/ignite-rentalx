import { AppError } from "../../../../shared/errors/AppError"
import { IRentalsRepository } from "../../repositories/IRentalsRepository"

interface IRequest {
    user_id: string,
    car_id: string,
    expected__return_date: Date
}

class CreateRentalUseCase {

    constructor(
        private rentalsRepository: IRentalsRepository
    ){}

    async execute({user_id, car_id, expected__return_date}: IRequest):Promise<void>{
        const carUnavailable = await this.rentalsRepository.findOperRentalByCar(car_id)

        if(carUnavailable){
            throw new AppError("Car is unavailable")
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

        if(rentalOpenToUser){
            throw new AppError("There's a rental in progress for user!")
        }
    }
}

export {CreateRentalUseCase}
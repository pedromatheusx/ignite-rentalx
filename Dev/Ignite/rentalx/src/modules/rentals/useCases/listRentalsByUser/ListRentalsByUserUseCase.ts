import { inject, injectable } from "tsyringe";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

@injectable()
class ListRentalsByUserUseCase {


    constructor(
        @inject("RentalsRepository")
        private rentalRepository: IRentalsRepository
    ){}

    async execute(user_id: string): Promise<Rental[]>{

       const rentalByUser = await this.rentalRepository.findByUserId(user_id)

       return rentalByUser

    }
}

export {ListRentalsByUserUseCase}
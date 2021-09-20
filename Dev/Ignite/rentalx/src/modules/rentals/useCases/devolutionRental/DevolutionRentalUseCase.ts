import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
    id: string,
    user_id: string
}
@injectable()
class DevelutionRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const rental = await this.rentalRepository.findById(id)
        const car = await this.carsRepository.findById(rental.car_id)
        const minimum_daily = 1

        if (!rental) {
            throw new AppError("Rental does not exists!")
        }

        const dateNow = this.dateProvider.dateNow()

        let daily = this.dateProvider.compareInDay(
            rental.start_date,
            this.dateProvider.dateNow()
        )

        if (daily <= 0) {
            daily = minimum_daily
        }

        const delay = this.dateProvider.compareInDay(
            dateNow,
            rental.expected_return_date
        )

        let total = 0

        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount
            total = calculate_fine
        }

        total += daily * car.daily_rate

        rental.end_date = this.dateProvider.dateNow()
        rental.total = total

        await this.rentalRepository.create(rental)
        await this.carsRepository.updateAvailable(car.id, true)

        return rental
    }
}

export { DevelutionRentalUseCase }
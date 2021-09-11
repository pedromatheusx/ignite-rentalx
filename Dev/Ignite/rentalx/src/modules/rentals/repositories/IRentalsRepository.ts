import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {

    findOperRentalByCar(car_id: string):Promise<Rental>
    findOpenRentalByUser(user_id: string):Promise<Rental>
}

export {IRentalsRepository}
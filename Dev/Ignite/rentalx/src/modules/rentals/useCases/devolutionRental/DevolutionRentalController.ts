import { Response , Request} from "express";
import { container } from "tsyringe";
import { DevelutionRentalUseCase } from "./DevolutionRentalUseCase";


class DevolutionRentalController {


    async handle(request:Request, response: Response): Promise<Response>{
        const {id: user_id} = request.user;
        const {id} = request.params

        const develutionRentalUseCase = container.resolve(DevelutionRentalUseCase)
       
      const rental = await develutionRentalUseCase.execute({
            id,
            user_id
        })

        return response.status(200).json(rental)
    }
}

export {DevolutionRentalController}
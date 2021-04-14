import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";


interface IRequest {
    name: string,
    description: String
}

class CreateSpecificationUseCase {
    constructor(private specificationsRepository: ISpecificationRepository){

    }
 
    execute({name , description}: IRequest): void {

        const specificationAlreadyExists = this.specificationsRepository.findByname(name);

        if(specificationAlreadyExists){
            throw new Error("Specification already exists!")
        }

        this.specificationsRepository.create({
            name, 
            description
        })

    }
}

export {CreateSpecificationUseCase}
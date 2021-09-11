import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICategoryRepository } from "../../repositories/ICategoriesRepository";



interface IRequest {
    name: string,
    description: string
}

@injectable()
class CreateCategoryUseCase {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoryRepository){}

   async execute({name, description}: IRequest): Promise<void>{
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if(categoryAlreadyExists){
        // return response.status(400).json({error: "Category Already Exists!"})
        throw new AppError("Category already exists!")
    }

    this.categoriesRepository.create({name, description});
    }
}

export {CreateCategoryUseCase}
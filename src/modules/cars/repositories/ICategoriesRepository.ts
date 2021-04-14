import { Category } from "../model/Category";

interface ICreateCategoryDIO{
    name: string;
    description: string;
}

interface ICategoriesRepository{
    findByName(nome: string): Category;
    list(): Category[];
    create({name, description}: ICreateCategoryDIO): void;
}

export {ICategoriesRepository, ICreateCategoryDIO}
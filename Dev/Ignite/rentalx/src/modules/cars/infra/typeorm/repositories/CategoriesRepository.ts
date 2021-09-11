import { getRepository, Repository } from "typeorm";
import { Category } from "../entities/Category";
import { ICategoryRepository, ICreateCategoryDTO,  } from "../../../repositories/ICategoriesRepository";


class CategoriesRepository implements ICategoryRepository{

    // private categories: Category[];
    private repository: Repository<Category>;

    // private static INSTANCE: CategoriesRepository;

     constructor(){
        this.repository = getRepository(Category)
        // this.categories = [];
    }

    // public static getInstance(): CategoriesRepository {
    //     if(!CategoriesRepository.INSTANCE){
    //         CategoriesRepository.INSTANCE = new CategoriesRepository();
    //     }
        
    //     return CategoriesRepository.INSTANCE;
    // }

   async create({name, description}:ICreateCategoryDTO): Promise<void>{
    
        const category = this.repository.create({
            name, description
        })

        await this.repository.save(category)
        
        //     const category = new Category();

    // Object.assign(category, {
    //     name,
    //     description,
    //     created_at: new Date()
    // })

    // this.categories.push(category)
    }


   async list(): Promise<Category[]>{
        const categories = await this.repository.find()
        return categories
        // return this.categories;
    }

   async findByName(name: string): Promise<Category>{

        // const category = this.categories.find(category => category.name === name)
        const category = await this.repository.findOne({name})
        return category;

    }
}

export {CategoriesRepository}
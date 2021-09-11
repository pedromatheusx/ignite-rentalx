import { getRepository, Repository } from "typeorm";
import { ICreateSpecificationCTO, ISpecificationsRepository } from "../../../repositories/ISpecificationsRepository";
import { Specification } from "../entities/Specification";


class SpecificationsRepository implements ISpecificationsRepository{


    private repository: Repository<Specification>
    // private specifications: Specification[];

    constructor(){
        this.repository = getRepository(Specification)
        // this.specifications = [];
    }
  

    
   async findByName(name: string): Promise<Specification> {
       const specification = await this.repository.findOne({name})

       return specification
    }

   async create({ name, description }: ICreateSpecificationCTO): Promise<Specification> {
       
        const specification =  this.repository.create({
            name, description
        })

      await this.repository.save(specification)

      return specification
    }

   async findByIds(ids: string[]): Promise<Specification[]> {
      const specifications = await this.repository.findByIds(ids)
      return specifications
    }

}

export {SpecificationsRepository}
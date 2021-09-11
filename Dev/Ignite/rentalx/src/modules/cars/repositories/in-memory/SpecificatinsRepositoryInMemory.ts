import { Specification } from "../../infra/typeorm/entities/Specification";
import { ICreateSpecificationCTO, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationsRepositoryInMemory implements ISpecificationsRepository {

    specification: Specification[] = []

   async create({ name, description }: ICreateSpecificationCTO): Promise<Specification> {

        const specification = new Specification()

        Object.assign(specification, {
            name,
            description
        })


        this.specification.push(specification)
        return specification
    }
   async findByName(name: string): Promise<Specification> {
      const specification = await this.specification.find(specifications => specifications.name === name)
        return specification
    }
  async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specification.filter((specification) => ids.includes(specification.id))
        return allSpecifications    
    }

}


export {SpecificationsRepositoryInMemory}
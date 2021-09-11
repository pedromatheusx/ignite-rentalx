import { Specification } from "../infra/typeorm/entities/Specification";


interface ICreateSpecificationCTO {
    name: string,
    description: string
}



interface ISpecificationsRepository {

    create({name, description}: ICreateSpecificationCTO):Promise<Specification>
    findByName(name: string): Promise<Specification>
    findByIds(ids: string[]): Promise<Specification[]>
}

export {ISpecificationsRepository, ICreateSpecificationCTO}
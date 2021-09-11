import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt'
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepository } from "../../infra/typeorm/repositories/UsersRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {

    }

    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {


        const userAlreadyExists = await this.usersRepository.findByName(email)

        if(userAlreadyExists){
            throw new AppError("User already exists")
        }

        const passwordHash = await hash(password, 8);


        await this.usersRepository.create({
            name,
            email,
            password: passwordHash, 
            driver_license
        })
    }

}

export { CreateUserUseCase }
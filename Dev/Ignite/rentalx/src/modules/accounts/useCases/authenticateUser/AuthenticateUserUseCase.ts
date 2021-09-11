import {compare} from 'bcrypt'
import { inject, injectable } from "tsyringe";
import {sign} from 'jsonwebtoken'
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from '../../../../shared/errors/AppError';

interface IRequest {
    email: string,
    password: string
}

interface IResponse {
   user: {
       name: string,
       email: string
   },
   token: string
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){

    }

  async  execute({email, password} : IRequest): Promise<IResponse>{

    const user = await this.usersRepository.findByName(email)

    if(!user){
        throw new AppError("Email or password incorrect!")
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
        throw new AppError("Email or password incorrect!")
    }

    const token = sign({}, "c6cc8094c2dc07b700ffcc36d64e2138", {
        subject: user.id,
        expiresIn: "1d"
    })


    const tokenRetun:IResponse = {
        user: {
            name: user.name,
            email: user.email
        },
        token
    }

    return tokenRetun

    }

}

export {AuthenticateUserUseCase}
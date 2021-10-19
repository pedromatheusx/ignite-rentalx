import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../../infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";



class UsersTokensRepositoryInMemory implements IUsersTokensRepository {

    userstokens: UserTokens[] = []

    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = new UserTokens()

        Object.assign(userToken, {
            expires_date,
            refresh_token,
            user_id
        })

        this.userstokens.push(userToken)

        return userToken
    }
    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        const userToken = this.userstokens.find((ut) => ut.user_id === user_id && ut.refresh_token === refresh_token)

        return userToken
    }
    async deleteById(id: string): Promise<void> {
        const userToken = this.userstokens.find((ut) => ut.id === id)

        this.userstokens.splice(this.userstokens.indexOf(userToken))
    }
    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = this.userstokens.find((ut) => ut.refresh_token === ut.refresh_token)

        return userToken
    }

}

export { UsersTokensRepositoryInMemory }
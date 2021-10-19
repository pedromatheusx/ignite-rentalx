import {classToClass} from "class-transformer"
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
    static toDTO({email, avatar,driver_license, name,id, avatar_url}:User):IUserResponseDTO{

        const user = classToClass({
            email, avatar,driver_license, name,id, avatar_url
        })

       return user
    }
}

export {UserMap}
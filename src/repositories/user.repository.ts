import { UserInformation } from "../interfaces/user.interface";
import { User, UserInterface } from "../models/user.model";


export class UserRepository {
    async findByEmail(email:string): Promise<UserInterface | null>{
        return await User.findOne({email});
    }

    async createUser(userData: UserInformation): Promise<UserInterface> {
        return await User.create(userData)
    }
}       
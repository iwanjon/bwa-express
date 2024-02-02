
// # type Service interface {
//     # 	RegisterUser(input RegisterUser) (User, error)
//     # 	LoginUser(input LoginInput) (User, error)
//     # 	CheckEmailAvailable(input CheckEmailInput) (bool, error)
//     # 	SaveAvatar(id int, filelocation string) (User, error)
//     # 	GetUserById(id int) (User, error)
//     # 	GetAllUsers() ([]User, error)
//     # 	UodateUser(i FormUpdateInput) (User, error)
//     # }

import { User } from "../entities/user";
import { CustomeError } from "../error/error";
import { UserRepository } from "../repositories/user";
import bcyptjs from "bcryptjs";

export class UserService {
    public static async RegisterUser(userInput:any):Promise<User>{

        let user = new User()
        user.name = userInput.name
        user.email = userInput.email
        user.occupation = userInput.occupation
        user.password = await this.HashingPassword(userInput.password)
        try {
            let savedUser = await UserRepository.SaveUser(user)
            return savedUser;
            
        } catch (error) {
            console.log(user, error,"error from user service")
            let custError = new CustomeError((error as Error).name, (error as Error).message);
            console.log(error.name)
            console.log(error.message, "error from here lho")
            throw error
            // throw error;
        }
        
    }

    public static async HashingPassword(password:string): Promise<string> {
        const hashedPassword = await bcyptjs.hash(password, 10);
        return hashedPassword;
    }

    public static async ComparePassword(passwordInput:string, hashPassword:string) :Promise<boolean>{
        const is_match = await bcyptjs.compare(hashPassword, passwordInput)
        return is_match
    }

    // public static async ToJson(user)
}
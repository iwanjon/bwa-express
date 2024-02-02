import { User } from '../entities/user';
import { CustomeError } from '../error/error'

export class UserRepository {
    public static async SaveUser(user: User): Promise<User> {

        const saveduser = await user.save()
        return saveduser;



    }

    public static async FindByName(name: string): Promise<User | null> {
        let user = await User.findOneBy({
            name: name,
        })
        return user
    }

    public static async FindById(id: number): Promise<User | null> {
        let user = await User.findOneBy({
            id,
        })
        return user
    }

    public static async FindByEmail(email: string): Promise<User | null> {
        let user = await User.findOneBy({
            email,
        })
        return user;
    }

    public static async FindAllUser(): Promise<User[]> {
        let user = await User.find()
        return user;
    }
}
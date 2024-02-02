import "reflect-metadata"
import {it, vi, expect} from "vitest"
import { UserService } from "../../services/user"
import { UserRepository } from "../../repositories/user"
import { User } from "../../entities/user"

it("should be success register userService", async () => {
 
    const input ={
        email : "abc@gmail.com",
        occupation:"abc",
        name:"abc",
        password:"abc",
    }
    const user = new User()
    
    console.log(user, input)
    user.email = input.email
    user.name = input.name
    user.occupation = input.occupation
    user.password = input.password
    console.log(user, ":assluser")
    UserRepository.SaveUser = vi.fn(async (user:User) => {
        return user
    })
    console.log(UserRepository.SaveUser(user))
    const aa = await UserService.RegisterUser(input)
    expect(aa.name).toEqual(user.name)


})

it("should be fail register userService", async () => {
 
    const input ={
        email : "abc@gmail.com",
        occupation:"abc",
        name:"abc",
        password:"abc",
    }
    const user = new User()
    console.log(user, input)
    user.email = input.email
    user.name = input.name
    user.occupation = input.occupation
    user.password = input.password

    UserRepository.SaveUser = vi.fn(async (user:User) => {
        throw new Error("error saving user")
    })

    await expect(UserService.RegisterUser(input)).rejects.toThrow()

})
import "reflect-metadata"
import { it, vi, expect } from "vitest"
import { UserService } from "../../services/user"
import { UserRepository } from "../../repositories/user"
import { User } from "../../entities/user"
import { UserController } from "../../controllers/user"
import { Request, Response } from "express";


it("should be fail register usercontroller", async () => {

    const input = {
        email: "abc@gmail.com",
        occupation: "abc",
        name: "abc",
        password: "abc",
        password_confirm: "abc",
        role: "admin"
    }
    const user = new User()
    console.log(user, input)
    user.email = input.email
    user.name = input.name
    user.occupation = input.occupation
    user.password = input.password
    user.role = input.role
    const xx= UserRepository.SaveUser
    UserRepository.SaveUser = vi.fn(async (user: User) => {
        throw new Error("error saving user")
        // return user;
    })
    let req: any = {
        body: input,
    }
    const res: any = {
        status: function () {
            return this;
        },
        json: function () { },
        send: function () { }
    };

    await expect(UserController.CreateUser(req, res)).resolves.toBeInstanceOf(Error)
    UserRepository.SaveUser = xx
})

it("should be sukses register usercontroller", async () => {

    const input = {
        email: "abc@gmail.com",
        occupation: "abc",
        name: "abc",
        password: "abc",
        password_confirm: "abc",
        role: "admin"
    }
    const user = new User()
    console.log(user, input)
    user.email = input.email
    user.name = input.name
    user.occupation = input.occupation
    user.password = input.password
    user.role = input.role

    UserRepository.SaveUser = vi.fn(async (user: User) => {
        // throw new Error("error saving user")
        return user;
    })
    let req: any = {
        body: input,
    }
    const res: any = {
        status: function () {
            return this;
        },
        json: function () { },
        send: function () { }
    };
    const result = await UserController.CreateUser(req, res)
    expect(result.name).toEqual(input.name);

})
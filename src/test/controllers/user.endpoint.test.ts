import request from "supertest";
import { Express } from "express"
import { run_process, app as anm } from "../..";
import { it, vi, expect, describe, beforeAll, afterAll } from "vitest"
import { DataSource, DataSourceOptions, PrimaryGeneratedColumn } from 'typeorm';
import { User } from "../../entities/user";
import { UserRepository } from "../../repositories/user";
// const request = supertest(app)

// const tu = async () => {
//     let tup: Express;
//     promapp.then((aaa) => { tup = aaa })
//     return tup
// }
describe('POST /users', () => {
    // const app = tu()
    let app;
    let obj_id;
    let datasouce

    beforeAll(async () => {
        [app, datasouce] = await run_process()
    });
    it('register user sukses', async function () {
        // UserRepository.SaveUser = vi.fn(async (user: User) => {
        //     throw new Error("error saving user")
        //     // return user;
        // })
        console.log(anm, "this is app os anm")
        const data = await request(anm)
            .post('/users')
            .send({
                name: 'john',
                email: "akuaa@gmail.com",
                password: "1234",
                password_confirm: "1234",
                occupation: "koko",
                role: "admin",
            })
        // .set('Accept', 'application/json')
        // .end(function(err, res) {
        //     if (err) return done(err);
        //     return done();
        //   });
        // .expect('Content-Type', /json/)
        // .expect(200, )
        // .end(function (err, res) {
        //     if (err) {
        //         throw err
        //     }
        //     return res
        // });
        let obj = JSON.parse(data.text);
        obj_id = obj.id
        console.log("demmm", data.text, "alloooppp")
        expect(data.status).toEqual(201);
    });

    afterAll(async () => {
        // await new Promise<void>((resolve) => {
        //   app.close(resolve);
        // });
        console.log("delete user", obj_id);
        (datasouce as DataSource).manager.delete(User, { id: obj_id })
    });

});

import express, {Router} from "express";
import { UserController } from "./controllers/user";

export const routes = (router: Router) => {
    router.post('/users', UserController.CreateUser);

}

import {Request, Response} from "express";
import {RegisterValidation} from "../validation/validation";
import { UserService } from "../services/user";
import logger from "../logger";
export class UserController{


    public static async CreateUser(req: Request, res: Response) {
        // logger.info({ message: 'test', labels: { 'key': 'value' } })
        logger.info(`${req.method} ${req.url}`);
        const body = req.body;
  
        const {error} = RegisterValidation.validate(body, {allowUnknown: true});
        
        if (error) {
            console.log("eror here", error)
            res.status(400).send(error);
            // throw error; 
            logger.error(error); 
            return error.details;
        }
        
        try {
            const regUser = await UserService.RegisterUser(body)
            // console.log(res, ":this is res")
            res.status(201).send(regUser);
            return regUser;
            
        } catch (error)  {
            logger.error(error); 
            logger.error(error.details); 
            // console.log("error here", error)
            // console.log("error here body", body)
            res.status(404).send(error);
            return error;
        }
    }
    
}
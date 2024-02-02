import {Joi} from "express-validation";

export const RegisterValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    password_confirm: Joi.string().required(),
    occupation: Joi.string().required(),
    role: Joi.string().required(),
});

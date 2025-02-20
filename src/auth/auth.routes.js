import { Router } from "express";
import { loginValidator, registerValidator } from "../../helpers/validators.js";
import { login, register } from "./auth.controller.js";

const api = Router();

api.post('/register', registerValidator, register);
api.post('/login', loginValidator, login);

export default api;
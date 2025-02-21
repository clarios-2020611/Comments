import { Router } from "express";
import { deletedUser, getAll, getOne, updatePassword, updateUser } from "./user.controller.js";
import { needId, updatePasswordValidator, updateValidator } from "../../middlewares/validators.js";

const api = Router();

api.get('/getUsers', getAll);
api.get('/getUser', needId, getOne);
api.put('/update', updateValidator, updateUser);
api.put('/updatePassword', updatePasswordValidator, updatePassword);
api.put('/deletedUser', needId, deletedUser);

export default api;
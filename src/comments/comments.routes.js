import { Router } from "express";
import { createPost, deletedPost, getAll, getOne, updatePost } from "./comments.controller";
import { needId } from "../../middlewares/validators";

const api = Router();

api.post('/createPost', createPost);
api.get('/getAll', getAll);
api.get('/getOne', needId, getOne);
api.put('/updatedPost', updatePost);
api.put('/deletedPost', needId, deletedPost);

export default api;
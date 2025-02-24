import { Router } from "express";
import { createPost, deletedPost, getAll, getOne, updatePost } from "./comments.controller.js";
import { createPostValidator, needId, updatePostValidator } from "../../middlewares/validators.js";

const api = Router();

api.post('/createPost', createPostValidator, createPost);
api.get('/getAll', getAll);
api.get('/getOne', needId, getOne);
api.put('/updatedPost', updatePostValidator, updatePost);
api.put('/deletedPost', needId, deletedPost);

export default api;
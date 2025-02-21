import { Router } from "express";
import { createCategory, deletedCat, getAll, getOne, updateCat } from "./category.controller.js";
import { createCategoryValidators, needId, updatedCategory } from "../../middlewares/validators.js";

const api = Router();

api.post('/saveCategory', createCategoryValidators, createCategory);
api.get('/getAll', getAll);
api.get('/getOne', needId, getOne);
api.put('/updateCategory', updatedCategory, updateCat);
api.put('/deletedCategory', needId, deletedCat);

export default api;
import { availableCategory } from '../../helpers/db.validators.js';
import Category from './category.model.js';

export const createCategory = async (req, res) => {
    try {
        const data = req.body;
        data.user = req.user.uid;
        let category = new Category(data);
        await category.save();
        return res.send({ success: false, message: 'Category saved successfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}

export const getAll = async (req, res) => {
    try {
        const { limit = 5, skip = 0 } = req.query;
        let categorys = await Category.find().limit(limit).skip(skip);
        if (!categorys) return res.status(404).send({ success: false, message: 'Categorys not found' });
        return res.send({ success: true, message: 'Categorys found', categorys });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}

export const getOne = async (req, res) => {
    try {
        const id = req.body.id;
        const category = Category.findOne({ _id: id, status: true });
        availableCategory(id);
        if (!category) return res.status(404).send({ success: false, message: 'Category found' });
        return res.send({ success: true, message: `Category found ${category}` });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}

export const updateCat = async (req, res) => {
    try {
        let data = req.body;
        let id = data.id;
        availableCategory(id);
        let category = Category.findByIdAndUpdate(id, data, { new: true });
        if (!category) return res.status(404).send({ success: true, message: 'Category not found' });
        return res.send({ success: true, message: 'Category updated successfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}

export const deletedCat = async (req, res) => {
    try {
        let id = req.body.id;
        availableCategory(id);
        let status = false
        let category = Category.findByIdAndUpdate(id, status, { new: true });
        if (!category) return res.status(404).send({ success: false, message: 'Category not found' });
        return res.send({ success: true, message: 'Category deleted successfully', category });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}
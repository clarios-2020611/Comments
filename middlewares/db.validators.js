import User from '../src/users/user.model.js';
import Category from '../src/category/category.model.js';
import { isValidObjectId } from 'mongoose';

export const objectIdValid = async (objectId) => {
    if (!await isValidObjectId(objectId)) {
        throw new Error(`Id is not objectId valid`);
    }
}

export const availableCategory = async (id) => {
    const category = await Category.findById(id, {
        status: true
    });
    if (!category) {
        console.error(`Category with id ${id} is not available`);
        throw new Error(`Category with id ${id} is not available`);
    }
}

export const existUsername = async (username) => {
    const alreadyUsername = await User.findOne({ username });
    if (alreadyUsername) {
        console.error(`Username ${username} is already taken`);
        throw new Error(`Username ${username} is already taken`);
    }
}

export const existEmail = async (email) => {
    const alreadyEmail = await User.findOne({ email });
    if (alreadyEmail) {
        console.error(`Email ${email} is already taken`);
        throw new Error(`Email ${email} is already taken`);
    }
}
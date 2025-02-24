import { body } from "express-validator";
import { validateErrorWithoutImg } from "./validate.erros.js";
import { objectIdValid, existEmail, existUsername } from "./db.validators.js";


export const createCategoryValidators = [
    body('name', 'Name is required').notEmpty().isLength({ max: 20 }).withMessage('Name is too long'),
    body('description', 'Description is required').notEmpty().isLength({ max: 200 }).withMessage('Description is too long'),
    validateErrorWithoutImg
];

export const updatedCategory = [
    body('name').optional('falsy').isLength({ max: 20 }).withMessage('Name is too long'),
    body('description').optional('falsy').isLength({ max: 20 }).withMessage('Description is too long'),
    validateErrorWithoutImg
];

export const needId = [
    body('id', 'Id is required').notEmpty().custom(objectIdValid),
    validateErrorWithoutImg
];

export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('lastname', 'Lastname cannot be empty')
        .notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({ min: 8 }),
    validateErrorWithoutImg
];

export const loginValidator = [
    body('userLoggin', 'Username or email cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({ min: 8 }),
    validateErrorWithoutImg
];

export const updatePasswordValidator = [
    body('password', 'Password is required').notEmpty(),
    body('passwordConfirm', 'Confirm password is required').notEmpty(),
    body('id', 'Id is required').notEmpty(),
    validateErrorWithoutImg
];

export const updateValidator = [
    body('name').optional('falsy').isLength({ max: 20 }).withMessage('Name too long'),
    body('lastname').optional('falsy').isLength({ max: 20 }).withMessage('Description too long'),
    body('email').optional('falsy').isEmail().custom(existEmail),
    body('username').optional('falsy').custom(existEmail),
    validateErrorWithoutImg
];

export const createPostValidator = [
    body('body', 'Body is required').notEmpty().isLength({ max: 100000 }).withMessage('Please enter no more than 100,000 characters'),
    body('category', 'Category is required').notEmpty().custom(objectIdValid),
    body('user', 'User is required').notEmpty().custom(objectIdValid),
    validateErrorWithoutImg
];

export const updatePostValidator = [
    body('body').optional('falsy').isLength({ max: 100000 }).withMessage('Please enter no more than 100,000 characters'),
    body('category').optional().custom(objectIdValid),
    body('user').notEmpty().custom(objectIdValid),
    validateErrorWithoutImg
];
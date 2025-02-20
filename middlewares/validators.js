import { body } from "express-validator";
import { validateErrorWithoutImg } from "./validate.erros.js";
import { objectIdValid, existEmail, existUsername } from "./db.validators.js";


export const createCategoryValidators = [
    body('name', 'Name is required').notEmpty().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage('Field needs only letters').isLength({ max: 20 }),
    body('description', 'Description is required').notEmpty().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage('Field needs only letters').isLength({ max: 200 }),
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
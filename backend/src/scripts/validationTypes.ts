import { check } from "express-validator";

export const registerValidation = [
    check('username')
        .exists()
        .withMessage('Username is required')
        .isLength({ min: 3, max: 30 })
        .withMessage(
            'Invalid username length, make sure your username is greater than 3 and less than 30 letters'
        )
        .isAlphanumeric()
        .withMessage(`Invalid username, can't contain special characters`),
    check('email')
        .exists()
        .withMessage('Email address is required')
        .isEmail()
        .withMessage('Invalid email'),
    check('password').exists().withMessage('Password is required'),
];
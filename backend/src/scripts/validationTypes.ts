import { check } from 'express-validator';
import type { ValidationError } from 'express-validator';

export const errorFormatter = ({
    location,
    msg,
    param,
    value,
    nestedErrors,
}: ValidationError) => {
    return {
        location: location,
        msg: msg,
        param: param,
        value: value,
        nestedErrors: nestedErrors,
    };
};

export const registerValidation = [
    check('username')
        .exists()
        .withMessage('Username is required')
        .isLength({ min: 3, max: 30 })
        .withMessage(
            'Invalid username length, make sure your username is greater than 3 and less than 30 letters'
        )
        .not()
        .isNumeric()
        .withMessage(`You can't have only numbers in username`)
        .isAlphanumeric()
        .withMessage(`Invalid username, can't contain special characters`)
        .custom((value) => !/\s/.test(value))
        .withMessage('No spaces are allowed in the username'),
    check('email')
        .exists()
        .withMessage('Email address is required')
        .isEmail()
        .withMessage('Invalid email format')
        .custom((value) => !/\s/.test(value))
        .withMessage('No spaces are allowed in the email'),
    check('password')
        .exists()
        .withMessage('Password is required')
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
        })
        .withMessage(
            'Password is not strong enough. Your password must be at least 8 characters long. Must contain min. 1 upper case letter, 1 number and 1 special character'
        )
        .custom((value) => !/\s/.test(value))
        .withMessage('No spaces are allowed in the password'),
];

export const loginValidation = [
    check('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is invalid'),
    check('password').exists().withMessage('Password is required'),
];

export const logoutValidation = [
    check('refreshToken')
        .exists()
        .withMessage('Refresh token is required')
        .not()
        .isEmpty()
        .withMessage(`Refresh token doesn't exist`),
];

export const todoAddValidation = [
    check('Title')
        .exists()
        .withMessage('Todo title is required')
        .not()
        .isEmpty()
        .withMessage('Todo title is required')
        .trim()
        .notEmpty()
        .withMessage(`Todo title can't be empty`),
    check('Desc').exists().withMessage('Todo desc is required'),
];

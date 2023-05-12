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
        .matches(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/gi)
        .withMessage(
            'Username must not contain any spaces or special characters'
        ),
    check('email')
        .exists()
        .withMessage('Email address is required')
        .isEmail()
        .withMessage(
            'Invalid email format. Please enter a valid email address with correct format'
        ),
    check('password')
        .exists()
        .withMessage('Password is required')
        .matches(
            /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,40}$/
        )
        .withMessage(
            'Password is not strong enough. Your password must be between 8 and 40 characters long. Must contain min. 1 upper case letter, 1 number and 1 special character'
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
    check('title')
        .exists()
        .withMessage('Todo title is required')
        .not()
        .isEmpty()
        .withMessage('Todo title is required')
        .trim()
        .notEmpty()
        .withMessage(`Todo title can't be empty`),
    check('desc').exists().withMessage('Todo desc is required'),
    check('important')
        .exists()
        .withMessage('Important boolean is required')
        .not()
        .isEmpty()
        .withMessage('Important boolean is required'),
];

export const todoTitleUpdateValidation = [
    check('title')
        .exists()
        .withMessage('Todo title is required')
        .not()
        .isEmpty()
        .withMessage('Todo title is required')
        .trim()
        .notEmpty()
        .withMessage(`Todo title can't be empty`),
];

export const todoExpInUpdateValidation = [
    check('dateField')
        .custom((value) => {
            if (!Date.parse(value)) {
                throw new Error('Invalid date format');
            }
            return true;
        })
        .withMessage('Date field must be a valid date'),
];

export const todoImportantUpdateValidation = [
    check('important').isBoolean().withMessage('Important must be a boolean'),
];

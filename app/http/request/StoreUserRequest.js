//import library
import { check } from "express-validator"
// my modules || Helpers
import { isEmailExists, isValidateRole } from "../../helpers/dbValidators.js"
import MessageErrorRequest from "../middleware/MessageErrorRequest.js"
// body validations
const StoreUserRequest = [
    check('name', 'Name is required').not().isEmpty(),
    check('email').not().isEmpty()
        .withMessage('Email is required').
        isEmail().withMessage('Email is not valid')
        .custom(isEmailExists),

    check('password').not().isEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),

    check('role').not().isEmpty().withMessage('Role is required')
        .custom(isValidateRole),
    MessageErrorRequest
]

export {StoreUserRequest} 
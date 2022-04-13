//import library
import { check } from "express-validator"
// my modules || Helpers
// import { isEmailExists } from "../../helpers/dbValidators.js"
import MessageErrorRequest from "../middleware/MessageErrorRequest.js"
// body validations
const AuthRequest = [
    check('email').not().isEmpty()
        .withMessage('Email is required')
        .isEmail().withMessage('Email is not valid'),

    check('password').not().isEmpty()
        .withMessage('Password is required'),

    MessageErrorRequest
]

export{AuthRequest} 
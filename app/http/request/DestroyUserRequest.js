//import library
import { check, param } from "express-validator"
import mongoose from "mongoose"
// my modules || Helpers
import { isEmailExists, isValidateRole , isUserExists} from "../../helpers/dbValidators.js"
import MessageErrorRequest from "../middleware/MessageErrorRequest.js"
// body validations


const DestroyUserRequest = [
    
    check('id')
        .isMongoId()
        .withMessage('Id is not valid')
        .custom(isUserExists),
        
    // check('email')
    //     .isEmail()
    //     .withMessage('Email is not valid')
    //     .custom(isEmailExists),

    // check('password')
    //     .isLength({ min: 8 })
    //     .withMessage('Password must be at least 8 characters long'),

    // check('role')
    //     .custom(isValidateRole),

    MessageErrorRequest
]

export default DestroyUserRequest 
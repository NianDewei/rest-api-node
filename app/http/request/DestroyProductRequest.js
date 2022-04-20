//import library
import { check } from "express-validator"
// my modules || Helpers
import { validateJwt } from "../middleware/Validate-jwt.js"
import { canRole } from "../middleware/ValidateUser-role.js"
import MessageErrorRequest from "../middleware/MessageErrorRequest.js"
import { existsProduct } from "../../helpers/dbValidators.js"
// body validations


const DestroyProductRequest = [
    validateJwt,
    canRole('ADMIN'),
    check('id')
        .isMongoId()
        .withMessage('Id is invalid')
        .custom(existsProduct),

    MessageErrorRequest
]

export { DestroyProductRequest } 
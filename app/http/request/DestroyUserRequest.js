//import library
import { check } from "express-validator"
// my modules || Helpers
import { isUserExists } from "../../helpers/dbValidators.js"
import MessageErrorRequest from "../middleware/MessageErrorRequest.js"
import { validateJwt } from "../middleware/Validate-jwt.js"
import { canRole } from "../middleware/ValidateUser-role.js"
// body validations


const DestroyUserRequest = [
    validateJwt,
    // isAdmin,
    canRole('ADMIN'),
    check('id')
        .isMongoId()
        .withMessage('Id is not valid')
        .custom(isUserExists),

    MessageErrorRequest
]

export { DestroyUserRequest } 
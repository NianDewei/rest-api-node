import { check } from "express-validator"
// my modules || Helpers
import MessageErrorRequest from "../middleware/MessageErrorRequest.js"
import { isUserExists } from "../../helpers/dbValidators.js"

// body validations Category    
const ShowUserRequest = [

    check("id").isMongoId()
        .withMessage('Id is invalid')
        .custom(isUserExists),

    MessageErrorRequest
]

export { ShowUserRequest }
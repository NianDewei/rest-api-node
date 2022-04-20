import { check } from "express-validator"
// my modules || Helpers
import MessageErrorRequest from "../middleware/MessageErrorRequest.js"
import { existsCategory } from "../../helpers/dbValidators.js"

// body validations Category    
const ShowCategoryRequest = [

    check("id").isMongoId()
        .withMessage('Id is invalid')
        .custom(existsCategory),

    MessageErrorRequest
]

export { ShowCategoryRequest }
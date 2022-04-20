import { check } from "express-validator"
// my modules || Helpers
import MessageErrorRequest from "../middleware/MessageErrorRequest.js"
import { existsProduct } from "../../helpers/dbValidators.js"

// body validations Category    
const ShowProductRequest = [

    check("id").isMongoId()
        .withMessage('Id is invalid')
        .custom(existsProduct),

    MessageErrorRequest
]

export { ShowProductRequest }
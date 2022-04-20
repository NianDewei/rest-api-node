import { check } from "express-validator"
// my modules || Helpers

import { validateJwt } from "../middleware/Validate-jwt.js"
import { existsNameProduct, existsProduct } from "../../helpers/dbValidators.js"
import MessageErrorRequest from "../middleware/MessageErrorRequest.js"
// body validations Category    
const UpdateProductRequest = [
    validateJwt,
    check("id").isMongoId()
        .withMessage('Id is invalid')
        .custom(existsProduct),
    // check('name').custom(existsNameProduct),

    MessageErrorRequest
]

export { UpdateProductRequest }
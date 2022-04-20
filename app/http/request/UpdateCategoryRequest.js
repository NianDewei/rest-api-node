import { check } from "express-validator"
// my modules || Helpers
import { existsCategory, existsNameCategory } from "../../helpers/dbValidators.js"
import MessageErrorRequest from "../middleware/MessageErrorRequest.js"
import { validateJwt } from "../middleware/Validate-jwt.js"
// body validations Category    
const UpdateCategoryRequest = [
    validateJwt,
    check("id").isMongoId()
        .withMessage('Id is invalid')
        .custom(existsCategory),
    // check('name').custom(existsNameCategory),

    MessageErrorRequest
]

export { UpdateCategoryRequest }
import { check } from "express-validator"
// my modules || Helpers
import { validateJwt } from "../middleware/Validate-jwt.js"
import { existsNameCategory } from "../../helpers/dbValidators.js"
import MessageErrorRequest from "../middleware/MessageErrorRequest.js"

// body validations Category    
const StoreCategoryRequest = [
    validateJwt,
    check('name', 'Name is required').not().isEmpty()
    .custom(existsNameCategory),
    MessageErrorRequest
]

export { StoreCategoryRequest }

import { check } from "express-validator"
import { existsCategory } from "../../helpers/dbValidators.js"
// my modules || Helpers
import MessageErrorRequest from "../middleware/MessageErrorRequest.js"
import { validateJwt } from "../middleware/Validate-jwt.js"
import { canRole } from "../middleware/ValidateUser-role.js"

// body validations Category    
const DestroyCategoryRequest = [
    validateJwt,
    check("id").not().isMongoId().withMessage("Id is invalid"),
    canRole("ADMIN"),
    check("id").custom(existsCategory),
    
    MessageErrorRequest
]

export { DestroyCategoryRequest}
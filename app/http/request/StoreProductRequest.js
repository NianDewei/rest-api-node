import { check } from "express-validator"
// my modules || Helpers
import MessageErrorRequest from "../middleware/MessageErrorRequest.js"
import { existsNameProduct } from "../../helpers/dbValidators.js"
import { validateJwt } from "../middleware/Validate-jwt.js"

// body validations Category    
const StoreProductRequest = [
    validateJwt,
    check('name', 'Name is required').not().isEmpty()
    .custom(existsNameProduct),
    check('description', 'Description is required').not().isEmpty(),
    check('price')
    .not().isEmpty()
        .withMessage('Price is required')
    .isNumeric()
        .withMessage('Price is invalid'),
    check('category')
    .not().isEmpty()
        .withMessage('Category is required')
    .isMongoId()
        .withMessage('Category is invalid'),
        

    MessageErrorRequest
]

export { StoreProductRequest }
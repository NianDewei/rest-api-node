//import library
import { check} from "express-validator"
// my modules || Helpers
import { isUserExists } from "../../helpers/dbValidators.js"
import MessageErrorRequest from "../middleware/MessageErrorRequest.js"
// body validations



const UpdateUserRequest = [
    check('id')
        .isMongoId()
        .withMessage('Id is not valid')
        .custom(isUserExists),
    //send message error 
    MessageErrorRequest
]

export { UpdateUserRequest }
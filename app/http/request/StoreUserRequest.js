// call library
import { validationResult } from "express-validator"

const StoreUserRequest = (Request,res, next) => {
    const errors = validationResult(Request)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: 422,
            errors: errors.array(),
            "jsonapi": {
                "version": "1.0.0"
            }
        })
    }

    next()
}

export default StoreUserRequest 
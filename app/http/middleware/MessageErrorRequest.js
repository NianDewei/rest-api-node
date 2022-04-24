// call library
import { validationResult } from "express-validator"

const MessageErrorRequest = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
            "jsonapi": {
                "version": "1.0.0"
            }
        })
    }

    next()
}

export default MessageErrorRequest 

import jwt from 'jsonwebtoken';
import User from '../../models/User.js'

const messageError = (message, res) => {
    return res.status(422).json({
        status: 422,
        type: 'error',
        error: {
            title: 'Unauthorized',
            msg: message,
            param:'x-access-token',
            location: 'header'
        }
    })
}

const tokenInvalid = "Your Token is invalid"
const tokenNoProvided = "No token provided"

// validate jwt token middleware | by default it will check for the token in the header
const validateJwt = (req, res, next) => {
    const token = req.header('x-access-token')

    if (!token) return messageError(tokenNoProvided, res)

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return messageError(tokenInvalid, res)

        const user = await User.findById(decoded.uid)
        // if the user is empaty, the user is not found
        if (!user) return messageError(tokenInvalid, res)
        // if the user is not active
        if (!user.status) return messageError(tokenInvalid, res)
        // passed all the validations, send the user for the request
        // destructure the user 

        const { _id,name, role, status } = user
        req.userAuth = { _id,name, role, status }

        next()
    });
}



export { validateJwt }



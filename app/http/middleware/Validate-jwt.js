
import jwt from 'jsonwebtoken';
import User from '../../models/User.js'

const messageError = (message, res) => {
    return res.status(401).json({
        status: 401,
        type: 'error',
        error: {
            title: 'Unauthorized',
            detail: message
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
        const { name, role, status } = user

        req.userAuth = { name, role, status }

        next()
    });
}



export { validateJwt }



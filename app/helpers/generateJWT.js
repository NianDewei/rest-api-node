
import jwt from 'jsonwebtoken'

// Generate JWT

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {

        const payload = { uid }
        
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                console.log(err)
                reject("Error to generate token")
            } else {
                resolve(token)
            }
        })
    })
}


export {
    generateJWT
}
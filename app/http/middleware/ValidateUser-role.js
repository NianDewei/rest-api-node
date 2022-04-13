import { MessageErrorClient, responseForbidden } from "../response/MessageErrorClient.js"

const isAdmin = (req, res, next) => {

    const isAuth = isAuthenticated(req)

    if (isAuth) res.status(isAuth.status).json(isAuth)
    else next()
}

const isAuthenticated = req => {

    if (!req.userAuth) {
        const response = {
            status: 500,
            type: 'error',
            error: {
                title: 'Internal Server Error',
                detail: 'If you are seeing this message, please contact the administrator'
            }
        }
        return response
    }

    return isRoleAdmin(req)
}


const isRoleAdmin = req => {
    const { name, role } = req.userAuth;
    if (role !== 'ADMIN') return MessageErrorClient(responseForbidden(name), res)
}


const canRole = (...roles) => {

    return (req, res, next) => {

        if (!req.userAuth) {
            const response = {
                status: 500,
                type: 'warning',
                error: {
                    title: 'Internal Server Error',
                    detail: 'If you are seeing this message, please contact the administrator'
                }
            }
            return res.status(response.status).json(response)
        }

        const { role, name } = req.userAuth;
        if (!roles.includes(role)) return MessageErrorClient(responseForbidden(name), res)
        next()
    }
}

export {
    isAdmin,
    canRole
}
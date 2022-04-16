const MessageErrorClient = (params, res) => {
    /** 
     * Status for default error is 400
     */
    return res.status(params.status || 400).json({
        status: params.status || 400,
        type: params.type || "error",
        error: {
            title: params.title || "Bad Request",
            detail: params.detail || "The Server could not understand the request due to invalid syntax"
        }
    })
}

/**
 *  Message Error Client, when the user is not authorized 
*/

const responseForbidden = name => {
    /**
     * Wait name for the user
     * @type {string}
     */
    return {
        status: 403,
        type: "warning",
        title: "Forbidden",
        detail: `${name}, you are not authorized to delete users`
    }
}

const responseUserBlocked = name => {
    /**
     * Wait name for the user
     * @type {string}
     */
    return {
        status: 403,
        type: "warning",
        title: "User blocked",
        detail: `${name}, your account has been blocked, please contact the administrator`
    }
}



//-------------------| Export Functions |-----------------------
export {
    MessageErrorClient,
    responseForbidden,
    responseUserBlocked
}
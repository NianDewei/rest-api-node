const MessageErrorClient = (params, res) => {
    /** 
     * Status for default error is 400
     */
    return res.status(params.status).json({
        status: params.status || 400,
        type: 'error',
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
        title: "Forbidden",
        detail: `${name}, you are not authorized to delete users`
    }
}



//-------------------| Export Functions |-----------------------
export {
    MessageErrorClient,
    responseForbidden
}
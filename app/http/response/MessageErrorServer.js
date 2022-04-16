const MessageErrorServer = (params, res) => {
    /** 
     * Status for default error is 400
     */
    return res.status(params.status || 500).json({
        status: params.status || 500,
        type: 'info',
        error: {
            title: params.title || "Internal Server Error",
            detail: params.detail || "Sorry, something went wrong, please try again later, if the problem persists, please contact the administrator."
        }
    })
}

const responseOfServer = params => {
    /**
     * Wait name for the user
     * @type {string}
     */
    return {
        status: 500,
        title: "title",
        detail: `detail`
    }
}

export {
    MessageErrorServer,
    responseOfServer
}
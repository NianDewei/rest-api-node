const validateCollections = (req, res, next) => {

    const {collections,value} = req.params

    if (!collections) {
        return res.status(400).json({
            status: 400,
            message: "collections is required"
        })
    }

    next()
}

export {
    validateCollections
}
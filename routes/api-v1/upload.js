import { Router } from "express"
import { check } from "express-validator"
// my modules
import { store, update, show } from "../../app/controller/UploadController.js"
import MessageErrorRequest from "../../app/http/middleware/MessageErrorRequest.js"
import { allowedCollections, validateFiles } from "../../app/helpers/dbValidators.js"
//------------------------------------------------

const uploadsRouter = Router()

uploadsRouter.post('/:colecctions/:id', validateFiles, store)
uploadsRouter.get('/image/:collections/:id', [
    check('collections')
        .custom(c => allowedCollections(c, ['users', 'products'])),
    check('id')
        .isMongoId()
        .withMessage('id is not valid'),

    MessageErrorRequest], show)

uploadsRouter.put('/:collections/:id', [
    validateFiles,
    check('collections')
        .custom(c => allowedCollections(c, ['users', 'products'])),
    check('id')
        .isMongoId()
        .withMessage('id is not valid'),

    MessageErrorRequest
], update)


export { uploadsRouter }